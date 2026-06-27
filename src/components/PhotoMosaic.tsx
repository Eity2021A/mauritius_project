"use client";

import Link from "next/link";
import { Marquee } from "@/components/ui/marquee";
import { MOSAIC_ITEMS, type MosaicItem } from "@/data/mosaic";
import { getImageSrcSet, getImageUrl } from "@/lib/image-url";

function MosaicCard({ item }: { item: MosaicItem }) {
  const cardContent = (
    <img
      src={getImageUrl(item.src, { width: 800, quality: 75 })}
      srcSet={getImageSrcSet(item.src, { widths: [320, 500, 800, 1200], quality: 68 })}
      alt={item.alt}
      width={item.width}
      height={item.height}
      loading="lazy"
      decoding="async"
      className="mosaic-tile shrink-0 rounded-lg cursor-pointer hover:scale-105 transition-transform duration-200"
    />
  );

  return (
    <Link href={item.href} aria-label={item.alt}>
      {cardContent}
    </Link>
  );
}

const desktopTileClasses = [
  "lg:col-span-2 lg:row-span-2",
  "lg:col-span-3 lg:row-span-2",
  "lg:col-span-3 lg:row-span-2",
  "lg:col-span-2 lg:row-span-2",
  "lg:col-span-2 lg:row-span-2",
  "lg:col-span-3 lg:row-span-2",
  "lg:col-span-2 lg:row-span-2",
  "lg:col-span-4 lg:row-span-2",
  "lg:col-span-3 lg:row-span-2",
  "lg:col-span-2 lg:row-span-2",
  "lg:col-span-2 lg:row-span-2",
  "lg:col-span-3 lg:row-span-2",
  "lg:col-span-3 lg:row-span-2",
  "lg:col-span-2 lg:row-span-2",
] as const;

function DesktopMosaicCard({ item, index }: { item: MosaicItem; index: number }) {
  return (
    <Link
      href={item.href}
      aria-label={item.alt}
      className={`group relative block overflow-hidden rounded-lg bg-gray-100 ${desktopTileClasses[index] ?? "lg:col-span-2 lg:row-span-2"}`}
    >
      <img
        src={getImageUrl(item.src, { width: 900, quality: 75 })}
        srcSet={getImageSrcSet(item.src, { widths: [500, 800, 1200, 1600], quality: 68 })}
        sizes="(max-width: 1279px) 0px, 25vw"
        alt={item.alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-center transition-transform duration-300 group-hover:scale-105"
      />
    </Link>
  );
}

export default function PhotoMosaic() {
  const half = Math.ceil(MOSAIC_ITEMS.length / 2);
  const row1 = MOSAIC_ITEMS.slice(0, half);
  const row2 = MOSAIC_ITEMS.slice(half);

  return (
    <section className="py-4 md:py-10 bg-white dark:bg-neutral-900">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="text-center mb-3 md:mb-6">
          <p className="text-orange-500 text-sm font-medium tracking-wider uppercase">
            EMPOWERING SUSTAINABLE TOURISM & TRAVEL FOR MAURITIUS
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mt-2">
            Best of Mauritius Island 2026
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center max-w-4xl mx-auto mt-2 md:mt-3">
            All The Inspiration You Need To Start Planning Your Next Adventure
          </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 pt-2 pb-2 md:pt-4 md:pb-4 space-y-0 lg:hidden">
          <div className="relative">
            <Marquee className="[--duration:50s] [--gap:0.375rem] sm:[--gap:0.75rem]">
              {row1.map((item, index) => (
                <MosaicCard key={`row1-${item.src}-${index}`} item={item} />
              ))}
            </Marquee>
          </div>
          <div className="relative mt-1">
            <Marquee reverse className="[--duration:60s] [--gap:0.375rem] sm:[--gap:0.75rem]">
              {row2.map((item, index) => (
                <MosaicCard key={`row2-${item.src}-${index}`} item={item} />
              ))}
            </Marquee>
          </div>
      </div>

      <div className="hidden lg:block">
        <div className="container w-full mx-auto px-4 pt-4 pb-4">
          <div className="grid grid-cols-12 auto-rows-[7.5rem] gap-2 xl:auto-rows-[8.5rem] 2xl:auto-rows-[9.5rem]">
            {MOSAIC_ITEMS.map((item, index) => (
              <DesktopMosaicCard key={`desktop-${item.src}-${index}`} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
