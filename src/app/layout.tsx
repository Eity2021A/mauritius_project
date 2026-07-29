import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import Providers from "@/components/Providers";
import messages from "../../messages/en.json";
import "./globals.css";

/**
 * Root layout must exist for Next.js. HTML/body live in `[locale]/layout.tsx`
 * so `lang` can match the active locale.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <NextIntlClientProvider locale="en" messages={messages}>
      <Providers>{children}</Providers>
    </NextIntlClientProvider>
  );
}
