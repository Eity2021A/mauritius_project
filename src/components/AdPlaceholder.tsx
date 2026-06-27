/**
 * Shared partner ad placeholder – Google Leaderboard 728×90.
 * Use below hero with section wrapper: py-4 for equal gap above/below;
 * section below should use pt-0 so gap matches.
 */
export default function AdPlaceholder() {
  return (
    <section className="py-4 bg-white" aria-label="Advertisement placeholder">
      <div className="container mx-auto px-4 max-w-7xl flex justify-center">
        <div
          className="w-full max-w-[728px] h-[90px] rounded-lg bg-gray-200 flex flex-col items-center justify-center text-center border border-gray-300"
          aria-hidden
        >
          <p className="text-gray-500 text-sm font-medium">
            Insert your business ad banner here
          </p>
          <p className="text-gray-400 text-xs mt-1">728 × 90 px</p>
        </div>
      </div>
    </section>
  );
}
