import Navbar from "@/components/Navbar";

export default function ItinerariesLoading() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"
            aria-hidden
          />
          <p className="text-gray-600">Loading itineraries...</p>
        </div>
      </div>
    </main>
  );
}
