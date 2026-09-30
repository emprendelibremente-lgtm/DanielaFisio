import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ErrorMessage } from "@/components/private/ErrorMessage";
import { PatientSelect } from "@/components/private/PatientSelect";
import { PrivateLayout } from "@/components/private/PrivateLayout";
import { SessionFinancialFields } from "@/components/private/SessionFinancialFields";
import { SubmitButton } from "@/components/private/SubmitButton";
import { updateTreatmentSession } from "@/lib/private/actions";
import { getPatients } from "@/lib/private/patients";
import { getTreatmentSessionById } from "@/lib/private/sessions";

export const metadata: Metadata = {
  title: "Editar sesión",
};

export default async function EditSessionPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const [{ id }, { error }] = await Promise.all([params, searchParams]);
  const [session, patients] = await Promise.all([
    getTreatmentSessionById(id),
    getPatients(),
  ]);

  if (!session) {
    notFound();
  }

  return (
    <PrivateLayout title="Editar sesión">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <Link
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#0F3D3A] underline underline-offset-4"
          href="/private/sesiones"
        >
          <ArrowLeft className="size-4" />
          Volver a sesiones
        </Link>
        <Link
          className="text-sm font-semibold text-[#0F3D3A] underline underline-offset-4"
          href={`/private/reportes?month=${session.date.slice(0, 7)}`}
        >
          Volver al reporte del mes
        </Link>
      </div>

      <section className="max-w-3xl rounded-lg border border-[var(--line)] bg-white p-6 shadow-[0_14px_34px_rgba(35,40,39,0.035)]">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-hover)]">
          Corrección de registro
        </p>
        <h2 className="mt-3 text-2xl font-semibold">
          {session.patientName} · {session.date}
        </h2>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
          Los cambios recalcularán reportes e ingresos. La cita original y los
          bonos no se modificarán ni volverán a descontarse.
        </p>

        <form
          action={updateTreatmentSession.bind(null, session.id)}
          className="mt-6 grid gap-4"
        >
          <ErrorMessage code={error} />
          <label className="text-sm font-medium">
            Paciente
            <PatientSelect defaultValue={session.patientId} patients={patients} />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-medium">
              Fecha
              <input
                className="mt-2 min-h-12 w-full rounded-lg border border-[var(--line)] bg-[#FAF8F4] px-4"
                defaultValue={session.date}
                name="date"
                required
                type="date"
              />
            </label>
            <label className="text-sm font-medium">
              INDIBA
              <select
                className="mt-2 min-h-12 w-full rounded-lg border border-[var(--line)] bg-[#FAF8F4] px-4"
                defaultValue={session.usedIndiba ? "yes" : "no"}
                name="usedIndiba"
              >
                <option value="no">No</option>
                <option value="yes">Sí</option>
              </select>
            </label>
          </div>

          <label className="text-sm font-medium">
            Tratamiento realizado
            <textarea
              className="mt-2 min-h-24 w-full rounded-lg border border-[var(--line)] bg-[#FAF8F4] px-4 py-3"
              defaultValue={session.treatmentSummary}
              name="treatmentSummary"
              required
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-medium">
              Dolor antes
              <input
                className="mt-2 min-h-12 w-full rounded-lg border border-[var(--line)] bg-[#FAF8F4] px-4"
                defaultValue={session.painBefore}
                max={10}
                min={0}
                name="painBefore"
                type="number"
              />
            </label>
            <label className="text-sm font-medium">
              Dolor después
              <input
                className="mt-2 min-h-12 w-full rounded-lg border border-[var(--line)] bg-[#FAF8F4] px-4"
                defaultValue={session.painAfter}
                max={10}
                min={0}
                name="painAfter"
                type="number"
              />
            </label>
          </div>

          <label className="text-sm font-medium">
            Notas de evolución
            <textarea
              className="mt-2 min-h-24 w-full rounded-lg border border-[var(--line)] bg-[#FAF8F4] px-4 py-3"
              defaultValue={session.evolutionNotes}
              name="evolutionNotes"
            />
          </label>

          <SessionFinancialFields
            defaultAmountPaid={session.amountPaid}
            defaultBasePrice={session.basePrice}
            defaultCardAmount={session.cardAmount}
            defaultCashAmount={session.cashAmount}
            defaultDiscountAmount={session.discountAmount}
            defaultDurationMinutes={session.durationMinutes}
            defaultPaymentMethod={session.paymentMethod}
            defaultPaymentNotes={session.paymentNotes}
          />

          <details
            className="rounded-lg border border-[var(--line)] bg-[#FAF8F4] p-4"
            open
          >
            <summary className="cursor-pointer text-sm font-semibold">
              Detalles de la sesión
            </summary>
            <div className="mt-4 grid gap-4">
              <label className="text-sm font-medium">
                Motivo
                <input
                  className="mt-2 min-h-12 w-full rounded-lg border border-[var(--line)] bg-white px-4"
                  defaultValue={session.reason}
                  name="reason"
                />
              </label>
              <label className="text-sm font-medium">
                Ejercicios indicados
                <textarea
                  className="mt-2 min-h-24 w-full rounded-lg border border-[var(--line)] bg-white px-4 py-3"
                  defaultValue={session.exercisesGiven}
                  name="exercisesGiven"
                />
              </label>
              <label className="text-sm font-medium">
                Próxima recomendación
                <textarea
                  className="mt-2 min-h-24 w-full rounded-lg border border-[var(--line)] bg-white px-4 py-3"
                  defaultValue={session.nextRecommendation}
                  name="nextRecommendation"
                />
              </label>
            </div>
          </details>

          <SubmitButton pendingText="Guardando cambios...">
            Guardar cambios
          </SubmitButton>
        </form>
      </section>
    </PrivateLayout>
  );
}
