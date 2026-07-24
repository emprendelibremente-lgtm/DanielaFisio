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
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-[4.5rem] lg:px-8 lg:py-24">
        <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-10 lg:mx-0 lg:text-left">
          {eyebrow ? (
            <p className="mb-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--brand-hover)] sm:mb-3 sm:text-xs sm:tracking-[0.22em]">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="text-balance text-[2rem] font-semibold leading-tight tracking-normal sm:text-4xl">
            {title}
          </h2>
          {text ? (
            <p
              className={`mt-3 text-[0.98rem] leading-7 sm:mt-4 sm:text-base ${
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
