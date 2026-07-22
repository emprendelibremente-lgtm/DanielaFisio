type PhotoPlaceholderProps = {
  label?: string;
  dark?: boolean;
  compact?: boolean;
};

export function PhotoPlaceholder({
  label = "Espacio reservado para foto profesional real",
  dark,
  compact,
}: PhotoPlaceholderProps) {
  return (
    <div
      className={`relative overflow-hidden border ${
        dark
          ? "border-white/10 bg-[#101918]"
          : "border-[var(--line)] bg-[#F5EFE6]"
      } rounded-lg p-3`}
    >
      <div
        className={`flex ${
          compact ? "min-h-64" : "min-h-[420px]"
        } h-full items-end rounded-md border border-dashed ${
          dark ? "border-white/16" : "border-[var(--line)]"
        } bg-[linear-gradient(145deg,rgba(255,255,255,0.72),rgba(141,205,196,0.14),rgba(245,239,230,0.2))] p-5`}
      >
        <div>
          <div className="mb-4 h-px w-20 bg-[var(--brand)]" />
          <p
            className={`max-w-xs text-sm leading-6 ${
              dark ? "text-white/64" : "text-[var(--muted)]"
            }`}
          >
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}
