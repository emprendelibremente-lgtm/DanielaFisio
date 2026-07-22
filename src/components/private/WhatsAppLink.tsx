import { MessageCircle } from "lucide-react";

export function getWhatsAppPatientUrl(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=Hola%2C%20te%20escribo%20para%20coordinar%20tu%20cita%20de%20fisioterapia.`;
}

export function WhatsAppLink({
  phone,
  label = "WhatsApp",
}: {
  phone: string;
  label?: string;
}) {
  return (
    <a
      className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-[var(--brand)]/45 bg-[var(--brand)]/18 px-4 text-sm font-semibold text-[#0F3D3A] transition hover:bg-[var(--brand)]/28"
      href={getWhatsAppPatientUrl(phone)}
      rel="noopener noreferrer"
      target="_blank"
    >
      <MessageCircle className="size-4" />
      {label}
    </a>
  );
}
