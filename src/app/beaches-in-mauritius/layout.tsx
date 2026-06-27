import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Best Beaches in Mauritius - Complete Guide 2026",
  description: "Discover the most beautiful beaches in Mauritius. From the iconic Le Morne to hidden gems like La Cambuse, explore crystal-clear waters, white sand, and tropical paradise.",
  keywords: [
    "Mauritius beaches",
    "best beaches Mauritius",
    "Le Morne beach",
    "Trou aux Biches",
    "Flic en Flac",
    "Belle Mare",
    "tropical beaches",
    "Indian Ocean beaches",
  ],
  openGraph: {
    title: "Best Beaches in Mauritius - Complete Guide",
    description: "Discover the most beautiful beaches in Mauritius. Crystal-clear waters and white sand paradise.",
    images: [DEFAULT_OG_IMAGE],
  },
  alternates: { canonical: "/beaches-in-mauritius" },
};

export default function BeachesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
