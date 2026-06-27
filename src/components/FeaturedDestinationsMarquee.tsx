"use client";

import Link from "next/link";
import { Marquee } from "@/components/ui/marquee";
import { FEATURED_DESTINATIONS, FEATURED_ACTIVITIES, type FeaturedItem } from "@/data/featured";
import { getImageSrcSet, getImageUrl } from "@/lib/image-url";

function DestinationCard({ card }: { card: FeaturedItem }) {
  const cardContent = (
    <div 
      className="relative flex h-44 w-28 sm:h-52 sm:w-36 md:h-64 md:w-44 lg:h-76 lg:w-56 flex-col items-start justify-start overflow-hidden rounded-lg bg-gray-200 dark:bg-neutral-800 shrink-0 cursor-pointer hover:scale-105 transition-transform duration-200"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-1/2 bg-gradient-to-b from-black/70 via-black/40 to-transparent" />
      <div className="relative z-40 p-3 sm:p-4 md:p-5">
        <p className="text-left font-sans text-xs font-medium text-white md:text-sm">
          {card.category}
        </p>
        <p className="mt-1 sm:mt-1.5 max-w-xs text-left font-sans text-xs sm:text-sm font-semibold [text-wrap:balance] text-white md:text-lg lg:text-xl">
          {card.title}
        </p>
      </div>
      <img
        src={getImageUrl(card.src, { width: 400, quality: 75 })}
        srcSet={getImageSrcSet(card.src, { widths: [320, 480, 800], quality: 66 })}
        sizes="(max-width: 640px) 112px, (max-width: 768px) 144px, (max-width: 1024px) 176px, 224px"
        alt={card.title}
        className="absolute inset-0 w-full h-full object-cover z-10"
        loading="lazy"
        decoding="async"
      />
    </div>
  );

  if (card.link) {
    return <Link href={card.link}>{cardContent}</Link>;
  }

  return cardContent;
}

export default function FeaturedDestinationsMarquee() {
  return (
    <section className="pt-3 md:pt-8 pb-2 md:pb-5 bg-white dark:bg-neutral-900">
      <div className="container mx-auto px-4 mb-3 md:mb-5">
        <div className="text-center mb-2 md:mb-4">
          <span className="text-orange-500 text-sm font-medium tracking-wider uppercase">
            Explore Mauritius
          </span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-4">
          Popular Activities
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-center max-w-2xl mx-auto">
          From pristine beaches to lush national parks, discover the best of Mauritius.
        </p>
      </div>
      
      <div className="container mx-auto w-full pt-2 pb-2 md:pt-5 md:pb-5 space-y-0">
        {/* First marquee - scrolling left */}
        <div className="relative">
          <Marquee className="[--duration:35s] [--gap:0.375rem] sm:[--gap:0.75rem]">
            {FEATURED_DESTINATIONS.map((card, index) => (
              <DestinationCard
                key={`${card.title}-${index}`}
                card={card}
              />
            ))}
          </Marquee>
        </div>
        {/* Second marquee - scrolling right, opposite direction */}
        <div className="relative">
          <Marquee reverse className="[--duration:55s] [--gap:0.375rem] sm:[--gap:0.75rem]">
            {FEATURED_ACTIVITIES.map((card, index) => (
              <DestinationCard
                key={`${card.title}-${index}`}
                card={card}
              />
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
