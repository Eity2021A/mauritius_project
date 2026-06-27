"use client";

import { useEffect } from "react";

/**
 * When the page is opened with hash #community or #build-your-own (e.g. from nav or homepage CTA),
 * scroll that section into view. Handles both initial load and hash change.
 */
export default function ScrollToCommunitySection() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const scrollToHash = () => {
      const hash = window.location.hash;
      if (!hash) return;
      const id = hash.slice(1);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    const t = setTimeout(scrollToHash, 100);
    window.addEventListener("hashchange", scrollToHash);
    return () => {
      clearTimeout(t);
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, []);

  return null;
}
