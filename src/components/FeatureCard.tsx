import type { LucideIcon } from "lucide-react";

type FeatureCardProps = {
  title: string;
  text?: string;
  icon: LucideIcon;
  index?: number;
  dark?: boolean;
};

export function FeatureCard({
  title,
  text,
  icon: Icon,
  index,
  dark,
}: FeatureCardProps) {
  return (
    <article
      className={`group border p-6 transition ${
        dark
          ? "border-white/10 bg-white/[0.04] hover:border-[var(--brand)]/45"
          : "border-[var(--line)] bg-white shadow-[0_14px_34px_rgba(35,40,39,0.035)] hover:border-[var(--brand-hover)]/70"
      } rounded-lg`}
    >
      <div className="flex items-start justify-between gap-4">
        <span
          className={`grid size-10 place-items-center rounded-full border ${
            dark
              ? "border-white/10 bg-white/[0.04] text-[var(--brand)]"
              : "border-[var(--brand)]/35 bg-[#FAF8F4] text-[var(--brand-hover)]"
          }`}
        >
          <Icon aria-hidden className="size-5" />
        </span>
        {typeof index === "number" ? (
          <span
            className={`text-xs font-semibold ${
              dark ? "text-white/40" : "text-[var(--soft)]"
            }`}
          >
            0{index + 1}
          </span>
        ) : null}
      </div>
      <h3
        className={`mt-6 text-lg font-semibold leading-snug ${
          dark ? "text-white" : "text-[var(--text)]"
        }`}
      >
        {title}
      </h3>
      {text ? (
        <p
          className={`mt-3 text-sm leading-6 ${
            dark ? "text-white/64" : "text-[var(--muted)]"
          }`}
        >
          {text}
        </p>
      ) : null}
    </article>
  );
}
