import { sessionPackages as mockPackages } from "@/data/mockPrivate";
import type { SessionPackage } from "@/types/private";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getPrivateContext } from "./context";
import { mapSessionPackage, type SessionPackageRow } from "./mappers";

export async function getSessionPackages(): Promise<SessionPackage[]> {
  if (!isSupabaseConfigured()) {
    return mockPackages;
  }

  const { supabase, user } = await getPrivateContext();
  const { data, error } = await supabase
    .from("session_packages")
    .select("*, patients(full_name)")
    .eq("owner_id", user.id)
    .order("updated_at", { ascending: false });

  if (error) {
    return [];
  }

  return (data as SessionPackageRow[]).map(mapSessionPackage);
}
