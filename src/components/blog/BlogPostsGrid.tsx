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

const INSTAGRAM_GALLERY_ITEMS = [
  {
    id: "DEr7Wv0BCHS",
    url: "https://www.instagram.com/mauritius/reel/DEr7Wv0BCHS/",
    image: "ile-aux-cerfs-drone-shot.jpg",
    alt: "Welcome to Mauritius Instagram reel",
  },
  {
    id: "DT7bV0jE2PZ",
    url: "https://www.instagram.com/mauritius_explored/reel/DT7bV0jE2PZ/",
    image: "beach-of-le-morne-in-the-morning.jpg",
    alt: "Le Morne Instagram reel",
  },
  {
    id: "DThdVzukzIS",
    url: "https://www.instagram.com/mauritius_explored/reel/DThdVzukzIS/",
    image: "belle-mare-beach-on-the-east-coast.jpg",
    alt: "Relaxing Mauritius Instagram reel",
  },
  {
    id: "mauritius-2026",
    url: "https://www.instagram.com/mauritius__explored/",
    image: "ile-aux-cerfs.jpg",
    alt: "Mauritius Explored Instagram profile",
  },
] as const;

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

function SidebarPostItem({
  post,
  viewCount,
}: {
  post: BlogPost;
  viewCount: number;
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex items-start gap-3 rounded-2xl border border-gray-100 p-3 transition hover:border-orange-200 hover:bg-orange-50/40"
    >
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-100">
        <img
          src={getImageUrl(post.image, { width: 200, quality: 72 })}
          srcSet={getImageSrcSet(post.image, { widths: [200, 400], quality: 66 })}
          sizes="80px"
          alt={post.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="min-w-0">
        <h3 className="line-clamp-2 text-sm font-semibold text-gray-900 transition-colors group-hover:text-orange-600">
          {post.title}
        </h3>
        <p className="mt-1 text-xs text-gray-500">{formatDate(post.publishedAt)}</p>
        <p className="mt-1 text-xs text-gray-400">{formatBlogViewCount(viewCount)}</p>
      </div>
    </Link>
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
  const latestPosts = posts.slice(0, 4);
  const popularTags = [...new Set(posts.flatMap((post) => post.tags))].slice(0, 10);

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

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 xl:grid-cols-12 xl:items-start">
            <aside className="xl:col-span-4">
              <div className="space-y-6 xl:sticky xl:top-28">
                <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                  <h3 className="text-2xl font-bold text-gray-900">About Author</h3>
                  <p className="mt-5 text-base leading-8 text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                    sollicitudin, tellus vitae condimentum egestas, libero dolor
                    auctor tellus, eu consectetur neque elit quis nunc.
                  </p>
                </section>

                <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900">Categories</h3>
                  <div className="mt-4 space-y-3">
                    <button
                      onClick={() => setActiveCategory("all")}
                      className={`flex w-full items-center justify-between rounded-2xl px-3 py-2 text-left text-sm transition ${
                        activeCategory === "all"
                          ? "bg-orange-50 text-orange-700"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <span>All Posts</span>
                      <span className="text-xs text-gray-400">{posts.length}</span>
                    </button>
                    {categories.map((category) => {
                      const count = posts.filter(post => post.categories.includes(category.id as BlogCategory)).length;
                      return (
                        <button
                          key={category.id}
                          onClick={() =>
                            setActiveCategory((currentCategory) =>
                              currentCategory === category.id ? "all" : (category.id as BlogCategory)
                            )
                          }
                          className={`flex w-full items-center justify-between rounded-2xl px-3 py-2 text-left text-sm transition ${
                            activeCategory === category.id
                              ? "bg-orange-50 text-orange-700"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          }`}
                        >
                          <span>{category.label}</span>
                          <span className="text-xs text-gray-400">{count}</span>
                        </button>
                      );
                    })}
                  </div>
                </section>

                <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900">Latest Posts</h3>
                  <div className="mt-4 space-y-3">
                    {latestPosts.map((post) => (
                      <SidebarPostItem
                        key={post.slug}
                        post={post}
                        viewCount={viewCounts[post.slug] ?? 0}
                      />
                    ))}
                  </div>
                </section>

                {popularTags.length > 0 && (
                  <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900">Tags</h3>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {popularTags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </section>
                )}

                <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-bold text-gray-900">Instagram Gallery</h3>
                    <a
                      href="https://www.instagram.com/mauritius__explored/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-500 hover:text-orange-600"
                    >
                      Visit
                    </a>
                  </div>
                  <div className="mt-4 grid max-w-100 grid-cols-2 gap-2">
                    {INSTAGRAM_GALLERY_ITEMS.map((item) => (
                      <a
                        key={item.id}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={item.alt}
                        className="group block"
                      >
                        <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
                          <img
                            src={getImageUrl(item.image, { width: 320, quality: 72 })}
                            srcSet={getImageSrcSet(item.image, { widths: [200, 320, 480], quality: 66 })}
                            sizes="120px"
                            alt={item.alt}
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                            decoding="async"
                          />
                          <div className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/25" />
                          <div className="absolute bottom-2 right-2 rounded-full bg-white/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-gray-900">
                            Reel
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </section>
              </div>
            </aside>

            <div className="xl:col-span-8">
              {shouldShowFeaturedPosts && featuredPosts.length > 0 && (
                <section className="mb-12">
                  <h2 className="mb-6 text-2xl font-bold text-gray-900">Featured Story</h2>
                  <div className="grid gap-6 sm:grid-cols-2">
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
                </section>
              )}

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
                <div className="grid gap-8 md:grid-cols-2">
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
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                    <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                  <p className="text-gray-500">
                    No articles found{normalizedSearchQuery ? " for this search." : " in this category."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
