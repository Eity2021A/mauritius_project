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
import { getPlaceDetailsBySlug, getActivityDetailsBySlugFromDb, getAllActivitySlugs, getRelatedActivities } from "@/lib/content";
import { BreadcrumbJsonLd, ActivityJsonLd } from "@/components/seo/JsonLd";
import InfoItem from "@/components/ui/InfoItem";
import DetailMiniMapWrapper from "@/components/ui/DetailMiniMapWrapper";
import AddToItineraryButton from "@/components/AddToItineraryButton";
import ButtonLabel from "@/components/ButtonLabel";
import { getImageSrcSet, getImageUrl } from "@/lib/image-url";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/constants";
import { getFeaturedItineraryBySlug, getFeaturedItinerarySlugs } from "@/lib/featured-itineraries";
import { trimMetaDescription } from "@/lib/seo";
import { getDetailPageTranslations, formatLabel } from "@/data/detail-page-translations";
import { normalizeLocale, routing, type AppLocale } from "@/i18n/routing";

const DETAIL_BASE = "/top-activities-mauritius";

function localizedHref(locale: string, href: string) {
  const activeLocale = routing.locales.includes(locale as AppLocale)
    ? (locale as AppLocale)
    : routing.defaultLocale;

  if (activeLocale === routing.defaultLocale) return href;
  return `/${activeLocale}${href}`;
}

function localizeDifficulty(value: string, locale: string) {
  const labels: Record<string, Record<string, string>> = {
    en: {
      Easy: "Easy",
      Moderate: "Moderate",
      Challenging: "Challenging",
      "Easy to Moderate": "Easy to Moderate",
      "Easy to Challenging": "Easy to Challenging",
      "Moderate to Challenging": "Moderate to Challenging",
    },
    fr: {
      Easy: "Facile",
      Moderate: "Modéré",
      Challenging: "Difficile",
      "Easy to Moderate": "Facile à modéré",
      "Easy to Challenging": "Facile à difficile",
      "Moderate to Challenging": "Modéré à difficile",
    },
    de: {
      Easy: "Leicht",
      Moderate: "Mittel",
      Challenging: "Anspruchsvoll",
      "Easy to Moderate": "Leicht bis mittel",
      "Easy to Challenging": "Leicht bis anspruchsvoll",
      "Moderate to Challenging": "Mittel bis anspruchsvoll",
    },
    it: {
      Easy: "Facile",
      Moderate: "Intermedio",
      Challenging: "Impegnativo",
      "Easy to Moderate": "Facile a intermedio",
      "Easy to Challenging": "Facile a impegnativo",
      "Moderate to Challenging": "Intermedio a impegnativo",
    },
    es: {
      Easy: "Fácil",
      Moderate: "Moderado",
      Challenging: "Exigente",
      "Easy to Moderate": "Fácil a moderado",
      "Easy to Challenging": "Fácil a exigente",
      "Moderate to Challenging": "Moderado a exigente",
    },
    ru: {
      Easy: "Легко",
      Moderate: "Средне",
      Challenging: "Сложно",
      "Easy to Moderate": "Легко-средне",
      "Easy to Challenging": "От легкого до сложного",
      "Moderate to Challenging": "Средне-сложно",
    },
  };

  return labels[locale]?.[value] ?? value;
}

export async function generateStaticParams() {
  const activitySlugs = await getAllActivitySlugs();
  const itinerarySlugs = await getFeaturedItinerarySlugs();
  const allSlugs = [...new Set([...activitySlugs, ...itinerarySlugs])];
  return allSlugs.map((slug) => ({ slug }));
}

// Generate metadata for SEO (itinerary, place, or activity)
export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; slug: string }>;
  searchParams?: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const query = await searchParams;
  const activeLocale = normalizeLocale(query?.lang ?? locale);
  const labels = getDetailPageTranslations(activeLocale);
  const canonical = `/top-activities-mauritius/${slug}`;
  const itinerary = await getFeaturedItineraryBySlug(slug);
  if (itinerary) {
    const itineraryDescription = trimMetaDescription(
      itinerary.introParagraph?.[0] ??
      itinerary.subtitle ??
      `Explore ${itinerary.title} - things to do in Mauritius`,
    );
    const itineraryImage = itinerary.image
      ? getImageUrl(itinerary.image, { width: 1200, quality: 75 })
      : DEFAULT_OG_IMAGE.url;
    return {
      title: `${itinerary.title} | Itineraries Mauritius`,
      description: itineraryDescription,
      alternates: { canonical: `/itineraries/${slug}` },
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
  const activity = await getActivityDetailsBySlugFromDb(slug, activeLocale);
  if (activity) {
    const activityHeroImage = activity.heroImage ?? activity.images[0];
    const activityImage = activityHeroImage
      ? getImageUrl(activityHeroImage, { width: 1200, quality: 75 })
      : DEFAULT_OG_IMAGE.url;
    const metaDescription = trimMetaDescription(activity.tagline);
    return {
      title: `${activity.name} | ${labels.activity.activitiesInMauritius}`,
      description: metaDescription,
      alternates: { canonical },
      openGraph: {
        title: activity.name,
        description: metaDescription,
        images: [{ url: activityImage, width: 1200, height: 630, alt: activity.name }],
      },
      twitter: {
        card: "summary_large_image",
        title: activity.name,
        description: metaDescription,
        images: [activityImage],
      },
    };
  }
  return { title: labels.activity.notFound };
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
function PriceIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 9.5c0-1.381-1.343-2.5-3-2.5s-3 1.119-3 2.5 1.343 2.5 3 2.5 3 1.119 3 2.5-1.343 2.5-3 2.5-3-1.119-3-2.5" />
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
function XIcon() {
  return (
    <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function BookingCta({
  bookingUrl,
  whatsappUrl,
  labels,
  locale,
}: {
  bookingUrl?: string;
  whatsappUrl: string;
  labels: ReturnType<typeof getDetailPageTranslations>;
  locale: string;
}) {
  return (
    <div className="space-y-2">
      {bookingUrl ? (
        <>
          <Link
            href={bookingUrl}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="inline-flex items-center justify-center min-h-[48px] w-full bg-orange-500 text-white text-center py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
          >
            <ButtonLabel name="bookNow" />
          </Link>
          <p className="text-xs leading-5 text-gray-500">
            {labels.activity.commissionNote}
          </p>
        </>
      ) : (
        <span className="inline-flex items-center justify-center min-h-[48px] gap-2 w-full bg-gray-300 text-gray-600 py-3 rounded-lg font-semibold cursor-not-allowed">
          <ButtonLabel name="bookNow" />
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-500">
            <ButtonLabel name="comingSoon" />
          </span>
        </span>
      )}
      <Link
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center min-h-[48px] w-full rounded-lg border border-green-200 bg-green-50 text-green-700 text-center py-3 font-semibold hover:bg-green-100 transition-colors"
      >
        WhatsApp
      </Link>
      <Link
        href={localizedHref(locale, "/transfer")}
        className="inline-flex items-center justify-center min-h-[48px] w-full rounded-lg border border-blue-200 bg-blue-50 text-blue-700 text-center py-3 font-semibold hover:bg-blue-100 transition-colors"
      >
        {labels.activity.transfer}
      </Link>
      <p className="text-center text-xs text-gray-500">
        {labels.activity.reservationsPartner}
      </p>
    </div>
  );
}

export default async function DetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; slug: string }>;
  searchParams?: Promise<{ lang?: string }>;
}) {
  const { locale, slug } = await params;
  const query = await searchParams;
  const activeLocale = normalizeLocale(query?.lang ?? locale);
  const labels = getDetailPageTranslations(activeLocale);
  const itinerary = await getFeaturedItineraryBySlug(slug);
  if (itinerary) {
    permanentRedirect(localizedHref(activeLocale, `/itineraries/${slug}`));
  }
  const activity = await getActivityDetailsBySlugFromDb(slug, activeLocale);

  if (activity) {
    const activityCoordinates = activity.coordinates;
    const relatedActivities = await getRelatedActivities(slug, activeLocale);
    const mainPrice = activity.pricing?.[0]?.price;
    const hasBooking = Boolean(activity.bookingUrl);
    const activityHeroImage = activity.heroImage ?? activity.images[0] ?? "";
    const whatsappMessage = encodeURIComponent(
      formatLabel(labels.activity.whatsappMessage, {
        name: activity.name,
        url: `${SITE_URL}${DETAIL_BASE}/${activity.slug}`,
      })
    );
    const whatsappUrl = `https://wa.me/23057364118?text=${whatsappMessage}`;
    
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
            { name: labels.common.home, url: SITE_URL },
            { name: labels.activity.activitiesInMauritius, url: `${SITE_URL}/mauritius-activities` },
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
                href={localizedHref(activeLocale, "/mauritius-activities")}
                className="inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full transition-colors mb-4"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <ButtonLabel name="backToActivities" />
              </Link>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3">{activity.name}</h1>
              <CategoryBadges categories={activityCategories} locale={activeLocale} />
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
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">{labels.activity.highlights}</h2>
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
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">{labels.common.photoGallery}</h2>
                    <PhotoGalleryWrapper images={activity.images} beachName={activity.name} />
                  </div>
                )}

                {/* What's Included */}
                {activity.included && activity.included.length > 0 && (
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">{labels.activity.included}</h2>
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

                {/* Not Included */}
                {activity.notIncluded && activity.notIncluded.length > 0 && (
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">{labels.activity.notIncluded}</h2>
                    <ul className="grid md:grid-cols-2 gap-3">
                      {activity.notIncluded.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <XIcon />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* What to Bring */}
                {activity.whatToBring && activity.whatToBring.length > 0 && (
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">{labels.activity.whatToBring}</h2>
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
                    {labels.common.tipsFromMauritiusExplored}
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
                      <BookingCta bookingUrl={activity.bookingUrl} whatsappUrl={whatsappUrl} labels={labels} locale={activeLocale} />
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
                    whatsappUrl={whatsappUrl}
                  />

                  <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-6">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">{labels.common.information}</h3>
                    <div className="space-y-1">
                      {activity.pricing && activity.pricing.length > 0 && (
                        <div className="py-4 border-b border-gray-100">
                          <div className="flex items-start gap-3">
                            <div className="text-gray-400 mt-0.5">
                              <PriceIcon />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-xs font-medium uppercase tracking-wide text-gray-500 mb-2">
                                {labels.activity.pricing}
                              </div>
                              <div className="space-y-2">
                                {activity.pricing.map((option, index) => (
                                  <div key={`${option.name}-${index}`} className="text-sm text-gray-700">
                                    <div className="flex items-baseline justify-between gap-3">
                                      <span className="font-medium text-gray-900">{option.name}</span>
                                      <span className="font-semibold text-orange-600">EUR {option.price}</span>
                                    </div>
                                    {option.description && (
                                      <p className="mt-1 text-xs leading-5 text-gray-500">{option.description}</p>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {activity.location && <InfoItem icon={<LocationIcon />} label={labels.common.location} value={activity.location} bordered />}
                      {activity.duration && <InfoItem icon={<DurationIcon />} label={labels.activity.duration} value={activity.duration} bordered />}
                      {activity.bestTime && <InfoItem icon={<CalendarIcon />} label={labels.activity.bestTime} value={activity.bestTime} bordered />}
                      {activity.difficulty && <InfoItem icon={<DifficultyIcon />} label={labels.activity.difficulty} value={localizeDifficulty(activity.difficulty, activeLocale)} bordered />}
                    </div>
                  </div>
                  <div className="text-center">
                    <Link href={localizedHref(activeLocale, "/mauritius-activities#explore")} className="inline-flex items-center justify-center min-h-[48px] gap-2 w-full bg-white border border-gray-300 text-gray-900 hover:bg-gray-50 font-semibold py-3 px-6 rounded-lg transition-colors">
                      {labels.activity.exploreMoreActivities}
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
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{labels.activity.moreActivitiesLikeThis}</h2>
              <p className="text-gray-600 mb-8">{labels.activity.continueActivities}</p>
              <div className="grid md:grid-cols-3 gap-5 md:gap-6">
                {relatedActivities.slice(0, 3).map((related) => (
                  <Link
                    key={related.slug}
                    href={localizedHref(activeLocale, `${DETAIL_BASE}/${related.slug}`)}
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
  const place = await getPlaceDetailsBySlug(slug, activeLocale);
  if (place) {
    permanentRedirect(localizedHref(activeLocale, `/best-places-to-visit-in-mauritius/${slug}`));
  }

  notFound();
}
