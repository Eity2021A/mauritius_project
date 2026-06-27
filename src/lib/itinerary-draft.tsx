"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";

export interface DraftStop {
  id: string;
  type: string;
  slug: string;
  name: string;
  lat: number;
  lng: number;
  image: string;
  dayNumber: number;
  stopOrder: number;
}

export interface ItineraryDraft {
  title: string;
  stops: DraftStop[];
  tripStart?: string;
  tripEnd?: string;
  startName?: string;
  startLat?: number;
  startLng?: number;
}

const STORAGE_KEY = "me-itinerary-draft";

function loadDraft(): ItineraryDraft {
  if (typeof window === "undefined") return { title: "My Mauritius Trip", stops: [] };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { title: "My Mauritius Trip", stops: [] };
}

function saveDraft(draft: ItineraryDraft) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  } catch {}
}

interface DraftContextValue {
  draft: ItineraryDraft;
  addStop: (stop: Omit<DraftStop, "id" | "dayNumber" | "stopOrder">) => void;
  removeStop: (slug: string, type?: string) => void;
  moveStop: (index: number, direction: "up" | "down") => void;
  hasStop: (slug: string, type?: string) => boolean;
  updateTitle: (title: string) => void;
  updateDates: (tripStart?: string, tripEnd?: string) => void;
  loadDraft: (draft: ItineraryDraft) => void;
  clearDraft: () => void;
  stopCount: number;
}

const DraftContext = createContext<DraftContextValue | null>(null);

export function ItineraryDraftProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState<ItineraryDraft>({ title: "My Mauritius Trip", stops: [] });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setDraft(loadDraft());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) saveDraft(draft);
  }, [draft, loaded]);

  const addStop = useCallback(
    (stop: Omit<DraftStop, "id" | "dayNumber" | "stopOrder">) => {
      setDraft((prev) => {
        if (prev.stops.some((s) => s.slug === stop.slug && s.type === stop.type)) return prev;
        const newStop: DraftStop = {
          ...stop,
          id: `${stop.type}-${stop.slug}`,
          dayNumber: 1,
          stopOrder: prev.stops.length + 1,
        };
        return { ...prev, stops: [...prev.stops, newStop] };
      });
    },
    []
  );

  const removeStop = useCallback((slug: string, type?: string) => {
    setDraft((prev) => ({
      ...prev,
      stops: prev.stops
        .filter((s) => {
          if (type) return !(s.slug === slug && s.type === type);
          return s.slug !== slug;
        })
        .map((s, i) => ({ ...s, stopOrder: i + 1 })),
    }));
  }, []);

  const moveStop = useCallback(
    (index: number, direction: "up" | "down") => {
      setDraft((prev) => {
        const target = direction === "up" ? index - 1 : index + 1;
        if (target < 0 || target >= prev.stops.length) return prev;
        const next = [...prev.stops];
        [next[index], next[target]] = [next[target], next[index]];
        return {
          ...prev,
          stops: next.map((s, i) => ({ ...s, stopOrder: i + 1 })),
        };
      });
    },
    []
  );

  const hasStop = useCallback(
    (slug: string, type?: string) =>
      draft.stops.some((s) => s.slug === slug && (type ? s.type === type : true)),
    [draft.stops]
  );

  const updateTitle = useCallback((title: string) => {
    setDraft((prev) => ({ ...prev, title }));
  }, []);

  const updateDates = useCallback((tripStart?: string, tripEnd?: string) => {
    setDraft((prev) => ({ ...prev, tripStart, tripEnd }));
  }, []);

  const loadDraftData = useCallback((data: ItineraryDraft) => {
    setDraft(data);
  }, []);

  const clearDraft = useCallback(() => {
    const empty: ItineraryDraft = { title: "My Mauritius Trip", stops: [] };
    setDraft(empty);
  }, []);

  return (
    <DraftContext.Provider
      value={{
        draft,
        addStop,
        removeStop,
        moveStop,
        hasStop,
        updateTitle,
        updateDates,
        loadDraft: loadDraftData,
        clearDraft,
        stopCount: draft.stops.length,
      }}
    >
      {children}
    </DraftContext.Provider>
  );
}

export function useItineraryDraft() {
  const ctx = useContext(DraftContext);
  if (!ctx) throw new Error("useItineraryDraft must be inside ItineraryDraftProvider");
  return ctx;
}
