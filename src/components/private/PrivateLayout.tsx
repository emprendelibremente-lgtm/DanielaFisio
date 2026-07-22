"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  ClipboardList,
  Home,
  Settings,
  TicketCheck,
  UserRound,
  UsersRound,
} from "lucide-react";
import { PrivateHeader } from "./PrivateHeader";

const navItems = [
  { label: "Inicio", href: "/private", icon: Home },
  { label: "Pacientes", href: "/private/pacientes", icon: UsersRound },
  { label: "Agenda", href: "/private/agenda", icon: CalendarDays },
  { label: "Sesiones", href: "/private/sesiones", icon: ClipboardList },
  { label: "Bonos", href: "/private/bonos", icon: TicketCheck },
  { label: "Configuración", href: "/private/configuracion", icon: Settings },
];

export function PrivateLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#FAF8F4] pb-20 text-[var(--text)] lg:pb-0">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-white/10 bg-[#101918] px-5 py-6 text-white lg:block">
        <Link className="flex items-center gap-3" href="/">
          <span className="grid size-11 place-items-center rounded-full border border-[var(--brand)]/40 bg-white/8 text-sm font-semibold text-[var(--brand)]">
            DF
          </span>
          <span>
            <span className="block text-sm font-semibold">Daniela Ferreira</span>
            <span className="block text-xs text-white/52">
              Área privada
            </span>
          </span>
        </Link>

        <nav className="mt-10 grid gap-1" aria-label="Navegación privada">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active =
              pathname === item.href ||
              (item.href !== "/private" && pathname.startsWith(item.href));

            return (
              <Link
                className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition ${
                  active
                    ? "bg-white text-[#0F3D3A]"
                    : "text-white/64 hover:bg-white/8 hover:text-white"
                }`}
                href={item.href}
                key={item.href}
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute inset-x-5 bottom-6 rounded-lg border border-white/10 bg-white/[0.04] p-4">
          <UserRound className="size-5 text-[var(--brand)]" />
          <p className="mt-3 text-sm font-semibold">Uso controlado</p>
          <p className="mt-2 text-xs leading-5 text-white/52">
            No ingresar pacientes reales hasta completar la revisión legal y de
            seguridad.
          </p>
        </div>
      </aside>

      <div className="lg:pl-72">
        <PrivateHeader title={title} />
        <main className="px-5 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>

      <nav
        className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-6 border-t border-[var(--line)] bg-[#FAF8F4]/95 px-2 py-2 backdrop-blur-xl lg:hidden"
        aria-label="Navegación privada móvil"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const active =
            pathname === item.href ||
            (item.href !== "/private" && pathname.startsWith(item.href));

          return (
            <Link
              className={`flex min-h-12 flex-col items-center justify-center gap-1 rounded-lg text-[10px] font-medium ${
                active
                  ? "bg-white text-[#0F3D3A] shadow-sm"
                  : "text-[var(--muted)]"
              }`}
              href={item.href}
              key={item.href}
            >
              <Icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
