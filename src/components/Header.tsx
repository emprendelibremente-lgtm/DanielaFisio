"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navigation, whatsappUrl } from "@/data/site";
import { ButtonLink } from "./ButtonLink";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)]/45 bg-[#FAF8F4]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
        <Link
          className="group flex items-center gap-3"
          href="/"
          onClick={() => setOpen(false)}
        >
          <span className="grid size-11 place-items-center rounded-full border border-[var(--brand)]/45 bg-white text-sm font-semibold text-[#0F3D3A] shadow-sm">
            DF
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold text-[var(--text)]">
              Daniela Ferreira
            </span>
            <span className="block text-xs text-[var(--muted)]">
              Fisioterapia y Rehabilitación
            </span>
          </span>
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
          className="grid size-11 place-items-center rounded-full border border-[var(--line)] bg-white text-[var(--text)] lg:hidden"
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-[var(--line)] bg-[#FAF8F4] px-5 py-4 lg:hidden">
          <nav className="mx-auto grid max-w-7xl gap-1" aria-label="Navegación móvil">
            {navigation.map((item) => (
              <Link
                className="rounded-xl px-3 py-3 text-sm font-medium text-[var(--text)] hover:bg-white"
                href={item.href}
                key={item.href}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-3">
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
