import type { Metadata } from "next";
import { NewPatientForm } from "@/components/private/NewPatientForm";
import { PrivateLayout } from "@/components/private/PrivateLayout";

export const metadata: Metadata = {
  title: "Nuevo paciente",
};

export default function NewPatientPage() {
  return (
    <PrivateLayout title="Nuevo paciente">
      <section className="max-w-3xl rounded-lg border border-[var(--line)] bg-white p-6 shadow-[0_14px_34px_rgba(35,40,39,0.035)]">
        <h2 className="text-2xl font-semibold">Agregar paciente</h2>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Solo los campos mínimos son obligatorios. No ingreses datos reales
          hasta completar privacidad y seguridad.
        </p>
        <NewPatientForm />
      </section>
    </PrivateLayout>
  );
}
