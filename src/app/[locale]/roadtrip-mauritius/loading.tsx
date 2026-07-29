import Navbar from "@/components/Navbar";
import { getLocale } from "next-intl/server";
import { getSystemPageTranslations } from "@/data/system-page-translations";

export default async function ItinerariesLoading() {
  const t = getSystemPageTranslations(await getLocale()).loading;

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"
            aria-hidden
          />
          <p className="text-gray-600">{t.itineraries}</p>
        </div>
      </div>
    </main>
  );
}
