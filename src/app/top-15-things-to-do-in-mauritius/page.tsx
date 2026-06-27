import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlanTripButton from "@/components/PlanTripButton";
import { ItemListJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { getImageUrl } from "@/lib/image-url";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Top 15 Things to Do in Mauritius 2026 | Ultimate Travel Guide",
  description: "Discover the best things to do in Mauritius. From stunning beaches and water sports to cultural experiences and nature trails. Plan your perfect Mauritius trip.",
  openGraph: {
    title: "Top 15 Things to Do in Mauritius 2026",
    description: "Your ultimate guide to the best experiences in Mauritius - beaches, activities, culture and more.",
    images: [
      { url: getImageUrl("flic-en-flac-beach-in-mauritius.jpg", { width: 1200, quality: 75 }), width: 1200, height: 630 },
      DEFAULT_OG_IMAGE,
    ],
  },
  alternates: {
    canonical: "/top-15-things-to-do-in-mauritius",
  },
};

const TOP_15_THINGS = [
  {
    number: 1,
    title: "Relax on the Beach",
    description:
      "Mauritius boasts some of the world's most stunning beaches. Picture yourself on the soft, white sands of Flic-en-Flac or Grand Baie, with crystal-clear waters inviting you for a swim. Explore the vibrant marine life at Blue Bay or relax at the serene shores of Belle Mare. Each beach offers unique experiences, from thrilling water sports like windsurfing and kiteboarding to peaceful spots perfect for soaking up the sun. Enjoy delicious local cuisine and refreshing cocktails at the beachfront restaurants in Grand Baie and Flic-en-Flac. With so many options, every visit to Mauritius is a new adventure waiting to be explored.",
    image: "flic-en-flac-beach-in-mauritius.jpg",
    link: "/beaches-in-mauritius",
    linkText: "Discover our beaches",
  },
  {
    number: 2,
    title: "Explore the Natural Beauty",
    description:
      "Mauritius offers a stunning blend of natural beauty and unique landscapes. Explore the island's lush tropical forests and cascading waterfalls, home to diverse flora and fauna, many of which are endemic. Embark on a hike through Black River Gorges National Park to spot exotic birds and playful monkeys. Don't miss the Seven Coloured Earths, a captivating geological formation showcasing vibrant sand dunes in seven distinct colors. The island's mountain ranges provide breathtaking panoramic views of the azure sea, while the coastline is adorned with picturesque beaches ideal for relaxation and thrilling water sports. Experience the warmth and hospitality of the friendly locals, who are eager to share their rich culture with visitors.",
    image: "black-river-gorges-view-point.jpg",
    link: "/best-places-to-visit-in-mauritius/seven-coloured-earth",
    linkText: "Discover the best places to visit in Mauritius",
  },
  {
    number: 3,
    title: "Experience the Culture",
    description:
      "Mauritius is a vibrant melting pot of cultures and ethnicities, making it a truly unique travel destination. The island's rich culture has been shaped by its history of colonization, showcasing influences from French, British, African, Indian, and Chinese traditions. This diverse heritage is beautifully reflected in the island's cuisine, music, dance, art, and architecture. The warm and welcoming locals are eager to share their culture, offering visitors a chance to experience this firsthand by attending one of the many cultural festivals and events throughout the year. The traditional Sega dance, a lively expression of local culture, is a must-see, and food lovers can indulge in authentic Mauritian cuisine, featuring dishes like vindaye, a spicy fish curry, and dholl puri, a flavorful street food made with lentils and flatbread. Overall, the culture of Mauritius is a colorful celebration of diversity.",
    image: "grand-bassin-temple-mauritius.jpg",
    link: "/festivals-in-mauritius",
    linkText: "Explore festivals in Mauritius",
  },
  {
    number: 4,
    title: "Water Activities",
    description:
      "Mauritius is a paradise for water sports enthusiasts, with an array of activities to suit every taste and skill level. The island's crystal-clear waters are perfect for snorkeling, scuba diving, and swimming, with an abundance of marine life to discover. Visitors can also try their hand at windsurfing, kiteboarding, and paddleboarding, or take a leisurely sail around the island on a catamaran. For those seeking an adrenaline rush, there are plenty of options, including parasailing, jet skiing, and flyboarding. The island's coastline is also home to some of the world's best big-game fishing, with opportunities to catch marlin, tuna, and swordfish. With warm waters and an abundance of activities, Mauritius is a water sports lover's dream come true.",
    image: "/images/banners/swimming-with-dolphins-mauritius.webp",
    link: "/mauritius-activities",
    linkText: "Explore water activities",
  },
  {
    number: 5,
    title: "Local Food",
    description:
      "Mauritius is a food lover's paradise, with a unique cuisine that reflects the island's rich cultural heritage. The island's cuisine is a fusion of African, Indian, Chinese, and European influences, resulting in a delicious and diverse range of dishes. Visitors can indulge in traditional Mauritian dishes such as fish vindaye, a spicy curry made with fish, mustard seeds, and vinegar, or dholl puri, a popular street food made with lentil flour and stuffed with curried vegetables. Seafood is abundant on the island, with fresh catches of prawns, lobster, and octopus available at many of the island's restaurants. The island is also renowned for its tropical fruits, including mangoes, papayas, and pineapples, which are used in desserts such as gateaux piments, a popular snack made with lentil flour, and coconut chutney.",
    image: "local-food-mauritius.webp",
    link: "/best-places-to-visit-in-mauritius",
    linkText: "Discover local cuisine and markets",
  },
  {
    number: 6,
    title: "Nightlife",
    description:
      "Mauritius is not widely known for its nightlife scene, but the island still offers a range of options for those looking for after-dark entertainment. Grand Baie, located in the north of the island, is the main hub for nightlife, with a variety of bars and clubs catering to all tastes. The area comes alive at night, with music and laughter spilling out onto the streets as locals and tourists alike enjoy a night out. Many of the island's luxury hotels also offer evening entertainment, with live music, DJs, and cocktail bars providing a more upscale nightlife experience. For a more laid-back evening, visitors can head to one of the island's beach bars or restaurants, enjoying a sunset cocktail or dinner by the ocean.",
    image: "custom-nightlife-events.jpg",
    link: "/beaches-in-mauritius",
    linkText: "Explore Grand Baie",
  },
  {
    number: 7,
    title: "Shopping",
    description:
      "Mauritius offers a diverse range of shopping experiences, from bustling markets selling locally-made crafts and souvenirs to high-end luxury boutiques. The island's markets are a must-visit for those looking for unique and authentic souvenirs, with Port Louis' Central Market being one of the most popular. Here, visitors can haggle over handmade textiles, jewelry, and spices, as well as sample local street food. For those looking for more upscale shopping, the island's many malls and designer boutiques offer a range of international brands and luxury goods. The Caudan Waterfront in Port Louis is a popular shopping destination, offering a mix of local and international brands, as well as restaurants, bars, and a casino. The Bagatelle Mall in Moka is another popular option, with over 160 stores, a cinema, and a food court.",
    image: "caudan-waterfront-port-louis-mauritius.jpg",
    link: "/best-places-to-visit-in-mauritius",
    linkText: "Discover shopping in Mauritius",
  },
  {
    number: 8,
    title: "Go Snorkeling or Diving",
    description:
      "Mauritius is a popular destination for snorkeling and diving, with crystal-clear waters teeming with colorful marine life. The island's coral reefs provide a habitat for a variety of fish and other sea creatures, making it a paradise for underwater exploration. Some of the best spots for snorkeling and diving include Blue Bay Marine Park, Trou aux Biches, and Flic-en-Flac, where visitors can explore the colorful coral gardens and swim alongside tropical fish, sea turtles, and even dolphins. The island also boasts several shipwrecks, providing a unique opportunity for wreck diving enthusiasts to explore the sunken vessels and their surrounding ecosystems. Whether you're a beginner or an experienced diver, there are plenty of options for exploring the underwater world of Mauritius.",
    image: "snorkel-spot-le-morne-le-paradis.jpg",
    link: "/mauritius-activities",
    linkText: "Explore diving activities",
  },
  {
    number: 9,
    title: "Boat Trip",
    description:
      "A boat trip is a popular way to explore the stunning coastline of Mauritius and its surrounding islands. There are a variety of boat tours available, ranging from private catamaran charters to group excursions. Visitors can choose from a range of activities, such as snorkeling, swimming, and even dolphin and whale watching. One of the most popular boat tours is a visit to Ile aux Cerfs, a small island off the east coast of Mauritius, known for its beautiful beaches and clear blue waters. Visitors can also explore the picturesque fishing villages along the coast, such as Grand Gaube and Trou d'Eau Douce. Another popular option is a sunset cruise, where visitors can enjoy a romantic evening on the water, with stunning views of the coastline and the setting sun.",
    image: "ile-aux-cerfs-beach-in-mauritius.jpg",
    link: "/mauritius-activities",
    linkText: "Discover boat tours",
  },
  {
    number: 10,
    title: "Visit the Pamplemousses Garden",
    description:
      "The Pamplemousses Botanical Garden, also known as the Sir Seewoosagur Ramgoolam Botanical Garden, is a must-see attraction for nature lovers visiting Mauritius. Spread over 37 hectares, the garden is home to a stunning collection of endemic and exotic plants, including giant water lilies, rare palms, and towering baobab trees. Visitors can take a leisurely stroll through the garden's many paths and admire the beautiful landscapes and the peaceful atmosphere. One of the highlights of the garden is the Talipot palm, which blooms only once every sixty years and is the tallest palm tree in the world. The garden also has a collection of deer and giant tortoises, which visitors can observe and interact with. The Pamplemousses Botanical Garden is a true oasis of tranquility and natural beauty.",
    image: "pamplemousses-botanical-garden.jpg",
    link: "/best-places-to-visit-in-mauritius/pamplemousses-botanical-garden",
    linkText: "Learn more about Pamplemousses",
  },
  {
    number: 11,
    title: "Visit the Casela Park",
    description:
      "The Casela Park is a popular adventure park located in the western part of Mauritius. Spread over 14 hectares, the park offers a wide range of exciting activities for visitors of all ages, including zip lining, quad biking, segway tours, and animal encounters. One of the highlights of the park is the Safari tour, where visitors can see various African animals such as lions, zebras, and giraffes up close in their natural habitats. The park also has a bird park, where visitors can see various species of birds, including colorful parrots and eagles. The park also offers a range of dining options, from casual cafes to fine dining restaurants. The Casela Park is a perfect place for adventure lovers and families to spend a fun-filled day enjoying the great outdoors.",
    image: "deer-at-la-vanille-nature-park.jpg",
    link: "/mauritius-activities",
    linkText: "Discover adventure parks",
  },
  {
    number: 12,
    title: "Visit Mahebourg Village",
    description:
      "Mahebourg is a charming village located in the southeast of Mauritius. The village is known for its rich history, as it was the site of the famous Battle of Grand Port between the French and British in 1810. Today, visitors can explore the Naval Museum of Mahebourg, which showcases the history of the battle and the maritime heritage of the village. The village is also home to the Mahebourg Market, where visitors can find a variety of fresh fruits, vegetables, and local handicrafts. The village is situated on the shores of the beautiful Blue Bay lagoon, which is a popular spot for swimming, snorkeling, and boat tours. The village also has several restaurants serving local seafood dishes and delicious street food. Mahebourg is a great place to experience the traditional way of life in Mauritius.",
    image: "mahebourg-waterfront.jpg",
    link: "/beaches-in-mauritius/blue-bay",
    linkText: "Explore Mahebourg and Blue Bay",
  },
  {
    number: 13,
    title: "Visit Grand Baie Village",
    description:
      "Grand Baie is a picturesque fishing village located on the northern coast of Mauritius. The village is renowned for its stunning beaches, clear waters, and vibrant nightlife. Grand Baie is also a popular destination for fishing enthusiasts, as the village is home to a range of fishing charters and tours that offer visitors the chance to catch a variety of fish, including tuna, marlin, and barracuda. The village is also famous for its traditional seafood cuisine, which can be sampled at one of the many restaurants and food stalls lining the waterfront. Visitors can also explore the village's colorful markets, which sell a variety of fresh fish, fruits, and vegetables. Grand Baie is a must-visit destination for those looking to experience the authentic fishing village charm of Mauritius.",
    image: "grand-baie-mauritius.jpg",
    link: "/beaches-in-mauritius",
    linkText: "Explore Grand Baie beaches",
  },
  {
    number: 14,
    title: "Visit Port Louis",
    description:
      "Port Louis is the capital city of Mauritius, located on the northwest coast of the island. It is a bustling city with a rich history and culture. One of the most popular attractions in Port Louis is the Central Market, a bustling marketplace that offers a wide variety of local products, including spices, handicrafts, textiles, and fresh produce. The market is a vibrant hub of activity, with vendors haggling and customers bargaining. Another popular destination in Port Louis is the Caudan Waterfront, a modern shopping and entertainment complex located on the harbor. The waterfront offers a variety of shops, restaurants, and bars, as well as a cinema and a casino. Visitors can also enjoy a scenic stroll along the harbor or take a boat tour to see the city from a different perspective.",
    image: "caudan-waterfront-port-louis-mauritius.jpg",
    link: "/best-places-to-visit-in-mauritius",
    linkText: "Discover Port Louis",
  },
  {
    number: 15,
    title: "Explore Chamarel",
    description:
      "Chamarel is a charming village located in the southwest region of Mauritius, famous for its breathtaking natural beauty. Visitors flock to Chamarel to witness the stunning Seven Colored Earth geological formation and the magnificent Chamarel Waterfall. In addition to its picturesque scenery, Chamarel is renowned for its delicious Kreol cuisine, which is a vibrant fusion of Indian, African, and European influences, resulting in a unique blend of flavors and spices. Popular dishes include flavorful curries, fried noodles, fresh seafood, and aromatic chutneys, all made with fresh local ingredients. Additionally, visitors can savor a variety of locally produced rum and fruit liqueurs, available for tasting and purchase at the Chamarel Distillery. Chamarel is a must-visit destination for those seeking to experience the natural beauty and authentic Kreol cuisine of Mauritius.",
    image: "chamarel-waterfall.jpg",
    link: "/best-places-to-visit-in-mauritius/chamarel-waterfall",
    linkText: "Explore Chamarel",
  },
];

export default function Top15ThingsPage() {
  return (
    <main id="main-content" className="min-h-screen bg-white">
      <ItemListJsonLd
        name="Top 15 Things to Do in Mauritius"
        description="The ultimate guide to the best experiences and activities in Mauritius"
        items={TOP_15_THINGS.map((item) => ({
          position: item.number,
          name: item.title,
          url: `${SITE_URL}${item.link}`,
          description: item.description,
          image: getImageUrl(item.image, { width: 800, quality: 75 }),
        }))}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Top 15 Things to Do", url: `${SITE_URL}/top-15-things-to-do-in-mauritius` },
        ]}
      />

      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[44vh] min-h-[280px]">
        <Image
          src={getImageUrl("flic-en-flac-beach-in-mauritius.jpg", { width: 1200, quality: 75 })}
          alt="Top 15 Things to Do in Mauritius"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center px-4 max-w-4xl mx-auto translate-y-[2rem]">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Top 15 Things to Do in Mauritius
            </h1>
            <p className="text-white/90 text-base md:text-lg max-w-2xl mx-auto">
              Embrace the local culture, visit our beaches, and eat our food
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-base md:text-lg text-gray-700 leading-relaxed text-center">
            Mauritius is a tropical paradise located in the Indian Ocean, celebrated for its stunning beaches, crystal-clear waters, and rich cultural heritage. Whether you&apos;re seeking relaxation on the sun-kissed shores, adventurous exploration of the island&apos;s lush landscapes, or an immersion into its vibrant culture, Mauritius has something to offer for every traveler. From water sports and nature hikes to local cuisine and historical sites, visitors can enjoy a diverse array of activities and experiences that make each trip to Mauritius truly unforgettable.
          </p>
        </div>
      </section>

      {/* Top 15 List */}
      <section className="pb-16 md:pb-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="space-y-16 md:space-y-24">
            {TOP_15_THINGS.map((item, index) => (
              <div
                key={item.number}
                className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8 md:gap-12 items-center`}
              >
                <div className="w-full md:w-1/2">
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-2xl group">
                    <Image
                      src={getImageUrl(item.image, { width: 800, quality: 75 })}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      loading={index < 2 ? "eager" : "lazy"}
                    />
                    <div className="absolute top-4 left-4 w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white text-2xl font-bold">{item.number}</span>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-1/2 space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{item.title}</h2>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  <Link
                    href={item.link}
                    className="inline-flex items-center gap-2 text-orange-500 font-semibold hover:text-orange-600 transition-colors group"
                  >
                    {item.linkText}
                    <svg
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-orange-500 to-orange-600">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Explore Mauritius?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Mauritius is a tropical paradise that offers visitors an incredible array of activities and experiences, from relaxing on stunning beaches to exploring the island&apos;s rich nature and vibrant culture. Whether you&apos;re seeking a romantic getaway, an action-packed adventure, or a family-friendly vacation, there&apos;s something for everyone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PlanTripButton
              href="/beaches-in-mauritius"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-orange-500 font-semibold rounded-xl hover:bg-gray-100 transition-colors disabled:opacity-90 disabled:cursor-wait"
            >
              Explore Beaches
            </PlanTripButton>
            <PlanTripButton
              href="/mauritius-activities"
              className="inline-flex items-center justify-center px-8 py-4 bg-orange-700 text-white font-semibold rounded-xl hover:bg-orange-800 transition-colors disabled:opacity-90 disabled:cursor-wait"
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
