import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { localizeStaticPage } from "@/lib/static-page-localizer";
import type { LucideIcon } from "lucide-react";
import {
  Fish,
  MapPin,
  ShipWheel,
  Waves,
} from "lucide-react";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Where to See Whales and Dolphins in Mauritius",
  description:
    "Whales and dolphins in Mauritius — swim with wild spinner dolphins and watch for whales off the west coast at Tamarin and Black River. When and how to go.",
  alternates: { canonical: "/whales-and-dolphins-in-mauritius" },
};

const encounters: {
  title: string;
  label: string;
  icon: LucideIcon;
  color: string;
  rows: [string, string][];
}[] = [
  {
    title: "Swim with Dolphins",
    label: "Spinner & bottlenose - west coast",
    icon: Waves,
    color: "#1599a8",
    rows: [
      ["Where", "Black River - Tamarin - Le Morne"],
      ["When", "~6 AM start - year round - calm seas"],
      ["Trip", "2-3 hr private speedboat from La Balise Marina"],
      ["Swim", "in the water only when the crew says it's safe"],
    ],
  },
  {
    title: "Whale Watching",
    label: "Sperm & humpback whales - deep water",
    icon: ShipWheel,
    color: "#1d7aa8",
    rows: [
      ["Whales", "Sperm year round - humpbacks Jul-Sep"],
      ["Where", "Deep water off Tamarin & Black River"],
      ["When", "Early morning, when the ocean is calmest"],
      ["Note", "Observe only - swimming with whales is banned"],
    ],
  },
];

const quickTips = [
  ["Best season", "Dolphins all year - humpback whales Jul-Sep."],
  ["Start at dawn", "6 AM departures catch the calmest, clearest sea."],
  ["Bring", "Sun protection, a zoom camera & seasickness tabs."],
];

const goldenRules = [
  "Never touch, chase or feed the animals.",
  "No splashing, shouting or aggressive swimming.",
  "Don’t block their path — let them come to you.",
  "Enter the water only on the crew’s word.",
  "Choose ethical, licensed operators.",
  "Swimming with whales is prohibited by law.",
];

export default async function WhalesAndDolphinsInMauritiusPage({ params }: { params: Promise<{ locale: string }> }) {
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
            <p>West Coast - Ocean</p>
          </div> */}

          <p className="mt-8 text-[11px] font-bold uppercase tracking-wide text-[#f16522]">
            Wild Marine Encounters
          </p>
         <h1 className="mt-2 font-serif text-[clamp(1.5rem,6vw,2.4rem)] sm:text-[clamp(2.4rem,6vw,3rem)] font-bold leading-tight text-[#111d2a]">
  Whales{" "}
  <span className="font-serif font-normal italic text-[#f16522]">
    &amp; Dolphins
  </span>
</h1>
          <p className="mt-4 max-w-4xl font-serif text-sm italic leading-7 text-[#687887] sm:text-base">
            Dawn on the west coast - swim beside wild spinner dolphins and
            watch for whales in the deep water off Tamarin and Black River.
          </p>
        </header>

        <section className="mt-8 grid gap-7 lg:grid-cols-[1fr_.58fr] lg:items-start">
          <div className="space-y-5">
            {encounters.map(({ title, label, icon: Icon, color, rows }) => (
              <section
                key={title}
                className="rounded-md border border-[#e7dfd6] bg-white px-5 py-5 shadow-[0_2px_8px_rgba(36,54,67,.045)] sm:px-6"
              >
                <div className="flex items-center gap-5">
                  <span
                    className="mt-1 grid h-14 w-14 shrink-0 place-items-center rounded-md text-white"
                    style={{ backgroundColor: color }}
                  >
                    <Icon className="h-8 w-8" strokeWidth={1.8} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2 className="font-serif text-xl md:text-2xl font-bold leading-tight text-[#111d2a]">
                      {title}
                    </h2>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-[#1599a8]">
                      {label}
                    </p>
                  </div>
                </div>

                <dl className="mt-5 space-y-3">
                  {rows.map(([term, detail]) => (
                    <div
                      key={term}
                      className="grid gap-1 font-serif text-sm leading-6 text-[#5f6f7b] sm:grid-cols-[86px_1fr]"
                    >
                      <dt className="text-[11px] font-bold tracking-wide text-[#2389c9]">
                        {term}
                      </dt>
                      <dd>{detail}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            ))}
          </div>

          <aside className="grid gap-4">
            <figure className="mx-auto w-full max-w-[330px]">
              <Image
                src="/images/quick-trips/whales_&_dolphins.png"
                alt="Map marking west coast dolphin and whale areas"
                width={1196}
                height={1200}
                className="h-auto w-full"
                priority
              />
              <figcaption className="mt-2 text-center font-serif text-xs italic text-[#8a8f91]">
                West coast - Black River, Tamarin &amp; Le Morne
              </figcaption>
            </figure>

            {quickTips.map(([title, text]) => (
              <section key={title} className="rounded-md bg-[#f5f2ef] px-5 py-5">
                <h2 className="font-serif text-lg font-bold text-[#f16522]">
                  {title}
                </h2>
                <p className="mt-3 font-serif text-xs leading-6 text-[#61707a] sm:text-sm">
                  {text}
                </p>
              </section>
            ))}
          </aside>
        </section>

        <section className="mt-10 rounded-md bg-[#f5f2ef] px-5 py-6 sm:px-7">
          <div className="flex items-center gap-3">
            <Fish className="h-5 w-5 text-[#f16522]" strokeWidth={2} />
            <h2 className="font-serif text-2xl font-bold text-[#f16522]">
              The golden rules of a wild encounter
            </h2>
          </div>
          <div className="mt-5 grid gap-x-10 gap-y-2 md:grid-cols-2">
            {goldenRules.map((rule) => (
              <p key={rule} className="font-serif text-sm leading-6 text-[#5b6975]">
                <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#f16522] align-middle" />
                {rule}
              </p>
            ))}
          </div>
        </section>
      </article>

      <Footer />
    </main>
  ), locale);
}
