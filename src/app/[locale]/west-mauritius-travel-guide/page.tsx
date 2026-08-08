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
  Mountain,
  Sailboat,
  ShipWheel,
  TreePalm,
  Utensils,
  Waves,
} from "lucide-react";
import Image from "next/image";
import { getRegionGuide } from "@/data/quick-guide-translations";
import CarRentalAdBanner from "@/components/CarRentalAdBanner";
import PocketAdBanner from "@/components/PocketAdBanner";
import { localizeStaticPage } from "@/lib/static-page-localizer";
import { normalizeLocale } from "@/i18n/routing";

export const revalidate = 3600;

export const legacyMetadata: Metadata = {
  title: "West Mauritius Travel Guide",
  description:
    "West Mauritius travel guide — dramatic mountains, world-class surf and the island's most famous sunsets. Discover Flic en Flac, Tamarin and Le Morne.",
  alternates: { canonical: "/west-mauritius-travel-guide" },
};

const westPlaces: {
  name: string;
  text: string;
  href?: string;
  icon: LucideIcon;
  color: string;
  bg: string;
}[] = [
  {
    name: "Flic en Flac",
    text: "The west's main base - long beach, calm lagoon & sunsets.",
    href: "/beaches-in-mauritius/flic-en-flac",
    icon: TreePalm,
    color: "#3da8da",
    bg: "#eaf7ff",
  },
  {
    name: "Tamarin Bay",
    text: "Laid-back surf beach & the gateway to dolphin trips.",
    href: "/beaches-in-mauritius/tamarin",
    icon: Waves,
    color: "#2e9ed2",
    bg: "#e8f6fc",
  },
  {
    name: "Black River",
    text: "Ocean hub for dolphin & whale watching and cruises.",
    href: "/top-activities-mauritius/swim-with-dolphins-west-coast",
    icon: Sailboat,
    color: "#51a9d6",
    bg: "#eaf7ff",
  },
  {
    name: "Le Morne",
    text: "UNESCO mountain, lagoon & beach - kitesurf & hike.",
    href: "/beaches-in-mauritius/le-morne",
    icon: Mountain,
    color: "#ef8a54",
    bg: "#fff0e7",
  },
  {
    name: "La Preneuse",
    text: "Quiet local beach with the historic Martello Tower.",
    href: "/beaches-in-mauritius/la-preneuse",
    icon: MapPin,
    color: "#55ae69",
    bg: "#edf8ef",
  },
  {
    name: "Chamarel",
    text: "Waterfall, Seven Coloured Earth & rum up in the hills.",
    href: "/best-places-to-visit-in-mauritius/chamarel-village",
    icon: Landmark,
    color: "#ef8a54",
    bg: "#fff0e7",
  },
  {
    name: "Black River Gorges",
    text: "Native forest, river birds & viewpoints for hikers.",
    href: "/top-activities-mauritius/black-river-gorges",
    icon: Leaf,
    color: "#56ae64",
    bg: "#edf8ef",
  },
  {
    name: "Ilot Benitiers & Crystal Rock",
    text: "Catamaran to a sandy islet & turquoise Crystal Rock.",
    href: "/top-activities-mauritius/le-morne-discovery-full-day-excursion-ile-aux-benitiers",
    icon: ShipWheel,
    color: "#51a9d6",
    bg: "#eaf7ff",
  },
];

const westDriveTimes = [
  ["Airport", "Flic en Flac", "1-1.5 h"],
  ["Port Louis", "Flic en Flac", "25-50 min"],
  ["Flic en Flac", "Tamarin", "20-30 min"],
  ["Flic en Flac", "Chamarel", "45-60 min"],
];

const westDaySteps: {
  number: string;
  title: string;
  text: string;
  icon: LucideIcon;
}[] = [
  {
    number: "1",
    title: "Flic en Flac",
    text: "morning beach & lagoon swim",
    icon: TreePalm,
  },
  {
    number: "2",
    title: "Tamarin coast",
    text: "lunch, surf & dolphin trips",
    icon: Waves,
  },
  {
    number: "3",
    title: "Chamarel",
    text: "waterfall & rum, or Le Morne",
    icon: Landmark,
  },
  {
    number: "4",
    title: "Sunset & dinner",
    text: "on the golden-hour coast",
    icon: Utensils,
  },
];

const westGettingAroundLinks = [
  { label: "Car Rental", href: "/car-rental-mauritius" },
  { label: "Transfer", href: "/mauritius-transfer-airport-hotel" },
  { label: "Taxi", href: "/mauritius-taxi" },
  {
    label: "Boat Operators",
    href: "/top-activities-mauritius/le-morne-discovery-full-day-excursion-ile-aux-benitiers",
  },
] as const;

const westHiddenGemSlugs = [
  "west-mauritius-travel-guide",
  "best-restaurants-in-west-mauritius-2026-guide",
  "best-snorkelling-spots-in-mauritius",
  "exploring-chamarel-mauritius",
] as const;

const westHiddenGemHrefs = [
  "https://www.mauritiusexplored.com/blog/west-mauritius-travel-guide",
  "https://www.mauritiusexplored.com/blog/best-restaurants-in-west-mauritius-2026-guide",
  "https://www.mauritiusexplored.com/blog/best-snorkelling-spots-in-mauritius",
  "https://www.mauritiusexplored.com/blog/exploring-chamarel-mauritius",
] as const;

function WestCoastMap() {
  return (
    <figure className="mx-auto w-full max-w-[500px]">
      <svg
        viewBox="0 0 500 360"
        role="img"
        aria-label="Map highlighting west Mauritius"
        className="h-auto w-full"
      >
        <defs>
          <filter
            id="west-map-shadow"
            x="-15%"
            y="-15%"
            width="130%"
            height="130%"
          >
            <feDropShadow
              dx="0"
              dy="14"
              stdDeviation="11"
              floodColor="#000000"
              floodOpacity=".12"
            />
          </filter>
        </defs>
        <path
          d="M199 21 228 15 252 30 280 29 305 47 324 76 354 92 374 124 366 158 390 188 383 222 355 236 353 272 328 290 290 296 270 331 231 318 204 332 181 306 148 300 136 268 108 250 109 213 86 186 105 156 97 124 126 103 133 68 165 58Z"
          fill="#d5d7d7"
          filter="url(#west-map-shadow)"
        />
        <path
          d="M128 103 165 58 201 71 196 116 210 129 199 161 218 207 186 229 151 220 116 244 104 221 86 186 105 156 97 124Z"
          fill="#f16522"
        />
        <path
          d="M165 58 170 101 196 116 164 143 199 161 154 190 186 229M116 244 151 220"
          fill="none"
          stroke="#ffffff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="4"
        />
        <path
          d="M210 129 252 129M218 207 258 216M186 229 222 299M196 116 236 96"
          fill="none"
          stroke="#ffffff"
          strokeLinecap="round"
          strokeOpacity=".72"
          strokeWidth="3"
        />
        {[
          [139, 97, "Port Louis"],
          [124, 139, "Flic en Flac"],
          [127, 169, "Tamarin"],
          [145, 189, "La Preneuse"],
          [162, 216, "Black River"],
          [185, 241, "Chamarel"],
          [139, 255, "Le Morne"],
          [102, 238, "Ilot Benitiers"],
        ].map(([x, y, label]) => (
          <g key={label as string}>
            <circle cx={x as number} cy={y as number} r="5" fill="#111827" />
            <text
              x={(x as number) - 10}
              y={(y as number) + 4}
              fill="#1f2933"
              fontFamily="Georgia, 'Times New Roman', serif"
              fontSize="12"
              fontWeight="700"
              textAnchor="end"
            >
              {label as string}
            </text>
          </g>
        ))}
        <g
          fill="#6d6d6d"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize="10"
          fontStyle="italic"
        >
          <text x="208" y="96">
            Moka
          </text>
          <text x="229" y="209">
            Grand Bassin
          </text>
          <text x="226" y="290">
            Bel Ombre
          </text>
        </g>
      </svg>
      <figcaption className="-mt-5 text-center font-serif text-xs italic text-[#8a8f91]">
        The western region at a glance
      </figcaption>
    </figure>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const activeLocale = normalizeLocale(locale);
  const t = getRegionGuide(activeLocale, "west");
  return {
    title: t.metadata.title,
    description: t.metadata.description,
    alternates: { canonical: "/west-mauritius-travel-guide" },
  };
}

export default async function WestMauritiusTravelGuidePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const activeLocale = normalizeLocale(locale);
  const t = getRegionGuide(activeLocale, "west");
  const translatedPlaces = westPlaces.map((place, index) => ({
    ...place,
    ...t.places[index],
  }));
  const translatedSteps = westDaySteps.map((step, index) => ({
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
            <p>Regional Guide - West</p>
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
            <figure className="mx-auto w-full max-w-[370px]">
              <Image
                src="/images/quick-trips/west-mauritius-map.png"
                alt={t.mapAlt}
                width={820}
                height={402}
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
                <p className="mt-3 text-xs leading-relaxed text-[#61707a]">
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
                const link = westGettingAroundLinks[index];

                return (
                  <li key={label}>
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
            {translatedSteps.map((step) => {
              const StepIcon = step.icon;

              return (
                <div key={step.number} className="flex items-start gap-3">
                  <span className="relative grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#f16522] font-serif text-sm font-bold text-white">
                    {step.number}
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
          featuredSlugs={westHiddenGemSlugs}
          featuredHrefs={westHiddenGemHrefs}
          locale={activeLocale}
        />
      </article>
      <CarRentalAdBanner />
      <PopularRoadTrips locale={activeLocale} />
      <PocketAdBanner />
      <Footer />
    </main>
  ), activeLocale);
}
