type BrandWordmarkProps = {
  compact?: boolean;
  dark?: boolean;
};

export function BrandWordmark({ compact, dark }: BrandWordmarkProps) {
  return (
    <span className="inline-flex flex-col leading-none">
      <span
        className={`font-brand font-semibold tracking-normal ${
          dark ? "text-white" : "text-[var(--text)]"
        } ${compact ? "text-[1.06rem] sm:text-lg" : "text-[1.32rem] sm:text-[1.7rem]"}`}
      >
        Daniela Ferreira
      </span>
      <span
        className={`mt-0.5 font-medium tracking-normal ${
          dark ? "text-white/58" : "text-[var(--muted)]"
        } ${compact ? "text-[0.62rem] sm:text-[0.68rem]" : "text-[0.68rem]"}`}
      >
        Fisioterapia y Rehabilitación
      </span>
    </span>
  );
}
