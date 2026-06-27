import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CountUp from "@/components/ui/CountUp";
import { getImageUrl } from "@/lib/image-url";
import { SITE_URL } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Planet Explored Ltd and our mission to provide eco-friendly travel experiences in Mauritius.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[44vh] min-h-[280px]">
        <Image
          src={getImageUrl("/images/banners/ile-aux-fouquets-lighthouse-mauritius.jpg")}
          alt="About Mauritius Explored"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center px-4 max-w-4xl mx-auto translate-y-[2rem]">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              About Us
            </h1>
            <p className="text-white/90 text-base md:text-lg max-w-2xl mx-auto">
              Your trusted guide to eco-friendly travel in Mauritius since 2011
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Planet Explored Ltd Section */}
            <div className="mb-16">
              <div className="flex items-center gap-4 mb-6">
                <Image
                  src={getImageUrl("/images/mauritius-explored.svg")}
                  alt="Mauritius Explored"
                  width={48}
                  height={48}
                  className="w-12 h-12"
                />
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Planet Explored Ltd</h2>
                  <p className="text-gray-500 text-sm">BRN C16136979</p>
                </div>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Planet Explored Ltd is a fully owned Mauritian company, registered with the Registrar of Companies under the registration number BRN C16136979.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                We operate online under the brand name <span className="font-semibold text-orange-500">Mauritius Explored</span>, accessible at{" "}
                <a href={SITE_URL} className="font-semibold text-orange-500 hover:text-orange-600 underline">
                  {new URL(SITE_URL).host}
                </a>. Whenever we refer to &quot;Mauritius Explored,&quot; &quot;we,&quot; or &quot;us,&quot; we are referencing Planet Explored Ltd, a registered Mauritian company established in accordance with Section 8 of the Business Registration Act 2002.
              </p>
            </div>

            {/* Mission Section */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                Our mission is to provide eco-friendly travel ideas and itineraries, guiding our customers with the latest and most relevant information on places to visit, types of activities, and customizable trips tailored to their preferences.
              </p>
            </div>

            {/* Our Story */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Our Story</h2>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Founded in 2011 as a Facebook project, we rapidly gained momentum and have continued to expand. As of 2025, Mauritius Explored remains dedicated to delivering the highest quality holiday information.
              </p>
              
              {/* Social Stats */}
              <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-8">
                <div className="min-w-0 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 sm:p-6 text-center">
                  <div className="flex justify-center mb-3">
                    <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </div>
                  <p className="min-w-0 overflow-hidden text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-blue-600 mb-1"><CountUp target={316000} /></p>
                  <p className="text-gray-600 text-xs sm:text-sm">Facebook Fans</p>
                  <p className="text-gray-500 text-xs mt-1">@MauritiusExplored</p>
                </div>
                <div className="min-w-0 bg-gradient-to-br from-pink-50 to-purple-100 rounded-lg p-4 sm:p-6 text-center">
                  <div className="flex justify-center mb-3">
                    <svg className="w-8 h-8 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                  </div>
                  <p className="min-w-0 overflow-hidden text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-pink-600 mb-1"><CountUp target={242000} /></p>
                  <p className="text-gray-600 text-xs sm:text-sm">Instagram Followers</p>
                  <p className="text-gray-500 text-xs mt-1">@mauritius__explored</p>
                </div>
                <div className="min-w-0 bg-gradient-to-br from-pink-50 to-purple-100 rounded-lg p-4 sm:p-6 text-center">
                  <div className="flex justify-center mb-3">
                    <svg className="w-8 h-8 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                  </div>
                  <p className="min-w-0 overflow-hidden text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-pink-600 mb-1"><CountUp target={291000} /></p>
                  <p className="text-gray-600 text-xs sm:text-sm">Instagram Followers</p>
                  <p className="text-gray-500 text-xs mt-1">@mauritius</p>
                </div>
              </div>
            </div>

            {/* Partnership Section */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Strategic Partnership</h2>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                Recently, we forged a strategic partnership <span className="font-semibold text-orange-500">with a leading e-market B2B provider based in DMCC Dubai</span>. This collaboration enables us to expand our offerings, allowing us to deliver exceptional and cost-effective activities to our travelers. Through this partnership, we are dedicated to ensuring that our customers enjoy unparalleled experiences while optimizing value.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-teal-900 to-teal-950 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-800 mb-6">
                <svg className="w-8 h-8 text-teal-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Sustainability & Ocean Protection</h2>
              <p className="text-teal-200 text-lg max-w-2xl mx-auto">
                At Planet Explored Ltd, we recognize that in carrying out our work as a guide, we have a social and environmental responsibility to respect our island and our culture.
              </p>
            </div>

            <p className="text-teal-100 text-lg leading-relaxed mb-8 text-center">
              We recognize the vital importance of preserving our natural environment, particularly our oceans. As a company committed to sustainability, we strive to minimize our ecological footprint and actively contribute to the protection of marine ecosystems.
            </p>

            {/* Responsibilities Grid */}
            <div className="grid md:grid-cols-2 gap-4 mb-12">
              {[
                "Protect the environment – its flora, fauna and landscapes",
                "Respect cultures, traditions, religions and heritage",
                "Benefit local communities both economically and socially",
                "Conserve natural resources",
                "Minimize pollution through sustainable sun-cream, reduce plastic usage, waste and waste disposal",
                "Inform our travelers about sustainable tourism",
                "Encourage participation in our recommendations and activities",
                "Work with suppliers and partners to achieve sustainable goals",
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 bg-teal-800/50 rounded-lg p-4">
                  <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-teal-100 text-sm md:text-base">{item}</p>
                </div>
              ))}
            </div>

            {/* Initiatives */}
            <div className="bg-teal-800/30 rounded-lg p-8 md:p-10">
              <h3 className="text-xl md:text-2xl font-bold mb-4">Our Initiatives</h3>
              <p className="text-teal-100 leading-relaxed mb-6">
                Our initiatives include partnering with local organizations dedicated to ocean conservation, participating in beach clean-up drives, and promoting eco-friendly practices among our customers. We encourage our travelers to engage in responsible tourism by respecting marine life, reducing plastic use, and supporting local communities that prioritize environmental stewardship.
              </p>
              <p className="text-teal-100 leading-relaxed">
                Through our eco-friendly itineraries and travel experiences, we aim to raise awareness about the challenges facing our oceans, such as pollution and climate change. By choosing Mauritius Explored, you are not only embarking on an unforgettable journey but also supporting efforts to protect the stunning natural resources that make our island a paradise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Join Us in Our Mission
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Together, we can ensure that future generations enjoy the beauty of Mauritius&apos; beaches and marine environments. Join us in our mission to safeguard these precious ecosystems while creating lasting memories.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/explore"
                className="inline-flex items-center justify-center px-8 py-4 min-h-[48px] bg-orange-500 text-white font-medium rounded-full hover:bg-orange-600 transition-colors"
              >
                Start Exploring
              </Link>
              <Link
                href="/privacy-policy"
                className="inline-flex items-center justify-center px-8 py-4 min-h-[48px] bg-gray-100 text-gray-700 font-medium rounded-full hover:bg-gray-200 transition-colors"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
