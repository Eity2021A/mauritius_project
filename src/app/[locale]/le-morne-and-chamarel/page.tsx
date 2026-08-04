import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/navigation";
import PopularRoadTrips from "@/components/PopularRoadTrips";
import { getExploringGuide } from "@/data/exploring-guide-translations";
import PocketAdBanner from "@/components/PocketAdBanner";
import CarRentalAdBannerInfo from "@/components/CarRentalAdBannerInfo";

export const revalidate = 3600;

const sectionLinks = [
  [
    "/top-activities-mauritius/hiking-le-morne",
    "/beaches-in-mauritius/le-morne",
    "/blog/best-snorkelling-spots-in-mauritius",
  ],
  [
    "/best-places-to-visit-in-mauritius/chamarel-waterfall",
    "/best-places-to-visit-in-mauritius/7-coloured-earth",
    "/best-places-to-visit-in-mauritius/bony-forest-reserve",
    "/best-places-to-visit-in-mauritius/chamarel-village",
  ],
  [
    "/best-places-to-visit-in-mauritius/black-river-gorges",
    "/best-places-to-visit-in-mauritius/piton-mountain",
    "/best-places-to-visit-in-mauritius/maconde",
  ],
] as const;

export const legacyMetadata: Metadata = {
  title: "Le Morne and Chamarel",
  description:
    "Le Morne & Chamarel, Mauritius — the dramatic south-west: an iconic UNESCO mountain, waterfalls, Seven Coloured Earth, native forest and wild coast.",
  alternates: { canonical: "/le-morne-and-chamarel" },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getExploringGuide(locale, "morneChamarel");
  return {
    title: t.metadata.title,
    description: t.metadata.description,
    alternates: { canonical: "/le-morne-and-chamarel" },
  };
}

export default async function LeMorneAndChamarelPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getExploringGuide(locale, "morneChamarel");
  return (
    <main id="main-content" className="min-h-screen bg-white text-[#1c2a2e]">
      <Navbar />

      <article className="mx-auto w-full max-w-6xl px-4 pt-24 pb-10 sm:px-6 lg:pt-28 xl:px-0">
        <header>
          {/* <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[#f16522] text-white">
                <span className="h-2.5 w-2.5 rounded-full bg-white" />
              </span>
              <span className="border-b border-[#f16522] text-sm font-bold text-[#1d3144]">
                Mauritius<span className="text-[#f16522]">Explored</span>
              </span>
            </div>
            <p className="text-xs font-bold uppercase tracking-wide text-[#d98725]">
              South-West &middot; 2026
            </p>
          </div> */}

          <p className="mt-7 text-xs font-bold uppercase tracking-wide text-[#f16522]">
            {t.kicker}
          </p>
          <h1 className="mt-2 font-serif text-[clamp(2rem,6vw,3.4rem)] font-bold leading-tight tracking-tight text-[#151f2b]">
            {t.title}{" "}
            <span className="font-normal italic text-[#f16522]">
              {t.titleEmphasis}
            </span>
          </h1>
          <p className="mt-6 max-w-4xl font-serif text-sm italic leading-relaxed text-[#6f7e88] sm:text-base">
            {t.intro}
          </p>
        </header>

        <section className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-xs text-[#44525a]">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#f16522]" />
            <span>{t.legend[0]}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#2f8e48]" />
            <span>{t.legend[1]}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#2389c9]" />
            <span>{t.legend[2]}</span>
          </div>
        </section>

        <section className="mt-4 grid gap-x-9 gap-y-8 lg:grid-cols-[1.45fr_.85fr] lg:items-start">
          <div>
            <section>
              <div className="flex flex-wrap items-baseline gap-2 border-b border-[#ded6cf] pb-1.5">
                <h2 className="font-serif text-lg font-bold uppercase leading-none text-[#f16522]">
                  {t.sectionTitles[0]}
                </h2>
                <p className="font-serif text-xs italic text-[#8a9398]">
                  {t.sectionNotes[0]}
                </p>
              </div>
              <div className="mt-2.5 space-y-1.5">
                {t.sections[0].map(([name, text], index) => (
                  <p
                    key={name}
                    className="flex gap-2 text-xs leading-relaxed text-[#61707a] sm:text-sm"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f16522]" />
                    <span>
                      <Link
                        href={sectionLinks[0][index]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-serif font-bold text-[#152738] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f16522]"
                      >
                        {name}
                      </Link>
                      <span> - {text}</span>
                    </span>
                  </p>
                ))}
              </div>
            </section>

            <section className="mt-7">
              <div className="flex flex-wrap items-baseline gap-2 border-b border-[#ded6cf] pb-1.5">
                <h2 className="font-serif text-lg font-bold uppercase leading-none text-[#2f8e48]">
                  {t.sectionTitles[1]}
                </h2>
                <p className="font-serif text-xs italic text-[#8a9398]">
                  {t.sectionNotes[1]}
                </p>
              </div>
              <div className="mt-2.5 space-y-1.5">
                {t.sections[1].map(([name, text], index) => (
                  <p
                    key={name}
                    className="flex gap-2 text-xs leading-relaxed text-[#61707a] sm:text-sm"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2f8e48]" />
                    <span>
                      <Link
                        href={sectionLinks[1][index]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-serif font-bold text-[#152738] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f8e48]"
                      >
                        {name}
                      </Link>
                      <span> - {text}</span>
                    </span>
                  </p>
                ))}
              </div>
            </section>

            <section className="mt-7">
              <div className="flex flex-wrap items-baseline gap-2 border-b border-[#ded6cf] pb-1.5">
                <h2 className="font-serif text-lg font-bold uppercase leading-none text-[#2389c9]">
                  {t.sectionTitles[2]}
                </h2>
                <p className="font-serif text-xs italic text-[#8a9398]">
                  {t.sectionNotes[2]}
                </p>
              </div>
              <div className="mt-2.5 space-y-1.5">
                {t.sections[2].map(([name, text], index) => (
                  <p
                    key={name}
                    className="flex gap-2 text-xs leading-relaxed text-[#61707a] sm:text-sm"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2389c9]" />
                    <span>
                      <Link
                        href={sectionLinks[2][index]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-serif font-bold text-[#152738] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2389c9]"
                      >
                        {name}
                      </Link>
                      <span> - {text}</span>
                    </span>
                  </p>
                ))}
              </div>
            </section>
          </div>

          <aside className="grid gap-4">
            <figure className="mx-auto w-full max-w-[390px]">
              <Image
                src="/images/quick-trips/morne_chamarel.png"
                alt={t.mapAlt}
                width={1200}
                height={1200}
                priority
                className="h-auto w-full"
              />
              <figcaption className="mt-2 flex items-center justify-center gap-3 font-serif text-xs italic text-[#8a8f91]">
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-[#f16522]" />
                  Le Morne
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-[#2f8e48]" />
                  Chamarel
                </span>
              </figcaption>
            </figure>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {t.sideCards.map(([title, text]) => (
                <section
                  key={title}
                  className="rounded-md bg-[#f5f2ef] px-5 py-5"
                >
                  <h2 className="font-serif text-lg font-bold text-[#f16522]">
                    {title}
                  </h2>
                  <p className="mt-2 text-xs leading-relaxed text-[#61707a] sm:text-sm">
                    {text}
                  </p>
                </section>
              ))}
            </div>
          </aside>
        </section>

        <section className="mt-8 rounded-md bg-[#f5f2ef] px-5 py-5 sm:px-7">
          <h2 className="font-serif text-xl font-bold text-[#f16522]">
            {t.goodTitle}
          </h2>
          <div className="mt-3 grid gap-x-8 gap-y-2 md:grid-cols-2">
            {t.goodItems.map(([title, text]) => (
              <p
                key={title}
                className="flex gap-2 text-xs leading-relaxed text-[#61707a] sm:text-sm"
              >
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
      <PocketAdBanner />
      <PopularRoadTrips locale={locale} />
      <CarRentalAdBannerInfo />

      <Footer />
    </main>
  );
}
