import { cache } from "react";

import {
  ITINERARY_DETAIL_BASE,
  PREDESIGNED_ITINERARIES,
  type PreDesignedItinerary,
  type PreDesignedStop,
  type PreDesignedStopType,
} from "@/data/predesigned-itineraries";
import { normalizeLocale } from "@/i18n/routing";
import { contentDb } from "@/lib/supabase";

interface DbFeaturedItineraryStop {
  id?: string | null;
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

interface DbItineraryTranslationRow {
  itinerary_id?: string | null;
  locale?: string | null;
  title?: string | null;
  subtitle?: string | null;
  description?: string | null;
  cover_image?: string | null;
  listing_image?: string | null;
  total_distance_km?: number | null;
  total_duration_min?: number | null;
  stops?: DbFeaturedItineraryStop[] | null;
  intro_paragraphs?: string[] | null;
  info_points?: string[] | null;
}

interface DbItineraryStopTranslationRow {
  stop_id?: string | null;
  locale?: string | null;
  name?: string | null;
  description?: string | null;
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

function nonEmptyString(value: string | null | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function pickRequestedTranslation<T extends { locale?: string | null }>(
  rows: T[] | null | undefined,
  locale: string,
): T | undefined {
  const translations = rows ?? [];
  return (
    translations.find((translation) => translation.locale === locale) ??
    translations.find((translation) => translation.locale === "en")
  );
}

function normalizeStop(
  rawStop: DbFeaturedItineraryStop,
  fallbackStop?: PreDesignedStop,
  stopTranslation?: DbItineraryStopTranslationRow,
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
    name: nonEmptyString(stopTranslation?.name) ?? rawStop.name ?? fallbackStop?.name ?? slug,
    position: hasCoords ? [lat, lng] : (fallbackStop?.position ?? [0, 0]),
    link: rawStop.link ?? fallbackStop?.link ?? stopLink(type, slug),
    image: rawStop.image ?? fallbackStop?.image ?? "",
    regionLabel: rawStop.regionLabel ?? rawStop.region_label ?? fallbackStop?.regionLabel,
    description: nonEmptyString(stopTranslation?.description) ?? rawStop.description ?? fallbackStop?.description,
    images: rawStop.images ?? fallbackStop?.images,
  };
}

function mapFeaturedItinerary(
  row: DbFeaturedItineraryRow,
  itineraryTranslation?: DbItineraryTranslationRow,
  stopTranslations = new Map<string, DbItineraryStopTranslationRow>(),
): PreDesignedItinerary | null {
  const fallback = STATIC_BY_SLUG.get(row.slug);
  const rawStops =
    Array.isArray(itineraryTranslation?.stops) && itineraryTranslation.stops.length > 0
      ? itineraryTranslation.stops
      : Array.isArray(row.stops) && row.stops.length > 0
      ? row.stops
      : Array.isArray(row.itinerary_stops) && row.itinerary_stops.length > 0
        ? row.itinerary_stops
        : [];

  const normalizedStops = rawStops
    .map((stop, index) => normalizeStop(stop, fallback?.stops[index], stop.id ? stopTranslations.get(stop.id) : undefined))
    .filter((stop): stop is PreDesignedStop => Boolean(stop));

  const stops = normalizedStops.length > 0 ? normalizedStops : (fallback?.stops ?? []);
  if (stops.length === 0) return null;
  const translatedDescription = nonEmptyString(itineraryTranslation?.description);

  const introParagraph =
    Array.isArray(itineraryTranslation?.intro_paragraphs) && itineraryTranslation.intro_paragraphs.length > 0
      ? itineraryTranslation.intro_paragraphs.filter(Boolean)
      : translatedDescription
      ? splitParagraphs(translatedDescription)
      : Array.isArray(row.intro_paragraphs) && row.intro_paragraphs.length > 0
      ? row.intro_paragraphs.filter(Boolean)
      : fallback?.introParagraph ?? splitParagraphs(row.description);

  const info =
    Array.isArray(itineraryTranslation?.info_points) && itineraryTranslation.info_points.length > 0
      ? itineraryTranslation.info_points.filter(Boolean)
      : Array.isArray(row.info_points) && row.info_points.length > 0
      ? row.info_points.filter(Boolean)
      : fallback?.info;

  const hasTotals =
    typeof (itineraryTranslation?.total_distance_km ?? row.total_distance_km) === "number" &&
    Number.isFinite(itineraryTranslation?.total_distance_km ?? row.total_distance_km) &&
    typeof (itineraryTranslation?.total_duration_min ?? row.total_duration_min) === "number" &&
    Number.isFinite(itineraryTranslation?.total_duration_min ?? row.total_duration_min);
  const routeTotals = hasTotals
    ? {
        totalDistanceKm: (itineraryTranslation?.total_distance_km ?? row.total_distance_km) as number,
        totalDurationMin: (itineraryTranslation?.total_duration_min ?? row.total_duration_min) as number,
      }
    : fallback?.routeTotals;

  return {
    id: row.id,
    slug: row.slug,
    title: nonEmptyString(itineraryTranslation?.title) ?? (row.title || fallback?.title || row.slug),
    subtitle:
      nonEmptyString(itineraryTranslation?.subtitle) ??
      translatedDescription ??
      row.subtitle ??
      fallback?.subtitle,
    image: nonEmptyString(itineraryTranslation?.cover_image) ?? row.cover_image ?? fallback?.image,
    listingImage:
      nonEmptyString(itineraryTranslation?.listing_image) ??
      nonEmptyString(itineraryTranslation?.cover_image) ??
      row.listing_image ??
      row.cover_image ??
      fallback?.listingImage,
    imagePosition: fallback?.imagePosition,
    introParagraph,
    stops,
    info,
    routeTotals,
  };
}

async function fetchFeaturedTranslations(
  itineraryIds: string[],
  locale: string,
): Promise<Map<string, DbItineraryTranslationRow>> {
  const ids = [...new Set(itineraryIds)].filter(Boolean);
  if (!contentDb || locale === "en" || ids.length === 0) return new Map();

  const { data, error } = await contentDb
    .from("user_itinerary_translations")
    .select("itinerary_id, locale, title, subtitle, description, cover_image, listing_image, total_distance_km, total_duration_min, stops, intro_paragraphs, info_points")
    .in("itinerary_id", ids)
    .in("locale", [locale, "en"]);

  if (error || !data) return new Map();

  const grouped = new Map<string, DbItineraryTranslationRow[]>();
  for (const row of data as DbItineraryTranslationRow[]) {
    if (!row.itinerary_id) continue;
    grouped.set(row.itinerary_id, [...(grouped.get(row.itinerary_id) ?? []), row]);
  }

  return new Map(
    [...grouped.entries()]
      .map(([id, rows]) => [id, pickRequestedTranslation(rows, locale)] as const)
      .filter((entry): entry is [string, DbItineraryTranslationRow] => Boolean(entry[1])),
  );
}

async function fetchFeaturedStopTranslations(
  stopIds: string[],
  locale: string,
): Promise<Map<string, DbItineraryStopTranslationRow>> {
  const ids = [...new Set(stopIds)].filter(Boolean);
  if (!contentDb || locale === "en" || ids.length === 0) return new Map();

  const { data, error } = await contentDb
    .from("itinerary_stop_translations")
    .select("stop_id, locale, name, description")
    .in("stop_id", ids)
    .in("locale", [locale, "en"]);

  if (error || !data) return new Map();

  const grouped = new Map<string, DbItineraryStopTranslationRow[]>();
  for (const row of data as DbItineraryStopTranslationRow[]) {
    if (!row.stop_id) continue;
    grouped.set(row.stop_id, [...(grouped.get(row.stop_id) ?? []), row]);
  }

  return new Map(
    [...grouped.entries()]
      .map(([id, rows]) => [id, pickRequestedTranslation(rows, locale)] as const)
      .filter((entry): entry is [string, DbItineraryStopTranslationRow] => Boolean(entry[1])),
  );
}

export const getFeaturedItineraries = cache(async (locale = "en"): Promise<PreDesignedItinerary[]> => {
  const activeLocale = normalizeLocale(locale);
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
        id,
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

  const rows = data as DbFeaturedItineraryRow[];
  const [itineraryTranslations, stopTranslations] = await Promise.all([
    fetchFeaturedTranslations(rows.map((row) => row.id), activeLocale),
    fetchFeaturedStopTranslations(
      rows.flatMap((row) => {
        const stops =
          Array.isArray(row.stops) && row.stops.length > 0
            ? row.stops
            : Array.isArray(row.itinerary_stops) && row.itinerary_stops.length > 0
              ? row.itinerary_stops
              : [];
        return stops.map((stop) => stop.id).filter((id): id is string => Boolean(id));
      }),
      activeLocale,
    ),
  ]);

  const mapped = rows
    .map((row) => mapFeaturedItinerary(row, itineraryTranslations.get(row.id), stopTranslations))
    .filter((itinerary): itinerary is PreDesignedItinerary => Boolean(itinerary));

  if (mapped.length === 0) return PREDESIGNED_ITINERARIES;

  return mapped.sort((a, b) => {
    const aIndex = STATIC_ORDER.get(a.slug) ?? Number.MAX_SAFE_INTEGER;
    const bIndex = STATIC_ORDER.get(b.slug) ?? Number.MAX_SAFE_INTEGER;
    return aIndex - bIndex || a.title.localeCompare(b.title);
  });
});

export const getFeaturedItineraryBySlug = cache(async (slug: string, locale = "en"): Promise<PreDesignedItinerary | null> => {
  const itineraries = await getFeaturedItineraries(locale);
  return itineraries.find((itinerary) => itinerary.slug === slug) ?? null;
});

export const getFeaturedItinerarySlugs = cache(async (): Promise<string[]> => {
  const itineraries = await getFeaturedItineraries();
  return itineraries.map((itinerary) => itinerary.slug);
});

export { ITINERARY_DETAIL_BASE };
