"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { PlaceDetails } from "@/data/place-details";
import { type PlaceCategory, REGION_BADGE_COLORS } from "@/types/content";
import { getImageSrcSet, getImageUrl } from "@/lib/image-url";
import MobileFilterSheet from "@/components/ui/MobileFilterSheet";

// Category configuration – bright, uplifting palette (same families, lighter variants)
const CATEGORIES: { id: PlaceCategory | "all"; label: string; color: string }[] = [
  { id: "all", label: "All", color: "bg-slate-500" },
  { id: "nature", label: "Nature", color: "bg-emerald-500" },
  { id: "waterfalls", label: "Waterfalls", color: "bg-sky-500" },
  { id: "discover", label: "Discover", color: "bg-amber-500" },
  { id: "hideaways", label: "Hideaways", color: "bg-violet-500" },
  { id: "islands", label: "Islands", color: "bg-teal-500" },
  { id: "local", label: "Local", color: "bg-orange-500" },
];

const VALID_PLACE_CATEGORIES: (PlaceCategory | "all")[] = ["all", "nature", "waterfalls", "discover", "hideaways", "islands", "local"];
function getPlaceCategoryFromParam(param: string | null): PlaceCategory | "all" {
  if (param && VALID_PLACE_CATEGORIES.includes(param as PlaceCategory | "all")) {
    return param as PlaceCategory | "all";
  }
  return "all";
}


interface PlacesListClientProps {
  allPlaces: PlaceDetails[];
}

export default function PlacesListClient({ allPlaces }: PlacesListClientProps) {
  const REGIONS = useMemo(() => [
    "All Regions",
    ...Array.from(new Set(allPlaces.map((p) => p.region))).filter((r) => r !== "Various").sort(),
  ], [allPlaces]);
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const initialCategory = getPlaceCategoryFromParam(categoryParam);
  const [selectedCategories, setSelectedCategories] = useState<PlaceCategory[]>(
    initialCategory === "all" ? [] : [initialCategory]
  );
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [draftCategories, setDraftCategories] = useState<PlaceCategory[]>(
    initialCategory === "all" ? [] : [initialCategory]
  );
  const [draftRegions, setDraftRegions] = useState<string[]>([]);

  // Sync filter when URL has ?category= (e.g. from "What You Can Do" → Nature & Wildlife)
  useEffect(() => {
    const nextCategory = getPlaceCategoryFromParam(categoryParam);
    const nextSelected = nextCategory === "all" ? [] : [nextCategory];
    setSelectedCategories(nextSelected);
    setDraftCategories(nextSelected);
  }, [categoryParam]);

  const filteredPlaces = useMemo(() => {
    const filtered = allPlaces.filter((place) => {
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.some((category) => place.categories.includes(category));
      const matchesRegion =
        selectedRegions.length === 0 || selectedRegions.includes(place.region);
      const matchesSearch =
        searchQuery === "" ||
        place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.tagline.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesRegion && matchesSearch;
    });
    return filtered;
  }, [selectedCategories, selectedRegions, searchQuery, allPlaces]);

  const hasActiveFilters =
    draftCategories.length > 0 || draftRegions.length > 0;

  // Keep results in view when filters change (prevents scroll jumping to bottom when list shrinks)
  const resultsSectionRef = useRef<HTMLElement>(null);
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    resultsSectionRef.current?.scrollIntoView({ behavior: "auto", block: "start" });
  }, [selectedCategories, selectedRegions, searchQuery]);

  const toggleSelectedCategory = (category: PlaceCategory | "all") => {
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

  const toggleSelectedRegion = (region: string) => {
    if (region === "All Regions") {
      setSelectedRegions([]);
      return;
    }
    setSelectedRegions((prev) =>
      prev.includes(region)
        ? prev.filter((r) => r !== region)
        : [...prev, region]
    );
  };

  const toggleDraftCategory = (category: PlaceCategory | "all") => {
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

  const toggleDraftRegion = (region: string) => {
    if (region === "All Regions") {
      setDraftRegions([]);
      return;
    }
    setDraftRegions((prev) =>
      prev.includes(region)
        ? prev.filter((r) => r !== region)
        : [...prev, region]
    );
  };

  return (
    <main id="main-content" className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[44vh] min-h-[280px]">
        <Image
          src={getImageUrl("/images/banners/pamplemousses-botanical-garden-mauritius.webp")}
          alt="Best Places to Visit in Mauritius"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center px-4 max-w-4xl mx-auto translate-y-[2rem]">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Best Places to Visit in Mauritius  –  Things to do in 2026
            </h1>
            <p className="text-white/90 text-base md:text-lg max-w-2xl mx-auto">
              A guide to explore Mauritius | What are the best places to visit | Be inspired to explore
            </p>
          </div>
        </div>
      </section>

      {/* Main Content - ref used to scroll here when filters change */}
      <section ref={resultsSectionRef} className="pt-6 md:pt-8 pb-10 md:pb-14">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="lg:hidden sticky top-[calc(env(safe-area-inset-top)+4rem)] z-30 bg-white/95 backdrop-blur border-b border-gray-100 -mx-4 px-4 py-3 mb-4">
            <div className="flex items-center gap-2">
              <input
                id="place-search-mobile"
                type="text"
                placeholder="Search places..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 w-full px-4 py-3 min-h-[48px] text-base border border-gray-300 rounded-xl outline-none focus:border-gray-400"
                aria-label="Search places"
              />
              <button
                type="button"
                onClick={() => {
                  setDraftCategories(selectedCategories);
                  setDraftRegions(selectedRegions);
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
            {/* Left Sidebar - Sticky, scrollable when content overflows; Category + Region in 2 cols on lg */}
            <aside className="hidden lg:block lg:w-64 flex-shrink-0">
              <div
                className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto lg:pr-1 space-y-4"
                style={{ scrollbarGutter: "stable" }}
              >
                {/* Search */}
                <div>
                  <input
                    id="place-search"
                    type="text"
                    placeholder="Search places..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg outline-none focus:border-gray-400 dark:border-neutral-600 dark:focus:border-neutral-500"
                    aria-label="Search places"
                  />
                </div>

                {/* Category + Region side by side on lg to reduce height */}
                <div className="lg:grid lg:grid-cols-2 lg:gap-3 lg:items-start">
                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Category
                    </label>
                    <div className="space-y-1">
                      {CATEGORIES.map((category) => {
                        const isAll = category.id === "all";
                        const active = isAll
                          ? selectedCategories.length === 0
                          : selectedCategories.includes(category.id as PlaceCategory);
                        return (
                        <button
                          key={category.id}
                          onClick={() => toggleSelectedCategory(category.id)}
                          className={`w-full text-left px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-between gap-2 min-w-0 ${
                            active
                              ? "bg-orange-500 text-white shadow-md"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          <span className="truncate">{category.label}</span>
                        </button>
                      );
                      })}
                    </div>
                  </div>

                  {/* Region Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Region
                    </label>
                    <div className="space-y-1">
                      {REGIONS.map((region) => {
                        const active =
                          region === "All Regions"
                            ? selectedRegions.length === 0
                            : selectedRegions.includes(region);
                        return (
                        <button
                          key={region}
                          onClick={() => toggleSelectedRegion(region)}
                          className={`w-full text-left px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                            active
                              ? "bg-orange-500 text-white shadow-md"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {region}
                        </button>
                      );
                      })}
                    </div>
                  </div>
                </div>

                {/* Reset Filters */}
                {(selectedCategories.length > 0 ||
                  selectedRegions.length > 0 ||
                  searchQuery !== "") && (
                  <button
                    onClick={() => {
                      setSelectedCategories([]);
                      setSelectedRegions([]);
                      setSearchQuery("");
                    }}
                    className="w-full px-3 py-1.5 text-sm text-orange-600 hover:text-orange-700 border border-orange-300 rounded-lg hover:bg-orange-50 transition-colors"
                  >
                    Reset Filters
                  </button>
                )}

              </div>
            </aside>

            {/* Right Content - Places Grid */}
            <div className="flex-1">
              {filteredPlaces.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">
                    No places found matching your filters.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategories([]);
                      setSelectedRegions([]);
                      setSearchQuery("");
                    }}
                    className="mt-4 text-orange-600 hover:text-orange-700 font-medium"
                  >
                    Clear filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
                  {filteredPlaces.map((place) => (
                    (() => {
                      const categoryLabels = place.categories
                        .slice(0, 1)
                        .map((cat) => CATEGORIES.find((c) => c.id === cat)?.label ?? cat);
                      const firstCategoryLabel = categoryLabels[0] ?? null;
                      return (
                    <Link
                      key={place.slug}
                      href={`/best-places-to-visit-in-mauritius/${place.slug}`}
                      className="group relative aspect-[2/3.3] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 img-shimmer block"
                    >
                      {place.images.length > 0 ? (
                        <img
                          src={getImageUrl(place.images[0], { width: 400, quality: 75 })}
                          srcSet={getImageSrcSet(place.images[0], { widths: [320, 400, 800], quality: 66 })}
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                          alt={place.name}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                          <span className="text-gray-400">No image</span>
                        </div>
                      )}
                      {/* Gradient overlay: badges above title, all left-aligned */}
                      <div className="absolute bottom-0 left-0 right-0 pt-2 px-4 pb-3.5 bg-gradient-to-b from-transparent via-black/60 to-black/90 flex flex-col overflow-visible">
                        <div className="flex items-center flex-nowrap gap-1 mb-1.5 min-w-0 overflow-hidden">
                          <span className={`whitespace-nowrap text-[11px] px-1.5 py-0.5 rounded text-white font-medium ${REGION_BADGE_COLORS[place.region] ?? "bg-slate-500"}`}>
                            {place.region}
                          </span>
                          {firstCategoryLabel && (
                            <span className="whitespace-nowrap text-[11px] px-1.5 py-0.5 rounded bg-white/90 text-gray-700 font-medium">
                              {firstCategoryLabel}
                            </span>
                          )}
                        </div>
                        <h3 className="font-bold text-white group-hover:text-orange-300 transition-colors text-[15px] sm:text-base mb-1 leading-tight line-clamp-2 min-h-0 break-words">
                          {place.name}
                        </h3>
                        <p className="text-white/90 text-[13px] leading-snug line-clamp-2 min-h-0 break-words">
                          {place.tagline}
                        </p>
                      </div>
                    </Link>
                      );
                    })()
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
              setSelectedCategories(draftCategories);
              setSelectedRegions(draftRegions);
              setIsFilterSheetOpen(false);
            }}
            onReset={() => {
              setDraftCategories([]);
              setDraftRegions([]);
            }}
            hasActiveFilters={hasActiveFilters}
          >
            <div className="space-y-5">
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Category</h4>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((category) => {
                    const active =
                      category.id === "all"
                        ? draftCategories.length === 0
                        : draftCategories.includes(category.id as PlaceCategory);
                    return (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => toggleDraftCategory(category.id)}
                        className={`inline-flex items-center rounded-full px-3.5 py-2 text-sm font-medium border transition-colors ${
                          active
                            ? "bg-orange-500 border-orange-500 text-white shadow-md"
                            : "bg-white border-gray-300 text-gray-700"
                        }`}
                      >
                        {category.label}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Region</h4>
                <div className="flex flex-wrap gap-2">
                  {REGIONS.map((region) => {
                    const active =
                      region === "All Regions"
                        ? draftRegions.length === 0
                        : draftRegions.includes(region);
                    return (
                      <button
                        key={region}
                        type="button"
                        onClick={() => toggleDraftRegion(region)}
                        className={`inline-flex items-center rounded-full px-3.5 py-2 text-sm font-medium border transition-colors ${
                          active
                            ? "bg-orange-500 border-orange-500 text-white shadow-md"
                            : "bg-white border-gray-300 text-gray-700"
                        }`}
                      >
                        {region}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </MobileFilterSheet>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 md:p-8 border border-orange-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <Image
                src="/images/mauritius-explored.svg"
                alt="Mauritius Explored"
                width={28}
                height={28}
                className="flex-shrink-0"
              />
              Tips from Mauritius Explored
            </h2>
            <p className="text-gray-700 mb-4">
              <strong>TIP:</strong> Don&apos;t be afraid to rent a car. The small island is 
              easy to explore via a handful of roads and traffic is much like the local 
              population – relaxed and sparse.
            </p>
            <p className="text-gray-600 text-sm">
              We included the best places to visit that nobody else visits. Look for 
              the &quot;Hideaways&quot; category for our secret spots!
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
