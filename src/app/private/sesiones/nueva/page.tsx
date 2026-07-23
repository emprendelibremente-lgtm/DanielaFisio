import type { Metadata } from "next";
import { ErrorMessage } from "@/components/private/ErrorMessage";
import { PatientSelect } from "@/components/private/PatientSelect";
import { PrivateLayout } from "@/components/private/PrivateLayout";
import { SessionFinancialFields } from "@/components/private/SessionFinancialFields";
import { SubmitButton } from "@/components/private/SubmitButton";
import { createTreatmentSession } from "@/lib/private/actions";
import { getAppointments } from "@/lib/private/appointments";
import { getPatients } from "@/lib/private/patients";

export const metadata: Metadata = {
  title: "Registrar sesión",
};

export default async function NewSessionPage({
  searchParams,
}: {
  searchParams: Promise<{ appointmentId?: string; error?: string; patientId?: string }>;
}) {
  const [{ appointmentId, error, patientId }, patients, appointments] = await Promise.all([
    searchParams,
    getPatients(),
    getAppointments(),
  ]);
  const appointment = appointmentId
    ? appointments.find((item) => item.id === appointmentId)
    : null;
  const defaultPatientId = appointment?.patientId ?? patientId;

  return (
    <PrivateLayout title="Registrar sesión">
      <section className="max-w-3xl rounded-lg border border-[var(--line)] bg-white p-6 shadow-[0_14px_34px_rgba(35,40,39,0.035)]">
        <h2 className="text-2xl font-semibold">Registro rápido</h2>
        {appointment ? (
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
            Esta sesión quedará asociada a la cita seleccionada y la cita se
            marcará como completada al guardar.
          </p>
        ) : null}
        <form action={createTreatmentSession} className="mt-6 grid gap-4">
          <ErrorMessage code={error} />
          {appointmentId ? (
            <input name="appointmentId" type="hidden" value={appointmentId} />
          ) : null}
          <label className="text-sm font-medium">
            Paciente
            <PatientSelect defaultValue={defaultPatientId} patients={patients} />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-medium">
              Fecha
              <input className="mt-2 min-h-12 w-full rounded-lg border border-[var(--line)] bg-[#FAF8F4] px-4" defaultValue={appointment?.date} name="date" required type="date" />
            </label>
            <label className="text-sm font-medium">
              INDIBA
              <select className="mt-2 min-h-12 w-full rounded-lg border border-[var(--line)] bg-[#FAF8F4] px-4" name="usedIndiba">
                <option value="no">No</option>
                <option value="yes">Sí</option>
              </select>
            </label>
          </div>
          <label className="text-sm font-medium">
            Tratamiento realizado
            <textarea className="mt-2 min-h-24 w-full rounded-lg border border-[var(--line)] bg-[#FAF8F4] px-4 py-3" name="treatmentSummary" required />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-medium">
              Dolor antes
              <input className="mt-2 min-h-12 w-full rounded-lg border border-[var(--line)] bg-[#FAF8F4] px-4" max={10} min={0} name="painBefore" type="number" />
            </label>
            <label className="text-sm font-medium">
              Dolor después
              <input className="mt-2 min-h-12 w-full rounded-lg border border-[var(--line)] bg-[#FAF8F4] px-4" max={10} min={0} name="painAfter" type="number" />
            </label>
          </div>
          <label className="text-sm font-medium">
            Notas de evolución
            <textarea className="mt-2 min-h-24 w-full rounded-lg border border-[var(--line)] bg-[#FAF8F4] px-4 py-3" name="evolutionNotes" />
          </label>
          <label className="flex items-start gap-3 rounded-lg border border-[var(--line)] bg-[#FAF8F4] p-4 text-sm font-medium">
            <input
              className="mt-1 size-4 accent-[#0F3D3A]"
              defaultChecked
              name="discountActivePackage"
              type="checkbox"
              value="yes"
            />
            <span>
              Descontar del bono activo si existe
              <span className="mt-1 block text-xs font-normal leading-5 text-[var(--muted)]">
                Si el paciente no tiene bono activo, la sesión se registra igual.
              </span>
            </span>
          </label>
          <SessionFinancialFields />
          <details className="rounded-lg border border-[var(--line)] bg-[#FAF8F4] p-4">
            <summary className="cursor-pointer text-sm font-semibold">
              Añadir detalles opcionales
            </summary>
            <div className="mt-4 grid gap-4">
              <label className="text-sm font-medium">
                Motivo
                <input className="mt-2 min-h-12 w-full rounded-lg border border-[var(--line)] bg-white px-4" defaultValue={appointment?.reason} name="reason" />
              </label>
              <label className="text-sm font-medium">
                Ejercicios indicados
                <textarea className="mt-2 min-h-24 w-full rounded-lg border border-[var(--line)] bg-white px-4 py-3" name="exercisesGiven" />
              </label>
              <label className="text-sm font-medium">
                Próxima recomendación
                <textarea className="mt-2 min-h-24 w-full rounded-lg border border-[var(--line)] bg-white px-4 py-3" name="nextRecommendation" />
              </label>
            </div>
          </details>
          <SubmitButton>Registrar sesión</SubmitButton>
        </form>
      </section>
    </PrivateLayout>
  );
}
