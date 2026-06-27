"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useLeafletStyles } from "@/lib/use-leaflet-styles";
import {
  ITINERARY_BEACHES,
  ITINERARY_ACTIVITIES,
  ITINERARY_NATURE,
} from "@/data/itinerary";
import { ALL_BEACHES } from "@/data/beaches";
import { ACTIVITIES } from "@/data/activities";
import { MAURITIUS_CENTER } from "@/lib/constants";
import { getImageUrl } from "@/lib/image-url";
import MapSkeleton from "@/components/ui/MapSkeleton";
import Link from "next/link";
import type L from "leaflet";

const getBeachBySlug = (slug: string) => ALL_BEACHES.find((b) => b.slug === slug);
const getActivityBySlug = (slug: string) => ACTIVITIES.find((a) => a.slug === slug);

function truncateWords(text: string, maxWords = 12): string {
  const words = text.trim().split(/\s+/);
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(" ") + "…";
}

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);

const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

const MapInvalidateSize = dynamic(
  () =>
    import("react-leaflet").then((mod) => {
      function Inner() {
        const map = mod.useMap();
        useEffect(() => {
          if (!map) return;
          map.invalidateSize();
          const t = setTimeout(() => map.invalidateSize(), 150);
          return () => clearTimeout(t);
        }, [map]);
        return null;
      }
      return Inner;
    }),
  { ssr: false }
);

const PIN_ICON_STYLE = "display:flex;align-items:center;justify-content:center;width:100%;height:100%;transform:rotate(45deg);pointer-events:none;";

const PIN_SIZE = 42;
const beachPinSvg = '<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3"/><path d="M2 18c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/><path d="M4 14c2-1.5 4-1.5 6 0s4 1.5 6 0 4-1.5 6 0"/></svg>';
const activityPinSvg = '<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v2l4 4-4 4v2"/><path d="M12 18l-3-4 3-4"/><circle cx="12" cy="12" r="2" fill="white" stroke="none"/></svg>';
const naturePinSvg = '<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22V10"/><path d="M12 10L8 16h8L12 10z"/><path d="M12 10l2-4 2 4"/><path d="M12 10l-2-4-2 4"/></svg>';

const orangePin = `
  <div style="
    background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
    width: ${PIN_SIZE}px;
    height: ${PIN_SIZE}px;
    border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg);
    border: 3px solid white;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  "><span style="${PIN_ICON_STYLE}">${beachPinSvg}</span></div>
`;

const bluePin = `
  <div style="
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    width: ${PIN_SIZE}px;
    height: ${PIN_SIZE}px;
    border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg);
    border: 3px solid white;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  "><span style="${PIN_ICON_STYLE}">${activityPinSvg}</span></div>
`;

const greenPin = `
  <div style="
    background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
    width: ${PIN_SIZE}px;
    height: ${PIN_SIZE}px;
    border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg);
    border: 3px solid white;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  "><span style="${PIN_ICON_STYLE}">${naturePinSvg}</span></div>
`;

const ITINERARY_MAP_ZOOM = 11;

export type ItineraryMarkerId = `beach-${string}` | `activity-${string}` | `nature-${string}`;

interface ItineraryMapProps {
  zoom?: number;
  hoveredId?: ItineraryMarkerId | null;
  onMarkerHover?: (id: ItineraryMarkerId | null) => void;
  tileLayerUrl?: string;
  tileLayerAttribution?: string;
}

const DEFAULT_TILE_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const DEFAULT_TILE_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

export default function ItineraryMap({
  zoom = ITINERARY_MAP_ZOOM,
  hoveredId = null,
  onMarkerHover,
  tileLayerUrl = DEFAULT_TILE_URL,
  tileLayerAttribution = DEFAULT_TILE_ATTRIBUTION,
}: ItineraryMapProps) {
  useLeafletStyles();
  const [isClient, setIsClient] = useState(false);
  const [L, setL] = useState<typeof import("leaflet") | null>(null);
  const markerRefs = useRef<Record<string, L.Marker>>({});
  const onMarkerHoverRef = useRef(onMarkerHover);
  const cleanupRef = useRef<Record<string, () => void>>({});
  onMarkerHoverRef.current = onMarkerHover;

  useEffect(() => {
    setIsClient(true);
    import("leaflet").then((leaflet) => {
      setL(leaflet.default);
    });
  }, []);

  useEffect(() => {
    if (!hoveredId) {
      Object.values(markerRefs.current).forEach((m) => m?.closePopup());
      return;
    }
    const marker = markerRefs.current[hoveredId];
    if (marker) marker.openPopup();
  }, [hoveredId]);

  useEffect(() => {
    return () => {
      Object.values(cleanupRef.current).forEach((fn) => fn());
      cleanupRef.current = {};
    };
  }, []);

  const attachMarkerHover = (id: ItineraryMarkerId, marker: L.Marker) => {
    const getEl = () => (marker as L.Marker & { _icon?: HTMLElement })._icon;
    const tryAttach = () => {
      const el = getEl();
      if (!el || !onMarkerHoverRef.current) return;
      const onEnter = () => onMarkerHoverRef.current?.(id);
      const onLeave = () => onMarkerHoverRef.current?.(null);
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseout", onLeave);
      cleanupRef.current[id] = () => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseout", onLeave);
      };
    };
    if (getEl()) tryAttach();
    else setTimeout(tryAttach, 50);
  };

  if (!isClient || !L) {
    return <MapSkeleton />;
  }

  const createIcon = (html: string) =>
    L.divIcon({
      className: "itinerary-marker",
      html,
      iconSize: [PIN_SIZE, PIN_SIZE],
      iconAnchor: [PIN_SIZE / 2, PIN_SIZE],
      popupAnchor: [0, -PIN_SIZE],
    });

  const beachIcon = createIcon(orangePin);
  const activityIcon = createIcon(bluePin);
  const natureIcon = createIcon(greenPin);

  return (
    <div className="rounded-xl overflow-hidden shadow-lg h-full w-full min-h-[400px]" style={{ minHeight: 400 }}>
      <MapContainer
        center={MAURITIUS_CENTER}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%", minHeight: 400 }}
        className="z-0"
      >
        <MapInvalidateSize />
        <TileLayer attribution={tileLayerAttribution} url={tileLayerUrl} />
        {ITINERARY_BEACHES.map((beach) => {
          const data = getBeachBySlug(beach.slug);
          return (
            <Marker
              key={`beach-${beach.slug}`}
              ref={(r) => {
                const id = `beach-${beach.slug}` as ItineraryMarkerId;
                if (r) {
                  markerRefs.current[id] = r;
                  if (onMarkerHover) attachMarkerHover(id, r);
                } else {
                  cleanupRef.current[id]?.();
                  delete cleanupRef.current[id];
                  delete markerRefs.current[id];
                }
              }}
              position={beach.position}
              icon={beachIcon}
            >
              <Popup autoPan={false}>
                <div className="text-left min-w-[200px] max-w-[240px] p-0">
                  {data?.image && (
                    <a href={`/beaches-in-mauritius/${beach.slug}`} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-md">
                      <img
                        src={getImageUrl(data.image, { width: 400, quality: 75 })}
                        alt={beach.name}
                        className="w-full h-[106px] object-cover"
                        width={240}
                        height={106}
                      />
                    </a>
                  )}
                  <div className="p-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-orange-500 mr-1.5 align-middle" aria-hidden />
                    <Link
                      href={`/beaches-in-mauritius/${beach.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-gray-900 text-sm hover:text-orange-600 align-middle"
                    >
                      {beach.name}
                    </Link>
                    <p className="text-xs text-gray-500 mt-0.5">{beach.regionLabel}</p>
                    {data?.description && (
                      <p className="text-xs text-gray-600 mt-1 line-clamp-2">{truncateWords(data.description, 12)}</p>
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
        {ITINERARY_ACTIVITIES.map((activity) => {
          const data = getActivityBySlug(activity.slug);
          return (
            <Marker
              key={`activity-${activity.slug}`}
              ref={(r) => {
                const id = `activity-${activity.slug}` as ItineraryMarkerId;
                if (r) {
                  markerRefs.current[id] = r;
                  if (onMarkerHover) attachMarkerHover(id, r);
                } else {
                  cleanupRef.current[id]?.();
                  delete cleanupRef.current[id];
                  delete markerRefs.current[id];
                }
              }}
              position={activity.position}
              icon={activityIcon}
            >
              <Popup autoPan={false}>
                <div className="text-left min-w-[200px] max-w-[240px] p-0">
                  {data?.image && (
                    <a href={`/top-activities-mauritius/${activity.slug}`} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-md">
                      <img
                        src={getImageUrl(data.image, { width: 400, quality: 75 })}
                        alt={activity.name}
                        className="w-full h-[106px] object-cover"
                        width={240}
                        height={106}
                      />
                    </a>
                  )}
                  <div className="p-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-1.5 align-middle" aria-hidden />
                    <Link
                      href={`/top-activities-mauritius/${activity.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-gray-900 text-sm hover:text-blue-600 align-middle"
                    >
                      {activity.name}
                    </Link>
                    {data?.description && (
                      <p className="text-xs text-gray-600 mt-1 line-clamp-2">{truncateWords(data.description, 12)}</p>
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
        {ITINERARY_NATURE.map((item) => {
          const data = getActivityBySlug(item.slug);
          return (
            <Marker
              key={`nature-${item.slug}`}
              ref={(r) => {
                const id = `nature-${item.slug}` as ItineraryMarkerId;
                if (r) {
                  markerRefs.current[id] = r;
                  if (onMarkerHover) attachMarkerHover(id, r);
                } else {
                  cleanupRef.current[id]?.();
                  delete cleanupRef.current[id];
                  delete markerRefs.current[id];
                }
              }}
              position={item.position}
              icon={natureIcon}
            >
              <Popup autoPan={false}>
                <div className="text-left min-w-[200px] max-w-[240px] p-0">
                  {data?.image && (
                    <a href={`/top-activities-mauritius/${item.slug}`} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-md">
                      <img
                        src={getImageUrl(data.image, { width: 400, quality: 75 })}
                        alt={item.name}
                        className="w-full h-[106px] object-cover"
                        width={240}
                        height={106}
                      />
                    </a>
                  )}
                  <div className="p-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1.5 align-middle" aria-hidden />
                    <Link
                      href={`/top-activities-mauritius/${item.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-gray-900 text-sm hover:text-green-600 align-middle"
                    >
                      {item.name}
                    </Link>
                    {data?.description && (
                      <p className="text-xs text-gray-600 mt-1 line-clamp-2">{truncateWords(data.description, 12)}</p>
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
