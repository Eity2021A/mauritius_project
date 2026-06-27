"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Scrolls window to top on route change. Fixes mobile browsers (e.g. Safari iOS)
 * restoring previous scroll position after client-side navigation.
 * Double-rAF ensures we run after the browser has painted and restored scroll.
 */
export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Disable browser's native scroll restoration so it doesn't fight us
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    // Immediate reset
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });

    // Double-rAF: fires after browser paint, overrides any deferred scroll restoration
    let raf1: number;
    let raf2: number;
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      });
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [pathname]);

  return null;
}
