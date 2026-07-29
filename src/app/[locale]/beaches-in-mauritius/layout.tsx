import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE } from "@/lib/constants";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("BeachesHub.metadata");

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("ogTitle"),
      description: t("description"),
      images: [DEFAULT_OG_IMAGE],
    },
    alternates: { canonical: "/beaches-in-mauritius" },
  };
}

export default function BeachesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
