import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";

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
      "bg-[var(--brand)] text-[#0F3D3A] shadow-[0_14px_34px_rgba(15,61,58,0.14)] hover:-translate-y-0.5 hover:bg-[var(--brand-hover)] hover:shadow-[0_18px_40px_rgba(15,61,58,0.18)]",
    secondary:
      "border border-[var(--line)] bg-white/70 text-[var(--text)] shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] backdrop-blur hover:-translate-y-0.5 hover:border-[var(--brand-hover)] hover:bg-white hover:text-[#0F3D3A]",
    dark:
      "bg-[#0F3D3A] text-white shadow-[0_16px_34px_rgba(15,61,58,0.22)] hover:-translate-y-0.5 hover:bg-[#101918] hover:shadow-[0_20px_42px_rgba(15,61,58,0.24)]",
  }[variant];

  const content = (
    <>
      {whatsapp ? <WhatsAppIcon className="size-4" /> : null}
      <span>{children}</span>
      {!whatsapp ? <ArrowRight aria-hidden className="size-4" /> : null}
    </>
  );

  if (external) {
    return (
      <a
        className={`inline-flex min-h-[3.15rem] w-full max-w-[22rem] items-center justify-center gap-2 rounded-full px-5 text-[0.94rem] font-semibold transition duration-300 sm:w-fit sm:px-6 sm:text-sm ${className}`}
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
      className={`inline-flex min-h-[3.15rem] w-full max-w-[22rem] items-center justify-center gap-2 rounded-full px-5 text-[0.94rem] font-semibold transition duration-300 sm:w-fit sm:px-6 sm:text-sm ${className}`}
      href={href}
    >
      {content}
    </Link>
  );
}
