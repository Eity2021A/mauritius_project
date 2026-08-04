import Image from "next/image";

const ad = {
  desktopSrc: "/images/quick-trips/Car-Rental-Mauritius.webp",
  href: "/car-rental-mauritius",
  alt: "Rent Rental Mauritius",
};

export default function CarRentalAdBannerInfo() {
  return (
    <section
      className=" bg-white py-3 md:py-5 dark:border-neutral-800 dark:bg-neutral-900"
      aria-label="Sponsored highlights"
    >
      <div className="container mx-auto max-w-7xl ">
        <div className="relative overflow-hidden rounded-xl bg-[#052028] shadow-sm ring-1 ring-gray-200 dark:ring-neutral-700">
          <a
            href={ad.href}
            className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
          >
            <span className="relative block aspect-[1200/500] w-full">
              <Image
                src={ad.desktopSrc}
                alt={ad.alt}
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="rounded-xl object-cover"
                loading="lazy"
              />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
