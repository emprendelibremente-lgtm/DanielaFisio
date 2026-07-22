export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
export const danielaAllowedEmail = process.env.DANIELA_ALLOWED_EMAIL ?? "";

export function isSupabaseConfigured() {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

export function isAllowedEmail(email?: string | null) {
  if (!danielaAllowedEmail) {
    return false;
  }

  return email?.toLowerCase() === danielaAllowedEmail.toLowerCase();
}
