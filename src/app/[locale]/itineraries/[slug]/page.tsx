import { notFound } from "next/navigation";
import type { Metadata } from "next";

import ItineraryDetailView from "@/components/ItineraryDetailView";
import { DEFAULT_OG_IMAGE } from "@/lib/constants";
import { getImageUrl } from "@/lib/image-url";
import { trimMetaDescription } from "@/lib/seo";
import {
  getActivityDetailsBySlugFromDb,
  getBeachDetailsBySlug,
  getPlaceDetailsBySlug,
} from "@/lib/content";
import {
  getFeaturedItineraries,
  getFeaturedItineraryBySlug,
  getFeaturedItinerarySlugs,
} from "@/lib/featured-itineraries";
import type { PreDesignedStop } from "@/data/predesigned-itineraries";
import type { RouteInfo } from "@/components/ItineraryBuilderMap";
import {
  localizePreDesignedItineraries,
  localizePreDesignedItinerary,
} from "@/data/localized-predesigned-itineraries";

async function getStopPosition(stop: PreDesignedStop, locale: string): Promise<[number, number]> {
  if (stop.type === "place") {
    const place = await getPlaceDetailsBySlug(stop.slug, locale);
    if (place?.coordinates && (place.coordinates[0] !== 0 || place.coordinates[1] !== 0)) {
      return place.coordinates;
    }
  }
  if (stop.type === "beach") {
    const details = await getBeachDetailsBySlug(stop.slug, locale);
    if (details?.coordinates && (details.coordinates[0] !== 0 || details.coordinates[1] !== 0)) {
      return details.coordinates;
    }
  }
  if (stop.type === "activity") {
    const activity = await getActivityDetailsBySlugFromDb(stop.slug, locale);
    if (activity?.coordinates && (activity.coordinates[0] !== 0 || activity.coordinates[1] !== 0)) {
      return activity.coordinates;
    }
  }
  return stop.position;
}

async function getStopDescription(stop: PreDesignedStop, locale: string): Promise<string | undefined> {
  if (stop.type === "place") {
    const place = await getPlaceDetailsBySlug(stop.slug, locale);
    if (!place) return undefined;
    const paras = Array.isArray(place.description) ? place.description : [];
    return paras.length > 0 ? [place.tagline, ...paras.slice(0, 2)].filter(Boolean).join(" ") : place.tagline ?? "";
  }
  if (stop.type === "beach") {
    const details = await getBeachDetailsBySlug(stop.slug, locale);
    if (!details) return undefined;
    const paras = Array.isArray(details.description) ? details.description : [];
    return paras.length > 0 ? [details.tagline, ...paras.slice(0, 2)].filter(Boolean).join(" ") : details.tagline ?? "";
  }
  if (stop.type === "activity") {
    const activity = await getActivityDetailsBySlugFromDb(stop.slug, locale);
    if (!activity) return undefined;
    const paras = Array.isArray(activity.description) ? activity.description : [];
    return paras.length > 0 ? [activity.tagline, ...paras.slice(0, 2)].filter(Boolean).join(" ") : activity.tagline ?? "";
  }
  return undefined;
}

async function getStopImages(stop: PreDesignedStop, locale: string): Promise<string[] | undefined> {
  if (stop.type === "place") {
    const place = await getPlaceDetailsBySlug(stop.slug, locale);
    return place?.images;
  }
  if (stop.type === "beach") {
    const details = await getBeachDetailsBySlug(stop.slug, locale);
    return details?.images;
  }
  if (stop.type === "activity") {
    const activity = await getActivityDetailsBySlugFromDb(stop.slug, locale);
    return activity?.images;
  }
  return undefined;
}

const OSRM_BASE = "https://router.project-osrm.org/route/v1/driving";

async function fetchItineraryRouteTotals(stops: { position: [number, number] }[]): Promise<RouteInfo | null> {
  if (stops.length < 2) return null;
  const coords = stops.map((stop) => `${stop.position[1]},${stop.position[0]}`).join(";");
  const url = `${OSRM_BASE}/${coords}?overview=false&geometries=geojson&steps=false`;

  const res = await fetch(url, { next: { revalidate: 60 * 60 * 24 * 30 } });
  if (!res.ok) return null;

  const data = await res.json();
  const legs = data?.routes?.[0]?.legs;
  if (!Array.isArray(legs)) return null;

  const mappedLegs = legs.map((leg: { distance: number; duration: number }) => ({
    distanceKm: Math.round((leg.distance / 1000) * 10) / 10,
    durationMin: Math.round(leg.duration / 60),
  }));

  return {
    legs: mappedLegs,
    totalDistanceKm: Math.round(mappedLegs.reduce((sum, leg) => sum + leg.distanceKm, 0) * 10) / 10,
    totalDurationMin: mappedLegs.reduce((sum, leg) => sum + leg.durationMin, 0),
  };
}

export async function generateStaticParams() {
  const slugs = await getFeaturedItinerarySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const itineraryData = await getFeaturedItineraryBySlug(slug, locale);
  const itinerary = itineraryData ? localizePreDesignedItinerary(itineraryData, locale) : null;
  if (!itinerary) return { title: "Not Found" };

  const description =
    itinerary.introParagraph?.[0] ??
    itinerary.subtitle ??
    `Explore ${itinerary.title} - things to do in Mauritius`;
  const metaDescription = trimMetaDescription(description);
  const image = itinerary.image
    ? getImageUrl(itinerary.image, { width: 1200, quality: 75 })
    : DEFAULT_OG_IMAGE.url;

  return {
    title: `${itinerary.title} | Itineraries Mauritius`,
    description: metaDescription,
    alternates: { canonical: `/itineraries/${slug}` },
    openGraph: {
      title: itinerary.title,
      description: metaDescription,
      images: [{ url: image, width: 1200, height: 630, alt: itinerary.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: itinerary.title,
      description: metaDescription,
      images: [image],
    },
  };
}

export default async function ItineraryDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const itineraryData = await getFeaturedItineraryBySlug(slug, locale);
  if (!itineraryData) notFound();
  const itinerary = localizePreDesignedItinerary(itineraryData, locale);

  const enrichedStops = await Promise.all(
    itinerary.stops.map(async (stop) => ({
      ...stop,
      position: await getStopPosition(stop, locale),
      description: await getStopDescription(stop, locale),
      images: await getStopImages(stop, locale),
    }))
  );

  const otherItineraries = localizePreDesignedItineraries(
    (await getFeaturedItineraries(locale)).filter((other) => other.slug !== itinerary.slug),
    locale
  );
  const [initialRouteInfo, otherRouteEntries] = await Promise.all([
    fetchItineraryRouteTotals(enrichedStops),
    Promise.all(
      otherItineraries.map(async (other) => {
        const totals = await fetchItineraryRouteTotals(other.stops);
        return [other.slug, totals] as const;
      })
    ),
  ]);

  return (
    <ItineraryDetailView
      itinerary={{ ...itinerary, stops: enrichedStops }}
      otherItineraries={otherItineraries}
      initialRouteInfo={initialRouteInfo}
      initialOtherRouteTotals={Object.fromEntries(otherRouteEntries)}
    />
  );
}
