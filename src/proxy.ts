import { createServerClient } from "@supabase/ssr";
import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

/**
 * Locale routing + lightweight auth refresh.
 * Anonymous visitors (no Supabase cookies) only pay the i18n cost.
 */
export default async function proxy(request: NextRequest) {
  const response = handleI18nRouting(request);

  const hasAuthCookie = request.cookies
    .getAll()
    .some((c) => c.name.startsWith("sb-"));

  if (!hasAuthCookie) return response;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return response;

  let supabaseResponse = response;

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  try {
    await Promise.race([
      supabase.auth.getUser(),
      new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error("auth refresh timeout")), 2500);
      }),
    ]);
  } catch {
    // Never block page loads if Supabase auth refresh is slow or unavailable
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    // Skip api, auth callbacks, Next internals, and static files
    "/((?!api|auth|_next|_vercel|.*\\..*).*)",
  ],
};
