import type { ReactNode } from "react";
import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import TransferRequestForm from "@/components/transfer/TransferRequestForm";
import { DEFAULT_OG_IMAGE } from "@/lib/constants";
import { FAQJsonLd, HowToJsonLd } from "@/components/seo/JsonLd";
import { getTransportTranslations } from "@/data/transport-translations";
import { localizeStaticPage } from "@/lib/static-page-localizer";
import { normalizeLocale } from "@/i18n/routing";

export const legacyTransferMetadata: Metadata = {
  title: "Mauritius Airport Transfers - Private Drivers & Fixed Prices",
  description:
    "Arrange private Mauritius transfers for airport arrivals, hotel pick-ups, villa stays, beaches, activities and day trips.",
  openGraph: {
    title: "Mauritius Airport Transfers - Private Drivers & Fixed Prices",
    description:
      "Private transfers in Mauritius for airport arrivals, hotel pick-ups, villa transfers, beaches, activities and day trips.",
    type: "website",
    images: [DEFAULT_OG_IMAGE],
  },
  alternates: {
    canonical: "/mauritius-transfer-airport-hotel",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const activeLocale = normalizeLocale(locale);
  const { transfer } = getTransportTranslations(activeLocale);

  return {
    title: transfer.metaTitle,
    description: transfer.metaDescription,
    openGraph: {
      title: transfer.metaTitle,
      description: transfer.metaDescription,
      type: "website",
      images: [DEFAULT_OG_IMAGE],
    },
    alternates: {
      canonical: "/mauritius-transfer-airport-hotel",
    },
  };
}

const transferTypes = [
  {
    title: "Airport",
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3 14.5h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path
          d="M6.5 14.5 9 9.5c.2-.4.57-.68 1-.76l1.4-.26c.38-.07.76.1.95.43l1.25 2.1c.14.23.39.39.66.43l3.13.47c.83.12 1.44.84 1.44 1.68V15"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="8" cy="16.8" r="1.2" fill="currentColor" />
        <circle cx="16" cy="16.8" r="1.2" fill="currentColor" />
      </svg>
    ),
    iconColor: "text-sky-500",
  },
  {
    title: "Hotel & Villa",
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M5 10.5 12 5l7 5.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7 9.5V18h10V9.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M10 18v-3.5h4V18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    iconColor: "text-teal-500",
  },
  {
    title: "Dining & Beaches",
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M7.5 5v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M5 5v3a2.5 2.5 0 0 0 5 0V5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M7.5 11v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M15.5 5v14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M18.5 5v5c0 1.1-.9 2-2 2h-1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    iconColor: "text-orange-500",
  },
  {
    title: "Activities",
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 4.5 18.5 11 12 17.5 5.5 11 12 4.5Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M9.5 11h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    iconColor: "text-amber-500",
  },
  {
    title: "Day Trips",
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M12 4v1.5M12 18.5V20M4 12h1.5M18.5 12H20M6.35 6.35 7.4 7.4M16.6 16.6l1.05 1.05M17.65 6.35 16.6 7.4M7.4 16.6l-1.05 1.05"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
    iconColor: "text-lime-500",
  },
];

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-[1.3rem] sm:text-[1.45rem] font-bold uppercase tracking-[0.01em] text-[#1e2434]">
      {children}
    </h2>
  );
}

export default async function TransferPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const activeLocale = normalizeLocale(locale);
  const { transfer } = getTransportTranslations(activeLocale);
  const transferFaqs = transfer.faqs;
  const indicativeTransferFares = transfer.fares;
  const steps = transfer.steps;

  return localizeStaticPage((
    <main id="main-content" className="min-h-screen text-[#384255]">
      <FAQJsonLd items={transferFaqs} />
      <HowToJsonLd
        name={transfer.schemaName}
        description={transfer.schemaDescription}
        steps={steps.map((step) => ({
          name: step.title,
          text: step.description,
        }))}
      />
      <Navbar />

      <section className="px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <h1 className="text-[2.15rem] leading-tight font-bold text-[#1d2435] sm:text-[2.8rem]">
              {transfer.h1}
            </h1>
            <p className="mt-3 text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-[#f26d21] sm:text-[0.9rem]">
              {transfer.kicker}
            </p>
            <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-[#4c5870] sm:text-[1.02rem]">
              {transfer.subtitle}
            </p>
          </div>

          <div className="mt-12 text-center">
            <SectionHeading>{transfer.howTitle}</SectionHeading>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {steps.map((step) => (
                <article
                  key={step.number}
                  className="rounded-2xl border border-[#e8dccf] bg-white px-5 py-6 shadow-[0_8px_24px_rgba(99,78,50,0.08)]"
                >
                  <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#f26d21] text-lg font-bold text-white">
                    {step.number}
                  </div>
                  <h3 className="mt-4 text-[1.02rem] font-semibold text-[#1d2435]">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#6a7387]">{step.description}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <SectionHeading>{transfer.coveredTitle}</SectionHeading>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {transferTypes.map((item, index) => (
                <article
                  key={transfer.types[index] ?? item.title}
                  className="rounded-2xl bg-white px-4 py-5 shadow-[0_8px_24px_rgba(99,78,50,0.08)] "
                  style={{ backgroundColor: "#ebebea" }}
                >
                  <div
                    className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#fff]  ${item.iconColor}`}
                  >
                    {item.icon}
                  </div>
                  <h3 className="mt-4 text-sm font-medium text-[#1d2435] sm:text-[0.95rem]">
                    {transfer.types[index] ?? item.title}
                  </h3>
                </article>
              ))}
            </div>
            <p className="mx-auto mt-6 max-w-4xl text-sm leading-7 text-[#4c5870] sm:text-[1.02rem]">
              {transfer.coveredText}
            </p>
          </div>

          <div className="mt-10 rounded-[1.4rem] border border-[#e1d5c7] px-5 py-10 shadow-[0_8px_24px_rgba(99,78,50,0.06)] sm:px-8 sm:py-7" style={{ backgroundColor: "#ebebea" }}>
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white text-[#b7aa98] shadow-sm">
                <svg className="h-12 w-12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M12 7.5 17 16.5H7L12 7.5Z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M12 11.2v2.3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  <circle cx="12" cy="15.3" r=".7" fill="currentColor" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#1d2435]">{transfer.importantTitle}</h2>
                <p className="mt-3 max-w-4xl text-sm leading-7 text-[#6a7387] sm:text-[0.98rem]">
                  {transfer.importantText}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 overflow-hidden rounded-[1.4rem] border border-[#e1d5c7] bg-white shadow-[0_8px_24px_rgba(99,78,50,0.06)]">
            <div className="bg-[#f8f4ef] px-5 py-4 sm:px-8">
              <h2 className="text-xl font-bold text-[#1d2435]">
                {transfer.faresTitle}
              </h2>
              <p className="mt-1 text-sm leading-6 text-[#6a7387]">
                {transfer.faresText}
              </p>
            </div>
            <div className="divide-y divide-[#eadfd3]">
              {indicativeTransferFares.map((item) => (
                <div
                  key={item.route}
                  className="grid gap-2 px-5 py-4 text-sm sm:grid-cols-[1.4fr_0.7fr_0.7fr] sm:items-center sm:px-8"
                >
                  <span className="font-semibold text-[#1d2435]">{item.route}</span>
                  <span className="text-[#6a7387]">{item.time}</span>
                  <span className="font-bold text-[#f26d21]">{item.fare}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 rounded-[1.4rem] border border-[#e1d5c7] bg-white px-5 py-8 shadow-[0_8px_24px_rgba(99,78,50,0.06)] sm:px-8">
            <h2 className="text-xl font-bold text-[#1d2435]">
              {transfer.faqTitle}
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {transferFaqs.map((item) => (
                <article key={item.question} className="rounded-2xl bg-[#f8f4ef] p-5">
                  <h3 className="font-semibold text-[#1d2435]">{item.question}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#6a7387]">{item.answer}</p>
                </article>
              ))}
            </div>
          </div>

          <TransferRequestForm />
        </div>
      </section>
      <Footer />
    </main>
  ), activeLocale);
}
