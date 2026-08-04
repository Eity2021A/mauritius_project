import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PopularRoadTrips from "@/components/PopularRoadTrips";
import {
  localizeStaticPage,
  staticPageText,
} from "@/lib/static-page-localizer";
import { normalizeLocale } from "@/i18n/routing";
import type { LucideIcon } from "lucide-react";
import {
  CalendarDays,
  Camera,
  Clock3,
  Compass,
  Droplets,
  Landmark,
  Mountain,
  Route,
  TriangleAlert,
  Waves,
} from "lucide-react";
import Image from "next/image";
import PocketAdBanner from "@/components/PocketAdBanner";
import CarRentalAdBannerInfo from "@/components/CarRentalAdBannerInfo";
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Seven Waterfalls Hike",
  description:
    "Hike the Seven Waterfalls (Tamarind Falls), Mauritius — a raw jungle-and-gorge adventure. The route, pools, best time to go, gear and safety tips.",
  alternates: { canonical: "/seven-waterfalls-hike" },
};

const hikeHighlights: {
  label: string;
  value: string;
  detail: string;
  icon: LucideIcon;
}[] = [
  {
    label: "Duration",
    value: "3+ hrs",
    detail: "Half-day hike",
    icon: Clock3,
  },
  {
    label: "Difficulty",
    value: "Mod-Hard",
    detail: "Route & fitness-led",
    icon: Mountain,
  },
  {
    label: "Waterfalls",
    value: "Seven",
    detail: "Cascades to discover",
    icon: Landmark,
  },
  {
    label: "Terrain",
    value: "Mixed",
    detail: "Forest, rock & river",
    icon: Waves,
  },
];

const logisticsIntroCards: {
  heading: string;
  accentLabel: string;
  accentText: string;
  description: string;
  note?: string;
  icon: LucideIcon;
}[] = [
  {
    heading: "Getting There & a Guide",
    accentLabel: "Nearest villages:",
    accentText: "Henrietta - Vacoas",
    description:
      "A local guide is strongly advised - trails are unmarked, rocks slippery and river levels change.",
    note: "From Flic en Flac ~35-50 min - Port Louis ~45-60 min",
    icon: Compass,
  },
  {
    heading: "Best Time to Hike",
    accentLabel: "Best:",
    accentText: "Dry, clear mornings",
    description:
      "Mornings bring cooler air, better light and safer footing. Check the weather 24-48 hrs ahead and skip it after heavy rain - rocks turn dangerous and rivers rise.",
    icon: CalendarDays,
  },
];

const logisticsFeatureCards: {
  heading: string;
  title: string;
  description: string;
  noteLabel: string;
  note: string;
  icon: LucideIcon;
}[] = [
  {
    heading: "The Reward",
    title: "Pools, Cliffs & Cool Air",
    description:
      "Hidden pools, dramatic cliffs and cool gorge air, revealed slowly as you descend.",
    noteLabel: "Swim:",
    note: "many tours include pool time when the water is safe.",
    icon: Droplets,
  },
  {
    heading: "Respect the Trail",
    title: "Tougher Than It Looks",
    description:
      "Short in distance but hard underfoot - slippery rock and river crossings.",
    noteLabel: "Note:",
    note: "not for young children, pregnant women or limited mobility.",
    icon: TriangleAlert,
  },
];

const preparedItems: {
  title: string;
  text: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Water & Snacks",
    text: "Stay hydrated on the climb out.",
    icon: Droplets,
  },
  {
    title: "Dry Bag & Camera",
    text: "Protect your gear at the pools.",
    icon: Camera,
  },
];
const ad = {
  desktopSrc:
    "/images/quick-trips/Seven-waterfall-hike-in-Mauritius-Best-Hike-best-Prices.webp",
  href: "/",
  alt: "Seven waterfall hike in Mauritius Best Hike best Prices",
};
export default async function SevenWaterfallsHikePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const activeLocale = normalizeLocale(locale);
  const t = (text: string) => staticPageText(activeLocale, text);
  return localizeStaticPage(
    <main id="main-content" className="min-h-screen bg-white text-[#1c2a2e]">
      <Navbar />

      <article className="mx-auto w-full max-w-7xl px-4 pt-24 pb-10 sm:px-6 lg:pt-28">
        <header className="text-center">
          <h1 className="font-serif text-[clamp(2rem,6vw,3.1rem)] font-bold leading-tight text-[#111d2a]">
            {t("Hike the Seven Waterfalls")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl font-serif text-sm italic leading-7 text-[#687887] sm:text-base">
            {t(
              "Your visual guide to Tamarind Falls - the 7 Cascades - a raw jungle-and-gorge adventure in the central highlands.",
            )}
          </p>
        </header>

        <section className="mt-9">
          <h2 className="text-center font-serif text-lg font-bold text-[#f16522] sm:text-xl">
            {t("The Hike at a Glance")}
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {hikeHighlights.map(({ label, value, detail, icon: Icon }) => (
              <div
                key={label}
                className="rounded-md border border-[#e5ddd4] bg-white px-5 py-5 text-center shadow-[0_2px_8px_rgba(36,54,67,.045)]"
              >
                <span className="mx-auto grid h-9 w-9 place-items-center rounded-full bg-[#eef8ff] text-[#2389c9]">
                  <Icon className="h-5 w-5" strokeWidth={1.9} />
                </span>
                <p className="mt-3 font-serif text-sm font-bold text-[#111d2a]">
                  {t(label)}
                </p>
                <p className="mt-2 font-serif text-xl font-bold text-[#f16522]">
                  {t(value)}
                </p>
                <p className="mt-1 font-serif text-xs italic text-[#7b8791]">
                  {t(detail)}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          className="border-b border-gray-100 bg-white py-3 md:py-5 dark:border-neutral-800 dark:bg-neutral-900"
          aria-label="Sponsored highlights"
        >
          <div className="container mx-auto max-w-7xl">
            <div className="relative overflow-hidden rounded-xl bg-[#052028] shadow-sm ring-1 ring-gray-200 dark:ring-neutral-700">
              <a
                href={ad.href}
                className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
              >
                <span className="relative block aspect-[1200/240] w-full">
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
        <section className="mt-12">
          <h2 className="text-center font-serif text-[clamp(1.7rem,4vw,2.45rem)] font-bold leading-tight text-[#f16522]">
            {t("The Route in Two Parts")}
          </h2>

          <style>
            {`
              .seven-falls-route-line-wrap {
                display: none;
              }

              @media (min-width: 720px) {
                .seven-falls-route-line-wrap {
                  display: block;
                  height: 285px;
                }

                .seven-falls-route-grid {
                  display: grid;
                  grid-template-columns: minmax(0, 1fr) 72px minmax(0, 1fr);
                  align-items: start;
                }

                .seven-falls-route-line {
                  position: absolute;
                  left: 50%;
                  top: 0;
                  width: 3px;
                  height: 272px;
                  transform: translateX(-50%);
                  background: #e5ded5;
                }

                .seven-falls-route-dot {
                  position: absolute;
                  left: 50%;
                  width: 1rem;
                  height: 1rem;
                  transform: translateX(-50%);
                  border-radius: 9999px;
                }

                .seven-falls-route-dot-green {
                  top: 0;
                  background: #3b9446;
                }

                .seven-falls-route-dot-orange {
                  top: 264px;
                  background: #f16522;
                }

                .seven-falls-route-dot-blue {
                  top: 129px;
                  z-index: 10;
                  width: 2rem;
                  height: 2rem;
                  border: 4px solid #2389c9;
                  background: #ffffff;
                  box-shadow: inset 0 0 0 5px #ffffff;
                }

                .seven-falls-route-dot-blue::after {
                  content: "";
                  position: absolute;
                  left: 50%;
                  top: 50%;
                  width: .75rem;
                  height: .75rem;
                  transform: translate(-50%, -50%);
                  border-radius: 9999px;
                  background: #2389c9;
                }

                .seven-falls-route-note {
                  position: absolute;
                  left: calc(50% + 34px);
                  top: 121px;
                  z-index: 20;
                  width: 220px;
                }

                .seven-falls-route-card-second {
                  margin-top: 174px;
                }

                .seven-falls-route-mobile-note {
                  display: none;
                }
              }
            `}
          </style>

          <div className="seven-falls-route-grid mt-8 grid gap-5">
            <article className="rounded-[12px] border border-[#dfd4c7] bg-white px-5 py-5 shadow-[0_4px_12px_rgba(80,55,28,.12)] sm:px-7">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <span className="inline-flex h-7 min-w-[104px] items-center justify-center rounded-full bg-[#e7f4e9] px-5 text-[10px] font-bold uppercase tracking-wide text-[#2f8e48]">
                  {t("Stage 1")}
                </span>
                <h3 className="font-serif text-xl font-bold leading-tight text-[#111d2a] sm:text-[1.45rem]">
                  {t("The Forest Descent")}
                </h3>
              </div>
              <p className="mt-4 max-w-[430px] text-xs leading-relaxed text-[#1f2d3a] sm:text-sm">
                {t(
                  "Narrow paths, tree roots and muddy ground drop from the highland villages down toward the gorge.",
                )}
              </p>
              <div className="mt-7">
                <div className="h-3 overflow-hidden rounded-full bg-[#e9e4dc]">
                  <div className="h-full w-[60%] rounded-full bg-[#2f8e48]" />
                </div>
                <p className="mt-2 text-right font-serif text-xs italic text-[#687887]">
                  {t("~60% of the route")}
                </p>
              </div>
            </article>

            <div className="seven-falls-route-line-wrap relative">
              <span className="seven-falls-route-line" />
              <span className="seven-falls-route-dot seven-falls-route-dot-green" />
              <span className="seven-falls-route-dot seven-falls-route-dot-orange" />
              <span className="seven-falls-route-dot seven-falls-route-dot-blue" />
              <div className="seven-falls-route-note">
                <p className="font-serif text-base font-bold leading-tight text-[#2389c9] sm:text-lg">
                  {t("Into the Gorge")}
                </p>
                <p className="mt-1 text-xs text-[#7b8791] sm:text-sm">
                  {t("The terrain changes here.")}
                </p>
              </div>
            </div>

            <div className="seven-falls-route-mobile-note rounded-md border-l-4 border-[#2389c9] bg-[#f6fbff] px-4 py-3">
              <p className="font-serif text-base font-bold leading-tight text-[#2389c9] sm:text-lg">
                {t("Into the Gorge")}
              </p>
              <p className="mt-1 text-xs text-[#7b8791] sm:text-sm">
                {t("The terrain changes here.")}
              </p>
            </div>

            <article className="seven-falls-route-card-second rounded-[12px] border border-[#dfd4c7] bg-white px-5 py-5 shadow-[0_4px_12px_rgba(80,55,28,.12)] sm:px-7">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <span className="inline-flex h-7 min-w-[104px] items-center justify-center rounded-full bg-[#fde4d9] px-5 text-[10px] font-bold uppercase tracking-wide text-[#f16522]">
                  {t("Stage 2")}
                </span>
                <h3 className="font-serif text-xl font-bold leading-tight text-[#111d2a] sm:text-[1.45rem]">
                  {t("The Gorge & Falls")}
                </h3>
              </div>
              <p className="mt-4 max-w-[430px] text-xs leading-relaxed text-[#1f2d3a] sm:text-sm">
                {t(
                  "River crossings, slippery rock and steep hand-hold descents reveal pools and cascades one by one.",
                )}
              </p>
              <div className="mt-7">
                <div className="h-3 overflow-hidden rounded-full bg-[#e9e4dc]">
                  <div className="h-full w-[40%] rounded-full bg-[#f16522]" />
                </div>
                <p className="mt-2 text-right font-serif text-xs italic text-[#687887]">
                  {t("~40% of the route")}
                </p>
              </div>
            </article>
          </div>
        </section>

        <section className="mt-12">
          <div className="grid gap-8 md:grid-cols-2">
            {logisticsIntroCards.map(
              ({
                heading,
                accentLabel,
                accentText,
                description,
                note,
                icon: Icon,
              }) => (
                <article
                  key={heading}
                  className="min-h-[190px] rounded-[12px] border border-[#dfd4c7] bg-white px-7 py-8 shadow-[0_5px_14px_rgba(80,55,28,.12)] sm:px-9"
                >
                  <div className="flex items-center gap-5">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#f2f0ed] text-[#2389c9]">
                      <Icon className="h-6 w-6" strokeWidth={1.9} />
                    </span>
                    <h2 className="font-serif text-xl font-bold leading-tight text-[#111d2a]">
                      {t(heading)}
                    </h2>
                  </div>
                  <p className="mt-7 text-xs leading-relaxed text-[#1f2d3a] sm:text-sm">
                    <span>{t(accentLabel)} </span>
                    <strong className="text-[#f16522]">{t(accentText)}</strong>
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-[#1f2d3a] sm:text-sm">
                    {t(description)}
                  </p>
                  {note ? (
                    <p className="mt-5 font-serif text-xs italic leading-relaxed text-[#7b8791]">
                      {t(note)}
                    </p>
                  ) : null}
                </article>
              ),
            )}
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {logisticsFeatureCards.map(
              ({
                heading,
                title,
                description,
                noteLabel,
                note,
                icon: Icon,
              }) => (
                <article
                  key={heading}
                  className="rounded-[12px] border border-[#dfd4c7] bg-white px-7 py-8 text-center shadow-[0_5px_14px_rgba(80,55,28,.12)] sm:px-9"
                >
                  <h2 className="font-serif text-xl font-bold leading-tight text-[#f16522]">
                    {t(heading)}
                  </h2>
                  <div className="mt-4 flex justify-center text-[#2389c9]">
                    <Icon className="h-8 w-8" strokeWidth={1.9} />
                  </div>
                  <h3 className="mt-5 font-serif text-base font-bold leading-tight text-[#111d2a] sm:text-xl">
                    {t(title)}
                  </h3>
                  <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-[#1f2d3a] sm:text-sm">
                    {t(description)}
                  </p>
                  <div className="mx-auto mt-6 max-w-md rounded-md bg-[#f5f3ef] px-5 py-4 text-xs leading-relaxed text-[#1f2d3a] sm:text-sm">
                    <strong className="text-[#f16522]">{t(noteLabel)}</strong>{" "}
                    {t(note)}
                  </div>
                </article>
              ),
            )}
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <article className="rounded-[12px] border border-[#dfd4c7] bg-white px-7 py-8 text-center shadow-[0_5px_14px_rgba(80,55,28,.12)] sm:px-9">
              <h2 className="font-serif text-xl font-bold leading-tight text-[#f16522]">
                {t("Mandatory Gear")}
              </h2>
              <div className="mt-4 flex justify-center text-[#2389c9]">
                <Route className="h-8 w-8" strokeWidth={1.9} />
              </div>
              <h3 className="mt-4 font-serif text-base font-bold leading-tight text-[#111d2a]">
                {t("Grippy Footwear")}
              </h3>
              <p className="mx-auto mt-4 max-w-md text-xs leading-relaxed text-[#1f2d3a] sm:text-sm">
                {t(
                  "Hiking shoes or trail runners with strong grip - essential on wet rock and mud.",
                )}
              </p>
            </article>

            <article className="rounded-[12px] border border-[#dfd4c7] bg-white px-7 py-8 text-center shadow-[0_5px_14px_rgba(80,55,28,.12)] sm:px-9">
              <h2 className="font-serif text-2xl font-bold leading-tight text-[#f16522]">
                {t("Come Prepared")}
              </h2>
              <div className="mt-4 grid gap-8 sm:grid-cols-2">
                {preparedItems.map(({ title, text, icon: Icon }) => (
                  <div key={title}>
                    <div className="flex justify-center text-[#2389c9]">
                      <Icon className="h-8 w-8" strokeWidth={1.9} />
                    </div>
                    <h3 className="mt-2 font-serif text-base font-bold leading-tight text-[#111d2a]">
                      {t(title)}
                    </h3>
                    <p className="mx-auto mt-2 max-w-[210px] text-xs leading-relaxed text-[#1f2d3a] sm:text-sm">
                      {t(text)}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>
      </article>

      <PocketAdBanner />
      <CarRentalAdBannerInfo />
      <PopularRoadTrips locale={locale} />

      <Footer />
    </main>,
    activeLocale,
  );
}
