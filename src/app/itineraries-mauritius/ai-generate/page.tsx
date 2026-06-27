"use client";

import { useState, useCallback, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ItineraryDetailView from "@/components/ItineraryDetailView";
import { ACTIVITY_DETAILS, type ActivityDetails } from "@/data/activities";
import { PLACE_DETAILS, type PlaceDetails } from "@/data/place-details";
import type { PreDesignedItinerary, PreDesignedStop } from "@/data/predesigned-itineraries";
import { getCoordinates } from "@/lib/coordinates";

/* ──────────────── Tag definitions ──────────────── */

interface TagDef {
  id: string;
  label: string;
  icon: string;
}

const TAGS: TagDef[] = [
  { id: "adventure", label: "Adventure", icon: "⚡" },
  { id: "sea", label: "Sea", icon: "🌊" },
  { id: "waterfall", label: "Waterfalls", icon: "💧" },
  { id: "hiking", label: "Hiking", icon: "🥾" },
  { id: "air", label: "Air", icon: "🚁" },
  { id: "photography", label: "Photography", icon: "📸" },
  { id: "swim", label: "Swim Spots", icon: "🏊" },
  { id: "nature", label: "Nature", icon: "🌿" },
  { id: "culture", label: "Culture", icon: "🏛️" },
  { id: "islands", label: "Islands", icon: "🏝️" },
];

/* ──────────────── Pool entry (place or activity → stop) ──────────────── */

interface PoolEntry {
  type: "place" | "activity";
  slug: string;
  name: string;
  image: string;
  position: [number, number];
  regionLabel: string;
  description: string;
  tags: string[];
}

/** Fallback coordinates for AI-generated slug aliases not in entity data */
const ALIAS_COORDS: Record<string, [number, number]> = {
  "catamaran-ile-aux-cerfs": [-20.272, 57.804],
  "catamaran-ile-aux-benitiers": [-20.415, 57.345],
  "seaplane-le-morne": [-20.44, 57.32],
  "seaplane-north": [-20.01, 57.58],
  "seven-cascades": [-20.375, 57.435],
  "seven-waterfalls": [-20.375, 57.435],
  "speedboat-ilot-gabriel": [-19.90, 57.63],
  "grand-bassin-activity": [-20.41806, 57.49194],
  "horse-riding": [-20.452, 57.313],
  "albion-lighthouse": [-20.228, 57.400],
  "pont-naturel": [-20.480, 57.669],
  "port-louis": [-20.162, 57.499],
  "crystal-rock": [-20.428, 57.338],
  "trou-aux-cerfs": [-20.314, 57.518],
  "gris-gris": [-20.515, 57.541],
};

function getKnownCoords(slug: string): [number, number] | null {
  return getCoordinates(slug) ?? ALIAS_COORDS[slug] ?? null;
}

const TAG_MATCH: Record<string, (cats: string[], slug: string) => boolean> = {
  adventure: (cats) => cats.includes("adventure"),
  sea: (cats) => cats.includes("sea"),
  waterfall: (cats, slug) => cats.includes("waterfalls") || slug.includes("waterfall") || slug.includes("cascade") || slug.includes("falls"),
  hiking: (cats) => cats.includes("hiking"),
  air: (cats) => cats.includes("air"),
  photography: (_cats, slug) =>
    ["crystal-rock", "chamarel-waterfall", "7-coloured-earth", "le-morne", "underwater-waterfall", "pamplemousses-botanical-garden", "caudan-waterfront", "grand-bassin", "black-river-gorges", "natural-bridge", "gris-gris", "maconde"].includes(slug),
  swim: (_cats, slug) =>
    ["snorkeling-blue-bay", "ile-aux-cerfs", "ile-aux-benitiers", "swim-with-dolphins", "kayaking-ile-dambre", "scuba-diving", "undersea-walk", "underwater-scooter"].includes(slug),
  nature: (cats) => cats.includes("nature"),
  culture: (cats, slug) =>
    cats.includes("local") || cats.includes("history") || cats.includes("discover") || ["grand-bassin", "caudan-waterfront", "port-louis", "aapravasi-ghat", "citadel-fort", "national-post", "champ-de-mars", "national-history-museum"].includes(slug),
  islands: (cats, slug) =>
    cats.includes("islands") || ["ile-aux-cerfs", "ile-aux-benitiers", "ile-au-phare", "ilot-gabriel"].includes(slug),
};

function buildPool(): PoolEntry[] {
  const pool: PoolEntry[] = [];
  const seen = new Set<string>();

  for (const [slug, a] of Object.entries(ACTIVITY_DETAILS)) {
    if (slug === "ile-au-phare" && PLACE_DETAILS[slug]) continue;
    const coords = getKnownCoords(slug);
    if (!coords) continue;
    const tags = Object.entries(TAG_MATCH)
      .filter(([, fn]) => fn(a.categories, slug))
      .map(([t]) => t);
    if (tags.length === 0) continue;
    seen.add(slug);
    pool.push({
      type: "activity",
      slug,
      name: a.name,
      image: a.images[0] ?? "",
      position: coords,
      regionLabel: a.location?.split(",")[0]?.replace(/^(East|West|North|South)\s*/i, "").trim() || "",
      description: a.tagline,
      tags,
    });
  }

  for (const [slug, p] of Object.entries(PLACE_DETAILS)) {
    if (seen.has(slug)) continue;
    const coords = getKnownCoords(slug);
    if (!coords) continue;
    const tags = Object.entries(TAG_MATCH)
      .filter(([, fn]) => fn(p.categories, slug))
      .map(([t]) => t);
    if (tags.length === 0) continue;
    pool.push({
      type: "place",
      slug,
      name: p.name,
      image: p.images[0] ?? "",
      position: coords,
      regionLabel: p.region,
      description: p.tagline,
      tags,
    });
  }
  return pool;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickStops(pool: PoolEntry[], selectedTags: string[], count: number): PoolEntry[] {
  const matched = pool.filter((e) => e.tags.some((t) => selectedTags.includes(t)));
  const shuffled = shuffle(matched);

  const picked: PoolEntry[] = [];
  const usedSlugs = new Set<string>();

  for (const entry of shuffled) {
    if (usedSlugs.has(entry.slug)) continue;
    picked.push(entry);
    usedSlugs.add(entry.slug);
    if (picked.length >= count) break;
  }

  // Sort geographically: north to south (latitude ascending in magnitude = more negative)
  picked.sort((a, b) => {
    const latDiff = a.position[0] - b.position[0];
    if (Math.abs(latDiff) > 0.03) return latDiff;
    return a.position[1] - b.position[1];
  });

  return picked;
}

function entriesToItinerary(entries: PoolEntry[], selectedTags: string[]): PreDesignedItinerary {
  const tagLabels = TAGS.filter((t) => selectedTags.includes(t.id)).map((t) => t.label);
  const stops: PreDesignedStop[] = entries.map((e) => ({
    type: e.type,
    slug: e.slug,
    name: e.name,
    position: e.position,
    link: e.type === "activity" ? `/top-activities-mauritius/${e.slug}` : `/best-places-to-visit-in-mauritius/${e.slug}`,
    image: e.image,
    regionLabel: e.regionLabel,
    description: e.description,
  }));

  return {
    id: "ai-generated",
    slug: "ai-generate",
    title: "Your Custom Itinerary",
    subtitle: tagLabels.join(" · "),
    image: entries[0]?.image,
    stops,
    info: [
      `Generated based on your interests: ${tagLabels.join(", ")}.`,
      "Stops are ordered geographically to minimise driving.",
      "Tap 'View stop details' for more info on each stop.",
      "Hit 'Start Over' at the top to try different interests.",
    ],
  };
}

/* ──────────────── Page component ──────────────── */

export default function AiGeneratePage() {
  const pool = useMemo(() => buildPool(), []);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [phase, setPhase] = useState<"pick" | "loading" | "result">("pick");
  const [itinerary, setItinerary] = useState<PreDesignedItinerary | null>(null);
  const [progress, setProgress] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  const toggleTag = (id: string) => {
    setSelectedTags((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const generate = useCallback(() => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setPhase("loading");
      setProgress(0);
      const totalMs = 2200;
      const step = 60;
      let elapsed = 0;
      const timer = setInterval(() => {
        elapsed += step;
        setProgress(Math.min(95, Math.round((elapsed / totalMs) * 100)));
        if (elapsed >= totalMs) {
          clearInterval(timer);
          const count = 4 + Math.floor(Math.random() * 5);
          const picked = pickStops(pool, selectedTags, count);
          const it = entriesToItinerary(picked, selectedTags);
          setItinerary(it);
          setProgress(100);
          setTimeout(() => setPhase("result"), 200);
        }
      }, step);
    }, 200);
  }, [pool, selectedTags]);

  const restart = () => {
    setPhase("pick");
    setSelectedTags([]);
    setItinerary(null);
    setProgress(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ─── Result phase: reuse the itinerary detail view ─── */
  if (phase === "result" && itinerary) {
    return (
      <ItineraryDetailView
        itinerary={itinerary}
        topBanner={
          <div className="bg-gray-50 border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-4 py-3">
              <span className="text-sm text-gray-600">
                Not what you had in mind?
              </span>
              <button
                type="button"
                onClick={restart}
                className="flex-shrink-0 px-5 py-2.5 rounded-lg bg-orange-500 text-white text-sm font-bold hover:bg-orange-600 transition-colors shadow-sm min-h-[44px]"
              >
                Start Over
              </button>
            </div>
          </div>
        }
      />
    );
  }

  /* ─── Loading phase ─── */
  if (phase === "loading") {
    return (
      <main id="main-content" className="min-h-screen bg-white">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
          <div className="w-full max-w-md space-y-6 text-center">
            <div className="text-5xl">🗺️</div>
            <h2 className="text-2xl font-bold text-gray-900">
              Preparing your itinerary…
            </h2>
            <p className="text-gray-500 text-sm">
              Finding the best stops based on your interests
            </p>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-orange-500 h-3 rounded-full transition-all duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm font-medium text-orange-600">{progress}%</p>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  /* ─── Pick phase ─── */
  return (
    <main id="main-content" className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 pt-28 pb-16">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">✨</div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Let AI Create Your Itinerary
          </h1>
          <p className="text-gray-500 max-w-md mx-auto">
            Select your interests below and we&apos;ll build a personalised itinerary across Mauritius.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {TAGS.map((tag) => {
            const active = selectedTags.includes(tag.id);
            return (
              <button
                key={tag.id}
                type="button"
                onClick={() => toggleTag(tag.id)}
                className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full border-2 text-sm font-semibold transition-all min-h-[44px] ${
                  active
                    ? "border-orange-500 bg-orange-50 text-orange-700 shadow-sm"
                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <span className="text-lg">{tag.icon}</span>
                {tag.label}
              </button>
            );
          })}
        </div>

        <div className="text-center">
          <button
            type="button"
            disabled={selectedTags.length === 0 || isGenerating}
            onClick={generate}
            className={`inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg text-base font-bold transition-all min-h-[48px] ${
              selectedTags.length > 0 || isGenerating
                ? "bg-orange-500 text-white hover:bg-orange-600 shadow-md hover:shadow-lg disabled:opacity-90 disabled:cursor-wait"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            {isGenerating ? (
              <>
                <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
                <span>Generating...</span>
              </>
            ) : (
              "Generate Itinerary"
            )}
          </button>
          {selectedTags.length === 0 && (
            <p className="text-xs text-gray-400 mt-3">
              Select at least one interest to get started
            </p>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
