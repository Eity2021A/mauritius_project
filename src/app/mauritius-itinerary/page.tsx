import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getImageUrl } from "@/lib/image-url";
import { SITE_URL } from "@/lib/constants";
import type { Metadata } from "next";

const HERO_IMAGE_PATH = "/images/banners/le-morne-aerial-view-mauritius.webp";
const OG_IMAGE_URL =
  "https://htyodxbntlnwefjkcudc.supabase.co/storage/v1/object/public/banners/le-morne-aerial-view-mauritius.webp";

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

const ROUTE_SUMMARY = [
  {
    days: "3",
    title: "3-Day Route",
    description: "North beaches, the wild west & south coast.",
  },
  {
    days: "5",
    title: "5-Day Route",
    description: "Beaches, nature, culture & a lagoon day.",
  },
  {
    days: "7",
    title: "7-Day Route",
    description: "Every coast, waterfalls & an island boat day.",
  },
  {
    days: "10",
    title: "10-Day Route",
    description: "Coast to interior and back, one region a day.",
  },
];

const PLAN_SMART_TIPS = [
  {
    title: "Self-drive freedom",
    description: "a rental reaches secluded spots, drive on the left.",
  },
  {
    title: "Stay in 2+ bases",
    description: "split North and South/West to cut driving.",
  },
  {
    title: "Go digital",
    description: "complete the mandatory travel form before you fly.",
  },
  {
    title: "More than beaches",
    description: "from street dholl puri to fine dining.",
  },
];

const THREE_DAY_DRIVE_STOPS = [
  {
    step: "1",
    color: "bg-[#1596a4]",
    route: "Port Louis \u2192 Cap Malheureux",
    region: "North",
    stops: "Central Market - Mont Choisy - Pereybere - red-roof church",
  },
  {
    step: "2",
    color: "bg-[#f17316]",
    route: "Tamarin Bay \u2192 Chamarel",
    region: "West",
    stops: "Dolphin trip - Flic en Flac - Le Morne - Chamarel Falls - sunset",
  },
  {
    step: "3",
    color: "bg-[#37956d]",
    route: "\u00cele aux Cerfs \u2192 Gris Gris",
    region: "South-West",
    stops: "GRSE Waterfall - Blue Bay snorkel - Gris Gris cliffs",
  },
];

const THREE_DAY_ROAD_TIPS = [
  {
    title: "Drive on the left",
    description: "roads are well-signed; an automatic is easiest.",
  },
  {
    title: "Start early",
    description: "beat the traffic, heat and crowds.",
  },
  {
    title: "Book ahead",
    description: "reserve boat trips & catamaran days.",
  },
  {
    title: "Rent from ~$21/day",
    description: "your own pace, full island freedom.",
  },
];
const FIVE_DAYS_DRIVE_STOPS = [
  {
    step: "1",
    color: "bg-[#1596a4]",
    route: "Port Louis \u2192 Cap Malheureux",
    region: "NORTH",
    stops: "Central Market · Caudan · Mont Choisy · Pereybère",
  },
  {
    step: "2",
    color: "bg-[#e25d18]",
    route: "Tamarin Bay \u2192 Albion",
    region: "WEST",
    stops: "Dolphin watching · Flic en Flac · Albion Beach",
  },
  {
    step: "3",
    color: "bg-[#2d855a]",
    route: "Le Morne \u2192 Chamarel",
    region: "SOUTH-WEST",
    stops: "Le Morne Brabant · Chamarel Falls · Black River Gorges viewpoint",
  },
  {
    step: "4",
    color: "bg-[#0b74b1]",
    route: "Trou d'Eau Douce \u2192 \u00cele aux Cerfs",
    region: "EAST",
    stops: "\u00cele aux Cerfs · GRSE Waterfall \u2014 full lagoon day",
  },
  {
    step: "5",
    color: "bg-[#236b56]",
    route: "Blue Bay \u2192 Souillac",
    region: "SOUTH",
    stops: "Blue Bay · Mahébourg · Gris Gris · Souillac (+ Grand Bassin)",
  },
];
const SEVEN_DAYS_DRIVE_STOPS = [
  {
    step: "1",
    color: "bg-[#1596a4]",
    route: "Airport \u2192 Grand Baie",
    region: "NORTH",
    stops: "Settle in · Mont Choisy · Grand Baie by night",
  },
  {
    step: "2",
    color: "bg-[#1596a4]",
    route: "Grand Baie \u2192 Cap Malheureux",
    region: "NORTH",
    stops: "Central Market · Caudan · Pereybère · sunset church",
  },
  {
    step: "3",
    color: "bg-[#e25d18]",
    route: "Tamarin \u2192 Flic en Flac",
    region: "WEST",
    stops: "Dolphin watching · Flic en Flac beach",
  },
  {
    step: "4",
    color: "bg-[#2d855a]",
    route: "Flic en Flac \u2192 Chamarel",
    region: "SOUTH-WEST",
    stops: "Le Morne · Chamarel Falls · scenic viewpoints",
  },
  {
    step: "5",
    color: "bg-[#0b74b1]",
    route: "Trou d'Eau Douce \u2192 \u00cele aux Cerfs",
    region: "EAST",
    stops: "\u00cele aux Cerfs · GRSE Waterfall \u2014 boat day",
  },
  {
    step: "6",
    color: "bg-[#236b56]",
    route: "Blue Bay \u2192 Gris Gris",
    region: "SOUTH",
    stops: "Blue Bay snorkel · Mahébourg · Gris Gris cliffs",
  },
  {
    step: "7",
    color: "bg-[#dfa12a]",
    route: "Grand Bassin \u2192 Black River Gorges",
    region: "INLAND",
    stops: "Sacred crater lake · gorge hikes & viewpoints",
  },
];
const TEN_DAYS_DRIVE_STOPS = [
  {
    step: "1",
    color: "bg-[#1596a4]",
    route: "Airport \u2192 Your resort",
    region: "NORTH",
    stops: "Settle in · first swim · sunset",
  },
  {
    step: "2",
    color: "bg-[#e25d18]",
    route: "Resort \u2192 Le Morne",
    region: "WEST",
    stops: "Casela park · Flic en Flac · Tamarin · Le Morne",
  },
  {
    step: "3",
    color: "bg-[#0b74b1]",
    route: "West coast \u2192 Blue Bay",
    region: "EAST",
    stops: "Blue Bay Marine Park · \u00cele aux Aigrettes",
  },
  {
    step: "4",
    color: "bg-[#2d855a]",
    route: "Coast \u2192 Highlands",
    region: "SOUTH-WEST",
    stops: "Seven Waterfalls or Black River Gorges",
  },
  {
    step: "5",
    color: "bg-[#236b56]",
    route: "Interior \u2192 Gris Gris",
    region: "SOUTH",
    stops: "La Vanille · Bel Ombre · Gris Gris · Natural Bridge",
  },
  {
    step: "6",
    color: "bg-[#dfa12a]",
    route: "Chamarel \u2192 Black River",
    region: "INLAND",
    stops: "7 Coloured Earth · Chamarel Falls · Rum Distillery",
  },
  {
    step: "7",
    color: "bg-[#0b74b1]",
    route: "Coast \u2192 \u00cele aux Cerfs",
    region: "EAST",
    stops: "\u00cele aux Cerfs · GRSE Waterfall · \u00cele de la Passe",
  },
  {
    step: "8",
    color: "bg-[#1596a4]",
    route: "Beaches \u2192 Port Louis",
    region: "NORTH",
    stops: "Central Market · Caudan · Aapravasi Ghat",
  },
  {
    step: "9",
    color: "bg-[#1596a4]",
    route: "Port Louis \u2192 Grand Baie",
    region: "NORTH",
    stops: "Mont Choisy · Trou aux Biches · Grand Baie · Pereybère",
  },
  {
    step: "10",
    color: "bg-[#e25d18]",
    route: "Resort \u2192 Airport",
    region: "WEST",
    stops: "Beach walk · spa · final swim before you fly",
  },
];
function ItineraryInfoIcon({ type }: { type: "taxi" | "car" }) {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={1.2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 14V11.8a2 2 0 0 1 1.4-1.9l2.2-.7 1.6-2.8A2 2 0 0 1 10.9 5h2.2a2 2 0 0 1 1.7.9l1.6 2.8 2.2.7A2 2 0 0 1 20 11.8V14"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 14h12v2.2a1.8 1.8 0 0 1-1.8 1.8H7.8A1.8 1.8 0 0 1 6 16.2V14Z"
      />
      <circle cx="8.5" cy="16" r="1" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="16" r="1" fill="currentColor" stroke="none" />
      {type === "taxi" ? (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.2 10.2h5.6M10.4 7.8h3.2"
        />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.7 10.2h8.6" />
      )}
    </svg>
  );
}

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
  headline: "Mauritius Itinerary: 3, 5, 7 & 10 Day Travel Plans (2026 Guide)",
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
              is designed to help you plan the perfect trip, whether you have 3
              days, 5 days, 1 week, or 10 days on the island. From white sandy
              beaches and turquoise lagoons to waterfalls, mountains, and
              cultural landmarks, Mauritius offers one of the most diverse
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
              reveals a wild and untouched coastline. A well-planned itinerary
              ensures you experience the best of each region without wasting
              time travelling back and forth. This guide helps you structure
              your days efficiently while linking to full detailed itineraries
              you can follow step by step.
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
              The ideal duration depends on your travel style. A short stay of 3
              days allows you to explore key highlights, while 5 days gives a
              more balanced mix of beaches and inland attractions. A 7-day
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
                        {g.days === 10 && "Ultimate itinerary with hidden gems"}
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
      <section className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl rounded-[26px] border border-[#eadbcf]  p-6 shadow-[0_18px_50px_rgba(31,24,19,0.06)] md:p-8">
            <h2 className="text-[2rem] font-extrabold leading-[1.12] tracking-[-0.03em] text-[#1d2433] md:text-[2.55rem]">
              The Ultimate 3-5-7-10 Day Trip
            </h2>
            <p className="mt-3 text-[13px] italic leading-6 text-[#6e645d] md:text-[14px]">
              Ten days, three regions - turquoise north, wild south and golden
              west, at an easy pace.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
              {[
                { value: "10", label: "Days" },
                { value: "3", label: "Regions" },
                { value: "~60%", label: "Coastline" },
                { value: "~40%", label: "Interior" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-[#eadfd7] bg-white px-4 py-4 text-center shadow-[0_6px_16px_rgba(31,24,19,0.04)]"
                >
                  <div className="text-[1.7rem] font-extrabold leading-none text-[#f26522]">
                    {item.value}
                  </div>
                  <div className="mt-2 text-[12px] tracking-[0.04em] text-[#9d938d]">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-6 max-w-4xl text-[14px] leading-7 text-[#433c39] md:text-[15px]">
              One island, four ready-made drives. Pick the length that fits your
              trip - each route builds on the last, so from three to ten days
              you still loop the island and cover its main regions. Follow the
              Drive Route pages for exact, day-by-day directions.
            </p>

            <div className="mt-7 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div>
                <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#f26522]">
                  Choose your trip length
                </p>
                <div className="mt-4 space-y-2.5">
                  {ROUTE_SUMMARY.map((route) => (
                    <div
                      key={route.days}
                      className="flex items-start gap-3 border-b border-[#e9ddd3] pb-2.5 last:border-b-0 last:pb-0"
                    >
                      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#f26522] text-[18px] font-extrabold text-white">
                        {route.days}
                      </span>
                      <div className="pt-0.5">
                        <h3 className="text-[1.05rem] font-extrabold leading-5 text-[#1d2433]">
                          {route.title}
                        </h3>
                        <p className="mt-1 text-[12.5px] leading-5 text-[#7a716b]">
                          {route.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-center justify-center pt-2">
                {/* <div className="relative h-[230px] w-full max-w-[245px]">
                  <svg
                    viewBox="0 0 240 220"
                    className="h-full w-full text-[#cfcfcf]"
                    aria-label="Stylised Mauritius island map"
                    role="img"
                  >
                    <path
                      fill="currentColor"
                      d="M134 12l7 3 6-4 8 3 4 7 8 2 4 6 7 2 3 7-1 8 6 4 4 7 6 3 3 8-1 8 4 6 1 8-3 8 2 7-2 8 3 7-2 8 2 8-4 7-1 8-5 6-3 7-8 2-2 8-8 2-5 6-8 2-5 6-8 1-6 5-9 1-7 4-8-2-7 3-8-2-7 2-8-4-7 1-7-4-7 1-5-6-8-1-5-6-8-2-3-8-7-2-1-8-6-5-1-8-4-7 1-8-3-7 2-8-2-8 3-7-1-8 4-7 1-8 5-6 2-7 7-3 3-8 8-2 4-6 8-2 4-7 8-2 5-5 8-1 6-5 8 1Z"
                    />
                    {[
                      { cx: 126, cy: 20 },
                      { cx: 214, cy: 88 },
                      { cx: 42, cy: 104 },
                      { cx: 66, cy: 183 },
                      { cx: 150, cy: 182 },
                    ].map((dot) => (
                      <circle
                        key={`${dot.cx}-${dot.cy}`}
                        cx={dot.cx}
                        cy={dot.cy}
                        r="4"
                        fill="#f26522"
                      />
                    ))}
                  </svg>
                </div> */}

                <Image
                  src="/images/map.png"
                  alt="Mauritius map route"
                  width={240}
                  height={240}
                  className="h-auto w-[240px] object-contain"
                />

                <p className="mt-2 text-center text-[12px] text-[#b6917f]">
                  Every route loops the island
                </p>
              </div>
            </div>

            <div className="mt-7 grid gap-3 md:grid-cols-2">
              <div className="rounded-xl border border-[#eadfd7] bg-white px-4 py-4 shadow-[0_6px_16px_rgba(31,24,19,0.04)]">
                <div className="flex items-start gap-3">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#f2e4d8] text-[#1b76c5]">
                    <ItineraryInfoIcon type="taxi" />
                  </span>
                  <div>
                    <h3 className="text-[1.02rem] font-extrabold text-[#1d2433]">
                      Taxi
                    </h3>
                    <p className="mt-1 text-[12.5px] leading-5 text-[#7a716b]">
                      Airport transfers & day driver hire.
                    </p>
                    <p className="mt-1.5 text-[12.5px] leading-5 text-[#f26522]">
                      Book - mauritiusexplored.com
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-[#eadfd7] bg-white px-4 py-4 shadow-[0_6px_16px_rgba(31,24,19,0.04)]">
                <div className="flex items-start gap-3">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#f2e4d8] text-[#1b76c5]">
                    <ItineraryInfoIcon type="car" />
                  </span>
                  <div>
                    <h3 className="text-[1.02rem] font-extrabold text-[#1d2433]">
                      Car Rental
                    </h3>
                    <p className="mt-1 text-[12.5px] leading-5 text-[#7a716b]">
                      15% Discount - use promo code MEXP26
                    </p>
                    <p className="mt-1.5 text-[12.5px] leading-5 text-[#f26522]">
                      Book - mauritiusexplored.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-xl bg-[#F5F3F0] px-5 py-5">
              <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#f26522]">
                Plan smart
              </p>
              <div className="mt-4 grid gap-x-7 gap-y-4 md:grid-cols-2">
                {PLAN_SMART_TIPS.map((tip) => (
                  <p
                    key={tip.title}
                    className="text-[13px] leading-6 text-[#493f39]"
                  >
                    <span className="font-extrabold text-[#1d2433]">
                      {tip.title}
                    </span>{" "}
                    - {tip.description}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 3 days Itineraries */}
      <section className="bg-white py-6 md:py-8">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl rounded-[26px] border border-[#eadbcf]  p-10 shadow-[0_18px_50px_rgba(31,24,19,0.06)] bg-white">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#f26522]">
              03 - Itineraries | Drive Route
            </p>
            <h2 className="mt-2 text-[2.15rem] font-extrabold leading-none tracking-[-0.03em] text-[#1c2432] md:text-[2.35rem]">
              3-Day{" "}
              <span className="font-medium italic text-[#f26522]">
                Drive Route
              </span>
            </h2>
            <p className="mt-5 max-w-3xl text-[14px] italic leading-6 text-[#413a36] md:text-[15px]">
              A short island lap - north beaches, the wild west, and the
              east-to-south coast, all by car.
            </p>

            <div className="relative mt-10 space-y-10 md:space-y-12">
              <div
                className="absolute bottom-5 left-[21px] top-5 w-px bg-[#eddccf]"
                aria-hidden="true"
              />
              {THREE_DAY_DRIVE_STOPS.map((item) => (
                <div
                  key={item.step}
                  className="relative grid grid-cols-[auto_1fr_auto] items-start gap-x-6 gap-y-2 md:gap-x-7 mb-20"
                >
                  <span
                    className={`relative z-10 mt-0.5 inline-flex h-11 w-11 items-center justify-center rounded-full text-[1.25rem] font-extrabold text-white ${item.color}`}
                  >
                    {item.step}
                  </span>
                  <div>
                    <h3 className="text-[1rem] font-semibold tracking-[-0.03em] text-[#1d2433] md:text-[1.25rem]">
                      {item.route}
                    </h3>
                    <p className="mt-1.5 text-[12px] leading-5 text-[#f26522] md:text-[13px]">
                      <span className="font-extrabold text-[#f26522]">
                        Stops
                      </span>{" "}
                      {item.stops}
                    </p>
                  </div>
                  <p className="pt-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-[#9a918c] md:text-[10px]">
                    {item.region}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-20 rounded-[10px] bg-[#f5f3f0] px-5 py-4 md:px-6 md:py-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#f26522]">
                On the road
              </p>
              <div className="mt-3 grid gap-x-8 gap-y-2 md:grid-cols-2">
                {THREE_DAY_ROAD_TIPS.map((tip) => (
                  <p
                    key={tip.title}
                    className="text-[11.5px] leading-5 text-[#4e453f] md:text-[12px]"
                  >
                    <span className="font-bold text-[#1d2433]">
                      - {tip.title}
                    </span>{" "}
                    - {tip.description}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 5 days Itineraries */}
      <section className="bg-white  py-6 md:py-8">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl rounded-[26px] border border-[#eadbcf]  p-10 shadow-[0_18px_50px_rgba(31,24,19,0.06)] bg-white">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#f26522]">
              03 - Itineraries | Drive Route
            </p>
            <h2 className="mt-2 text-[2.15rem] font-extrabold leading-none tracking-[-0.03em] text-[#1c2432] md:text-[2.35rem]">
              5 -Day{" "}
              <span className="font-medium italic text-[#f26522]">
                Drive Route
              </span>
            </h2>
            <p className="mt-5 max-w-3xl text-[14px] italic leading-6 text-[#413a36] md:text-[15px]">
              A balanced loop of beaches, nature, culture and a lagoon day —
              unhurried, one leg a day.
            </p>

            <div className="relative mt-10 space-y-10 md:space-y-12">
              <div
                className="absolute bottom-5 left-[21px] top-5 w-px bg-[#eddccf]"
                aria-hidden="true"
              />
              {FIVE_DAYS_DRIVE_STOPS.map((item) => (
                <div
                  key={item.step}
                  className="relative grid grid-cols-[auto_1fr_auto] items-start gap-x-6 gap-y-2 md:gap-x-7 mb-20"
                >
                  <span
                    className={`relative z-10 mt-0.5 inline-flex h-11 w-11 items-center justify-center rounded-full text-[1.25rem] font-extrabold text-white ${item.color}`}
                  >
                    {item.step}
                  </span>
                  <div>
                    <h3 className="text-[1rem] font-semibold tracking-[-0.03em] text-[#1d2433] md:text-[1.25rem]">
                      {item.route}
                    </h3>
                    <p className="mt-1.5 text-[12px] leading-5 text-[#f26522] md:text-[13px]">
                      <span className="font-extrabold text-[#f26522]">
                        Stops
                      </span>{" "}
                      {item.stops}
                    </p>
                  </div>
                  <p className="pt-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-[#9a918c] md:text-[10px]">
                    {item.region}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-20 rounded-[10px] bg-[#f5f3f0] px-5 py-4 md:px-6 md:py-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#f26522]">
                On the road
              </p>
              <div className="mt-3 grid gap-x-8 gap-y-2 md:grid-cols-2">
                {THREE_DAY_ROAD_TIPS.map((tip) => (
                  <p
                    key={tip.title}
                    className="text-[11.5px] leading-5 text-[#4e453f] md:text-[12px]"
                  >
                    <span className="font-bold text-[#1d2433]">
                      - {tip.title}
                    </span>{" "}
                    - {tip.description}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7 days Itineraries */}
      <section className="bg-white  py-6 md:py-8">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl rounded-[26px] border border-[#eadbcf]  p-10 shadow-[0_18px_50px_rgba(31,24,19,0.06)] bg-white">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#f26522]">
              03 - Itineraries | Drive Route
            </p>
            <h2 className="mt-2 text-[2.15rem] font-extrabold leading-none tracking-[-0.03em] text-[#1c2432] md:text-[2.35rem]">
              7 -Day{" "}
              <span className="font-medium italic text-[#f26522]">
                Drive Route
              </span>
            </h2>
            <p className="mt-5 max-w-3xl text-[14px] italic leading-6 text-[#413a36] md:text-[15px]">
              The complete island lap — every coast, waterfalls, an island boat
              day and the inland highlands.
            </p>

            <div className="relative mt-10 space-y-10 md:space-y-12">
              <div
                className="absolute bottom-5 left-[21px] top-5 w-px bg-[#eddccf]"
                aria-hidden="true"
              />
              {SEVEN_DAYS_DRIVE_STOPS.map((item) => (
                <div
                  key={item.step}
                  className="relative grid grid-cols-[auto_1fr_auto] items-start gap-x-6 gap-y-2 md:gap-x-7 mb-10"
                >
                  <span
                    className={`relative z-10 mt-0.5 inline-flex h-11 w-11 items-center justify-center rounded-full text-[1.25rem] font-extrabold text-white ${item.color}`}
                  >
                    {item.step}
                  </span>
                  <div>
                    <h3 className="text-[1rem] font-semibold tracking-[-0.03em] text-[#1d2433] md:text-[1.25rem]">
                      {item.route}
                    </h3>
                    <p className="mt-1.5 text-[12px] leading-5 text-[#f26522] md:text-[13px]">
                      <span className="font-extrabold text-[#f26522]">
                        Stops
                      </span>{" "}
                      {item.stops}
                    </p>
                  </div>
                  <p className="pt-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-[#9a918c] md:text-[10px]">
                    {item.region}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* 10 days Itineraries */}
      <section className="bg-white py-6 md:py-8">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl rounded-[26px] border border-[#eadbcf]  p-10 shadow-[0_18px_50px_rgba(31,24,19,0.06)] bg-white">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#f26522]">
              03 - Itineraries | Drive Route
            </p>
            <h2 className="mt-2 text-[2.15rem] font-extrabold leading-none tracking-[-0.03em] text-[#1c2432] md:text-[2.35rem]">
              10 -Day{" "}
              <span className="font-medium italic text-[#f26522]">
                Drive Route
              </span>
            </h2>
            <p className="mt-5 max-w-3xl text-[14px] italic leading-6 text-[#413a36] md:text-[15px]">
              The full island at an easy pace — coast to interior and back,
              discovering one region a day.
            </p>

            <div className="relative mt-10 space-y-10 md:space-y-12">
              <div
                className="absolute bottom-5 left-[21px] top-5 w-px bg-[#eddccf]"
                aria-hidden="true"
              />
              {TEN_DAYS_DRIVE_STOPS.map((item) => (
                <div
                  key={item.step}
                  className="relative grid grid-cols-[auto_1fr_auto] items-start gap-x-6 gap-y-2 md:gap-x-7 mb-8"
                >
                  <span
                    className={`relative z-10 mt-0.5 inline-flex h-11 w-11 items-center justify-center rounded-full text-[1.25rem] font-extrabold text-white ${item.color}`}
                  >
                    {item.step}
                  </span>
                  <div>
                    <h3 className="text-[1rem] font-semibold tracking-[-0.03em] text-[#1d2433] md:text-[1.25rem]">
                      {item.route}
                    </h3>
                    <p className="mt-1.5 text-[12px] leading-5 text-[#f26522] md:text-[13px]">
                      <span className="font-extrabold text-[#f26522]">
                        Stops
                      </span>{" "}
                      {item.stops}
                    </p>
                  </div>
                  <p className="pt-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-[#9a918c] md:text-[10px]">
                    {item.region}
                  </p>
                </div>
              ))}
            </div>
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
              offer. Whether you are staying for a few days or more than a week,
              these itineraries provide a clear structure to maximize your
              experience. By following these travel plans and exploring each
              region, you will enjoy a perfect balance of beaches, nature,
              culture, and adventure in one unforgettable destination.
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
              Pick beaches, activities and places — see your route on the map,
              then save and share your trip.
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
