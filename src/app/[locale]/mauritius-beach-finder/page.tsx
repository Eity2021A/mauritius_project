import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TOP_BEACHES } from "@/data/beaches";
import { DEFAULT_OG_IMAGE } from "@/lib/constants";
import { getUtilityPageInfo } from "@/data/utility-page-translations";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = getUtilityPageInfo(locale).beachFinder;

  return {
    title: t.metadata.title,
    description: t.metadata.description,
    openGraph: {
      title: t.metadata.title,
      description: t.ogDescription,
      images: [DEFAULT_OG_IMAGE],
    },
    alternates: { canonical: "/mauritius-beach-finder" },
  };
}

export default async function MauritiusBeachFinderPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getUtilityPageInfo(locale).beachFinder;

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

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {t.picks.map((item) => (
              <Link
                key={item.need}
                href={item.href}
                className="rounded-2xl border border-gray-100 bg-gray-50 p-6 transition hover:border-orange-100 hover:bg-orange-50/50"
              >
                <span className="text-sm font-bold uppercase tracking-[0.16em] text-orange-500">
                  {item.need}
                </span>
                <h2 className="mt-2 text-2xl font-bold text-gray-900">{item.beach}</h2>
              </Link>
            ))}
          </div>

          <section className="mt-10">
            <h2 className="text-2xl font-bold text-gray-900">{t.popularTitle}</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {TOP_BEACHES.map((beach) => (
                <Link
                  key={beach.slug}
                  href={`/beaches-in-mauritius/${beach.slug}`}
                  className="rounded-xl border border-gray-100 p-4 text-sm font-semibold text-gray-800 hover:border-orange-100 hover:text-orange-600"
                >
                  {beach.name}
                </Link>
              ))}
            </div>
          </section>
        </div>
      </section>
      <Footer />
    </main>
  );
}
