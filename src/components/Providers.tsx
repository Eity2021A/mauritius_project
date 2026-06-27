"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { ItineraryDraftProvider } from "@/lib/itinerary-draft";
import type { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const shouldUseItineraryDraftProvider = useMemo(() => {
    if (!pathname) return false;

    return (
      pathname.startsWith("/itineraries-mauritius") ||
      pathname.startsWith("/my-trips") ||
      pathname.startsWith("/top-activities-mauritius") ||
      pathname.startsWith("/beaches-in-mauritius/") ||
      pathname.startsWith("/best-places-to-visit-in-mauritius/")
    );
  }, [pathname]);

  if (!shouldUseItineraryDraftProvider) {
    return <>{children}</>;
  }

  return <ItineraryDraftProvider>{children}</ItineraryDraftProvider>;
}
