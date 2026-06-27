"use client";

import { useState } from "react";
import Link from "next/link";
import { formatDate, type BlogCategory, type BlogPost } from "@/data/blog";
import { getImageSrcSet, getImageUrl } from "@/lib/image-url";
import { formatBlogViewCount } from "@/lib/blog-view-format";

interface BlogPostsGridProps {
  posts: BlogPost[];
  featuredPosts: BlogPost[];
  categories: { id: string; label: string }[];
  viewCounts: Record<string, number>;
}

function BlogCard({
  post,
  categories,
  viewCount,
  featured = false,
}: {
  post: BlogPost;
  categories: { id: string; label: string }[];
  viewCount: number;
  featured?: boolean;
}) {
  const imageWidth = featured ? 800 : 400;

  return (
    <article className="group h-full">
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <div className="relative w-full aspect-[4/5] overflow-hidden rounded-lg img-shimmer">
          <img
            src={getImageUrl(post.image, { width: imageWidth, quality: 75 })}
            srcSet={getImageSrcSet(post.image, { widths: [400, 800, 1200], quality: 66 })}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
          
          {/* Categories - Top */}
          <div className="absolute top-4 left-4 right-4 flex flex-wrap gap-2">
            {post.categories.slice(0, 2).map(category => {
              const categoryLabel = categories.find(c => c.id === category)?.label || category;
              return (
                <span
                  key={category}
                  className="px-3 py-1 bg-orange-500 text-white text-xs font-medium rounded-full"
                >
                  {categoryLabel}
                </span>
              );
            })}
          </div>
          
          {/* Content - Bottom */}
          <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-4 sm:p-5 lg:p-6">
            <h2 className={`mb-2 line-clamp-4 font-bold text-white transition-colors group-hover:text-orange-200 ${featured ? "text-lg sm:text-xl xl:text-2xl" : "text-lg md:text-xl"}`}>
              {post.title}
            </h2>
            {featured && (
              <p className="mb-3 hidden text-sm text-gray-200 lg:line-clamp-2 xl:text-base">
                {post.excerpt}
              </p>
            )}
            
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-300 sm:text-sm">
              <span>{formatDate(post.publishedAt)}</span>
              <span>·</span>
              <span>{post.readTime} min read</span>
              <span>·</span>
              <span className="inline-flex items-center gap-1">
                <svg
                  className="h-4 w-4"
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

export default function BlogPostsGrid({
  posts,
  featuredPosts,
  categories,
  viewCounts,
}: BlogPostsGridProps) {
  const [activeCategory, setActiveCategory] = useState<BlogCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const normalizedSearchQuery = searchQuery.trim().toLowerCase();
  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      activeCategory === "all" || post.categories.includes(activeCategory);

    if (!matchesCategory) return false;
    if (!normalizedSearchQuery) return true;

    const categoryLabels = post.categories
      .map((category) => categories.find((c) => c.id === category)?.label ?? category)
      .join(" ");
    const searchableText = [
      post.title,
      post.excerpt,
      post.content.join(" "),
      post.tags.join(" "),
      categoryLabels,
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalizedSearchQuery);
  });
  const shouldShowFeaturedPosts =
    activeCategory === "all" && normalizedSearchQuery.length === 0;

  return (
    <>
      {/* Category Filter */}
      <section className="sticky top-16 z-40 -mx-4 mb-8 border-b border-gray-100 bg-white/95 px-4 py-3 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/85">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:flex-wrap lg:justify-start lg:overflow-visible lg:px-0 lg:pb-0">
              <button
                onClick={() => setActiveCategory("all")}
                className={`min-h-[44px] shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  activeCategory === "all"
                    ? "bg-orange-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                All Posts
                <span className={`ml-2 text-xs sm:text-sm ${
                  activeCategory === "all" ? "text-orange-200" : "text-gray-400"
                }`}>
                  ({posts.length})
                </span>
              </button>
              {categories.map(category => {
                const count = posts.filter(post => post.categories.includes(category.id as BlogCategory)).length;
                return (
                  <button
                    key={category.id}
                    onClick={() =>
                      setActiveCategory((currentCategory) =>
                        currentCategory === category.id ? "all" : (category.id as BlogCategory)
                      )
                    }
                    className={`min-h-[44px] shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all ${
                      activeCategory === category.id
                        ? "bg-orange-500 text-white shadow-md"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {category.label}
                    <span className={`ml-2 text-xs sm:text-sm ${
                      activeCategory === category.id ? "text-orange-200" : "text-gray-400"
                    }`}>
                      ({count})
                    </span>
                  </button>
                );
              })}
            </div>

            <label className="relative w-full lg:w-80">
              <span className="sr-only">Search blog articles</span>
              <svg
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-4.35-4.35m1.6-5.4a7 7 0 1 1-14 0 7 7 0 0 1 14 0z"
                />
              </svg>
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search blog keywords..."
                className="min-h-[44px] w-full rounded-full border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-700 shadow-sm outline-none transition focus:border-orange-300 focus:ring-2 focus:ring-orange-100"
              />
            </label>
          </div>
        </div>
      </section>

      {shouldShowFeaturedPosts && featuredPosts.length > 0 && (
        <section className="mb-10">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Story</h2>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {featuredPosts.map((post) => (
                <BlogCard
                  key={post.slug}
                  post={post}
                  categories={categories}
                  viewCount={viewCounts[post.slug] ?? 0}
                  featured
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              {activeCategory === "all" ? "Latest Articles" : categories.find(c => c.id === activeCategory)?.label || "Articles"}
            </h2>
            {normalizedSearchQuery && (
              <p className="text-sm text-gray-500">
                {filteredPosts.length} result{filteredPosts.length === 1 ? "" : "s"} for &quot;{searchQuery.trim()}&quot;
              </p>
            )}
          </div>
          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map(post => (
                <BlogCard
                  key={post.slug}
                  post={post}
                  categories={categories}
                  viewCount={viewCounts[post.slug] ?? 0}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <p className="text-gray-500">
                No articles found{normalizedSearchQuery ? " for this search." : " in this category."}
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
