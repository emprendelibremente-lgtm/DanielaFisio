import { appointments as mockAppointments } from "@/data/mockPrivate";
import type { Appointment } from "@/types/private";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getPrivateContext } from "./context";
import { mapAppointment, type AppointmentRow } from "./mappers";

export async function getAppointments(): Promise<Appointment[]> {
  if (!isSupabaseConfigured()) {
    return mockAppointments;
  }

  const { supabase, user } = await getPrivateContext();
  const { data, error } = await supabase
    .from("appointments")
    .select("*")
    .eq("owner_id", user.id)
    .order("appointment_date", { ascending: true })
    .order("appointment_time", { ascending: true });

  if (error) {
    return [];
  }

  return (data as AppointmentRow[]).map(mapAppointment);
}
