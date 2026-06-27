# Homepage Speed Insight Report

**Date:** March 15, 2026  
**URL:** https://mauritiusexplored.com  
**Device:** Mobile (simulated 4G throttling)

---

## Performance Score: **58** (Needs Improvement)

| Metric | Value | Target |
|--------|-------|--------|
| **Performance** | 58 | 90+ (Good) |
| First Contentful Paint | 4.9 s | < 1.8 s |
| **Largest Contentful Paint** | **10.9 s** | < 2.5 s |
| Speed Index | 8.4 s | < 3.4 s |
| Total Blocking Time | 30 ms | < 200 ms ✅ |
| **Cumulative Layout Shift** | **0** | < 0.1 ✅ |
| Time to Interactive | 23.9 s | < 3.8 s |

**Highlights:**
- ✅ **CLS is 0** – No layout shift; stable rendering
- ✅ **TBT is low** – Main thread blocking is minimal
- ⚠️ **LCP and TTI are high** – Main bottlenecks

---

## Impact of Recent Changes

The recent updates (Top 15 page, itineraries subtitle) do **not** affect homepage performance. The subtitle is a single `<p>` tag; the Top 15 page is separate. The score reflects the existing homepage setup.

---

## Recommended Optimisations (by impact)

### 1. **Enable Supabase Image Transformations** (Est. savings: 1,312 KiB)

Images are currently served at full resolution. Supabase Image Transformations (Pro plan) can resize and compress on demand.

**Action:**
- In Supabase: Storage → Settings → enable Image Transformations
- Set `NEXT_PUBLIC_ENABLE_IMAGE_TRANSFORMS=true` in Vercel env vars
- Ensure hero and LCP images use width/quality params (already in code)

### 2. **Reduce Render-Blocking Resources** (Est. savings: ~2,950 ms)

CSS/JS that blocks first paint can delay LCP. Lighthouse reports render-blocking requests.

**Actions:**
- `next.config.ts` already has `inlineCss: true` – verify it’s in effect
- Consider `critical` or `above-the-fold` CSS extraction for above-the-fold content
- Defer non-critical third-party scripts

### 3. **Improve TTFB / Server Response** (Est. savings: ~610 ms)

Root document TTFB is ~710 ms. Target is < 600 ms.

**Actions:**
- Check Vercel region (closest to users)
- Use Vercel Edge if applicable
- Cache static pages at the edge where possible

### 4. **Reduce Unused JavaScript** (Est. savings: 557 KiB)

Client JS can be trimmed to what’s needed for the initial view.

**Actions:**
- Run `ANALYZE=true npm run build` to inspect bundles
- Ensure heavy components (Leaflet, PhotoMosaic, Marquee, Instagram) stay dynamically imported
- Lazy-load below-the-fold sections

### 5. **Reduce Unused CSS** (Est. savings: 195 KiB)

**Actions:**
- Tailwind purge is usually automatic; confirm no large unused classes
- If using extra global CSS, move it to scoped modules or critical CSS only

### 6. **Hero / LCP Image** (higher impact)

The hero slideshow image is a likely LCP candidate. Current setup:
- Uses `fetchPriority="high"` and `loading="eager"` on first slide ✅
- Uses `getImageUrl` with width 960 and quality 74 ✅
- **Without** Supabase transforms, full-size images may still load

**Action:** Enable Supabase Image Transformations and confirm hero images use the transform URL.

---

## Already in Place ✅

- Preconnect + dns-prefetch to Supabase
- Hero image preload with `fetchPriority="high"` in `<head>`
- First slide uses `loading="eager"` and `decoding="sync"`
- Dynamic imports for PhotoMosaic, Marquee, Instagram
- Vercel Speed Insights component

## Quick Wins You Can Do Now

1. **Enable Supabase Image Transformations** – biggest single gain (see above).

2. **Ensure Vercel Speed Insights** – check the Vercel dashboard for real-user metrics and compare with Lighthouse.

3. **Run bundle analyzer** – `ANALYZE=true npm run build` to spot any new large chunks.

---

## Vercel Speed Insights

The project uses `@vercel/speed-insights`. For real-user metrics:

- Vercel Dashboard → Project → **Analytics** / **Speed Insights**
- Compare with Lighthouse lab data
- Prioritize changes that affect real users

---

## Next Steps

1. Enable Supabase Image Transformations and set the env var.
2. Re-run Lighthouse after enabling transforms.
3. Check Vercel Analytics for field data.
4. If LCP stays high, profile with Chrome DevTools (Performance → LCP breakdown) to find the exact element and loading path.

---

## Implementation Summary (March 2026)

### ✅ Code changes applied

1. **Supabase Image Transformations**
   - Instagram poster images now pass `{ width: 480, quality: 72 }` to `getImageUrl`
   - `.env.example` updated with Vercel instructions
   - **Manual:** Set `NEXT_PUBLIC_ENABLE_IMAGE_TRANSFORMS=true` in Vercel → Settings → Environment Variables (Production)
   - **Manual:** Enable Image Transformations in Supabase Dashboard (Storage → Settings)

2. **Render-blocking**
   - `inlineCss: true` confirmed in `next.config.ts` (experimental)
   - Heavy sections (PhotoMosaic, Marquee, Instagram) use dynamic imports with Intersection Observer

3. **TTFB / Caching**
   - Added `headers()` in `next.config.ts` for `/ _next/static/*`, `/images/*`, `/videos/*`
   - **Manual:** Verify Vercel region in Project Settings (closest to target audience)

4. **Bundle analysis**
   - `npm run analyze` now uses `--webpack` (Turbopack build skips analyzer)
   - Report saved to `.next/analyze/client.html` after build
   - PhotoMosaic, Marquee, Instagram, Leaflet remain dynamically imported

5. **Tailwind / CSS**
   - Tailwind v4 auto-purges unused classes
   - `globals.css` imports `tw-animate-css` and `shadcn/tailwind.css`; sidebar/chart theme vars may add ~small overhead if those components aren’t used on homepage
