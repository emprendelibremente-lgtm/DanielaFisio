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
    title: "Rehabilitación y readaptación",
    text: "Trabajo centrado en recuperar movimiento, reducir limitaciones y volver a la actividad con más seguridad.",
    icon: UserRound,
  },
  {
    title: "Experiencia clínica",
    text: "Base profesional en Barcelona y atención a pacientes con lesiones musculares, articulares y deportivas.",
    icon: MapPin,
  },
  {
    title: "Posgrado en rehabilitación deportiva",
    text: "Formación avanzada como respaldo para acompañar procesos de recuperación y retorno al entrenamiento.",
    icon: GraduationCap,
  },
  {
    title: "Doctorado en curso",
    text: "Una mirada rigurosa que suma criterio académico a la práctica clínica diaria.",
    icon: Microscope,
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Sobre mí"
        title="Fisioterapia cercana, precisa y orientada a tu recuperación."
        text="Soy Daniela Ferreira, fisioterapeuta especializada en rehabilitación y readaptación deportiva."
      />
      <Section
        title="Daniela Ferreira"
        text="Mi trabajo se centra en ayudarte a recuperar movimiento, reducir limitaciones y volver a tus actividades con mayor seguridad. La formación acompaña el proceso, pero el punto de partida siempre eres tú."
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
