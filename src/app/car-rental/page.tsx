import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import { HOME_ITINERARIES } from "@/data/home";
import { getImageSrcSet, getImageUrl } from "@/lib/image-url";

export const metadata: Metadata = {
  title: "Car Rental",
  description:
    "Rent a car in Mauritius with Mauritius Explored. Compare prices and book your ideal vehicle for your stay.",
  alternates: { canonical: "/car-rental" },
};

const vehicleCategories = [
  {
    code: "C",
    name: "Category C",
    rateCode: "MGAR",
    models: "Suzuki Celerio · Suzuki S-Presso",
    badge: "Economy",
  },
  {
    code: "E",
    name: "Category E",
    rateCode: "EDAR",
    models: "Hyundai Grand i10 · Suzuki Swift · Suzuki Dzire",
    badge: "Compact",
  },
  {
    code: "F",
    name: "Category F",
    rateCode: "CCAR",
    models: "Suzuki Ciaz",
    badge: "Sedan",
  },
  {
    code: "G",
    name: "Category G",
    rateCode: "CGAV",
    models: "Suzuki Fronx · Suzuki Brezza · Hyundai Venue",
    badge: "Compact SUV",
  },
  {
    code: "H",
    name: "Category H",
    rateCode: "CVAR",
    models: "Suzuki XL6 (6-seater)",
    badge: "6-Seater MPV",
  },
  {
    code: "I",
    name: "Category I",
    rateCode: "IVAR",
    models: "Suzuki Ertiga (7-seater) · Toyota Sienta (7-seater)",
    badge: "7-Seater",
  },
  {
    code: "X",
    name: "Category X",
    rateCode: "XCAR",
    models: "Any available vehicle from our fleet, subject to availability.",
    badge: "Flexible",
  },
] as const;

const travelAddOns = [
  {
    name: "Wi-Fi Dongle",
    price: "Rs 250",
    unit: "/rental",
    iconColor: "text-sky-500",
    bgColor: "bg-sky-50",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 12h16M12 4a14 14 0 0 1 0 16M12 4a14 14 0 0 0 0 16"
        />
      </svg>
    ),
  },
  {
    name: "Booster Seat",
    price: "Rs 250",
    unit: "/rental",
    iconColor: "text-emerald-500",
    bgColor: "bg-emerald-50",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7 18v-1a5 5 0 0 1 10 0v1M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM5 18h14"
        />
      </svg>
    ),
  },
  {
    name: "Child Seat",
    price: "Rs 250",
    unit: "/rental",
    iconColor: "text-orange-500",
    bgColor: "bg-orange-50",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5 10v-1a5 5 0 0 1 10 0v1"
        />
      </svg>
    ),
  },
] as const;

export default function CarRentalPage() {
  return (
    <main id="main-content" className="min-h-screen bg-white">
      <Navbar />

      <section className="bg-[#fff] py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto ">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mt-5">
                Car Rental in Mauritius
              </h1>
              <p className="mt-5 text-sm font-semibold uppercase tracking-[0.28em] text-orange-500">
                Getting Around · Car Rental
              </p>
              <p className="mx-auto mt-4 max-w-2xl text-sm italic leading-7 text-gray-500 sm:text-base">
                Reliable self-drive cars across the island so every day of your
                holiday stays easy, flexible, and comfortable.
              </p>
              <p className="mx-auto mt-4 max-w-2xl text-sm italic leading-7 text-gray-500 sm:text-base">
                15% discount on any cars{" "}
                <span className="font-bold text-orange-500">
                  USE PROMO CODE MEXP26
                </span>
              </p>
            </div>

            <div className="mx-auto mt-10 max-w-4xl text-center">
              <p className="text-lg leading-8 text-gray-700 sm:text-xl">
                Explore Mauritius at your own pace with a car rental option
                arranged through Hertz. Whether you need a car for airport
                pick-up, hotel delivery, island exploration, business travel, or
                a full holiday stay, visitors can request a vehicle directly and
                receive availability and pricing by email.
              </p>
            </div>

            <div className="mt-20 text-center ">
              <h2 className="text-3xl font-bold uppercase tracking-tight text-gray-900 sm:text-4xl">
                Go Your Own Way
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm italic leading-7 text-gray-500 sm:text-base">
                A broad range of cars and add-ons to choose from for short
                breaks, business trips, and longer island stays.
              </p>
            </div>

            <div className="mx-auto max-w-6xl mt-8 rounded-[1.35rem] bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-300 px-5 py-5 text-white shadow-[0_18px_50px_-24px_rgba(234,88,12,0.55)] sm:px-7">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-white text-orange-500 shadow-sm">
                  <svg
                    className="h-7 w-7"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 7.5 12 3l7.5 4.5V16.5L12 21l-7.5-4.5V7.5Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12h6M12 9v6"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-3xl font-bold leading-none sm:text-4xl">
                    15% OFF{" "}
                    <span className="text-xl font-semibold">
                      all new bookings
                    </span>
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white/90">
                    New customers save 15% on every category and the offer is
                    applied automatically at booking.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-14 mx-auto max-w-6xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
                Vehicle Categories
              </p>
              <div className="mt-5 space-y-4">
                {vehicleCategories.map((category) => (
                  <article
                    key={category.code}
                    className="rounded-2xl border border-orange-100 bg-white px-4 py-4 shadow-[0_10px_30px_-24px_rgba(17,24,39,0.45)] transition-colors hover:border-orange-200"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-orange-50 text-lg font-bold text-orange-500">
                          {category.code}
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                            <h3 className="text-lg font-bold text-gray-900">
                              {category.name}
                            </h3>
                            <span className="text-sm font-semibold uppercase tracking-wide text-orange-500">
                              {category.rateCode}
                            </span>
                          </div>
                          
                          <p className="mt-0 text-[12px] leading-6 text-gray-500">
                            {category.models}
                          </p>
                            <div className=" mt-2 inline-flex items-center justify-center self-start rounded-full bg-orange-50 px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-orange-500 sm:self-center">
                        {category.badge}
                      </div>
                        </div>
                      </div>
                    
                      <button className="inline-flex items-center justify-center self-start rounded-lg bg-orange-500 px-6 py-2 text-xs font-bold uppercase  text-white sm:self-center">
                        SEARCH CAR
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="mt-16 mx-auto max-w-6xl">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
                  Travel Add-ons
                </p>
                <p className="mt-2 text-sm italic leading-7 text-gray-500">
                  Only Rs 250 each · free after 7 days on any car booking.
                </p>
              </div>

              <div
                className="mt-5 rounded-2xl border border-[#eadcc9]"
                style={{
                  background:
                    "linear-gradient(90deg, #F5F3F0 0%, #F5F3F0 100%)",
                  padding: "20px",
                }}
              >
                <div className="grid gap-5 md:grid-cols-3 md:gap-0">
                  {travelAddOns.map((item, index) => (
                    <article
                      key={item.name}
                      className={`flex items-center gap-4 ${index > 0 ? "md:border-l md:border-[#e5d8c8] md:pl-6" : ""} ${index < travelAddOns.length - 1 ? "md:pr-6" : ""}`}
                    >
                      <div
                        className={`flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full ${item.bgColor} ${item.iconColor}`}
                      >
                        <div className="scale-150">{item.icon}</div>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold leading-tight text-gray-900">
                          {item.name}
                        </h3>
                        <p className="mt-2 flex items-end gap-2 leading-none">
                          <span className="text-2xl font-bold text-orange-500">
                            {item.price}
                          </span>
                          <span className="text-sm font-medium text-gray-400">
                            {item.unit}
                          </span>
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-16">
              <div className="mb-5 text-center md:mb-7">
                <span className="text-orange-500 text-xs font-medium tracking-wider uppercase md:text-sm">
                  Getting Around - Private Driver
                </span>
                <h2 className="mt-2 text-3xl font-bold text-gray-900 md:text-5xl">
                  Popular RoadTrip
                </h2>
              </div>

              <p className="mb-2 text-right text-xs text-gray-500 md:hidden">
                Swipe to explore →
              </p>
              <div className="scrollbar-hide -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-4 pr-6 md:mx-0 md:grid md:snap-none md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0 md:pb-0 md:pr-0 lg:grid-cols-5">
                {HOME_ITINERARIES.map((itinerary, index) => (
                  <Link
                    key={`${itinerary.href}-${index}`}
                    href={itinerary.href}
                    className="group relative h-72 w-40 flex-shrink-0 snap-start overflow-hidden rounded-lg cursor-pointer img-shimmer sm:h-80 sm:w-48 md:h-96 md:w-auto lg:h-[28rem]"
                  >
                    <img
                      src={getImageUrl(itinerary.image, {
                        width: 400,
                        quality: 75,
                      })}
                      srcSet={getImageSrcSet(itinerary.image, {
                        widths: [320, 480, 800, 1200],
                        quality: 68,
                      })}
                      sizes="(max-width: 768px) 45vw, (max-width: 1200px) 25vw, 20vw"
                      alt={itinerary.title}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
                    <div className="absolute left-3 right-3 top-3 md:left-4 md:right-4 md:top-4">
                      <h3 className="text-base font-semibold text-white drop-shadow-sm md:text-lg">
                        {itinerary.title}
                      </h3>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 flex justify-center md:bottom-4 md:left-4 md:right-4">
                      <span className="inline-flex w-full items-center justify-center rounded-full border-2 border-white bg-transparent py-2 text-sm font-medium text-white transition-colors group-hover:bg-white group-hover:text-gray-900 sm:py-2.5">
                        View itinerary
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
