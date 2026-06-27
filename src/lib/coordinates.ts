/**
 * Unified coordinate lookup.
 * Every entity stores its own coordinates in the merged data files
 * (beaches.ts, activities.ts, place-details.ts).
 * This module provides a single lookup that checks all three sources.
 */

import { BEACH_DETAILS } from "@/data/beaches";
import { PLACE_DETAILS } from "@/data/place-details";
import { ACTIVITY_DETAILS } from "@/data/activities";

/**
 * Get coordinates for a slug from any content type.
 * Checks activities, places, then beaches.
 */
export function getCoordinates(slug: string): [number, number] | null {
  const activity = ACTIVITY_DETAILS[slug];
  if (activity?.coordinates) return activity.coordinates;

  const place = PLACE_DETAILS[slug];
  if (place?.coordinates) return place.coordinates;

  const beach = BEACH_DETAILS[slug];
  if (beach?.coordinates) return beach.coordinates;

  return null;
}

/** @deprecated Use getCoordinates instead */
export const getCoordinatesBySlug = getCoordinates;

/**
 * Region fallbacks for general use.
 * These provide approximate center points for each region.
 */
export const REGION_CENTERS: Record<string, [number, number]> = {
  "North": [-19.99, 57.6],
  "North West": [-20.02, 57.52],
  "West": [-20.3, 57.38],
  "South West": [-20.41, 57.39],
  "South": [-20.45, 57.54],
  "South East": [-20.42, 57.72],
  "East": [-20.2, 57.75],
  "Central": [-20.25, 57.53],
  "North East": [-20.02, 57.68],
  "Rodrigues": [-19.72, 63.42],
  "Various": [-20.23, 57.53],
};
