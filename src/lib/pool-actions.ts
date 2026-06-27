"use server";

import { contentDb } from "@/lib/supabase";
import { ITINERARY_POOL, type ItineraryPoolItem } from "@/data/itinerary-pool";

export interface PoolItem {
  id: string;
  type: string;
  slug: string;
  name: string;
  lat: number;
  lng: number;
  image: string;
  link: string;
}

const FALLBACK_IMAGE = "/images/banners/horse-riding-le-morne-beach-mauritius.jpg";

const linkFor = (type: string, slug: string): string => {
  if (type === "beach") return `/beaches-in-mauritius/${slug}`;
  if (type === "activity") return `/top-activities-mauritius/${slug}`;
  if (type === "place") return `/best-places-to-visit-in-mauritius/${slug}`;
  return `/${slug}`;
};

interface RawTranslation {
  title: string;
  locale: string;
}

interface RawMedia {
  url: string | null;
  sort_order: number | null;
  is_main: boolean | null;
}

interface RawRow {
  slug: string;
  type: string;
  lat: number | string | null;
  lng: number | string | null;
  explored_item_translations: RawTranslation[];
  explored_item_media: RawMedia[];
}

function pickImage(media: RawMedia[] | null | undefined): string {
  if (!media?.length) return FALLBACK_IMAGE;
  const main = media.find((m) => m.is_main && m.url);
  if (main?.url) return main.url;
  const sorted = [...media]
    .filter((m) => !!m.url)
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
  return sorted[0]?.url ?? FALLBACK_IMAGE;
}

function rowToPoolItem(row: RawRow): PoolItem | null {
  if (row.lat == null || row.lng == null) return null;
  const lat = Number(row.lat);
  const lng = Number(row.lng);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  if (lat === 0 && lng === 0) return null;

  const title = row.explored_item_translations?.[0]?.title ?? row.slug;

  return {
    id: `${row.type}-${row.slug}`,
    type: row.type,
    slug: row.slug,
    name: title,
    lat,
    lng,
    image: pickImage(row.explored_item_media),
    link: linkFor(row.type, row.slug),
  };
}

function staticToPool(item: ItineraryPoolItem): PoolItem {
  return {
    id: item.id,
    type: item.type,
    slug: item.slug,
    name: item.name,
    lat: item.position[0],
    lng: item.position[1],
    image: item.image,
    link: item.link,
  };
}

/**
 * Itinerary builder pool — single round-trip when Supabase is configured,
 * static fallback otherwise.
 *
 * Joins translations (en) + media in one query so we don't N+1 the DB.
 */
export async function getItineraryPool(): Promise<PoolItem[]> {
  if (!contentDb) {
    return ITINERARY_POOL.map(staticToPool);
  }

  const { data, error } = await contentDb
    .from("explored_items")
    .select(
      `
        slug,
        type,
        lat,
        lng,
        explored_item_translations!inner(title, locale),
        explored_item_media(url, sort_order, is_main)
      `,
    )
    .in("type", ["beach", "activity", "place"])
    .eq("status", "published")
    .eq("explored_item_translations.locale", "en");

  if (error || !data || data.length === 0) {
    return ITINERARY_POOL.map(staticToPool);
  }

  const items = (data as unknown as RawRow[])
    .map(rowToPoolItem)
    .filter((x): x is PoolItem => x !== null);

  return items.length > 0 ? items : ITINERARY_POOL.map(staticToPool);
}
