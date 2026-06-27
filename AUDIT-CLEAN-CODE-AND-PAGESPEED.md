# Clean Code & PageSpeed Insights Audit — Mauritius Explored

**Date:** March 16, 2026  
**Scope:** `mauritius-explored` codebase and performance practices  
**Skills applied:** Clean Code (Uncle Bob), PageSpeed Insights (Google)

---

## Part 1: Clean Code Audit

Principles from Robert C. Martin’s *Clean Code* applied to a sample of core files.

### ✅ What’s already good

- **Naming**
  - Intention-revealing names: `getImageUrl`, `getImageSrcSet`, `mapToBeachDetails`, `fetchAllPublishedSlugs`, `regionLabelToType`, `sortedTexts`, `useDb`.
  - Clear type names: `DbItemPayload`, `BeachJsonLdProps`, `ImageTransformOptions`.
- **Functions**
  - Small, single-purpose helpers in `content.ts`: `toCoords`, `sortByOrder`, `sortedTexts`, `sortedLabels`, `sortedMediaUrls`, `sortedHotelNames` (each does one thing).
  - Mappers (`mapToBeachDetails`, `mapToPlaceDetails`, `mapToActivityDetails`) are focused and similar in shape, which helps readability.
- **Formatting**
  - Logical grouping: constants at top, helpers, then public API in `content.ts` and `image-url.ts`.
  - Related code kept close (e.g. JsonLd components and their props).
- **Comments**
  - File-level comments in `content.ts` and `image-url.ts` explain the “why” (Supabase, fallbacks, transforms) without restating the code.
- **Noise**
  - Few redundant or misleading comments; no position markers or commented-out blocks in the files reviewed.

### ⚠️ Clean-code improvements to consider

1. **`src/lib/content.ts`**
   - **`getAllBlogPosts`** (lines ~268–318): Long function with a loop that does fetching + mapping. Consider extracting “map one blog post from DB row” into e.g. `mapBlogPostFromDb(post, …)` and keep the loop as orchestration only.
   - **`useDb()`**: Module-level `_useDb` is mutable state. Fine for a small app; if this grows, consider a clearer “content source” abstraction so callers don’t depend on hidden state.
   - **Argument count**: `fetchAllDetailsByType<T>(type, mapper, fallback)` has 3 arguments but they’re cohesive (type + how to map + fallback); acceptable. No urgent need to change.

2. **`src/components/seo/JsonLd.tsx`**
   - **Repetition**: Each JsonLd component repeats the same pattern (build schema object → render `<script type="application/ld+json">`). A small helper, e.g. `function JsonLdScript({ schema }: { schema: object })`, would reduce duplication and keep the file aligned with DRY.
   - **Interfaces**: Naming is clear (`BeachJsonLdProps`, `ActivityJsonLdProps`, etc.); no change required for Clean Code.

3. **`src/app/top-activities-mauritius/[slug]/page.tsx`**
   - **Page does many things**: Fetches place/activity/beach, itinerary route, related content, then renders a large page. Already split into helpers (`getStopPosition`, `getStopDescription`, `getStopImages`, `fetchItineraryRouteTotals`). For even clearer “stepdown” reading, consider moving route-fetch and stop-resolution into a small `getItineraryPageData`-style function so the main `page` is mostly “get data → render.”
   - **Magic constant**: `OSRM_BASE` is at module level and named; good. No further comment needed.

4. **Checklist (high level)**
   - Functions &lt; 20 lines: Mostly yes; `getAllBlogPosts` and the slug page’s `generateMetadata`/default export are the main longer blocks.
   - One thing per function: Largely yes; the suggested extractions above would reinforce this.
   - Names searchable and intention-revealing: Yes.
   - Avoid comments by clearer code: Already in good shape; no “comment bad code” hotspots.
   - Argument count: No egregious 4+ argument functions in the sampled files.

**Verdict:** The codebase is in good shape for readability and maintainability. The suggestions above are incremental improvements (extract one or two functions, reduce repetition in JsonLd) rather than fundamental clean-code violations.

---

## Part 2: PageSpeed Insights Audit

Aligned with [PageSpeed Insights](https://developers.google.com/speed/docs/insights/v5/about) and Core Web Vitals. Live API was not called (rate limit); assessment is based on repo and existing `SPEED-INSIGHT-REPORT.md` / config.

### ✅ What’s already in place

- **Performance**
  - **Caching:** `next.config.ts` sets `Cache-Control` for `/_next/static/*` (immutable) and `/images/*`, `/videos/*` (1d + stale-while-revalidate). ✅
  - **Critical path / LCP:** Hero image preload in `layout.tsx` with `rel="preload" as="image"`, `imageSrcSet`/`imageSizes`, `fetchPriority="high"`. ✅
  - **Resource hints:** `preconnect` + `dns-prefetch` to Supabase in `layout.tsx`. ✅
  - **Fonts:** Montserrat and Water_Brush use `display: "swap"` to avoid FOIT. ✅
  - **CSS:** `experimental.inlineCss: true` to reduce render-blocking stylesheet. ✅
  - **JS:** Polyfill stub for modern browsers; `optimizePackageImports` for `leaflet`/`react-leaflet`. ✅
  - **Third-party:** GA loaded via `@next/third-parties/google` (gated by env); typically non-blocking. ✅
- **Images**
  - Central `getImageUrl` / `getImageSrcSet` with width/quality and optional Supabase transforms. ✅
  - Homepage itinerary cards use `srcSet` + `sizes` + `loading="lazy"`. ✅
  - Next.js `Image` used in many places with `alt`, and explicit `width`/`height` where applicable (e.g. about, PhotoMosaic, activity page). ✅
- **Accessibility**
  - Skip link “Skip to main content” in layout. ✅
  - Images in sampled files have descriptive `alt` (no raw `<img>` without alt). ✅
- **SEO**
  - Metadata (title, description, OG, Twitter, canonical) and JsonLd (Organization, WebSite, Beach, Activity, Place, Breadcrumb, FAQ, ItemList). ✅
  - Sitemap and robots configured. ✅

### ⚠️ PageSpeed improvements (priority order)

1. **LCP / hero image (biggest impact)**  
   - **Current:** `next.config` has `images.unoptimized: true`; hero is preloaded and uses `getImageUrl`/`getImageSrcSet`. If Supabase Image Transformations are off, images are full-res and hurt LCP (as in SPEED-INSIGHT-REPORT: LCP 10.9 s, Performance 58).  
   - **Action:** Enable Supabase Image Transformations; set `NEXT_PUBLIC_ENABLE_IMAGE_TRANSFORMS=true` in Vercel; ensure hero and other LCP images use width/quality (already in code). This matches recommendation #1 in SPEED-INSIGHT-REPORT.

2. **Preload link attributes**  
   - **Current:** Root layout uses `<link rel="preload" as="image" href={...} imageSrcSet={...} imageSizes="100vw" fetchPriority="high" />`. In HTML5 the attributes must be `imagesrcset` and `imagesizes`; React’s JSX `imageSrcSet`/`imageSizes` serialize to the correct lowercase in the DOM.  
   - **Action:** No code change required; if a future Lighthouse run still flags “preload doesn’t match,” ensure the preload’s `imagesrcset`/`imagesizes` match the hero `<img>`/`<Image>` srcset/sizes exactly.

3. **Render-blocking and TTFB**  
   - **Current:** `inlineCss: true` is set; TTFB and render-blocking were called out in SPEED-INSIGHT-REPORT.  
   - **Actions:** Confirm inline CSS is active in production; consider Vercel region and edge caching; keep third-party and heavy JS lazy-loaded (Leaflet, PhotoMosaic, Marquee, Instagram).

4. **Images: dimensions and CLS**  
   - **Current:** Many `Image`/img usages have `alt`; some use `fill` with a container (e.g. explore page) or explicit width/height. CLS was reported 0.  
   - **Action:** Continue ensuring above-the-fold images have explicit dimensions or a defined aspect-ratio container to keep CLS in the “Good” range.

5. **Unused JS/CSS**  
   - **Current:** Bundle analyzer available (`ANALYZE=true`); heavy UI is dynamically imported.  
   - **Action:** Run `ANALYZE=true npm run build` periodically; keep below-the-fold sections in lazy components.

### PageSpeed checklist (summary)

| Area            | Status | Notes                                                                 |
|----------------|--------|----------------------------------------------------------------------|
| Images         | ⚠️     | Responsive + lazy in place; enable Supabase transforms for LCP.      |
| Critical CSS   | ✅     | `inlineCss: true` in next.config.                                    |
| Resource hints | ✅     | Preconnect + dns-prefetch + hero preload.                            |
| Fonts          | ✅     | `display: swap`.                                                    |
| Caching        | ✅     | Static and media cache headers set.                                 |
| Third-party    | ✅     | GA gated and loaded via next/third-parties.                          |
| CLS            | ✅     | 0 in report; keep dimensions/aspect-ratio on key images.             |
| LCP / FCP      | ⚠️     | Improve via image transforms, TTFB, and render-blocking (see above).|
| Accessibility  | ✅     | Skip link; alt text on images.                                      |
| SEO            | ✅     | Meta, canonicals, JsonLd, sitemap, robots.                          |

---

## Summary

- **Clean Code:** The project reads well and is maintainable; naming, small functions, and structure are solid. Suggested refinements: extract blog-post mapping in `content.ts`, reduce JsonLd repetition, and optionally a single “get itinerary page data” helper in the slug page.
- **PageSpeed:** Config and patterns (caching, preload, preconnect, fonts, lazy loading, alt text, SEO) are in line with best practices. The main lever to reach 90+ Performance and “Good” Core Web Vitals is **enabling Supabase Image Transformations** and re-checking LCP/FCP with a fresh run on [PageSpeed Insights](https://pagespeed.web.dev/) or Lighthouse after DNS/domain is fully on Vercel.

Re-run PageSpeed (or the audit-speed skill) after enabling image transforms and any TTFB/region changes to verify scores and CWV.
