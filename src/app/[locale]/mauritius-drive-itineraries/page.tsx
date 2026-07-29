import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getItineraryTranslations } from "@/data/itinerary-translations";

export const revalidate = 3600;

export const legacyMetadata: Metadata = {
  title: "Mauritius Drive Itineraries",
  description:
    "Mauritius drive itineraries — ready-made 3, 5, 7 and 10-day self-drive routes that loop the island and cover every coast, region and must-see highlight.",
  alternates: { canonical: "/mauritius-drive-itineraries" },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getItineraryTranslations(locale);

  return {
    title: t.feature.title,
    description: t.metadata.description,
    alternates: { canonical: "/mauritius-drive-itineraries" },
  };
}

export default async function MauritiusDriveItinerariesPage() {
  return (
    <main id="main-content" className="min-h-screen bg-white text-[#1c2a2e]">
      <Navbar />

      <Footer />
    </main>
  );
}
