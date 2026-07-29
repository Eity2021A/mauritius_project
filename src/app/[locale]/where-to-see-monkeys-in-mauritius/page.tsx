import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { localizeStaticPage } from "@/lib/static-page-localizer";
import type { LucideIcon } from "lucide-react";
import {
  Car,
  Eye,
  Landmark,
  Leaf,
  MapPin,
  Mountain,
  TreePalm,
  Waves,
} from "lucide-react";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Where to See Monkeys in Mauritius",
  description:
    "Where to see monkeys in Mauritius — spot wild macaques in the south-west highlands, Black River Gorges and beyond. Best places, tips and what to expect.",
  alternates: { canonical: "/where-to-see-monkeys-in-mauritius" },
};

const monkeySpots: {
  name: string;
  tag: string;
  region: string;
  see: string;
  tip: string;
  icon: LucideIcon;
  color: string;
  bg: string;
}[] = [
  {
    name: "Black River Gorges Viewpoint",
    tag: "Viewpoint - National Park",
    region: "South-west highlands",
    see: "Troops gather by the car park, railings and roadside trees - often curious and quick to approach.",
    tip: "Keep food hidden - allow 20-40 min.",
    icon: Eye,
    color: "#2f8e48",
    bg: "#edf8ef",
  },
  {
    name: "Chamarel Viewpoint",
    tag: "Forest Roads",
    region: "Chamarel - South-West",
    see: "Seen along the cooler, greener highland roads and near the forested viewing areas.",
    tip: "Drive slowly - monkeys may cross suddenly.",
    icon: Car,
    color: "#f16522",
    bg: "#fff0e7",
  },
  {
    name: "Alexandra Falls Viewpoint",
    tag: "Waterfall Viewpoint",
    region: "Plaine Champagne",
    see: "Forest all around makes this a prime spot - monkeys near the parking, trees and walking paths.",
    tip: "Don't hold food in your hands while taking photos.",
    icon: Waves,
    color: "#2389c9",
    bg: "#eaf7ff",
  },
  {
    name: "Grand Bassin - Ganga Talao",
    tag: "Sacred Lake",
    region: "Central highlands",
    see: "Troops move through the trees around the temples, the lake and the parking areas.",
    tip: "Dress modestly - keep noise low - go early.",
    icon: Landmark,
    color: "#2f8e48",
    bg: "#edf8ef",
  },
  {
    name: "Black River Gorges National Park",
    tag: "National Park",
    region: "South-West Mauritius",
    see: "The island's largest forest - spot them at roadsides, forest edges, picnic areas and viewpoints.",
    tip: "Bring water & good shoes - weather changes fast.",
    icon: Mountain,
    color: "#2f8e48",
    bg: "#edf8ef",
  },
];

const monkeyRules = [
  ["Never feed them", "Keep all food and snacks hidden and sealed."],
  ["Don't touch or tease", "Keep children close and give them space."],
  ["Secure your things", "Bags, phones and sunglasses are easily snatched."],
  ["Enjoy from a distance", "They are wild, not tame - watch and photograph, don't approach."],
];

export default async function WhereToSeeMonkeysInMauritiusPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return localizeStaticPage((
    <main id="main-content" className="min-h-screen bg-white text-[#1c2a2e]">
      <Navbar />

      <article className="mx-auto w-full max-w-6xl px-4 pt-24 pb-20 sm:px-6 lg:pt-28">
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
            <p>Wildlife - Nature</p>
          </div> */}

          <p className="mt-8 text-[11px] font-bold uppercase tracking-wide text-[#f16522]">
            Wildlife - South-West Highlands
          </p>
          <h1 className="mt-2 font-serif text-[clamp(2.25rem,6vw,4rem)] font-bold leading-tight text-[#111d2a]">
            Where to See{" "}
            <span className="font-serif font-normal italic text-[#f16522]">
              the Monkeys
            </span>
          </h1>
          <p className="mt-4 max-w-4xl font-serif text-sm italic leading-7 text-[#687887] sm:text-base">
            The wild macaques of the southwest highlands are one of the
            island&apos;s happiest surprises - enjoy them from a safe distance,
            and never feed them.
          </p>
        </header>

        <section className="mt-6 space-y-3">
          {monkeySpots.map((spot) => {
            const SpotIcon = spot.icon;

            return (
              <section
                key={spot.name}
                className="flex gap-4 rounded-md border border-[#e7dfd6] bg-white px-4 py-4 shadow-[0_2px_7px_rgba(36,54,67,.035)] sm:gap-5 sm:px-5"
              >
                <span
                  className="mt-1 grid h-12 w-12 shrink-0 place-items-center rounded-full"
                  style={{ backgroundColor: spot.bg, color: spot.color }}
                >
                  <SpotIcon className="h-6 w-6" strokeWidth={1.8} />
                </span>
                <div className="min-w-0">
                  <h2 className="font-serif text-lg font-bold leading-tight text-[#152738] sm:text-xl">
                    {spot.name}
                  </h2>
                  <p
                    className="mt-1 text-[10px] font-bold uppercase tracking-wide"
                    style={{ color: spot.color }}
                  >
                    {spot.tag}{" "}
                    <span className="normal-case tracking-normal text-[#8a9398]">
                      - {spot.region}
                    </span>
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-[#61707a] sm:text-sm">
                    <strong className="font-serif text-[#000]">See</strong>{" "}
                    {spot.see}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-[#61707a] sm:text-sm">
                    <strong className="font-serif text-[#f16522]">Tip</strong>{" "}
                    {spot.tip}
                  </p>
                </div>
              </section>
            );
          })}
        </section>

        <aside className="mt-4 flex gap-4 border-l-4 border-[#2f8e48] bg-[#eaf6ed] px-4 py-4 text-[#2f6f43] sm:items-center sm:px-5">
          <TreePalm className="mt-0.5 h-5 w-5 shrink-0" strokeWidth={2} />
          <p className="text-xs leading-6 sm:text-sm">
            <strong className="font-serif text-[#1d5f34]">
              Make a highlands loop
            </strong>{" "}
            Start at Grand Bassin, then Alexandra Falls, Black River Gorges
            Viewpoint and Chamarel - best sightings and scenery in one drive.
          </p>
        </aside>

        <section className="mt-6 rounded-md bg-[#f5f2ef] px-5 py-6 sm:px-7">
          <h2 className="font-serif text-xl font-bold text-[#f16522]">
            Watch, don&apos;t touch
          </h2>
          <div className="mt-4 grid gap-x-10 gap-y-2 md:grid-cols-2">
            {monkeyRules.map(([title, text]) => (
              <p key={title} className="text-xs leading-relaxed text-[#61707a] sm:text-sm">
                <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#f16522] align-middle" />
                <strong className="font-serif text-[#1d3144]">{title}</strong>{" "}
                - {text}
              </p>
            ))}
          </div>
          <p className="mt-4 font-serif text-sm italic leading-6 text-[#77848e]">
            They may look playful, but a bite means a hospital trip - admire the
            macaques and let them be.
          </p>
       
        </section>
      </article>

      <Footer />
    </main>
  ), locale);
}
