import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Church,
  Clock3,
  Flower2,
  Landmark,
  MapPin,
  Route,
  Sailboat,
  ShipWheel,
  ShoppingBag,
  TreePalm,
  Utensils,
  Waves,
} from "lucide-react";
import { getRegionGuide } from "@/data/quick-guide-translations";

export const revalidate = 3600;

export const legacyMetadata: Metadata = {
  title: "North Mauritius Travel Guide",
  description:
    "North Mauritius travel guide — calm turquoise lagoons, lively Grand Baie, a string of islets and the island's most popular beaches. What to see and do.",
  alternates: { canonical: "/north-mauritius-travel-guide" },
};

const placesToGo = [
  {
    name: "Grand Baie",
    text: "The buzzing hub - dining, shopping, nightlife & boat trips.",
    icon: ShoppingBag,
    color: "#ef6a2a",
    bg: "#fff0e7",
  },
  {
    name: "Trou aux Biches",
    text: "Calm, family-friendly lagoon with soft sand & sunsets.",
    icon: TreePalm,
    color: "#3da8da",
    bg: "#eaf7ff",
  },
  {
    name: "Mont Choisy",
    text: "One of the longest northern beaches - made for walks.",
    icon: Waves,
    color: "#2e9ed2",
    bg: "#e8f6fc",
  },
  {
    name: "Pereybere",
    text: "Compact beach with clear water, ideal for swimming.",
    icon: Sailboat,
    color: "#5aa8cb",
    bg: "#eaf7fb",
  },
  {
    name: "Cap Malheureux",
    text: "The iconic red-roof church beside the northern lagoon.",
    icon: Church,
    color: "#5cb56e",
    bg: "#edf8ef",
  },
  {
    name: "Pamplemousses Garden",
    text: "Giant water lilies & palm avenues in a peaceful garden.",
    icon: Flower2,
    color: "#56ae64",
    bg: "#edf8ef",
  },
  {
    name: "L'Aventure du Sucre",
    text: "Sugar-history museum in an old factory - tastings included.",
    icon: Landmark,
    color: "#ef8a54",
    bg: "#fff0e7",
  },
  {
    name: "Northern Islands",
    text: "Catamaran to Gabriel, Flat Island & Coin de Mire.",
    icon: ShipWheel,
    color: "#51a9d6",
    bg: "#eaf7ff",
  },
];

const driveTimes = [
  ["Airport", "Grand Baie", "1h-1.5 h"],
  ["Port Louis", "Grand Baie", "30-45 min"],
  ["Pamplemousses", "Grand Baie", "20-30 min"],
  ["Belle Mare", "Grand Baie", "1-1.5 h"],
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getRegionGuide(locale, "north");
  return { title: t.metadata.title, description: t.metadata.description, alternates: { canonical: "/north-mauritius-travel-guide" } };
}

export default async function NorthMauritiusTravelGuidePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getRegionGuide(locale, "north");
  const translatedPlaces = placesToGo.map((place, index) => ({ ...place, ...t.places[index] }));
  return (
    <main id="main-content" className="min-h-screen bg-white text-[#1c2a2e]">
      <Navbar />

      <article className="mx-auto w-full max-w-6xl pt-30 pb-20 px-4 xl:px-0">
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
            <p>Regional Guide - North</p>
          </div> */}

          <p className="mt-7 text-xs font-bold uppercase tracking-wide text-[#f16522]">
            {t.kicker}
          </p>
          <h1 className="mt-2 font-serif text-[clamp(2rem,5vw,3.4rem)] font-bold leading-tight tracking-tight text-[#151f2b]">
            {t.titlePrefix}{" "}
            <span className="font-normal italic text-[#f16522]">{t.titleEmphasis}</span>
          </h1>
          <p className="mt-4 max-w-4xl font-serif text-sm italic leading-relaxed text-[#6f7e88] sm:text-base">
            {t.intro}
          </p>
        </header>

        <section className="mt-9 grid gap-7 lg:grid-cols-[1fr_.98fr] lg:items-start">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#ef5e25]">{t.whereToGo}</h2>
            <div className="mt-4 space-y-4">
              {translatedPlaces.map((place) => {
                const PlaceIcon = place.icon;

                return (
                  <div key={place.name} className="flex gap-4 mb-8">
                    <span
                      className="mt-0.5 grid h-12 w-12 shrink-0 place-items-center rounded-full"
                      style={{ backgroundColor: place.bg, color: place.color }}
                    >
                      <PlaceIcon className="h-5 w-5" strokeWidth={1.8} />
                    </span>
                    <div className="pt-0.5">
                      <h3 className="font-serif text-lg font-bold leading-none text-[#1b2d3c]">
                        {place.name}
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
            <figure className="mx-auto w-full max-w-[530px]">
              <Image
                src="/images/quick-trips/north-mauritious-map.png"
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
                <h2 className="font-serif text-xl font-bold text-[#f16522]">{t.driveTimesTitle}</h2>
                <div className="mt-3 space-y-2 text-xs leading-relaxed text-[#61707a] ">
                  {t.driveTimes.map(([from, to, time]) => (
                    <p key={`${from}-${to}`} className="flex flex-wrap items-center gap-x-1">
                      <span>{from}</span>
                      <span className="text-[#f16522]">-&gt;</span>
                      <span>{to}</span>
                      <strong className="text-[#233645]">{time}</strong>
                    </p>
                  ))}
                </div>
              </section>

              <section className="rounded-md bg-[#f5f2ef] px-5 py-5">
                <h2 className="font-serif text-xl font-bold text-[#f16522]">{t.goodToKnowTitle}</h2>
                <p className="mt-3 text-xs leading-relaxed text-[#61707a]">
                  {t.goodToKnow}
                </p>
              </section>
            </div>
          </div>
        </section>

        <section className="mt-4 grid gap-4 rounded-md bg-[#f5f2ef] px-5 py-5 md:grid-cols-2 md:px-7">
          <div className="md:border-r md:border-[#ded6cf] md:pr-7">
            <h2 className="font-serif text-xl font-bold text-[#f16522]">{t.gettingAroundTitle}</h2>
            <ul className="mt-3 space-y-1.5 text-xs leading-relaxed text-[#61707a] sm:text-sm">
              {t.gettingAround.map(([label, text]) => (
                <li key={label}><strong className="text-[#1d3144]">{label}</strong> - {text}</li>
              ))}
            </ul>
          </div>
          <div className="md:pl-3">
            <h2 className="font-serif text-xl font-bold text-[#f16522]">{t.bestForTitle}</h2>
            <p className="mt-3 text-xs leading-relaxed text-[#61707a] sm:text-sm">
              {t.bestFor}
            </p>
          </div>
        </section>

        <section className="mt-8 rounded-md bg-[#fff0e7] px-5 py-5 sm:px-7">
          <h2 className="font-serif text-xl font-bold text-[#f16522]">{t.perfectDayTitle}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [Route, "1", "Pamplemousses", "garden, then the sugar museum"],
              [Utensils, "2", "Lunch", "in lively Grand Baie"],
              [TreePalm, "3", "Beaches", "& Cap Malheureux church"],
              [Clock3, "4", "Dinner & drinks", "on the Grand Baie waterfront"],
            ].map(([Icon, number, _title, _text], index) => {
              const StepIcon = Icon as typeof Route;
              const { title, text } = t.steps[index];

              return (
                <div key={number as string} className="flex items-start gap-3">
                  <span className="relative grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#f16522] font-serif text-sm font-bold text-white">
                    {number as string}
                    {/* <StepIcon className="absolute -right-1 -bottom-1 h-3 w-3 rounded-full bg-white p-0.5 text-[#f16522]" /> */}
                  </span>
                  <div>
                    <h3 className="font-serif text-sm font-bold text-[#1d3144]">{title as string}</h3>
                    <p className="text-[11px] leading-snug text-[#6b747b] sm:text-xs">{text as string}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </article>

      <Footer />
    </main>
  );
}
