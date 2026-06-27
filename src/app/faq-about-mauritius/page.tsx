"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { ChevronDownIcon } from "@/components/icons";
import { getImageUrl } from "@/lib/image-url";

interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
}

const faqs: FAQItem[] = [
  {
    question: "What is the best time to come to Mauritius?",
    answer: (
      <div className="space-y-3">
        <p>Definitely the summer months between November and April. November to February can get very hot (+30°C) but also humid. Be mindful it is a cyclonic period so keep an eye on the weather forecast.</p>
        <p>April and May are mild summer and September/October signals the start of summer but can still be windy in the south.</p>
        <p>In winter, between May and August, the weather along the coast is good and warm. Looking at 20–25 degrees during the day, it can drop to under 20 degrees at night and to a chill 18 degrees in the highlands. It can be overcast or get windy on the east and South Coast due to the South East trade winds.</p>
      </div>
    ),
  },
  {
    question: "What is the weather like?",
    answer: (
      <div className="space-y-3">
        <p><strong>Sunny &amp; humid in summer (November to March):</strong> Temperatures reaching and exceeding 30°C, and nights can be warm (+25°C). Expect on average 28°C–30°C in December to February. Expect sunny days with the occasional summer rains in the afternoon.</p>
        <p><strong>Sunny &amp; drier (April–May and September–October):</strong> These are the best months for people not fan of high temperature and humidity. The days are warm, but nights are cooler.</p>
        <p><strong>Winter (June to August):</strong> You&apos;re looking at 20 degrees along the coast but can drop to under 15°C on the highlands (e.g. Curepipe). You can expect the sky to be overcast with intermittent drizzle. It will get windy on the east and south coast, which is the preferred month for kitesurfers and surfers.</p>
      </div>
    ),
  },
  {
    question: "When is the rainy season?",
    answer: "A previous traveler can tell you rainy season is in summer because they got unlucky during their 1 week stay. There is actually no rainy season (or monsoon like in Asia). In fact, recently our reservoirs were below 50% capacity. In summer, it can rain heavily for a few hours and winter will bring some drizzle. It can rain for a few days if there is a cyclone around.",
  },
  {
    question: "What are the best beaches to visit?",
    answer: (
      <div className="space-y-4">
        <p>Judging from white sand, snorkeling, and coastline vegetation, below is a list of public beaches around the island that are worth visiting:</p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <li className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
            <span>Le Morne – South West Coast</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
            <span>Trou aux Biches – North Coast</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
            <span>Pereybere – North Coast</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
            <span>Flic en Flac – West Coast</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
            <span>Bel Ombre – South Coast</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
            <span>Pointe d&apos;Esny – South East Coast</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
            <span>Belle Mare – East Coast</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
            <span>Ile aux Cerfs – East Coast</span>
          </li>
        </ul>
        <p className="text-base text-gray-500">Some hotels have very good private beaches including Shangri-La, Le Touessrok, Four Seasons, St Géran, Long Beach, Constance Belle Mare, and LUX* Grand Gaube.</p>
      </div>
    ),
  },
  {
    question: "What is the main religion?",
    answer: (
      <div className="space-y-3">
        <p>Mauritius is a country of several religions. <strong>Hinduism</strong> is the main one, with over half the population. They come mainly from the arrival of the labourers when the island belonged to the United Kingdom, once slavery was abolished.</p>
        <p>Hinduism is present all over the island with colourful temples and celebrations over the year such as Maha Shivaratree or Diwali. Ganga Talao is the holiest place for Hinduism, with a 33 meters tall statue of Shiva.</p>
        <p><strong>Christianity</strong> is the second religion with a third of the population, followed by <strong>Islam</strong> with less than 20% of the population.</p>
      </div>
    ),
  },
  {
    question: "Is it safe to travel alone?",
    answer: (
      <div className="space-y-3">
        <p>Yes, absolutely. You can travel to Mauritius alone, whether you&apos;re a man or woman. Politics are very stable in the island and we are a multi-cultural population.</p>
        <p>Travelers are rarely involved in crimes or petty crimes but be aware of scams (buying a watch on the street!), or taking something before asking for the price, or going on a cheap tour too good to be true.</p>
        <p>Tourists are a very welcome source of income for the island and locals tend to respect and encourage positive interaction with travelers. You can ask anyone a question anywhere, and we will help you as much as possible.</p>
        <p>Most hotels have private security and you will feel secure all the time. There are police patrolling the streets days and night and a lot of public beaches have CCTV cameras.</p>
      </div>
    ),
  },
  {
    question: "Where to stay outside hotels?",
    answer: (
      <div className="space-y-3">
        <p>There are now villas available for holidays and some Bed and Breakfast style lodges. A few lodges are becoming very popular and more recently you can find it possible to spend a night or two in a Tent or in a Bubble Lodge.</p>
        <p>With Green Tourism emerging all over the world, lodges and alternative accommodations are more and more present in the centre of the island, in nature. A great way to have a quiet stay, with milder temperatures than on the coast.</p>
      </div>
    ),
  },
  {
    question: "What are the best hotels?",
    answer: (
      <div className="space-y-4">
        <p>Hotels are categorized into 5★ Luxury, 5★, 4★ and so on. Best hotels for Mauritius Explored would be based on location, service, and beach quality.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">South Coast</h4>
            <ul className="space-y-1 text-base">
              <li>• St. Regis</li>
              <li>• Beachcomber Dinarobin</li>
              <li>• LUX* Le Morne</li>
              <li>• Outrigger Resort</li>
              <li>• Heritage Le Telfair</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">North Coast</h4>
            <ul className="space-y-1 text-base">
              <li>• Veranda Grand Baie</li>
              <li>• Zilwa Attitude</li>
              <li>• LUX* Grand Gaube</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">East Coast</h4>
            <ul className="space-y-1 text-base">
              <li>• Four Seasons</li>
              <li>• Prince Maurice</li>
              <li>• Preskil Hotel</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">West Coast</h4>
            <ul className="space-y-1 text-base">
              <li>• La Pirogue, Flic en Flac</li>
              <li>• Sugar Beach, Flic en Flac</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  {
    question: "What are the best activities?",
    answer: (
      <div className="space-y-4">
        <p>There are many activities and we recommend the following (at least 1 or 2 if you are only here for a week):</p>
        <div className="space-y-4">
          <div className="border-l-4 border-orange-500 pl-4">
            <h4 className="font-semibold text-gray-900">Catamaran Cruise</h4>
            <p className="text-base text-gray-600">Sail to Ile aux Cerfs, Ile aux Bénitiers or Ilot Gabriel. Spend the whole day on a catamaran, snorkelling in places you wouldn&apos;t reach otherwise, with food and drinks provided.</p>
          </div>
          <div className="border-l-4 border-orange-500 pl-4">
            <h4 className="font-semibold text-gray-900">Dolphin Swim</h4>
            <p className="text-base text-gray-600">Swim with wild dolphins on the west coast. Note that all dolphins are wild and you are not allowed to touch them.</p>
          </div>
          <div className="border-l-4 border-orange-500 pl-4">
            <h4 className="font-semibold text-gray-900">Horse Riding on the Beach</h4>
            <p className="text-base text-gray-600">A very quiet activity. Horse-riding on the beach for 2 to 3 hours will really de-stress you.</p>
          </div>
          <div className="border-l-4 border-orange-500 pl-4">
            <h4 className="font-semibold text-gray-900">Helicopter Tour</h4>
            <p className="text-base text-gray-600">Discover the whole island and that iconic underwater waterfall at Le Morne.</p>
          </div>
          <div className="border-l-4 border-orange-500 pl-4">
            <h4 className="font-semibold text-gray-900">Zip Line</h4>
            <p className="text-base text-gray-600">Flying over unspoiled locations at Casela or Lavilleon.</p>
          </div>
          <div className="border-l-4 border-orange-500 pl-4">
            <h4 className="font-semibold text-gray-900">7 Cascades Hike</h4>
            <p className="text-base text-gray-600">This 4-hour hike is amazing. Walk down the gorges of Tamarind to discover all the waterfalls and swim in one of the many basins. Guide highly recommended.</p>
          </div>
          <div className="border-l-4 border-orange-500 pl-4">
            <h4 className="font-semibold text-gray-900">Seakart</h4>
            <p className="text-base text-gray-600">An original boat designed by a Mauritian. Drive your own speedboat along the west coast to Le Morne. Absolute fun!</p>
          </div>
          <div className="border-l-4 border-orange-500 pl-4">
            <h4 className="font-semibold text-gray-900">Underwater Sea Walk</h4>
            <p className="text-base text-gray-600">If you want to dive but don&apos;t have a diving licence, walk 3 meters below the surface and look at corals and fishes.</p>
          </div>
          <div className="border-l-4 border-orange-500 pl-4">
            <h4 className="font-semibold text-gray-900">Diving</h4>
            <p className="text-base text-gray-600">Discover the many treasures of the ocean, from angel fish to shark dives and caves. If you&apos;ve never dived before, you can do an initiation dive up to 12 metres.</p>
          </div>
          <div className="border-l-4 border-orange-500 pl-4">
            <h4 className="font-semibold text-gray-900">Skydive</h4>
            <p className="text-base text-gray-600">Looking for something you&apos;ll probably never forget? Bonus: the view over the lagoon when going up in the plane!</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    question: "Should I rent a car or use a taxi or public transport?",
    answer: (
      <div className="space-y-3">
        <p>It depends on what type of person you are and how long you&apos;re staying:</p>
        <ul className="space-y-2">
          <li className="flex items-start space-x-2">
            <span className="w-2 h-2 bg-orange-500 rounded-full mt-2"></span>
            <span><strong>Adventurous &amp; exploring type:</strong> Definitely rent a car.</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="w-2 h-2 bg-orange-500 rounded-full mt-2"></span>
            <span><strong>Staying for a week with 1-2 activities:</strong> Use a taxi or join a day tour.</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="w-2 h-2 bg-orange-500 rounded-full mt-2"></span>
            <span><strong>Staying longer:</strong> Rent a car for at least a few days to visit places not serviced by public transport.</span>
          </li>
        </ul>
        <p className="text-base text-gray-500 mt-4">Note: Public transport is not very reliable, especially along the coast and at night. There is no fixed bus schedule. The north side is better serviced than the East or South.</p>
      </div>
    ),
  },
  {
    question: "Can I use my dollars or euros in Mauritius?",
    answer: "This is not possible. You will have to exchange into Mauritian Rupees either at the bank or an exchange shop around the island (Grand Baie, Port Louis or Flic en Flac).",
  },
  {
    question: "Can I work during my holidays?",
    answer: "Unfortunately you are not allowed to work on your tourist visa during your holidays. For work visa enquiries, please contact the relevant authorities.",
  },
];

function FAQAccordion({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-6 py-5 flex items-center justify-between text-left bg-white hover:bg-gray-50 transition-colors"
      >
        <span className="text-base md:text-lg font-medium text-gray-900 pr-4">{item.question}</span>
        <ChevronDownIcon
          className={`w-6 h-6 text-orange-500 flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-6 py-5 bg-gray-50 text-gray-600 text-base leading-relaxed border-t border-gray-200">
          {item.answer}
        </div>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main id="main-content" className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[44vh] min-h-[280px]">
        <Image
          src={getImageUrl("/images/banners/surfing-barrel-wave-mauritius.jpg")}
          alt="FAQ about Mauritius"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center px-4 max-w-4xl mx-auto translate-y-[2rem]">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h1>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <p className="text-center text-gray-600 mb-10">
              Here are the most common questions about visiting Mauritius. If you don&apos;t find your answer below, feel free to{" "}
              <Link href="/contact" className="text-orange-500 hover:underline">
                contact us
              </Link>
              .
            </p>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <FAQAccordion
                  key={index}
                  item={faq}
                  isOpen={openIndex === index}
                  onToggle={() => handleToggle(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Still have questions?
          </h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            We&apos;re here to help you plan your perfect Mauritius adventure.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition-colors"
          >
            Get In Touch
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
