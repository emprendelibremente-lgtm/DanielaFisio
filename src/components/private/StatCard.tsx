import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  title: string;
  value: string | number;
  detail: string;
  icon: LucideIcon;
};

export function StatCard({ title, value, detail, icon: Icon }: StatCardProps) {
  return (
    <article className="rounded-lg border border-[var(--line)] bg-white p-5 shadow-[0_14px_34px_rgba(35,40,39,0.035)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-[var(--muted)]">{title}</p>
          <p className="mt-3 text-3xl font-semibold text-[var(--text)]">
            {value}
          </p>
        </div>
        <span className="grid size-10 place-items-center rounded-full border border-[var(--brand)]/35 bg-[#FAF8F4] text-[var(--brand-hover)]">
          <Icon aria-hidden className="size-5" />
        </span>
      </div>
      <p className="mt-5 text-xs leading-5 text-[var(--muted)]">{detail}</p>
    </article>
  );
}
