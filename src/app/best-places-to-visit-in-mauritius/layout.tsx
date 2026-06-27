import type { Metadata } from "next";
import { getImageUrl } from "@/lib/image-url";

const OG_IMAGE = {
  url: getImageUrl("pamplemousses-botanical-garden.jpg", { width: 1200, quality: 75 }),
  width: 1200,
  height: 630,
  alt: "Pamplemousses Botanical Garden — Best places to visit in Mauritius",
} as const;

export const metadata: Metadata = {
  title: "Best Places to Visit in Mauritius - Top Attractions 2026",
  description: "Explore the best places to visit in Mauritius. Discover waterfalls, nature parks, islands, and hidden gems. Your complete guide to Mauritius attractions.",
  keywords: [
    "places to visit Mauritius",
    "Mauritius attractions",
    "Chamarel",
    "Black River Gorges",
    "Ile aux Cerfs",
    "Seven Coloured Earths",
    "waterfalls Mauritius",
    "things to do Mauritius",
  ],
  openGraph: {
    title: "Best Places to Visit in Mauritius",
    description: "Explore the best places to visit in Mauritius. Waterfalls, nature parks, and hidden gems.",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Places to Visit in Mauritius",
    description: "Explore the best places to visit in Mauritius. Waterfalls, nature parks, and hidden gems.",
    images: [OG_IMAGE.url],
  },
  alternates: { canonical: "/best-places-to-visit-in-mauritius" },
};

export default function PlacesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
