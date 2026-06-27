"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useState, useRef, useEffect } from "react";
import MapSkeleton from "@/components/ui/MapSkeleton";
import {
  ITINERARY_BEACHES,
  ITINERARY_ACTIVITIES,
  ITINERARY_NATURE,
} from "@/data/itinerary";
import type { ItineraryMarkerId } from "@/components/ItineraryMap";
import { BeachIcon, ActivityIcon, NatureHikingIcon } from "@/components/icons";

const ItineraryMap = dynamic(() => import("@/components/ItineraryMap"), {
  ssr: false,
  loading: () => <MapSkeleton />,
});

const CARTO_POSITRON = {
  url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
};

export default function WelcomeMapSection() {
  const [hoveredId, setHoveredId] = useState<ItineraryMarkerId | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [listHeight, setListHeight] = useState<number | null>(null);
  const [isLg, setIsLg] = useState(false);

  useEffect(() => {
    const m = window.matchMedia("(min-width: 1024px)");
    setIsLg(m.matches);
    const handler = () => setIsLg(m.matches);
    m.addEventListener("change", handler);
    return () => m.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!listRef.current) return;
    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) setListHeight(entry.contentRect.height);
    });
    ro.observe(listRef.current);
    setListHeight(listRef.current.getBoundingClientRect().height);
    return () => ro.disconnect();
  }, []);

  const mapHeight = isLg && listHeight != null && listHeight > 0 ? listHeight : 420;

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Map legend</h2>
          <ul className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
            <li className="flex items-center gap-2">
              <span
                className="w-8 h-8 rounded-full flex-shrink-0 bg-orange-500 border-2 border-white shadow flex items-center justify-center text-white"
                aria-hidden
              >
                <BeachIcon className="w-4 h-4" />
              </span>
              <span className="text-gray-700">
                <strong>Beaches</strong> — popular & hidden gems
              </span>
            </li>
            <li className="flex items-center gap-2">
              <span
                className="w-8 h-8 rounded-full flex-shrink-0 bg-blue-500 border-2 border-white shadow flex items-center justify-center text-white"
                aria-hidden
              >
                <ActivityIcon className="w-4 h-4" />
              </span>
              <span className="text-gray-700">
                <strong>Activities</strong> — tours & experiences
              </span>
            </li>
            <li className="flex items-center gap-2">
              <span
                className="w-8 h-8 rounded-full flex-shrink-0 bg-green-500 border-2 border-white shadow flex items-center justify-center text-white"
                aria-hidden
              >
                <NatureHikingIcon className="w-4 h-4" />
              </span>
              <span className="text-gray-700">
                <strong>Nature & hiking</strong> — forests & trails
              </span>
            </li>
          </ul>
          <p className="text-xs text-gray-500 mt-1.5">
            Click a pin for details and links to full guides.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 min-h-[420px] lg:min-h-0">
          <div
            className="w-full rounded-xl overflow-hidden bg-gray-100"
            style={{ height: mapHeight }}
          >
            <ItineraryMap
              hoveredId={hoveredId}
              onMarkerHover={setHoveredId}
              tileLayerUrl={CARTO_POSITRON.url}
              tileLayerAttribution={CARTO_POSITRON.attribution}
              zoom={10}
            />
          </div>
          <div
            ref={listRef}
            className="w-full lg:min-w-[240px] rounded-lg border border-gray-200 bg-gray-50/80 p-4"
          >
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">
              On the map
            </h3>
            <ul className="space-y-1 text-sm">
              {ITINERARY_BEACHES.map((beach) => (
                <li key={`beach-${beach.slug}`}>
                  <Link
                    href={`/beaches-in-mauritius/${beach.slug}`}
                    onMouseEnter={() => setHoveredId(`beach-${beach.slug}`)}
                    onMouseLeave={() => setHoveredId(null)}
                    className="flex items-center gap-2 py-1.5 rounded hover:bg-white transition-colors group"
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full bg-orange-500 flex-shrink-0"
                      aria-hidden
                    />
                    <span className="text-gray-800 group-hover:text-orange-600 truncate">
                      {beach.name}
                    </span>
                    <span className="text-xs text-gray-500 flex-shrink-0">
                      {beach.regionLabel}
                    </span>
                  </Link>
                </li>
              ))}
              {ITINERARY_ACTIVITIES.map((activity) => (
                <li key={`activity-${activity.slug}`}>
                  <Link
                    href={`/top-activities-mauritius/${activity.slug}`}
                    onMouseEnter={() =>
                      setHoveredId(`activity-${activity.slug}`)
                    }
                    onMouseLeave={() => setHoveredId(null)}
                    className="flex items-center gap-2 py-1.5 rounded hover:bg-white transition-colors group"
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full bg-blue-500 flex-shrink-0"
                      aria-hidden
                    />
                    <span className="text-gray-800 group-hover:text-blue-600 truncate">
                      {activity.name}
                    </span>
                  </Link>
                </li>
              ))}
              {ITINERARY_NATURE.map((item) => (
                <li key={`nature-${item.slug}`}>
                  <Link
                    href={`/top-activities-mauritius/${item.slug}`}
                    onMouseEnter={() => setHoveredId(`nature-${item.slug}`)}
                    onMouseLeave={() => setHoveredId(null)}
                    className="flex items-center gap-2 py-1.5 rounded hover:bg-white transition-colors group"
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full bg-green-500 flex-shrink-0"
                      aria-hidden
                    />
                    <span className="text-gray-800 group-hover:text-green-600 truncate">
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
