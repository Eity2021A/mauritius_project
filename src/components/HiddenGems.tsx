import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getImageSrcSet, getImageUrl } from "@/lib/image-url";
import type { Metadata } from "next";
import type { BlogPost } from "@/data/blog";
import { getAllBlogPosts, getBlogCategories } from "@/lib/content";
import { formatDate } from "@/data/blog";
import { normalizeLocale } from "@/i18n/routing";

export const metadata: Metadata = {
  title: "Explore Mauritius - Beaches, Places & Activities",
  description:
    "Discover the best beaches, must-visit places and unforgettable activities in Mauritius.",
  alternates: { canonical: "/explore" },
};

function isBlogPost(post: BlogPost | undefined): post is BlogPost {
  return Boolean(post);
}

const categoryLabels = {
  en: { activities: "Activities", beaches: "Beaches", nature: "Nature", "discover-mauritius": "Discover Mauritius", culture: "Culture", accommodation: "Where to Stay", culinary: "Culinary", wedding: "Wedding" },
  fr: { activities: "Activités", beaches: "Plages", nature: "Nature", "discover-mauritius": "Découvrir Maurice", culture: "Culture", accommodation: "Où séjourner", culinary: "Gastronomie", wedding: "Mariage" },
  de: { activities: "Aktivitäten", beaches: "Strände", nature: "Natur", "discover-mauritius": "Mauritius entdecken", culture: "Kultur", accommodation: "Unterkünfte", culinary: "Kulinarik", wedding: "Hochzeit" },
  it: { activities: "Attività", beaches: "Spiagge", nature: "Natura", "discover-mauritius": "Scopri Mauritius", culture: "Cultura", accommodation: "Dove alloggiare", culinary: "Gastronomia", wedding: "Matrimonio" },
  es: { activities: "Actividades", beaches: "Playas", nature: "Naturaleza", "discover-mauritius": "Descubrir Mauricio", culture: "Cultura", accommodation: "Dónde alojarse", culinary: "Gastronomía", wedding: "Bodas" },
  ru: { activities: "Активности", beaches: "Пляжи", nature: "Природа", "discover-mauritius": "Открыть Маврикий", culture: "Культура", accommodation: "Где остановиться", culinary: "Еда", wedding: "Свадьбы" },
} as const;

const featuredTitleFallbacks = {
  "the-ultimate-mauritius-family-holiday-guide": {
    en: "The Ultimate Mauritius Family Holiday Guide 2026/2027",
    fr: "Le guide ultime des vacances en famille à Maurice 2026/2027",
    de: "Der ultimative Mauritius-Familienurlaub-Guide 2026/2027",
    it: "La guida definitiva alle vacanze in famiglia a Mauritius 2026/2027",
    es: "La guía definitiva para vacaciones familiares en Mauricio 2026/2027",
    ru: "Полный гид по семейному отдыху на Маврикии 2026/2027",
  },
  "budget-hotels-for-families-mauritius": {
    en: "Budget Hotels for Families in Mauritius",
    fr: "Hôtels économiques pour familles à Maurice",
    de: "Budget-Hotels für Familien auf Mauritius",
    it: "Hotel economici per famiglie a Mauritius",
    es: "Hoteles económicos para familias en Mauricio",
    ru: "Бюджетные отели для семей на Маврикии",
  },
  "the-ultimate-mauritius-self-drive-itinerary": {
    en: "The Ultimate Mauritius Self-Drive Itinerary for 2026",
    fr: "L'itinéraire self-drive ultime à Maurice pour 2026",
    de: "Die ultimative Selbstfahrer-Route durch Mauritius für 2026",
    it: "L'itinerario self-drive definitivo a Mauritius per il 2026",
    es: "El itinerario definitivo en coche por Mauricio para 2026",
    ru: "Идеальный маршрут по Маврикию на машине на 2026 год",
  },
  "best-snorkelling-spots-in-mauritius": {
    en: "Best Snorkelling Spots in Mauritius",
    fr: "Les meilleurs spots de snorkeling à Maurice",
    de: "Die besten Schnorchelplätze auf Mauritius",
    it: "I migliori punti per lo snorkeling a Mauritius",
    es: "Los mejores lugares para hacer snorkel en Mauricio",
    ru: "Лучшие места для снорклинга на Маврикии",
  },
  "north-mauritius-travel-guide": {
    en: "North Mauritius Travel Guide",
    fr: "Guide du nord de Maurice",
    de: "Reiseführer Nord-Mauritius",
    it: "Guida del nord di Mauritius",
    es: "Guía del norte de Mauricio",
    ru: "Путеводитель по северу Маврикия",
  },
  "best-restaurants-in-north-mauritius-2026-guide": {
    en: "Best Restaurants in North Mauritius 2026",
    fr: "Meilleurs restaurants du nord de Maurice 2026",
    de: "Beste Restaurants im Norden von Mauritius 2026",
    it: "I migliori ristoranti nel nord di Mauritius 2026",
    es: "Mejores restaurantes del norte de Mauricio 2026",
    ru: "Лучшие рестораны северного Маврикия 2026",
  },
  "a-day-in-port-louis-self-guided-tour": {
    en: "A Day in Port Louis - Self Guided Tour",
    fr: "Une journée à Port Louis - visite libre",
    de: "Ein Tag in Port Louis - selbstgeführte Tour",
    it: "Un giorno a Port Louis - tour autoguidato",
    es: "Un día en Port Louis - recorrido autoguiado",
    ru: "Один день в Порт-Луи - самостоятельный маршрут",
  },
} as const;

function localizedHref(locale: string, href: string) {
  const activeLocale = normalizeLocale(locale);
  if (href.startsWith("http") || activeLocale === "en") return href;
  return `/${activeLocale}${href}`;
}

function localizeCategory(category: string, fallback: string, locale: string) {
  const activeLocale = normalizeLocale(locale) as keyof typeof categoryLabels;
  const labels = categoryLabels[activeLocale] ?? categoryLabels.en;
  return labels[category as keyof typeof labels] ?? fallback;
}

function localizeTitle(slug: string, title: string, locale: string) {
  const activeLocale = normalizeLocale(locale) as keyof typeof categoryLabels;
  return featuredTitleFallbacks[slug as keyof typeof featuredTitleFallbacks]?.[activeLocale] ?? title;
}

function HiddenGemCard({
  title,
  categories,
  image,
  slug,
  href,
  publishedAt,
  readTime,
  readTimeLabel,
  locale,
}: {
  title: string;
  categories: string[];
  image: string;
  slug: string;
  href?: string;
  publishedAt: string;
  readTime: number;
  readTimeLabel: string;
  locale: string;
}) {
  return (
    <article className="group h-full">
      <Link
        href={localizedHref(locale, href ?? `/blog/${slug}`)}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        <div className="relative w-full aspect-[4/4.6] overflow-hidden rounded-lg img-shimmer">
          <img
            src={getImageUrl(image, { width: 800, quality: 75 })}
            srcSet={getImageSrcSet(image, { widths: [400, 800, 1200], quality: 66 })}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />

          <div className="absolute top-3 left-3 right-3 flex flex-wrap gap-2">
            {categories.slice(0, 2).map((category) => (
              <span
                key={category}
                className="rounded-full bg-orange-500 px-3 py-1 text-xs font-medium text-white"
              >
                {category}
              </span>
            ))}
          </div>

          <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-3 sm:p-4">
            <h2 className="mb-1.5 line-clamp-2 text-base font-bold text-white transition-colors group-hover:text-orange-200 lg:text-lg">
              {title}
            </h2>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-gray-300 sm:text-xs">
              <span>{formatDate(publishedAt)}</span>
              <span>-</span>
              <span>{readTime} {readTimeLabel}</span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default async function HiddenGems({
  featuredSlugs,
  featuredHrefs,
  locale = "en",
}: {
  featuredSlugs?: readonly string[];
  featuredHrefs?: readonly string[];
  locale?: string;
} = {}) {
  const t = await getTranslations("Home.hiddenGems");
  const [allPosts, blogCategories] = await Promise.all([
    getAllBlogPosts(locale),
    getBlogCategories(),
  ]);

  const selectedFeaturedPosts = featuredSlugs
    ? featuredSlugs
        .map((slug) => allPosts.find((post) => post.slug === slug))
        .filter(isBlogPost)
    : ([1, 2, 3] as const)
        .map((rank) => allPosts.find((post) => post.featuredRank === rank))
        .filter(isBlogPost);
  const fallbackFeaturedPosts = allPosts.filter(
    (post) => !selectedFeaturedPosts.some((featuredPost) => featuredPost?.slug === post.slug)
  );
  const featuredPosts = (
    selectedFeaturedPosts.length > 0
      ? [...selectedFeaturedPosts, ...fallbackFeaturedPosts]
      : allPosts
  ).slice(0, 4);
  const featuredHrefBySlug = new Map(
    (featuredSlugs ?? []).map((slug, index) => [slug, featuredHrefs?.[index]] as const)
  );

  return (
    <section className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <span className="text-sm font-medium uppercase tracking-wider text-orange-500">
              {t("kicker")}
            </span>
            <h2 className="mt-3 text-2xl font-bold text-gray-900 md:text-3xl">
              {t("title")}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-gray-600">
              {t("subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-5">
            {featuredPosts.slice(0, 4).map((post) => (
              <HiddenGemCard
                key={post.slug}
                title={localizeTitle(post.slug, post.title, locale)}
                categories={post.categories.map(
                  (category) =>
                    localizeCategory(
                      category,
                      blogCategories.find((item) => item.id === category)?.label ?? category,
                      locale,
                    )
                )}
                image={post.image}
                slug={post.slug}
                href={featuredHrefBySlug.get(post.slug)}
                publishedAt={post.publishedAt}
                readTime={post.readTime}
                readTimeLabel={t("readTime")}
                locale={locale}
              />
            ))}
          </div>
        </div>
    </section>
  );
}
