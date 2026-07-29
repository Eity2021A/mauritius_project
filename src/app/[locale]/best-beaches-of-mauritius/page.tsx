import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { localizeStaticPage } from "@/lib/static-page-localizer";
import { MapPin } from "lucide-react";
import Image from "next/image";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Best Beaches of Mauritius",
  description:
    "The best beaches in Mauritius, coast by coast — from calm northern lagoons to wild southern shores. Where to swim, snorkel and catch the perfect sunset.",
  alternates: { canonical: "/best-beaches-of-mauritius" },
};

const beachCoasts = [
  {
    coast: "North Coast",
    note: "calm lagoons & easy swims",
    color: "#2389c9",
    beaches: [
      ["Trou aux Biches", "top snorkelling & families"],
      ["Mont Choisy", "the island's longest beach"],
      ["Pereybere", "lively, local & central"],
      ["Cap Malheureux", "the red-roof photo icon"],
    ],
  },
  {
    coast: "East Coast",
    note: "luxury & lagoon perfection",
    color: "#2f8e48",
    beaches: [
      ["Belle Mare", "long, peaceful sunrise"],
      ["Blue Bay", "the best snorkelling"],
      ["Ile aux Cerfs", "lagoon paradise, by boat"],
      ["Pointe d'Esny", "clear, quiet lagoon"],
    ],
  },
  {
    coast: "West Coast",
    note: "sunsets, dolphins & drama",
    color: "#f16522",
    beaches: [
      ["Flic en Flac", "the most versatile beach"],
      ["Le Morne", "iconic UNESCO kite lagoon"],
      ["Tamarin", "surf & dolphin bay"],
      ["Albion", "a quiet west-coast escape"],
    ],
  },
  {
    coast: "South Coast",
    note: "wild & untouched",
    color: "#d89b24",
    beaches: [
      ["Gris Gris", "dramatic cliffs (views only)"],
      ["La Cambuse", "raw & near the airport"],
      ["Riambel", "quiet local beach walks"],
      ["St Felix", "raw southern beauty"],
    ],
  },
];

const beachLegend = [
  ["North", "#2389c9"],
  ["East", "#2f8e48"],
  ["West", "#f16522"],
  ["South", "#d89b24"],
];

function BeachesMap() {
  const points = [
    [214, 55, "#2389c9"],
    [333, 155, "#2f8e48"],
    [138, 178, "#f16522"],
    [241, 291, "#d89b24"],
  ];

  return (
    <figure className="mx-auto w-full max-w-[390px]">
      <svg
        viewBox="0 0 430 430"
        role="img"
        aria-label="Mauritius map with beach coast markers"
        className="h-auto w-full"
      >
        <defs>
          <filter id="beaches-map-shadow" x="-15%" y="-15%" width="130%" height="130%">
            <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#000000" floodOpacity=".12" />
          </filter>
        </defs>
        <path
          d="M190 18 220 14 248 30 276 31 303 50 323 78 350 92 372 125 364 158 389 188 381 222 355 239 350 271 327 291 290 297 270 331 232 319 204 333 181 307 149 301 136 269 108 251 109 214 87 186 105 157 97 124 126 104 134 69 166 58Z"
          fill="#d6d7d7"
          filter="url(#beaches-map-shadow)"
        />
        <path
          d="M220 51 236 96 211 130 231 168 201 210 217 252 197 297"
          fill="none"
          stroke="#ffffff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity=".78"
          strokeWidth="3"
        />
        <path
          d="M211 130 252 130M231 168 278 153M217 252 291 208M236 96 284 104 318 138 336 201"
          fill="none"
          stroke="#ffffff"
          strokeLinecap="round"
          strokeOpacity=".7"
          strokeWidth="3"
        />
        {points.map(([x, y, color]) => (
          <circle
            key={`${x}-${y}`}
            cx={x as number}
            cy={y as number}
            r="6"
            fill={color as string}
            stroke="#ffffff"
            strokeWidth="3"
          />
        ))}
        <g fill="#8f9598" fontFamily="Georgia, 'Times New Roman', serif" fontSize="10" fontStyle="italic">
          <text x="242" y="69">Grand Baie</text>
          <text x="343" y="161">Belle Mare</text>
          <text x="82" y="181">Flic en Flac</text>
          <text x="260" y="309">Blue Bay</text>
        </g>
      </svg>
      <figcaption className="-mt-6 text-center font-serif text-xs italic text-[#8a8f91]">
        The four coasts at a glance
      </figcaption>
    </figure>
  );
}

export default async function BestBeachesOfMauritiusPage({ params }: { params: Promise<{ locale: string }> }) {
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
            <p>Beaches &middot; 2026 Guide</p>
          </div> */}

          <p className="mt-7 text-xs font-bold uppercase tracking-wide text-[#f16522]">
            Lagoons &middot; Sands &middot; Coasts
          </p>
          <h1 className="mt-2 font-serif text-[clamp(2rem,5vw,3.4rem)] font-bold leading-tight tracking-tight text-[#151f2b]">
            The Best Beaches{" "}
            <span className="font-normal italic text-[#f16522]">of Mauritius</span>
          </h1>
          <p className="mt-4 max-w-4xl font-serif text-sm italic leading-relaxed text-[#6f7e88] sm:text-base">
            Reef-sheltered lagoons, dramatic wild coasts and everything between - the
            island&apos;s finest sands, grouped by coast.
          </p>
        </header>

        <section className="mt-8 grid gap-8 lg:grid-cols-[1fr_.78fr] lg:items-start">
          <div>
            <div className="grid max-w-xl grid-cols-2 gap-3 text-xs text-[#44525a] sm:grid-cols-4">
              {beachLegend.map(([label, color]) => (
                <div key={label} className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
                  <span>{label}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 space-y-5">
              {beachCoasts.map((group) => (
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
                    {group.beaches.map(([name, text]) => (
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
          </div>

          <aside className="grid gap-4">
      <figure className="mx-auto w-full max-w-[307px] ">
                           <Image
                             src="/images/quick-trips/best_beaches_of_mauritius.png"
                             alt="Map of Mauritius showing Grand Baie on the north coast"
                             width={1200}
                             height={1000}
                             priority
                             className="h-auto  w-full"
                           />
                           <figcaption className="mt-2 text-center font-serif text-xs italic text-[#8a8f91]">
                          The four coasts at a glance
                           </figcaption>
                         </figure>
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              <section className="rounded-md bg-[#f5f2ef] px-5 py-5">
                <h2 className="font-serif text-lg font-bold text-[#f16522]">Best for snorkeling</h2>
                <p className="mt-2 text-xs leading-relaxed text-[#61707a] sm:text-sm">
                  Blue Bay &middot; Trou aux Biches &middot; Pointe d&apos;Esny
                </p>
              </section>
              <section className="rounded-md bg-[#f5f2ef] px-5 py-5">
                <h2 className="font-serif text-lg font-bold text-[#f16522]">Best for sunsets</h2>
                <p className="mt-2 text-xs leading-relaxed text-[#61707a] sm:text-sm">
                  Flic en Flac &middot; Le Morne &middot; Tamarin
                </p>
              </section>
              <section className="rounded-md bg-[#f5f2ef] px-5 py-5">
                <h2 className="font-serif text-lg font-bold text-[#f16522]">Nearest the airport</h2>
                <p className="mt-2 text-xs leading-relaxed text-[#61707a] sm:text-sm">
                  Blue Bay &middot; La Cambuse
                </p>
              </section>
            </div>
          </aside>
        </section>

        <section className="mt-8 rounded-md bg-[#f5f2ef] px-5 py-5 sm:px-7">
          <h2 className="font-serif text-xl font-bold text-[#f16522]">Good to know</h2>
          <div className="mt-3 grid gap-x-8 gap-y-2 md:grid-cols-2">
            {[
              ["Public access", "Most beaches are public to the high water mark."],
              ["Calmest swims", "North & east lagoons stay sheltered year-round."],
              ["The wild south", "For views, not swimming - mind the waves."],
              ["Clearest water", "Snorkel on calm mornings for the best visibility."],
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
