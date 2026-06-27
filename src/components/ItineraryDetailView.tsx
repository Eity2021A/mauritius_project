"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Image from "next/image";
import MapSkeleton from "@/components/ui/MapSkeleton";
import { getImageSrcSet, getImageUrl } from "@/lib/image-url";
import type { StopForMap, RouteInfo } from "@/components/ItineraryBuilderMap";
import type { PreDesignedItinerary, PreDesignedStop } from "@/data/predesigned-itineraries";
import { formatDuration } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import ViewTracker from "@/components/ViewTracker";
import Footer from "@/components/Footer";
import ItinerarySaveRate from "@/components/ItinerarySaveRate";

const OSRM_BASE = "https://router.project-osrm.org/route/v1/driving";
const ItineraryBuilderMap = dynamic(() => import("@/components/ItineraryBuilderMap"), {
  ssr: false,
  loading: () => <MapSkeleton />,
});

function getLightboxImages(stop: PreDesignedStop): string[] {
  return [stop.image, ...(stop.images || []).filter((s) => s !== stop.image)].filter(Boolean);
}

function stopToMapStop(s: PreDesignedStop): StopForMap {
  const pinType =
    s.type === "beach" ? "beach" : s.type === "activity" ? "activity" : "nature";
  return {
    type: pinType,
    name: s.name,
    position: s.position,
    link: s.link,
  };
}

async function fetchRouteTotals(stops: PreDesignedStop[]): Promise<RouteInfo | null> {
  if (stops.length < 2) return null;
  const coords = stops.map((s) => `${s.position[1]},${s.position[0]}`).join(";");
  const url = `${OSRM_BASE}/${coords}?overview=false&geometries=geojson&steps=false`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  const legs = data?.routes?.[0]?.legs;
  if (!Array.isArray(legs)) return null;

  const mappedLegs = legs.map((leg: { distance: number; duration: number }) => ({
    distanceKm: Math.round((leg.distance / 1000) * 10) / 10,
    durationMin: Math.round(leg.duration / 60),
  }));

  return {
    legs: mappedLegs,
    totalDistanceKm: Math.round(mappedLegs.reduce((sum, l) => sum + l.distanceKm, 0) * 10) / 10,
    totalDurationMin: mappedLegs.reduce((sum, l) => sum + l.durationMin, 0),
  };
}

export default function ItineraryDetailView({
  itinerary,
  otherItineraries = [],
  topBanner,
  initialRouteInfo = null,
  initialOtherRouteTotals = {},
}: {
  itinerary: PreDesignedItinerary;
  otherItineraries?: PreDesignedItinerary[];
  topBanner?: React.ReactNode;
  initialRouteInfo?: RouteInfo | null;
  initialOtherRouteTotals?: Record<string, RouteInfo | null>;
}) {
  const [focusStopIndex, setFocusStopIndex] = useState<number | null>(null);
  const [mobileView, setMobileView] = useState<"list" | "map">("list");
  const [isLg, setIsLg] = useState(false);
  const [routeInfo, setRouteInfo] = useState<RouteInfo | null>(initialRouteInfo);
  const [otherRouteTotals, setOtherRouteTotals] = useState<Record<string, RouteInfo | null>>(
    initialOtherRouteTotals
  );
  const mapStops: StopForMap[] = useMemo(
    () => itinerary.stops.map(stopToMapStop),
    [itinerary.stops]
  );

  useEffect(() => {
    const m = window.matchMedia("(min-width: 1024px)");
    setIsLg(m.matches);
    const listener = () => setIsLg(m.matches);
    m.addEventListener("change", listener);
    return () => m.removeEventListener("change", listener);
  }, []);

  const mapContainerVisible = isLg || mobileView === "map";
  const mapSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLg && mobileView === "map" && mapSectionRef.current) {
      const t = setTimeout(() => {
        mapSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
      return () => clearTimeout(t);
    }
  }, [mobileView, isLg]);

  useEffect(() => {
    if (otherItineraries.length === 0) return;

    const missing = otherItineraries.filter((other) => !(other.slug in otherRouteTotals));
    if (missing.length === 0) return;

    let cancelled = false;
    Promise.all(
      missing.map(async (other) => {
        const totals = await fetchRouteTotals(other.stops);
        return [other.slug, totals] as const;
      })
    ).then((entries) => {
      if (cancelled) return;
      setOtherRouteTotals((prev) => ({ ...prev, ...Object.fromEntries(entries) }));
    });

    return () => {
      cancelled = true;
    };
  }, [otherItineraries, otherRouteTotals]);

  const showMap = (stopIndex: number) => {
    setFocusStopIndex(stopIndex);
    setMobileView("map");
  };

  const [lightbox, setLightbox] = useState<{ stopIndex: number; imageIndex: number } | null>(null);
  const openLightbox = useCallback((stopIndex: number, imageIndex: number) => {
    setLightbox({ stopIndex, imageIndex });
  }, []);
  const closeLightbox = useCallback(() => setLightbox(null), []);

  const handleLightboxKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (lightbox === null) return;
      const images = getLightboxImages(itinerary.stops[lightbox.stopIndex]);
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowRight" && images.length > 0)
        setLightbox((prev) =>
          prev ? { ...prev, imageIndex: (prev.imageIndex + 1) % images.length } : null
        );
      else if (e.key === "ArrowLeft" && images.length > 0)
        setLightbox((prev) =>
          prev
            ? {
                ...prev,
                imageIndex: (prev.imageIndex - 1 + images.length) % images.length,
              }
            : null
        );
    },
    [lightbox, itinerary.stops, closeLightbox]
  );

  useEffect(() => {
    if (lightbox !== null) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleLightboxKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleLightboxKeyDown);
    };
  }, [lightbox, handleLightboxKeyDown]);

  return (
    <main id="main-content" className="min-h-screen bg-white">
      <Navbar />
      <ViewTracker slug={itinerary.slug} />

      {/* Hero Section: first stop's image, compact height so more content visible on first load */}
      <section className="relative h-[36svh] min-h-[220px] md:h-[30vh] md:min-h-[220px] flex items-end">
        {itinerary.stops.length > 0 && itinerary.stops[0].image ? (
          <img
            src={getImageUrl(itinerary.stops[0].image, { width: 1200, quality: 75 })}
            srcSet={getImageSrcSet(itinerary.stops[0].image, {
              widths: [800, 1200, 1600, 2000],
              quality: 72,
            })}
            sizes="100vw"
            alt={itinerary.stops[0].name}
            className="absolute inset-0 w-full h-full object-cover"
            fetchPriority="high"
            loading="eager"
            decoding="async"
          />
        ) : itinerary.image ? (
          <img
            src={getImageUrl(itinerary.image, { width: 1200, quality: 75 })}
            srcSet={getImageSrcSet(itinerary.image, {
              widths: [800, 1200, 1600, 2000],
              quality: 72,
            })}
            sizes="100vw"
            alt={itinerary.title}
            className="absolute inset-0 w-full h-full object-cover"
            fetchPriority="high"
            loading="eager"
            decoding="async"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="relative z-10 w-full pb-5 md:pb-6 px-4 pt-[calc(env(safe-area-inset-top)+4.5rem)]">
          <div className="container mx-auto max-w-6xl">
            <Link
              href="/itineraries-mauritius"
              className="inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg transition-colors mb-3 md:mb-4"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to all Itineraries
            </Link>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1 md:mb-2">
              {itinerary.title}
            </h1>
            {itinerary.subtitle && (
              <p className="text-white/90 text-base md:text-lg max-w-2xl line-clamp-2">
                {itinerary.subtitle}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Platform intro paragraph(s) – full width below hero */}
      {itinerary.introParagraph && itinerary.introParagraph.length > 0 && (
        <section className="w-full border-b border-gray-100 bg-gray-50/50">
          <div className="w-full max-w-7xl mx-auto px-4 py-6 md:py-8">
            <div className="prose prose-gray prose-lg max-w-none text-gray-700">
              {itinerary.introParagraph.map((paragraph, i) => (
                <p key={i} className="mb-4 last:mb-0 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>
      )}

      {topBanner}

      <ItinerarySaveRate itinerary={itinerary} routeInfo={routeInfo} />

      {/* Two columns on desktop; on mobile: Map / Stops toggle */}
      <div className="max-w-7xl mx-auto px-4 py-6 lg:py-8">
        {/* Mobile: view switcher (Map | Stops) - sticky so it stays visible when scrolling */}
        <div className="flex lg:hidden mb-4 sticky top-[calc(env(safe-area-inset-top)+4rem)] z-40 bg-white py-3 border-b border-gray-100">
          <button
            type="button"
            onClick={() => setMobileView("map")}
            className={`flex-1 py-2.5 px-4 text-sm font-medium rounded-l-lg border transition ${
              mobileView === "map"
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            Map
          </button>
          <button
            type="button"
            onClick={() => setMobileView("list")}
            className={`flex-1 py-2.5 px-4 text-sm font-medium rounded-r-lg border border-l-0 transition ${
              mobileView === "list"
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            Stops
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Left: title fixed, then scrollable list of stops (hidden on mobile when map view) */}
          <div className={`lg:order-1 lg:pr-2 ${mobileView === "list" ? "block" : "hidden lg:block"}`}>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Stops on this itinerary
            </h2>
            <div className="space-y-3 lg:max-h-[calc(100vh-12rem)] lg:overflow-y-auto lg:pr-2">
            {itinerary.stops.length === 0 ? (
              <p className="text-sm text-gray-500">
                Stop details will be added here.
              </p>
            ) : (
              <ul className="space-y-2">
                {itinerary.stops.map((stop, i) => {
                  const lightboxImages = getLightboxImages(stop);
                  return (
                    <li
                      key={`${stop.slug}-${i}`}
                      id={`stop-${i}`}
                      className="border border-gray-100 rounded-xl p-3 hover:border-gray-200 transition-colors"
                    >
                      <article className="flex gap-3 items-start">
                        {/* Compact square image */}
                        <button
                          type="button"
                          onClick={() => openLightbox(i, 0)}
                          className="relative flex-shrink-0 w-20 h-20 lg:w-24 lg:h-24 rounded-lg overflow-hidden bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                          <img
                            src={getImageUrl(stop.image, { width: 400, quality: 75 })}
                            srcSet={getImageSrcSet(stop.image, {
                              widths: [200, 400],
                              quality: 68,
                            })}
                            sizes="96px"
                            alt={stop.name}
                            className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                            decoding="async"
                          />
                          {stop.images && stop.images.length > 1 && (
                            <span className="absolute bottom-1 right-1 bg-black/60 text-white text-[10px] font-medium px-1.5 py-0.5 rounded">
                              +{stop.images.length}
                            </span>
                          )}
                        </button>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-bold text-gray-900 leading-snug">
                            {i + 1}. {stop.name}
                          </h3>
                          {stop.description && (
                            <p className="text-gray-500 text-xs leading-relaxed mt-1 line-clamp-2">
                              {stop.description}
                            </p>
                          )}
                          <div className="flex flex-wrap items-center gap-1.5 mt-2">
                            <Link
                              href={stop.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-white text-gray-700 border border-gray-200 hover:border-orange-300 hover:text-orange-600 transition-colors"
                            >
                              <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                              </svg>
                              Stop details
                            </Link>
                            <button
                              type="button"
                              onClick={() => showMap(i)}
                              className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-white text-gray-700 border border-gray-200 hover:border-orange-300 hover:text-orange-600 transition-colors"
                            >
                              <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                              </svg>
                              Zoom on map
                            </button>
                            {routeInfo?.legs[i] && i < itinerary.stops.length - 1 && (
                              <>
                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gray-50 border border-gray-200 text-xs font-semibold text-orange-600">
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                                  </svg>
                                  {routeInfo.legs[i].distanceKm} km
                                </span>
                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gray-50 border border-gray-200 text-xs font-semibold text-orange-600">
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  {formatDuration(routeInfo.legs[i].durationMin)} to next stop
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </article>
                    </li>
                  );
                })}
              </ul>
            )}
            {itinerary.info && itinerary.info.length > 0 && (
              <div className="mt-8 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 md:p-8 border border-orange-100 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <Image
                    src={getImageUrl("/images/mauritius-explored.svg")}
                    alt="Mauritius Explored"
                    width={28}
                    height={28}
                    className="flex-shrink-0"
                  />
                  Tips
                </h2>
                <ul className="space-y-3">
                  {itinerary.info.map((line, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-700 text-sm">
                      <span className="flex-shrink-0 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-semibold mt-0.5">
                        {i + 1}
                      </span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            </div>
          </div>

          {/* Right: sticky map (on mobile shown when map view selected). Ref on wrapper so "View on map" scroll shows title. */}
          <div
            ref={mapSectionRef}
            className={`lg:order-2 lg:sticky lg:top-24 lg:self-start ${mobileView === "map" ? "block" : "hidden lg:block"} scroll-mt-20`}
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Map for this itinerary
            </h2>
            <div
              className="h-[420px] sm:h-[480px] lg:h-[calc(100vh-8rem)] lg:min-h-[400px] rounded-lg overflow-hidden border border-gray-200 shadow-lg"
            >
              {mapContainerVisible && (
                <ItineraryBuilderMap
                  stops={mapStops}
                  focusStopIndex={focusStopIndex}
                  containerVisible={true}
                  onRouteInfo={setRouteInfo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Other itinerary pages */}
      {otherItineraries.length > 0 && (
        <section className="border-t border-gray-200 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 py-10 lg:py-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Other itineraries
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherItineraries.map((other) => {
                const cardImage = other.listingImage || other.image;
                const totals = otherRouteTotals[other.slug];
                return (
                  <Link
                    key={other.slug}
                    href={`/top-activities-mauritius/${other.slug}`}
                    className="group flex gap-4 p-4 rounded-lg bg-white border border-gray-200 hover:border-orange-300 hover:shadow-md transition"
                  >
                    {cardImage && (
                      <div className="relative w-24 h-24 flex-shrink-0 rounded overflow-hidden bg-gray-100">
                        <img
                          src={getImageUrl(cardImage, { width: 400, quality: 75 })}
                          srcSet={getImageSrcSet(cardImage, {
                            widths: [200, 400, 800],
                            quality: 66,
                          })}
                          sizes="96px"
                          alt={other.title}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition">
                        {other.title}
                      </h3>
                      {other.subtitle && (
                        <p className="text-sm text-gray-600 mt-0.5 line-clamp-2">
                          {other.subtitle}
                        </p>
                      )}
                      <div className="mt-2 flex items-center gap-2 flex-wrap">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-50 border border-gray-200 text-xs font-medium text-orange-600">
                          {other.stops.length} stop{other.stops.length !== 1 ? "s" : ""}
                        </span>
                        {totals && totals.legs.length > 0 && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-50 border border-gray-200 text-xs font-medium text-orange-600">
                            {totals.totalDistanceKm} km
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox (same UI as PhotoGallery) */}
      {lightbox !== null && (() => {
        const stop = itinerary.stops[lightbox.stopIndex];
        const lightboxImages = getLightboxImages(stop);
        const lightboxUrls = lightboxImages
          .filter((src): src is string => typeof src === "string" && src.length > 0)
          .map((src) =>
            src.startsWith("http") ? src : getImageUrl(src, { width: 800, quality: 75 })
          );
        const { imageIndex } = lightbox;
        return (
          <div
            className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-50 min-w-[44px] min-h-[44px] flex items-center justify-center text-white/80 hover:text-white transition-colors"
              aria-label="Close"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {lightboxUrls.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightbox((prev) =>
                      prev
                        ? {
                            ...prev,
                            imageIndex:
                              (prev.imageIndex - 1 + lightboxUrls.length) %
                              lightboxUrls.length,
                          }
                        : null
                    );
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-50 min-w-[44px] min-h-[44px] flex items-center justify-center text-white/80 hover:text-white transition-colors"
                  aria-label="Previous image"
                >
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightbox((prev) =>
                      prev
                        ? {
                            ...prev,
                            imageIndex: (prev.imageIndex + 1) % lightboxUrls.length,
                          }
                        : null
                    );
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-50 min-w-[44px] min-h-[44px] flex items-center justify-center text-white/80 hover:text-white transition-colors"
                  aria-label="Next image"
                >
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
            <div
              className="relative w-full h-full max-w-5xl max-h-[85vh] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightboxUrls[imageIndex]}
                alt={`${stop.name} photo ${imageIndex + 1}`}
                className="absolute inset-0 w-full h-full object-contain"
              />
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm">
              {imageIndex + 1} / {lightboxUrls.length}
            </div>
          </div>
        );
      })()}

      <Footer />
    </main>
  );
}
