import type { Metadata } from "next";
import { FormField } from "@/components/private/FormField";
import { PrivateLayout } from "@/components/private/PrivateLayout";

export const metadata: Metadata = {
  title: "Configuración privada",
};

export default function PrivateSettingsPage() {
  return (
    <PrivateLayout title="Configuración">
      <section className="rounded-lg border border-[var(--line)] bg-white p-6 shadow-[0_14px_34px_rgba(35,40,39,0.035)]">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-hover)]">
          Pendiente de edición
        </p>
        <h2 className="mt-3 text-2xl font-semibold">Datos profesionales</h2>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
          Estos datos sirven como referencia interna. La edición funcional de
          configuración vendrá en una fase posterior.
        </p>

        <form className="mt-6 grid gap-4 md:grid-cols-2">
          <FormField label="Nombre profesional" placeholder="Daniela Ferreira" />
          <FormField
            label="Especialidad"
            placeholder="Fisioterapia y Rehabilitación"
          />
          <FormField label="WhatsApp" placeholder="+34 000 000 000" />
          <FormField
            label="Ubicación base"
            placeholder="Barcelona · Passeig de Gràcia"
          />
          <FormField
            label="Preferencia de agenda"
            placeholder="Sesiones de 45-50 minutos"
          />
          <FormField
            label="Avisos"
            placeholder="Recordar seguimiento de pacientes activos"
          />
        </form>
      </section>
    </PrivateLayout>
  );
}
