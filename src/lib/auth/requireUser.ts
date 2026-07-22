import { redirect } from "next/navigation";
import { isAllowedEmail, isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export async function requireUser() {
  if (!isSupabaseConfigured()) {
    redirect("/login?reason=missing-config");
  }

  const supabase = await createClient();

  if (!supabase) {
    redirect("/login?reason=missing-config");
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?reason=auth-required");
  }

  if (!isAllowedEmail(user.email)) {
    await supabase.auth.signOut();
    redirect("/login?reason=unauthorized-email");
  }

  return user;
}
