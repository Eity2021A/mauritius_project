import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PopularRoadTrips from "@/components/PopularRoadTrips";
import { Link } from "@/i18n/navigation";
import {
  BadgeDollarSign,
  BriefcaseBusiness,
  CalendarDays,
  CarFront,
  FileCheck2,
  HeartPulse,
  MapPin,
  PlaneLanding,
  Sun,
  TicketCheck,
  Umbrella,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import CarRentalAdBannerInfo from "@/components/CarRentalAdBannerInfo";
import PocketAdBanner from "@/components/PocketAdBanner";

const ad = {
  desktopSrc: "/images/quick-trips/Car-Rental-Mauritius.webp",
  href: "/car-rental-mauritius",
  alt: "Rent Rental Mauritius",
};
const pocket = {
  desktopSrc: "/images/quick-trips/Pocket-Guide-For-Mauritius.webp",
  href: "/pocket-guide",
  alt: "Rent Rental Mauritius",
};

const checklistLinks = [
  { href: "https://safemauritius.govmu.org/", external: true },
  { href: "/visa-requirements" },
  { href: "/visa-requirements" },
  { href: "/mauritius-island" },
  { href: "/visa-requirements" },
  undefined,
] as const;

export const revalidate = 3600;

type ChecklistItem = {
  title: string;
  description: string;
  color: string;
  background: string;
  accent?: boolean;
};

type CoastItem = {
  title: string;
  color: string;
  background: string;
  description: string;
  tags: string[];
  best: string;
  location: string;
};

const coastGuideLinks = [
  "/north-mauritius-travel-guide",
  "/east-mauritius-travel-guide",
  "/west-mauritius-travel-guide",
  "/south-mauritius-travel-guide",
] as const;

const coastLocationLinks = [
  [
    {
      name: "Grand Baie",
      href: "/best-places-to-visit-in-mauritius/grand-baie",
    },
    { name: "La Cuvette", href: "/beaches-in-mauritius/la-cuvette" },
    {
      name: "Cap Malheureux",
      href: "/best-places-to-visit-in-mauritius/cap-malheureux",
    },
  ],
  [
    { name: "Belle Mare", href: "/beaches-in-mauritius/belle-mare" },
    {
      name: "Ile Aux Cerfs",
      href: "/best-places-to-visit-in-mauritius/ile-aux-cerfs",
    },
    {
      name: "Bras d'eau National Park",
      href: "/beaches-in-mauritius/bras-deau",
    },
  ],
  [
    { name: "Flic en Flac", href: "/beaches-in-mauritius/flic-en-flac" },
    { name: "Le Morne", href: "/beaches-in-mauritius/le-morne" },
    { name: "Chamarel", href: "/exploring-chamarel" },
  ],
  [
    { name: "Gris Gris", href: "/beaches-in-mauritius/gris-gris" },
    { name: "Mahebourg", href: "/exploring-mahebourg" },
    {
      name: "Blue Bay Marine Park",
      href: "/best-places-to-visit-in-mauritius/blue-bay-marine-park",
    },
  ],
] as const;

export const legacyTravelPlannerMetadata: Metadata = {
  title: "Travel Planner for Mauritius",
  description:
    "The essential Mauritius travel planner — when to go, how to get around, what to budget and how to plan the perfect trip to the island, step by step.",
  alternates: { canonical: "/travel-planner" },
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("TravelPlanner.metadata");

  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: "/travel-planner" },
  };
}

export default async function TravelPlannerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("TravelPlanner");
  const checklistIcons = [
    TicketCheck,
    CarFront,
    BriefcaseBusiness,
    BadgeDollarSign,
    FileCheck2,
    HeartPulse,
  ];
  const checklist = t.raw("checklist.items") as ChecklistItem[];
  const coasts = t.raw("coasts.items") as CoastItem[];

  return (
    <main id="main-content" className="min-h-screen bg-white text-[#1c2a2e]">
      <Navbar />

      <article className="mx-auto w-full max-w-6xl pt-30 pb-10 px-4 xl:px-0">
        <header>
          <h1 className="font-serif text-[clamp(1.65rem,5vw,2.35rem)] font-bold tracking-tight text-[#1d3144] text-center">
            {t("hero.titleBefore")}{" "}
            <span className="text-[#e75b31]">2026:</span> {t("hero.titleAfter")}
          </h1>
          <p className="mt-4 font-serif text-sm italic text-[#75818b] sm:text-base text-center">
            {t("hero.subtitle")}
          </p>
        </header>

        <section className="mt-10">
          <h2 className="planner-section-title">
            <CalendarDays className="planner-heading-icon" />{" "}
            {t("timing.title")}
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-md bg-[#F5F3F0] px-5 py-8">
              <h3 className="font-serif font-bold text-[#e45d35]">
                {t("timing.summer.title")}
              </h3>
              <div className="mt-3 space-y-2 text-xs leading-relaxed text-[#6d7780]">
                <p>
                  <Sun className="planner-inline-icon" />{" "}
                  <strong>{t("labels.climate")}</strong>{" "}
                  {t("timing.summer.climate")}
                </p>
                <p>
                  <Umbrella className="planner-inline-icon" />{" "}
                  <strong>{t("labels.bestFor")}</strong>{" "}
                  {t("timing.summer.bestFor")}
                </p>
              </div>
            </div>
            <div className="rounded-md bg-[#F5F3F0] px-5 py-8">
              <h3 className="font-serif font-bold text-[#237cae]">
                {t("timing.winter.title")}
              </h3>
              <div className="mt-3 space-y-2 text-xs leading-relaxed text-[#6d7780]">
                <p>
                  <Sun className="planner-inline-icon" />{" "}
                  <strong>{t("labels.climate")}</strong>{" "}
                  {t("timing.winter.climate")}
                </p>
                <p>
                  <Umbrella className="planner-inline-icon" />{" "}
                  <strong>{t("labels.bestFor")}</strong>{" "}
                  {t("timing.winter.bestFor")}
                </p>
              </div>
            </div>
          </div>
          <Link
            href="/best-time-to-visit-to-mauritius"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block rounded-md border-2 border-[#3da3dc] bg-[#eaf6fe] px-5 py-6 text-center transition-colors hover:bg-[#dff1fd] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1d91c9]"
          >
            <h3 className="font-serif font-bold text-[#257dad]">
              {t("timing.sweetSpot.title")}
            </h3>
            <p className="mt-1 text-xs text-[#517183]">
              {t("timing.sweetSpot.before")}{" "}
              <span className="font-semibold text-black">
                {t("timing.sweetSpot.months")}
              </span>{" "}
            </p>
          </Link>
        </section>

        <CarRentalAdBannerInfo />
        <section className="mt-10">
          <h2 className="planner-section-title">
            <PlaneLanding className="planner-heading-icon" />{" "}
            {t("checklist.title")}
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {checklist.map(
              ({ title, description, color, background, accent }, index) => {
                const ChecklistIcon = checklistIcons[index] ?? TicketCheck;
                const checklistLink = checklistLinks[index];
                const cardClassName =
                  "rounded-md border border-[#e6dfd8] px-4 pt-4 pb-6 transition-colors hover:border-[#3da3dc] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1d91c9]";
                const cardStyle = {
                  borderColor: accent ? "#f17b57" : undefined,
                  backgroundColor: background,
                };
                const cardContent = (
                  <div className="flex gap-3">
                    <ChecklistIcon
                      className="mt-0.5 h-5 w-5 shrink-0"
                      style={{ color }}
                      strokeWidth={1.7}
                    />
                    <div>
                      <h3 className="font-serif text-sm font-bold text-[#314351]">
                        {title}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-[#2C2823]">
                        {description}
                      </p>
                    </div>
                  </div>
                );

                if (!checklistLink) {
                  return (
                    <div
                      key={title}
                      className={cardClassName}
                      style={cardStyle}
                    >
                      {cardContent}
                    </div>
                  );
                }

                if ("external" in checklistLink) {
                  return (
                    <a
                      key={title}
                      href={checklistLink.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cardClassName}
                      style={cardStyle}
                    >
                      {cardContent}
                    </a>
                  );
                }

                return (
                  <Link
                    key={title}
                    href={checklistLink.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cardClassName}
                    style={cardStyle}
                  >
                    {cardContent}
                  </Link>
                );
              },
            )}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="planner-section-title">
            <MapPin className="planner-heading-icon" /> {t("coasts.title")}
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              [
                "The Vibrant North",
                "#e65e35",
                "#F5F3F0",
                "The island’s energetic heart, perfect for social evenings and lagoon adventures.",
                ["Energy", "Boutiques", "Nightlife"],
                "Best for Families : Calm lagoons and shallow waters.",
              ],
              [
                "The Serene East",
                "#278d54",
                "#F5F3F0",
                "Home to powder-white sands and exclusive, high-end retreats for quiet sophistication.",
                ["Luxury", "Seclusion", "Sunrise"],
                "Best for Romance : Private bays and starlit dinners.",
              ],
              [
                "The Adventurous West",
                "#e65e35",
                "#F5F3F0",
                "A playground for adventure where dramatic mountains meet the sea, blessed by iconic sunsets.",
                ["Adventure", "Sunset", "Watersports"],
                "Best for Adventure : Hiking, surfing and dolphin encounters.",
              ],
              [
                "The Wild South",
                "#2789b4",
                "#F5F3F0",
                "Raw, untouched beauty where waves crash against volcanic cliffs, far from manicured resorts.",
                ["Untouched", "Rugged", "Dramatic"],
                "Best for Raw Beauty : Seeking a remote, authentic feel.",
              ],
            ].map(([title, color, background], index) => {
              const coast = coasts[index];
              const locations = coastLocationLinks[index];
              return (
                <div
                  key={title as string}
                  className="rounded-md px-5 py-5"
                  style={{ backgroundColor: background as string }}
                >
                  <h3 className="font-serif text-lg font-bold">
                    <Link
                      href={coastGuideLinks[index]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1d91c9]"
                      style={{ color: color as string }}
                    >
                      {coast.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#6e7780]">
                    {coast.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {coast.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white/85 px-2 py-0.5 text-[10px] font-semibold"
                        style={{ color: color as string }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-[#000]">
                    {coast.best}
                  </p>
                  <p className="mt-3 flex items-center gap-1 text-[11px] font-normal text-[#000]">
                    <MapPin
                      className="h-3.5 w-3.5"
                      style={{ color: color as string }}
                    />{" "}
                    <span className="font-semibold ">
                      {t("labels.keyLocations")}
                    </span>{" "}
                    <span className="flex flex-wrap gap-x-1">
                      {locations.map((location, locationIndex) => (
                        <span key={location.name}>
                          <Link
                            href={location.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-colors hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1d91c9]"
                          >
                            {location.name}
                          </Link>
                          {locationIndex < locations.length - 1 ? "," : ""}
                        </span>
                      ))}
                    </span>
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      </article>
      <style>{`
        .planner-section-title { display: flex; align-items: center; gap: 8px; color: #2b3f4d; font-family: Georgia, 'Times New Roman', serif; font-size: clamp(1.02rem, 3vw, 1.3rem); font-weight: 700; }
        .planner-heading-icon { height: 18px; width: 18px; color: #1d91c9; }
        .planner-inline-icon { display: inline-block; height: 13px; width: 13px; margin-right: 4px; vertical-align: -2px; color: #1c92ca; }
      `}</style>

      <PopularRoadTrips locale={locale} />
      <PocketAdBanner />
      <Footer />
    </main>
  );
}
