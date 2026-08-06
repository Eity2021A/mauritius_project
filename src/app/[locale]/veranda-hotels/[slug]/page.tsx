import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PhotoGalleryWrapper from "@/components/PhotoGalleryWrapper";
import QuoteSection from "@/components/ui/QuoteSection";
import CategoryBadges from "@/components/ui/CategoryBadges";
import InfoItem from "@/components/ui/InfoItem";
import DetailMiniMapWrapper from "@/components/ui/DetailMiniMapWrapper";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { ArrowRightIcon } from "@/components/icons";
import { getImageSrcSet, getImageUrl } from "@/lib/image-url";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/constants";
import {
  getAllVerandaHotelSlugsFromDb,
  getRelatedVerandaHotelsFromDb,
  getVerandaHotelBySlugFromDb,
} from "@/lib/content";
import { trimMetaDescription } from "@/lib/seo";
import { staticPageText } from "@/lib/static-page-localizer";
import { normalizeLocale } from "@/i18n/routing";

const DETAIL_BASE = "/veranda-hotels";
export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getAllVerandaHotelSlugsFromDb();
  return slugs.map((slug) => ({ slug }));
}

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
  const t = (text: string) => staticPageText(activeLocale, text);
  const hotel = await getVerandaHotelBySlugFromDb(slug, activeLocale);

  if (!hotel) {
    return { title: t("Not Found") };
  }

  const heroImage = hotel.heroImage
    ? getImageUrl(hotel.heroImage, { width: 1200, quality: 75 })
    : DEFAULT_OG_IMAGE.url;
  const metaDescription = trimMetaDescription(hotel.tagline);

  return {
    title: `${hotel.name} | ${t("Veranda Collection")}`,
    description: t(metaDescription),
    alternates: { canonical: `${DETAIL_BASE}/${hotel.slug}` },
    openGraph: {
      title: hotel.name,
      description: t(metaDescription),
      images: [{ url: heroImage, width: 1200, height: 630, alt: hotel.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: hotel.name,
      description: t(metaDescription),
      images: [heroImage],
    },
  };
}

function LocationIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m11.049 2.927 2.182 6.716h7.062l-5.713 4.15 2.182 6.716-5.713-4.15-5.713 4.15 2.182-6.716-5.713-4.15h7.062z" />
    </svg>
  );
}

function PalmIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20V9" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9a7 7 0 018 4" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9a7 7 0 00-8 4" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 20h16" />
    </svg>
  );
}

function BedIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 11h18v7H3zm2-5h5a2 2 0 012 2v3H3V8a2 2 0 012-2zm9 1h4a3 3 0 013 3v1h-7V7z" />
    </svg>
  );
}

function PriceIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

function HotelBookingCta({
  bookingUrl,
  t,
}: {
  bookingUrl?: string;
  t: (text: string) => string;
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
            {t("Check Availability")}
          </Link>
          <p className="text-xs leading-5 text-gray-500">
            {t("Some booking links may earn us a commission at no extra cost to you.")}
          </p>
        </>
      ) : (
        <Link
          href="/contact"
          className="inline-flex items-center justify-center min-h-[48px] w-full bg-orange-500 text-white text-center py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
        >
          {t("Enquire Now")}
        </Link>
      )}
      <Link
        href="/transfer"
        className="inline-flex items-center justify-center min-h-[48px] w-full rounded-lg border border-blue-200 bg-blue-50 text-blue-700 text-center py-3 font-semibold hover:bg-blue-100 transition-colors"
      >
        {t("Transfer")}
      </Link>
      <p className="text-center text-xs text-gray-500">
        {t("Reservations are completed on partner sites.")}
      </p>
    </div>
  );
}

export default async function VerandaHotelPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; slug: string }>;
  searchParams?: Promise<{ lang?: string }>;
}) {
  const { locale, slug } = await params;
  const query = await searchParams;
  const activeLocale = normalizeLocale(query?.lang ?? locale);
  const t = (text: string) => staticPageText(activeLocale, text);
  const hotel = await getVerandaHotelBySlugFromDb(slug, activeLocale);

  if (!hotel) {
    notFound();
  }

  const relatedHotels = await getRelatedVerandaHotelsFromDb(slug, 3, activeLocale);
  const hotelCategories = [hotel.region, hotel.style, ...hotel.tags].map(t);

  return (
    <main id="main-content" className="min-h-screen bg-white">
      <BreadcrumbJsonLd
        items={[
          { name: t("Home"), url: SITE_URL },
          { name: t("Veranda hotels"), url: `${SITE_URL}/veranda-hotels` },
          { name: hotel.name, url: `${SITE_URL}${DETAIL_BASE}/${hotel.slug}` },
        ]}
      />
      <Navbar />

      <section className="relative h-[40svh] min-h-[220px] md:h-[38vh] md:min-h-[260px] flex items-end">
        <img
          src={getImageUrl(hotel.heroImage, { width: 1200, quality: 75 })}
          srcSet={getImageSrcSet(hotel.heroImage, {
            widths: [800, 1200, 1600, 2000],
            quality: 72,
          })}
          sizes="100vw"
          alt={hotel.name}
          className="absolute inset-0 w-full h-full object-cover"
          fetchPriority="high"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="relative z-10 w-full pb-8 md:pb-12 px-4 pt-[calc(env(safe-area-inset-top)+4.5rem)]">
          <div className="container mx-auto max-w-6xl">
            <Link
              href="/veranda-hotels"
              className="inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full transition-colors mb-4"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {t("Back to Veranda Collection")}
            </Link>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3">
              {hotel.name}
            </h1>
            <CategoryBadges categories={hotelCategories} />
          </div>
        </div>
      </section>

      <section className="pt-5 md:pt-8 pb-12 md:pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-7 md:gap-10 lg:gap-12">
            <div className="lg:col-span-2 space-y-7 md:space-y-10">
              <QuoteSection quote={t(hotel.tagline)} />

              <div className="prose prose-lg max-w-none text-left md:text-justify">
                {hotel.description.map((paragraph, index) => (
                  <p key={index} className="text-gray-600 text-[15px] leading-7 mb-4">
                    {t(paragraph)}
                  </p>
                ))}
              </div>

              {hotel.highlights.length > 0 && (
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">{t("Highlights")}</h2>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {hotel.highlights.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckIcon />
                        <span className="text-gray-700">{t(item)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {hotel.gallery.length > 0 && (
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">{t("Photo Gallery")}</h2>
                  <PhotoGalleryWrapper images={hotel.gallery} beachName={hotel.name} />
                </div>
              )}

              {hotel.idealFor.length > 0 && (
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">{t("Ideal For")}</h2>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {hotel.idealFor.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckIcon />
                        <span className="text-gray-700">{t(item)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {hotel.rooms.length > 0 && (
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">{t("Rooms")}</h2>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {hotel.rooms.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckIcon />
                        <span className="text-gray-700">{t(item)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {hotel.dining.length > 0 && (
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">{t("Dining & Atmosphere")}</h2>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {hotel.dining.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckIcon />
                        <span className="text-gray-700">{t(item)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {hotel.experiences.length > 0 && (
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">{t("Experiences Nearby")}</h2>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {hotel.experiences.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckIcon />
                        <span className="text-gray-700">{t(item)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-5 sm:p-6 md:p-8 border border-orange-100 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <Image
                    src={getImageUrl("/images/mauritius-explored.svg")}
                    alt={t("Mauritius Explored")}
                    width={28}
                    height={28}
                    className="flex-shrink-0"
                  />
                  {t("Tips from Mauritius Explored")}
                </h2>
                <ul className="space-y-3">
                  {hotel.practicalTips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{t(tip)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-24 space-y-6">
                <div className="lg:hidden rounded-lg border border-orange-100 bg-white p-5 shadow-md">
                  <HotelBookingCta bookingUrl={hotel.bookingUrl} t={t} />
                </div>

                <div className="hidden lg:block">
                  <HotelBookingCta bookingUrl={hotel.bookingUrl} t={t} />
                </div>

                <DetailMiniMapWrapper position={hotel.coordinates} name={hotel.name} />

                <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-5 sm:p-6">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">{t("Information")}</h3>
                  <div className="space-y-1">
                    <InfoItem icon={<PriceIcon />} label={t("Price Guide")} value={hotel.priceFrom} bordered />
                    <InfoItem icon={<LocationIcon />} label={t("Location")} value={t(hotel.location)} bordered />
                    <InfoItem icon={<StarIcon />} label={t("Rating")} value={hotel.rating} bordered />
                    <InfoItem icon={<PalmIcon />} label={t("Style")} value={t(hotel.style)} bordered />
                    <InfoItem icon={<BedIcon />} label={t("Board Basis")} value={t(hotel.boardBasis)} />
                  </div>
                </div>

                <div className="text-center">
                  <Link
                    href="/veranda-hotels"
                    className="inline-flex items-center justify-center min-h-[48px] gap-2 w-full bg-white border border-gray-300 text-gray-900 hover:bg-gray-50 font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    {t("Explore More Hotels")}
                    <ArrowRightIcon className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{t("More Hotels Like This")}</h2>
          <p className="text-gray-600 mb-8">{t("Continue exploring the Veranda Collection in Mauritius")}</p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
            {relatedHotels.map((related) => (
              <Link
                key={related.slug}
                href={`${DETAIL_BASE}/${related.slug}`}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden img-shimmer">
                  <img
                    src={getImageUrl(related.heroImage, { width: 400, quality: 75 })}
                    srcSet={getImageSrcSet(related.heroImage, {
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
                  <h3 className="font-bold text-gray-900 group-hover:text-orange-500 transition-colors">
                    {related.name}
                  </h3>
                  <p className="text-[13px] text-gray-600 leading-snug mt-1 line-clamp-2">
                    {t(related.tagline)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div
        className="lg:hidden"
        style={{ height: "calc(5.5rem + env(safe-area-inset-bottom, 0px))" }}
      />
      <Footer />
    </main>
  );
}
