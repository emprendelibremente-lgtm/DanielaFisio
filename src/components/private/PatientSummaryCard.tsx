import type { Patient, SessionPackage, TreatmentSession } from "@/types/private";
import { ProgressBar } from "./ProgressBar";
import { StatusBadge } from "./StatusBadge";

export function PatientSummaryCard({
  patient,
  lastSession,
  nextAppointmentLabel,
  activePackage,
}: {
  patient: Patient;
  lastSession?: TreatmentSession;
  nextAppointmentLabel: string;
  activePackage?: SessionPackage;
}) {
  return (
    <section className="rounded-lg border border-[var(--line)] bg-white p-6 shadow-[0_14px_34px_rgba(35,40,39,0.035)]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-hover)]">
            Resumen del paciente
          </p>
          <h2 className="mt-3 text-3xl font-semibold">{patient.fullName}</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            {patient.age} años · {patient.phone}
          </p>
        </div>
        <StatusBadge status={patient.status} />
      </div>
      <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2 xl:grid-cols-3">
        <div>
          <dt className="text-[var(--muted)]">Lesión principal</dt>
          <dd className="mt-1 font-medium">{patient.mainInjury}</dd>
        </div>
        <div>
          <dt className="text-[var(--muted)]">Fecha de inicio</dt>
          <dd className="mt-1 font-medium">{patient.startDate}</dd>
        </div>
        <div>
          <dt className="text-[var(--muted)]">Próxima cita</dt>
          <dd className="mt-1 font-medium">{nextAppointmentLabel}</dd>
        </div>
        <div>
          <dt className="text-[var(--muted)]">Última sesión</dt>
          <dd className="mt-1 font-medium">
            {patient.lastSessionDate || "Sin datos"}
          </dd>
        </div>
        <div>
          <dt className="text-[var(--muted)]">Último dolor registrado</dt>
          <dd className="mt-1 font-medium">
            {lastSession ? `${lastSession.painAfter}/10` : "Sin datos"}
          </dd>
        </div>
        <div>
          <dt className="text-[var(--muted)]">Derivado por</dt>
          <dd className="mt-1 font-medium">{patient.referredBy}</dd>
        </div>
      </dl>
      <div className="mt-6 rounded-lg bg-[#FAF8F4] p-4">
        <p className="text-sm font-semibold">Resumen de evolución</p>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
          {patient.notes}
        </p>
      </div>
      {activePackage ? (
        <div className="mt-4 rounded-lg border border-[var(--brand)]/35 bg-[var(--brand)]/12 p-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold">Bono activo</p>
              <p className="mt-1 text-sm text-[var(--muted)]">
                {activePackage.remainingSessions} restantes de{" "}
                {activePackage.totalSessions}
              </p>
            </div>
            <StatusBadge status={activePackage.status} />
          </div>
          <div className="mt-4">
            <ProgressBar
              value={
                (activePackage.usedSessions / activePackage.totalSessions) *
                100
              }
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
