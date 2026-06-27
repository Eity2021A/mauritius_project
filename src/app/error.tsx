"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl font-bold text-orange-500 mb-4">Oops</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Something went wrong
        </h2>
        <p className="text-gray-600 mb-8">
          We hit an unexpected issue. Please try again or head back to the homepage.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-8 py-3 bg-orange-500 text-white font-medium rounded-full hover:bg-orange-600 transition-colors min-h-[48px]"
          >
            Try Again
          </button>
          <a
            href="/"
            className="px-8 py-3 bg-white text-gray-700 font-medium rounded-full border border-gray-300 hover:border-orange-500 hover:text-orange-500 transition-colors min-h-[48px] flex items-center justify-center"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
