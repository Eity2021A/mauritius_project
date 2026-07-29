import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getImageUrl } from "@/lib/image-url";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/constants";
import { FAQJsonLd, ProductJsonLd } from "@/components/seo/JsonLd";
import { getTranslations } from "next-intl/server";

type FaqItem = {
  question: string;
  answer: string;
};

type StatItem = {
  value?: string;
  label: string;
  icon?: string;
};

type ReasonItem = {
  title: string;
  description: string;
  tone: "orange" | "teal" | "slate" | "gold";
  icon: string;
};

type InsideItem = {
  title: string;
  description: string;
  badge?: string;
  icon: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "PocketGuide.metadata" });
  const title = t("title");
  const description = t("description");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE.url],
    },
    alternates: { canonical: "/pocket-guide" },
  };
}

function PocketIcon({
  name,
  className = "h-6 w-6",
}: {
  name: string;
  className?: string;
}) {
  const props = {
    className,
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: 1.9,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "phone":
      return (
        <svg {...props}>
          <rect x="6" y="2.5" width="12" height="19" rx="2.6" />
          <path d="M10.5 18.5h3" />
        </svg>
      );
    case "pin":
      return (
        <svg {...props}>
          <path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Z" />
          <circle cx="12" cy="10" r="2.3" />
        </svg>
      );
    case "plane":
      return (
        <svg {...props}>
          <path d="M10.2 13.8 3 12l1-2 6 .9 4-5.4c.7-.9 2.4-1.6 3-.9.6.7 0 2.3-.9 3l-5.4 4 .9 6-2 1-1.9-7.7-.6.6-.4 2.6-1.4.7-.2-3.3Z" />
        </svg>
      );
    case "bulb":
      return (
        <svg {...props}>
          <path d="M9 18h6M10 21h4M8 11a4 4 0 1 1 8 0c0 1.8-1.2 2.7-1.7 3.6-.3.6-.3 1.4-.3 1.4H10s0-.8-.3-1.4C9.2 13.7 8 12.8 8 11Z" />
        </svg>
      );
    case "route":
      return (
        <svg {...props}>
          <circle cx="6" cy="18" r="2.3" />
          <circle cx="18" cy="6" r="2.3" />
          <path d="M8.2 17.4C13 16 17 14 16.4 8.5M6 15.7V9a3 3 0 0 1 3-3h4" />
        </svg>
      );
    case "wave":
      return (
        <svg {...props}>
          <path d="M2 9c2.2-2 4-2 6 0s3.8 2 6 0 3.8-2 6 0" />
          <path d="M2 15c2.2-2 4-2 6 0s3.8 2 6 0 3.8-2 6 0" />
        </svg>
      );
    case "boat":
      return (
        <svg {...props}>
          <path d="M3 17h18l-2 3H5l-2-3Z" />
          <path d="M12 3v12M12 5l6 8H12M12 7l-5 6h5" />
        </svg>
      );
    case "compass":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
        </svg>
      );
    case "car":
      return (
        <svg {...props}>
          <path d="M3 13l2-5a2 2 0 0 1 1.9-1.3h10.2A2 2 0 0 1 19 8l2 5v4h-2v-2H5v2H3v-4Z" />
          <circle cx="7" cy="17" r="1.5" />
          <circle cx="17" cy="17" r="1.5" />
        </svg>
      );
    case "star":
      return (
        <svg {...props}>
          <path d="M12 3l2.6 5.6 6 .7-4.4 4.1 1.2 6L12 16.8 6.6 19.4l1.2-6L3.4 9.3l6-.7Z" />
        </svg>
      );
    case "family":
      return (
        <svg {...props}>
          <circle cx="8" cy="7" r="2.3" />
          <circle cx="16" cy="7" r="2.3" />
          <path d="M4 20v-3a4 4 0 0 1 8 0v3M12 20v-3a4 4 0 0 1 8 0v3" />
        </svg>
      );
    case "food":
      return (
        <svg {...props}>
          <path d="M6 3v7a2 2 0 0 0 4 0V3M8 10v11M18 3c-1.5 0-2.5 2-2.5 5s1 4 2.5 4m0-9v18" />
        </svg>
      );
    case "map":
      return (
        <svg {...props}>
          <path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z" />
          <path d="M9 4v14M15 6v14" />
        </svg>
      );
    default:
      return null;
  }
}

export default async function PocketGuidePage() {
  const t = await getTranslations("PocketGuide");
  const pocketGuideFaqs = t.raw("faqs") as FaqItem[];
  const stats = t.raw("stats") as StatItem[];
  const reasons = t.raw("reasons") as ReasonItem[];
  const insideItems = t.raw("inside.items") as InsideItem[];

  return (
    <main
      id="main-content"
      className="min-h-screen bg-[#fffdf7] text-[#0a2e3d]"
    >
      <FAQJsonLd items={pocketGuideFaqs} />
      <ProductJsonLd
        name={t("product.name")}
        description={t("product.description")}
        url={`${SITE_URL}/pocket-guide`}
        image={DEFAULT_OG_IMAGE.url}
      />
      <Navbar />
      <h1 className="sr-only">
        {t("metadata.title")}
      </h1>
      {/* <section className="relative overflow-hidden bg-[linear-gradient(180deg,#0e3d6e_0%,#2e6ba5_52%,#6a9acc_100%)] px-4 pb-20 pt-24 text-white sm:px-8 sm:pb-24 sm:pt-32 lg:px-10">
        <div className="absolute left-[-60px] top-[290px] h-[100px] w-[260px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.85),rgba(255,255,255,0))] opacity-50" />
        <div className="absolute right-[-40px] top-[320px] h-[110px] w-[260px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.85),rgba(255,255,255,0))] opacity-40" />

        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="rounded-2xl bg-[rgba(251,244,230,0.97)] px-4 py-3 shadow-[0_6px_18px_rgba(4,16,22,0.22)]">
              <Image
                src={getImageUrl("/images/mauritius-explored-logo.svg")}
                alt="Mauritius Explored"
                width={160}
                height={44}
                className="h-8 w-auto sm:h-10"
                priority
              />
            </div>

            <Link
              href="#get"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/50 bg-white/10 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-white/20 sm:px-7 sm:py-3.5 sm:text-base"
            >
              Get the guide
            </Link>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="text-center lg:text-left">
              <p className="text-xs font-extrabold uppercase tracking-[0.35em] text-[#ffd8a6] sm:text-sm">
                Summer 2026 - Local Pocket Guide
              </p>
              <h1 className="mt-4 font-serif text-4xl font-semibold leading-[0.95] tracking-[-0.03em] text-white drop-shadow-[0_4px_30px_rgba(4,18,30,0.35)] sm:text-6xl lg:text-7xl">
                Mauritius,
                <br />
                in your pocket.
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#eaf2fb] sm:text-lg sm:leading-8 lg:mx-0">
                All the inspiration you need to plan your perfect holiday,
                <span className="font-bold text-white">
                  {" "}
                  every beach, waterfall, road trip and hidden gem
                </span>{" "}
                from MauritiusExplored.com, packed into one compact guide made
                for travelling.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4 lg:justify-start">
              <Link
                  href="/pocket-guide/checkout"
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#f0712a] px-7 py-4 text-base font-extrabold text-white shadow-[0_10px_24px_rgba(218,90,24,0.32)] transition hover:bg-[#da5a18] sm:min-h-0"
                >
                  Get the pocket guide
                </Link>
                <Link
                  href="#inside"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/60 bg-white/10 px-7 py-4 text-base font-extrabold text-white transition hover:bg-white/20 sm:min-h-0"
                >
                  See what&apos;s inside
                </Link>
              </div>
            </div>

            <div className="relative flex justify-center">
              <svg
                className="absolute right-[1%] top-[-18px] hidden h-28 w-40 text-[#fbf4e6]/90 lg:block"
                viewBox="0 0 230 150"
                fill="currentColor"
                aria-hidden="true"
              >
                <g transform="translate(150,70) rotate(-8) scale(0.92)">
                  <path d="M-54 1 C-34 -6 16 -7 50 -1 C32 6 -28 7 -54 1 Z" />
                  <path d="M-52 0 L-76 -2 L-56 4 Z" />
                  <path d="M-12 -2 C2 -26 24 -54 52 -72 C48 -54 32 -28 16 -6 C6 -2 -4 0 -12 -2 Z" />
                  <path d="M-8 2 C0 20 18 40 44 54 C38 38 24 18 12 5 C5 2 -2 1 -8 2 Z" />
                  <path d="M48 -1 C84 5 124 13 154 26 C126 16 86 9 50 5 Z" />
                </g>
              </svg>

              <div className="relative w-full max-w-[280px] rotate-[3.5deg] rounded-[38px] bg-[#0a222e] p-3 shadow-[0_40px_80px_rgba(4,18,30,0.5)] sm:max-w-[310px]">
                <div className="absolute left-1/2 top-5 h-1.5 w-16 -translate-x-1/2 rounded-full bg-white/25" />
                <div className="relative aspect-[0.58] overflow-hidden rounded-[28px]">
                  <Image
                    src={getImageUrl("/images/mauritius.jpg")}
                    alt="Mauritius Summer 2026 pocket guide cover"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 280px, 310px"
                    priority
                  />
                </div>
              </div>

              <div className="absolute left-[6%] top-[10%] hidden h-11 w-11 items-center justify-center rounded-full bg-white text-[#f0712a] shadow-[0_10px_22px_rgba(4,18,30,0.28)] sm:flex">
                <PocketIcon name="pin" className="h-5 w-5" />
              </div>
              <div className="absolute bottom-[16%] right-[4%] hidden h-11 w-11 items-center justify-center rounded-full bg-white text-[#0b7c89] shadow-[0_10px_22px_rgba(4,18,30,0.28)] sm:flex">
                <PocketIcon name="wave" className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>

        <svg
          className="absolute bottom-0 left-0 h-[70px] w-full"
          viewBox="0 0 1440 70"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 40 C240 8 480 8 720 30 C960 52 1200 60 1440 30 L1440 70 L0 70 Z"
            fill="#FFFDF7"
          />
        </svg>
      </section> */}
      {/* <section className="pt-16 relative">
        <Image
          src={getImageUrl(
            "/images/banners/Mauritius-Pocket-Guide-Where-to-go.png",
          )}
          alt="Mauritius Summer 2026 pocket guide cover"
          width={1200}
          height={500}
          className="w-full object-cover"
        />
        
        <div className="absolute  2xl:bottom-20 xl:bottom-15 sm:bottom-5 bottom-0 xl:left-6 sm:left-3 left-0 right-0">
          <Link
            href="/pocket-guide/checkout"
            className="inline-flex lg:min-h-12 md:min-h-10 min-h-6 items-center justify-center rounded-full bg-[#f0712a] sm:px-7 px-3 sm:py-4 py-2  xl:text-base sm:text-[12px] text-[9px] font-extrabold text-white shadow-[0_10px_24px_rgba(218,90,24,0.32)] transition hover:bg-[#da5a18] sm:min-h-0"
          >
            Get the pocket guide
          </Link>
        </div>

      </section> */}

      <section className="pt-16 relative">
  <Image
    src={getImageUrl(
      "/images/banners/Mauritius-Pocket-Guide-Where-to-go.png",
    )}
    alt={t("hero.imageAlt")}
    width={1200}
    height={500}
    className="w-full object-cover"
  />
  
  <div className="absolute 2xl:bottom-20 xl:bottom-15 sm:bottom-5 bottom-2 left-1/2 -translate-x-1/2 xl:left-6 xl:translate-x-0">
    <Link
      href="/pocket-guide/checkout"
      className="inline-flex lg:min-h-12 md:min-h-10 min-h-6 items-center justify-center rounded-full bg-[#f0712a] sm:px-7 px-3 sm:py-4 py-2 xl:text-base sm:text-[12px] text-[7px] font-extrabold text-white shadow-[0_10px_24px_rgba(218,90,24,0.32)] transition hover:bg-[#da5a18] sm:min-h-0 whitespace-nowrap"
    >
      {t("buttons.getGuide")}
    </Link>
  </div>
</section>
      <section className="relative z-10 px-4 sm:px-8 lg:px-10">
        <div className="mx-auto  mt-12 max-w-7xl rounded-[22px] border border-[#e9dbbb] bg-white p-5 shadow-[0_20px_50px_rgba(20,40,46,0.08)]  sm:p-7">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center justify-center gap-2 text-center md:px-4 lg:border-l lg:border-[#e9dbbb] lg:first:border-l-0"
              >
                {stat.value ? (
                  <span className="font-serif text-4xl font-semibold text-[#f0712a]">
                    {stat.value}
                  </span>
                ) : (
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e2f1f1] text-[#0b7c89]">
                    <PocketIcon name={stat.icon ?? "map"} className="h-5 w-5" />
                  </span>
                )}
                <span className="text-sm font-bold leading-5 text-[#405a64]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.35em] text-[#f0712a] sm:text-sm">
              {t("reasonsKicker")}
            </p>
            <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight text-[#0a2e3d] sm:text-5xl">
              {t("reasonsTitle")}
            </h2>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {reasons.map((item) => (
              <article
                key={item.title}
                className="rounded-[20px] border border-[#e9dbbb] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(20,40,46,0.09)] sm:p-8"
              >
                <div
                  className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${
                    item.tone === "orange"
                      ? "bg-[#fce7d8] text-[#da5a18]"
                      : item.tone === "teal"
                        ? "bg-[#e2f1f1] text-[#0b7c89]"
                        : item.tone === "gold"
                          ? "bg-[#f8eccf] text-[#b98a2a]"
                          : "bg-[#e4edf1] text-[#0a2e3d]"
                  }`}
                >
                  <PocketIcon name={item.icon} className="h-7 w-7" />
                </div>
                <h3 className="font-serif text-2xl font-semibold leading-tight text-[#0a2e3d]">
                  {item.title}
                </h3>
                <p className="mt-3 text-[15.5px] leading-7 text-[#405a64]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>

            <div className="mt-10 flex justify-center">
        <Link
            href="/pocket-guide/checkout"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#f0712a] px-7 py-4 text-base font-extrabold text-white shadow-[0_10px_24px_rgba(218,90,24,0.32)] transition hover:bg-[#da5a18] sm:min-h-0"
          >
            {t("buttons.getGuide")}
          </Link>
        </div>
        </div>
      </section>

      <section
        id="inside"
        className="bg-[linear-gradient(180deg,#fbf4e6_0%,#f7efdd_100%)] px-4 py-16 sm:px-8 lg:px-10 lg:py-20"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.35em] text-[#f0712a] sm:text-sm">
              {t("inside.kicker")}
            </p>
            <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight text-[#0a2e3d] sm:text-5xl">
              {t("inside.title")}
            </h2>
            <p className="mt-4 text-lg leading-8 text-[#405a64]">
              {t("inside.description")}
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2 lg:gap-x-8">
            {insideItems.map((item) => (
              <article
                key={item.title}
                className="flex flex-col gap-4 rounded-[18px] border border-[#e9dbbb] bg-white/70 p-5 sm:flex-row sm:p-6"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#e9dbbb] bg-white text-[#0b7c89]">
                  <PocketIcon name={item.icon} className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold leading-6 text-[#0a2e3d]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#405a64]">
                    {item.description}
                  </p>
                  {item.badge ? (
                    <span className="mt-3 inline-block rounded-full bg-[#fce7d8] px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#f0712a]">
                      {item.badge}
                    </span>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="get"
        className="relative overflow-hidden bg-[linear-gradient(140deg,#0e3d6e,#0b7c89)] px-4 py-20 text-center text-white sm:px-8 lg:px-10"
      >
        <div className="absolute bottom-[-80px] right-[-40px] h-[280px] w-[280px] rounded-full bg-[radial-gradient(circle,rgba(255,210,140,0.5),rgba(255,210,140,0))]" />
        <div className="relative mx-auto max-w-3xl">
          <h2 className="font-serif text-4xl font-semibold leading-tight sm:text-5xl">
            {t("finalCta.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-[#dceff0]">
            {t("finalCta.description")}
          </p>
          <Link
            href="/pocket-guide/checkout"
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[#f0712a] px-8 py-4 text-lg font-extrabold text-white shadow-[0_14px_34px_rgba(0,0,0,0.28)] transition hover:bg-[#da5a18]"
          >
            {t("buttons.getGuide")}
          </Link>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-6xl rounded-[22px] border border-[#e9dbbb] bg-white p-6 shadow-[0_20px_50px_rgba(20,40,46,0.08)] sm:p-8">
          <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-[#f0712a]">
            {t("faqKicker")}
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-[#0a2e3d] sm:text-4xl">
            {t("faqTitle")}
          </h2>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {pocketGuideFaqs.map((item) => (
              <article key={item.question} className="rounded-2xl bg-[#fff9ee] p-5">
                <h3 className="font-bold text-[#0a2e3d]">{item.question}</h3>
                <p className="mt-3 text-sm leading-6 text-[#49636d]">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
