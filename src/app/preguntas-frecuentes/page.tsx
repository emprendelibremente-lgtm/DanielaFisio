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
        title="Información clara antes de escribir por WhatsApp."
        text="Respuestas breves sobre citas, ubicación, enfoque de tratamiento e INDIBA."
      />
      <Section title="Dudas habituales">
        <div className="grid gap-4">
          {faqs.map((faq) => (
            <article
              className="rounded-lg border border-[var(--line)] bg-white p-6 shadow-[0_14px_34px_rgba(35,40,39,0.035)]"
              key={faq.question}
            >
              <h2 className="text-lg font-semibold">{faq.question}</h2>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
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
