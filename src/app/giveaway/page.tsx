"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getImageUrl } from "@/lib/image-url";
import { GIVEAWAY_FEATURE_IMAGE } from "@/lib/giveaway-assets";
import { submitGiveawayEntry } from "@/lib/actions";
import { COUNTRY_OPTIONS } from "@/lib/countries";
import { Trophy } from "lucide-react";

const GIVEAWAY_SLUG = "weekend-experiences-2026";

const PRIZE_ROUNDS: { date: string; prize: string }[] = [
  { date: "7th June 2026", prize: "Weekend at Shangri-La Le Touessrok" },
];

export default function GiveawayPage() {
  const [country, setCountry] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [sharedFacebook, setSharedFacebook] = useState(false);
  const [sharedInstagram, setSharedInstagram] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [shareUrl, setShareUrl] = useState("");
  const [igCopied, setIgCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setShareUrl(`${window.location.origin}/giveaway`);
  }, []);

  const openFacebookShare = () => {
    const u = shareUrl || `${typeof window !== "undefined" ? window.location.origin : ""}/giveaway`;
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(u)}`,
      "_blank",
      "noopener,noreferrer,width=600,height=520"
    );
  };

  const shareToInstagram = async () => {
    const u = shareUrl || `${typeof window !== "undefined" ? window.location.origin : ""}/giveaway`;
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "Mauritius Explored Giveaway",
          text: "Enter the Mauritius Explored giveaway for a chance to win unforgettable experiences!",
          url: u,
        });
        return;
      } catch {
        /* dismissed or failed */
      }
    }
    try {
      await navigator.clipboard.writeText(u);
      setIgCopied(true);
      window.setTimeout(() => setIgCopied(false), 4500);
    } catch {
      window.prompt("Copy this link to share on Instagram:", u);
    }
    window.open("https://www.instagram.com/", "_blank", "noopener,noreferrer");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setIsSubmitting(true);

    try {
      const result = await submitGiveawayEntry({
        fullName,
        email,
        country,
        sharedFacebook,
        sharedInstagram,
        agreedToTerms,
        giveawaySlug: GIVEAWAY_SLUG,
      });

      if (result.success) {
        setSubmitted(true);
        setCountry("");
        setFullName("");
        setEmail("");
        setSharedFacebook(false);
        setSharedInstagram(false);
        setAgreedToTerms(false);
      } else {
        setErrorMsg(result.error ?? "Something went wrong.");
      }
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main id="main-content" className="min-h-screen bg-white">
      <Navbar />

      <section className="relative h-[44vh] min-h-[280px]">
        <Image
          src={getImageUrl(GIVEAWAY_FEATURE_IMAGE, { width: 1600, quality: 80 })}
          alt="Win a weekend in Mauritius — Mauritius Explored giveaway"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center px-4 max-w-4xl mx-auto translate-y-[2rem]">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">Giveaway</h1>
            <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-white/95 mb-3">
              Your Chance to Win Unforgettable Experiences
            </p>
            <p className="text-white/90 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Enter our exclusive giveaway for a chance to win incredible prizes. From luxury experiences to
              unforgettable stays, this is your opportunity to elevate your next escape. You don&apos;t want to miss
              it.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-10 md:py-12 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-gray-900 mb-8">
            <p className="text-lg md:text-xl font-medium">
              Draw on <strong className="text-orange-600">7th June 2026</strong> (Mauritius time)
            </p>
            <p className="text-gray-600 text-sm mt-2">
              Simply enter your details below, re-share on Facebook or Instagram, and you could be our lucky winner.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center text-gray-900 text-xl md:text-2xl font-bold mb-6">
              This week&apos;s giveaway (for 2 people)
            </h2>
            <ul className="max-w-2xl mx-auto">
              {PRIZE_ROUNDS.map((row) => (
                <li
                  key={`${row.date}-${row.prize}`}
                  className="flex items-center gap-4 md:gap-5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl px-6 py-6 md:px-8 md:py-8 text-left text-white shadow-md border border-orange-400/30 min-h-[5.5rem] md:min-h-[6.5rem]"
                >
                  <Trophy
                    className="h-7 w-7 md:h-8 md:w-8 shrink-0 text-white/95"
                    strokeWidth={2}
                    aria-hidden
                  />
                  <span className="min-w-0 leading-snug text-base md:text-lg">
                    <span className="font-semibold text-white">{row.date}</span>
                    <span className="text-white/85 mx-2 sm:mx-2.5">·</span>
                    <span className="text-white">{row.prize}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-10">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 text-center">Enter the giveaway</h3>
              <p className="text-center text-gray-600 text-sm mb-8 max-w-xl mx-auto">
                Complete the form, confirm your social shares, and agree to the terms. One entry per person.
              </p>

              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-bold text-green-700 mb-2">Entry submitted</h4>
                  <p className="text-green-700 leading-relaxed">
                    Thank you for participating! Weekly draws run from 19 April — we&apos;ll contact winners by email or
                    social media. Good luck!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                      Full name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Your full name"
                      required
                      autoComplete="name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                      Country <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors bg-white text-gray-900"
                    >
                      <option value="">Select your country</option>
                      {COUNTRY_OPTIONS.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      required
                      autoComplete="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    />
                  </div>

                  <div className="bg-slate-50 rounded-xl p-5 md:p-6 space-y-4 border border-slate-100">
                    <h4 className="font-semibold text-gray-900 flex flex-wrap items-center gap-2">
                      <span>Share this giveaway</span>
                    </h4>
                    <p className="text-sm text-gray-600">
                      Open the share links below, then confirm underneath that you&apos;ve posted and tagged Mauritius
                      Explored.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={openFacebookShare}
                        className="inline-flex items-center gap-2 rounded-lg bg-[#1877F2] px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-[#166fe5] transition-colors"
                      >
                        <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                        Share on Facebook
                      </button>
                      <button
                        type="button"
                        onClick={shareToInstagram}
                        className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#f09433] via-[#e6683c] to-[#dc2743] px-4 py-2.5 text-sm font-semibold text-white shadow hover:opacity-95 transition-opacity"
                      >
                        <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                        </svg>
                        Share on Instagram
                      </button>
                    </div>
                    {igCopied && (
                      <p className="text-sm text-emerald-700 font-medium" role="status">
                        Link copied — paste it into your Instagram story, reel, or bio, then tag @mauritius__explored.
                      </p>
                    )}
                  </div>

                  <div className="bg-blue-50 rounded-lg p-6 space-y-4 border border-blue-100/80">
                    <h4 className="font-semibold text-gray-900 mb-1 flex items-center gap-3 flex-wrap">
                      <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                      <svg className="w-5 h-5 text-[#E1306C]" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                      </svg>
                      Confirm your social posts
                    </h4>
                    <p className="text-sm text-gray-600">
                      To participate, share <strong>mauritiusexplored.com</strong> and tag <strong>Mauritius Explored</strong>{" "}
                      as described below.
                    </p>

                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={sharedFacebook}
                        onChange={(e) => setSharedFacebook(e.target.checked)}
                        required
                        className="mt-1 w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-gray-900">
                        I have shared <strong>mauritiusexplored.com</strong> on Facebook and tagged{" "}
                        <strong>@MauritiusExplored</strong>
                      </span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={sharedInstagram}
                        onChange={(e) => setSharedInstagram(e.target.checked)}
                        required
                        className="mt-1 w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-gray-900">
                        I have shared <strong>mauritiusexplored.com</strong> on Instagram and tagged{" "}
                        <strong>@mauritius__explored</strong>
                      </span>
                    </label>
                  </div>

                  <div className="rounded-lg border border-gray-200 bg-gray-50/80 p-5 space-y-3">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                        required
                        className="mt-1 w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                      />
                      <span className="text-sm text-gray-700">
                        I agree to the{" "}
                        <Link href="/giveaway/terms" className="text-orange-600 font-medium hover:underline">
                          Terms &amp; Conditions
                        </Link>{" "}
                        of this giveaway.
                      </span>
                    </label>
                    <p className="text-xs text-gray-600 pl-8 leading-relaxed">
                      By participating in this giveaway, you confirm that you have read and agree to our{" "}
                      <Link href="/giveaway/terms" className="text-orange-600 hover:underline">
                        Terms &amp; Conditions
                      </Link>
                      .
                    </p>
                  </div>

                  {errorMsg && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center text-red-700 text-sm">
                      {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-lg font-semibold py-4 px-8 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin shrink-0" />
                        <span>Submitting…</span>
                      </>
                    ) : (
                      "Submit entry"
                    )}
                  </button>

                  <p className="text-center text-sm text-gray-500">
                    By submitting, you agree to our{" "}
                    <Link href="/giveaway/terms" className="text-orange-600 font-medium hover:underline">
                      Terms and conditions
                    </Link>
                    .
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
