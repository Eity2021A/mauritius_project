/**
 * Application-wide constants
 * Following Clean Code principle: Use meaningful, searchable names
 */

// Map configuration
export const MAURITIUS_CENTER: [number, number] = [-20.2833, 57.55];
export const DEFAULT_MAP_ZOOM = 10;

// Animation durations in milliseconds
export const DROPDOWN_CLOSE_DELAY = 150;

// Image loading shimmer placeholder (base64 SVG)
export const SHIMMER_PLACEHOLDER = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PC9zdmc+";

/**
 * Canonical site URL. Set NEXT_PUBLIC_SITE_URL in Vercel for production.
 * Use https://mauritiusexplored.com once the custom domain is connected.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://mauritius-explored.vercel.app";

/** Official Facebook Page for the brand */
export const FACEBOOK_PAGE_URL = "https://www.facebook.com/MauritiusExplored";

/** Meta app ID — Page plugin embed & optional fb:app_id */
export const FACEBOOK_APP_ID = "1671404493846782";

/**
 * URL passed to Facebook's Like plugin — must be a public HTTPS URL Facebook can crawl.
 * The plugin does not show when href is localhost (common if NEXT_PUBLIC_SITE_URL is local).
 * Always use production domain here; override with NEXT_PUBLIC_FACEBOOK_PLUGIN_SITE_URL if needed.
 */
export const FACEBOOK_PLUGIN_SITE_URL =
  typeof process.env.NEXT_PUBLIC_FACEBOOK_PLUGIN_SITE_URL === "string" &&
  process.env.NEXT_PUBLIC_FACEBOOK_PLUGIN_SITE_URL.trim() !== ""
    ? process.env.NEXT_PUBLIC_FACEBOOK_PLUGIN_SITE_URL.trim()
    : "https://mauritiusexplored.com";

export const DEFAULT_OG_IMAGE = {
  url: `${SITE_URL}/images/og-image.jpg`,
  width: 1200,
  height: 630,
  alt: "Mauritius Explored - Discover Paradise Island | Travel Guide",
} as const;
