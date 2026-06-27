import Image from "next/image";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PhotoGalleryWrapper from "@/components/PhotoGalleryWrapper";
import QuoteSection from "@/components/ui/QuoteSection";
import CategoryBadges from "@/components/ui/CategoryBadges";
import { LocationIcon, ArrowRightIcon } from "@/components/icons";
import { getPlaceDetailsBySlug, getActivityDetailsBySlugFromDb, getAllActivitySlugs, getRelatedActivities, getBeachDetailsBySlug } from "@/lib/content";
import { getPreDesignedItineraryBySlug, getPreDesignedItinerarySlugs, PREDESIGNED_ITINERARIES, type PreDesignedStop } from "@/data/predesigned-itineraries";
import { ALL_BEACHES } from "@/data/beaches";
import { BreadcrumbJsonLd, ActivityJsonLd } from "@/components/seo/JsonLd";
import InfoItem from "@/components/ui/InfoItem";
import DetailMiniMapWrapper from "@/components/ui/DetailMiniMapWrapper";
import ItineraryDetailView from "@/components/ItineraryDetailView";
import AddToItineraryButton from "@/components/AddToItineraryButton";
import { getImageSrcSet, getImageUrl } from "@/lib/image-url";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/constants";
import type { RouteInfo } from "@/components/ItineraryBuilderMap";

const allBeaches = ALL_BEACHES;

async function getStopPosition(stop: PreDesignedStop): Promise<[number, number]> {
  if (stop.type === "place") {
    const place = await getPlaceDetailsBySlug(stop.slug);
    if (place?.coordinates && (place.coordinates[0] !== 0 || place.coordinates[1] !== 0))
      return place.coordinates;
  }
  if (stop.type === "beach") {
    const details = await getBeachDetailsBySlug(stop.slug);
    if (details?.coordinates && (details.coordinates[0] !== 0 || details.coordinates[1] !== 0))
      return details.coordinates;
  }
  if (stop.type === "activity") {
    const activity = await getActivityDetailsBySlugFromDb(stop.slug);
    if (activity?.coordinates && (activity.coordinates[0] !== 0 || activity.coordinates[1] !== 0))
      return activity.coordinates;
  }
  return stop.position;
}

async function getStopDescription(stop: PreDesignedStop): Promise<string | undefined> {
  if (stop.type === "place") {
    const place = await getPlaceDetailsBySlug(stop.slug);
    if (!place) return undefined;
    const paras = Array.isArray(place.description) ? place.description : [];
    return paras.length > 0 ? [place.tagline, ...paras.slice(0, 2)].filter(Boolean).join(" ") : place.tagline ?? "";
  }
  if (stop.type === "beach") {
    const details = await getBeachDetailsBySlug(stop.slug);
    if (details?.description?.length) {
      return [details.tagline, ...details.description.slice(0, 2)].filter(Boolean).join(" ");
    }
    return allBeaches.find((b) => b.slug === stop.slug)?.description;
  }
  if (stop.type === "activity") {
    const activity = await getActivityDetailsBySlugFromDb(stop.slug);
    if (!activity) return undefined;
    const paras = Array.isArray(activity.description) ? activity.description : [];
    return paras.length > 0 ? [activity.tagline, ...paras.slice(0, 2)].filter(Boolean).join(" ") : activity.tagline ?? "";
  }
  return undefined;
}

async function getStopImages(stop: PreDesignedStop): Promise<string[] | undefined> {
  if (stop.type === "place") {
    const place = await getPlaceDetailsBySlug(stop.slug);
    return place?.images;
  }
  if (stop.type === "beach") {
    const details = await getBeachDetailsBySlug(stop.slug);
    return details?.images;
  }
  if (stop.type === "activity") {
    const activity = await getActivityDetailsBySlugFromDb(stop.slug);
    return activity?.images;
  }
  return undefined;
}

const OSRM_BASE = "https://router.project-osrm.org/route/v1/driving";

async function fetchItineraryRouteTotals(stops: { position: [number, number] }[]): Promise<RouteInfo | null> {
  if (stops.length < 2) return null;
  const coords = stops.map((s) => `${s.position[1]},${s.position[0]}`).join(";");
  const url = `${OSRM_BASE}/${coords}?overview=false&geometries=geojson&steps=false`;

  const res = await fetch(url, { next: { revalidate: 60 * 60 * 24 * 30 } });
  if (!res.ok) return null;
  const data = await res.json();
  const legs = data?.routes?.[0]?.legs;
  if (!Array.isArray(legs)) return null;

  const mappedLegs = legs.map((leg: { distance: number; duration: number }) => ({
    distanceKm: Math.round((leg.distance / 1000) * 10) / 10,
    durationMin: Math.round(leg.duration / 60),
  }));

  return {
    legs: mappedLegs,
    totalDistanceKm: Math.round(mappedLegs.reduce((sum, l) => sum + l.distanceKm, 0) * 10) / 10,
    totalDurationMin: mappedLegs.reduce((sum, l) => sum + l.durationMin, 0),
  };
}

const DETAIL_BASE = "/top-activities-mauritius";

export async function generateStaticParams() {
  const activitySlugs = await getAllActivitySlugs();
  const itinerarySlugs = getPreDesignedItinerarySlugs();
  const allSlugs = [...new Set([...activitySlugs, ...itinerarySlugs])];
  return allSlugs.map((slug) => ({ slug }));
}

// Generate metadata for SEO (itinerary, place, or activity)
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const canonical = `/top-activities-mauritius/${slug}`;
  const itinerary = getPreDesignedItineraryBySlug(slug);
  if (itinerary) {
    const itineraryDescription =
      itinerary.introParagraph?.[0] ??
      itinerary.subtitle ??
      `Explore ${itinerary.title} - things to do in Mauritius`;
    const itineraryImage = itinerary.image
      ? getImageUrl(itinerary.image, { width: 1200, quality: 75 })
      : DEFAULT_OG_IMAGE.url;
    return {
      title: `${itinerary.title} | Itineraries Mauritius | Mauritius Explored`,
      description: itineraryDescription,
      alternates: { canonical },
      openGraph: {
        title: itinerary.title,
        description: itineraryDescription,
        images: [{ url: itineraryImage, width: 1200, height: 630, alt: itinerary.title }],
      },
      twitter: {
        card: "summary_large_image",
        title: itinerary.title,
        description: itineraryDescription,
        images: [itineraryImage],
      },
    };
  }
  const activity = await getActivityDetailsBySlugFromDb(slug);
  if (activity) {
    const activityHeroImage = activity.heroImage ?? activity.images[0];
    const activityImage = activityHeroImage
      ? getImageUrl(activityHeroImage, { width: 1200, quality: 75 })
      : DEFAULT_OG_IMAGE.url;
    return {
      title: `${activity.name} | Activities in Mauritius | Mauritius Explored`,
      description: activity.tagline,
      alternates: { canonical },
      openGraph: {
        title: activity.name,
        description: activity.tagline,
        images: [{ url: activityImage, width: 1200, height: 630, alt: activity.name }],
      },
      twitter: {
        card: "summary_large_image",
        title: activity.name,
        description: activity.tagline,
        images: [activityImage],
      },
    };
  }
  return { title: "Not Found" };
}

// Small icons for activity sidebar
function DurationIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
function CalendarIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}
function DifficultyIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}
function AdmissionIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function BookingCta({ bookingUrl }: { bookingUrl?: string }) {
  return (
    <div className="space-y-2">
      {bookingUrl ? (
        <Link
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center min-h-[48px] w-full bg-orange-500 text-white text-center py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
        >
          Book Now
        </Link>
      ) : (
        <span className="inline-flex items-center justify-center min-h-[48px] gap-2 w-full bg-gray-300 text-gray-600 py-3 rounded-lg font-semibold cursor-not-allowed">
          Book Now
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-500">
            Coming soon
          </span>
        </span>
      )}
      <p className="text-center text-xs text-gray-500">
        Reservations are completed on partner sites.
      </p>
    </div>
  );
}

export default async function DetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const itinerary = getPreDesignedItineraryBySlug(slug);
  if (itinerary) {
    const enrichedStops = await Promise.all(itinerary.stops.map(async (stop) => ({
      ...stop,
      position: await getStopPosition(stop),
      description: await getStopDescription(stop),
      images: await getStopImages(stop),
    })));
    const otherItineraries = PREDESIGNED_ITINERARIES.filter((i) => i.slug !== itinerary.slug);
    const [initialRouteInfo, otherRouteEntries] = await Promise.all([
      fetchItineraryRouteTotals(enrichedStops),
      Promise.all(
        otherItineraries.map(async (other) => {
          const totals = await fetchItineraryRouteTotals(other.stops);
          return [other.slug, totals] as const;
        })
      ),
    ]);
    const initialOtherRouteTotals = Object.fromEntries(otherRouteEntries);
    return (
      <ItineraryDetailView
        itinerary={{ ...itinerary, stops: enrichedStops }}
        otherItineraries={otherItineraries}
        initialRouteInfo={initialRouteInfo}
        initialOtherRouteTotals={initialOtherRouteTotals}
      />
    );
  }
  const activity = await getActivityDetailsBySlugFromDb(slug);

  if (activity) {
    const activityCoordinates = activity.coordinates;
    const relatedActivities = await getRelatedActivities(slug);
    const mainPrice = activity.pricing?.[0]?.price;
    const hasBooking = Boolean(activity.bookingUrl);
    const activityHeroImage = activity.heroImage ?? activity.images[0] ?? "";
    
    // Build categories array: [region, ...categories] (filter out "all")
    const activityCategories = [activity.region, ...activity.categories.filter(c => c !== "all")];
    return (
      <main id="main-content" className="min-h-screen bg-white">
        <ActivityJsonLd
          name={activity.name}
          description={activity.tagline}
          image={getImageUrl(activityHeroImage, { width: 1200, quality: 75 })}
          url={`${SITE_URL}${DETAIL_BASE}/${activity.slug}`}
          price={mainPrice}
          category={activity.categories.filter(c => c !== "all")[0]}
          duration={activity.duration}
          latitude={activity.coordinates[0]}
          longitude={activity.coordinates[1]}
        />
        <BreadcrumbJsonLd
          items={[
            { name: "Home", url: SITE_URL },
            { name: "Activities", url: `${SITE_URL}/mauritius-activities` },
            { name: activity.name, url: `${SITE_URL}${DETAIL_BASE}/${activity.slug}` },
          ]}
        />
        <Navbar />
        {/* Hero Section */}
        <section className="relative h-[40svh] min-h-[220px] md:h-[38vh] md:min-h-[260px] flex items-end">
          <img
            src={getImageUrl(activityHeroImage, { width: 1200, quality: 75 })}
            srcSet={getImageSrcSet(activityHeroImage, {
              widths: [800, 1200, 1600, 2000],
              quality: 72,
            })}
            sizes="100vw"
            alt={activity.name}
            className="absolute inset-0 w-full h-full object-cover"
            fetchPriority="high"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="relative z-10 w-full pb-8 md:pb-12 px-4 pt-[calc(env(safe-area-inset-top)+4.5rem)]">
            <div className="container mx-auto max-w-6xl">
              <Link
                href="/mauritius-activities"
                className="inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full transition-colors mb-4"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to all Activities
              </Link>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3">{activity.name}</h1>
              <CategoryBadges categories={activityCategories} />
            </div>
          </div>
        </section>
        <section className="pt-6 md:pt-8 pb-12 md:pb-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
              <div className="lg:col-span-2 space-y-8 md:space-y-10">
                {/* Quote/Tagline */}
                <QuoteSection quote={activity.tagline} />
                
                {/* Description */}
                <div className="prose prose-lg max-w-none text-left md:text-justify">
                  {activity.description.map((paragraph, index) => (
                    <p key={index} className="text-gray-600 text-[15px] leading-7 mb-4">{paragraph}</p>
                  ))}
                </div>
                
                {/* Highlights */}
                {activity.highlights.length > 0 && (
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Highlights</h2>
                    <ul className="grid md:grid-cols-2 gap-3">
                      {activity.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckIcon />
                          <span className="text-gray-700">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {activity.images.length > 0 && (
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Photo Gallery</h2>
                    <PhotoGalleryWrapper images={activity.images} beachName={activity.name} />
                  </div>
                )}

                {/* What's Included */}
                {activity.included && activity.included.length > 0 && (
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">What&apos;s Included</h2>
                    <ul className="grid md:grid-cols-2 gap-3">
                      {activity.included.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckIcon />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* What to Bring */}
                {activity.whatToBring && activity.whatToBring.length > 0 && (
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">What to Bring</h2>
                    <div className="flex flex-wrap gap-2">
                      {activity.whatToBring.map((item, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Tips */}
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 md:p-8 border border-orange-100 shadow-sm">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <Image src={getImageUrl("/images/mauritius-explored.svg")} alt="Mauritius Explored" width={28} height={28} className="flex-shrink-0" />
                    Tips from Mauritius Explored
                  </h2>
                  <ul className="space-y-3">
                    {activity.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs mt-0.5">{index + 1}</span>
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="lg:col-span-1">
                <div className="lg:sticky lg:top-24 space-y-6">
                  {hasBooking && (
                    <div className="hidden lg:block">
                      <BookingCta bookingUrl={activity.bookingUrl} />
                    </div>
                  )}

                  {/* Mini Map */}
                  {activityCoordinates && (
                    <DetailMiniMapWrapper position={activityCoordinates} name={activity.name} />
                  )}

                  <AddToItineraryButton
                    type="activity"
                    slug={activity.slug}
                    name={activity.name}
                    lat={activity.coordinates[0]}
                    lng={activity.coordinates[1]}
                    image={activity.images[0] ?? ""}
                    bookingUrl={activity.bookingUrl}
                  />

                  <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-6">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">Information</h3>
                    <div className="space-y-1">
                      {activity.location && <InfoItem icon={<LocationIcon />} label="Location" value={activity.location} bordered />}
                      {activity.duration && <InfoItem icon={<DurationIcon />} label="Duration" value={activity.duration} bordered />}
                      {activity.bestTime && <InfoItem icon={<CalendarIcon />} label="Best Time" value={activity.bestTime} bordered />}
                      {activity.difficulty && <InfoItem icon={<DifficultyIcon />} label="Difficulty" value={activity.difficulty} bordered />}
                    </div>
                  </div>
                  <div className="text-center">
                    <Link href="/mauritius-activities#explore" className="inline-flex items-center justify-center min-h-[48px] gap-2 w-full bg-white border border-gray-300 text-gray-900 hover:bg-gray-50 font-semibold py-3 px-6 rounded-lg transition-colors">
                      Explore More Activities
                      <ArrowRightIcon className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {relatedActivities.length > 0 && (
          <section className="py-10 md:py-12 bg-gray-50">
            <div className="container mx-auto px-4 max-w-6xl">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">More Activities Like This</h2>
              <p className="text-gray-600 mb-8">Continue exploring activities in Mauritius</p>
              <div className="grid md:grid-cols-3 gap-5 md:gap-6">
                {relatedActivities.slice(0, 3).map((related) => (
                  <Link
                    key={related.slug}
                    href={`${DETAIL_BASE}/${related.slug}`}
                    className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative h-48 overflow-hidden img-shimmer">
                      <img
                        src={getImageUrl(related.images[0], { width: 400, quality: 75 })}
                        srcSet={getImageSrcSet(related.images[0], {
                          widths: [320, 400, 800],
                          quality: 66,
                        })}
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        alt={related.name}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 group-hover:text-orange-500 transition-colors">{related.name}</h3>
                      <p className="text-[13px] text-gray-600 leading-snug mt-1 line-clamp-2">{related.tagline}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
        <div
          className="lg:hidden"
          style={{ height: "calc(5.5rem + env(safe-area-inset-bottom, 0px))" }}
        />
        <Footer />
      </main>
    );
  }

  // If the slug belongs to a place, redirect to the new place URL
  const place = await getPlaceDetailsBySlug(slug);
  if (place) {
    permanentRedirect(`/best-places-to-visit-in-mauritius/${slug}`);
  }

  notFound();
}
