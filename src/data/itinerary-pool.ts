/**
 * Unified pool of selectable items for the custom itinerary builder.
 *
 * Source of truth: BEACH_DETAILS, ACTIVITY_DETAILS, PLACE_DETAILS.
 * Adding a new beach/activity/place to those records makes it
 * automatically appear in the itinerary builder — no extra wiring.
 */

import { type MapPinType } from "@/data/itinerary";
import { BEACH_DETAILS } from "@/data/beaches";
import { ACTIVITY_DETAILS } from "@/data/activities";
import { PLACE_DETAILS } from "@/data/place-details";

export type PoolItemType = "beach" | "activity" | "nature" | "place";

export interface ItineraryPoolItem {
  id: string;
  type: PoolItemType;
  slug: string;
  name: string;
  position: [number, number];
  link: string;
  image: string;
  regionLabel?: string;
}

const FALLBACK_IMAGE = "/images/banners/horse-riding-le-morne-beach-mauritius.jpg";

const placeLink = (slug: string) => `/best-places-to-visit-in-mauritius/${slug}`;
const activityLink = (slug: string) => `/top-activities-mauritius/${slug}`;
const beachLink = (slug: string) => `/beaches-in-mauritius/${slug}`;

const beachItems: ItineraryPoolItem[] = Object.values(BEACH_DETAILS).map((b) => ({
  id: `beach-${b.slug}`,
  type: "beach",
  slug: b.slug,
  name: b.name,
  position: b.coordinates,
  link: beachLink(b.slug),
  image: b.images?.[0] ?? FALLBACK_IMAGE,
  regionLabel: b.region,
}));

const activityItems: ItineraryPoolItem[] = Object.values(ACTIVITY_DETAILS).map((a) => ({
  id: `activity-${a.slug}`,
  type: "activity",
  slug: a.slug,
  name: a.name,
  position: a.coordinates,
  link: activityLink(a.slug),
  image: a.images?.[0] ?? FALLBACK_IMAGE,
  regionLabel: a.region,
}));

const placeItems: ItineraryPoolItem[] = Object.values(PLACE_DETAILS).map((p) => ({
  id: `place-${p.slug}`,
  type: "place",
  slug: p.slug,
  name: p.name,
  position: p.coordinates,
  link: placeLink(p.slug),
  image: p.images?.[0] ?? FALLBACK_IMAGE,
  regionLabel: p.region,
}));

export const ITINERARY_POOL: ItineraryPoolItem[] = [
  ...beachItems,
  ...activityItems,
  ...placeItems,
];

export function poolItemToPinType(type: PoolItemType): MapPinType {
  if (type === "beach") return "beach";
  if (type === "activity") return "activity";
  if (type === "place") return "place";
  return "nature";
}
