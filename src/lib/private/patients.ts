import { patients as mockPatients } from "@/data/mockPrivate";
import type { Patient } from "@/types/private";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getPrivateContext } from "./context";
import { mapPatient, type PatientRow } from "./mappers";

export async function getPatients(): Promise<Patient[]> {
  if (!isSupabaseConfigured()) {
    return mockPatients;
  }

  const { supabase, user } = await getPrivateContext();
  const { data, error } = await supabase
    .from("patients")
    .select("*")
    .eq("owner_id", user.id)
    .order("updated_at", { ascending: false });

  if (error) {
    return [];
  }

  return (data as PatientRow[]).map(mapPatient);
}

export async function getPatientById(id: string): Promise<Patient | null> {
  if (!isSupabaseConfigured()) {
    return mockPatients.find((patient) => patient.id === id) ?? null;
  }

  const { supabase, user } = await getPrivateContext();
  const { data, error } = await supabase
    .from("patients")
    .select("*")
    .eq("owner_id", user.id)
    .eq("id", id)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return mapPatient(data as PatientRow);
}
