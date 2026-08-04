import Image from "next/image";
import Link from "next/link";
import { HOME_ITINERARIES } from "@/data/home";
import { getTransportTranslations } from "@/data/transport-translations";
import { normalizeLocale } from "@/i18n/routing";
import { getImageUrl } from "@/lib/image-url";

function localizedHref(locale: string, href: string) {
  const activeLocale = normalizeLocale(locale);
  if (activeLocale === "en") return href;
  return `/${activeLocale}${href}`;
}

export default function PopularRoadTrips({ locale }: { locale: string }) {
  const activeLocale = normalizeLocale(locale);
  const t = getTransportTranslations(activeLocale);

  return (
    <section className="bg-white px-4 py-10 dark:bg-neutral-900 md:py-14">
      <div className="container mx-auto">
        <div className="mb-4 text-center md:mb-6">
          <span className="text-xs font-medium uppercase tracking-wider text-orange-500 md:text-sm">
            {t.taxi.privateKicker}
          </span>
          <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white md:text-5xl">
            {t.taxi.roadTitle}
          </h2>
        </div>
        <p className="mb-2 text-right text-xs text-gray-500 md:hidden">
          {t.common.swipe}
        </p>
        <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-4 pr-6 scrollbar-hide md:mx-0 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0 md:pb-0 md:pr-0 md:snap-none lg:grid-cols-5">
          {HOME_ITINERARIES.map((itinerary, index) => (
            <Link
              key={itinerary.href}
              href={localizedHref(activeLocale, itinerary.href)}
              className="group relative h-72 w-40 flex-shrink-0 cursor-pointer snap-start overflow-hidden rounded-lg img-shimmer sm:h-80 sm:w-48 md:h-96 md:w-auto lg:h-[28rem]"
            >
              <Image
                src={getImageUrl(itinerary.image, {
                  width: 400,
                  quality: 75,
                })}
                fill
                sizes="(max-width: 768px) 45vw, (max-width: 1200px) 25vw, 20vw"
                alt={t.common.itineraryTitles[index] ?? itinerary.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
              <div className="absolute left-3 right-3 top-3 md:left-4 md:right-4 md:top-4">
                <h3 className="text-base font-semibold text-white drop-shadow-sm md:text-lg">
                  {t.common.itineraryTitles[index] ?? itinerary.title}
                </h3>
              </div>
              <div className="absolute bottom-3 left-3 right-3 flex justify-center md:bottom-4 md:left-4 md:right-4">
                <span className="inline-flex w-full items-center justify-center rounded-full border-2 border-white bg-transparent py-2 text-sm font-medium text-white transition-colors group-hover:bg-white group-hover:text-gray-900 sm:py-2.5">
                  {t.common.viewItinerary}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
