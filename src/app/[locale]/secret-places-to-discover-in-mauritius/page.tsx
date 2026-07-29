import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { localizeStaticPage } from "@/lib/static-page-localizer";
import type { LucideIcon } from "lucide-react";
import {
  Clock3,
  Coffee,
  Compass,
  Leaf,
  Mountain,
  PawPrint,
  Sailboat,
  ShieldCheck,
  TreePalm,
  Utensils,
  Waves,
} from "lucide-react";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Secret Places to Discover in Mauritius",
  description:
    "Secret places to discover in Mauritius — quiet corners, hidden beaches and off-the-map spots well beyond the guidebook. Explore the island's best-kept secrets.",
  alternates: { canonical: "/secret-places-to-discover-in-mauritius" },
};

const secretTypes = [
  ["Nature & Peaks", "#2f8e48"],
  ["Coast & Water", "#2389c9"],
  ["Taste & Culture", "#f16522"],
];

const secretPlaces: {
  name: string;
  tag: string;
  region: string;
  description: string;
  tip: string;
  type: "Nature & Peaks" | "Coast & Water" | "Taste & Culture";
  icon: LucideIcon;
}[] = [
  {
    name: "Gris Gris Beach Cave",
    tag: "Sea Cave",
    region: "Souillac - South",
    description: "A cave beneath wild cliffs where the ocean crashes ashore.",
    tip: "Go at low tide - mind the powerful waves.",
    type: "Coast & Water",
    icon: Waves,
  },
  {
    name: "Allée de Beau Vallon",
    tag: "Tree Tunnel",
    region: "South-East",
    description: "A quiet road roofed by a canopy of tall, arching trees.",
    tip: "Come at golden hour for the best light.",
    type: "Nature & Peaks",
    icon: Leaf,
  },
  {
    name: "Bois Chéri Tea Factory",
    tag: "Tea Plantation",
    region: "Southern highlands",
    description: "Tour a working tea factory with rolling hills & lake views.",
    tip: "Drive in - pair with a south road trip.",
    type: "Taste & Culture",
    icon: Coffee,
  },
  {
    name: "Eau Bleue Waterfall",
    tag: "Turquoise Pools",
    region: "South",
    description: "Clear turquoise pools stepping down through the greenery.",
    tip: "Moderate hike - wear proper shoes.",
    type: "Coast & Water",
    icon: Waves,
  },
  {
    name: "Île aux Aigrettes",
    tag: "Nature Reserve",
    region: "off Mahébourg - SE",
    description: "A restored island of giant tortoises & rare pink pigeons.",
    tip: "Guided boat tours only - book ahead.",
    type: "Nature & Peaks",
    icon: PawPrint,
  },
  {
    name: "Mangroves of Île d'Ambre",
    tag: "Kayak Trails",
    region: "North-East",
    description: "Glide by kayak through calm, biodiverse mangrove channels.",
    tip: "Kayak tour - great for beginners.",
    type: "Coast & Water",
    icon: Sailboat,
  },
  {
    name: "Sophie Nature Walk",
    tag: "Forest Trail",
    region: "South-West",
    description: "A lesser-known trail winding deep through native forest.",
    tip: "Quiet & authentic - off the beaten path.",
    type: "Nature & Peaks",
    icon: TreePalm,
  },
  {
    name: "Petite Rivière Noire",
    tag: "Highest Peak",
    region: "Black River - SW",
    description: "The island's highest summit, with sweeping panoramas.",
    tip: "Hike early for cool air & clear views.",
    type: "Nature & Peaks",
    icon: Mountain,
  },
  {
    name: "La Cambuse",
    tag: "Wild Beach",
    region: "South-East",
    description: "A raw, untouched beach - sometimes with cows by the sea.",
    tip: "Peaceful & surreal - bring a camera.",
    type: "Coast & Water",
    icon: Waves,
  },
  {
    name: "Biscuiterie Rault",
    tag: "Cassava Biscuits",
    region: "Mahébourg",
    description: "A family factory making cassava biscuits the old way.",
    tip: "Tour & taste - pair with Blue Bay.",
    type: "Taste & Culture",
    icon: Utensils,
  },
];

const secretTypeStyles = {
  "Nature & Peaks": { color: "#2f8e48", bg: "#edf8ef" },
  "Coast & Water": { color: "#2389c9", bg: "#eaf7ff" },
  "Taste & Culture": { color: "#f16522", bg: "#fff0e7" },
};

export default async function SecretPlacesToDiscoverInMauritiusPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return localizeStaticPage((
    <main id="main-content" className="min-h-screen bg-white text-[#1c2a2e]">
      <Navbar />

      <article className="mx-auto w-full max-w-6xl px-4 pt-24 pb-20 sm:px-6 lg:pt-28 xl:px-0">
        <header>
          <p className="mt-7 text-xs font-bold uppercase tracking-wide text-[#f16522]">
            Beyond the Guidebook
          </p>
          <h1 className="mt-2 font-serif text-[clamp(2rem,5vw,3.4rem)] font-bold leading-tight tracking-tight text-[#151f2b]">
            Secret Places{" "}
            <span className="font-normal italic text-[#f16522]">to Discover</span>
          </h1>
          <p className="mt-4 max-w-4xl font-serif text-sm italic leading-relaxed text-[#6f7e88] sm:text-base">
            Ten of the island&apos;s quieter corners - hidden caves, canopy roads,
            native reserves and mountain trails, far from the usual tourist trail.
          </p>
        </header>

        <section className="mt-4">
          <div className="grid max-w-xl grid-cols-1 gap-2 text-xs text-[#44525a] sm:grid-cols-3">
            {secretTypes.map(([label, color]) => (
              <div key={label} className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
                <span>{label}</span>
              </div>
            ))}
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {secretPlaces.map((place) => {
              const PlaceIcon = place.icon;
              const style = secretTypeStyles[place.type];

              return (
                <section
                  key={place.name}
                  className="flex gap-4 rounded-md border border-[#e7dfd6] bg-white px-4 py-4 shadow-[0_2px_7px_rgba(36,54,67,.035)] sm:gap-5 sm:px-5"
                >
                  <span
                    className="mt-1 grid h-12 w-12 shrink-0 place-items-center rounded-full"
                    style={{ backgroundColor: style.bg, color: style.color }}
                  >
                    <PlaceIcon className="h-6 w-6" strokeWidth={1.8} />
                  </span>
                  <div className="min-w-0">
                    <h2 className="font-serif text-base font-bold leading-tight text-[#152738] sm:text-lg">
                      {place.name}
                    </h2>
                    <p
                      className="mt-1 text-[10px] font-bold uppercase tracking-wide"
                      style={{ color: style.color }}
                    >
                      {place.tag}{" "}
                      <span className="normal-case tracking-normal text-[#8a9398]">
                        - {place.region}
                      </span>
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-[#61707a] sm:text-sm">
                      {place.description}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-[#61707a] sm:text-sm">
                      <strong className="font-serif text-[#f16522]">Go</strong>{" "}
                      {place.tip}
                    </p>
                  </div>
                </section>
              );
            })}
          </div>
        </section>

        <section className="mt-8 rounded-md bg-[#f5f2ef] px-5 py-5 sm:px-7">
          <h2 className="font-serif text-xl font-bold text-[#f16522]">
            Explore off the map
          </h2>
          <div className="mt-3 grid gap-4 md:grid-cols-3">
            {[
              [Compass, "Drive yourself", "Many gems are inland - a car makes them reachable."],
              [Clock3, "Time it right", "Golden hour and low tide transform these spots."],
              [ShieldCheck, "Tread lightly", "These places stay special when kept clean & quiet."],
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
            Half the magic is the journey - go slow, ask locals, and let the island
            surprise you.
          </p>
        </section>
      </article>

      <Footer />
    </main>
  ), locale);
}
