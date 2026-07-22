"use client";

import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { whatsappUrl } from "@/data/site";

export function WhatsAppFloatingButton() {
  const pathname = usePathname();
  const isPrivate = pathname.startsWith("/private");

  return (
    <a
      aria-label="Solicitar cita por WhatsApp"
      className={`fixed right-4 z-50 grid size-12 place-items-center rounded-full border border-white/55 bg-[var(--brand)] text-[#0F3D3A] shadow-[0_16px_34px_rgba(15,61,58,0.2)] transition hover:bg-[var(--brand-hover)] sm:right-6 ${
        isPrivate ? "bottom-24 sm:bottom-6" : "bottom-5 sm:bottom-6"
      }`}
      href={whatsappUrl}
      rel="noopener noreferrer"
      target="_blank"
    >
      <MessageCircle aria-hidden className="size-5" />
    </a>
  );
}
