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
        title="Lesiones y molestias que conviene valorar con calma."
        text="Una lista sencilla de motivos de consulta habituales. Cada caso necesita una lectura individual."
      />
      <Section
        title="Motivos de consulta habituales"
        text="El objetivo no es etiquetar rápido, sino entender cómo afecta a tu movimiento y a tu día a día."
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {injuries.map((item) => (
            <div
              className="rounded-2xl border border-[var(--line)]/70 bg-white/88 p-4 text-center shadow-[0_14px_34px_rgba(35,40,39,0.04)] transition hover:-translate-y-0.5 hover:border-[var(--brand-hover)] sm:p-5"
              key={item}
            >
              <CheckCircle2 className="mx-auto mb-3 size-[1.1rem] text-[var(--brand-hover)] sm:mb-4 sm:size-5" />
              <h2 className="text-[0.98rem] font-semibold sm:text-base">{item}</h2>
            </div>
          ))}
        </div>
      </Section>
      <FinalCta />
    </>
  );
}
