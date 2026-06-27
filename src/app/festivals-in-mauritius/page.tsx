import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FESTIVALS } from "@/data/festivals";
import { getImageUrl } from "@/lib/image-url";
import type { Metadata } from "next";

/** Same asset as Spring Festival (Chinese New Year) on this page — hosted on Supabase for consistent social previews. */
const FESTIVALS_OG_IMAGE_URL =
  "https://wpktirmzveoovxjqbqpq.supabase.co/storage/v1/object/public/festivals/chinese-new-year-in-mauritius.webp";

export const metadata: Metadata = {
  title: "Festivals in Mauritius | Cultural Celebrations & Events",
  description: "Discover the vibrant festivals of Mauritius - from Diwali and Chinese New Year to Maha Shivaratree and Holi. Experience the multicultural celebrations of this island paradise.",
  keywords: [
    "Mauritius festivals",
    "Mauritius celebrations",
    "Diwali Mauritius",
    "Chinese New Year Mauritius",
    "Maha Shivaratree",
    "Holi Mauritius",
    "Mauritius culture",
    "Mauritius events",
  ],
  openGraph: {
    title: "Festivals in Mauritius | Cultural Celebrations",
    description: "Experience the vibrant multicultural festivals of Mauritius",
    type: "article",
    images: [
      {
        url: FESTIVALS_OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Spring Festival — Chinese New Year celebrations in Mauritius",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Festivals in Mauritius | Cultural Celebrations",
    description: "Experience the vibrant multicultural festivals of Mauritius",
    images: [FESTIVALS_OG_IMAGE_URL],
  },
  alternates: {
    canonical: "/festivals-in-mauritius",
  },
};

export default function FestivalsPage() {
  return (
    <main id="main-content" className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[44vh] min-h-[280px]">
        <Image
          src={getImageUrl("/images/banners/diwali.webp", { width: 1280, quality: 75 })}
          alt="Festivals in Mauritius"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center px-4 max-w-4xl mx-auto translate-y-[2rem]">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Festivals in Mauritius
            </h1>
            <p className="text-white/90 text-base md:text-lg max-w-2xl mx-auto">
              Experience the vibrant multicultural celebrations of our island paradise
            </p>
          </div>
        </div>
      </section>

      {/* Introduction - Changed from yellowish to white/gray */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-orange-500 mb-6">
              A Melting Pot of Cultures
            </h2>
            <div className="text-gray-700 text-lg leading-relaxed space-y-4">
              <p>
                Mauritius prides itself in being able to house a <span className="font-semibold text-orange-500">multicultural society</span>, where people of different religions, languages and cultures co-exist in a single community. The French are one of the primary contributors in this rich blend of culture, when they took control of the island in the 17th century, bringing with them their African and Asian slaves.
              </p>
              <p>
                The country changed hands when the British won over the French in the 18th century. The British ushered in a wave of indentured laborers from India. This influx of Indian laborers changed the island&apos;s social structure, with Indo-Mauritians now comprising about 70% of the entire population.
              </p>
              <p>
                This coming together of different people from different origins created a <span className="font-semibold text-orange-500">distinct Mauritian society</span> with Franco-Mauritians, Afro-Mauritians, Sino-Mauritians, and Indo-Mauritians all contributing to our vibrant cultural tapestry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Festivals Grid */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            Annual Celebrations
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {FESTIVALS.map((festival) => (
              <article 
                key={festival.name}
                className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Increased image height from h-48 to h-56, removed color overlay */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={getImageUrl(festival.image, { width: 800, quality: 75 })}
                    alt={festival.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Light gradient only at bottom for text readability */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block px-3 py-1 bg-white/90 text-gray-800 text-sm font-medium rounded-full">
                      {festival.date}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {festival.name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {festival.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-amber-500">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Experience Mauritius Culture
            </h2>
            <p className="text-orange-100 text-lg mb-8">
              Plan your visit during one of our vibrant festivals and immerse yourself in the rich cultural heritage of Mauritius.
            </p>
            <a
              href="/best-time-to-visit-to-mauritius"
              className="inline-flex items-center justify-center px-10 py-5 min-h-[56px] text-lg bg-white text-orange-500 font-semibold rounded-lg hover:bg-orange-50 transition-colors shadow-lg no-underline"
            >
              Best Time to Visit Mauritius
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
