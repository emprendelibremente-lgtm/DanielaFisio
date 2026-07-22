import Link from "next/link";
import { MapPin, MessageCircle } from "lucide-react";
import { navigation, whatsappUrl } from "@/data/site";

export function Footer() {
  return (
    <footer className="bg-[#101918] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
        <div>
          <p className="text-lg font-semibold">Daniela Ferreira</p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-white/68">
            Fisioterapia personalizada, recuperación funcional y rehabilitación
            deportiva con enfoque clínico, humano y tecnológico.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Páginas</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {navigation.map((item) => (
              <Link
                className="text-sm text-white/68 transition hover:text-[var(--brand)]"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Contacto</p>
          <div className="mt-4 space-y-3 text-sm text-white/68">
            <p className="flex gap-2">
              <MapPin className="mt-0.5 size-4 text-[var(--brand)]" />
              Base profesional en Barcelona · Passeig de Gràcia
            </p>
            <a
              className="flex gap-2 transition hover:text-[var(--brand)]"
              href={whatsappUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              <MessageCircle className="mt-0.5 size-4 text-[var(--brand)]" />
              Solicitar cita por WhatsApp
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-white/48">
        © {new Date().getFullYear()} Daniela Ferreira — Fisioterapia y Rehabilitación.
      </div>
    </footer>
  );
}
