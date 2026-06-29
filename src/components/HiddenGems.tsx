import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { getImageSrcSet, getImageUrl } from "@/lib/image-url";
import type { Metadata } from "next";
import type { BlogPost } from "@/data/blog";
import { getAllBlogPosts, getBlogCategories } from "@/lib/content";
import { getBlogViewCount } from "@/lib/blog-view-counts";
import { formatDate } from "@/data/blog";
import { formatBlogViewCount } from "@/lib/blog-view-format";

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
  publishedAt,
  readTime,
  viewCount,
}: {
  title: string;
  categories: string[];
  image: string;
  slug: string;
  publishedAt: string;
  readTime: number;
  viewCount: number;
}) {
  return (
    <article className="group h-full">
      <Link href={`/blog/${slug}`} className="block h-full">
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
              <span>{readTime} min read</span>
              <span>-</span>
              <span className="inline-flex items-center gap-1">
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12s3.75-6.75 9.75-6.75S21.75 12 21.75 12 18 18.75 12 18.75 2.25 12 2.25 12z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"
                  />
                </svg>
                {formatBlogViewCount(viewCount)}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default async function HiddenGems() {
  const [allPosts, blogCategories] = await Promise.all([
    getAllBlogPosts(),
    getBlogCategories(),
  ]);

  const selectedFeaturedPosts = ([1, 2, 3] as const)
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

  const viewCounts = Object.fromEntries(
    await Promise.all(
      featuredPosts.map(async (post) => [post.slug, await getBlogViewCount(post.slug)] as const)
    )
  );

  return (
    <main id="main-content" className="min-h-screen bg-white">
      <section className="py-12 md:py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-8 text-center">
            <span className="text-sm font-medium uppercase tracking-wider text-orange-500">
              Featured Stories
            </span>
            <h2 className="mt-3 text-2xl font-bold text-gray-900 md:text-3xl">
              Hidden Gems Stories
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-gray-600">
              Featured blog stories from the API, shown here in a compact four-column layout.
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
                publishedAt={post.publishedAt}
                readTime={post.readTime}
                viewCount={viewCounts[post.slug] ?? 0}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
