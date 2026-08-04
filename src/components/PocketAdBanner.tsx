import Image from "next/image";

const pocket = {
  desktopSrc: "/images/quick-trips/Pocket-Guide-For-Mauritius.webp",
  href: "/pocket-guide",
  alt: "Rent Rental Mauritius",
};

export default function PocketAdBanner() {
  return (
  <section
        className="bg-white py-3 md:py-5 dark:border-neutral-800 dark:bg-neutral-900"
        aria-label="Sponsored highlights"
      >
        <div className="container mx-auto max-w-7xl ">
          <div className="relative overflow-hidden rounded-xl bg-[#052028] shadow-sm ring-1 ring-gray-200 dark:ring-neutral-700">
            <a
              href={pocket.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
            >
              <span className="relative block aspect-[1200/450] w-full">
                <Image
                  src={pocket.desktopSrc}
                  alt={pocket.alt}
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
