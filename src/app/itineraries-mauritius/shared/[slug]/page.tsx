import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSharedItinerary } from "@/lib/itinerary-actions";
import { getImageUrl } from "@/lib/image-url";
import { DEFAULT_OG_IMAGE } from "@/lib/constants";
import SharedItineraryDetailView from "@/components/SharedItineraryDetailView";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const itinerary = await getSharedItinerary(slug);
  if (!itinerary) return { title: "Itinerary Not Found" };

  const sharedImage = itinerary.cover_image
    ? getImageUrl(itinerary.cover_image, { width: 1200, quality: 75 })
    : DEFAULT_OG_IMAGE.url;
  return {
    title: `${itinerary.title} | Mauritius Explored`,
    description: `Explore this ${itinerary.stop_count}-stop Mauritius itinerary created by ${itinerary.author_name}.`,
    openGraph: {
      title: itinerary.title,
      description: `A ${itinerary.stop_count}-stop Mauritius itinerary`,
      images: [{ url: sharedImage, width: 1200, height: 630, alt: itinerary.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: itinerary.title,
      description: `A ${itinerary.stop_count}-stop Mauritius itinerary`,
      images: [sharedImage],
    },
  };
}

export default async function SharedItineraryPage({ params }: Props) {
  const { slug } = await params;
  const itinerary = await getSharedItinerary(slug);

  if (!itinerary) notFound();

  return (
    <main id="main-content" className="min-h-screen bg-white">
      <Navbar />
      <SharedItineraryDetailView itinerary={itinerary} />
      <Footer />
    </main>
  );
}
