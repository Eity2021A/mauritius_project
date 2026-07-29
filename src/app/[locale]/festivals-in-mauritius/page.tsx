import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { EventListJsonLd } from "@/components/seo/JsonLd";
import { FESTIVALS } from "@/data/festivals";
import { getImageUrl } from "@/lib/image-url";
import { SITE_URL } from "@/lib/constants";
import { getTranslations } from "next-intl/server";

const FESTIVALS_OG_IMAGE_URL =
  "https://htyodxbntlnwefjkcudc.supabase.co/storage/v1/object/public/festivals/chinese-new-year-in-mauritius.webp";

type FestivalCopy = {
  name: string;
  date: string;
  description: string;
  visitorTip: string;
  imageAlt: string;
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Festivals.metadata");

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      type: "article",
      images: [
        {
          url: FESTIVALS_OG_IMAGE_URL,
          width: 1200,
          height: 630,
          alt: t("ogImageAlt"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("ogTitle"),
      description: t("ogDescription"),
      images: [FESTIVALS_OG_IMAGE_URL],
    },
    alternates: { canonical: "/festivals-in-mauritius" },
  };
}

export default async function FestivalsPage() {
  const t = await getTranslations("Festivals");
  const festivalCopies = t.raw("items") as FestivalCopy[];

  return (
    <main id="main-content" className="min-h-screen bg-white">
      <EventListJsonLd
        events={FESTIVALS.map((festival, index) => ({
          name: festivalCopies[index]?.name ?? festival.name,
          startDate: festival.dateIso,
          description: festivalCopies[index]?.description ?? festival.description,
          locationName: "Mauritius",
          url: `${SITE_URL}/festivals-in-mauritius`,
        }))}
      />
      <Navbar />

      <section className="relative h-[44vh] min-h-[280px]">
        <Image
          src={getImageUrl("/images/banners/diwali.webp", { width: 1280, quality: 75 })}
          alt={t("hero.imageAlt")}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center px-4 max-w-4xl mx-auto translate-y-[2rem]">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {t("hero.title")}
            </h1>
            <p className="text-white/90 text-base md:text-lg max-w-2xl mx-auto">
              {t("hero.subtitle")}
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-orange-500 mb-6">
              {t("intro.title")}
            </h2>
            <div className="text-gray-700 text-lg leading-relaxed space-y-4">
              <p>
                {t("intro.p1Before")} <span className="font-semibold text-orange-500">{t("intro.highlight1")}</span>{t("intro.p1After")}
              </p>
              <p>{t("intro.p2")}</p>
              <p>
                {t("intro.p3Before")} <span className="font-semibold text-orange-500">{t("intro.highlight2")}</span>{t("intro.p3After")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            {t("grid.title")}
          </h2>
          <p className="mx-auto mb-8 max-w-3xl text-center text-sm text-gray-500">
            {t("grid.subtitle")}
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {FESTIVALS.map((festival, index) => {
              const copy = festivalCopies[index] ?? {
                name: festival.name,
                date: festival.date,
                description: festival.description,
                visitorTip: festival.visitorTip.replace("For visitors: ", ""),
                imageAlt: festival.name,
              };

              return (
                <article
                  key={festival.name}
                  className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={getImageUrl(festival.image, { width: 800, quality: 75 })}
                      alt={copy.imageAlt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="inline-block px-3 py-1 bg-white/90 text-gray-800 text-sm font-medium rounded-full">
                        {copy.date}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {copy.name}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {copy.description}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-gray-600">
                      <span className="font-semibold text-orange-500">{t("grid.visitorLabel")}</span>{" "}
                      {copy.visitorTip}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-orange-500 to-amber-500">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {t("cta.title")}
            </h2>
            <p className="text-orange-100 text-lg mb-8">
              {t("cta.body")}
            </p>
            <Link
              href="/best-time-to-visit-to-mauritius"
              className="inline-flex items-center justify-center px-10 py-5 min-h-[56px] text-lg bg-white text-orange-500 font-semibold rounded-lg hover:bg-orange-50 transition-colors shadow-lg no-underline"
            >
              {t("cta.button")}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
