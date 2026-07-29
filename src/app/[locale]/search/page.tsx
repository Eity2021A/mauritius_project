import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ACTIVITIES } from "@/data/activities";
import { BEACH_DETAILS } from "@/data/beaches";
import { BLOG_POSTS } from "@/data/blog";
import { PLACE_DETAILS } from "@/data/place-details";
import { HOME_ITINERARIES } from "@/data/home";
import { VERANDA_HOTELS } from "@/data/veranda-hotels";
import { getTranslations } from "next-intl/server";

type SearchParams = Promise<{ q?: string }>;

type SearchItem = {
  title: string;
  description: string;
  href: string;
  type: string;
};

type SearchPageProps = {
  params: Promise<{ locale: string }>;
  searchParams: SearchParams;
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("SearchPage.metadata");

  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: "/search" },
  };
}

function buildSearchIndex(
  staticGuides: SearchItem[],
  typeLabels: Record<string, string>,
  itineraryDescription: (title: string) => string
): SearchItem[] {
  return [
    ...Object.values(BEACH_DETAILS).map((beach) => ({
      title: beach.name,
      description: beach.description[0] ?? beach.tagline,
      href: `/beaches-in-mauritius/${beach.slug}`,
      type: typeLabels.beach,
    })),
    ...Object.values(PLACE_DETAILS).map((place) => ({
      title: place.name,
      description: place.tagline,
      href: `/best-places-to-visit-in-mauritius/${place.slug}`,
      type: typeLabels.place,
    })),
    ...ACTIVITIES.map((activity) => ({
      title: activity.name,
      description: activity.description,
      href: `/mauritius-activities?activity=${activity.slug}`,
      type: typeLabels.activity,
    })),
    ...VERANDA_HOTELS.map((hotel) => ({
      title: hotel.name,
      description: hotel.tagline,
      href: `/veranda-hotels/${hotel.slug}`,
      type: typeLabels.hotel,
    })),
    ...HOME_ITINERARIES.map((itinerary) => ({
      title: itinerary.title,
      description: itineraryDescription(itinerary.title),
      href: itinerary.href,
      type: typeLabels.itinerary,
    })),
    ...BLOG_POSTS.map((post) => ({
      title: post.title,
      description: post.excerpt,
      href: `/blog/${post.slug}`,
      type: typeLabels.blog,
    })),
    ...staticGuides,
  ];
}

function matchesQuery(item: SearchItem, query: string) {
  const haystack = `${item.title} ${item.description} ${item.type}`.toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term));
}

export default async function SearchPage({
  params,
  searchParams,
}: SearchPageProps) {
  const [{ locale }, t] = await Promise.all([
    params,
    getTranslations("SearchPage"),
  ]);
  const { q = "" } = await searchParams;
  const query = q.trim();
  const staticGuides = t.raw("staticGuides") as SearchItem[];
  const typeLabels = t.raw("types") as Record<string, string>;
  const index = buildSearchIndex(
    staticGuides,
    typeLabels,
    (title) => t("itineraryDescription", { title })
  );
  const results = query
    ? index.filter((item) => matchesQuery(item, query)).slice(0, 60)
    : index.slice(0, 24);

  return (
    <main id="main-content" className="min-h-screen bg-white">
      <Navbar />
      <section className="px-4 pb-16 pt-28 sm:px-6 sm:pt-32">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-500">
              {t("kicker")}
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              {t("title")}
            </h1>
          </div>

          <form action={`/${locale}/search`} className="mx-auto mt-8 flex max-w-3xl flex-col gap-3 sm:flex-row">
            <label htmlFor="site-search" className="sr-only">
              {t("label")}
            </label>
            <input
              id="site-search"
              name="q"
              type="search"
              defaultValue={query}
              placeholder={t("placeholder")}
              className="min-h-12 flex-1 rounded-full border border-gray-200 px-5 text-base text-gray-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            />
            <button
              type="submit"
              className="min-h-12 rounded-full bg-orange-500 px-8 font-semibold text-white transition hover:bg-orange-600"
            >
              {t("button")}
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-500">
            {query
              ? t("results", { count: results.length, query })
              : t("popular")}
          </p>

          <div className="mt-6 grid gap-4">
            {results.map((item) => (
              <Link
                key={`${item.type}-${item.href}`}
                href={item.href}
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-100 hover:shadow-md"
              >
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-orange-500">
                  {item.type}
                </span>
                <h2 className="mt-2 text-xl font-bold text-gray-900">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
