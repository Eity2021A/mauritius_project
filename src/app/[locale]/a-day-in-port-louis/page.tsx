import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { getPortLouisGuide } from "@/data/quick-guide-translations";
export const revalidate = 3600;

export const legacyMetadata: Metadata = {
  title: "A Day in Port Louis",
  description:
    "A Day in Port Louis: a self-guided walking tour of Mauritius' capital — markets, colonial landmarks, temples, street food and where to eat like a local.",
  alternates: { canonical: "/a-day-in-port-louis" },
};

type Place = { name: string; text: string };

function PlaceList({ title, items, accentKey }: { title: string; items: Place[]; accentKey: "waterfront" | "markets" | "heritage" }) {
  const colorByTitle: Record<string, { heading: string; className: string }> = {
    waterfront: {
      heading: "#0876bd",
      className: "port-place-list--waterfront",
    },
    markets: {
      heading: "#f06432",
      className: "port-place-list--markets",
    },
    heritage: {
      heading: "#258a40",
      className: "port-place-list--heritage",
    },
  };
  const accent = colorByTitle[accentKey];

  return (
    <section className={`port-place-list`}>
      <h2 className="port-section-title" style={{ color: accent.heading }}>
        {title}
      </h2>
      <ul className="space-y-3 pt-2">
        {items.map((item) => (
          <li key={item.name} className="leading-none flex gap-2 items-center">
            <div
              className="mr-1.5  w-[6px] h-[6px] rounded-full "
              style={{ backgroundColor: accent.heading }}
            ></div>
            <strong className="text-[15px]">{item.name}</strong>
            <span className="text-[#000] text-[13px]"> - {item.text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getPortLouisGuide(locale);
  return {
    title: t.metadata.title,
    description: t.metadata.description,
    alternates: { canonical: "/a-day-in-port-louis" },
  };
}

export default async function ADayInPortLouisPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getPortLouisGuide(locale);
  const portSections = [
    { title: t.waterfrontTitle, items: t.waterfront, accentKey: "waterfront" as const },
    { title: t.marketsTitle, items: t.markets, accentKey: "markets" as const },
    { title: t.heritageTitle, items: t.heritage, accentKey: "heritage" as const },
  ];
  return (
    <main id="main-content" className="min-h-screen bg-white text-[#1c2a2e]">
      <Navbar />
      <article className="max-w-6xl mx-auto pt-30 pb-20 px-4 xl:px-0">
        <header>
          <h1 className="font-serif text-[clamp(2rem,7vw,2.4rem)] font-bold leading-none tracking-tight text-[#172c40]">
            {t.titlePrefix} <em className="font-normal text-[#e75a30]">{t.titleEmphasis}</em>
          </h1>
          <p className="mt-2 text-[12px] font-bold uppercase tracking-wide text-[#ea582f]">
            {t.subtitle}
          </p>
          <p className="mt-5 text-[12px] font-bold uppercase tracking-wide text-[#ef8f22]">
            {t.guideLabel}
          </p>
          <p className="mt-7 max-w-2xl font-serif text-[clamp(.82rem,2.8vw,.95rem)] italic leading-relaxed text-[#63717e]">
            {t.intro}
          </p>
        </header>

        <div className="mt-8 grid gap-x-9 gap-y-7 md:grid-cols-[minmax(0,1.35fr)_minmax(230px,.8fr)] lg:mt-10 lg:grid-cols-[1.45fr_0.85fr]">
          <div className="space-y-7 sm:space-y-6">
            <p className="text-[18px] font-bold uppercase leading-snug text-[#E8601C]">
              {t.walkCity}
            </p>
            {portSections.map((section) => (
              <PlaceList key={section.title} title={section.title} items={section.items} accentKey={section.accentKey} />
            ))}
          </div>
          <div
            className="relative"
            aria-label={t.mapLabel}
          >
            {/* Change w-48 and h-48 to any size you want */}
            <div className=" relative h-80 md:h-70 lg:h-100  w-80 md:w-70 lg:w-100  overflow-hidden">
              <Image
                src="/images/quick-trips/a-day-in-port-louis.png"
                alt={t.mapAlt}
                fill
                priority
                className="object-cover object-center"
              />
            </div>
            <p className="absolute bottom-[-30px] md:bottom-[135px] lg:bottom-[70px] left-[-15px] md:left-[-16px] lg:left-[15px] italic right-0 rounded-b-md px-5 py-4 text-[14px] leading-snug text-[#657077]">
              {t.mapCaption}
            </p>
            <div className="absolute bottom-[-105px] md:bottom-[45px] lg:bottom-[-20px] left-0 right-0 rounded-md bg-[#f3f1ee] px-5 py-4 text-[12px] leading-snug text-[#657077]">
              <strong className="mb-1 block text-[13px] text-[#d34f2d]">
                {t.gettingAroundTitle}
              </strong>
              {t.gettingAround}
            </div>
          </div>
        </div>

        <section className="mt-30 md:mt-6">
          <div className="mb-4 flex flex-col gap-2 sm:mb-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="port-section-title uppercase">{t.whereToEat}</h2>
            <p className="font-serif text-[16px] italic text-[#66737d]">
              {t.foodNote}
            </p>
          </div>
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Street Food & Local",
              "Chinatown & Casual",
              "Caudan & Smart",
            ].map((_group, index) => (
              (() => {
                const group = t.restaurantGroups[index];
                return (
              <section key={group}>
                <h3 className="border-b border-[#e4e0da] pb-2 font-serif text-[14px] font-bold text-[#c24735]">
                  {group}
                </h3>
                <ul className="space-y-2 pt-3">
                  {t.restaurants
                    .slice(index * 3, index * 3 + 3)
                    .map(([name, description]) => (
                      <li key={name}>
                        <strong className="block text-[16px]">{name}</strong>
                        <span className="text-[#657077]">{description}</span>
                      </li>
                    ))}
                </ul>
              </section>
                );
              })()
            ))}
          </div>
        </section>

        <aside className="mt-8 rounded-md bg-[#f3f1ee] px-4 py-4 sm:px-6">
          <h2 className="font-serif text-[15px] font-bold text-[#ed6736]">
            {t.eatLocalTitle}
          </h2>
          <p className="mt-1 text-[#56646e]">
            {t.eatLocal}
          </p>
        </aside>
      </article>
      <style>{`
        .port-section-title { color: #d64f30; font-family: Georgia, 'Times New Roman', serif; font-size: 15px; font-weight: 700; border-bottom: 1px solid #e4e0da; padding-bottom: 7px; }
        .port-place-list--waterfront > ul > li > span { color: #0876bd; }
        .port-place-list--markets > ul > li > span { color: #f06432; }
        .port-place-list--heritage > ul > li > span { color: #258a40; }
        @media (min-width: 640px) { .port-section-title { font-size: 16px; } }
      `}</style>

      <article className="max-w-6xl mx-auto pb-30 px-4 lg:px-0">
        <h1 className="font-serif text-[clamp(2rem,7vw,2.4rem)] font-bold leading-none tracking-tight text-[#172c40] pb-10">
          {t.secondTitlePrefix} <em className="font-normal text-[#e75a30]">Port-Louis</em>
        </h1>
        <div className="w-full">
          <Image
            src="/images/quick-trips/map-in-day.png"
            alt={t.mapAlt}
            width={1200}
            height={800}
            priority
            className="w-full h-auto rounded-sm object-contain"
          />
        </div>
      </article>
      <Footer />
    </main>
  );
}
