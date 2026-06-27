/**
 * Activities data for the activities page
 * Categories: All, Best Seller, Adventure, Air, Land, Sea, Hiking, Unique
 */

import { ActivityCategory, Region, Coordinates } from "@/types/content";

export interface Activity {
  slug: string;
  name: string;
  image: string;
  description: string;
  categories: ActivityCategory[];
  region?: Region;
  price?: number;
  featured?: boolean;
}

export const ACTIVITY_CATEGORIES: { id: ActivityCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "best-seller", label: "Best Seller" },
  { id: "adventure", label: "Adventure" },
  { id: "air", label: "Air" },
  { id: "land", label: "Land" },
  { id: "sea", label: "Sea" },
  { id: "hiking", label: "Hiking" },
  { id: "unique", label: "Unique in Mauritius" },
];

export const ACTIVITIES: Activity[] = [
  // ========== BEST SELLERS ==========
  {
    slug: "swim-with-dolphins",
    name: "Swim with Dolphins",
    image: "swimming-with-dolphins.jpg",
    description: "Experience the magic of swimming alongside wild dolphins in their natural habitat on the west coast of Mauritius.",
    categories: ["all", "best-seller", "sea", "unique"],
    region: "West",
    price: 42,
    featured: true,
  },
  {
    slug: "catamaran-cruises",
    name: "Catamaran Cruises",
    image: "catamaran-cruises-in-mauritius.jpg",
    description: "Sail the turquoise waters of Mauritius on a luxurious catamaran with snorkeling, BBQ lunch, and unlimited drinks.",
    categories: ["all", "best-seller", "sea"],
    region: "Various",
    price: 75,
    featured: true,
  },
  {
    slug: "helicopter-tour",
    name: "Helicopter Tour",
    image: "corail-helicopter-tour.jpg",
    description: "See the breathtaking beauty of Mauritius from above with a scenic helicopter tour over mountains, beaches, and the underwater waterfall.",
    categories: ["all", "best-seller", "air", "unique"],
    region: "Various",
    price: 235,
    featured: true,
  },
  {
    slug: "hiking-le-morne",
    name: "Hiking Le Morne Brabant",
    image: "horse-riding-at-le-morne.jpg",
    description: "Climb the iconic UNESCO World Heritage Le Morne Brabant mountain for spectacular panoramic views of the island.",
    categories: ["all", "best-seller", "hiking", "land"],
    region: "South West",
    price: 49,
    featured: true,
  },
  {
    slug: "quad-biking",
    name: "Quad Biking at Heritage Nature Reserve",
    image: "lion-mountain-at-ferney.jpg",
    description: "Explore the wild beauty of Mauritius on a thrilling quad bike adventure through Heritage Nature Reserve and scenic trails in Bel Ombre.",
    categories: ["all", "best-seller", "adventure", "land"],
    region: "South",
    price: 118,
  },
  // ========== SEA ACTIVITIES ==========
  {
    slug: "catamaran-ile-aux-benitiers",
    name: "Catamaran Cruise - Ile aux Bénitiers",
    image: "ile-aux-benitiers.jpg",
    description: "Cruise to the stunning Ile aux Bénitiers and see the famous Crystal Rock, with snorkeling and BBQ lunch included.",
    categories: ["all", "sea"],
    region: "West",
    price: 55,
  },
  {
    slug: "catamaran-ile-aux-cerfs",
    name: "Catamaran Cruise - Ile aux Cerfs",
    image: "ile-aux-cerfs.jpg",
    description: "Sail to the paradise island of Ile aux Cerfs and enjoy pristine beaches, water sports, and a delicious BBQ.",
    categories: ["all", "sea"],
    region: "East",
    price: 59,
  },
  {
    slug: "catamaran-ilot-gabriel",
    name: "Catamaran Cruise - Ilot Gabriel",
    image: "coin-de-mire.jpg",
    description: "Discover the unspoiled beauty of Ilot Gabriel on a catamaran cruise with snorkeling in crystal-clear waters.",
    categories: ["all", "sea"],
    price: 39,
  },
  {
    slug: "sunset-cruise",
    name: "Sunset Catamaran Cruise",
    image: "sunset-catamaran-cruise.jpg",
    description: "Experience a magical sunset on the ocean with drinks, music, and the stunning Mauritian coastline.",
    categories: ["all", "sea", "unique"],
    region: "North",
    price: 29,
  },
  {
    slug: "whale-watching",
    name: "Whale Watching",
    image: "speedboat-tours-in-mauritius.jpg",
    description: "Witness majestic whales in their natural habitat during the migration season (June to November).",
    categories: ["all", "sea", "unique"],
    region: "West",
    price: 59,
  },
  {
    slug: "speedboat-ilot-gabriel",
    name: "Speedboat Tours to Ilot Gabriel",
    image: "le-morne-speedboat-tours.jpg",
    description: "A thrilling speedboat adventure to the pristine shores of Ilot Gabriel with snorkeling stops.",
    categories: ["all", "sea", "adventure"],
    region: "North East",
    price: 375,
  },
  {
    slug: "underwater-scooter",
    name: "Underwater Scooter",
    image: "underwater-scooter.jpg",
    description: "Explore the underwater world with an easy-to-use underwater scooter - no diving experience required!",
    categories: ["all", "sea", "adventure", "unique"],
    region: "Various",
    price: 75,
  },
  {
    slug: "undersea-walk",
    name: "Undersea Walk",
    image: "walk-under-water-in-mauritius.jpg",
    description: "Walk on the ocean floor and get up close with tropical fish and coral in this unique underwater experience.",
    categories: ["all", "sea", "unique"],
    region: "North",
  },
  {
    slug: "snorkeling-blue-bay",
    name: "Snorkeling at Blue Bay Marine Park",
    image: "blue-bay-sea-turtle.jpg",
    description: "Snorkel in the protected Blue Bay Marine Park and discover vibrant coral reefs and sea turtles.",
    categories: ["all", "sea"],
    region: "South East",
  },
  {
    slug: "scuba-diving",
    name: "Scuba Diving",
    image: "best-diving-spot-in-mauritius.jpg",
    description: "Explore the incredible dive sites around Mauritius with experienced instructors and world-class equipment.",
    categories: ["all", "sea", "adventure"],
    region: "Various",
  },
  {
    slug: "parasailing",
    name: "Parasailing",
    image: "parasailing-in-mauritius.jpg",
    description: "Soar above the turquoise lagoon and enjoy breathtaking aerial views of the Mauritian coastline.",
    categories: ["all", "sea", "adventure", "air"],
    region: "West",
  },
  {
    slug: "kayaking-ile-dambre",
    name: "Kayaking Tour - Ile d'Ambre",
    image: "kayaking-ile-d-ambre-in-mauritius.jpg",
    description: "Paddle through mangroves and discover the hidden beauty of Ile d'Ambre on a guided kayak adventure.",
    categories: ["all", "sea", "adventure"],
    region: "North East",
  },
  {
    slug: "stand-up-paddle",
    name: "Stand Up Paddle",
    image: "stand-up-paddle-in-mauritius.jpg",
    description: "Glide across the calm lagoons on a stand-up paddleboard and enjoy the peaceful Mauritian waters.",
    categories: ["all", "sea"],
    region: "Various",
  },
  {
    slug: "seakart-adventure",
    name: "Sea Kart Adventure",
    image: "seakart-adventure-mauritius-min.jpg",
    description: "Drive your own mini speedboat and explore the coastline on this exciting sea karting experience.",
    categories: ["all", "sea", "adventure"],
    region: "West",
    price: 155,
  },
  
  // ========== AIR ACTIVITIES ==========
  {
    slug: "seaplane-le-morne",
    name: "Seaplane Flight at Le Morne",
    image: "seaplane-at-le-morne.jpg",
    description: "Take off from the lagoon and fly over the famous underwater waterfall and Le Morne peninsula.",
    categories: ["all", "air", "unique"],
    region: "South West",
    price: 215,
  },
  {
    slug: "seaplane-north",
    name: "Seaplane Flight in the North",
    image: "seaplane-in-the-north-of-mauritius.jpg",
    description: "Discover the northern islands and reefs from the air with this spectacular seaplane adventure.",
    categories: ["all", "air"],
    region: "North",
    price: 137,
  },
  {
    slug: "skydiving",
    name: "Skydiving",
    image: "skydiving-in-mauritius.jpg",
    description: "Experience the ultimate adrenaline rush with a tandem skydive over the stunning Mauritian landscape.",
    categories: ["all", "air", "adventure", "unique"],
    region: "Various",
  },
  // ========== LAND ACTIVITIES ==========
  {
    slug: "horse-riding-le-morne",
    name: "Horse Riding at Le Morne",
    image: "horse-riding-le-morne.jpg",
    description: "Ride along the pristine beaches of Le Morne at sunrise or sunset for an unforgettable experience.",
    categories: ["all", "land", "best-seller"],
    region: "South West",
    price: 59,
  },
  {
    slug: "horse-riding",
    name: "Horse Riding in Mauritius",
    image: "horse-riding-on-the-beach-in-mauritius.jpg",
    description: "Explore scenic trails and beaches on horseback with experienced guides.",
    categories: ["all", "land"],
    region: "Various",
    price: 60,
  },
  {
    slug: "la-vanille-nature-park",
    name: "La Vanille Nature Park",
    image: "deer-at-la-vanille-nature-park.jpg",
    description: "Meet giant tortoises, crocodiles, and other wildlife at this family-friendly nature reserve.",
    categories: ["all", "land"],
    region: "South",
  },
  
  // ========== HIKING ACTIVITIES ==========
  {
    slug: "hiking-le-pouce",
    name: "Hiking Le Pouce",
    image: "climbing-le-pouce-mountain.jpg",
    description: "Climb the third-highest peak in Mauritius for panoramic views of Port Louis and the northern plains.",
    categories: ["all", "hiking", "land"],
    region: "Central",
    price: 55,
  },
  {
    slug: "seven-waterfalls",
    name: "Seven Waterfalls Hike",
    image: "7-waterfall-hike.jpg",
    description: "Trek through lush forests to discover the magical seven cascades and swim in natural pools.",
    categories: ["all", "hiking", "adventure"],
    region: "South West",
    price: 55,
  },
  {
    slug: "seven-cascades",
    name: "7 Cascades Adventure",
    image: "hiking-7-cascades.jpg",
    description: "An adventurous hike through Tamarin Falls with canyoning, abseiling, and natural waterslides.",
    categories: ["all", "hiking", "adventure"],
    region: "South West",
  },
  
  // ========== ISLAND TOURS ==========
  {
    slug: "ile-aux-cerfs",
    name: "Ile aux Cerfs",
    image: "boat-tours-at-ile-aux-cerfs.jpg",
    description: "Visit the most famous island in Mauritius with its pristine beaches and water sports activities.",
    categories: ["all", "sea"],
    region: "East",
  },
  {
    slug: "ile-aux-benitiers",
    name: "Ile aux Benitiers",
    image: "ile-aux-benitiers.jpg",
    description: "A paradise island on the west coast, famous for dolphin watching and the iconic Crystal Rock.",
    categories: ["all", "sea"],
    region: "West",
  },
  {
    slug: "ilot-gabriel",
    name: "Ilot Gabriel",
    image: "ilot-mangenie-boat-tour-min.jpg",
    description: "An uninhabited island nature reserve with pristine beaches and excellent snorkeling.",
    categories: ["all", "sea"],
    region: "North East",
  },
  {
    slug: "ile-aux-aigrettes",
    name: "Ile aux Aigrettes",
    image: "ile-aux-aigrettes.jpg",
    description: "A protected nature reserve home to rare endemic species and giant tortoises.",
    categories: ["all", "land", "unique"],
    region: "South East",
  },
  {
    slug: "ile-des-deux-cocos",
    name: "Ile des Deux Cocos",
    image: "ile-des-deux-cocos-in-blue-bay-min.jpg",
    description: "A private island paradise in Blue Bay Marine Park, perfect for an exclusive day trip.",
    categories: ["all", "sea", "unique"],
  },
  {
    slug: "ilot-flamant",
    name: "Ilot Flamant",
    image: "ilot-flamant-min.jpg",
    description: "A small island off the south coast with beautiful views and peaceful surroundings.",
    categories: ["all", "sea"],
  },
  
  // ========== UNIQUE EXPERIENCES ==========
  {
    slug: "underwater-waterfall",
    name: "Underwater Waterfall Tour",
    image: "underwater-waterfall-in-mauritius.jpg",
    description: "Witness the incredible optical illusion of the underwater waterfall from above by helicopter or seaplane.",
    categories: ["all", "unique", "air"],
    region: "South West",
  },
  {
    slug: "catamaran-live-aboard",
    name: "Catamaran Live on Board",
    image: "catamaran-tours-with-oceane.jpg",
    description: "An unforgettable multi-day sailing experience living aboard a luxury catamaran.",
    categories: ["all", "sea", "unique"],
    region: "Various",
    price: 790,
  },
  {
    slug: "one-love-boat-tour",
    name: "One Love Boat Tour",
    image: "one-love-boat-tour.jpg",
    description: "Reggae vibes and good times on this unique boat tour with music, drinks, and stunning views.",
    categories: ["all", "sea", "unique"],
    region: "West",
  },
  
  // ========== PLACES TO VISIT ==========
  {
    slug: "chamarel-waterfall",
    name: "Chamarel Waterfall",
    image: "eau-bleue-waterfall-in-mauritius.jpg",
    description: "Visit the spectacular Chamarel Waterfall, one of the highest waterfalls in Mauritius.",
    categories: ["all", "land"],
    region: "South West",
  },
  {
    slug: "port-louis",
    name: "Port Louis",
    image: "caudan-umbrella-alley-in-port-louis-caudan-waterfront.jpg",
    description: "Explore the vibrant capital city with its markets, waterfront, and cultural attractions.",
    categories: ["all", "land"],
    region: "North",
  },
  
  // ========== ATTRACTIONS & VIEWPOINTS ==========
  {
    slug: "caverne-patate",
    name: "Caverne Patate",
    image: "caverne-patate.jpg",
    description: "Explore the mysterious underground caves of Rodrigues Island with impressive stalactites and stalagmites.",
    categories: ["all", "adventure", "unique"],
    region: "Rodrigues",
  },
  {
    slug: "grand-bassin",
    name: "Grand Bassin Temple",
    image: "grand-bassin-shiva-statue.jpg",
    description: "Sacred Hindu pilgrimage site with the iconic 33-meter tall Shiva statue and tranquil crater lake.",
    categories: ["all", "land", "unique"],
    region: "South",
  },
  {
    slug: "maconde-viewpoint",
    name: "Maconde Viewpoint",
    image: "maconde-viewpoint.jpg",
    description: "Dramatic clifftop viewpoint where the rugged Savanne mountains meet the Indian Ocean.",
    categories: ["all", "land"],
    region: "South West",
  },
  {
    slug: "alexandra-falls",
    name: "Alexandra Falls",
    image: "alexandra-falls.jpg",
    description: "Stunning waterfall viewpoint within Black River Gorges National Park with panoramic forest views.",
    categories: ["all", "hiking", "land"],
    region: "South West",
  },
  {
    slug: "albion-lighthouse",
    name: "Albion Lighthouse",
    image: "albion-lighthouse.jpg",
    description: "Historic lighthouse on dramatic western cliffs, perfect for sunset photography.",
    categories: ["all", "land"],
    region: "West",
  },
  {
    slug: "jardin-telfair",
    name: "Jardin Telfair",
    image: "jardin-telfair.jpeg",
    description: "Historic botanical garden in Souillac featuring centuries-old banyan trees and peaceful walkways.",
    categories: ["all", "land"],
    region: "South",
  },
  {
    slug: "gris-gris",
    name: "Gris Gris",
    image: "gris-gris-beach.jpg",
    description: "Wild southern cliffs where powerful ocean waves crash without the protection of a reef.",
    categories: ["all", "land"],
    region: "South",
  },
  {
    slug: "le-souffleur",
    name: "Le Souffleur",
    image: "le-soufleur.jpg",
    description: "Spectacular natural blowhole that shoots water up to 20 meters into the air.",
    categories: ["all", "land", "unique"],
    region: "South",
  },
  {
    slug: "rochester-falls",
    name: "Rochester Falls",
    image: "rochester-falls.jpg",
    description: "Unique waterfall with rectangular rock formations and a natural swimming pool.",
    categories: ["all", "hiking", "land"],
    region: "South",
  },
  
  // ========== HIGH-VALUE ATTRACTIONS (NEW) ==========
  {
    slug: "seven-coloured-earth",
    name: "Seven Coloured Earth",
    image: "seven-coloured-earth.jpg",
    description: "A unique geological formation featuring sand dunes in seven distinct colors - a must-see natural wonder.",
    categories: ["all", "land", "unique"],
    region: "South West",
  },
  {
    slug: "blue-bay-marine-park",
    name: "Blue Bay Marine Park",
    image: "blue-bay-sea-turtle.jpg",
    description: "Protected marine park with crystal-clear waters, vibrant coral reefs, and abundant sea life including turtles.",
    categories: ["all", "sea", "unique"],
    region: "South East",
  },
  {
    slug: "pamplemousses-botanical-garden",
    name: "Pamplemousses Botanical Garden",
    image: "pamplemousses-botanical-garden.jpg",
    description: "One of the oldest botanical gardens in the Southern Hemisphere, famous for giant water lilies and rare palms.",
    categories: ["all", "land", "unique"],
    region: "North",
  },
  {
    slug: "black-river-gorges",
    name: "Black River Gorges National Park",
    image: "alexandra-falls.jpg",
    description: "Mauritius' only national park with over 50km of hiking trails through endemic forests and stunning viewpoints.",
    categories: ["all", "hiking", "land", "adventure"],
    region: "South West",
  },
];

// Get activities by category
export function getActivitiesByCategory(category: ActivityCategory): Activity[] {
  if (category === "all") {
    return ACTIVITIES;
  }
  return ACTIVITIES.filter(activity => activity.categories.includes(category));
}

// Get featured activities
export function getFeaturedActivities(): Activity[] {
  return ACTIVITIES.filter(activity => activity.featured);
}

// Get activity by slug
export function getActivityBySlug(slug: string): Activity | null {
  return ACTIVITIES.find(activity => activity.slug === slug) || null;
}

export interface PricingOption {
  name: string;
  price: number;
  description?: string;
}

export interface ActivityDetails {
  slug: string;
  name: string;
  region: Region;
  coordinates: Coordinates;
  tagline: string;
  description: string[];
  highlights: string[];
  tips: string[];
  images: string[];
  heroImage?: string;
  categories: ActivityCategory[];
  pricing?: PricingOption[];
  /** When set, "Book Now" is active (orange) and links here; otherwise shows "Coming soon" and is inactive. */
  bookingUrl?: string;
  duration?: string;
  location?: string;
  bestTime?: string;
  difficulty?: "Easy" | "Moderate" | "Challenging" | "Easy to Moderate" | "Easy to Challenging" | "Moderate to Challenging";
  included?: string[];
  notIncluded?: string[];
  whatToBring?: string[];
  relatedActivities?: string[];
}

export const ACTIVITY_DETAILS: Record<string, ActivityDetails> = {
  // ========== CATAMARAN CRUISES ==========
  "catamaran-cruises": {
    slug: "catamaran-cruises",
    name: "Catamaran Cruises",
    region: "Various",
    coordinates: [-20.0122, 57.58],
    tagline: "Could this be the best activity throughout your holiday in Mauritius?",
    description: [
      "From stunning beaches, superb skies and palm trees, there's nothing like a beach vacation to an island; except when it comes with a whole package like a catamaran cruise!",
      "You have many options when it comes to Catamaran Cruises in Mauritius! Choose from cruises to Bénitiers Island, Ile aux Cerfs, Ilot Gabriel, or opt for a unique live-on-board experience.",
      "But are you sure that you want your cruise to be during the day? In Mauritius, book your cruise in the afternoon for a wonderful sunset cruise! Not enough? Then you might have to book a night on board for a truly unique experience!"
    ],
    highlights: [
      "Sail on crystal-clear turquoise waters",
      "Snorkeling in pristine marine environments",
      "Delicious BBQ lunch with unlimited drinks",
      "Visit stunning islands and sandbars",
      "Sunset cruises with breathtaking views"
    ],
    tips: [
      "Book a sunset cruise for magical photography opportunities",
      "Bring reef-safe sunscreen to protect the marine environment",
      "The west coast offers calmer waters most of the year",
      "Consider a live-on-board experience for a unique adventure"
    ],
    images: [
      "catamaran-cruises-in-mauritius.jpg",
      "sunset-catamaran-cruise.jpg",
      "catamaran-tours-with-oceane.jpg",
      "ile-aux-benitiers.jpg",
      "onelove.jpg",
      "boattour-in-mauritius.jpg",
      "oceane-boat-tour.jpg",
      "one-love-boat-tour.jpg",
      "one-love.jpg",
      "onelove-boat-tour-in-mauritius.jpg"
    ],
    categories: ["all", "best-seller", "sea"],
    pricing: [
      { name: "Sunset Cruise (North)", price: 29, description: "Departs from Grand Bay" },
      { name: "Ilot Gabriel Cruise", price: 39, description: "Full day with lunch & drinks" },
      { name: "Dolphins + Bénitiers Island", price: 55, description: "See dolphins in their natural habitat" },
      { name: "Ile aux Cerfs Cruise", price: 59, description: "Visit the famous paradise island" },
      { name: "Live on Board", price: 790, description: "Overnight sailing experience" }
    ],
    duration: "Full day (8:30am - 4:30pm) or Sunset (3pm - 7pm)",
    location: "Departures from Grand Bay, Trou d'Eau Douce, or Black River",
    bestTime: "Year-round, best conditions May to December",
    included: ["Transfers from hotel", "BBQ lunch", "Unlimited drinks", "Snorkeling equipment", "Professional crew"],
    notIncluded: ["Personal expenses", "Tips for crew"],
    whatToBring: ["Swimwear", "Towel", "Sunscreen", "Camera", "Hat"],
    relatedActivities: ["swim-with-dolphins", "ile-aux-cerfs", "ile-aux-benitiers"]
  },

  "catamaran-ile-aux-benitiers": {
    slug: "catamaran-ile-aux-benitiers",
    name: "Catamaran Cruise - Ile aux Bénitiers",
    region: "West",
    coordinates: [-20.4167, 57.3333],
    tagline: "Catamaran cruise to Ile aux Bénitiers with the best photo spots in Mauritius—dolphins, Crystal Rock, snorkeling, and Sega on the way back.",
    description: [
      "Catamaran cruise to Ile aux Bénitiers, but not just! This cruise comes with a combination of the best photo spots in Mauritius. This is indeed the best opportunity to not only explore more of Mauritius and its activities but also to level up your Instagram game!",
      "We start with a dolphin excursion along the catamaran and head for a swim to the famous Crystal Rock; surrounded by a pristine lagoon, typically warm, shallow and enclosed, with stunning scenery all round, this location is just good for the spirit! The catamaran cruise also stops at several spots that are popular for snorkeling. With lively corals, snorkel your way through the unique marine life Mauritius has to offer. Thereafter, lunch is served on Bénitiers Island. You will also have plenty of time to stroll around the island.",
      "Get into some serious Mauritius spirit and culture on your way back—join the crew for some typical Mauritian music and dance to the sounds of Sega!"
    ],
    highlights: [
      "Dolphin excursion along the catamaran",
      "Swim at the famous Crystal Rock",
      "Snorkeling at several lively coral spots",
      "Lunch on Bénitiers Island with time to explore",
      "Mauritian music and Sega on the return sail"
    ],
    tips: [
      "Requests for special menu due to medical restrictions and others are required to be placed beforehand."
    ],
    images: [
      "ile-aux-benitiers.jpg",
      "ile-aux-benitiers-2.jpg"
,
      "dolphin-experince-in-mauritius.jpg",
      "dolphin-in-mauritius.jpg",
      "dolphin-swim-experince.jpg",
      "dolphin-swim-in-mauritius-on-the-west-coast.jpg",
      "ile-aux-benitiers-2.jpg",
      "ile-aux-benitiers-in-mauritius.jpg",
      "ile-aux-benitiers-morning.jpg",
      "le-morne-speedboat-tours.jpg",
      "speed-boat-one-love.jpg",
      "speedboat-tours-in-mauritius.jpg"
    ],
    categories: ["all", "sea"],
    pricing: [
      { name: "Price per adult", price: 55, description: "Full day cruise with dolphins, Crystal Rock, snorkeling & lunch" }
    ],
    duration: "Full day",
    location: "West coast (dolphin area and Ile aux Bénitiers)",
    bestTime: "Year-round",
    whatToBring: ["Swimwear", "Towel", "Sunscreen", "Camera", "Hat"],
    relatedActivities: ["swim-with-dolphins", "catamaran-cruises", "catamaran-ile-aux-cerfs"]
  },

  "catamaran-ile-aux-cerfs": {
    slug: "catamaran-ile-aux-cerfs",
    name: "Catamaran Cruise - Ile aux Cerfs",
    region: "East",
    coordinates: [-20.27222, 57.80417],
    tagline: "A full enchanting day on the iconic island of Ile aux Cerfs—snorkeling, barbecue lunch, and time on the famous white-sand beach.",
    description: [
      "Could this be the best activity throughout your holiday in Mauritius? From stunning beaches, superb skies and palm trees, there's nothing like a beach vacation to Ile aux Cerfs; except … when it comes with a whole package like a catamaran cruise to Ile aux Cerfs!",
      "Be ready for a full enchanting day on the iconic island of Ile aux Cerfs, best known for its clear waters, virgin surroundings and white-bone sand! Your catamaran experience is packed with a snorkeling session and a barbecue lunch before you get dropped off for the time of your life at Ile aux Cerfs. Once there, you'll be reminded of your pre-trip shenanigans to Mauritius—Ile aux Cerfs is all of what you've probably come across while you googled for \"must-see places\" in Mauritius! The area is also known for water sports such as kayaking, canoeing and parasailing. If you prefer to kick back and relax, there are plenty of private and peaceful spots.",
      "Once back on board the catamaran, you will sail back to the jetty along with some good Mauritian vibes and tea time (by the sea, literally!)."
    ],
    highlights: [
      "Snorkeling session and barbecue lunch",
      "Full day on Ile aux Cerfs (clear waters, white sand)",
      "Water sports available: kayaking, canoeing, parasailing",
      "Peaceful spots to relax",
      "Mauritian vibes and tea on the return sail"
    ],
    tips: [
      "Requests for special menu due to medical restrictions and others are required to be placed beforehand."
    ],
    images: [
      "ile-aux-cerfs-beach-in-mauritius.jpg",
      "ile-aux-cerfs.jpg"
    ],
    categories: ["all", "sea"],
    pricing: [
      { name: "Price per adult", price: 59, description: "Full day cruise with snorkeling, BBQ lunch & island time" }
    ],
    bookingUrl: "https://www.klook.com/activity/183705-le-aux-cerfs-lighthouse-island-le-au-phare-one-day-island-hopping-snorkeling-tour/",
    duration: "Full day",
    location: "East coast (Trou d'Eau Douce area to Ile aux Cerfs)",
    bestTime: "Year-round",
    whatToBring: ["Swimwear", "Towel", "Sunscreen", "Camera", "Hat"],
    relatedActivities: ["catamaran-cruises", "catamaran-ile-aux-benitiers", "ile-aux-cerfs"]
  },

  // ========== HELICOPTER TOURS ==========
  "helicopter-tour": {
    slug: "helicopter-tour",
    name: "Helicopter Tours",
    region: "Various",
    coordinates: [-20.16, 57.5],
    tagline: "See Mauritius from above and witness the iconic underwater waterfall",
    description: [
      "A Helicopter Tour in Mauritius will take your breath away as you get up close and stunning views of Mauritius's scenery and coastal views. It is sure to be a day you'll never forget.",
      "Helicopter Tours including helicopter transfers are the best way to experience the beauty of Mauritius! Depart from the helipad located at the airport, Triolet, specific hotels or handpicked locations.",
      "The highlight stays the iconic underwater waterfall of Mauritius at Le Morne. One of the best things to do in Mauritius. Scenic tours to the northern islands of Coin de Mire and Ilot Gabriel are also available."
    ],
    highlights: [
      "See the famous underwater waterfall illusion",
      "Panoramic views of Le Morne peninsula",
      "Fly over Black River Gorges National Park",
      "Spot the northern islands from above",
      "Professional pilots with commentary"
    ],
    tips: [
      "Book the 40-minute tour for the complete island experience",
      "Morning flights offer the clearest visibility",
      "Request a door-off flight for unobstructed photography",
      "The south helipad offers the best value for underwater waterfall tours"
    ],
    images: [
      "corail-helicopter-tour.jpg",
      "helicopter-ride-corail.jpg",
      "helicopter-tour-with-corail.jpg",
      "underwater-waterfall-in-mauritius.jpg"
,
      "corail-helicopter-pilot.jpg",
      "helicopter-ride-with-corail.jpg",
      "seaplane-in-the-north-of-mauritius.jpg"
    ],
    categories: ["all", "best-seller", "air", "unique"],
    pricing: [
      { name: "20-min Northern Tour", price: 235, description: "Grand Bay, Coin de Mire, Flat Island" },
      { name: "30-min Coastal Tour", price: 490, description: "East coast and islands" },
      { name: "40-min Complete Tour", price: 350, description: "West, South, underwater waterfall" },
      { name: "60-min Ultimate Tour", price: 495, description: "Full island exploration" }
    ],
    duration: "20 to 60 minutes flight time",
    location: "Airport, Triolet helipad, or hotel pickup",
    bestTime: "Year-round, clear mornings are best",
    difficulty: "Easy",
    included: ["Hotel transfers", "Safety briefing", "Insurance", "Professional pilot"],
    whatToBring: ["Camera", "Sunglasses", "Comfortable clothing"],
    relatedActivities: ["seaplane-le-morne", "underwater-waterfall", "skydiving"]
  },

  // ========== UNDERWATER WATERFALL TOUR ==========
  "underwater-waterfall": {
    slug: "underwater-waterfall",
    name: "Underwater Waterfall Tour",
    region: "South West",
    coordinates: [-20.452424, 57.312697],
    tagline: "Witness the incredible optical illusion of the underwater waterfall from above",
    description: [
      "Witness the incredible optical illusion of the underwater waterfall from above by helicopter or seaplane. Off the coast of Le Morne on the southwest of Mauritius, sand and silt on the ocean floor are carried by currents in a way that creates a stunning visual effect resembling a waterfall flowing beneath the surface.",
      "This natural phenomenon is one of the most iconic aerial views in the world and has been featured in countless films and documentaries. The best way to experience it is from the air—either on a helicopter tour or a seaplane flight that takes you right over the spot.",
      "Tours typically depart from the airport, Triolet helipad, or selected hotels. Morning flights offer the clearest visibility and the most dramatic contrast between the turquoise lagoon and the deeper blue where the 'waterfall' appears."
    ],
    highlights: [
      "See the famous underwater waterfall optical illusion from above",
      "Fly over Le Morne peninsula and the southwest coast",
      "Available by helicopter or seaplane",
      "One of the most photographed aerial views in the Indian Ocean",
      "Professional pilots with commentary"
    ],
    tips: [
      "Book a morning flight for the best light and visibility",
      "The 20–40 minute tours usually include the underwater waterfall route",
      "Request a window seat for the best views and photography",
      "Combine with a Le Morne helicopter tour for the full experience"
    ],
    images: [
      "underwater-waterfall-in-mauritius.jpg",
      "corail-helicopter-tour.jpg",
      "helicopter-ride-corail.jpg",
      "seaplane-in-the-north-of-mauritius.jpg"
    ],
    categories: ["all", "unique", "air"],
    pricing: [
      { name: "Helicopter Tour (20–40 min)", price: 235, description: "Includes underwater waterfall flyover" },
      { name: "Seaplane Experience", price: 350, description: "Scenic flight over Le Morne and the illusion" }
    ],
    duration: "20 to 40 minutes flight time",
    location: "Le Morne coast (viewed from air); departures from airport or Triolet helipad",
    bestTime: "Year-round; clear mornings are best for visibility",
    difficulty: "Easy",
    included: ["Hotel transfers", "Safety briefing", "Professional pilot"],
    whatToBring: ["Camera", "Sunglasses", "Comfortable clothing"],
    relatedActivities: ["helicopter-tour", "hiking-le-morne", "seaplane-le-morne"]
  },

  // ========== SWIM WITH DOLPHINS ==========
  "swim-with-dolphins": {
    slug: "swim-with-dolphins",
    name: "Swim with Dolphins",
    region: "West",
    coordinates: [-20.32, 57.37],
    tagline: "Experience the magic of swimming with wild dolphins in their natural habitat",
    description: [
      "Swimming with dolphins in Mauritius is a truly magical experience that connects you with these intelligent and playful creatures in their natural ocean environment.",
      "The west coast of Mauritius, particularly around Tamarin Bay, is home to spinner and bottlenose dolphins that can be spotted almost daily in the early morning hours.",
      "Unlike captive dolphin experiences, here you'll encounter wild dolphins in their natural habitat, observing their natural behaviors as they swim, play, and interact with each other."
    ],
    highlights: [
      "Swim alongside wild spinner and bottlenose dolphins",
      "Early morning departure for best dolphin sightings",
      "Eco-friendly and respectful approach to wildlife",
      "Crystal clear waters of the west coast",
      "Experienced guides who know dolphin behavior"
    ],
    tips: [
      "Early morning tours (6:30am) have the highest success rate",
      "Be quiet and calm in the water to not startle the dolphins",
      "Dolphins are wild - sightings are likely but not guaranteed",
      "Combine with a trip to Ile aux Bénitiers for a full day adventure"
    ],
    images: [
      "swimming-with-dolphins.jpg",
      "dolphin-swim-in-mauritius.jpg",
      "dolphin-boat-tours.jpg",
      "swim-with-dolphins.jpg",
    ],
    categories: ["all", "best-seller", "sea", "unique"],
    pricing: [
      { name: "Dolphin Swim Experience", price: 42, description: "Morning tour with snorkeling" },
      { name: "Dolphins + Bénitiers Island", price: 55, description: "Full day including island visit" }
    ],
    bookingUrl: "https://www.klook.com/activity/85499-7-hour-swimming-wild-dolphins-lunch-on-benitiers-island-transfer-join-tour-mauritius/",
    duration: "3-4 hours (early morning)",
    location: "Tamarin Bay, West Coast",
    bestTime: "Year-round, early mornings are essential",
    difficulty: "Moderate",
    included: ["Boat trip", "Snorkeling equipment", "Guide", "Light refreshments"],
    whatToBring: ["Swimwear", "Towel", "Waterproof camera", "Sunscreen", "Motion sickness medication if needed"],
    relatedActivities: ["catamaran-cruises", "whale-watching", "snorkeling-blue-bay"]
  },

  // ========== LA VALLEE DES COULEURS ==========
  "la-vallee-des-couleurs": {
    slug: "la-vallee-des-couleurs",
    name: "La Vallée des Couleurs Nature Park",
    region: "South",
    coordinates: [-20.45, 57.5],
    tagline: "Discover the famous 23-coloured earth and thrilling adventure activities",
    description: [
      "Since the 23-coloured earth was discovered on the 4th of July 1998, La Vallée des Couleurs Nature Park has become one of the most famous and unique attractions of the island, fascinating Mauritians and foreigners alike.",
      "Nature lovers are bound to love this place; it is quite a unique experience with the indigenous fauna and flora that abound in the park. Visitors are treated with a range of natural landscapes, including plateaus, mountains, valleys, craters and crater-lakes.",
      "The main attraction is the fascinating 23-coloured earth whose origin dates back to millions of years following the eruption of the Bassin Blanc volcano – its ashes, which bear witness to that event, are unique in the world."
    ],
    highlights: [
      "See the unique 23-coloured earth formation",
      "Four beautiful waterfalls within the park",
      "Adventure activities: zipline, quad biking, buggy rides",
      "Endemic wildlife including tortoises and pink pigeons",
      "Panoramic views of the South Coast"
    ],
    tips: [
      "Arrive early to avoid crowds and heat",
      "Wear comfortable walking shoes for the trails",
      "The zipline offers incredible views of the valley",
      "Don't miss the Nepalese bridge for adventure seekers"
    ],
    images: [
      "seven-coloured-earth-2.jpg",
      "chamarel-waterfall.jpg"
,
      "coloured-earth-1.jpg",
      "the-seven-coloured-earth-in-chamarel.jpg",
      "the-seven-coloured-earth.jpg"
,
      "deux-cocos-island.jpg",
      "ile-des-deux-cocos-in-blue-bay-min.jpg",
      "ile-des-deux-cocos-min.jpg",
      "seaturtle-in-blue-bay.jpg",
      "snorkeling-and-boat-tours-blue-bay.jpg",
      "snorkeling-spot-at-le-morne.jpg",
      "snorkeling-spot-in-mauritius-le-morne.jpg"
    ],
    categories: ["all", "adventure", "land"],
    pricing: [
      { name: "Park Entry", price: 8, description: "Access to trails and viewpoints" },
      { name: "Zipline Experience", price: 26, description: "Thrilling flight over the valley" },
      { name: "Quad Biking", price: 45, description: "Off-road adventure" }
    ],
    duration: "Half day to full day",
    location: "Chamouny, South Mauritius",
    bestTime: "Year-round, mornings are cooler",
    difficulty: "Easy to Challenging",
    included: ["Park entry", "Trail access", "Wildlife viewing"],
    whatToBring: ["Comfortable shoes", "Hat", "Sunscreen", "Camera", "Water bottle"],
    relatedActivities: ["chamarel-waterfall", "seven-coloured-earth", "seven-waterfalls", "quad-biking"]
  },

  // ========== CHAMAREL WATERFALL ==========
  "chamarel-waterfall": {
    slug: "chamarel-waterfall",
    name: "Chamarel Waterfall",
    region: "South West",
    coordinates: [-20.440229, 57.373342],
    tagline: "One of the most beautiful and iconic waterfalls in Mauritius",
    description: [
      "Mauritius is filled with mystical waterfalls that are just waiting to be discovered and enjoyed, and one of them is the famous Chamarel Waterfall! Ask locals and visitors their favorite waterfalls and this one will surely make its way to the top of the list!",
      "This waterfall holds both historical and natural significance for Mauritius as it showcases old volcanic formations of a few million years along with the most beautiful natural phenomenon of falling water.",
      "The waterfall is sourced by River Saint-Denis that streams its pure waters along the proximate villages and gently snakes its way to form a magnificent waterfall. Swimming is permitted at the base of the falls!"
    ],
    highlights: [
      "100-meter tall waterfall surrounded by lush vegetation",
      "Swimming permitted at the base of the falls",
      "Best viewed from the 7 Coloured Earth viewpoint",
      "Combines perfectly with Chamarel village attractions",
      "Stunning photo opportunities"
    ],
    tips: [
      "Visit after rainfall for the most impressive water flow",
      "Combine with a visit to the 7 Coloured Earth nearby",
      "The upper deck viewpoint offers the best photography angles",
      "Morning visits have better lighting for photos"
    ],
    images: [
      "eau-bleue-waterfall-in-mauritius.jpg",
      "under-the-waterfall-at-7-cascades.jpg"
,
      "each-bleue-waterfall.jpg",
      "eau-bleue-waterfall-in-cluney.jpg",
      "iconic-eau-bleu-waterfall.jpg"
,
      "andrea-lodge-hike-1.jpg",
      "andrea-lodge-hike-2.jpg",
      "andrea-lodge-hike-3.jpg",
      "andrea-lodge-walk-green-forest.jpg",
      "andtrea-lodge-cliff.jpg",
      "cliffs-at-andrea-lodge.jpg"
,
      "7-cascades-hike-in-mauritius.jpg",
      "7-cascades-in-mauritius.jpg",
      "7-waterfall-bottom-shot.jpg",
      "7-waterfall-hike-2.jpg",
      "7-waterfalls-1.jpg",
      "7-waterfalls-2.jpg",
      "7-waterfalls-3.jpg",
      "7-waterfalls-4.jpg",
      "7-waterfalls-5.jpg",
      "7-waterfalls-6.jpg",
      "7-waterfalls-bird-eye-view.jpg",
      "7-waterfalls-hike-mauritius.jpg",
      "7-waterfalls-hike-view-point.jpg",
      "7-waterfalls-view-points.jpg",
      "full-day-hike-at-7-waterfall.jpg",
      "seven-waterfall.jpg",
      "under-a-waterfall-in-mauritius.jpg"
,
      "coloured-earth-1.jpg",
      "the-seven-coloured-earth-in-chamarel.jpg",
      "the-seven-coloured-earth.jpg"
    ],
    categories: ["all", "land"],
    pricing: [
      { name: "Entrance Fee", price: 4, description: "Access to waterfall viewpoints" }
    ],
    duration: "1-2 hours",
    location: "Chamarel, South-West Mauritius",
    bestTime: "Year-round, best after rainfall",
    difficulty: "Easy",
    whatToBring: ["Camera", "Swimwear (if swimming)", "Comfortable shoes", "Water"],
    relatedActivities: ["la-vallee-des-couleurs", "seven-waterfalls", "seven-cascades"]
  },

  // ========== HIKING LE MORNE ==========
  "hiking-le-morne": {
    slug: "hiking-le-morne",
    name: "Hiking Le Morne Brabant",
    region: "South West",
    coordinates: [-20.46, 57.31],
    tagline: "Climb the iconic UNESCO World Heritage mountain for breathtaking views",
    description: [
      "Le Morne Brabant is a UNESCO World Heritage Site and one of the most iconic landmarks in Mauritius. This basaltic mountain rises 556 meters above the lagoon and offers one of the most rewarding hikes on the island.",
      "The mountain holds deep historical significance as a refuge for escaped slaves in the 18th and 19th centuries. Today, it stands as a symbol of resistance and freedom.",
      "The hike rewards you with spectacular 360-degree panoramic views of the lagoon, the underwater waterfall illusion, and the southwest coastline of Mauritius."
    ],
    highlights: [
      "Spectacular 360-degree panoramic views",
      "UNESCO World Heritage Site",
      "See the underwater waterfall from above",
      "Rich historical and cultural significance",
      "Challenging but achievable climb"
    ],
    tips: [
      "Start early (6am) to avoid the midday heat",
      "A licensed guide is required for the upper section",
      "Bring at least 2 liters of water per person",
      "Wear proper hiking shoes with good grip"
    ],
    images: [
      "horse-riding-at-le-morne.jpg",
      "view-from-piton-mountain.jpg"
,
      "horse-riding-in-the-morningat-le-morne.jpg",
      "horseriding-activity-in-mauritius-le-morne.jpg",
      "le-morne-hike-1.jpg",
      "le-morne-hike-2.jpg",
      "le-morne-hike-cross.jpg",
      "le-morne-hike-start.jpg",
      "le-morne-le-paradis-snorkling-spot.jpg",
      "le-morne-mountain-climbing.jpg",
      "view-on-top-of-le-morne.jpg"
    ],
    categories: ["all", "best-seller", "hiking", "land"],
    pricing: [
      { name: "Guided Hike", price: 49, description: "Licensed guide required for upper section" }
    ],
    bookingUrl: "https://www.klook.com/activity/192995-mauritius-from-above-le-morne-brabant-scenic-guided-hike/",
    duration: "4-5 hours round trip",
    location: "Le Morne Peninsula, South-West",
    bestTime: "Year-round, early mornings are best",
    difficulty: "Challenging",
    included: ["Licensed guide", "Safety briefing"],
    whatToBring: ["Hiking shoes", "2L water minimum", "Snacks", "Sunscreen", "Hat", "Camera"],
    relatedActivities: ["hiking-le-pouce", "horse-riding-le-morne", "seven-waterfalls"]
  },

  // ========== SEAPLANE FLIGHT ==========
  "seaplane-le-morne": {
    slug: "seaplane-le-morne",
    name: "Seaplane Flight at Le Morne",
    region: "South West",
    coordinates: [-20.452424, 57.312697],
    tagline: "Take off from the lagoon and fly over the famous underwater waterfall",
    description: [
      "Experience the unique thrill of taking off from the turquoise lagoon of Le Morne and soaring over one of Mauritius's most spectacular natural phenomena - the underwater waterfall illusion.",
      "This scenic seaplane flight offers an unparalleled perspective of the southwest coast, combining the excitement of a seaplane takeoff and landing with breathtaking aerial views.",
      "The underwater waterfall is actually an optical illusion created by sand and silt being pushed off the underwater shelf by ocean currents, creating the appearance of a waterfall beneath the waves."
    ],
    highlights: [
      "Water takeoff and landing experience",
      "Best views of the underwater waterfall",
      "Fly over Le Morne peninsula",
      "Unique seaplane adventure",
      "Professional pilots"
    ],
    tips: [
      "Book for morning flights for the clearest views",
      "The underwater waterfall is best seen from above",
      "Request a window seat for the best photos",
      "Combine with a helicopter tour for different perspectives"
    ],
    images: [
      "seaplane-at-le-morne.jpg",
      "seaplane-with-islandwings.jpg",
      "underwater-waterfall-in-mauritius.jpg"
,
      "horse-riding-in-the-morningat-le-morne.jpg",
      "horseriding-activity-in-mauritius-le-morne.jpg",
      "le-morne-hike-1.jpg",
      "le-morne-hike-2.jpg",
      "le-morne-hike-cross.jpg",
      "le-morne-hike-start.jpg",
      "le-morne-le-paradis-snorkling-spot.jpg",
      "le-morne-mountain-climbing.jpg",
      "view-on-top-of-le-morne.jpg"
,
      "hiking-le-pouce-mountain.jpg",
      "le-pouce-1.jpg",
      "le-pouce-2.jpg",
      "le-pouce-3.jpg",
      "le-pouce-hike.jpg",
      "le-pouce-mountain.jpg"
    ],
    categories: ["all", "air", "unique"],
    pricing: [
      { name: "Le Morne Seaplane Tour", price: 215, description: "Flight over underwater waterfall" }
    ],
    bookingUrl: "https://www.klook.com/activity/194279-private-seaplane-tour-with-scenic-views-of-mauritius/",
    duration: "15-20 minutes flight time",
    location: "Le Morne Lagoon",
    bestTime: "Year-round, clear mornings",
    difficulty: "Easy",
    included: ["Safety briefing", "Flight experience"],
    whatToBring: ["Camera", "Sunglasses"],
    relatedActivities: ["helicopter-tour", "underwater-waterfall", "seaplane-north"]
  },

  // ========== QUAD BIKING (HERITAGE) ==========
  "quad-biking": {
    slug: "quad-biking",
    name: "Quad Biking at Heritage Nature Reserve",
    region: "South",
    coordinates: [-20.44, 57.41],
    tagline: "Explore the wild beauty of Mauritius on a thrilling quad bike adventure",
    description: [
      "Experience the thrill of quad biking through the stunning Heritage Nature Reserve, one of the largest private nature reserves in Mauritius covering over 2,500 hectares in Bel Ombre.",
      "Navigate through diverse terrain including forests, fields, and scenic trails while taking in the natural beauty of the south coast. The reserve is home to deer, wild boar, and various endemic bird species.",
      "Whether you're a beginner or experienced rider, the trails cater to all skill levels with professional guides ensuring a safe and exciting adventure."
    ],
    highlights: [
      "2,500 hectares of natural terrain to explore",
      "Views of mountains, forests, and coastline",
      "Suitable for beginners and experienced riders",
      "Wildlife spotting opportunities",
      "Professional guides and safety equipment"
    ],
    tips: [
      "Wear long pants and closed-toe shoes",
      "Expect to get dusty - don't wear your best clothes",
      "Listen carefully to the safety briefing",
      "The afternoon tours offer beautiful lighting"
    ],
    images: [
      "lion-mountain-at-ferney.jpg",
      "boat-tour-at-le-morne.jpg",
      "seven-coloured-earth-2.jpg"
    ],
    categories: ["all", "best-seller", "adventure", "land"],
    pricing: [
      { name: "Quad Biking Experience", price: 118, description: "2-hour guided tour" }
    ],
    duration: "2 hours",
    location: "Heritage Nature Reserve, Bel Ombre",
    bestTime: "Year-round",
    difficulty: "Moderate",
    included: ["Quad bike", "Helmet", "Guide", "Safety briefing"],
    whatToBring: ["Long pants", "Closed shoes", "Sunglasses", "Bandana for dust"],
    relatedActivities: ["horse-riding-le-morne", "la-vallee-des-couleurs", "seven-waterfalls"]
  },

  // ========== SCUBA DIVING ==========
  "scuba-diving": {
    slug: "scuba-diving",
    name: "Scuba Diving",
    region: "Various",
    coordinates: [-20.2824, 57.3625],
    tagline: "Explore incredible underwater worlds around the island",
    description: [
      "Mauritius offers world-class diving with crystal clear waters, vibrant coral reefs, and an impressive variety of marine life. From beginner-friendly shallow dives to challenging deep wrecks, there's something for every diver.",
      "The island's dive sites feature everything from colorful coral gardens to dramatic underwater rock formations, swim-throughs, and famous shipwrecks that have become artificial reefs.",
      "With water temperatures ranging from 22-28°C year-round and visibility often exceeding 20 meters, Mauritius is a diver's paradise waiting to be explored."
    ],
    highlights: [
      "Year-round diving with excellent visibility",
      "Diverse marine life including turtles and rays",
      "Historic shipwreck dives",
      "PADI certified dive centers",
      "Suitable for beginners to advanced divers"
    ],
    tips: [
      "Book a discover scuba diving session if you're new",
      "The best visibility is from October to December",
      "Don't dive within 24 hours of flying",
      "Blue Bay Marine Park offers the best coral diversity"
    ],
    images: [
      "best-diving-spot-in-mauritius.jpg",
      "free-dive-in-mauritius.jpg",
      "snorkeling-in-mauritius.jpg"
    ],
    categories: ["all", "sea", "adventure"],
    duration: "Half day (2 dives)",
    location: "Multiple locations around the island",
    bestTime: "October to December for best visibility",
    difficulty: "Easy to Challenging",
    included: ["Equipment", "Guide", "Boat trip"],
    whatToBring: ["Swimwear", "Towel", "Certification card (if certified)"],
    relatedActivities: ["snorkeling-blue-bay", "underwater-scooter", "undersea-walk"]
  },

  // ========== UNDERWATER SCOOTER ==========
  "underwater-scooter": {
    slug: "underwater-scooter",
    name: "Underwater Scooter",
    region: "Various",
    coordinates: [-20.0074, 57.5783],
    tagline: "Explore the underwater world effortlessly - no diving experience required!",
    description: [
      "The underwater scooter experience offers a unique way to explore the marine world without any diving certification or experience. Simply sit on the scooter and glide through the crystal clear waters.",
      "Your head stays dry inside a special helmet that provides a continuous air supply, allowing you to breathe normally while observing the colorful fish and coral below.",
      "This activity is perfect for non-swimmers and those who want to experience underwater exploration without the commitment of learning to dive."
    ],
    highlights: [
      "No swimming or diving experience needed",
      "Head stays completely dry",
      "Natural breathing throughout",
      "See tropical fish and coral up close",
      "Professional guides accompany you"
    ],
    tips: [
      "This is perfect for non-swimmers",
      "You don't need to know how to swim",
      "Great for all ages (typically 8+)",
      "Wear comfortable swimwear"
    ],
    images: [
      "underwater-scooter.jpg",
      "undersea-walk-in-mauritius.jpg",
      "walk-under-water-in-mauritius.jpg",
      "walk-underwater-in-mauritius.jpg"
    ],
    categories: ["all", "sea", "adventure", "unique"],
    pricing: [
      { name: "Underwater Scooter Experience", price: 75, description: "30-minute underwater adventure" }
    ],
    duration: "30 minutes underwater",
    location: "Grand Bay or Belle Mare",
    bestTime: "Year-round",
    difficulty: "Easy",
    included: ["Equipment", "Guide", "Safety briefing", "Photos (optional)"],
    whatToBring: ["Swimwear", "Towel"],
    relatedActivities: ["undersea-walk", "snorkeling-blue-bay", "scuba-diving"]
  },

  // ========== HORSE RIDING LE MORNE ==========
  "horse-riding-le-morne": {
    slug: "horse-riding-le-morne",
    name: "Horse Riding at Le Morne",
    region: "South West",
    coordinates: [-20.455, 57.32],
    tagline: "Ride along pristine beaches at sunrise or sunset for an unforgettable experience",
    description: [
      "Experience the magic of horse riding along the pristine beaches of Le Morne, one of the most beautiful coastal areas in Mauritius. This is truly a bucket-list experience.",
      "Ride at sunrise or sunset when the light paints the sky in spectacular colors, with the iconic Le Morne Brabant mountain as your backdrop.",
      "Both beginners and experienced riders are welcome, with well-trained horses and professional guides ensuring a safe and memorable experience."
    ],
    highlights: [
      "Ride along one of the most beautiful beaches in Mauritius",
      "Stunning views of Le Morne mountain",
      "Sunrise and sunset options available",
      "Suitable for all experience levels",
      "Includes beach and water riding"
    ],
    tips: [
      "Book the sunrise ride for the most magical light",
      "Wear long pants to prevent chafing",
      "Bring a change of clothes if doing water riding",
      "Don't forget your camera for incredible photos"
    ],
    images: [
      "horse-riding-le-morne.jpg",
      "horse-riding-on-the-beach-in-mauritius.jpg",
      "horse-riding-at-le-morne-mauritius.jpg",
      "horseriding-on-the-beach-in-mauritius.jpg",
    ],
    categories: ["all", "land", "best-seller"],
    pricing: [
      { name: "Beach Horse Riding", price: 59, description: "1.5 hour beach ride" }
    ],
    duration: "1.5 hours",
    location: "Le Morne Beach",
    bestTime: "Sunrise or Sunset",
    difficulty: "Easy to Moderate",
    included: ["Horse", "Guide", "Safety equipment", "Training for beginners"],
    whatToBring: ["Long pants", "Closed shoes", "Camera", "Sunscreen"],
    relatedActivities: ["horse-riding", "hiking-le-morne", "sunset-cruise"]
  },

  // ========== SEVEN WATERFALLS ==========
  "seven-waterfalls": {
    slug: "seven-waterfalls",
    name: "Seven Waterfalls Hike",
    region: "South West",
    coordinates: [-20.375, 57.435],
    tagline: "Trek through lush forests to discover the magical seven cascades",
    description: [
      "The Seven Waterfalls, also known as Tamarind Falls, is one of the most beautiful hiking destinations in Mauritius. This series of cascading waterfalls offers stunning scenery and natural swimming pools.",
      "The trek takes you through dense native forest, across rivers, and past seven magnificent waterfalls, each with its own unique character and beauty.",
      "For the adventurous, swimming in the natural pools at the base of the falls is a refreshing reward after the hike."
    ],
    highlights: [
      "Seven stunning waterfalls to discover",
      "Natural swimming pools",
      "Lush native forest scenery",
      "Various difficulty levels available",
      "Experienced local guides"
    ],
    tips: [
      "Bring water shoes for river crossings",
      "Start early to have time for swimming",
      "The full trail is challenging - assess your fitness level",
      "Bring a dry bag for electronics"
    ],
    images: [
      "7-waterfall-hike.jpg",
      "hiking-7-cascades.jpg",
      "under-the-waterfall-at-7-cascades.jpg"
,
      "onelove.jpg",
      "boattour-in-mauritius.jpg",
      "oceane-boat-tour.jpg",
      "one-love-boat-tour.jpg",
      "one-love.jpg",
      "onelove-boat-tour-in-mauritius.jpg"
    ],
    categories: ["all", "hiking", "adventure"],
    pricing: [
      { name: "Guided Waterfall Hike", price: 55, description: "Full day guided adventure" }
    ],
    duration: "4-6 hours",
    location: "Henrietta, Central Mauritius",
    bestTime: "After rainfall for the best water flow",
    difficulty: "Moderate to Challenging",
    included: ["Licensed guide", "Safety equipment"],
    whatToBring: ["Hiking shoes", "Water shoes", "Swimwear", "Dry bag", "2L water", "Snacks"],
    relatedActivities: ["seven-cascades", "hiking-le-pouce", "hiking-le-morne"]
  },

  // ========== SKYDIVING ==========
  "skydiving": {
    slug: "skydiving",
    name: "Skydiving",
    region: "Various",
    coordinates: [-20.23, 57.53],
    tagline: "Experience the ultimate adrenaline rush over paradise",
    description: [
      "Skydiving in Mauritius offers the ultimate adrenaline experience combined with some of the most spectacular views imaginable. Free fall over turquoise lagoons, lush mountains, and pristine beaches.",
      "Tandem jumps are available for first-timers, allowing you to experience the thrill while attached to an experienced instructor who handles all the technical aspects.",
      "The jump typically takes place from 10,000-13,000 feet, giving you around 45 seconds of freefall at speeds up to 200 km/h before the parachute opens for a peaceful descent."
    ],
    highlights: [
      "Free fall at up to 200 km/h",
      "Incredible aerial views of Mauritius",
      "Professional tandem instructors",
      "Video and photo packages available",
      "Safe and regulated experience"
    ],
    tips: [
      "Book early as spots fill up quickly",
      "Don't eat a heavy meal before jumping",
      "Wear comfortable, fitted clothing",
      "You can't dive within 24 hours of jumping"
    ],
    images: [
      "skydiving-in-mauritius.jpg",
      "parasailing-in-mauritius.jpg",
      "parasailing-longbeach.jpg"
    ],
    categories: ["all", "air", "adventure", "unique"],
    duration: "Half day (including briefing and preparation)",
    location: "Various locations",
    bestTime: "Year-round, weather dependent",
    difficulty: "Challenging",
    included: ["Tandem instructor", "All equipment", "Training", "Certificate"],
    whatToBring: ["Comfortable fitted clothing", "Closed shoes", "ID"],
    relatedActivities: ["parasailing", "helicopter-tour", "seaplane-le-morne"]
  },

  // ========== ILE AUX CERFS ==========
  "ile-aux-cerfs": {
    slug: "ile-aux-cerfs",
    name: "Ile aux Cerfs",
    region: "East",
    coordinates: [-20.27222, 57.80417],
    tagline: "Visit the most famous paradise island in Mauritius",
    description: [
      "Ile aux Cerfs is the most popular island destination in Mauritius, famous for its pristine white sand beaches, crystal clear turquoise waters, and range of water sports activities.",
      "The island offers the perfect tropical escape with excellent facilities including restaurants, bars, and a world-class 18-hole golf course designed by Bernhard Langer.",
      "Whether you're looking to relax on the beach, try parasailing, or enjoy a delicious seafood lunch, Ile aux Cerfs has something for everyone."
    ],
    highlights: [
      "Pristine white sand beaches",
      "Crystal clear swimming waters",
      "Wide range of water sports",
      "Excellent restaurants and facilities",
      "18-hole championship golf course"
    ],
    tips: [
      "Arrive early to secure a good spot on the beach",
      "The south side of the island is quieter",
      "Bring cash as some vendors don't accept cards",
      "Book a catamaran cruise for the best experience getting there"
    ],
    images: [
      "boat-tours-at-ile-aux-cerfs.jpg",
      "ile-aux-cerfs-catamaran.jpg"
    ],
    categories: ["all", "sea"],
    pricing: [
      { name: "Speedboat Transfer", price: 25, description: "Return trip from Trou d'Eau Douce" },
      { name: "Catamaran Cruise", price: 59, description: "Full day with lunch and drinks" }
    ],
    bookingUrl: "https://www.klook.com/activity/183705-le-aux-cerfs-lighthouse-island-le-au-phare-one-day-island-hopping-snorkeling-tour/",
    duration: "Full day",
    location: "East Coast, off Trou d'Eau Douce",
    bestTime: "Year-round, less crowded on weekdays",
    difficulty: "Easy",
    whatToBring: ["Swimwear", "Sunscreen", "Towel", "Cash", "Camera"],
    relatedActivities: ["catamaran-ile-aux-cerfs", "parasailing", "kayaking-ile-dambre"]
  },

  // ========== ILE AU PHARE (LIGHTHOUSE ISLAND) ==========
  "ile-au-phare": {
    slug: "ile-au-phare",
    name: "Ile au Phare (Lighthouse Island)",
    region: "East",
    coordinates: [-20.405, 57.705],
    tagline: "Island-hopping tour to historic Lighthouse Island with snorkeling and Ile aux Cerfs",
    description: [
      "Ile au Phare, also known as Lighthouse Island or Ile de la Passe, is a historic island in the Grand Port area. One-day island-hopping tours combine a visit here with Ile aux Cerfs—snorkeling, beach time, and the famous lighthouse ruins.",
      "The lighthouse marks the site of the only naval battle won by Napoleon against the British. Tours typically include boat transfer, snorkeling, and time on both islands."
    ],
    highlights: [
      "Visit Lighthouse Island (Ile au Phare) and Ile aux Cerfs",
      "Snorkeling in clear lagoons",
      "Historic lighthouse and ruins",
      "Full-day island-hopping experience"
    ],
    tips: [
      "Book in advance for peak season",
      "Bring swimwear, sunscreen, and a towel"
    ],
    images: [
      "ile-au-phare.jpg",
      "ile-aux-phare-1.jpg"
    ],
    categories: ["all", "sea"],
    pricing: [
      { name: "Island-hopping tour", price: 59, description: "Ile aux Cerfs + Lighthouse Island with snorkeling" }
    ],
    bookingUrl: "https://www.klook.com/activity/183705-le-aux-cerfs-lighthouse-island-le-au-phare-one-day-island-hopping-snorkeling-tour/",
    duration: "Full day",
    location: "East coast (Trou d'Eau Douce / Grand Port area)",
    bestTime: "Year-round",
    whatToBring: ["Swimwear", "Towel", "Sunscreen", "Camera"],
    relatedActivities: ["catamaran-ile-aux-cerfs", "ile-aux-cerfs"]
  },

  // ========== SUNSET CRUISE ==========
  "sunset-cruise": {
    slug: "sunset-cruise",
    name: "Sunset Catamaran Cruise",
    region: "North",
    coordinates: [-20.0074, 57.5783],
    tagline: "Experience a magical sunset on the ocean with drinks and music",
    description: [
      "A sunset cruise is one of the most romantic and memorable experiences in Mauritius. Watch the sun dip below the horizon while sailing on calm turquoise waters.",
      "These cruises typically depart in the late afternoon and return after dark, giving you the full experience of the golden hour and the magical colors of a tropical sunset.",
      "Enjoy unlimited drinks, music, and good company as the sky transforms from blue to orange, pink, and purple."
    ],
    highlights: [
      "Spectacular sunset views",
      "Unlimited drinks included",
      "Music and entertainment",
      "Perfect for couples and groups",
      "Calm evening sailing"
    ],
    tips: [
      "Book for a clear day for the best sunset",
      "The west coast sunsets are most spectacular",
      "Bring a light jacket as it can get cool after sunset",
      "A great way to end a day of activities"
    ],
    images: [
      "sunset-catamaran-cruise.jpg",
      "sunset-boat-tour.jpg"
    ],
    categories: ["all", "sea", "unique"],
    pricing: [
      { name: "Sunset Cruise (North)", price: 29, description: "3-hour cruise from Grand Bay" },
      { name: "Sunset Cruise (South East)", price: 35, description: "3-hour cruise" }
    ],
    duration: "3-4 hours",
    location: "Departures from Grand Bay or East Coast",
    bestTime: "Year-round, best during dry season",
    difficulty: "Easy",
    included: ["Catamaran cruise", "Unlimited drinks", "Snacks"],
    whatToBring: ["Light jacket", "Camera", "Sunglasses"],
    relatedActivities: ["catamaran-cruises", "swim-with-dolphins", "whale-watching"]
  },

  // ========== PORT LOUIS ==========
  "port-louis": {
    slug: "port-louis",
    name: "Port Louis",
    region: "North",
    coordinates: [-20.1619, 57.4989],
    tagline: "Explore the vibrant capital city with its markets, waterfront, and culture",
    description: [
      "Port Louis is the bustling capital city of Mauritius, a vibrant mix of cultures, history, and modern life. From colonial architecture to contemporary shopping malls, the city offers a fascinating glimpse into Mauritian life.",
      "The famous Central Market is a must-visit, where you can browse local produce, spices, handicrafts, and street food. The colorful umbrella alley at Caudan Waterfront has become an Instagram favorite.",
      "Don't miss the Aapravasi Ghat, a UNESCO World Heritage Site that commemorates the arrival of indentured laborers, or the historic Citadel Fort with panoramic views over the city."
    ],
    highlights: [
      "Central Market with local food and crafts",
      "Caudan Waterfront shopping and dining",
      "Famous umbrella alley",
      "UNESCO World Heritage Aapravasi Ghat",
      "Citadel Fort panoramic views"
    ],
    tips: [
      "Visit the market early morning for the best experience",
      "Try local street food like dholl puri and gateaux piments",
      "The waterfront is pleasant for evening walks",
      "Be aware of pickpockets in crowded areas"
    ],
    images: [
      "caudan-umbrella-alley-in-port-louis-caudan-waterfront.jpg"
,
      "marina-park-in-mauritius.jpg",
      "port-louis-1.jpg",
      "port-louis-2.jpg",
      "port-louis-3.jpg",
      "port-louis-4.jpg"
    ],
    categories: ["all", "land"],
    duration: "Half day to full day",
    location: "North-West Mauritius",
    bestTime: "Year-round, avoid midday heat",
    difficulty: "Easy",
    whatToBring: ["Comfortable walking shoes", "Camera", "Cash for market"],
    relatedActivities: ["chamarel-waterfall", "la-vanille-nature-park"]
  },
  
  // ========== ADDITIONAL ATTRACTIONS ==========
  "caverne-patate": {
    slug: "caverne-patate",
    name: "Caverne Patate",
    region: "Rodrigues",
    coordinates: [-19.75, 63.42],
    tagline: "Explore the mysterious underground caves of Rodrigues Island",
    description: [
      "Caverne Patate is a famous speleological site located on Rodrigues Island, the sister island of Mauritius. This natural wonder features impressive stalactites and stalagmites that have formed over thousands of years.",
      "The cave stretches over 1000 meters long, with an average ceiling height of about 20 meters making it more accessible than other caves. In the light of electric torches, you'll discover amazing shapes sculpted in rock - from fish to witches, the interpretations vary from person to person.",
      "By venturing into this cave, you can descend below sea level, more than 100 meters underground through natural faults. A carved stone staircase provides easy access to the interior."
    ],
    highlights: [
      "Impressive stalactites and stalagmites formations",
      "Over 1000 meters of explorable cave",
      "Descend below sea level",
      "Guided tours with helmets and torches provided",
      "Unique rock formations with imaginative shapes"
    ],
    tips: [
      "Access requires a permit from your hotel or the 'Terres' office in Port-Mathurin",
      "Visits are available 4 times daily: 9am, 11am, 1pm, and 3pm",
      "Helmets are mandatory and provided at entrance",
      "Explore the south coast of Rodrigues while in the area",
      "Buses to the area are rare - consider private transport"
    ],
    images: [
      "caverne-patate.jpg"
    ],
    categories: ["all", "adventure", "unique"],
    duration: "1-2 hours",
    location: "Pointe Patate, Rodrigues Island",
    bestTime: "Year-round",
    difficulty: "Moderate",
    whatToBring: ["Comfortable closed shoes", "Light jacket (cool inside)", "Camera"],
    relatedActivities: ["hiking-le-morne", "seven-waterfalls"]
  },
  
  "grand-bassin": {
    slug: "grand-bassin",
    name: "Grand Bassin Temple",
    region: "South",
    coordinates: [-20.4083, 57.4917],
    tagline: "Sacred Hindu pilgrimage site in the heart of Mauritius",
    description: [
      "Grand Bassin, also known as Ganga Talao, is a crater lake situated in a secluded mountain area. It is considered the most sacred Hindu place in Mauritius and one of the most important Hindu pilgrimage sites outside India.",
      "The lake is surrounded by temples dedicated to various Hindu deities, with the most striking feature being the 33-meter tall statue of Lord Shiva - the Mangal Mahadev - which stands guard at the entrance and is visible from miles away.",
      "During the Maha Shivaratri festival, over 400,000 Hindu devotees make the pilgrimage to Grand Bassin, many walking barefoot from their homes across the island in a display of devotion."
    ],
    highlights: [
      "33-meter tall Shiva statue (Mangal Mahadev)",
      "Sacred crater lake",
      "Multiple Hindu temples",
      "Peaceful spiritual atmosphere",
      "Wild monkeys around the lake"
    ],
    tips: [
      "Dress modestly - cover shoulders and knees",
      "Remove shoes before entering temples",
      "Visit early morning for fewer crowds",
      "Combine with a visit to Chamarel or Black River Gorges"
    ],
    images: [
      "grand-bassin-shiva-statue.jpg",
      "grand-bassin-ganga-talao-lake.jpg",
      "grand-bassin-sacred-lake-offerings.jpg",
      "grand-bassin-temple-mauritius.jpg",
      "grand-bassin-temple-mauritius-2.jpg"
,
      "grand-bassin-1.jpg",
      "grand-bassin-2.jpg",
      "grand-bassin-3.jpg",
      "grand-bassin-4.jpg",
      "grand-bassin-5.jpg",
      "grand-bassin-scupture.jpg",
      "grand-bassin-statue.jpg",
      "monkeys-at-grand-bassin.jpg",
      "shiv-statute-grand-bassin.jpg"
    ],
    categories: ["all", "land", "unique"],
    duration: "1-2 hours",
    location: "Savanne District, Central Mauritius",
    bestTime: "Year-round, especially during Maha Shivaratri",
    difficulty: "Easy",
    whatToBring: ["Modest clothing", "Camera", "Offerings (optional)"],
    relatedActivities: ["chamarel-waterfall", "la-vallee-des-couleurs"]
  },
  
  "maconde-viewpoint": {
    slug: "maconde-viewpoint",
    name: "Maconde Viewpoint",
    region: "South West",
    coordinates: [-20.434, 57.358],
    tagline: "Dramatic clifftop views where the mountains meet the sea",
    description: [
      "Maconde Viewpoint offers one of the most dramatic panoramas in Mauritius, where the rugged Savanne mountains plunge dramatically into the Indian Ocean. This scenic lookout point is located along the coastal road in the south of the island.",
      "The viewpoint provides breathtaking vistas of the wild southern coastline, with its dramatic cliffs, crashing waves, and untamed natural beauty. On clear days, you can see for miles along the coast.",
      "Unlike the calm lagoons of the north and west, this part of Mauritius showcases the island's raw, untouched beauty - a stark contrast that makes for incredible photographs."
    ],
    highlights: [
      "Panoramic ocean and cliff views",
      "Dramatic coastal scenery",
      "Excellent photography spot",
      "Untouched natural landscape",
      "Free to visit"
    ],
    tips: [
      "Best visited in the morning for optimal lighting",
      "Can be very windy - hold onto hats and belongings",
      "Combine with a south coast road trip",
      "Stop at Gris Gris and Le Souffleur nearby"
    ],
    images: [
      "maconde-viewpoint.jpg"
,
      "maconde-1.jpg",
      "maconde-point-in-mauritius.jpg",
      "maconde-view-point-and-bay.jpg",
      "maconde-view-point.jpg"
    ],
    categories: ["all", "land"],
    duration: "30 minutes - 1 hour",
    location: "Baie du Cap, South Mauritius",
    bestTime: "Morning for best light",
    difficulty: "Easy",
    whatToBring: ["Camera", "Sunscreen", "Hat"],
    relatedActivities: ["gris-gris", "chamarel-waterfall"]
  },
  
  "alexandra-falls": {
    slug: "alexandra-falls",
    name: "Alexandra Falls",
    region: "South West",
    coordinates: [-20.402, 57.452],
    tagline: "Stunning waterfall viewpoint in Black River Gorges",
    description: [
      "Alexandra Falls is one of the most accessible and photogenic waterfalls in Mauritius, located within the Black River Gorges National Park. The waterfall cascades down a dramatic cliff face surrounded by lush native forest.",
      "A well-maintained viewing platform allows visitors to admire the falls from a safe distance while taking in the panoramic views of the gorge and surrounding mountains. The misty spray from the falls creates a refreshing atmosphere.",
      "The area around Alexandra Falls is home to endemic plant species and rare birds, making it a favorite spot for nature lovers and photographers alike."
    ],
    highlights: [
      "Spectacular waterfall views",
      "Easy access viewing platform",
      "Endemic flora and fauna",
      "Part of Black River Gorges National Park",
      "Combine with other gorge attractions"
    ],
    tips: [
      "Visit after rainfall for more impressive water flow",
      "Morning visits offer better lighting for photos",
      "Bring insect repellent",
      "Combine with Chamarel and Black River Gorges"
    ],
    images: [
      "alexandra-falls.jpg"
,
      "alexandra-falls-2.jpg",
      "alexandra-falls-view-point.jpg"
,
      "le-soufleur-natural-point.jpg"
    ],
    categories: ["all", "hiking", "land"],
    duration: "1 hour",
    location: "Black River Gorges National Park",
    bestTime: "After rainfall for best flow",
    difficulty: "Easy",
    whatToBring: ["Camera", "Comfortable shoes", "Insect repellent"],
    relatedActivities: ["chamarel-waterfall", "seven-waterfalls", "hiking-le-morne"]
  },
  
  "albion-lighthouse": {
    slug: "albion-lighthouse",
    name: "Albion Lighthouse",
    region: "West",
    coordinates: [-20.2111, 57.4011],
    tagline: "Historic lighthouse with dramatic clifftop ocean views",
    description: [
      "The Albion Lighthouse stands proudly on the western cliffs of Mauritius, offering visitors stunning views of the Indian Ocean and the rocky coastline below. Built during the colonial era, this historic beacon continues to guide ships along the coast.",
      "The area around the lighthouse features dramatic volcanic rock formations and crashing waves, creating a wild and beautiful landscape. The cliffs here are popular for photography, especially during sunset when the sky turns golden.",
      "While the lighthouse itself is not always open to visitors, the surrounding grounds and clifftop paths provide ample opportunity to explore and enjoy the natural beauty of this unspoiled corner of Mauritius."
    ],
    highlights: [
      "Historic colonial-era lighthouse",
      "Dramatic cliff and ocean views",
      "Volcanic rock formations",
      "Spectacular sunset spot",
      "Free to visit"
    ],
    tips: [
      "Best visited at sunset for dramatic photos",
      "Be careful near cliff edges - no barriers",
      "Combine with nearby Albion Beach",
      "Good for a peaceful walk away from tourist crowds"
    ],
    images: [
      "albion-lighthouse.jpg",
      "albion-lighthouse-2.jpg",
      "albion-lighthouse-3.jpg"
,
      "albion-caves-and-light-house-1.jpg",
      "albion-caves-and-light-house-2.jpg",
      "albion-caves-and-light-house-3.jpg",
      "albion-caves-and-light-house-4.jpg",
      "albion-caves-and-light-house-5.jpg",
      "albion-caves-and-light-house-6.jpg",
      "albion-lighhouse-view.jpg",
      "albion-light-house.jpg",
      "pointe-aux-caves-in-albion.jpg"
    ],
    categories: ["all", "land"],
    duration: "1 hour",
    location: "Albion, West Mauritius",
    bestTime: "Sunset",
    difficulty: "Easy",
    whatToBring: ["Camera", "Comfortable shoes"],
    relatedActivities: ["flic-en-flac", "tamarin"]
  },
  
  "jardin-telfair": {
    slug: "jardin-telfair",
    name: "Jardin Telfair",
    region: "South",
    coordinates: [-20.5165, 57.517],
    tagline: "Historic botanical garden with centuries-old trees",
    description: [
      "Jardin Telfair, also known as Telfair Gardens, is a charming botanical garden located in Souillac in the south of Mauritius. Named after Charles Edward Telfair, a naturalist who contributed greatly to the study of Mauritian flora and fauna.",
      "The garden features centuries-old banyan trees with impressive aerial roots, colorful flowering plants, and shaded walkways perfect for a peaceful stroll. The tranquil atmosphere offers a welcome escape from the busier tourist areas.",
      "Adjacent to the garden, visitors can explore the Robert Edward Hart Museum, dedicated to Mauritius' national poet, housed in a charming coral-built cottage."
    ],
    highlights: [
      "Ancient banyan trees",
      "Peaceful shaded walkways",
      "Robert Edward Hart Museum nearby",
      "Colorful tropical plants",
      "Free entry"
    ],
    tips: [
      "Combine with a visit to Gris Gris nearby",
      "Best visited in the morning when cooler",
      "Bring water and sunscreen",
      "Allow 30-45 minutes for a leisurely walk"
    ],
    images: [
      "jardin-telfair.jpeg"
,
      "telfair-garden-bayan-tress.jpg",
      "telfair-garden-in-souillac.jpg"
    ],
    categories: ["all", "land"],
    duration: "1 hour",
    location: "Souillac, South Mauritius",
    bestTime: "Morning",
    difficulty: "Easy",
    whatToBring: ["Camera", "Water", "Sunscreen"],
    relatedActivities: ["gris-gris", "chamarel-waterfall"]
  },
  
  "gris-gris": {
    slug: "gris-gris",
    name: "Gris Gris",
    region: "South",
    coordinates: [-20.524555, 57.530308],
    tagline: "Wild southern cliffs where waves crash against the shore",
    description: [
      "Gris Gris is the southernmost point of Mauritius, where dramatic basalt cliffs meet the powerful waves of the Indian Ocean. Unlike the calm lagoons elsewhere on the island, here there is no protective reef, allowing the full force of the ocean to crash against the rocks.",
      "The name 'Gris Gris' reportedly comes from the gray (gris in French) color of the cliffs and the misty spray from the waves. The area is steeped in local legend and offers a glimpse of Mauritius' wild, untamed side.",
      "A viewing platform and walking paths allow visitors to safely admire the powerful waves and dramatic scenery. Nearby, La Roche Qui Pleure (The Crying Rock) is a cliff face that appears to weep as water runs down its surface."
    ],
    highlights: [
      "Dramatic cliff and wave scenery",
      "La Roche Qui Pleure (Crying Rock)",
      "Southernmost point of Mauritius",
      "No reef - powerful ocean waves",
      "Free to visit"
    ],
    tips: [
      "Stay behind barriers - waves can be dangerous",
      "Visit nearby La Roche Qui Pleure",
      "Best in the morning for photography",
      "Can be very windy"
    ],
    images: [
      "gris-gris-beach.jpg",
      "gris-gris-beach-in-souillac.jpg"
    ],
    categories: ["all", "land"],
    duration: "1-2 hours",
    location: "Souillac, South Mauritius",
    bestTime: "Morning",
    difficulty: "Easy",
    whatToBring: ["Camera", "Windproof jacket", "Comfortable shoes"],
    relatedActivities: ["jardin-telfair", "maconde-viewpoint", "chamarel-waterfall"]
  },
  
  "le-souffleur": {
    slug: "le-souffleur",
    name: "Le Souffleur",
    region: "South",
    coordinates: [-20.49, 57.62],
    tagline: "Natural blowhole that shoots water high into the air",
    description: [
      "Le Souffleur (The Blower) is a spectacular natural blowhole located on the wild southern coast of Mauritius. When waves crash into the volcanic rock formations, water is forced through narrow channels and shoots dramatically into the air.",
      "This natural phenomenon is most impressive during high tide and when the sea is rough, with water spouts reaching heights of up to 20 meters. The surrounding cliffs and wild coastline add to the dramatic atmosphere.",
      "Le Souffleur is located near the village of L'Escalier and offers a glimpse of the powerful forces that shaped Mauritius' volcanic landscape over millions of years."
    ],
    highlights: [
      "Dramatic water spouts up to 20m high",
      "Best during high tide and rough seas",
      "Wild volcanic coastline",
      "Unique natural phenomenon",
      "Free to visit"
    ],
    tips: [
      "Check tide times before visiting",
      "Best viewed when seas are rough",
      "Keep a safe distance from the blowhole",
      "Combine with Gris Gris and south coast tour"
    ],
    images: [
      "le-soufleur.jpg"
    ],
    categories: ["all", "land", "unique"],
    duration: "30 minutes - 1 hour",
    location: "L'Escalier, South Mauritius",
    bestTime: "High tide, rough seas",
    difficulty: "Easy",
    whatToBring: ["Camera", "Waterproof jacket"],
    relatedActivities: ["gris-gris", "maconde-viewpoint"]
  },
  
  "rochester-falls": {
    slug: "rochester-falls",
    name: "Rochester Falls",
    region: "South",
    coordinates: [-20.50262, 57.51695],
    tagline: "Unique rectangular rock formations and swimming hole",
    description: [
      "Rochester Falls is one of the most unique waterfalls in Mauritius, famous for its unusual rectangular rock formations carved by the Savanne River over thousands of years. The geometric patterns in the basalt rock create a stunning natural sculpture.",
      "The waterfall drops about 10 meters into a natural swimming pool below, where brave visitors can take a refreshing dip in the cool waters. Local guides often demonstrate cliff jumping into the pool.",
      "Getting to the falls requires a short walk through sugarcane fields and down a rocky path, adding to the adventure. The secluded location means it's often less crowded than other attractions."
    ],
    highlights: [
      "Unique rectangular rock formations",
      "Natural swimming pool",
      "Cliff jumping opportunities",
      "Secluded location",
      "Short adventure walk to reach"
    ],
    tips: [
      "Wear sturdy shoes for the rocky path",
      "Bring swimwear if you want to swim",
      "Local guides offer cliff jumping demos",
      "Best visited after rainfall"
    ],
    images: [
      "rochester-falls.jpg"
,
      "rochester-fall-1.jpg",
      "rochester-fall-2.jpg",
      "rochester-fall-in-the-south.jpg",
      "rochester-falls-top.jpg"
    ],
    categories: ["all", "hiking", "land"],
    duration: "2 hours",
    location: "Souillac, South Mauritius",
    bestTime: "After rainfall",
    difficulty: "Moderate",
    whatToBring: ["Sturdy shoes", "Swimwear", "Towel", "Camera"],
    relatedActivities: ["chamarel-waterfall", "seven-waterfalls", "gris-gris"]
  },

  // ========== HIGH-VALUE ATTRACTIONS ==========
  
  "seven-coloured-earth": {
    slug: "seven-coloured-earth",
    name: "Seven Coloured Earth",
    region: "South West",
    coordinates: [-20.44028, 57.37333],
    tagline: "A geological wonder featuring sand dunes in seven distinct colors",
    description: [
      "The Seven Coloured Earths of Chamarel is one of Mauritius' most famous attractions and a unique geological phenomenon. This striking landscape features sand dunes in seven distinct colors: red, brown, violet, green, blue, purple, and yellow, all naturally occurring side by side.",
      "The colors are caused by the volcanic rock cooling at different temperatures and converting to clay minerals. Remarkably, if you mix the different colored sands together, they will eventually separate back into their distinct layers over time.",
      "Located in the Chamarel region, this natural wonder is often visited alongside the nearby Chamarel Waterfall and the Rhumerie de Chamarel rum distillery, making for a perfect day trip exploring the southwest."
    ],
    highlights: [
      "Seven distinct natural sand colors",
      "Unique geological phenomenon",
      "Self-separating sand layers",
      "Viewing platforms and paths",
      "Giant tortoise enclosure on site"
    ],
    tips: [
      "Visit early morning for best lighting",
      "Combine with Chamarel Waterfall (same ticket)",
      "Visit the rum distillery afterward",
      "Photography best in morning light"
    ],
    images: [
      "seven-coloured-earth.jpg"
    ],
    categories: ["all", "land", "unique"],
    pricing: [
      { name: "Adult Entry", price: 10, description: "Includes Seven Coloured Earth & Waterfall" },
      { name: "Child Entry", price: 5, description: "Under 12 years" }
    ],
    duration: "1-2 hours",
    location: "Chamarel, South West Mauritius",
    bestTime: "Morning for best light",
    difficulty: "Easy",
    whatToBring: ["Camera", "Sunscreen", "Hat"],
    relatedActivities: ["chamarel-waterfall", "grand-bassin", "black-river-gorges"]
  },
  
  "blue-bay-marine-park": {
    slug: "blue-bay-marine-park",
    name: "Blue Bay Marine Park",
    region: "South East",
    coordinates: [-20.442138, 57.719016],
    tagline: "Crystal-clear waters and vibrant coral reefs in a protected marine sanctuary",
    description: [
      "Blue Bay Marine Park is one of Mauritius' most precious natural treasures and the island's only designated marine park. The protected waters are home to over 50 species of coral and hundreds of species of colorful fish, making it one of the best snorkeling spots in Mauritius.",
      "The crystal-clear turquoise waters allow visibility of up to 15 meters, revealing a stunning underwater world. Sea turtles are regularly spotted here, along with parrotfish, damselfish, and occasional octopuses. Glass-bottom boat tours offer a window into this underwater paradise for non-swimmers.",
      "As a protected area, the marine park has strict regulations to preserve its ecosystem. The calm, shallow lagoon is perfect for families, and the nearby Ile des Deux Cocos adds another dimension to your visit."
    ],
    highlights: [
      "Over 50 coral species",
      "Sea turtles frequently spotted",
      "Crystal-clear waters up to 15m visibility",
      "Glass-bottom boat tours available",
      "Protected marine sanctuary"
    ],
    tips: [
      "Use reef-safe sunscreen only",
      "Glass-bottom boats ideal for non-swimmers",
      "Morning visits have better visibility",
      "Don't touch or stand on coral"
    ],
    images: [
      "blue-bay-sea-turtle.jpg"
,
      "deux-cocos-island.jpg",
      "ile-des-deux-cocos-in-blue-bay-min.jpg",
      "ile-des-deux-cocos-min.jpg",
      "seaturtle-in-blue-bay.jpg",
      "snorkeling-and-boat-tours-blue-bay.jpg",
      "snorkeling-spot-at-le-morne.jpg",
      "snorkeling-spot-in-mauritius-le-morne.jpg"
,
      "alexandra-falls-2.jpg",
      "alexandra-falls-view-point.jpg"
    ],
    categories: ["all", "sea", "unique"],
    pricing: [
      { name: "Glass Bottom Boat", price: 15, description: "30-minute tour" },
      { name: "Snorkeling Tour", price: 25, description: "Equipment included" }
    ],
    duration: "2-3 hours",
    location: "Blue Bay, South East Mauritius",
    bestTime: "Morning, calm weather",
    difficulty: "Easy",
    whatToBring: ["Reef-safe sunscreen", "Swimwear", "Towel", "Underwater camera"],
    relatedActivities: ["ile-aux-cerfs", "snorkeling-blue-bay", "scuba-diving"]
  },
  
  "pamplemousses-botanical-garden": {
    slug: "pamplemousses-botanical-garden",
    name: "Pamplemousses Botanical Garden",
    region: "North",
    coordinates: [-20.1062916, 57.5759952],
    tagline: "One of the oldest botanical gardens in the Southern Hemisphere",
    description: [
      "The Sir Seewoosagur Ramgoolam Botanical Garden, commonly known as Pamplemousses, is one of the oldest botanical gardens in the Southern Hemisphere, established in 1770. Spanning 37 hectares, it's home to an extraordinary collection of endemic and exotic plants from around the world.",
      "The garden is famous for its giant Victoria Amazonica water lilies, whose leaves can grow up to 3 meters in diameter and are strong enough to support a small child. The collection also includes over 85 varieties of palm trees, including the famous Talipot palm that blooms only once every 40-60 years before dying.",
      "Beyond the flora, the garden features a population of giant Aldabra tortoises, historical monuments, and a colonial-era chateau. It's a peaceful oasis that offers a glimpse into Mauritius' colonial past and botanical diversity."
    ],
    highlights: [
      "Giant Victoria water lilies",
      "Over 85 palm varieties",
      "Giant Aldabra tortoises",
      "Rare Talipot palm",
      "Colonial-era chateau"
    ],
    tips: [
      "Hire a guide for fascinating plant stories",
      "Water lilies bloom best in summer (Nov-Mar)",
      "Allow 2 hours for a complete visit",
      "Visit in the morning when cooler"
    ],
    images: [
      "pamplemousses-botanical-garden.jpg"
,
      "lilly-pond-of-pamplemousses-botanical-garden.jpg",
      "national-botanical-garden.jpg",
      "pamplemousse-botanical-garden.jpg",
      "pamplemousses-1.jpg",
      "pamplemousses-2.jpg",
      "pamplemousses-3.jpg",
      "pamplemousses-4.jpg",
      "pamplemousses-5.jpg",
      "pamplemousses-6.jpg",
      "pamplemousses-7.jpg",
      "pamplemousses-garden-giant-baobab.jpg",
      "pamplemousses-garden-giant-lilly-pond.jpg",
      "pamplemousses-garden-lilly-pond.jpg"
    ],
    categories: ["all", "land", "unique"],
    pricing: [
      { name: "Adult Entry", price: 5, description: "Self-guided" },
      { name: "Guided Tour", price: 10, description: "With local guide" }
    ],
    duration: "2-3 hours",
    location: "Pamplemousses, North Mauritius",
    bestTime: "Morning, summer for water lilies",
    difficulty: "Easy",
    whatToBring: ["Camera", "Sunscreen", "Hat", "Water"],
    relatedActivities: ["port-louis", "grand-bassin"]
  },
  
  "black-river-gorges": {
    slug: "black-river-gorges",
    name: "Black River Gorges National Park",
    region: "South West",
    coordinates: [-20.41, 57.42],
    tagline: "Mauritius' only national park with stunning hiking trails and endemic wildlife",
    description: [
      "Black River Gorges National Park is Mauritius' only national park, protecting 6,574 hectares of native forest in the southwest. Established in 1994, the park is home to many endemic plant and animal species found nowhere else on Earth.",
      "The park features over 50 kilometers of hiking trails ranging from easy nature walks to challenging treks. Highlights include viewpoints overlooking dramatic gorges, waterfalls, and the chance to spot rare birds like the Mauritius Kestrel and Pink Pigeon, brought back from the brink of extinction.",
      "The diverse ecosystem includes upland forests, lowland forests, and heathland, each supporting different species. The park is a vital conservation area and offers a glimpse of what Mauritius looked like before human settlement."
    ],
    highlights: [
      "Over 50km of hiking trails",
      "Endemic wildlife (Mauritius Kestrel, Pink Pigeon)",
      "Dramatic gorge viewpoints",
      "Multiple waterfalls",
      "Native forest ecosystem"
    ],
    tips: [
      "Start hikes early in the morning",
      "Bring plenty of water",
      "The Macchabée Trail offers best bird watching",
      "Combine with Alexandra Falls viewpoint"
    ],
    images: [
      "alexandra-falls.jpg",
      "view-from-piton-mountain.jpg"
    ],
    categories: ["all", "hiking", "land", "adventure"],
    duration: "Half day to full day",
    location: "South West Mauritius",
    bestTime: "May to November (winter)",
    difficulty: "Easy to Challenging",
    whatToBring: ["Hiking shoes", "Water (2+ liters)", "Snacks", "Binoculars", "Rain jacket"],
    relatedActivities: ["alexandra-falls", "chamarel-waterfall", "seven-waterfalls"]
  },
  
  "hiking-le-pouce": {
    slug: "hiking-le-pouce",
    name: "Hiking Le Pouce",
    region: "Central",
    coordinates: [-20.2167, 57.5167],
    tagline: "Climb Mauritius' third-highest peak for panoramic views",
    description: [
      "Le Pouce (meaning 'The Thumb' in French) is the third-highest mountain in Mauritius at 812 meters. Named for its distinctive thumb-shaped summit, it offers one of the most rewarding hikes on the island with spectacular 360-degree views from the top.",
      "The hike typically takes 2-3 hours to reach the summit, passing through lush vegetation and offering increasingly dramatic views as you climb. From the top, you can see Port Louis, the Moka Range, the northern plains, and on clear days, the neighboring islands.",
      "The trail is well-marked but can be steep in places. It's recommended to go with a guide who can share stories about the mountain's history and point out endemic plants and wildlife along the way."
    ],
    highlights: [
      "360-degree panoramic views",
      "Third-highest peak in Mauritius",
      "View of Port Louis and Moka Range",
      "Endemic plants along the trail",
      "Achievable for moderate fitness"
    ],
    tips: [
      "Start early morning to avoid heat",
      "Hire a local guide for safety",
      "Bring at least 2 liters of water",
      "Best views in the morning before clouds form"
    ],
    images: [
      "climbing-le-pouce-mountain.jpg"
    ],
    categories: ["all", "hiking", "land"],
    pricing: [
      { name: "Guided Hike", price: 55, description: "With professional guide" }
    ],
    duration: "4-5 hours (round trip)",
    location: "Moka, Central Mauritius",
    bestTime: "Morning, dry season (May-Nov)",
    difficulty: "Moderate",
    whatToBring: ["Hiking shoes", "Water (2L)", "Snacks", "Hat", "Sunscreen", "Camera"],
    relatedActivities: ["hiking-le-morne", "seven-waterfalls", "black-river-gorges"]
  },
  
  "snorkeling-blue-bay": {
    slug: "snorkeling-blue-bay",
    name: "Snorkeling at Blue Bay",
    region: "South East",
    coordinates: [-20.4342, 57.7242],
    tagline: "Swim among vibrant corals and tropical fish in crystal-clear waters",
    description: [
      "Blue Bay Marine Park offers some of the best snorkeling in Mauritius. The protected waters are teeming with life, from colorful coral formations to schools of tropical fish, and you might even spot sea turtles gliding gracefully through the water.",
      "The calm, shallow lagoon is perfect for snorkelers of all abilities. The water clarity is exceptional, often exceeding 15 meters visibility, allowing you to fully appreciate the underwater rainbow of colors. More than 50 species of coral create a stunning backdrop.",
      "Several operators offer guided snorkeling tours with equipment included. They know the best spots to find the most impressive coral formations and marine life, making this an unmissable experience for any visitor to Mauritius."
    ],
    highlights: [
      "Crystal-clear water visibility",
      "Over 50 coral species",
      "Sea turtles regularly spotted",
      "Calm, shallow waters",
      "Suitable for all skill levels"
    ],
    tips: [
      "Use reef-safe sunscreen only",
      "Go with a guide to find the best spots",
      "Morning offers the clearest water",
      "Don't touch or stand on coral"
    ],
    images: [
      "blue-bay-sea-turtle.jpg"
    ],
    categories: ["all", "sea"],
    pricing: [
      { name: "Snorkeling Tour", price: 25, description: "Equipment & guide included" }
    ],
    duration: "2-3 hours",
    location: "Blue Bay, South East Mauritius",
    bestTime: "Morning, calm weather",
    difficulty: "Easy",
    whatToBring: ["Reef-safe sunscreen", "Swimwear", "Towel", "Underwater camera"],
    relatedActivities: ["blue-bay-marine-park", "scuba-diving", "ile-aux-cerfs"]
  },

  "kayaking-ile-dambre": {
    slug: "kayaking-ile-dambre",
    name: "Kayaking Tour - Ile d'Ambre",
    region: "North East",
    coordinates: [-20.02, 57.68],
    tagline: "Paddle through mangroves and discover the hidden beauty of Ile d'Ambre on a guided kayak adventure.",
    description: [
      "Explore the calm waters and mangroves around Ile d'Ambre on a guided kayaking tour. This activity is perfect for nature lovers and those looking for a peaceful way to discover the island's coastline."
    ],
    highlights: ["Mangrove exploration", "Guided kayak tour", "Ile d'Ambre scenery", "Suitable for beginners"],
    tips: ["Wear water-friendly shoes", "Bring sunscreen and water", "Morning tours offer calmer conditions"],
    images: [
      "kayaking-ile-d-ambre-in-mauritius.jpg",
      "kayaking-in-mauritius.jpg",
      "kayaking-tour-ile-d-ambre.jpg"
    ],
    categories: ["all", "sea", "adventure"],
    duration: "2-3 hours",
    location: "Ile d'Ambre, North East coast",
    bestTime: "Morning, calm weather",
    difficulty: "Easy",
    whatToBring: ["Swimwear", "Sunscreen", "Water", "Water shoes"],
    relatedActivities: ["ile-aux-cerfs", "stand-up-paddle", "catamaran-ile-aux-cerfs"]
  },

  "stand-up-paddle": {
    slug: "stand-up-paddle",
    name: "Stand Up Paddle",
    region: "Various",
    coordinates: [-20.325, 57.367],
    tagline: "Glide across the calm lagoons on a stand-up paddleboard and enjoy the peaceful Mauritian waters.",
    description: [
      "Stand-up paddleboarding is a relaxing way to explore Mauritius's calm lagoons. Suitable for all levels, you can glide over crystal-clear water and enjoy the coastal scenery at your own pace."
    ],
    highlights: ["Calm lagoon waters", "Suitable for all levels", "Scenic coastline", "Peaceful experience"],
    tips: ["Start in sheltered areas if you're new", "Morning often has the calmest water", "Bring a waterproof bag for belongings"],
    images: [
      "stand-up-paddle-in-mauritius.jpg"
    ],
    categories: ["all", "sea"],
    duration: "1-2 hours",
    location: "Various lagoons (Grand Bay, Le Morne, East Coast)",
    bestTime: "Morning for calmest conditions",
    difficulty: "Easy",
    whatToBring: ["Swimwear", "Sunscreen", "Towel"],
    relatedActivities: ["kayaking-ile-dambre", "catamaran-cruises", "ile-aux-cerfs"]
  },

  "seakart-adventure": {
    slug: "seakart-adventure",
    name: "Sea Kart Adventure",
    region: "West",
    coordinates: [-20.2824, 57.3625],
    tagline: "Drive your own mini speedboat and explore the coastline on this exciting sea karting experience.",
    description: [
      "Sea karting lets you pilot your own small speedboat along the coast of Mauritius. It's an exciting way to explore the coastline and feel the thrill of the water with friends or family."
    ],
    highlights: ["Drive your own sea kart", "Coastal exploration", "Thrilling experience", "Suitable for groups"],
    tips: ["Follow the guide's instructions", "Wear sunglasses and sunscreen", "Bring a change of clothes"],
    images: [
      "seakart-adventure-mauritius-min.jpg",
      "seakart-adventure-min.jpg",
      "seakart-tour-west-coast.jpg"
    ],
    categories: ["all", "sea", "adventure"],
    pricing: [{ name: "Sea Kart Tour", price: 155, description: "Per person" }],
    duration: "About 1-2 hours",
    location: "West Coast",
    bestTime: "Year-round, calm sea days",
    difficulty: "Easy",
    whatToBring: ["Swimwear", "Sunscreen", "Towel", "Change of clothes"],
    relatedActivities: ["catamaran-ile-aux-benitiers", "swim-with-dolphins", "parasailing"]
  },

  "la-vanille-nature-park": {
    slug: "la-vanille-nature-park",
    name: "La Vanille Nature Park",
    region: "South",
    coordinates: [-20.48, 57.55],
    tagline: "Meet giant tortoises, crocodiles, and other wildlife at this family-friendly nature reserve.",
    description: [
      "La Vanille Nature Park is a family-friendly reserve in the south of Mauritius, home to giant Aldabra tortoises, Nile crocodiles, and a variety of other animals and insects.",
      "The park offers close encounters with tortoises, a crocodile farm, and educational displays. It's a great outing for children and nature lovers alike."
    ],
    highlights: ["Giant tortoises", "Crocodile farm", "Family-friendly", "Nature reserve"],
    tips: ["Allow 2-3 hours for a full visit", "Combine with nearby attractions", "Feed the tortoises (allowed in designated areas)"],
    images: [
      "deer-at-la-vanille-nature-park.jpg"
    ],
    categories: ["all", "land"],
    duration: "2-3 hours",
    location: "Rivière des Anguilles, South",
    bestTime: "Morning or late afternoon",
    difficulty: "Easy",
    whatToBring: ["Comfortable shoes", "Sunscreen", "Camera"],
    relatedActivities: ["chamarel-waterfall", "seven-coloured-earth", "gris-gris"]
  },

  "ile-aux-aigrettes": {
    slug: "ile-aux-aigrettes",
    name: "Ile aux Aigrettes",
    region: "South East",
    coordinates: [-20.42, 57.72],
    tagline: "A protected nature reserve home to rare endemic species and giant tortoises.",
    description: [
      "Ile aux Aigrettes is a small coral island off the south-east coast of Mauritius, managed as a nature reserve by the Mauritian Wildlife Foundation.",
      "The island is home to rare endemic species, including the pink pigeon and giant tortoises. Guided tours offer a unique insight into conservation efforts and the island's fragile ecosystem."
    ],
    highlights: ["Endemic species", "Giant tortoises", "Conservation reserve", "Guided tours"],
    tips: ["Book tours in advance", "Wear comfortable walking shoes", "Respect the fragile environment"],
    images: [
      "ile-aux-aigrettes.jpg"
    ],
    categories: ["all", "land", "unique"],
    duration: "2-3 hours (including boat transfer)",
    location: "Off Mahébourg, South East",
    bestTime: "Morning tours",
    difficulty: "Easy",
    whatToBring: ["Comfortable shoes", "Hat", "Sunscreen", "Camera"],
    relatedActivities: ["blue-bay-marine-park", "snorkeling-blue-bay", "ile-aux-cerfs"]
  },

  "ilot-gabriel": {
    slug: "ilot-gabriel",
    name: "Ilot Gabriel",
    region: "North East",
    coordinates: [-19.8833, 57.6667],
    tagline: "An uninhabited island nature reserve with pristine beaches and excellent snorkeling.",
    description: [
      "Ilot Gabriel is an uninhabited island north of Mauritius, part of the same lagoon as Coin de Mire. It offers pristine beaches, clear waters, and excellent snorkeling in a protected setting.",
      "Day trips by catamaran or speedboat allow you to relax on the beach, swim, and explore the marine life. The island is a popular stop on north coast boat tours."
    ],
    highlights: ["Pristine beaches", "Uninhabited island", "Snorkeling", "Nature reserve"],
    tips: ["Book a catamaran or boat tour from Grand Bay", "Bring snorkeling gear", "Pack lunch if not included"],
    images: [
      "coin-de-mire.jpg",
      "ilot-mangenie-boat-tour-min.jpg",
      "ilot-mangenie-min.jpg"
    ],
    categories: ["all", "sea"],
    duration: "Full day",
    location: "North, off Grand Bay",
    bestTime: "Year-round, calm sea days",
    difficulty: "Easy",
    whatToBring: ["Swimwear", "Sunscreen", "Towel", "Snorkel gear"],
    relatedActivities: ["catamaran-cruises", "ile-aux-cerfs", "ile-aux-benitiers"]
  },

  // ========== WHALE WATCHING ==========
  "whale-watching": {
    slug: "whale-watching",
    name: "Whale Watching",
    region: "West",
    coordinates: [-20.32, 57.37],
    tagline: "Witness majestic whales in their natural habitat during the migration season",
    description: [
      "Witness majestic whales in their natural habitat during the migration season (June to November). Mauritius lies on the migration route of humpback and sperm whales, offering some of the best whale watching in the Indian Ocean.",
      "Tours depart from the west coast, often from Tamarin or Black River, and head out to sea where experienced skippers and guides help you spot these gentle giants. The experience is respectful and eco-conscious, keeping a safe distance while allowing unforgettable encounters.",
      "Whale watching in Mauritius is a seasonal highlight—plan your visit between June and November for the best chance of sightings, with peak activity often in August and September."
    ],
    highlights: [
      "Humpback and sperm whale sightings (seasonal)",
      "Eco-friendly boat tours from the west coast",
      "Expert guides and skippers",
      "Stunning ocean scenery",
      "Often combined with dolphin spotting"
    ],
    tips: [
      "Book for June–November; August–September is peak season",
      "Morning tours often have calmer seas and good light",
      "Bring a windproof jacket and motion sickness medication if prone",
      "Combine with a trip to Ile aux Bénitiers for a full day"
    ],
    images: [
      "speedboat-tours-in-mauritius.jpg",
      "dolphin-boat-tours.jpg",
      "ile-aux-benitiers.jpg"
    ],
    categories: ["all", "sea", "unique"],
    pricing: [
      { name: "Whale Watching Tour", price: 59, description: "Half-day tour (seasonal)" }
    ],
    duration: "3–4 hours",
    location: "West coast (Tamarin / Black River area)",
    bestTime: "June to November, peak August–September",
    difficulty: "Easy",
    included: ["Boat trip", "Guide", "Safety briefing"],
    whatToBring: ["Warm layer", "Sunscreen", "Camera", "Motion sickness medication if needed"],
    relatedActivities: ["swim-with-dolphins", "catamaran-ile-aux-benitiers", "catamaran-cruises"]
  },

  // ========== SPEEDBOAT TO ILOT GABRIEL ==========
  "speedboat-ilot-gabriel": {
    slug: "speedboat-ilot-gabriel",
    name: "Speedboat Tours to Ilot Gabriel",
    region: "North East",
    coordinates: [-19.8833, 57.6667],
    tagline: "A thrilling speedboat adventure to the pristine shores of Ilot Gabriel",
    description: [
      "A thrilling speedboat adventure to the pristine shores of Ilot Gabriel with snorkeling stops. Speedboat tours from Grand Bay or nearby jetties get you to the northern islands quickly, leaving more time for swimming and exploring.",
      "Ilot Gabriel is an uninhabited island with white sand beaches and clear waters ideal for snorkeling. The speedboat ride itself is part of the fun—wind in your hair and stunning views of Coin de Mire and the north coast.",
      "Tours typically include snorkeling gear, time on the beach, and sometimes a light lunch or refreshments. Perfect for families and adventure seekers who want a faster-paced day on the water."
    ],
    highlights: [
      "Fast, exciting ride to Ilot Gabriel",
      "Pristine beaches and snorkeling",
      "Views of Coin de Mire and the north",
      "Half- or full-day options",
      "Suitable for families"
    ],
    tips: [
      "Book from Grand Bay for the shortest crossing",
      "Bring reef-safe sunscreen and a dry bag",
      "Morning departures often mean calmer seas",
      "Combine with a catamaran trip for a different pace"
    ],
    images: [
      "le-morne-speedboat-tours.jpg",
      "ilot-mangenie-boat-tour-min.jpg",
      "ilot-mangenie-min.jpg",
      "coin-de-mire.jpg"
    ],
    categories: ["all", "sea", "adventure"],
    pricing: [
      { name: "Speedboat to Ilot Gabriel", price: 375, description: "Full day with snorkeling" }
    ],
    duration: "Full day or half day",
    location: "North (Grand Bay / Cap Malheureux area)",
    bestTime: "Year-round, calm sea days",
    difficulty: "Easy",
    included: ["Speedboat transfer", "Snorkeling gear", "Beach time"],
    whatToBring: ["Swimwear", "Sunscreen", "Towel", "Camera"],
    relatedActivities: ["ilot-gabriel", "catamaran-cruises", "ile-aux-cerfs"]
  },

  // ========== PARASAILING ==========
  "parasailing": {
    slug: "parasailing",
    name: "Parasailing",
    region: "West",
    coordinates: [-20.28, 57.36],
    tagline: "Soar above the turquoise lagoon and enjoy breathtaking aerial views",
    description: [
      "Soar above the turquoise lagoon and enjoy breathtaking aerial views of the Mauritian coastline. Parasailing in Mauritius is a popular activity offered from several beaches and boats—you're harnessed to a parachute and towed by a speedboat for a gentle, scenic flight.",
      "No experience is needed; you take off and land from the boat or a platform. The ride is surprisingly calm and offers a unique perspective over the lagoons, reefs, and shoreline.",
      "Many operators offer tandem flights so you can share the experience. It's one of the best ways to see the famous turquoise waters from above without the cost of a helicopter or seaplane."
    ],
    highlights: [
      "Breathtaking views of the lagoon and coast",
      "No experience required",
      "Tandem and solo options",
      "Calm, scenic flight",
      "Available at several locations"
    ],
    tips: [
      "Wear secure footwear and comfortable clothes",
      "Morning or late afternoon often has the best light",
      "Bring a waterproof camera or use the operator's photo package",
      "Check weight limits if booking as a pair"
    ],
    images: [
      "parasailing-in-mauritius.jpg",
      "boat-tours-at-ile-aux-cerfs.jpg",
      "helicopter-ride-corail.jpg"
    ],
    categories: ["all", "sea", "adventure", "air"],
    pricing: [
      { name: "Parasailing Flight", price: 55, description: "Single or tandem (operator-dependent)" }
    ],
    duration: "About 10–15 minutes in the air",
    location: "Various (e.g. Grand Bay, Ile aux Cerfs, Le Morne)",
    bestTime: "Year-round, calm and clear days",
    difficulty: "Easy",
    included: ["Harness", "Safety briefing", "Boat tow"],
    whatToBring: ["Swimwear or comfortable clothes", "Sunscreen", "Camera"],
    relatedActivities: ["skydiving", "helicopter-tour", "ile-aux-cerfs"]
  },

  // ========== UNDERSEA WALK ==========
  "undersea-walk": {
    slug: "undersea-walk",
    name: "Undersea Walk",
    region: "North",
    coordinates: [-20.0074, 57.5783],
    tagline: "Walk on the ocean floor and get up close with tropical fish and coral",
    description: [
      "Walk on the ocean floor and get up close with tropical fish and coral in this unique underwater experience. Using a special helmet supplied with air, you walk on the seabed in shallow, clear water—no swimming or diving certification needed.",
      "The activity is available at selected sites on the north coast, often near Grand Bay or Trou aux Biches. Fish swarm around you as you walk, and the experience is suitable for most ages and fitness levels.",
      "Undersea walk is one of Mauritius's unique marine activities—a gentle way to experience the underwater world without scuba gear, and a great option for non-swimmers who want to see the sea life."
    ],
    highlights: [
      "Walk on the seabed with a breathing helmet",
      "No diving experience required",
      "Close encounters with tropical fish",
      "Suitable for non-swimmers",
      "Unique experience in Mauritius"
    ],
    tips: [
      "Listen carefully to the safety briefing",
      "Avoid touching coral or marine life",
      "Morning sessions often have the clearest water",
      "Bring a towel and change of clothes"
    ],
    images: [
      "walk-under-water-in-mauritius.jpg",
      "snorkeling-in-blue-bay.jpg",
      "swim-with-dolphins.jpg"
    ],
    categories: ["all", "sea", "unique"],
    pricing: [
      { name: "Undersea Walk", price: 65, description: "Session with helmet and guide" }
    ],
    duration: "About 20–30 minutes underwater",
    location: "North coast (e.g. Grand Bay, Trou aux Biches)",
    bestTime: "Year-round, calm and clear days",
    difficulty: "Easy",
    included: ["Helmet", "Guide", "Safety briefing"],
    whatToBring: ["Swimwear", "Towel", "Underwater camera if desired"],
    relatedActivities: ["underwater-scooter", "snorkeling-blue-bay", "scuba-diving"]
  },

  // ========== HORSE RIDING IN MAURITIUS ==========
  "horse-riding": {
    slug: "horse-riding",
    name: "Horse Riding in Mauritius",
    region: "Various",
    coordinates: [-20.452424, 57.312697],
    tagline: "Explore scenic trails and beaches on horseback with experienced guides",
    description: [
      "Explore scenic trails and beaches on horseback with experienced guides. Horse riding in Mauritius is offered at several locations—from beach rides at Le Morne to inland trails through sugar cane and forest.",
      "Rides suit all levels; calm horses and patient guides make it possible for beginners to enjoy the experience, while more experienced riders can often opt for longer or faster trails. Beach rides at sunrise or sunset are especially popular.",
      "Whether you choose a beach ride, a nature trail, or a combination, you'll get a different perspective on the island's landscapes and coastline."
    ],
    highlights: [
      "Scenic trails and beach rides",
      "Suitable for beginners and experienced riders",
      "Sunrise and sunset options",
      "Experienced guides",
      "Multiple locations across the island"
    ],
    tips: [
      "Wear long pants and closed-toe shoes",
      "Book sunrise or sunset for the best light and cooler temperatures",
      "Mention your experience level when booking",
      "Le Morne beach rides are iconic—consider horse-riding-le-morne for that specific experience"
    ],
    images: [
      "horse-riding-on-the-beach-in-mauritius.jpg",
      "horse-riding-at-le-morne-mauritius.jpg",
      "horse-riding-in-the-morningat-le-morne.jpg"
    ],
    categories: ["all", "land"],
    pricing: [
      { name: "Beach or Trail Ride", price: 60, description: "1–2 hours with guide" }
    ],
    duration: "1–2 hours typically",
    location: "Various (Le Morne, inland stables)",
    bestTime: "Year-round; early morning or late afternoon for comfort",
    difficulty: "Easy to Moderate",
    included: ["Horse", "Helmet", "Guide"],
    whatToBring: ["Long pants", "Closed shoes", "Sunscreen", "Camera"],
    relatedActivities: ["horse-riding-le-morne", "hiking-le-morne", "quad-biking"]
  },

  // ========== SEAPLANE FLIGHT IN THE NORTH ==========
  "seaplane-north": {
    slug: "seaplane-north",
    name: "Seaplane Flight in the North",
    region: "North",
    coordinates: [-20.0074, 57.5783],
    tagline: "Discover the northern islands and reefs from the air",
    description: [
      "Discover the northern islands and reefs from the air with this spectacular seaplane adventure. Take off from the north coast and fly over Coin de Mire, Flat Island, Ilot Gabriel, and the stunning turquoise lagoons that make Mauritius famous.",
      "The seaplane offers a unique way to see the north—combining the thrill of a water takeoff and landing with panoramic views that few other activities can match. Flights are typically short but unforgettable.",
      "This is a great alternative or complement to the Le Morne seaplane experience; here the focus is on the northern islands and the dramatic coastline and reefs of the north."
    ],
    highlights: [
      "Fly over Coin de Mire, Flat Island, Ilot Gabriel",
      "Stunning views of northern lagoons and reefs",
      "Water takeoff and landing",
      "Short but memorable flight",
      "Professional pilots"
    ],
    tips: [
      "Book for clear, calm days for the best views",
      "Morning light is ideal for photography",
      "Combine with a boat trip to Ilot Gabriel for a full day",
      "Check weight limits for groups"
    ],
    images: [
      "seaplane-in-the-north-of-mauritius.jpg",
      "seaplane-at-le-morne.jpg",
      "coin-de-mire.jpg",
      "ilot-mangenie-boat-tour-min.jpg"
    ],
    categories: ["all", "air"],
    pricing: [
      { name: "Northern Seaplane Tour", price: 137, description: "Scenic flight over northern islands" }
    ],
    duration: "About 15–20 minutes flight time",
    location: "North (departure from north coast lagoon)",
    bestTime: "Year-round, clear days",
    difficulty: "Easy",
    included: ["Flight", "Safety briefing"],
    whatToBring: ["Camera", "Sunglasses"],
    relatedActivities: ["seaplane-le-morne", "helicopter-tour", "ilot-gabriel"]
  },

  // ========== 7 CASCADES ADVENTURE ==========
  "seven-cascades": {
    slug: "seven-cascades",
    name: "7 Cascades Adventure",
    region: "South West",
    coordinates: [-20.375, 57.435],
    tagline: "An adventurous hike through Tamarin Falls with canyoning and natural waterslides",
    description: [
      "An adventurous hike through Tamarin Falls (7 Cascades) with canyoning, abseiling, and natural waterslides. This is the more adrenaline-focused sibling to the classic Seven Waterfalls hike—you'll descend through the cascades with ropes, jump into pools, and slide down natural rock formations.",
      "Guides provide equipment and instruction, so no prior canyoning experience is required, but a good level of fitness and comfort with water and heights is recommended. The setting is the same stunning Tamarind Falls area in Henrietta.",
      "The 7 Cascades adventure is one of Mauritius's most thrilling land activities—perfect for adventure seekers who want more than a walk in the woods."
    ],
    highlights: [
      "Canyoning and abseiling at Tamarin Falls",
      "Natural waterslides and jumps",
      "Guided with full safety equipment",
      "Same stunning area as Seven Waterfalls hike",
      "Thrilling half-day adventure"
    ],
    tips: [
      "Wear secure water shoes and swimwear under clothes",
      "Bring a dry bag for keys and phone",
      "Good fitness and comfort in water recommended",
      "Book with a licensed operator for safety"
    ],
    images: [
      "hiking-7-cascades.jpg",
      "7-waterfall-hike.jpg",
      "under-the-waterfall-at-7-cascades.jpg"
    ],
    categories: ["all", "hiking", "adventure"],
    pricing: [
      { name: "7 Cascades Canyoning", price: 65, description: "Half-day with guide and equipment" }
    ],
    duration: "Half day (3–4 hours)",
    location: "Henrietta (Tamarind Falls / 7 Cascades)",
    bestTime: "After rainfall for good water flow; avoid heavy rain",
    difficulty: "Moderate to Challenging",
    included: ["Guide", "Safety equipment", "Canyoning gear"],
    whatToBring: ["Swimwear", "Water shoes", "Dry bag", "Towel", "Change of clothes"],
    relatedActivities: ["seven-waterfalls", "hiking-le-pouce", "hiking-le-morne"]
  },

  // ========== ILE AUX BENITIERS ==========
  "ile-aux-benitiers": {
    slug: "ile-aux-benitiers",
    name: "Ile aux Benitiers",
    region: "West",
    coordinates: [-20.4167, 57.3333],
    tagline: "A paradise island on the west coast, famous for dolphin watching and Crystal Rock",
    description: [
      "A paradise island on the west coast, famous for dolphin watching and the iconic Crystal Rock. Ile aux Bénitiers (or Île aux Bénitiers) is a long, narrow island off the village of La Gaulette, often visited on combined dolphin and island tours.",
      "The island has beautiful beaches, shallow waters ideal for swimming and snorkeling, and the famous Crystal Rock—a photogenic rock formation in the lagoon. Many catamaran and speedboat tours include a stop here after a morning dolphin swim.",
      "You can relax on the beach, enjoy a BBQ lunch, or explore the lagoon. It's one of the most popular day-trip destinations from the west and south-west coast."
    ],
    highlights: [
      "Iconic Crystal Rock and pristine beaches",
      "Often combined with dolphin watching",
      "Swimming and snorkeling in the lagoon",
      "BBQ lunches and beach time",
      "West coast catamaran and boat tours"
    ],
    tips: [
      "Book a combined dolphin + Bénitiers tour for a full day",
      "Morning tours often include dolphin spotting",
      "Bring reef-safe sunscreen and a camera",
      "The island can get busy in peak season—early departure helps"
    ],
    images: [
      "ile-aux-benitiers.jpg",
      "dolphin-swim-in-mauritius.jpg",
      "speedboat-tours-in-mauritius.jpg",
      "catamaran-tours-ile-aux-benitiers.jpg"
    ],
    categories: ["all", "sea"],
    pricing: [
      { name: "Catamaran to Bénitiers", price: 55, description: "Full day with dolphin watch and lunch" },
      { name: "Speedboat Tour", price: 45, description: "Half day to island and Crystal Rock" }
    ],
    duration: "Full day or half day",
    location: "West coast, off La Gaulette",
    bestTime: "Year-round; calm seas and morning for dolphins",
    difficulty: "Easy",
    whatToBring: ["Swimwear", "Sunscreen", "Towel", "Camera"],
    relatedActivities: ["catamaran-ile-aux-benitiers", "swim-with-dolphins", "whale-watching"]
  },

  // ========== CATAMARAN LIVE ON BOARD ==========
  "catamaran-live-aboard": {
    slug: "catamaran-live-aboard",
    name: "Catamaran Live on Board",
    region: "Various",
    coordinates: [-20.0074, 57.5783],
    tagline: "An unforgettable multi-day sailing experience aboard a luxury catamaran",
    description: [
      "An unforgettable multi-day sailing experience living aboard a luxury catamaran. Live-aboard cruises in Mauritius let you sleep, eat, and explore from the boat—sailing between islands, anchorages, and reefs over several days.",
      "Operators like Oceane offer tailored itineraries that can include the west coast (dolphins, Ile aux Bénitiers), the north (Ilot Gabriel, Coin de Mire), or a full circumnavigation. You'll have a crew to handle sailing and often meals, so you can focus on swimming, snorkeling, and relaxing.",
      "This is the ultimate sea experience for those who want more than a day trip—ideal for couples, families, or small groups looking for a unique holiday within a holiday."
    ],
    highlights: [
      "Multi-day sailing and living on a catamaran",
      "Luxury accommodation on the water",
      "Tailored itineraries (west, north, or round island)",
      "Crew and meals often included",
      "Snorkeling, swimming, and island stops"
    ],
    tips: [
      "Book well in advance; availability is limited",
      "Discuss itinerary and meal preferences with the operator",
      "Pack light and in soft bags; bring seasickness medication if prone",
      "Ideal for 2–6 guests depending on the boat"
    ],
    images: [
      "catamaran-tours-with-oceane.jpg",
      "catamaran-cruises-in-mauritius.jpg",
      "sunset-catamaran-cruise.jpg"
    ],
    categories: ["all", "sea", "unique"],
    pricing: [
      { name: "Multi-day Live Aboard", price: 790, description: "From 2 nights; varies by itinerary" }
    ],
    duration: "2+ nights (multi-day)",
    location: "Various (west, north, or round island)",
    bestTime: "Year-round; May–November often calmest",
    difficulty: "Easy",
    included: ["Accommodation", "Crew", "Often meals and activities"],
    whatToBring: ["Soft luggage", "Swimwear", "Sunscreen", "Seasickness medication if needed"],
    relatedActivities: ["catamaran-cruises", "catamaran-ile-aux-benitiers", "ile-aux-benitiers"]
  },

  // ========== ONE LOVE BOAT TOUR ==========
  "one-love-boat-tour": {
    slug: "one-love-boat-tour",
    name: "One Love Boat Tour",
    region: "West",
    coordinates: [-20.23, 57.38],
    tagline: "Reggae vibes and good times on a unique boat tour with music, drinks, and stunning views",
    description: [
      "Reggae vibes and good times on this unique boat tour with music, drinks, and stunning views. The One Love Boat Tour is a popular experience that combines a scenic cruise with a relaxed, festive atmosphere—reggae music, cold drinks, and the turquoise waters of Mauritius.",
      "Tours typically run along the coast or to a nearby island, with stops for swimming and snorkeling. It's ideal for groups and anyone who wants a fun, social day on the water rather than a quiet sailing trip.",
      "The exact itinerary and duration vary by operator, but the emphasis is always on good music, good company, and the beautiful Mauritian seascape."
    ],
    highlights: [
      "Reggae music and festive atmosphere",
      "Scenic cruise with swimming stops",
      "Drinks and good vibes",
      "Stunning coastal views",
      "Great for groups and social travellers"
    ],
    tips: [
      "Book in advance in peak season",
      "Bring sunscreen and a waterproof phone case",
      "Perfect for a relaxed day with friends",
      "Check if lunch or snacks are included"
    ],
    images: [
      "one-love-boat-tour.jpg",
      "catamaran-cruises-in-mauritius.jpg",
      "speedboat-tours-in-mauritius.jpg"
    ],
    categories: ["all", "sea", "unique"],
    duration: "Half day or full day",
    location: "Various (often north or west coast)",
    bestTime: "Year-round, calm sea days",
    difficulty: "Easy",
    whatToBring: ["Swimwear", "Sunscreen", "Camera", "Cash for extras"],
    relatedActivities: ["catamaran-cruises", "sunset-cruise", "ile-aux-benitiers"]
  }
};

export function getActivityDetailsBySlug(slug: string): ActivityDetails | null {
  return ACTIVITY_DETAILS[slug] || null;
}

export function getAllActivitySlugs(): string[] {
  return Object.keys(ACTIVITY_DETAILS);
}

export function getRelatedActivities(slug: string): ActivityDetails[] {
  const activity = ACTIVITY_DETAILS[slug];
  if (!activity || !activity.relatedActivities) return [];
  
  return activity.relatedActivities
    .map(s => ACTIVITY_DETAILS[s])
    .filter(Boolean);
}
