import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { localizeStaticPage } from "@/lib/static-page-localizer";
import type { LucideIcon } from "lucide-react";
import {
  BookOpenCheck,
  Leaf,
  MapPin,
  Mountain,
  PawPrint,
  Sailboat,
  ShieldCheck,
  TreePalm,
  TriangleAlert,
  Waves,
} from "lucide-react";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Nature Reserves and Parks in Mauritius",
  description:
    "Nature reserves and parks in Mauritius — forests, conservation islands, gardens and marine parks. Where to see the island's rare, found-nowhere-else wildlife.",
  alternates: { canonical: "/nature-reserves-and-parks-in-mauritius" },
};

const natureTypes = [
  ["Forest & Hiking", "#2f8e48"],
  ["Wildlife & Conservation", "#f16522"],
  ["Marine & Lagoon", "#2389c9"],
];

const naturePlaces: {
  name: string;
  tag: string;
  region: string;
  description: string;
  type: "Forest & Hiking" | "Wildlife & Conservation" | "Marine & Lagoon";
  icon: LucideIcon;
}[] = [
  {
    name: "Black River Gorges",
    tag: "National Park",
    region: "South-West",
    description: "Native forest, waterfalls & the island's top viewpoints.",
    type: "Forest & Hiking",
    icon: Leaf,
  },
  {
    name: "Bras d'Eau",
    tag: "Forest Park",
    region: "North-East",
    description: "Quiet woodland trails & gentle birdwatching.",
    type: "Forest & Hiking",
    icon: TreePalm,
  },
  {
    name: "Ile aux Aigrettes",
    tag: "Conservation Isle",
    region: "off Mahebourg",
    description: "Guided island tour - giant tortoises & rare birds.",
    type: "Wildlife & Conservation",
    icon: PawPrint,
  },
  {
    name: "Ebony Forest",
    tag: "Forest Reserve",
    region: "Chamarel",
    description: "Restored native ebony forest & endemic species.",
    type: "Forest & Hiking",
    icon: TreePalm,
  },
  {
    name: "La Vanille Nature Park",
    tag: "Wildlife Park",
    region: "South",
    description: "Giant tortoises, crocodiles & easy family trails.",
    type: "Wildlife & Conservation",
    icon: PawPrint,
  },
  {
    name: "Vallee de Ferney",
    tag: "Forest Valley",
    region: "South-East",
    description: "Native-forest hikes & birding in a quiet valley.",
    type: "Forest & Hiking",
    icon: Mountain,
  },
  {
    name: "Casela Nature Parks",
    tag: "Adventure Park",
    region: "West",
    description: "Animal encounters, activities & viewpoints for families.",
    type: "Wildlife & Conservation",
    icon: PawPrint,
  },
  {
    name: "Pamplemousses Garden",
    tag: "Botanic Garden",
    region: "North",
    description: "Giant water lilies & historic palm avenues.",
    type: "Forest & Hiking",
    icon: Leaf,
  },
  {
    name: "Petrin Nature Reserve",
    tag: "Nature Reserve",
    region: "Central highlands",
    description: "Cool, dense native forest & endemic plants.",
    type: "Forest & Hiking",
    icon: Leaf,
  },
  {
    name: "Blue Bay Marine Park",
    tag: "Marine Park",
    region: "South-East",
    description: "Clear water & coral - snorkel or glass-bottom boat.",
    type: "Marine & Lagoon",
    icon: Waves,
  },
  {
    name: "Ile d'Ambre & Bernache",
    tag: "Mangrove Lagoon",
    region: "North-East",
    description: "Calm mangroves & islets - kayak or catamaran.",
    type: "Marine & Lagoon",
    icon: Sailboat,
  },
  {
    name: "Le Morne Brabant",
    tag: "UNESCO Mountain",
    region: "South-West",
    description: "Iconic peak & lagoon - best hiked with a guide.",
    type: "Forest & Hiking",
    icon: Mountain,
  },
];

const natureTypeStyles = {
  "Forest & Hiking": { color: "#2f8e48", bg: "#edf8ef" },
  "Wildlife & Conservation": { color: "#f16522", bg: "#fff0e7" },
  "Marine & Lagoon": { color: "#2389c9", bg: "#eaf7ff" },
};

export default async function NatureReservesAndParksInMauritiusPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return localizeStaticPage((
    <main id="main-content" className="min-h-screen bg-white text-[#1c2a2e]">
      <Navbar />

      <article className="mx-auto w-full max-w-6xl px-4 pt-24 pb-20 sm:px-6 lg:pt-28 xl:px-0">
        <header>
          <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] font-semibold uppercase tracking-wide text-[#ec5f25]">
            <p>Nature &middot; Conservation</p>
          </div>
          <p className="mt-7 text-xs font-bold uppercase tracking-wide text-[#f16522]">
            Protected &amp; Wild Mauritius
          </p>
          <h1 className="mt-2 font-serif text-[clamp(2rem,5vw,3.4rem)] font-bold leading-tight tracking-tight text-[#151f2b]">
            Nature Reserves{" "}
            <span className="font-normal italic text-[#f16522]">&amp; Parks</span>
          </h1>
          <p className="mt-4 max-w-4xl font-serif text-sm italic leading-relaxed text-[#6f7e88] sm:text-base">
            Beyond the beach - a dozen forests, conservation islands, gardens and
            marine parks protecting the island&apos;s rare, found-nowhere-else wildlife.
          </p>
        </header>

        <section className="mt-4">
          <div className="grid max-w-xl grid-cols-1 gap-2 text-xs text-[#44525a] sm:grid-cols-3">
            {natureTypes.map(([label, color]) => (
              <div key={label} className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
                <span>{label}</span>
              </div>
            ))}
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {naturePlaces.map((place) => {
              const PlaceIcon = place.icon;
              const style = natureTypeStyles[place.type];

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
                  </div>
                </section>
              );
            })}
          </div>
        </section>

        <section className="mt-8 rounded-md bg-[#f5f2ef] px-5 py-5 sm:px-7">
          <h2 className="font-serif text-xl font-bold text-[#f16522]">
            Explore responsibly
          </h2>
          <div className="mt-3 grid gap-4 md:grid-cols-3">
            {[
              [ShieldCheck, "Stay on trails", "Keep to marked paths to protect fragile habitats."],
              [TriangleAlert, "Don't feed wildlife", "Never feed the monkeys - keep food hidden & sealed."],
              [BookOpenCheck, "Guide & book", "Some reserves, like Aigrettes, Le Morne, need a guide."],
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
            Spend a day or two away from the beach - the forests, islands and gardens
            are where the real Mauritius survives.
          </p>
        </section>
      </article>

      <Footer />
    </main>
  ), locale);
}
