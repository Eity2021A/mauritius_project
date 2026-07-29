import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Baby,
  Banknote,
  CircleDollarSign,
  HeartPulse,
  Landmark,
  MapPin,
  Music2,
  ShieldCheck,
  Sun,
  Umbrella,
  Waves,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

export const revalidate = 3600;

type IconCard = {
  title: string;
  description: string;
  color: string;
};

type SeasonCard = {
  title: string;
  period: string;
  description: string;
};

type BudgetOption = {
  title: string;
  description: string;
};

type CoastCard = {
  title: string;
  subtitle: string;
  description: string;
};

export const legacyFamilyHolidayMetadata: Metadata = {
  title: "Family Holiday Guide for Mauritius Island",
  description:
    "Mauritius family holiday guide — why it's Africa's safest island playground, the best time to visit with kids, budgets, adventures and family beaches.",
  alternates: { canonical: "/family-holiday-guide-for-mauritius-island" },
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("FamilyHolidayGuide.metadata");

  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: "/family-holiday-guide-for-mauritius-island" },
  };
}

export default async function FamilyHolidayGuideForMauritiusIslandPage() {
  const t = await getTranslations("FamilyHolidayGuide");
  const paradiseIcons = [ShieldCheck, HeartPulse, Sun, Landmark];
  const adventureIcons = [Baby, Umbrella, Waves, Landmark, MapPin, Music2];
  const paradise = t.raw("paradise.items") as IconCard[];
  const seasons = t.raw("seasons.items") as SeasonCard[];
  const budgetOptions = t.raw("budget.options") as BudgetOption[];
  const adventures = t.raw("adventures.items") as IconCard[];
  const coasts = t.raw("coasts.items") as CoastCard[];

  return (
    <main id="main-content" className="min-h-screen bg-white text-[#1c2a2e]">
      <Navbar />

      <article className="mx-auto w-full max-w-6xl pt-30 pb-20 px-4 xl:px-0">
        <header className="text-center">
          <h1 className="font-serif text-[clamp(1.65rem,5vw,2.35rem)] font-bold tracking-tight text-[#1c3143]">
            {t("hero.title")} <span className="text-[#e85e31]">{t("hero.edition")}</span>
          </h1>
          <p className="mx-auto mt-3 max-w-2xl font-serif text-sm italic leading-relaxed text-[#75818b] sm:text-base">
            {t("hero.subtitle")}
          </p>
        </header>

        <section className="mt-9">
          <h2 className="family-section-title">{t("paradise.title")}</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {paradise.map(({ title, description, color }, index) => {
              const FeatureIcon = paradiseIcons[index] ?? ShieldCheck;
              return (
                <div key={title} className="rounded-md border border-[#e7dfd6] bg-white px-4 py-5 text-center shadow-[0_2px_7px_rgba(36,54,67,.035)]">
                  <FeatureIcon className="mx-auto h-9 w-9 rounded-full bg-[#e5f5fb] p-1.5" style={{ color }} strokeWidth={1.8} />
                  <h3 className="mt-3 font-serif text-base font-bold text-[#273949]">{title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#71808a]">{description}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="family-section-title">{t("seasons.title")}</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-md bg-[#fff0e8] px-5 pt-4 pb-8 text-center">
              <h3 className="font-serif font-bold text-[#273b4a]">{seasons[0].title}</h3>
              <p className="mt-1 font-serif text-lg font-bold text-[#e66032] pb-2">{seasons[0].period}</p>
              <p className="mt-1 text-xs text-[#7c6d67]">{seasons[0].description}</p>
            </div>
            <div className="rounded-md bg-[#eaf5ff] px-5 pt-4 pb-8 text-center">
              <h3 className="font-serif font-bold text-[#273b4a]">{seasons[1].title}</h3>
              <p className="mt-1 font-serif text-lg font-bold text-[#1c84be] pb-2">{seasons[1].period}</p>
              <p className="mt-1 text-xs text-[#657989]">{seasons[1].description}</p>
            </div>
            <div className="rounded-md bg-[#e9f6ec] px-5 pt-4 pb-8 text-center [&_p:last-child]:hidden">
              <h3 className="font-serif font-bold text-[#273b4a]">{seasons[2].title}</h3>
              <p className="mt-1 font-serif text-lg font-bold text-[#228343] pb-2">{seasons[2].period}</p>
              <p className="mt-1 text-xs text-[#677e6d]">{seasons[2].description}</p>
              <p className="mt-1 text-xs text-[#677e6d]">Still beautiful, but the peak cyclone period — flexibility in your plans is key.</p>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="family-section-title">{t("budget.title")}</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-[1.08fr_.92fr]">
            <div className="rounded-md border border-[#eadfd5] px-6 py-6 text-center">
              <p className="font-serif text-sm font-bold text-[#3a4a56]">{t("budget.estimateLabel")}</p>
              <p className="py-4 font-serif text-[clamp(1.7rem,6vw,2.45rem)] font-bold text-[#ee5e31]">{t("budget.amount")}</p>
              <p className="mt-2 text-xs leading-relaxed text-[#75808a]">{t("budget.description")}</p>
            </div>
            <div className="grid gap-3">
              <div className="flex items-center justify-center gap-3 rounded-md border border-[#eadfd5] px-4 py-3">
                <CircleDollarSign className="h-9 w-9 shrink-0 rounded-full bg-[#E9F1EA] p-1.5 text-[#1689c3]" />
                <div><h3 className="font-serif font-bold text-[#334452]">{budgetOptions[0].title}</h3><p className="text-xs text-[#75808a]">{budgetOptions[0].description}</p></div>
              </div>
              <div className="flex  items-center justify-center gap-3 rounded-md border border-[#eadfd5] px-4 py-3">
                <Banknote className="h-9 w-9 shrink-0 rounded-full bg-[#E9F1EA] p-1.5 text-[#1689c3] " />
                <div><h3 className="font-serif font-bold text-[#334452]">{budgetOptions[1].title}</h3><p className="text-xs text-[#75808a]">{budgetOptions[1].description}</p></div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="family-section-title">{t("adventures.title")}</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {adventures.map(({ title, description, color }, index) => {
              const AdventureIcon = adventureIcons[index] ?? Baby;
              return (
                <div key={title} className="flex items-center  gap-3 rounded-md border border-[#e7dfd6] bg-white px-4 py-6 shadow-[0_2px_7px_rgba(36,54,67,.035)]">
                  <AdventureIcon className="mt-0.5 h-6 w-6 shrink-0" style={{ color }} strokeWidth={1.7} />
                  <div><h3 className="font-serif text-sm font-bold text-[#314352]">{title}</h3><p className="mt-1 text-xs leading-relaxed text-[#75808a]">{description}</p></div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="family-section-title">{t("coasts.title")}</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="rounded-md bg-[#fff0e6] px-8 py-8">
              <div className="flex items-center gap-2 font-serif text-lg font-bold text-[#d9532e]">
                <Sun className="h-5 w-5" /> 
                 {coasts[0].title}</div>
                <h3 className="mt-2 font-serif font-bold text-[#394a55]">{coasts[0].subtitle}</h3>
                <p className="mt-1 text-xs leading-relaxed text-[#7f706a]">{coasts[0].description}</p>
              </div>
            <div className="rounded-md bg-[#e8f5fc] px-8 py-8"><div className="flex items-center gap-2 font-serif text-lg font-bold text-[#187eaf]"><Waves className="h-5 w-5" /> {coasts[1].title}</div><h3 className="mt-2 font-serif font-bold text-[#394a55]">{coasts[1].subtitle}</h3><p className="mt-1 text-xs leading-relaxed text-[#637b88]">{coasts[1].description}</p></div>
          </div>
        </section>
      </article>
      <style>{`
        .family-section-title { color: #273b4a; font-family: Georgia, 'Times New Roman', serif; font-size: clamp(1.05rem, 3vw, 1.3rem); font-weight: 700; text-align: center; }
      `}</style>

      <Footer />
    </main>
  );
} 
