"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { PreDesignedItinerary } from "@/data/predesigned-itineraries";
import { ITINERARY_DETAIL_BASE } from "@/data/predesigned-itineraries";
import { getImageUrl } from "@/lib/image-url";
import UpvoteButton from "@/components/UpvoteButton";

type ItineraryFilterId = "all" | "region" | "discovery" | "culture" | "explore" | "full-day";

interface ItinerariesListClientProps {
  itineraries: PreDesignedItinerary[];
  featuredUpvotes: Record<string, { id: string; count: number } | undefined>;
}

const FILTERS: { id: ItineraryFilterId; label: string }[] = [
  { id: "all", label: "All Itineraries" },
  { id: "region", label: "Region" },
  { id: "discovery", label: "Discovery" },
  { id: "culture", label: "Culture" },
  { id: "explore", label: "Explore" },
  { id: "full-day", label: "Full day" },
];

function getUniqueRegions(itinerary: PreDesignedItinerary) {
  return new Set(itinerary.stops.map((stop) => stop.regionLabel).filter(Boolean)).size;
}

function matchesFilter(itinerary: PreDesignedItinerary, filterId: ItineraryFilterId) {
  if (filterId === "all") return true;

  const title = itinerary.title.toLowerCase();
  const subtitle = itinerary.subtitle?.toLowerCase() ?? "";
  const intro = itinerary.introParagraph?.join(" ").toLowerCase() ?? "";
  const text = `${title} ${subtitle} ${intro}`;
  const uniqueRegions = getUniqueRegions(itinerary);
  const isRoadtrip = title.includes("roadtrip");
  const isFullDay =
    (itinerary.routeTotals?.totalDurationMin ?? 0) >= 360 ||
    text.includes("full day") ||
    text.includes("one day");

  switch (filterId) {
    case "region":
      return isRoadtrip || uniqueRegions >= 2;
    case "discovery":
      return text.includes("discover") || text.includes("highlights") || text.includes("iconic");
    case "culture":
      return (
        text.includes("culture") ||
        text.includes("heritage") ||
        text.includes("museum") ||
        text.includes("capital")
      );
    case "explore":
      return text.includes("explore") || text.includes("adventure") || text.includes("waterfall");
    case "full-day":
      return isFullDay;
    default:
      return true;
  }
}

export default function ItinerariesListClient({
  itineraries,
  featuredUpvotes,
}: ItinerariesListClientProps) {
  const [activeFilter, setActiveFilter] = useState<ItineraryFilterId>("all");

  const filteredItineraries = useMemo(
    () => itineraries.filter((itinerary) => matchesFilter(itinerary, activeFilter)),
    [activeFilter, itineraries]
  );

  const activeLabel = FILTERS.find((filter) => filter.id === activeFilter)?.label ?? "Itineraries";

  return (
    <section className="mb-10">
      <div className="grid gap-8 xl:grid-cols-12 xl:items-start">
        <aside className="xl:col-span-3">
          <div className="xl:sticky xl:top-28">
            <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900">Categories</h3>
              <div className="mt-4 space-y-3">
                {FILTERS.map((filter) => {
                  const count = itineraries.filter((itinerary) => matchesFilter(itinerary, filter.id)).length;

                  return (
                    <button
                      key={filter.id}
                      type="button"
                      onClick={() => setActiveFilter(filter.id)}
                      className={`flex w-full items-center justify-between rounded-2xl px-3 py-2 text-left text-sm transition ${
                        activeFilter === filter.id
                          ? "bg-orange-50 text-orange-700"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <span>{filter.label}</span>
                      <span className="text-xs text-gray-400">{count}</span>
                    </button>
                  );
                })}
              </div>
            </section>
          </div>
        </aside>

        <div className="xl:col-span-9">
          <div className="mb-4 flex items-end justify-between gap-3">
            <h2 className="text-lg font-semibold text-gray-900">{activeLabel}</h2>
            <p className="text-sm text-gray-500">
              {filteredItineraries.length} {filteredItineraries.length === 1 ? "itinerary" : "itineraries"}
            </p>
          </div>

          {filteredItineraries.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredItineraries.map((itinerary) => {
                const totals = itinerary.routeTotals;

                return (
                  <div key={itinerary.id} className="relative">
                    <Link
                      href={`${ITINERARY_DETAIL_BASE}/${itinerary.slug}`}
                      className="group flex gap-4 rounded-xl border border-gray-200 bg-white p-4 pr-20 shadow-sm transition-all hover:border-orange-400 hover:shadow-md"
                    >
                      <span className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 sm:h-32 sm:w-32">
                        <img
                          src={getImageUrl(itinerary.listingImage || itinerary.image || "", { width: 300, quality: 75 })}
                          alt={itinerary.title}
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                      </span>
                      <span className="flex min-w-0 flex-1 flex-col justify-between">
                        <span>
                          <span className="block text-base font-bold leading-snug text-gray-900 transition-colors group-hover:text-orange-600">
                            {itinerary.title}
                          </span>
                          {itinerary.subtitle && (
                            <span className="mt-1 block line-clamp-2 text-sm leading-relaxed text-gray-500">
                              {itinerary.subtitle}
                            </span>
                          )}
                        </span>
                        <span className="mt-3 flex min-w-0 flex-nowrap items-center gap-1.5 overflow-x-auto">
                          <span className="inline-flex flex-shrink-0 items-center gap-1 rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-semibold text-orange-600">
                            {itinerary.stops.length} stop{itinerary.stops.length !== 1 ? "s" : ""}
                          </span>
                          {totals && (
                            <span className="inline-flex flex-shrink-0 items-center gap-1 rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-semibold text-orange-600">
                              {totals.totalDistanceKm} km
                            </span>
                          )}
                        </span>
                      </span>
                    </Link>
                    <div className="absolute right-3 top-3 z-10">
                      <UpvoteButton
                        itineraryId={featuredUpvotes[itinerary.slug]?.id ?? null}
                        slug={itinerary.slug}
                        title={itinerary.title}
                        initialCount={featuredUpvotes[itinerary.slug]?.count ?? 0}
                        compact
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-sm">
              <p className="text-sm font-medium text-gray-700">No itineraries found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
