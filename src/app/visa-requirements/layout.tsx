import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Mauritius Visa Requirements 2026 - Entry Information by Country",
  description: "Check visa requirements for Mauritius by country. Find out if you need a visa, duration of stay, and entry requirements for your Mauritius trip.",
  keywords: [
    "Mauritius visa",
    "visa requirements Mauritius",
    "Mauritius entry requirements",
    "do I need visa Mauritius",
    "Mauritius visa on arrival",
    "Mauritius immigration",
  ],
  openGraph: {
    title: "Mauritius Visa Requirements 2026",
    description: "Check visa requirements for Mauritius by country. Entry information for your trip.",
    images: [DEFAULT_OG_IMAGE],
  },
  alternates: { canonical: "/visa-requirements" },
};

export default function VisaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
