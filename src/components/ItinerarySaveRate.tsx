"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthModal from "@/components/AuthModal";
import { createClient } from "@/lib/supabase/client";
import {
  savePreDesignedToMyTrips,
  type SaveItineraryInput,
} from "@/lib/itinerary-actions";
import type { PreDesignedItinerary } from "@/data/predesigned-itineraries";
import { formatDuration } from "@/lib/utils";
import UpvoteButton from "@/components/UpvoteButton";

interface Props {
  itinerary: PreDesignedItinerary;
  routeInfo?: { totalDistanceKm: number; totalDurationMin: number } | null;
}

function stopsToInput(itinerary: PreDesignedItinerary): SaveItineraryInput["stops"] {
  return itinerary.stops.map((s, i) => ({
    type: s.type,
    slug: s.slug,
    name: s.name,
    lat: s.position[0],
    lng: s.position[1],
    image: s.image,
    dayNumber: 1,
    stopOrder: i + 1,
  }));
}

export default function ItinerarySaveRate({ itinerary, routeInfo }: Props) {
  const router = useRouter();
  const [showAuth, setShowAuth] = useState(false);
  const [pendingAction, setPendingAction] = useState<"save" | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState("");

  const [featuredId, setFeaturedId] = useState<string | null>(null);
  const [upvoteCount, setUpvoteCount] = useState(0);

  const requireAuth = useCallback(
    async (action: "save"): Promise<boolean> => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) return true;
      setPendingAction(action);
      setShowAuth(true);
      return false;
    },
    []
  );

  useEffect(() => {
    let supabase: ReturnType<typeof createClient>;
    try {
      supabase = createClient();
    } catch {
      return;
    }
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user && pendingAction) {
        setShowAuth(false);
        if (pendingAction === "save") handleSave();
        setPendingAction(null);
      }
    });
    return () => subscription.unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingAction]);

  const handleSave = useCallback(async () => {
    const authed = await requireAuth("save");
    if (!authed) return;

    setSaving(true);
    setSaveError("");
    const stops = stopsToInput(itinerary);
    const result = await savePreDesignedToMyTrips(
      itinerary.slug,
      itinerary.title,
      stops,
      stops[0]?.image || undefined
    );
    setSaving(false);

    if (result.ok) {
      setSaved(true);
    } else {
      setSaveError(result.error ?? "Failed to save");
    }
  }, [itinerary, requireAuth]);

  const handleEdit = useCallback(() => {
    const stops = itinerary.stops.map((s, i) => ({
      id: `${s.type}-${s.slug}`,
      type: s.type,
      slug: s.slug,
      name: s.name,
      lat: s.position[0],
      lng: s.position[1],
      image: s.image,
      dayNumber: 1,
      stopOrder: i + 1,
    }));
    try {
      localStorage.setItem(
        "me-itinerary-preset",
        JSON.stringify({ slug: itinerary.slug, title: itinerary.title, stops, coverImage: itinerary.listingImage ?? itinerary.image })
      );
    } catch {}
    router.push(`/itineraries-mauritius/create?preset=${itinerary.slug}`);
  }, [itinerary, router]);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("user_itineraries")
      .select("id, upvote_count")
      .eq("slug", itinerary.slug)
      .eq("is_featured", true)
      .maybeSingle()
      .then(({ data }) => {
        if (data) {
          setFeaturedId(data.id);
          setUpvoteCount(data.upvote_count ?? 0);
        }
      });
  }, [itinerary.slug]);

  return (
    <>
      <div className="border-b border-gray-200 bg-gray-50 md:sticky md:top-16 md:z-40">
        <div className="max-w-7xl mx-auto px-4 py-3">
          {/* Mobile/tablet (<768px): stacked layout with compact labels. Desktop (>=768px): inline toolbar. */}
          <div className="flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-3">
            {/* Row 1: Back + primary actions */}
            <div className="flex items-center gap-2 md:gap-3 md:flex-initial">
              <Link
                href="/itineraries-mauritius"
                className="flex shrink-0 items-center justify-center md:justify-start gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                Back
              </Link>
              <div className="grid flex-1 min-w-0 grid-cols-2 gap-2 md:flex md:flex-1 md:min-w-0 md:gap-3">
                <button
                  onClick={handleSave}
                  disabled={saving || saved}
                  className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors md:flex-initial ${
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
                      <span className="md:hidden">Save</span>
                      <span className="hidden md:inline">Save itinerary</span>
                    </>
                  )}
                </button>
                <button
                  onClick={handleEdit}
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-blue-500 text-white border border-blue-500 hover:bg-blue-600 hover:border-blue-600 md:flex-initial"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                  <span className="md:hidden">Edit</span>
                  <span className="hidden md:inline">Edit this itinerary</span>
                </button>
                <Link
                  href="/rental"
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-yellow-400 text-yellow-950 border border-yellow-400 hover:bg-yellow-500 hover:border-yellow-500 md:flex-initial"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 14.25h16.5M6.75 18.75a1.5 1.5 0 113 0m7.5 0a1.5 1.5 0 113 0m-15-4.5V9.75A2.25 2.25 0 018.25 7.5h6.69a2.25 2.25 0 011.59.66l2.81 2.81a2.25 2.25 0 01.66 1.59v1.69M3 14.25h1.5m15.75 0H21" />
                  </svg>
                  <span className="md:hidden">Rental</span>
                  <span className="hidden md:inline">Add car rental</span>
                </Link>
                <Link
                  href="/taxi"
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-green-500 text-white border border-green-500 hover:bg-green-600 hover:border-green-600 md:flex-initial"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 16.5h7.5M9 6.75h6l1.5 3.75H7.5L9 6.75zm-1.5 3.75h9a2.25 2.25 0 012.25 2.25v2.25a1.5 1.5 0 01-1.5 1.5h-.75a1.5 1.5 0 01-3 0h-3a1.5 1.5 0 01-3 0h-.75a1.5 1.5 0 01-1.5-1.5v-2.25A2.25 2.25 0 017.5 10.5zm1.125 2.625h.008v.008h-.008v-.008zm6.75 0h.008v.008h-.008v-.008z" />
                  </svg>
                  <span className="md:hidden">Taxi</span>
                  <span className="hidden md:inline">Add taxi</span>
                </Link>
              </div>
            </div>

            {/* Row 2: badges (left) + Upvote (right) */}
            <div className="flex w-full items-center justify-between gap-2 md:w-auto md:flex-initial md:gap-3">
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
              <UpvoteButton
                itineraryId={featuredId}
                slug={itinerary.slug}
                title={itinerary.title}
                stopsForEnsure={stopsToInput(itinerary)}
              coverImage={itinerary.listingImage ?? itinerary.image}
                initialCount={upvoteCount}
              />
            </div>
            {saveError && <span className="text-xs text-red-500">{saveError}</span>}
          </div>
        </div>
      </div>

      <AuthModal
        open={showAuth}
        onClose={() => {
          setShowAuth(false);
          setPendingAction(null);
        }}
      />
    </>
  );
}
