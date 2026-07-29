import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { localizeStaticPage } from "@/lib/static-page-localizer";
import type { LucideIcon } from "lucide-react";
import {
  CalendarDays,
  Clock3,
  Compass,
  Footprints,
  Heart,
  Mountain,
  Route,
  TrendingUp,
  Umbrella,
} from "lucide-react";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Conquer Le Morne",
  description:
    "Conquer Le Morne Brabant — a visual guide to Mauritius' iconic UNESCO summit hike and the 'underwater waterfall' view, with gate times, gear and tips.",
  alternates: { canonical: "/conquer-le-morne" },
};

const morneHighlights: {
  label: string;
  value: string;
  detail: string;
  icon: LucideIcon;
}[] = [
  {
    label: "Ascension",
    value: "7 km",
    detail: "return trip",
    icon: Route,
  },
  {
    label: "Elevation Gain",
    value: "490 m",
    detail: "to summit",
    icon: TrendingUp,
  },
  {
    label: "Duration",
    value: "3-4 hrs",
    detail: "average time",
    icon: Clock3,
  },
  {
    label: "Terrain Type",
    value: "Mixed",
    detail: "forest & exposed rock",
    icon: Mountain,
  },
];

const logistics: {
  heading: string;
  label: string;
  label2: string;
  timeWithDate: string;
  timeWithDate2: string;
  description: string;
  note?: string;
  icon: LucideIcon;
}[] = [
  {
    heading: "Gate Times & Start",
    label : "Gate Opens:",
    label2 : "Last Entry:",
    timeWithDate : "7:00 AM",  
    timeWithDate2 : "2:30 PM",  
    description:
      "Arrive at 7 AM to avoid intense heat, midday winds and crowds - the best light for photos.",
    icon: Compass,
  },
  {
    heading: "Best Season to Hike",
    label : "Optimal Months: ",
    label2 : "",
    timeWithDate : "May to October",
    timeWithDate2 : "",
    description:
      "The 'winter' season offers cooler, crisp air and significantly less humidity for a more comfortable ascent.",
    icon: CalendarDays,
  },
];

const morneFeatureCards: {
  heading: string;
  title: string;
  description: string;
  note: string;
  notePrefix?: string;
  icon: "reward" | "freedom";
}[] = [
  {
    heading: "The Ultimate Reward",
    title: 'The "Underwater Waterfall"',
    description:
      "This world-famous view is an incredible optical illusion created by sand and silt deposits flowing through the lagoon.",
    note: "For the perfect photo, find the south-western ledge on the summit plateau.",
    notePrefix: "Pro Tip:",
    icon: "reward",
  },
  {
    heading: "A Symbol of Freedom",
    title: "UNESCO World Heritage Site",
    description:
      "The mountain was a sanctuary for escaped slaves (Maroons) in the 18th-19th centuries - a powerful global symbol of the fight for freedom.",
    note: "You are not just climbing a mountain; you are ascending a monument to the human spirit.",
    icon: "freedom",
  },
];

function MorneFeatureIcon({ icon }: { icon: "reward" | "freedom" }) {
  if (icon === "reward") {
    return (
      <svg
        aria-hidden="true"
        className="h-12 w-12 text-[#2389c9]"
        fill="none"
        viewBox="0 0 64 64"
      >
        <path
          d="M32 7 57 32 32 57 7 32 32 7Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="5"
        />
        <path
          d="m21 32 8 8 16-19"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="5"
        />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      className="h-16 w-16 text-[#2389c9]"
      fill="none"
      viewBox="0 0 64 64"
    >
      <path
        d="M26 25h12"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="5"
      />
      <path
        d="M28 18h-9a10 10 0 0 0 0 20h9"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="5"
      />
      <path
        d="M36 18h9a10 10 0 0 1 0 20h-9"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="5"
      />
    </svg>
  );
}

export default async function ConquerLeMornePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return localizeStaticPage((
    <main id="main-content" className="min-h-screen bg-white text-[#1c2a2e]">
      <Navbar />

      <article className="mx-auto w-full max-w-6xl px-4 pt-24 pb-20 sm:px-6 lg:pt-28">
        <header className="text-center">
          <h1 className="font-serif text-[clamp(2rem,6vw,3.1rem)] font-bold leading-tight text-[#111d2a]">
            Conquer Le Morne Brabant
          </h1>
          <p className="mx-auto mt-4 max-w-2xl font-serif text-sm italic leading-7 text-[#687887] sm:text-base">
            Your visual guide to Mauritius&apos; most iconic summit and the
            legendary &quot;underwater waterfall&quot; view.
          </p>
        </header>

        <section className="mt-9">
          <h2 className="text-center font-serif font-bold text-[#f16522] text-[clamp(2rem,5vw,2.25rem)]">
            The Hike at a Glance
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {morneHighlights.map(({ label, value, detail, icon: Icon }) => (
              <div
                key={label}
                className="rounded-md border border-[#e5ddd4] bg-white px-5 py-5 text-center shadow-[0_2px_8px_rgba(36,54,67,.045)]"
              >
                <span className="mx-auto grid h-9 w-9 place-items-center rounded-full bg-[#eef8ff] text-[#2389c9]">
                  <Icon className="h-5 w-5" strokeWidth={1.9} />
                </span>
                <p className="mt-3 font-serif text-sm font-bold text-[#111d2a]">
                  {label}
                </p>
                <p className="mt-2 font-serif text-xl font-bold text-[#f16522]">
                  {value}
                </p>
                <p className="mt-1 font-serif text-xs italic text-[#7b8791]">
                  {detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-center font-serif text-[clamp(2rem,5vw,2.25rem)] font-bold leading-tight text-[#f16522]">
            A Tale of Two Halves
          </h2>

          <div className="relative mt-8 grid gap-5 lg:block lg:min-h-[430px]">
            <span className="absolute left-1/2 top-12 hidden h-[338px] w-[3px] -translate-x-1/2 bg-[#e5ded5] lg:block" />
            <span className="absolute left-1/2 top-[82px] hidden h-4 w-4 -translate-x-1/2 rounded-full bg-[#3b9446] lg:block" />
            <span className="absolute left-1/2 top-[266px] hidden h-4 w-4 -translate-x-1/2 rounded-full bg-[#f16522] lg:block" />
            <span className="absolute left-1/2 top-[169px] z-10 hidden h-8 w-8 -translate-x-1/2 rounded-full border-4 border-[#2389c9] bg-white shadow-[inset_0_0_0_5px_white] lg:block">
              <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2389c9]" />
            </span>

            <div className="rounded-[16px] border border-[#dfd4c7] bg-white px-6 py-7 shadow-[0_5px_14px_rgba(80,55,28,.12)] sm:px-8 sm:py-9 lg:absolute lg:left-0 lg:top-0 lg:w-[47%]">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <span className="inline-flex h-9 min-w-[116px] items-center justify-center rounded-full bg-[#e7f4e9] px-6 text-[12px] font-bold uppercase tracking-wide text-[#2f8e48]">
                  Stage 1
                </span>
                <h3 className="font-serif text-[25px] font-bold leading-tight text-[#111d2a]">
                  The Green Path
                </h3>
              </div>
              <p className="mt-6 max-w-[500px] font-serif text-base leading-8 text-[#1f2d3a] sm:text-lg">
                A steady, shaded incline through lush, indigenous forest.
                Accessible to most hikers with basic fitness.
              </p>
              <div className="mt-16">
                <div className="h-3 overflow-hidden rounded-full bg-[#e9e4dc]">
                  <div className="h-full w-[70%] rounded-full bg-[#2f8e48]" />
                </div>
                <p className="mt-2 text-right font-serif text-sm italic text-[#687887]">
                  ~70% of the trail
                </p>
              </div>
            </div>

            <div className="rounded-md border-l-4 border-[#2389c9] bg-[#f6fbff] px-4 py-3 lg:absolute lg:left-[calc(50%+30px)] lg:top-[110px] lg:z-20 lg:border-l-0 lg:bg-transparent lg:px-0 lg:py-0">
              <p className="font-serif text-lg font-bold leading-tight text-[#2389c9] sm:text-xl">
                The &quot;Green Gate&quot;
              </p>
              <p className="mt-1 font-serif text-sm text-[#7b8791] sm:text-base">
                The trail transitions here.
              </p>
            </div>

            <div className="rounded-[16px] border border-[#dfd4c7] bg-white px-6 py-7 shadow-[0_5px_14px_rgba(80,55,28,.12)] sm:px-8 sm:py-9 lg:absolute lg:right-0 lg:top-[178px] lg:w-[47%]">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <span className="inline-flex h-9 min-w-[116px] items-center justify-center rounded-full bg-[#fde4d9] px-6 text-[12px] font-bold uppercase tracking-wide text-[#f16522]">
                  Stage 2
                </span>
                <h3 className="font-serif text-[25px] font-bold leading-tight text-[#111d2a]">
                  The Summit Scramble
                </h3>
              </div>
              <p className="mt-6 max-w-[560px] font-serif text-base leading-8 text-[#1f2d3a] sm:text-lg">
                A steep, technical rock scramble requiring hands and feet.
                Challenging but rewarding. Not for those with severe vertigo.
              </p>
              <div className="mt-16">
                <div className="h-3 overflow-hidden rounded-full bg-[#e9e4dc]">
                  <div className="h-full w-[30%] rounded-full bg-[#f16522]" />
                </div>
                <p className="mt-2 text-right font-serif text-sm italic text-[#687887]">
                  ~30% of the trail
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12 md:mt-30 ">
          <h2 className="text-center font-serif font-bold text-[#f16522] text-[clamp(2rem,5vw,2.25rem)]">
            Essential Logistics (2026)
          </h2>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {logistics.map(({ heading, label,label2, timeWithDate,timeWithDate2,description, note, icon: Icon }) => (
              <div
                key={heading}
                className="rounded-md border border-[#e5ddd4] bg-white px-5 py-5 shadow-[0_2px_8px_rgba(36,54,67,.045)]"
              >
                <div className="flex items-start gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full  text-[#2389c9]">
                    <Icon className="h-7 w-7" strokeWidth={1.9} />
                  </span>
                  <div>
                    <p className="font-serif text-xl font-bold text-[#111d2a]">
                      {heading}
                    </p>
                  <div className="flex gap-1 mb-1">
                      <p className="mt-1 text-[12px] font-normal tracking-wide text-[#000]">
                      {label}
                    </p>
                    <p className="mt-1 text-[12px] font-bold tracking-wide text-[#f16522]">
                      {timeWithDate}
                    </p>
                    </div>
                   <div className="flex gap-1">
                     <p className="mt-1 text-[12px] font-normal  tracking-wide text-[#000]">
                      {label2}
                    </p>
                       <p className="mt-1 text-[12px] font-bold uppercase tracking-wide text-[#f16522]">
                      {timeWithDate2}
                    </p>
                    </div>
                    <p className="mt-2 font-serif text-sm leading-6 text-[#667584]">
                      {description}
                    </p>
                 
                    {note ? (
                      <p className="mt-3 border-t border-[#eee6dd] pt-2 font-serif text-xs italic text-[#7b8791]">
                        {note}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-8 lg:grid-cols-2">
          {morneFeatureCards.map(
            ({ heading, title, description, note, notePrefix, icon }) => (
              <article
                key={heading}
                className="rounded-[24px] border border-[#dfd4c7] bg-white px-7 py-10 text-center shadow-[0_6px_18px_rgba(80,55,28,.12)] sm:px-10 lg:px-12"
              >
                <h2 className="font-serif text-[clamp(1.8rem,4vw,2rem)] font-bold leading-tight text-[#f16522]">
                  {heading}
                </h2>
                <div className="mt-3 flex justify-center">
                  <MorneFeatureIcon icon={icon} />
                </div>
                <h3 className="mt-3 font-serif text-[1.5rem] font-bold leading-tight text-[#111d2a]">
                  {title}
                </h3>
                <p className="mx-auto mt-4 max-w-xl font-serif text-sm leading-5 text-[#1f2d3a] ">
                  {description}
                </p>
                <div className=" rounded-md bg-[#f5f3ef] px-5 py-5 font-serif text-sm leading-5 text-[#1f2d3a] ">
                  {notePrefix ? (
                    <strong className="text-[#f16522]">{notePrefix} </strong>
                  ) : null}
                  <span className={notePrefix ? "" : "italic"}>{note}</span>
                </div>
              </article>
            ),
          )}
        </section>

        <section className="mt-6 grid gap-5 md:grid-cols-2">
          <div className="rounded-md border border-[#e5ddd4] bg-white px-5 py-6 text-center shadow-[0_2px_8px_rgba(36,54,67,.045)]">
            <h2 className="font-serif text-xl font-bold text-[#f16522]">
              Mandatory Gear
            </h2>
            <span className="mx-auto mt-4 grid h-10 w-10 place-items-center rounded-full  text-[#2389c9]">
              <Footprints className="h-6 w-6" strokeWidth={1.9} />
            </span>
            <h3 className="mt-4 font-serif text-base font-bold text-[#111d2a]">
              Sturdy Footwear
            </h3>
            <p className="mx-auto mt-2 max-w-sm font-serif text-sm leading-6 text-[#667584]">
              Trail runners or hiking boots with <strong className="text-[#000]">aggressive grip</strong> are essential
              for safety on the rock scramble.
            </p>
          </div>

          <div className="rounded-md border border-[#e5ddd4] bg-white px-5 py-6 text-center shadow-[0_2px_8px_rgba(36,54,67,.045)]">
            <h2 className="font-serif text-xl font-bold text-[#f16522]">
              After the Ascent
            </h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <span className="mx-auto grid h-10 w-10 place-items-center rounded-full  text-[#2389c9]">
                  <Umbrella className="h-6 w-6" strokeWidth={1.9} />
                </span>
                <h3 className="mt-3 font-serif text-base font-bold text-[#111d2a]">
                  Relax on the Beach
                </h3>
                <p className="mt-2 font-serif text-xs leading-5 text-[#667584]">
                  Wild, windy public beaches.
                </p>
              </div>
              <div>
                <span className="mx-auto grid h-10 w-10 place-items-center rounded-full  text-[#2389c9]">
                  <Heart className="h-6 w-6" strokeWidth={1.9} />
                </span>
                <h3 className="mt-3 font-serif text-base font-bold text-[#111d2a]">
                  Refuel Your Spirit
                </h3>
                <p className="mt-2 font-serif text-xs leading-5 text-[#667584]">
                  Enjoy authentic local meals.
                </p>
              </div>
            </div>
          </div>
        </section>

      </article>

      <Footer />
    </main>
  ), locale);
}
