import type { Metadata } from "next";
import { FeatureCard } from "@/components/FeatureCard";
import { FinalCta } from "@/components/FinalCta";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { indibaBenefits } from "@/data/site";

export const metadata: Metadata = {
  title: "INDIBA / Radiofrecuencia",
};

export default function IndibaPage() {
  return (
    <>
      <PageHero
        eyebrow="INDIBA / Radiofrecuencia"
        title="Tecnología de apoyo dentro de un plan de rehabilitación completo."
        text="INDIBA se utiliza de forma selectiva, según la valoración clínica, la fase del proceso y los objetivos funcionales."
      />
      <Section
        title="Cómo se integra en el tratamiento"
        text="La radiofrecuencia se plantea como una herramienta complementaria dentro del proceso de recuperación, junto con evaluación, terapia manual, ejercicio terapéutico y seguimiento. No sustituye el razonamiento clínico ni promete resultados milagrosos."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {indibaBenefits.map((benefit) => (
            <FeatureCard key={benefit.title} {...benefit} />
          ))}
        </div>
      </Section>
      <FinalCta />
    </>
  );
}
