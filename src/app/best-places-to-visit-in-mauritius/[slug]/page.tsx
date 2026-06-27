import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PhotoGalleryWrapper from "@/components/PhotoGalleryWrapper";
import QuoteSection from "@/components/ui/QuoteSection";
import CategoryBadges from "@/components/ui/CategoryBadges";
import { LocationIcon } from "@/components/icons";
import { getPlaceDetailsBySlug, getAllPlaceSlugs, getPlacesByCategory, getActivityDetailsBySlugFromDb } from "@/lib/content";
import { BreadcrumbJsonLd, PlaceJsonLd } from "@/components/seo/JsonLd";
import InfoItem from "@/components/ui/InfoItem";
import DetailMiniMapWrapper from "@/components/ui/DetailMiniMapWrapper";
import AddToItineraryButton from "@/components/AddToItineraryButton";
import { getImageSrcSet, getImageUrl } from "@/lib/image-url";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/constants";

const DETAIL_BASE = "/best-places-to-visit-in-mauritius";

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
function AdmissionIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
    </svg>
  );
}

export async function generateStaticParams() {
  const placeSlugs = await getAllPlaceSlugs();
  return placeSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const canonical = `${DETAIL_BASE}/${slug}`;
  const place = await getPlaceDetailsBySlug(slug);
  if (!place) return { title: "Not Found" };

  const placeHeroImage = place.heroImage ?? place.images[0];
  const placeImage = placeHeroImage
    ? getImageUrl(placeHeroImage, { width: 1200, quality: 75 })
    : DEFAULT_OG_IMAGE.url;
  return {
    title: `${place.name} - Mauritius | Best Places to Visit`,
    description: place.tagline,
    alternates: { canonical },
    openGraph: {
      title: `${place.name} - Mauritius`,
      description: place.tagline,
      images: [{ url: placeImage, width: 1200, height: 630, alt: place.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${place.name} - Mauritius`,
      description: place.tagline,
      images: [placeImage],
    },
  };
}

export default async function PlaceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const place = await getPlaceDetailsBySlug(slug);
  if (!place) notFound();

  const placeCoordinates = place.coordinates;
  const primaryCategory = place.categories[0];
  const placeHeroImage = place.heroImage ?? place.images[0] ?? "";
  const relatedByCategory = await getPlacesByCategory(primaryCategory);
  const relatedPlaces = relatedByCategory
    .filter(p => p.slug !== place.slug)
    .slice(0, 3);
  const linkedActivity = await getActivityDetailsBySlugFromDb(slug);
  const placeCategories = [place.region, ...place.categories];

  return (
    <main id="main-content" className="min-h-screen bg-white">
      <PlaceJsonLd
        name={place.name}
        description={place.tagline}
        image={getImageUrl(placeHeroImage, { width: 1200, quality: 75 })}
        url={`${SITE_URL}${DETAIL_BASE}/${place.slug}`}
        category={place.categories[0]}
        latitude={place.coordinates[0]}
        longitude={place.coordinates[1]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Places to Visit", url: `${SITE_URL}/best-places-to-visit-in-mauritius` },
          { name: place.name, url: `${SITE_URL}${DETAIL_BASE}/${place.slug}` },
        ]}
      />

      <Navbar />

      <section className="relative h-[40svh] min-h-[220px] md:h-[38vh] md:min-h-[260px] flex items-end">
        {placeHeroImage ? (
          <img
            src={getImageUrl(placeHeroImage, { width: 1200, quality: 75 })}
            srcSet={getImageSrcSet(placeHeroImage, {
              widths: [800, 1200, 1600, 2000],
              quality: 72,
            })}
            sizes="100vw"
            alt={place.name}
            className="absolute inset-0 w-full h-full object-cover"
            fetchPriority="high"
            loading="eager"
            decoding="async"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        <div className="relative z-10 w-full pb-8 md:pb-12 px-4 pt-[calc(env(safe-area-inset-top)+4.5rem)]">
          <div className="container mx-auto max-w-6xl">
            <Link
              href="/best-places-to-visit-in-mauritius"
              className="inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full transition-colors mb-4"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to all Places
            </Link>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3">
              {place.name}
            </h1>
            <CategoryBadges categories={placeCategories} />
          </div>
        </div>
      </section>

      <section className="pt-6 md:pt-8 pb-12 md:pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
            <div className="lg:col-span-2 space-y-8 md:space-y-10">
              <QuoteSection quote={place.tagline} />

              <div className="prose prose-lg max-w-none text-left md:text-justify">
                {place.description.map((paragraph, index) => (
                  <p key={index} className="text-gray-600 text-[15px] leading-7 mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>

              {place.images.length > 0 && (
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Photo Gallery</h2>
                  <PhotoGalleryWrapper images={place.images} beachName={place.name} />
                </div>
              )}

              {place.tips.length > 0 && (
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 md:p-8 border border-orange-100 shadow-sm">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <Image
                      src={getImageUrl("/images/mauritius-explored.svg")}
                      alt="Mauritius Explored"
                      width={28}
                      height={28}
                      className="flex-shrink-0"
                    />
                    Tips from Mauritius Explored
                  </h2>
                  <ul className="space-y-3">
                    {place.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-700">
                        <span className="flex-shrink-0 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs mt-0.5">
                          {index + 1}
                        </span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-24 space-y-6">
                {linkedActivity?.pricing && linkedActivity.pricing.length > 0 && (
                  <div className="space-y-2">
                    {linkedActivity.bookingUrl ? (
                      <Link
                        href={linkedActivity.bookingUrl}
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
                )}

                {placeCoordinates && (
                  <DetailMiniMapWrapper position={placeCoordinates} name={place.name} />
                )}

                <AddToItineraryButton
                  type="place"
                  slug={place.slug}
                  name={place.name}
                  lat={place.coordinates[0]}
                  lng={place.coordinates[1]}
                  image={place.images[0] ?? ""}
                  bookingUrl={linkedActivity?.bookingUrl ?? undefined}
                />

                <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-6">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">Information</h3>
                  <div className="space-y-1">
                    <InfoItem icon={<LocationIcon />} label="Location" value={place.info.location} bordered />
                    {place.info.openHours && (
                      <InfoItem icon={<DurationIcon />} label="Opening Hours" value={place.info.openHours} bordered />
                    )}
                    {place.info.admission && (
                      <InfoItem icon={<AdmissionIcon />} label="Admission" value={place.info.admission} bordered />
                    )}
                    {place.info.bestTime && (
                      <InfoItem icon={<CalendarIcon />} label="Best Time to Visit" value={place.info.bestTime} bordered />
                    )}
                  </div>
                </div>

                <Link
                  href="/best-places-to-visit-in-mauritius"
                  className="inline-flex items-center justify-center min-h-[48px] w-full bg-white border border-gray-300 text-gray-900 hover:bg-gray-50 text-center py-3 rounded-lg font-semibold transition-colors"
                >
                  Explore More Places
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {relatedPlaces.length > 0 && (
        <section className="py-10 md:py-12 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              More Places to Discover
            </h2>
            <p className="text-gray-600 mb-8">Continue exploring the best of Mauritius</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {relatedPlaces.map((relatedPlace) => (
                <Link
                  key={relatedPlace.slug}
                  href={`/best-places-to-visit-in-mauritius/${relatedPlace.slug}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative aspect-[16/10] overflow-hidden img-shimmer">
                    {relatedPlace.images.length > 0 ? (
                      <img
                        src={getImageUrl(relatedPlace.images[0], { width: 400, quality: 75 })}
                        srcSet={getImageSrcSet(relatedPlace.images[0], {
                          widths: [320, 400, 800],
                          quality: 66,
                        })}
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        alt={relatedPlace.name}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <span className="text-gray-400">No image</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 group-hover:text-orange-500 transition-colors">
                      {relatedPlace.name}
                    </h3>
                    <p className="text-gray-600 text-[13px] leading-snug line-clamp-2 mt-1">
                      {relatedPlace.tagline}
                    </p>
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
