import type { Metadata } from "next";
import { ErrorMessage } from "@/components/private/ErrorMessage";
import { PatientSelect } from "@/components/private/PatientSelect";
import { PrivateLayout } from "@/components/private/PrivateLayout";
import { SubmitButton } from "@/components/private/SubmitButton";
import { createSessionPackage } from "@/lib/private/actions";
import { getPatients } from "@/lib/private/patients";

export const metadata: Metadata = {
  title: "Nuevo bono",
};

export default async function NewPackagePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const [{ error }, patients] = await Promise.all([searchParams, getPatients()]);

  return (
    <PrivateLayout title="Nuevo bono">
      <section className="max-w-3xl rounded-lg border border-[var(--line)] bg-white p-6 shadow-[0_14px_34px_rgba(35,40,39,0.035)]">
        <h2 className="text-2xl font-semibold">Bono de 5 sesiones</h2>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
          Control manual sin precios, pagos online ni facturación.
        </p>
        <form action={createSessionPackage} className="mt-6 grid gap-4">
          <ErrorMessage code={error} />
          <label className="text-sm font-medium">
            Paciente
            <PatientSelect patients={patients} />
          </label>
          <label className="text-sm font-medium">
            Tipo de bono
            <input className="mt-2 min-h-12 w-full rounded-lg border border-[var(--line)] bg-[#FAF8F4] px-4" disabled value="Bono de 5 sesiones" />
          </label>
          <label className="text-sm font-medium">
            Estado
            <select className="mt-2 min-h-12 w-full rounded-lg border border-[var(--line)] bg-[#FAF8F4] px-4" name="status">
              <option value="active">Activo</option>
              <option value="pending">Pendiente</option>
            </select>
          </label>
          <SubmitButton>Crear bono de 5 sesiones</SubmitButton>
        </form>
      </section>
    </PrivateLayout>
  );
}
