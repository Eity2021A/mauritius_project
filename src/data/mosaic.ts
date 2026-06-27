/**
 * Homepage mosaic section (2026 layout):
 * - 14 tiles with real pixel dimensions so the layout engine packs tightly
 * - Two sizes: landscape 800×574, portrait 441×574
 */

export interface MosaicItem {
  src: string;
  alt: string;
  title: string;
  href: string;
  width: number;
  height: number;
}

export const MOSAIC_ITEMS: MosaicItem[] = [
  { src: "custom-mosaic-amazing-places-to-visit-mauritius.jpg", alt: "Amazing places to visit in Mauritius including waterfalls and nature", title: "Amazing Places to Visit", href: "/best-places-to-visit-in-mauritius", width: 441, height: 574 },
  { src: "custom-mosaic-undersea-walk-mauritius.jpg", alt: "Undersea walk experience in Mauritius", title: "Undersea Walk", href: "/mauritius-activities", width: 800, height: 574 },
  { src: "custom-mosaic-best-beaches-of-mauritius.jpg", alt: "Best beaches of Mauritius", title: "Best Beaches of Mauritius", href: "/beaches-in-mauritius", width: 800, height: 574 },
  { src: "custom-mosaic-eco-friendly-nature-activities-mauritius.jpg", alt: "Nature activities and eco-friendly experiences in Mauritius", title: "Nature Activities", href: "/mauritius-activities", width: 441, height: 574 },
  { src: "custom-mosaic-most-popular-activities-mauritius.jpg", alt: "Most popular activities in Mauritius", title: "Most Popular Activities", href: "/mauritius-activities", width: 441, height: 574 },
  { src: "custom-mosaic-helicopter-tour-whale-watch-mauritius.jpg", alt: "Helicopter tour and whale watching in Mauritius", title: "Helicopter Tour and Whale Watching", href: "/mauritius-activities", width: 800, height: 574 },
  { src: "custom-mosaic-eco-friendly-activities-mauritius.jpg", alt: "Eco-friendly activities in Mauritius", title: "Be Part of Nature", href: "/mauritius-activities", width: 441, height: 574 },
  { src: "custom-mosaic-discover-over-40-beaches-mauritius.jpg", alt: "Discover over 40 beaches in Mauritius", title: "Discover Over 40 Beaches", href: "/beaches-in-mauritius", width: 800, height: 574 },
  { src: "custom-mosaic-best-snorkeling-spots-mauritius.jpg", alt: "Best snorkeling spots in Mauritius", title: "Explore Snorkeling Spots", href: "/mauritius-activities", width: 441, height: 574 },
  { src: "custom-mosaic-best-time-to-visit-mauritius.jpg", alt: "Best time to visit Mauritius", title: "Best Time to Visit", href: "/best-time-to-visit-to-mauritius", width: 441, height: 574 },
  { src: "custom-mosaic-discover-hidden-spots-mauritius.jpg", alt: "Discover hidden spots in Mauritius", title: "Discover the Secrets of Mauritius", href: "/best-places-to-visit-in-mauritius", width: 441, height: 574 },
  { src: "custom-mosaic-top-10-beaches-mauritius.jpg", alt: "Top ten beaches in Mauritius", title: "Top Ten Beaches in Mauritius", href: "/beaches-in-mauritius", width: 800, height: 574 },
  { src: "custom-mosaic-custom-mosaic-activities-in-mauritius.jpg", alt: "Best activities for everyone in Mauritius", title: "Best Activities for Everyone", href: "/mauritius-activities", width: 800, height: 574 },
  { src: "custom-mosaic-swim-with-sea-turtles-mauritius.jpg", alt: "Swim with sea turtles in Mauritius", title: "Swim With Sea Turtles", href: "/mauritius-activities", width: 441, height: 574 },
];
