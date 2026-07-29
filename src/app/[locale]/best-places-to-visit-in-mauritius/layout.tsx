import type { Metadata } from "next";
import { getImageUrl } from "@/lib/image-url";
import { getTranslations } from "next-intl/server";

const OG_IMAGE = {
  url: getImageUrl("pamplemousses-botanical-garden.jpg", { width: 1200, quality: 75 }),
  width: 1200,
  height: 630,
  alt: "Pamplemousses Botanical Garden — Best places to visit in Mauritius",
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("PlacesHub.metadata");

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("ogTitle"),
      description: t("description"),
      images: [{ ...OG_IMAGE, alt: t("ogImageAlt") }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("ogTitle"),
      description: t("description"),
      images: [OG_IMAGE.url],
    },
    alternates: { canonical: "/best-places-to-visit-in-mauritius" },
  };
}

export default function PlacesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
