import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlanTripButton from "@/components/PlanTripButton";
import { FAQJsonLd, ItemListJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { getImageUrl } from "@/lib/image-url";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/constants";
import { localizeStaticPage, staticPageText } from "@/lib/static-page-localizer";
import { normalizeLocale } from "@/i18n/routing";

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
    title: "Nightlife in Grand Baie",
    description:
      "Mauritius is not widely known for its nightlife scene, but the island still offers a range of options for those looking for after-dark entertainment. Grand Baie, located in the north of the island, is the main hub for nightlife, with a variety of bars and clubs catering to all tastes. The area comes alive at night, with music and laughter spilling out onto the streets as locals and tourists alike enjoy a night out. Many of the island's luxury hotels also offer evening entertainment, with live music, DJs, and cocktail bars providing a more upscale nightlife experience. For a more laid-back evening, visitors can head to one of the island's beach bars or restaurants, enjoying a sunset cocktail or dinner by the ocean.",
    image: "custom-nightlife-events.jpg",
    link: "/beaches-in-mauritius",
    linkText: "Explore Grand Baie",
  },
  {
    number: 7,
    title: "Shopping in Port Louis & Bagatelle",
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
    title: "Catamaran Trip to Ile aux Cerfs",
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

const TOP_15_FAQS = [
  {
    question: "What are the best things to do in Mauritius for first-time visitors?",
    answer:
      "Start with a calm beach day, a north or south road trip, Chamarel and Black River Gorges, Port Louis market, a catamaran cruise and one local food stop.",
  },
  {
    question: "How many days do I need to see the main Mauritius highlights?",
    answer:
      "Seven days is enough for beaches, a few activities and one or two road trips. Ten to fourteen days gives more time for hikes, islands, markets and slower coastal days.",
  },
  {
    question: "Do I need to book Mauritius activities in advance?",
    answer:
      "Book popular boat trips, dolphin tours, hikes and private transfers in advance during school holidays and peak travel months. Keep flexible days for weather-sensitive activities.",
  },
];

type SupportedTop15Locale = "fr" | "de" | "it" | "es" | "ru";

const TOP_15_PAGE_COPY: Record<SupportedTop15Locale, {
  heroSubtitle: string;
  intro: string;
  itemListDescription: string;
  things: Record<number, { description: string; linkText: string }>;
  faqTitle: string;
  faqs: { question: string; answer: string }[];
  ctaTitle: string;
  ctaText: string;
  beachButton: string;
  activityButton: string;
}> = {
  fr: {
    heroSubtitle: "Vivez la culture locale, profitez des plages et goutez la cuisine mauricienne",
    intro: "Maurice est un paradis tropical de l'ocean Indien, connu pour ses plages, ses lagons clairs et son patrimoine culturel. Des lieux comme Chamarel, Casela Nature Parks et l'ile aux Cerfs montrent pourquoi l'ile convient autant aux journees plage qu'aux aventures et aux sorties en famille. Entre sports nautiques, randonnees, cuisine locale et sites historiques, chaque voyage peut etre simple, varie et memorable.",
    itemListDescription: "Le guide essentiel des meilleures experiences et activites a Maurice",
    things: {
      1: { description: "Detendez-vous sur les plages de Flic-en-Flac, Grand Baie, Blue Bay ou Belle Mare. Sable clair, lagons calmes, restaurants en bord de mer et sports nautiques faciles en font un premier choix pour decouvrir Maurice.", linkText: "Decouvrir nos plages" },
      2: { description: "Explorez les forets tropicales, cascades, montagnes et points de vue de l'ile. Black River Gorges, les Terres de sept couleurs et les sentiers des hauts plateaux revelent une Maurice plus sauvage.", linkText: "Decouvrir les meilleurs lieux a visiter a Maurice" },
      3: { description: "La culture mauricienne mele influences africaines, indiennes, chinoises, europeennes et creoles. Festivals, sega, temples, marches et cuisine locale donnent une vraie lecture de l'ile.", linkText: "Explorer les festivals a Maurice" },
      4: { description: "Snorkeling, plongee, paddle, kitesurf, catamaran, peche au gros ou nage dans les lagons: les eaux chaudes de Maurice offrent des activites pour tous les niveaux.", linkText: "Explorer les activites nautiques" },
      5: { description: "Goutez au dholl puri, au vindaye, aux currys, aux fruits tropicaux, aux fruits de mer et aux snacks de marche. La cuisine mauricienne est simple, coloree et pleine d'influences.", linkText: "Decouvrir la cuisine locale et les marches" },
      6: { description: "Grand Baie reste le centre le plus anime pour sortir le soir, avec bars, restaurants, musique et clubs. Pour une soiree plus calme, choisissez un bar de plage au coucher du soleil.", linkText: "Explorer Grand Baie" },
      7: { description: "Entre le marche central de Port Louis, le Caudan Waterfront, Bagatelle et les petits bazars, vous trouverez epices, textiles, artisanat, souvenirs et marques internationales.", linkText: "Decouvrir le shopping a Maurice" },
      8: { description: "Blue Bay, Trou aux Biches, Flic-en-Flac et plusieurs recifs proteges permettent de voir poissons tropicaux, coraux, tortues et epaves selon les conditions.", linkText: "Explorer les activites de plongee" },
      9: { description: "Une sortie en catamaran vers l'ile aux Cerfs combine lagon turquoise, baignade, snorkeling et dejeuner sur l'eau. C'est l'une des journees bateau les plus populaires de l'est.", linkText: "Decouvrir les excursions en bateau" },
      10: { description: "Le jardin botanique de Pamplemousses abrite nenuphars geants, palmiers rares, allees ombragees et tortues. C'est une halte paisible pour les amoureux de nature.", linkText: "En savoir plus sur Pamplemousses" },
      11: { description: "Casela propose tyroliennes, quad, safari, rencontres animales et activites familiales dans l'ouest de l'ile. C'est une bonne option pour une journee active.", linkText: "Decouvrir les parcs d'aventure" },
      12: { description: "Mahebourg offre un visage plus authentique de Maurice: front de mer, marche, musee naval, histoire de Grand Port et acces facile au lagon de Blue Bay.", linkText: "Explorer Mahebourg et Blue Bay" },
      13: { description: "Grand Baie melange plage, restaurants, bateaux, boutiques et vie nocturne. Le village est pratique pour rayonner vers Pereybere, Mont Choisy et les iles du nord.", linkText: "Explorer les plages de Grand Baie" },
      14: { description: "Port Louis rassemble marche central, Caudan Waterfront, musees, street food et vie urbaine. C'est l'endroit ideal pour sentir l'energie de la capitale.", linkText: "Decouvrir Port Louis" },
      15: { description: "Chamarel concentre cascade, terres colorees, routes de montagne, rhum, cuisine creole et vues spectaculaires. C'est un incontournable du sud-ouest.", linkText: "Explorer Chamarel" },
    },
    faqTitle: "FAQ des choses a faire a Maurice",
    faqs: [
      { question: "Quelles sont les meilleures choses a faire a Maurice pour une premiere visite ?", answer: "Commencez par une plage calme, une route dans le nord ou le sud, Chamarel et Black River Gorges, le marche de Port Louis, une sortie catamaran et une vraie pause cuisine locale." },
      { question: "Combien de jours faut-il pour voir les grands incontournables ?", answer: "Sept jours suffisent pour les plages, quelques activites et une ou deux routes. Dix a quatorze jours permettent d'ajouter randonnees, iles, marches et journees plus lentes." },
      { question: "Faut-il reserver les activites a l'avance ?", answer: "Reservez les sorties bateau, dauphins, randonnees guidees et transferts prives en haute saison. Gardez quelques jours flexibles pour la meteo." },
    ],
    ctaTitle: "Planifiez vos journees d'activites a Maurice",
    ctaText: "Choisissez votre prochaine etape, entre plage, bateau, points de vue a Chamarel, aventures a Casela et journees faciles en famille.",
    beachButton: "Explorer les plages de Maurice",
    activityButton: "Voir les activites a Maurice",
  },
  de: {
    heroSubtitle: "Erleben Sie lokale Kultur, besuchen Sie Strande und probieren Sie mauritisches Essen",
    intro: "Mauritius ist ein tropisches Paradies im Indischen Ozean mit Stranden, klaren Lagunen und reicher Kultur. Chamarel, Casela Nature Parks und Ile aux Cerfs zeigen, wie gut die Insel fur Strandtage, Abenteuer und Familienausfluge funktioniert. Von Wassersport und Wanderungen bis zu lokaler Kuche und Geschichte bleibt jede Reise abwechslungsreich.",
    itemListDescription: "Der wichtigste Guide zu den besten Erlebnissen und Aktivitaten auf Mauritius",
    things: {
      1: { description: "Entspannen Sie an Stranden wie Flic-en-Flac, Grand Baie, Blue Bay und Belle Mare. Weicher Sand, ruhige Lagunen, Strandrestaurants und Wassersport machen den Einstieg leicht.", linkText: "Unsere Strande entdecken" },
      2: { description: "Entdecken Sie Regenwald, Wasserfalle, Berge und Aussichtspunkte. Black River Gorges, die Siebenfarbige Erde und Hochlandwege zeigen die wilde Seite von Mauritius.", linkText: "Die besten Sehenswurdigkeiten entdecken" },
      3: { description: "Mauritius verbindet afrikanische, indische, chinesische, europaische und kreolische Einflusse. Festivals, Sega, Tempel, Markte und Essen machen diese Mischung sichtbar.", linkText: "Festivals auf Mauritius entdecken" },
      4: { description: "Schnorcheln, Tauchen, SUP, Kitesurfen, Katamaran, Hochseefischen oder Lagunenschwimmen: die warmen Gewasser bieten Aktivitaten fur jedes Niveau.", linkText: "Wasseraktivitaten entdecken" },
      5: { description: "Probieren Sie Dholl Puri, Vindaye, Currys, tropische Fruchte, Meeresfruchte und Markt-Snacks. Die mauritische Kuche ist bunt, einfach und voller Einflusse.", linkText: "Lokale Kuche und Markte entdecken" },
      6: { description: "Grand Baie ist der wichtigste Ort fur Abende mit Bars, Restaurants, Musik und Clubs. Ruhiger wird es in Strandbars bei Sonnenuntergang.", linkText: "Grand Baie erkunden" },
      7: { description: "Central Market, Caudan Waterfront, Bagatelle und kleinere Basare bieten Gewurze, Textilien, Handwerk, Souvenirs und internationale Marken.", linkText: "Shopping auf Mauritius entdecken" },
      8: { description: "Blue Bay, Trou aux Biches, Flic-en-Flac und geschutzte Riffe eignen sich fur bunte Fische, Korallen, Schildkroten und je nach Bedingungen auch Wracks.", linkText: "Tauchaktivitaten entdecken" },
      9: { description: "Ein Katamaran nach Ile aux Cerfs kombiniert turkise Lagunen, Baden, Schnorcheln und Mittagessen auf dem Wasser. Eine der beliebtesten Bootstouren im Osten.", linkText: "Bootstouren entdecken" },
      10: { description: "Der Botanische Garten Pamplemousses bietet riesige Seerosen, seltene Palmen, schattige Alleen und Schildkroten. Ein ruhiger Stopp fur Naturfreunde.", linkText: "Mehr uber Pamplemousses erfahren" },
      11: { description: "Casela bietet Zipline, Quad, Safari, Tierbegegnungen und Familienaktivitaten im Westen der Insel. Ideal fur einen aktiven Tag.", linkText: "Abenteuerparks entdecken" },
      12: { description: "Mahebourg zeigt ein authentischeres Mauritius mit Waterfront, Markt, Marinemuseum, Grand-Port-Geschichte und schnellem Zugang zur Blue-Bay-Lagune.", linkText: "Mahebourg und Blue Bay erkunden" },
      13: { description: "Grand Baie verbindet Strand, Restaurants, Boote, Shops und Nachtleben. Der Ort ist praktisch fur Pereybere, Mont Choisy und die nordlichen Inseln.", linkText: "Strande von Grand Baie erkunden" },
      14: { description: "Port Louis vereint Central Market, Caudan Waterfront, Museen, Streetfood und Stadtleben. Hier spurt man die Energie der Hauptstadt.", linkText: "Port Louis entdecken" },
      15: { description: "Chamarel kombiniert Wasserfall, Farbige Erde, Bergstrassen, Rum, kreolische Kuche und spektakulare Ausblicke. Ein Muss im Sudwesten.", linkText: "Chamarel erkunden" },
    },
    faqTitle: "FAQ zu Aktivitaten auf Mauritius",
    faqs: [
      { question: "Was sind die besten Aktivitaten fur Erstbesucher?", answer: "Beginnen Sie mit einem ruhigen Strandtag, einer Nord- oder Sudroute, Chamarel und Black River Gorges, dem Markt in Port Louis, einer Katamarantour und einem lokalen Food-Stopp." },
      { question: "Wie viele Tage brauche ich fur die Highlights?", answer: "Sieben Tage reichen fur Strande, einige Aktivitaten und ein bis zwei Roadtrips. Zehn bis vierzehn Tage geben mehr Zeit fur Wanderungen, Inseln, Markte und langsame Kustentage." },
      { question: "Sollte ich Aktivitaten im Voraus buchen?", answer: "Buchen Sie Bootstouren, Delfintouren, gefuhrte Wanderungen und private Transfers in Ferienzeiten fruh. Lassen Sie flexible Tage fur wetterabhangige Plane." },
    ],
    ctaTitle: "Planen Sie Ihre Aktivitatentage auf Mauritius",
    ctaText: "Wahlen Sie den nachsten Inselstopp: Strandzeit, Bootstouren, Chamarel-Aussichten, Casela-Abenteuer oder einfache Familientage.",
    beachButton: "Mauritius-Strande erkunden",
    activityButton: "Aktivitaten auf Mauritius ansehen",
  },
  it: {
    heroSubtitle: "Vivi la cultura locale, visita le spiagge e assaggia la cucina mauriziana",
    intro: "Mauritius e un paradiso tropicale nell'Oceano Indiano, famoso per spiagge, lagune limpide e cultura ricca. Chamarel, Casela Nature Parks e Ile aux Cerfs mostrano perche l'isola funziona per mare, avventura e giornate in famiglia. Tra sport acquatici, trekking, cucina locale e siti storici, ogni viaggio resta vario e memorabile.",
    itemListDescription: "La guida essenziale alle migliori esperienze e attivita di Mauritius",
    things: {
      1: { description: "Rilassati sulle spiagge di Flic-en-Flac, Grand Baie, Blue Bay o Belle Mare. Sabbia chiara, lagune calme, ristoranti sul mare e sport acquatici rendono facile iniziare.", linkText: "Scopri le nostre spiagge" },
      2: { description: "Esplora foreste tropicali, cascate, montagne e punti panoramici. Black River Gorges, le Terre dei sette colori e gli altopiani rivelano la Mauritius piu selvaggia.", linkText: "Scopri i migliori luoghi da visitare" },
      3: { description: "La cultura mauriziana unisce influenze africane, indiane, cinesi, europee e creole. Festival, sega, templi, mercati e cucina locale raccontano questa identita.", linkText: "Esplora i festival a Mauritius" },
      4: { description: "Snorkeling, immersioni, paddle, kitesurf, catamarano, pesca d'altura o nuoto in laguna: le acque calde offrono attivita per ogni livello.", linkText: "Esplora le attivita acquatiche" },
      5: { description: "Assaggia dholl puri, vindaye, curry, frutta tropicale, pesce fresco e snack di mercato. La cucina mauriziana e colorata, semplice e piena di influenze.", linkText: "Scopri cucina locale e mercati" },
      6: { description: "Grand Baie e il centro principale per la sera, con bar, ristoranti, musica e club. Per qualcosa di piu tranquillo scegli un beach bar al tramonto.", linkText: "Esplora Grand Baie" },
      7: { description: "Central Market, Caudan Waterfront, Bagatelle e piccoli bazar offrono spezie, tessuti, artigianato, souvenir e marchi internazionali.", linkText: "Scopri lo shopping a Mauritius" },
      8: { description: "Blue Bay, Trou aux Biches, Flic-en-Flac e vari reef protetti permettono di vedere pesci tropicali, coralli, tartarughe e relitti secondo le condizioni.", linkText: "Esplora le immersioni" },
      9: { description: "Un catamarano verso Ile aux Cerfs combina laguna turchese, bagno, snorkeling e pranzo sull'acqua. Una delle gite in barca piu amate della costa est.", linkText: "Scopri le gite in barca" },
      10: { description: "Il giardino botanico di Pamplemousses ospita ninfee giganti, palme rare, viali ombrosi e tartarughe. Una sosta tranquilla per chi ama la natura.", linkText: "Scopri di piu su Pamplemousses" },
      11: { description: "Casela propone zipline, quad, safari, incontri con animali e attivita per famiglie nell'ovest dell'isola. Perfetto per una giornata attiva.", linkText: "Scopri i parchi avventura" },
      12: { description: "Mahebourg mostra una Mauritius autentica: waterfront, mercato, museo navale, storia di Grand Port e accesso facile alla laguna di Blue Bay.", linkText: "Esplora Mahebourg e Blue Bay" },
      13: { description: "Grand Baie unisce spiaggia, ristoranti, barche, negozi e vita notturna. E una base comoda per Pereybere, Mont Choisy e le isole del nord.", linkText: "Esplora le spiagge di Grand Baie" },
      14: { description: "Port Louis riunisce Central Market, Caudan Waterfront, musei, street food e vita urbana. Qui senti l'energia della capitale.", linkText: "Scopri Port Louis" },
      15: { description: "Chamarel concentra cascata, Terre colorate, strade di montagna, rum, cucina creola e panorami spettacolari. Una tappa essenziale del sud-ovest.", linkText: "Esplora Chamarel" },
    },
    faqTitle: "FAQ sulle cose da fare a Mauritius",
    faqs: [
      { question: "Quali sono le migliori cose da fare per una prima visita?", answer: "Inizia con una spiaggia calma, un road trip a nord o sud, Chamarel e Black River Gorges, il mercato di Port Louis, un catamarano e una pausa di cucina locale." },
      { question: "Quanti giorni servono per vedere i principali highlight?", answer: "Sette giorni bastano per spiagge, alcune attivita e uno o due road trip. Dieci-quattordici giorni lasciano piu spazio a trekking, isole, mercati e giornate lente sulla costa." },
      { question: "Devo prenotare le attivita in anticipo?", answer: "Prenota barche, delfini, trekking guidati e transfer privati durante vacanze e alta stagione. Tieni giorni flessibili per il meteo." },
    ],
    ctaTitle: "Pianifica le tue giornate di attivita a Mauritius",
    ctaText: "Scegli la prossima tappa: spiaggia, barca, panorami di Chamarel, avventure a Casela o giornate semplici in famiglia.",
    beachButton: "Esplora le spiagge di Mauritius",
    activityButton: "Vedi le attivita a Mauritius",
  },
  es: {
    heroSubtitle: "Vive la cultura local, visita las playas y prueba la comida de Mauricio",
    intro: "Mauricio es un paraiso tropical del oceano Indico, famoso por sus playas, lagunas claras y cultura rica. Chamarel, Casela Nature Parks e Ile aux Cerfs muestran por que la isla funciona para playa, aventura y planes familiares. Entre deportes acuaticos, senderismo, comida local e historia, cada viaje puede ser variado y memorable.",
    itemListDescription: "La guia esencial de las mejores experiencias y actividades en Mauricio",
    things: {
      1: { description: "Relajate en playas como Flic-en-Flac, Grand Baie, Blue Bay o Belle Mare. Arena clara, lagunas tranquilas, restaurantes frente al mar y deportes acuaticos hacen facil empezar.", linkText: "Descubrir nuestras playas" },
      2: { description: "Explora bosques tropicales, cascadas, montanas y miradores. Black River Gorges, las Siete Tierras de Colores y las rutas de interior muestran el lado salvaje.", linkText: "Descubrir los mejores lugares que visitar" },
      3: { description: "La cultura mauriciana mezcla influencias africanas, indias, chinas, europeas y criollas. Festivales, sega, templos, mercados y cocina local la hacen visible.", linkText: "Explorar festivales en Mauricio" },
      4: { description: "Snorkel, buceo, paddle, kitesurf, catamaran, pesca deportiva o banos en laguna: las aguas calidas ofrecen actividades para todos.", linkText: "Explorar actividades acuaticas" },
      5: { description: "Prueba dholl puri, vindaye, curris, frutas tropicales, marisco y snacks de mercado. La cocina de Mauricio es colorida, sencilla y llena de influencias.", linkText: "Descubrir comida local y mercados" },
      6: { description: "Grand Baie es el principal centro nocturno, con bares, restaurantes, musica y clubs. Para algo mas tranquilo, elige un bar de playa al atardecer.", linkText: "Explorar Grand Baie" },
      7: { description: "Central Market, Caudan Waterfront, Bagatelle y pequenos bazares ofrecen especias, textiles, artesania, recuerdos y marcas internacionales.", linkText: "Descubrir compras en Mauricio" },
      8: { description: "Blue Bay, Trou aux Biches, Flic-en-Flac y varios arrecifes protegidos permiten ver peces tropicales, corales, tortugas y pecios segun las condiciones.", linkText: "Explorar actividades de buceo" },
      9: { description: "Un catamaran a Ile aux Cerfs combina laguna turquesa, bano, snorkel y comida sobre el agua. Es una de las excursiones mas populares del este.", linkText: "Descubrir excursiones en barco" },
      10: { description: "El jardin botanico de Pamplemousses tiene nenufares gigantes, palmeras raras, avenidas sombreadas y tortugas. Una parada tranquila para amantes de la naturaleza.", linkText: "Saber mas sobre Pamplemousses" },
      11: { description: "Casela ofrece tirolina, quad, safari, encuentros con animales y actividades familiares en el oeste de la isla. Ideal para un dia activo.", linkText: "Descubrir parques de aventura" },
      12: { description: "Mahebourg muestra un Mauricio mas autentico: waterfront, mercado, museo naval, historia de Grand Port y acceso facil a la laguna de Blue Bay.", linkText: "Explorar Mahebourg y Blue Bay" },
      13: { description: "Grand Baie combina playa, restaurantes, barcos, tiendas y vida nocturna. Es una base practica para Pereybere, Mont Choisy y las islas del norte.", linkText: "Explorar las playas de Grand Baie" },
      14: { description: "Port Louis reune Central Market, Caudan Waterfront, museos, comida callejera y vida urbana. Es el lugar para sentir la energia de la capital.", linkText: "Descubrir Port Louis" },
      15: { description: "Chamarel concentra cascada, Tierras de Colores, carreteras de montana, ron, cocina criolla y vistas espectaculares. Imprescindible en el suroeste.", linkText: "Explorar Chamarel" },
    },
    faqTitle: "FAQ de cosas que hacer en Mauricio",
    faqs: [
      { question: "Cuales son las mejores cosas que hacer en una primera visita?", answer: "Empieza con una playa tranquila, una ruta por el norte o el sur, Chamarel y Black River Gorges, el mercado de Port Louis, un catamaran y una parada de comida local." },
      { question: "Cuantos dias necesito para ver los principales lugares?", answer: "Siete dias bastan para playas, algunas actividades y una o dos rutas. Diez a catorce dias dan mas tiempo para senderismo, islas, mercados y dias lentos de costa." },
      { question: "Tengo que reservar actividades con antelacion?", answer: "Reserva barcos, delfines, rutas guiadas y traslados privados en vacaciones y temporada alta. Deja dias flexibles para actividades dependientes del clima." },
    ],
    ctaTitle: "Planifica tus dias de actividades en Mauricio",
    ctaText: "Elige tu siguiente parada: playa, barco, miradores de Chamarel, aventuras en Casela o dias faciles en familia.",
    beachButton: "Explorar playas de Mauricio",
    activityButton: "Ver actividades en Mauricio",
  },
  ru: {
    heroSubtitle: "Познакомьтесь с местной культурой, пляжами и кухней Маврикия",
    intro: "Маврикий - тропический остров в Индийском океане с пляжами, прозрачными лагунами и богатой культурой. Chamarel, Casela Nature Parks и Ile aux Cerfs показывают, почему здесь легко сочетать пляж, приключения и семейные поездки. Водные развлечения, тропы, местная еда и история делают маршрут насыщенным.",
    itemListDescription: "Главный гид по лучшим впечатлениям и занятиям на Маврикии",
    things: {
      1: { description: "Отдохните на пляжах Flic-en-Flac, Grand Baie, Blue Bay или Belle Mare. Светлый песок, спокойные лагуны, рестораны у воды и водные активности подходят для первого знакомства.", linkText: "Посмотреть наши пляжи" },
      2: { description: "Исследуйте тропические леса, водопады, горы и смотровые площадки. Black River Gorges, Семицветные земли и дороги плато открывают более дикий Маврикий.", linkText: "Лучшие места для посещения" },
      3: { description: "Культура Маврикия соединяет африканские, индийские, китайские, европейские и креольские влияния. Фестивали, сега, храмы, рынки и кухня показывают это лучше всего.", linkText: "Фестивали на Маврикии" },
      4: { description: "Сноркелинг, дайвинг, SUP, кайтсерфинг, катамаран, рыбалка или купание в лагуне: теплые воды дают варианты для любого уровня.", linkText: "Водные активности" },
      5: { description: "Попробуйте dholl puri, vindaye, карри, тропические фрукты, морепродукты и рыночные закуски. Кухня Маврикия яркая, простая и многокультурная.", linkText: "Местная еда и рынки" },
      6: { description: "Grand Baie - главный центр вечерней жизни с барами, ресторанами, музыкой и клубами. Для спокойного вечера выбирайте пляжный бар на закате.", linkText: "Исследовать Grand Baie" },
      7: { description: "Central Market, Caudan Waterfront, Bagatelle и небольшие базары предлагают специи, текстиль, ремесла, сувениры и международные бренды.", linkText: "Шопинг на Маврикии" },
      8: { description: "Blue Bay, Trou aux Biches, Flic-en-Flac и защищенные рифы подходят для тропических рыб, кораллов, черепах и иногда затонувших объектов.", linkText: "Дайвинг и снорклинг" },
      9: { description: "Катамаран к Ile aux Cerfs сочетает бирюзовую лагуну, плавание, снорклинг и обед на воде. Это одна из самых популярных прогулок восточного побережья.", linkText: "Лодочные экскурсии" },
      10: { description: "Ботанический сад Pamplemousses известен гигантскими кувшинками, редкими пальмами, тенистыми аллеями и черепахами. Спокойная остановка для любителей природы.", linkText: "Подробнее о Pamplemousses" },
      11: { description: "Casela предлагает зиплайн, квадроциклы, сафари, встречи с животными и семейные развлечения на западе острова. Хорошо для активного дня.", linkText: "Парки приключений" },
      12: { description: "Mahebourg показывает более настоящий Маврикий: набережная, рынок, морской музей, история Grand Port и быстрый доступ к лагуне Blue Bay.", linkText: "Mahebourg и Blue Bay" },
      13: { description: "Grand Baie сочетает пляж, рестораны, лодки, магазины и ночную жизнь. Удобная база для Pereybere, Mont Choisy и северных островов.", linkText: "Пляжи Grand Baie" },
      14: { description: "Port Louis объединяет Central Market, Caudan Waterfront, музеи, уличную еду и городскую жизнь. Здесь чувствуется энергия столицы.", linkText: "Открыть Port Louis" },
      15: { description: "Chamarel - это водопад, Цветные земли, горные дороги, ром, креольская кухня и сильные виды. Обязательная точка юго-запада.", linkText: "Исследовать Chamarel" },
    },
    faqTitle: "FAQ: чем заняться на Маврикии",
    faqs: [
      { question: "Что лучше сделать в первую поездку на Маврикий?", answer: "Начните со спокойного пляжа, маршрута по северу или югу, Chamarel и Black River Gorges, рынка Port Louis, катамарана и остановки с местной едой." },
      { question: "Сколько дней нужно на главные места?", answer: "Семи дней хватит для пляжей, нескольких активностей и одной-двух поездок. Десять-четырнадцать дней дадут больше времени для троп, островов, рынков и спокойных дней у моря." },
      { question: "Нужно ли бронировать активности заранее?", answer: "В высокий сезон заранее бронируйте лодки, дельфинов, походы с гидом и частные трансферы. Оставляйте гибкие дни для погоды." },
    ],
    ctaTitle: "Спланируйте активные дни на Маврикии",
    ctaText: "Выберите следующую остановку: пляж, лодка, виды Chamarel, приключения Casela или легкие семейные дни.",
    beachButton: "Пляжи Маврикия",
    activityButton: "Активности на Маврикии",
  },
};

const TOP_15_TITLE_TRANSLATIONS: Record<SupportedTop15Locale, Record<number, string>> = {
  fr: {
    1: "Se detendre a la plage",
    2: "Explorer la beaute naturelle",
    3: "Decouvrir la culture",
    4: "Activites nautiques",
    5: "Cuisine locale",
    6: "Vie nocturne a Grand Baie",
    7: "Shopping a Port Louis et Bagatelle",
    8: "Faire du snorkeling ou de la plongee",
    9: "Sortie en catamaran a l'ile aux Cerfs",
    10: "Visiter le jardin de Pamplemousses",
    11: "Visiter Casela Park",
    12: "Visiter le village de Mahebourg",
    13: "Visiter le village de Grand Baie",
    14: "Visiter Port Louis",
    15: "Explorer Chamarel",
  },
  de: {
    1: "Am Strand entspannen",
    2: "Die Natur erkunden",
    3: "Kultur erleben",
    4: "Wasseraktivitaten",
    5: "Lokales Essen",
    6: "Nachtleben in Grand Baie",
    7: "Einkaufen in Port Louis und Bagatelle",
    8: "Schnorcheln oder tauchen",
    9: "Katamarantour zur Ile aux Cerfs",
    10: "Pamplemousses Garden besuchen",
    11: "Casela Park besuchen",
    12: "Mahebourg Village besuchen",
    13: "Grand Baie Village besuchen",
    14: "Port Louis besuchen",
    15: "Chamarel erkunden",
  },
  it: {
    1: "Rilassarsi in spiaggia",
    2: "Esplorare la natura",
    3: "Vivere la cultura",
    4: "Attivita acquatiche",
    5: "Cibo locale",
    6: "Vita notturna a Grand Baie",
    7: "Acquisti a Port Louis e Bagatelle",
    8: "Fare snorkeling o immersioni",
    9: "Catamarano a Ile aux Cerfs",
    10: "Visitare il giardino di Pamplemousses",
    11: "Visitare Casela Park",
    12: "Visitare il villaggio di Mahebourg",
    13: "Visitare il villaggio di Grand Baie",
    14: "Visitare Port Louis",
    15: "Esplorare Chamarel",
  },
  es: {
    1: "Relajarse en la playa",
    2: "Explorar la naturaleza",
    3: "Vivir la cultura",
    4: "Actividades acuaticas",
    5: "Comida local",
    6: "Vida nocturna en Grand Baie",
    7: "Compras en Port Louis y Bagatelle",
    8: "Hacer snorkel o buceo",
    9: "Catamaran a Ile aux Cerfs",
    10: "Visitar el jardin de Pamplemousses",
    11: "Visitar Casela Park",
    12: "Visitar el pueblo de Mahebourg",
    13: "Visitar el pueblo de Grand Baie",
    14: "Visitar Port Louis",
    15: "Explorar Chamarel",
  },
  ru: {
    1: "Отдохнуть на пляже",
    2: "Исследовать природу",
    3: "Познакомиться с культурой",
    4: "Водные активности",
    5: "Местная еда",
    6: "Ночная жизнь в Grand Baie",
    7: "Шопинг в Port Louis и Bagatelle",
    8: "Сноркелинг или дайвинг",
    9: "Катамаран к Ile aux Cerfs",
    10: "Посетить сад Pamplemousses",
    11: "Посетить Casela Park",
    12: "Посетить деревню Mahebourg",
    13: "Посетить деревню Grand Baie",
    14: "Посетить Port Louis",
    15: "Исследовать Chamarel",
  },
};

function getTop15Copy(locale: string) {
  const activeLocale = normalizeLocale(locale);
  return TOP_15_PAGE_COPY[activeLocale as SupportedTop15Locale];
}

export default async function Top15ThingsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const activeLocale = normalizeLocale(locale);
  const pageCopy = getTop15Copy(activeLocale);
  const translate = (text: string) => staticPageText(activeLocale, text);
  const titleTranslations = TOP_15_TITLE_TRANSLATIONS[activeLocale as SupportedTop15Locale];
  const things = TOP_15_THINGS.map((item) => ({
    ...item,
    title: titleTranslations?.[item.number] ?? translate(item.title),
    description: pageCopy?.things[item.number]?.description ?? item.description,
    linkText: pageCopy?.things[item.number]?.linkText ?? translate(item.linkText),
  }));
  const faqs = pageCopy?.faqs ?? TOP_15_FAQS.map((item) => ({
    question: translate(item.question),
    answer: translate(item.answer),
  }));

  return localizeStaticPage((
    <main id="main-content" className="min-h-screen bg-white">
      <ItemListJsonLd
        name={translate("Top 15 Things to Do in Mauritius")}
        description={pageCopy?.itemListDescription ?? "The ultimate guide to the best experiences and activities in Mauritius"}
        items={things.map((item) => ({
          position: item.number,
          name: item.title,
          url: `${SITE_URL}${item.link}`,
          description: item.description,
          image: getImageUrl(item.image, { width: 800, quality: 75 }),
        }))}
      />
      <FAQJsonLd items={faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: translate("Home"), url: SITE_URL },
          { name: translate("Top 15 Things to Do"), url: `${SITE_URL}/top-15-things-to-do-in-mauritius` },
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
              {translate("Top 15 Things to Do in Mauritius")}
            </h1>
            <p className="text-white/90 text-base md:text-lg max-w-2xl mx-auto">
              {pageCopy?.heroSubtitle ?? "Embrace the local culture, visit our beaches, and eat our food"}
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-base md:text-lg text-gray-700 leading-relaxed text-center">
            {pageCopy?.intro ?? "Mauritius is a tropical paradise located in the Indian Ocean, celebrated for its stunning beaches, crystal-clear waters, and rich cultural heritage. Flagship stops such as Chamarel, Casela Nature Parks and Ile aux Cerfs show why the island works for beach days, adventure trips and family-friendly exploring. Whether you're seeking relaxation on the sun-kissed shores, adventurous exploration of the island's lush landscapes, or an immersion into its vibrant culture, Mauritius has something to offer for every traveler. From water sports and nature hikes to local cuisine and historical sites, visitors can enjoy a diverse array of activities and experiences that make each trip to Mauritius truly unforgettable."}
          </p>
        </div>
      </section>

      {/* Top 15 List */}
      <section className="pb-16 md:pb-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="space-y-16 md:space-y-24">
            {things.map((item, index) => (
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
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            {pageCopy?.faqTitle ?? translate("Things to Do in Mauritius FAQ")}
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {faqs.map((item) => (
              <article
                key={item.question}
                className="rounded-lg border border-gray-200 bg-white p-5"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.question}
                </h3>
                <p className="mt-3 text-sm leading-6 text-gray-700">
                  {item.answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-orange-500 to-orange-600">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {pageCopy?.ctaTitle ?? "Plan Your Mauritius Activity Days"}
          </h2>
          <p className="text-white/90 text-lg mb-8">
            {pageCopy?.ctaText ?? "Choose your next island stop, from beach time and boat trips to Chamarel viewpoints, Casela adventures and easy family-friendly days."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PlanTripButton
              href="/beaches-in-mauritius"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-orange-500 font-semibold rounded-xl hover:bg-gray-100 transition-colors disabled:opacity-90 disabled:cursor-wait"
            >
              {pageCopy?.beachButton ?? "Explore Mauritius beaches"}
            </PlanTripButton>
            <PlanTripButton
              href="/mauritius-activities"
              className="inline-flex items-center justify-center px-8 py-4 bg-orange-700 text-white font-semibold rounded-xl hover:bg-orange-800 transition-colors disabled:opacity-90 disabled:cursor-wait"
            >
              {pageCopy?.activityButton ?? "Browse Mauritius activities"}
            </PlanTripButton>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  ), activeLocale);
}
