import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Mauritius FAQ - Frequently Asked Questions About Mauritius",
  description: "Find answers to common questions about visiting Mauritius. Travel tips, best time to visit, visa info, currency, and everything you need to know.",
  keywords: [
    "Mauritius FAQ",
    "Mauritius questions",
    "Mauritius travel tips",
    "Mauritius currency",
    "Mauritius weather",
    "Mauritius language",
  ],
  openGraph: {
    title: "Mauritius FAQ - Your Questions Answered",
    description: "Find answers to common questions about visiting Mauritius.",
    images: [DEFAULT_OG_IMAGE],
  },
  alternates: { canonical: "/faq-about-mauritius" },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
