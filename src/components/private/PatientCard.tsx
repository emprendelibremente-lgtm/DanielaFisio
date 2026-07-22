import Link from "next/link";
import { CalendarPlus, ClipboardPlus } from "lucide-react";
import type { Patient } from "@/types/private";
import { StatusBadge } from "./StatusBadge";
import { WhatsAppLink } from "./WhatsAppLink";

export function PatientCard({ patient }: { patient: Patient }) {
  return (
    <article className="rounded-lg border border-[var(--line)] bg-white p-5 shadow-[0_14px_34px_rgba(35,40,39,0.035)]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold">{patient.fullName}</h2>
          <p className="mt-1 text-sm text-[var(--muted)]">
            {patient.mainInjury}
          </p>
        </div>
        <StatusBadge status={patient.status} />
      </div>
      <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-[var(--muted)]">Última sesión</dt>
          <dd className="font-medium">{patient.lastSessionDate || "Sin datos"}</dd>
        </div>
        <div>
          <dt className="text-[var(--muted)]">Próxima cita</dt>
          <dd className="font-medium">
            {patient.nextAppointmentDate || "Pendiente"}
          </dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-[var(--muted)]">Teléfono</dt>
          <dd className="font-medium">{patient.phone || "Sin teléfono"}</dd>
        </div>
      </dl>
      <div className="mt-5 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
        <Link
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#0F3D3A] px-4 text-sm font-semibold text-white transition hover:bg-[#101918]"
          href={`/private/pacientes/${patient.id}`}
        >
          Ver ficha
        </Link>
        <Link
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[var(--line)] bg-white px-4 text-sm font-semibold"
          href={`/private/agenda/nueva?patientId=${patient.id}`}
        >
          <CalendarPlus className="size-4 text-[var(--brand-hover)]" />
          Agendar
        </Link>
        <Link
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[var(--line)] bg-white px-4 text-sm font-semibold"
          href={`/private/sesiones/nueva?patientId=${patient.id}`}
        >
          <ClipboardPlus className="size-4 text-[var(--brand-hover)]" />
          Sesión
        </Link>
        <WhatsAppLink phone={patient.phone} />
      </div>
    </article>
  );
}
