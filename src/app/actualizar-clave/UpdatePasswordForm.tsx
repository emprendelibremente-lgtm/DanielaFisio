"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function UpdatePasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);

    if (password.length < 8) {
      setMessage("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    if (password !== confirmation) {
      setMessage("Las contraseñas no coinciden.");
      return;
    }

    const supabase = createClient();
    if (!supabase) {
      setMessage("No se pudo conectar con el sistema de acceso.");
      return;
    }

    startTransition(async () => {
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        setMessage(
          "No se pudo cambiar la contraseña. Solicita un enlace de recuperación nuevo.",
        );
        return;
      }

      router.replace("/private");
      router.refresh();
    });
  }

  return (
    <form className="mt-8 grid gap-4" onSubmit={handleSubmit}>
      {[
        {
          autoComplete: "new-password",
          label: "Nueva contraseña",
          onChange: setPassword,
          value: password,
        },
        {
          autoComplete: "new-password",
          label: "Repetir contraseña",
          onChange: setConfirmation,
          value: confirmation,
        },
      ].map((field) => (
        <label className="block text-sm font-medium text-[var(--text)]" key={field.label}>
          {field.label}
          <div className="relative mt-2">
            <LockKeyhole className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[var(--muted)]" />
            <input
              autoComplete={field.autoComplete}
              className="min-h-12 w-full rounded-full border border-[var(--line)] bg-[#FAF8F4] px-4 pl-11 text-sm outline-none focus:border-[var(--brand-hover)]"
              minLength={8}
              onChange={(event) => field.onChange(event.target.value)}
              required
              type="password"
              value={field.value}
            />
          </div>
        </label>
      ))}
      {message ? (
        <p aria-live="polite" className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {message}
        </p>
      ) : null}
      <button
        className="min-h-12 rounded-full bg-[#0F3D3A] px-5 text-sm font-semibold text-white transition hover:bg-[#101918] disabled:opacity-60"
        disabled={isPending}
        type="submit"
      >
        {isPending ? "Guardando..." : "Guardar nueva contraseña"}
      </button>
    </form>
  );
}
