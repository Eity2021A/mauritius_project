import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { localizeStaticPage } from "@/lib/static-page-localizer";
import type { LucideIcon } from "lucide-react";
import {
  Gem,
  MapPin,
  Shirt,
  ShoppingBag,
  Store,
  Utensils,
} from "lucide-react";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Best Markets in Mauritius",
  description:
    "The best markets in Mauritius — food, spices, crafts and street eats. Explore Port Louis, Flacq and Quatre Bornes, plus tips for bargaining like a local.",
  alternates: { canonical: "/best-markets-of-mauritius" },
};

const markets: {
  name: string;
  type: string;
  location: string;
  buy: string;
  tip: string;
  icon: LucideIcon;
  color: string;
  bg: string;
}[] = [
  {
    name: "Central Market",
    type: "Traditional Market",
    location: "Port Louis",
    buy: "Street food, produce, spices, tropical fruit & souvenirs - try dholl puri, gateau piment & alouda.",
    tip: "Go in the morning - bring cash & keep belongings close.",
    icon: Utensils,
    color: "#2389c9",
    bg: "#eaf7ff",
  },
  {
    name: "Le Craft Market",
    type: "Craft Market",
    location: "Caudan Waterfront",
    buy: "Handmade souvenirs, woodcarvings, jewelry, textiles, model ships & local art.",
    tip: "Calmer & curated - cafes and parking right nearby.",
    icon: Gem,
    color: "#f16522",
    bg: "#fff0e7",
  },
  {
    name: "Flacq Market",
    type: "Traditional Market",
    location: "Central Flacq - East",
    buy: "One of the island's biggest - fruit, veg, clothes, textiles, snacks & spices.",
    tip: "Go early - bring cash - wear comfortable shoes.",
    icon: ShoppingBag,
    color: "#2f8e48",
    bg: "#edf8ef",
  },
  {
    name: "Quatre Bornes Market Fair",
    type: "Textile Market",
    location: "Quatre Bornes - Centre",
    buy: "Fabrics, clothes, table linen, bags & shoes - the island's textile bargain hub.",
    tip: "Bargain politely - check length for textile days.",
    icon: Shirt,
    color: "#f16522",
    bg: "#fff0e7",
  },
  {
    name: "Mahebourg Market",
    type: "Local Market",
    location: "Mahebourg - South-East",
    buy: "Local food, produce, textiles & small souvenirs in a slower, traditional setting.",
    tip: "Pair with the waterfront, museum & Blue Bay.",
    icon: ShoppingBag,
    color: "#2f8e48",
    bg: "#edf8ef",
  },
  {
    name: "Grand Baie Bazaar",
    type: "Tourist Bazaar",
    location: "Grand Baie - North",
    buy: "Beachwear, bags, hats, dresses, jewelry & handicrafts, handy for the resorts.",
    tip: "Compare prices - don't rush into the first shop.",
    icon: Store,
    color: "#2389c9",
    bg: "#eaf7ff",
  },
];

export default async function BestMarketsInMauritiusPage({ params }: { params: Promise<{ locale: string }> }) {
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
            <p>Markets &middot; Shopping</p>
          </div> */}

          <p className="mt-7 text-xs font-bold uppercase tracking-wide text-[#f16522]">
            Markets &amp; Bazaars
          </p>
          <h1 className="mt-2 font-serif text-[clamp(2rem,5vw,3.4rem)] font-bold leading-tight tracking-tight text-[#151f2b]">
            The Best Markets{" "}
            <span className="font-normal italic text-[#f16522]">of Mauritius</span>
          </h1>
          <p className="mt-4 max-w-4xl font-serif text-sm italic leading-relaxed text-[#6f7e88] sm:text-base">
            Six markets where the island&apos;s real rhythm lives - food, spice, crafts
            and textiles, and the gentle art of a friendly bargain.
          </p>
        </header>

        <section className="mt-7 space-y-3">
          {markets.map((market) => {
            const MarketIcon = market.icon;

            return (
              <section
                key={market.name}
                className="flex gap-4 rounded-md border border-[#e7dfd6] bg-white px-4 py-4 shadow-[0_2px_7px_rgba(36,54,67,.035)] sm:gap-5 sm:px-5"
              >
                <span
                  className="mt-1 grid h-12 w-12 shrink-0 place-items-center rounded-full"
                  style={{ backgroundColor: market.bg, color: market.color }}
                >
                  <MarketIcon className="h-6 w-6" strokeWidth={1.8} />
                </span>
                <div className="min-w-0">
                  <h2 className="font-serif text-lg font-bold leading-tight text-[#152738] sm:text-xl">
                    {market.name}
                  </h2>
                  <p
                    className="mt-1 text-[10px] font-bold uppercase tracking-wide"
                    style={{ color: market.color }}
                  >
                    {market.type}{" "}
                    <span className="normal-case tracking-normal text-[#8a9398]">
                      - {market.location}
                    </span>
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-[#61707a] sm:text-sm">
                    <strong className="font-serif text-[#152738]">Buy</strong>{" "}
                    {market.buy}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-[#61707a] sm:text-sm">
                    <strong className="font-serif text-[#f16522]">Tip</strong>{" "}
                    {market.tip}
                  </p>
                </div>
              </section>
            );
          })}
        </section>

        <section className="mt-8 rounded-md bg-[#f5f2ef] px-5 py-5 sm:px-7">
          <h2 className="font-serif text-xl font-bold text-[#f16522]">
            Shop the markets like a local
          </h2>
          <div className="mt-3 grid gap-x-8 gap-y-2 md:grid-cols-2">
            {[
              ["Bring", "Cash, a reusable bag, comfy shoes and a sun hat."],
              ["Bargain kindly", "Keep it friendly, and ask before photographing people."],
              ["Best buys", "Spices, vanilla, tea, jewelry, woodcarvings, model ships & textiles."],
              ["Eat well", "Pick busy stalls; ask before the chilli - dholl puri, samosas & biryani."],
            ].map(([title, text]) => (
              <p key={title} className="flex gap-2 text-xs leading-relaxed text-[#61707a] sm:text-sm">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f16522]" />
                <span>
                  <strong className="font-serif text-[#152738]">{title}</strong>
                  <span> - {text}</span>
                </span>
              </p>
            ))}
          </div>
          <p className="mt-4 font-serif text-xs italic leading-relaxed text-[#7a858c]">
            Keep valuables close, go with curiosity rather than urgency - the browsing
            is half the fun.
          </p>
        </section>
      </article>

      <Footer />
    </main>
  ), locale);
}
