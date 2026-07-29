import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { localizeStaticPage } from "@/lib/static-page-localizer";
import { MapPin } from "lucide-react";
import Image from "next/image";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Best Catamaran Cruises in Mauritius",
  description:
    "The best catamaran cruises in Mauritius — full-day sailing, snorkelling and sunset trips to Ile aux Cerfs, Ile aux Benitiers and the northern islands.",
  alternates: { canonical: "/best-catamaran-cruises-in-mauritius" },
};

const cruiseCoasts = [
  {
    coast: "North Coast",
    note: "dramatic islands & Grand Baie",
    color: "#2389c9",
    cruises: [
      ["Northern Islands", "Coin de Mire, Flat & Gabriel trio"],
      ["Bain Boeuf", "luxury shared island cruise"],
      ["Ilot Bernache", "quiet mangrove sail - Grand Gaube"],
    ],
  },
  {
    coast: "East Coast",
    note: "the classic lagoon day",
    color: "#2f8e48",
    cruises: [
      ["Ile aux Cerfs", "the classic turquoise-lagoon cruise"],
      ["GRSE Waterfall", "a boat stop by the falls"],
      ["Trou d'Eau Douce", "the main east coast departure"],
    ],
  },
  {
    coast: "West Coast",
    note: "dolphins & Le Morne sunsets",
    color: "#f16522",
    cruises: [
      ["Ilot Benitiers", "Le Morne views & crystal lagoon"],
      ["Black River", "dolphin swims & sunset sails"],
    ],
  },
  {
    coast: "South Coast",
    note: "power cat blues",
    color: "#d89b24",
    cruises: [
      ["South-East Lagoon", "power cat from Pointe d'Esny"],
      ["Blue Bay", "a top snorkelling stop"],
    ],
  },
];

const cruiseLegend = [
  ["North", "#2389c9"],
  ["East", "#2f8e48"],
  ["West", "#f16522"],
  ["South", "#d89b24"],
];



export default async function BestCatamaranCruisesInMauritiusPage({ params }: { params: Promise<{ locale: string }> }) {
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
            <p>On the Water &middot; 2026</p>
          </div> */}

          <p className="mt-7 text-xs font-bold uppercase tracking-wide text-[#f16522]">
            Sail &middot; Snorkel &middot; Island-Hop
          </p>
          <h1 className="mt-2 font-serif text-[clamp(2rem,5vw,3.4rem)] font-bold leading-tight tracking-tight text-[#151f2b]">
            The Best Catamaran{" "}
            <span className="font-normal italic text-[#f16522]">Cruises</span>
          </h1>
          <p className="mt-4 max-w-4xl font-serif text-sm italic leading-relaxed text-[#6f7e88] sm:text-base">
            Turquoise lagoons, island stops and a BBQ on deck - the island&apos;s finest
            days out on the water, grouped by coast.
          </p>
        </header>

        <section className="mt-8 grid gap-8 lg:grid-cols-[1fr_.78fr] lg:items-start">
          <div>
            <div className="grid max-w-xl grid-cols-2 gap-3 text-xs text-[#44525a] sm:grid-cols-4">
              {cruiseLegend.map(([label, color]) => (
                <div key={label} className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
                  <span>{label}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 space-y-5">
              {cruiseCoasts.map((group) => (
                <section key={group.coast}>
                  <div className="flex flex-wrap items-baseline gap-2 border-b border-[#ded6cf] pb-1.5">
                    <h2
                      className="font-serif text-lg font-bold uppercase leading-none"
                      style={{ color: group.color }}
                    >
                      {group.coast}
                    </h2>
                    <p className="font-serif text-xs italic text-[#8a9398]">{group.note}</p>
                  </div>
                  <div className="mt-2.5 space-y-1.5">
                    {group.cruises.map(([name, text]) => (
                      <p key={name} className="flex gap-2 text-xs leading-relaxed text-[#61707a] sm:text-sm">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: group.color }} />
                        <span>
                          <strong className="font-serif text-[#152738]">{name}</strong>
                          <span> - {text}</span>
                        </span>
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <section className="mt-7 rounded-md bg-[#f5f2ef] px-5 py-5 sm:px-6">
              <h2 className="font-serif text-lg font-bold text-[#f16522]">Shared or private?</h2>
              <p className="mt-2 text-xs leading-relaxed text-[#61707a] sm:text-sm">
                Shared cruises (7-35 guests) are sociable and better value; private
                charters give families and couples the run of the boat - and a sunset
                or dinner sail is the pick for a special occasion.
              </p>
            </section>
          </div>

          <aside className="grid gap-4">
          <figure className="mx-auto w-full max-w-[307px] ">
                        <Image
                          src="/images/quick-trips/best_catamaran_cruises.png"
                          alt="Map of Mauritius showing Grand Baie on the north coast"
                          width={1200}
                          height={1000}
                          priority
                          className="h-auto  w-full"
                        />
                        <figcaption className="mt-2 text-center font-serif text-xs italic text-[#8a8f91]">
                       Where to set sail — the four coasts
                        </figcaption>
            </figure>
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              <section className="rounded-md bg-[#f5f2ef] px-5 py-5">
                <h2 className="font-serif text-lg font-bold text-[#f16522]">What&apos;s on board</h2>
                <p className="mt-2 text-xs leading-relaxed text-[#61707a] sm:text-sm">
                  Snorkelling, island stops, a BBQ lunch & drinks.
                </p>
              </section>
              <section className="rounded-md bg-[#f5f2ef] px-5 py-5">
                <h2 className="font-serif text-lg font-bold text-[#f16522]">Pick your type</h2>
                <p className="mt-2 text-xs leading-relaxed text-[#61707a] sm:text-sm">
                  Shared for value &middot; private for space &middot; sunset for wow.
                </p>
              </section>
              <section className="rounded-md bg-[#f5f2ef] px-5 py-5">
                <h2 className="font-serif text-lg font-bold text-[#f16522]">Best light</h2>
                <p className="mt-2 text-xs leading-relaxed text-[#61707a] sm:text-sm">
                  Mornings are calmest; the west wins for sunsets.
                </p>
              </section>
            </div>
          </aside>
        </section>

        <section className="mt-8 rounded-md bg-[#f5f2ef] px-5 py-5 sm:px-7">
          <h2 className="font-serif text-xl font-bold text-[#f16522]">Good to know</h2>
          <div className="mt-3 grid gap-x-8 gap-y-2 md:grid-cols-2">
            {[
              ["Book ahead", "Peak season catamarans fill up fast."],
              ["Pack smart", "Sun cream, a towel, a hat & a dry bag."],
              ["Sail local", "Cruise near your base to skip long drives."],
              ["Calm mornings", "Clearest water & smoothest seas before noon."],
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
        </section>
      </article>

      <Footer />
    </main>
  ), locale);
}
