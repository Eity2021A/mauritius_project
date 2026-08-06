import type { Metadata } from "next";

import { DEFAULT_OG_IMAGE } from "@/lib/constants";
import RoadTripMauritiusPage from "../roadtrip-mauritius/page";
import { getItineraryTranslations } from "@/data/itinerary-translations";

export const legacyMetadata: Metadata = {
  title: "Mauritius Itineraries - Plan Your Trip",
  description: "Explore pre-designed itineraries and road trips for Mauritius, or create your own custom travel plan.",
  openGraph: {
    title: "Mauritius Itineraries - Plan Your Trip",
    description: "Explore pre-designed itineraries and road trips for Mauritius.",
    images: [DEFAULT_OG_IMAGE],
  },
  alternates: { canonical: "/itineraries" },
};

export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getItineraryTranslations(locale).roadtripPage;

  return {
    title: t.metadataTitle,
    description: t.metadataDescription,
    openGraph: {
      title: t.metadataTitle,
      description: t.metadataDescription,
      images: [DEFAULT_OG_IMAGE],
    },
    alternates: { canonical: "/itineraries" },
  };
}

export default function ItinerariesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return <RoadTripMauritiusPage params={params} />;
}
