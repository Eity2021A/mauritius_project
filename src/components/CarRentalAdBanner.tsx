const ad = {
  desktopSrc: "/images/ads//Rent-Car-in-Mauritius-Best-Prices-Discount.webp",
  mobileSrc: "/images/ads/mobile-ad-1.png",
  href: "/",
  alt: "Rent a car in Mauritius",
};

export default function CarRentalAdBanner() {
  return (
    <section
      className="border-b border-gray-100 bg-white py-3 md:py-5 dark:border-neutral-800 dark:bg-neutral-900"
      aria-label="Sponsored highlights"
    >
      <div className="container mx-auto max-w-7xl px-4">
        <div className="relative overflow-hidden rounded-xl bg-[#052028] shadow-sm ring-1 ring-gray-200 dark:ring-neutral-700">
          <a
            href={ad.href}
            className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
          >
            <picture>
              <source media="(max-width: 767px)" srcSet={ad.mobileSrc} />
              <img
                src={ad.desktopSrc}
                alt={ad.alt}
                className="block h-auto w-full rounded-xl align-middle"
                loading="lazy"
                decoding="async"
              />
            </picture>
          </a>
        </div>
      </div>
    </section>
  );
}
