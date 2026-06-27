import type { Metadata } from "next";
import { getImageUrl } from "@/lib/image-url";

const OG_IMAGE = {
  url: getImageUrl("swimming-with-dolphins.jpg", { width: 1200, quality: 75 }),
  width: 1200,
  height: 630,
  alt: "Swimming with dolphins — Activities and adventures in Mauritius",
} as const;

export const metadata: Metadata = {
  title: "Activities in Mauritius - Tours & Adventures 2026",
  description: "Book the best activities in Mauritius. From catamaran cruises to dolphin swimming, helicopter tours, and diving adventures. Find your perfect Mauritius experience.",
  keywords: [
    "Mauritius activities",
    "Mauritius tours",
    "catamaran cruise Mauritius",
    "swim with dolphins",
    "diving Mauritius",
    "helicopter tour",
    "water sports Mauritius",
    "adventure tours",
  ],
  openGraph: {
    title: "Activities in Mauritius - Tours & Adventures",
    description: "Book the best activities in Mauritius. Catamaran cruises, diving, and adventure tours.",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Activities in Mauritius - Tours & Adventures",
    description: "Book the best activities in Mauritius. Catamaran cruises, diving, and adventure tours.",
    images: [OG_IMAGE.url],
  },
  alternates: { canonical: "/mauritius-activities" },
};

export default function ActivitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
