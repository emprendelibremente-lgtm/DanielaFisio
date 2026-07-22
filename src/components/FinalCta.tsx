import { ButtonLink } from "./ButtonLink";
import { whatsappUrl } from "@/data/site";

export function FinalCta() {
  return (
    <section className="bg-[#101918] text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-16 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-20">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand)]">
            Solicitar cita
          </p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
            Solicita tu cita por WhatsApp y te responderé personalmente.
          </h2>
          <p className="mt-4 text-sm leading-6 text-white/68">
            Coordinaré contigo el mejor horario según disponibilidad y el motivo
            de consulta.
          </p>
        </div>
        <ButtonLink external href={whatsappUrl} variant="primary" whatsapp>
          Solicitar cita por WhatsApp
        </ButtonLink>
      </div>
    </section>
  );
}
