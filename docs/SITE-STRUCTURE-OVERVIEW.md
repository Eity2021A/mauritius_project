# Mauritius Explored – Website Structure Overview

This document describes how the site is structured: main data sources (places, activities, beaches), routes, and where image paths come from so you can reason about content and assets in one place.

---

## 1. High-level architecture

- **Framework:** Next.js 16 (App Router).
- **Content:** All main content is in **TypeScript data files** under `src/data/`. No CMS; adding a place, activity, or beach means editing these files and uploading images to **Supabase Storage** (see `docs/IMAGES.md`).
- **Images:** Served from **Supabase Storage only**. Paths in data are absolute from site root, e.g. `/images/beaches/...` or `/images/places-to-visit/...`. `getImageUrl()` rewrites these to the Supabase bucket URL. Do not store content images in the repo or on Vercel.
- **Static generation:** Most listing and detail pages use `generateStaticParams()` and are built at deploy time. Adding a new place/activity/beach and deploying will generate the new page and include it in the sitemap.

---

## 2. Main data sources

### 2.1 Places (to visit)

| What | File | Key export | Image field |
|------|------|------------|-------------|
| Full place records (detail page content) | `src/data/place-details.ts` | `PLACE_DETAILS` (Record<slug, PlaceDetails>) | `place.images: string[]` |
| Helpers | same file | `getPlaceBySlug(slug)`, `getAllPlaceSlugs()`, `getAllPlaces()`, `getPlacesByCategory(cat)`, `getPlacesByRegion(region)` | — |

- **PlaceDetails:** `slug`, `name`, `region`, `categories`, `tagline`, `description[]`, `tips[]`, **`images[]`** (array of `/images/...` paths), `info` (location, openHours, admission, bestTime).
- **Used by:** Best Places listing, **place detail pages** (under `/top-activities-mauritius/[slug]`), itinerary (stop details), sitemap, blog links.
- **Image usage:** Hero = first image; gallery = full `images` array. All paths point under `public/images/places-to-visit/<place-folder>/`.

---

### 2.2 Activities

| What | File | Key export | Image field |
|------|------|------------|-------------|
| List view (cards, filters) | `src/data/activities.ts` | `ACTIVITIES` (Activity[]), `ACTIVITY_CATEGORIES`, `getActivitiesByCategory`, `getFeaturedActivities` | `activity.image: string` (single) |
| Detail view (full page) | `src/data/activity-details.ts` | `ACTIVITY_DETAILS` (Record<slug, ActivityDetails>), `getActivityDetailsBySlug(slug)`, `getAllActivitySlugs()`, `getRelatedActivities(slug)` | `activity.images: string[]` |

- **Activity (list):** `slug`, `name`, **`image`** (one path), `description`, `categories`, `price?`, `featured?`.
- **ActivityDetails (detail):** `slug`, `name`, `tagline`, `description[]`, `highlights[]`, `tips[]`, **`images[]`**, `pricing?`, `duration`, `location`, etc.
- **Used by:** Mauritius Activities listing (`/mauritius-activities`), **activity detail pages** (same route as places: `/top-activities-mauritius/[slug]`), itinerary pool, sitemap, homepage marquee.
- **Image usage:** List = single `image`; detail = hero + gallery from `images[]`. Paths are `/images/places-to-visit/...` (shared with places), served from Supabase.

---

### 2.3 Beaches

| What | File | Key export | Image field |
|------|------|------------|-------------|
| List by region + top beaches | `src/data/beaches.ts` | `TOP_BEACHES`, `BEACHES_BY_REGION`, `REGIONS`, types `Beach`, `Region` | `beach.image: string` (one per beach in list) |
| Detail view (full page) | `src/data/beach-details.ts` | `BEACH_DETAILS` (Record<slug, BeachDetails>), `getBeachBySlug(slug)`, `getAllBeachSlugs()`, `getBeachesByRegion(region)` | `beach.images: string[]` |

- **Beach (list):** `name`, `slug`, **`image`**, `description` (from `BEACHES_BY_REGION`).
- **BeachDetails (detail):** `slug`, `name`, `number`, `region`, `tagline`, `description[]`, `tips[]`, **`images[]`**, `info` (location, snorkeling, amenities, etc.).
- **Used by:** Beaches listing (`/beaches-in-mauritius`), **beach detail pages** (`/beaches-in-mauritius/[slug]`), itinerary (predesigned + pool), about/maps, sitemap, blog links.
- **Image usage:** List = single `image` from `beaches.ts`; detail = hero + gallery from `beach-details.ts` `images[]`. Paths are `/images/beaches/<beach-folder>/...`, served from Supabase.

---

### 2.4 Other data files (reference)

| File | Purpose |
|------|--------|
| `home.ts` | Homepage: `POPULAR_DESTINATIONS`, `SERVICES`, `STATS` – each with `image` paths. |
| `itinerary.ts` | Itinerary map pins: `ITINERARY_BEACHES`, `ITINERARY_ACTIVITIES`, `ITINERARY_NATURE` (names, slugs, positions; no images). |
| `itinerary-pool.ts` | Custom itinerary: merged pool of beaches, activities, nature, places; images from `BEACHES_BY_REGION`, `ACTIVITIES`, `PLACE_DETAILS` or fallback. |
| `predesigned-itineraries.ts` | Pre-designed routes: each has `image` (card) and stops with `image` per stop. |
| `blog.ts` | Blog posts (used by blog listing and `[slug]`). |
| `beach-details.ts` | As above – beach detail content and `images[]`. |

---

## 3. Routes and which data they use

| Route | Data source(s) | How images are used |
|-------|----------------|---------------------|
| `/` | `home.ts` (POPULAR_DESTINATIONS, SERVICES), HeroSlideshow, PhotoMosaic, FeaturedDestinationsMarquee | Destinations & services: `image`; marquee uses activity/place images. |
| `/best-places-to-visit-in-mauritius` | `place-details.ts` (`getAllPlaces()`, category/region filter) | Card = `place.images[0]` (Next `Image`). |
| `/top-activities-mauritius/[slug]` | **Places:** `getPlaceBySlug` from `place-details.ts`. **Activities:** `getActivityDetailsBySlug` from `activity-details.ts`. Params = `getAllPlaceSlugs()` ∪ `getAllActivitySlugs()`. | Place: hero `images[0]`, gallery `images`, related place cards. Activity: same pattern. All paths from the corresponding detail record. |
| `/beaches-in-mauritius` | `beaches.ts` (TOP_BEACHES, BEACHES_BY_REGION, REGIONS) | Card = `beach.image` (from `BEACHES_BY_REGION`). |
| `/beaches-in-mauritius/[slug]` | `beach-details.ts` (`getBeachBySlug`, `getAllBeachSlugs()`) | Hero = `beach.images[0]`, gallery = `beach.images`. |
| `/mauritius-activities` | `activities.ts` (ACTIVITIES, categories), `activity-details.ts` (getAllActivitySlugs for links) | Card = `activity.image`. |
| `/mauritius-activities/[slug]` | Dynamic route; activity detail from `activity-details.ts`. | Same as activity half of `/top-activities-mauritius/[slug]`. |
| `/itinerary` | `predesigned-itineraries.ts`, `itinerary-pool.ts`, `place-details.ts`, `beaches.ts`, `activities.ts` | Card = itinerary `image`; stop list = stop `image`; expanded = `getPlaceBySlug`/beach/activity images. |
| `/about/maps` | `itinerary.ts`, `beaches.ts` | Map pins + beach list; some images from BEACH_IMAGES / beach data. |
| `/sitemap.xml` | `getAllPlaceSlugs()`, `getAllActivitySlugs()`, `BEACHES_BY_REGION`, blog | No images; URL list only. |

---

## 4. Where image requests come from (summary)

- **`/images/places-to-visit/...`**  
  - **From:** `place-details.ts` (`images[]`), `activity-details.ts` (`images[]`), `activities.ts` (`image`), `home.ts` (destinations, services), itinerary (place/activity stops and pool), best-places listing.  
  - **Rendered on:** Home, Best Places, Top Activities/Place detail pages, Mauritius Activities, Itinerary, About maps (if any place images used).

- **`/images/beaches/...`**  
  - **From:** `beaches.ts` (`Beach.image`), `beach-details.ts` (`images[]`), `predesigned-itineraries.ts` (beach stops), itinerary pool.  
  - **Rendered on:** Beaches listing, beach detail pages, itinerary (stops + map).

- **`/images/itinerary/...`**  
  - **From:** `predesigned-itineraries.ts` (card image per route).  
  - **Rendered on:** Itinerary page (pre-designed cards).

- **`/images/banners/...`**  
  - **From:** Fallback in `itinerary-pool.ts` when a place/activity has no image.  
  - **Rendered on:** Itinerary (custom builder pool).

- **Other:** `blog`, `mosaic`, `festivals`, `avatar`, SVGs (logo, etc.) – used by homepage, blog, and global UI.

All of these are **static assets**: the browser requests them by path; Next.js serves files from `public/`. So every path in the tables above must exist under `public/` (e.g. `public/images/places-to-visit/coloured-earth/coloured-earth-1.jpg`) or the image will 404.

---

## 5. Data → URL contract

- **Places:** A place exists for the site iff it has an entry in `PLACE_DETAILS`. Its detail page is **only** at `/top-activities-mauritius/<slug>`. `getAllPlaceSlugs()` drives static generation and sitemap.
- **Activities:** Same idea: entry in `ACTIVITY_DETAILS` → same URL pattern `/top-activities-mauritius/<slug>`. `getAllActivitySlugs()` for build and sitemap.
- **Beaches:** Entry in `BEACH_DETAILS` (beach-details.ts) → `/beaches-in-mauritius/<slug>`. List comes from `BEACHES_BY_REGION` (beaches.ts); for a beach to appear in the list **and** have a detail page, it must be in both `BEACHES_BY_REGION` and `BEACH_DETAILS` (same slug).

So: **one slug = one canonical URL**. Adding a new “place” means: add to `place-details.ts`, add images under `public/images/places-to-visit/<slug>/`, deploy.

---

## 6. Quick reference: adding or fixing content

| Goal | Where to edit | Images to add |
|------|----------------|---------------|
| New place (e.g. “Seven Coloured Earth”) | `place-details.ts`: new key in `PLACE_DETAILS` | `public/images/places-to-visit/<slug>/` and reference in `images[]` |
| New activity | `activities.ts` (card) + `activity-details.ts` (detail) | Same slug in both; images in `places-to-visit/` or dedicated folder; set `image` and `images[]` |
| New beach | `beaches.ts` (list, one `image`) + `beach-details.ts` (detail, `images[]`) | `public/images/beaches/<slug>/` |
| New itinerary card image | `predesigned-itineraries.ts` | `public/images/itinerary/<name>.jpg` |
| Homepage destinations/services | `home.ts` | Any folder under `public/images/`; paths in `POPULAR_DESTINATIONS` / `SERVICES` |

If a page or gallery is missing an image on the deployed site, the path is almost certainly either (1) not in the repo under `public/`, or (2) not included in the corresponding data array (`images[]` or `image`) so it’s never requested.

---

*Generated as a static overview of the mauritius-explored codebase.*
