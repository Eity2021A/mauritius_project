import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Welcome to Mauritius Island - Your Complete Travel Guide",
  description: "Welcome to Mauritius! Discover everything about this tropical paradise. Beaches, culture, activities, and insider tips for your perfect vacation.",
  keywords: [
    "Mauritius island",
    "Mauritius travel guide",
    "Mauritius vacation",
    "Mauritius holiday",
    "tropical island",
    "Indian Ocean",
  ],
  openGraph: {
    title: "Welcome to Mauritius Island",
    description: "Discover everything about Mauritius. Your complete travel guide.",
    images: [DEFAULT_OG_IMAGE],
  },
  alternates: { canonical: "/mauritius-island" },
};

export default function MauritiusIslandLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
