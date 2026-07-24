import type { Metadata } from "next";
import { MapPin, MessageCircle } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { contactHighlights, whatsappUrl } from "@/data/site";

export const metadata: Metadata = {
  title: "Contacto",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contacto"
        title="Escríbeme por WhatsApp para coordinar tu cita."
        text="Te responderé personalmente para revisar disponibilidad y orientar el primer paso."
      />
      <Section title="Cómo contactar">
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-2xl bg-[#101918] p-6 text-center text-white shadow-[0_22px_58px_rgba(16,25,24,0.16)] sm:p-7 lg:text-left">
            <MessageCircle className="mx-auto size-6 text-[var(--brand)] sm:size-7 lg:mx-0" />
            <h2 className="mt-4 text-[1.35rem] font-semibold sm:mt-6 sm:text-2xl">WhatsApp</h2>
            <p className="mt-3 text-sm leading-6 text-white/68 sm:mt-4">
              Escríbeme por WhatsApp y te responderé personalmente para
              coordinar disponibilidad.
            </p>
            <div className="mx-auto mt-6 max-w-sm sm:mt-8 lg:mx-0">
              <ButtonLink external href={whatsappUrl} variant="primary" whatsapp>
                Escribir por WhatsApp
              </ButtonLink>
            </div>
          </div>
          <div className="rounded-2xl border border-[var(--line)]/70 bg-white/88 p-6 text-center shadow-[0_14px_34px_rgba(35,40,39,0.045)] sm:p-7 lg:text-left">
            <MapPin className="mx-auto size-6 text-[var(--brand-hover)] sm:size-7 lg:mx-0" />
            <h2 className="mt-4 text-[1.35rem] font-semibold sm:mt-6 sm:text-2xl">Base profesional</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)] sm:mt-4">
              Base profesional en Barcelona. La atención se coordina según
              disponibilidad y la dirección se confirma al solicitar la cita.
            </p>
            <div className="mt-6 grid gap-2.5 sm:mt-7 sm:gap-3">
              {contactHighlights.map((item) => (
                <p
                  className="border-t border-[var(--line)] pt-3 text-sm font-medium"
                  key={item}
                >
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
