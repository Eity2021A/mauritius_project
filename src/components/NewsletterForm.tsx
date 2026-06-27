"use client";

import { useState, useTransition } from "react";
import { subscribeToNewsletter } from "@/lib/actions";

interface NewsletterFormProps {
  source?: string;
}

export default function NewsletterForm({ source = "blog" }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    startTransition(async () => {
      const result = await subscribeToNewsletter(email, source);
      if (result.success) {
        setMessage({ type: "success", text: "You're subscribed! Welcome aboard." });
        setEmail("");
      } else {
        setMessage({ type: "error", text: result.error ?? "Something went wrong." });
      }
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
        <label htmlFor="newsletter-email" className="sr-only">Email address</label>
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          disabled={isPending}
          className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[48px] bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition-colors disabled:opacity-50"
        >
          {isPending ? (
            <>
              <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
              <span>Subscribing…</span>
            </>
          ) : (
            "Subscribe"
          )}
        </button>
      </form>
      {message && (
        <p
          className={`mt-3 text-sm text-center ${
            message.type === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {message.text}
        </p>
      )}
    </div>
  );
}
