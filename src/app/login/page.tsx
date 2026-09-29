import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LoginForm } from "./LoginForm";
import {
  danielaAllowedEmail,
  isAllowedEmail,
  isSupabaseConfigured,
} from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Login privado",
};

function getReasonText(reason?: string) {
  if (reason === "missing-config") {
    return "Faltan las variables de Supabase. Configura .env.local antes de acceder al dashboard real.";
  }

  if (reason === "missing-allowed-email") {
    return "Falta configurar el email autorizado del área privada.";
  }

  if (reason === "unauthorized-email") {
    return "Este email no está autorizado para acceder al área privada.";
  }

  if (reason === "auth-required") {
    return "Inicia sesión para acceder al área privada.";
  }

  if (reason === "recovery-link-invalid") {
    return "El enlace de recuperación no es válido o ha caducado. Solicita uno nuevo.";
  }

  return null;
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ reason?: string }>;
}) {
  const { reason } = await searchParams;

  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const {
      data: { user },
    } = supabase
      ? await supabase.auth.getUser()
      : { data: { user: null } };

    if (user && isAllowedEmail(user.email)) {
      redirect("/private");
    }

    if (user && !isAllowedEmail(user.email)) {
      await supabase?.auth.signOut();
    }
  }

  return (
    <main className="min-h-screen bg-[#FAF8F4] px-5 py-12 text-[var(--text)]">
      <section className="mx-auto grid min-h-[calc(100vh-6rem)] max-w-6xl items-center gap-8 lg:grid-cols-[0.9fr_1fr]">
        <div className="rounded-lg border border-[var(--line)] bg-white p-7 shadow-[0_20px_50px_rgba(35,40,39,0.06)]">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand-hover)]">
            Acceso privado
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight">
            Daniela Ferreira
          </h1>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
            Login con email y contraseña para proteger el dashboard privado.
            No hay registro público abierto.
          </p>
          <LoginForm
            initialEmail={danielaAllowedEmail}
            initialMessage={getReasonText(reason)}
          />
        </div>

        <div className="rounded-lg bg-[#101918] p-7 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand)]">
            Seguridad primero
          </p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight">
            Datos sensibles, acceso controlado.
          </h2>
          <p className="mt-4 text-sm leading-6 text-white/68">
            Esta fase prepara autenticación, Supabase y políticas RLS. No
            ingreses pacientes reales hasta revisar privacidad, textos legales y
            configuración de seguridad.
          </p>
        </div>
      </section>
    </main>
  );
}
