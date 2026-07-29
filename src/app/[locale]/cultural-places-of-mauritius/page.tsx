import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { localizeStaticPage } from "@/lib/static-page-localizer";
import type { LucideIcon } from "lucide-react";
import {
  Building2,
  Landmark,
  MapPin,
  ShoppingBag,
} from "lucide-react";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Cultural Places of Mauritius",
  description:
    "Cultural places of Mauritius — temples, colonial mansions, sacred lakes and museums. Discover the island's Creole, Indian, French and Chinese heritage.",
  alternates: { canonical: "/cultural-places-of-mauritius" },
};

const culturalPlaces: {
  name: string;
  type: string;
  location: string;
  description: string;
  tip: string;
  icon: LucideIcon;
  color: string;
  bg: string;
}[] = [
  {
    name: "Aapravasi Ghat",
    type: "UNESCO Site",
    location: "Port Louis harbour",
    description:
      "Where nearly half a million indentured labourers first stepped onto Mauritian soil (1849-1923) - stone arches, a courtyard and a moving museum.",
    tip: "Allow 1.5 hrs - free guided tours on some days.",
    icon: Landmark,
    color: "#f16522",
    bg: "#fff0e7",
  },
  {
    name: "Blue Penny Museum",
    type: "Museum",
    location: "Caudan Waterfront",
    description:
      "Built around two rare 1847 stamps, it tells the whole Mauritian story - the colonial era, its diverse communities and natural history.",
    tip: "Check the stamp-display schedule - great for kids.",
    icon: Building2,
    color: "#2389c9",
    bg: "#eaf7ff",
  },
  {
    name: "Natural History Museum",
    type: "Museum",
    location: "Port Louis",
    description:
      "Home to a near-complete dodo skeleton you won't see anywhere else, alongside endemic birds and marine specimens.",
    tip: "Free entry - set in a handsome colonial building.",
    icon: Building2,
    color: "#2389c9",
    bg: "#eaf7ff",
  },
  {
    name: "Chinese Pagoda & Heritage Museum",
    type: "Temple + Museum",
    location: "Port Louis",
    description:
      "One of the island's oldest Chinese temples and a thoughtful museum on the Hakka & Cantonese communities.",
    tip: "Pair with Chinatown's shops & weekend dim sum.",
    icon: Landmark,
    color: "#2f8e48",
    bg: "#edf8ef",
  },
  {
    name: "Chinatown District",
    type: "Heritage Quarter",
    location: "Port Louis",
    description:
      "A living heritage quarter of family shops, traditional medicine and dried goods - with dim sum at weekends.",
    tip: "Weekend mornings are the most active.",
    icon: ShoppingBag,
    color: "#2389c9",
    bg: "#eaf7ff",
  },
];

export default async function CulturalPlacesOfMauritiusPage({ params }: { params: Promise<{ locale: string }> }) {
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
            <p>Heritage &middot; 05</p>
          </div> */}

          <p className="mt-7 text-xs font-bold uppercase tracking-wide text-[#f16522]">
            Culture &amp; Heritage
          </p>
          <h1 className="mt-2 font-serif text-[clamp(2rem,5vw,3.4rem)] font-bold leading-tight tracking-tight text-[#151f2b]">
            Cultural Places{" "}
            <span className="font-normal italic text-[#f16522]">of Mauritius</span>
          </h1>
          <p className="mt-4 max-w-4xl font-serif text-sm italic leading-relaxed text-[#6f7e88] sm:text-base">
            Beyond the beach - fifteen sites that reveal the island&apos;s layered soul,
            from ancient temples and sacred lakes to colonial houses and museums of
            migration.
          </p>
        </header>

        <section className="mt-8">
          <div className="flex items-center gap-2 border-b border-[#ded6cf] pb-2">
            <MapPin className="h-3.5 w-3.5 text-[#f16522]" strokeWidth={2} />
            <h2 className="text-xs font-bold uppercase tracking-wide text-[#f16522]">
              Port Louis - The Capital
            </h2>
          </div>

          <div className="mt-3 space-y-3">
            {culturalPlaces.map((place) => {
              const PlaceIcon = place.icon;

              return (
                <section
                  key={place.name}
                  className="flex gap-4 rounded-md border border-[#e7dfd6] bg-white px-4 py-5 shadow-[0_2px_7px_rgba(36,54,67,.035)] sm:gap-5 sm:px-6"
                >
                  <span
                    className="mt-1 grid h-12 w-12 shrink-0 place-items-center rounded-full"
                    style={{ backgroundColor: place.bg, color: place.color }}
                  >
                    <PlaceIcon className="h-6 w-6" strokeWidth={1.8} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-serif text-lg font-bold leading-tight text-[#152738] sm:text-xl">
                      {place.name}
                    </h3>
                    <p
                      className="mt-1 text-[10px] font-bold uppercase tracking-wide"
                      style={{ color: place.color }}
                    >
                      {place.type}{" "}
                      <span className="normal-case tracking-normal text-[#8a9398]">
                        - {place.location}
                      </span>
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-[#61707a] sm:text-sm">
                      {place.description}
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-[#61707a] sm:text-sm">
                      <strong className="font-serif text-[#f16522]">Tip</strong>{" "}
                      {place.tip}
                    </p>
                  </div>
                </section>
              );
            })}
          </div>
        </section>
      </article>

      <Footer />
    </main>
  ), locale);
}
