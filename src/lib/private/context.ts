import { requireUser } from "@/lib/auth/requireUser";
import { createClient } from "@/lib/supabase/server";

export async function getPrivateContext() {
  const user = await requireUser();
  const supabase = await createClient();

  if (!supabase) {
    throw new Error("Supabase no está configurado.");
  }

  return { supabase, user };
}
