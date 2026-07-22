import type { Metadata } from "next";
import { FeatureCard } from "@/components/FeatureCard";
import { FinalCta } from "@/components/FinalCta";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { methodSteps } from "@/data/site";

export const metadata: Metadata = {
  title: "Método de trabajo",
};

export default function MethodPage() {
  return (
    <>
      <PageHero
        eyebrow="Método de trabajo"
        title="Un proceso ordenado para tomar mejores decisiones clínicas."
        text="El tratamiento no empieza con una técnica, sino con una comprensión clara del problema y de los objetivos que importan para cada paciente."
      />
      <Section
        dark
        title="Las cuatro fases del proceso"
        text="Este marco ayuda a que cada sesión tenga intención, continuidad y una progresión comprensible."
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {methodSteps.map((step, index) => (
            <FeatureCard dark index={index} key={step.title} {...step} />
          ))}
        </div>
      </Section>
      <FinalCta />
    </>
  );
}
