"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import TransferDatePicker from "@/components/transfer/TransferDatePicker";
import TransferTimePicker from "@/components/transfer/TransferTimePicker";

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

function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <label className="mb-2 block text-[0.92rem] font-semibold text-[#1d2435]">
      {children}
    </label>
  );
}

function TextInput({
  name,
  placeholder,
  type = "text",
  required = false,
}: {
  name: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      required={required}
      className="h-12 w-full rounded-md border border-[#dfd4c7] bg-white px-4 text-sm text-[#384255] placeholder:text-[#9a938f] focus:border-[#f26d21] focus:outline-none"
    />
  );
}

function SelectInput({
  name,
  placeholder,
  options,
  hints,
  required = false,
}: {
  name: string;
  placeholder: string;
  options: string[];
  hints?: string[];
  required?: boolean;
}) {
  return (
    <div>
      <div className="relative">
        <select
          name={name}
          defaultValue=""
          required={required}
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
          <path
            d="m5 7.5 5 5 5-5"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>
      </div>
      {hints ? (
        <p className="mt-2 text-[0.68rem] leading-5 text-[#9a938f]">
          {hints.join(" / ")}
        </p>
      ) : null}
    </div>
  );
}

type SubmitState = "idle" | "submitting" | "success" | "error";

export default function TransferRequestForm() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");
  const [formInstanceKey, setFormInstanceKey] = useState(0);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      fullName: String(formData.get("fullName") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      transferType: String(formData.get("transferType") ?? "").trim(),
      pickupLocation: String(formData.get("pickupLocation") ?? "").trim(),
      dropoffLocation: String(formData.get("dropoffLocation") ?? "").trim(),
      pickupDate: String(formData.get("pickupDate") ?? "").trim(),
      pickupTime: String(formData.get("pickupTime") ?? "").trim(),
      passengers: String(formData.get("passengers") ?? "").trim(),
      luggage: String(formData.get("luggage") ?? "").trim(),
      childSeat: String(formData.get("childSeat") ?? "").trim(),
      flightNumber: String(formData.get("flightNumber") ?? "").trim(),
      additionalDetails: String(formData.get("additionalDetails") ?? "").trim(),
      consent: formData.get("consent") === "on",
    };

    if (!payload.consent) {
      setSubmitState("error");
      setMessage("Please confirm the provider-sharing notice before submitting.");
      return;
    }

    setSubmitState("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/transfer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as { error?: string; message?: string };

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong while sending your request.");
      }

      form.reset();
      setFormInstanceKey((current) => current + 1);
      setSubmitState("success");
      setMessage(
        result.message ||
          "Your request has been sent. Please check your email for confirmation."
      );
    } catch (error) {
      setSubmitState("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while sending your request."
      );
    }
  }

  return (
    <div className="mt-14 rounded-[1.8rem] border border-[#fcfcfc] bg-white px-5 py-8 shadow-[0_18px_40px_rgba(99,78,50,0.08)] sm:px-8 sm:py-10 lg:px-10">
      <div className="text-center">
        <p className="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-[#f26d21] sm:text-[0.9rem]">
          Private Transfers <span aria-hidden="true">&middot;</span> Enquiry
        </p>
        <h2 className="mt-3 text-[2rem] font-bold leading-tight text-[#1d2435] sm:text-[2.6rem]">
          Transfer Request Form
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm italic leading-7 text-[#8b8782] sm:text-[1rem]">
          Fill in the details below and we&apos;ll email you availability and a
          price to confirm.
        </p>
      </div>

      <form
        key={formInstanceKey}
        className="mt-8 sm:mt-10"
        onSubmit={handleSubmit}
      >
        <div className="grid gap-x-4 gap-y-5 md:grid-cols-2 md:gap-x-6 md:gap-y-6">
          <div>
            <FieldLabel>Full Name</FieldLabel>
            <TextInput
              name="fullName"
              placeholder="Your full name"
              required
            />
          </div>
          <div>
            <FieldLabel>Email Address</FieldLabel>
            <TextInput
              name="email"
              placeholder="you@email.com"
              type="email"
              required
            />
          </div>
          <div>
            <FieldLabel>Phone / WhatsApp Number</FieldLabel>
            <TextInput
              name="phone"
              placeholder="+ country code"
              required
            />
          </div>
          <div>
            <FieldLabel>Type of Transfer</FieldLabel>
            <SelectInput
              name="transferType"
              placeholder="Select transfer type"
              options={transferTypeHints}
              hints={transferTypeHints}
              required
            />
          </div>
          <div>
            <FieldLabel>Pick-Up Location</FieldLabel>
            <TextInput
              name="pickupLocation"
              placeholder="Hotel, airport or address"
              required
            />
          </div>
          <div>
            <FieldLabel>Drop-Off Location</FieldLabel>
            <TextInput
              name="dropoffLocation"
              placeholder="Hotel, airport or address"
              required
            />
          </div>
          <div>
            <FieldLabel>Pick-Up Date</FieldLabel>
            <TransferDatePicker
              name="pickupDate"
              placeholder="DD / MM / YYYY"
            />
          </div>
          <div>
            <FieldLabel>Pick-Up Time</FieldLabel>
            <TransferTimePicker
              name="pickupTime"
              placeholder="--:--"
            />
          </div>
          <div>
            <FieldLabel>Number of Passengers</FieldLabel>
            <TextInput
              name="passengers"
              placeholder="e.g. 2"
              required
            />
          </div>
          <div>
            <FieldLabel>Luggage</FieldLabel>
            <SelectInput
              name="luggage"
              placeholder="Select amount"
              options={luggageHints}
              hints={luggageHints}
              required
            />
          </div>
          <div>
            <FieldLabel>Child Seat Required?</FieldLabel>
            <SelectInput
              name="childSeat"
              placeholder="Select option"
              options={childSeatHints}
              hints={childSeatHints}
            />
          </div>
          <div>
            <FieldLabel>Flight Number</FieldLabel>
            <TextInput
              name="flightNumber"
              placeholder="e.g. MK015"
            />
          </div>
          <div className="md:col-span-2">
            <FieldLabel>Additional Details</FieldLabel>
            <textarea
              name="additionalDetails"
              placeholder="Anything else we should know - stops, timings, special requests..."
              className="min-h-[110px] w-full rounded-md border border-[#dfd4c7] bg-white px-4 py-3 text-sm text-[#384255] placeholder:text-[#9a938f] focus:border-[#f26d21] focus:outline-none"
            />
          </div>
        </div>

        <label className="mt-6 flex items-start gap-3 text-sm leading-6 text-[#6a7387]">
          <input
            name="consent"
            type="checkbox"
            required
            className="mt-1 h-10 w-10 rounded border border-[#d8ccbf] accent-[#f26d21]"
          />
          <span>
            I understand that Mauritius Explored will share my request with an
            independent transfer provider, and that all bookings, prices and
            services are managed directly by the provider.
          </span>
        </label>

        {message ? (
          <div
            className={`mt-6 rounded-2xl px-4 py-3 text-sm ${
              submitState === "success"
                ? "bg-[#ecf8f2] text-[#246548]"
                : "bg-[#fff1eb] text-[#9c4720]"
            }`}
          >
            {message}
          </div>
        ) : null}

        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            disabled={submitState === "submitting"}
            className="inline-flex min-h-[52px] w-full max-w-[320px] items-center justify-center gap-3 rounded-2xl bg-[#f26d21] px-6 py-3 text-base font-bold text-white shadow-[0_12px_26px_rgba(242,109,33,0.28)] transition-colors hover:bg-[#e96217] disabled:cursor-not-allowed disabled:opacity-70"
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
            {submitState === "submitting"
              ? "Sending Request..."
              : "Request Transfer Quote"}
          </button>
        </div>
      </form>
    </div>
  );
}
