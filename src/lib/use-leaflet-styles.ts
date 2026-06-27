"use client";

import { useEffect } from "react";

/**
 * Injects Leaflet CSS when a map component mounts.
 * Call from map components so styles load only on map pages.
 */
export function useLeafletStyles() {
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById("leaflet-styles")) return;

    const link = document.createElement("link");
    link.id = "leaflet-styles";
    link.rel = "stylesheet";
    link.href = "/leaflet.css";
    document.head.appendChild(link);
  }, []);
}
