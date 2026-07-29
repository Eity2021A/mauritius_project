import type { Metadata } from "next";

export const SITE_BRAND = "Mauritius Explored";
export const HOME_PAGE_TITLE = "Mauritius Travel Guide 2026";
export const HOME_PAGE_ABSOLUTE_TITLE = `${SITE_BRAND} | ${HOME_PAGE_TITLE}`;
export const HOME_PAGE_DESCRIPTION =
  "Plan Mauritius with beaches, waterfalls, activities, road trips, hotels and local tips. Start your island trip with practical guides.";
export const BLOG_INDEX_DESCRIPTION =
  "Mauritius travel stories, local tips, and island guides from beaches to hidden gems.";

export const NOINDEX_NOFOLLOW_ROBOTS: Metadata["robots"] = {
  index: false,
  follow: false,
  googleBot: {
    index: false,
    follow: false,
  },
};

export function trimMetaDescription(value: string, maxLength = 155): string {
  const cleaned = value.replace(/\s+/g, " ").trim();
  if (cleaned.length <= maxLength) return cleaned;

  const cutoff = cleaned.slice(0, maxLength - 1);
  const lastSpace = cutoff.lastIndexOf(" ");
  const shortened = lastSpace > 0 ? cutoff.slice(0, lastSpace) : cutoff;
  return `${shortened.replace(/[.,;:\-–—\s]+$/u, "")}...`;
}
