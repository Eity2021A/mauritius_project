export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar Skeleton */}
      <div className="h-20 bg-gray-100 animate-pulse" />

      {/* Hero Skeleton */}
      <div className="h-[44vh] bg-gray-200 animate-pulse" />

      {/* Content Skeleton */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Title */}
          <div className="h-10 bg-gray-200 rounded-lg w-2/3 animate-pulse" />
          
          {/* Subtitle */}
          <div className="h-6 bg-gray-100 rounded-lg w-1/2 animate-pulse" />
          
          {/* Content lines */}
          <div className="space-y-4 pt-8">
            <div className="h-4 bg-gray-100 rounded w-full animate-pulse" />
            <div className="h-4 bg-gray-100 rounded w-5/6 animate-pulse" />
            <div className="h-4 bg-gray-100 rounded w-4/5 animate-pulse" />
            <div className="h-4 bg-gray-100 rounded w-full animate-pulse" />
            <div className="h-4 bg-gray-100 rounded w-3/4 animate-pulse" />
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-3 gap-6 pt-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-lg overflow-hidden">
                <div className="h-48 bg-gray-200 animate-pulse" />
                <div className="p-4 space-y-3">
                  <div className="h-5 bg-gray-100 rounded w-3/4 animate-pulse" />
                  <div className="h-4 bg-gray-100 rounded w-1/2 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
