/**
 * Itinerary map data: featured beaches, activities, and nature/hiking spots.
 * Coordinates are resolved from entity data at import time.
 */

import { BEACH_DETAILS } from "@/data/beaches";
import { ACTIVITY_DETAILS } from "@/data/activities";
import { PLACE_DETAILS } from "@/data/place-details";

export type MapPinType = "beach" | "activity" | "nature" | "place";

function resolveCoords(slug: string): [number, number] {
  const a = ACTIVITY_DETAILS[slug];
  if (a?.coordinates) return a.coordinates;
  const p = PLACE_DETAILS[slug];
  if (p?.coordinates) return p.coordinates;
  const b = BEACH_DETAILS[slug];
  if (b?.coordinates) return b.coordinates;
  return [-20.23, 57.53];
}

export interface ItineraryBeach {
  name: string;
  slug: string;
  position: [number, number];
  regionLabel: string;
}

export interface ItineraryActivity {
  name: string;
  slug: string;
  position: [number, number];
}

export interface ItineraryNature {
  name: string;
  slug: string;
  position: [number, number];
}

const BEACH_PINS: { slug: string; regionLabel: string }[] = [
  { slug: "le-morne", regionLabel: "South West" },
  { slug: "trou-aux-biches", regionLabel: "North West" },
  { slug: "belle-mare", regionLabel: "East" },
  { slug: "flic-en-flac", regionLabel: "West" },
  { slug: "pereybere", regionLabel: "North" },
];

const ACTIVITY_PINS: string[] = [
  "swim-with-dolphins",
  "catamaran-cruises",
  "snorkeling-blue-bay",
  "helicopter-tour",
];

const NATURE_PINS: string[] = [
  "hiking-le-morne",
  "quad-biking",
  "horse-riding-le-morne",
];

export const ITINERARY_BEACHES: ItineraryBeach[] = BEACH_PINS.map((b) => {
  const detail = BEACH_DETAILS[b.slug];
  return {
    name: detail?.name ?? b.slug,
    slug: b.slug,
    position: detail?.coordinates ?? resolveCoords(b.slug),
    regionLabel: b.regionLabel,
  };
});

export const ITINERARY_ACTIVITIES: ItineraryActivity[] = ACTIVITY_PINS.map((slug) => {
  const detail = ACTIVITY_DETAILS[slug];
  return {
    name: detail?.name ?? slug,
    slug,
    position: detail?.coordinates ?? resolveCoords(slug),
  };
});

export const ITINERARY_NATURE: ItineraryNature[] = NATURE_PINS.map((slug) => {
  const detail = ACTIVITY_DETAILS[slug];
  return {
    name: detail?.name ?? slug,
    slug,
    position: detail?.coordinates ?? resolveCoords(slug),
  };
});
