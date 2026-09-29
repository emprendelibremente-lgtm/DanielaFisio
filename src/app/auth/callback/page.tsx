"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

function safeNext(value: string | null) {
  return value?.startsWith("/") && !value.startsWith("//")
    ? value
    : "/private";
}

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    let active = true;

    async function completeAuthentication() {
      const supabase = createClient();
      if (!supabase) {
        router.replace("/login?reason=recovery-link-invalid");
        return;
      }

      const url = new URL(window.location.href);
      const next = safeNext(url.searchParams.get("next"));
      const code = url.searchParams.get("code");
      const hash = new URLSearchParams(url.hash.slice(1));
      const accessToken = hash.get("access_token");
      const refreshToken = hash.get("refresh_token");

      let error: Error | null = null;

      if (accessToken && refreshToken) {
        const result = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
        error = result.error;
      } else if (code) {
        const result = await supabase.auth.exchangeCodeForSession(code);
        error = result.error;
      } else {
        const result = await supabase.auth.getSession();
        error = result.error;
        if (!result.data.session) {
          error = new Error("No recovery session");
        }
      }

      if (!active) {
        return;
      }

      router.replace(error ? "/login?reason=recovery-link-invalid" : next);
      router.refresh();
    }

    void completeAuthentication();

    return () => {
      active = false;
    };
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FAF8F4] px-5 text-[var(--text)]">
      <p className="rounded-lg border border-[var(--line)] bg-white px-6 py-4 text-sm font-medium text-[var(--muted)] shadow-sm">
        Validando el enlace de recuperación…
      </p>
    </main>
  );
}
