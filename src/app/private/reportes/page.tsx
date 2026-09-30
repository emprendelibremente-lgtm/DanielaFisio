import type { Metadata } from "next";
import Link from "next/link";
import { EmptyState } from "@/components/private/EmptyState";
import { PrivateLayout } from "@/components/private/PrivateLayout";
import { ReportDownloadButton } from "@/components/private/ReportDownloadButton";
import { StatCard } from "@/components/private/StatCard";
import { getTreatmentSessions } from "@/lib/private/sessions";
import {
  currentMonthValue,
  euro,
  filterSessionsByMonth,
  monthTitle,
  paymentMethodLabels,
  sessionReportSummary,
  therapyTotals,
} from "@/lib/private/reporting";
import {
  CalendarDays,
  Clock3,
  Euro,
  Pencil,
  Percent,
  UserRoundCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Reportes privados",
};

export default async function PrivateReportsPage({
  searchParams,
}: {
  searchParams: Promise<{ month?: string }>;
}) {
  const [{ month }, sessions] = await Promise.all([
    searchParams,
    getTreatmentSessions(),
  ]);
  const selectedMonth = month ?? currentMonthValue();
  const monthlySessions = filterSessionsByMonth(sessions, selectedMonth);
  const selectedMonthTitle = monthTitle(selectedMonth);
  const summary = sessionReportSummary(monthlySessions);
  const totalsByTherapy = therapyTotals(monthlySessions, {
    hideOptionalZero: true,
  });
  const fileName = `reporte-sesiones-${selectedMonth}.xlsx`;

  return (
    <PrivateLayout title="Reportes">
      <section className="mb-6 rounded-lg border border-[var(--line)] bg-white p-6 shadow-[0_14px_34px_rgba(35,40,39,0.035)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-hover)]">
              Control mensual
            </p>
            <h2 className="mt-3 text-2xl font-semibold capitalize">
              {selectedMonthTitle}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">
              Resumen interno de sesiones realizadas y cobros registrados. No
              incluye notas clínicas extensas ni genera facturas.
            </p>
          </div>
          <form className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              className="min-h-11 rounded-lg border border-[var(--line)] bg-[#FAF8F4] px-4 text-sm"
              defaultValue={selectedMonth}
              name="month"
              type="month"
            />
            <button className="min-h-11 rounded-full border border-[var(--line)] bg-white px-5 text-sm font-semibold">
              Ver mes
            </button>
            <ReportDownloadButton
              fileName={fileName}
              monthLabel={selectedMonthTitle}
              sessions={monthlySessions}
            />
          </form>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          detail="Sesiones registradas en el mes."
          icon={CalendarDays}
          title="Sesiones"
          value={summary.totalSessions}
        />
        <StatCard
          detail="Importe cobrado según sesiones."
          icon={Euro}
          title="Total cobrado"
          value={euro(summary.totalPaid)}
        />
        <StatCard
          detail="Descuentos aplicados manualmente."
          icon={Percent}
          title="Descuentos"
          value={euro(summary.totalDiscounts)}
        />
        <StatCard
          detail="Pacientes distintos atendidos."
          icon={UserRoundCheck}
          title="Pacientes"
          value={summary.patientsCount}
        />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          detail="Sesiones de media hora."
          icon={Clock3}
          title="30 minutos"
          value={summary.thirtyMinuteSessions}
        />
        <StatCard
          detail="Sesiones de una hora."
          icon={Clock3}
          title="60 minutos"
          value={summary.sixtyMinuteSessions}
        />
        <StatCard
          detail="Duraciones personalizadas."
          icon={Clock3}
          title="Personalizadas"
          value={summary.customSessions}
        />
      </div>

      <section className="mt-8 rounded-lg border border-[var(--line)] bg-white p-6 shadow-[0_14px_34px_rgba(35,40,39,0.035)]">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-hover)]">
              Totalización
            </p>
            <h2 className="mt-3 text-xl font-semibold">
              Por tipo de terapia
            </h2>
          </div>
          <p className="text-sm font-semibold text-[#0F3D3A]">
            Total mensual generado: {euro(summary.totalPaid)}
          </p>
        </div>

        <div className="mt-5 overflow-hidden rounded-lg border border-[var(--line)]">
          <div className="hidden grid-cols-[1.4fr_0.6fr_0.8fr_0.9fr] bg-[#0F3D3A] px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-white lg:grid">
            <span>Tipo de terapia</span>
            <span className="text-center">Cantidad</span>
            <span>Precio unitario</span>
            <span>Total generado</span>
          </div>
          <div className="divide-y divide-[var(--line)]">
            {totalsByTherapy.map((row) => (
              <article
                className="grid gap-2 bg-[#FAF8F4] px-4 py-4 text-sm lg:grid-cols-[1.4fr_0.6fr_0.8fr_0.9fr] lg:items-center"
                key={row.id}
              >
                <span className="font-semibold">{row.label}</span>
                <span className="lg:text-center">{row.quantity}</span>
                <span>
                  {row.priceUnit === null ? "Variable" : euro(row.priceUnit)}
                </span>
                <span className="font-semibold text-[#0F3D3A]">
                  {euro(row.total)}
                </span>
              </article>
            ))}
            <article className="grid gap-2 bg-[var(--brand)]/20 px-4 py-4 text-sm font-semibold lg:grid-cols-[1.4fr_0.6fr_0.8fr_0.9fr] lg:items-center">
              <span>Total mensual generado</span>
              <span className="lg:text-center">{summary.totalSessions}</span>
              <span />
              <span className="text-[#0F3D3A]">{euro(summary.totalPaid)}</span>
            </article>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Sesiones del mes</h2>
        {monthlySessions.length ? (
          <div className="overflow-hidden rounded-lg border border-[var(--line)] bg-white shadow-[0_14px_34px_rgba(35,40,39,0.035)]">
            <div className="hidden grid-cols-[0.75fr_1.05fr_0.65fr_0.9fr_0.65fr_0.65fr_0.7fr_0.8fr_0.7fr] border-b border-[var(--line)] bg-[#F5EFE6]/60 px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted)] lg:grid">
              <span>Fecha</span>
              <span>Paciente</span>
              <span>Duración</span>
              <span>Motivo</span>
              <span>Base</span>
              <span>Descuento</span>
              <span>Total</span>
              <span>Método</span>
              <span>Acciones</span>
            </div>
            <div className="divide-y divide-[var(--line)]">
              {monthlySessions.map((session) => (
                <article
                  className="grid gap-2 px-4 py-4 text-sm lg:grid-cols-[0.75fr_1.05fr_0.65fr_0.9fr_0.65fr_0.65fr_0.7fr_0.8fr_0.7fr] lg:items-center"
                  key={session.id}
                >
                  <span className="font-medium">{session.date}</span>
                  <span>{session.patientName}</span>
                  <span>{session.durationMinutes} min</span>
                  <span className="text-[var(--muted)]">
                    {session.reason || "Sesión"}
                  </span>
                  <span>{euro(session.basePrice)}</span>
                  <span>{euro(session.discountAmount)}</span>
                  <span className="font-semibold text-[#0F3D3A]">
                    {euro(session.amountPaid)}
                  </span>
                  <Link
                    className="font-medium text-[#0F3D3A] underline underline-offset-2 hover:text-[var(--brand-hover)]"
                    href={`/private/sesiones#sesion-${session.id}`}
                    title="Cambiar método de pago"
                  >
                    {paymentMethodLabels[session.paymentMethod]}
                  </Link>
                  <Link
                    className="inline-flex min-h-9 items-center justify-center gap-2 rounded-full bg-[#0F3D3A] px-3 text-xs font-semibold text-white transition hover:bg-[#101918]"
                    href={`/private/sesiones/${session.id}/editar`}
                  >
                    <Pencil className="size-3.5" />
                    Editar
                  </Link>
                </article>
              ))}
            </div>
          </div>
        ) : (
          <EmptyState message="No hay sesiones registradas en este mes." />
        )}
      </section>
    </PrivateLayout>
  );
}
