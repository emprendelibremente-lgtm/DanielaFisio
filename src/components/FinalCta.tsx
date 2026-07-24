import { ButtonLink } from "./ButtonLink";
import { whatsappUrl } from "@/data/site";

type FinalCtaProps = {
  title?: string;
  text?: string;
  buttonLabel?: string;
};

export function FinalCta({
  buttonLabel = "Solicitar cita por WhatsApp",
  text = "Coordinaré contigo el mejor horario según disponibilidad y el motivo de consulta.",
  title = "Solicita tu cita por WhatsApp y te responderé personalmente.",
}: FinalCtaProps) {
  return (
    <section className="bg-[#FAF8F4] px-5 py-5 sm:px-6 sm:py-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[1.35rem] bg-[#101918] text-white shadow-[0_24px_70px_rgba(16,25,24,0.2)] sm:rounded-[1.7rem]">
        <div className="relative flex flex-col gap-6 px-5 py-11 text-center sm:gap-8 sm:px-8 sm:py-14 lg:flex-row lg:items-center lg:justify-between lg:px-12 lg:py-16 lg:text-left">
          <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[var(--brand)]/70 to-transparent" />
          <div className="max-w-3xl">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--brand)] sm:text-xs sm:tracking-[0.22em]">
              Solicitar cita
            </p>
            <h2 className="mt-3 text-balance text-[1.9rem] font-semibold leading-tight sm:mt-4 sm:text-4xl">
              {title}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-[0.92rem] leading-6 text-white/68 sm:mt-4 sm:text-sm lg:mx-0">
              {text}
            </p>
          </div>
          <div className="mx-auto w-full max-w-sm lg:mx-0 lg:w-auto">
            <ButtonLink external href={whatsappUrl} variant="primary" whatsapp>
              {buttonLabel}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
