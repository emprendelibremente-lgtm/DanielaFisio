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
        title="INDIBA como apoyo dentro de la recuperación."
        text="Una herramienta complementaria que se integra con valoración, terapia manual y ejercicio terapéutico."
      />
      <Section
        title="Uso prudente y personalizado"
        text="INDIBA puede acompañar algunos procesos de recuperación, pero no sustituye la evaluación ni el trabajo activo. Su uso depende del caso, la fase y los objetivos."
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
