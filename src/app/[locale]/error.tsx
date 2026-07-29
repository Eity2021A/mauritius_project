"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";
import { getSystemPageTranslations } from "@/data/system-page-translations";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const locale = useLocale();
  const t = getSystemPageTranslations(locale).error;

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl font-bold text-orange-500 mb-4">{t.title}</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          {t.heading}
        </h2>
        <p className="text-gray-600 mb-8">
          {t.body}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-8 py-3 bg-orange-500 text-white font-medium rounded-full hover:bg-orange-600 transition-colors min-h-[48px]"
          >
            {t.tryAgain}
          </button>
          <a
            href={locale === "en" ? "/" : `/${locale}`}
            className="px-8 py-3 bg-white text-gray-700 font-medium rounded-full border border-gray-300 hover:border-orange-500 hover:text-orange-500 transition-colors min-h-[48px] flex items-center justify-center"
          >
            {t.backHome}
          </a>
        </div>
      </div>
    </div>
  );
}
