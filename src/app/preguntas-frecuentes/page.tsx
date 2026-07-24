import type { Metadata } from "next";
import { FinalCta } from "@/components/FinalCta";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { faqs } from "@/data/site";

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        cta={false}
        eyebrow="Preguntas frecuentes"
        title="Dudas habituales antes de solicitar cita."
        text="Respuestas breves para orientarte antes de escribir por WhatsApp."
      />
      <Section title="Dudas habituales">
        <div className="grid gap-4">
          {faqs.map((faq) => (
            <article
              className="rounded-2xl border border-[var(--line)]/70 bg-white/88 p-5 text-center shadow-[0_14px_34px_rgba(35,40,39,0.04)] sm:p-6 sm:text-left"
              key={faq.question}
            >
              <h2 className="text-[1.05rem] font-semibold sm:text-lg">{faq.question}</h2>
              <p className="mt-2.5 text-sm leading-6 text-[var(--muted)] sm:mt-3">
                {faq.answer}
              </p>
            </article>
          ))}
        </div>
      </Section>
      <FinalCta />
    </>
  );
}
