import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PhotoGalleryWrapper from "@/components/PhotoGalleryWrapper";
import InfoItem from "@/components/ui/InfoItem";
import QuoteSection from "@/components/ui/QuoteSection";
import CategoryBadges from "@/components/ui/CategoryBadges";
import { LocationIcon, SnorkelingIcon, AmenitiesIcon, TransportIcon, ArrowRightIcon } from "@/components/icons";
import { getBeachDetailsBySlug, getAllBeachSlugs, getBeachesByRegion } from "@/lib/content";
import { getHotelOfficialUrl } from "@/data/hotel-urls";
import { BeachJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { getImageSrcSet, getImageUrl } from "@/lib/image-url";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/constants";
import DetailMiniMapWrapper from "@/components/ui/DetailMiniMapWrapper";
import AddToItineraryButton from "@/components/AddToItineraryButton";

export async function generateStaticParams() {
  const slugs = await getAllBeachSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const beach = await getBeachDetailsBySlug(slug);
console.log("beach", beach);
  if (!beach) {
    return { title: "Beach Not Found" };
  }

  const beachHeroImage = beach.heroImage ?? beach.images[0];
  const beachImage = beachHeroImage
    ? getImageUrl(beachHeroImage, { width: 1200, quality: 75 })
    : DEFAULT_OG_IMAGE.url;
  return {
    title: `${beach.name} Beach - Mauritius | Best Beaches Guide 2026`,
    description: beach.tagline,
    alternates: {
      canonical: `/beaches-in-mauritius/${slug}`,
    },
    openGraph: {
      title: `${beach.name} Beach - Mauritius`,
      description: beach.tagline,
      images: [{ url: beachImage, width: 1200, height: 630, alt: `${beach.name} Beach` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${beach.name} Beach - Mauritius`,
      description: beach.tagline,
      images: [beachImage],
    },
  };
}

export default async function BeachPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const beach = await getBeachDetailsBySlug(slug);

  if (!beach) {
    notFound();
  }

  const regionBeaches = await getBeachesByRegion(beach.region);
  const relatedBeaches = regionBeaches
    .filter((b) => b.slug !== beach.slug)
    .slice(0, 3);

  const beachCoordinates = beach.coordinates;
  const beachHeroImage = beach.heroImage ?? beach.images[0] ?? "";

  // Build categories array: [region, ...categories]
  const beachCategories = [beach.region, ...beach.categories];

  return (
    <main id="main-content" className="min-h-screen bg-white">
      {/* Structured Data for SEO */}
      <BeachJsonLd
        name={`${beach.name} Beach`}
        description={beach.tagline}
        image={getImageUrl(beachHeroImage, { width: 1200, quality: 75 })}
        url={`${SITE_URL}/beaches-in-mauritius/${beach.slug}`}
        region={beach.region}
        latitude={beach.coordinates[0]}
        longitude={beach.coordinates[1]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Beaches", url: `${SITE_URL}/beaches-in-mauritius` },
          { name: beach.name, url: `${SITE_URL}/beaches-in-mauritius/${beach.slug}` },
        ]}
      />
      
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[40svh] min-h-[220px] md:h-[38vh] md:min-h-[260px] flex items-end">
        <img
          src={getImageUrl(beachHeroImage, { width: 1200, quality: 75 })}
          srcSet={getImageSrcSet(beachHeroImage, {
            widths: [800, 1200, 1600, 2000],
            quality: 72,
          })}
          sizes="100vw"
          alt={`${beach.name} Beach in Mauritius`}
          className="absolute inset-0 w-full h-full object-cover"
          fetchPriority="high"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        <div className="relative z-10 w-full pb-8 md:pb-12 px-4 pt-[calc(env(safe-area-inset-top)+4.5rem)]">
          <div className="container mx-auto max-w-6xl">
            <Link
              href="/beaches-in-mauritius"
              className="inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full transition-colors mb-4"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to all Beaches
            </Link>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3">
              {beach.name}
            </h1>
            <CategoryBadges categories={beachCategories} />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pt-6 md:pt-8 pb-12 md:pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8 md:space-y-10">
              {/* Quote/Tagline */}
              <QuoteSection quote={beach.tagline} />

              {/* Description */}
              <div className="prose prose-lg max-w-none text-left md:text-justify">
                {beach.description.map((paragraph, index) => (
                  <p key={index} className="text-gray-600 text-[15px] leading-7 mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Photo Gallery */}
              {beach.images.length > 0 && (
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Photo Gallery</h2>
                  <PhotoGalleryWrapper images={beach.images} beachName={beach.name} />
                </div>
              )}

              {/* Tips Section */}
              {beach.tips.length > 0 && (
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
                    {beach.tips.map((tip, index) => (
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

            {/* Right Column - Info Card */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-24 space-y-6">
                {/* Mini Map */}
                {beachCoordinates && (
                  <DetailMiniMapWrapper position={beachCoordinates} name={beach.name} />
                )}

                {/* Add to Itinerary */}
                <AddToItineraryButton
                  type="beach"
                  slug={beach.slug}
                  name={beach.name}
                  lat={beach.coordinates[0]}
                  lng={beach.coordinates[1]}
                  image={beach.images[0] ?? ""}
                />

                {/* Information Card */}
                <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-6">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">Information</h3>
                  <div className="space-y-1">
                    <InfoItem
                      label="Location"
                      value={beach.info.location}
                      icon={<LocationIcon />}
                      bordered
                    />
                    <InfoItem
                      label="Snorkeling"
                      value={beach.categories.includes("snorkeling") ? "Yes" : "No"}
                      icon={<SnorkelingIcon />}
                      highlight={beach.categories.includes("snorkeling")}
                      bordered
                    />
                    <InfoItem
                      label="Beach Amenities"
                      value={beach.categories.includes("amenities") ? "Available" : "Not Available"}
                      icon={<AmenitiesIcon />}
                      highlight={beach.categories.includes("amenities")}
                      bordered
                    />
                    <InfoItem
                      label="Public Transport"
                      value={beach.info.publicTransport ? "Available" : "Not Available"}
                      icon={<TransportIcon />}
                      highlight={beach.info.publicTransport}
                      bordered
                    />
                  </div>
                </div>

                {/* Hotels Nearby */}
                {beach.info.hotelsNearby.length > 0 && (
                  <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-6">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">Hotels Nearby</h3>
                    <ul className="space-y-2">
                      {beach.info.hotelsNearby.map((hotel, index) => {
                        const url = getHotelOfficialUrl(hotel);
                        return (
                          <li key={index} className="text-gray-600 text-sm flex items-start gap-2">
                            <ArrowRightIcon className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                            {url ? (
                              <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-orange-600 hover:text-orange-700 hover:underline"
                              >
                                {hotel}
                              </a>
                            ) : (
                              <span>{hotel}</span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}

                {/* CTA */}
                <Link
                  href="/beaches-in-mauritius#explore"
                  className="inline-flex items-center justify-center min-h-[48px] w-full bg-white border border-gray-300 text-gray-900 hover:bg-gray-50 text-center py-3 rounded-lg font-semibold transition-colors"
                >
                  Explore More Beaches
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Beaches */}
      {relatedBeaches.length > 0 && (
        <section className="py-10 md:py-12 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              More Beaches in {beach.region}
            </h2>
            <p className="text-gray-600 mb-8">Continue exploring the beautiful {beach.info.location} coast</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {relatedBeaches.map((relatedBeach) => (
                <Link
                  key={relatedBeach.slug}
                  href={`/beaches-in-mauritius/${relatedBeach.slug}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative aspect-[16/10] overflow-hidden img-shimmer">
                    <img
                      src={getImageUrl(relatedBeach.images[0], { width: 400, quality: 75 })}
                      srcSet={getImageSrcSet(relatedBeach.images[0], {
                        widths: [320, 400, 800],
                        quality: 66,
                      })}
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      alt={relatedBeach.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 group-hover:text-orange-500 transition-colors">
                      {relatedBeach.name}
                    </h3>
                    <p className="text-gray-600 text-[13px] leading-snug line-clamp-2 mt-1">
                      {relatedBeach.tagline}
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
