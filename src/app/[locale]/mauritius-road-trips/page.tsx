import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getUtilityPageInfo } from "@/data/utility-page-translations";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = getUtilityPageInfo(locale).roadTrips;

  return {
    title: t.metadata.title,
    description: t.metadata.description,
    alternates: { canonical: "/mauritius-road-trips" },
  };
}

export default async function MauritiusRoadTripsPage() {
  return (
    <main id="main-content" className="min-h-screen bg-white text-[#1c2a2e]">
      <Navbar />

      <Footer />
    </main>
  );
}
