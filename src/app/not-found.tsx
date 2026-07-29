import Link from "next/link";
import Image from "next/image";

export default function RootNotFound() {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-16">
          <section className="w-full max-w-2xl text-center">
            <div className="mb-8">
              <Image
                src="/images/mauritius-explored-logo.svg"
                alt="Mauritius Explored"
                width={150}
                height={44}
                className="mx-auto opacity-70"
                priority
              />
            </div>

            <p className="text-7xl md:text-8xl font-bold text-orange-500 mb-4">
              404
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-950 mb-4">
              Page Not Found
            </h1>
            <p className="mx-auto max-w-md text-gray-600 mb-8 leading-7">
              Oops! This page has wandered off to explore Mauritius. Let&apos;s get you back on track.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-orange-500 px-8 py-3 font-semibold text-white transition-colors hover:bg-orange-600"
              >
                Back to Home
              </Link>
              <Link
                href="/where-to-eat-beach-restaurants-in-mauritius"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-gray-300 bg-white px-8 py-3 font-semibold text-gray-700 transition-colors hover:border-orange-500 hover:text-orange-500"
              >
                Beach Restaurants
              </Link>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
