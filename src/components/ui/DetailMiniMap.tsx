"use client";

import { useEffect, useState, useRef } from "react";
import { useLeafletStyles } from "@/lib/use-leaflet-styles";

const TILE_URL = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png";
const TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';

const PIN_SIZE = 36;
const PIN_ICON_STYLE =
  "display:flex;align-items:center;justify-content:center;width:100%;height:100%;transform:rotate(45deg);pointer-events:none;";
const pinSvg =
  '<svg width="18" height="18" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="1"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3" fill="#ea580c" stroke="#ea580c"/></svg>';

interface DetailMiniMapProps {
  position: [number, number];
  name: string;
}

export default function DetailMiniMap({ position, name }: DetailMiniMapProps) {
  useLeafletStyles();
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<import("leaflet").Map | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let cancelled = false;

    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !containerRef.current) return;

      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }

      const map = L.map(el, {
        center: position,
        zoom: 10,
        scrollWheelZoom: false,
        dragging: false,
        zoomControl: false,
        doubleClickZoom: false,
        attributionControl: false,
      });

      L.tileLayer(TILE_URL, { attribution: TILE_ATTRIBUTION }).addTo(map);

      const icon = L.divIcon({
        className: "detail-mini-map-pin",
        html: `<div style="
          background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
          width: ${PIN_SIZE}px;
          height: ${PIN_SIZE}px;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          border: 2px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        "><span style="${PIN_ICON_STYLE}">${pinSvg}</span></div>`,
        iconSize: [PIN_SIZE, PIN_SIZE],
        iconAnchor: [PIN_SIZE / 2, PIN_SIZE],
      });

      L.marker(position, { icon }).addTo(map);
      mapRef.current = map;

      requestAnimationFrame(() => map.invalidateSize());
      setReady(true);
    })();

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [position[0], position[1]]);

  return (
    <div
      className="relative w-full aspect-square rounded-lg overflow-hidden shadow-sm border border-gray-200"
      role="img"
      aria-label={`Map showing location of ${name}`}
    >
      <div ref={containerRef} style={{ height: "100%", width: "100%" }} className="z-0" />
      {!ready && (
        <div className="absolute inset-0 z-10 bg-gray-100 animate-pulse flex items-center justify-center rounded-lg">
          <svg className="w-6 h-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
      )}
    </div>
  );
}
