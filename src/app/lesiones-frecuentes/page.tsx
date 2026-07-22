import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { FinalCta } from "@/components/FinalCta";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { injuries } from "@/data/site";

export const metadata: Metadata = {
  title: "Lesiones frecuentes",
};

export default function InjuriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Lesiones frecuentes"
        title="Valoración y recuperación para molestias habituales."
        text="Dolor, sobrecargas y lesiones deportivas requieren una lectura individual del contexto, la carga y la función."
      />
      <Section
        title="Motivos de consulta habituales"
        text="Esta lista no sustituye una valoración, pero orienta algunos procesos que Daniela puede abordar desde fisioterapia y rehabilitación."
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {injuries.map((item) => (
            <div
              className="rounded-lg border border-[var(--line)] bg-white p-5 shadow-[0_14px_34px_rgba(35,40,39,0.035)]"
              key={item}
            >
              <CheckCircle2 className="mb-4 size-5 text-[var(--brand-hover)]" />
              <h2 className="text-base font-semibold">{item}</h2>
            </div>
          ))}
        </div>
      </Section>
      <FinalCta />
    </>
  );
}
