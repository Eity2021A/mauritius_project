import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Navbar from "@/components/Navbar";
import PlanTripButton from "@/components/PlanTripButton";
import Footer from "@/components/Footer";
import LazyInstagramSection from "@/components/LazyInstagramSection";
import HeroSlideshow from "@/components/HeroSlideshow";
import LazyPhotoMosaicSection from "@/components/LazyPhotoMosaicSection";
import AcrossMauritius from "@/components/AcrossMauritius";
import RotatingAdBanner from "@/components/RotatingAdBanner";
import { HOME_ITINERARIES, SERVICES, STATS } from "@/data/home";
import { getImageUrl } from "@/lib/image-url";
import HiddenGems from "@/components/HiddenGems";
import CarRentalAdBanner from "@/components/CarRentalAdBanner";
import { DEFAULT_OG_IMAGE } from "@/lib/constants";
import {
  HOME_PAGE_ABSOLUTE_TITLE,
  HOME_PAGE_DESCRIPTION,
} from "@/lib/seo";
import type { AppLocale } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: {
    absolute: HOME_PAGE_ABSOLUTE_TITLE,
  },
  description: HOME_PAGE_DESCRIPTION,
  openGraph: {
    title: HOME_PAGE_ABSOLUTE_TITLE,
    description: HOME_PAGE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_PAGE_ABSOLUTE_TITLE,
    description: HOME_PAGE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE.url],
  },
  alternates: { canonical: "/" },
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Buttons");
  const homeT = await getTranslations("Home");

  return (
    <main id="main-content" className="min-h-screen">
      <Navbar />

      {/* Hero Section - keep viewport feel while preventing cramped content on small/landscape screens */}
      <section className="relative h-[62svh] min-h-[540px]">
        <HeroSlideshow />
      </section>
      <RotatingAdBanner />
      {/* Best of Mauritius Island – photo mosaic */}
      <LazyPhotoMosaicSection locale={locale as AppLocale} />
      <CarRentalAdBanner />
      <AcrossMauritius />

      <section className="bg-white px-4 py-8 dark:bg-neutral-900">
        <div className="container mx-auto max-w-5xl">
          <p className="text-center text-base leading-7 text-gray-700 dark:text-gray-300 md:text-lg">
            {homeT("intro")}
          </p>
        </div>
      </section>

      {/* Itineraries & Road Trips Section */}
      <section className="py-4 md:py-10 bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-3 md:mb-6">
            <span className="text-orange-500 text-xs md:text-sm font-medium tracking-wider uppercase">
              {homeT("itineraries.kicker")}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mt-2">
              {homeT("itineraries.title")}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center max-w-4xl mx-auto mt-2 md:mt-3">
              {homeT("itineraries.subtitle")}
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-center max-w-4xl mx-auto mt-3">
              {homeT("itineraries.body")}
            </p>
          </div>

          {/* Itinerary Cards - Horizontal scroll on mobile, grid on larger screens */}
          <p className="md:hidden text-xs text-gray-500 text-right mb-2">
            {homeT("itineraries.swipe")}
          </p>
          <div className="flex md:grid md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 overflow-x-auto pb-4 md:pb-0 -mx-4 px-4 pr-6 md:pr-0 md:mx-0 md:px-0 snap-x snap-mandatory md:snap-none scrollbar-hide">
            {HOME_ITINERARIES.map((itinerary, index) => (
              <Link
                key={index}
                href={itinerary.href}
                className="group relative flex-shrink-0 w-40 h-72 sm:w-48 sm:h-80 md:w-auto md:h-96 lg:h-[28rem] rounded-lg overflow-hidden cursor-pointer snap-start img-shimmer"
              >
                <Image
                  src={getImageUrl(itinerary.image, {
                    width: 400,
                    quality: 75,
                  })}
                  fill
                  sizes="(max-width: 768px) 45vw, (max-width: 1200px) 25vw, 20vw"
                  alt={itinerary.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
                <div className="absolute top-3 left-3 right-3 md:top-4 md:left-4 md:right-4">
                  <h3 className="text-white text-base md:text-lg font-semibold drop-shadow-sm">
                    {itinerary.title}
                  </h3>
                </div>
                <div className="absolute bottom-3 left-3 right-3 md:bottom-4 md:left-4 md:right-4 flex justify-center">
                  <span className="inline-flex items-center justify-center w-full py-2 sm:py-2.5 bg-transparent border-2 border-white text-white text-sm font-medium rounded-full group-hover:bg-white group-hover:text-gray-900 transition-colors">
                    {homeT("itineraries.viewItinerary")}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* <LazyFeaturedDestinationsMarquee /> */}
      <HiddenGems />

      {/* Services Section */}
      <section className="pt-3 sm:pt-5 md:pt-6 pb-5 sm:pb-10 md:pb-12 bg-gray-50 dark:bg-neutral-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-4 md:mb-8">
            <span className="text-orange-500 text-xs sm:text-sm font-medium tracking-wider uppercase">
              {homeT("services.kicker")}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2">
              {homeT("services.title")}
            </h2>
            <p className="mx-auto mt-3 max-w-4xl text-center text-sm leading-6 text-gray-600 dark:text-gray-400 sm:text-base">
              {homeT("services.description")}
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {SERVICES.map((service, index) => (
              <div
                key={index}
                className="flex flex-col bg-white dark:bg-neutral-900 rounded-lg shadow-sm hover:shadow-lg transition-shadow overflow-hidden"
              >
                <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden img-shimmer">
                  <Image
                    src={getImageUrl(service.image, {
                      width: 400,
                      quality: 75,
                    })}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1280px) 25vw, 20vw"
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col flex-1 p-5 sm:p-6 lg:p-6 text-center">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {homeT(`services.cards.${service.key}.title`)}
                  </h3>
                  <p className="flex-1 text-sm sm:text-base text-gray-600 dark:text-gray-400 min-h-[3.5rem] mb-4">
                    {homeT(`services.cards.${service.key}.description`)}
                  </p>
                  <Link
                    href={service.href}
                    className="inline-flex items-center justify-center px-4 py-2.5 bg-orange-500 text-white text-sm font-medium rounded-full hover:bg-orange-600 transition-colors shrink-0"
                  >
                    {homeT(`services.cards.${service.key}.buttonLabel`)}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-8 sm:py-14 md:py-16">
        <Image
          src={getImageUrl(
            "/images/banners/traditional-pirogue-sailing-mauritius.jpg",
          )}
          alt="Mauritius beach"
          fill
          loading="lazy"
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
            {homeT("cta.title")}
          </h2>
          <p className="text-white/80 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-6 sm:mb-8 px-2">
            {homeT("cta.body")}
          </p>
          <PlanTripButton
            href="/roadtrip-mauritius#build-your-own"
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-orange-500 text-white text-sm sm:text-base font-medium rounded-full hover:bg-orange-600 transition-colors min-h-[48px] disabled:opacity-90 disabled:cursor-wait"
          >
            {t("planYourTrip")}
            <span className="text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded bg-white text-orange-500">
              {t("badgeNew")}
            </span>
          </PlanTripButton>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-5 sm:py-10 md:py-12 bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center">
            {STATS.map((stat, index) => (
              <div key={index} className="p-2 sm:p-0">
                <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-500 mb-1 sm:mb-2">
                  {stat.number}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm md:text-base">
                  {homeT(`stats.${stat.label}`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Feed Section - JS loads when section is near viewport */}
      <LazyInstagramSection />

      <Footer />
    </main>
  );
}
