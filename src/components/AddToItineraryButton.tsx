"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { createPortal } from "react-dom";
import { useItineraryDraft } from "@/lib/itinerary-draft";
import ItineraryToast from "@/components/ItineraryToast";

interface AddToItineraryButtonProps {
  type: string;
  slug: string;
  name: string;
  lat: number;
  lng: number;
  image: string;
  bookingUrl?: string;
}

export default function AddToItineraryButton({
  type,
  slug,
  name,
  lat,
  lng,
  image,
  bookingUrl,
}: AddToItineraryButtonProps) {
  const { addStop, removeStop, hasStop, stopCount } = useItineraryDraft();
  const added = hasStop(slug, type);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [mounted, setMounted] = useState(false);
  const [bottomOffset, setBottomOffset] = useState(0);

  const handleClick = useCallback(() => {
    if (added) {
      removeStop(slug, type);
      setToastMessage(`Removed from your itinerary`);
    } else {
      addStop({ type, slug, name, lat, lng, image });
      setToastMessage(`Added to your itinerary`);
    }
    setToastVisible(true);
  }, [added, addStop, removeStop, type, slug, name, lat, lng, image]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const updateBottomOffset = () => {
      if (typeof window === "undefined" || !window.visualViewport) {
        setBottomOffset(0);
        return;
      }
      const vv = window.visualViewport;
      const offset = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
      setBottomOffset(offset);
    };

    updateBottomOffset();
    window.visualViewport?.addEventListener("resize", updateBottomOffset);
    window.visualViewport?.addEventListener("scroll", updateBottomOffset);
    window.addEventListener("resize", updateBottomOffset);

    return () => {
      window.visualViewport?.removeEventListener("resize", updateBottomOffset);
      window.visualViewport?.removeEventListener("scroll", updateBottomOffset);
      window.removeEventListener("resize", updateBottomOffset);
    };
  }, [mounted]);

  return (
    <>
      {/* Desktop: inline button */}
      <div className="hidden lg:block">
        <button
          onClick={handleClick}
          className={`w-full flex items-center justify-center gap-2 px-5 py-3 min-h-[48px] rounded-lg font-semibold transition-all ${
            added
              ? "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100"
              : "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg"
          }`}
        >
          {added ? (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Added to itinerary
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Add to my itinerary
            </>
          )}
        </button>
      </div>

      {mounted &&
        createPortal(
          <div
            className="lg:hidden fixed left-0 right-0 z-[2147483647] bg-white border-t border-gray-200 shadow-[0_-6px_18px_rgba(0,0,0,0.12)]"
            style={{
              bottom: `${bottomOffset}px`,
              paddingBottom: "env(safe-area-inset-bottom, 0px)",
            }}
          >
            <div className="flex items-center gap-3 px-4 pt-3 pb-3">
              {bookingUrl && (
                <Link
                  href={bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center px-4 py-3.5 rounded-lg bg-orange-500 text-sm font-semibold text-white shadow-md touch-manipulation whitespace-nowrap"
                >
                  Book Now
                </Link>
              )}
              <button
                onClick={handleClick}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                  added
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-blue-600 text-white shadow-md"
                }`}
              >
                {added ? (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Added
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add to itinerary
                  </>
                )}
              </button>
              {stopCount > 0 && (
                <Link
                  href="/itineraries-mauritius/create"
                  onClick={(e) => e.stopPropagation()}
                  className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold touch-manipulation"
                  aria-label="Open my itinerary"
                >
                  {stopCount}
                </Link>
              )}
            </div>
          </div>,
          document.body
        )}

      <ItineraryToast
        message={toastMessage}
        visible={toastVisible}
        onClose={() => setToastVisible(false)}
      />
    </>
  );
}
