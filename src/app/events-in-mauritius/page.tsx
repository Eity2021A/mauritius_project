import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlanTripButton from "@/components/PlanTripButton";
import EventsInteractiveSection from "@/components/events/EventsInteractiveSection";
import { getImageUrl } from "@/lib/image-url";

const HERO_BANNER = "/images/banners/mauritius-east-coast-aerial-panorama.webp";
const OG_IMAGE = "custom-nightlife-events.jpg"; // From images bucket — single OG image when sharing

const ogImageUrl = getImageUrl(OG_IMAGE, { width: 1200, quality: 75 });

export const metadata: Metadata = {
  title: "Events in Mauritius | Concerts, Parties & What's On",
  description:
    "Discover upcoming events in Mauritius — parties, concerts, and cultural dates. Plan around the calendar and grab tickets early.",
  openGraph: {
    title: "Events in Mauritius | What's On",
    description: "Upcoming events, posters, and dates across Mauritius.",
    type: "website",
    images: [{ url: ogImageUrl, width: 1200, height: 630, alt: "Events in Mauritius — nightlife and parties" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Events in Mauritius | What's On",
    description: "Upcoming events, posters, and dates across Mauritius.",
    images: [ogImageUrl],
  },
  alternates: {
    canonical: "/events-in-mauritius",
  },
};

export default function EventsInMauritiusPage() {
  return (
    <main id="main-content" className="min-h-screen bg-white">
      <Navbar />

      <section className="relative h-[44vh] min-h-[280px]">
        <Image
          src={getImageUrl(HERO_BANNER, { width: 1280, quality: 75 })}
          alt="Events in Mauritius"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center px-4 max-w-4xl mx-auto translate-y-[2rem]">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Events in Mauritius
            </h1>
            <p className="text-white/90 text-base md:text-lg max-w-2xl mx-auto">
              What&apos;s on — concerts, parties, and special nights across the island
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-orange-500">
              What&apos;s happening in Mauritius
            </h2>
          </div>
        </div>
      </section>

      <section className="pb-14 md:pb-20 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4 max-w-7xl">
          <EventsInteractiveSection />
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-orange-500 to-amber-500">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">More to explore</h2>
            <p className="text-orange-100 text-lg mb-8">
              Pair your night out with beaches, activities, and island culture.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <PlanTripButton
                href="/festivals-in-mauritius"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-orange-500 font-semibold rounded-xl hover:bg-orange-50 transition-colors min-h-[48px]"
              >
                Festivals in Mauritius
              </PlanTripButton>
              <Link
                href="/mauritius-activities"
                className="inline-flex items-center justify-center px-8 py-4 bg-orange-700 text-white font-semibold rounded-xl hover:bg-orange-800 transition-colors no-underline min-h-[48px]"
              >
                View activities
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
