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
        title="Evaluar, tratar y progresar."
        text="Un método claro para entender qué ocurre, actuar con criterio y ajustar el plan según tu evolución."
      />
      <Section
        dark
        title="Tres pasos, una dirección clara."
        text="El objetivo es que cada sesión tenga sentido dentro de un proceso ordenado y fácil de seguir."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {methodSteps.map((step, index) => (
            <FeatureCard dark index={index} key={step.title} {...step} />
          ))}
        </div>
      </Section>
      <FinalCta />
    </>
  );
}
