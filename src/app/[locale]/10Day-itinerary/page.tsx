import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getItineraryTranslations } from "@/data/itinerary-translations";

export const revalidate = 3600;

export const legacyMetadata: Metadata = {
  title: "IG2 10Day Itinerary",
  description:
    "The ultimate 10-day Mauritius itinerary — three regions, day by day. Beaches, hikes, road trips and island tours for the perfect self-drive trip.",
  alternates: { canonical: "/10day-itinerary" },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getItineraryTranslations(locale);

  return {
    title: t.guides[3].title,
    description: t.guides[3].description,
    alternates: { canonical: "/10day-itinerary" },
  };
}

export default async function IG210DayItineraryPage() {
  return (
    <main id="main-content" className="min-h-screen bg-white text-[#1c2a2e]">
      <Navbar />

      <Footer />
    </main>
  );
}
