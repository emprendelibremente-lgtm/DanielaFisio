import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ErrorMessage } from "@/components/private/ErrorMessage";
import { PrivateLayout } from "@/components/private/PrivateLayout";
import { SubmitButton } from "@/components/private/SubmitButton";
import { deletePatient, updatePatient } from "@/lib/private/actions";
import { getPatientById } from "@/lib/private/patients";

export const metadata: Metadata = {
  title: "Editar paciente",
};

export default async function EditPatientPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const [{ id }, { error }] = await Promise.all([params, searchParams]);
  const patient = await getPatientById(id);

  if (!patient) {
    notFound();
  }

  return (
    <PrivateLayout title="Editar paciente">
      <section className="max-w-3xl rounded-lg border border-[var(--line)] bg-white p-6 shadow-[0_14px_34px_rgba(35,40,39,0.035)]">
        <h2 className="text-2xl font-semibold">{patient.fullName}</h2>
        <form action={updatePatient.bind(null, patient.id)} className="mt-6 grid gap-4">
          <ErrorMessage code={error} />
          <label className="text-sm font-medium">
            Nombre completo
            <input className="mt-2 min-h-12 w-full rounded-lg border border-[var(--line)] bg-[#FAF8F4] px-4" defaultValue={patient.fullName} name="fullName" required />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-medium">
              Teléfono
              <input className="mt-2 min-h-12 w-full rounded-lg border border-[var(--line)] bg-[#FAF8F4] px-4" defaultValue={patient.phone} name="phone" />
            </label>
            <label className="text-sm font-medium">
              Edad
              <input className="mt-2 min-h-12 w-full rounded-lg border border-[var(--line)] bg-[#FAF8F4] px-4" defaultValue={patient.age || ""} min="0" name="age" type="number" />
            </label>
          </div>
          <label className="text-sm font-medium">
            Lesión principal
            <input className="mt-2 min-h-12 w-full rounded-lg border border-[var(--line)] bg-[#FAF8F4] px-4" defaultValue={patient.mainInjury} name="mainInjury" />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-medium">
              Estado
              <select className="mt-2 min-h-12 w-full rounded-lg border border-[var(--line)] bg-[#FAF8F4] px-4" defaultValue={patient.status} name="status">
                <option value="active">Activo</option>
                <option value="paused">En pausa</option>
                <option value="follow_up">Seguimiento</option>
                <option value="discharged">Alta</option>
              </select>
            </label>
            <label className="text-sm font-medium">
              Fecha de inicio
              <input className="mt-2 min-h-12 w-full rounded-lg border border-[var(--line)] bg-[#FAF8F4] px-4" defaultValue={patient.startDate} name="startDate" type="date" />
            </label>
          </div>
          <label className="text-sm font-medium">
            Derivado por
            <input className="mt-2 min-h-12 w-full rounded-lg border border-[var(--line)] bg-[#FAF8F4] px-4" defaultValue={patient.referredBy} name="referredBy" />
          </label>
          <label className="text-sm font-medium">
            Notas
            <textarea className="mt-2 min-h-24 w-full rounded-lg border border-[var(--line)] bg-[#FAF8F4] px-4 py-3" defaultValue={patient.notes} name="notes" />
          </label>
          <SubmitButton>Guardar cambios</SubmitButton>
        </form>
      </section>

      <section className="mt-6 max-w-3xl rounded-lg border border-rose-200 bg-white p-6 shadow-[0_14px_34px_rgba(35,40,39,0.035)]">
        <h2 className="text-xl font-semibold text-rose-800">
          Eliminar paciente de prueba
        </h2>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
          Esta acción eliminará el paciente y sus citas, sesiones y bonos
          asociados. Úsalo solo para datos de prueba o cuando estés segura.
        </p>
        <form action={deletePatient.bind(null, patient.id)} className="mt-5 grid gap-4">
          <label className="text-sm font-medium">
            Escribe ELIMINAR para confirmar
            <input
              className="mt-2 min-h-12 w-full rounded-lg border border-rose-200 bg-rose-50 px-4"
              name="confirmation"
              placeholder="ELIMINAR"
              required
            />
          </label>
          <SubmitButton className="min-h-12 rounded-full bg-rose-700 px-5 text-sm font-semibold text-white disabled:opacity-60">
            Eliminar paciente
          </SubmitButton>
        </form>
      </section>
    </PrivateLayout>
  );
}
