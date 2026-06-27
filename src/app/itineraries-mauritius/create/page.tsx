"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthModal from "@/components/AuthModal";
import ItineraryBuilderMap from "@/components/ItineraryBuilderMap";
import type { StopForMap, RouteInfo } from "@/components/ItineraryBuilderMap";
import { useItineraryDraft, type DraftStop } from "@/lib/itinerary-draft";
import TripCountdown from "@/components/TripCountdown";
import { saveItinerary, updateItinerary, getItineraryById } from "@/lib/itinerary-actions";
import { getItineraryPool, type PoolItem } from "@/lib/pool-actions";
import { createClient } from "@/lib/supabase/client";
import { getImageUrl } from "@/lib/image-url";
import { formatDuration } from "@/lib/utils";
import { BEACH_DETAILS } from "@/data/beaches";
import { ACTIVITY_DETAILS } from "@/data/activities";
import { PLACE_DETAILS } from "@/data/place-details";

const EXPECTED_POOL_COUNTS = {
  beaches: Object.keys(BEACH_DETAILS).length,
  activities: Object.keys(ACTIVITY_DETAILS).length,
  places: Object.keys(PLACE_DETAILS).length,
} as const;

function draftStopToMapStop(stop: DraftStop): StopForMap {
  const typeMap: Record<string, StopForMap["type"]> = {
    beach: "beach",
    activity: "activity",
    nature: "nature",
    place: "place",
  };
  return {
    type: typeMap[stop.type] ?? "nature",
    name: stop.name,
    position: [stop.lat, stop.lng],
  };
}

type Tab = "stops" | "add";

export default function CreateItineraryPage() {
  const { draft, addStop, removeStop, moveStop, hasStop, updateTitle, updateDates, loadDraft, clearDraft, stopCount } = useItineraryDraft();
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleInput, setTitleInput] = useState("");
  const [poolSearch, setPoolSearch] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>(stopCount > 0 ? "stops" : "add");
  const [showMap, setShowMap] = useState(false);
  const [filterType, setFilterType] = useState<string>("all");
  const [routeInfo, setRouteInfo] = useState<RouteInfo | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [pool, setPool] = useState<PoolItem[]>([]);
  const [poolLoading, setPoolLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingCoverImage, setEditingCoverImage] = useState<string | null>(null);
  const [loadingFromDb, setLoadingFromDb] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    getItineraryPool().then((items) => {
      setPool(items);
      setPoolLoading(false);
    });
  }, []);

  useEffect(() => {
    const loadId = searchParams.get("load");
    const presetSlug = searchParams.get("preset");

    if (presetSlug) {
      try {
        const raw = localStorage.getItem("me-itinerary-preset");
        if (raw) {
          const preset = JSON.parse(raw);
          if (preset.slug === presetSlug) {
            loadDraft({ title: preset.title, stops: preset.stops });
            if (preset.coverImage) setEditingCoverImage(preset.coverImage);
            setActiveTab("stops");
            localStorage.removeItem("me-itinerary-preset");
          }
        }
      } catch {}
      return;
    }

    if (!loadId) return;

    setLoadingFromDb(true);
    getItineraryById(loadId).then((itinerary) => {
      if (itinerary) {
        const stops: DraftStop[] = itinerary.stops.map((s) => ({
          id: `${s.item_type}-${s.item_slug}`,
          type: s.item_type,
          slug: s.item_slug,
          name: s.name,
          lat: s.latitude,
          lng: s.longitude,
          image: s.image,
          dayNumber: s.day_number,
          stopOrder: s.stop_order,
        }));
        loadDraft({
          title: itinerary.title,
          stops,
          tripStart: itinerary.trip_start ?? undefined,
          tripEnd: undefined,
        });
        setEditingId(loadId);
        setEditingCoverImage(itinerary.cover_image ?? null);
        setActiveTab("stops");
      }
      setLoadingFromDb(false);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleRouteInfo = useCallback((info: RouteInfo | null) => {
    setRouteInfo(info);
  }, []);

  const handleSave = useCallback(async () => {
    if (stopCount === 0) return;
    setSaveError("");

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setShowAuthModal(true);
      return;
    }

    setSaving(true);
    const input = {
      title: draft.title,
      stops: draft.stops.map((s) => ({
        type: s.type,
        slug: s.slug,
        name: s.name,
        lat: s.lat,
        lng: s.lng,
        image: s.image,
        dayNumber: s.dayNumber,
        stopOrder: s.stopOrder,
      })),
      tripStart: draft.tripStart,
      tripEnd: undefined,
      startName: draft.startName,
      startLat: draft.startLat,
      startLng: draft.startLng,
      ...(editingCoverImage !== null ? { coverImage: editingCoverImage } : {}),
    };

    const result = editingId
      ? await updateItinerary(editingId, input)
      : await saveItinerary(input);

    setSaving(false);

    if (result.ok) {
      clearDraft();
      router.push("/my-trips");
    } else {
      setSaveError(result.error ?? "Failed to save");
    }
  }, [stopCount, draft, editingId, clearDraft, router]);

  const mapStops: StopForMap[] = useMemo(
    () => draft.stops.map(draftStopToMapStop),
    [draft.stops]
  );

  const filteredPool = useMemo(() => {
    let items = pool;
    if (filterType !== "all") {
      items = items.filter((item) => item.type === filterType);
    }
    if (poolSearch.trim()) {
      const q = poolSearch.trim().toLowerCase();
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.slug.toLowerCase().includes(q)
      );
    }
    return items;
  }, [pool, poolSearch, filterType]);

  const addFromPool = useCallback(
    (item: PoolItem) => {
      addStop({
        type: item.type,
        slug: item.slug,
        name: item.name,
        lat: item.lat,
        lng: item.lng,
        image: item.image,
      });
    },
    [addStop]
  );

  const handleExportPdf = () => window.print();

  const typeFilters = [
    { key: "all", label: "All" },
    { key: "beach", label: "Beaches" },
    { key: "activity", label: "Activities" },
    { key: "place", label: "Places" },
  ];
  const backHref = editingId ? "/my-trips" : "/itineraries-mauritius";
  const backLabel = editingId ? "Back to all My Itineraries" : "Back to all Itineraries";

  return (
    <main id="main-content" className="min-h-screen bg-gray-50">
      <div className="print:hidden">
        <Navbar />
      </div>

      {/* Hero */}
      <section className="relative h-[36svh] sm:h-[32svh] print:hidden min-h-[220px]">
        <Image
          src={getImageUrl("/images/banners/horse-riding-le-morne-beach-mauritius.jpg")}
          alt="Create your Mauritius itinerary"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center px-4 max-w-4xl mx-auto translate-y-[2rem]">
          <Link
            href={backHref}
            className="inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full transition-colors mb-3"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {backLabel}
          </Link>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            {editingId ? "Edit your itinerary" : "Create your itinerary"}
          </h1>
          <p className="text-white/80 text-xs sm:text-sm md:text-base mt-2 max-w-2xl mx-auto">
            {editingId
              ? "Update your stops, reorder, and save your changes"
              : "Add beaches, activities, and places — then see your route on the map"}
          </p>
          </div>
        </div>
      </section>

      {loadingFromDb && (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <svg className="w-8 h-8 animate-spin text-orange-500 mx-auto mb-3" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <p className="text-sm text-gray-500">Loading your itinerary…</p>
          </div>
        </div>
      )}

      {!loadingFromDb && <>
      {/* Mobile tabs */}
      <div className="lg:hidden print:hidden sticky top-[calc(env(safe-area-inset-top)+4rem)] z-30 bg-white border-b border-gray-200">
        <div className="flex">
          <button
            onClick={() => setActiveTab("stops")}
            className={`flex-1 py-3 text-sm font-medium text-center transition-colors ${
              activeTab === "stops"
                ? "text-orange-600 border-b-2 border-orange-500"
                : "text-gray-500"
            }`}
          >
            My stops{stopCount > 0 && ` (${stopCount})`}
          </button>
          <button
            onClick={() => setActiveTab("add")}
            className={`flex-1 py-3 text-sm font-medium text-center transition-colors ${
              activeTab === "add"
                ? "text-orange-600 border-b-2 border-orange-500"
                : "text-gray-500"
            }`}
          >
            Browse & add
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4 lg:py-8 print:p-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-start">
          {/* Left: Stops list */}
          <div
            className={`lg:col-span-4 print:hidden ${
              activeTab !== "stops" ? "hidden lg:block" : ""
            }`}
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                {editingTitle ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const trimmed = titleInput.trim();
                      if (trimmed) updateTitle(trimmed);
                      setEditingTitle(false);
                    }}
                    className="flex items-center gap-2"
                  >
                    <input
                      autoFocus
                      type="text"
                      value={titleInput}
                      onChange={(e) => setTitleInput(e.target.value)}
                      onBlur={() => {
                        const trimmed = titleInput.trim();
                        if (trimmed) updateTitle(trimmed);
                        setEditingTitle(false);
                      }}
                      className="flex-1 text-base font-semibold text-gray-900 bg-transparent border-b-2 border-orange-400 outline-none px-0 py-0.5"
                      maxLength={60}
                    />
                  </form>
                ) : (
                  <div className="flex items-center justify-between gap-2">
                    <button
                      onClick={() => {
                        setTitleInput(draft.title);
                        setEditingTitle(true);
                      }}
                      className="group flex items-center gap-2 text-left min-w-0"
                    >
                      <h2 className="text-base font-semibold text-gray-900 truncate">
                        {draft.title}
                      </h2>
                      <span className="inline-flex items-center rounded-full border border-gray-200 px-2.5 py-1 text-[11px] font-semibold text-gray-600 group-hover:border-orange-200 group-hover:text-orange-600 transition-colors">
                        Edit Title
                      </span>
                    </button>
                    {stopCount > 0 && (
                      <span className="text-xs text-gray-500 flex-shrink-0">
                        {stopCount} stop{stopCount !== 1 && "s"}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Trip dates & countdown */}
              <div className="px-4 py-3 border-b border-gray-100">
                <button
                  onClick={() => {
                    const el = document.getElementById("trip-date-fields");
                    if (el) el.classList.toggle("hidden");
                  }}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 w-full"
                >
                  <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                  <span className="font-medium">
                    {draft.tripStart ? `Trip: ${new Date(draft.tripStart + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}` : "Set Trip Date (optional)"}
                  </span>
                  <svg className="w-3.5 h-3.5 ml-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                <div id="trip-date-fields" className={draft.tripStart ? "" : "hidden"}>
                  <div className="mt-3">
                    <div>
                      <label className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">Date</label>
                      <input
                        type="date"
                        value={draft.tripStart ?? ""}
                        min={new Date().toISOString().split("T")[0]}
                        onChange={(e) => updateDates(e.target.value || undefined, undefined)}
                        className="w-full mt-1 px-2.5 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  {draft.tripStart && (
                    <button
                      onClick={() => updateDates(undefined, undefined)}
                      className="text-[11px] text-gray-400 hover:text-red-500 mt-2"
                    >
                      Clear dates
                    </button>
                  )}
                </div>
                {draft.tripStart && new Date(draft.tripStart + "T00:00:00") > new Date() && (
                  <div className="mt-3">
                    <TripCountdown tripStart={draft.tripStart} />
                  </div>
                )}
              </div>

              {stopCount === 0 ? (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">No stops yet</p>
                  <p className="text-xs text-gray-400">
                    Browse and add beaches, activities or places
                  </p>
                  <button
                    onClick={() => setActiveTab("add")}
                    className="lg:hidden mt-4 px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-lg"
                  >
                    Browse & add
                  </button>
                </div>
              ) : (
                <div>
                  {draft.stops.map((stop, index) => (
                    <div key={stop.id}>
                      <div className="flex items-center gap-3 p-3 sm:p-4 hover:bg-gray-50 transition-colors min-h-[64px]">
                        <span className="flex-shrink-0 w-7 h-7 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold">
                          {index + 1}
                        </span>
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                          <img
                            src={getImageUrl(stop.image, { width: 80, quality: 75 })}
                            alt={stop.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {stop.name}
                          </p>
                          <p className="text-xs text-gray-400 capitalize">{stop.type}</p>
                        </div>
                        <div className="flex-shrink-0 flex items-center gap-1">
                          <button
                            onClick={() => moveStop(index, "up")}
                            disabled={index === 0}
                            className="w-11 h-11 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:text-gray-800 hover:border-gray-300 hover:bg-gray-50 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                            aria-label="Move up"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                            </svg>
                          </button>
                          <button
                            onClick={() => moveStop(index, "down")}
                            disabled={index === draft.stops.length - 1}
                            className="w-11 h-11 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:text-gray-800 hover:border-gray-300 hover:bg-gray-50 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                            aria-label="Move down"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                          </button>
                          <button
                            onClick={() => removeStop(stop.slug, stop.type)}
                            className="w-11 h-11 flex items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-400 hover:text-red-600 hover:bg-red-100 hover:border-red-300 transition-colors"
                            aria-label="Remove"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      {/* Driving info between this stop and next */}
                      {routeInfo?.legs[index] && index < draft.stops.length - 1 && (
                        <div className="flex items-center gap-2 pl-4 py-1.5 pr-3">
                          <div className="w-7 flex justify-center flex-shrink-0">
                            <div className="w-px h-3 bg-gray-200" />
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-50 border border-gray-200 text-xs font-semibold text-orange-600">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                              </svg>
                              {routeInfo.legs[index].distanceKm} km
                            </span>
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-50 border border-gray-200 text-xs font-semibold text-orange-600">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {formatDuration(routeInfo.legs[index].durationMin)}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Route total */}
                  {routeInfo && routeInfo.legs.length > 0 && (
                    <div className="mx-3 mt-2 mb-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Total driving</span>
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-50 border border-gray-200 text-xs font-semibold text-orange-600">
                            {routeInfo.totalDistanceKm} km
                          </span>
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-50 border border-gray-200 text-xs font-semibold text-orange-600">
                            {formatDuration(routeInfo.totalDurationMin)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {stopCount > 0 && (
                <div className="p-4 border-t border-gray-100 space-y-2">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-orange-500 text-white text-sm font-semibold rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-60"
                  >
                    {saving ? (
                      <>
                        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                        </svg>
                        {editingId ? "Update itinerary" : "Save to my account"}
                      </>
                    )}
                  </button>
                  {saveError && (
                    <p className="text-xs text-red-500 text-center">{saveError}</p>
                  )}
                  <button
                    onClick={() => setShowMap(true)}
                    className="lg:hidden w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                    </svg>
                    View on map
                  </button>
                  <button
                    onClick={handleExportPdf}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    Export PDF
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Middle: Browse pool */}
          <div
            className={`lg:col-span-4 print:hidden ${
              activeTab !== "add" ? "hidden lg:block" : ""
            }`}
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <input
                  type="search"
                  placeholder="Search places, beaches, activities..."
                  value={poolSearch}
                  onChange={(e) => setPoolSearch(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <div className="flex gap-1.5 mt-3 flex-wrap">
                  {typeFilters.map((f) => (
                    <button
                      key={f.key}
                      onClick={() => setFilterType(f.key)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        filterType === f.key
                          ? "bg-orange-500 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="max-h-[60vh] lg:max-h-[600px] overflow-y-auto divide-y divide-gray-50">
                {poolLoading ? (
                  <div className="p-12 flex flex-col items-center justify-center text-center">
                    <svg
                      className="w-8 h-8 animate-spin text-orange-500 mb-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    <p className="text-sm font-medium text-gray-700">
                      Loading {EXPECTED_POOL_COUNTS.beaches} beaches,{" "}
                      {EXPECTED_POOL_COUNTS.activities} activities, and{" "}
                      {EXPECTED_POOL_COUNTS.places} places…
                    </p>
                    <p className="text-xs text-gray-400 mt-1">Just a moment</p>
                  </div>
                ) : filteredPool.length === 0 ? (
                  <div className="p-8 text-center text-sm text-gray-400">
                    No results found
                  </div>
                ) : (
                  filteredPool.map((item) => {
                    const isAdded = hasStop(item.slug, item.type);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() =>
                          isAdded ? removeStop(item.slug, item.type) : addFromPool(item)
                        }
                        className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                          <img
                            src={getImageUrl(item.image, { width: 80, quality: 75 })}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-400 capitalize">{item.type}</p>
                        </div>
                        {isAdded ? (
                          <span className="flex-shrink-0 flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 border border-green-200 px-3 py-2 rounded-lg min-h-[36px]">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                            Added
                          </span>
                        ) : (
                          <span className="flex-shrink-0 flex items-center justify-center text-xs font-medium text-orange-500 bg-orange-50 border border-orange-200 px-3 py-2 rounded-lg min-h-[36px] hover:bg-orange-100 transition-colors">
                            + Add
                          </span>
                        )}
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* Right: Map (desktop always visible, mobile as overlay) */}
          <div className="hidden lg:block lg:col-span-4 print:col-span-12">
            <div className="sticky top-24">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="h-[716px]">
                  <ItineraryBuilderMap stops={mapStops} onRouteInfo={handleRouteInfo} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile map overlay */}
      {showMap && (
        <div className="lg:hidden fixed inset-0 z-[80] bg-white flex flex-col print:hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <h3 className="text-base font-semibold text-gray-900">Your route</h3>
            <button
              onClick={() => setShowMap(false)}
              className="p-2 text-gray-500 hover:text-gray-700"
              aria-label="Close map"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1">
            <ItineraryBuilderMap stops={mapStops} onRouteInfo={handleRouteInfo} />
          </div>
        </div>
      )}
      </>}

      {/* Print layout */}
      <div className="hidden print:block p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {draft.title || "My Mauritius Itinerary"}
        </h1>
        {stopCount > 0 && (
          <ol className="list-decimal list-inside space-y-1">
            {draft.stops.map((stop, i) => (
              <li key={stop.id}>
                <span>{stop.name}</span>
                <span className="text-gray-400 text-sm ml-2">({stop.type})</span>
                {routeInfo?.legs[i] && i < draft.stops.length - 1 && (
                  <span className="text-gray-400 text-xs ml-2">
                    → {routeInfo.legs[i].distanceKm} km, {formatDuration(routeInfo.legs[i].durationMin)}
                  </span>
                )}
              </li>
            ))}
          </ol>
        )}
        {routeInfo && (
          <p className="mt-4 text-sm font-medium text-gray-700">
            Total driving: {routeInfo.totalDistanceKm} km · {formatDuration(routeInfo.totalDurationMin)}
          </p>
        )}
      </div>

      <div className="print:hidden">
        <Footer />
      </div>

      <AuthModal
        open={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </main>
  );
}
