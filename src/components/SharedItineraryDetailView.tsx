"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import MapSkeleton from "@/components/ui/MapSkeleton";
import { getImageUrl, getImageSrcSet } from "@/lib/image-url";
import type { StopForMap, RouteInfo } from "@/components/ItineraryBuilderMap";
import UpvoteButton from "@/components/UpvoteButton";
import ViewTracker from "@/components/ViewTracker";
import AuthModal from "@/components/AuthModal";
import { createClient } from "@/lib/supabase/client";
import { saveItinerary } from "@/lib/itinerary-actions";
import { formatDuration } from "@/lib/utils";

const ItineraryBuilderMap = dynamic(() => import("@/components/ItineraryBuilderMap"), {
  ssr: false,
  loading: () => <MapSkeleton />,
});

interface SharedStop {
  id: string;
  day_number: number;
  stop_order: number;
  item_type: string;
  item_slug: string;
  name: string;
  latitude: number;
  longitude: number;
  image: string;
  notes: string | null;
}

interface SharedItinerary {
  id: string;
  title: string;
  slug: string;
  stop_count: number;
  cover_image: string | null;
  upvote_count: number;
  author_name: string;
  stops: SharedStop[];
}

function stopLink(stop: SharedStop): string {
  const type = stop.item_type;
  if (type === "beach") return `/beaches-in-mauritius/${stop.item_slug}`;
  if (type === "activity") return `/top-activities-mauritius/${stop.item_slug}`;
  return `/best-places-to-visit-in-mauritius/${stop.item_slug}`;
}

export default function SharedItineraryDetailView({
  itinerary,
}: {
  itinerary: SharedItinerary;
}) {
  const router = useRouter();
  const [focusStopIndex, setFocusStopIndex] = useState<number | null>(null);
  const [mobileView, setMobileView] = useState<"list" | "map">("list");
  const [isLg, setIsLg] = useState(false);
  const [routeInfo, setRouteInfo] = useState<RouteInfo | null>(null);

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [showAuth, setShowAuth] = useState(false);
  const [pendingAction, setPendingAction] = useState<"save" | null>(null);

  const stopsForSave = useMemo(
    () =>
      itinerary.stops.map((s, i) => ({
        type: s.item_type as "beach" | "activity" | "place" | "nature",
        slug: s.item_slug,
        name: s.name,
        lat: s.latitude,
        lng: s.longitude,
        image: s.image,
        dayNumber: s.day_number,
        stopOrder: i + 1,
      })),
    [itinerary.stops]
  );

  const requireAuth = useCallback(async (): Promise<boolean> => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) return true;
    setPendingAction("save");
    setShowAuth(true);
    return false;
  }, []);

  useEffect(() => {
    const supabase = createClient();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user && pendingAction === "save") {
        setShowAuth(false);
        setPendingAction(null);
        handleSave();
      }
    });
    return () => subscription.unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingAction]);

  const handleSave = useCallback(async () => {
    const authed = await requireAuth();
    if (!authed) return;
    setSaving(true);
    setSaveError("");
    const result = await saveItinerary({
      title: itinerary.title,
      stops: stopsForSave,
    });
    setSaving(false);
    if (result.ok) {
      setSaved(true);
    } else {
      setSaveError(result.error ?? "Failed to save");
    }
  }, [itinerary.title, stopsForSave, requireAuth]);

  const handleEdit = useCallback(() => {
    const stops = itinerary.stops.map((s, i) => ({
      id: `${s.item_type}-${s.item_slug}`,
      type: s.item_type,
      slug: s.item_slug,
      name: s.name,
      lat: s.latitude,
      lng: s.longitude,
      image: s.image,
      dayNumber: s.day_number,
      stopOrder: i + 1,
    }));
    try {
      localStorage.setItem(
        "me-itinerary-preset",
        JSON.stringify({ slug: itinerary.slug, title: itinerary.title, stops, coverImage: itinerary.cover_image ?? undefined })
      );
    } catch {}
    router.push(`/itineraries-mauritius/create?preset=${itinerary.slug}`);
  }, [itinerary, router]);

  const mapStops: StopForMap[] = useMemo(
    () =>
      itinerary.stops.map((s) => ({
        type: s.item_type === "beach" ? "beach" : s.item_type === "activity" ? "activity" : "nature",
        name: s.name,
        position: [s.latitude, s.longitude] as [number, number],
        link: stopLink(s),
      })),
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

  const showMap = (stopIndex: number) => {
    setFocusStopIndex(stopIndex);
    setMobileView("map");
  };

  const coverImg = itinerary.cover_image || itinerary.stops[0]?.image;

  return (
    <>
      <ViewTracker slug={itinerary.slug} />
      {/* Hero */}
      <section className="relative h-[36svh] min-h-[220px] md:h-[30vh] md:min-h-[220px] flex items-end">
        {coverImg ? (
          <img
            src={getImageUrl(coverImg, { width: 1200, quality: 75 })}
            srcSet={getImageSrcSet(coverImg, { widths: [800, 1200, 1600], quality: 72 })}
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
            <p className="text-white/80 text-sm md:text-base">
              {itinerary.stop_count} stops · by {itinerary.author_name}
            </p>
          </div>
        </div>
      </section>

      {/* Save/Edit/Upvote bar */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          {/* Mobile: Row1 = Back|Save|Edit only. Row2 = badges + Upvote. Desktop: Back|Save|Edit, badges|Upvote */}
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-3">
            {/* Row 1: Back | Save | Edit only */}
            <div className="flex items-center gap-2 sm:gap-3 sm:flex-initial">
              <Link
                href="/itineraries-mauritius"
                className="flex shrink-0 items-center justify-center sm:justify-start gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                Back
              </Link>
              <div className="flex flex-1 min-w-0 gap-2 sm:gap-3">
                <button
                  onClick={handleSave}
                  disabled={saving || saved}
                  className={`flex flex-1 sm:flex-initial items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    saved
                      ? "bg-green-500 text-white border border-green-500"
                      : "bg-orange-500 text-white border border-orange-500 hover:bg-orange-600 hover:border-orange-600"
                  } disabled:opacity-60`}
                >
                  {saved ? (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      Saved
                    </>
                  ) : saving ? (
                    "Saving..."
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                      </svg>
                      <span className="sm:hidden">Save</span>
                      <span className="hidden sm:inline">Save itinerary</span>
                    </>
                  )}
                </button>
                <button
                  onClick={handleEdit}
                  className="flex flex-1 sm:flex-initial items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-blue-500 text-white border border-blue-500 hover:bg-blue-600 hover:border-blue-600"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                  <span className="sm:hidden">Edit</span>
                  <span className="hidden sm:inline">Edit this itinerary</span>
                </button>
              </div>
            </div>

            {/* Row 2: badges (left) + Upvote (right) */}
            <div className="flex w-full sm:w-auto items-center justify-between gap-2 sm:flex-initial sm:gap-3">
              <div className="flex flex-wrap items-center gap-2">
                {routeInfo && (
                  <>
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-sm font-semibold text-orange-600">
                      {itinerary.stops.length} stop{itinerary.stops.length !== 1 ? "s" : ""}
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-sm font-semibold text-orange-600">
                      {routeInfo.totalDistanceKm} km
                    </span>
                  </>
                )}
              </div>
              <UpvoteButton itineraryId={itinerary.id} initialCount={itinerary.upvote_count} />
            </div>
            {saveError && <span className="text-xs text-red-500">{saveError}</span>}
          </div>
        </div>
      </div>

      <AuthModal
        open={showAuth}
        onClose={() => { setShowAuth(false); setPendingAction(null); }}
      />

      {/* Two columns: stops + map */}
      <div className="max-w-7xl mx-auto px-4 py-6 lg:py-8">
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
          {/* Stops list */}
          <div className={`lg:order-1 lg:pr-2 ${mobileView === "list" ? "block" : "hidden lg:block"}`}>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Stops on this itinerary
            </h2>
            <div className="space-y-3 lg:max-h-[calc(100vh-12rem)] lg:overflow-y-auto lg:pr-2">
              <ul className="space-y-2">
                {itinerary.stops.map((stop, i) => (
                  <li
                    key={stop.id}
                    id={`stop-${i}`}
                    className="border border-gray-100 rounded-xl p-3 hover:border-gray-200 transition-colors"
                  >
                    <article className="flex gap-3 items-start">
                      <div className="relative flex-shrink-0 w-20 h-20 lg:w-24 lg:h-24 rounded-lg overflow-hidden bg-gray-100">
                        <img
                          src={getImageUrl(stop.image, { width: 400, quality: 75 })}
                          srcSet={getImageSrcSet(stop.image, { widths: [200, 400], quality: 68 })}
                          sizes="96px"
                          alt={stop.name}
                          className="absolute inset-0 w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-gray-900 leading-snug">
                          {i + 1}. {stop.name}
                        </h3>
                        <p className="text-xs text-gray-400 capitalize mt-0.5">{stop.item_type}</p>
                        <div className="flex flex-wrap items-center gap-1.5 mt-2">
                          <Link
                            href={stopLink(stop)}
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
                ))}
              </ul>
            </div>
          </div>

          {/* Map */}
          <div
            ref={mapSectionRef}
            className={`lg:order-2 lg:sticky lg:top-24 lg:self-start ${mobileView === "map" ? "block" : "hidden lg:block"} scroll-mt-20`}
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Map for this itinerary
            </h2>
            <div className="h-[420px] sm:h-[480px] lg:h-[calc(100vh-8rem)] lg:min-h-[400px] rounded-lg overflow-hidden border border-gray-200 shadow-lg">
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
    </>
  );
}
