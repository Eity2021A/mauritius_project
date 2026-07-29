"use client";

import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Beach, BeachDetails } from "@/data/beaches";
import { type Region, type BeachCategory, REGION_BADGE_COLORS } from "@/types/content";
import { getImageUrl } from "@/lib/image-url";
import { useState, useMemo, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import MobileFilterSheet from "@/components/ui/MobileFilterSheet";

interface BeachesListClientProps {
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

function BeachCard({ beach, region, priority = false, beachDetails, regions, categoryLabels }: { beach: Beach; region: Region; priority?: boolean; beachDetails: Record<string, BeachDetails>; regions: { id: Region; label: string }[]; categoryLabels: Record<BeachCategory, string> }) {
  const regionLabel = regions.find((r) => r.id === region)?.label ?? region;
  const categories = beachDetails[beach.slug]?.categories ?? [];
  const firstCategoryLabel = categories.length > 0 ? (categoryLabels[categories[0]] ?? categories[0]) : null;

  return (
    <Link
      href={`/beaches-in-mauritius/${beach.slug}`}
      className="group relative aspect-[2/3.3] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 img-shimmer block"
    >
      <Image
        src={getImageUrl(beach.image, { width: 400, quality: 75 })}
        fill
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        alt={beach.name}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        priority={priority}
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

function BeachesListClientContent({
  allBeaches,
  regions,
  beachDetails,
  regionParam,
}: BeachesListClientProps & { regionParam: string | null }) {
  const t = useTranslations("BeachesHub");
  const categoryLabels: Record<BeachCategory, string> = {
    snorkeling: t("categories.snorkeling"),
    amenities: t("categories.amenities"),
    "family-friendly": t("categories.familyFriendly"),
    surfing: t("categories.surfing"),
    secluded: t("categories.secluded"),
  };
  const regionLabels: Record<Region, string> = {
    North: t("regions.north"),
    South: t("regions.south"),
    East: t("regions.east"),
    West: t("regions.west"),
    "North West": t("regions.northWest"),
    "North East": t("regions.northEast"),
    "South West": t("regions.southWest"),
    "South East": t("regions.southEast"),
    Central: t("regions.central"),
    Rodrigues: t("regions.rodrigues"),
    Various: t("regions.various"),
  };
  const BEACH_CATEGORY_OPTIONS: { id: BeachCategory | "all"; label: string }[] = [
    { id: "all", label: t("filters.all") },
    { id: "snorkeling", label: categoryLabels.snorkeling },
    { id: "amenities", label: categoryLabels.amenities },
    { id: "family-friendly", label: categoryLabels["family-friendly"] },
    { id: "surfing", label: categoryLabels.surfing },
    { id: "secluded", label: categoryLabels.secluded },
  ];
  const REGION_OPTIONS: { id: Region | "all"; label: string }[] = [
    { id: "all", label: t("filters.all") },
    ...regions.map((region) => ({
      ...region,
      label: regionLabels[region.id] ?? region.label,
    })),
  ];
  const translatedRegions = REGION_OPTIONS.filter(
    (option): option is { id: Region; label: string } => option.id !== "all"
  );
  const TOTAL_ALL_BEACHES = allBeaches.length;
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
      if (selectedRegions.length > 0 && window.location.hash === "#beach-cards") {
        requestAnimationFrame(() => {
          resultsSectionRef.current?.scrollIntoView({ behavior: "auto", block: "start" });
        });
      }
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
          alt={t("hero.imageAlt")}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center px-4 max-w-4xl mx-auto translate-y-[2rem]">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {t("hero.title")}
            </h1>
            <p className="text-white/90 text-base md:text-lg max-w-2xl mx-auto">
              {t("hero.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="pt-6 md:pt-8 pb-6 md:pb-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-700 leading-relaxed text-center">
              {t("intro.beforeBeaches")} <Link href="/beaches-in-mauritius" target="_blank" rel="noopener noreferrer" className="font-semibold text-orange-600 hover:text-orange-700 hover:underline">{t("intro.beachesLink")}</Link>{t("intro.afterBeaches")} <Link href="/best-places-to-visit-in-mauritius" target="_blank" rel="noopener noreferrer" className="font-semibold text-orange-600 hover:text-orange-700 hover:underline">{t("intro.honeymoonLink")}</Link>{t("intro.afterHoneymoon")} <Link href="/beaches-in-mauritius/belle-mare" target="_blank" rel="noopener noreferrer" className="font-semibold text-orange-600 hover:text-orange-700 hover:underline">Belle Mare</Link>{t("intro.afterBelleMare")} <Link href="/beaches-in-mauritius/mont-choisy" target="_blank" rel="noopener noreferrer" className="font-semibold text-orange-600 hover:text-orange-700 hover:underline">Mont Choisy</Link>{t("intro.afterMontChoisy")} <Link href="/beaches-in-mauritius/pointe-aux-piments" target="_blank" rel="noopener noreferrer" className="font-semibold text-orange-600 hover:text-orange-700 hover:underline">Pointe aux Piments</Link>{t("intro.afterPointeAuxPiments")} <Link href="/mauritius-activities" target="_blank" rel="noopener noreferrer" className="font-semibold text-orange-600 hover:text-orange-700 hover:underline">{t("intro.snorkelingLink")}</Link>{t("intro.afterSnorkeling")} <Link href="/beaches-in-mauritius/trou-aux-biches" target="_blank" rel="noopener noreferrer" className="font-semibold text-orange-600 hover:text-orange-700 hover:underline">Trou aux Biches</Link>{t("intro.afterTrouAuxBiches")}
            </p>
          </div>
        </div>
      </section>

      {/* Where to Go Section */}
     {/* <section className="pt-6 md:pt-8 pb-12 md:pb-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto"> 
             <div className="grid md:grid-cols-2 gap-12 items-stretch"> 
               <div className="h-full min-h-[280px]">
                <MauritiusMap />
              </div> 
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
      </section>   */}

      {/* Beach Cards Section - Sidebar + Grid (same UX as Best Places to Visit) */}
      <section ref={resultsSectionRef} id="beach-cards" className="py-10 md:py-14 bg-white scroll-mt-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="lg:hidden sticky top-[calc(env(safe-area-inset-top)+4rem)] z-30 bg-white/95 backdrop-blur border-b border-gray-100 -mx-4 px-4 py-3 mb-4">
            <div className="flex items-center gap-2">
              <input
                id="beach-search-mobile"
                type="text"
                placeholder={t("filters.searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 w-full px-4 py-3 min-h-[48px] text-base border border-gray-300 rounded-xl outline-none focus:border-gray-400"
                aria-label={t("filters.searchAria")}
              />
              <button
                type="button"
                onClick={() => {
                  setDraftRegions(selectedRegions);
                  setDraftCategories(selectedCategories);
                  setIsFilterSheetOpen(true);
                }}
                className="h-12 w-12 flex-shrink-0 rounded-xl border border-gray-300 bg-white flex items-center justify-center text-gray-700"
                aria-label={t("filters.openFilters")}
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
                    placeholder={t("filters.searchPlaceholder")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg outline-none focus:border-gray-400 dark:border-neutral-600 dark:focus:border-neutral-500"
                    aria-label={t("filters.searchAria")}
                  />
                </div>

                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    {t("filters.category")}
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
                    {t("filters.region")}
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
                            aria-label={t("filters.countAria", { count })}
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
                    {t("filters.reset")}
                  </button>
                )}

              </div>
            </aside>

            {/* Right Content - Beach Cards Grid (unchanged card style) */}
            <div id="explore" className="flex-1 min-w-0 scroll-mt-24">
              {filteredBeachesWithRegion.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400 text-lg">
                    {t("empty.title")}
                  </p>
                  <button
                    onClick={() => {
                      setSelectedRegions([]);
                      setSelectedCategories([]);
                      setSearchQuery("");
                    }}
                    className="mt-4 text-orange-600 hover:text-orange-700 font-medium dark:text-orange-400 dark:hover:text-orange-300"
                  >
                    {t("empty.clear")}
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
                  {filteredBeachesWithRegion.map(({ beach, region }, index) => (
                    <BeachCard
                      key={beach.slug}
                      beach={beach}
                      region={region}
                      priority={index < 4}
                      beachDetails={beachDetails}
                      regions={translatedRegions}
                      categoryLabels={categoryLabels}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          <MobileFilterSheet
            open={isFilterSheetOpen}
            title={t("filters.title")}
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
            applyLabel={t("filters.apply")}
            resetLabel={t("filters.resetShort")}
            closeLabel={t("filters.close")}
          >
            <div className="space-y-5">
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">{t("filters.category")}</h4>
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
                <h4 className="text-sm font-semibold text-gray-700 mb-3">{t("filters.region")}</h4>
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

export default function BeachesListClient(props: BeachesListClientProps) {
  const searchParams = useSearchParams();
  const regionParam = searchParams.get("region");

  return (
    <BeachesListClientContent
      key={regionParam ?? "all"}
      {...props}
      regionParam={regionParam}
    />
  );
}
