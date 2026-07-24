"use client";

import { usePathname } from "next/navigation";
import { whatsappUrl } from "@/data/site";

export function WhatsAppFloatingButton() {
  const pathname = usePathname();
  const isPrivate = pathname.startsWith("/private");

  return (
    <a
      aria-label="Solicitar cita por WhatsApp"
      className={`group fixed right-[18px] z-50 flex size-14 items-center justify-center rounded-full border border-[#8DCDC4]/35 bg-[linear-gradient(145deg,#0F3D3A,#145A54)] text-white shadow-[0_18px_40px_rgba(15,61,58,0.24)] ring-1 ring-[#8DCDC4]/15 transition-all duration-300 hover:-translate-y-1 hover:border-[#8DCDC4]/50 hover:shadow-[0_22px_50px_rgba(15,61,58,0.32)] active:scale-95 sm:right-7 sm:size-[3.75rem] ${
        isPrivate
          ? "bottom-24 sm:bottom-7"
          : "bottom-[calc(20px+env(safe-area-inset-bottom))] sm:bottom-7"
      }`}
      href={whatsappUrl}
      rel="noopener noreferrer"
      target="_blank"
    >
      <svg
        aria-hidden="true"
        className="size-6 transition-transform duration-300 group-hover:scale-105 sm:size-7"
        fill="currentColor"
        viewBox="0 0 32 32"
      >
        <path d="M16 3.25A12.66 12.66 0 0 0 5.13 22.42L3.65 28.75l6.47-1.52A12.66 12.66 0 1 0 16 3.25Zm0 2.33a10.33 10.33 0 0 1 8.72 15.88 10.34 10.34 0 0 1-14 3.2l-.37-.22-3.53.83.82-3.45-.24-.38A10.33 10.33 0 0 1 16 5.58Zm-4.03 5.2c-.23 0-.6.08-.92.43-.32.35-1.21 1.18-1.21 2.88s1.24 3.35 1.41 3.58c.17.23 2.39 3.84 5.93 5.22 2.94 1.15 3.54.92 4.18.86.64-.06 2.07-.84 2.36-1.66.29-.82.29-1.52.2-1.66-.09-.15-.32-.23-.67-.41-.35-.17-2.07-1.02-2.39-1.13-.32-.12-.55-.17-.78.17-.23.35-.9 1.13-1.1 1.36-.2.23-.41.26-.76.09-.35-.17-1.47-.54-2.8-1.73-1.04-.92-1.74-2.07-1.94-2.42-.2-.35-.02-.54.15-.71.16-.16.35-.41.52-.61.17-.2.23-.35.35-.58.12-.23.06-.44-.03-.61-.09-.17-.78-1.88-1.07-2.57-.28-.67-.57-.58-.78-.59h-.65Z" />
      </svg>
    </a>
  );
}
