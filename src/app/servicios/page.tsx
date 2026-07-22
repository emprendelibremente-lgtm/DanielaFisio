import type { Metadata } from "next";
import { FeatureCard } from "@/components/FeatureCard";
import { FinalCta } from "@/components/FinalCta";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { services } from "@/data/site";

export const metadata: Metadata = {
  title: "Servicios",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Servicios"
        title="Tratamientos para recuperar función, autonomía y seguridad."
        text="Fisioterapia, terapia manual, ejercicio terapéutico, rehabilitación deportiva e INDIBA se integran según la valoración clínica."
      />
      <Section
        title="Servicios principales"
        text="Cada servicio se adapta al caso y se orienta a objetivos concretos: menos dolor, más capacidad y una vuelta progresiva a la actividad."
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <FeatureCard key={service.title} {...service} />
          ))}
        </div>
      </Section>
      <FinalCta />
    </>
  );
}
