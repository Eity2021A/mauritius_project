"use server";

import { createClient } from "@/lib/supabase/server";

export async function subscribeToNewsletter(
  email: string,
  source: string = "blog"
) {
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Please enter a valid email address." };
  }

  let supabase;
  try {
    supabase = await createClient();
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Server configuration error.";
    if (process.env.NODE_ENV === "development") {
      console.error("[subscribeToNewsletter] createClient failed:", msg);
    }
    return { error: "Newsletter signup is temporarily unavailable. Please try again later." };
  }

  const normalized = { email: email.toLowerCase().trim(), source };
  const { error } = await supabase.from("subscribers").insert(normalized);

  if (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("[subscribeToNewsletter] Supabase error:", error.code, error.message);
    }
    if (error.code === "23505") {
      return { error: "You're already subscribed!" };
    }
    return { error: "Something went wrong. Please try again." };
  }

  return { success: true };
}

export async function submitGiveawayEntry(data: {
  fullName: string;
  email: string;
  country: string;
  sharedFacebook: boolean;
  sharedInstagram: boolean;
  agreedToTerms: boolean;
  giveawaySlug?: string;
}) {
  if (!data.fullName?.trim() || !data.email?.trim() || !data.country?.trim()) {
    return { error: "Please fill in all required fields." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return { error: "Please enter a valid email address." };
  }
  if (!data.sharedFacebook || !data.sharedInstagram) {
    return { error: "Please confirm you've shared on both platforms." };
  }
  if (!data.agreedToTerms) {
    return { error: "Please agree to the Terms & Conditions to enter." };
  }

  let supabase;
  try {
    supabase = await createClient();
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Server configuration error.";
    if (process.env.NODE_ENV === "development") {
      console.error("[submitGiveawayEntry] createClient failed:", msg);
    }
    return { error: "Giveaway entry is temporarily unavailable. Please try again later." };
  }

  const { error } = await supabase.from("giveaway_entries").insert({
    full_name: data.fullName.trim(),
    email: data.email.toLowerCase().trim(),
    country: data.country.trim(),
    shared_facebook: data.sharedFacebook,
    shared_instagram: data.sharedInstagram,
    agreed_to_terms: true,
    giveaway_slug: data.giveawaySlug ?? "default",
  });

  if (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("[submitGiveawayEntry] Supabase error:", error.code, error.message);
    }
    if (error.code === "23505") {
      return { error: "You've already entered this giveaway!" };
    }
    return { error: "Something went wrong. Please try again." };
  }

  return { success: true };
}
