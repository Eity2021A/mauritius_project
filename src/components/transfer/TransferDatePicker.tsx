"use client";

import type { ComponentProps } from "react";
import { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { Calendar, CalendarDayButton } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface TransferDatePickerProps {
  name?: string;
  placeholder?: string;
}

function TransferCalendarDayButton(props: ComponentProps<typeof CalendarDayButton>) {
  return (
    <CalendarDayButton
      {...props}
      className={cn(
        "mx-auto flex h-10 w-10 items-center justify-center rounded-xl p-0 text-center text-sm font-medium leading-none",
        props.className
      )}
    />
  );
}

export default function TransferDatePicker({
  name = "pickupDate",
  placeholder = "Select date",
}: TransferDatePickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <input
        type="hidden"
        name={name}
        value={selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""}
      />

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex h-12 w-full items-center justify-between rounded-md border border-[#dfd4c7] bg-white px-4 text-left text-sm text-[#384255] transition-colors hover:border-[#d4c5b6] focus:border-[#f26d21] focus:outline-none"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span className={selectedDate ? "text-[#384255]" : "text-[#9a938f]"}>
          {selectedDate ? format(selectedDate, "dd / MM / yyyy") : placeholder}
        </span>
        <svg
          className="h-5 w-5 shrink-0 text-[#9a938f]"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M7 4.5V7M17 4.5V7M5.5 9.5h13M6.5 6.5h11A1.5 1.5 0 0 1 19 8v9.5A1.5 1.5 0 0 1 17.5 19h-11A1.5 1.5 0 0 1 5 17.5V8a1.5 1.5 0 0 1 1.5-1.5Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open ? (
        <div className="absolute left-0 top-[calc(100%+0.5rem)] z-30 w-full rounded-2xl border border-[#e5d8ca] bg-white p-3 shadow-[0_18px_38px_rgba(44,30,12,0.14)]">
          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => {
                setSelectedDate(date);
                if (date) setOpen(false);
              }}
              disabled={{ before: new Date() }}
              className="bg-transparent p-0 [--cell-size:2.5rem]"
              classNames={{
                root: "mx-auto w-fit",
                months: "w-fit",
                month: "w-fit gap-4",
                month_caption: "relative flex h-11 items-center justify-center px-12",
                caption_label: "text-base font-semibold text-[#1d2435] text-center",
                nav: "absolute inset-x-0 top-0 flex h-11 items-center justify-between px-4 pt-3",
                table: "mx-auto border-collapse",
                button_previous:
                  "flex items-center justify-center h-9 w-9 rounded-full border border-[#efe4d8] bg-[#fcfaf7] text-[#6a7387] shadow-sm hover:bg-[#f4ece3]",
                button_next:
                  "flex items-center justify-center h-9 w-9 rounded-full border border-[#efe4d8] bg-[#fcfaf7] text-[#6a7387] shadow-sm hover:bg-[#f4ece3]",
                weekdays: "mb-2 mt-1 flex w-full",
                weekday: "flex-1 text-center text-[0.78rem] font-medium uppercase text-[#9a938f]",
                week: "mt-1 flex w-full",
                day: "p-0 text-center align-middle",
                today: "bg-[#fff3eb] text-[#f26d21] rounded-xl",
                selected:
                  "bg-[#f26d21] text-white hover:bg-[#e96217] rounded-xl",
                outside: "text-[#c4beb7]",
              }}
              components={{
                DayButton: TransferCalendarDayButton,
              }}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
