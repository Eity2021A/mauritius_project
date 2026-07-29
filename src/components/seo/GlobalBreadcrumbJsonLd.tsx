"use client";

import { usePathname } from "next/navigation";
import { SITE_URL } from "@/lib/constants";
import { routing } from "@/i18n/routing";
import { BreadcrumbJsonLd } from "./JsonLd";

const ROUTE_LABELS: Record<string, string> = {
  blog: "Blog",
  "beaches-in-mauritius": "Beaches in Mauritius",
  "best-places-to-visit-in-mauritius": "Best Places to Visit in Mauritius",
  "mauritius-activities": "Mauritius Activities",
  "top-activities-mauritius": "Top Activities in Mauritius",
  "veranda-hotels": "Veranda Hotels",
  itineraries: "Itineraries",
  "roadtrip-mauritius": "Roadtrip Mauritius",
  shared: "Shared Trips",
};

function humanizeSegment(segment: string) {
  return ROUTE_LABELS[segment] ?? segment
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function GlobalBreadcrumbJsonLd() {
  const pathname = usePathname();
  const rawSegments = pathname.split("/").filter(Boolean);
  const segments = routing.locales.includes(rawSegments[0] as typeof routing.locales[number])
    ? rawSegments.slice(1)
    : rawSegments;

  if (segments.length === 0) return null;

  const items = [
    { name: "Home", url: SITE_URL },
    ...segments.map((segment, index) => {
      const path = `/${segments.slice(0, index + 1).join("/")}`;
      return {
        name: humanizeSegment(segment),
        url: `${SITE_URL}${path}`,
      };
    }),
  ];

  return <BreadcrumbJsonLd items={items} />;
}
