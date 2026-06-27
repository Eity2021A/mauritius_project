"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import { useLeafletStyles } from "@/lib/use-leaflet-styles";
import { MAURITIUS_CENTER } from "@/lib/constants";
import MapSkeleton from "@/components/ui/MapSkeleton";
import Link from "next/link";

export type StopPinType = "beach" | "activity" | "nature" | "place";

export interface StopForMap {
  type: StopPinType;
  name: string;
  position: [number, number];
  link?: string;
}

/** OSRM returns [lng, lat]; we use [lat, lng]. Positions are [lat, lng]. */
const OSRM_BASE = "https://router.project-osrm.org/route/v1/driving";

function isValidPosition(p: unknown): p is [number, number] {
  return (
    Array.isArray(p) &&
    p.length >= 2 &&
    Number.isFinite(Number(p[0])) &&
    Number.isFinite(Number(p[1]))
  );
}

export interface RouteLeg {
  distanceKm: number;
  durationMin: number;
}

export interface RouteInfo {
  legs: RouteLeg[];
  totalDistanceKm: number;
  totalDurationMin: number;
}

interface DrivingRouteResult {
  path: [number, number][];
  routeInfo: RouteInfo | null;
}

async function fetchDrivingRoute(
  positions: [number, number][]
): Promise<DrivingRouteResult> {
  if (positions.length < 2) return { path: [], routeInfo: null };
  const coords = positions.map(([lat, lng]) => `${lng},${lat}`).join(";");
  const url = `${OSRM_BASE}/${coords}?overview=full&geometries=geojson&steps=false`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Route fetch failed");
  const data = await res.json();
  const route = data?.routes?.[0];
  const coordsGeo = route?.geometry?.coordinates;
  if (!Array.isArray(coordsGeo)) throw new Error("Invalid route response");
  const path = coordsGeo.map(([lng, lat]: [number, number]) => [lat, lng]) as [number, number][];

  let routeInfo: RouteInfo | null = null;
  if (Array.isArray(route?.legs)) {
    const legs: RouteLeg[] = route.legs.map((leg: { distance: number; duration: number }) => ({
      distanceKm: Math.round((leg.distance / 1000) * 10) / 10,
      durationMin: Math.round(leg.duration / 60),
    }));
    routeInfo = {
      legs,
      totalDistanceKm: Math.round(legs.reduce((sum, l) => sum + l.distanceKm, 0) * 10) / 10,
      totalDurationMin: legs.reduce((sum, l) => sum + l.durationMin, 0),
    };
  }

  return { path, routeInfo };
}

const PIN_SIZE = 42;

function buildPinHtml(
  type: StopPinType,
  number: number
): string {
  const gradients: Record<StopPinType, string> = {
    beach: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
    activity: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
    nature: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
    place: "linear-gradient(135deg, #a855f7 0%, #9333ea 100%)",
  };
  const gradient = gradients[type] ?? gradients.nature;
  return `
  <div style="
    background: ${gradient};
    width: ${PIN_SIZE}px;
    height: ${PIN_SIZE}px;
    border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg);
    border: 3px solid white;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    position: relative;
  ">
    <span style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;transform:rotate(45deg);pointer-events:none;font-weight:700;font-size:14px;color:white;text-shadow:0 1px 2px rgba(0,0,0,0.5);">${number}</span>
  </div>
`;
}

const MAP_ZOOM = 11;

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
const Polyline = dynamic(
  () => import("react-leaflet").then((mod) => mod.Polyline),
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

/** When container becomes visible (e.g. mobile tab switch), invalidate size so map fills the area and grey area is gone. */
const MapInvalidateSizeWhenVisible = dynamic(
  () =>
    import("react-leaflet").then((mod) => {
      function Inner({ containerVisible }: { containerVisible: boolean }) {
        const map = mod.useMap();
        useEffect(() => {
          if (!map || !containerVisible) return;
          map.invalidateSize();
          const t1 = setTimeout(() => map.invalidateSize(), 100);
          const t2 = setTimeout(() => map.invalidateSize(), 400);
          return () => {
            clearTimeout(t1);
            clearTimeout(t2);
          };
        }, [map, containerVisible]);
        return null;
      }
      return Inner;
    }),
  { ssr: false }
);

/** Fits map bounds so all points (stops + route) are in view. Renders inside MapContainer. */
const MapFitBounds = dynamic(
  () =>
    import("react-leaflet").then((rl) =>
      import("leaflet").then((L) => {
        const { useMap } = rl;
        function Inner({
          positions,
          routePath,
        }: {
          positions: [number, number][];
          routePath: [number, number][] | null;
        }) {
          const map = useMap();
          useEffect(() => {
            if (!map || (positions.length === 0 && !routePath?.length)) return;
            const all: [number, number][] = [...positions];
            if (routePath?.length) all.push(...routePath);
            const bounds = L.default.latLngBounds(all as [number, number][]);
            map.fitBounds(bounds, { padding: [24, 24], maxZoom: 14 });
          }, [map, positions, routePath]);
          return null;
        }
        return Inner;
      })
    ),
  { ssr: false }
);

/** Reset map button: fits bounds to all stops + route, or resets to default view when no stops. */
const MapResetControl = dynamic(
  () =>
    import("react-leaflet").then((rl) =>
      import("leaflet").then((L) => {
        const { useMap } = rl;
        type Leaflet = typeof L.default;
        function Inner({
          boundsDataRef,
          defaultCenter,
          defaultZoom,
        }: {
          boundsDataRef: React.MutableRefObject<{ positions: [number, number][]; routePath: [number, number][] | null }>;
          defaultCenter: [number, number];
          defaultZoom: number;
        }) {
          const map = useMap();
          useEffect(() => {
            if (!map || !boundsDataRef) return;
            const FitBoundsControl = (L as Leaflet).Control.extend({
              onAdd: function (m: L.Map) {
                const container = (L as Leaflet).DomUtil.create("div", "leaflet-bar leaflet-control");
                container.style.background = "none";
                container.style.border = "none";
                const btn = (L as Leaflet).DomUtil.create("button", "");
                btn.type = "button";
                btn.title = "Reset map view";
                btn.setAttribute("aria-label", "Reset map view");
                btn.style.cssText = "width:36px;height:36px;background:white;border:1px solid #d1d5db;border-radius:6px;box-shadow:0 1px 3px rgba(0,0,0,0.15);cursor:pointer;display:flex;align-items:center;justify-content:center;";
                btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>`;
                (L as Leaflet).DomEvent.disableClickPropagation(btn);
                (L as Leaflet).DomEvent.on(btn, "click", () => {
                  const d = boundsDataRef.current;
                  if (!d) return;
                  const all: [number, number][] = [...d.positions];
                  if (d.routePath?.length) all.push(...d.routePath);
                  if (all.length > 0) {
                    const bounds = (L as Leaflet).latLngBounds(all as [number, number][]);
                    m.fitBounds(bounds, { padding: [24, 24], maxZoom: 14 });
                  } else {
                    m.setView(defaultCenter, defaultZoom);
                  }
                });
                container.appendChild(btn);
                return container;
              },
            });
            const ctrl = new FitBoundsControl({ position: "topleft" });
            map.addControl(ctrl);
            return () => {
              map.removeControl(ctrl);
            };
          }, [map, boundsDataRef, defaultCenter, defaultZoom]);
          return null;
        }
        return Inner;
      })
    ),
  { ssr: false }
);

/** When focusStopIndex is set, fly to that stop and open its popup. Renders inside MapContainer. */
const MapFocusStop = dynamic(
  () =>
    import("react-leaflet").then((rl) => {
      const { useMap } = rl;
      return function MapFocusStop({
        focusStopIndex,
        positions,
      }: {
        focusStopIndex: number | null;
        positions: [number, number][];
      }) {
        const map = useMap();
        useEffect(() => {
          if (focusStopIndex == null || focusStopIndex < 0 || focusStopIndex >= positions.length)
            return;
          const pos = positions[focusStopIndex];
          const lat = pos?.[0], lng = pos?.[1];
          if (typeof lat !== "number" || typeof lng !== "number" || !Number.isFinite(lat) || !Number.isFinite(lng))
            return;
          map.flyTo([lat, lng], 16, { duration: 0.5 });
          const t = setTimeout(() => {
            map.eachLayer((layer: { getPopup?: () => unknown; getLatLng?: () => { lat: number; lng: number }; openPopup?: () => void }) => {
              if (layer.getPopup && layer.getLatLng && layer.openPopup) {
                const ll = layer.getLatLng();
                if (Math.abs(ll.lat - lat) < 1e-5 && Math.abs(ll.lng - lng) < 1e-5) {
                  layer.openPopup();
                }
              }
            });
          }, 600);
          return () => clearTimeout(t);
        }, [map, focusStopIndex, positions]);
        return null;
      };
    }),
  { ssr: false }
);

function getIcon(type: StopPinType, stopNumber: number, L: typeof import("leaflet")) {
  const html = buildPinHtml(type, stopNumber);
  return L.divIcon({
    className: "itinerary-builder-marker",
    html,
    iconSize: [PIN_SIZE, PIN_SIZE],
    iconAnchor: [PIN_SIZE / 2, PIN_SIZE],
    popupAnchor: [0, -PIN_SIZE],
  });
}

interface ItineraryBuilderMapProps {
  stops: StopForMap[];
  zoom?: number;
  focusStopIndex?: number | null;
  containerVisible?: boolean;
  onRouteInfo?: (info: RouteInfo | null) => void;
}

export default function ItineraryBuilderMap({
  stops,
  zoom = MAP_ZOOM,
  focusStopIndex = null,
  containerVisible = true,
  onRouteInfo,
}: ItineraryBuilderMapProps) {
  useLeafletStyles();
  const [isClient, setIsClient] = useState(false);
  const [L, setL] = useState<typeof import("leaflet") | null>(null);
  const [routePath, setRoutePath] = useState<[number, number][] | null>(null);
  const [routeLoading, setRouteLoading] = useState(false);

  const positions = useMemo(() => stops.map((s) => s.position), [stops]);
  const validPositions = useMemo(
    () => positions.filter(isValidPosition) as [number, number][],
    [positions]
  );

  useEffect(() => {
    setIsClient(true);
    import("leaflet").then((leaflet) => setL(leaflet.default));
  }, []);

  useEffect(() => {
    if (validPositions.length < 2) {
      setRoutePath(null);
      onRouteInfo?.(null);
      return;
    }
    setRouteLoading(true);
    setRoutePath(null);
    fetchDrivingRoute(validPositions)
      .then(({ path, routeInfo }) => {
        setRoutePath(path);
        onRouteInfo?.(routeInfo);
      })
      .catch(() => {
        setRoutePath(validPositions);
        onRouteInfo?.(null);
      })
      .finally(() => {
        setRouteLoading(false);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validPositions]);

  const linePositions = routePath && routePath.length > 0 ? routePath : (validPositions.length > 1 ? validPositions : null);

  const boundsDataRef = useRef({ positions: validPositions, routePath });
  useEffect(() => {
    boundsDataRef.current = { positions: validPositions, routePath };
  }, [validPositions, routePath]);

  if (!isClient || !L) {
    return <MapSkeleton />;
  }


  return (
    <div
      className="rounded-xl overflow-hidden shadow-lg h-full w-full min-h-[400px] relative"
      style={{ minHeight: 400 }}
    >
      {routeLoading && positions.length > 1 && (
        <div className="absolute top-2 left-2 z-[1000] bg-white/90 text-gray-700 text-xs px-2 py-1 rounded shadow">
          Loading route…
        </div>
      )}
      <MapContainer
        center={
          validPositions.length > 0 ? validPositions[0] : MAURITIUS_CENTER
        }
        zoom={zoom}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%", minHeight: 400 }}
        className="z-0"
      >
        <MapInvalidateSize />
        <MapInvalidateSizeWhenVisible containerVisible={containerVisible} />
        {validPositions.length > 0 && focusStopIndex == null && (
          <MapFitBounds positions={validPositions} routePath={routePath} />
        )}
        {positions.length > 0 && (
          <MapFocusStop focusStopIndex={focusStopIndex ?? null} positions={positions} />
        )}
        <MapResetControl
          boundsDataRef={boundsDataRef}
          defaultCenter={MAURITIUS_CENTER}
          defaultZoom={zoom}
        />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {linePositions && linePositions.length > 1 && (
          <Polyline
            positions={linePositions}
            pathOptions={{
              color: "#dc2626",
              weight: 4,
              opacity: 0.9,
            }}
          />
        )}
        {stops.map((stop, i) => {
          if (!isValidPosition(stop.position)) return null;
          const icon = getIcon(stop.type, i + 1, L);
          return (
            <Marker key={`${stop.name}-${i}`} position={stop.position} icon={icon}>
              <Popup autoPan={false}>
                <div className="text-left min-w-[160px] p-1">
                  {stop.link ? (
                    <Link
                      href={stop.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-gray-900 text-sm hover:text-orange-600"
                    >
                      {stop.name}
                    </Link>
                  ) : (
                    <span className="font-semibold text-gray-900 text-sm">
                      {stop.name}
                    </span>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
