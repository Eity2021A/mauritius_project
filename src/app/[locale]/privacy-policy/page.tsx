import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import { getImageUrl } from "@/lib/image-url";
import { getPrivacyInfo } from "@/data/main-info-translations";

export const legacyMetadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Mauritius Explored - Learn how we collect, use, and protect your personal information.",
  alternates: { canonical: "/privacy-policy" },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = getPrivacyInfo(locale);
  return { title: t.metadata.title, description: t.metadata.description, alternates: { canonical: "/privacy-policy" } };
}

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getPrivacyInfo(locale);

  return (
    <main id="main-content" className="min-h-screen">
      <Navbar />

      <section className="relative h-[44vh] min-h-[280px]">
        <Image
          src={getImageUrl("/images/banners/swimming-with-dolphins-mauritius.jpg")}
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
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg mb-10">
              <p className="text-gray-700">
                <span className="font-semibold">{t.effective}</span> {t.date}
              </p>
              <p className="text-gray-600 text-sm mt-2">{t.notice}</p>
            </div>

            <div className="bg-teal-50 rounded-lg p-8 md:p-10 mb-8">
              <h3 className="text-xl font-bold text-teal-900 mb-4">{t.commitmentTitle}</h3>
              <p className="text-teal-800 leading-relaxed">{t.commitment}</p>
            </div>

            <div className="space-y-8">
              {t.sections.map((section) => (
                <div key={section.title} className="bg-white rounded-lg p-8 md:p-10 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                      <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                      </svg>
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">{section.title}</h2>
                  </div>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-gray-700 leading-relaxed mb-4 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ))}
            </div>

            <div className="mt-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{t.termsTitle}</h2>
              <div className="bg-white rounded-lg p-8 md:p-10 shadow-sm mb-8">
                {t.termsIntro.map((paragraph) => (
                  <p key={paragraph} className="text-gray-700 leading-relaxed mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {t.terms.map((term) => (
                  <div key={term.title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{term.title}</h3>
                    <p className="text-gray-600 text-sm">{term.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {t.ctaTitle}
          </h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">{t.ctaText}</p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition-colors"
          >
            {t.cta}
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
