import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getImageUrl } from "@/lib/image-url";
import { SITE_URL } from "@/lib/constants";
import type { Metadata } from "next";

const HERO_IMAGE_PATH = "/images/banners/le-morne-aerial-view-mauritius.webp";
const OG_IMAGE_URL =
  "https://wpktirmzveoovxjqbqpq.supabase.co/storage/v1/object/public/banners/le-morne-aerial-view-mauritius.webp";

interface ItineraryGuide {
  days: number;
  anchor: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  /**
   * Will be set once the matching blog post is published.
   * Until then we render a non-clickable "Coming soon" chip and
   * the page never emits a broken link.
   */
  href: string | null;
}

const ITINERARY_GUIDES: ItineraryGuide[] = [
  {
    days: 3,
    anchor: "3-day",
    title: "3 Day Mauritius Itinerary",
    subtitle: "Short Stay Guide",
    description:
      "If you are visiting Mauritius for a short stay, this itinerary focuses on the must-see highlights. Expect a mix of beaches, scenic viewpoints, and cultural experiences. A typical 3-day plan includes exploring Port Louis for markets and culture, relaxing on the beaches of the north such as Mont Choisy, and discovering the southwest region including Le Morne Brabant and Chamarel.",
    image: "panoram-north-of-mauritius-.webp",
    href: "/blog/3-day-mauritius-itinerary",
  },
  {
    days: 5,
    anchor: "5-day",
    title: "5 Day Mauritius Itinerary",
    subtitle: "Best Highlights",
    description:
      "A 5-day itinerary allows you to experience the main highlights of Mauritius without rushing. You can explore the north coast beaches, enjoy a full day in the west for dolphin watching in Tamarin Bay, visit Île aux Cerfs on the east coast, and discover inland attractions such as Black River Gorges National Park.",
    image: "road-trip-in-mauritius.webp",
    href: "/blog/5-day-mauritius-itinerary",
  },
  {
    days: 7,
    anchor: "7-day",
    title: "7 Day Mauritius Itinerary",
    subtitle: "Perfect Week Plan",
    description:
      "Spending one week in Mauritius gives you enough time to explore each region in depth. A 7-day itinerary includes beaches, waterfalls, nature parks, and cultural stops such as Grand Bassin. You can combine relaxation with activities like snorkeling at Blue Bay Marine Park and excursions to islands like Île aux Bénitiers.",
    image: "le-morne-mauritius.webp",
    href: "/blog/7-day-mauritius-itinerary",
  },
  {
    days: 10,
    anchor: "10-day",
    title: "10 Day Mauritius Itinerary",
    subtitle: "Ultimate Guide",
    description:
      "A 10-day itinerary is the best way to fully experience Mauritius at a relaxed pace. This plan includes all major highlights plus hidden gems such as La Cambuse and Riambel Beach. It allows time for both exploration and relaxation, ensuring a complete and memorable island experience.",
    image: "mauritius-island-10-day-itinarary-for-family.webp",
    href: "/blog/10-days-in-mauritius",
  },
];

const TOP_PLACES: {
  name: string;
  description: string;
  href: string;
  image: string;
}[] = [
  {
    name: "Le Morne Brabant",
    description: "Iconic mountain and beach",
    href: "/best-places-to-visit-in-mauritius/le-morne-mountain",
    image: "le-morne-hike-start.jpg",
  },
  {
    name: "Chamarel",
    description: "Waterfall and viewpoints",
    href: "/best-places-to-visit-in-mauritius/chamarel-waterfall",
    image: "chamarel-waterfall.jpg",
  },
  {
    name: "Île aux Cerfs",
    description: "Lagoon and activities",
    href: "/best-places-to-visit-in-mauritius/ile-aux-cerfs",
    image: "golf-beach-ile-aux-cerfs.jpg",
  },
  {
    name: "Blue Bay Marine Park",
    description: "Best snorkeling spot",
    href: "/top-activities-mauritius/blue-bay-marine-park",
    image: "blue-bay-sea-turtle.jpg",
  },
  {
    name: "Port Louis",
    description: "Culture and markets",
    href: "/best-places-to-visit-in-mauritius/port-louis",
    image: "caudan-umbrella-alley-in-port-louis-caudan-waterfront.jpg",
  },
  {
    name: "Tamarin Bay",
    description: "Dolphins and sunsets",
    href: "/beaches-in-mauritius/tamarin",
    image: "tamarin-bay-morning.jpg",
  },
];

const STAY_REGIONS: { name: string; description: string }[] = [
  {
    name: "North (Grand Baie)",
    description: "Nightlife, restaurants, easy access",
  },
  {
    name: "West (Flic en Flac, Le Morne)",
    description: "Sunsets, beaches, activities",
  },
  {
    name: "East (Belle Mare)",
    description: "Luxury resorts, quiet beaches",
  },
  {
    name: "South",
    description: "Nature, wild landscapes, fewer crowds",
  },
];

const TRAVEL_TIPS: string[] = [
  "Renting a car is the best way to explore the island",
  "Start early for popular attractions to avoid crowds",
  "Plan activities by region to reduce travel time",
  "Combine beach days with inland exploration",
  "Always check weather conditions for snorkeling and boat trips",
];

const PAGE_DESCRIPTION =
  "Complete Mauritius itinerary guide for 3, 5, 7 and 10 day trips. Plan beaches, activities, waterfalls and culture across the north, west, east and south of the island.";

export const metadata: Metadata = {
  title: "Mauritius Itinerary: 3, 5, 7 & 10 Day Travel Plans (2026 Guide)",
  description: PAGE_DESCRIPTION,
  keywords: [
    "Mauritius itinerary",
    "Mauritius travel itinerary",
    "7 day Mauritius itinerary",
    "10 day Mauritius itinerary",
    "things to do Mauritius",
    "Mauritius travel guide",
  ],
  alternates: {
    canonical: "/mauritius-itinerary",
  },
  openGraph: {
    title: "Mauritius Itinerary: 3, 5, 7 & 10 Day Travel Plans (2026 Guide)",
    description: PAGE_DESCRIPTION,
    type: "article",
    url: `${SITE_URL}/mauritius-itinerary`,
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Aerial view of Le Morne, Mauritius",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mauritius Itinerary: 3, 5, 7 & 10 Day Travel Plans (2026 Guide)",
    description: PAGE_DESCRIPTION,
    images: [OG_IMAGE_URL],
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "Mauritius Itinerary: 3, 5, 7 & 10 Day Travel Plans (2026 Guide)",
  description: PAGE_DESCRIPTION,
  image: [OG_IMAGE_URL],
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE_URL}/mauritius-itinerary`,
  },
  author: {
    "@type": "Organization",
    name: "Mauritius Explored",
    url: SITE_URL,
  },
  publisher: {
    "@type": "Organization",
    name: "Mauritius Explored",
    url: SITE_URL,
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Itineraries",
      item: `${SITE_URL}/itineraries-mauritius`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Mauritius Itineraries",
      item: `${SITE_URL}/mauritius-itinerary`,
    },
  ],
};

export default function MauritiusItineraryPage() {
  return (
    <main id="main-content" className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Navbar />

      {/* Hero */}
      <section className="relative h-[44vh] min-h-[280px]">
        <Image
          src={getImageUrl(HERO_IMAGE_PATH, { width: 1600, quality: 72 })}
          alt="Aerial view of Le Morne, Mauritius — itinerary planning hub"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/65" />
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center px-4 max-w-4xl mx-auto translate-y-[1.5rem]">
            <p className="text-orange-300 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] mb-3">
              2026 Travel Guide
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Mauritius Itinerary: 3, 5, 7 & 10 Day Travel Plans
            </h1>
            <p className="text-white/90 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              Plan the perfect trip to Mauritius — beaches, waterfalls,
              mountains and culture, structured by trip length.
            </p>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-gray-700 text-base md:text-lg leading-relaxed space-y-4">
            <p>
              Planning a trip to Mauritius? This complete{" "}
              <span className="font-semibold text-orange-500">
                Mauritius itinerary guide
              </span>{" "}
              is designed to help you plan the perfect trip, whether you have
              3 days, 5 days, 1 week, or 10 days on the island. From white
              sandy beaches and turquoise lagoons to waterfalls, mountains,
              and cultural landmarks, Mauritius offers one of the most diverse
              travel experiences in the Indian Ocean. This page acts as your
              central hub, guiding you to detailed itineraries tailored to
              different trip lengths, travel styles, and must-see highlights.
            </p>
            <p>
              Mauritius is relatively small, but each region offers something
              completely different. The{" "}
              <Link
                href="/top-activities-mauritius/road-trip-north"
                className="font-semibold text-orange-500 underline underline-offset-4 hover:text-orange-600"
              >
                north
              </Link>{" "}
              is vibrant and lively, the{" "}
              <Link
                href="/beaches-in-mauritius?region=West#beach-cards"
                className="font-semibold text-orange-500 underline underline-offset-4 hover:text-orange-600"
              >
                west
              </Link>{" "}
              is known for sunsets and dolphins, the{" "}
              <Link
                href="/beaches-in-mauritius?region=East#beach-cards"
                className="font-semibold text-orange-500 underline underline-offset-4 hover:text-orange-600"
              >
                east
              </Link>{" "}
              is home to luxury resorts and pristine beaches, and the{" "}
              <Link
                href="/top-activities-mauritius/road-trip-south-coastal"
                className="font-semibold text-orange-500 underline underline-offset-4 hover:text-orange-600"
              >
                south
              </Link>{" "}
              reveals a wild and untouched coastline. A well-planned
              itinerary ensures you experience the best of each region without
              wasting time travelling back and forth. This guide helps you
              structure your days efficiently while linking to full detailed
              itineraries you can follow step by step.
            </p>
          </div>
        </div>
      </section>

      {/* How many days */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 text-center">
              How Many Days Do You Need in Mauritius?
            </h2>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed text-center mb-8 max-w-3xl mx-auto">
              The ideal duration depends on your travel style. A short stay of
              3 days allows you to explore key highlights, while 5 days gives
              a more balanced mix of beaches and inland attractions. A 7-day
              itinerary is perfect for a full island experience, and 10 days
              allows for a relaxed and immersive journey with time to explore
              hidden gems.
            </p>
            <ul className="grid sm:grid-cols-2 gap-3 max-w-3xl mx-auto">
              {ITINERARY_GUIDES.map((g) => (
                <li key={g.days}>
                  <a
                    href={`#${g.anchor}`}
                    className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-orange-300 hover:shadow-sm transition-all"
                  >
                    <span className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-100 text-orange-600 font-bold flex items-center justify-center">
                      {g.days}
                    </span>
                    <span className="text-sm md:text-base">
                      <span className="block font-semibold text-gray-900">
                        {g.days} days in Mauritius
                      </span>
                      <span className="block text-gray-500 text-xs md:text-sm">
                        {g.days === 3 && "Quick highlights and beach time"}
                        {g.days === 5 &&
                          "Balanced itinerary with key attractions"}
                        {g.days === 7 && "Complete island experience"}
                        {g.days === 10 &&
                          "Ultimate itinerary with hidden gems"}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Itinerary cards */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 md:gap-8">
            {ITINERARY_GUIDES.map((g) => (
              <article
                key={g.days}
                id={g.anchor}
                className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col scroll-mt-24"
              >
                <div className="bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-4">
                  <p className="text-white/90 text-xs font-semibold uppercase tracking-wider">
                    {g.subtitle}
                  </p>
                  <h2 className="text-xl md:text-2xl font-bold text-white">
                    {g.title}
                  </h2>
                </div>
                <div className="relative h-48 bg-gray-100">
                  <Image
                    src={getImageUrl(g.image, { width: 900, quality: 75 })}
                    alt={`${g.title} guide`}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-gray-700 leading-relaxed mb-6 flex-1">
                    {g.description}
                  </p>
                  {g.href ? (
                    <Link
                      href={g.href}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] bg-teal-600 text-white text-sm font-semibold rounded-lg border border-teal-700 hover:bg-teal-700 transition-colors no-underline self-start"
                    >
                      Read full itinerary
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </Link>
                  ) : (
                    <span className="inline-flex items-center gap-2 px-5 py-3 min-h-[44px] bg-gray-100 text-gray-500 text-sm font-medium rounded-lg cursor-not-allowed self-start">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Full guide coming soon
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Best Places */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 text-center">
              Best Places to Include in Your Mauritius Itinerary
            </h2>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed text-center mb-8 max-w-3xl mx-auto">
              No matter how long you stay, these locations should be part of
              your itinerary:
            </p>
            <ul className="grid sm:grid-cols-2 gap-4 mb-8">
              {TOP_PLACES.map((p) => (
                <li key={p.name}>
                  <Link
                    href={p.href}
                    className="group flex items-center gap-4 p-3 bg-white rounded-xl border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all no-underline"
                  >
                    <span className="relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={getImageUrl(p.image, { width: 240, quality: 75 })}
                        alt={p.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="80px"
                      />
                    </span>
                    <span className="min-w-0">
                      <span className="flex items-center gap-2">
                        <span
                          className="flex-shrink-0 w-2 h-2 rounded-full bg-orange-500"
                          aria-hidden="true"
                        />
                        <span className="block font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                          {p.name}
                        </span>
                      </span>
                      <span className="block text-gray-600 text-sm mt-1">
                        {p.description}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="text-center">
              <Link
                href="/best-places-to-visit-in-mauritius"
                className="inline-flex items-center gap-2 px-6 py-3 min-h-[44px] bg-white border border-orange-200 text-orange-600 text-sm font-semibold rounded-lg hover:bg-orange-50 transition-colors no-underline"
              >
                Explore all places to visit
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Where to Stay */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 text-center">
              Where to Stay in Mauritius
            </h2>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed text-center mb-8 max-w-3xl mx-auto">
              Choosing where to stay is key to optimizing your itinerary. Each
              region offers a different experience:
            </p>
            <ul className="grid sm:grid-cols-2 gap-3">
              {STAY_REGIONS.map((r) => (
                <li
                  key={r.name}
                  className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <p className="font-semibold text-gray-900">{r.name}</p>
                  <p className="text-gray-600 text-sm mt-1">{r.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Travel Tips */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              Travel Tips for Your Mauritius Itinerary
            </h2>
            <ul className="space-y-3 max-w-3xl mx-auto">
              {TRAVEL_TIPS.map((tip) => (
                <li
                  key={tip}
                  className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200"
                >
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-orange-500 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-700">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Final Thoughts */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
              Final Thoughts
            </h2>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed text-center max-w-3xl mx-auto">
              This Mauritius itinerary hub is designed to help you plan your
              trip efficiently while discovering the best the island has to
              offer. Whether you are staying for a few days or more than a
              week, these itineraries provide a clear structure to maximize
              your experience. By following these travel plans and exploring
              each region, you will enjoy a perfect balance of beaches,
              nature, culture, and adventure in one unforgettable destination.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-amber-500">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Build Your Own Itinerary?
            </h2>
            <p className="text-orange-100 text-base md:text-lg mb-8">
              Pick beaches, activities and places — see your route on the
              map, then save and share your trip.
            </p>
            <Link
              href="/itineraries-mauritius/create"
              className="inline-flex items-center justify-center px-10 py-5 min-h-[56px] text-lg bg-white text-orange-500 font-semibold rounded-lg hover:bg-orange-50 transition-colors shadow-lg no-underline"
            >
              Create your itinerary
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
