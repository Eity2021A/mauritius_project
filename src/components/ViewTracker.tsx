"use client";

import { useEffect } from "react";
import { incrementViewCount } from "@/lib/itinerary-actions";

export default function ViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    incrementViewCount(slug).catch(() => {});
  }, [slug]);
  return null;
}
