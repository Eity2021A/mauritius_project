import { cache } from "react";

import {
  ITINERARY_DETAIL_BASE,
  PREDESIGNED_ITINERARIES,
  type PreDesignedItinerary,
  type PreDesignedStop,
  type PreDesignedStopType,
} from "@/data/predesigned-itineraries";
import { contentDb } from "@/lib/supabase";

interface DbFeaturedItineraryStop {
  type?: string | null;
  item_type?: string | null;
  slug?: string | null;
  item_slug?: string | null;
  name?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  lat?: number | null;
  lng?: number | null;
  image?: string | null;
  link?: string | null;
  regionLabel?: string | null;
  region_label?: string | null;
  description?: string | null;
  images?: string[] | null;
}

interface DbFeaturedItineraryRow {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  cover_image: string | null;
  listing_image: string | null;
  intro_paragraphs: string[] | null;
  info_points: string[] | null;
  total_distance_km: number | null;
  total_duration_min: number | null;
  stops: DbFeaturedItineraryStop[] | null;
  itinerary_stops?: DbFeaturedItineraryStop[] | null;
}

const STATIC_BY_SLUG = new Map(PREDESIGNED_ITINERARIES.map((itinerary) => [itinerary.slug, itinerary]));
const STATIC_ORDER = new Map(PREDESIGNED_ITINERARIES.map((itinerary, index) => [itinerary.slug, index]));

function isStopType(value: string | null | undefined): value is PreDesignedStopType {
  return value === "place" || value === "beach" || value === "activity";
}

function stopLink(type: PreDesignedStopType, slug: string): string {
  if (type === "place") return `/best-places-to-visit-in-mauritius/${slug}`;
  if (type === "beach") return `/beaches-in-mauritius/${slug}`;
  return `/top-activities-mauritius/${slug}`;
}

function splitParagraphs(value: string | null | undefined): string[] {
  if (!value) return [];
  return value
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function normalizeStop(
  rawStop: DbFeaturedItineraryStop,
  fallbackStop?: PreDesignedStop
): PreDesignedStop | null {
  const slug = rawStop.slug ?? rawStop.item_slug ?? fallbackStop?.slug;
  if (!slug) return null;

  const rawType = rawStop.type ?? rawStop.item_type;
  const type = isStopType(rawType) ? rawType : fallbackStop?.type;
  if (!type) return null;

  const lat = rawStop.latitude ?? rawStop.lat;
  const lng = rawStop.longitude ?? rawStop.lng;
  const hasCoords = typeof lat === "number" && typeof lng === "number";

  return {
    type,
    slug,
    name: rawStop.name ?? fallbackStop?.name ?? slug,
    position: hasCoords ? [lat, lng] : (fallbackStop?.position ?? [0, 0]),
    link: rawStop.link ?? fallbackStop?.link ?? stopLink(type, slug),
    image: rawStop.image ?? fallbackStop?.image ?? "",
    regionLabel: rawStop.regionLabel ?? rawStop.region_label ?? fallbackStop?.regionLabel,
    description: rawStop.description ?? fallbackStop?.description,
    images: rawStop.images ?? fallbackStop?.images,
  };
}

function mapFeaturedItinerary(row: DbFeaturedItineraryRow): PreDesignedItinerary | null {
  const fallback = STATIC_BY_SLUG.get(row.slug);
  const rawStops =
    Array.isArray(row.stops) && row.stops.length > 0
      ? row.stops
      : Array.isArray(row.itinerary_stops) && row.itinerary_stops.length > 0
        ? row.itinerary_stops
        : [];

  const normalizedStops = rawStops
    .map((stop, index) => normalizeStop(stop, fallback?.stops[index]))
    .filter((stop): stop is PreDesignedStop => Boolean(stop));

  const stops = normalizedStops.length > 0 ? normalizedStops : (fallback?.stops ?? []);
  if (stops.length === 0) return null;

  const introParagraph =
    Array.isArray(row.intro_paragraphs) && row.intro_paragraphs.length > 0
      ? row.intro_paragraphs.filter(Boolean)
      : fallback?.introParagraph ?? splitParagraphs(row.description);

  const info =
    Array.isArray(row.info_points) && row.info_points.length > 0
      ? row.info_points.filter(Boolean)
      : fallback?.info;

  const hasTotals =
    typeof row.total_distance_km === "number" && Number.isFinite(row.total_distance_km) &&
    typeof row.total_duration_min === "number" && Number.isFinite(row.total_duration_min);
  const routeTotals = hasTotals
    ? {
        totalDistanceKm: row.total_distance_km as number,
        totalDurationMin: row.total_duration_min as number,
      }
    : fallback?.routeTotals;

  return {
    id: row.id,
    slug: row.slug,
    title: row.title || fallback?.title || row.slug,
    subtitle: row.subtitle ?? fallback?.subtitle,
    image: row.cover_image ?? fallback?.image,
    listingImage: row.listing_image ?? row.cover_image ?? fallback?.listingImage,
    imagePosition: fallback?.imagePosition,
    introParagraph,
    stops,
    info,
    routeTotals,
  };
}

export const getFeaturedItineraries = cache(async (): Promise<PreDesignedItinerary[]> => {
  if (!contentDb) return PREDESIGNED_ITINERARIES;

  const { data, error } = await contentDb
    .from("user_itineraries")
    .select(`
      id,
      slug,
      title,
      subtitle,
      description,
      cover_image,
      listing_image,
      intro_paragraphs,
      info_points,
      total_distance_km,
      total_duration_min,
      stops,
      itinerary_stops (
        item_type,
        item_slug,
        name,
        latitude,
        longitude,
        image
      )
    `)
    .eq("is_featured", true);

  if (error || !data) return PREDESIGNED_ITINERARIES;

  const mapped = (data as DbFeaturedItineraryRow[])
    .map(mapFeaturedItinerary)
    .filter((itinerary): itinerary is PreDesignedItinerary => Boolean(itinerary));

  if (mapped.length === 0) return PREDESIGNED_ITINERARIES;

  return mapped.sort((a, b) => {
    const aIndex = STATIC_ORDER.get(a.slug) ?? Number.MAX_SAFE_INTEGER;
    const bIndex = STATIC_ORDER.get(b.slug) ?? Number.MAX_SAFE_INTEGER;
    return aIndex - bIndex || a.title.localeCompare(b.title);
  });
});

export const getFeaturedItineraryBySlug = cache(async (slug: string): Promise<PreDesignedItinerary | null> => {
  const itineraries = await getFeaturedItineraries();
  return itineraries.find((itinerary) => itinerary.slug === slug) ?? null;
});

export const getFeaturedItinerarySlugs = cache(async (): Promise<string[]> => {
  const itineraries = await getFeaturedItineraries();
  return itineraries.map((itinerary) => itinerary.slug);
});

export { ITINERARY_DETAIL_BASE };
