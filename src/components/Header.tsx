"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navigation, whatsappUrl } from "@/data/site";
import { BrandWordmark } from "./BrandWordmark";
import { ButtonLink } from "./ButtonLink";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)]/35 bg-[#FAF8F4]/88 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:px-6 sm:py-3.5 lg:px-8">
        <Link
          className="group flex items-center gap-3"
          href="/"
          onClick={() => setOpen(false)}
        >
          <span className="grid size-10 place-items-center rounded-full border border-[var(--brand)]/45 bg-white/90 font-brand text-[0.8rem] font-semibold text-[#0F3D3A] shadow-sm transition group-hover:border-[var(--brand-hover)] sm:size-11 sm:text-sm">
            DF
          </span>
          <BrandWordmark compact />
        </Link>

        <nav aria-label="Navegación principal" className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                className={`rounded-full px-3 py-2 text-sm transition ${
                  active
                    ? "bg-white text-[#0F3D3A] shadow-sm ring-1 ring-[var(--brand)]/25"
                    : "text-[var(--muted)] hover:bg-white/70 hover:text-[var(--text)]"
                }`}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <ButtonLink external href={whatsappUrl} variant="dark" whatsapp>
            Solicitar cita
          </ButtonLink>
        </div>

        <button
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className="grid size-10 place-items-center rounded-full border border-[var(--line)] bg-white/85 text-[var(--text)] shadow-sm sm:size-11 lg:hidden"
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-[var(--line)]/45 bg-[#FAF8F4]/96 px-4 py-3 backdrop-blur-2xl lg:hidden">
          <nav
            className="mx-auto grid max-w-7xl gap-1.5 rounded-2xl border border-[var(--line)]/55 bg-white/70 p-2 shadow-[0_18px_48px_rgba(35,40,39,0.08)]"
            aria-label="Navegación móvil"
          >
            {navigation.map((item) => (
              <Link
                className={`rounded-full px-4 py-2.5 text-center text-sm font-semibold transition ${
                  pathname === item.href
                    ? "bg-[#0F3D3A] text-white"
                    : "text-[var(--text)] hover:bg-[#FAF8F4]"
                }`}
                href={item.href}
                key={item.href}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="px-1 pt-1.5">
              <ButtonLink external href={whatsappUrl} variant="dark" whatsapp>
                Solicitar cita por WhatsApp
              </ButtonLink>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
