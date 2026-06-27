# Optimization Review – Mauritius Explored

**Date:** 2026-02  
**Scope:** Codebase review for performance and bundle size; ensure page load stays fast.

---

## Where the “+4000 lines” came from

The **+4064 / +7721 lines** you saw in the diff is from a **broad set of changes**, not from the recent small UI edits (filters, badges, footer, etc.):

- **852 files changed** in that diff (many are images, thumbnails, and new assets).
- **`src/data/place-details.ts`** alone is **~1,457 lines** (place content for 55+ places).
- Other large additions: new pages (e.g. `top-activities-mauritius/[slug]`, blog, SEO/JsonLd), new components (Instagram feed, PhotoGallery, HeroSlideshow), and sitemap/redirects.

So the line count is mostly **new features and data**, not bloat from the recent filter/search/footer tweaks.

---

## What’s already in good shape

1. **Dynamic imports (code splitting)**  
   Heavy or below-the-fold UI is loaded on demand:
   - **Home:** `FeaturedDestinationsMarquee`, `InstagramFeed` (with loading skeleton).
   - **Beaches:** `MauritiusMap` (and thus Leaflet) only when the map is used.
   - **Places/activities:** `PhotoGallery` loaded via `PhotoGalleryWrapper`.
   - **Leaflet:** `MapContainer`, `TileLayer`, `Marker`, `Popup` and Leaflet itself are dynamically imported in `MauritiusMap.tsx`.

2. **Images**  
   - `next/image` with AVIF/WebP in `next.config.ts`.  
   - Thumbnails used on listing pages; hero images use `priority` where needed; others use `loading="lazy"` and sensible `sizes`.

3. **Filtering on Best Places**  
   - `filteredPlaces` is computed in `useMemo` (only recomputes when category/region/search change).  
   - No unnecessary re-fetch or re-processing on every render.

4. **Fonts**  
   - Google fonts (Poppins, Water Brush) with `display: "swap"` to avoid blocking render.

5. **Build**  
   - `npm run build` completes successfully; static/SSG pages are pre-rendered; no heavy runtime work on the critical path.

---

## Optional future optimizations

1. **Place data for the listing page**  
   The “Best Places” listing page imports `getAllPlaces` from `place-details.ts`, so the **full** place data (descriptions, tips, full image lists) is in that page’s client bundle. The listing only needs: `slug`, `name`, `region`, `categories`, `tagline`, and one image.  
   - **Idea:** Add a small **place-summaries** module (e.g. generated from `place-details` in a build step) and have the listing page use only that.  
   - **Trade-off:** Requires a codegen script and keeping it in sync with `place-details`. Worth it if you later add many more places or notice the listing page bundle growing.

2. **Leaflet**  
   Map is already behind a dynamic import and only used on the beaches page. No change needed unless you add maps to more pages.

3. **Monitoring**  
   When you go live, use Lighthouse / Vercel Analytics (or similar) to watch LCP and TTI. If a specific route gets slow, we can add route-level code splitting or more aggressive lazy loading there.

---

## Summary

- The **+4000 lines** are from **many files** (data, new pages, components, assets), not from the recent filter/badge/footer edits.
- **Performance:** Dynamic imports, `useMemo` for filtering, `next/image`, and font `display: "swap"` are already in place; build is healthy.
- **Next step:** Keep developing as usual. If you want to trim the “Best Places” listing bundle later, we can add a **place-summaries** codegen step and switch that page to it.
