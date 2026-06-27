"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Activity } from "@/data/activities";
import { type ActivityCategory, type Region, REGION_BADGE_COLORS, CATEGORY_LABELS } from "@/types/content";
import { getImageSrcSet, getImageUrl } from "@/lib/image-url";
import { useState, useMemo, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import MobileFilterSheet from "@/components/ui/MobileFilterSheet";

interface ActivitiesListClientProps {
  allActivities: Activity[];
  activityCategories: { id: ActivityCategory; label: string }[];
  activitySlugsWithPages: string[];
}

const VALID_ACTIVITY_CATEGORIES: ActivityCategory[] = ["all", "best-seller", "adventure", "air", "land", "sea", "hiking", "unique"];
function getCategoryFromParam(param: string | null): ActivityCategory {
  if (param && VALID_ACTIVITY_CATEGORIES.includes(param as ActivityCategory)) {
    return param as ActivityCategory;
  }
  return "all";
}


function ActivityCard({ activity, priority = false, slugsWithPages }: { activity: Activity; priority?: boolean; slugsWithPages: Set<string> }) {
  const hasDetailPage = slugsWithPages.has(activity.slug);
  const region = activity.region;
  const regionColor = region ? (REGION_BADGE_COLORS[region] ?? "bg-slate-500") : "bg-slate-500";
  const firstCategory = activity.categories.find((c) => c !== "all");
  const firstCategoryLabel = firstCategory ? (CATEGORY_LABELS[firstCategory] ?? firstCategory) : null;

  const cardContent = (
    <>
      <img
        src={getImageUrl(activity.image, { width: 400, quality: 75 })}
        srcSet={getImageSrcSet(activity.image, { widths: [320, 400, 800], quality: 66 })}
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        alt={activity.name}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
      {/* Bottom: gradient overlay + badges + title + description */}
      <div className="absolute bottom-0 left-0 right-0 pt-2 px-4 pb-3.5 bg-gradient-to-b from-transparent via-black/60 to-black/90 flex flex-col overflow-visible">
        <div className="flex items-center flex-nowrap gap-1 mb-1.5 min-w-0 overflow-hidden">
          {region && (
            <span className={`whitespace-nowrap text-[11px] px-1.5 py-0.5 rounded text-white font-medium ${regionColor}`}>
              {region}
            </span>
          )}
          {firstCategoryLabel && (
            <span className="whitespace-nowrap text-[11px] px-1.5 py-0.5 rounded bg-white/90 text-gray-700 font-medium">
              {firstCategoryLabel}
            </span>
          )}
        </div>
        <h3 className="font-bold text-white group-hover:text-orange-300 transition-colors text-[15px] sm:text-base mb-1 leading-tight line-clamp-2 min-h-0 break-words">
          {activity.name}
        </h3>
        <p className="text-white/90 text-[13px] leading-snug line-clamp-2 min-h-0 break-words">
          {activity.description}
        </p>
      </div>
    </>
  );

  if (hasDetailPage) {
    return (
      <Link
        href={`/top-activities-mauritius/${activity.slug}`}
        className="group relative aspect-[2/3.3] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 img-shimmer block"
      >
        {cardContent}
      </Link>
    );
  }

  return (
    <div className="group relative aspect-[2/3.3] rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 img-shimmer">
      {cardContent}
    </div>
  );
}

export default function ActivitiesListClient({ allActivities, activityCategories, activitySlugsWithPages: slugsWithPagesProp }: ActivitiesListClientProps) {
  const slugsWithPages = useMemo(() => new Set(slugsWithPagesProp), [slugsWithPagesProp]);
  const REGION_OPTIONS: { id: Region | "all"; label: string }[] = useMemo(() => {
    const uniqueRegions = Array.from(
      new Set(
        allActivities
          .map((activity) => activity.region)
          .filter((region): region is Region => Boolean(region) && region !== "Various")
      )
    ).sort();
    return [{ id: "all", label: "All Regions" }, ...uniqueRegions.map((region) => ({ id: region, label: region }))];
  }, [allActivities]);
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const initialCategory = getCategoryFromParam(categoryParam);
  const [selectedCategories, setSelectedCategories] = useState<ActivityCategory[]>(
    initialCategory === "all" ? [] : [initialCategory]
  );
  const [selectedRegions, setSelectedRegions] = useState<Region[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [draftCategories, setDraftCategories] = useState<ActivityCategory[]>(
    initialCategory === "all" ? [] : [initialCategory]
  );
  const [draftRegions, setDraftRegions] = useState<Region[]>([]);

  // Sync filter when URL has ?category= (e.g. from "What You Can Do" → Water Sports)
  useEffect(() => {
    const nextCategory = getCategoryFromParam(categoryParam);
    const nextSelected = nextCategory === "all" ? [] : [nextCategory];
    setSelectedCategories(nextSelected);
    setDraftCategories(nextSelected);
  }, [categoryParam]);

  const filteredActivities = useMemo(() => {
    const byFilters = allActivities.filter((activity) => {
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.some((category) => activity.categories.includes(category));
      const matchesRegion =
        selectedRegions.length === 0 ||
        (activity.region ? selectedRegions.includes(activity.region) : false);
      return matchesCategory && matchesRegion;
    });
    if (!searchQuery.trim()) return byFilters;
    const q = searchQuery.toLowerCase().trim();
    const filtered = byFilters.filter(
      (activity) =>
        activity.name.toLowerCase().includes(q) ||
        activity.description.toLowerCase().includes(q)
    );
    return filtered;
  }, [selectedCategories, selectedRegions, searchQuery, allActivities]);

  const hasActiveFilters = draftCategories.length > 0 || draftRegions.length > 0;
  const resultsSectionRef = useRef<HTMLElement>(null);
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    resultsSectionRef.current?.scrollIntoView({ behavior: "auto", block: "start" });
  }, [selectedCategories, selectedRegions, searchQuery]);

  const toggleSelectedCategory = (category: ActivityCategory) => {
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

  const toggleDraftCategory = (category: ActivityCategory) => {
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

  return (
    <main id="main-content" className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[44vh] min-h-[280px]">
        <img
          src={getImageUrl("catamaran-cruises-in-mauritius.jpg", { width: 1200, quality: 75 })}
          srcSet={getImageSrcSet("catamaran-cruises-in-mauritius.jpg", {
            widths: [800, 1200, 1600, 2000],
            quality: 72,
          })}
          sizes="100vw"
          alt="Best Activities in Mauritius"
          className="absolute inset-0 w-full h-full object-cover"
          fetchPriority="high"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center px-4 max-w-4xl mx-auto translate-y-[2rem]">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Activities in Mauritius
              <span className="block">Best things to do in Mauritius in 2026</span>
            </h1>
            <p className="text-white/90 text-base md:text-lg max-w-2xl mx-auto">
              Mauritius&apos; largest collection of activities — from sea adventures to mountain hikes
            </p>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="pt-6 md:pt-8 pb-6 md:pb-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-700 leading-relaxed text-center [&_strong]:text-orange-600 [&_strong]:font-semibold">
              Mauritius offers a wealth of exciting activities for every type of traveler. Whether you&apos;re seeking <strong>adrenaline-pumping adventures</strong> like swimming with dolphins, skydiving, or quad biking, or prefer more relaxing experiences like <strong>catamaran cruises</strong> and <strong>sunset boat tours</strong>, there&apos;s something for everyone. Explore the island&apos;s stunning natural beauty through <strong>hiking trails</strong> to waterfalls and mountain peaks, or discover the underwater world with <strong>snorkeling</strong> and <strong>scuba diving</strong>. From helicopter tours over the famous underwater waterfall to horse riding on pristine beaches, create unforgettable memories in paradise.
            </p>
          </div>
        </div>
      </section>

      {/* Activity Cards Section - Sidebar + Grid (same UX as Best Places / Beaches) */}
      <section ref={resultsSectionRef} id="activities-grid" className="py-10 md:py-14 bg-white scroll-mt-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="lg:hidden sticky top-[calc(env(safe-area-inset-top)+4rem)] z-30 bg-white/95 backdrop-blur border-b border-gray-100 -mx-4 px-4 py-3 mb-4">
            <div className="flex items-center gap-2">
              <input
                id="activity-search-mobile"
                type="text"
                placeholder="Search activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 w-full px-4 py-3 min-h-[48px] text-base border border-gray-300 rounded-xl outline-none focus:border-gray-400"
                aria-label="Search activities"
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
            {/* Left Sidebar - Filters */}
            <aside className="hidden lg:block lg:w-64 flex-shrink-0">
              <div
                className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto lg:pr-1 space-y-4"
                style={{ scrollbarGutter: "stable" }}
              >
                {/* Search */}
                <div>
                  <input
                    id="activity-search"
                    type="text"
                    placeholder="Search activities..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg outline-none focus:border-gray-400 dark:border-neutral-600 dark:focus:border-neutral-500"
                    aria-label="Search activities"
                  />
                </div>

                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Category
                  </label>
                  <div className="space-y-1">
                    {activityCategories.map((category) => {
                      const count = category.id === "all"
                        ? allActivities.length
                        : allActivities.filter((a) => a.categories.includes(category.id)).length;
                      const isSelected =
                        category.id === "all"
                          ? selectedCategories.length === 0
                          : selectedCategories.includes(category.id);
                      return (
                        <button
                          key={category.id}
                          onClick={() => toggleSelectedCategory(category.id)}
                          className={`w-full text-left px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-between gap-2 min-w-0 ${
                            isSelected
                              ? "bg-orange-500 text-white shadow-md"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-neutral-700 dark:text-gray-200 dark:hover:bg-neutral-600"
                          }`}
                        >
                          <span className="truncate">{category.label}</span>
                          <span
                            className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-semibold ${
                              isSelected
                                ? "bg-white/25 text-white"
                                : "bg-gray-300 text-gray-600 dark:bg-neutral-600 dark:text-gray-300"
                            }`}
                            aria-label={`${count} activities`}
                          >
                            {count}
                          </span>
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
                      const isSelected =
                        option.id === "all"
                          ? selectedRegions.length === 0
                          : selectedRegions.includes(option.id);
                      return (
                        <button
                          key={option.id}
                          onClick={() => toggleSelectedRegion(option.id)}
                          className={`w-full text-left px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                            isSelected
                              ? "bg-slate-600 text-white shadow-md"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-neutral-700 dark:text-gray-200 dark:hover:bg-neutral-600"
                          }`}
                        >
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Reset Filters */}
                {(selectedCategories.length > 0 || selectedRegions.length > 0 || searchQuery !== "") && (
                  <button
                    onClick={() => {
                      setSelectedCategories([]);
                      setSelectedRegions([]);
                      setSearchQuery("");
                    }}
                    className="w-full px-3 py-1.5 text-sm text-orange-600 hover:text-orange-700 border border-orange-300 rounded-lg hover:bg-orange-50 transition-colors dark:border-orange-600 dark:hover:bg-orange-950/30"
                  >
                    Reset Filters
                  </button>
                )}

              </div>
            </aside>

            {/* Right Content - Activity Cards Grid (unchanged card style) */}
            <div id="explore" className="flex-1 min-w-0 scroll-mt-24">
              {filteredActivities.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400 text-lg">
                    No activities found matching your filters.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategories([]);
                      setSelectedRegions([]);
                      setSearchQuery("");
                    }}
                    className="mt-4 text-orange-600 hover:text-orange-700 font-medium dark:text-orange-400 dark:hover:text-orange-300"
                  >
                    Clear filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
                  {filteredActivities.map((activity, index) => (
                    <ActivityCard key={activity.slug} activity={activity} priority={index < 4} slugsWithPages={slugsWithPages} />
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
                  {activityCategories.map((category) => {
                    const active =
                      category.id === "all"
                        ? draftCategories.length === 0
                        : draftCategories.includes(category.id);
                    const count = category.id === "all"
                      ? allActivities.length
                      : allActivities.filter((a) => a.categories.includes(category.id)).length;
                    return (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => toggleDraftCategory(category.id)}
                        className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium border transition-colors ${
                          active
                            ? "bg-orange-500 border-orange-500 text-white"
                            : "bg-white border-gray-300 text-gray-700"
                        }`}
                      >
                        <span>{category.label}</span>
                        <span className={`text-[11px] px-1.5 py-0.5 rounded-full ${active ? "bg-white/25" : "bg-gray-100"}`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Region</h4>
                <div className="flex flex-wrap gap-2">
                  {REGION_OPTIONS.map((option) => {
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
                            ? "bg-slate-600 border-slate-600 text-white"
                            : "bg-white border-gray-300 text-gray-700"
                        }`}
                      >
                        <span>{option.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </MobileFilterSheet>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Need Help Planning Your Adventure?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Contact us for personalized recommendations and help booking the perfect activities for your Mauritius trip.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center min-h-[48px] bg-white text-orange-500 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300"
          >
            Contact Us
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
