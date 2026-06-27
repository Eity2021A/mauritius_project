"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MapSkeleton from "@/components/ui/MapSkeleton";
import type { Beach, TopBeach, BeachDetails } from "@/data/beaches";
import { type Region, type BeachCategory, REGION_BADGE_COLORS, CATEGORY_LABELS } from "@/types/content";
import { getImageSrcSet, getImageUrl } from "@/lib/image-url";
import { useState, useMemo, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import MobileFilterSheet from "@/components/ui/MobileFilterSheet";

// Dynamically import the map to avoid SSR issues and improve initial load
const MauritiusMap = dynamic(() => import("@/components/MauritiusMap"), {
  ssr: false,
  loading: () => <MapSkeleton />,
});


interface BeachesListClientProps {
  topBeaches: TopBeach[];
  allBeaches: Beach[];
  regions: { id: Region; label: string }[];
  beachDetails: Record<string, BeachDetails>;
}

function getRegionFromParam(param: string | null, regions: { id: Region; label: string }[]): Region[] {
  if (!param) return [];
  const normalizedParam = param.toLowerCase().replace(/-/g, " ").trim();
  const match = regions.find(
    (region) =>
      region.id.toLowerCase() === normalizedParam ||
      region.label.toLowerCase() === normalizedParam
  );
  return match ? [match.id] : [];
}

function BeachCard({ beach, region, priority = false, beachDetails, regions }: { beach: Beach; region: Region; priority?: boolean; beachDetails: Record<string, BeachDetails>; regions: { id: Region; label: string }[] }) {
  const regionLabel = regions.find((r) => r.id === region)?.label ?? region;
  const categories = beachDetails[beach.slug]?.categories ?? [];
  const firstCategoryLabel = categories.length > 0 ? (CATEGORY_LABELS[categories[0]] ?? categories[0]) : null;

  return (
    <Link
      href={`/beaches-in-mauritius/${beach.slug}`}
      className="group relative aspect-[2/3.3] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 img-shimmer block"
    >
      <img
        src={getImageUrl(beach.image, { width: 400, quality: 75 })}
        srcSet={getImageSrcSet(beach.image, { widths: [320, 400, 800], quality: 66 })}
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        alt={beach.name}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
      {/* Bottom: gradient overlay + badges + title + description */}
      <div className="absolute bottom-0 left-0 right-0 pt-2 px-4 pb-3.5 bg-gradient-to-b from-transparent via-black/60 to-black/90 flex flex-col overflow-visible">
        <div className="flex items-center flex-nowrap gap-1 mb-1.5 min-w-0 overflow-hidden">
          <span className={`whitespace-nowrap text-[11px] px-1.5 py-0.5 rounded text-white font-medium ${REGION_BADGE_COLORS[region] ?? "bg-slate-500"}`}>
            {regionLabel}
          </span>
          {firstCategoryLabel && (
            <span className="whitespace-nowrap text-[11px] px-1.5 py-0.5 rounded bg-white/90 text-gray-700 font-medium">
              {firstCategoryLabel}
            </span>
          )}
        </div>
        <h3 className="font-bold text-white group-hover:text-orange-300 transition-colors text-[15px] sm:text-base mb-1 leading-tight line-clamp-2 min-h-0 break-words">
          {beach.name}
        </h3>
        <p className="text-white/90 text-[13px] leading-snug line-clamp-2 min-h-0 break-words">
          {beach.description}
        </p>
      </div>
    </Link>
  );
}

export default function BeachesListClient({ topBeaches, allBeaches, regions, beachDetails }: BeachesListClientProps) {
  const BEACH_CATEGORY_OPTIONS: { id: BeachCategory | "all"; label: string }[] = [
    { id: "all", label: "All" },
    { id: "snorkeling", label: CATEGORY_LABELS["snorkeling"] },
    { id: "amenities", label: CATEGORY_LABELS["amenities"] },
    { id: "family-friendly", label: CATEGORY_LABELS["family-friendly"] },
    { id: "surfing", label: CATEGORY_LABELS["surfing"] },
    { id: "secluded", label: CATEGORY_LABELS["secluded"] },
  ];
  const REGION_OPTIONS: { id: Region | "all"; label: string }[] = [
    { id: "all", label: "All" },
    ...regions,
  ];
  const TOTAL_ALL_BEACHES = allBeaches.length;
  const searchParams = useSearchParams();
  const regionParam = searchParams.get("region");
  const initialRegions = useMemo(
    () => getRegionFromParam(regionParam, regions),
    [regionParam, regions]
  );
  const resultsSectionRef = useRef<HTMLElement>(null);
  const [selectedRegions, setSelectedRegions] = useState<Region[]>(initialRegions);
  const [selectedCategories, setSelectedCategories] = useState<BeachCategory[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [draftRegions, setDraftRegions] = useState<Region[]>(initialRegions);
  const [draftCategories, setDraftCategories] = useState<BeachCategory[]>([]);

  useEffect(() => {
    const nextRegions = getRegionFromParam(regionParam, regions);
    setSelectedRegions(nextRegions);
    setDraftRegions(nextRegions);
    if (nextRegions.length > 0 && window.location.hash === "#beach-cards") {
      requestAnimationFrame(() => {
        resultsSectionRef.current?.scrollIntoView({ behavior: "auto", block: "start" });
      });
    }
  }, [regionParam, regions]);

  const filteredBeachesWithRegion = useMemo(() => {
    const baseList = allBeaches.filter((beach) => {
      const matchesRegion =
        selectedRegions.length === 0 || selectedRegions.includes(beach.region);
      const beachCategories = beachDetails[beach.slug]?.categories ?? [];
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.some((category) => beachCategories.includes(category));
      return matchesRegion && matchesCategory;
    });
    if (!searchQuery.trim())
      return baseList.map((beach) => ({ beach, region: beach.region }));
    const q = searchQuery.toLowerCase().trim();
    const filtered = baseList.filter(
      (beach) =>
        beach.name.toLowerCase().includes(q) || beach.description.toLowerCase().includes(q)
    );
    return filtered.map((beach) => ({ beach, region: beach.region }));
  }, [selectedRegions, selectedCategories, searchQuery, allBeaches, beachDetails]);

  const hasActiveFilters = draftRegions.length > 0 || draftCategories.length > 0;

  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    resultsSectionRef.current?.scrollIntoView({ behavior: "auto", block: "start" });
  }, [selectedRegions, selectedCategories, searchQuery]);

  const toggleSelectedRegion = (region: Region | "all") => {
    if (region === "all") {
      setSelectedRegions([]);
      return;
    }
    setSelectedRegions((prev) =>
      prev.includes(region)
        ? prev.filter((r) => r !== region)
        : [...prev, region]
    );
  };

  const toggleSelectedCategory = (category: BeachCategory | "all") => {
    if (category === "all") {
      setSelectedCategories([]);
      return;
    }
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleDraftRegion = (region: Region | "all") => {
    if (region === "all") {
      setDraftRegions([]);
      return;
    }
    setDraftRegions((prev) =>
      prev.includes(region)
        ? prev.filter((r) => r !== region)
        : [...prev, region]
    );
  };

  const toggleDraftCategory = (category: BeachCategory | "all") => {
    if (category === "all") {
      setDraftCategories([]);
      return;
    }
    setDraftCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <main id="main-content" className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[44vh] min-h-[280px]">
        <Image
          src={getImageUrl("/images/banners/horse-riding-le-morne-beach-mauritius.jpg")}
          alt="Best Beaches in Mauritius"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center px-4 max-w-4xl mx-auto translate-y-[2rem]">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Best Beaches in Mauritius
              <span className="block">Ultimate Beach Guide 2026</span>
            </h1>
            <p className="text-white/90 text-base md:text-lg max-w-2xl mx-auto">
              The guide for top beaches and best snorkeling spots
            </p>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="pt-6 md:pt-8 pb-6 md:pb-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-700 leading-relaxed text-center">
              There are many beautiful <Link href="/beaches-in-mauritius" target="_blank" rel="noopener noreferrer" className="font-semibold text-orange-600 hover:text-orange-700 hover:underline">beaches in Mauritius</Link>; the best one depends on your preferences. Discover the best beaches and where to spend your <Link href="/best-places-to-visit-in-mauritius" target="_blank" rel="noopener noreferrer" className="font-semibold text-orange-600 hover:text-orange-700 hover:underline">honeymoon</Link>, and why Mauritius is famous beyond the dodo and the underwater waterfall. From north to south, explore famous beaches and hidden gems: white-sand <Link href="/beaches-in-mauritius/belle-mare" target="_blank" rel="noopener noreferrer" className="font-semibold text-orange-600 hover:text-orange-700 hover:underline">Belle Mare</Link> on the east, <Link href="/beaches-in-mauritius/mont-choisy" target="_blank" rel="noopener noreferrer" className="font-semibold text-orange-600 hover:text-orange-700 hover:underline">Mont Choisy</Link>, or <Link href="/beaches-in-mauritius/pointe-aux-piments" target="_blank" rel="noopener noreferrer" className="font-semibold text-orange-600 hover:text-orange-700 hover:underline">Pointe aux Piments</Link> with rocky creeks ideal for <Link href="/mauritius-activities" target="_blank" rel="noopener noreferrer" className="font-semibold text-orange-600 hover:text-orange-700 hover:underline">snorkeling</Link> toward Balaclava. <Link href="/beaches-in-mauritius/trou-aux-biches" target="_blank" rel="noopener noreferrer" className="font-semibold text-orange-600 hover:text-orange-700 hover:underline">Trou aux Biches</Link> charms with coconut trees and white sand and is an excellent spot for sea turtles.
            </p>
          </div>
        </div>
      </section>

      {/* Where to Go Section */}
      <section className="pt-6 md:pt-8 pb-12 md:pb-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-stretch">
              {/* Interactive Map - stretches to match height of list on the right */}
              <div className="h-full min-h-[280px]">
                <MauritiusMap />
              </div>

              {/* Top Beaches List */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Where to Go</h2>
                <p className="text-orange-500 uppercase tracking-wider text-sm font-semibold mb-6">
                  The 6 Best Beaches in Mauritius Are
                </p>
                <ul className="space-y-4">
                  {topBeaches.map((beach) => (
                    <li key={beach.number} className="flex items-start space-x-3">
                      <span className="w-6 h-6 bg-orange-500 rounded-full flex-shrink-0 flex items-center justify-center text-white text-sm font-bold">
                        {beach.number}
                      </span>
                      <p className="text-gray-700">
                        <Link
                          href={`/beaches-in-mauritius/${beach.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-orange-500 hover:text-orange-600 hover:underline"
                        >
                          {beach.name}
                        </Link>
                        {`: ${beach.description}`}
                      </p>
                    </li>
                  ))}
                </ul>
                <a
                  href="#beach-cards"
                  className="inline-block mt-8 text-orange-500 hover:text-orange-600 font-medium underline underline-offset-4"
                >
                  Find your Beach
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beach Cards Section - Sidebar + Grid (same UX as Best Places to Visit) */}
      <section ref={resultsSectionRef} id="beach-cards" className="py-10 md:py-14 bg-white scroll-mt-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="lg:hidden sticky top-[calc(env(safe-area-inset-top)+4rem)] z-30 bg-white/95 backdrop-blur border-b border-gray-100 -mx-4 px-4 py-3 mb-4">
            <div className="flex items-center gap-2">
              <input
                id="beach-search-mobile"
                type="text"
                placeholder="Search beaches..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 w-full px-4 py-3 min-h-[48px] text-base border border-gray-300 rounded-xl outline-none focus:border-gray-400"
                aria-label="Search beaches"
              />
              <button
                type="button"
                onClick={() => {
                  setDraftRegions(selectedRegions);
                  setDraftCategories(selectedCategories);
                  setIsFilterSheetOpen(true);
                }}
                className="h-12 w-12 flex-shrink-0 rounded-xl border border-gray-300 bg-white flex items-center justify-center text-gray-700"
                aria-label="Open filters"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h18M6 12h12M10 20h4" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4">
            {/* Left Sidebar - Filters */}
            <aside className="hidden lg:block lg:w-64 flex-shrink-0">
              <div
                className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto lg:pr-1 space-y-4"
                style={{ scrollbarGutter: "stable" }}
              >
                {/* Search */}
                <div>
                  <input
                    id="beach-search"
                    type="text"
                    placeholder="Search beaches..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg outline-none focus:border-gray-400 dark:border-neutral-600 dark:focus:border-neutral-500"
                    aria-label="Search beaches"
                  />
                </div>

                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Category
                  </label>
                  <div className="space-y-1">
                    {BEACH_CATEGORY_OPTIONS.map((option) => {
                      const isSelected =
                        option.id === "all"
                          ? selectedCategories.length === 0
                          : selectedCategories.includes(option.id);
                      return (
                        <button
                          key={option.id}
                          onClick={() => toggleSelectedCategory(option.id)}
                          className={`w-full text-left px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                            isSelected
                              ? "bg-orange-500 text-white shadow-md"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-neutral-700 dark:text-gray-200 dark:hover:bg-neutral-600"
                          }`}
                        >
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Region Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Region
                  </label>
                  <div className="space-y-1">
                    {REGION_OPTIONS.map((option) => {
                      const count =
                        option.id === "all"
                          ? TOTAL_ALL_BEACHES
                          : allBeaches.filter((b) => b.region === option.id).length;
                      const isSelected =
                        option.id === "all"
                          ? selectedRegions.length === 0
                          : selectedRegions.includes(option.id);
                      return (
                        <button
                          key={option.id}
                          onClick={() => toggleSelectedRegion(option.id)}
                          className={`w-full text-left px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-between gap-2 min-w-0 ${
                            isSelected
                              ? "bg-orange-500 text-white shadow-md"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-neutral-700 dark:text-gray-200 dark:hover:bg-neutral-600"
                          }`}
                        >
                          <span className="truncate">{option.label}</span>
                          <span
                            className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-semibold ${
                              isSelected
                                ? "bg-white/25 text-white"
                                : "bg-gray-300 text-gray-600 dark:bg-neutral-600 dark:text-gray-300"
                            }`}
                            aria-label={`${count} beaches`}
                          >
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Reset Filters */}
                {(selectedRegions.length > 0 || selectedCategories.length > 0 || searchQuery !== "") && (
                  <button
                    onClick={() => {
                      setSelectedRegions([]);
                      setSelectedCategories([]);
                      setSearchQuery("");
                    }}
                    className="w-full px-3 py-1.5 text-sm text-orange-600 hover:text-orange-700 border border-orange-300 rounded-lg hover:bg-orange-50 transition-colors dark:border-orange-600 dark:hover:bg-orange-950/30"
                  >
                    Reset Filters
                  </button>
                )}

              </div>
            </aside>

            {/* Right Content - Beach Cards Grid (unchanged card style) */}
            <div id="explore" className="flex-1 min-w-0 scroll-mt-24">
              {filteredBeachesWithRegion.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400 text-lg">
                    No beaches found matching your filters.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedRegions([]);
                      setSelectedCategories([]);
                      setSearchQuery("");
                    }}
                    className="mt-4 text-orange-600 hover:text-orange-700 font-medium dark:text-orange-400 dark:hover:text-orange-300"
                  >
                    Clear filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
                  {filteredBeachesWithRegion.map(({ beach, region }, index) => (
                    <BeachCard key={beach.slug} beach={beach} region={region} priority={index < 4} beachDetails={beachDetails} regions={regions} />
                  ))}
                </div>
              )}
            </div>
          </div>

          <MobileFilterSheet
            open={isFilterSheetOpen}
            title="Filters"
            onClose={() => setIsFilterSheetOpen(false)}
            onApply={() => {
              setSelectedRegions(draftRegions);
              setSelectedCategories(draftCategories);
              setIsFilterSheetOpen(false);
            }}
            onReset={() => {
              setDraftRegions([]);
              setDraftCategories([]);
            }}
            hasActiveFilters={hasActiveFilters}
          >
            <div className="space-y-5">
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Category</h4>
                <div className="flex flex-wrap gap-2">
                  {BEACH_CATEGORY_OPTIONS.map((option) => {
                    const active =
                      option.id === "all"
                        ? draftCategories.length === 0
                        : draftCategories.includes(option.id);
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => toggleDraftCategory(option.id)}
                        className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium border transition-colors ${
                          active
                            ? "bg-orange-500 border-orange-500 text-white"
                            : "bg-white border-gray-300 text-gray-700"
                        }`}
                      >
                        <span>{option.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Region</h4>
                <div className="flex flex-wrap gap-2">
                  {REGION_OPTIONS.map((option) => {
                    const count =
                      option.id === "all"
                        ? TOTAL_ALL_BEACHES
                        : allBeaches.filter((b) => b.region === option.id).length;
                    const active =
                      option.id === "all"
                        ? draftRegions.length === 0
                        : draftRegions.includes(option.id);
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => toggleDraftRegion(option.id)}
                        className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium border transition-colors ${
                          active
                            ? "bg-orange-500 border-orange-500 text-white"
                            : "bg-white border-gray-300 text-gray-700"
                        }`}
                      >
                        <span>{option.label}</span>
                        <span className={`text-[11px] px-1.5 py-0.5 rounded-full ${active ? "bg-white/25" : "bg-gray-100"}`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </MobileFilterSheet>
        </div>
      </section>

      <Footer />
    </main>
  );
}
