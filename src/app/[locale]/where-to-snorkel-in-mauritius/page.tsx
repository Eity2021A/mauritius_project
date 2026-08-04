import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PopularRoadTrips from "@/components/PopularRoadTrips";
import { Link } from "@/i18n/navigation";
import { localizeStaticPage } from "@/lib/static-page-localizer";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import {
  Anchor,
  Compass,
  Fish,
  MapPin,
  Sailboat,
  ShieldCheck,
  Shell,
  Waves,
} from "lucide-react";
import CarRentalAdBannerInfo from "@/components/CarRentalAdBannerInfo";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Where to Snorkel in Mauritius",
  description:
    "Where to snorkel in Mauritius — the island's clearest lagoons and coral reefs, from Blue Bay to Trou aux Biches. The best spots, marine life and top tips.",
  alternates: { canonical: "/where-to-snorkel-in-mauritius" },
};
const ad = {
  desktopSrc: "/images/quick-trips/Snorkelling-in-Mauritius.webp",
  href: "/blog/best-snorkelling-spots-in-mauritius",
  alt: "Snorkelling in Mauritius",
};

type SnorkelRegion = "North" | "West & South-West" | "East & South";

const snorkelRegions: [SnorkelRegion, string][] = [
  ["North", "#2389c9"],
  ["West & South-West", "#f16522"],
  ["East & South", "#2f8e48"],
];

const snorkelRegionStyles: Record<
  SnorkelRegion,
  { color: string; bg: string }
> = {
  North: { color: "#2389c9", bg: "#eaf7ff" },
  "West & South-West": { color: "#f16522", bg: "#fff0e7" },
  "East & South": { color: "#2f8e48", bg: "#edf8ef" },
};

const snorkelSpots: {
  name: string;
  tag: string;
  region: string;
  type: SnorkelRegion;
  description: string;
  tip: string;
  icon: LucideIcon;
}[] = [
  {
    name: "Blue Bay Marine Park",
    tag: "Marine Park",
    region: "South",
    type: "East & South",
    description: "Clear, protected water with rich coral & tropical fish.",
    tip: "All levels - glass-bottom boat tours available.",
    icon: Fish,
  },
  {
    name: "Ile aux Cerfs",
    tag: "Island Lagoon",
    region: "East",
    type: "East & South",
    description: "A crystal-clear lagoon reached by boat trip.",
    tip: "Included in most catamaran day excursions.",
    icon: Sailboat,
  },
  {
    name: "Le Morne Brabant",
    tag: "Calm Lagoon",
    region: "South-West",
    type: "West & South-West",
    description: "Shallow, calm lagoon with coral under the mountain.",
    tip: "Quieter than the north; pair with beach time.",
    icon: Waves,
  },
  {
    name: "Flic en Flac",
    tag: "Shore Reef",
    region: "West",
    type: "West & South-West",
    description: "A reef a short swim from shore, with easy access.",
    tip: "Great for beginners - go early before the wind.",
    icon: Anchor,
  },
  {
    name: "Belle Mare",
    tag: "Hidden Reef",
    region: "East",
    type: "East & South",
    description: "Calm east-coast lagoon with quiet, hidden reefs.",
    tip: "Peaceful & uncrowded - ideal for a relaxed swim.",
    icon: Waves,
  },
  {
    name: "Bel Ombre",
    tag: "Unspoiled Coast",
    region: "South",
    type: "East & South",
    description: "Unspoiled south coast with good marine life.",
    tip: "Less-crowded & authentic; calm, clear water.",
    icon: Fish,
  },
  {
    name: "Balaclava Marine Park",
    tag: "Marine Park",
    region: "North-West",
    type: "North",
    description: "Good coral formations with easy access from shore.",
    tip: "Lesser-known - handy from north-west hotels.",
    icon: Anchor,
  },
  {
    name: "Coin de Mire",
    tag: "Offshore Islet",
    region: "North",
    type: "North",
    description: "Incredible clear water & diverse marine life.",
    tip: "Boat access only - join a guided excursion.",
    icon: Sailboat,
  },
  {
    name: "Ile Plate (Flat Island)",
    tag: "Remote Islet",
    region: "North",
    type: "North",
    description: "Remote, untouched & exceptionally clear coral.",
    tip: "Full-day boat trip; best in calm seas.",
    icon: Compass,
  },
];

const snorkelSpotLinks: Record<string, string> = {
  "Blue Bay Marine Park":
    "/best-places-to-visit-in-mauritius/blue-bay-marine-park",
  "Ile aux Cerfs": "/best-places-to-visit-in-mauritius/ile-aux-cerfs",
  "Le Morne Brabant": "/beaches-in-mauritius/le-morne",
  "Flic en Flac": "/beaches-in-mauritius/flic-en-flac",
  "Belle Mare": "/beaches-in-mauritius/belle-mare",
  "Bel Ombre": "/beaches-in-mauritius/bel-ombre",
  "Balaclava Marine Park": "/beaches-in-mauritius/balaclava",
  "Ile Plate (Flat Island)": "/beaches-in-mauritius/ilot-gabriel-ile-plate",
};

const snorkelTips: {
  title: string;
  text: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Best season",
    text: "Oct-Apr brings warmer water & calmer seas; sunrise early for clarity.",
    icon: Compass,
  },
  {
    title: "Reef etiquette",
    text: "Never touch coral or marine life; reef-safe sunscreen only.",
    icon: ShieldCheck,
  },
  {
    title: "Come prepared",
    text: "Wear fins for easy movement; check the weather & sea before you go.",
    icon: Waves,
  },
];

export default async function WhereToSnorkelnMauritiusPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return localizeStaticPage(
    <main id="main-content" className="min-h-screen bg-white text-[#1c2a2e]">
      <Navbar />
      <article className="mx-auto w-full max-w-6xl pt-24 pb-10 sm:px-6 lg:pt-28">
        <header>
          <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] font-semibold uppercase tracking-wide text-[#ec5f25]">
            <div></div>
            <p>Snorkel - Reefs</p>
          </div>

          <p className="mt-7 text-xs font-bold uppercase tracking-wide text-[#f16522]">
            Lagoons &amp; Coral Reefs
          </p>
          <h1 className="mt-2 font-serif text-[clamp(2.1rem,5vw,3.55rem)] font-bold leading-tight tracking-tight text-[#151f2b]">
            Where to Snorkel{" "}
            <span className="font-normal italic text-[#f16522]">
              in Mauritius
            </span>
          </h1>
          <p className="mt-4 max-w-4xl font-serif text-sm italic leading-relaxed text-[#6f7e88] sm:text-base">
            Nine of the island&apos;s clearest lagoons and reefs - from shallow
            beginner bays to remote offshore islets teeming with coral and
            tropical fish.
          </p>

          <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-xs text-[#445465]">
            {snorkelRegions.map(([label, color]) => (
              <span key={label} className="inline-flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: color }}
                />
                {label}
              </span>
            ))}
          </div>
        </header>

        <section className="mt-6 grid gap-3 md:grid-cols-2">
          {snorkelSpots.map((spot) => {
            const SpotIcon = spot.icon;
            const style = snorkelRegionStyles[spot.type];
            const href = snorkelSpotLinks[spot.name];
            const cardClassName =
              "flex gap-4 rounded-md border border-[#e7dfd6] bg-white px-4 py-4 shadow-[0_2px_7px_rgba(36,54,67,.035)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(36,54,67,.08)] sm:gap-5 sm:px-5";
            const cardContent = (
              <>
                <span
                  className="mt-1 grid h-12 w-12 shrink-0 place-items-center rounded-full"
                  style={{ backgroundColor: style.bg, color: style.color }}
                >
                  <SpotIcon className="h-6 w-6" strokeWidth={1.8} />
                </span>
                <div className="min-w-0">
                  <h2 className="font-serif text-lg font-bold leading-tight text-[#152738] sm:text-xl">
                    {spot.name}
                  </h2>
                  <p
                    className="mt-1 text-[10px] font-bold uppercase tracking-wide"
                    style={{ color: style.color }}
                  >
                    {spot.tag}{" "}
                    <span className="normal-case tracking-normal text-[#8a9398]">
                      - {spot.region}
                    </span>
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-[#61707a] sm:text-sm">
                    {spot.description}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-[#61707a] sm:text-sm">
                    <strong className="font-serif text-[#f16522]">Tip</strong>{" "}
                    {spot.tip}
                  </p>
                </div>
              </>
            );

            return href ? (
              <Link
                key={spot.name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={cardClassName}
              >
                {cardContent}
              </Link>
            ) : (
              <section key={spot.name} className={cardClassName}>
                {cardContent}
              </section>
            );
          })}
        </section>

        <section
          className="bg-white py-3 md:py-5 dark:border-neutral-800 dark:bg-neutral-900"
          aria-label="Sponsored highlights"
        >
          <div className="container mx-auto max-w-7xl">
            <div className="relative overflow-hidden rounded-xl bg-[#052028] shadow-sm ring-1 ring-gray-200 dark:ring-neutral-700">
              <a
                href={ad.href}
                className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
              >
                <span className="relative block aspect-[1200/260] w-full">
                  <Image
                    src={ad.desktopSrc}
                    alt={ad.alt}
                    fill
                    sizes="(max-width: 1280px) 100vw, 1280px"
                    className="rounded-xl object-cover"
                    loading="lazy"
                  />
                </span>
              </a>
            </div>
          </div>
        </section>
        <section className="mt-8 rounded-md bg-[#f5f2ef] px-5 py-6 sm:px-7">
          <h2 className="font-serif text-xl font-bold text-[#f16522]">
            Snorkel smart
          </h2>
          <div className="mt-4 grid gap-5 md:grid-cols-3">
            {snorkelTips.map(({ title, text, icon: Icon }) => (
              <div key={title} className="flex items-start gap-3">
                <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full  text-[#2389c9]">
                  <Icon className="h-6 w-6" strokeWidth={1.9} />
                </span>
                <div>
                  <p className="text-sm leading-relaxed text-[#61707a] ">
                    <strong className="font-serif text-[#1d3144]">
                      {title}
                    </strong>
                  </p>
                  <p className="text-xs">{text}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-5 font-serif text-sm italic leading-6 text-[#77848e]">
            Look for parrotfish, angelfish and clownfish - and, if you&apos;re
            lucky, a passing sea turtle.
          </p>
        </section>
      </article>
      <CarRentalAdBannerInfo />
      <PopularRoadTrips locale={locale} />

      <Footer />
    </main>,
    locale,
  );
}
