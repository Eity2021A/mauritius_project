"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

const OSRM_BASE = "https://router.project-osrm.org/route/v1/driving";

async function computeRouteTotals(
  stops: { lat: number; lng: number }[]
): Promise<{ km: number; min: number } | null> {
  if (stops.length < 2) return null;
  try {
    const coords = stops.map((s) => `${s.lng},${s.lat}`).join(";");
    const res = await fetch(`${OSRM_BASE}/${coords}?overview=false&steps=false`);
    if (!res.ok) return null;
    const data = await res.json();
    const legs = data?.routes?.[0]?.legs;
    if (!Array.isArray(legs)) return null;
    return {
      km: Math.round(legs.reduce((s: number, l: { distance: number }) => s + l.distance, 0) / 100) / 10,
      min: Math.round(legs.reduce((s: number, l: { duration: number }) => s + l.duration, 0) / 60),
    };
  } catch {
    return null;
  }
}

export interface SaveItineraryInput {
  title: string;
  stops: {
    type: string;
    slug: string;
    name: string;
    lat: number;
    lng: number;
    image: string;
    dayNumber: number;
    stopOrder: number;
  }[];
  tripStart?: string;
  tripEnd?: string;
  startName?: string;
  startLat?: number;
  startLng?: number;
  isPublic?: boolean;
  /** Explicit cover image override. Falls back to stops[0].image when omitted. */
  coverImage?: string | null;
}

export interface SaveResult {
  ok: boolean;
  itineraryId?: string;
  error?: string;
}

export async function saveItinerary(input: SaveItineraryInput): Promise<SaveResult> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Not signed in" };

  const slug = `${input.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}-${Date.now().toString(36)}`;
  const coverImage = input.coverImage !== undefined ? input.coverImage : (input.stops[0]?.image ?? null);

  const { data: itinerary, error: itinError } = await supabase
    .from("user_itineraries")
    .insert({
      user_id: user.id,
      title: input.title,
      slug,
      trip_start: input.tripStart || null,
      trip_end: input.tripEnd || null,
      start_name: input.startName || null,
      start_lat: input.startLat ?? null,
      start_lng: input.startLng ?? null,
      is_public: input.isPublic ?? false,
      cover_image: coverImage,
    })
    .select("id")
    .single();

  if (itinError || !itinerary) {
    return { ok: false, error: itinError?.message ?? "Failed to create itinerary" };
  }

  if (input.stops.length > 0) {
    const rows = input.stops.map((s) => ({
      itinerary_id: itinerary.id,
      day_number: s.dayNumber,
      stop_order: s.stopOrder,
      item_type: s.type,
      item_slug: s.slug,
      name: s.name,
      latitude: s.lat,
      longitude: s.lng,
      image: s.image,
    }));

    const { error: stopsError } = await supabase
      .from("itinerary_stops")
      .insert(rows);

    if (stopsError) {
      await supabase.from("user_itineraries").delete().eq("id", itinerary.id);
      return { ok: false, error: stopsError.message };
    }
  }

  const totals = await computeRouteTotals(input.stops);
  if (totals) {
    await supabase
      .from("user_itineraries")
      .update({ total_distance_km: totals.km, total_duration_min: totals.min })
      .eq("id", itinerary.id);
  }

  revalidatePath("/my-trips");
  revalidatePath("/itineraries-mauritius");
  return { ok: true, itineraryId: itinerary.id };
}

export interface SavedItinerary {
  id: string;
  title: string;
  slug: string;
  stop_count: number;
  trip_start: string | null;
  trip_end: string | null;
  cover_image: string | null;
  is_public: boolean;
  is_anonymous: boolean;
  created_at: string;
  updated_at: string;
}

export async function getMyItineraries(): Promise<SavedItinerary[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("user_itineraries")
    .select("id, title, slug, stop_count, trip_start, trip_end, cover_image, is_public, is_anonymous, created_at, updated_at, is_featured")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false });

  if (error || !data) return [];
  return data.filter((row) => !row.is_featured);
}

export interface SavedItineraryWithStops extends SavedItinerary {
  stops: {
    id: string;
    day_number: number;
    stop_order: number;
    item_type: string;
    item_slug: string;
    name: string;
    latitude: number;
    longitude: number;
    image: string;
    notes: string | null;
  }[];
}

export async function getItineraryById(id: string): Promise<SavedItineraryWithStops | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("user_itineraries")
    .select(`
      id, title, slug, stop_count, trip_start, trip_end, cover_image,
      is_public, is_anonymous, created_at, updated_at,
      itinerary_stops (
        id, day_number, stop_order, item_type, item_slug,
        name, latitude, longitude, image, notes
      )
    `)
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (error || !data) return null;

  return {
    ...data,
    stops: ((data.itinerary_stops as SavedItineraryWithStops["stops"]) ?? []).sort(
      (a, b) => a.day_number - b.day_number || a.stop_order - b.stop_order
    ),
  };
}

export async function updateItinerary(
  id: string,
  input: SaveItineraryInput
): Promise<SaveResult> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Not signed in" };

  const { data: existing } = await supabase
    .from("user_itineraries")
    .select("is_featured")
    .eq("id", id)
    .eq("user_id", user.id)
    .maybeSingle();

  if (existing?.is_featured) {
    return { ok: false, error: "Featured itineraries cannot be edited" };
  }

  const coverImage = input.coverImage !== undefined ? input.coverImage : (input.stops[0]?.image ?? null);

  const { error: itinError } = await supabase
    .from("user_itineraries")
    .update({
      title: input.title,
      trip_start: input.tripStart || null,
      trip_end: input.tripEnd || null,
      start_name: input.startName || null,
      start_lat: input.startLat ?? null,
      start_lng: input.startLng ?? null,
      is_public: input.isPublic ?? false,
      cover_image: coverImage,
    })
    .eq("id", id)
    .eq("user_id", user.id);

  if (itinError) return { ok: false, error: itinError.message };

  const { error: delError } = await supabase
    .from("itinerary_stops")
    .delete()
    .eq("itinerary_id", id);

  if (delError) return { ok: false, error: delError.message };

  if (input.stops.length > 0) {
    const rows = input.stops.map((s) => ({
      itinerary_id: id,
      day_number: s.dayNumber,
      stop_order: s.stopOrder,
      item_type: s.type,
      item_slug: s.slug,
      name: s.name,
      latitude: s.lat,
      longitude: s.lng,
      image: s.image,
    }));

    const { error: stopsError } = await supabase
      .from("itinerary_stops")
      .insert(rows);

    if (stopsError) return { ok: false, error: stopsError.message };
  }

  const totals = await computeRouteTotals(input.stops);
  if (totals) {
    await supabase
      .from("user_itineraries")
      .update({ total_distance_km: totals.km, total_duration_min: totals.min })
      .eq("id", id);
  }

  revalidatePath("/my-trips");
  revalidatePath("/itineraries-mauritius");
  return { ok: true, itineraryId: id };
}

export async function savePreDesignedToMyTrips(
  slug: string,
  title: string,
  stops: SaveItineraryInput["stops"],
  coverImage?: string
): Promise<SaveResult> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Not signed in" };

  const mySlug = `${slug}-${user.id.slice(0, 8)}-${Date.now().toString(36)}`;

  const { data: itinerary, error: itinError } = await supabase
    .from("user_itineraries")
    .insert({
      user_id: user.id,
      title,
      slug: mySlug,
      is_public: false,
      is_featured: false,
      cover_image: coverImage || stops[0]?.image || null,
    })
    .select("id")
    .single();

  if (itinError || !itinerary) {
    return { ok: false, error: itinError?.message ?? "Failed to save" };
  }

  if (stops.length > 0) {
    const rows = stops.map((s) => ({
      itinerary_id: itinerary.id,
      day_number: s.dayNumber,
      stop_order: s.stopOrder,
      item_type: s.type,
      item_slug: s.slug,
      name: s.name,
      latitude: s.lat,
      longitude: s.lng,
      image: s.image,
    }));

    const { error: stopsError } = await supabase
      .from("itinerary_stops")
      .insert(rows);

    if (stopsError) {
      await supabase.from("user_itineraries").delete().eq("id", itinerary.id);
      return { ok: false, error: stopsError.message };
    }
  }

  const totals = await computeRouteTotals(stops);
  if (totals) {
    await supabase
      .from("user_itineraries")
      .update({ total_distance_km: totals.km, total_duration_min: totals.min })
      .eq("id", itinerary.id);
  }

  revalidatePath("/my-trips");
  revalidatePath("/itineraries-mauritius");
  return { ok: true, itineraryId: itinerary.id };
}

export async function ensureFeaturedItinerary(
  slug: string,
  title: string,
  stops?: SaveItineraryInput["stops"],
  coverImage?: string
): Promise<string | null> {
  const supabase = await createClient();

  const { data: existing } = await supabase
    .from("user_itineraries")
    .select("id")
    .eq("slug", slug)
    .eq("is_featured", true)
    .maybeSingle();

  if (existing) return existing.id;

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: created, error } = await supabase
    .from("user_itineraries")
    .insert({
      user_id: user.id,
      title,
      slug,
      is_public: true,
      is_featured: true,
      cover_image: coverImage || stops?.[0]?.image || null,
    })
    .select("id")
    .single();

  if (error || !created) return null;

  if (stops && stops.length > 0) {
    await supabase.from("itinerary_stops").insert(
      stops.map((s) => ({
        itinerary_id: created.id,
        day_number: s.dayNumber,
        stop_order: s.stopOrder,
        item_type: s.type,
        item_slug: s.slug,
        name: s.name,
        latitude: s.lat,
        longitude: s.lng,
        image: s.image,
      }))
    );
  }

  revalidatePath("/itineraries-mauritius");
  return created.id;
}

export async function rateItinerary(
  itineraryId: string,
  rating: number
): Promise<{ ok: boolean; error?: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Not signed in" };

  if (rating < 1 || rating > 5) return { ok: false, error: "Rating must be 1-5" };

  const { error } = await supabase
    .from("itinerary_ratings")
    .upsert(
      { itinerary_id: itineraryId, user_id: user.id, rating },
      { onConflict: "itinerary_id,user_id" }
    );

  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function getItineraryRating(
  itineraryId: string
): Promise<{ avgRating: number; count: number; userRating: number | null }> {
  const supabase = await createClient();

  const { data: itin } = await supabase
    .from("user_itineraries")
    .select("avg_rating, rating_count")
    .eq("id", itineraryId)
    .single();

  const { data: { user } } = await supabase.auth.getUser();
  let userRating: number | null = null;
  if (user) {
    const { data: existing } = await supabase
      .from("itinerary_ratings")
      .select("rating")
      .eq("itinerary_id", itineraryId)
      .eq("user_id", user.id)
      .maybeSingle();
    userRating = existing?.rating ?? null;
  }

  return {
    avgRating: Number(itin?.avg_rating ?? 0),
    count: itin?.rating_count ?? 0,
    userRating,
  };
}

export async function getFeaturedUpvotes(): Promise<Record<string, { id: string; count: number }>> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("user_itineraries")
    .select("id, slug, upvote_count")
    .eq("is_featured", true);
  if (!data) return {};
  const map: Record<string, { id: string; count: number }> = {};
  for (const row of data) {
    map[row.slug] = { id: row.id, count: row.upvote_count ?? 0 };
  }
  return map;
}

export async function toggleUpvote(
  itineraryId: string
): Promise<{ ok: boolean; upvoted: boolean; count: number; error?: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { ok: false, upvoted: false, count: 0, error: "Not signed in" };

  const { data: existing } = await supabase
    .from("itinerary_upvotes")
    .select("itinerary_id")
    .eq("itinerary_id", itineraryId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (existing) {
    await supabase
      .from("itinerary_upvotes")
      .delete()
      .eq("itinerary_id", itineraryId)
      .eq("user_id", user.id);
  } else {
    const { error } = await supabase
      .from("itinerary_upvotes")
      .insert({ itinerary_id: itineraryId, user_id: user.id });
    if (error) return { ok: false, upvoted: false, count: 0, error: error.message };
  }

  const { data: itin } = await supabase
    .from("user_itineraries")
    .select("upvote_count")
    .eq("id", itineraryId)
    .single();

  revalidatePath("/itineraries-mauritius");
  return { ok: true, upvoted: !existing, count: itin?.upvote_count ?? 0 };
}

export async function toggleItineraryPublic(
  id: string,
  isPublic: boolean,
  isAnonymous?: boolean
): Promise<{ ok: boolean; slug?: string; error?: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Not signed in" };

  const { data: check } = await supabase
    .from("user_itineraries")
    .select("is_featured")
    .eq("id", id)
    .eq("user_id", user.id)
    .maybeSingle();

  if (check?.is_featured) {
    return { ok: false, error: "Featured itineraries cannot be modified" };
  }

  const updatePayload: Record<string, unknown> = { is_public: isPublic };
  if (typeof isAnonymous === "boolean") {
    updatePayload.is_anonymous = isAnonymous;
  }
  if (!isPublic) {
    updatePayload.is_anonymous = false;
  }

  const { data, error } = await supabase
    .from("user_itineraries")
    .update(updatePayload)
    .eq("id", id)
    .eq("user_id", user.id)
    .select("slug")
    .single();

  if (error) return { ok: false, error: error.message };
  revalidatePath("/my-trips");
  revalidatePath("/itineraries-mauritius");
  return { ok: true, slug: data.slug };
}

export async function getPublicItinerary(
  slug: string
): Promise<(SavedItineraryWithStops & { upvote_count: number; author_name: string }) | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("user_itineraries")
    .select(`
      id, user_id, title, slug, stop_count, trip_start, trip_end, cover_image,
      is_public, is_anonymous, created_at, updated_at, upvote_count,
      itinerary_stops (
        id, day_number, stop_order, item_type, item_slug,
        name, latitude, longitude, image, notes
      )
    `)
    .eq("slug", slug)
    .eq("is_public", true)
    .single();

  if (error || !data) return null;

  let authorName = "Community User";
  if (!data.is_anonymous) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("display_name")
      .eq("id", data.user_id)
      .single();
    authorName = profile?.display_name || "Explorer";
  }

  return {
    ...data,
    upvote_count: data.upvote_count ?? 0,
    author_name: authorName,
    stops: ((data.itinerary_stops as SavedItineraryWithStops["stops"]) ?? []).sort(
      (a, b) => a.day_number - b.day_number || a.stop_order - b.stop_order
    ),
  };
}

export async function getSharedItinerary(
  slug: string
): Promise<(SavedItineraryWithStops & { upvote_count: number; author_name: string }) | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("user_itineraries")
    .select(`
      id, user_id, title, slug, stop_count, trip_start, trip_end, cover_image,
      is_public, is_anonymous, created_at, updated_at, upvote_count,
      itinerary_stops (
        id, day_number, stop_order, item_type, item_slug,
        name, latitude, longitude, image, notes
      )
    `)
    .eq("slug", slug)
    .single();

  if (error || !data) return null;

  let authorName = "Community User";
  if (!data.is_anonymous) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("display_name")
      .eq("id", data.user_id)
      .single();
    authorName = profile?.display_name || "Explorer";
  }

  return {
    ...data,
    upvote_count: data.upvote_count ?? 0,
    author_name: authorName,
    stops: ((data.itinerary_stops as SavedItineraryWithStops["stops"]) ?? []).sort(
      (a, b) => a.day_number - b.day_number || a.stop_order - b.stop_order
    ),
  };
}

export interface PublicItinerarySummary {
  id: string;
  title: string;
  slug: string;
  stop_count: number;
  cover_image: string | null;
  upvote_count: number;
  view_count: number;
  author_name: string;
  created_at: string;
  total_distance_km: number | null;
  total_duration_min: number | null;
}

export async function getPublicItineraries(): Promise<PublicItinerarySummary[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("user_itineraries")
    .select("id, user_id, title, slug, stop_count, cover_image, upvote_count, view_count, is_anonymous, created_at, total_distance_km, total_duration_min")
    .eq("is_public", true)
    .gte("stop_count", 2)
    .order("upvote_count", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(50);

  if (error || !data) return [];

  const nonAnonUserIds = [...new Set(
    data.filter((d) => !d.is_anonymous).map((d) => d.user_id)
  )];
  const { data: profiles } = nonAnonUserIds.length > 0
    ? await supabase.from("profiles").select("id, display_name").in("id", nonAnonUserIds)
    : { data: [] as { id: string; display_name: string | null }[] };

  const profileMap = new Map(
    (profiles ?? []).map((p) => [p.id, p.display_name || "Explorer"])
  );

  return data.map((item) => ({
    id: item.id,
    title: item.title,
    slug: item.slug,
    stop_count: item.stop_count,
    cover_image: item.cover_image,
    upvote_count: item.upvote_count ?? 0,
    view_count: item.view_count ?? 0,
    author_name: item.is_anonymous ? "Community User" : (profileMap.get(item.user_id) || "Explorer"),
    created_at: item.created_at,
    total_distance_km: item.total_distance_km ?? null,
    total_duration_min: item.total_duration_min ?? null,
  }));
}

export async function deleteItinerary(id: string): Promise<{ ok: boolean; error?: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Not signed in" };

  const { data: row } = await supabase
    .from("user_itineraries")
    .select("is_featured")
    .eq("id", id)
    .eq("user_id", user.id)
    .maybeSingle();

  if (row?.is_featured) {
    return { ok: false, error: "Featured itineraries cannot be deleted" };
  }

  const { error } = await supabase
    .from("user_itineraries")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) return { ok: false, error: error.message };
  revalidatePath("/my-trips");
  return { ok: true };
}

export async function incrementViewCount(slug: string): Promise<void> {
  const supabase = await createClient();
  await supabase.rpc("increment_view_count", { itinerary_slug: slug });
}
