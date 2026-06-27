"use client";

import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";

const InstagramFeed = dynamic(() => import("@/components/InstagramFeed"), {
  ssr: false,
  loading: () => (
    <section className="py-16 md:py-20 bg-white dark:bg-neutral-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <span className="text-orange-500 text-xs md:text-sm font-medium tracking-wider uppercase">
            @mauritius__explored
          </span>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2">
            Follow Our Adventures
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-3 max-w-xl mx-auto text-sm md:text-base">
            Loading...
          </p>
        </div>
        <div className="flex gap-4 overflow-hidden justify-center">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex-shrink-0 w-64 md:w-72 aspect-[9/16] rounded-lg bg-gray-200 dark:bg-neutral-800 animate-pulse"
            />
          ))}
        </div>
      </div>
    </section>
  ),
});

function Placeholder() {
  return (
    <section
      className="py-16 md:py-20 bg-white dark:bg-neutral-900 min-h-[320px]"
      aria-hidden="true"
    />
  );
}

export default function LazyInstagramSection() {
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
      {isNearView ? <InstagramFeed /> : <Placeholder />}
    </>
  );
}
