/**
 * Shared types for all content entities (beaches, places, activities, etc.)
 * This provides a unified data model for consistent handling across the application.
 */

/**
 * Standardized region type used across all content.
 * Covers all geographic areas of Mauritius.
 */
export type Region =
  | "North"
  | "South"
  | "East"
  | "West"
  | "North West"
  | "North East"
  | "South West"
  | "South East"
  | "Central"
  | "Rodrigues"
  | "Various";

/**
 * Category types for different content entities
 */
export type PlaceCategory = 
  | "nature" 
  | "discover" 
  | "hideaways" 
  | "islands" 
  | "local" 
  | "waterfalls" 
  | "history";

export type ActivityCategory = 
  | "all" 
  | "best-seller" 
  | "adventure" 
  | "air" 
  | "land" 
  | "sea" 
  | "hiking" 
  | "unique";

export type BeachCategory = 
  | "snorkeling" 
  | "amenities" 
  | "family-friendly"
  | "surfing"
  | "secluded";

/**
 * Coordinates tuple: [latitude, longitude]
 */
export type Coordinates = [number, number];

/**
 * Helper to convert region string to display label
 */
export function getRegionLabel(region: Region): string {
  return region;
}

/**
 * Helper to convert region to lowercase slug format (for filtering/querying)
 */
export function getRegionSlug(region: Region): string {
  return region.toLowerCase().replace(/\s+/g, "-");
}

/**
 * Region colors for detail page badges (light bg, used by CategoryBadges component).
 * Keys are lowercase to match category.toLowerCase() lookups.
 */
export const REGION_COLORS: Record<string, string> = {
  "north": "bg-blue-100 text-blue-700",
  "south": "bg-orange-100 text-orange-700",
  "east": "bg-emerald-100 text-emerald-700",
  "west": "bg-amber-100 text-amber-700",
  "north west": "bg-sky-100 text-sky-700",
  "north east": "bg-teal-100 text-teal-700",
  "south west": "bg-rose-100 text-rose-700",
  "south east": "bg-purple-100 text-purple-700",
  "central": "bg-slate-100 text-slate-700",
  "rodrigues": "bg-indigo-100 text-indigo-700",
  "various": "bg-gray-100 text-gray-700",
};

/**
 * Region badge colors for explore cards (solid bg, white text).
 * Used on listing/card pages: beaches, activities, places.
 */
export const REGION_BADGE_COLORS: Record<string, string> = {
  North: "bg-sky-500",
  South: "bg-emerald-500",
  East: "bg-amber-500",
  West: "bg-teal-500",
  "North West": "bg-sky-600",
  "North East": "bg-teal-600",
  "South West": "bg-rose-500",
  "South East": "bg-violet-500",
  Central: "bg-slate-500",
  Rodrigues: "bg-indigo-500",
  Various: "bg-gray-500",
};

/**
 * Category labels — single source of truth for slug-to-display-name mapping.
 * Used by CategoryBadges, listing pages, and filter sidebars.
 */
export const CATEGORY_LABELS: Record<string, string> = {
  // Activity categories
  "all": "All",
  "best-seller": "Best Seller",
  "adventure": "Adventure",
  "air": "Air",
  "land": "Land",
  "sea": "Sea",
  "hiking": "Hiking",
  "unique": "Unique",
  // Place categories
  "nature": "Nature",
  "waterfalls": "Waterfalls",
  "discover": "Discover",
  "hideaways": "Hideaways",
  "islands": "Islands",
  "local": "Local",
  "history": "History",
  // Beach categories
  "snorkeling": "Snorkeling",
  "amenities": "Amenities",
  "family-friendly": "Family Friendly",
  "surfing": "Surfing",
  "secluded": "Secluded",
};

/**
 * Category colors for detail page badges (light bg).
 * Used by CategoryBadges component.
 */
export const CATEGORY_COLORS: Record<string, string> = {
  // Activity categories
  "best-seller": "bg-amber-100 text-amber-700",
  "adventure": "bg-red-100 text-red-700",
  "air": "bg-sky-100 text-sky-700",
  "land": "bg-green-100 text-green-700",
  "sea": "bg-blue-100 text-blue-700",
  "hiking": "bg-emerald-100 text-emerald-700",
  "unique": "bg-purple-100 text-purple-700",
  // Place categories
  "nature": "bg-emerald-100 text-emerald-700",
  "waterfalls": "bg-sky-100 text-sky-700",
  "discover": "bg-amber-100 text-amber-700",
  "hideaways": "bg-violet-100 text-violet-700",
  "islands": "bg-teal-100 text-teal-700",
  "local": "bg-orange-100 text-orange-700",
  "history": "bg-stone-100 text-stone-700",
  // Beach categories
  "snorkeling": "bg-cyan-100 text-cyan-700",
  "amenities": "bg-indigo-100 text-indigo-700",
  "family-friendly": "bg-pink-100 text-pink-700",
  "surfing": "bg-yellow-100 text-yellow-700",
  "secluded": "bg-violet-100 text-violet-700",
};

