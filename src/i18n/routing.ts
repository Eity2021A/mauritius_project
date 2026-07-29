import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "fr", "de", "it", "es", "ru"],
  defaultLocale: "en",
  // Keep English URLs unchanged: /beaches-in-mauritius
  // Other locales: /fr/beaches-in-mauritius
  localePrefix: "as-needed",
  // Only switch via LanguageSwitcher until page content is translated
  localeDetection: false,
});

export type AppLocale = (typeof routing.locales)[number];
