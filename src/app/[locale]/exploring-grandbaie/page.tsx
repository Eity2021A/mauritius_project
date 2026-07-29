import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getExploringGuide } from "@/data/exploring-guide-translations";

export const revalidate = 3600;

export const legacyMetadata: Metadata = {
  title: "Exploring Grand Baie",
  description:
    "Exploring Grand Baie, Mauritius — a vibrant coastal town known for its beautiful beaches, bustling markets, and rich cultural heritage.",
  alternates: { canonical: "/exploring-grandbaie" },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = getExploringGuide(locale, "grandbaie");
  return { title: t.metadata.title, description: t.metadata.description, alternates: { canonical: "/exploring-grandbaie" } };
}

export default async function ExploringGrandbaiePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getExploringGuide(locale, "grandbaie");
  return (
    <main id="main-content" className="min-h-screen bg-white text-[#1c2a2e]">
      <Navbar />

      <article className="mx-auto w-full max-w-6xl px-4 pt-24 pb-20 sm:px-6 lg:pt-28 xl:px-0">
        <header>
          <h1 className="font-serif text-[clamp(2rem,6vw,3.2rem)] font-bold leading-tight tracking-tight text-[#151f2b]">
            {t.title}{" "}
            <span className="font-normal italic text-[#f16522]">{t.titleEmphasis}</span>
          </h1>
          <p className="mt-3 text-xs font-bold uppercase tracking-wide text-[#f16522]">
            {t.kicker}
          </p>
          <p className="mt-5 text-xs font-bold uppercase tracking-wide text-[#d98725]">
            {t.region}
          </p>
          <p className="mt-9 max-w-4xl font-serif text-sm italic leading-relaxed text-[#6f7e88] sm:text-base">
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
                {t.sections[0].map(([name, text]) => (
                  <p key={name} className="flex gap-2 text-xs leading-relaxed text-[#61707a] sm:text-sm">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f16522]" />
                    <span>
                      <strong className="font-serif text-[#152738]">{name}</strong>
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
                {t.sections[1].map(([name, text]) => (
                  <p key={name} className="flex gap-2 text-xs leading-relaxed text-[#61707a] sm:text-sm">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2f8e48]" />
                    <span>
                      <strong className="font-serif text-[#152738]">{name}</strong>
                      <span> - {text}</span>
                    </span>
                  </p>
                ))}
              </div>
            </section>

            <section className="mt-8 rounded-md bg-[#f5f2ef] px-5 py-5 sm:px-6">
              <h2 className="font-serif text-lg font-bold text-[#f16522]">{t.whyTitle}</h2>
              <p className="mt-2 text-xs leading-relaxed text-[#61707a] sm:text-sm">
                {t.whyText}
              </p>
            </section>
          </div>

          <aside className="grid gap-4">
            <figure className="mx-auto w-full max-w-[390px]">
              <Image
                src="/images/quick-trips/grand_baie.png"
                alt={t.mapAlt}
                width={1200}
                height={1200}
                priority
                className="h-auto w-full"
              />
              <figcaption className="mt-2 text-center font-serif text-xs italic text-[#8a8f91]">
                {t.mapCaption}
              </figcaption>
            </figure>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {t.sideCards.map(([title, text]) => (
                <section key={title} className="rounded-md bg-[#f5f2ef] px-5 py-5">
                  <h2 className="font-serif text-lg font-bold text-[#f16522]">{title}</h2>
                  <p className="mt-2 text-xs leading-relaxed text-[#61707a] sm:text-sm">{text}</p>
                </section>
              ))}
            </div>
          </aside>
        </section>

        <section className="mt-8 rounded-md bg-[#f5f2ef] px-5 py-5 sm:px-7">
          <h2 className="font-serif text-xl font-bold text-[#f16522]">{t.goodTitle}</h2>
          <div className="mt-3 grid gap-x-8 gap-y-2 md:grid-cols-2">
            {t.goodItems.map(([title, text]) => (
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

        <section className="mt-20">
          <Image src="/images/quick-trips/exploring-grandbaie.png" alt={`${t.title} ${t.titleEmphasis}`} width={1200} height={600} className="h-auto w-full rounded-md" />
          </section>
      </article>

      <Footer />
    </main>
  );
}
