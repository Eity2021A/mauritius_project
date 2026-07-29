import type { Metadata } from "next";
import type { ReactNode } from "react";
import { NOINDEX_NOFOLLOW_ROBOTS } from "@/lib/seo";
import { getSystemPageTranslations } from "@/data/system-page-translations";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = getSystemPageTranslations(locale).metadata.aiItinerary;

  return {
    title: t.title,
    robots: NOINDEX_NOFOLLOW_ROBOTS,
  };
}

export default function AiGenerateItineraryLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
