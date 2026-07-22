"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole, Mail } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function LoginForm({
  initialEmail,
  initialMessage,
}: {
  initialEmail: string;
  initialMessage: string | null;
}) {
  const router = useRouter();
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(initialMessage);
  const [isPending, startTransition] = useTransition();
  const supabase = createClient();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);

    if (!supabase) {
      setMessage("Supabase no está configurado todavía. Revisa .env.local.");
      return;
    }

    startTransition(async () => {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setMessage("No se pudo iniciar sesión. Revisa el email y la contraseña.");
        return;
      }

      router.replace("/private");
      router.refresh();
    });
  }

  return (
    <form className="mt-8 grid gap-4" onSubmit={handleSubmit}>
      <label className="block text-sm font-medium text-[var(--text)]">
        Email
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
      <label className="block text-sm font-medium text-[var(--text)]">
        Contraseña
        <div className="relative mt-2">
          <LockKeyhole className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[var(--muted)]" />
          <input
            autoComplete="current-password"
            className="min-h-12 w-full rounded-full border border-[var(--line)] bg-[#FAF8F4] px-4 pl-11 text-sm outline-none focus:border-[var(--brand-hover)]"
            onChange={(event) => setPassword(event.target.value)}
            required
            type="password"
            value={password}
          />
        </div>
      </label>
      {message ? (
        <p className="rounded-lg border border-[var(--line)] bg-[#F5EFE6] px-4 py-3 text-sm leading-6 text-[var(--muted)]">
          {message}
        </p>
      ) : null}
      <button
        className="min-h-12 rounded-full bg-[#0F3D3A] px-5 text-sm font-semibold text-white transition hover:bg-[#101918] disabled:opacity-60"
        disabled={isPending}
        type="submit"
      >
        {isPending ? "Entrando..." : "Entrar al dashboard"}
      </button>
    </form>
  );
}
