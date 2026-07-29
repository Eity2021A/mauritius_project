import { getLocale } from "next-intl/server";
import { getSystemPageTranslations } from "@/data/system-page-translations";

export default async function GiveawayLoading() {
  const t = getSystemPageTranslations(await getLocale()).loading;

  return (
    <div className="min-h-screen bg-white flex items-center justify-center" aria-busy="true">
      <div
        className="h-10 w-10 rounded-full border-2 border-orange-500 border-t-transparent animate-spin"
        role="status"
        aria-label={t.giveaway}
      />
    </div>
  );
}
