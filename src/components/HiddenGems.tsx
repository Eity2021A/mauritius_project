import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import PlanTripButton from "@/components/PlanTripButton";
import { getImageUrl } from "@/lib/image-url";
import { Marquee } from "@/components/ui/marquee";
import type { Metadata } from "next";
import {
  acrossSections,
  type AcrossItem,
  type AcrossSectionConfig,
} from "@/data/across";
import { getExploreSectionsEnriched } from "@/lib/content";

export const metadata: Metadata = {
  title: "Explore Mauritius — Beaches, Places & Activities",
  description:
    "Discover the best beaches, must-visit places and unforgettable activities in Mauritius.",
  alternates: { canonical: "/explore" },
};

function SmallCard({
  name,
  region,
  image,
  href,
}: {
  name: string;
  region: string;
  image: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 p-2 bg-gray-100 rounded-lg border border-gray-200 hover:bg-orange-500 hover:border-orange-500 transition-colors shadow-sm"
    >
      <div className="relative w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden">
        <Image
          src={getImageUrl(image, { width: 400, quality: 75 })}
          alt={name}
          fill
          className="object-cover"
          sizes="48px"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-gray-900 group-hover:text-white transition-colors text-sm">
          {name}
        </h4>
        <span className="inline-block text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full group-hover:bg-white/20 group-hover:text-white transition-colors">
          {region}
        </span>
      </div>
      <svg
        className="w-4 h-4 flex-shrink-0 text-gray-300 group-hover:text-white transition-colors"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </Link>
  );
}

function ArrowIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 8l4 4m0 0l-4 4m4-4H3"
      />
    </svg>
  );
}

function AcrossSection({ config }: { config: AcrossSectionConfig }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <span className={`w-2 h-2 ${config.dotColor} rounded-full`} />
        {config.title}
      </h3>
      <div className="space-y-1.5">
        {config.items.map((item) => (
          <SmallCard
            key={item.slug}
            {...item}
            href={`${config.hrefPrefix}/${item.slug}`}
          />
        ))}
      </div>
      <div className="mt-4">
        <PlanTripButton
          href={config.ctaHref}
          className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-2.5 rounded-full font-medium hover:bg-orange-600 transition-colors text-sm disabled:opacity-90 disabled:cursor-wait"
        >
          {config.ctaText}
          <ArrowIcon />
        </PlanTripButton>
      </div>
    </div>
  );
}

function MarqueeCard({
  item,
  label,
  href,
}: {
  item: AcrossItem;
  label: string;
  href: string;
}) {
  return (
    <Link href={href}>
      <div className="relative flex h-44 w-28 sm:h-52 sm:w-36 md:h-64 md:w-44 lg:h-72 lg:w-52 flex-col items-start justify-start overflow-hidden rounded-lg bg-gray-200 shrink-0 cursor-pointer hover:scale-105 transition-transform duration-200">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-1/2 bg-gradient-to-b from-black/70 via-black/40 to-transparent" />
        <div className="relative z-40 p-3 sm:p-4">
          <p className="text-left font-sans text-xs font-medium text-white">
            {label}
          </p>
          <p className="mt-1 max-w-xs text-left font-sans text-xs sm:text-sm font-semibold text-white [text-wrap:balance] md:text-base lg:text-lg">
            {item.name}
          </p>
          <p className="mt-0.5 text-left font-sans text-[10px] text-white/70">
            {item.region}
          </p>
        </div>
        <img
          src={getImageUrl(item.image, { width: 400, quality: 75 })}
          alt={item.name}
          className="absolute inset-0 w-full h-full object-cover z-10"
          loading="lazy"
        />
      </div>
    </Link>
  );
}

export default async function HiddenGems() {
  const { topActivities, topBeaches, topPlaces, hiddenGems } =
    await getExploreSectionsEnriched();
  const exploreSectionsWithEnrichedImages: AcrossSectionConfig[] = [
    { ...acrossSections[0], items: topActivities },
    { ...acrossSections[1], items: topBeaches },
    { ...acrossSections[2], items: topPlaces },
  ];

  return (
    <main id="main-content">
      {/* Marquee */}
      <section className="pt-6 pb-4 bg-white">
        <div className="container mx-auto px-4 mb-5">
          <div className="text-center mb-4">
            <span className="text-orange-500 text-sm font-medium tracking-wider uppercase">
              Off the Beaten Path
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            Explore Hidden Gems of Mauritius
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto">
            Secret beaches and secluded spots that only locals know about — away
            from the crowds
          </p>
        </div>
        <div className="container mx-auto w-full pt-4 pb-4 space-y-0">
          <div className="relative">
            <Marquee className="[--duration:70s] [--gap:0.375rem] sm:[--gap:0.75rem]">
              {[...topActivities, ...topActivities].map((item, index) => (
                <MarqueeCard
                  key={`act-${item.slug}-${index}`}
                  item={item}
                  label="Activity"
                  href={`/mauritius-activities/${item.slug}`}
                />
              ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-24 bg-gradient-to-r from-white" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-24 bg-gradient-to-l from-white" />
          </div>
          <div className="relative mt-1">
            <Marquee
              reverse
              className="[--duration:70s] [--gap:0.375rem] sm:[--gap:0.75rem]"
            >
              {[...topBeaches, ...topBeaches].map((item, index) => (
                <MarqueeCard
                  key={`beach-${item.slug}-${index}`}
                  item={item}
                  label="Beach"
                  href={`/beaches-in-mauritius/${item.slug}`}
                />
              ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-24 bg-gradient-to-r from-white" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-24 bg-gradient-to-l from-white" />
          </div>
        </div>
      </section>
    </main>
  );
}
