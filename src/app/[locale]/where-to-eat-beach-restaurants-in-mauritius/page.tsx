import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { localizeStaticPage } from "@/lib/static-page-localizer";
import type { LucideIcon } from "lucide-react";
import {
  Banknote,
  CalendarCheck,
  MapPin,
  Utensils,
} from "lucide-react";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Where to Eat Beach Restaurants in Mauritius",
  description:
    "Where to eat by the sea in Mauritius — the best beach restaurants for fresh seafood, sunset dining and local flavour, coast by coast around the island.",
  alternates: { canonical: "/where-to-eat-beach-restaurants-in-mauritius" },
};

type Coast = "North" | "West & South-West" | "East & Wild South";

type RestaurantGroup = {
  title: string;
  coast: Coast;
  restaurants: [string, string][];
};

const coastLegend: [Coast, string][] = [
  ["North", "#2389c9"],
  ["West & South-West", "#f16522"],
  ["East & Wild South", "#2f8e48"],
];

const coastColors: Record<Coast, string> = {
  North: "#2389c9",
  "West & South-West": "#f16522",
  "East & Wild South": "#2f8e48",
};

const leftRestaurantGroups: RestaurantGroup[] = [
  {
    title: "Grand Baie",
    coast: "North",
    restaurants: [
      ["The Beach House", "Sea views, cocktails & sunset beach bar"],
      ["Les Canisses Resto & Plage", "Seafood, French & Mediterranean beachfront"],
      ["The Beach Kitchen", "Seafood, sushi & dim-sum bites; modern"],
      ["Cafe de La Plage", "Seafood & Mauritian; central by the water"],
      ["Le Capitaine", "Fish, lobster & prawns; refined, lagoon views"],
      ["Eden Beach", "Mediterranean & seafood; stylish lounge bar"],
      ["Bisou Rooftop - LUX*", "Elevated dining; infinity-pool rooftop"],
      ["Zaka - Super U", "Tapas, pizza & drinks; lively evenings"],
    ],
  },
  {
    title: "Trou aux Biches - Mont Choisy",
    coast: "North",
    restaurants: [
      ["Beach Hut", "Easy beach food; great for families"],
      ["Le Pescatore", "Seafood; elegant, with sea views"],
      ["Ava Beach", "Fresh, casual & tapas; all-day dining"],
      ["Mont Choisy Le Beach Club", "Casual beach-club dining & lagoon views"],
    ],
  },
];

const rightRestaurantGroups: RestaurantGroup[] = [
  {
    title: "Pereybere",
    coast: "North",
    restaurants: [
      ["Flowers of Paradise", "Seafood, Mediterranean & French; by the beach"],
      ["The Cloud Rooftop & Lounge", "Cocktails & tapas; rooftop views"],
    ],
  },
  {
    title: "Flic en Flac - Tamarin",
    coast: "West & South-West",
    restaurants: [
      ["Jeanno Burger", "Burgers & casual beach fare (Flic en Flac)"],
      ["Pakbo", "Mauritian, Creole, Indian & seafood (Flic en Flac)"],
      ["Signature by Big Willy's", "Dinner, cocktails & wine; social (Tamarin)"],
    ],
  },
  {
    title: "Le Morne",
    coast: "West & South-West",
    restaurants: [
      ["Wapalapam Island Eatery", "Mauritian-inspired seafood; fresh & tropical"],
    ],
  },
  {
    title: "Trou d'Eau Douce",
    coast: "East & Wild South",
    restaurants: [["Chez Tino", "Local seafood; near Ile aux Cerfs day trips"]],
  },
  {
    title: "Gris Gris - Souillac",
    coast: "East & Wild South",
    restaurants: [["Chez Rosy", "Simple, authentic Mauritian seafood"]],
  },
];

const goodToKnow: {
  title: string;
  text: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Book ahead",
    text: "Reserve sunset tables in Grand Baie & popular spots.",
    icon: CalendarCheck,
  },
  {
    title: "Bring cash",
    text: "Smaller places may not take cards.",
    icon: Banknote,
  },
  {
    title: "Go local",
    text: "Fish, prawns, lobster, octopus & calamari are island favourites.",
    icon: Utensils,
  },
];

function RestaurantSection({ group }: { group: RestaurantGroup }) {
  const color = coastColors[group.coast];

  return (
    <section>
      <h2
        className="flex items-center gap-2 border-b border-[#e4ded7] pb-2 text-[11px] font-bold uppercase tracking-wide"
        style={{ color }}
      >
        <MapPin className="h-3.5 w-3.5" strokeWidth={2} />
        {group.title}
      </h2>
      <ul className="space-y-3 pt-3">
        {group.restaurants.map(([name, detail]) => (
          <li key={name}>
            <h3 className="font-serif text-[17px] font-bold leading-tight text-[#111d2a]">
              {name}
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-[#66737d] sm:text-sm">
              {detail}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function WhereToEatBeachRestaurantsInMauritiusPage({ params }: { params: Promise<{ locale: string }> }) {
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
            <p>Eat &amp; Drink</p>
          </div> */}

          <p className="mt-7 text-xs font-bold uppercase tracking-wide text-[#f16522]">
            Taste of the Island
          </p>
          <h1 className="mt-2 font-serif text-[clamp(2.15rem,5vw,3.6rem)] font-bold leading-tight tracking-tight text-[#151f2b]">
            Beach Restaurants{" "}
            <span className="font-normal italic text-[#f16522]">
              by the Sea
            </span>
          </h1>
          <p className="mt-4 max-w-4xl font-serif text-sm italic leading-relaxed text-[#6f7e88] sm:text-base">
            21 independent beach spots across the island - where the view, the
            people and the light matter as much as the food.
          </p>

          <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-xs text-[#445465]">
            {coastLegend.map(([label, color]) => (
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

        <section className="mt-6 grid gap-x-10 gap-y-8 lg:grid-cols-2">
          <div className="space-y-7">
            {leftRestaurantGroups.map((group) => (
              <RestaurantSection key={group.title} group={group} />
            ))}
          </div>
          <div className="space-y-7">
            {rightRestaurantGroups.map((group) => (
              <RestaurantSection key={group.title} group={group} />
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-md bg-[#f5f2ef] px-5 py-6 sm:px-7">
          <h2 className="font-serif text-xl font-bold text-[#f16522]">
            Good to Know
          </h2>
          <div className="mt-4 grid gap-5 md:grid-cols-3">
            {goodToKnow.map(({ title, text, icon: Icon }) => (
              <div key={title} className="flex items-start gap-3">
                <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full text-[#2389c9]">
                  <Icon className="h-6 w-6" strokeWidth={1.9} />
                </span>
             <div>
                 <p className="text-xs leading-relaxed text-[#61707a] sm:text-sm">
                  <strong className="font-serif text-[#1d3144]">
                    {title}
                  </strong>
                  
                </p>
                <p className="text-xs">{text}</p>
              </div>
              </div>
            ))}
          </div>
          <p className="mt-5 font-serif text-sm italic leading-6 text-[#7a858d]">
            &quot;A beach restaurant here isn&apos;t only about food - it&apos;s
            the view, the people, the light and the island atmosphere.&quot;
          </p>
        </section>
      </article>

      <Footer />
    </main>
  ), locale);
}
