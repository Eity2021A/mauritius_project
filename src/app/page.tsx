import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import PlanTripButton from "@/components/PlanTripButton";
import Footer from "@/components/Footer";
import LazyInstagramSection from "@/components/LazyInstagramSection";
import HeroSlideshow from "@/components/HeroSlideshow";
import LazyPhotoMosaicSection from "@/components/LazyPhotoMosaicSection";
import AcrossMauritius from "@/components/AcrossMauritius";
import LazyFeaturedDestinationsMarquee from "@/components/LazyFeaturedDestinationsMarquee";
import RotatingAdBanner from "@/components/RotatingAdBanner";
import { HOME_ITINERARIES, SERVICES, STATS } from "@/data/home";
import { getImageSrcSet, getImageUrl } from "@/lib/image-url";
import HiddenGems from "@/components/HiddenGems";

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen">
      <Navbar />

      {/* Hero Section - keep viewport feel while preventing cramped content on small/landscape screens */}
      <section className="relative h-[62svh] min-h-[540px]">
        <HeroSlideshow />
      </section>

      <RotatingAdBanner />

      {/* Best of Mauritius Island – photo mosaic */}
      <LazyPhotoMosaicSection />

    <AcrossMauritius />

      {/* Itineraries & Road Trips Section */}
      <section className="py-4 md:py-10 bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-3 md:mb-6">
            <span className="text-orange-500 text-xs md:text-sm font-medium tracking-wider uppercase">
              Explore Itineraries
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mt-2">
              Itineraries & Road Trips
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center max-w-4xl mx-auto mt-2 md:mt-3">
              A guide to explore Mauritius | What are the best places to visit | Be inspired to explore
            </p>
          </div>
          
          {/* Itinerary Cards - Horizontal scroll on mobile, grid on larger screens */}
          <p className="md:hidden text-xs text-gray-500 text-right mb-2">Swipe to explore →</p>
          <div className="flex md:grid md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 overflow-x-auto pb-4 md:pb-0 -mx-4 px-4 pr-6 md:pr-0 md:mx-0 md:px-0 snap-x snap-mandatory md:snap-none scrollbar-hide">
            {HOME_ITINERARIES.map((itinerary, index) => (
              <Link
                key={index}
                href={itinerary.href}
                className="group relative flex-shrink-0 w-40 h-72 sm:w-48 sm:h-80 md:w-auto md:h-96 lg:h-[28rem] rounded-lg overflow-hidden cursor-pointer snap-start img-shimmer"
              >
                <img
                  src={getImageUrl(itinerary.image, { width: 400, quality: 75 })}
                  srcSet={getImageSrcSet(itinerary.image, { widths: [320, 480, 800, 1200], quality: 68 })}
                  sizes="(max-width: 768px) 45vw, (max-width: 1200px) 25vw, 20vw"
                  alt={itinerary.title}
                  loading="lazy"
                  decoding="async"
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
                    View itinerary
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
              Experience Mauritius
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2">
              What You Can Do
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {SERVICES.map((service, index) => (
              <div
                key={index}
                className="flex flex-col bg-white dark:bg-neutral-900 rounded-lg shadow-sm hover:shadow-lg transition-shadow overflow-hidden"
              >
                <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden img-shimmer">
                  <img
                    src={getImageUrl(service.image, { width: 400, quality: 75 })}
                    srcSet={getImageSrcSet(service.image, { widths: [320, 480, 800], quality: 66 })}
                    sizes="(max-width: 768px) 50vw, (max-width: 1280px) 25vw, 20vw"
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="flex flex-col flex-1 p-5 sm:p-6 lg:p-6 text-center">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="flex-1 text-sm sm:text-base text-gray-600 dark:text-gray-400 min-h-[3.5rem] mb-4">
                    {service.description}
                  </p>
                  <Link
                    href={service.href}
                    className="inline-flex items-center justify-center px-4 py-2.5 bg-orange-500 text-white text-sm font-medium rounded-full hover:bg-orange-600 transition-colors shrink-0"
                  >
                    {service.buttonLabel}
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
          src={getImageUrl("/images/banners/traditional-pirogue-sailing-mauritius.jpg")}
          alt="Mauritius beach"
          fill
          loading="lazy"
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
            Your Mauritius Adventure Awaits
          </h2>
          <p className="text-white/80 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-6 sm:mb-8 px-2">
            From pristine beaches to lush mountains, discover everything this island paradise has to offer. Let us help you plan the perfect getaway.
          </p>
          <PlanTripButton
            href="/itineraries-mauritius#build-your-own"
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-orange-500 text-white text-sm sm:text-base font-medium rounded-full hover:bg-orange-600 transition-colors min-h-[48px] disabled:opacity-90 disabled:cursor-wait"
          >
            Plan Your Trip
            <span className="text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded bg-white text-orange-500">New</span>
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
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm md:text-base">{stat.label}</p>
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
