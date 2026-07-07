"use client";

import { useEffect, useMemo, useRef, useState } from "react";

interface TransferTimePickerProps {
  name?: string;
  placeholder?: string;
  intervalMinutes?: number;
}

function formatTimeLabel(hours: number, minutes: number) {
  const suffix = hours >= 12 ? "PM" : "AM";
  const normalizedHours = hours % 12 || 12;
  return `${normalizedHours}:${String(minutes).padStart(2, "0")} ${suffix}`;
}

function formatTimeValue(hours: number, minutes: number) {
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

export default function TransferTimePicker({
  name = "pickupTime",
  placeholder = "Select time",
  intervalMinutes = 15,
}: TransferTimePickerProps) {
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const times = useMemo(() => {
    const generated: { value: string; label: string }[] = [];

    for (let hour = 0; hour < 24; hour += 1) {
      for (let minute = 0; minute < 60; minute += intervalMinutes) {
        generated.push({
          value: formatTimeValue(hour, minute),
          label: formatTimeLabel(hour, minute),
        });
      }
    }

    return generated;
  }, [intervalMinutes]);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  const selectedLabel = times.find((time) => time.value === selectedTime)?.label;

  return (
    <div ref={wrapperRef} className="relative">
      <input type="hidden" name={name} value={selectedTime} />

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex h-12 w-full items-center justify-between rounded-md border border-[#dfd4c7] bg-white px-4 text-left text-sm text-[#384255] transition-colors hover:border-[#d4c5b6] focus:border-[#f26d21] focus:outline-none"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={selectedTime ? "text-[#384255]" : "text-[#9a938f]"}>
          {selectedLabel ?? placeholder}
        </span>
        <svg
          className="h-5 w-5 shrink-0 text-[#9a938f]"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="7.25" stroke="currentColor" strokeWidth="1.8" />
          <path
            d="M12 8.25v4.1l2.75 1.65"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open ? (
        <div className="absolute left-0 top-[calc(100%+0.5rem)] z-30 w-full rounded-2xl border border-[#e5d8ca] bg-white p-2 shadow-[0_18px_38px_rgba(44,30,12,0.14)]">
          <div className="max-h-72 overflow-y-auto rounded-xl">
            <div className="grid grid-cols-2 gap-1 p-1 sm:grid-cols-3">
              {times.map((time) => {
                const isSelected = time.value === selectedTime;

                return (
                  <button
                    key={time.value}
                    type="button"
                    onClick={() => {
                      setSelectedTime(time.value);
                      setOpen(false);
                    }}
                    className={`rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                      isSelected
                        ? "bg-[#f26d21] text-white shadow-sm"
                        : "bg-[#fcfaf7] text-[#5f6778] hover:bg-[#f4ece3] hover:text-[#1d2435]"
                    }`}
                  >
                    {time.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
