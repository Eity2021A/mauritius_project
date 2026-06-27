"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useLeafletStyles } from "@/lib/use-leaflet-styles";
import Link from "next/link";
import { TOP_BEACHES } from "@/data/beaches";
import { MAURITIUS_CENTER, DEFAULT_MAP_ZOOM } from "@/lib/constants";
import MapSkeleton from "@/components/ui/MapSkeleton";

// Dynamic import for the map to avoid SSR issues with Leaflet
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

export default function MauritiusMap() {
  useLeafletStyles();
  const [isClient, setIsClient] = useState(false);
  const [L, setL] = useState<typeof import("leaflet") | null>(null);

  useEffect(() => {
    setIsClient(true);
    // Import leaflet on client side
    import("leaflet").then((leaflet) => {
      setL(leaflet.default);
    });
  }, []);

  if (!isClient || !L) {
    return <MapSkeleton />;
  }

  // Create custom numbered beach marker icon
  const createBeachIcon = (number: number) =>
    L.divIcon({
      className: "custom-beach-marker",
      html: `
        <div style="
          background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
          width: 32px;
          height: 32px;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <span style="
            transform: rotate(45deg);
            color: white;
            font-weight: bold;
            font-size: 14px;
            font-family: system-ui, -apple-system, sans-serif;
          ">${number}</span>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });

  return (
    <div className="rounded-xl overflow-hidden shadow-lg h-full w-full min-h-[280px]">
      <MapContainer
        center={MAURITIUS_CENTER}
        zoom={DEFAULT_MAP_ZOOM}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {TOP_BEACHES.map((beach) => (
          <Marker
            key={beach.name}
            position={beach.position}
            icon={createBeachIcon(beach.number)}
          >
            <Popup>
              <div className="text-left p-1 min-w-[200px]">
                <h3 className="font-bold text-gray-900 text-sm mb-0.5">
                  <span className="inline-flex items-center justify-center w-5 h-5 bg-orange-500 text-white text-xs rounded-full mr-1">
                    {beach.number}
                  </span>
                  {beach.name}
                </h3>
                <p className="text-xs text-gray-600 capitalize mb-1">
                  {beach.region} Coast
                </p>
                <p className="text-xs text-gray-500 mb-2">{beach.description}</p>
                <Link
                  href={`/beaches-in-mauritius/${beach.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full text-center px-3 py-1.5 text-xs font-semibold !text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors no-underline hover:!text-white"
                  style={{ color: "white" }}
                >
                  View
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
