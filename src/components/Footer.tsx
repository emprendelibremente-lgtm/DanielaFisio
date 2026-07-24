import Link from "next/link";
import { MapPin, MessageCircle } from "lucide-react";
import { navigation, whatsappUrl } from "@/data/site";
import { BrandWordmark } from "./BrandWordmark";

const secondaryLinks = [
  { label: "Lesiones frecuentes", href: "/lesiones-frecuentes" },
  { label: "Preguntas frecuentes", href: "/preguntas-frecuentes" },
];

export function Footer() {
  return (
    <footer className="bg-[#101918] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 text-center sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr] lg:px-8 lg:text-left">
        <div className="mx-auto max-w-sm lg:mx-0">
          <BrandWordmark dark />
          <p className="mt-4 text-sm leading-6 text-white/68">
            Fisioterapia y rehabilitación personalizada para recuperar
            movimiento, funcionalidad y confianza.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Páginas</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {[...navigation, ...secondaryLinks].map((item) => (
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
            <p className="flex justify-center gap-2 lg:justify-start">
              <MapPin className="mt-0.5 size-4 text-[var(--brand)]" />
              Base profesional en Barcelona
            </p>
            <a
              className="flex justify-center gap-2 transition hover:text-[var(--brand)] lg:justify-start"
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
