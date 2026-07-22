import type { Metadata } from "next";
import { GraduationCap, MapPin, Microscope, UserRound } from "lucide-react";
import { FeatureCard } from "@/components/FeatureCard";
import { FinalCta } from "@/components/FinalCta";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "Sobre mí",
};

const highlights = [
  {
    title: "Fisioterapeuta especializada",
    text: "Daniela Ferreira centra su práctica en fisioterapia y rehabilitación con atención individualizada.",
    icon: UserRound,
  },
  {
    title: "Experiencia en Barcelona",
    text: "Desarrolla su trabajo clínico en Barcelona, atendiendo pacientes derivados en Passeig de Gràcia.",
    icon: MapPin,
  },
  {
    title: "Máster en rehabilitación deportiva",
    text: "Formación avanzada realizada en Barcelona para abordar lesiones y retorno al deporte.",
    icon: GraduationCap,
  },
  {
    title: "Doctorado en Blanquerna",
    text: "Actualmente cursa un doctorado, integrando criterio académico y práctica clínica.",
    icon: Microscope,
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Sobre mí"
        title="Una práctica centrada en la persona, el movimiento y la confianza."
        text="Daniela combina experiencia clínica, formación en rehabilitación deportiva y una visión rigurosa para acompañar cada proceso de recuperación desde una mirada cercana y personalizada."
      />
      <Section
        title="Daniela Ferreira"
        text="Su enfoque evita recetas genéricas: cada tratamiento nace de una valoración, de los objetivos del paciente y de una progresión realista. Barcelona es su base profesional, pero la marca se centra en Daniela como fisioterapeuta."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {highlights.map((item) => (
            <FeatureCard key={item.title} {...item} />
          ))}
        </div>
      </Section>
      <FinalCta />
    </>
  );
}
