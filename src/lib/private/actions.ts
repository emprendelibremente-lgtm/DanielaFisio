"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type {
  AppointmentStatus,
  PackageStatus,
  PaymentMethod,
  PatientStatus,
} from "@/types/private";
import type { ActionState } from "./actionState";
import { scheduleEndHour, scheduleStartHour } from "@/data/privateConfig";
import { getPrivateContext } from "./context";

function text(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function numberValue(formData: FormData, key: string, fallback: number) {
  const value = Number(formData.get(key));
  return Number.isFinite(value) ? value : fallback;
}

function moneyValue(formData: FormData, key: string) {
  const value = text(formData, key);
  if (!value) {
    return null;
  }

  const parsedValue = Number(value.replace(",", "."));
  return Number.isFinite(parsedValue) && parsedValue >= 0
    ? Number(parsedValue.toFixed(2))
    : null;
}

const appointmentStatuses = [
  "pending",
  "confirmed",
  "completed",
  "cancelled",
] as const;

const patientStatuses = ["active", "paused", "discharged", "follow_up"] as const;
const paymentMethods = [
  "cash",
  "bizum",
  "card",
  "transfer",
  "other",
  "pending",
] as const;

function paymentMethod(formData: FormData): PaymentMethod | null {
  const value = text(formData, "paymentMethod");

  if (!value) {
    return null;
  }

  return paymentMethods.includes(value as PaymentMethod)
    ? (value as PaymentMethod)
    : null;
}

function appointmentStatus(formData: FormData): AppointmentStatus | null {
  const value = text(formData, "appointmentStatus") ?? text(formData, "status");

  if (!value) {
    return "confirmed";
  }

  if (appointmentStatuses.includes(value as AppointmentStatus)) {
    return value as AppointmentStatus;
  }

  return null;
}

function patientStatus(formData: FormData): PatientStatus {
  const value = text(formData, "patientStatus") ?? text(formData, "status");

  return patientStatuses.includes(value as PatientStatus)
    ? (value as PatientStatus)
    : "active";
}

function nullableInteger(formData: FormData, key: string) {
  const value = text(formData, key);
  if (!value) {
    return null;
  }

  const parsedValue = Number(value);
  return Number.isInteger(parsedValue) ? parsedValue : null;
}

function nullablePainValue(formData: FormData, key: string) {
  const value = text(formData, key);
  if (!value) {
    return { value: null, valid: true };
  }

  const parsedValue = Number(value);
  return {
    value: parsedValue,
    valid: Number.isInteger(parsedValue) && parsedValue >= 0 && parsedValue <= 10,
  };
}

function appointmentHour(time: string) {
  return Number(time.split(":")[0]);
}

function validateAppointmentTime(time: string) {
  const hour = appointmentHour(time);
  return Number.isInteger(hour) && hour >= scheduleStartHour && hour <= scheduleEndHour;
}

function logSupabaseError(context: string, error: unknown) {
  if (process.env.NODE_ENV !== "production") {
    console.error(`[Supabase:${context}]`, error);
  }
}

function actionError(message: string, debug?: string): ActionState {
  return {
    success: false,
    message,
    debug: process.env.NODE_ENV !== "production" ? debug : undefined,
  };
}

async function insertPatientFromForm(formData: FormData) {
  const { supabase, user } = await getPrivateContext();
  const fullName = text(formData, "fullName");

  if (!fullName) {
    return {
      patientId: null,
      error: "missing-name",
      message: "El nombre completo es obligatorio.",
    };
  }

  const { data, error } = await supabase
    .from("patients")
    .insert({
      owner_id: user.id,
      full_name: fullName,
      phone: text(formData, "phone"),
      age: nullableInteger(formData, "age"),
      main_injury: text(formData, "mainInjury"),
      status: patientStatus(formData),
      start_date: text(formData, "startDate"),
      referred_by: text(formData, "referredBy"),
      notes: text(formData, "notes"),
    })
    .select("id")
    .single();

  if (error || !data) {
    logSupabaseError("createPatient", error);
    return {
      patientId: null,
      error: "create-failed",
      message: "No se pudo crear el paciente.",
      debug: error?.message,
    };
  }

  return { patientId: data.id as string, error: null, message: null };
}

export async function createPatient(formData: FormData) {
  const result = await insertPatientFromForm(formData);

  if (result.error || !result.patientId) {
    redirect(`/private/pacientes/nuevo?error=${result.error}`);
  }

  revalidatePath("/private/pacientes");
  redirect(`/private/pacientes/${result.patientId}?success=patient-created`);
}

export async function createPatientState(
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const result = await insertPatientFromForm(formData);

  if (result.error || !result.patientId) {
    return actionError(result.message ?? "No se pudo crear el paciente.", result.debug);
  }

  revalidatePath("/private/pacientes");
  redirect(`/private/pacientes/${result.patientId}?success=patient-created`);
}

export async function updatePatient(patientId: string, formData: FormData) {
  const { supabase, user } = await getPrivateContext();
  const fullName = text(formData, "fullName");

  if (!fullName) {
    redirect(`/private/pacientes/${patientId}/editar?error=missing-name`);
  }

  const { error } = await supabase
    .from("patients")
    .update({
      full_name: fullName,
      phone: text(formData, "phone"),
      age: nullableInteger(formData, "age"),
      main_injury: text(formData, "mainInjury"),
      status: patientStatus(formData),
      start_date: text(formData, "startDate"),
      referred_by: text(formData, "referredBy"),
      notes: text(formData, "notes"),
      updated_at: new Date().toISOString(),
    })
    .eq("id", patientId)
    .eq("owner_id", user.id);

  if (error) {
    logSupabaseError("updatePatient", error);
    redirect(`/private/pacientes/${patientId}/editar?error=update-failed`);
  }

  revalidatePath("/private/pacientes");
  revalidatePath(`/private/pacientes/${patientId}`);
  redirect(`/private/pacientes/${patientId}?success=patient-updated`);
}

export async function createAppointment(formData: FormData) {
  const { supabase, user } = await getPrivateContext();
  const patientId = text(formData, "patientId");

  if (!patientId) {
    redirect("/private/agenda/nueva?error=missing-fields");
  }

  const { data: patient } = await supabase
    .from("patients")
    .select("full_name")
    .eq("owner_id", user.id)
    .eq("id", patientId)
    .maybeSingle();

  const result = await insertAppointmentForPatient(
    formData,
    patientId,
    patient?.full_name ?? null,
  );

  if (!result.success) {
    redirect("/private/agenda/nueva?error=create-failed");
  }

  revalidatePath("/private/agenda");
  revalidatePath("/private");
  redirect("/private/agenda?success=appointment-created");
}

async function insertAppointmentForPatient(
  formData: FormData,
  patientId: string,
  patientName: string | null,
) {
  const { supabase, user } = await getPrivateContext();
  const date = text(formData, "date");
  const time = text(formData, "time");
  const status = appointmentStatus(formData);

  if (!patientId || !date || !time) {
    return {
      success: false,
      message: "Selecciona paciente, fecha y hora.",
    };
  }

  if (!validateAppointmentTime(time)) {
    return actionError("El horario debe estar entre 7:00 y 21:00.");
  }

  if (!status) {
    return actionError("No se pudo crear la cita. Revisa el estado de la cita.");
  }

  const { data: existingAppointment, error: existingError } = await supabase
    .from("appointments")
    .select("id")
    .eq("owner_id", user.id)
    .eq("appointment_date", date)
    .eq("appointment_time", time)
    .in("status", ["pending", "confirmed"])
    .maybeSingle();

  if (existingError) {
    logSupabaseError("checkAppointmentDuplicate", existingError);
    return actionError("No se pudo revisar la disponibilidad de la agenda.");
  }

  if (existingAppointment) {
    return actionError(
      "Ya existe una cita en ese horario. Revisa la agenda antes de guardar.",
    );
  }


  const { error } = await supabase.from("appointments").insert({
    owner_id: user.id,
    patient_id: patientId,
    patient_name: patientName,
    appointment_date: date,
    appointment_time: time,
    duration_minutes: numberValue(formData, "durationMinutes", 60),
    status,
    reason: text(formData, "reason"),
    notes: text(formData, "appointmentNotes") ?? text(formData, "notes"),
  });

  if (error) {
    logSupabaseError("createAppointment", error);
    return actionError(
      "No se pudo crear la cita. Revisa el estado de la cita.",
      error.message,
    );
  }

  await supabase
    .from("patients")
    .update({ next_appointment_date: date, updated_at: new Date().toISOString() })
    .eq("owner_id", user.id)
    .eq("id", patientId);

  return { success: true, message: null };
}

export async function createAppointmentState(
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const patientId = text(formData, "patientId");
  if (!patientId) {
    return actionError("Selecciona un paciente.");
  }

  const { supabase, user } = await getPrivateContext();
  const { data: patient, error: patientError } = await supabase
    .from("patients")
    .select("full_name")
    .eq("owner_id", user.id)
    .eq("id", patientId)
    .maybeSingle();

  if (patientError || !patient) {
    logSupabaseError("getPatientForAppointment", patientError);
    return actionError("No se pudo encontrar el paciente.", patientError?.message);
  }

  const result = await insertAppointmentForPatient(
    formData,
    patientId,
    patient.full_name,
  );

  if (!result.success) {
    return result;
  }

  revalidatePath("/private/agenda");
  revalidatePath("/private");
  redirect("/private/agenda?success=appointment-created");
}

export async function createPatientAndAppointmentState(
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const patientResult = await insertPatientFromForm(formData);

  if (patientResult.error || !patientResult.patientId) {
    return actionError(
      patientResult.message ?? "No se pudo crear el paciente.",
      patientResult.debug,
    );
  }

  const result = await insertAppointmentForPatient(
    formData,
    patientResult.patientId,
    text(formData, "fullName"),
  );

  if (!result.success) {
    const { supabase, user } = await getPrivateContext();
    await supabase
      .from("patients")
      .delete()
      .eq("owner_id", user.id)
      .eq("id", patientResult.patientId);

    return result;
  }

  revalidatePath("/private/agenda");
  revalidatePath("/private/pacientes");
  revalidatePath("/private");
  redirect("/private/agenda?success=appointment-created");
}

export async function updateAppointmentStatus(
  appointmentId: string,
  status: AppointmentStatus,
) {
  if (!appointmentStatuses.includes(status)) {
    redirect("/private/agenda?error=invalid-appointment-status");
  }

  const { supabase, user } = await getPrivateContext();

  await supabase
    .from("appointments")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", appointmentId)
    .eq("owner_id", user.id);

  revalidatePath("/private/agenda");
  revalidatePath("/private");
  redirect("/private/agenda?success=appointment-updated");
}

export async function updatePatientStatus(patientId: string, formData: FormData) {
  const status = text(formData, "patientStatus") as PatientStatus | null;

  if (!status || !patientStatuses.includes(status)) {
    redirect(`/private/pacientes/${patientId}?error=invalid-patient-status`);
  }

  const { supabase, user } = await getPrivateContext();
  const { error } = await supabase
    .from("patients")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", patientId)
    .eq("owner_id", user.id);

  if (error) {
    logSupabaseError("updatePatientStatus", error);
    redirect(`/private/pacientes/${patientId}?error=update-failed`);
  }

  revalidatePath("/private/pacientes");
  revalidatePath(`/private/pacientes/${patientId}`);
  redirect(`/private/pacientes/${patientId}?success=patient-status-updated`);
}

export async function deletePatient(patientId: string, formData: FormData) {
  const confirmation = text(formData, "confirmation");

  if (confirmation !== "ELIMINAR") {
    redirect(`/private/pacientes/${patientId}/editar?error=delete-confirmation`);
  }

  const { supabase, user } = await getPrivateContext();
  const { error } = await supabase
    .from("patients")
    .delete()
    .eq("id", patientId)
    .eq("owner_id", user.id);

  if (error) {
    logSupabaseError("deletePatient", error);
    redirect(`/private/pacientes/${patientId}/editar?error=delete-failed`);
  }

  revalidatePath("/private");
  revalidatePath("/private/pacientes");
  revalidatePath("/private/agenda");
  revalidatePath("/private/sesiones");
  revalidatePath("/private/bonos");
  redirect("/private/pacientes?success=patient-deleted");
}

async function discountActivePackageForPatient(patientId: string) {
  const { supabase, user } = await getPrivateContext();
  const { data: activePackage, error } = await supabase
    .from("session_packages")
    .select("id,used_sessions,total_sessions,remaining_sessions")
    .eq("owner_id", user.id)
    .eq("patient_id", patientId)
    .eq("status", "active")
    .gt("remaining_sessions", 0)
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error) {
    logSupabaseError("findActivePackage", error);
    return;
  }

  if (!activePackage) {
    return;
  }

  const totalSessions = Number(activePackage.total_sessions ?? 5);
  const usedSessions = Math.min(Number(activePackage.used_sessions ?? 0) + 1, totalSessions);
  const remainingSessions = Math.max(totalSessions - usedSessions, 0);

  const { error: updateError } = await supabase
    .from("session_packages")
    .update({
      used_sessions: usedSessions,
      remaining_sessions: remainingSessions,
      status: remainingSessions === 0 ? "exhausted" : "active",
      updated_at: new Date().toISOString(),
    })
    .eq("owner_id", user.id)
    .eq("id", activePackage.id);

  if (updateError) {
    logSupabaseError("discountActivePackage", updateError);
  }
}

export async function createTreatmentSession(formData: FormData) {
  const { supabase, user } = await getPrivateContext();
  const patientId = text(formData, "patientId");
  const appointmentId = text(formData, "appointmentId");
  const date = text(formData, "date");
  const treatmentSummary = text(formData, "treatmentSummary");

  if (!patientId || !date || !treatmentSummary) {
    redirect("/private/sesiones/nueva?error=missing-fields");
  }

  const painBefore = nullablePainValue(formData, "painBefore");
  const painAfter = nullablePainValue(formData, "painAfter");
  const durationMinutes = numberValue(formData, "durationMinutes", 60);
  const basePrice =
    moneyValue(formData, "basePrice") ??
    (durationMinutes === 30 ? 30 : durationMinutes === 60 ? 60 : 0);
  const discountAmount = moneyValue(formData, "discountAmount") ?? 0;
  const manualAmountPaid = moneyValue(formData, "amountPaid");
  const amountPaid =
    manualAmountPaid ?? Math.max(Number((basePrice - discountAmount).toFixed(2)), 0);
  const selectedPaymentMethod = paymentMethod(formData);

  if (!painBefore.valid || !painAfter.valid) {
    redirect("/private/sesiones/nueva?error=invalid-pain");
  }

  if (
    durationMinutes <= 0 ||
    basePrice < 0 ||
    discountAmount < 0 ||
    amountPaid < 0
  ) {
    redirect("/private/sesiones/nueva?error=invalid-payment");
  }

  if (appointmentId) {
    const { data: existingSession, error: existingSessionError } = await supabase
      .from("treatment_sessions")
      .select("id")
      .eq("owner_id", user.id)
      .eq("appointment_id", appointmentId)
      .maybeSingle();

    if (existingSessionError) {
      logSupabaseError("checkSessionDuplicate", existingSessionError);
      redirect("/private/sesiones/nueva?error=create-failed");
    }

    if (existingSession) {
      redirect("/private/sesiones/nueva?error=session-exists");
    }
  }

  const sessionPayload = {
    owner_id: user.id,
    patient_id: patientId,
    session_date: date,
    reason: text(formData, "reason"),
    treatment_summary: treatmentSummary,
    used_indiba: text(formData, "usedIndiba") === "yes",
    pain_before: painBefore.value,
    pain_after: painAfter.value,
    exercises_given: text(formData, "exercisesGiven"),
    evolution_notes: text(formData, "evolutionNotes"),
    next_recommendation: text(formData, "nextRecommendation"),
    duration_minutes: durationMinutes,
    base_price: basePrice,
    discount_amount: discountAmount,
    amount_paid: amountPaid,
    payment_method: selectedPaymentMethod,
    payment_notes: text(formData, "paymentNotes"),
    ...(appointmentId ? { appointment_id: appointmentId } : {}),
  };

  const { error } = await supabase.from("treatment_sessions").insert(sessionPayload);

  if (error) {
    logSupabaseError("createTreatmentSession", error);
    redirect("/private/sesiones/nueva?error=create-failed");
  }

  await supabase
    .from("patients")
    .update({ last_session_date: date, updated_at: new Date().toISOString() })
    .eq("owner_id", user.id)
    .eq("id", patientId);

  if (text(formData, "discountActivePackage") === "yes") {
    await discountActivePackageForPatient(patientId);
  }

  if (appointmentId) {
    await supabase
      .from("appointments")
      .update({ status: "completed", updated_at: new Date().toISOString() })
      .eq("owner_id", user.id)
      .eq("id", appointmentId)
      .eq("patient_id", patientId);
  }

  revalidatePath("/private/sesiones");
  revalidatePath("/private/pacientes");
  revalidatePath("/private/bonos");
  revalidatePath("/private/agenda");
  revalidatePath("/private");
  redirect("/private/sesiones?success=session-created");
}

export async function updateSessionPaymentMethod(
  sessionId: string,
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const value = formData.get("paymentMethod");
  if (
    typeof value !== "string" ||
    (value !== "" && !paymentMethods.includes(value as PaymentMethod))
  ) {
    return actionError("Selecciona un método de pago válido.");
  }

  const { supabase, user } = await getPrivateContext();
  const { data, error } = await supabase
    .from("treatment_sessions")
    .update({
      payment_method: value || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", sessionId)
    .eq("owner_id", user.id)
    .select("patient_id")
    .maybeSingle();

  if (error || !data) {
    logSupabaseError("updateSessionPaymentMethod", error);
    return actionError("No se pudo actualizar el método de pago. Inténtalo de nuevo.");
  }

  revalidatePath("/private/sesiones");
  revalidatePath("/private/reportes");
  revalidatePath("/private/pacientes");
  if (data.patient_id) {
    revalidatePath(`/private/pacientes/${data.patient_id}`);
  }

  return { success: true, message: "Método de pago actualizado." };
}

export async function deleteTreatmentSession(sessionId: string) {
  const { supabase, user } = await getPrivateContext();
  const { data: session, error: sessionError } = await supabase
    .from("treatment_sessions")
    .select("appointment_id,patient_id")
    .eq("id", sessionId)
    .eq("owner_id", user.id)
    .maybeSingle();

  if (sessionError || !session) {
    logSupabaseError("getTreatmentSessionForDelete", sessionError);
    redirect("/private/sesiones?error=session-delete-failed");
  }

  const { error: deleteError } = await supabase
    .from("treatment_sessions")
    .delete()
    .eq("id", sessionId)
    .eq("owner_id", user.id);

  if (deleteError) {
    logSupabaseError("deleteTreatmentSession", deleteError);
    redirect("/private/sesiones?error=session-delete-failed");
  }

  if (session.appointment_id) {
    await supabase
      .from("appointments")
      .update({ status: "confirmed", updated_at: new Date().toISOString() })
      .eq("id", session.appointment_id)
      .eq("owner_id", user.id)
      .eq("status", "completed");
  }

  if (session.patient_id) {
    const { data: latestSession } = await supabase
      .from("treatment_sessions")
      .select("session_date")
      .eq("owner_id", user.id)
      .eq("patient_id", session.patient_id)
      .order("session_date", { ascending: false })
      .limit(1)
      .maybeSingle();

    await supabase
      .from("patients")
      .update({
        last_session_date: latestSession?.session_date ?? null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", session.patient_id)
      .eq("owner_id", user.id);
  }

  revalidatePath("/private/sesiones");
  revalidatePath("/private/reportes");
  revalidatePath("/private/pacientes");
  revalidatePath("/private/agenda");
  revalidatePath("/private");
  redirect("/private/sesiones?success=session-deleted");
}

export async function createSessionPackage(formData: FormData) {
  const { supabase, user } = await getPrivateContext();
  const patientId = text(formData, "patientId");
  const packageStatus = text(formData, "status") ?? "active";

  if (!patientId) {
    redirect("/private/bonos/nuevo?error=missing-patient");
  }

  if (!["active", "pending"].includes(packageStatus)) {
    redirect("/private/bonos/nuevo?error=invalid-package-status");
  }

  const { error } = await supabase.from("session_packages").insert({
    owner_id: user.id,
    patient_id: patientId,
    package_name: "Bono de 5 sesiones",
    total_sessions: 5,
    used_sessions: 0,
    remaining_sessions: 5,
    status: packageStatus as PackageStatus,
  });

  if (error) {
    logSupabaseError("createSessionPackage", error);
    redirect("/private/bonos/nuevo?error=create-failed");
  }

  revalidatePath("/private/bonos");
  redirect("/private/bonos?success=package-created");
}

export async function discountSessionPackage(packageId: string) {
  const { supabase, user } = await getPrivateContext();
  const { data } = await supabase
    .from("session_packages")
    .select("used_sessions,total_sessions")
    .eq("owner_id", user.id)
    .eq("id", packageId)
    .maybeSingle();

  if (!data) {
    return;
  }

  const usedSessions = Math.min(
    Number(data.used_sessions ?? 0) + 1,
    Number(data.total_sessions ?? 5),
  );
  const remainingSessions = Math.max(Number(data.total_sessions ?? 5) - usedSessions, 0);

  await supabase
    .from("session_packages")
    .update({
      used_sessions: usedSessions,
      remaining_sessions: remainingSessions,
      status: remainingSessions === 0 ? "exhausted" : "active",
      updated_at: new Date().toISOString(),
    })
    .eq("owner_id", user.id)
    .eq("id", packageId);

  revalidatePath("/private/bonos");
  redirect("/private/bonos?success=package-discounted");
}
