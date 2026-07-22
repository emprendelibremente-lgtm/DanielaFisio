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
        title="Solicita cita escribiendo directamente por WhatsApp."
        text="Las citas no se reservan online en esta fase. El canal principal es WhatsApp para orientar el motivo de consulta y confirmar disponibilidad."
      />
      <Section title="Cómo contactar">
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-lg bg-[#101918] p-7 text-white">
            <MessageCircle className="size-7 text-[var(--brand)]" />
            <h2 className="mt-6 text-2xl font-semibold">WhatsApp</h2>
            <p className="mt-4 text-sm leading-6 text-white/68">
              Solicita tu cita por WhatsApp y te responderé personalmente para
              coordinar el mejor horario según disponibilidad.
            </p>
            <div className="mt-8">
              <ButtonLink external href={whatsappUrl} variant="primary" whatsapp>
                Escribir por WhatsApp
              </ButtonLink>
            </div>
          </div>
          <div className="rounded-lg border border-[var(--line)] bg-white p-7 shadow-[0_14px_34px_rgba(35,40,39,0.035)]">
            <MapPin className="size-7 text-[var(--brand-hover)]" />
            <h2 className="mt-6 text-2xl font-semibold">Base profesional</h2>
            <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
              Daniela tiene base profesional en Barcelona y atiende pacientes
              derivados en una clínica ubicada en Passeig de Gràcia. La dirección
              exacta se confirma durante la coordinación de la cita.
            </p>
            <div className="mt-7 grid gap-3">
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
