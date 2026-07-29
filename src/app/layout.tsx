import type { ReactNode } from "react";
import "./globals.css";

/**
 * Root layout must exist for Next.js. HTML/body live in `[locale]/layout.tsx`
 * so `lang` can match the active locale.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
