import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getLocale } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { DEFAULT_OG_IMAGE } from "@/lib/constants";
import { getSystemLocale, getSystemPageTranslations } from "@/data/system-page-translations";

export async function generateMetadata(): Promise<Metadata> {
  const locale = getSystemLocale(await getLocale());
  const t = getSystemPageTranslations(locale).notFound.metadata;

  return {
    title: t.title,
    description: t.description,
    robots: { index: false, follow: true },
    openGraph: {
      title: t.openGraphTitle,
      description: t.openGraphDescription,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

function localizedHref(locale: string, href: string) {
  if (locale === "en") return href;
  return href === "/" ? `/${locale}` : `/${locale}${href}`;
}

export default async function NotFound() {
  const locale = getSystemLocale(await getLocale());
  const t = getSystemPageTranslations(locale).notFound;

  return (
    <main id="main-content" className="min-h-screen flex flex-col">
      <Navbar />

      <section className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 pt-24 pb-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-8">
            <Image
              src="/images/mauritius-explored-logo.svg"
              alt="Mauritius Explored"
              width={120}
              height={120}
              className="mx-auto opacity-50"
            />
          </div>

          <h1 className="text-8xl md:text-9xl font-bold text-orange-500 mb-4">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {t.heading}
          </h2>
          <p className="text-gray-600 max-w-md mx-auto mb-8">
            {t.body}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={localizedHref(locale, "/")}
              className="px-8 py-3 bg-orange-500 text-white font-medium rounded-full hover:bg-orange-600 transition-colors min-h-[48px] flex items-center justify-center"
            >
              {t.backHome}
            </Link>
            <Link
              href={localizedHref(locale, "/beaches-in-mauritius")}
              className="px-8 py-3 bg-white text-gray-700 font-medium rounded-full border border-gray-300 hover:border-orange-500 hover:text-orange-500 transition-colors min-h-[48px] flex items-center justify-center"
            >
              {t.exploreBeaches}
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">{t.popularPrompt}</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link href={localizedHref(locale, "/best-places-to-visit-in-mauritius")} className="text-orange-500 hover:underline">
                {t.placesToVisit}
              </Link>
              <span className="text-gray-300">•</span>
              <Link href={localizedHref(locale, "/mauritius-activities")} className="text-orange-500 hover:underline">
                {t.activities}
              </Link>
              <span className="text-gray-300">•</span>
              <Link href={localizedHref(locale, "/mauritius-island")} className="text-orange-500 hover:underline">
                {t.aboutMauritius}
              </Link>
              <span className="text-gray-300">•</span>
              <Link href={localizedHref(locale, "/contact")} className="text-orange-500 hover:underline">
                {t.contactUs}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
