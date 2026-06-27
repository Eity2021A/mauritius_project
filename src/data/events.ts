/**
 * Upcoming events in Mauritius (concerts, parties, cultural dates).
 * Poster assets may live in the Supabase `others` bucket — see getImageUrl("/images/others/...").
 */

export interface MauritiusEventTicketing {
  provider: string;
  /** e.g. "Otayo ticket holders only" */
  holdersNote?: string;
  exclusive?: boolean;
  website?: string;
  phone?: string;
}

export interface MauritiusEvent {
  id: string;
  title: string;
  /** ISO date strings YYYY-MM-DD (local calendar dates for Mauritius) */
  dateStrings: string[];
  /** Human-readable date line for cards */
  displayDate: string;
  description: string;
  posterImage: string;
  venue: string;
  lineup: string[];
  ticketing: MauritiusEventTicketing;
  /** Footer text from poster / venue policy */
  admissionNote?: string;
}

export const MAURITIUS_EVENTS: MauritiusEvent[] = [
  {
    id: "easter-saturday-y2k-2026",
    title: "Easter Saturday Y2K",
    dateStrings: ["2026-04-04"],
    displayDate: "Saturday, 4 April 2026",
    description:
      "A retro-inspired Easter Saturday party at N' JOY with a Y2K theme — expect bold visuals, a stacked DJ and live lineup, and an electric crowd. Exclusive event; tickets via Otayo.",
    posterImage: "/images/others/y2k-april-2026.jpg",
    venue: "N' JOY",
    lineup: [
      "LP",
      "NEBAT DRUMS",
      "PATRICE DAV",
      "DAVID JAY",
      "DJ MIKE",
      "DEEJAY PATRICE",
      "BOBO",
    ],
    ticketing: {
      provider: "Otayo",
      exclusive: true,
      holdersNote: "Otayo ticket holders only",
      website: "https://otayo.com/event/ddd-presents-y2k-easter/",
      phone: "466 9999",
    },
    admissionNote: "The management reserves the right of admission.",
  },
];

/** All calendar dates that should be highlighted (from every event). */
export function getAllEventDateStrings(): string[] {
  const set = new Set<string>();
  for (const e of MAURITIUS_EVENTS) {
    for (const d of e.dateStrings) set.add(d);
  }
  return [...set].sort();
}

/** Parse YYYY-MM-DD as local calendar date (no UTC shift). */
export function isoDateToLocalDate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

/** Local calendar date → YYYY-MM-DD. */
export function localDateToIso(date: Date): string {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const day = date.getDate();
  return `${y}-${String(m).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

/** First event matching an ISO date (if several share a date, first in list wins). */
export function findEventByIsoDate(iso: string): MauritiusEvent | undefined {
  for (const e of MAURITIUS_EVENTS) {
    if (e.dateStrings.includes(iso)) return e;
  }
  return undefined;
}
