import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { localizeStaticPage } from "@/lib/static-page-localizer";
import type { LucideIcon } from "lucide-react";
import {
  Anchor,
  Fish,
  Shell,
  ShieldCheck,
  Turtle,
  Waves,
} from "lucide-react";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Swim with Sea Turtles in Mauritius",
  description:
    "Swim with sea turtles in Mauritius — where to snorkel with wild green and hawksbill turtles, the best lagoons, and how to do it safely and responsibly.",
  alternates: { canonical: "/swim-with-sea-turtles-in-mauritius" },
};

const turtleRegions = [
  ["North", "#2389c9"],
  ["West & South-West", "#f16522"],
  ["East & South", "#2f8e48"],
];

const turtleStyles = {
  North: "bg-[#eef8ff] text-[#2389c9]",
  "West & South-West": "bg-[#fff0e6] text-[#f16522]",
  "East & South": "bg-[#eaf6ed] text-[#2f8e48]",
};

const turtleSpots: {
  name: string;
  tag: string;
  region: string;
  type: "North" | "West & South-West" | "East & South";
  see: string;
  go: string;
  icon: LucideIcon;
}[] = [
  {
    name: "Ile Plate (Flat Island)",
    tag: "Boat Trip",
    region: "North - Offshore",
    type: "North",
    see: "Remote island, clear water & healthy reefs - turtles often approach you.",
    go: "Boat excursion - quieter than the mainland.",
    icon: Turtle,
  },
  {
    name: "Le Morne Brabant",
    tag: "Shore Snorkel",
    region: "South-West",
    type: "West & South-West",
    see: "Shallow, calm lagoon with reef patches; frequent sightings by the coral.",
    go: "Swim from shore - go early for clear water.",
    icon: Turtle,
  },
  {
    name: "Trou aux Biches",
    tag: "Easy Lagoon",
    region: "North",
    type: "North",
    see: "A calm, beginners-friendly lagoon with a short swim out to the turtles' reef.",
    go: "Direct beach entry - best in the morning.",
    icon: Waves,
  },
  {
    name: "Blue Bay Marine Park",
    tag: "Marine Park",
    region: "South",
    type: "East & South",
    see: "A protected reserve - coral gardens, superb clarity and passing turtles.",
    go: "Take a guided tour - reef-safe sunscreen.",
    icon: Fish,
  },
  {
    name: "Ile aux Cerfs",
    tag: "Island Day Trip",
    region: "East",
    type: "East & South",
    see: "Clear lagoon with reef areas nearby - turtles among the snorkelling spots.",
    go: "Comes with most catamaran day trips.",
    icon: Shell,
  },
];

const extraSpots = [
  ["Belle Mare", "Quiet east-coast reef", "#2f8e48"],
  ["Flic en Flac", "Reef turtles when calm", "#f16522"],
  ["Mont Choisy", "Early-morning snorkel", "#2389c9"],
];

const respectTips = [
  ["Keep your distance", "Never touch or chase them."],
  ["Give them air", "Don't block their way up to breathe."],
  ["Don't feed them", "Let turtles behave naturally."],
  ["Reef-safe only", "Sunscreen that spares the coral."],
];

export default async function SwimWithSeaTurtlesInMauritiusPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return localizeStaticPage((
    <main id="main-content" className="min-h-screen bg-white text-[#1c2a2e]">
      <Navbar />

      <article className="mx-auto w-full max-w-5xl px-4 pt-24 pb-20 sm:px-6 lg:pt-28">
        <header>
          {/* <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] font-semibold uppercase tracking-wide text-[#ec5f25]">
            <div className="flex items-center gap-2 normal-case tracking-normal">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[#f16522] text-white">
                <Anchor className="h-4 w-4 fill-white" strokeWidth={2} />
              </span>
              <span className="border-b border-[#f16522] text-[13px] font-bold text-[#1d3144]">
                Mauritius<span className="text-[#f16522]">Explored</span>
              </span>
            </div>
            <p>Wildlife - Ocean</p>
          </div> */}

          <p className="mt-8 text-[11px] font-bold uppercase tracking-wide text-[#f16522]">
            Reefs, Lagoons & Marine Life
          </p>
          <h1 className="mt-2 font-serif text-[clamp(2.4rem,6vw,4rem)] font-bold leading-tight text-[#111d2a]">
            Swim with{" "}
            <span className="font-serif font-normal italic text-[#f16522]">
              Sea Turtles
            </span>
          </h1>
          <p className="mt-4 max-w-4xl font-serif text-sm italic leading-7 text-[#687887] sm:text-base">
            Where to share the water with wild green and hawksbill turtles -
            from easy lagoons off the beach to remote reefs reached by boat.
          </p>

          <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-xs text-[#445465]">
            {turtleRegions.map(([label, color]) => (
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

        <section className="mt-6 space-y-3">
          {turtleSpots.map(
            ({ name, tag, region, type, see, go, icon: Icon }) => (
              <div
                key={name}
                className="flex gap-4 rounded-md border border-[#e7dfd6] bg-white px-4 py-4 shadow-[0_2px_7px_rgba(36,54,67,.035)] sm:gap-5 sm:px-5"
              >
                <span
                  className={`mt-1 grid h-12 w-12 shrink-0 place-items-center rounded-full ${turtleStyles[type]}`}
                >
                  <Icon className="h-6 w-6" strokeWidth={1.8} />
                </span>
                <div>
                  <h2 className="font-serif text-xl font-bold leading-tight text-[#111d2a]">
                    {name}
                  </h2>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-[#2389c9]">
                    {tag}
                    <span className="font-serif font-normal normal-case tracking-normal text-[#7c8791]">
                      {" "}
                      - {region}
                    </span>
                  </p>
                  <p className="mt-2 font-serif text-sm leading-6 text-[#5b6975]">
                    <span className="font-bold text-[#000]">See</span>{" "}
                    {see}
                  </p>
                  <p className="mt-1 font-serif text-sm italic leading-6 text-[#6d7b85]">
                    <span className="font-bold text-[#f16522]">Go</span> {go}
                  </p>
                </div>
              </div>
            ),
          )}
        </section>

        <section className="mt-3 rounded-md border border-[#e7dfd6] bg-white px-4 py-3 sm:px-5">
          <p className="text-[10px] font-bold uppercase tracking-wide text-[#2f8e48]">
            Also Worth a Look
          </p>
          <div className="mt-3 grid gap-3 text-sm sm:grid-cols-3">
            {extraSpots.map(([name, detail, color]) => (
              <p key={name} className="font-serif text-[#5b6975]">
                <span
                  className="mr-2 inline-block h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span className="font-bold text-[#111d2a]">{name}</span> -{" "}
                {detail}
              </p>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-md bg-[#f5f3ef] px-5 py-5 sm:px-6">
          <h2 className="font-serif text-xl font-bold text-[#f16522]">
            Swim with respect
          </h2>
          <div className="mt-4 grid gap-x-10 gap-y-3 sm:grid-cols-2">
            {respectTips.map(([title, text]) => (
              <p
                key={title}
                className="font-serif text-sm leading-6 text-[#5b6975]"
              >
                <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#f16522] align-middle" />
                <span className="font-bold text-[#111d2a]">{title}</span> -{" "}
                {text}
              </p>
            ))}
          </div>
          <p className="mt-4 font-serif text-sm italic leading-6 text-[#77848e]">
            There are no guarantees with wild animals - and that&apos;s exactly
            what makes a real encounter so special.
          </p>
        </section>
      </article>

      <Footer />
    </main>
  ), locale);
}
