"use client";

import { useTranslations } from "next-intl";
import PlanTripButton from "@/components/PlanTripButton";

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

export default function AcrossSectionCta({
  ctaKey,
  ctaHref,
}: {
  ctaKey: "exploreAllActivities" | "exploreAllBeaches" | "exploreAllPlaces";
  ctaHref: string;
}) {
  const t = useTranslations("Buttons");

  return (
    <div className="mt-4">
      <PlanTripButton
        href={ctaHref}
        className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-2.5 rounded-full font-medium hover:bg-orange-600 transition-colors text-sm disabled:opacity-90 disabled:cursor-wait"
      >
        {t(ctaKey)}
        <ArrowIcon />
      </PlanTripButton>
    </div>
  );
}
