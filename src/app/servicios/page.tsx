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
        title="Servicios para recuperar función, movilidad y confianza."
        text="Tratamientos personalizados, con objetivos claros y una progresión adaptada a tu evolución."
      />
      <Section
        title="Servicios principales"
        text="Cada servicio parte de una valoración y se adapta al momento del proceso."
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
