"use client";

import { useTranslations } from "next-intl";
import { SLIDES } from "@/data/hero-slides";
import { getImageUrl } from "@/lib/image-url";
import PlanTripButton from "@/components/PlanTripButton";

export default function HeroSlideshow() {
  const t = useTranslations("Buttons");
  const homeT = useTranslations("Home.hero");
  const slide = SLIDES[0];

  return (
    <>
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={getImageUrl(slide.image, { width: 1600, quality: 74 })}
          alt="Mauritius landscape"
          sizes="100vw"
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 z-10" />
      </div>

      <div className="absolute inset-0 z-40 flex items-center justify-center">
        <div className="text-center px-4 max-w-4xl mx-auto translate-y-[2rem]">
          <h1 className="font-script text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-white mb-2 md:mb-4">
            {homeT("title")}
          </h1>
          <p className="text-white/90 text-sm sm:text-base md:text-xl max-w-2xl mx-auto mb-4 md:mb-8 px-2">
            {homeT("subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center px-4">
            <PlanTripButton
              href="/explore"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[48px] min-w-[200px] sm:min-w-[220px] bg-orange-500 text-white text-sm md:text-base font-medium rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-90 disabled:cursor-wait"
            >
              {t("exploreMauritius")}
            </PlanTripButton>
            <PlanTripButton
              href="/roadtrip-mauritius"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[48px] min-w-[200px] sm:min-w-[220px] bg-white text-gray-900 border border-white text-sm md:text-base font-medium rounded-lg hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-colors disabled:opacity-90 disabled:cursor-wait"
            >
              {t("planYourTrip")}
              <span className="text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded bg-white text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                {t("badgeNew")}
              </span>
            </PlanTripButton>
          </div>
        </div>
      </div>
    </>
  );
}
