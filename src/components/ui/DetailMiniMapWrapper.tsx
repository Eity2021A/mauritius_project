"use client";

import { useCallback, type MouseEvent } from "react";
import dynamic from "next/dynamic";

const DetailMiniMap = dynamic(() => import("./DetailMiniMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-square rounded-lg bg-gray-100 animate-pulse flex items-center justify-center">
      <svg className="w-6 h-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    </div>
  ),
});

interface Props {
  position: [number, number];
  name: string;
}

export default function DetailMiniMapWrapper({ position, name }: Props) {
  const [lat, lng] = position;
  const webUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

  const openDirections = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
    if (typeof window === "undefined") return;

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (!isMobile) {
      return;
    }

    e.preventDefault();

    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const encodedQuery = encodeURIComponent(`${lat},${lng} (${name})`);
    const appUrl = isIOS
      ? `comgooglemaps://?daddr=${lat},${lng}&directionsmode=driving`
      : `geo:${lat},${lng}?q=${encodedQuery}`;

    let appOpened = false;
    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") appOpened = true;
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.location.href = appUrl;

    window.setTimeout(() => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      if (!appOpened) {
        window.location.href = webUrl;
      }
    }, 900);
  }, [lat, lng, name, webUrl]);

  return (
    <section className="space-y-4" aria-label={`Map and directions for ${name}`}>
      <DetailMiniMap position={position} name={name} />
      <a
        href={webUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={openDirections}
        className="block w-full text-center min-h-[48px] py-3 rounded-lg font-semibold transition-colors no-underline bg-white border border-gray-300 text-gray-900 hover:bg-gray-50"
        aria-label={`Get directions to ${name} in Google Maps`}
      >
        Get Directions
      </a>
    </section>
  );
}
