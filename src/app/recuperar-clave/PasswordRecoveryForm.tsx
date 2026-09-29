"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { Mail } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function PasswordRecoveryForm({ initialEmail }: { initialEmail: string }) {
  const [email, setEmail] = useState(initialEmail);
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    setIsError(false);

    const supabase = createClient();
    if (!supabase) {
      setIsError(true);
      setMessage("No se pudo conectar con el sistema de acceso.");
      return;
    }

    startTransition(async () => {
      const redirectTo = `${window.location.origin}/auth/callback?next=/actualizar-clave`;
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo,
      });

      if (error) {
        setIsError(true);
        setMessage("No se pudo enviar el correo. Espera unos minutos e inténtalo de nuevo.");
        return;
      }

      setMessage(
        "Revisa tu correo. Si el email corresponde al acceso administrador, recibirás un enlace para crear una contraseña nueva.",
      );
    });
  }

  return (
    <form className="mt-8 grid gap-4" onSubmit={handleSubmit}>
      <label className="block text-sm font-medium text-[var(--text)]">
        Email del administrador
        <div className="relative mt-2">
          <Mail className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[var(--muted)]" />
          <input
            autoComplete="email"
            className="min-h-12 w-full rounded-full border border-[var(--line)] bg-[#FAF8F4] px-4 pl-11 text-sm outline-none focus:border-[var(--brand-hover)]"
            onChange={(event) => setEmail(event.target.value)}
            required
            type="email"
            value={email}
          />
        </div>
      </label>
      {message ? (
        <p
          aria-live="polite"
          className={`rounded-lg border px-4 py-3 text-sm leading-6 ${
            isError
              ? "border-rose-200 bg-rose-50 text-rose-700"
              : "border-[var(--brand)]/40 bg-[var(--brand)]/15 text-[#0F3D3A]"
          }`}
        >
          {message}
        </p>
      ) : null}
      <button
        className="min-h-12 rounded-full bg-[#0F3D3A] px-5 text-sm font-semibold text-white transition hover:bg-[#101918] disabled:opacity-60"
        disabled={isPending}
        type="submit"
      >
        {isPending ? "Enviando..." : "Enviar enlace de recuperación"}
      </button>
      <Link
        className="text-center text-sm font-semibold text-[#0F3D3A] underline underline-offset-4"
        href="/login"
      >
        Volver al inicio de sesión
      </Link>
    </form>
  );
}
