import { MetadataRoute } from "next";
import {
  getAllActivitySlugs as getContentActivitySlugs,
  getAllBeachSlugs as getContentBeachSlugs,
  getAllBlogPosts as getContentBlogPosts,
  getAllPlaceSlugs as getContentPlaceSlugs,
} from "@/lib/content";
import { getFeaturedItinerarySlugs } from "@/lib/featured-itineraries";
import { CANONICAL_SITE_URL } from "@/lib/constants";
import { BEACH_DETAILS } from "@/data/beaches";
import { PLACE_DETAILS } from "@/data/place-details";
import { ACTIVITY_DETAILS } from "@/data/activities";
import { BLOG_POSTS } from "@/data/blog";
import { PREDESIGNED_ITINERARIES } from "@/data/predesigned-itineraries";

type SitemapEntry = MetadataRoute.Sitemap[number];

const SITEMAP_SITE_URL = CANONICAL_SITE_URL;
const SITEMAP_DATA_TIMEOUT_MS = 5000;

const STATIC_BEACH_SLUGS = Object.keys(BEACH_DETAILS);
const STATIC_PLACE_SLUGS = Object.keys(PLACE_DETAILS);
const STATIC_ACTIVITY_SLUGS = Object.keys(ACTIVITY_DETAILS);
const STATIC_ITINERARY_SLUGS = PREDESIGNED_ITINERARIES.map((itinerary) => itinerary.slug);
const STATIC_BLOG_POSTS = BLOG_POSTS;

const NON_INDEXABLE_PATH_PREFIXES = [
  "/api",
  "/auth",
  "/_next",
  "/my-trips",
  "/roadtrip-mauritius/create",
  "/roadtrip-mauritius/ai-generate",
  "/roadtrip-mauritius/shared",
  "/itineraries-mauritius",
];

function cleanPath(path: string) {
  const pathOnly = path.split(/[?#]/, 1)[0] || "/";
  const normalized = `/${pathOnly.replace(/^\/+|\/+$/g, "")}`;
  return normalized === "/" ? "" : normalized;
}

function sitemapUrl(path = "/") {
  return `${SITEMAP_SITE_URL}${cleanPath(path)}`;
}

function sitemapEntry(
  path: string,
  lastModified: string,
  changeFrequency: SitemapEntry["changeFrequency"],
  priority: number
): SitemapEntry {
  return {
    url: sitemapUrl(path),
    lastModified,
    changeFrequency,
    priority,
  };
}

function isIndexableSitemapUrl(url: string) {
  try {
    const parsed = new URL(url);
    const pathname = parsed.pathname.replace(/\/+$/, "") || "/";

    if (parsed.origin !== SITEMAP_SITE_URL) return false;
    if (parsed.search || parsed.hash) return false;
    if (pathname.includes("/shared/")) return false;

    return !NON_INDEXABLE_PATH_PREFIXES.some(
      (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
    );
  } catch {
    return false;
  }
}

function indexableOnly(entries: MetadataRoute.Sitemap): MetadataRoute.Sitemap {
  return entries.filter((entry) => isIndexableSitemapUrl(entry.url));
}

async function withSitemapTimeout<T>(promise: Promise<T>, fallback: T): Promise<T> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  try {
    return await Promise.race([
      promise.catch(() => fallback),
      new Promise<T>((resolve) => {
        timeoutId = setTimeout(() => resolve(fallback), SITEMAP_DATA_TIMEOUT_MS);
      }),
    ]);
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date().toISOString();

  const [beachSlugs, placeSlugs, activitySlugs, itinerarySlugs, blogPosts] =
    await Promise.all([
      withSitemapTimeout(getContentBeachSlugs(), STATIC_BEACH_SLUGS),
      withSitemapTimeout(getContentPlaceSlugs(), STATIC_PLACE_SLUGS),
      withSitemapTimeout(getContentActivitySlugs(), STATIC_ACTIVITY_SLUGS),
      withSitemapTimeout(getFeaturedItinerarySlugs(), STATIC_ITINERARY_SLUGS),
      withSitemapTimeout(getContentBlogPosts(), STATIC_BLOG_POSTS),
    ]);

  const staticPages: MetadataRoute.Sitemap = [
    sitemapEntry("/", currentDate, "weekly", 1.0),
    sitemapEntry("/beaches-in-mauritius", currentDate, "weekly", 0.9),
    sitemapEntry("/best-places-to-visit-in-mauritius", currentDate, "weekly", 0.9),
    sitemapEntry("/mauritius-activities", currentDate, "weekly", 0.9),
    sitemapEntry("/top-15-things-to-do-in-mauritius", currentDate, "monthly", 0.9),
    sitemapEntry("/best-time-to-visit-to-mauritius", currentDate, "monthly", 0.8),
    sitemapEntry("/about", currentDate, "monthly", 0.7),
    sitemapEntry("/mauritius-island", currentDate, "monthly", 0.7),
    sitemapEntry("/visa-requirements", currentDate, "monthly", 0.7),
    sitemapEntry("/festivals-in-mauritius", currentDate, "monthly", 0.6),
    sitemapEntry("/events-in-mauritius", currentDate, "weekly", 0.65),
    sitemapEntry("/explore", currentDate, "weekly", 0.8),
    sitemapEntry("/roadtrip-mauritius", currentDate, "weekly", 0.8),
    sitemapEntry("/itineraries", currentDate, "monthly", 0.7),
    sitemapEntry("/mauritius-itinerary", currentDate, "monthly", 0.85),
    sitemapEntry("/blog", currentDate, "weekly", 0.7),
    sitemapEntry("/search", currentDate, "weekly", 0.6),
    sitemapEntry("/mauritius-esim-and-internet", currentDate, "monthly", 0.6),
    sitemapEntry("/mauritius-beach-finder", currentDate, "monthly", 0.65),
    sitemapEntry("/media-kit", currentDate, "monthly", 0.4),
    sitemapEntry("/faq-about-mauritius", currentDate, "monthly", 0.6),
    sitemapEntry("/contact", currentDate, "yearly", 0.5),
    sitemapEntry("/privacy-policy", currentDate, "yearly", 0.3),
    sitemapEntry("/giveaway", currentDate, "monthly", 0.5),
    sitemapEntry("/giveaway/terms", currentDate, "yearly", 0.3),
  ];

  const beachPages: MetadataRoute.Sitemap = beachSlugs.map((slug) =>
    sitemapEntry(`/beaches-in-mauritius/${slug}`, currentDate, "monthly", 0.8)
  );

  const placePages: MetadataRoute.Sitemap = placeSlugs.map((slug) =>
    sitemapEntry(
      `/best-places-to-visit-in-mauritius/${slug}`,
      currentDate,
      "monthly",
      0.8
    )
  );

  const activityPages: MetadataRoute.Sitemap = activitySlugs.map((slug) =>
    sitemapEntry(`/top-activities-mauritius/${slug}`, currentDate, "monthly", 0.8)
  );

  const itineraryPages: MetadataRoute.Sitemap = itinerarySlugs.map((slug) =>
    sitemapEntry(`/itineraries/${slug}`, currentDate, "monthly", 0.8)
  );

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) =>
    sitemapEntry(`/blog/${post.slug}`, currentDate, "monthly", 0.7)
  );

  return indexableOnly([
    ...staticPages,
    ...beachPages,
    ...placePages,
    ...activityPages,
    ...itineraryPages,
    ...blogPages,
  ]);
}
