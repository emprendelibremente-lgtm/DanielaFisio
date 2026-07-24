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
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-11 sm:gap-10 sm:px-6 sm:py-14 lg:grid-cols-[1fr_0.58fr] lg:px-8 lg:py-24">
        <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:text-left">
          <p className="mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--brand-hover)] sm:mb-4 sm:text-xs sm:tracking-[0.22em]">
            {eyebrow}
          </p>
          <h1 className="text-balance text-[2.35rem] font-semibold leading-tight tracking-normal text-[var(--text)] sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-[1.04rem] leading-7 text-[var(--muted)] sm:mt-6 sm:text-lg sm:leading-8 lg:mx-0">
            {text}
          </p>
          {cta ? (
            <div className="mx-auto mt-6 max-w-sm sm:mt-8 lg:mx-0">
              <ButtonLink external href={whatsappUrl} variant="dark" whatsapp>
                Solicitar cita por WhatsApp
              </ButtonLink>
            </div>
          ) : null}
        </div>
        <PhotoPlaceholder
          compact
          label="Fotografía profesional de Daniela Ferreira"
        />
      </div>
    </section>
  );
}
