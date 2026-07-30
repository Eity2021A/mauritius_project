"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { formatDate, type BlogCategory, type BlogPost } from "@/data/blog";
import { getImageSrcSet, getImageUrl } from "@/lib/image-url";
import MobileFilterSheet from "@/components/ui/MobileFilterSheet";
import { useTranslations } from "next-intl";

interface BlogPostsGridProps {
  posts: BlogPost[];
  featuredPosts: BlogPost[];
  categories: { id: string; label: string }[];
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
  featured = false,
}: {
  post: BlogPost;
  categories: { id: string; label: string }[];
  featured?: boolean;
}) {
  const imageWidth = featured ? 800 : 400;
  const hasImage = typeof post.image === "string" && post.image.trim().length > 0;

  return (
    <article className="group h-full">
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <div className="relative w-full aspect-[4/5] overflow-hidden rounded-lg img-shimmer">
          {hasImage ? (
            <img
              src={getImageUrl(post.image, { width: imageWidth, quality: 75 })}
              srcSet={getImageSrcSet(post.image, {
                widths: [400, 800, 1200],
                quality: 66,
              })}
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              alt={post.imageAlt || post.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div
              className="absolute inset-0 bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400"
              aria-hidden="true"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />

          {/* Categories - Top */}
          <div className="absolute top-4 left-4 right-4 flex flex-wrap gap-2">
            {post.categories.slice(0, 2).map((category) => {
              const categoryLabel =
                categories.find((c) => c.id === category)?.label || category;
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
            <h2
              className={`mb-2 line-clamp-3 font-bold text-white transition-colors group-hover:text-orange-200 ${featured ? "text-base sm:text-lg xl:text-xl" : "text-base md:text-lg"}`}
            >
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
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

function SidebarPostItem({ post }: { post: BlogPost }) {
  const hasImage = typeof post.image === "string" && post.image.trim().length > 0;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex items-start gap-3 rounded-2xl border border-gray-100 p-3 transition hover:border-orange-200 hover:bg-orange-50/40"
    >
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-100">
        {hasImage ? (
          <img
            src={getImageUrl(post.image, { width: 200, quality: 72 })}
            srcSet={getImageSrcSet(post.image, {
              widths: [200, 400],
              quality: 66,
            })}
            sizes="80px"
            alt={post.imageAlt || post.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div
            className="absolute inset-0 bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400"
            aria-hidden="true"
          />
        )}
      </div>
      <div className="min-w-0">
        <h3 className="line-clamp-2 text-sm font-semibold text-gray-900 transition-colors group-hover:text-orange-600">
          {post.title}
        </h3>
        <p className="mt-1 text-xs text-gray-500">
          {formatDate(post.publishedAt)}
        </p>
      </div>
    </Link>
  );
}

export default function BlogPostsGrid({
  posts,
  featuredPosts,
  categories,
}: BlogPostsGridProps) {
  const t = useTranslations("BlogIndex.grid");
  const [activeCategory, setActiveCategory] = useState<BlogCategory | "all">(
    "all",
  );
  const [activeTag, setActiveTag] = useState<string | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [draftCategory, setDraftCategory] = useState<BlogCategory | "all">("all");
  const [draftTag, setDraftTag] = useState<string | "all">("all");

  const normalizedSearchQuery = searchQuery.trim().toLowerCase();
  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      activeCategory === "all" || post.categories.includes(activeCategory);
    const matchesTag = activeTag === "all" || post.tags.includes(activeTag);

    if (!matchesCategory || !matchesTag) return false;
    if (!normalizedSearchQuery) return true;

    const categoryLabels = post.categories
      .map(
        (category) =>
          categories.find((c) => c.id === category)?.label ?? category,
      )
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
    activeCategory === "all" &&
    activeTag === "all" &&
    normalizedSearchQuery.length === 0;
  const latestPosts = posts.slice(0, 4);
  const popularTags = [...new Set(posts.flatMap((post) => post.tags))].slice(
    0,
    10,
  );
  const translatedCategories = categories.map((category) => ({
    ...category,
    label: t(`categories.${category.id}`),
  }));
  const hasActiveFilters = draftCategory !== "all" || draftTag !== "all";
  const resultsSectionRef = useRef<HTMLElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    resultsSectionRef.current?.scrollIntoView({ behavior: "auto", block: "start" });
  }, [activeCategory, activeTag, searchQuery]);

  return (
    <>
      {/* Category Filter */}
      {/* <section className="sticky top-16 z-40 -mx-4 mb-8 border-b border-gray-100 bg-white/95 px-4 py-3 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/85">
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
          </div>
        </div>
      </section> */}

      <section ref={resultsSectionRef} className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="lg:hidden sticky top-[calc(env(safe-area-inset-top)+4rem)] z-30 bg-white/95 backdrop-blur border-b border-gray-100 -mx-4 px-4 py-3 mb-4">
            <div className="flex items-center gap-2">
              <input
                id="blog-search-mobile"
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder={t("searchArticles")}
                className="flex-1 w-full px-4 py-3 min-h-[48px] text-base border border-gray-300 rounded-xl outline-none focus:border-gray-400"
                aria-label={t("searchArticlesAria")}
              />
              <button
                type="button"
                onClick={() => {
                  setDraftCategory(activeCategory);
                  setDraftTag(activeTag);
                  setIsFilterSheetOpen(true);
                }}
                className="h-12 w-12 flex-shrink-0 rounded-xl border border-gray-300 bg-white flex items-center justify-center text-gray-700"
                aria-label={t("openFilters")}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h18M6 12h12M10 20h4" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:flex-row lg:gap-4">
            <aside className="hidden lg:block lg:w-64 xl:w-86 flex-shrink-0">
              <div
                className="space-y-6 lg:sticky lg:top-24 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto lg:pr-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              >
                <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {t("author.title")}
                  </h3>
                  <p className="mt-5 text-base leading-8 text-gray-600">
                    {t("author.description")}
                  </p>
                </section>
                <label className="relative w-full lg:w-80">
                  <span className="sr-only">{t("searchArticlesAria")}</span>
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
                    placeholder={t("searchKeywords")}
                    className="mb-6 min-h-[44px] w-full rounded-full border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-700 shadow-sm outline-none transition focus:border-orange-300 focus:ring-2 focus:ring-orange-100"
                  />
                </label>
                <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900">
                    {t("categoriesTitle")}
                  </h3>
                  <div className="mt-4 space-y-3">
                    <button
                      onClick={() => setActiveCategory("all")}
                      className={`flex w-full items-center justify-between rounded-2xl px-3 py-2 text-left text-sm transition ${
                        activeCategory === "all"
                          ? "bg-orange-50 text-orange-700"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <span>{t("allPosts")}</span>
                      <span className="text-xs text-gray-400">
                        {posts.length}
                      </span>
                    </button>
                    {translatedCategories.map((category) => {
                      const count = posts.filter((post) =>
                        post.categories.includes(category.id as BlogCategory),
                      ).length;
                      return (
                        <button
                          key={category.id}
                          onClick={() =>
                            setActiveCategory((currentCategory) =>
                              currentCategory === category.id
                                ? "all"
                                : (category.id as BlogCategory),
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
                  <h3 className="text-lg font-bold text-gray-900">
                    {t("latestPosts")}
                  </h3>
                  <div className="mt-4 space-y-3">
                    {latestPosts.map((post) => (
                      <SidebarPostItem
                        key={post.slug}
                        post={post}
                      />
                    ))}
                  </div>
                </section>

                {popularTags.length > 0 && (
                  <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900">{t("tags")}</h3>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {popularTags.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() =>
                            setActiveTag((currentTag) =>
                              currentTag === tag ? "all" : tag,
                            )
                          }
                          className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                            activeTag === tag
                              ? "bg-orange-100 text-orange-700"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </section>
                )}

                <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-bold text-gray-900">
                      {t("instagramGallery")}
                    </h3>
                    <a
                      href="https://www.instagram.com/mauritius__explored/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-500 hover:text-orange-600"
                    >
                      {t("visit")}
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
                            src={getImageUrl(item.image, {
                              width: 320,
                              quality: 72,
                            })}
                            srcSet={getImageSrcSet(item.image, {
                              widths: [200, 320, 480],
                              quality: 66,
                            })}
                            sizes="120px"
                            alt={item.alt}
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                            decoding="async"
                          />
                          <div className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/25" />
                          <div className="absolute bottom-2 right-2 rounded-full bg-white/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-gray-900">
                            {t("reel")}
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </section>
              </div>
            </aside>

            <div className="min-w-0 flex-1">
              {shouldShowFeaturedPosts && featuredPosts.length > 0 && (
                <section className="mb-12">
                  <h2 className="mb-6 text-2xl font-bold text-gray-900">
                    {t("featuredStory")}
                  </h2>
                  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {featuredPosts.map((post) => (
                      <BlogCard
                        key={post.slug}
                        post={post}
                        categories={translatedCategories}
                        featured
                      />
                    ))}
                  </div>
                </section>
              )}

              <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  {activeCategory === "all"
                    ? activeTag === "all"
                      ? t("latestArticles")
                      : t("tagHeading", { tag: activeTag })
                    : translatedCategories.find((c) => c.id === activeCategory)?.label ||
                      t("articles")}
                </h2>
                {normalizedSearchQuery && (
                  <p className="text-sm text-gray-500">
                    {t("results", { count: filteredPosts.length, query: searchQuery.trim() })}
                  </p>
                )}
              </div>

              {filteredPosts.length > 0 ? (
                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                  {filteredPosts.map((post) => (
                    <BlogCard
                      key={post.slug}
                      post={post}
                      categories={translatedCategories}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                    <svg
                      className="h-8 w-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-500">
                    {normalizedSearchQuery
                      ? t("noArticlesSearch")
                      : t("noArticlesCategory")}
                  </p>
                </div>
              )}
            </div>
          </div>

          <MobileFilterSheet
            open={isFilterSheetOpen}
            title={t("filters")}
            onClose={() => setIsFilterSheetOpen(false)}
            onApply={() => {
              setActiveCategory(draftCategory);
              setActiveTag(draftTag);
              setIsFilterSheetOpen(false);
            }}
            onReset={() => {
              setDraftCategory("all");
              setDraftTag("all");
            }}
            hasActiveFilters={hasActiveFilters}
            applyLabel={t("applyFilters")}
            resetLabel={t("reset")}
            closeLabel={t("closeFilters")}
          >
            <div className="space-y-5">
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">{t("category")}</h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setDraftCategory("all")}
                    className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium border transition-colors ${
                      draftCategory === "all"
                        ? "bg-orange-500 border-orange-500 text-white"
                        : "bg-white border-gray-300 text-gray-700"
                    }`}
                  >
                    <span>{t("allPosts")}</span>
                    <span className={`text-[11px] px-1.5 py-0.5 rounded-full ${draftCategory === "all" ? "bg-white/25" : "bg-gray-100"}`}>
                      {posts.length}
                    </span>
                  </button>
                  {translatedCategories.map((category) => {
                    const count = posts.filter((post) =>
                      post.categories.includes(category.id as BlogCategory),
                    ).length;
                    const active = draftCategory === category.id;
                    return (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => setDraftCategory(category.id as BlogCategory)}
                        className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium border transition-colors ${
                          active
                            ? "bg-orange-500 border-orange-500 text-white"
                            : "bg-white border-gray-300 text-gray-700"
                        }`}
                      >
                        <span>{category.label}</span>
                        <span className={`text-[11px] px-1.5 py-0.5 rounded-full ${active ? "bg-white/25" : "bg-gray-100"}`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
              {popularTags.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">{t("tags")}</h4>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setDraftTag("all")}
                      className={`inline-flex items-center rounded-full px-3.5 py-2 text-sm font-medium border transition-colors ${
                        draftTag === "all"
                          ? "bg-orange-500 border-orange-500 text-white"
                          : "bg-white border-gray-300 text-gray-700"
                      }`}
                    >
                      {t("allTags")}
                    </button>
                    {popularTags.map((tag) => {
                      const active = draftTag === tag;
                      return (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => setDraftTag(tag)}
                          className={`inline-flex items-center rounded-full px-3.5 py-2 text-sm font-medium border transition-colors ${
                            active
                              ? "bg-orange-500 border-orange-500 text-white"
                              : "bg-white border-gray-300 text-gray-700"
                          }`}
                        >
                          {tag}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </MobileFilterSheet>
        </div>
      </section>
    </>
  );
}
