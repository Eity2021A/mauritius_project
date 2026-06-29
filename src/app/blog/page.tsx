import { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogPostsGrid from "@/components/blog/BlogPostsGrid";
import type { BlogPost } from "@/data/blog";
import { getAllBlogPosts, getBlogCategories } from "@/lib/content";
import { getImageUrl } from "@/lib/image-url";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/constants";
import NewsletterForm from "@/components/NewsletterForm";
import { getBlogViewCount } from "@/lib/blog-view-counts";

export const metadata: Metadata = {
  title: "Blog - Travel Tips & Mauritius Guides",
  description: "Discover insider tips, travel guides, and local secrets about Mauritius. From hidden waterfalls to authentic Creole cuisine, explore the best of the island.",
  keywords: [
    "Mauritius blog",
    "Mauritius travel tips",
    "Mauritius guide",
    "things to do in Mauritius",
    "Mauritius attractions",
    "Mauritius travel blog",
  ],
  openGraph: {
    title: "Blog - Travel Tips & Mauritius Guides | Mauritius Explored",
    description: "Discover insider tips, travel guides, and local secrets about Mauritius.",
    type: "website",
    images: [DEFAULT_OG_IMAGE],
  },
  alternates: {
    canonical: "/blog",
  },
};

function BlogListJsonLd({ posts }: { posts: BlogPost[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Mauritius Explored Blog",
    "description": "Travel tips, guides, and local secrets about Mauritius",
    "url": `${SITE_URL}/blog`,
    "publisher": {
      "@type": "Organization",
      "name": "Mauritius Explored",
    },
    "blogPost": posts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "datePublished": post.publishedAt,
      "author": {
        "@type": "Person",
        "name": post.author,
      },
      "url": `${SITE_URL}/blog/${post.slug}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function BlogPage() {
  const [allPosts, blogCategories] = await Promise.all([
    getAllBlogPosts(),
    getBlogCategories(),
  ]);
  const viewCounts = Object.fromEntries(
    await Promise.all(
      allPosts.map(async (post) => [
        post.slug,
        await getBlogViewCount(post.slug),
      ] as const)
    )
  );
  const selectedFeaturedPosts = ([1, 2, 3] as const)
    .map((rank) => allPosts.find((post) => post.featuredRank === rank))
    .filter((post): post is BlogPost => Boolean(post));
  const fallbackFeaturedPosts = allPosts.filter(
    (post) => !selectedFeaturedPosts.some((featuredPost) => featuredPost.slug === post.slug)
  );
  const featuredPosts = (
    selectedFeaturedPosts.length > 0
      ? [...selectedFeaturedPosts, ...fallbackFeaturedPosts]
      : allPosts
  ).slice(0, 3);

  return (
    <main id="main-content" className=" bg-white">
      <BlogListJsonLd posts={allPosts} />
      <Navbar />

      {/* Hero Section with Banner */}
      <section className="relative h-[44vh] min-h-[280px]">
        <Image
          src={getImageUrl("/images/banners/horse-riding-le-morne-beach-mauritius.jpg")}
          alt="Mauritius Blog"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center px-4 max-w-4xl mx-auto translate-y-[2rem]">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Stories & Travel Guides
          </h1>
          <p className="text-white/90 text-base md:text-lg max-w-2xl mx-auto">
            Discover insider tips, hidden gems, and authentic experiences from our adventures across Mauritius.
          </p>
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="container mx-auto px-4 ">
        <div className="pt-4 pb-8 md:pt-6 md:pb-12">
          <BlogPostsGrid
            posts={allPosts}
            featuredPosts={featuredPosts}
            categories={blogCategories}
            viewCounts={viewCounts}
          />
        </div>
      </div>

      {/* Newsletter CTA */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Stay Updated
            </h2>
            <p className="text-gray-600 mb-8">
              Get the latest travel tips and guides delivered straight to your inbox.
            </p>
            <NewsletterForm source="blog" />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
