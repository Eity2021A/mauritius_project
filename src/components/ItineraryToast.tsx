"use client";

import { useEffect } from "react";
import Link from "next/link";

interface ItineraryToastProps {
  message: string;
  visible: boolean;
  onClose: () => void;
}

export default function ItineraryToast({ message, visible, onClose }: ItineraryToastProps) {
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-6 left-1/2 -translate-x-1/2 z-[90] animate-slide-up">
      <div className="flex items-center gap-3 bg-gray-900 text-white pl-4 pr-3 py-3 rounded-xl shadow-2xl text-sm max-w-[90vw]">
        <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="truncate">{message}</span>
        <Link
          href="/itineraries-mauritius/create"
          className="flex-shrink-0 text-orange-400 hover:text-orange-300 font-medium whitespace-nowrap"
        >
          View itinerary
        </Link>
        <button
          onClick={onClose}
          className="flex-shrink-0 p-1 text-gray-400 hover:text-white"
          aria-label="Close"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
