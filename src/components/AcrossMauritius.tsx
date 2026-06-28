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
import { getAcrossSectionsEnriched } from "@/lib/content";

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

export default async function AcrossMauritius() {
  const { topActivities, topBeaches, topPlaces, hiddenGems } =
    await getAcrossSectionsEnriched();
  const acrossSectionsWithEnrichedImages: AcrossSectionConfig[] = [
    { ...acrossSections[0], items: topActivities },
    { ...acrossSections[1], items: topBeaches },
    { ...acrossSections[2], items: topPlaces },
  ];

  return (
    <main id="main-content">
      {/* Three-column grid */}
      <section className="py-2 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <span className="text-orange-500 font-medium tracking-wider text-sm uppercase">
                Discover
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                Explore Top Picks Across Mauritius
              </h2>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                From thrilling activities to pristine beaches and must-see
                landmarks — start exploring here
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {acrossSectionsWithEnrichedImages.map((section) => (
                <AcrossSection key={section.title} config={section} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
