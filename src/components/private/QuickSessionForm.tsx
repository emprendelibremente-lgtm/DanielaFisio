import Link from "next/link";
import { ClipboardPlus } from "lucide-react";

export function QuickSessionForm() {
  return (
    <section className="rounded-lg border border-[var(--line)] bg-white p-6 shadow-[0_14px_34px_rgba(35,40,39,0.035)]">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-hover)]">
        Acceso rápido
      </p>
      <h2 className="mt-3 text-2xl font-semibold">Registrar en menos de 1 minuto</h2>
      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
        Anota lo esencial después de una cita desde el formulario seguro de
        sesiones.
      </p>
      <Link
        className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#0F3D3A] px-5 text-sm font-semibold text-white transition hover:bg-[#101918]"
        href="/private/sesiones/nueva"
      >
        <ClipboardPlus className="size-4" />
        Registrar sesión
      </Link>
    </section>
  );
}
