import { Metadata } from "next";
import { DEFAULT_OG_IMAGE } from "@/lib/constants";
import { getSystemPageTranslations } from "@/data/system-page-translations";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = getSystemPageTranslations(locale).metadata.bestTimeToVisit;

  return {
    title: t.title,
    description: t.description,
    openGraph: {
      title: t.openGraphTitle,
      description: t.openGraphDescription,
      images: [DEFAULT_OG_IMAGE],
    },
    alternates: { canonical: "/best-time-to-visit-to-mauritius" },
  };
}

export default function BestTimeToVisitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
