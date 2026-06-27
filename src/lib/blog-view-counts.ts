"use server";

import { contentDb } from "@/lib/supabase";

const MIN_DISPLAY_VIEWS = 10_000;
const MAX_DISPLAY_VIEWS = 20_000;
const SEEDED_VIEW_RANGE = MAX_DISPLAY_VIEWS - MIN_DISPLAY_VIEWS + 1;

function getSeededBlogViewCount(slug: string): number {
  let hash = 2166136261;

  for (let index = 0; index < slug.length; index += 1) {
    hash ^= slug.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return MIN_DISPLAY_VIEWS + ((hash >>> 0) % SEEDED_VIEW_RANGE);
}

function toViewCount(value: unknown): number | null {
  const count = Number(value);
  return Number.isFinite(count) && count >= 0 ? Math.round(count) : null;
}

function getDisplayBlogViewCount(slug: string, count: number | null): number {
  if (count === null) return getSeededBlogViewCount(slug);

  if (count < MIN_DISPLAY_VIEWS || count > MAX_DISPLAY_VIEWS) {
    return getSeededBlogViewCount(slug);
  }

  return count;
}

export async function getBlogViewCount(slug: string): Promise<number> {
  const seededCount = getSeededBlogViewCount(slug);

  if (!contentDb) return seededCount;

  const { data, error } = await contentDb.rpc("get_blog_view_count", {
    p_slug: slug,
  });
  const count = error ? null : toViewCount(data);

  return getDisplayBlogViewCount(slug, count);
}

export async function incrementBlogViewCount(
  slug: string,
  currentCount?: number
): Promise<number> {
  const fallbackCount = Math.max(getSeededBlogViewCount(slug), currentCount ?? 0) + 1;

  if (!contentDb) return fallbackCount;

  const { data, error } = await contentDb.rpc("increment_blog_view_count", {
    p_slug: slug,
  });
  const count = error ? null : toViewCount(data);

  return getDisplayBlogViewCount(slug, count ?? fallbackCount);
}
