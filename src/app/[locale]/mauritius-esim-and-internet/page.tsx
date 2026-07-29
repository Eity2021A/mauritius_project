import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { DEFAULT_OG_IMAGE } from "@/lib/constants";
import { getUtilityPageInfo } from "@/data/utility-page-translations";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = getUtilityPageInfo(locale).esim;

  return {
    title: t.metadata.title,
    description: t.metadata.description,
    openGraph: {
      title: t.metadata.title,
      description: t.metadata.description,
      images: [DEFAULT_OG_IMAGE],
    },
    alternates: { canonical: "/mauritius-esim-and-internet" },
  };
}

export default async function MauritiusEsimAndInternetPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getUtilityPageInfo(locale).esim;

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

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {t.options.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-orange-100 bg-orange-50/50 p-6"
              >
                <h2 className="text-xl font-bold text-gray-900">{item.title}</h2>
                <p className="mt-3 text-sm leading-6 text-gray-700">{item.description}</p>
              </article>
            ))}
          </div>

          <section className="mt-10 rounded-2xl border border-gray-100 bg-gray-50 p-6">
            <h2 className="text-2xl font-bold text-gray-900">{t.checklistTitle}</h2>
            <ul className="mt-4 grid gap-3 text-sm leading-6 text-gray-700 md:grid-cols-2">
              {t.checklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/mauritius-transfer-airport-hotel"
              className="rounded-full bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
            >
              {t.transferCta}
            </Link>
            <Link
              href="/roadtrip-mauritius"
              className="rounded-full border border-gray-200 px-6 py-3 font-semibold text-gray-800 hover:border-orange-200"
            >
              {t.roadTripCta}
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
