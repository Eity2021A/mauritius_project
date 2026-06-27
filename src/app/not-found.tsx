import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { DEFAULT_OG_IMAGE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for could not be found. Explore Mauritius beaches, activities, and more.",
  robots: { index: false, follow: true },
  openGraph: {
    title: "Page Not Found | Mauritius Explored",
    description: "The page you are looking for could not be found. Explore Mauritius beaches, activities, and more.",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function NotFound() {
  return (
    <main id="main-content" className="min-h-screen flex flex-col">
      <Navbar />

      {/* 404 Content - pt for fixed navbar */}
      <section className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 pt-24 pb-20">
        <div className="container mx-auto px-4 text-center">
          {/* Logo */}
          <div className="mb-8">
            <Image
              src="/images/mauritius-explored-logo.svg"
              alt="Mauritius Explored"
              width={120}
              height={120}
              className="mx-auto opacity-50"
            />
          </div>

          {/* 404 Text */}
          <h1 className="text-8xl md:text-9xl font-bold text-orange-500 mb-4">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 max-w-md mx-auto mb-8">
            Oops! It seems like this page has wandered off to explore the beaches. 
            Let&apos;s get you back on track.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-3 bg-orange-500 text-white font-medium rounded-full hover:bg-orange-600 transition-colors min-h-[48px] flex items-center justify-center"
            >
              Back to Home
            </Link>
            <Link
              href="/beaches-in-mauritius"
              className="px-8 py-3 bg-white text-gray-700 font-medium rounded-full border border-gray-300 hover:border-orange-500 hover:text-orange-500 transition-colors min-h-[48px] flex items-center justify-center"
            >
              Explore Beaches
            </Link>
          </div>

          {/* Quick Links */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">Or try one of these popular pages:</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link href="/best-places-to-visit-in-mauritius" className="text-orange-500 hover:underline">
                Places to Visit
              </Link>
              <span className="text-gray-300">•</span>
              <Link href="/mauritius-activities" className="text-orange-500 hover:underline">
                Activities
              </Link>
              <span className="text-gray-300">•</span>
              <Link href="/mauritius-island" className="text-orange-500 hover:underline">
                About Mauritius
              </Link>
              <span className="text-gray-300">•</span>
              <Link href="/contact" className="text-orange-500 hover:underline">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
