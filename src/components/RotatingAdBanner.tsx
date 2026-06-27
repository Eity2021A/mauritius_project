"use client";

import { useEffect, useState } from "react";

const ROTATION_INTERVAL_MS = 5000;

const ads = [
  {
    desktopSrc: "/images/ads/desktop-ad-1.png",
    mobileSrc: "/images/ads/mobile-ad-1.png",
    href: "https://www.trekkingmauritius.com/tour/kayak-with-dolphins-mauritius/?aff=17",
    alt: "Kayak with Dolphins in Mauritius",
  },
  {
    desktopSrc: "/images/ads/desktop-ad-2.png",
    mobileSrc: "/images/ads/mobile-ad-2.png",
    href: "https://www.trekkingmauritius.com/tour/hiking-morne-brabant/?aff=17",
    alt: "Hike Le Morne Brabant",
  },
  {
    desktopSrc: "/images/ads/desktop-ad-3.png",
    mobileSrc: "/images/ads/mobile-ad-3.png",
    href: "https://www.trekkingmauritius.com/tour/le-morne-brabant-sunrise-hike/?aff=17",
    alt: "Sunrise Hike Le Morne",
  },
  {
    desktopSrc: "/images/ads/desktop-ad-4.png",
    mobileSrc: "/images/ads/mobile-ad-4.png",
    href: "https://www.trekkingmauritius.com/tour/ebiking-tour-mauritius/?aff=17",
    alt: "e-Bike Wild South",
  },
  {
    desktopSrc: "/images/ads/desktop-ad-5.png",
    mobileSrc: "/images/ads/mobile-ad-5.png",
    href: "https://www.trekkingmauritius.com/tour/canyoning-tamarind-falls/?aff=17",
    alt: "Canyoning Tamarind Falls",
  },
  {
    desktopSrc: "/images/ads/desktop-ad-6.png",
    mobileSrc: "/images/ads/mobile-ad-6.png",
    href: "https://www.trekkingmauritius.com/tour/kayak-tamarin-river/?aff=17",
    alt: "Kayak on Tamarin River",
  },
];

export default function RotatingAdBanner() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const slides = [...ads, ads[0]];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => currentIndex + 1);
    }, ROTATION_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (transitionEnabled) return;

    const frame = window.requestAnimationFrame(() => setTransitionEnabled(true));
    return () => window.cancelAnimationFrame(frame);
  }, [transitionEnabled]);

  const handleTransitionEnd = () => {
    if (activeIndex !== ads.length) return;

    setTransitionEnabled(false);
    setActiveIndex(0);
  };

  return (
    <section
      className="border-b border-gray-100 bg-white py-3 md:py-5 dark:border-neutral-800 dark:bg-neutral-900"
      aria-label="Sponsored highlights"
    >
      <div className="container mx-auto max-w-7xl px-4">
        <div className="relative overflow-hidden rounded-xl bg-[#052028] shadow-sm ring-1 ring-gray-200 dark:ring-neutral-700">
          <div
            className={`flex ${transitionEnabled ? "transition-transform duration-700 ease-in-out" : ""}`}
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            onTransitionEnd={handleTransitionEnd}
          >
            {slides.map((ad, index) => (
              <a
                key={`${ad.href}-${index}`}
                href={ad.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block min-w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
