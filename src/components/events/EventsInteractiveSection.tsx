"use client";

import Image from "next/image";
import type { ComponentProps } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { enUS } from "react-day-picker/locale";
import { Calendar, CalendarDayButton } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import {
  findEventByIsoDate,
  getAllEventDateStrings,
  isoDateToLocalDate,
  localDateToIso,
  type MauritiusEvent,
} from "@/data/events";
import { getImageUrl } from "@/lib/image-url";

const SECTION_TITLE =
  "text-xl font-bold text-gray-900 sm:text-2xl tracking-tight";

function earliestEventMonth(dates: Date[]): Date {
  if (dates.length === 0) return new Date();
  const t = dates.reduce((a, b) => (a.getTime() <= b.getTime() ? a : b));
  return new Date(t.getFullYear(), t.getMonth(), 1);
}

/** Overrides default `bg-primary` on selected days so event dates stay solid orange. */
function EventCalendarDayButton(props: ComponentProps<typeof CalendarDayButton>) {
  const hasEvent = Boolean(props.modifiers?.hasEvent);
  const isSelected = Boolean(props.modifiers?.selected);

  return (
    <CalendarDayButton
      {...props}
      className={cn(
        props.className,
        hasEvent &&
          "!bg-orange-500 !text-white hover:!bg-orange-600 focus-visible:!bg-orange-500 focus-visible:!text-white",
        hasEvent &&
          isSelected &&
          "!bg-orange-500 !text-white shadow-sm ring-2 !ring-orange-400 ring-offset-2 ring-offset-background data-[selected-single=true]:!bg-orange-500 data-[selected-single=true]:!text-white",
        !hasEvent &&
          isSelected &&
          "!bg-slate-100 !text-slate-900 hover:!bg-slate-200 data-[selected-single=true]:!bg-slate-100 data-[selected-single=true]:!text-slate-900 ring-2 !ring-slate-400 ring-offset-2",
      )}
    />
  );
}

function EventDetailCard({ event }: { event: MauritiusEvent }) {
  return (
    <article className="flex min-w-0 flex-col items-center gap-6 md:gap-8">
      {/* Intrinsic sizing + contain: full poster visible (no crop). Max height keeps long posters in view on desktop. */}
      <div className="mx-auto w-full max-w-md sm:max-w-lg lg:max-w-xl">
        <Image
          src={getImageUrl(event.posterImage, { width: 1200, quality: 78 })}
          alt={`Poster: ${event.title}`}
          width={800}
          height={1200}
          className="h-auto w-full max-h-[min(85vh,920px)] rounded-lg bg-gray-100 object-contain shadow-xl"
          sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 45vw, 520px"
          priority
        />
      </div>

      <div className="mx-auto w-full min-w-0 max-w-2xl space-y-4 break-words text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-orange-500">
          {event.displayDate}
        </p>
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900">{event.title}</h3>
        <p className="text-gray-700 leading-relaxed text-base md:text-lg">{event.description}</p>
        <div className="rounded-lg bg-white border border-gray-100 px-4 py-3 text-gray-800 shadow-sm">
          <span className="font-semibold text-gray-900">Venue:</span> {event.venue}
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Line-up</h4>
          <ul className="mx-auto flex max-w-md flex-col items-center gap-2 text-gray-700">
            {event.lineup.map((name) => (
              <li key={name} className="flex justify-center gap-2">
                <span className="text-orange-500 font-bold">·</span>
                <span>{name}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg border border-orange-200 bg-orange-50/80 px-4 py-4 text-center text-gray-800 space-y-2">
          <p className="font-semibold text-gray-900">Tickets & access</p>
          {event.ticketing.exclusive && (
            <p className="text-sm">
              Exclusive event — {event.ticketing.holdersNote ?? "see ticketing partner."}
            </p>
          )}
          <div className="flex w-full flex-col items-center gap-3 text-center text-sm">
            <div className="flex w-full flex-wrap items-center justify-center gap-x-4 gap-y-2">
              {event.ticketing.provider && <span>Tickets: {event.ticketing.provider}</span>}
              {event.ticketing.phone && (
                <span>Tel: {event.ticketing.phone}</span>
              )}
            </div>
            {event.ticketing.website && (
              <a
                href={event.ticketing.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] w-full max-w-xs items-center justify-center rounded-xl bg-orange-500 px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
              >
                Get tickets
              </a>
            )}
          </div>
          {event.admissionNote && (
            <p className="text-xs text-gray-600 pt-1 border-t border-orange-100 mt-2">{event.admissionNote}</p>
          )}
        </div>
      </div>
    </article>
  );
}

export default function EventsInteractiveSection() {
  const eventDateStrings = getAllEventDateStrings();
  const eventDates = useMemo(() => eventDateStrings.map(isoDateToLocalDate), [eventDateStrings]);
  const defaultMonth = useMemo(() => earliestEventMonth(eventDates), [eventDates]);

  /** UTC on server + first client paint avoids DayPicker SSR/client HTML drift; then real TZ after hydrate. */
  const [timeZone, setTimeZone] = useState<string>("UTC");
  const [selected, setSelected] = useState<Date | undefined>(() =>
    eventDateStrings[0] ? isoDateToLocalDate(eventDateStrings[0]) : undefined
  );
  useEffect(() => {
    setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);

  const selectedEvent = useMemo(() => {
    if (!selected) return undefined;
    return findEventByIsoDate(localDateToIso(selected));
  }, [selected]);

  const handleSelect = useCallback((d: Date | undefined) => {
    setSelected(d);
  }, []);

  return (
    <>
      {/* Same layout on mobile and desktop: event details on top, calendar below */}
      <div className="flex flex-col gap-10 xl:gap-12">
        <div className="order-1 min-w-0 overflow-x-hidden">
          <h2 className={cn(SECTION_TITLE, "mb-6 text-center")}>Event Details</h2>
          <div className="min-h-[200px] min-w-0">
            {selected && selectedEvent && <EventDetailCard event={selectedEvent} />}
            {selected && !selectedEvent && (
              <div
                className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white px-6 py-14 text-center shadow-sm"
                role="status"
                aria-live="polite"
              >
                <p className="text-lg font-semibold text-gray-800">No events on this day</p>
                <p className="mt-2 text-sm text-gray-500">
                  {format(selected, "EEEE, d MMMM yyyy")}
                </p>
                <p className="mt-4 max-w-sm text-sm text-gray-600">
                  Try another date, or pick an orange day on the calendar when an event is listed.
                </p>
              </div>
            )}
            {!selected && (
              <p className="text-center text-gray-600">
                Select a date in the calendar below to see event details here.
              </p>
            )}
          </div>
        </div>

        <aside
          className="order-2 w-full min-w-0 space-y-3"
          aria-labelledby="events-calendar-heading"
        >
          <h2 id="events-calendar-heading" className={cn(SECTION_TITLE, "text-center")}>
            Events Calendar
          </h2>
          <div className="mx-auto w-full max-w-sm rounded-xl border border-gray-200 bg-white p-3 shadow-sm sm:p-4 lg:max-w-lg">
            <div
              className={cn(
                "w-full min-w-0 max-w-full overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch]",
                "[&_[data-slot=calendar]]:w-full [&_[data-slot=calendar]]:min-w-0 [&_[data-slot=calendar]]:max-w-full"
              )}
            >
              <Calendar
                mode="single"
                selected={selected}
                onSelect={handleSelect}
                locale={enUS}
                timeZone={timeZone}
                defaultMonth={defaultMonth}
                captionLayout="dropdown"
                startMonth={new Date(2025, 0)}
                endMonth={new Date(2028, 11)}
                modifiers={{ hasEvent: eventDates }}
                components={{
                  DayButton: EventCalendarDayButton,
                }}
                className="w-full min-w-0 max-w-full rounded-lg border bg-background p-2 shadow-xs [--cell-size:2.5rem] sm:p-3 sm:[--cell-size:2.75rem] lg:p-2 lg:[--cell-size:2.375rem] xl:[--cell-size:2.4375rem] 2xl:[--cell-size:2.5rem]"
              />
            </div>
            <p className="mx-auto max-w-md text-center text-xs text-muted-foreground leading-snug sm:text-sm">
              <span
                className="mr-1.5 inline-block size-3 align-middle rounded-sm bg-orange-500"
                aria-hidden
              />
              Orange days have a scheduled event. Tap any date to see details above.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
