import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { localizeStaticPage } from "@/lib/static-page-localizer";
import type { LucideIcon } from "lucide-react";
import {
  Compass,
  Landmark,
  Leaf,
  MapPin,
  Mountain,
  Route,
  ShieldCheck,
  TreePalm,
  TriangleAlert,
  Waves,
} from "lucide-react";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Best Hikes in Mauritius",
  description:
    "The best hikes in Mauritius — from Le Morne Brabant to the Seven Waterfalls and Black River Gorges. Trails, peaks and viewpoints for every level.",
  alternates: { canonical: "/best-hikes-in-mauritius" },
};

const hikeDifficulties = [
  ["Easy", "#2f8e48"],
  ["Moderate", "#2389c9"],
  ["Challenging", "#f16522"],
];

const hikes: {
  title: string;
  label: string;
  region: string;
  description: string;
  level: "Easy" | "Moderate" | "Challenging";
  icon: LucideIcon;
}[] = [
  {
    title: "Piton Petite Riviere Noire",
    label: "Highest Peak",
    region: "Black River",
    description: "Summit panorama over the west coast & Le Morne lagoon.",
    level: "Challenging",
    icon: Mountain,
  },
  {
    title: "Le Pouce",
    label: "The Thumb Peak",
    region: "Moka - Central",
    description: "3rd-highest peak - views over Port Louis & the plateau.",
    level: "Moderate",
    icon: Mountain,
  },
  {
    title: "Le Morne Brabant",
    label: "UNESCO Peak",
    region: "South-West",
    description: "A steep upper climb to iconic lagoon & islet views.",
    level: "Challenging",
    icon: Route,
  },
  {
    title: "Black River Gorges",
    label: "Forest Trails",
    region: "South-West",
    description: "Native forest, Alexandra Falls & deep-valley viewpoints.",
    level: "Moderate",
    icon: TreePalm,
  },
  {
    title: "Sept Cascades",
    label: "Seven Falls",
    region: "Henrietta - Central",
    description: "Steep, muddy trail to a chain of falls & natural pools.",
    level: "Challenging",
    icon: Landmark,
  },
  {
    title: "Chamarel Trails",
    label: "Forest & Falls",
    region: "South-West",
    description: "Waterfall, coloured earth & Ebony Forest walks.",
    level: "Easy",
    icon: Leaf,
  },
  {
    title: "Macchabee Forest",
    label: "Native Forest",
    region: "from Petrin",
    description: "Quiet birdlife trail with west-coast viewpoints.",
    level: "Moderate",
    icon: Waves,
  },
  {
    title: "Gris Gris Coast",
    label: "Coastal Cliffs",
    region: "Souillac - South",
    description: "Dramatic cliffs, La Roche Qui Pleure & sea spray.",
    level: "Moderate",
    icon: Waves,
  },
  {
    title: "Le Souffleur",
    label: "Wild Coast",
    region: "South coast",
    description: "A blowhole, volcanic rocks & crashing surf.",
    level: "Challenging",
    icon: Waves,
  },
  {
    title: "Cascade 500 Pieds",
    label: "Hidden Fall",
    region: "South",
    description: "River crossings & cane fields to a cliff-ringed fall.",
    level: "Moderate",
    icon: Landmark,
  },
  {
    title: "Royal Palm Forest",
    label: "Palm Forest",
    region: "South-East",
    description: "Easy shaded walk among royal palms & greenery.",
    level: "Easy",
    icon: TreePalm,
  },
  {
    title: "Bras d'Eau",
    label: "Coastal Forest",
    region: "North-East",
    description: "Flat, shaded birdwatching trails & wetlands.",
    level: "Easy",
    icon: Leaf,
  },
];

const levelStyles = {
  Easy: { color: "#2f8e48", bg: "#edf8ef" },
  Moderate: { color: "#2389c9", bg: "#eaf7ff" },
  Challenging: { color: "#f16522", bg: "#fff0e7" },
};

export default async function BestHikesInMauritiusPage({ params }: { params: Promise<{ locale: string }> }) {
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
            <p>Hiking &middot; Nature</p>
          </div> */}

          <p className="mt-7 text-xs font-bold uppercase tracking-wide text-[#f16522]">
            Trails &middot; Peaks &middot; Waterfalls
          </p>
          <h1 className="mt-2 font-serif text-[clamp(2rem,5vw,3.4rem)] font-bold leading-tight tracking-tight text-[#151f2b]">
            The Best Hikes{" "}
            <span className="font-normal italic text-[#f16522]">in Mauritius</span>
          </h1>
          <p className="mt-4 max-w-4xl font-serif text-sm italic leading-relaxed text-[#6f7e88] sm:text-base">
            Beyond the beach - twelve of the island&apos;s best trails, from easy
            coastal forests to bucket-list mountain summits.
          </p>
        </header>

        <section className="mt-8">
          <div className="grid max-w-md grid-cols-3 gap-3 text-xs text-[#44525a]">
            {hikeDifficulties.map(([label, color]) => (
              <div key={label} className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
                <span>{label}</span>
              </div>
            ))}
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {hikes.map((hike) => {
              const HikeIcon = hike.icon;
              const style = levelStyles[hike.level];

              return (
                <section
                  key={hike.title}
                  className="flex gap-4 rounded-md border border-[#e7dfd6] bg-white px-4 py-4 shadow-[0_2px_7px_rgba(36,54,67,.035)]"
                >
                  <span
                    className="mt-1 grid h-12 w-12 shrink-0 place-items-center rounded-full"
                    style={{ backgroundColor: style.bg, color: style.color }}
                  >
                    <HikeIcon className="h-6 w-6" strokeWidth={1.7} />
                  </span>
                  <div className="min-w-0">
                    <h2 className="font-serif text-base font-bold leading-tight text-[#152738] sm:text-lg">
                      {hike.title}
                    </h2>
                    <p
                      className="mt-1 text-[10px] font-bold uppercase tracking-wide"
                      style={{ color: style.color }}
                    >
                      {hike.label} <span className="text-[#8a9398]">- {hike.region}</span>
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-[#61707a] sm:text-sm">
                      {hike.description}
                    </p>
                  </div>
                </section>
              );
            })}
          </div>
        </section>

        <section className="mt-8 rounded-md bg-[#f5f2ef] px-5 py-5 sm:px-7">
          <h2 className="font-serif text-xl font-bold text-[#f16522]">Hike smart</h2>
          <div className="mt-3 grid gap-4 md:grid-cols-3">
            {[
              [Compass, "Start early", "Beat the heat & crowds - mornings are clearest."],
              [TriangleAlert, "Check the weather", "Skip trails after heavy rain - rocks turn slippery."],
              [ShieldCheck, "Come prepared", "Water, grippy shoes, a rain layer & offline maps."],
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
            Keep back from cliffs & waves on the wild south coast, respect Le Morne&apos;s
            heritage, and leave no trace.
          </p>
        </section>
      </article>

      <Footer />
    </main>
  ), locale);
}
