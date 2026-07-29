import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlanTripButton from "@/components/PlanTripButton";
import ButtonLabel from "@/components/ButtonLabel";
import MonthByMonthGuide from "./MonthByMonthGuide";
import { getImageUrl } from "@/lib/image-url";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import { getTranslations } from "next-intl/server";

type FaqItem = { question: string; answer: string };
type MonthSummary = { month: string; summary: string };
type SeasonActivity = {
  title: string;
  description: string;
  bestSeason: string;
  image: string;
  href: string;
  alt: string;
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("BestTimeToVisit.metadata");

  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: "/best-time-to-visit-to-mauritius" },
  };
}

export default async function BestTimeToVisitPage() {
  const t = await getTranslations("BestTimeToVisit");
  const faqs = t.raw("faqs") as FaqItem[];
  const monthSummaries = t.raw("monthSummaries") as MonthSummary[];
  const seasonActivities = t.raw("seasonActivities.items") as SeasonActivity[];

  return (
    <main id="main-content" className="min-h-screen bg-white">
      <FAQJsonLd items={faqs} />
      <Navbar />

      <section className="relative h-[44vh] min-h-[280px]">
        <Image
          src={getImageUrl("/images/banners/le-morne-aerial-view-mauritius.jpg")}
          alt={t("hero.imageAlt")}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center px-4 max-w-4xl mx-auto translate-y-[2rem]">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {t("hero.title")}
            </h1>
            <p className="text-white/90 text-base md:text-lg max-w-2xl mx-auto">
              {t("hero.subtitle")}
            </p>
          </div>
        </div>
      </section>

      <section className="py-6 md:py-8 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            {t("intro.title")}
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 text-justify">
            <p>
              {t("intro.p1Before")} <span className="font-semibold text-orange-600">{t("intro.bestMonths")}</span> {t("intro.p1After")}
            </p>
            <p>{t("intro.p2")}</p>
            <p className="font-medium text-gray-900 mt-6 mb-1">{t("intro.mythTitle")}</p>
            <p className="font-bold text-orange-600 text-lg uppercase tracking-wide">{t("intro.mythAnswer")}</p>
            <p>{t("intro.p3")}</p>
          </div>
        </div>
      </section>

      <section id="live-weather" className="pt-6 md:pt-8 pb-12 md:pb-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <p className="text-gray-700 text-base font-medium mb-2">
            {t("seasons.title")}
          </p>
          <div className="rounded-lg border border-gray-200 bg-white overflow-hidden divide-y divide-gray-200 max-w-md mb-8">
            <div className="flex items-center justify-between gap-4 px-4 py-3">
              <span className="text-gray-700 text-base">{t("seasons.summer")}</span>
              <span className="text-gray-600 text-base">{t("seasons.summerPeriod")}</span>
            </div>
            <div className="flex items-center justify-between gap-4 px-4 py-3">
              <span className="text-gray-700 text-base">{t("seasons.winter")}</span>
              <span className="text-gray-600 text-base">{t("seasons.winterPeriod")}</span>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            {t("weather.title")}
          </h2>
          <div className="w-[90%] max-w-[90%] mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <iframe
              src="https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=mm&metricTemp=Â°C&metricWind=km/h&zoom=10&overlay=rain&product=ecmwf&level=surface&lat=-20.364&lon=57.568&detailLat=-20.287&detailLon=57.582&detail=true&message=true"
              width={650}
              height={700}
              frameBorder="0"
              className="w-full h-[400px] sm:h-[550px] lg:h-[700px]"
              title={t("weather.iframeTitle")}
              allowFullScreen
              loading="lazy"
            />
            <p className="text-xs sm:text-sm text-gray-400 text-center py-2 bg-gray-50">
              {t("weather.credit")}
            </p>
          </div>
        </div>
      </section>

      <MonthByMonthGuide />

      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            {t("monthSummaryTitle")}
          </h2>
          <p className="text-gray-600 mb-8 max-w-3xl">
            {t("monthSummarySubtitle")}
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {monthSummaries.map((item) => (
              <article key={item.month} className="rounded-lg border border-gray-200 bg-gray-50 p-5">
                <h3 className="text-lg font-semibold text-gray-900">{item.month}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-700">{item.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            {t("faqTitle")}
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {faqs.map((item) => (
              <article
                key={item.question}
                className="rounded-lg border border-gray-200 bg-gray-50 p-5"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.question}
                </h3>
                <p className="mt-3 text-sm leading-6 text-gray-700">
                  {item.answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            {t("seasonCopy.title")}
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6 text-justify">
            <p>{t("seasonCopy.p1")}</p>
            <p><strong className="text-gray-900">{t("seasonCopy.summerLabel")}</strong> {t("seasonCopy.summerBody")}</p>
            <p><strong className="text-gray-900">{t("seasonCopy.autumnLabel")}</strong> {t("seasonCopy.autumnBody")}</p>
            <p>{t("seasonCopy.winterBefore")} <strong className="text-gray-900">{t("seasonCopy.winterLabel")}</strong> {t("seasonCopy.winterBody")}</p>
            <p>{t("seasonCopy.p5")}</p>
            <p>{t("seasonCopy.springBefore")} <strong className="text-gray-900">{t("seasonCopy.springLabel")}</strong> {t("seasonCopy.springBody")}</p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-6 md:p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {t("mythBox.title")}
            </h3>
            <p className="text-gray-700">
              <strong>{t("mythBox.bold")}</strong> {t("mythBox.body")}
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            {t("seasonActivities.title")}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {seasonActivities.map((activity) => (
              <Link
                key={activity.title}
                href={activity.href}
                className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow flex flex-col"
                aria-label={t("seasonActivities.aria", { title: activity.title, season: activity.bestSeason })}
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-200">
                  <Image
                    src={getImageUrl(activity.image, { width: 400, quality: 75 })}
                    alt={activity.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {activity.title}
                  </h3>
                  <p className="text-gray-600 mb-3 flex-1">
                    {activity.description}
                  </p>
                  <p className="text-sm text-orange-600 font-medium">{t("seasonActivities.best", { season: activity.bestSeason })}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gradient-to-br from-orange-500 to-orange-600">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {t("cta.title")}
          </h2>
          <p className="text-white/90 text-lg mb-8">
            {t("cta.body")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PlanTripButton
              href="/beaches-in-mauritius"
              className="inline-flex items-center justify-center px-8 py-4 min-h-[48px] bg-white text-orange-500 font-semibold rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-90 disabled:cursor-wait"
            >
              <ButtonLabel name="exploreBeaches" />
            </PlanTripButton>
            <PlanTripButton
              href="/mauritius-activities"
              className="inline-flex items-center justify-center px-8 py-4 min-h-[48px] bg-orange-700 text-white font-semibold rounded-lg hover:bg-orange-800 transition-colors disabled:opacity-90 disabled:cursor-wait"
            >
              <ButtonLabel name="viewActivities" />
            </PlanTripButton>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
