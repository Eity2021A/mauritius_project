/** Lightweight route loading — avoids the full-site skeleton on /giveaway */
export default function GiveawayLoading() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center" aria-busy="true">
      <div
        className="h-10 w-10 rounded-full border-2 border-orange-500 border-t-transparent animate-spin"
        role="status"
        aria-label="Loading giveaway"
      />
    </div>
  );
}
