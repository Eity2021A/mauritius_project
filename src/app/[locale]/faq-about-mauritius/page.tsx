"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { useParams } from "next/navigation";
import { ChevronDownIcon } from "@/components/icons";
import { getImageUrl } from "@/lib/image-url";
import { getFAQInfo, type FAQEntry } from "@/data/faq-info-translations";

function FAQAccordion({ item, isOpen, onToggle }: { item: FAQEntry; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-6 py-5 flex items-center justify-between text-left bg-white hover:bg-gray-50 transition-colors"
      >
        <span className="text-base md:text-lg font-medium text-gray-900 pr-4">{item.question}</span>
        <ChevronDownIcon
          className={`w-6 h-6 text-orange-500 flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-6 py-5 bg-gray-50 text-gray-600 text-base leading-relaxed border-t border-gray-200">
          <div className="space-y-3">
            {item.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {item.bullets && (
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-orange-500 rounded-full" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const params = useParams<{ locale: string }>();
  const t = getFAQInfo(params?.locale ?? "en");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main id="main-content" className="min-h-screen">
      <Navbar />

      <section className="relative h-[44vh] min-h-[280px]">
        <Image
          src={getImageUrl("/images/banners/surfing-barrel-wave-mauritius.jpg")}
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
          <div className="max-w-3xl mx-auto">
            <p className="text-center text-gray-600 mb-10">
              {t.introBefore}{" "}
              <Link href="/contact" className="text-orange-500 hover:underline">
                {t.introLink}
              </Link>
              {t.introAfter}
            </p>

            <div className="space-y-4">
              {t.faqs.map((faq, index) => (
                <FAQAccordion
                  key={faq.question}
                  item={faq}
                  isOpen={openIndex === index}
                  onToggle={() => handleToggle(index)}
                />
              ))}
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
            {t.ctaButton}
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
