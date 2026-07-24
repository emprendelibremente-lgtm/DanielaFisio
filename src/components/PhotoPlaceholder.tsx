import Image from "next/image";

type PhotoPlaceholderProps = {
  label?: string;
  dark?: boolean;
  compact?: boolean;
  src?: string;
  alt?: string;
};

export function PhotoPlaceholder({
  label = "Espacio reservado para foto profesional real",
  dark,
  compact,
  src = "/DanielaFerreiraPro.png",
  alt = "Daniela Ferreira, fisioterapeuta especializada en fisioterapia y rehabilitación",
}: PhotoPlaceholderProps) {
  return (
    <div
      aria-label={label}
      className={`relative overflow-hidden border shadow-[0_20px_54px_rgba(35,40,39,0.07)] ${
        dark
          ? "border-white/10 bg-[#101918]"
          : "border-[var(--line)]/70 bg-[#F5EFE6]"
      } rounded-2xl p-2 sm:p-3`}
    >
      <div
        className={`relative ${
          compact ? "aspect-[4/5] min-h-0 sm:min-h-80" : "min-h-[420px]"
        } h-full overflow-hidden rounded-xl border ${
          dark ? "border-white/16" : "border-[var(--line)]"
        } bg-[#F5EFE6]`}
      >
        <Image
          alt={alt}
          className="object-cover"
          fill
          sizes={compact ? "(min-width: 1024px) 32vw, 100vw" : "(min-width: 1024px) 38vw, 100vw"}
          src={src}
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(16,25,24,0.02),rgba(16,25,24,0.18))]" />
      </div>
    </div>
  );
}
