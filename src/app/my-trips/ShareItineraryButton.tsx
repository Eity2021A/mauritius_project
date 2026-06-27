"use client";

import { useState, useCallback } from "react";

interface Props {
  slug: string;
}

export default function ShareItineraryButton({ slug }: Props) {
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = useCallback(async () => {
    setLoading(true);
    const url = `${window.location.origin}/itineraries-mauritius/shared/${slug}`;

    if (navigator.share) {
      try {
        await navigator.share({ title: "My Mauritius Itinerary", url });
        setLoading(false);
        return;
      } catch {
        // Fall back to clipboard below
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
    setLoading(false);
  }, [slug]);

  return (
    <button
      onClick={handleShare}
      disabled={loading}
      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 bg-white text-gray-600 text-xs font-semibold hover:bg-gray-50 hover:border-gray-300 transition-colors disabled:opacity-50"
    >
      {loading ? (
        <>
          <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
          <span>Sharing...</span>
        </>
      ) : copied ? (
        <>
          <svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          Copied!
        </>
      ) : (
        <>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
          </svg>
          Share
        </>
      )}
    </button>
  );
}
