import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE } from "@/lib/constants";
import { getSystemPageTranslations } from "@/data/system-page-translations";

export const dynamic = "force-static";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = getSystemPageTranslations(locale).metadata.visaRequirements;

  return {
    title: t.title,
    description: t.description,
    openGraph: {
      title: t.openGraphTitle,
      description: t.openGraphDescription,
      images: [DEFAULT_OG_IMAGE],
    },
    alternates: { canonical: "/visa-requirements" },
  };
}

export default function VisaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
