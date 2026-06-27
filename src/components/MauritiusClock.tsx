"use client";

import { useEffect, useState } from "react";

type MauritiusTimeParts = {
  hours: number;
  minutes: number;
  seconds: number;
  dateLabel: string;
  timeLabel: string;
};

const TIME_ZONE = "Indian/Mauritius";

function getMauritiusTime(): MauritiusTimeParts {
  const now = new Date();

  const partsFormatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIME_ZONE,
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const parts = partsFormatter.formatToParts(now);
  const hours = Number(parts.find((p) => p.type === "hour")?.value ?? "0");
  const minutes = Number(parts.find((p) => p.type === "minute")?.value ?? "0");
  const seconds = Number(parts.find((p) => p.type === "second")?.value ?? "0");

  const dateLabel = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIME_ZONE,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(now);

  const timeLabel = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIME_ZONE,
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(now);

  return { hours, minutes, seconds, dateLabel, timeLabel };
}

export default function MauritiusClock() {
  const [time, setTime] = useState<MauritiusTimeParts | null>(null);

  useEffect(() => {
    setTime(getMauritiusTime());
    const id = setInterval(() => setTime(getMauritiusTime()), 1000);
    return () => clearInterval(id);
  }, []);

  // Avoid hydration mismatch: render an empty shell on the server / first paint
  const hourDeg = time ? (time.hours % 12) * 30 + time.minutes * 0.5 : 0;
  const minuteDeg = time ? time.minutes * 6 + time.seconds * 0.1 : 0;
  const secondDeg = time ? time.seconds * 6 : 0;

  return (
    <div className="flex flex-col items-center gap-3 bg-white rounded-2xl border border-orange-100 shadow-sm px-6 py-5">
      <span className="text-orange-500 font-medium tracking-wider text-xs uppercase">
        Live time in Mauritius
      </span>

      <div className="flex items-center gap-5">
        {/* Analog clock */}
        <svg
          viewBox="0 0 100 100"
          className="w-24 h-24 shrink-0"
          role="img"
          aria-label="Analog clock showing current time in Mauritius"
        >
          {/* Dial */}
          <circle cx="50" cy="50" r="48" fill="#fff" stroke="#fb923c" strokeWidth="2" />

          {/* Hour ticks */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const round = (n: number) => Math.round(n * 1000) / 1000;
            const x1 = round(50 + Math.sin(angle) * 42);
            const y1 = round(50 - Math.cos(angle) * 42);
            const x2 = round(50 + Math.sin(angle) * 46);
            const y2 = round(50 - Math.cos(angle) * 46);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#9ca3af"
                strokeWidth={i % 3 === 0 ? 2 : 1}
                strokeLinecap="round"
              />
            );
          })}

          {/* Hour hand */}
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="28"
            stroke="#1f2937"
            strokeWidth="3.5"
            strokeLinecap="round"
            transform={`rotate(${hourDeg} 50 50)`}
            style={{ transition: "transform 0.3s cubic-bezier(0.4, 2.3, 0.6, 1)" }}
          />
          {/* Minute hand */}
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="16"
            stroke="#1f2937"
            strokeWidth="2.5"
            strokeLinecap="round"
            transform={`rotate(${minuteDeg} 50 50)`}
            style={{ transition: "transform 0.3s cubic-bezier(0.4, 2.3, 0.6, 1)" }}
          />
          {/* Second hand */}
          <line
            x1="50"
            y1="55"
            x2="50"
            y2="14"
            stroke="#f97316"
            strokeWidth="1.5"
            strokeLinecap="round"
            transform={`rotate(${secondDeg} 50 50)`}
            style={{ transition: "transform 0.2s cubic-bezier(0.4, 2.3, 0.6, 1)" }}
          />
          {/* Center cap */}
          <circle cx="50" cy="50" r="2.5" fill="#f97316" />
        </svg>

        {/* Digital time */}
        <div className="flex flex-col">
          <span
            className="text-3xl md:text-4xl font-bold text-gray-900 tabular-nums tracking-tight"
            suppressHydrationWarning
          >
            {time ? time.timeLabel : "--:--:--"}
          </span>
          <span className="text-xs text-gray-500 mt-0.5" suppressHydrationWarning>
            {time ? time.dateLabel : "\u00a0"}
          </span>
          <span className="text-[11px] text-gray-400 mt-0.5">UTC+4 · Port-Louis</span>
        </div>
      </div>
    </div>
  );
}
