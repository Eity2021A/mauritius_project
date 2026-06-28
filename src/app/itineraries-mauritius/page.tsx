import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PREDESIGNED_ITINERARIES } from "@/data/predesigned-itineraries";
import { getImageUrl } from "@/lib/image-url";
import { getPublicItineraries, getFeaturedUpvotes } from "@/lib/itinerary-actions";
import UpvoteButton from "@/components/UpvoteButton";
import ScrollToCommunitySection from "./ScrollToCommunitySection";
import ItinerariesListClient from "./ItinerariesListClient";
import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Mauritius Itineraries - Plan Your Trip",
  description: "Explore pre-designed itineraries and road trips for Mauritius, or create your own custom travel plan.",
  openGraph: {
    title: "Mauritius Itineraries - Plan Your Trip",
    description: "Explore pre-designed itineraries and road trips for Mauritius.",
    images: [DEFAULT_OG_IMAGE],
  },
  alternates: { canonical: "/itineraries-mauritius" },
};

export const revalidate = 3600;

export default async function ItinerariesMauritiusPage() {
  const [communityItineraries, featuredUpvotes] = await Promise.all([
    getPublicItineraries(),
    getFeaturedUpvotes(),
  ]);
  return (
    <main id="main-content" className="min-h-screen">
      <ScrollToCommunitySection />
      <Navbar />

      <section className="relative h-[44vh] min-h-[280px]">
        <Image
          src={getImageUrl("/images/banners/horse-riding-le-morne-beach-mauritius.jpg")}
          alt="Plan your Mauritius itinerary"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center px-4 max-w-4xl mx-auto translate-y-[2rem]">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Your Mauritius Itinerary
            </h1>
            <p className="text-white/90 text-base md:text-lg max-w-2xl mx-auto">
              Beaches, activities, and nature spots on one map
            </p>
          </div>
        </div>
      </section>

      <div className="w-full bg-gray-50/80 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">

          {/* Recommended itineraries — 2-col listing view */}
          <ItinerariesListClient
            itineraries={PREDESIGNED_ITINERARIES}
            featuredUpvotes={featuredUpvotes}
          />

          {/* Divider */}
          <div className="border-t border-gray-200 mb-8" />

          {/* Create your itineraries — id for deep-link /itineraries-mauritius#build-your-own */}
          <section id="build-your-own" className="scroll-mt-24">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Create your itineraries</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">

            {/* AI itinerary */}
            {/* <Link
              href="/itineraries-mauritius/ai-generate"
              className="group flex gap-4 p-4 rounded-xl border border-gray-200 bg-white shadow-sm hover:border-orange-400 hover:shadow-md transition-all"
            >
              <span className="relative flex-shrink-0 w-28 h-28 sm:w-32 sm:h-32 rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={getImageUrl("custom-itinerary-mauritius-explored-ai.jpg")}
                  alt="Let AI create your itinerary"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </span>
              <span className="flex flex-col flex-1 min-w-0">
                <span className="font-bold text-gray-900 text-base leading-snug group-hover:text-orange-600 transition-colors flex items-center gap-2 flex-wrap">
                  Let AI create your itinerary
                  <span className="text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded bg-blue-500 text-white">Beta</span>
                </span>
                <span className="text-sm text-gray-500 mt-1 block leading-relaxed">
                  Pick your interests and get a personalised trip
                </span>
                <span className="inline-flex items-center gap-2 mt-4 px-4 py-2.5 rounded-lg text-sm font-medium bg-white text-gray-700 border border-gray-200 group-hover:bg-blue-500 group-hover:border-blue-500 group-hover:text-white transition-colors w-fit">
                  Create with AI
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </span>
              </span>
            </Link> */}

            {/* Manual itinerary */}
            <Link
              href="/itineraries-mauritius/create"
              className="group flex gap-4 p-4 rounded-xl border border-gray-200 bg-white shadow-sm hover:border-orange-400 hover:shadow-md transition-all"
            >
              <span className="relative flex-shrink-0 w-28 h-28 sm:w-32 sm:h-32 rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={getImageUrl("custom-itinerary-mauritius-explored-manual.jpg")}
                  alt="Create your itinerary"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </span>
              <span className="flex flex-col flex-1 min-w-0">
                <span className="font-bold text-gray-900 text-base leading-snug group-hover:text-orange-600 transition-colors flex items-center gap-2 flex-wrap">
                  Create your itinerary
                  <span className="text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded bg-orange-500 text-white">New</span>
                </span>
                <span className="text-sm text-gray-500 mt-1 block leading-relaxed">
                  Add your own stops and build a custom map
                </span>
                <span className="inline-flex items-center gap-2 mt-4 px-4 py-2.5 rounded-lg text-sm font-medium bg-white text-gray-700 border border-gray-200 group-hover:bg-orange-500 group-hover:border-orange-500 group-hover:text-white transition-colors w-fit">
                  Create on your own
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </span>
              </span>
            </Link>

          </div>
          </section>

          {/* Divider */}
          <div className="border-t border-gray-200 mb-8" />

          {/* Community itineraries — id for nav deep-link /itineraries-mauritius#community */}
          <section id="community" className="scroll-mt-24">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">Itineraries created by fellow travelers</h2>
            <p className="text-sm text-gray-500 mb-4">Discover trips shared by the Mauritius Explored community</p>

          {communityItineraries.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-10 text-center">
              <svg className="w-10 h-10 text-orange-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
              <p className="text-sm font-medium text-gray-700 mb-1">No itineraries shared yet</p>
              <p className="text-xs text-gray-400 mb-4">Be the first — create yours and share it with the community.</p>
              <Link href="/itineraries-mauritius/create" className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-600 transition-colors">
                Create your itinerary
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {communityItineraries.map((itin) => (
                <div key={itin.id} className="relative">
                  <Link
                    href={`/itineraries-mauritius/shared/${itin.slug}`}
                    className="group flex gap-4 p-4 pr-20 rounded-xl border border-gray-200 bg-white shadow-sm hover:border-orange-400 hover:shadow-md transition-all"
                  >
                    <span className="relative flex-shrink-0 w-28 h-28 sm:w-32 sm:h-32 rounded-lg overflow-hidden bg-gray-100">
                      {itin.cover_image ? (
                        <img
                          src={getImageUrl(itin.cover_image, { width: 300, quality: 75 })}
                          alt={itin.title}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      ) : (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c-.317-.159-.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                          </svg>
                        </span>
                      )}
                    </span>
                    <span className="flex flex-col flex-1 min-w-0 justify-between">
                      <span>
                        <span className="font-bold text-gray-900 text-base leading-snug group-hover:text-orange-600 transition-colors block">
                          {itin.title}
                        </span>
                        <span className="text-xs text-gray-400 mt-0.5 block">by {itin.author_name}</span>
                      </span>
                      <span className="flex items-center gap-1.5 mt-3 flex-nowrap overflow-x-auto min-w-0">
                        <span className="inline-flex flex-shrink-0 items-center gap-1 px-2.5 py-1 rounded-full bg-gray-50 border border-gray-200 text-xs font-semibold text-orange-600">
                          {itin.stop_count} stop{itin.stop_count !== 1 ? "s" : ""}
                        </span>
                        {itin.total_distance_km != null && (
                          <span className="inline-flex flex-shrink-0 items-center gap-1 px-2.5 py-1 rounded-full bg-gray-50 border border-gray-200 text-xs font-semibold text-orange-600">
                            {itin.total_distance_km} km
                          </span>
                        )}
                      </span>
                    </span>
                  </Link>
                  <div className="absolute top-3 right-3 z-10">
                    <UpvoteButton
                      itineraryId={itin.id}
                      initialCount={itin.upvote_count}
                      compact
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
          </section>

        </div>
      </div>

      <Footer />
    </main>
  );
}
