import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import { getImageUrl } from "@/lib/image-url";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Mauritius Explored - Learn how we collect, use, and protect your personal information.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[44vh] min-h-[280px]">
        <Image
          src={getImageUrl("/images/banners/swimming-with-dolphins-mauritius.jpg")}
          alt="Privacy Policy"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center px-4 max-w-4xl mx-auto translate-y-[2rem]">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Privacy Policy
            </h1>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Last Updated Notice */}
            <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg mb-10">
              <p className="text-gray-700">
                <span className="font-semibold">Effective Date:</span> 25 August 2020
              </p>
              <p className="text-gray-600 text-sm mt-2">
                Planet Explored Ltd periodically reviews this Policy and reserves the right to modify or remove portions at any time. Any amendments will be notified by posting an updated version on this website.
              </p>
            </div>

            {/* Introduction */}
            <div className="bg-white rounded-lg p-8 md:p-10 shadow-sm mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About Us</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>Planet Explored Ltd</strong> is a wholly owned Mauritian company, duly registered with the Registrar of Companies under registration number <strong>BRN C16136979</strong>.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                We conduct our operations online under the brand name <span className="text-orange-500 font-semibold">Mauritius Explored</span>, accessible at{" "}
                <a href={SITE_URL} className="text-orange-500 hover:underline">
                  {new URL(SITE_URL).host}
                </a>
                . Throughout this document, references to &quot;Mauritius Explored,&quot; &quot;we,&quot; or &quot;us&quot; pertain to Planet Explored Ltd.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our mission is to provide sustainable travel solutions, offering eco-friendly ideas and customizable itineraries. We are committed to equipping our customers with the most current and pertinent information regarding destinations, activities, and personalized travel options.
              </p>
            </div>

            {/* Compliance Notice */}
            <div className="bg-teal-50 rounded-lg p-8 md:p-10 mb-8">
              <h3 className="text-xl font-bold text-teal-900 mb-4">Our Commitment to Privacy</h3>
              <p className="text-teal-800 leading-relaxed">
                Planet Explored Ltd acknowledges the significance of your privacy rights and is dedicated to transparency regarding our data collection, usage, and sharing practices. We comply with applicable laws, including the Privacy Act and relevant data protection regulations, such as the European Union General Data Protection Regulation (GDPR).
              </p>
            </div>

            {/* Privacy Policy Sections */}
            <div className="space-y-8">
              {/* Website Visitors */}
              <div className="bg-white rounded-lg p-8 md:p-10 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">Website Visitors</h2>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Like most website operators, Mauritius Explored collects non-personally-identifying information of the sort that web browsers and servers typically make available, such as:
                </p>
                <ul className="space-y-2 mb-4">
                  {["Browser type", "Language preference", "Referring site", "Date and time of each visitor request"].map((item, index) => (
                    <li key={index} className="flex items-center space-x-3 text-gray-700">
                      <span className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  Our purpose in collecting non-personally identifying information is to better understand how visitors use our website. We may also collect potentially personally-identifying information like Internet Protocol (IP) addresses for logged-in users and for users leaving comments.
                </p>
              </div>

              {/* Gathering Personal Information */}
              <div className="bg-white rounded-lg p-8 md:p-10 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">Gathering of Personal Information</h2>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We collect, use, and disclose Personal Information to provide you with the product or service you have requested and to offer you additional products and services we believe you might be interested in.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The amount and type of information we gather depends on the nature of the interaction:
                </p>
                <ul className="space-y-2 mb-4">
                  {[
                    "Sign-up: Username and email address",
                    "Transactions: Personal and financial information required to process payments",
                    "Comments: IP address and email address"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-3 text-gray-700">
                      <span className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0 mt-2"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-gray-600 text-sm italic">
                  Visitors can always refuse to supply personally-identifying information, with the caveat that it may prevent them from engaging in certain website-related activities.
                </p>
              </div>

              {/* Protection of Information */}
              <div className="bg-white rounded-lg p-8 md:p-10 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">Protection of Personal Information</h2>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Mauritius Explored discloses potentially personally-identifying and personally-identifying information only to those of its employees, contractors, and affiliated organizations that:
                </p>
                <div className="bg-gray-50 rounded-lg p-6 mb-4">
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3 text-gray-700">
                      <span className="w-6 h-6 bg-teal-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">1</span>
                      <span>Need to know that information to process it on our behalf or to provide services available at our websites</span>
                    </li>
                    <li className="flex items-start space-x-3 text-gray-700">
                      <span className="w-6 h-6 bg-teal-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">2</span>
                      <span>Have agreed not to disclose it to others</span>
                    </li>
                  </ul>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  <strong>We will not rent or sell</strong> potentially personally-identifying and personally-identifying information to anyone. We take all measures reasonably necessary to protect against unauthorized access, use, alteration, or destruction of such information.
                </p>
              </div>

              {/* Cookies */}
              <div className="bg-white rounded-lg p-8 md:p-10 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">Cookies</h2>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  A cookie is a small file of letters and numbers that can be stored on your browser or computer&apos;s hard drive when you visit our website. Cookies contain information about your visits to the website.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Mauritius Explored uses cookies to help identify and track visitors, their usage of our website, and their website access preferences.
                </p>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-amber-800 text-sm">
                    <strong>Note:</strong> Visitors who do not wish to have cookies placed on their computers should set their browsers to refuse cookies before using our websites, with the drawback that certain features may not function properly without cookies.
                  </p>
                </div>
              </div>

              {/* Third-Party Cookies */}
              <div className="bg-white rounded-lg p-8 md:p-10 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">Third-Party Cookies</h2>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  By visiting our website, you may receive cookies from both our site (first party) and from sites managed by other organizations (third parties). Notable examples include &quot;embed&quot; video or &quot;social plugin&quot; from social network services.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  For more information on managing third-party cookies, please visit:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: "Facebook", url: "https://www.facebook.com/help/cookies/" },
                    { name: "X (Twitter)", url: "https://help.x.com/en/personalization-data-settings" },
                    { name: "Google", url: "https://policies.google.com/technologies/cookies" },
                    { name: "Google Analytics Opt-out", url: "https://tools.google.com/dlpage/gaoptout" },
                  ].map((item, index) => (
                    <a
                      key={index}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-orange-50 transition-colors group"
                    >
                      <span className="text-gray-700 group-hover:text-orange-500">{item.name}</span>
                      <svg className="w-4 h-4 text-gray-400 group-hover:text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>

              {/* Google Analytics */}
              <div className="bg-white rounded-lg p-8 md:p-10 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">Google Analytics</h2>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We include certain components from Google Analytics, a web traffic analysis service provided by Google. These are third-party cookies collected and managed anonymously to monitor and improve the performance of our site.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Google Analytics can collect and analyze information on usage behavior anonymously. This site does not use (and does not allow third parties to use) the Google analysis tool to monitor or collect personal identification information. Google does not associate the IP address with any other data held by Google.
                </p>
              </div>

              {/* Ads */}
              <div className="bg-white rounded-lg p-8 md:p-10 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                    </svg>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">Advertisements</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Ads appearing on any of our websites may be delivered to users by advertising partners, who may set cookies. These cookies allow the ad server to recognize your computer each time they send you an online advertisement to compile information about you or others who use your computer. This allows ad networks to deliver targeted advertisements that they believe will be of most interest to you.
                </p>
              </div>

              {/* Business Transfers */}
              <div className="bg-white rounded-lg p-8 md:p-10 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">Business Transfers</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  If Mauritius Explored, or substantially all of its assets, were acquired, or in the unlikely event that we go out of business or enter bankruptcy, user information would be one of the assets that is transferred or acquired by a third party. You acknowledge that such transfers may occur, and that any acquirer may continue to use your personal information as set forth in this policy.
                </p>
              </div>

              {/* Policy Changes */}
              <div className="bg-white rounded-lg p-8 md:p-10 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">Privacy Policy Changes</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Although most changes are likely to be minor, Mauritius Explored may change its Privacy Policy from time to time at our sole discretion. We encourage visitors to frequently check this page for any changes. Your continued use of this site after any change in this Privacy Policy will constitute your acceptance of such change.
                </p>
              </div>
            </div>

            {/* Terms of Service Section */}
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Terms of Service</h2>
              
              <div className="bg-white rounded-lg p-8 md:p-10 shadow-sm mb-8">
                <p className="text-gray-700 leading-relaxed mb-4">
                  The following terms and conditions govern all use of the mauritiusexplored.com website and all content, services and products available at or through the website (collectively, the &quot;Website&quot;). The Website is owned and operated by Mauritius Explored.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  By accessing or using any part of the website, you agree to become bound by these terms and conditions. If you do not agree to all the terms, then you may not access the Website or use any services. The Website is available only to individuals who are at least 13 years old.
                </p>
              </div>

              {/* Key Terms Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Your Account",
                    content: "You are responsible for maintaining the security of your account and blog, and are fully responsible for all activities under your account."
                  },
                  {
                    title: "Payment & Renewal",
                    content: "Subscription payments are charged on a pre-pay basis. Subscriptions automatically renew unless cancelled before the end of the subscription period."
                  },
                  {
                    title: "Intellectual Property",
                    content: "All right, title and interest in Mauritius Explored trademarks, logos, and content remain solely with Mauritius Explored."
                  },
                  {
                    title: "Termination",
                    content: "Mauritius Explored may terminate your access at any time, with or without cause or notice, effective immediately."
                  },
                  {
                    title: "Disclaimer of Warranties",
                    content: "The Website is provided \"as is\" without warranties of any kind, express or implied."
                  },
                  {
                    title: "Governing Law",
                    content: "This Agreement will be governed by the laws of Mauritius, and disputes will be settled in Mauritius courts."
                  },
                ].map((term, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{term.title}</h3>
                    <p className="text-gray-600 text-sm">{term.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Have Questions?
          </h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            If you have any questions about this Privacy Policy, please don&apos;t hesitate to contact us.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
