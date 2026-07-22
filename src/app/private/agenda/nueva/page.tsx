import type { Metadata } from "next";
import { NewAppointmentForm } from "@/components/private/NewAppointmentForm";
import { PrivateLayout } from "@/components/private/PrivateLayout";
import { getPatients } from "@/lib/private/patients";

export const metadata: Metadata = {
  title: "Nueva cita",
};

export default async function NewAppointmentPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; patientId?: string }>;
}) {
  const [{ patientId }, patients] = await Promise.all([
    searchParams,
    getPatients(),
  ]);

  return (
    <PrivateLayout title="Nueva cita">
      <section className="max-w-3xl rounded-lg border border-[var(--line)] bg-white p-6 shadow-[0_14px_34px_rgba(35,40,39,0.035)]">
        <h2 className="text-2xl font-semibold">Agendar cita</h2>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
          Puedes seleccionar un paciente existente o registrar uno nuevo
          mientras agendas su primera cita.
        </p>
        <NewAppointmentForm defaultPatientId={patientId} patients={patients} />
      </section>
    </PrivateLayout>
  );
}
