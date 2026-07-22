import Link from "next/link";
import type { Metadata } from "next";
import { CalendarPlus, ClipboardPlus, Pencil } from "lucide-react";
import { EmptyState } from "@/components/private/EmptyState";
import { PatientSummaryCard } from "@/components/private/PatientSummaryCard";
import { PrivateLayout } from "@/components/private/PrivateLayout";
import { ProgressBar } from "@/components/private/ProgressBar";
import { SessionTimeline } from "@/components/private/SessionTimeline";
import { StatusBadge } from "@/components/private/StatusBadge";
import { SubmitButton } from "@/components/private/SubmitButton";
import { SuccessMessage } from "@/components/private/SuccessMessage";
import { WhatsAppLink } from "@/components/private/WhatsAppLink";
import { updatePatientStatus } from "@/lib/private/actions";
import {
  getAppointments,
} from "@/lib/private/appointments";
import { formatAppointmentDateLabel } from "@/lib/private/dateFormat";
import { getPatientById } from "@/lib/private/patients";
import { getSessionPackages } from "@/lib/private/packages";
import { getTreatmentSessionsByPatient } from "@/lib/private/sessions";

export const metadata: Metadata = {
  title: "Ficha de paciente",
};

export default async function PrivatePatientDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string; success?: string }>;
}) {
  const [{ id }, { error, success }] = await Promise.all([params, searchParams]);
  const [patient, appointments, sessionPackages, patientSessions] =
    await Promise.all([
      getPatientById(id),
      getAppointments(),
      getSessionPackages(),
      getTreatmentSessionsByPatient(id),
    ]);

  if (!patient) {
    return (
      <PrivateLayout title="Ficha del paciente">
        <EmptyState message="No se encontró este paciente." />
      </PrivateLayout>
    );
  }

  const activePackage = sessionPackages.find(
    (sessionPackage) =>
      sessionPackage.patientId === patient.id &&
      sessionPackage.status === "active",
  );
  const nextAppointment = appointments.find(
    (appointment) => appointment.patientId === patient.id,
  );
  const patientAppointments = appointments.filter(
    (appointment) =>
      appointment.patientId === patient.id &&
      appointment.status !== "cancelled" &&
      appointment.status !== "completed",
  );
  const lastSession = patientSessions[0];
  const nextAppointmentLabel = nextAppointment
    ? `${nextAppointment.date} · ${nextAppointment.time}`
    : "Pendiente";

  return (
    <PrivateLayout title="Ficha del paciente">
      <SuccessMessage code={success} />
      {error ? (
        <p className="mb-5 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          No se pudo actualizar el paciente. Inténtalo de nuevo.
        </p>
      ) : null}
      <Link
        className="mb-5 inline-flex text-sm font-semibold text-[#0F3D3A] hover:text-[var(--brand-hover)]"
        href="/private/pacientes"
      >
        Volver a pacientes
      </Link>

      <PatientSummaryCard
        lastSession={lastSession}
        nextAppointmentLabel={nextAppointmentLabel}
        activePackage={activePackage}
        patient={patient}
      />

      <div className="mt-6 grid gap-6 xl:grid-cols-[0.72fr_1fr]">
        <section className="rounded-lg border border-[var(--line)] bg-white p-6 shadow-[0_14px_34px_rgba(35,40,39,0.035)]">
          <h2 className="text-xl font-semibold">Acciones</h2>
          <div className="mt-5 grid gap-3">
            <Link
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#0F3D3A] px-4 text-sm font-semibold text-white"
              href={`/private/sesiones/nueva?patientId=${patient.id}`}
            >
              <ClipboardPlus className="size-4" />
              Registrar sesión
            </Link>
            <Link
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[var(--line)] bg-white px-4 text-sm font-semibold"
              href={`/private/agenda/nueva?patientId=${patient.id}`}
            >
              <CalendarPlus className="size-4 text-[var(--brand-hover)]" />
              Agendar cita
            </Link>
            <Link
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[var(--line)] bg-white px-4 text-sm font-semibold"
              href={`/private/pacientes/${patient.id}/editar`}
            >
              <Pencil className="size-4 text-[var(--brand-hover)]" />
              Editar datos
            </Link>
            <WhatsAppLink label="Contactar por WhatsApp" phone={patient.phone} />
          </div>
        </section>

        <section className="grid gap-6">
          <div className="rounded-lg border border-[var(--line)] bg-white p-6 shadow-[0_14px_34px_rgba(35,40,39,0.035)]">
            <h2 className="text-xl font-semibold">Estado del paciente</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
              Activo, en pausa, seguimiento o alta. El valor guardado se
              mantiene seguro para Supabase.
            </p>
            <form
              action={updatePatientStatus.bind(null, patient.id)}
              className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto]"
            >
              <select
                className="min-h-12 rounded-lg border border-[var(--line)] bg-[#FAF8F4] px-4 text-sm"
                defaultValue={patient.status}
                name="patientStatus"
              >
                <option value="active">Activo</option>
                <option value="paused">En pausa</option>
                <option value="follow_up">En seguimiento</option>
                <option value="discharged">Alta</option>
              </select>
              <SubmitButton>Guardar estado</SubmitButton>
            </form>
          </div>

          <div>
          <h2 className="mb-4 text-xl font-semibold">Próximas citas</h2>
          {patientAppointments.length ? (
            <div className="grid gap-3">
              {patientAppointments.slice(0, 3).map((appointment) => (
                <div
                  className="rounded-lg border border-[var(--line)] bg-white p-4 shadow-[0_14px_34px_rgba(35,40,39,0.035)]"
                  key={appointment.id}
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="font-semibold">
                      {formatAppointmentDateLabel(appointment.date, appointment.time)}
                    </p>
                    <StatusBadge status={appointment.status} />
                  </div>
                  <p className="mt-2 text-sm text-[var(--muted)]">
                    {appointment.reason || "Cita de fisioterapia"}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState message="No hay próximas citas activas para este paciente." />
          )}
          </div>
        </section>
      </div>

      <section className="mt-6">
        <h2 className="mb-4 text-xl font-semibold">Sesiones recientes</h2>
        {patientSessions.length ? (
          <SessionTimeline sessions={patientSessions.slice(0, 4)} />
        ) : (
          <EmptyState message="Aún no hay sesiones registradas para este paciente." />
        )}
      </section>

      <section className="mt-6 rounded-lg border border-[var(--line)] bg-white p-6 shadow-[0_14px_34px_rgba(35,40,39,0.035)]">
        <h2 className="text-xl font-semibold">Bono activo</h2>
        {activePackage ? (
          <div className="mt-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-semibold">{activePackage.packageName}</p>
              <StatusBadge status={activePackage.status} />
            </div>
            <p className="mt-3 text-sm text-[var(--muted)]">
              {activePackage.usedSessions} usadas ·{" "}
              {activePackage.remainingSessions} restantes de{" "}
              {activePackage.totalSessions}
            </p>
            <div className="mt-4">
              <ProgressBar
                value={
                  (activePackage.usedSessions / activePackage.totalSessions) *
                  100
                }
              />
            </div>
          </div>
        ) : (
          <EmptyState message="Este paciente no tiene bono activo." />
        )}
      </section>
    </PrivateLayout>
  );
}
