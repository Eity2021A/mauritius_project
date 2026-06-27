"use client";

import dynamic from "next/dynamic";

// Lazy load Instagram feed to defer video loading
const InstagramFeed = dynamic(() => import("@/components/InstagramFeed"), {
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
  ssr: false,
});

export default function InstagramFeedWrapper() {
  return <InstagramFeed />;
}
