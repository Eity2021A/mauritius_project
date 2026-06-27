/**
 * Beach data - Single source of truth
 * Following Clean Code principle: Don't Repeat Yourself (DRY)
 * Regions use shared Region type from @/types/content.
 */

import { Region, Coordinates, BeachCategory } from "@/types/content";

export interface TopBeach {
  number: number;
  name: string;
  slug: string;
  position: [number, number];
  region: Region;
  description: string;
}

/**
 * Top 6 beaches featured on the map and "Where to Go" section
 * Used by: MauritiusMap, BeachesInMauritiusPage
 */
export const TOP_BEACHES: TopBeach[] = [
  {
    number: 1,
    name: "Flic-en-Flac",
    slug: "flic-en-flac",
    position: [-20.2824, 57.3625],
    region: "West",
    description:
      "Known for its long stretches of white sandy beaches and clear blue waters, this is a popular spot for swimming and sunbathing.",
  },
  {
    number: 2,
    name: "Grand Baie",
    slug: "grand-baie",
    position: [-20.0102, 57.5831],
    region: "North",
    description:
      "This beach is located in the northern part of the island and is known for its lively atmosphere and excellent restaurants and bars.",
  },
  {
    number: 3,
    name: "Belle Mare",
    slug: "belle-mare",
    position: [-20.1836, 57.7644],
    region: "East",
    description:
      "This beach is located on the eastern coast and is known for its crystal-clear waters and excellent snorkeling and diving opportunities.",
  },
  {
    number: 4,
    name: "Le Morne",
    slug: "le-morne",
    position: [-20.452424, 57.312697],
    region: "South",
    description:
      "This beach is located on the southern coast and is known for its dramatic scenery and excellent windsurfing and kitesurfing conditions.",
  },
  {
    number: 5,
    name: "Ile aux Cerfs",
    slug: "ile-aux-cerfs",
    position: [-20.27222, 57.80417], // Île aux Cerfs (Wikipedia)
    region: "East",
    description:
      "This is an island off the east coast of Mauritius, with a beautiful lagoon and a great spot for swimming and snorkeling.",
  },
  {
    number: 6,
    name: "Trou aux Biches",
    slug: "trou-aux-biches",
    position: [-20.0345, 57.5446],
    region: "North",
    description:
      "This beach is one of the most popular beaches in Mauritius, known for its crystal-clear waters and pristine white sand.",
  },
];

export interface Beach {
  name: string;
  slug: string;
  image: string;
  description: string;
  region: Region;
}

/**
 * All beaches organized by region. Uses shared Region type; only regions with beaches are present.
 * To add a new region, simply add a new key with its beach array — the UI derives filters automatically.
 */
export const BEACHES_BY_REGION: Partial<Record<Region, Beach[]>> = {
  North: [
    {
      name: "Trou aux Biches",
      slug: "trou-aux-biches",
      image: "trou-aux-biches-public-beach.jpg",
      description: "Paradise with white sand, crystal clear azure water and coconut trees. Perfect for swimming, scuba diving and windsurfing.",
      region: "North",
    },
    {
      name: "Mont Choisy",
      slug: "mont-choisy",
      image: "choisy-beach-bird-eye-view.jpg",
      description: "One of Mauritius' best beaches with beautiful turquoise water and shady Casuarina trees. Popular with locals on weekends.",
      region: "North",
    },
    {
      name: "Grand Baie",
      slug: "grand-baie",
      image: "grand-baie-public-beach-in-mauritius.jpeg",
      description: "Known for its lively atmosphere with excellent restaurants, bars, and shopping. The heart of Mauritius' nightlife.",
      region: "North",
    },
    {
      name: "La Cuvette",
      slug: "la-cuvette",
      image: "la-cuvette-beach-in-grand-baie-mauritius.jpg",
      description: "A small but stunning beach with turquoise lagoon and soft golden sand. Perfect escape from the Grand Baie crowds.",
      region: "North",
    },
    {
      name: "Pereybere",
      slug: "pereybere",
      image: "pereybere-public-beach.jpg",
      description: "Family-friendly beach with pristine shores and bright blue waters. Great for swimming, snorkeling, and local food.",
      region: "North",
    },
    {
      name: "Cap Malheureux",
      slug: "cap-malheureux",
      image: "cap-malheureux-beach-in-mauritius-island.jpg",
      description: "Famous for its iconic red-roofed church with breathtaking views. A postcard-perfect wedding destination.",
      region: "North",
    },
    {
      name: "Bain Boeuf",
      slug: "bain-boeuf",
      image: "bain-boeuf-beach-in-mauritius.jpg",
      description: "Located near Turtle Bay with lush greenery and crystal clear water. Home to some of Mauritius' best luxury resorts.",
      region: "North",
    },
    {
      name: "Grand Gaube",
      slug: "grand-gaube",
      image: "grand-gaube-beach-in-mauritius-1.jpg",
      description: "A quiet fishing village with authentic Mauritian charm. Well-maintained grass patches and peaceful atmosphere.",
      region: "North",
    },
    {
      name: "Butte à L'Herbe",
      slug: "butte-a-lherbe",
      image: "butte-a-lherbe-beach-in-mauritius.jpeg",
      description: "A small island connected to the mainland by bridges. Features a pine forest and serene picnic areas.",
      region: "North",
    },
    {
      name: "Balaclava",
      slug: "balaclava",
      image: "balaclava-beach-in-the-north-of-mauritius.jpg",
      description: "Golden sands with mesmerizing coral reef. Perfect for swimming, snorkeling, and kayaking. Rich in history.",
      region: "North",
    },
    {
      name: "Pointe aux Piments",
      slug: "pointe-aux-piments",
      image: "pointe-aux-piments-beach.jpg",
      description: "Picture-perfect setting with coral reef close to the coast. Ideal for diving, snorkeling, and submarine tours.",
      region: "North",
    },
  ],
  South: [
    {
      name: "Le Morne",
      slug: "le-morne",
      image: "beach-of-le-morne-in-the-morning.jpg",
      description: "Gorgeous beach with white-bone sand beneath the UNESCO World Heritage Le Morne Brabant Mountain. Kitesurfing paradise.",
      region: "South",
    },
    {
      name: "Bel Ombre",
      slug: "bel-ombre",
      image: "bel-ombre-beach.jpg",
      description: "6km of golden sand with crystal clear water. A flawless mix of luxury and adventure. Popular kitesurfing spot.",
      region: "South",
    },
    {
      name: "La Prairie",
      slug: "la-prairie",
      image: "la-prairie-public-beach.jpg",
      description: "Vast stretch of grass and beach with incredible Le Morne Brabant backdrop. Perfect for peaceful picnics.",
      region: "South",
    },
    {
      name: "Riambel",
      slug: "riambel",
      image: "riambel-beach-in-the-south.jpeg",
      description: "Rugged, wild and untouched coastline. 2.5km of pristine beach fringed by palm trees. Instagram-worthy beauty.",
      region: "South",
    },
    {
      name: "St Felix",
      slug: "st-felix",
      image: "st-felix-beach-in-the-south.jpg",
      description: "Remarkable beauty with magnificent hues of blue water and green lush coastline. One of the most remote beaches.",
      region: "South",
    },
    {
      name: "Pomponette",
      slug: "pomponette",
      image: "pomponette-beach-in-the-south.jpg",
      description: "Wild south coast beach with postcard-worthy stretch of sand. Adored by locals during weekends.",
      region: "South",
    },
    {
      name: "Gris Gris",
      slug: "gris-gris",
      image: "gris-gris-beach-in-mauritius.jpeg",
      description: "Dramatic cliffs with tremendous waves. Home to 'La Roche Qui Pleure'. Swimming not recommended but stunning views.",
      region: "South",
    },
    {
      name: "Souillac",
      slug: "souillac",
      image: "souillac-beach-in-the-south.jpeg",
      description: "Wild southern coast beauty with lush vegetation. Visit the Telfair Garden and Robert Edward Hart Museum.",
      region: "South",
    },
    {
      name: "Baie de Jacotet",
      slug: "baie-de-jacotet",
      image: "baie-de-jacotet-in-the-south.jpg",
      description: "Historic naval site near Sanchot Islet. Popular with surfers in winter. Legend says pirates hid treasure here.",
      region: "South",
    },
    {
      name: "Rivière des Galets",
      slug: "riviere-des-galets",
      image: "riviere-des-galet-public-beach.jpg",
      description: "Unique beach covered with smooth pebbles. Listen to the soothing sound of waves on stones. Perfect for meditation.",
      region: "South",
    },
    {
      name: "La Cambuse",
      slug: "la-cambuse",
      image: "la-cambuse-beach-in-the-south.jpg",
      description: "Golden sand beach just minutes from the airport. Great for a first dip with vast grass patches for camping.",
      region: "South",
    },
    {
      name: "Pointe d'Esny",
      slug: "pointe-desny",
      image: "pointe-desny-allee.jpg",
      description: "Hidden pearl with magical sunset moments. Less crowded alternative to Blue Bay. Amazing snorkeling spots.",
      region: "South",
    },
    {
      name: "Blue Bay",
      slug: "blue-bay",
      image: "blaue-bay-national-marine-park.jpg",
      description: "Marine park with crystal-clear waters. One of the best snorkeling spots in Mauritius with glass-bottom boat tours.",
      region: "South",
    },
  ],
  East: [
    {
      name: "Belle Mare",
      slug: "belle-mare",
      image: "bel-mare-plage.jpg",
      description: "White-bone sand with sacred lagoon rich in marine species. Diving, snorkeling, and two championship golf courses.",
      region: "East",
    },
    {
      name: "Ile aux Cerfs",
      slug: "ile-aux-cerfs",
      image: "golf-beach-ile-aux-cerfs.jpg",
      description: "Pearl of Mauritius - 87 hectares of paradise. Turquoise lagoon, water sports, and private peaceful corners.",
      region: "East",
    },
    {
      name: "Trou d'Eau Douce",
      slug: "trou-deau-douce",
      image: "trou-deau-douce-beach.jpg",
      description: "Charming bay where river meets ocean. Authentic old Mauritius beach scene. Gateway to Ile aux Cerfs.",
      region: "East",
    },
    {
      name: "Palmar Beach",
      slug: "palmar-beach",
      image: "palmar-beach.jpg",
      description: "Small and tranquil beach perfect for those seeking solitude. Great snorkeling spots around the rocks.",
      region: "East",
    },
    {
      name: "Bras d'Eau",
      slug: "bras-deau",
      image: "bras-deau-public-beach-on-the-east-coast.jpg",
      description: "Stunning stretch for family picnics with clear water and sandy beach. Gateway to Bras d'Eau National Park.",
      region: "East",
    },
    {
      name: "Roche Noire",
      slug: "roche-noire",
      image: "roche-noire-public-beach.jpg",
      description: "Named after black volcanic rocks. Features ancient lava tunnels. Perfect for privacy and untouched surroundings.",
      region: "East",
    },
    {
      name: "Deux Cocos",
      slug: "deux-cocos",
      image: "deux-cocos-island.jpg",
      description: "Private island paradise accessible by boat. Crystal clear waters perfect for snorkeling and swimming.",
      region: "East",
    },
    {
      name: "Ilot Gabriel",
      slug: "ilot-gabriel",
      image: "ilot-gabriel-beach-in-mauritius.jpg",
      description: "Uninhabited island nature reserve. Pristine beaches and excellent snorkeling. Popular catamaran day trip.",
      region: "East",
    },
  ],
  West: [
    {
      name: "Flic en Flac",
      slug: "flic-en-flac",
      image: "flic-en-flac-beach-villa-caroline.jpg",
      description: "8km of white sand with vibrant underwater world. Famous for scuba diving, snorkeling, and delicious street food.",
      region: "West",
    },
    {
      name: "Wolmar",
      slug: "wolmar",
      image: "flic-en-flac-beach-in-mauritius-la-pirogue.jpg",
      description: "Upscale stretch of Flic en Flac with luxury resorts. Beautiful sunsets and calm lagoon waters.",
      region: "West",
    },
    {
      name: "Tamarin",
      slug: "tamarin",
      image: "tamarin-bay-morning.jpg",
      description: "Surfer's paradise with unique brown sand. Cool groovy vibes and famous for dolphin watching at sunrise.",
      region: "West",
    },
    {
      name: "La Preneuse",
      slug: "la-preneuse",
      image: "la-preneuse-beach.jpg",
      description: "Tranquil beach for escaping crowds. Hub for fishing, dolphin watching, and boat trips to Ile aux Benitiers.",
      region: "West",
    },
    {
      name: "Ile aux Benitiers",
      slug: "ile-aux-benitiers",
      image: "ile-aux-benitiers-beach.jpg",
      description: "Idyllic island with pristine beaches and crystal waters. Perfect day trip with dolphin swimming.",
      region: "West",
    },
    {
      name: "Albion",
      slug: "albion",
      image: "albion-beach-morning.jpg",
      description: "Peaceful beach perfect for quiet observation. Features caves, lighthouse, and public barbecue areas.",
      region: "West",
    },
  ],
};

/** Flat array of every beach (each carries its own region). */
export const ALL_BEACHES: Beach[] = Object.values(BEACHES_BY_REGION).flatMap(
  (arr) => arr ?? []
);

/** Regions that have beaches — derived from data, not a separate list. */
export const REGIONS: { id: Region; label: string }[] = [
  ...new Set(ALL_BEACHES.map((b) => b.region)),
].map((id) => ({ id, label: id }));

export interface BeachDetails {
  slug: string;
  name: string;
  number: number;
  region: Region;
  coordinates: Coordinates;
  categories: BeachCategory[];
  tagline: string;
  description: string[];
  tips: string[];
  images: string[];
  heroImage?: string;
  info: {
    location: string;
    publicTransport: boolean;
    hotelsNearby: string[];
  };
}

export const BEACH_DETAILS: Record<string, BeachDetails> = {
  // ============ NORTH REGION ============
  "trou-aux-biches": {
    slug: "trou-aux-biches",
    name: "Trou aux Biches",
    number: 6,
    region: "North",
    coordinates: [-20.0345, 57.5446],
    categories: ["snorkeling"],
    tagline: "Mauritius is home to some of the best beaches in the region. Located in the North of Mauritius, Trou aux Biches is simply, paradise.",
    description: [
      "The white sand, crystal clear azure water and stretch of coconut trees make it a photographer's paradise for postcard-like sceneries. Whether you choose to work on your tan or get sporty, Trou aux Biches is perfect.",
      "With a wide range of water sport activities such as scuba diving and windsurfing, you are sure to satisfy the thrill-seeker in you. However if you choose to simply read a good book on a sunbed and take a dip in the beautiful blue waters, Trou aux Biches welcomes you to do so.",
      "In short, Trou aux Biches is heaven on earth. You'll know why we say so after you've been there."
    ],
    tips: [
      "Spend the entire day at Trou aux Biches. There are plenty of restaurants, ice cream merchants to fill your stomach when you get hungry.",
      "Enjoy some of the water sports Trou aux Biches has to offer – Pedalo, Windsurfing, Catamaran, Parasailing, Scuba Diving, Deep sea fishing, Jet Skiing.",
      "Don't forget that tanning lotion, it's a necessity wherever you go!",
      "Best time to visit is at magic hour; sunrise or sunset."
    ],
    images: [
      "trou-aux-biches-public-beach.jpg",
      "trou-aux-biches-beach-in-mauritius.jpg",
      "sunset-at-trou-aux-biches.jpg",
      "trou-aux-biches-beach-in-the-afternoon.jpg",
      "view-on-trou-aux-biches-beach-in-mauritius.jpg",
      "trou-aux-biches-beach-access.jpg"
    ],
    info: {
      location: "North",
      publicTransport: false,
      hotelsNearby: ["Trou aux Biches Beachcomber Golf Resort & Spa", "Le Cardinal Exclusive Resort", "Casuarina Resort & Spa", "Coral Azur Beach Resort"]
    }
  },
  "mont-choisy": {
    slug: "mont-choisy",
    name: "Mont Choisy",
    number: 7,
    region: "North",
    coordinates: [-20.0206, 57.5556],
    categories: ["snorkeling", "family-friendly"],
    tagline: "Mont Choisy is one of Mauritius best beaches and you should totally consider it when figuring out what to do in Mauritius.",
    description: [
      "If you fancy some interaction with locals, we recommend you to visit Mont Choisy beach during the weekend when Mauritians spend time among friends and relatives. It can get pretty amazing and exciting for visitors as the day often ends with typical Mauritian Sega music accompanied by other instruments.",
      "It's a remarkable occasion to connect with the island's multi-culturalism and glaze at how magical this pot-pourri is. The beach also features a football field where locals spend time on evenings and weekends.",
      "Beautiful turquoise water and shady areas (thanks to the Casuarina trees) are what we can assure you at Mont Choisy."
    ],
    tips: [
      "Join locals playing some football; believe us they are more than happy when foreigners want to join along for a game!",
      "Give a go to some of the water activities available there; satisfy your adrenaline rush!",
      "Few aquatic activities on the beach, have some fun",
      "Come early and beat the crowd of the weekends (summer is like St Tropez, not joking)"
    ],
    images: [
      "mont-choisy-public-beach.jpg",
      "choisy-beach-in-mauritius.jpg",
      "choisy-beach-bird-eye-view.jpg",
      "choisy-beach.jpg",
      "choisy.jpeg"
    ],
    info: {
      location: "North",
      publicTransport: true,
      hotelsNearby: ["Mystik Lifestyle Boutique Hotel", "Canonnier Beachcomber", "Club Med Pointe aux Canonniers", "Seapoint Boutique Hotel"]
    }
  },
  "grand-gaube": {
    slug: "grand-gaube",
    name: "Grand Gaube",
    number: 14,
    region: "North",
    coordinates: [-20.0042, 57.6625],
    categories: ["snorkeling", "secluded"],
    tagline: "Grand Gaube public beach is one of the most popular beaches among visitors; as well as locals (especially on weekends).",
    description: [
      "Grand Gaube is actually a small village located at the tip of the northeast coast of the island. At first sight, the village seems to have been forgotten by the train of development. But it is nevertheless picturesque and sympathetic by its authenticity and simplicity of its inhabitants, mostly fishermen, hotel employees or factories of the region.",
      "It is in this village with creole accents that the east coast of the country begins, the longest coast of the island, where the sand often gives way to small dark rocks and where the shallow water is quite agitated.",
      "The area proposes a few options for restaurants and local snacks but remain quiet most of the week days. Nevertheless, what is striking is that Grand Gaube has been nicely saved from tourist development, it has been able to maintain its authentic traits and simple local lifestyle.",
      "It is indeed a good place to reside in if you want to get a real taste of Mauritian's local fishermen lifestyle and everyday happenings."
    ],
    tips: [
      "It's a great fishing spot for beginners. You could catch your dinner there! P.s you won't catch a marlin though!"
    ],
    images: [
      "grand-gaube-beach-in-mauritius-1.jpg",
      "grand-gaube-public-beach.jpg",
      "grand-gaube-beach.jpg"
    ],
    info: {
      location: "North",
      publicTransport: false,
      hotelsNearby: ["LUX Grand Gaube"]
    }
  },
  "cap-malheureux": {
    slug: "cap-malheureux",
    name: "Cap Malheureux",
    number: 12,
    region: "North",
    coordinates: [-19.986529, 57.62228],
    categories: [],
    tagline: "Cap Malheureux owes its name to all the shipwrecks that took place on its shores. It was also here that the English, in 1810, landed to take possession of the island.",
    description: [
      "But now it's known for its red-roofed church! Postcard decor, breathtaking views of the Gunner's Corner and the North Islands.",
      "Hosting many weddings throughout the year, or couples just coming for a photo shoot to immortalize their union, this place is well appreciated.",
      "The small beach in front is home to street vendors to buy fruit, local produce and pareos, or fishermen."
    ],
    tips: [
      "Don't forget your camera!",
      "Visit the iconic Red Church"
    ],
    images: [
      "cap-malheureux-beach-in-mauritius-island.jpg",
      "cap-malheureux-beach-in-mauritius.jpg",
      "view-at-cap-malheureux.jpg",
      "cap-malheureux-in-the-north.jpeg"
    ],
    info: {
      location: "North",
      publicTransport: true,
      hotelsNearby: []
    }
  },
  "bain-boeuf": {
    slug: "bain-boeuf",
    name: "Bain Boeuf",
    number: 11,
    region: "North",
    coordinates: [-19.9857, 57.6069],
    categories: ["snorkeling", "amenities"],
    tagline: "On the west coast of Mauritius is a small paradise near Turtle Bay, named by 17th century sailors because of the abundance of turtles in the area.",
    description: [
      "The lush greenery, white sand beaches and crystal clear water is the reason why many luxury resorts (some of Mauritius best hotels) chose this area as their preferred location.",
      "If you are planning a weekend getaway with your loved ones, Bain Boeuf should be right on top of your list. On a sunny day, you'll know why Mauritius is known as the paradise island.",
      "This bay is one of the most fascinating places for divers and snorkelers in Mauritius. The fine white sand and the clean picnic areas round off the picture of a tropical idyll.",
      "Despite its beauty, the area is peaceful and unspoilt away from every hustle and bustle – ideal for those who want to relax and enjoy the beautiful nature."
    ],
    tips: [
      "Get your adventure suits on and go snorkeling to witness the life of larger-than-life sea turtles.",
      "Wake up in time for the sunrise and you won't regret a second of it.",
      "Also visit the marine Park at Balaclava"
    ],
    images: [
      "bain-boeuf-beach-in-mauritius.jpg",
      "bain-boeuf-sunset.jpg",
      "bain-boeuf-beach.jpg",
      "bain-boeufs-beach-in-the-north.jpg",
      "bain-boeufs-in-the-north.jpg"
    ],
    info: {
      location: "North",
      publicTransport: true,
      hotelsNearby: ["Coin de Mire Attitude Hotel"]
    }
  },
  "la-cuvette": {
    slug: "la-cuvette",
    name: "La Cuvette",
    number: 9,
    region: "North",
    coordinates: [-20.0, 57.5833],
    categories: ["snorkeling", "family-friendly"],
    tagline: "No other beach does it like La Cuvette! This place definitely holds an award for one of Mauritius best beaches.",
    description: [
      "If you favor tranquility and serenity when at the beach, then La Cuvette is definitely a winner! It is a small beach of a few meters but with a big name and high ranking among Mauritius best beaches.",
      "La Cuvette is the perfect photogenic beach with turquoise lagoon (manageable and enjoyable depth) along with soft golden sand expanding through a mere 80 meters.",
      "High seasons attract local hawkers and food trucks within the parking area but another option is to head over to Grand Baie after your swim so you can fill in your stomach to explore more of Mauritius!",
      "Throughout the recent years, La Cuvette has gained much popularity among visitors and guests from nearby hotels as well."
    ],
    tips: [
      "It is a good option to consider after a long shopping day in Grand Baie as well",
      "Never leave your hotel room without your swimming attires when in the North!",
      "Do not hesitate to publish that postcard-perfect picture on your social media feed, guaranteed jealousy and envy among your group of friends!"
    ],
    images: [
      "la-cuvette-beach-in-grand-baie-mauritius.jpg",
      "la-cuvette-beach-in-mauritius.jpg"
    ],
    info: {
      location: "North",
      publicTransport: true,
      hotelsNearby: ["Le Royal Palm Beachcomber", "Veranda Grand Baie", "Le Mauricia"]
    }
  },
  "grand-baie": {
    slug: "grand-baie",
    name: "Grand Baie",
    number: 2,
    region: "North",
    coordinates: [-20.0102, 57.5831],
    categories: ["snorkeling", "amenities"],
    tagline: "Grand Baie is the tourism hub of the north, known for its lively atmosphere, shopping, and excellent restaurants and bars.",
    description: [
      "Grand Baie is more than just a beach – it's the heart of Mauritius' nightlife and tourism in the north. The bay itself offers calm waters perfect for swimming and water sports.",
      "The area is surrounded by shops, restaurants, and bars making it the perfect destination for those who want to combine beach time with entertainment.",
      "While the public beach can get crowded during weekends, the atmosphere is always vibrant and welcoming."
    ],
    tips: [
      "Explore the many shops and boutiques in the area",
      "Try the local restaurants for authentic Mauritian cuisine",
      "Book a sunset cruise from the bay",
      "Visit during weekdays for a quieter experience"
    ],
    images: [
      "grand-baie-public-beach-in-mauritius.jpeg",
      "grand-baie-mauritius.jpg"
    ],
    info: {
      location: "North",
      publicTransport: true,
      hotelsNearby: ["20 Degrees Sud", "Royal Palm Beachcomber", "Veranda Grand Baie"]
    }
  },
  "pereybere": {
    slug: "pereybere",
    name: "Pereybere",
    number: 10,
    region: "North",
    coordinates: [-19.99397, 57.59127],
    categories: ["snorkeling", "amenities", "family-friendly"],
    tagline: "Can't decide whether you want family-friendly or white sand beaches with various food options? Well, you don't have to at Pereybere.",
    description: [
      "The pristine shore's beauty is only matched by the bright blue waters, which are prime for swimming and snorkeling, icing-sugar sand and of course a set of open-air food joints… voila! Job done! Paradise found!",
      "Indeed, if asked to design and illustrate your perception of a perfect beach, Pereybere is probably what you would come up with.",
      "Due to its remarkable convenience and beauty – it is also ideal for kids and inexperienced swimmers – the beach gets quite crowded during weekends. However, if you totally do not mind that, the place is worth a visit while you explore Mauritius."
    ],
    tips: [
      "It's a good place to taste out some exotic and tropical fruits that Mauritius has to offer.",
      "Try out local homemade ice-cream too. We scream for ice-cream, don't you?"
    ],
    images: [
      "pereybere-public-beach.jpg"
    ],
    info: {
      location: "North",
      publicTransport: true,
      hotelsNearby: ["Ocean Beauty", "Le Palmiste Resort & Spa"]
    }
  },
  "balaclava": {
    slug: "balaclava",
    name: "Balaclava",
    number: 4,
    region: "North",
    coordinates: [-20.0567, 57.5111],
    categories: ["snorkeling"],
    tagline: "Sitting on golden sands, you might want to find refuge at one of the finest hotels located at Balaclava.",
    description: [
      "Think waves lapping against golden sand, along with a mesmerizing coral barrier reef making it the go-to spot for swimming, snorkeling and kayaking. This is where all your beachy needs are met, starting from a morning jog in the sand to sourcing the perfect hammock spot.",
      "Should the crowd bother you (during peak seasons or weekends), you can always walk back up to your hotel's pool area. Indeed, a great way to enjoy a beach holiday.",
      "Likewise, Balaclava is rich in history and plays a big role in Mauritius' historical heritage. Once in the area, you will be able to spot a few preserved ruins such as old mills and a distillery."
    ],
    tips: [
      "Snorkeling gear! Essential!",
      "On the way to Balaclava, stop by Triolet to stock up on some food and beverages as Balaclava does not have much of an option."
    ],
    images: [
      "balaclava-beach-in-the-north-of-mauritius.jpg",
      "balaclava-snorkling-spot.jpg",
      "balaclava-beach.jpeg",
      "balaclava.jpg"
    ],
    info: {
      location: "North",
      publicTransport: false,
      hotelsNearby: ["The Westin Turtle Bay Resort & Spa", "Maritim Resort & Spa Mauritius", "The Oberoi Beach Resort"]
    }
  },
  "butte-a-lherbe": {
    slug: "butte-a-lherbe",
    name: "Butte à L'Herbe",
    number: 13,
    region: "North",
    coordinates: [-20.0333, 57.6333],
    categories: ["secluded"],
    tagline: "Butte à L'Herbe is nearby Pointe aux Roches and Calodyne. The area is an island, connected to the mainland by a couple of small bridges.",
    description: [
      "Butte à l'Herbe has a small pine forest in the center of the island, it is an ideal place to enjoy the serenity of the surroundings, the picnic areas and the great views of the Indian Ocean.",
      "This small island offers a unique experience – a peaceful retreat connected to the mainland where you can enjoy nature in its purest form."
    ],
    tips: [
      "Most visitors don't come here to swim, but instead enjoy the serenity of the place",
      "Perfect for a peaceful picnic away from the crowds"
    ],
    images: [
      "butte-a-lherbe-beach-in-mauritius.jpeg",
      "butte-a-lherbe-beach.jpg"
    ],
    info: {
      location: "North",
      publicTransport: false,
      hotelsNearby: []
    }
  },
  "pointe-aux-piments": {
    slug: "pointe-aux-piments",
    name: "Pointe aux Piments",
    number: 5,
    region: "North",
    coordinates: [-20.0583, 57.5167],
    categories: ["snorkeling"],
    tagline: "Simply put, if you are not a fan of Pointe aux Piments, you probably do not like beaches in general because Pointe aux Piments has the picture-perfect setting.",
    description: [
      "With beautiful coral reef surrounded by a colossal mountain range, Pointe aux Piments is home to some of the best hotels in Mauritius.",
      "At the northern tip of Pointe aux Piments, you will find Mont Choisy, a location where submarine tours take thrill-seekers below the ocean to examine the mystical marine life.",
      "The coral reef at Pointe aux Piments is very close to the coast and is easily accessible. This makes Pointe aux Piments ideal for holidaymakers who want to admire the fascinating coral formations while diving and snorkeling.",
      "There is also an aquarium, which gives a good impression of the underwater world around Mauritius."
    ],
    tips: [
      "There's plenty to do in the area so wake up early, enjoy the road trip and have a memorable experience.",
      "Explore Mauritius Aquarium while you are in Pointe aux Piments, it surely won't disappoint.",
      "Witness a magical sunset. We are sure you could safely use the hashtag #nofilter with pride"
    ],
    images: [
      "pointe-aux-piments-beach.jpg"
    ],
    info: {
      location: "North",
      publicTransport: false,
      hotelsNearby: ["Le Meridien Ile Maurice", "Aanari Hotel & Spa", "Le Recif Attitude"]
    }
  },

  // ============ SOUTH REGION ============
  "le-morne": {
    slug: "le-morne",
    name: "Le Morne",
    number: 36,
    region: "South West",
    coordinates: [-20.452424, 57.312697],
    categories: ["snorkeling", "amenities", "surfing"],
    tagline: "If there was a beauty pageant for beaches, this little gem in the south west of Mauritius could most definitely take over the crown!",
    description: [
      "Rich in beauty and history, Le Morne is a gorgeous beach enhanced with white-bone sand and turquoise water.",
      "Governed by the majestic Le Morne Brabant Mountain (icon of Mauritius as it has been listed as a World Heritage Site by UNESCO), Le Morne holds a special place in the heart of not only many Mauritians but a long list of tourists too!",
      "It is yet another good spot to feast your eyes through some snorkeling session but to top it all, Le Morne is also a hot pick for kite surfers.",
      "If you did not get our point yet, let's just put it simpler: Le Morne is an entire package on its own, customized to suit each and every one's tastes and interests!"
    ],
    tips: [
      "Combine with a morning hike at Le Morne Brabant - it's a big surprise up at the summit!",
      "We recommend you to read the history of Le Morne with regards to slavery times in Mauritius.",
      "Le Morne has one of the best snorkeling spots",
      "Try horse riding on the beach"
    ],
    images: [
      "beach-of-le-morne-in-the-morning.jpg",
      "le-morne-beach-with-coconut-trees.jpg",
      "le-morne-lagoon.jpg",
      "le-morne-public-beach-bird-eye-view.jpg",
      "hammock-at-lux-le-morne.jpg",
      "le-morne-snorkeling-spot.jpg"
    ],
    info: {
      location: "South West",
      publicTransport: true,
      hotelsNearby: ["LUX Le Morne", "Paradis Beachcomber", "Dinarobin Beachcomber", "St. Regis Mauritius"]
    }
  },
  "bel-ombre": {
    slug: "bel-ombre",
    name: "Bel Ombre",
    number: 33,
    region: "South",
    coordinates: [-20.501982, 57.412754],
    categories: ["snorkeling", "amenities", "surfing"],
    tagline: "Not all beaches are created equal. Even on the paradise island of Mauritius, some beaches are cooler than everyone else's beach.",
    description: [
      "Bel Ombre is the perfect definition of what people come to Mauritius for: Sea, Sun and Sand; but it is sprinkled with a little bit of magic here and there as well, along its 6km stretch of golden sand.",
      "Although not totally untouched (due to several nearby hotels and resorts), Bel Ombre beach offers crystal clear water and promises the bounty-feeling you've been looking for.",
      "The area is also a well-known kitesurfing spot with several kite-surf rental options and kite-surf schools.",
      "Yet another picture-postcard beach, with its turquoise blue and emerald green shades, that makes it the perfect place to take a dip."
    ],
    tips: [
      "Get emotionally ready! It's so beautiful you might tear over Mother Nature's miracles!",
      "Not always suitable for novice swimmers (especially during high tides)"
    ],
    images: [
      "bel-ombre-beach.jpg",
      "bel-ombre-lagoon.jpg",
      "bel-ombre-public-beach.jpg"
    ],
    info: {
      location: "South",
      publicTransport: false,
      hotelsNearby: ["Heritage Le Telfair", "Heritage Awali", "Tamassa Resort"]
    }
  },
  "gris-gris": {
    slug: "gris-gris",
    name: "Gris Gris",
    number: 27,
    region: "South",
    coordinates: [-20.524555, 57.530308],
    categories: [],
    tagline: "Although the island has no shortage of beautiful white-sand beaches, why not take a break to let Gris Gris amaze you with its wild side?",
    description: [
      "We promise you; it is truly a nature's masterpiece! Uncover Mauritius' grandiose landscape with Gris Gris' tremendous waves.",
      "Nestled on the south of the island, Gris Gris deserves its name for its bipolar atmosphere combining windy and gloomy sky with the bluest horizon.",
      "Although you'll be tempted to do so, it is strictly prohibited to swim or cliff jump at Gris Gris. Blame it on the strong currents that have often led to several drowning cases.",
      "The area holds a mesmerizing lush green flora which is home to many local endemic birds leading you to 'La Roche Qui Pleure' and 'Pont Naturel' – two landmarks in the district of Souillac."
    ],
    tips: [
      "Visit the Telfair Garden & the Robert Edward Hart Museum",
      "Avoid getting too close to the cliffs edge if you wish to see more of Mauritius",
      "It can get pretty windy, you might want to consider bringing a thin jumper",
      "The cold months could be of your interest if you're fascinated by whales!"
    ],
    images: [
      "gris-gris-beach-in-mauritius.jpeg",
      "gris-gris-beach-in-souillac.jpg",
      "gris-gris-beach.jpg"
    ],
    info: {
      location: "South",
      publicTransport: true,
      hotelsNearby: []
    }
  },
  "blue-bay": {
    slug: "blue-bay",
    name: "Blue Bay",
    number: 23,
    region: "South East",
    coordinates: [-20.445398, 57.716965],
    categories: ["snorkeling", "amenities", "family-friendly"],
    tagline: "Blue Bay Marine Park is one of the best snorkeling spots in Mauritius, featuring crystal-clear waters and vibrant coral reefs.",
    description: [
      "Blue Bay is a marine park with crystal-clear waters that's famous for its glass-bottom boat tours and incredible snorkeling opportunities.",
      "The turquoise lagoon is home to over 50 species of coral and a variety of tropical fish, making it a must-visit for underwater enthusiasts.",
      "Protected as a Marine National Park since 2000, the bay offers some of the most pristine waters in Mauritius."
    ],
    tips: [
      "Book a glass-bottom boat tour to see the coral without getting wet",
      "Bring your own snorkeling gear or rent from local vendors",
      "Best visited in the morning when waters are calmest",
      "Don't touch or stand on the coral – help preserve this natural wonder"
    ],
    images: [
      "blaue-bay-national-marine-park.jpg",
      "blue-bay-lagoon.jpg",
      "blue-bay-turquoise-blue-lagoon.jpg",
      "blue-bay-lagoon-snorkling-spot.jpg",
      "blue-bay-marine-park-snorkling.jpg"
    ],
    info: {
      location: "South East",
      publicTransport: true,
      hotelsNearby: ["Shandrani Beachcomber", "Blue Lagoon Beach Hotel"]
    }
  },
  "la-cambuse": {
    slug: "la-cambuse",
    name: "La Cambuse",
    number: 25,
    region: "South East",
    coordinates: [-20.452764, 57.699489],
    categories: ["secluded"],
    tagline: "What do you crave the most after a long flight? La Cambuse Beach is located near the village of Mon Desert, just minutes from the airport!",
    description: [
      "This is the deal Mauritius has to offer – a large stretch of golden sand beach, a few minutes away from the airport! Yes you've heard right!",
      "With a vast patch of grass, it is very possible for you to get some rest under the trees too and why not come back on another day with a big picnic basket and your camping materials?",
      "La Cambuse has some particular wild traits and tends to be a windy beach; the currents and waves can get out of hands so it is highly recommended to be on your guard during those times.",
      "Nevertheless, it is a great location for a first dip in one of Mauritius best beaches."
    ],
    tips: [
      "Stroll around the whole beach stretch which is quite wide; this is a good first initiative to explore Mauritius!",
      "Make sure you pack your swimming suits in your hand luggage, so it's easier!"
    ],
    images: [
      "la-cambuse-beach-in-the-south.jpg",
      "la-cambuse-beach.jpg",
      "la-cambuse-drone-shot.jpeg",
      "la-cambuse.jpeg"
    ],
    info: {
      location: "South East",
      publicTransport: false,
      hotelsNearby: []
    }
  },
  "pointe-desny": {
    slug: "pointe-desny",
    name: "Pointe d'Esny",
    number: 23,
    region: "South East",
    coordinates: [-20.429902, 57.726813],
    categories: ["snorkeling", "secluded"],
    tagline: "Escape the Blue Bay beach frenzy and visit this hidden pearl on the outskirts of south Mahébourg.",
    description: [
      "In our very humble opinion, no trip to Mauritius is complete without a visit to Pointe D'Esny. Unique on its own, Pointe D'Esny is one of Mauritius best beaches that are a must-see!",
      "It is less likely to be crowded as compared to the public beach of Blue Bay and this is what makes Pointe D'Esny a heart winner among many travelers.",
      "What Pointe D'Esny promises is a daily dose of magic sunset moments. As if it was from a painting, with the different hues of pink, purple, blue and orange sky and sail boats as props.",
      "The beach is accessible through a narrow pathway from the coastal road, as if you were to discover a little treasure at the end of it."
    ],
    tips: [
      "Pack some icy good old wine and a beach mat for the most romantic sunset!",
      "You'll probably need eye drops because it gets so beautiful, it hurts!",
      "There are amazing snorkeling spots around the reefs"
    ],
    images: [
      "pointe-desny-allee.jpg",
      "pointe-desny-beach.jpg",
      "pointe-desny-lagoon.jpg",
      "pointe-desny-bird-eye-view.jpg",
      "pointe-desny-in-the-south.jpg"
    ],
    info: {
      location: "South East",
      publicTransport: false,
      hotelsNearby: ["Preskil Island Resort"]
    }
  },
  "st-felix": {
    slug: "st-felix",
    name: "St Felix",
    number: 30,
    region: "South",
    coordinates: [-20.509439, 57.4656202],
    categories: ["snorkeling", "secluded"],
    tagline: "If you ask a beach lover for recommendations of Mauritius best beaches, St Felix would most likely be the one on top of the list.",
    description: [
      "Located near the village of Rivière des Galets, in the extreme south of the island, St Felix is a must-see when in Mauritius.",
      "St.Felix is kept warm in between the towns of Belle Ombre and Souillac and is scrumptiously inviting for its magnificent hues of blue water and green lush coastline.",
      "It is one of the most remote and peaceful beaches of the island. St Felix comprises of two small separate beaches. The second part of beach is much more beautiful with a great moment of intimacy with the elements.",
      "The beach is surrounded by dense vegetation contrasting with the white sand and turquoise sea that offers spectacular hues of blue."
    ],
    tips: [
      "Picnic is always a good idea! Do you hear us?",
      "Don't just disappear like that, warn your family that you won't come back from Mauritius!"
    ],
    images: [
      "st-felix-beach-in-the-south.jpg",
      "st-felix-beach.jpg"
    ],
    info: {
      location: "South",
      publicTransport: false,
      hotelsNearby: []
    }
  },
  "riambel": {
    slug: "riambel",
    name: "Riambel",
    number: 29,
    region: "South",
    coordinates: [-20.517996, 57.478191],
    categories: ["secluded"],
    tagline: "Rugged, wild and untouched are just some of the ideal words to describe this jewel of Mauritius.",
    description: [
      "Located in the district of Savanne, Riambel is one among the off-beaten beaches of the island. The oceanfront here is beautifully rugged, with a long stretch of pristine beach fringed by palm trees and grassy banks.",
      "Still unmarred by touristic development, the purity of the air and splendor of the surroundings ignite a spirit of adventure to visitors.",
      "Also known as Pomponette, Riambel beach offers 2.5 km of wild untouched coastline free of hotels.",
      "Adored by locals during the weekends, this beach on the south of Mauritius can get pretty crowded. It is one of the few beaches that are still intact from tourism infrastructures."
    ],
    tips: [
      "Stick to your squad when swimming, avoid risking it alone and keep an eye on children due to the strong currents.",
      "Alternatively, build sandcastles. There's no specific age for that!",
      "Not always suitable for novice swimmers (especially during high tides)"
    ],
    images: [
      "riambel-beach-in-the-south.jpeg",
      "riambel-beach.jpeg"
    ],
    info: {
      location: "South",
      publicTransport: false,
      hotelsNearby: []
    }
  },
  "pomponette": {
    slug: "pomponette",
    name: "Pomponette",
    number: 29,
    region: "South",
    coordinates: [-20.4200, 57.3900],
    categories: ["secluded"],
    tagline: "Wild south coast beach with a postcard-worthy stretch of sand, adored by locals during weekends.",
    description: [
      "Pomponette is part of the Riambel coastline, offering 2.5km of wild untouched beach free from hotel development.",
      "The beach features pristine shores fringed by palm trees and grassy banks, perfect for those seeking an authentic, unspoiled beach experience.",
      "Adored by locals during weekends, this stretch of the south coast offers Instagram-worthy beauty at every turn."
    ],
    tips: [
      "Be mindful of strong currents, especially during high tide",
      "Perfect for picnics with its grassy banks",
      "Visit during weekdays for a more peaceful experience"
    ],
    images: [
      "pomponette-beach-in-the-south.jpg",
      "pomponette-beach.jpg"
    ],
    info: {
      location: "South",
      publicTransport: false,
      hotelsNearby: []
    }
  },
  "la-prairie": {
    slug: "la-prairie",
    name: "La Prairie",
    number: 34,
    region: "South West",
    coordinates: [-20.4583, 57.3333],
    categories: ["family-friendly", "secluded"],
    tagline: "With its picturesque backdrop of Le Morne Brabant in the distance, the area is a popular picnic spot for local families.",
    description: [
      "La Prairie is a vast stretch of grass and beach land, located between Le Morne Village and Baie du Cap in the southwest of Mauritius.",
      "A so-very peaceful spot in Mauritius, you'd wish you could build a little cabana and stay there forever! La Prairie offers a large stretch of grass.",
      "It is one of the best beach experiences if you are looking to be uninterrupted yet being able to witness local lifestyle since many locals try to get a spot there for a family picnic.",
      "Another worthy reason why this beach needs to be on your list is for its incredible backdrop view of Le Morne Brabant, which looks straight out of a movie scene."
    ],
    tips: [
      "Get your little picnic basket ready and set off to La Prairie – along with the typical red checkered picnic cloth!",
      "Consider extending your stay as you will be seduced by the atmosphere of this beach",
      "If travelling with kids, keep an eye on them as La Prairie is located right along the main road",
      "There are no facilities such as public toilets at La Prairie so come prepared!"
    ],
    images: [
      "la-prairie-public-beach.jpg",
      "la-prairie.jpg"
    ],
    info: {
      location: "South West",
      publicTransport: false,
      hotelsNearby: []
    }
  },
  "riviere-des-galets": {
    slug: "riviere-des-galets",
    name: "Rivière des Galets",
    number: 31,
    region: "South",
    coordinates: [-20.5050685, 57.4563874],
    categories: ["surfing"],
    tagline: "When someone says 'beach in Mauritius' you probably think of yellow or white sand. But beaches come in far more different shapes!",
    description: [
      "Do we have you at untraditional white-sand beach? Something unique on its own… Coming from the river, a countless amount of smooth pebbles cover the shoreline.",
      "Do not expect being able to find a spot for a good swim as Rivière des Galets is not secured by coral reefs and is more often a surfer's spot.",
      "Witness the waves caressing the shoreline of pebbles that roll down, making an incredibly soothing sound. The place is ideal for some morning meditation by the shore."
    ],
    tips: [
      "Swimming is absolutely not recommended, please keep an eye (and hands) on your kids",
      "You may proceed there after your scrumptious picnic at St.Felix (follow the coastal road)",
      "Listen to the rumbling of the pebbles"
    ],
    images: [
      "riviere-des-galet-public-beach.jpg"
    ],
    info: {
      location: "South",
      publicTransport: false,
      hotelsNearby: []
    }
  },
  "souillac": {
    slug: "souillac",
    name: "Souillac",
    number: 27,
    region: "South",
    coordinates: [-20.5167, 57.5167],
    categories: [],
    tagline: "Wild southern coast beauty with lush vegetation, home to the famous Gris Gris cliffs.",
    description: [
      "Souillac is a charming village on the south coast known for its wild, dramatic coastline and historical significance.",
      "The area features the famous Gris Gris cliffs where powerful waves crash against the rocks, creating a spectacular display of nature's power.",
      "Visit the Telfair Garden and the Robert Edward Hart Museum to learn about the area's rich cultural heritage."
    ],
    tips: [
      "Visit the Telfair Garden for a peaceful stroll",
      "Explore the Robert Edward Hart Museum",
      "The Rochester Falls are nearby and worth a visit"
    ],
    images: [
      "souillac-beach-in-the-south.jpeg",
      "souillac-beach.jpg",
      "souillac-garden.jpg"
    ],
    info: {
      location: "South",
      publicTransport: true,
      hotelsNearby: []
    }
  },
  "baie-de-jacotet": {
    slug: "baie-de-jacotet",
    name: "Baie de Jacotet",
    number: 32,
    region: "South",
    coordinates: [-20.4833, 57.4167],
    categories: ["surfing", "secluded"],
    tagline: "Blending history and nature perfectly, Baie de Jacotet is mostly visited for its proximity to Sanchot Islet.",
    description: [
      "Back in the days, it was where colonies prevailed over each other – a legendary naval site. Mauritius is much more than just beaches, luxury resorts and coconut trees.",
      "The Bay of Jacotet got its name from the river flowing into the bay. It is the historic site of the first attack against the Ile de France by the English in 1810.",
      "At the mouth of the bay is Ilot Sanchot, famous for its legends of corsairs and pirates at the origin of several hidden treasures.",
      "The bay gets busy in winter times where surfers invade the beach for its beautiful waves."
    ],
    tips: [
      "If you're planning on going to Sanchot Islet, wear proper shoes!",
      "If you're into fishing, this could be a fruitful spot for you!",
      "Can be a very good surfing spot with the right conditions"
    ],
    images: [
      "baie-de-jacotet-in-the-south.jpg"
    ],
    info: {
      location: "South",
      publicTransport: false,
      hotelsNearby: []
    }
  },

  // ============ EAST REGION ============
  "belle-mare": {
    slug: "belle-mare",
    name: "Belle Mare",
    number: 19,
    region: "East",
    coordinates: [-20.1836, 57.7644],
    categories: ["snorkeling", "amenities"],
    tagline: "As if you didn't have enough worthy reasons to go to Mauritius; Belle Mare is yet another magnificent beach to see!",
    description: [
      "Belle Mare holds a very special reputation among locals and visitors of the island! Blame it on its beauty, it is one of the loveliest stops while on holiday in Mauritius.",
      "Yet another white-bone sand beach that makes it to the top of Mauritius best beaches list. The area is coupled with an array of hotels as well.",
      "Belle Mare is equally blessed with a sacred lagoon, rich in marine species and there are often sightings of eagle rays and reef sharks close to the barrier reefs.",
      "Diving and snorkeling in Belle Mare could be an ultimate option to add when considering what to do in Mauritius."
    ],
    tips: [
      "Snorkeling set and there we go! Discover yet a whole new world!",
      "Diving is a big pull there, give it a try!",
      "Golf lovers – this is a good place for you! Two world renowned championship courses!"
    ],
    images: [
      "bel-mare-plage.jpg",
      "belle-mare-beach-on-the-east-coast.jpg",
      "belle-mare-beach.jpg"
    ],
    info: {
      location: "East",
      publicTransport: true,
      hotelsNearby: ["Constance Belle Mare Plage", "LUX Belle Mare", "Long Beach Golf & Spa Resort", "Ambre Resort"]
    }
  },
  "ile-aux-cerfs": {
    slug: "ile-aux-cerfs",
    name: "Ile aux Cerfs",
    number: 22,
    region: "East",
    coordinates: [-20.27222, 57.80417],
    categories: ["snorkeling", "amenities"],
    tagline: "Pearl of Mauritius, a true icon depicted on all tourist guides, Ile aux Cerfs is like a little paradise on earth.",
    description: [
      "87 hectares bordered by white sand. To come to Mauritius without visiting at least once this place with the magic charm, is to make an incomplete journey.",
      "The island's vision resembles a postcard with its turquoise-lagoon lagoon, mangrove swamp and abundant tropical vegetation.",
      "There are plenty of water sports: kayaking, canoeing, sailing, parasailing etc. In addition to its large public beach, Ile aux Cerfs also hides many peaceful corners.",
      "With its turquoise blue water and bone-white sand, this beach steals a soft spot in every visitor's heart."
    ],
    tips: [
      "Make full use of the water sports in the area, they sure don't disappoint!",
      "A 'not to be missed experience' is the Catamaran Cruise",
      "Take panoramic pictures so you can capture more of Ile aux Cerfs' beauty with every click"
    ],
    images: [
      "golf-beach-ile-aux-cerfs.jpg",
      "ile-aux-cerfs-beach.jpg",
      "ile-aux-cerfs-drone-shot.jpg",
      "ile-aux-cerfs-golf-beach-cabana.jpg",
      "ile-aux-cerfs-golf-beach.jpg"
    ],
    info: {
      location: "East",
      publicTransport: false,
      hotelsNearby: ["Shangri-La Le Touessrok (boat access)"]
    }
  },
  "trou-deau-douce": {
    slug: "trou-deau-douce",
    name: "Trou d'Eau Douce",
    number: 21,
    region: "East",
    coordinates: [-20.2417, 57.7833],
    categories: ["snorkeling", "amenities"],
    tagline: "A privileged destination for holidaymakers. The area of Trou d'Eau Douce is a must visit in Mauritius.",
    description: [
      "With a name that speaks for itself – Trou D'eau Douce is a charming bay with a river meeting the ocean. It is so laidback that it depicts the authentic and old Mauritius beach scene.",
      "From Trou D'eau Douce you can conveniently hop on a boat to visit Ile aux Cerfs – Mauritius' icon!",
      "The beach at Trou D'eau Douce guarantees calm and tranquil waters away from the bustling crowds.",
      "The area is coupled with several facilities such as shops and supermarkets as well as a few local joints to grab some local delicacies."
    ],
    tips: [
      "Good and smooth little reggae by the beach is always a good idea!",
      "Always bargain your price down when offered to go on a boat trip to Ile aux Cerfs!"
    ],
    images: [
      "trou-deau-douce-beach.jpg"
    ],
    info: {
      location: "East",
      publicTransport: true,
      hotelsNearby: ["Tropical Attitude", "Silver Beach Hotel"]
    }
  },
  "palmar-beach": {
    slug: "palmar-beach",
    name: "Palmar Beach",
    number: 20,
    region: "East",
    coordinates: [-20.2000, 57.7583],
    categories: ["snorkeling", "secluded"],
    tagline: "Small and tranquil, Palmar is more or less one of the most 'timid' beaches in Mauritius.",
    description: [
      "It doesn't attract a big crowd as well and there isn't much to do there. It's a good option if you are not keen to interact with humanity today!",
      "It happens, we know it. Some days we all need some time on our own to find our inner self and get back in a better condition!",
      "It isn't one of the best beaches out there but it nestles decent hotel options. It is a good place to drop by while visiting the east of the island."
    ],
    tips: [
      "Pack a cooler box filled with ice drinks!",
      "Can hide some amazing snorkeling spots",
      "Be mindful of tidal currents and strong rips around the rocks"
    ],
    images: [
      "palmar-beach.jpg"
    ],
    info: {
      location: "East",
      publicTransport: false,
      hotelsNearby: ["Veranda Palmar Beach", "Solana Beach"]
    }
  },
  "bras-deau": {
    slug: "bras-deau",
    name: "Bras d'Eau",
    number: 17,
    region: "East",
    coordinates: [-20.1333, 57.7500],
    categories: ["family-friendly"],
    tagline: "We have to list Bras D'eau as Mauritius' most stunning stretch of beach for the ultimate family picnic!",
    description: [
      "Let yourself get swept away by its magnificent shores and the calming waters for a relaxing day out.",
      "If you're a picnic lover and enjoy good times among friends and relatives, this beach should most definitely be on your bucket list.",
      "Bras D'eau is backed up with unbelievable clear water, sparkled with darker shades due to the presence of rocks.",
      "From the beach, you'll also be able to head over to Bras D'eau National Park – unveiling Mauritius' natural beauty!"
    ],
    tips: [
      "Bring along a fully filled picnic basket and some fun beach games for the day!",
      "Do pack some trainers in case you plan on dropping by the Bras d'Eau National Park!"
    ],
    images: [
      "bras-deau-public-beach-on-the-east-coast.jpg",
      "bras-deau-public-beach.jpg"
    ],
    info: {
      location: "East",
      publicTransport: false,
      hotelsNearby: []
    }
  },
  "roche-noire": {
    slug: "roche-noire",
    name: "Roche Noire",
    number: 15,
    region: "East",
    coordinates: [-20.1083, 57.7167],
    categories: ["secluded"],
    tagline: "Neighbour of Poste Lafayette, Roches Noires is also surrounded by volcanic formations – its name means 'Black Rocks'.",
    description: [
      "Roche Noire owes its name to the volcanic formation caves which offered a safe hiding place to the brown slaves and also to the color of the volcanic rocks.",
      "The village has a natural jewel, a tunnel of lava situated 7 meters underground in the center of the locality. Nicknamed 'la cave Madame', this tunnel of lava is the fruit of a volcanic eruption that occurred more than 25000 years ago.",
      "Swimming at Roches Noires is mostly recommended to experienced swimmers due to the rocky formations.",
      "Roches Noires' unique selling point is the black rocks formation from past volcanic remnants."
    ],
    tips: [
      "It's less of a swimming locale, but great for exploring volcanic rock formations",
      "A good spot for a peaceful beer stop while exploring the east coast"
    ],
    images: [
      "roche-noire-public-beach.jpg"
    ],
    info: {
      location: "East",
      publicTransport: false,
      hotelsNearby: []
    }
  },
  "deux-cocos": {
    slug: "deux-cocos",
    name: "Ile des Deux Cocos",
    number: 24,
    region: "East",
    coordinates: [-20.4450, 57.7200],
    categories: ["snorkeling", "amenities", "secluded"],
    tagline: "A private island paradise accessible by boat, perfect for an exclusive beach experience.",
    description: [
      "Ile des Deux Cocos is a small private island located in the Blue Bay Marine Park, offering an exclusive and intimate beach experience.",
      "The island features crystal clear waters, pristine sandy beaches, and excellent snorkeling opportunities in the protected marine park.",
      "Originally used as a retreat by the British Governor, the island now offers day trips with gourmet dining and water activities."
    ],
    tips: [
      "Book in advance as access is limited",
      "Bring snorkeling gear to explore the marine park",
      "Perfect for a romantic day trip or special celebration"
    ],
    images: [
      "deux-cocos-island.jpg",
      "ile-des-deux-cocos.jpg"
    ],
    info: {
      location: "East",
      publicTransport: false,
      hotelsNearby: []
    }
  },
  "ilot-gabriel": {
    slug: "ilot-gabriel",
    name: "Ilot Gabriel",
    number: 13,
    region: "North East",
    coordinates: [-19.8833, 57.6667],
    categories: ["snorkeling"],
    tagline: "An uninhabited island nature reserve with pristine beaches and excellent snorkeling – a popular catamaran day trip destination.",
    description: [
      "Ilot Gabriel is an uninhabited island located north of Mauritius, accessible by boat from Grand Baie or Cap Malheureux.",
      "The island is a nature reserve with pristine beaches, crystal-clear waters, and some of the best snorkeling spots in Mauritius.",
      "Most visitors come on catamaran day trips that include lunch, drinks, and time to explore the island's natural beauty."
    ],
    tips: [
      "Book a catamaran cruise for the full experience",
      "The island can get crowded during peak season – arrive early",
      "Bring reef-safe sunscreen and snorkeling gear"
    ],
    images: [
      "ilot-gabriel-island.jpg",
      "ilot-gabriel-beach.jpg",
      "ilot-gabriel-lagoon.jpg",
      "ilot-gabriel-boat-tour.jpg",
      "ilot-gabriel-speedboat-tour.jpg"
    ],
    info: {
      location: "North East",
      publicTransport: false,
      hotelsNearby: []
    }
  },

  // ============ WEST REGION ============
  "flic-en-flac": {
    slug: "flic-en-flac",
    name: "Flic en Flac",
    number: 40,
    region: "West",
    coordinates: [-20.2824, 57.3625],
    categories: ["snorkeling", "amenities"],
    tagline: "Derived from an Old Dutch phrase meaning 'Free and Flat Land', Flic en Flac is best known for its vibrant underwater world and extended white sand beaches.",
    description: [
      "Flic-en-Flac is home to several coconut trees, which offer many shady places to sit back and unwind. On a clear day, what more can you ask for apart from crystal clear water, white sand and a shady spot under a coconut tree?",
      "If you're more of an adrenaline junkie, fear not as Flic-en-Flac is also renowned for scuba diving and snorkeling. Grab your aqua gear and dive right into the azure waters.",
      "Camping too is a popular choice among locals as there is plenty of room along the 8km stretch of white sand.",
      "Flic-en-Flac hosts a vast array of local delicacies via food trucks. Some of the must try items are the rotis and pickles."
    ],
    tips: [
      "If you forget to bring your snorkeling gear, you're losing out big time!",
      "Pack a good book so that cozy spot under a tree can be put to good use",
      "Tanning lotion & sunglasses are never optional in Mauritius",
      "A few coins to indulge in the delicious mango pickle",
      "Check out the restaurants along the main road"
    ],
    images: [
      "flic-en-flac-beach-villa-caroline.jpg",
      "flic-en-flac-public-beach.jpg",
      "shades-at-flic-en-flac-beach-in-mauritius.jpg",
      "flic-en-flac-beach-kilometers-of-white-sand.jpg",
      "flic-en-flac-drone-shot.jpg"
    ],
    info: {
      location: "West",
      publicTransport: true,
      hotelsNearby: ["Sugar Beach", "La Pirogue", "Hilton Mauritius", "Sofitel L'Imperial", "Maradiva"]
    }
  },
  "wolmar": {
    slug: "wolmar",
    name: "Wolmar",
    number: 40,
    region: "West",
    coordinates: [-20.2900, 57.3550],
    categories: ["snorkeling", "amenities"],
    tagline: "The upscale stretch of Flic en Flac featuring luxury resorts and stunning sunset views.",
    description: [
      "Wolmar is the more exclusive section of the Flic en Flac coastline, home to some of Mauritius' finest luxury resorts.",
      "The beach here offers the same beautiful white sand and calm lagoon waters as Flic en Flac, but with a more refined atmosphere.",
      "Perfect for those seeking a quieter beach experience while still having access to world-class amenities."
    ],
    tips: [
      "Watch the sunset from one of the beachfront restaurants",
      "The calm waters are perfect for swimming and water sports",
      "Many hotels offer day passes for non-guests"
    ],
    images: [
      "flic-en-flac-beach-in-mauritius-la-pirogue.jpg",
      "la-pirogue-resort-sunrise-flic-en-flac-beach.jpg",
      "flic-en-flac-la-pirogue.jpg",
      "morning-walk-along-flic-en-flac-beach.jpg"
    ],
    info: {
      location: "West",
      publicTransport: false,
      hotelsNearby: ["La Pirogue", "Sugar Beach", "Sofitel L'Imperial"]
    }
  },
  "tamarin": {
    slug: "tamarin",
    name: "Tamarin",
    number: 39,
    region: "West",
    coordinates: [-20.3250, 57.3667],
    categories: ["amenities", "surfing"],
    tagline: "Tamarin is an animated and lively village, particularly appreciated by surfers with its unique brown sand beach.",
    description: [
      "The beach of Tamarin is not like the other beaches of the island. It reveals a different atmosphere, unique, with its brown sand.",
      "The mixture of fresh water from the river, whose mouth separates the beach in two, with the salt water of the sea, alters the minerals contained in the sand. It is this interaction that makes the sand darker.",
      "It's known for its cool vibes (especially on weekends). Tamarin Bay is loved around the world by surfers for its majestic waves.",
      "It is also one of Mauritius best beaches to witness dolphins; however it can get pretty crowded in the early morning."
    ],
    tips: [
      "SUNGLASSES! Essential!",
      "Some money to get taste of the must-try Mauritian dumplings",
      "Bring your surfboard if you surf",
      "Join the locals for acoustic music by the campfire in the evening"
    ],
    images: [
      "tamarin-bay-morning.jpg",
      "tamarin-surf-beach.jpg",
      "tamarin-bay-sunset.jpg",
      "tamarin-beach-in-mauritius.jpeg"
    ],
    info: {
      location: "West",
      publicTransport: true,
      hotelsNearby: ["Tamarina Golf & Spa Boutique Hotel", "Riverland Eco Lodge"]
    }
  },
  "la-preneuse": {
    slug: "la-preneuse",
    name: "La Preneuse",
    number: 38,
    region: "West",
    coordinates: [-20.3500, 57.3500],
    categories: ["secluded"],
    tagline: "If you're looking for a break from the bustling crowds, this tranquil beach on the west coast could be the perfect pick!",
    description: [
      "This is often an overlooked beach due to its seclusion but do not underestimate sunset time at La Preneuse as it gets truly magical!",
      "Most fishing activities depart from La Preneuse, so it is a good experience to witness on an early morning jog. It also serves as a hub for dolphin watching off the coast and boat transfers to Ile aux Benitiers.",
      "On a low tide, La Preneuse surprises you once again – here appears a little sand bank which is eventually not visible on high tides.",
      "There is nothing much happening at La Preneuse, except on weekends when locals enjoy their family day out."
    ],
    tips: [
      "Best enjoyed for a morning jog (bring along breakfast, because why not?)",
      "Ideal for sunset",
      "Beware of the currents, they can get pretty bad on a windy day"
    ],
    images: [
      "la-preneuse-beach.jpg",
      "la-preneuse-public-beach-on-the-west-coast.jpg"
    ],
    info: {
      location: "West",
      publicTransport: false,
      hotelsNearby: []
    }
  },
  "ile-aux-benitiers": {
    slug: "ile-aux-benitiers",
    name: "Ile aux Benitiers",
    number: 37,
    region: "West",
    coordinates: [-20.4167, 57.3333],
    categories: ["snorkeling"],
    tagline: "An idyllic island with pristine beaches and crystal waters, perfect for a day trip with dolphin swimming.",
    description: [
      "Ile aux Benitiers is a small island off the west coast of Mauritius, accessible by boat from La Preneuse or nearby villages.",
      "The island is famous for the nearby Crystal Rock – a stunning rock formation that rises from the turquoise lagoon.",
      "Day trips typically include dolphin watching in the morning, followed by time on the island's pristine beaches.",
      "The waters around the island are perfect for swimming and snorkeling in a truly paradise setting."
    ],
    tips: [
      "Book a full day tour for the complete experience",
      "Bring waterproof camera for the Crystal Rock photos",
      "Dolphin watching is best early morning"
    ],
    images: [
      "ile-aux-benitiers-beach.jpg",
      "the-iconic-crystal-rock.jpg",
      "ile-aux-benitiers-boat-transfer.jpg",
      "ile-aux-benitiers-full.jpg"
    ],
    info: {
      location: "West",
      publicTransport: false,
      hotelsNearby: []
    }
  },
  "albion": {
    slug: "albion",
    name: "Albion",
    number: 42,
    region: "West",
    coordinates: [-20.2111, 57.4011],
    categories: ["amenities", "secluded"],
    tagline: "Albion is yet another sublime beach located in the district of Black River, perfect for those seeking peace and quiet.",
    description: [
      "Although the public beach welcomes everyone, not many select Albion as their choice of preference. This often makes this beach the perfect place to quietly observe the soothing sound of waves.",
      "This beach offers great possibilities for either a quiet day out or an evening barbecue, or why not both!",
      "There are clean public restrooms available next to the beach, near the bus terminus, and the forested area behind it offers public barbecue areas as well as plenty of benches.",
      "Due to its location, most tourists never seem to find their way to Albion, and as such, the beach offers plenty of peace, quiet and space for everyone."
    ],
    tips: [
      "In case you forgot to bring some knick-knacks, there is a supermarket very conveniently located in front of the beach",
      "Tanning lotion & Sunglasses!",
      "Visit the caves and lighthouse"
    ],
    images: [
      "albion-beach-morning.jpg",
      "albion-public-beach.jpg",
      "albion-public-beach-lagoon.jpg",
      "albion-club-med.jpg"
    ],
    info: {
      location: "West",
      publicTransport: true,
      hotelsNearby: ["Club Med Albion"]
    }
  }
};

export function getBeachBySlug(slug: string): BeachDetails | null {
  return BEACH_DETAILS[slug] || null;
}

export function getAllBeachSlugs(): string[] {
  return Object.keys(BEACH_DETAILS);
}

export function getBeachesByRegion(region: Region): BeachDetails[] {
  return Object.values(BEACH_DETAILS).filter((beach) => beach.region === region);
}
