import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import PlanTripButton from "@/components/PlanTripButton";
import { getImageUrl } from "@/lib/image-url";
import WelcomeMapSection from "./WelcomeMapSection";
import MauritiusClock from "@/components/MauritiusClock";

const placesToVisit = [
  { name: "Grand Bassin", region: "South", description: "Sacred Hindu temple by a crater lake", image: "grand-bassin-shiva-statue.jpg", href: "/best-places-to-visit-in-mauritius/grand-bassin" },
  { name: "Black River Gorges", region: "South West", description: "Lush national park with hiking trails", image: "black-river-gorges-view-point.jpg", href: "/best-places-to-visit-in-mauritius/black-river-gorges" },
  { name: "Chamarel", region: "South West", description: "Seven Coloured Earth & stunning waterfall", image: "chamarel-waterfall.jpg", href: "/best-places-to-visit-in-mauritius/chamarel-waterfall" },
  { name: "Port-Louis", region: "North West", description: "Vibrant capital with markets & culture", image: "caudan-waterfront-port-louis-mauritius.jpg", href: "/best-places-to-visit-in-mauritius/port-louis" },
  { name: "Pamplemousses Garden", region: "North", description: "Botanical garden with giant water lilies", image: "pamplemousses-botanical-garden.jpg", href: "/best-places-to-visit-in-mauritius/pamplemousses-botanical-garden" },
  { name: "Cap Malheureux", region: "North", description: "Iconic red-roofed church by the sea", image: "cap-malheureux-beach-in-mauritius-island.jpg", href: "/best-places-to-visit-in-mauritius/cap-malheureux" },
];

const topFacts = [
  { icon: "🛂", label: "Visa", value: "90-day visa-free for most countries", cta: "See Requirements", href: "/about/visa-requirements" },
  { icon: "💰", label: "Currency", value: "Mauritian Rupee (MUR)", cta: "Convert Now", href: "#convert-currency" },
  { icon: "🌦️", label: "Weather", value: "Tropical Climate", cta: "See Forecast", href: "/best-time-to-visit-to-mauritius#live-weather" },
  { icon: "🏛️", label: "Capital", value: "Port-Louis", cta: "Learn More", href: "/best-places-to-visit-in-mauritius/port-louis" },
];

const bottomFacts = [
  { icon: "🗣️", label: "Languages", value: "English, French, Kreole" },
  { icon: "🕐", label: "Time Zone", value: "UTC+4" },
  { icon: "🚗", label: "Driving", value: "Left side of road" },
  { icon: "🚨", label: "Emergency", value: "Police: 999" },
];

const stats = [
  { number: "330", suffix: "km", label: "of stunning coastline" },
  { number: "500", suffix: "+", label: "endemic species" },
  { number: "50", suffix: "+", label: "pristine beaches" },
  { number: "1968", suffix: "", label: "year of independence" },
];

export default function WelcomePage() {
  return (
    <main id="main-content" className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[44vh] min-h-[280px]">
        <Image
          src={getImageUrl("/images/banners/le-morne-aerial-view-mauritius.jpg")}
          alt="Welcome to Mauritius"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center px-4 max-w-4xl mx-auto translate-y-[2rem]">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Welcome to Mauritius Island
            </h1>
            <p className="text-white/90 text-base md:text-lg max-w-2xl mx-auto">
              Your essential guide to the pearl of the Indian Ocean — where sapphire waters meet pristine white sand beaches
            </p>
          </div>
        </div>
      </section>

      {/* Live Mauritius Time */}
      <section className="pt-8 pb-2 bg-white">
        <div className="container mx-auto px-4 flex justify-center">
          <MauritiusClock />
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-6">
              <span className="text-orange-500 font-medium tracking-wider text-sm uppercase">Discover Paradise</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                Uncover the Wonders of Mauritius
              </h2>
            </div>
            
            <div className="prose prose-lg max-w-none text-gray-600 text-justify">
              <p className="text-lg leading-relaxed">
                <span className="font-semibold text-orange-500">Bonzour mo ban kamrade ! Tou korek?</span> Welcome on the island of the dodo bird, Mauritius or Ile Maurice in French, Indian Ocean sunniest destination and an unspoilt, beach lover&apos;s paradise that combines excellent urban experiences and natural activity options. Many times, we got ask the question — <em>Are Mauritius African? Are Mauritius Indian? Are Mauritius black?</em> Well the answer is Mauritius is a unique multicultural country, a cultural pot of African, Indian, European. Where is Mauritius? The island is located in the Indian Ocean, south of the Equator, east of Madagascar, between longitudes 57°16′ and 57°49′ east, and latitudes 19°58′ and 20°34′ south.
              </p>
              <p className="text-lg leading-relaxed mt-4">
                Whether you just landed from a straight flight with{" "}
                <a href="https://www.airmauritius.com/" target="_blank" rel="noopener noreferrer" className="font-semibold text-orange-500 hover:text-orange-600 underline">Air Mauritius</a>{" "}
                or through{" "}
                <a href="https://www.emirates.com/" target="_blank" rel="noopener noreferrer" className="font-semibold text-orange-500 hover:text-orange-600 underline">Emirates</a>, every visitor is left speechless by the sapphire blue ocean, porcelain white sand{" "}
                <Link href="/beaches-in-mauritius" className="font-semibold text-orange-500 hover:text-orange-600 underline">beaches</Link>,{" "}
                and one of the most spectacular coastlines in the world and shopping in Port-Louis, capital of Mauritius. And all this is just waiting to be explored. Visit Indian Ocean&apos;s sunniest capital and experience more than just amazing sunsets over the ocean. Mauritius is a favourite destination among honeymooners. Swim in one of the 50 white sand beaches and relax in one of the world&apos;s best hotels. There are a number of hotels, from top luxury hotels to family budget. If you&apos;re into photography or just an Instagram fan, we listed{" "}
                <Link href="/best-places-to-visit-in-mauritius/best-instagram-photo-location" className="font-semibold text-orange-500 hover:text-orange-600 underline">the most iconic Instagram places to visit</Link>.
              </p>
              <p className="text-lg leading-relaxed mt-4">
                Mauritius have so much more to offer than Maldives or Seychelles. There are so many{" "}
                <Link href="/mauritius-activities" className="font-semibold text-orange-500 hover:text-orange-600 underline">activities</Link>{" "}
                to do on the island, like hiking, zipline or mountain climbing. The most famous being Le Morne mountain. Check our{" "}
                <Link href="/top-15-things-to-do-in-mauritius" className="font-semibold text-orange-500 hover:text-orange-600 underline">top 15 activities</Link>{" "}
                btw! Rent a car or travel by taxi, visit the island and don&apos;t miss a spot. Check out the{" "}
                <Link href="/best-places-to-visit-in-mauritius/road-trip-south-coastal" className="font-semibold text-orange-500 hover:text-orange-600 underline">road trip along the south</Link>{" "}
                we wrote. We also listed everything to know in our blogs. So plan your holidays in Mauritius.
              </p>
              <p className="text-lg leading-relaxed mt-4">
                Regularly ranked in the top 10 world best destinations, Mauritius is where you can watch an ocean sunset and sunrise (from Le Pouce mountain you can see both) and never get bored with it. There are direct flights from Australia and Europe and a few African cities and Singapore, and many connecting flights from major cities around the world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Intro text above map — same width as map (max-w-6xl) */}
      <section className="pt-0 pb-4 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <p className="text-lg leading-relaxed text-gray-600 text-justify">
            Most people want to see a Mauritius Map before coming. We made it easier by pointing out the best places to visit.
          </p>
        </div>
      </section>

      {/* Map + Legend + Key (Carto Positron) */}
      <WelcomeMapSection />

      {/* What to Expect Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <span className="text-orange-500 font-medium tracking-wider text-sm uppercase">What to Expect</span>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">
                The Pearl of the Indian Ocean
              </h2>
            </div>

            <div className="prose prose-lg max-w-none text-gray-600 text-justify mb-10">
              <h3 className="text-base font-semibold text-orange-500 uppercase tracking-wide mt-6 mb-2">
                What are the best beaches to visit.
              </h3>
              <p className="text-lg leading-relaxed">
                There are many beautiful beaches in{" "}
                <span className="font-semibold text-orange-500">Mauritius</span>, and the best one for you will depend on your personal preferences. Explore from the North to the South, the famous beaches and the most beautiful of the islands. If the white sand of{" "}
                <Link href="/beaches-in-mauritius/belle-mare" className="font-semibold text-orange-500 hover:text-orange-600 underline">Belle Mare</Link> on the east is your favourite, why not explore hidden hideaways like{" "}
                <Link href="/beaches-in-mauritius/butte-a-lherbe" className="font-semibold text-orange-500 hover:text-orange-600 underline">Butte a l&apos;herbe</Link>. If some prefer to bask on the beach of{" "}
                <Link href="/beaches-in-mauritius/mont-choisy" className="font-semibold text-orange-500 hover:text-orange-600 underline">Mont Choisy</Link>, others like more the landscapes of{" "}
                <Link href="/beaches-in-mauritius/pointe-aux-piments" className="font-semibold text-orange-500 hover:text-orange-600 underline">Pointe aux Piments</Link>, with its small creeks studded with rocks along the coast, ideal for snorkeling, especially up to{" "}
                <Link href="/beaches-in-mauritius/balaclava" className="font-semibold text-orange-500 hover:text-orange-600 underline">Balaclava</Link>.{" "}
                <Link href="/beaches-in-mauritius/trou-aux-biches" className="font-semibold text-orange-500 hover:text-orange-600 underline">Trou aux Biches</Link> beach wins all the hearts with the coconut trees and the white sand beach. It is an excellent place to see sea turtles.
              </p>
              <h3 className="text-base font-semibold text-orange-500 uppercase tracking-wide mt-8 mb-2">
                What are the best places to visit.
              </h3>
              <p className="text-lg leading-relaxed">
                You can spend a month in Mauritius and only scratch the surface, but 1 week is still enough time to dive in the clear ocean, while exploring some of the exciting regions of this small island of the Indian Ocean or some of the overlooked attractions. There are plentiful attractions in Mauritius and a lot of natural places are in the south.{" "}
                <Link href="/best-places-to-visit-in-mauritius/grand-bassin" className="font-semibold text-orange-500 hover:text-orange-600 underline">Grand Bassin</Link> is one of the most visited places and we encourage you to do a road trip from{" "}
                <Link href="/best-places-to-visit-in-mauritius/grand-bassin" className="font-semibold text-orange-500 hover:text-orange-600 underline">Grand Bassin</Link> to{" "}
                <Link href="/best-places-to-visit-in-mauritius/chamarel-waterfall" className="font-semibold text-orange-500 hover:text-orange-600 underline">Chamarel</Link> or even from{" "}
                <Link href="/beaches-in-mauritius/le-morne" className="font-semibold text-orange-500 hover:text-orange-600 underline">Le Morne</Link> to{" "}
                <Link href="/best-places-to-visit-in-mauritius/mahebourg-village" className="font-semibold text-orange-500 hover:text-orange-600 underline">Mahebourg</Link> is ideal for visitors who don&apos;t have time to go on tours or if you have rented a car.{" "}
                <Link href="/best-places-to-visit-in-mauritius/port-louis" className="font-semibold text-orange-500 hover:text-orange-600 underline">Port-Louis</Link> the capital itself have a few places to visit and many places where to eat. For superb Chinese cuisine, go to China Town, and pick any small resto. Read more about Port-Louis{" "}
                <Link href="/best-places-to-visit-in-mauritius/port-louis" className="font-semibold text-orange-500 hover:text-orange-600 underline">here</Link>. Mauritius has no shortage of places to visit. Here are our best places to visit during your visit.
              </p>
              <p className="text-lg leading-relaxed mt-4">
                If you want to enjoy the maximum of your trip, check our{" "}
                <Link href="/itineraries-mauritius" className="font-semibold text-orange-500 hover:text-orange-600 underline">itinerary explore trip here</Link>.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-4 border border-gray-100">
                  <h3 className="text-base font-semibold text-gray-900 mb-1">Breathtaking Beaches</h3>
                  <p className="text-gray-600 text-sm">
                    Swim in over 50 white sand beaches and relax in world-class resorts. Every visitor is left speechless by the sapphire blue ocean and porcelain white sand.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-100">
                  <h3 className="text-base font-semibold text-gray-900 mb-1">Adventure Awaits</h3>
                  <p className="text-gray-600 text-sm">
                    From hiking Le Morne mountain to ziplining through forests, Mauritius offers so much more than the Maldives or Seychelles.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-100">
                  <h3 className="text-base font-semibold text-gray-900 mb-1">Perfect for Romance</h3>
                  <p className="text-gray-600 text-sm">
                    Regularly ranked in the world&apos;s top 10 destinations, Mauritius is a favourite among honeymooners seeking unforgettable sunsets.
                  </p>
                </div>
              </div>

              <div className="relative h-[350px] rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={getImageUrl("beach-of-le-morne-in-the-morning.jpg", { width: 800, quality: 75 })}
                  alt="Le Morne, Mauritius"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white text-sm font-medium">
                    Le Morne — dramatic scenery, white sand and turquoise water.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 bg-orange-500">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.number}<span className="text-orange-200">{stat.suffix}</span>
                </div>
                <p className="text-orange-100 text-sm md:text-base">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Places to Visit Section */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-6">
              <span className="text-orange-500 font-medium tracking-wider text-sm uppercase">Explore</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                Must-Visit Places
              </h2>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                You can spend a month in Mauritius and only scratch the surface — here are the highlights
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {placesToVisit.map((place, index) => (
                <Link
                  key={place.name}
                  href={place.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow group block"
                >
                  <div className="relative aspect-[16/10] w-full bg-gray-100">
                    <Image
                      src={getImageUrl(place.image, { width: 400, quality: 75 })}
                      alt={place.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute top-2 left-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm z-10">
                      {index + 1}
                    </div>
                  </div>
                  <div className="p-3">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {place.region}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900 mt-0.5 mb-1 group-hover:text-orange-600 transition-colors">
                      {place.name}
                    </h3>
                    <p className="text-gray-600 text-sm">{place.description}</p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                href="/best-places-to-visit-in-mauritius"
                className="inline-flex items-center gap-2 bg-orange-500 text-white px-8 py-3 rounded-full font-medium hover:bg-orange-600 transition-colors"
              >
                View All Places
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Facts Section */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <span className="text-orange-500 font-medium tracking-wider text-sm uppercase">Before You Go</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                Essential Information
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {topFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="bg-gray-50 rounded-xl p-4 text-center hover:bg-orange-50 transition-colors flex flex-col"
                >
                  <span className="text-3xl mb-2 block">{fact.icon}</span>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">{fact.label}</h4>
                  <p className="text-gray-600 text-xs mb-3">{fact.value}</p>
                  <Link
                    href={fact.href}
                    className="mt-auto inline-flex items-center justify-center gap-1 text-sm font-medium text-orange-600 hover:text-orange-700 bg-white border border-orange-200 hover:border-orange-300 rounded-lg px-3 py-1.5 transition-colors"
                  >
                    {fact.cta}
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {bottomFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="bg-gray-50 rounded-xl p-4 text-center hover:bg-orange-50 transition-colors"
                >
                  <span className="text-3xl mb-2 block">{fact.icon}</span>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">{fact.label}</h4>
                  <p className="text-gray-600 text-xs">{fact.value}</p>
                </div>
              ))}
            </div>

            <div id="convert-currency" className="mt-10 scroll-mt-24">
              <div className="text-center mb-6">
                <span className="text-orange-500 font-medium tracking-wider text-sm uppercase">Travel money</span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                  Convert your currency to MUR
                </h2>
              </div>
              <p className="text-gray-600 text-sm text-center mb-6 max-w-xl mx-auto">
                Use the tools below to see how much your money is worth in Mauritian Rupees (MUR). Rates are indicative.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center max-w-4xl mx-auto">
                <div className="text-center">
                  <p className="text-gray-700 font-medium text-sm mb-2">USD → MUR</p>
                  <iframe
                    height={410}
                    width={340}
                    title="USD to MUR currency converter"
                    src="https://www.xe.com/currencyconverter/fx-widget?amount=1&from=USD&to=MUR"
                    className="border-0 rounded-lg overflow-hidden"
                  />
                </div>
                <div className="text-center">
                  <p className="text-gray-700 font-medium text-sm mb-2">EUR → MUR</p>
                  <iframe
                    height={410}
                    width={340}
                    title="EUR to MUR currency converter"
                    src="https://www.xe.com/currencyconverter/fx-widget?amount=1&from=EUR&to=MUR"
                    className="border-0 rounded-lg overflow-hidden"
                  />
                </div>
                <div className="text-center">
                  <p className="text-gray-700 font-medium text-sm mb-2">CNY → MUR</p>
                  <iframe
                    height={410}
                    width={340}
                    title="CNY to MUR currency converter"
                    src="https://www.xe.com/currencyconverter/fx-widget?amount=1&from=CNY&to=MUR"
                    className="border-0 rounded-lg overflow-hidden"
                  />
                </div>
                <div className="text-center">
                  <p className="text-gray-700 font-medium text-sm mb-2">INR → MUR</p>
                  <iframe
                    height={410}
                    width={340}
                    title="INR to MUR currency converter"
                    src="https://www.xe.com/currencyconverter/fx-widget?amount=1&from=INR&to=MUR"
                    className="border-0 rounded-lg overflow-hidden"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Explore Mauritius?
          </h2>
          <p className="text-orange-100 text-lg mb-8 max-w-2xl mx-auto">
            Ask us where to go, what to see, and we will show you how — this is our mission.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PlanTripButton
              href="/itineraries-mauritius"
              className="inline-flex items-center justify-center bg-white text-orange-500 px-8 py-3 rounded-full font-semibold hover:bg-orange-50 transition-colors disabled:opacity-90 disabled:cursor-wait"
            >
              Plan Your Trip
            </PlanTripButton>
            <PlanTripButton
              href="/beaches-in-mauritius"
              className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors disabled:opacity-90 disabled:cursor-wait"
            >
              Explore Beaches
            </PlanTripButton>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
