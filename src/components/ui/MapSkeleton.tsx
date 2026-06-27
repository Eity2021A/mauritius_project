/**
 * Reusable map loading skeleton
 * Following Clean Code principle: DRY (Don't Repeat Yourself)
 */

export default function MapSkeleton() {
  return (
    <div className="bg-gray-200 rounded-xl aspect-square flex items-center justify-center">
      <div className="text-center text-gray-500 p-8">
        <svg
          className="w-12 h-12 mx-auto mb-3 text-gray-400 animate-pulse"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
          />
        </svg>
        <p className="font-medium text-sm">Loading Map...</p>
      </div>
    </div>
  );
}
