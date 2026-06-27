import type { Metadata } from "next";
import { GIVEAWAY_FEATURE_IMAGE } from "@/lib/giveaway-assets";
import { getImageUrl } from "@/lib/image-url";

const OG_IMAGE = {
  url: getImageUrl(GIVEAWAY_FEATURE_IMAGE, { width: 1200, height: 630, quality: 80 }),
  width: 1200,
  height: 630,
  alt: "Win a weekend in Mauritius — Mauritius Explored giveaway",
} as const;

export const metadata: Metadata = {
  title: "Giveaway - Win Unforgettable Mauritius Experiences | Mauritius Explored",
  description:
    "Enter our exclusive giveaway: weekly draws from 19 April. Luxury experiences, stays, and adventures for two. Share on social media and submit your details.",
  openGraph: {
    title: "Giveaway — Unforgettable Mauritius Experiences",
    description:
      "Weekly draws from 19 April. Enter for a chance to win tours, stays, and adventures across Mauritius.",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Giveaway — Unforgettable Mauritius Experiences",
    description:
      "Weekly draws from 19 April. Enter for a chance to win tours, stays, and adventures across Mauritius.",
    images: [OG_IMAGE.url],
  },
  alternates: { canonical: "/giveaway" },
};

export default function GiveawayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
