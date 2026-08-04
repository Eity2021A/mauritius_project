import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getImageSrcSet, getImageUrl } from "@/lib/image-url";
import type { Metadata } from "next";
import type { BlogPost } from "@/data/blog";
import { getAllBlogPosts, getBlogCategories } from "@/lib/content";
import { formatDate } from "@/data/blog";

export const metadata: Metadata = {
  title: "Explore Mauritius - Beaches, Places & Activities",
  description:
    "Discover the best beaches, must-visit places and unforgettable activities in Mauritius.",
  alternates: { canonical: "/explore" },
};

function isBlogPost(post: BlogPost | undefined): post is BlogPost {
  return Boolean(post);
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
}: {
  title: string;
  categories: string[];
  image: string;
  slug: string;
  href?: string;
  publishedAt: string;
  readTime: number;
  readTimeLabel: string;
}) {
  return (
    <article className="group h-full">
      <Link
        href={href ?? `/blog/${slug}`}
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
}: {
  featuredSlugs?: readonly string[];
  featuredHrefs?: readonly string[];
} = {}) {
  const t = await getTranslations("Home.hiddenGems");
  const [allPosts, blogCategories] = await Promise.all([
    getAllBlogPosts(),
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
                title={post.title}
                categories={post.categories.map(
                  (category) => blogCategories.find((item) => item.id === category)?.label ?? category
                )}
                image={post.image}
                slug={post.slug}
                href={featuredHrefBySlug.get(post.slug)}
                publishedAt={post.publishedAt}
                readTime={post.readTime}
                readTimeLabel={t("readTime")}
              />
            ))}
          </div>
        </div>
    </section>
  );
}
