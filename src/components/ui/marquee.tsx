"use client";

import { cn } from "@/lib/utils";
import { useRef, useCallback, useEffect } from "react";

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
}

const RESUME_DELAY_MS = 2500;

export function Marquee({
  className,
  reverse,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const touchState = useRef({
    active: false,
    startX: 0,
    scrollStart: 0,
    resumeTimer: null as ReturnType<typeof setTimeout> | null,
  });

  const pauseAnimation = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const strips = el.querySelectorAll<HTMLDivElement>("[data-marquee-strip]");
    strips.forEach((s) => {
      s.style.animationPlayState = "paused";
    });
  }, []);

  const resumeAnimation = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const strips = el.querySelectorAll<HTMLDivElement>("[data-marquee-strip]");
    strips.forEach((s) => {
      s.style.animationPlayState = "running";
    });
  }, []);

  const scheduleResume = useCallback(() => {
    const ts = touchState.current;
    if (ts.resumeTimer) clearTimeout(ts.resumeTimer);
    ts.resumeTimer = setTimeout(() => {
      resumeAnimation();
    }, RESUME_DELAY_MS);
  }, [resumeAnimation]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || vertical) return;

    const onTouchStart = (e: TouchEvent) => {
      const ts = touchState.current;
      if (ts.resumeTimer) clearTimeout(ts.resumeTimer);
      ts.active = true;
      ts.startX = e.touches[0].clientX;
      ts.scrollStart = el.scrollLeft;
      pauseAnimation();
    };

    const onTouchMove = (e: TouchEvent) => {
      const ts = touchState.current;
      if (!ts.active) return;
      const dx = ts.startX - e.touches[0].clientX;
      el.scrollLeft = ts.scrollStart + dx;
    };

    const onTouchEnd = () => {
      const ts = touchState.current;
      if (!ts.active) return;
      ts.active = false;
      scheduleResume();
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
      const ts = touchState.current;
      if (ts.resumeTimer) clearTimeout(ts.resumeTimer);
    };
  }, [vertical, pauseAnimation, scheduleResume]);

  return (
    <div
      ref={containerRef}
      {...props}
      className={cn(
        "group flex overflow-hidden p-1 sm:p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
        "touch-pan-x",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className,
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            data-marquee-strip
            className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
              "animate-marquee flex-row": !vertical && !reverse,
              "animate-marquee-reverse flex-row": !vertical && reverse,
              "animate-marquee-vertical flex-col": vertical,
              "group-hover:[animation-play-state:paused]": pauseOnHover,
            })}
          >
            {children}
          </div>
        ))}
    </div>
  );
}
