import type { Metadata } from "next";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import { staticPageText } from "@/lib/static-page-localizer";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: staticPageText(locale, "Pocket Guide Checkout"),
    description: staticPageText(locale, "Complete your Mauritius pocket guide purchase."),
    alternates: { canonical: "/pocket-guide/checkout" },
  };
}

export default function PocketGuideCheckoutPage() {
  return (
    <main
      id="main-content"
      className="min-h-screen bg-[#fffdf7] text-[#0a2e3d]"
    >
      <Navbar />
      {/* 
      <section className="relative overflow-hidden bg-[linear-gradient(140deg,#0e3d6e,#0b7c89)] px-4 py-16 text-center text-white sm:px-8 lg:px-10 mt-10">
        <div className="relative mx-auto max-w-3xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.35em] text-[#ffd8a6] sm:text-sm">
            Mauritius in your pocket
          </p>
          <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight sm:text-5xl">
            Complete your checkout
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#dceff0] sm:text-lg sm:leading-8">
            Use the secure Whop checkout below to get the pocket guide.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/pocket-guide"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/60 bg-white/10 px-7 py-4 text-base font-extrabold text-white transition hover:bg-white/20"
            >
              Back to Pocket Guide
            </Link>
          </div>
        </div>
      </section> */}

      <section className="px-4 py-6 sm:px-8 lg:px-10 bg-[#fff] ">
        <div className="mx-auto container rounded-[24px] p-5  sm:p-8">
          <div className="flex flex-col items-center justify-center gap-4 rounded-[24px] p-4 sm:p-8">
            <div
              data-whop-checkout-plan-id="plan_C8XOw7HmCsVzA"
              data-whop-checkout-theme-background-color="#ededed"
              data-whop-checkout-theme-accent-color="#e8601c"
              data-whop-checkout-style-container-padding-y="24"
              data-whop-checkout-hide-tos="true"
            />
          </div>
        </div>
      </section>

      <Script
        src="https://js.whop.com/static/checkout/loader.js"
        strategy="afterInteractive"
      />
    </main>
  );
}
