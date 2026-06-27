"use client";

import { useState, useEffect } from "react";

interface TripCountdownProps {
  tripStart: string;
  compact?: boolean;
}

function getCountdown(target: Date) {
  const now = new Date();
  const diff = target.getTime() - now.getTime();

  if (diff <= 0) return null;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
}

export default function TripCountdown({ tripStart, compact }: TripCountdownProps) {
  const [countdown, setCountdown] = useState<ReturnType<typeof getCountdown>>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const target = new Date(tripStart + "T00:00:00");
    setCountdown(getCountdown(target));

    const interval = setInterval(() => {
      const result = getCountdown(target);
      setCountdown(result);
      if (!result) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, [tripStart]);

  if (!mounted || !countdown) return null;

  if (compact) {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-orange-600">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {countdown.days}d {countdown.hours}h to go
      </span>
    );
  }

  return (
    <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-4">
      <p className="text-xs font-medium text-orange-600 mb-3 flex items-center gap-1.5">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.58-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
        </svg>
        Your trip to Mauritius starts in
      </p>
      <div className="grid grid-cols-4 gap-2 text-center">
        {[
          { value: countdown.days, label: "Days" },
          { value: countdown.hours, label: "Hours" },
          { value: countdown.minutes, label: "Min" },
          { value: countdown.seconds, label: "Sec" },
        ].map((unit) => (
          <div key={unit.label} className="bg-white rounded-lg py-2 shadow-sm">
            <span className="block text-xl sm:text-2xl font-bold text-gray-900 tabular-nums">
              {String(unit.value).padStart(2, "0")}
            </span>
            <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
