import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HiddenGems from "@/components/HiddenGems";
import PopularRoadTrips from "@/components/PopularRoadTrips";
import { Link } from "@/i18n/navigation";
import type { LucideIcon } from "lucide-react";
import {
  Coffee,
  Flower2,
  Home,
  Landmark,
  Leaf,
  MapPin,
  Mountain,
  Shirt,
  ShoppingBag,
} from "lucide-react";
import { getRegionGuide } from "@/data/quick-guide-translations";
import CarRentalAdBanner from "@/components/CarRentalAdBanner";
import { localizeStaticPage } from "@/lib/static-page-localizer";
import { normalizeLocale } from "@/i18n/routing";

export const revalidate = 3600;

export const legacyMetadata: Metadata = {
  title: "Central Mauritius Travel Guide",
  description:
    "Central Mauritius travel guide — the island's cool green heart: craters, highland forests, Grand Bassin and heritage towns. What to see, do and explore.",
  alternates: { canonical: "/central-mauritius-travel-guide" },
};

const centralPlaces: {
  name: string;
  text: string;
  href?: string;
  icon: LucideIcon;
  color: string;
  bg: string;
}[] = [
  {
    name: "Trou aux Cerfs",
    text: "A dormant volcanic crater with a lake & wide views.",
    href: "/best-places-to-visit-in-mauritius/trou-aux-cerfs",
    icon: Mountain,
    color: "#56ae64",
    bg: "#edf8ef",
  },
  {
    name: "Le Pouce & Pieter Both",
    text: "The thumb peak & balanced-rock summit - classic hikes.",
    href: "/top-activities-mauritius/hiking-le-pouce-mauritius-scenic-mountain-hike-with-port-louis-views",
    icon: Mountain,
    color: "#56ae64",
    bg: "#edf8ef",
  },
  {
    name: "Tamarind Falls / 7-Cascades",
    text: "The island's highest falls - hiking & canyoning.",
    href: "/best-places-to-visit-in-mauritius/seven-waterfall",
    icon: Landmark,
    color: "#4aa6d3",
    bg: "#eaf7ff",
  },
  {
    name: "Eureka House",
    text: "An 1836 Creole mansion of 109 doors, with gardens.",
    href: "/best-places-to-visit-in-mauritius/eureka-house",
    icon: Home,
    color: "#ef8a54",
    bg: "#fff0e7",
  },
  {
    name: "Curepipe",
    text: "Cool highland town - colonial charm & a botanic garden.",
    href: "/best-places-to-visit-in-mauritius/curepipe-market",
    icon: Leaf,
    color: "#56ae64",
    bg: "#edf8ef",
  },
  {
    name: "Quatre Bornes",
    text: "The town of flowers & its lively textile market.",
    icon: ShoppingBag,
    color: "#51a9d6",
    bg: "#eaf7ff",
  },
  {
    name: "Floreal",
    text: "Cashmere, fine textiles & model-ship workshops.",
    icon: Shirt,
    color: "#ef8a54",
    bg: "#fff0e7",
  },
  {
    name: "Domaine des Aubineaux",
    text: "A shuttered colonial manor on the island's Tea Route.",
    icon: Coffee,
    color: "#ef8a54",
    bg: "#fff0e7",
  },
];

const centralDriveTimes = [
  ["Airport", "Curepipe", "40-55 min"],
  ["Port Louis", "Moka", "20-30 min"],
  ["Port Louis", "Curepipe", "35-50 min"],
  ["Grand Baie", "Quatre Bornes", "1-1.5 h"],
];

const centralDaySteps: {
  number: string;
  title: string;
  text: string;
  icon: LucideIcon;
}[] = [
  {
    number: "1",
    title: "Trou aux Cerfs",
    text: "walk the volcano crater",
    icon: Mountain,
  },
  {
    number: "2",
    title: "Eureka House",
    text: "Moka mansion & gardens",
    icon: Home,
  },
  {
    number: "3",
    title: "Quatre Bornes",
    text: "the textile market",
    icon: ShoppingBag,
  },
  {
    number: "4",
    title: "Curepipe",
    text: "botanic garden & town",
    icon: Flower2,
  },
];

const centralHiddenGemSlugs = [
  "hiking-seven-waterfalls-mauritius",
  "mauritius-local-food-guide",
  "exploring-chamarel-mauritius",
  "nature-reserves-and-parks-mauritius",
] as const;

const centralHiddenGemHrefs = [
  "https://www.mauritiusexplored.com/blog/hiking-seven-waterfalls-mauritius",
  "https://www.mauritiusexplored.com/blog/mauritius-local-food-guide",
  "https://www.mauritiusexplored.com/blog/exploring-chamarel-mauritius",
  "https://www.mauritiusexplored.com/blog/nature-reserves-and-parks-mauritius",
] as const;

const centralGettingAroundLinks = [
  { label: "Car Rental", href: "/car-rental-mauritius" },
  { label: "Transfer", href: "/mauritius-transfer-airport-hotel" },
  { label: "Taxi", href: "/mauritius-taxi" },
  {
    label: "Boat Operators",
    href: "/top-activities-mauritius/le-morne-discovery-full-day-excursion-ile-aux-benitiers",
  },
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const activeLocale = normalizeLocale(locale);
  const t = getRegionGuide(activeLocale, "central");
  return {
    title: t.metadata.title,
    description: t.metadata.description,
    alternates: { canonical: "/central-mauritius-travel-guide" },
  };
}

export default async function CentralMauritiusTravelGuidePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const activeLocale = normalizeLocale(locale);
  const t = getRegionGuide(activeLocale, "central");
  const translatedPlaces = centralPlaces.map((place, index) => ({
    ...place,
    ...t.places[index],
  }));
  const translatedSteps = centralDaySteps.map((step, index) => ({
    ...step,
    ...t.steps[index],
  }));
  return localizeStaticPage((
    <main id="main-content" className="min-h-screen bg-white text-[#1c2a2e]">
      <Navbar />

      <article className="mx-auto w-full max-w-6xl px-4 pt-24 pb-10 sm:px-6 lg:pt-28 xl:px-0">
        <header>
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
                  <div key={place.name} className="mb-8 flex gap-4">
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
                src="/images/quick-trips/central_map.png"
                alt={t.mapAlt}
                width={970}
                height={1144}
                className="h-auto w-full"
                priority
              />
              <figcaption className="-mt- 6 text-center font-serif text-xs italic text-[#8a8f91]">
                {t.mapCaption}
              </figcaption>
            </figure>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <section className="rounded-md bg-[#f5f2ef] px-5 py-5">
                <h2 className="font-serif text-xl font-bold text-[#f16522]">
                  {t.driveTimesTitle}
                </h2>
                <div className="mt-3 space-y-2 text-xs leading-relaxed text-[#61707a]">
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
                <p className="mt-3 text-[13px] leading-relaxed text-[#61707a]">
                  {t.goodToKnow}
                </p>
              </section>
            </div>
          </div>
        </section>
        <HiddenGems
          featuredSlugs={centralHiddenGemSlugs}
          featuredHrefs={centralHiddenGemHrefs}
          locale={activeLocale}
        />
        <section className="mt-4 grid gap-4 rounded-md bg-[#f5f2ef] px-5 py-5 md:grid-cols-2 md:px-7">
          <div className="md:border-r md:border-[#ded6cf] md:pr-7">
            <h2 className="font-serif text-xl font-bold text-[#f16522]">
              {t.gettingAroundTitle}
            </h2>
            <ul className="mt-3 space-y-1.5 text-xs leading-relaxed text-[#61707a] sm:text-sm">
              {t.gettingAround.map(([label, text], index) => {
                const link = centralGettingAroundLinks[index];

                return (
                  <li key={label} className="flex items-center gap-2">
                    <span
                      className="h-2 w-2 rounded-full "
                      style={{ backgroundColor: "#f16522" }}
                    ></span>
                    {link ? (
                      <Link
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-[#1d3144] transition hover:text-[#f16522]"
                      >
                        {label}
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
            {translatedSteps.map(({ number, title, text, icon: Icon }) => (
              <div key={number} className="flex items-start gap-3">
                <span className="relative grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#f16522] font-serif text-sm font-bold text-white">
                  {number}
                  {/* <Icon className="absolute -right-1 -bottom-1 h-3 w-3 rounded-full bg-white p-0.5 text-[#f16522]" /> */}
                </span>
                <div>
                  <h3 className="font-serif text-sm font-bold text-[#1d3144]">
                    {title}
                  </h3>
                  <p className="text-[11px] leading-snug text-[#6b747b] sm:text-xs">
                    {text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </article>
        <CarRentalAdBanner />
      <PopularRoadTrips locale={activeLocale} />
      <Footer />
    </main>
  ), activeLocale);
}
