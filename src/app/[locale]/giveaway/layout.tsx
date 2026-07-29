import type { Metadata } from "next";
import { GIVEAWAY_FEATURE_IMAGE } from "@/lib/giveaway-assets";
import { getImageUrl } from "@/lib/image-url";
import { getSystemPageTranslations } from "@/data/system-page-translations";

const OG_IMAGE = {
  url: getImageUrl(GIVEAWAY_FEATURE_IMAGE, { width: 1200, height: 630, quality: 80 }),
  width: 1200,
  height: 630,
  alt: "Mauritius Explored giveaway",
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = getSystemPageTranslations(locale).metadata.giveaway;

  return {
    title: t.title,
    description: t.description,
    openGraph: {
      title: t.openGraphTitle,
      description: t.openGraphDescription,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: t.openGraphTitle,
      description: t.openGraphDescription,
      images: [OG_IMAGE.url],
    },
    alternates: { canonical: "/giveaway" },
  };
}

export default function GiveawayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
