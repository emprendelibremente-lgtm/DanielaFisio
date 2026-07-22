import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "dark";
  external?: boolean;
  whatsapp?: boolean;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external,
  whatsapp,
}: ButtonLinkProps) {
  const className = {
    primary:
      "bg-[var(--brand)] text-[#0F3D3A] shadow-[0_12px_30px_rgba(15,61,58,0.12)] hover:bg-[var(--brand-hover)]",
    secondary:
      "border border-[var(--line)] bg-white/75 text-[var(--text)] hover:border-[var(--brand-hover)] hover:bg-white hover:text-[#0F3D3A]",
    dark:
      "bg-[#0F3D3A] text-white shadow-[0_16px_34px_rgba(15,61,58,0.2)] hover:bg-[#101918]",
  }[variant];

  const content = (
    <>
      {whatsapp ? <MessageCircle aria-hidden className="size-4" /> : null}
      <span>{children}</span>
      {!whatsapp ? <ArrowRight aria-hidden className="size-4" /> : null}
    </>
  );

  if (external) {
    return (
      <a
        className={`inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition sm:w-fit ${className}`}
        href={href}
        rel="noopener noreferrer"
        target="_blank"
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      className={`inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition sm:w-fit ${className}`}
      href={href}
    >
      {content}
    </Link>
  );
}
