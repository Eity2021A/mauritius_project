import type { ReactNode } from "react";
import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import TransferDatePicker from "@/components/transfer/TransferDatePicker";
import { DEFAULT_OG_IMAGE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Mauritius Transfers",
  description:
    "Arrange private Mauritius transfers for airport arrivals, hotel pick-ups, villa stays, beaches, activities and day trips.",
  keywords: [
    "Mauritius transfers",
    "Mauritius private transfer",
    "airport transfer Mauritius",
    "hotel transfer Mauritius",
    "Mauritius transport",
  ],
  openGraph: {
    title: "Mauritius Transfers | Mauritius Explored",
    description:
      "Private transfers in Mauritius for airport arrivals, hotel pick-ups, villa transfers, beaches, activities and day trips.",
    type: "website",
    images: [DEFAULT_OG_IMAGE],
  },
  alternates: {
    canonical: "/transfer",
  },
};

const steps = [
  {
    number: "1",
    title: "Submit your request",
    description: "Tell us your route, dates and details.",
  },
  {
    number: "2",
    title: "We connect you",
    description: "We send it to a selected local operator.",
  },
  {
    number: "3",
    title: "Confirm by email",
    description: "You get availability and price to confirm.",
  },
];

const transferTypes = [
  {
    title: "Airport",
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3 14.5h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path
          d="M6.5 14.5 9 9.5c.2-.4.57-.68 1-.76l1.4-.26c.38-.07.76.1.95.43l1.25 2.1c.14.23.39.39.66.43l3.13.47c.83.12 1.44.84 1.44 1.68V15"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="8" cy="16.8" r="1.2" fill="currentColor" />
        <circle cx="16" cy="16.8" r="1.2" fill="currentColor" />
      </svg>
    ),
    iconColor: "text-sky-500",
  },
  {
    title: "Hotel & Villa",
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M5 10.5 12 5l7 5.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7 9.5V18h10V9.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M10 18v-3.5h4V18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    iconColor: "text-teal-500",
  },
  {
    title: "Dining & Beaches",
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M7.5 5v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M5 5v3a2.5 2.5 0 0 0 5 0V5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M7.5 11v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M15.5 5v14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M18.5 5v5c0 1.1-.9 2-2 2h-1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    iconColor: "text-orange-500",
  },
  {
    title: "Activities",
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 4.5 18.5 11 12 17.5 5.5 11 12 4.5Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M9.5 11h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    iconColor: "text-amber-500",
  },
  {
    title: "Day Trips",
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M12 4v1.5M12 18.5V20M4 12h1.5M18.5 12H20M6.35 6.35 7.4 7.4M16.6 16.6l1.05 1.05M17.65 6.35 16.6 7.4M7.4 16.6l-1.05 1.05"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
    iconColor: "text-lime-500",
  },
];

const transferTypeHints = [
  "Airport",
  "Hotel",
  "Hotel Location",
  "Activity",
  "Hotel + Hotel",
  "Private Day Trip",
  "Other",
];

const luggageHints = ["None", "1-2", "3-4", "more than 4 bags"];

const childSeatHints = ["No", "baby seat", "child seat"];

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-[1.3rem] sm:text-[1.45rem] font-bold uppercase tracking-[0.01em] text-[#1e2434]">
      {children}
    </h2>
  );
}

function FieldLabel({ children }: { children: ReactNode }) {
  return <label className="mb-2 block text-[0.92rem] font-semibold text-[#1d2435]">{children}</label>;
}

function TextInput({
  placeholder,
  type = "text",
}: {
  placeholder: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="h-12 w-full rounded-md border border-[#dfd4c7] bg-white px-4 text-sm text-[#384255] placeholder:text-[#9a938f] focus:border-[#f26d21] focus:outline-none"
    />
  );
}

function TimeInput() {
  return (
    <div className="relative">
      <input
        type="time"
        step={900}
        className="h-12 w-full appearance-none rounded-md border border-[#dfd4c7] bg-white px-4 pr-12 text-sm text-[#384255] focus:border-[#f26d21] focus:outline-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-clear-button]:hidden [&::-webkit-inner-spin-button]:hidden"
      />
      <svg
        className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9a938f]"
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
    </div>
  );
}

function SelectInput({
  placeholder,
  options,
  hints,
}: {
  placeholder: string;
  options: string[];
  hints?: string[];
}) {
  return (
    <div>
      <div className="relative">
        <select
          defaultValue=""
          className="h-12 w-full appearance-none rounded-md border border-[#dfd4c7] bg-white px-4 pr-10 text-sm text-[#7b746e] focus:border-[#f26d21] focus:outline-none"
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <svg
          className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9a938f]"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      </div>
      {hints ? (
        <p className="mt-2 text-[0.68rem] leading-5 text-[#9a938f]">{hints.join(" / ")}</p>
      ) : null}
    </div>
  );
}

export default function TransferPage() {
  return (
    <main id="main-content" className="min-h-screen text-[#384255]">
      <Navbar />

      <section className="px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <h1 className="text-[2.15rem] leading-tight font-bold text-[#1d2435] sm:text-[2.8rem]">
              Mauritius Transfers
            </h1>
            <p className="mt-3 text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-[#f26d21] sm:text-[0.9rem]">
              Getting Around / Private Transfers
            </p>
            <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-[#4c5870] sm:text-[1.02rem]">
              Make your trip around the island easier with private transfers for airport arrivals,
              hotel pick-ups, villa transfers, restaurants, beaches, activities and day trips.
            </p>
          </div>

          <div className="mt-12 text-center">
            <SectionHeading>How It Works</SectionHeading>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {steps.map((step) => (
                <article
                  key={step.number}
                  className="rounded-2xl border border-[#e8dccf] bg-white px-5 py-6 shadow-[0_8px_24px_rgba(99,78,50,0.08)]"
                >
                  <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#f26d21] text-lg font-bold text-white">
                    {step.number}
                  </div>
                  <h3 className="mt-4 text-[1.02rem] font-semibold text-[#1d2435]">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#6a7387]">{step.description}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <SectionHeading>Transfers Covered</SectionHeading>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {transferTypes.map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl bg-white px-4 py-5 shadow-[0_8px_24px_rgba(99,78,50,0.08)] "
                  style={{ backgroundColor: "#ebebea" }}
                >
                  <div
                    className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#fff]  ${item.iconColor}`}
                  >
                    {item.icon}
                  </div>
                  <h3 className="mt-4 text-sm font-medium text-[#1d2435] sm:text-[0.95rem]">
                    {item.title}
                  </h3>
                </article>
              ))}
            </div>
            <p className="mx-auto mt-6 max-w-4xl text-sm leading-7 text-[#4c5870] sm:text-[1.02rem]">
              Whether you need a simple airport transfer, transport to an activity, or a full-day
              island transfer, Mauritius Explored helps connect you with selected local transfer
              operators in Mauritius.
            </p>
          </div>

          <div className="mt-10 rounded-[1.4rem] border border-[#e1d5c7] px-5 py-10 shadow-[0_8px_24px_rgba(99,78,50,0.06)] sm:px-8 sm:py-7" style={{ backgroundColor: "#ebebea" }}>
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white text-[#b7aa98] shadow-sm">
                <svg className="h-12 w-12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M12 7.5 17 16.5H7L12 7.5Z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M12 11.2v2.3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  <circle cx="12" cy="15.3" r=".7" fill="currentColor" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#1d2435]">Important Information</h2>
                <p className="mt-3 max-w-4xl text-sm leading-7 text-[#6a7387] sm:text-[0.98rem]">
                  All transfer services are operated by independent local providers. Mauritius
                  Explored helps facilitate the enquiry but does not operate the vehicles and does
                  not take responsibility for bookings, payments, delays, cancellations, accidents,
                  service quality or any issue related to the transfer service.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-14 rounded-[1.8rem] bg-white px-5 py-8 border border-[#fcfcfc] shadow-[0_18px_40px_rgba(99,78,50,0.08)] sm:px-8 sm:py-10 lg:px-10">
            <div className="text-center">
              <p className="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-[#f26d21] sm:text-[0.9rem]">
                Private Transfers <span aria-hidden="true">&middot;</span> Enquiry
              </p>
              <h2 className="mt-3 text-[2rem] leading-tight font-bold text-[#1d2435] sm:text-[2.6rem]">
                Transfer Request Form
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm italic leading-7 text-[#8b8782] sm:text-[1rem]">
                Fill in the details below and we&apos;ll email you availability and a price to
                confirm.
              </p>
            </div>

            <form className="mt-8 sm:mt-10">
              <div className="grid gap-x-4 gap-y-5 md:grid-cols-2 md:gap-x-6 md:gap-y-6">
                <div>
                  <FieldLabel>Full Name</FieldLabel>
                  <TextInput placeholder="Your full name" />
                </div>
                <div>
                  <FieldLabel>Email Address</FieldLabel>
                  <TextInput placeholder="you@email.com" type="email" />
                </div>
                <div>
                  <FieldLabel>Phone / WhatsApp Number</FieldLabel>
                  <TextInput placeholder="+ country code" />
                </div>
                <div>
                  <FieldLabel>Type of Transfer</FieldLabel>
                  <SelectInput
                    placeholder="Select transfer type"
                    options={transferTypeHints}
                    hints={transferTypeHints}
                  />
                </div>
                <div>
                  <FieldLabel>Pick-Up Location</FieldLabel>
                  <TextInput placeholder="Hotel, airport or address" />
                </div>
                <div>
                  <FieldLabel>Drop-Off Location</FieldLabel>
                  <TextInput placeholder="Hotel, airport or address" />
                </div>
                <div>
                  <FieldLabel>Pick-Up Date</FieldLabel>
                  <TransferDatePicker placeholder="DD / MM / YYYY" />
                </div>
                <div>
                  <FieldLabel>Pick-Up Time</FieldLabel>
                  <TimeInput />
                </div>
                <div>
                  <FieldLabel>Number of Passengers</FieldLabel>
                  <TextInput placeholder="e.g. 2" />
                </div>
                <div>
                  <FieldLabel>Luggage</FieldLabel>
                  <SelectInput
                    placeholder="Select amount"
                    options={luggageHints}
                    hints={luggageHints}
                  />
                </div>
                <div>
                  <FieldLabel>Child Seat Required?</FieldLabel>
                  <SelectInput
                    placeholder="Select option"
                    options={childSeatHints}
                    hints={childSeatHints}
                  />
                </div>
                <div>
                  <FieldLabel>Flight Number</FieldLabel>
                  <TextInput placeholder="e.g. MK015" />
                </div>
                <div className="md:col-span-2">
                  <FieldLabel>Additional Details</FieldLabel>
                  <textarea
                    placeholder="Anything else we should know - stops, timings, special requests..."
                    className="min-h-[110px] w-full rounded-md border border-[#dfd4c7] bg-white px-4 py-3 text-sm text-[#384255] placeholder:text-[#9a938f] focus:border-[#f26d21] focus:outline-none"
                  />
                </div>
              </div>

              <label className="mt-6 flex items-start gap-3 text-sm leading-6 text-[#6a7387]">
                <input
                  type="checkbox"
                  className="mt-1 h-10 w-10 rounded border border-[#d8ccbf] accent-[#f26d21]"
                />
                <span>
                  I understand that Mauritius Explored will share my request with an independent
                  transfer provider, and that all bookings, prices and services are managed
                  directly by the provider.
                </span>
              </label>

              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  className="inline-flex min-h-[52px] w-full max-w-[320px] items-center justify-center gap-3 rounded-2xl bg-[#f26d21] px-6 py-3 text-base font-bold text-white shadow-[0_12px_26px_rgba(242,109,33,0.28)] transition-colors hover:bg-[#e96217]"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#f26d21]">
                    <svg className="h-8 w-8" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <path
                        d="M10 4.5v7m0 0 2.5-2.5M10 11.5 7.5 9"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M4.5 11.5v1A2.5 2.5 0 0 0 7 15h6a2.5 2.5 0 0 0 2.5-2.5v-1"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  Request Transfer Quote
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
