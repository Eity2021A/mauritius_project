import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { DEFAULT_OG_IMAGE } from "@/lib/constants";
import { getMediaKitInfo } from "@/data/main-info-translations";

export const legacyMetadata: Metadata = {
  title: "Mauritius Explored Media Kit",
  description:
    "Media kit for Mauritius Explored, including audience, partnership options, featured listings and sponsored content enquiries.",
  openGraph: {
    title: "Mauritius Explored Media Kit",
    description:
      "Audience and partnership information for hotels, operators and travel brands working with Mauritius Explored.",
    images: [DEFAULT_OG_IMAGE],
  },
  alternates: { canonical: "/media-kit" },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = getMediaKitInfo(locale);
  return {
    title: t.metadata.title,
    description: t.metadata.description,
    openGraph: {
      title: t.metadata.title,
      description: t.ogDescription,
      images: [DEFAULT_OG_IMAGE],
    },
    alternates: { canonical: "/media-kit" },
  };
}

export default async function MediaKitPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getMediaKitInfo(locale);
  return (
    <main id="main-content" className="min-h-screen bg-white">
      <Navbar />
      <section className="px-4 pb-16 pt-28 sm:px-6 sm:pt-32">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-500">
            {t.kicker}
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            {t.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-600">
            {t.intro}
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {t.stats.map((item) => (
              <article key={item.label} className="rounded-2xl bg-gray-50 p-6 text-center">
                <div className="text-3xl font-bold text-orange-500">{item.value}</div>
                <div className="mt-2 text-sm font-semibold text-gray-700">{item.label}</div>
              </article>
            ))}
          </div>

          <section className="mt-10 rounded-2xl border border-orange-100 bg-orange-50/50 p-6">
            <h2 className="text-2xl font-bold text-gray-900">{t.optionsTitle}</h2>
            <ul className="mt-5 grid gap-3 text-sm leading-6 text-gray-700 md:grid-cols-2">
              {t.offers.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-6 text-gray-600">
              {t.disclosure}
            </p>
          </section>

          <Link
            href="/contact"
            className="mt-8 inline-flex rounded-full bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
          >
            {t.cta}
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
