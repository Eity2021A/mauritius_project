import type { Metadata, Viewport } from "next";
import { Montserrat, Water_Brush } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { OrganizationJsonLd, WebsiteJsonLd } from "@/components/seo/JsonLd";
import GlobalBreadcrumbJsonLd from "@/components/seo/GlobalBreadcrumbJsonLd";
import ScrollToTop from "@/components/ScrollToTop";
import Providers from "@/components/Providers";
import { getImageSrcSet, getImageUrl } from "@/lib/image-url";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/constants";
import {
  HOME_PAGE_ABSOLUTE_TITLE,
  HOME_PAGE_DESCRIPTION,
  HOME_PAGE_TITLE,
  SITE_BRAND,
} from "@/lib/seo";
import { SLIDES, FIRST_HERO_QUALITY, FIRST_HERO_WIDTHS } from "@/data/hero-slides";
import { routing } from "@/i18n/routing";

const montserrat = Montserrat({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-montserrat",
  display: "swap",
});

const waterBrush = Water_Brush({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-water-brush",
  display: "swap",
});

const OG_LOCALE: Record<string, string> = {
  en: "en_US",
  fr: "fr_FR",
  de: "de_DE",
  it: "it_IT",
  es: "es_ES",
  ru: "ru_RU",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export function generateStaticParams() {
  // Pre-render English only; other locales render on demand.
  // Avoids ~5× static pages until translations are ready.
  return [{ locale: routing.defaultLocale }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: {
      default: HOME_PAGE_TITLE,
      template: `%s | ${SITE_BRAND}`,
    },
    description: HOME_PAGE_DESCRIPTION,
    authors: [{ name: "Mauritius Explored" }],
    creator: SITE_BRAND,
    publisher: SITE_BRAND,
    openGraph: {
      type: "website",
      locale: OG_LOCALE[locale] ?? "en_US",
      siteName: SITE_BRAND,
      title: HOME_PAGE_ABSOLUTE_TITLE,
      description: HOME_PAGE_DESCRIPTION,
      url: SITE_URL,
      images: [
        {
          url: `${SITE_URL}/images/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: DEFAULT_OG_IMAGE.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: HOME_PAGE_ABSOLUTE_TITLE,
      description: HOME_PAGE_DESCRIPTION,
      images: [`${SITE_URL}/images/og-image.jpg`],
    },
    metadataBase: new URL(SITE_URL),
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, l === routing.defaultLocale ? "/" : `/${l}`])
      ),
    },
    verification: {
      google: "FjnL0k2iiZBrACqwz1oM4WWv9ly1r4VEOX9hZJs1TjE",
    },
    icons: {
      icon: [
        { url: `${SITE_URL}/favicon.ico?v=3`, sizes: "any" },
        {
          url: `${SITE_URL}/favicon-16x16.png?v=3`,
          type: "image/png",
          sizes: "16x16",
        },
        {
          url: `${SITE_URL}/favicon-32x32.png?v=3`,
          type: "image/png",
          sizes: "32x32",
        },
      ],
      apple: `${SITE_URL}/apple-touch-icon.png?v=3`,
    },
    category: "Travel",
    classification: "Travel Guide",
  };
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "Common" });

  return (
    <html lang={locale}>
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
        <link
          rel="icon"
          type="image/png"
          href={`${SITE_URL}/favicon-32x32.png?v=3`}
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href={`${SITE_URL}/apple-touch-icon.png?v=3`} />
        <OrganizationJsonLd />
        <WebsiteJsonLd />
      </head>
      <body className={`${montserrat.variable} ${waterBrush.variable} font-sans antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <SpeedInsights />
            <ScrollToTop />
            <a href="#main-content" className="skip-link">
              {t("skipToContent")}
            </a>
            <GlobalBreadcrumbJsonLd />
            {children}
          </Providers>
        </NextIntlClientProvider>
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
      </body>
    </html>
  );
}
