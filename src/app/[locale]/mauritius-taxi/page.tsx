import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ButtonLabel from "@/components/ButtonLabel";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/constants";
import { HOME_ITINERARIES } from "@/data/home";
import { getImageUrl } from "@/lib/image-url";
import { FAQJsonLd, ServiceJsonLd } from "@/components/seo/JsonLd";
import { getTransportTranslations } from "@/data/transport-translations";

const TAXI_WHATSAPP_NUMBER_DISPLAY = "+230 5712 1810";
const TAXI_WHATSAPP_URL = "https://wa.me/23057121810";

export const legacyTaxiMetadata: Metadata = {
  title: "Taxi Service in Mauritius",
  description:
    "Find an independent taxi service in Mauritius for airport transfers, hotel pick-ups, beach rides and private day tours.",
  openGraph: {
    title: "Taxi Service in Mauritius",
    description:
      "Independent taxi listing in Mauritius for airport transfers, hotel pick-ups, private island tours and day trips.",
    type: "website",
    images: [DEFAULT_OG_IMAGE],
  },
  alternates: {
    canonical: "/mauritius-taxi",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { taxi } = getTransportTranslations(locale);

  return {
    title: taxi.metaTitle,
    description: taxi.metaDescription,
    openGraph: {
      title: taxi.metaTitle,
      description: taxi.metaDescription,
      type: "website",
      images: [DEFAULT_OG_IMAGE],
    },
    alternates: {
      canonical: "/mauritius-taxi",
    },
  };
}

const comfortHighlights = [
  {
    title: "Don't Drive",
    description: "We handle the roads, roundabouts & parking.",
    iconColor: "text-sky-500",
    iconBg: "bg-[#edf5fe]",
    icon: (
      <svg className="h-[32px] w-[32px]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 14h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path
          d="M7 14l2-4c.14-.3.41-.5.74-.57l1.4-.25c.3-.06.61.07.78.34l1.18 1.92c.12.2.33.34.57.38l2.92.44c.73.1 1.28.74 1.28 1.48V14"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="8.2" cy="16.2" r="1" fill="currentColor" />
        <circle cx="15.8" cy="16.2" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Never Get Lost",
    description: "Your driver knows every road & shortcut.",
    iconColor: "text-orange-500",
    iconBg: "bg-[#fff2e9]",
    icon: (
      <svg className="h-[32px] w-[32px]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 19c3.2-4.1 4.8-7.08 4.8-8.95A4.8 4.8 0 0 0 7.2 10.05C7.2 11.92 8.8 14.9 12 19Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="10.2" r="1.55" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    title: "Enjoy the View",
    description: "Eyes on the scenery, not the GPS.",
    iconColor: "text-amber-500",
    iconBg: "bg-[#fff8e7]",
    icon: (
      <svg className="h-[32px] w-[32px]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M12 4.5v1.3M12 18.2v1.3M4.5 12h1.3M18.2 12h1.3M6.7 6.7l.9.9M16.4 16.4l.9.9M17.3 6.7l-.9.9M7.6 16.4l-.9.9"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "On Your Time",
    description: "Stop when you like - door to door.",
    iconColor: "text-cyan-600",
    iconBg: "bg-[#e9f7f8]",
    icon: (
      <svg className="h-[32px] w-[32px]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="7.2" stroke="currentColor" strokeWidth="1.2" />
        <path d="M12 8.3v4.1l2.8 1.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const helpCards = [
  {
    title: "Airport Transfers",
    description: "Smooth pick-up & drop-off for any flight.",
    iconColor: "text-sky-500",
    iconBg: "bg-[#edf5fe]",
    icon: (
      <svg className="h-[32px] w-[32px]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 14h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path
          d="M7 14l2-4c.14-.3.41-.5.74-.57l1.4-.25c.3-.06.61.07.78.34l1.18 1.92c.12.2.33.34.57.38l2.92.44c.73.1 1.28.74 1.28 1.48V14"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="8.2" cy="16.2" r="1" fill="currentColor" />
        <circle cx="15.8" cy="16.2" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Full-Day Island Tours",
    description: "North, south or west - see it all in comfort.",
    iconColor: "text-green-600",
    iconBg: "bg-[#eef8ef]",
    icon: (
      <svg className="h-[32px] w-[32px]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M5 16.5 10.2 8l3.1 5.1 1.9-3.1 4.8 6.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Custom Itineraries",
    description: "Tell us your must-sees; we plan the route.",
    iconColor: "text-orange-500",
    iconBg: "bg-[#fff2e9]",
    icon: (
      <svg className="h-[32px] w-[32px]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M7 7h10M7 12h10M7 17h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="4.5" cy="7" r="1" fill="currentColor" />
        <circle cx="4.5" cy="12" r="1" fill="currentColor" />
        <circle cx="4.5" cy="17" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Hotel & Hourly Hire",
    description: "By the hour or the day, at your service.",
    iconColor: "text-teal-500",
    iconBg: "bg-[#ebf8f4]",
    icon: (
      <svg className="h-[32px] w-[32px]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M5.5 10.5 12 5.5l6.5 5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.5 9.5V18h9V9.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M10.3 18v-3.5h3.4V18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
];


export default async function TaxiPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { taxi, common } = getTransportTranslations(locale);
  const taxiFaqs = taxi.faqs;
  const indicativeTaxiFares = taxi.fares;

  return (
    <main id="main-content" className="min-h-screen ">
      <FAQJsonLd items={taxiFaqs} />
      <ServiceJsonLd
        name={taxi.h1}
        description={taxi.serviceDescription}
        url={`${SITE_URL}/mauritius-taxi`}
        serviceType="TaxiService"
        telephone={TAXI_WHATSAPP_NUMBER_DISPLAY}
        openingHours="Mo-Su 00:00-23:59"
        offers={indicativeTaxiFares.map((item) => ({
          name: item.route,
          price: item.fare.replace(/[^\d]/g, ""),
          priceCurrency: "MUR",
          description: `${item.time}, ${item.fare}`,
        }))}
      />
      <Navbar />

      <section className="px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32">
        <div className="">
          <div className="text-center">
            <h1 className="text-[2.15rem] leading-tight font-bold text-[#1d2435] sm:text-[2.8rem]">
              {taxi.h1}
            </h1>
            <p className="mt-3 text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-[#f26d21] sm:text-[0.9rem]">
              {taxi.kicker}
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-4xl space-y-6 text-sm leading-7 text-[#4c5870] sm:text-[1.02rem]">
            <p>
              {taxi.intro1}
            </p>
            <p>
              {taxi.intro2}
            </p>
          </div>
           <div className="mt-6 text-center">


              <Link
                href={TAXI_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-[1.05rem] bg-[#f26d21] px-10 py-5 text-left text-white shadow-[0_14px_30px_rgba(242,109,33,0.22)] transition-colors hover:bg-[#e96217]"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white text-[#f26d21]">
                    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <rect x="8" y="3.5" width="8" height="17" rx="1.2" stroke="currentColor" strokeWidth="1.8" />
                      <path d="M10.5 17.5h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  </span>
                  <div>
                    <div className="lg:text-[1.8rem] text-[1.2rem] font-bold leading-none"><ButtonLabel name="bookYourTaxi" /></div>
                    <div className="mt-1 text-sm text-white/90">{common.whatsapp} - {TAXI_WHATSAPP_NUMBER_DISPLAY}</div>
                  </div>
                </div>
              </Link>


            </div>
          <div className="mx-auto mt-12 max-w-4xl">
            <h2 className="text-[1rem] font-semibold uppercase tracking-[0.08em] text-[#f26d21] sm:text-[1.05rem]">
              {taxi.servicesTitle}
            </h2>

            <div className="mt-4 rounded-[1.45rem] border border-[#e1d5c7] bg-white px-5 py-6 shadow-[0_10px_28px_rgba(99,78,50,0.08)] sm:px-7">
              <ul className="space-y-4">
                {[
                  {
                    title: "Airport transfers",
                    icon: (
                    
                          <svg className="h-[32px] w-[32px]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M4 14h16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                        <path
                          d="M7 14l2-4c.14-.3.41-.5.74-.57l1.4-.25c.3-.06.61.07.78.34l1.18 1.92c.12.2.33.34.57.38l2.92.44c.73.1 1.28.74 1.28 1.48V14"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle cx="8.2" cy="16.2" r="1" fill="currentColor" />
                        <circle cx="15.8" cy="16.2" r="1" fill="currentColor" />
                      </svg>
                    
                    ),
                  },
                  {
                    title: "Hotel and villa pick-ups",
                    icon: (
                      <svg className="h-[32px] w-[32px]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path
                          d="M5.5 10.5 12 5.5l6.5 5"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M7.5 9.5V18h9V9.5"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path d="M10.3 18v-3.5h3.4V18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                      </svg>
                    ),
                  },
                  {
                    title: "Private island tours",
                    icon: (
                      <svg className="h-[32px] w-[32px]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path
                          d="M5 16.5 10.2 8l3.1 5.1 1.9-3.1 4.8 6.5"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ),
                  },
                  {
                    title: "Restaurant and beach transfers",
                    icon: (
                      <svg className="h-[32px] w-[32px]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M8 6v5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                        <path d="M5.5 6v2.5A2.5 2.5 0 0 0 8 11a2.5 2.5 0 0 0 2.5-2.5V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                        <path d="M8 11v7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                        <path d="M15.5 6v12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                        <path d="M18.5 6v4.5A1.5 1.5 0 0 1 17 12h-1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                      </svg>
                    ),
                  },
                  {
                    title: "Custom day trips around Mauritius",
                    icon: (
                      <svg className="h-[32px] w-[32px]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.2" />
                        <circle cx="12" cy="12" r="1.1" fill="currentColor" />
                      </svg>
                    ),
                  },
                ].map((item, index) => (
                  <li key={item.title} className="flex items-center gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: '#ececea', color: '#f26d21' }}>
                      {item.icon}
                    </span>
                    <span className="text-[1rem] text-[#1d2435] sm:text-[1.02rem]">{taxi.serviceList[index] ?? item.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mx-auto mt-6 max-w-4xl rounded-[1.2rem]  px-6 py-8 shadow-[0_10px_24px_rgba(99,78,50,0.06)] sm:px-6" style={{ backgroundColor: '#f8eadb' }}>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white text-[#f26d21] shadow-sm">
                  <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="8" y="3.5" width="8" height="17" rx="1.8" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M10.5 17.5h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-[1.25rem] font-bold text-[#f26d21] sm:text-[1.55rem]">
                    {taxi.bookDirect}
                  </h2>
                  <p className="mt-1 max-w-2xl text-sm leading-6 text-[#6a7387] sm:text-[0.98rem]">
                    {taxi.bookDirectText}
                  </p>
                </div>
              </div>

              <Link
                href={TAXI_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-green-200 bg-green-50 px-6 py-3 text-sm font-bold text-green-700 transition-colors hover:bg-green-100 sm:min-w-[146px]"
              >
                {common.whatsapp}
              </Link>
            </div>
          </div>

          <div className="mx-auto mt-6 max-w-4xl rounded-[1.4rem] border border-[#e1d5c7] bg-[#F5F3F0] px-5 pt-6 pb-14 shadow-[0_8px_24px_rgba(99,78,50,0.06)] sm:px-8 sm:py-7">
            <div className="md:flex block items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-[#b7aa98] shadow-sm">
                <svg className="h-12 w-12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M12 7.5 17 16.5H7L12 7.5Z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M12 11.2v2.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <circle cx="12" cy="15.3" r=".7" fill="currentColor" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#1d2435]">{taxi.importantTitle}</h2>
                <p className="mt-3 max-w-4xl text-sm leading-7 text-[#6a7387] sm:text-[0.98rem]">
                  {taxi.importantText}
                </p>
              </div>
            </div>
          </div>

          <section className="mx-auto mt-14 max-w-5xl">
            <div className="text-center">
              <p className="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-[#f26d21] sm:text-[0.9rem]">
                {taxi.privateKicker}
              </p>
              <h2 className="mt-3 text-[2.1rem] leading-tight font-bold text-[#1d2435] sm:text-[2.8rem]">
                {taxi.relaxTitle}
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-sm italic leading-7 text-[#7d7a76] sm:text-[1rem]">
                {taxi.relaxText}
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {comfortHighlights.map((item, index) => {
                const copy = taxi.comfort[index] ?? item;

                return (
                <article
                  key={item.title}
                  className="rounded-[1.1rem] border border-[#e1d5c7] bg-white px-5 py-5 text-center shadow-[0_8px_24px_rgba(99,78,50,0.06)]"
                >
                  <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${item.iconBg} ${item.iconColor}`}>
                    {item.icon}
                  </div>
                  <h3 className="mt-4 text-[1rem] font-bold text-[#1d2435]">{copy.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#6a7387]">{copy.description}</p>
                </article>
                );
              })}
            </div>

            <div className="mt-5 rounded-[1.2rem] bg-[#f8eadb] px-5 py-5 shadow-[0_10px_24px_rgba(99,78,50,0.06)] sm:px-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-[#f26d21] shadow-sm">
                 
                  <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M12 6.5 17 9.2v5.6L12 17.5l-5-2.7V9.2l5-2.7Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M12 6.5v5.4l5 2.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <h3 className="md:text-[1.45rem] text-[1.2rem] font-bold text-[#f26d21] sm:text-[1.55rem]">
                    {taxi.holidayTitle}
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm leading-6 text-[#6a7387] sm:text-[0.98rem]">
                    {taxi.holidayText}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <h3 className="text-[1.3rem] font-bold uppercase tracking-[0.03em] text-[#1d2435] sm:text-[1.45rem]">
                {taxi.helpTitle}
              </h3>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {helpCards.map((item, index) => {
                const copy = taxi.help[index] ?? item;

                return (
                <article
                  key={item.title}
                  className="rounded-[1.1rem] border border-[#e1d5c7] bg-white px-5 py-5 shadow-[0_8px_24px_rgba(99,78,50,0.06)]"
                >
                  <div className="flex items-start gap-4">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${item.iconBg} ${item.iconColor}`}>
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-[1.08rem] font-bold text-[#1d2435]">{copy.title}</h4>
                      <p className="mt-1 text-sm leading-6 text-[#6a7387]">{copy.description}</p>
                    </div>
                  </div>
                </article>
                );
              })}
            </div>

            <div className="mt-8 text-center">
              <p className="text-[1.7rem] text-[#1d2435] sm:text-[2rem]">
                {taxi.fixedFareBefore}{" "}
                <span className="italic text-[#7d7a76]">{taxi.fixedFareHighlight}</span>
              </p>
            </div>

            <div className="mx-auto mt-6 max-w-4xl overflow-hidden rounded-[1.1rem] border border-[#e1d5c7] bg-white shadow-[0_8px_24px_rgba(99,78,50,0.06)]">
              <div className="bg-[#f8f4ef] px-5 py-4 text-left">
                <h3 className="text-lg font-bold text-[#1d2435]">
                  {taxi.faresTitle}
                </h3>
                <p className="mt-1 text-sm text-[#6a7387]">
                  {taxi.faresText}
                </p>
              </div>
              <div className="divide-y divide-[#eadfd3]">
                {indicativeTaxiFares.map((item) => (
                  <div
                    key={item.route}
                    className="grid gap-2 px-5 py-4 text-sm sm:grid-cols-[1.4fr_0.7fr_0.7fr] sm:items-center"
                  >
                    <span className="font-semibold text-[#1d2435]">{item.route}</span>
                    <span className="text-[#6a7387]">{item.time}</span>
                    <span className="font-bold text-[#f26d21]">{item.fare}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link
                href={TAXI_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-[1.05rem] bg-[#f26d21] px-10 py-5 text-left text-white shadow-[0_14px_30px_rgba(242,109,33,0.22)] transition-colors hover:bg-[#e96217]"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white text-[#f26d21]">
                    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <rect x="8" y="3.5" width="8" height="17" rx="1.2" stroke="currentColor" strokeWidth="1.8" />
                      <path d="M10.5 17.5h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </span>
                  <div>
                    <div className="lg:text-[1.8rem] text-[1.2rem] font-bold leading-none"><ButtonLabel name="bookYourTaxi" /></div>
                    <div className="mt-1 text-sm text-white/90">{common.whatsapp} - {TAXI_WHATSAPP_NUMBER_DISPLAY}</div>
                  </div>
                </div>
              </Link>

              {/* <button
                type="button"
                className="rounded-[1.05rem] bg-[#4a9a48] px-5 py-5 text-left text-white shadow-[0_14px_30px_rgba(74,154,72,0.2)] transition-colors hover:bg-[#438a41]"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white text-[#4a9a48]">
                    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.2" />
                      <path d="m8.8 12.2 2.2 2.2 4.2-4.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <div>
                    <div className="text-[1.8rem] font-bold leading-none">Get a Free Quote</div>
                    <div className="mt-1 text-sm text-white/90">mauritiusexplored.com/taxi</div>
                  </div>
                </div>
              </button> */}
            </div>

            <p className="mt-5 text-center text-[0.78rem] italic text-[#8f8b86] sm:text-[0.86rem]">
              {taxi.bottomNote}
            </p>
          </section>

          <section className="container mx-auto mt-16 ">
            <div className="text-center mb-3 md:mb-6">
              <p className="text-orange-500 text-xs md:text-sm font-medium tracking-wider uppercase">
                {taxi.privateKicker}
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-[#1d2435] mt-2">
                {taxi.roadTitle}
              </h2>
            </div>

            <div>
              <p className="md:hidden text-xs text-gray-500 text-right mb-2">{common.swipe}</p>
              <div className="flex md:grid md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 overflow-x-auto pb-4 md:pb-0 -mx-4 px-4 pr-6 md:pr-0 md:mx-0 md:px-0 snap-x snap-mandatory md:snap-none scrollbar-hide">
                {HOME_ITINERARIES.map((itinerary, index) => (
                  <Link
                    key={`${itinerary.href}-${index}`}
                    href={itinerary.href}
                    className="group relative flex-shrink-0 w-40 h-72 sm:w-48 sm:h-80 md:w-auto md:h-96 lg:h-[28rem] rounded-lg overflow-hidden cursor-pointer snap-start img-shimmer"
                  >
                    <Image
                      src={getImageUrl(itinerary.image, { width: 400, quality: 75 })}
                      fill
                      sizes="(max-width: 768px) 45vw, (max-width: 1200px) 25vw, 20vw"
                      alt={common.itineraryTitles[index] ?? itinerary.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
                    <div className="absolute top-3 left-3 right-3 md:top-4 md:left-4 md:right-4">
                      <h3 className="text-white text-base md:text-lg font-semibold drop-shadow-sm">
                        {common.itineraryTitles[index] ?? itinerary.title}
                      </h3>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 md:bottom-4 md:left-4 md:right-4 flex justify-center">
                      <span className="inline-flex items-center justify-center w-full py-2 sm:py-2.5 bg-transparent border-2 border-white text-white text-sm font-medium rounded-full group-hover:bg-white group-hover:text-gray-900 transition-colors">
                        {common.viewItinerary}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="container mx-auto mt-16">
            <div className="mx-auto max-w-5xl rounded-[1.4rem] border border-[#e1d5c7] bg-white px-5 py-8 shadow-[0_8px_24px_rgba(99,78,50,0.06)] sm:px-8">
              <h2 className="text-2xl font-bold text-[#1d2435]">
                {taxi.faqTitle}
              </h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {taxiFaqs.map((item) => (
                  <article key={item.question} className="rounded-2xl bg-[#f8f4ef] p-5">
                    <h3 className="font-semibold text-[#1d2435]">{item.question}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#6a7387]">{item.answer}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </div>
      </section>



      <Footer />
    </main>
  );
}
