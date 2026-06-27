"use client";

import { useState, useEffect, useCallback } from "react";
import { SLIDES, FIRST_HERO_QUALITY, FIRST_HERO_WIDTHS } from "@/data/hero-slides";
import { getImageSrcSet, getImageUrl } from "@/lib/image-url";
import PlanTripButton from "@/components/PlanTripButton";

const SLIDE_DURATION = 12000;
const FADE_DURATION = 700;
const APPEAR_DELAY = 50;

export default function HeroSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [textState, setTextState] = useState<"visible" | "fading-out" | "hidden" | "fading-in">("visible");
  const [displayedSlide, setDisplayedSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setTextState("fading-out");

    const advanceSlide = () => {
      setTextState("hidden");
      const nextIndex = (currentSlide + 1) % SLIDES.length;
      setCurrentSlide(nextIndex);
      setDisplayedSlide(nextIndex);

      setTimeout(() => setTextState("fading-in"), APPEAR_DELAY);
      setTimeout(() => setTextState("visible"), APPEAR_DELAY + FADE_DURATION);
    };

    setTimeout(advanceSlide, FADE_DURATION);
  }, [currentSlide]);

  useEffect(() => {
    const interval = setInterval(nextSlide, SLIDE_DURATION);
    return () => clearInterval(interval);
  }, [nextSlide]);

  useEffect(() => {
    const preloadTimer = window.setTimeout(() => {
      const nextIndex = (currentSlide + 1) % SLIDES.length;
      const img = new window.Image();
      img.src = getImageUrl(SLIDES[nextIndex].image, { width: 960, quality: 68 });
    }, 1200);

    return () => window.clearTimeout(preloadTimer);
  }, [currentSlide]);

  const getTextClasses = () => {
    const baseClasses = "transition-all duration-700 ease-out";
    
    switch (textState) {
      case "fading-out":
        return `${baseClasses} opacity-0 -translate-y-4`;
      case "hidden":
        return `${baseClasses} opacity-0 translate-y-6`;
      case "fading-in":
      case "visible":
        return `${baseClasses} opacity-100 translate-y-0`;
    }
  };

  const isImageTransitioning = textState === "fading-out" || textState === "hidden";
  const nextSlideIndex = (currentSlide + 1) % SLIDES.length;

  return (
    <>
      {/* Background Images */}
      <div className="absolute inset-0 overflow-hidden">
        {SLIDES.map((slide, index) => {
          const isActive = index === currentSlide;
          const isNext = index === nextSlideIndex;
          const isFirstSlide = index === 0;
          const shouldRender = isFirstSlide || isActive || (isImageTransitioning && isNext);

          if (!shouldRender) return null;
          
          return (
            <div
              key={slide.image}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive && !isImageTransitioning
                  ? "opacity-100 z-10"
                  : isActive && isImageTransitioning
                  ? "opacity-0 z-10"
                  : isNext && isImageTransitioning
                  ? "opacity-100 z-20"
                  : "opacity-0 z-0"
              }`}
            >
              <img
                src={getImageUrl(slide.image, {
                  width: 960,
                  quality: isFirstSlide ? FIRST_HERO_QUALITY : 68,
                })}
                srcSet={getImageSrcSet(slide.image, {
                  widths: isFirstSlide ? FIRST_HERO_WIDTHS : [480, 720, 960, 1280],
                  quality: isFirstSlide ? FIRST_HERO_QUALITY : 68,
                })}
                alt="Mauritius landscape"
                sizes="100vw"
                fetchPriority={isFirstSlide ? "high" : "low"}
                loading={isFirstSlide ? "eager" : "lazy"}
                decoding={isFirstSlide ? "sync" : "async"}
                className={`absolute inset-0 w-full h-full object-cover ${
                  isActive || (isNext && isImageTransitioning)
                    ? "animate-ken-burns"
                    : ""
                }`}
              />
            </div>
          );
        })}
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 z-30" />
      </div>

      {/* Text Content - centered with offset for fixed navbar */}
      <div className="absolute inset-0 z-40 flex items-center justify-center">
        <div className="text-center px-4 max-w-4xl mx-auto translate-y-[2rem]">
        <h1
          className={`font-script text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-white mb-2 md:mb-4 ${getTextClasses()}`}
        >
          {SLIDES[displayedSlide].title}
        </h1>
        <p
          className={`text-white/90 text-sm sm:text-base md:text-xl max-w-2xl mx-auto mb-4 md:mb-8 px-2 ${getTextClasses()}`}
          style={{ transitionDelay: textState === "fading-in" ? "100ms" : "0ms" }}
        >
          {SLIDES[displayedSlide].subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center px-4">
          <PlanTripButton
            href="/explore"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[48px] min-w-[200px] sm:min-w-[220px] bg-orange-500 text-white text-sm md:text-base font-medium rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-90 disabled:cursor-wait"
          >
            Explore Mauritius
          </PlanTripButton>
          <PlanTripButton
            href="/itineraries-mauritius"
            className="group inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[48px] min-w-[200px] sm:min-w-[220px] bg-white text-gray-900 border border-white text-sm md:text-base font-medium rounded-lg hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-colors disabled:opacity-90 disabled:cursor-wait"
          >
            Plan Your Trip
            <span className="text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded bg-white text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors">New</span>
          </PlanTripButton>
        </div>
        </div>
      </div>
    </>
  );
}
