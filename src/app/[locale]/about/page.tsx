import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CountUp from "@/components/ui/CountUp";
import { getImageUrl } from "@/lib/image-url";
import type { Metadata } from "next";
import { getAboutInfo } from "@/data/main-info-translations";

export const legacyMetadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Planet Explored Ltd and our mission to provide eco-friendly travel experiences in Mauritius.",
  alternates: { canonical: "/about" },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = getAboutInfo(locale);
  return { title: t.metadata.title, description: t.metadata.description, alternates: { canonical: "/about" } };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getAboutInfo(locale);
  const statTargets = [316000, 242000, 291000];

  return (
    <main id="main-content" className="min-h-screen">
      <Navbar />

      <section className="relative h-[44vh] min-h-[280px]">
        <Image
          src={getImageUrl("/images/banners/ile-aux-fouquets-lighthouse-mauritius.jpg")}
          alt={t.heroAlt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center px-4 max-w-4xl mx-auto translate-y-[2rem]">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {t.title}
            </h1>
            <p className="text-white/90 text-base md:text-lg max-w-2xl mx-auto">
              {t.subtitle}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {t.sections.map((section: { title: string; paragraphs: string[] }, sectionIndex: number) => (
              <div key={section.title} className="mb-16">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{section.title}</h2>
                </div>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-gray-700 text-lg leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}

                {sectionIndex === 2 && (
                  <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-8">
                    {t.stats.map((label: string, index: number) => (
                      <div key={label + index} className="min-w-0 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 sm:p-6 text-center">
                        <p className="min-w-0 overflow-hidden text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-orange-500 mb-1">
                          <CountUp target={statTargets[index]} />
                        </p>
                        <p className="text-gray-600 text-xs sm:text-sm">{label}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto rounded-2xl border border-orange-100 bg-orange-50/50 p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {t.editorialTitle}
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              {t.editorial.map((paragraph: string) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-b from-teal-900 to-teal-950 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-800 mb-6">
                <svg className="w-8 h-8 text-teal-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.sustainabilityTitle}</h2>
              <p className="text-teal-200 text-lg max-w-2xl mx-auto">{t.sustainabilityIntro}</p>
            </div>

            <p className="text-teal-100 text-lg leading-relaxed mb-8 text-center">
              {t.sustainabilityText}
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-12">
              {t.responsibilities.map((item: string) => (
                <div key={item} className="flex items-start gap-3 bg-teal-800/50 rounded-lg p-4">
                  <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-teal-100 text-sm md:text-base">{item}</p>
                </div>
              ))}
            </div>

            <div className="bg-teal-800/30 rounded-lg p-8 md:p-10">
              <h3 className="text-xl md:text-2xl font-bold mb-4">{t.initiativesTitle}</h3>
              {t.initiatives.map((paragraph: string) => (
                <p key={paragraph} className="text-teal-100 leading-relaxed mb-6 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{t.ctaTitle}</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">{t.ctaText}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/explore" className="inline-flex items-center justify-center px-8 py-4 min-h-[48px] bg-orange-500 text-white font-medium rounded-full hover:bg-orange-600 transition-colors">
                {t.start}
              </Link>
              <Link href="/privacy-policy" className="inline-flex items-center justify-center px-8 py-4 min-h-[48px] bg-gray-100 text-gray-700 font-medium rounded-full hover:bg-gray-200 transition-colors">
                {t.privacy}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
