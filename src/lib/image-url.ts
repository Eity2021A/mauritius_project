/**
 * Image URL resolution for mauritius-explored.
 *
 * Images are served from the new Supabase project (mauritius-explored-v2)
 * in a flat "images" bucket. DB and code store plain filenames (e.g. "beach.jpg").
 *
 * Local-only assets (served from /public, NOT Supabase):
 *   /images/og-image.jpg, *.svg
 *
 * Banner assets are served from a dedicated "banners" bucket as WebP.
 * Festival assets are served from a dedicated "festivals" bucket as WebP.
 * Posters and misc assets are served from the "others" bucket (JPEG/WebP).
 *
 * Supabase Image Transformations (Pro plan) provide 3 optimised sizes:
 *   { width: 400 }  — thumbnails & cards
 *   { width: 800 }  — lightbox & itinerary stops
 *   { width: 1200 } — hero images & full-width
 *
 * Transforms swap /object/ → /render/image/ and append width/quality/format params.
 * Set NEXT_PUBLIC_ENABLE_IMAGE_TRANSFORMS=true once Supabase Image Transformations
 * are enabled in the dashboard (Storage → Settings → Image Transformations).
 */

const SUPABASE_PROJECT_URL =
  "https://wpktirmzveoovxjqbqpq.supabase.co";

const PRODUCTION_SUPABASE_BASE =
  `${SUPABASE_PROJECT_URL}/storage/v1/object/public/images`;
const PRODUCTION_SUPABASE_BANNERS_BASE =
  `${SUPABASE_PROJECT_URL}/storage/v1/object/public/banners`;
const PRODUCTION_SUPABASE_FESTIVALS_BASE =
  `${SUPABASE_PROJECT_URL}/storage/v1/object/public/festivals`;
const PRODUCTION_SUPABASE_OTHERS_BASE =
  `${SUPABASE_PROJECT_URL}/storage/v1/object/public/others`;

const SUPABASE_BANNER_FILES = new Set<string>([
  "diwali.webp",
  "horse-riding-le-morne-beach-mauritius.webp",
  "pamplemousses-botanical-garden-mauritius.webp",
  "ile-aux-fouquets-lighthouse-mauritius.webp",
  "le-morne-aerial-view-mauritius.webp",
  "le-morne-beach-hammock-sunset-mauritius.webp",
  "le-morne-beach-resort-sunset-mauritius.webp",
  "le-morne-coastline-aerial-mauritius.webp",
  "luxury-beach-resort-aerial-mauritius.webp",
  "mauritius-beach-resort-palm-trees.webp",
  "mauritius-east-coast-aerial-panorama.webp",
  "rodrigues-island-boat-lagoon.webp",
  "surfer-duck-diving-underwater-mauritius.webp",
  "surfing-barrel-wave-mauritius.webp",
  "swimming-with-dolphins-mauritius.webp",
  "traditional-pirogue-sailing-mauritius.webp",
  "woman-walking-lagoon-sunset-mauritius.webp",
]);

const ENABLE_TRANSFORMS =
  process.env.NEXT_PUBLIC_ENABLE_IMAGE_TRANSFORMS === "true";

export interface ImageTransformOptions {
  width?: number;
  height?: number;
  quality?: number;
}

export interface ResponsiveImageOptions {
  widths?: number[];
  quality?: number;
}

function getImageBase(): string {
  const fromEnv =
    typeof process.env.NEXT_PUBLIC_IMAGE_BASE_URL === "string" &&
    process.env.NEXT_PUBLIC_IMAGE_BASE_URL.trim() !== ""
      ? process.env.NEXT_PUBLIC_IMAGE_BASE_URL.trim()
      : "";
  if (fromEnv) return fromEnv;
  return PRODUCTION_SUPABASE_BASE;
}

function isLocalOnlyPath(path: string): boolean {
  if (!path || !path.startsWith("/images")) return false;
  if (path === "/images/og-image.jpg") return true;
  if (path.toLowerCase().endsWith(".svg")) return true;
  return false;
}

function toWebpFilename(filename: string): string {
  const dotIdx = filename.lastIndexOf(".");
  if (dotIdx === -1) return `${filename}.webp`;
  const ext = filename.substring(dotIdx + 1).toLowerCase();
  if (ext === "webp") return filename;
  return `${filename.substring(0, dotIdx)}.webp`;
}

function applyTransform(url: string, transform?: ImageTransformOptions): string {
  if (!ENABLE_TRANSFORMS || !transform) return url;
  const { width, height, quality } = transform;
  if (!width && !height && !quality) return url;

  const transformed = url.replace(
    "/storage/v1/object/public/",
    "/storage/v1/render/image/public/"
  );

  const params = new URLSearchParams();
  if (width) params.set("width", String(width));
  if (height) params.set("height", String(height));
  params.set("quality", String(quality ?? 75));
  params.set("format", "origin");

  return `${transformed}?${params.toString()}`;
}

/**
 * Extracts the plain filename from any path format:
 *   "beach.jpg"                                    → "beach.jpg"
 *   "/images/beaches/albion/beach.jpg"             → "beach.jpg"
 *   "/images/places-to-visit/le-morne-hike/x.jpg" → "x.jpg"
 */
function toFilename(path: string): string {
  const lastSlash = path.lastIndexOf("/");
  return lastSlash === -1 ? path : path.substring(lastSlash + 1);
}

export function getImageUrl(path: string, transform?: ImageTransformOptions): string {
  if (!path) return "";

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return applyTransform(path, transform);
  }

  if (isLocalOnlyPath(path)) return path;

  if (path.startsWith("/images/banners/")) {
    const bannerFilename = toWebpFilename(toFilename(path));
    if (!SUPABASE_BANNER_FILES.has(bannerFilename)) {
      return path;
    }
    const bannerUrl = `${PRODUCTION_SUPABASE_BANNERS_BASE}/${bannerFilename}`;
    const bannerTransform = transform ?? { width: 1600, quality: 72 };
    return applyTransform(bannerUrl, bannerTransform);
  }

  if (path.startsWith("/images/festivals/")) {
    const festivalFilename = toFilename(path);
    const festivalUrl = `${PRODUCTION_SUPABASE_FESTIVALS_BASE}/${festivalFilename}`;
    return applyTransform(festivalUrl, transform);
  }

  if (path.startsWith("/images/others/")) {
    const othersFilename = toFilename(path);
    const othersUrl = `${PRODUCTION_SUPABASE_OTHERS_BASE}/${othersFilename}`;
    return applyTransform(othersUrl, transform);
  }

  const base = getImageBase();
  const filename = toFilename(path);
  const url = `${base}/${filename}`;
  return applyTransform(url, transform);
}

export function getImageSrcSet(
  path: string,
  options?: ResponsiveImageOptions
): string {
  if (!path) return "";

  const widths = (options?.widths ?? [400, 800, 1200, 1600])
    .filter((w) => Number.isFinite(w) && w > 0)
    .sort((a, b) => a - b);
  const quality = options?.quality ?? 70;

  if (widths.length === 0) return "";

  return widths
    .map((width) => `${getImageUrl(path, { width, quality })} ${width}w`)
    .join(", ");
}