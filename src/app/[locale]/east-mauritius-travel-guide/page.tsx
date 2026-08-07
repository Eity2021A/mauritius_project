import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HiddenGems from "@/components/HiddenGems";
import PopularRoadTrips from "@/components/PopularRoadTrips";
import { Link } from "@/i18n/navigation";
import type { LucideIcon } from "lucide-react";
import {
  Landmark,
  Leaf,
  MapPin,
  Sailboat,
  ShipWheel,
  ShoppingBag,
  Sunrise,
  TreePalm,
  Utensils,
  Waves,
} from "lucide-react";
import Image from "next/image";
import { getRegionGuide } from "@/data/quick-guide-translations";
import PocketAdBanner from "@/components/PocketAdBanner";
import CarRentalAdBanner from "@/components/CarRentalAdBanner";
import { localizeStaticPage } from "@/lib/static-page-localizer";
import { normalizeLocale } from "@/i18n/routing";

export const revalidate = 3600;

export const legacyMetadata: Metadata = {
  title: "East Mauritius Travel Guide",
  description:
    "East Mauritius travel guide — powder-white beaches, calm sunrise lagoons and Ile aux Cerfs. The best of Belle Mare, Trou d'Eau Douce and the east coast.",
  alternates: { canonical: "/east-mauritius-travel-guide" },
};

const eastPlaces: {
  name: string;
  text: string;
  href?: string;
  icon: LucideIcon;
  color: string;
  bg: string;
}[] = [
  {
    name: "Belle Mare",
    text: "10 km of white sand & luxury beach resorts.",
    href: "/beaches-in-mauritius/belle-mare",
    icon: Sunrise,
    color: "#3da8da",
    bg: "#eaf7ff",
  },
  {
    name: "Ile aux Cerfs",
    text: "Turquoise island of watersports & golf, by boat.",
    href: "/best-places-to-visit-in-mauritius/ile-aux-cerfs",
    icon: Sailboat,
    color: "#51a9d6",
    bg: "#eaf7ff",
  },
  {
    name: "Trou d'Eau Douce",
    text: "Lively village & launch point for island cruises.",
    href: "/beaches-in-mauritius/trou-deau-douce",
    icon: MapPin,
    color: "#55ae69",
    bg: "#edf8ef",
  },
  {
    name: "GRSE Waterfall",
    text: "Cruise up through mangroves to a coastal fall.",
    href: "/best-places-to-visit-in-mauritius/grse-waterfall",
    icon: Landmark,
    color: "#4aa6d3",
    bg: "#eaf7ff",
  },
  {
    name: "Palmar",
    text: "Quiet, design-led boutique beaches.",
    href: "/beaches-in-mauritius/palmar-beach",
    icon: TreePalm,
    color: "#68b86d",
    bg: "#edf8ef",
  },
  {
    name: "Poste Lafayette",
    text: "Wild, windswept coast of black lava & lagoon.",
    icon: Waves,
    color: "#ef8a54",
    bg: "#fff0e7",
  },
  {
    name: "Bras d'Eau National Park",
    text: "Forest trails & birdwatching off the sand.",
    href: "/beaches-in-mauritius/bras-deau",
    icon: Leaf,
    color: "#56ae64",
    bg: "#edf8ef",
  },
  {
    name: "Centre de Flacq Market",
    text: "The region's big, authentic local market.",
    icon: ShoppingBag,
    color: "#ef8a54",
    bg: "#fff0e7",
  },
];

const eastDriveTimes = [
  ["Airport", "Belle Mare", "1-1.5 h"],
  ["Airport", "Trou d'Eau Douce", "1.5 h"],
  ["Grand Baie", "Belle Mare", "1-1.5 h"],
  ["Port Louis", "Belle Mare", "1-1.5 h"],
];

const eastDaySteps: {
  number: string;
  title: string;
  text: string;
  icon: LucideIcon;
}[] = [
  {
    number: "1",
    title: "Sunrise walk",
    text: "on Belle Mare beach",
    icon: Sunrise,
  },
  {
    number: "2",
    title: "Cruise out",
    text: "from Trou d'Eau Douce",
    icon: ShipWheel,
  },
  {
    number: "3",
    title: "Ile aux Cerfs",
    text: "& GRSE Waterfall",
    icon: Sailboat,
  },
  {
    number: "4",
    title: "Sunset dinner",
    text: "back at the resort",
    icon: Utensils,
  },
];

const eastHiddenGemSlugs = [
  "east-mauritius-travel-guide",
  "best-restaurants-in-east-mauritius-2026-guide",
  "10-beaches-to-visit-in-mauritius",
  "best-snorkelling-spots-in-mauritius",
] as const;

const eastHiddenGemHrefs = [
  "https://www.mauritiusexplored.com/blog/east-mauritius-travel-guide",
  "https://www.mauritiusexplored.com/blog/best-restaurants-in-east-mauritius-2026-guide",
  "https://www.mauritiusexplored.com/blog/10-beaches-to-visit-in-mauritius",
  "https://www.mauritiusexplored.com/blog/best-snorkelling-spots-in-mauritius",
] as const;

const eastGettingAroundLinks = [
  { label: "Car Rental", href: "/car-rental-mauritius" },
  { label: "Transfer", href: "/mauritius-transfer-airport-hotel" },
  {
    label: "Boat Operators",
    href: "/top-activities-mauritius/le-morne-discovery-full-day-excursion-ile-aux-benitiers",
  },
  { label: "Taxi", href: "/mauritius-taxi" },
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const activeLocale = normalizeLocale(locale);
  const t = getRegionGuide(activeLocale, "east");
  return {
    title: t.metadata.title,
    description: t.metadata.description,
    alternates: { canonical: "/east-mauritius-travel-guide" },
  };
}

export default async function EastMauritiusTravelGuidePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const activeLocale = normalizeLocale(locale);
  const t = getRegionGuide(activeLocale, "east");
  const translatedPlaces = eastPlaces.map((place, index) => ({
    ...place,
    ...t.places[index],
  }));
  const translatedSteps = eastDaySteps.map((step, index) => ({
    ...step,
    ...t.steps[index],
  }));
  return localizeStaticPage((
    <main id="main-content" className="min-h-screen bg-white text-[#1c2a2e]">
      <Navbar />

      <article className="mx-auto w-full max-w-6xl px-4 pt-24 pb-10 sm:px-6 lg:pt-28 xl:px-0">
        <header>
          {/* <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] font-semibold uppercase tracking-wide text-[#ec5f25]">
            <div className="flex items-center gap-2 normal-case tracking-normal">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[#f16522] text-white">
                <MapPin className="h-4 w-4 fill-white" strokeWidth={2} />
              </span>
              <span className="border-b border-[#f16522] text-[13px] font-bold text-[#1d3144]">
                Mauritius<span className="text-[#f16522]">Explored</span>
              </span>
            </div>
            <p>Regional Guide - East</p>
          </div> */}

          <p className="mt-7 text-xs font-bold uppercase tracking-wide text-[#f16522]">
            {t.kicker}
          </p>
          <h1 className="mt-2 font-serif text-[clamp(2rem,5vw,3.4rem)] font-bold leading-tight tracking-tight text-[#151f2b]">
            {t.titlePrefix}{" "}
            <span className="font-normal italic text-[#f16522]">
              {t.titleEmphasis}
            </span>
          </h1>
          <p className="mt-4 max-w-4xl font-serif text-sm italic leading-relaxed text-[#6f7e88] sm:text-base">
            {t.intro}
          </p>
        </header>

        <section className="mt-9 grid gap-7 lg:grid-cols-[1fr_.98fr] lg:items-start">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#ef5e25]">
              {t.whereToGo}
            </h2>
            <div className="mt-4 space-y-4">
              {translatedPlaces.map((place) => {
                const PlaceIcon = place.icon;

                return (
                  <div key={place.name} className="flex gap-4 mb-8">
                    <span
                      className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full"
                      style={{ backgroundColor: place.bg, color: place.color }}
                    >
                      <PlaceIcon className="h-5 w-5" strokeWidth={1.8} />
                    </span>
                    <div className="pt-0.5">
                      <h3 className="font-serif text-lg font-bold leading-none text-[#1b2d3c]">
                        {place.href ? (
                          <Link
                            href={place.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition hover:text-[#f16522]"
                          >
                            {place.name}
                          </Link>
                        ) : (
                          place.name
                        )}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-[#65737d] sm:text-sm">
                        {place.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid gap-4">
            <figure className="mx-auto w-full max-w-[400px]">
              <Image
                src="/images/quick-trips/east-mauritious-map.png"
                alt={t.mapAlt}
                width={620}
                height={302}
                className="h-auto w-full"
                priority
              />
              <figcaption className="-mt-3 text-center font-serif text-xs italic text-[#8a8f91]">
                {t.mapCaption}
              </figcaption>
            </figure>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <section className="rounded-md bg-[#f5f2ef] px-5 py-5">
                <h2 className="font-serif text-xl font-bold text-[#f16522]">
                  {t.driveTimesTitle}
                </h2>
                <div className="mt-3 space-y-2 text-xs leading-relaxed text-[#61707a] ">
                  {t.driveTimes.map(([from, to, time]) => (
                    <p
                      key={`${from}-${to}`}
                      className="flex flex-wrap items-center gap-x-1"
                    >
                      <span>{from}</span>
                      <span className="text-[#f16522]">-&gt;</span>
                      <span>{to}</span>
                      <strong className="text-[#233645]">{time}</strong>
                    </p>
                  ))}
                </div>
              </section>

              <section className="rounded-md bg-[#f5f2ef] px-5 py-5">
                <h2 className="font-serif text-xl font-bold text-[#f16522]">
                  {t.goodToKnowTitle}
                </h2>
                <p className="mt-3 text-xs leading-relaxed text-[#61707a] ">
                  {t.goodToKnow}
                </p>
              </section>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-4 rounded-md bg-[#f5f2ef] px-5 py-5 md:grid-cols-2 md:px-7">
          <div className="md:border-r md:border-[#ded6cf] md:pr-7">
            <h2 className="font-serif text-xl font-bold text-[#f16522]">
              {t.gettingAroundTitle}
            </h2>
            <ul className="mt-3 space-y-1.5 text-xs leading-relaxed text-[#61707a] sm:text-sm">
              {t.gettingAround.map(([label, text], index) => {
                const link = eastGettingAroundLinks[index];

                return (
                  <li key={label}>
                    {link ? (
                      <Link
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-[#1d3144] transition hover:text-[#f16522]"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <strong className="text-[#1d3144]">{label}</strong>
                    )}{" "}
                    - {text}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="md:pl-3">
            <h2 className="font-serif text-xl font-bold text-[#f16522]">
              {t.bestForTitle}
            </h2>
            <p className="mt-3 text-xs leading-relaxed text-[#61707a] sm:text-sm">
              {t.bestFor}
            </p>
          </div>
        </section>

        <section className="mt-8 rounded-md bg-[#fff0e7] px-5 py-5 sm:px-7">
          <h2 className="font-serif text-xl font-bold text-[#f16522]">
            {t.perfectDayTitle}
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {translatedSteps.map((step) => {
              const StepIcon = step.icon;

              return (
                <div key={step.number} className="flex items-start gap-3">
                  <span className="relative grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#f16522] font-serif text-sm font-bold text-white">
                    {step.number}
                    {/* <StepIcon className="absolute -right-1 -bottom-1 h-3 w-3 rounded-full bg-white p-0.5 text-[#f16522]" /> */}
                  </span>
                  <div>
                    <h3 className="font-serif text-sm font-bold text-[#1d3144]">
                      {step.title}
                    </h3>
                    <p className="text-[11px] leading-snug text-[#6b747b] sm:text-xs">
                      {step.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        <HiddenGems
          featuredSlugs={eastHiddenGemSlugs}
          featuredHrefs={eastHiddenGemHrefs}
        />
      </article>
      <CarRentalAdBanner />
      <PopularRoadTrips locale={activeLocale} />
      <PocketAdBanner />
      <Footer />
    </main>
  ), activeLocale);
}
