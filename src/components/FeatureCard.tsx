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
      className={`group rounded-2xl border p-5 text-center transition duration-300 sm:p-6 sm:text-left ${
        dark
          ? "border-white/10 bg-white/[0.055] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] hover:-translate-y-1 hover:border-[var(--brand)]/45 hover:bg-white/[0.075]"
          : "border-[var(--line)]/70 bg-white/86 shadow-[0_18px_44px_rgba(35,40,39,0.045)] hover:-translate-y-1 hover:border-[var(--brand-hover)]/70 hover:bg-white"
      }`}
    >
      <div className="flex items-start justify-center gap-4 sm:justify-between">
        <span
          className={`grid size-10 place-items-center rounded-full border sm:size-11 ${
            dark
              ? "border-white/10 bg-white/[0.06] text-[var(--brand)]"
              : "border-[var(--brand)]/35 bg-[#FAF8F4] text-[#0F3D3A]"
          }`}
        >
          <Icon aria-hidden className="size-[1.125rem] sm:size-5" />
        </span>
        {typeof index === "number" ? (
          <span
            className={`hidden text-xs font-semibold sm:block ${
              dark ? "text-white/40" : "text-[var(--soft)]"
            }`}
          >
            0{index + 1}
          </span>
        ) : null}
      </div>
      <h3
        className={`mt-4 text-[1.05rem] font-semibold leading-snug sm:mt-6 sm:text-lg ${
          dark ? "text-white" : "text-[var(--text)]"
        }`}
      >
        {title}
      </h3>
      {text ? (
        <p
          className={`mt-2.5 text-[0.9rem] leading-6 sm:mt-3 sm:text-sm ${
            dark ? "text-white/64" : "text-[var(--muted)]"
          }`}
        >
          {text}
        </p>
      ) : null}
    </article>
  );
}
