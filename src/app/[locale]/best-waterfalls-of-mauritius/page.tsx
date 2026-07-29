import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { localizeStaticPage } from "@/lib/static-page-localizer";
import type { LucideIcon } from "lucide-react";
import {
  CloudRain,
  Droplets,
  Landmark,
  MapPin,
  ShieldCheck,
} from "lucide-react";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Best Waterfalls of Mauritius",
  description:
    "The best waterfalls in Mauritius — from Chamarel and Tamarind Falls to hidden forest cascades. Where to find them, how to get there and when to go.",
  alternates: { canonical: "/best-waterfalls-of-mauritius" },
};

const accessTypes = [
  ["Roadside viewpoint", "#2f8e48"],
  ["Hike to reach", "#f16522"],
  ["Boat or air", "#2389c9"],
];

const waterfalls: {
  name: string;
  tag: string;
  region: string;
  description: string;
  tip: string;
  access: "Roadside viewpoint" | "Hike to reach" | "Boat or air";
  icon: LucideIcon;
  featured?: boolean;
}[] = [
  {
    name: "Chamarel Waterfall",
    tag: "Highest Fall",
    region: "Chamarel - SW",
    description: "The island's tallest drop (~80 m) through tropical forest.",
    tip: "Easy viewpoint platform; superb for photos.",
    access: "Roadside viewpoint",
    icon: Landmark,
  },
  {
    name: "Tamarind Falls (7 Cascades)",
    tag: "Seven Cascades",
    region: "Black River",
    description: "Seven falls hidden in a valley; three are easily reached.",
    tip: "Guided hike with wild swimming pools.",
    access: "Hike to reach",
    icon: Landmark,
  },
  {
    name: "Rochester Falls",
    tag: "Rock Columns",
    region: "Souillac - South",
    description: "Water fans over striking rectangular rock formations.",
    tip: "Short rough track; local guides on site.",
    access: "Hike to reach",
    icon: Landmark,
  },
  {
    name: "Eau Bleu - Cascade La Source",
    tag: "Blue Water",
    region: "South",
    description: "Faint turquoise water tumbling across three levels.",
    tip: "Tricky to reach - but worth the effort.",
    access: "Hike to reach",
    icon: Landmark,
  },
  {
    name: "Alexandra Falls",
    tag: "Forest Viewpoint",
    region: "Plaine Champagne",
    description: "A wispy fall framed by Black River Gorges scenery.",
    tip: "Roadside viewpoint on the Gorge Table route.",
    access: "Roadside viewpoint",
    icon: Landmark,
  },
  {
    name: "Grand River South East",
    tag: "GRSE Falls",
    region: "East - by boat",
    description: "A coastal waterfall near Ile aux Cerfs, reached by water.",
    tip: "Included in most catamaran day tours.",
    access: "Boat or air",
    icon: Landmark,
  },
  {
    name: "Cascade Leon",
    tag: "Hidden Cascade",
    region: "near Chamarel",
    description: "A powerful cascade into a rocky, forest-ringed basin.",
    tip: "Scenic hike; lesser-known & untouched.",
    access: "Hike to reach",
    icon: Landmark,
  },
  {
    name: "Cascade 500 Feet",
    tag: "Dramatic Drop",
    region: "Chamarel",
    description: "A spectacular high fall set in wild, rugged country.",
    tip: "Adventure hike through a rugged valley.",
    access: "Hike to reach",
    icon: Landmark,
  },
  {
    name: "Cascades Mamzel",
    tag: "Natural Pools",
    region: "South",
    description: "A secluded gem - raw beauty and quiet natural pools.",
    tip: "Scenic hike; far from the tourist route.",
    access: "Hike to reach",
    icon: Landmark,
  },
  {
    name: "Underwater Waterfall",
    tag: "Bonus - Illusion",
    region: "Le Morne",
    description: "An optical illusion of sand & currents off Le Morne.",
    tip: "Seen only by helicopter or seaplane.",
    access: "Boat or air",
    icon: Landmark,
    featured: true,
  },
];

const accessStyles = {
  "Roadside viewpoint": { color: "#2f8e48", bg: "#edf8ef" },
  "Hike to reach": { color: "#f16522", bg: "#fff0e7" },
  "Boat or air": { color: "#2389c9", bg: "#eaf7ff" },
};

export default async function BestWaterfallsOfMauritiusPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return localizeStaticPage((
    <main id="main-content" className="min-h-screen bg-white text-[#1c2a2e]">
      <Navbar />

      <article className="mx-auto w-full max-w-6xl px-4 pt-24 pb-20 sm:px-6 lg:pt-28 xl:px-0">
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
            <p>Waterfalls &middot; Nature</p>
          </div> */}

          <p className="mt-7 text-xs font-bold uppercase tracking-wide text-[#f16522]">
            Forests, Gorges &amp; Cascades
          </p>
          <h1 className="mt-2 font-serif text-[clamp(2rem,5vw,3.4rem)] font-bold leading-tight tracking-tight text-[#151f2b]">
            The Best Waterfalls{" "}
            <span className="font-normal italic text-[#f16522]">of Mauritius</span>
          </h1>
          <p className="mt-4 max-w-4xl font-serif text-sm italic leading-relaxed text-[#6f7e88] sm:text-base">
            Beyond the beaches - turquoise pools, forest cascades and the island&apos;s
            tallest drops, from easy viewpoints to wild adventure hikes.
          </p>
        </header>

        <section className="mt-4">
          <div className="grid max-w-xl grid-cols-1 gap-2 text-xs text-[#44525a] sm:grid-cols-3">
            {accessTypes.map(([label, color]) => (
              <div key={label} className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
                <span>{label}</span>
              </div>
            ))}
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {waterfalls.map((waterfall) => {
              const WaterfallIcon = waterfall.icon;
              const style = accessStyles[waterfall.access];

              return (
                <section
                  key={waterfall.name}
                  className="flex gap-4 rounded-md border bg-white px-4 py-4 shadow-[0_2px_7px_rgba(36,54,67,.035)] sm:gap-5 sm:px-5"
                  style={{
                    borderColor: waterfall.featured ? "#2389c9" : "#e7dfd6",
                    boxShadow: waterfall.featured
                      ? "0 0 0 1px rgba(35,137,201,.85)"
                      : undefined,
                  }}
                >
                  <span
                    className="mt-1 grid h-12 w-12 shrink-0 place-items-center rounded-full"
                    style={{ backgroundColor: style.bg, color: style.color }}
                  >
                    <WaterfallIcon className="h-6 w-6" strokeWidth={1.8} />
                  </span>
                  <div className="min-w-0">
                    <h2 className="font-serif text-base font-bold leading-tight text-[#152738] sm:text-lg">
                      {waterfall.name}
                    </h2>
                    <p
                      className="mt-1 text-[10px] font-bold uppercase tracking-wide"
                      style={{ color: style.color }}
                    >
                      {waterfall.tag}{" "}
                      <span className="normal-case tracking-normal text-[#8a9398]">
                        - {waterfall.region}
                      </span>
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-[#61707a] sm:text-sm">
                      {waterfall.description}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-[#61707a] sm:text-sm">
                      <strong className="font-serif text-[#f16522]">Go</strong>{" "}
                      {waterfall.tip}
                    </p>
                  </div>
                </section>
              );
            })}
          </div>
        </section>

        <section className="mt-8 rounded-md bg-[#f5f2ef] px-5 py-5 sm:px-7">
          <h2 className="font-serif text-xl font-bold text-[#f16522]">
            Chasing waterfalls
          </h2>
          <div className="mt-3 grid gap-4 md:grid-cols-3">
            {[
              [Droplets, "Wear grip", "Trails get muddy & slippery - bring proper shoes."],
              [CloudRain, "Go after rain", "Falls run fullest in the wetter months, roughly Dec-Apr."],
              [ShieldCheck, "Take a guide", "Hidden falls are easier - and safer - with a local guide."],
            ].map(([Icon, title, text]) => {
              const TipIcon = Icon as LucideIcon;

              return (
                <div key={title as string} className="flex gap-3">
                  <TipIcon className="mt-0.5 h-5 w-5 shrink-0 text-[#2389c9]" strokeWidth={1.8} />
                  <div>
                    <h3 className="font-serif text-sm font-bold text-[#152738]">{title as string}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-[#61707a]">{text as string}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-4 font-serif text-xs italic leading-relaxed text-[#7a858c]">
            Many of the finest falls are wild and unmarked - respect the forest and
            check conditions before you set off.
          </p>
        </section>
      </article>

      <Footer />
    </main>
  ), locale);
}
