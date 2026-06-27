import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getMyItineraries } from "@/lib/itinerary-actions";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getImageUrl } from "@/lib/image-url";
import DeleteItineraryButton from "./DeleteItineraryButton";
import ShareItineraryButton from "./ShareItineraryButton";
import PublicToggleButton from "./PublicToggleButton";
import TripCountdownClient from "./TripCountdownClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "My Trips | Mauritius Explored",
  description: "View and manage your saved Mauritius itineraries",
};

export default async function MyTripsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  const itineraries = await getMyItineraries();

  return (
    <main id="main-content" className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[44vh] min-h-[280px]">
        <Image
          src={getImageUrl("/images/banners/le-morne-aerial-view-mauritius.jpg")}
          alt="My Trips - Mauritius Explored"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center px-4 max-w-4xl mx-auto translate-y-[2rem]">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              My Itineraries
            </h1>
            <p className="text-white/90 text-base md:text-lg max-w-2xl mx-auto">
              Your saved Mauritius itineraries
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
        {/* Header row */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm text-gray-500">
            {itineraries.length === 0
              ? "You haven't saved any itineraries yet"
              : `${itineraries.length} saved itinerar${itineraries.length === 1 ? "y" : "ies"}`}
          </p>
          <Link
            href="/itineraries-mauritius/create"
            className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 text-white text-sm font-semibold rounded-xl hover:bg-orange-600 transition-colors shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <span>Create new</span>
          </Link>
        </div>

        {itineraries.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
            <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c-.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">No trips yet</h2>
            <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">
              Start building your perfect Mauritius itinerary by adding beaches, activities and places you want to visit.
            </p>
            <Link
              href="/itineraries-mauritius/create"
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white text-sm font-semibold rounded-xl hover:bg-orange-600 transition-colors shadow-sm"
            >
              Create your first itinerary
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {itineraries.map((itin) => (
              <div
                key={itin.id}
                className="group flex gap-4 p-4 rounded-xl border border-gray-200 bg-white shadow-sm hover:border-orange-400 hover:shadow-md transition-all"
              >
                {/* Image — same size as all itineraries cards */}
                <span className="relative flex-shrink-0 w-28 h-28 sm:w-32 sm:h-32 rounded-lg overflow-hidden bg-gray-100">
                  {itin.cover_image ? (
                    <img
                      src={getImageUrl(itin.cover_image, { width: 300, quality: 75 })}
                      alt={itin.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  ) : (
                    <span className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50">
                      <svg className="w-10 h-10 text-orange-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c-.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                      </svg>
                    </span>
                  )}
                </span>

                {/* Content — same structure as all itineraries */}
                <span className="flex flex-col flex-1 min-w-0">
                  <span>
                    <span className="font-bold text-gray-900 text-base leading-snug group-hover:text-orange-600 transition-colors block">
                      {itin.title}
                    </span>
                    <span className="text-xs text-gray-500 mt-0.5 block">
                      {itin.trip_start
                        ? new Date(itin.trip_start).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                        : `Saved ${new Date(itin.created_at).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                          })}`}
                    </span>
                  </span>

                  {itin.trip_start && new Date(itin.trip_start + "T00:00:00") > new Date() && (
                    <div className="mt-2">
                      <TripCountdownClient tripStart={itin.trip_start} />
                    </div>
                  )}

                  {/* Badges — same style as all itineraries */}
                  <span className="flex items-center gap-1.5 mt-3 flex-wrap">
                    <span className="inline-flex flex-shrink-0 items-center gap-1 px-2.5 py-1 rounded-full bg-gray-50 border border-gray-200 text-xs font-semibold text-orange-600">
                      {itin.stop_count} stop{itin.stop_count !== 1 ? "s" : ""}
                    </span>
                    {itin.is_public && (
                      <span className="inline-flex flex-shrink-0 items-center gap-1 px-2.5 py-1 rounded-full bg-green-50 border border-green-200 text-xs font-semibold text-green-700">
                        {itin.is_anonymous ? "Public (Anonymous)" : "Public"}
                      </span>
                    )}
                  </span>

                  {/* Action buttons */}
                  <div className="mt-4 pt-3 border-t border-gray-100 grid grid-cols-2 gap-2">
                    <PublicToggleButton id={itin.id} isPublic={itin.is_public} isAnonymous={itin.is_anonymous} />
                    <Link
                      href={`/itineraries-mauritius/create?load=${itin.id}`}
                      className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-orange-200 bg-orange-50 text-orange-600 text-xs font-semibold hover:bg-orange-100 hover:border-orange-300 transition-colors"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
                      </svg>
                      View/Edit
                    </Link>
                    <ShareItineraryButton slug={itin.slug} />
                    <DeleteItineraryButton id={itin.id} title={itin.title} />
                  </div>
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
