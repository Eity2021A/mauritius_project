import Link from "next/link";
import React from "react";
import { ALL_BEACHES } from "@/data/beaches";
import { PLACE_DETAILS } from "@/data/place-details";

export interface LinkableTerm {
  phrase: string;
  href: string;
}

/**
 * Build linkable terms from beaches (→ /beaches-in-mauritius) and places (→ /best-places-to-visit-in-mauritius).
 * Sorted by phrase length descending so longer phrases match first (e.g. "Black River Gorges National Park" before "Le Morne").
 */
function buildLinkableTerms(): LinkableTerm[] {
  const terms: LinkableTerm[] = [];

  for (const beach of ALL_BEACHES) {
    terms.push({ phrase: beach.name, href: `/beaches-in-mauritius/${beach.slug}` });
  }

  for (const place of Object.values(PLACE_DETAILS)) {
    terms.push({ phrase: place.name, href: `/best-places-to-visit-in-mauritius/${place.slug}` });
  }

  const variants: LinkableTerm[] = [
    { phrase: "Seven Coloured Earths", href: "/best-places-to-visit-in-mauritius/7-coloured-earth" },
    { phrase: "Seven Coloured Earth", href: "/best-places-to-visit-in-mauritius/7-coloured-earth" },
    { phrase: "7 Coloured Earth", href: "/best-places-to-visit-in-mauritius/7-coloured-earth" },
    { phrase: "Chamarel waterfall", href: "/best-places-to-visit-in-mauritius/chamarel-waterfall" },
    { phrase: "7 Cascades", href: "/best-places-to-visit-in-mauritius/seven-waterfall" },
    { phrase: "Tamarind Falls", href: "/best-places-to-visit-in-mauritius/seven-waterfall" },
    { phrase: "Sept Cascades", href: "/best-places-to-visit-in-mauritius/seven-waterfall" },
    { phrase: "Eau Bleu", href: "/best-places-to-visit-in-mauritius/eau-bleu-waterfall" },
    { phrase: "Eau Bleu Waterfall", href: "/best-places-to-visit-in-mauritius/eau-bleu-waterfall" },
    { phrase: "Rochester Falls", href: "/best-places-to-visit-in-mauritius/rochester-falls" },
    { phrase: "Alexandra Falls", href: "/best-places-to-visit-in-mauritius/alexandra-falls" },
    { phrase: "Black River Gorges National Park", href: "/best-places-to-visit-in-mauritius/black-river-gorges" },
    { phrase: "Black River Gorges", href: "/best-places-to-visit-in-mauritius/black-river-gorges" },
    { phrase: "Ganga Talao", href: "/best-places-to-visit-in-mauritius/grand-bassin" },
    { phrase: "Grand River South East Waterfall", href: "/best-places-to-visit-in-mauritius/grse-waterfall" },
    { phrase: "GRSE Waterfall", href: "/best-places-to-visit-in-mauritius/grse-waterfall" },
    { phrase: "Ile aux Cerfs", href: "/best-places-to-visit-in-mauritius/ile-aux-cerfs" },
    { phrase: "Bénitiers island", href: "/best-places-to-visit-in-mauritius/ile-aux-benitiers" },
    { phrase: "Ile aux Bénitiers", href: "/best-places-to-visit-in-mauritius/ile-aux-benitiers" },
    { phrase: "Ile aux Benitiers", href: "/best-places-to-visit-in-mauritius/ile-aux-benitiers" },
    { phrase: "Le Morne Brabant", href: "/best-places-to-visit-in-mauritius/le-morne-mountain" },
    { phrase: "Le Morne Brabant mountain", href: "/best-places-to-visit-in-mauritius/le-morne-mountain" },
    { phrase: "Château de Bel Ombre", href: "/best-places-to-visit-in-mauritius/chateau-de-bel-ombre" },
    { phrase: "Pamplemousses Botanical Garden", href: "/best-places-to-visit-in-mauritius/pamplemousses-botanical-garden" },
    { phrase: "Blue Bay Marine Park", href: "/beaches-in-mauritius/blue-bay" },
  ];

  // Variants override terms for same phrase (case-insensitive); keep one entry per phrase
  const byPhrase = new Map<string, LinkableTerm>();
  for (const t of [...terms, ...variants]) {
    byPhrase.set(t.phrase.toLowerCase(), { phrase: t.phrase, href: t.href });
  }
  const merged = Array.from(byPhrase.values());

  // Sort by phrase length descending (longest first) to match "Black River Gorges National Park" before "Black River Gorges"
  merged.sort((a, b) => b.phrase.length - a.phrase.length);
  return merged;
}

export const BLOG_LINKABLE_TERMS = buildLinkableTerms();

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

interface Match {
  start: number;
  end: number;
  href: string;
  matchedText: string;
}

/**
 * Find all non-overlapping matches of linkable terms in text (case-insensitive).
 * Longer phrases are preferred (terms are already sorted by length).
 */
function findMatches(text: string): Match[] {
  const matches: Match[] = [];
  const used = new Set<number>(); // track character indices already inside a link

  for (const { phrase, href } of BLOG_LINKABLE_TERMS) {
    const escaped = escapeRegex(phrase);
    const re = new RegExp(escaped, "gi");
    let m: RegExpExecArray | null;
    re.lastIndex = 0;
    while ((m = re.exec(text)) !== null) {
      const start = m.index;
      const end = start + m[0].length;
      const matchedText = m[0];
      // Skip if any character in this range is already part of a link
      let overlapping = false;
      for (let i = start; i < end; i++) {
        if (used.has(i)) {
          overlapping = true;
          break;
        }
      }
      if (!overlapping) {
        matches.push({ start, end, href, matchedText });
        for (let i = start; i < end; i++) used.add(i);
      }
    }
  }

  matches.sort((a, b) => a.start - b.start);
  return matches;
}

/**
 * Turn a paragraph string into an array of React nodes (text and Link components)
 * so that known place/beach/activity names become underlined links.
 */
export function parseContentWithLinks(text: string): React.ReactNode[] {
  const matches = findMatches(text);
  if (matches.length === 0) {
    return [text];
  }

  const nodes: React.ReactNode[] = [];
  let lastEnd = 0;

  for (const { start, end, href, matchedText } of matches) {
    if (start > lastEnd) {
      nodes.push(text.slice(lastEnd, start));
    }
    nodes.push(
      <Link
        key={`${start}-${href}`}
        href={href}
        className="text-orange-600 underline underline-offset-2 hover:text-orange-700"
      >
        {matchedText}
      </Link>
    );
    lastEnd = end;
  }

  if (lastEnd < text.length) {
    nodes.push(text.slice(lastEnd));
  }

  return nodes;
}
