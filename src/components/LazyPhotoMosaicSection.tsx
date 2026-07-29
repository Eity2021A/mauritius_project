"use client";

import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import type { AppLocale } from "@/i18n/routing";

const PhotoMosaic = dynamic(() => import("@/components/PhotoMosaic"), {
  ssr: false,
});

type LazyPhotoMosaicSectionProps = {
  locale: AppLocale;
};

export default function LazyPhotoMosaicSection({
  locale,
}: LazyPhotoMosaicSectionProps) {
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
      {isNearView ? (
        <PhotoMosaic locale={locale} />
      ) : (
        <section className="py-4 md:py-10 bg-white dark:bg-neutral-900 min-h-[320px]" aria-hidden="true" />
      )}
    </>
  );
}
