import type {
  Appointment,
  Patient,
  SessionPackage,
  TreatmentSession,
} from "@/types/private";

export type PatientRow = {
  id: string;
  full_name: string;
  phone: string | null;
  age: number | null;
  main_injury: string | null;
  status: Patient["status"];
  start_date: string | null;
  last_session_date: string | null;
  next_appointment_date: string | null;
  referred_by: string | null;
  notes: string | null;
};

export type AppointmentRow = {
  id: string;
  patient_id: string;
  patient_name: string | null;
  appointment_date: string;
  appointment_time: string;
  duration_minutes: number | null;
  status: Appointment["status"];
  reason: string | null;
  notes: string | null;
};

export type TreatmentSessionRow = {
  id: string;
  patient_id: string;
  appointment_id?: string | null;
  patient_name?: string | null;
  session_date: string;
  reason: string | null;
  treatment_summary: string | null;
  used_indiba: boolean | null;
  pain_before: number | null;
  pain_after: number | null;
  exercises_given: string | null;
  evolution_notes: string | null;
  next_recommendation: string | null;
  patients?: { full_name: string | null } | null;
};

export type SessionPackageRow = {
  id: string;
  patient_id: string;
  patient_name?: string | null;
  package_name: string | null;
  total_sessions: number | null;
  used_sessions: number | null;
  remaining_sessions: number | null;
  status: SessionPackage["status"];
  patients?: { full_name: string | null } | null;
};

export function mapPatient(row: PatientRow): Patient {
  return {
    id: row.id,
    fullName: row.full_name,
    phone: row.phone ?? "",
    age: row.age ?? 0,
    mainInjury: row.main_injury ?? "",
    status: row.status,
    startDate: row.start_date ?? "",
    lastSessionDate: row.last_session_date ?? "",
    nextAppointmentDate: row.next_appointment_date ?? "",
    referredBy: row.referred_by ?? "",
    notes: row.notes ?? "",
  };
}

export function mapAppointment(row: AppointmentRow): Appointment {
  return {
    id: row.id,
    patientId: row.patient_id,
    patientName: row.patient_name ?? "",
    date: row.appointment_date,
    time: row.appointment_time.slice(0, 5),
    durationMinutes: row.duration_minutes ?? 60,
    status: row.status,
    reason: row.reason ?? "",
    notes: row.notes ?? "",
  };
}

export function mapTreatmentSession(row: TreatmentSessionRow): TreatmentSession {
  return {
    id: row.id,
    patientId: row.patient_id,
    appointmentId: row.appointment_id ?? "",
    patientName: row.patient_name ?? row.patients?.full_name ?? "",
    date: row.session_date,
    reason: row.reason ?? "",
    treatmentSummary: row.treatment_summary ?? "",
    usedIndiba: Boolean(row.used_indiba),
    painBefore: row.pain_before ?? 0,
    painAfter: row.pain_after ?? 0,
    exercisesGiven: row.exercises_given ?? "",
    evolutionNotes: row.evolution_notes ?? "",
    nextRecommendation: row.next_recommendation ?? "",
  };
}

export function mapSessionPackage(row: SessionPackageRow): SessionPackage {
  return {
    id: row.id,
    patientId: row.patient_id,
    patientName: row.patient_name ?? row.patients?.full_name ?? "",
    packageName: row.package_name ?? "Bono de 5 sesiones",
    totalSessions: row.total_sessions ?? 5,
    usedSessions: row.used_sessions ?? 0,
    remainingSessions: row.remaining_sessions ?? 5,
    status: row.status,
  };
}
