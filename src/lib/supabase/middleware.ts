import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import {
  danielaAllowedEmail,
  isAllowedEmail,
  isSupabaseConfigured,
  supabaseAnonKey,
  supabaseUrl,
} from "./config";

export async function updateSession(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isPrivate = pathname.startsWith("/private");
  const isLogin = pathname.startsWith("/login");

  if (!isPrivate && !isLogin) {
    return NextResponse.next({ request });
  }

  if (!isSupabaseConfigured()) {
    if (isPrivate) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("reason", "missing-config");
      return NextResponse.redirect(url);
    }

    return NextResponse.next({ request });
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (isPrivate && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("reason", "auth-required");
    return NextResponse.redirect(url);
  }

  if (isPrivate && user && !isAllowedEmail(user.email)) {
    await supabase.auth.signOut();

    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set(
      "reason",
      danielaAllowedEmail ? "unauthorized-email" : "missing-allowed-email",
    );
    return NextResponse.redirect(url);
  }

  if (isLogin && user && isAllowedEmail(user.email)) {
    const url = request.nextUrl.clone();
    url.pathname = "/private";
    return NextResponse.redirect(url);
  }

  return response;
}
