import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSharedItinerary } from "@/lib/itinerary-actions";
import { getImageUrl } from "@/lib/image-url";
import { DEFAULT_OG_IMAGE } from "@/lib/constants";
import SharedItineraryDetailView from "@/components/SharedItineraryDetailView";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

const sharedMetadataText = {
  en: {
    notFound: "Itinerary Not Found",
    titleSuffix: "Shared Trip",
    description: (count: number, author: string) => `Explore this ${count}-stop Mauritius itinerary created by ${author}.`,
    ogDescription: (count: number) => `A ${count}-stop Mauritius itinerary`,
  },
  fr: {
    notFound: "Itinéraire introuvable",
    titleSuffix: "Voyage partagé",
    description: (count: number, author: string) => `Explorez cet itinéraire de ${count} arrêts à Maurice créé par ${author}.`,
    ogDescription: (count: number) => `Un itinéraire de ${count} arrêts à Maurice`,
  },
  de: {
    notFound: "Reiseplan nicht gefunden",
    titleSuffix: "Geteilte Reise",
    description: (count: number, author: string) => `Entdecken Sie diese Mauritius-Reiseroute mit ${count} Stopps, erstellt von ${author}.`,
    ogDescription: (count: number) => `Eine Mauritius-Reiseroute mit ${count} Stopps`,
  },
  it: {
    notFound: "Itinerario non trovato",
    titleSuffix: "Viaggio condiviso",
    description: (count: number, author: string) => `Esplora questo itinerario di Mauritius con ${count} tappe creato da ${author}.`,
    ogDescription: (count: number) => `Un itinerario di Mauritius con ${count} tappe`,
  },
  es: {
    notFound: "Itinerario no encontrado",
    titleSuffix: "Viaje compartido",
    description: (count: number, author: string) => `Explora este itinerario de Mauricio con ${count} paradas creado por ${author}.`,
    ogDescription: (count: number) => `Un itinerario de Mauricio con ${count} paradas`,
  },
  ru: {
    notFound: "Маршрут не найден",
    titleSuffix: "Общий маршрут",
    description: (count: number, author: string) => `Откройте маршрут по Маврикию с ${count} остановками, созданный ${author}.`,
    ogDescription: (count: number) => `Маршрут по Маврикию с ${count} остановками`,
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const itinerary = await getSharedItinerary(slug, locale);
  const language = locale in sharedMetadataText ? locale as keyof typeof sharedMetadataText : "en";
  const t = sharedMetadataText[language];
  if (!itinerary) return { title: t.notFound };

  const sharedImage = itinerary.cover_image
    ? getImageUrl(itinerary.cover_image, { width: 1200, quality: 75 })
    : DEFAULT_OG_IMAGE.url;
  const description = t.description(itinerary.stop_count, itinerary.author_name);
  const ogDescription = t.ogDescription(itinerary.stop_count);

  return {
    title: `${itinerary.title} | ${t.titleSuffix}`,
    description,
    openGraph: {
      title: itinerary.title,
      description: ogDescription,
      images: [{ url: sharedImage, width: 1200, height: 630, alt: itinerary.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: itinerary.title,
      description: ogDescription,
      images: [sharedImage],
    },
  };
}

export default async function SharedItineraryPage({ params }: Props) {
  const { locale, slug } = await params;
  const itinerary = await getSharedItinerary(slug, locale);

  if (!itinerary) notFound();

  return (
    <main id="main-content" className="min-h-screen bg-white">
      <Navbar />
      <SharedItineraryDetailView itinerary={itinerary} />
      <Footer />
    </main>
  );
}
