import type { Metadata } from "next";

import ItinerariesMauritiusPage from "../itineraries-mauritius/page";
import { DEFAULT_OG_IMAGE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Mauritius Itineraries - Plan Your Trip",
  description: "Explore pre-designed itineraries and road trips for Mauritius, or create your own custom travel plan.",
  openGraph: {
    title: "Mauritius Itineraries - Plan Your Trip",
    description: "Explore pre-designed itineraries and road trips for Mauritius.",
    images: [DEFAULT_OG_IMAGE],
  },
  alternates: { canonical: "/itineraries" },
};

export const revalidate = 3600;

export default function ItinerariesPage() {
  return <ItinerariesMauritiusPage />;
}
