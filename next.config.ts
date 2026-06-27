import type { NextConfig } from "next";
import path from "path";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === "true" });

const modernPolyfillPath = path.resolve(process.cwd(), "src/lib/modern-polyfill.js");

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["leaflet", "react-leaflet"],
    // Inline CSS in HTML to remove render-blocking stylesheet request (helps mobile PageSpeed; good for Tailwind)
    inlineCss: true,
  },
  // Replace Next.js polyfill-module with empty stub for modern-only browsers (saves ~14 KiB, PageSpeed Legacy JS)
  turbopack: {
    resolveAlias: {
      "../build/polyfills/polyfill-module": "./src/lib/modern-polyfill.js",
      "next/dist/build/polyfills/polyfill-module": "./src/lib/modern-polyfill.js",
    },
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "../build/polyfills/polyfill-module": modernPolyfillPath,
      "next/dist/build/polyfills/polyfill-module": modernPolyfillPath,
    };
    return config;
  },
  // Avoid Vercel 402 on Image Optimization: serve images directly (no optimizer proxy)
  images: {
    unoptimized: true,
  },

  // Cache headers for static assets (helps repeat-visit TTFB; Vercel sets HTML headers)
  async headers() {
    return [
      {
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
        ],
      },
      {
        source: "/videos/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
        ],
      },
    ];
  },
  
  async redirects() {
    return [
      // ========================================
      // OLD PLACES PAGES -> NEW PLACES PAGE
      // ========================================
      {
        source: '/about/places',
        destination: '/best-places-to-visit-in-mauritius',
        permanent: true,
      },
      {
        source: '/about/places/',
        destination: '/best-places-to-visit-in-mauritius',
        permanent: true,
      },
      {
        source: '/explore/places',
        destination: '/best-places-to-visit-in-mauritius',
        permanent: true,
      },
      {
        source: '/explore/places/',
        destination: '/best-places-to-visit-in-mauritius',
        permanent: true,
      },
      
      // ========================================
      // OLD ATTRACTION URLs -> INDIVIDUAL PLACES
      // ========================================
      {
        source: '/attractions-mauritius/:slug',
        destination: '/best-places-to-visit-in-mauritius/:slug',
        permanent: true,
      },
      {
        source: '/attractions-mauritius/:slug/',
        destination: '/best-places-to-visit-in-mauritius/:slug',
        permanent: true,
      },
      
      // ========================================
      // OLD BEACH URLs -> NEW BEACH PAGES
      // ========================================
      {
        source: '/destinations/:slug',
        destination: '/beaches-in-mauritius/:slug',
        permanent: true,
      },
      {
        source: '/destinations/:slug/',
        destination: '/beaches-in-mauritius/:slug',
        permanent: true,
      },
      {
        source: '/beaches',
        destination: '/beaches-in-mauritius',
        permanent: true,
      },
      
      // ========================================
      // GENERIC ACTIVITIES -> PLACES
      // ========================================
      {
        source: '/activities',
        destination: '/mauritius-activities',
        permanent: true,
      },

      // ========================================
      // TOP 10 -> TOP 15 (page expanded)
      // ========================================
      {
        source: '/top-10-things-to-do-in-mauritius',
        destination: '/top-15-things-to-do-in-mauritius',
        permanent: true,
      },
      {
        source: '/top-10-things-to-do-in-mauritius/',
        destination: '/top-15-things-to-do-in-mauritius',
        permanent: true,
      },

      // ========================================
      // ABOUT SUBPAGES -> TOP-LEVEL URLS
      // ========================================
      {
        source: '/about/welcome',
        destination: '/mauritius-island',
        permanent: true,
      },
      {
        source: '/about/visa-requirements',
        destination: '/visa-requirements',
        permanent: true,
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
