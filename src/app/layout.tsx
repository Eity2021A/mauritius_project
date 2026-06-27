import type { Metadata, Viewport } from "next";
import { Montserrat, Water_Brush } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { OrganizationJsonLd, WebsiteJsonLd } from "@/components/seo/JsonLd";
import ScrollToTop from "@/components/ScrollToTop";
import Providers from "@/components/Providers";
import { getImageSrcSet, getImageUrl } from "@/lib/image-url";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/constants";
import { SLIDES, FIRST_HERO_QUALITY, FIRST_HERO_WIDTHS } from "@/data/hero-slides";

const montserrat = Montserrat({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const waterBrush = Water_Brush({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-water-brush",
  display: "swap",
});

/**
 * SEO Configuration
 * Set NEXT_PUBLIC_SITE_URL in Vercel: https://mauritiusexplored.com when custom domain is connected.
 * Add Twitter handle in twitter.site and twitter.creator when ready.
 */
export const metadata: Metadata = {
  // Basic SEO
  title: {
    default: "Mauritius Explored - Discover Paradise Island | Travel Guide 2026",
    template: "%s | Mauritius Explored",
  },
  description: "Your ultimate guide to Mauritius. Discover stunning beaches, waterfalls, hiking trails, and hidden gems. Plan your perfect tropical holiday with local tips and insider knowledge.",
  keywords: [
    "Mauritius",
    "Mauritius travel guide",
    "Mauritius beaches",
    "Mauritius tourism",
    "Le Morne",
    "Port Louis",
    "Chamarel",
    "Grand Baie",
    "Ile aux Cerfs",
    "tropical paradise",
    "island holiday",
    "Mauritius activities",
    "Mauritius itinerary",
    "best beaches Mauritius",
    "things to do Mauritius",
    "Mauritius waterfalls",
    "Mauritius snorkeling",
    "Mauritius vacation",
  ],
  authors: [{ name: "Mauritius Explored" }],
  creator: "Mauritius Explored",
  publisher: "Mauritius Explored",
  
  // Open Graph (Facebook, LinkedIn, WhatsApp, iMessage, etc.)
  // Explicit absolute URL so og:image is same-origin as shared link (required for link previews)
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Mauritius Explored",
    title: "Mauritius Island | Things to do & Visitor's Guide | 2026",
    description: "Your ultimate guide to Mauritius. Discover stunning beaches, waterfalls, and hidden gems. Plan your perfect tropical holiday.",
    url: SITE_URL,
    images: [{ url: `${SITE_URL}/images/og-image.jpg`, width: 1200, height: 630, alt: DEFAULT_OG_IMAGE.alt }],
  },
  
  // Twitter Card (explicit image so large card with image appears)
  twitter: {
    card: "summary_large_image",
    title: "Mauritius Island | Things to do & Visitor's Guide | 2026",
    description: "Your ultimate guide to Mauritius. Discover stunning beaches, waterfalls, and hidden gems.",
    images: [`${SITE_URL}/images/og-image.jpg`],
    // Add your Twitter handle when ready:
    // site: "@mauritiusexplored",
    // creator: "@mauritiusexplored",
  },
  
  // Additional meta (metadataBase must match deployment so OG image URL is same-origin)
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },

  verification: {
    google: "FjnL0k2iiZBrACqwz1oM4WWv9ly1r4VEOX9hZJs1TjE",
  },
  
  // Icons (absolute URLs + ?v=3 so Safari uses our icon on .vercel.app)
  icons: {
    icon: [
      { url: `${SITE_URL}/favicon.ico?v=3`, sizes: "any" },
      { url: `${SITE_URL}/favicon-16x16.png?v=3`, type: "image/png", sizes: "16x16" },
      { url: `${SITE_URL}/favicon-32x32.png?v=3`, type: "image/png", sizes: "32x32" },
    ],
    apple: `${SITE_URL}/apple-touch-icon.png?v=3`,
  },

  // Additional SEO settings
  category: "Travel",
  classification: "Travel Guide",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://htyodxbntlnwefjkcudc.supabase.co" />
        <link rel="dns-prefetch" href="https://htyodxbntlnwefjkcudc.supabase.co" />
        <link
          rel="preload"
          as="image"
          href={getImageUrl(SLIDES[0].image, {
            width: 960,
            quality: FIRST_HERO_QUALITY,
          })}
          imageSrcSet={getImageSrcSet(SLIDES[0].image, {
            widths: FIRST_HERO_WIDTHS,
            quality: FIRST_HERO_QUALITY,
          })}
          imageSizes="100vw"
          fetchPriority="high"
        />
        <link rel="icon" href={`${SITE_URL}/favicon.ico?v=3`} sizes="any" />
        <link rel="icon" type="image/png" href={`${SITE_URL}/favicon-32x32.png?v=3`} sizes="32x32" />
        <link rel="apple-touch-icon" href={`${SITE_URL}/apple-touch-icon.png?v=3`} />
        <OrganizationJsonLd />
        <WebsiteJsonLd />
      </head>
      <body className={`${montserrat.variable} ${waterBrush.variable} font-sans antialiased`}>
        <Providers>
          <SpeedInsights />
          <ScrollToTop />
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          {children}
        </Providers>
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
      </body>
    </html>
  );
}
