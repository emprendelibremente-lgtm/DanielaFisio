import { ButtonLink } from "./ButtonLink";
import { PhotoPlaceholder } from "./PhotoPlaceholder";
import { whatsappUrl } from "@/data/site";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  text: string;
  cta?: boolean;
};

export function PageHero({ eyebrow, title, text, cta = true }: PageHeroProps) {
  return (
    <section className="bg-[#FAF8F4]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-6 lg:grid-cols-[1fr_0.58fr] lg:px-8 lg:py-24">
        <div className="max-w-3xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand-hover)]">
            {eyebrow}
          </p>
          <h1 className="text-balance text-4xl font-semibold tracking-normal text-[var(--text)] sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            {text}
          </p>
          {cta ? (
            <div className="mt-8 max-w-sm">
              <ButtonLink external href={whatsappUrl} variant="dark" whatsapp>
                Solicitar cita por WhatsApp
              </ButtonLink>
            </div>
          ) : null}
        </div>
        <PhotoPlaceholder
          compact
          label="Espacio reservado para una fotografía real de Daniela o de la consulta."
        />
      </div>
    </section>
  );
}
