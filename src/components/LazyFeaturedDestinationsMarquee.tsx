"use client";

import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";

const FeaturedDestinationsMarquee = dynamic(() => import("@/components/FeaturedDestinationsMarquee"), {
  ssr: false,
});

export default function LazyFeaturedDestinationsMarquee() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [isNearView, setIsNearView] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px", threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinelRef} className="min-h-[1px]" aria-hidden="true" />
      {isNearView ? <FeaturedDestinationsMarquee /> : <section className="pt-3 md:pt-8 pb-2 md:pb-5 bg-white dark:bg-neutral-900 min-h-[280px]" aria-hidden="true" />}
    </>
  );
}
