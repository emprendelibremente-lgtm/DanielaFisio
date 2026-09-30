import { treatmentSessions as mockSessions } from "@/data/mockPrivate";
import type { TreatmentSession } from "@/types/private";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getPrivateContext } from "./context";
import { mapTreatmentSession, type TreatmentSessionRow } from "./mappers";

export async function getTreatmentSessions(): Promise<TreatmentSession[]> {
  if (!isSupabaseConfigured()) {
    return mockSessions;
  }

  const { supabase, user } = await getPrivateContext();
  const { data, error } = await supabase
    .from("treatment_sessions")
    .select("*, patients(full_name)")
    .eq("owner_id", user.id)
    .order("session_date", { ascending: false });

  if (error) {
    return [];
  }

  return (data as TreatmentSessionRow[]).map(mapTreatmentSession);
}

export async function getTreatmentSessionById(
  id: string,
): Promise<TreatmentSession | null> {
  if (!isSupabaseConfigured()) {
    return mockSessions.find((session) => session.id === id) ?? null;
  }

  const { supabase, user } = await getPrivateContext();
  const { data, error } = await supabase
    .from("treatment_sessions")
    .select("*, patients(full_name)")
    .eq("owner_id", user.id)
    .eq("id", id)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return mapTreatmentSession(data as TreatmentSessionRow);
}

export async function getTreatmentSessionsByPatient(
  patientId: string,
): Promise<TreatmentSession[]> {
  const sessions = await getTreatmentSessions();
  return sessions.filter((session) => session.patientId === patientId);
}
