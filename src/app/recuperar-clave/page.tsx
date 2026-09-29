import type { Metadata } from "next";
import { danielaAllowedEmail } from "@/lib/supabase/config";
import { PasswordRecoveryForm } from "./PasswordRecoveryForm";

export const metadata: Metadata = {
  title: "Recuperar contraseña",
};

export default function PasswordRecoveryPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F4] px-5 py-12 text-[var(--text)]">
      <section className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-xl items-center">
        <div className="w-full rounded-lg border border-[var(--line)] bg-white p-7 shadow-[0_20px_50px_rgba(35,40,39,0.06)]">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand-hover)]">
            Acceso privado
          </p>
          <h1 className="mt-4 text-3xl font-semibold leading-tight">
            Recuperar contraseña
          </h1>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
            Te enviaremos un enlace seguro para crear una contraseña nueva. La
            contraseña anterior no se puede consultar.
          </p>
          <PasswordRecoveryForm initialEmail={danielaAllowedEmail} />
        </div>
      </section>
    </main>
  );
}
