import Link from "next/link";
import type { LucideIcon } from "lucide-react";

type QuickActionCardProps = {
  title: string;
  text: string;
  href: string;
  icon: LucideIcon;
};

export function QuickActionCard({
  title,
  text,
  href,
  icon: Icon,
}: QuickActionCardProps) {
  return (
    <Link
      className="rounded-lg border border-[var(--line)] bg-white p-5 shadow-[0_14px_34px_rgba(35,40,39,0.035)] transition hover:border-[var(--brand-hover)]/70"
      href={href}
    >
      <span className="grid size-10 place-items-center rounded-full border border-[var(--brand)]/35 bg-[#FAF8F4] text-[var(--brand-hover)]">
        <Icon className="size-5" />
      </span>
      <h3 className="mt-5 text-base font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{text}</p>
    </Link>
  );
}
