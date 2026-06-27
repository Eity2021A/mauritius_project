import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import { getImageUrl } from "@/lib/image-url";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Mauritius Explored. Contact us via email or WhatsApp for travel inquiries.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[44vh] min-h-[280px]">
        <Image
          src={getImageUrl("/images/banners/le-morne-coastline-aerial-mauritius.jpg")}
          alt="Contact Mauritius Explored"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center px-4 max-w-4xl mx-auto translate-y-[2rem]">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Get In Touch
          </h1>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Contact Cards */}
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              {/* Email Card */}
              <div className="bg-white rounded-lg p-8 md:p-10 shadow-sm text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 mb-6">
                  <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-orange-500 mb-4 uppercase tracking-wide">
                  Email Us:
                </h2>
                <a 
                  href="mailto:contact@mauritiusexplored.com"
                  className="text-gray-700 text-lg hover:text-orange-500 transition-colors"
                >
                  contact@mauritiusexplored.com
                </a>
              </div>

              {/* WhatsApp Card */}
              <div className="bg-white rounded-lg p-8 md:p-10 shadow-sm text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-orange-500 mb-4 uppercase tracking-wide">
                  WhatsApp:
                </h2>
                <a 
                  href="https://wa.me/23057364118"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 text-lg hover:text-green-600 transition-colors"
                >
                  (230) 5 736 41 18
                </a>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-12 text-center">
              <p className="text-gray-600 max-w-xl mx-auto">
                Whether you have questions about planning your trip, need recommendations, or want to learn more about our services, we&apos;re here to help. Reach out to us anytime!
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
