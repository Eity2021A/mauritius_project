/**
 * Homepage data - Extracted from JSX for maintainability
 * Following Clean Code principle: Separate data from presentation
 */

import { ITINERARY_DETAIL_BASE } from "@/data/predesigned-itineraries";
import { PREDESIGNED_ITINERARIES } from "@/data/predesigned-itineraries";

const HOME_ITINERARY_SLUGS = [
  "best-instagram-photo-location",
  "road-trip-north",
  "must-see-waterfalls-of-mauritius",
  "road-trip-south-coastal",
  "1-day-in-port-louis",
] as const;

export const HOME_ITINERARIES = HOME_ITINERARY_SLUGS.map((slug) => {
  const it = PREDESIGNED_ITINERARIES.find((i) => i.slug === slug);
  if (!it) return null;
  return {
    title: it.title,
    image: it.listingImage ?? it.image ?? "",
    href: `${ITINERARY_DETAIL_BASE}/${it.slug}`,
  };
}).filter(Boolean) as { title: string; image: string; href: string }[];

export interface Destination {
  name: string;
  image: string;
  href: string;
}

export const POPULAR_DESTINATIONS: Destination[] = [
  { name: "Ile aux Cerfs", image: "boat-tours-at-ile-aux-cerfs.jpg", href: "/beaches-in-mauritius/ile-aux-cerfs" },
  { name: "Le Morne", image: "beach-of-le-morne-in-the-morning.jpg", href: "/beaches-in-mauritius/le-morne" },
  { name: "Catamaran Cruises", image: "catamaran-cruises-in-mauritius.jpg", href: "/top-activities-mauritius/catamaran-cruises" },
  { name: "Blue Bay", image: "snorkeling-and-boat-tours-blue-bay.jpg", href: "/beaches-in-mauritius/blue-bay" },
  { name: "Trou aux Biches", image: "trou-aux-biches-public-beach.jpg", href: "/beaches-in-mauritius/trou-aux-biches" },
];

export interface Service {
  title: string;
  description: string;
  image: string;
  href: string;
  buttonLabel: string;
}

export const SERVICES: Service[] = [
  {
    title: "Beach Escapes",
    description: "Crystal clear waters and pristine white sand beaches await you.",
    image: "beach-of-le-morne-in-the-morning.jpg",
    href: "/beaches-in-mauritius",
    buttonLabel: "Explore Beaches",
  },
  {
    title: "Water Sports",
    description: "Diving, snorkeling, kitesurfing, and underwater adventures.",
    image: "swimming-with-dolphins.jpg",
    href: "/mauritius-activities?category=sea",
    buttonLabel: "View Activities",
  },
  {
    title: "Nature & Wildlife",
    description: "Explore national parks, waterfalls, and unique wildlife.",
    image: "alexandra-falls.jpg",
    href: "/best-places-to-visit-in-mauritius?category=nature",
    buttonLabel: "Discover Places",
  },
  {
    title: "Festivals & Holidays",
    description: "Discover Mauritius's vibrant festivals and public holidays throughout the year.",
    image: "grand-bassin-shiva-statue.jpg",
    href: "/festivals-in-mauritius",
    buttonLabel: "Explore Festivals",
  },
];

export interface Stat {
  number: string;
  label: string;
}

export const STATS: Stat[] = [
  { number: "65", label: "Hotels" },
  { number: "101+", label: "Beaches" },
  { number: "55+", label: "Activities" },
  { number: "88", label: "Places to Visit" },
];
