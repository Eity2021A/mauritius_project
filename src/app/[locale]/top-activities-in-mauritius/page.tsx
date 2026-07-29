import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { staticPageText } from "@/lib/static-page-localizer";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: staticPageText(locale, "Top Activities in Mauritius"),
    description: staticPageText(locale, "Top activities to do in Mauritius - sea, summit, sky and wildlife."),
    alternates: { canonical: "/top-activities-in-mauritius" },
  };
}

export default async function TopActivitiesInMauritiusPage() {
  return (
    <main id="main-content" className="min-h-screen bg-white text-[#1c2a2e]">
      <Navbar />

      <Footer />
    </main>
  );
}
