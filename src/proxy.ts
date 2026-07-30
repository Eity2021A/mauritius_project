import { createServerClient } from "@supabase/ssr";
import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

const LANGUAGE_SLUG_LOCALE_MAP: Record<string, string> = {
  english: "en",
  french: "fr",
  german: "de",
  italian: "it",
  spanish: "es",
  russian: "ru",
};

const DYNAMIC_TRANSLATED_BASES = new Set([
  "top-activities-mauritius",
  "beaches-in-mauritius",
  "best-places-to-visit-in-mauritius",
  "veranda-hotels",
  "blog",
]);

function getLanguageSlugRedirect(request: NextRequest) {
  const segments = request.nextUrl.pathname.split("/").filter(Boolean);
  const [base, slug] = segments;

  if (!base || !slug || segments.length !== 2) return null;
  if (!DYNAMIC_TRANSLATED_BASES.has(base)) return null;
  if (routing.locales.includes(base as (typeof routing.locales)[number])) return null;

  const targetLocale = LANGUAGE_SLUG_LOCALE_MAP[slug.toLowerCase()];
  if (!targetLocale || targetLocale === routing.defaultLocale) return null;

  const url = request.nextUrl.clone();
  url.pathname = `/${targetLocale}/${base}/${slug}`;
  return url;
}

/**
 * Locale routing + lightweight auth refresh.
 * Anonymous visitors (no Supabase cookies) only pay the i18n cost.
 */
export default async function proxy(request: NextRequest) {
  const languageSlugRedirect = getLanguageSlugRedirect(request);
  if (languageSlugRedirect) {
    return NextResponse.redirect(languageSlugRedirect);
  }

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
