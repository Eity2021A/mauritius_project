"use client";

import { useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { createClient } from "@/lib/supabase/client";
import { toggleUpvote, ensureFeaturedItinerary } from "@/lib/itinerary-actions";
import type { SaveItineraryInput } from "@/lib/itinerary-actions";
import AuthModal from "@/components/AuthModal";

interface Props {
  itineraryId?: string | null;
  slug?: string;
  title?: string;
  stopsForEnsure?: SaveItineraryInput["stops"];
  coverImage?: string;
  initialCount: number;
  compact?: boolean;
}

export default function UpvoteButton({
  itineraryId: initialId,
  slug,
  title,
  stopsForEnsure,
  coverImage,
  initialCount,
  compact = false,
}: Props) {
  const [count, setCount] = useState(initialCount);
  const [upvoted, setUpvoted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [dbId, setDbId] = useState<string | null>(initialId ?? null);
  const [showAuth, setShowAuth] = useState(false);
  const [pendingUpvote, setPendingUpvote] = useState(false);

  useEffect(() => {
    setCount(initialCount);
  }, [initialCount]);

  useEffect(() => {
    if (initialId) setDbId(initialId);
  }, [initialId]);

  useEffect(() => {
    if (!dbId) return;
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      supabase
        .from("itinerary_upvotes")
        .select("itinerary_id")
        .eq("itinerary_id", dbId)
        .eq("user_id", user.id)
        .maybeSingle()
        .then(({ data }) => {
          if (data) setUpvoted(true);
        });
    });
  }, [dbId]);

  useEffect(() => {
    const supabase = createClient();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user && pendingUpvote) {
        setShowAuth(false);
        setPendingUpvote(false);
        doToggle();
      }
    });
    return () => subscription.unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingUpvote]);

  const doToggle = useCallback(async () => {
    if (submitting) return;

    const wasUpvoted = upvoted;
    const prevCount = count;
    const nextUpvoted = !wasUpvoted;
    const nextCount = nextUpvoted ? prevCount + 1 : Math.max(prevCount - 1, 0);

    setUpvoted(nextUpvoted);
    setCount(nextCount);
    setSubmitting(true);

    let id = dbId;
    if (!id && slug && title) {
      id = await ensureFeaturedItinerary(slug, title, stopsForEnsure, coverImage);
      if (id) {
        setDbId(id);
      } else {
        setUpvoted(wasUpvoted);
        setCount(prevCount);
        setSubmitting(false);
        return;
      }
    }
    if (!id) {
      setUpvoted(wasUpvoted);
      setCount(prevCount);
      setSubmitting(false);
      return;
    }

    const result = await toggleUpvote(id);
    if (result.ok) {
      setUpvoted(result.upvoted);
      setCount(result.count);
    } else {
      setUpvoted(wasUpvoted);
      setCount(prevCount);
    }
    setSubmitting(false);
  }, [dbId, slug, title, stopsForEnsure, coverImage, submitting, upvoted, count]);

  const handleClick = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setPendingUpvote(true);
        setShowAuth(true);
        return;
      }
      doToggle();
    },
    [doToggle]
  );

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.stopPropagation();
  }, []);

  if (compact) {
    return (
      <>
        <button
          type="button"
          onClick={handleClick}
          onPointerDown={handlePointerDown}
          disabled={submitting}
          className={`flex flex-col items-center justify-center gap-1 w-14 h-16 rounded-xl border transition-all touch-manipulation select-none disabled:opacity-70 disabled:cursor-wait ${
            upvoted
              ? "bg-orange-50 border-orange-300 text-orange-600"
              : "bg-white border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700 active:bg-gray-50"
          }`}
          aria-label={upvoted ? "Remove upvote" : "Upvote"}
        >
          {submitting ? (
            <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
          ) : (
            <svg
              className={`w-5 h-5 transition-colors ${upvoted ? "text-orange-500" : ""}`}
              fill={upvoted ? "currentColor" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
          )}
          <span className="text-sm font-bold leading-none">{count}</span>
        </button>
        {typeof document !== "undefined" && createPortal(
          <AuthModal open={showAuth} onClose={() => { setShowAuth(false); setPendingUpvote(false); }} />,
          document.body
        )}
      </>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        onPointerDown={handlePointerDown}
        disabled={submitting}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all touch-manipulation disabled:opacity-70 disabled:cursor-wait ${
          upvoted
            ? "bg-orange-50 border-orange-300 text-orange-600"
            : "bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-800"
        }`}
        aria-label={upvoted ? "Remove upvote" : "Upvote"}
      >
        {submitting ? (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
        ) : (
          <svg
            className={`w-4 h-4 transition-colors ${upvoted ? "text-orange-500" : ""}`}
            fill={upvoted ? "currentColor" : "none"}
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
        )}
        <span>{count}</span>
      </button>
      {typeof document !== "undefined" && createPortal(
        <AuthModal open={showAuth} onClose={() => { setShowAuth(false); setPendingUpvote(false); }} />,
        document.body
      )}
    </>
  );
}
