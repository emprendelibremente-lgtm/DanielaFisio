import Image from "next/image";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { FeatureCard } from "@/components/FeatureCard";
import { FinalCta } from "@/components/FinalCta";
import { Section } from "@/components/Section";
import {
  homeServices,
  injuries,
  methodSteps,
  whatsappUrl,
} from "@/data/site";

const trustPoints = [
  "Evaluación personalizada",
  "Tratamiento adaptado a tu evolución",
  "Seguimiento claro y ordenado",
];

export default function Home() {
  return (
    <>
      <section className="overflow-hidden bg-[#101918] text-white">
        <div className="mx-auto grid max-w-7xl gap-9 px-5 py-10 sm:gap-12 sm:px-6 sm:py-14 lg:grid-cols-[1fr_0.82fr] lg:px-8 lg:py-20">
          <div className="mx-auto flex max-w-3xl flex-col items-center justify-center text-center lg:mx-0 lg:items-start lg:text-left">
            <p className="mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--brand)] sm:mb-5 sm:text-xs sm:tracking-[0.22em]">
              Fisioterapia y Rehabilitación
            </p>
            <h1 className="font-brand max-w-4xl text-balance text-[2.65rem] font-semibold leading-none tracking-normal sm:text-6xl lg:text-7xl">
              Daniela Ferreira
            </h1>
            <p className="mt-5 max-w-2xl text-balance text-[1.55rem] leading-8 text-white/84 sm:mt-6 sm:text-2xl sm:leading-9">
              Fisioterapia y rehabilitación personalizada para recuperar
              movimiento, funcionalidad y confianza.
            </p>
            <p className="mt-3 max-w-xl text-[0.98rem] leading-7 text-white/62 sm:mt-4 sm:text-base">
              Un enfoque clínico y cercano para acompañarte en cada etapa de tu
              recuperación.
            </p>
            <div className="mt-7 flex w-full max-w-[22rem] flex-col items-center gap-3 sm:mt-9 sm:w-auto sm:max-w-xl sm:flex-row">
              <ButtonLink external href={whatsappUrl} variant="primary" whatsapp>
                Solicitar cita por WhatsApp
              </ButtonLink>
              <ButtonLink href="/metodo-de-trabajo" variant="secondary">
                Conocer mi método
              </ButtonLink>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[28rem] lg:max-w-none">
            <div className="absolute -left-4 top-8 hidden h-28 w-px bg-[var(--brand)]/70 lg:block" />
            <div className="pointer-events-none absolute inset-x-8 -top-3 h-px bg-gradient-to-r from-transparent via-[var(--brand)]/70 to-transparent" />
            <div className="relative overflow-hidden rounded-[1.35rem] border border-white/10 bg-white/[0.055] p-2 shadow-[0_24px_70px_rgba(0,0,0,0.24)] sm:rounded-[1.6rem] sm:p-3">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1rem] sm:min-h-[500px] sm:rounded-[1.15rem] lg:min-h-[560px]">
                <Image
                  alt="Daniela Ferreira, fisioterapeuta especializada en fisioterapia y rehabilitación"
                  className="object-cover"
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  src="/DanielaFerreiraPro.png"
                />
              </div>
              <div className="pointer-events-none absolute inset-2 rounded-[1rem] ring-1 ring-inset ring-white/10 sm:inset-3 sm:rounded-[1.15rem]" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#FAF8F4]">
        <div className="mx-auto grid max-w-7xl gap-3 px-5 py-6 sm:gap-4 sm:px-6 sm:py-8 md:grid-cols-3 lg:px-8">
          {trustPoints.map((item) => (
            <div
              className="flex items-center justify-center gap-3 rounded-2xl border border-[var(--line)]/70 bg-white/90 px-4 py-3.5 text-center shadow-[0_14px_34px_rgba(35,40,39,0.035)] sm:px-5 sm:py-4"
              key={item}
            >
              <CheckCircle2 className="size-5 shrink-0 text-[var(--brand-hover)]" />
              <p className="text-[0.9rem] font-semibold text-[var(--text)] sm:text-sm">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <Section
        eyebrow="Servicios"
        title="Tratamientos principales, sin fórmulas genéricas."
        text="Cada proceso se adapta a tu situación, tus objetivos y tu evolución."
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {homeServices.map((service) => (
            <FeatureCard key={service.title} {...service} />
          ))}
        </div>
      </Section>

      <Section
        dark
        eyebrow="Método"
        title="Un proceso simple para avanzar con claridad."
        text="Evaluar, tratar y progresar. Tres pasos para que cada sesión tenga intención y continuidad."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {methodSteps.map((step, index) => (
            <FeatureCard dark index={index} key={step.title} {...step} />
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Lesiones frecuentes"
        title="Motivos de consulta habituales."
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {injuries.map((item) => (
            <div
              className="group flex items-center justify-center gap-2.5 rounded-full border border-[var(--line)]/70 bg-white/88 px-4 py-2.5 text-center text-[0.9rem] font-medium shadow-[0_10px_24px_rgba(35,40,39,0.03)] transition hover:border-[var(--brand-hover)] hover:bg-white sm:gap-3 sm:px-5 sm:py-3 sm:text-sm"
              key={item}
            >
              <span className="size-1.5 rounded-full bg-[var(--brand)]" />
              {item}
              <ArrowUpRight className="size-4 text-[var(--brand-hover)] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          ))}
        </div>
      </Section>

      <section className="bg-[#F5EFE6]">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-14 text-center sm:gap-8 sm:px-6 sm:py-16 lg:grid-cols-[0.8fr_1fr] lg:px-8 lg:py-24 lg:text-left">
          <div>
            <p className="mb-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--brand-hover)] sm:mb-3 sm:text-xs sm:tracking-[0.22em]">
              INDIBA / Radiofrecuencia
            </p>
            <h2 className="text-balance text-[2rem] font-semibold leading-tight sm:text-4xl">
              Tecnología integrada con criterio clínico.
            </h2>
          </div>
          <div className="rounded-2xl bg-white/90 p-6 text-center shadow-[0_20px_50px_rgba(35,40,39,0.07)] sm:p-7 lg:text-left">
            <p className="text-[0.98rem] leading-7 text-[var(--muted)] sm:text-base sm:leading-8">
              INDIBA se utiliza como una herramienta complementaria dentro del
              proceso de recuperación, integrada con evaluación, terapia manual y
              ejercicio terapéutico.
            </p>
            <div className="mx-auto mt-6 max-w-sm sm:mt-7 lg:mx-0">
              <ButtonLink href="/indiba-radiofrecuencia" variant="secondary">
                Conocer INDIBA
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <FinalCta
        title="Cuéntame qué te ocurre y coordinamos tu cita por WhatsApp."
        buttonLabel="Solicitar cita"
      />
    </>
  );
}
