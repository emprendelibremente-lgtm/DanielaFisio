import Link from "next/link";
import type { Appointment } from "@/types/private";
import { updateAppointmentStatus } from "@/lib/private/actions";
import { formatAppointmentDateLabel } from "@/lib/private/dateFormat";
import { SubmitButton } from "./SubmitButton";
import { StatusBadge } from "./StatusBadge";

export function AppointmentCard({ appointment }: { appointment: Appointment }) {
  return (
    <article className="rounded-lg border border-[var(--line)] bg-white p-5 shadow-[0_14px_34px_rgba(35,40,39,0.035)]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-[var(--text)]">
            {appointment.patientName}
          </p>
          <p className="mt-1 text-sm text-[var(--muted)]">
            {formatAppointmentDateLabel(appointment.date, appointment.time)} ·{" "}
            {appointment.durationMinutes} min
          </p>
          {appointment.reason ? (
            <p className="mt-1 text-sm text-[var(--muted)]">{appointment.reason}</p>
          ) : null}
        </div>
        <StatusBadge status={appointment.status} />
      </div>
      {appointment.notes ? (
        <p className="mt-4 border-t border-[var(--line)] pt-4 text-sm leading-6 text-[var(--muted)]">
          {appointment.notes}
        </p>
      ) : null}
      <div className="mt-4 flex flex-wrap gap-2">
        {appointment.status !== "completed" && appointment.status !== "cancelled" ? (
          <Link
            className="inline-flex min-h-10 items-center rounded-full bg-[#0F3D3A] px-4 text-xs font-semibold text-white"
            href={`/private/sesiones/nueva?patientId=${appointment.patientId}&appointmentId=${appointment.id}`}
          >
            Registrar sesión
          </Link>
        ) : null}
        {appointment.status === "pending" ? (
          <form action={updateAppointmentStatus.bind(null, appointment.id, "confirmed")}>
            <SubmitButton className="min-h-10 rounded-full border border-[var(--line)] bg-[#FAF8F4] px-4 text-xs font-semibold text-[var(--muted)] transition hover:border-[var(--brand-hover)] hover:text-[#0F3D3A]">
              Confirmar
            </SubmitButton>
          </form>
        ) : null}
        {appointment.status !== "cancelled" && appointment.status !== "completed" ? (
          <form action={updateAppointmentStatus.bind(null, appointment.id, "cancelled")}>
            <SubmitButton className="min-h-10 rounded-full border border-[var(--line)] bg-white px-4 text-xs font-semibold text-[var(--muted)] transition hover:border-rose-200 hover:text-rose-700">
              Cancelar
            </SubmitButton>
          </form>
        ) : null}
      </div>
    </article>
  );
}
