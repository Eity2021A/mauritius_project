import { defineRouting } from "next-intl/routing";

export const SUPPORTED_LOCALES = ["en", "fr", "de", "it", "es", "ru"] as const;

export const routing = defineRouting({
  locales: SUPPORTED_LOCALES,
  defaultLocale: "en",
  // Keep English URLs unchanged: /beaches-in-mauritius
  // Other locales: /fr/beaches-in-mauritius
  localePrefix: "as-needed",
  // Only switch via LanguageSwitcher until page content is translated
  localeDetection: false,
});

export type AppLocale = (typeof routing.locales)[number];

export function normalizeLocale(value: string | null | undefined): AppLocale {
  const locale = value?.toLowerCase();
  return SUPPORTED_LOCALES.includes(locale as AppLocale) ? (locale as AppLocale) : routing.defaultLocale;
}
