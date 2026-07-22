type SectionProps = {
  eyebrow?: string;
  title: string;
  text?: string;
  children: React.ReactNode;
  dark?: boolean;
};

export function Section({ eyebrow, title, text, children, dark }: SectionProps) {
  return (
    <section className={dark ? "bg-[#101918] text-white" : "bg-[#FAF8F4]"}>
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mb-10 max-w-3xl">
          {eyebrow ? (
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand-hover)]">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="text-balance text-3xl font-semibold tracking-normal sm:text-4xl">
            {title}
          </h2>
          {text ? (
            <p
              className={`mt-4 text-base leading-7 ${
                dark ? "text-white/68" : "text-[var(--muted)]"
              }`}
            >
              {text}
            </p>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}
