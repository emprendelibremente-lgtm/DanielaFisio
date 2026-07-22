import { ArrowUpRight, CheckCircle2, Quote } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { FeatureCard } from "@/components/FeatureCard";
import { FinalCta } from "@/components/FinalCta";
import { PhotoPlaceholder } from "@/components/PhotoPlaceholder";
import { Section } from "@/components/Section";
import {
  homeInjuries,
  methodSteps,
  services,
  whatsappUrl,
} from "@/data/site";

export default function Home() {
  return (
    <>
      <section className="overflow-hidden bg-[#101918] text-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 sm:px-6 lg:grid-cols-[1.02fr_0.78fr] lg:px-8 lg:py-20">
          <div className="flex flex-col justify-center">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand)]">
              Fisioterapia y Rehabilitación
            </p>
            <h1 className="max-w-4xl text-balance text-5xl font-semibold tracking-normal sm:text-6xl lg:text-7xl">
              Daniela Ferreira
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-9 text-white/72">
              Fisioterapia personalizada, recuperación funcional y
              rehabilitación deportiva con enfoque clínico, humano y
              tecnológico.
            </p>
            <div className="mt-9 flex max-w-xl flex-col gap-3 sm:flex-row">
              <ButtonLink external href={whatsappUrl} variant="primary" whatsapp>
                Solicitar cita por WhatsApp
              </ButtonLink>
              <ButtonLink href="/metodo-de-trabajo" variant="secondary">
                Conocer mi método
              </ButtonLink>
            </div>
            <p className="mt-5 max-w-xl text-sm leading-6 text-white/56">
              Solicita tu cita por WhatsApp y te responderé personalmente para
              coordinar el mejor horario según disponibilidad.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -left-4 top-8 hidden h-28 w-px bg-[var(--brand)]/70 lg:block" />
            <PhotoPlaceholder
              dark
              label="Espacio reservado para una foto profesional real de Daniela."
            />
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--brand)]">
                  Base profesional
                </p>
                <p className="mt-2 text-sm text-white/70">Barcelona</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--brand)]">
                  Enfoque
                </p>
                <p className="mt-2 text-sm text-white/70">Clínico y activo</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section
        eyebrow="Sobre Daniela"
        title="Una fisioterapia precisa, humana y orientada a resultados reales."
        text="Daniela Ferreira es fisioterapeuta especializada en fisioterapia y rehabilitación. Tiene experiencia en Barcelona, cuenta con un máster en rehabilitación deportiva realizado en Barcelona y actualmente cursa un doctorado en Blanquerna."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {[
            "Evaluación clínica individualizada",
            "Rehabilitación deportiva con control de carga",
            "Atención a pacientes derivados en Passeig de Gràcia",
          ].map((item) => (
            <div
              className="rounded-lg border border-[var(--line)] bg-white p-6 shadow-[0_14px_34px_rgba(35,40,39,0.035)]"
              key={item}
            >
              <CheckCircle2 className="mb-5 size-5 text-[var(--brand-hover)]" />
              <p className="text-sm font-semibold leading-6 text-[var(--text)]">
                {item}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        dark
        eyebrow="Método"
        title="Un proceso claro desde la primera valoración hasta el seguimiento."
        text="Cada sesión se integra dentro de una estrategia: entender el caso, reducir barreras, recuperar capacidad y sostener el cambio."
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {methodSteps.map((step, index) => (
            <FeatureCard dark index={index} key={step.title} {...step} />
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Servicios"
        title="Tratamientos principales con criterio clínico y progresión activa."
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((service) => (
            <FeatureCard key={service.title} {...service} />
          ))}
        </div>
      </Section>

      <section className="bg-[#F5EFE6]">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-6 lg:grid-cols-[0.85fr_1fr] lg:px-8 lg:py-24">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand-hover)]">
              INDIBA / Radiofrecuencia
            </p>
            <h2 className="text-balance text-3xl font-semibold sm:text-4xl">
              Tecnología como apoyo, no como sustituto del razonamiento clínico.
            </h2>
          </div>
          <div className="rounded-lg bg-white p-7 shadow-[0_20px_50px_rgba(35,40,39,0.07)]">
            <p className="text-base leading-8 text-[var(--muted)]">
              La radiofrecuencia INDIBA se incorpora cuando puede complementar
              la terapia manual, el ejercicio terapéutico y el seguimiento
              funcional. Su uso se decide según la valoración, la fase del
              proceso y los objetivos del paciente, sin prometer atajos ni
              resultados milagrosos.
            </p>
            <div className="mt-7 max-w-sm">
              <ButtonLink href="/indiba-radiofrecuencia" variant="secondary">
                Conocer INDIBA
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <Section
        eyebrow="Lesiones frecuentes"
        title="Casos habituales que pueden beneficiarse de una valoración."
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {homeInjuries.map((item) => (
            <div
              className="flex items-center justify-between border-b border-[var(--line)] bg-white/45 px-4 py-4 text-sm font-medium"
              key={item}
            >
              {item}
              <ArrowUpRight className="size-4 text-[var(--brand-hover)]" />
            </div>
          ))}
        </div>
      </Section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-3xl border-l-2 border-[var(--brand)] pl-6">
            <Quote className="mb-6 size-8 text-[var(--brand-hover)]" />
            <p className="text-2xl font-semibold leading-snug text-[var(--text)]">
              Espacio reservado para testimonios de pacientes.
            </p>
            <p className="mt-4 text-[var(--muted)]">
              En una fase posterior se podrán añadir opiniones reales, revisadas
              y autorizadas, manteniendo una comunicación ética y profesional.
            </p>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
