import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlanTripButton from "@/components/PlanTripButton";
import MonthByMonthGuide from "./MonthByMonthGuide";
import { getImageUrl } from "@/lib/image-url";

export default function BestTimeToVisitPage() {
  return (
    <main id="main-content" className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[44vh] min-h-[280px]">
        <Image
          src={getImageUrl("/images/banners/le-morne-aerial-view-mauritius.jpg")}
          alt="Best Time to Visit Mauritius"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center px-4 max-w-4xl mx-auto translate-y-[2rem]">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Best Time to Visit Mauritius
            </h1>
            <p className="text-white/90 text-base md:text-lg max-w-2xl mx-auto">
              Year-round sunshine awaits. Discover when to visit for your perfect holiday experience.
            </p>
          </div>
        </div>
      </section>

      {/* Intro copy – below hero; "When is the best time..." as title */}
      <section className="py-6 md:py-8 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            When is the best time to visit Mauritius?
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 text-justify">
            <p>
              This is the most common question we received all year round. Straight up answer – <span className="font-semibold text-orange-600">Between November &amp; May – April and May</span> maybe the best in terms of flights/hotel prices/temperature/non-cyclone season.
            </p>
            <p>
              Whatever time of the year you visit, Mauritius&apos; weather is sure to put on a show! Mauritius offers year-round holiday weather, with almost daily sunshine and limited rainfall, so you&apos;re almost guaranteed sunny days on your holiday.
            </p>
            <p className="font-medium text-gray-900 mt-6 mb-1">The myth: When is the rainy season in Mauritius?</p>
            <p className="font-bold text-orange-600 text-lg uppercase tracking-wide">No rainy season in Mauritius</p>
            <p>
              Being a sub-tropical island, we do not have monsoon or rainy season. In summer, it can rain heavily in the afternoon due to the built up of humidity. Another culprit are the cyclones that can affect the weather between December to March. So it&apos;s always good to plan accordingly. This live weather map below is one of the most accurate going around.
            </p>
          </div>
        </div>
      </section>

      {/* Seasons at a Glance + Live Weather Map (full width) */}
      <section id="live-weather" className="pt-6 md:pt-8 pb-12 md:pb-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <p className="text-gray-700 text-base font-medium mb-2">
            Seasons at a Glance
          </p>
          <div className="rounded-lg border border-gray-200 bg-white overflow-hidden divide-y divide-gray-200 max-w-md mb-8">
            <div className="flex items-center justify-between gap-4 px-4 py-3">
              <span className="text-gray-700 text-base">Summer</span>
              <span className="text-gray-600 text-base">November – March</span>
            </div>
            <div className="flex items-center justify-between gap-4 px-4 py-3">
              <span className="text-gray-700 text-base">Winter</span>
              <span className="text-gray-600 text-base">June – August</span>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Live Weather Map and Forecast
          </h2>
          <div className="w-[90%] max-w-[90%] mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <iframe
              src="https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=mm&metricTemp=°C&metricWind=km/h&zoom=10&overlay=rain&product=ecmwf&level=surface&lat=-20.364&lon=57.568&detailLat=-20.287&detailLon=57.582&detail=true&message=true"
              width={650}
              height={700}
              frameBorder="0"
              className="w-full h-[400px] sm:h-[550px] lg:h-[700px]"
              title="Live weather map of Mauritius"
              allowFullScreen
              loading="lazy"
            />
            <p className="text-xs sm:text-sm text-gray-400 text-center py-2 bg-gray-50">
              Weather data provided by Windy.com
            </p>
          </div>
        </div>
      </section>

      <MonthByMonthGuide />

      {/* What's the seasons like? */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            What&apos;s the seasons like?
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6 text-justify">
            <p>
              For starters, Summer is between November to March and Winter is between June – August.
            </p>
            <p>
              <strong className="text-gray-900">Summer</strong> is the warmest of the year with an average overnight temperature of 25 degrees and a daytime temperature average of 30 degrees. Traditionally it&apos;s a very busy period for locals and visitors alike, with swimming, barbecues and water activities proving to be a popular pastime. Summer maximum can reach as high as 34 degrees with an average of 80% humidity, so please be prepared. It is the high season for cyclones, with weather anomalies mostly appearing at this period of the year. Summer rain, most of the time going for an hour or two in the afternoon is quite normal but expect them. Summer in Mauritius is when the most visitors come, so expect a crowd at popular beaches. Summer in the Indian ocean is also the cyclonic season. It can happen that cyclones end up ruining some of your days, but they normally hang around for a few days. The live weather chart will give a very good indication of the trajectory, so you can take informed decisions before travelling.
            </p>
            <p>
              <strong className="text-gray-900">Autumn</strong> is the season that provides a transition from hot summer days to balmy blue skies with little wind and stunning days. It is often the most popular time of the year for visiting as a result. This will ideally be between April and May. You will enjoy perfect fishing weather, clear water and we&apos;d say it&apos;s the ideal time for a family holiday and honeymoon, and on top of the list, no cyclones.
            </p>
            <p>
              It has to be said that <strong className="text-gray-900">winter</strong> in Mauritius is very mild, with an average of 22°C to 25°C along the coast with temperatures seldom going below 18°C. That being said, the high humidity levels can sometimes make the nights feel chillier than they actually are. Winter in Mauritius is like summer in England 🙂 or better. That&apos;s what they say! A great time for hiking and camping with waterfalls at their peak. However, this is the whale season in full swing and they travel along the west and north coast. Best season to see the whales in Mauritius. It can become windy to very windy along the South East and South coast with wind speeds averaging 27 kilometres/hour, making it a mecca for kitesurfers. Regular and powerful waves from the South make it one of the best surfing holiday of the year. Waves reaching 6m high are often seen at the world renown spot of One Eye at le Morne. Many kite surfers and wind surfers return annually to Le Morne for the flat shallow waters in the protected lagoon with plenty of wind. With calm shallow water extending over several hundred metres, Mauritius is perfect for the novice trying to learn to windsurf or kite surf in a warm tropical weather.
            </p>
            <p>
              During the winter season, Mauritius is the perfect paradise for sailing and wind sport enthusiast.
            </p>
            <p>
              Escaping the winter winds comes <strong className="text-gray-900">spring</strong>. Still windy in early September, the weather is sure to get better day by day with the average daytime temperature rising to an average 26 degrees. This period is notoriously dry and with low humidity.
            </p>
          </div>
        </div>
      </section>

      {/* Important Note */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-6 md:p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Common Myth: &quot;Rainy Season&quot;
            </h3>
            <p className="text-gray-700">
              <strong>There is no rainy season in Mauritius.</strong> Being a sub-tropical island, we do not have 
              monsoon seasons. In summer, brief afternoon rain can occur due to humidity buildup, but these 
              typically last just an hour or two. Mauritius offers year-round holiday weather with almost 
              daily sunshine.
            </p>
          </div>
        </div>
      </section>

      {/* Special Activities by Season */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            Seasonal Activities
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Whale Watching", description: "Humpback whales travel along the west and north coast from June to October.", bestSeason: "June - October", image: "speedboat-tours-in-mauritius.jpg", href: "/top-activities-mauritius/whale-watching", alt: "Whale watching boat tour in Mauritius" },
              { title: "Kitesurfing & Windsurfing", description: "Le Morne becomes a mecca for wind sports with powerful trade winds.", bestSeason: "June - September", image: "beach-of-le-morne-in-the-morning.jpg", href: "/beaches-in-mauritius/le-morne", alt: "Le Morne beach, kitesurfing and windsurfing in Mauritius" },
              { title: "Swimming & Snorkeling", description: "Crystal-clear waters and calm seas perfect for underwater exploration.", bestSeason: "November - April", image: "blue-bay-sea-turtle.jpg", href: "/top-activities-mauritius/snorkeling-blue-bay", alt: "Snorkeling at Blue Bay Marine Park, Mauritius" },
              { title: "Hiking & Nature", description: "Comfortable temperatures and waterfalls at their peak flow.", bestSeason: "May - September", image: "7-waterfall-hike.jpg", href: "/top-activities-mauritius/seven-waterfalls", alt: "Seven Waterfalls hike, Mauritius" },
            ].map((activity) => (
              <Link
                key={activity.title}
                href={activity.href}
                className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow flex flex-col"
                aria-label={`${activity.title} – Best ${activity.bestSeason}`}
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-200">
                  <Image
                    src={getImageUrl(activity.image, { width: 400, quality: 75 })}
                    alt={activity.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {activity.title}
                  </h3>
                  <p className="text-gray-600 mb-3 flex-1">
                    {activity.description}
                  </p>
                  <p className="text-sm text-orange-600 font-medium">Best: {activity.bestSeason}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-orange-500 to-orange-600">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Plan Your Trip?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Explore our beaches, activities, and start planning your perfect Mauritius holiday.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PlanTripButton
              href="/beaches-in-mauritius"
              className="inline-flex items-center justify-center px-8 py-4 min-h-[48px] bg-white text-orange-500 font-semibold rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-90 disabled:cursor-wait"
            >
              Explore Beaches
            </PlanTripButton>
            <PlanTripButton
              href="/mauritius-activities"
              className="inline-flex items-center justify-center px-8 py-4 min-h-[48px] bg-orange-700 text-white font-semibold rounded-lg hover:bg-orange-800 transition-colors disabled:opacity-90 disabled:cursor-wait"
            >
              View Activities
            </PlanTripButton>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
