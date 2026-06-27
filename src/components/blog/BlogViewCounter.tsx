"use client";

import { useEffect, useState } from "react";
import { incrementBlogViewCount } from "@/lib/blog-view-counts";
import { formatBlogViewCount } from "@/lib/blog-view-format";

type CountListener = (count: number) => void;

const trackedSlugs = new Set<string>();
const viewCounts = new Map<string, number>();
const listeners = new Map<string, Set<CountListener>>();

function publishCount(slug: string, count: number) {
  viewCounts.set(slug, count);
  listeners.get(slug)?.forEach((listener) => listener(count));
}

function subscribeToCount(slug: string, listener: CountListener) {
  const slugListeners = listeners.get(slug) ?? new Set<CountListener>();
  slugListeners.add(listener);
  listeners.set(slug, slugListeners);

  return () => {
    slugListeners.delete(listener);
    if (slugListeners.size === 0) listeners.delete(slug);
  };
}

interface BlogViewCounterProps {
  slug: string;
  initialViews: number;
}

export default function BlogViewCounter({
  slug,
  initialViews,
}: BlogViewCounterProps) {
  const [views, setViews] = useState(() => viewCounts.get(slug) ?? initialViews);

  useEffect(() => {
    return subscribeToCount(slug, setViews);
  }, [slug]);

  useEffect(() => {
    if (trackedSlugs.has(slug)) return;

    trackedSlugs.add(slug);
    incrementBlogViewCount(slug, viewCounts.get(slug) ?? initialViews)
      .then((count) => publishCount(slug, count))
      .catch(() => publishCount(slug, Math.max(viewCounts.get(slug) ?? 0, initialViews) + 1));
  }, [initialViews, slug]);

  return (
    <div
      className="flex items-center gap-2 px-4 py-2 min-h-[44px] rounded-full border bg-white border-gray-200 text-gray-600"
      aria-label={`${formatBlogViewCount(views)} views`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        className="w-5 h-5"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 12s3.75-6.75 9.75-6.75S21.75 12 21.75 12 18 18.75 12 18.75 2.25 12 2.25 12z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"
        />
      </svg>
      <span className="font-medium text-sm">{formatBlogViewCount(views)} Views</span>
    </div>
  );
}
