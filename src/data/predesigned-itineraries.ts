/**
 * Pre-designed itineraries for the itinerary page.
 * Road Trip North is fully populated; others are stubs for future content.
 * slug is used in URLs: /top-activities-mauritius/[slug]
 */

import { BEACH_DETAILS } from "@/data/beaches";
import { ACTIVITY_DETAILS } from "@/data/activities";
import { PLACE_DETAILS } from "@/data/place-details";

export type PreDesignedStopType = "place" | "beach" | "activity";

function resolvePosition(type: PreDesignedStopType, slug: string, fallback: [number, number]): [number, number] {
  if (type === "beach") return BEACH_DETAILS[slug]?.coordinates ?? fallback;
  if (type === "activity") return ACTIVITY_DETAILS[slug]?.coordinates ?? fallback;
  return PLACE_DETAILS[slug]?.coordinates ?? ACTIVITY_DETAILS[slug]?.coordinates ?? fallback;
}

export interface PreDesignedStop {
  type: PreDesignedStopType;
  slug: string;
  name: string;
  position: [number, number];
  link: string;
  image: string;
  regionLabel?: string;
  /** Enriched from place/beach/activity page for itinerary detail view */
  description?: string;
  /** Multiple images for thumbnails (from beach-details / place-details) */
  images?: string[];
}

export interface PreDesignedItinerary {
  id: string;
  /** URL slug for /top-activities-mauritius/[slug] */
  slug: string;
  title: string;
  subtitle?: string;
  image?: string;
  /** Optional custom image used on the All Itineraries listing cards. */
  listingImage?: string;
  /** Optional object-position for card image (e.g. "left center" to crop a badge on the right). */
  imagePosition?: string;
  /** Platform-only: intro paragraphs shown below hero, full width */
  introParagraph?: string[];
  stops: PreDesignedStop[];
  info?: string[];
  routeTotals?: { totalDistanceKm: number; totalDurationMin: number };
}

export const ITINERARY_DETAIL_BASE = "/top-activities-mauritius";

export function getPreDesignedItineraryBySlug(slug: string): PreDesignedItinerary | null {
  return PREDESIGNED_ITINERARIES.find((i) => i.slug === slug) ?? null;
}

export function getPreDesignedItinerarySlugs(): string[] {
  return PREDESIGNED_ITINERARIES.map((i) => i.slug);
}

const placeLink = (slug: string) => `/best-places-to-visit-in-mauritius/${slug}`;
const activityLink = (slug: string) => `/top-activities-mauritius/${slug}`;
const beachLink = (slug: string) => `/beaches-in-mauritius/${slug}`;

export const PREDESIGNED_ITINERARIES: PreDesignedItinerary[] = [
  {
    id: "road-trip-north",
    slug: "road-trip-north",
    title: "Roadtrip North",
    subtitle: "Gardens, beaches & Cap Malheureux",
    image: "roadtrip-north.jpg",
    listingImage: "custom-itinerary-roadtrip-north.jpg",
    introParagraph: [
      "The north of Mauritius is where lush gardens, colonial heritage, and some of the island's best beaches come together in one unforgettable day. From the famous Pamplemousses Botanical Garden and the elegant Chateau de Labourdonnais to a string of turquoise bays—Trou aux Biches, Mont Choisy, Grand Baie, Pereybere, Bain Boeuf—and finally the iconic red-roofed church at Cap Malheureux, this route captures the essence of the north coast.",
      "Whether you're after giant water lilies and historic estates in the morning or sun, sea, and local vibes in the afternoon, a road trip in the north offers a perfect mix of culture and relaxation. Pack your swimwear, bring your camera, and set off early to make the most of the day.",
    ],
    stops: [
      {
        type: "place",
        slug: "pamplemousses-botanical-garden",
        name: "Pamplemousses Botanical Garden",
        position: resolvePosition("place", "pamplemousses-botanical-garden", [-20.106840692591195, 57.57966756788923]),
        link: placeLink("pamplemousses-botanical-garden"),
        image: "pamplemousses-botanical-garden.jpg",
        regionLabel: "North",
      },
      {
        type: "place",
        slug: "chateau-de-labourdonnais",
        name: "Chateau de Labourdonnais",
        position: resolvePosition("place", "chateau-de-labourdonnais", [-20.0736, 57.6176]),
        link: placeLink("chateau-de-labourdonnais"),
        image: "chateau-labourdonnais-in-mauritius.jpg",
        regionLabel: "North",
      },
      {
        type: "beach",
        slug: "trou-aux-biches",
        name: "Trou aux Biches",
        position: resolvePosition("beach", "trou-aux-biches", [-20.0345, 57.5446]),
        link: beachLink("trou-aux-biches"),
        image: "trou-aux-biches-public-beach.jpg",
        regionLabel: "North",
      },
      {
        type: "beach",
        slug: "mont-choisy",
        name: "Choisy Beach (Mont Choisy)",
        position: resolvePosition("beach", "mont-choisy", [-20.0206, 57.5556]),
        link: beachLink("mont-choisy"),
        image: "choisy-beach-bird-eye-view.jpg",
        regionLabel: "North",
      },
      {
        type: "beach",
        slug: "grand-baie",
        name: "Grand Baie & La Cuvette",
        position: resolvePosition("beach", "grand-baie", [-20.0102, 57.5831]),
        link: beachLink("grand-baie"),
        image: "grand-baie-public-beach-in-mauritius.jpeg",
        regionLabel: "North",
      },
      {
        type: "beach",
        slug: "pereybere",
        name: "Pereybere",
        position: resolvePosition("beach", "pereybere", [-19.99397, 57.59127]),
        link: beachLink("pereybere"),
        image: "pereybere-public-beach.jpg",
        regionLabel: "North",
      },
      {
        type: "beach",
        slug: "bain-boeuf",
        name: "Bain Boeuf",
        position: resolvePosition("beach", "bain-boeuf", [-19.9857, 57.6069]),
        link: beachLink("bain-boeuf"),
        image: "bain-boeuf-beach-in-mauritius.jpg",
        regionLabel: "North",
      },
      {
        type: "beach",
        slug: "cap-malheureux",
        name: "Cap Malheureux",
        position: resolvePosition("beach", "cap-malheureux", [-19.986529, 57.62228]),
        link: beachLink("cap-malheureux"),
        image: "cap-malheureux-beach-in-mauritius-island.jpg",
        regionLabel: "North",
      },
    ],
    info: [
      "It is recommended to visit Port-Louis if you are from the west or South.",
      "Pamplemousses Garden entry fee applies.",
      "Enjoy lunch at the Chateau restaurant.",
      "The Cloud - Rooftop & Lounge Bar at Pereybere.",
      "Local food at Grand Baie.",
      "Start from 9am to 6pm.",
    ],
    routeTotals: { totalDistanceKm: 35.1, totalDurationMin: 44 },
  },
  {
    id: "road-trip-south-coastal",
    slug: "road-trip-south-coastal",
    title: "Roadtrip South",
    subtitle: "Scenic south coast",
    image: "roadtrip-south.jpg",
    listingImage: "custom-itinerary-roadtrip-south.jpg",
    introParagraph: [
      "The south coast of Mauritius is where dramatic cliffs, waterfalls, and historic villages meet the Indian Ocean. This route takes you from the iconic Le Morne peninsula and Chamarel Waterfall through the refined Chateau de Bel Ombre and the wild Natural Bridge to the bustling village of Mahebourg and the crystal waters of Blue Bay—a full day of contrasts and postcard views.",
      "Drive from west to east at a relaxed pace, stop for lunch or afternoon tea at the Chateau, and leave time for snorkeling or a glass-bottom boat trip at Blue Bay. The south coast is one of the most scenic stretches on the island.",
    ],
    stops: [
      {
        type: "beach",
        slug: "le-morne",
        name: "Le Morne",
        position: resolvePosition("beach", "le-morne", [-20.452424, 57.312697]),
        link: beachLink("le-morne"),
        image: "beach-of-le-morne-in-the-morning.jpg",
        regionLabel: "South West",
      },
      {
        type: "place",
        slug: "chamarel-waterfall",
        name: "Chamarel Waterfall",
        position: resolvePosition("place", "chamarel-waterfall", [-20.440229, 57.373342]),
        link: placeLink("chamarel-waterfall"),
        image: "chamarel-waterfall.jpg",
        regionLabel: "South West",
      },
      {
        type: "place",
        slug: "chateau-de-bel-ombre",
        name: "Chateau de Bel Ombre",
        position: resolvePosition("place", "chateau-de-bel-ombre", [-20.501982, 57.412754]),
        link: placeLink("chateau-de-bel-ombre"),
        image: "chateau-de-bel-ombre-1.jpg",
        regionLabel: "South",
      },
      {
        type: "place",
        slug: "natural-bridge",
        name: "Natural Bridge",
        position: resolvePosition("place", "natural-bridge", [-20.479444, 57.658056]),
        link: placeLink("natural-bridge"),
        image: "natural-bridge-in-mauritius.jpg",
        regionLabel: "South",
      },
      {
        type: "place",
        slug: "mahebourg-village",
        name: "Mahebourg",
        position: resolvePosition("place", "mahebourg-village", [-20.40806, 57.7]),
        link: placeLink("mahebourg-village"),
        image: "mahebourg-waterfront.jpg",
        regionLabel: "South East",
      },
      {
        type: "beach",
        slug: "blue-bay",
        name: "Blue Bay",
        position: resolvePosition("beach", "blue-bay", [-20.445398, 57.716965]),
        link: beachLink("blue-bay"),
        image: "blaue-bay-national-marine-park.jpg",
        regionLabel: "South East",
      },
    ],
    info: [
      "Start from the west (Le Morne) and drive along the south coast to the east.",
      "Chamarel Waterfall entry is within the Chamarel Nature Reserve – entry fee applies.",
      "Chateau de Bel Ombre: book afternoon tea or lunch for the full experience.",
      "Mahebourg Monday market is a highlight – plan your visit accordingly.",
      "Blue Bay Marine Park is ideal for snorkeling; glass-bottom boat tours available.",
      "Allow a full day (9am–5pm) for a relaxed pace.",
    ],
    routeTotals: { totalDistanceKm: 94.9, totalDurationMin: 143 },
  },
  {
    id: "road-trip-south-west-south-east",
    slug: "road-trip-south-west-south-east",
    title: "Roadtrip South West to South East",
    subtitle: "Le Morne, Chamarel & south coast",
    image: "roadtrip-sothwest.jpg",
    listingImage: "custom-itinerary-roadtrip-southwest-southeast.jpg",
    introParagraph: [
      "This route takes you from the dramatic peninsula of Le Morne in the south-west right across to the historic village of Mahebourg and the crystal-clear waters of Blue Bay in the south-east. In between, you'll discover Chamarel Waterfall and the Seven Coloured Earth, the stunning Macondé viewpoint, and the refined Chateau de Bel Ombre—a journey through some of Mauritius's most iconic landscapes and landmarks.",
      "One day on this road trip lets you experience world-famous scenery, colonial charm, local culture, and pristine beaches. Start early, take your time at each stop, and you'll see why the south coast is often called the soul of the island.",
    ],
    stops: [
      {
        type: "beach",
        slug: "le-morne",
        name: "Le Morne",
        position: resolvePosition("beach", "le-morne", [-20.452424, 57.312697]),
        link: beachLink("le-morne"),
        image: "beach-of-le-morne-in-the-morning.jpg",
        regionLabel: "South West",
      },
      {
        type: "place",
        slug: "chamarel-waterfall",
        name: "Chamarel Waterfall",
        position: resolvePosition("place", "chamarel-waterfall", [-20.440229, 57.373342]),
        link: placeLink("chamarel-waterfall"),
        image: "chamarel-waterfall.jpg",
        regionLabel: "South West",
      },
      {
        type: "place",
        slug: "7-coloured-earth",
        name: "Seven Coloured Earth",
        position: resolvePosition("place", "7-coloured-earth", [-20.44028, 57.37333]),
        link: placeLink("7-coloured-earth"),
        image: "seven-coloured-earth.jpg",
        regionLabel: "South West",
      },
      {
        type: "place",
        slug: "maconde",
        name: "Macondé Viewpoint",
        position: resolvePosition("place", "maconde", [-20.434, 57.358]),
        link: placeLink("maconde"),
        image: "maconde-view-point.jpg",
        regionLabel: "South",
      },
      {
        type: "place",
        slug: "chateau-de-bel-ombre",
        name: "Chateau de Bel Ombre",
        position: resolvePosition("place", "chateau-de-bel-ombre", [-20.501982, 57.412754]),
        link: placeLink("chateau-de-bel-ombre"),
        image: "chateau-de-bel-ombre-1.jpg",
        regionLabel: "South",
      },
      {
        type: "place",
        slug: "mahebourg-village",
        name: "Mahebourg",
        position: resolvePosition("place", "mahebourg-village", [-20.40806, 57.7]),
        link: placeLink("mahebourg-village"),
        image: "mahebourg-waterfront.jpg",
        regionLabel: "South East",
      },
      {
        type: "beach",
        slug: "blue-bay",
        name: "Blue Bay",
        position: resolvePosition("beach", "blue-bay", [-20.445398, 57.716965]),
        link: beachLink("blue-bay"),
        image: "blaue-bay-national-marine-park.jpg",
        regionLabel: "South East",
      },
    ],
    info: [
      "Start at Le Morne and drive east along the south coast.",
      "Chamarel Waterfall and Seven Coloured Earth share the same reserve – one entry fee covers both.",
      "Macondé viewpoint: pull off the coastal road for panoramic ocean views.",
      "Chateau de Bel Ombre: book lunch or afternoon tea for the full experience.",
      "Mahebourg Monday market is a highlight – plan accordingly.",
      "Blue Bay: snorkeling and glass-bottom boat tours; allow a full day (9am–5pm) for a relaxed pace.",
    ],
    routeTotals: { totalDistanceKm: 95.9, totalDurationMin: 121 },
  },
  {
    id: "road-trip-south-east",
    slug: "road-trip-south-east",
    title: "Roadtrip South East",
    subtitle: "Beaches & landmarks of the south east",
    image: "roadtrip-south.jpg",
    listingImage: "custom-itinerary-roadtrip-north-to-southwest.jpg",
    introParagraph: [
      "A road trip in the south-east of Mauritius offers a unique blend of natural beauty, cultural heritage, and adventure. Along the way, you can discover charming villages, historical sites, and pristine beaches, all while enjoying the warm hospitality of the local people.",
      "Some of the highlights of a road trip in the east of Mauritius might include visiting the charming fishing village of Trou d'Eau Douce, exploring the historic Flacq Market, admiring the breathtaking scenery of the Bras d'Eau National Park, and discovering the beautiful beaches of Belle Mare and Palmar. You can also try your hand at various water sports, enjoy local cuisine, and shop for souvenirs.",
      "Overall, a road trip in the east of Mauritius is a fantastic way to experience the island's natural beauty, cultural diversity, and adventure.",
    ],
    stops: [
      {
        type: "place",
        slug: "mahebourg-village",
        name: "Mahebourg",
        position: resolvePosition("place", "mahebourg-village", [-20.40806, 57.7]),
        link: placeLink("mahebourg-village"),
        image: "mahebourg-waterfront.jpg",
        regionLabel: "South East",
      },
      {
        type: "beach",
        slug: "pointe-desny",
        name: "Pointe d'Esny",
        position: resolvePosition("beach", "pointe-desny", [-20.4211, 57.7317]),
        link: beachLink("pointe-desny"),
        image: "pointe-desny-allee.jpg",
        regionLabel: "South East",
      },
      {
        type: "place",
        slug: "natural-bridge",
        name: "Natural Bridge",
        position: resolvePosition("place", "natural-bridge", [-20.479444, 57.658056]),
        link: placeLink("natural-bridge"),
        image: "natural-bridge-in-mauritius.jpg",
        regionLabel: "South East",
      },
      {
        type: "beach",
        slug: "blue-bay",
        name: "Blue Bay",
        position: resolvePosition("beach", "blue-bay", [-20.445398, 57.716965]),
        link: beachLink("blue-bay"),
        image: "blaue-bay-national-marine-park.jpg",
        regionLabel: "South East",
      },
      {
        type: "beach",
        slug: "la-cambuse",
        name: "La Cambuse",
        position: resolvePosition("beach", "la-cambuse", [-20.43, 57.6833]),
        link: beachLink("la-cambuse"),
        image: "la-cambuse-beach-in-the-south.jpg",
        regionLabel: "South East",
      },
    ],
    info: [
      "Focus on the south east coast: Mahebourg, beaches and Natural Bridge.",
      "Pointe d'Esny and La Cambuse are quieter beaches; Blue Bay has the marine park.",
      "Natural Bridge (Pont Naturel) is a short drive from the coast – mind the tides.",
      "Allow a full day for the road trip.",
    ],
    routeTotals: { totalDistanceKm: 81.8, totalDurationMin: 122 },
  },
  {
    id: "must-see-waterfalls-of-mauritius",
    slug: "must-see-waterfalls-of-mauritius",
    title: "Must See Waterfalls of Mauritius",
    subtitle: "Adventure & Explore",
    image: "chamarel-waterfall.jpg",
    listingImage: "custom-itinerary-roadtrip-must-see-waterfalls.jpg",
    introParagraph: [
      "After a few years of exploring Mauritius Island, we got to (in great detail) some of the best waterfalls the island have to offer. This is what we do best and chances are most of you enjoy a good hike. In fact, as a local, this is something I thoroughly enjoy doing (especially when you've been to all the beaches around the island and now look like a grilled lobster).",
      "I know, now you think – \"But I thought Mauritius was all about beaches and luxury resorts?!\". …Well, friends, let me tell you that the paradise island is much more than what it is famous for. There are many reasons why Mauritius is known as 'heaven on Earth' – it is the ideal destination for thrill-seekers, nature lovers and anyone wanting to rediscover their sense of wonder for our planet's best islands. Mauritius got so much more to offer than Maldives or Seychelles.",
      "There are waterfalls (including one underwater), amazing mountains, treks and a collection of stunning natural wonders that remain virgin and unexplored. Now, what are you waiting for?",
    ],
    stops: [
      {
        type: "place",
        slug: "chamarel-waterfall",
        name: "Chamarel Waterfall",
        position: resolvePosition("place", "chamarel-waterfall", [-20.440229, 57.373342]),
        link: placeLink("chamarel-waterfall"),
        image: "chamarel-waterfall.jpg",
        regionLabel: "South West",
      },
      {
        type: "place",
        slug: "cascade-leon",
        name: "Cascade Leon",
        position: resolvePosition("place", "cascade-leon", [-20.498, 57.518]),
        link: placeLink("cascade-leon"),
        image: "cascade-leon-view-point.jpg",
        regionLabel: "South",
      },
      {
        type: "place",
        slug: "rochester-falls",
        name: "Rochester Falls",
        position: resolvePosition("place", "rochester-falls", [-20.50262, 57.51695]),
        link: placeLink("rochester-falls"),
        image: "rochester-fall-in-the-south.jpg",
        regionLabel: "South",
      },
      {
        type: "place",
        slug: "seven-waterfall",
        name: "Seven Waterfalls (7 Cascades)",
        position: resolvePosition("place", "seven-waterfall", [-20.375, 57.435]),
        link: placeLink("seven-waterfall"),
        image: "seven-waterfall.jpg",
        regionLabel: "South West",
      },
      {
        type: "place",
        slug: "alexandra-falls",
        name: "Alexandra Falls",
        position: resolvePosition("place", "alexandra-falls", [-20.402, 57.452]),
        link: placeLink("alexandra-falls"),
        image: "alexandra-falls.jpg",
        regionLabel: "South West",
      },
      {
        type: "place",
        slug: "eau-bleu-waterfall",
        name: "Eau Bleue Waterfall",
        position: resolvePosition("place", "eau-bleu-waterfall", [-20.382, 57.648]),
        link: placeLink("eau-bleu-waterfall"),
        image: "eau-bleue-waterfall-in-cluney.jpg",
        regionLabel: "East",
      },
      {
        type: "place",
        slug: "500-feet-waterfall",
        name: "500 Feet Waterfall (Cascade 500 Pieds)",
        position: resolvePosition("place", "500-feet-waterfall", [-20.405, 57.455]),
        link: placeLink("500-feet-waterfall"),
        image: "500-pieds-waterfall.jpg",
        regionLabel: "South",
      },
      {
        type: "place",
        slug: "grse-waterfall",
        name: "Grand River South East Waterfall",
        position: resolvePosition("place", "grse-waterfall", [-20.348, 57.758]),
        link: placeLink("grse-waterfall"),
        image: "grse-waterfall-1.jpg",
        regionLabel: "East",
      },
      {
        type: "place",
        slug: "balfour-waterfall",
        name: "Balfour Waterfall",
        position: resolvePosition("place", "balfour-waterfall", [-20.228, 57.468]),
        link: placeLink("balfour-waterfall"),
        image: "balfour-waterfall.jpg",
        regionLabel: "South",
      },
    ],
    info: [
      "Chamarel Waterfall is inside the nature reserve (entry fee); combine with Seven Coloured Earth.",
      "Rochester Falls and Cascade Leon are in the south; Leon requires a hike from near Rochester.",
      "Seven Waterfalls (7 Cascades): guided canyoning or hiking – book in advance.",
      "Alexandra Falls and 500 Pieds are in Black River Gorges NP; 500 Pieds is a steeper hike from Alexandra car park.",
      "Eau Bleue is free; GRSE is best by boat tour (often combined with Ile aux Cerfs).",
      "Best flow October–April; wear sturdy shoes and bring swimwear where allowed.",
    ],
    routeTotals: { totalDistanceKm: 291.9, totalDurationMin: 600 },
  },
  {
    id: "1-day-in-port-louis",
    slug: "1-day-in-port-louis",
    title: "1 Day in Port-Louis",
    subtitle: "Capital highlights: waterfront, heritage & museums",
    image: "caudan-waterfront-port-louis-mauritius.jpg",
    listingImage: "custom-itinerary-roadtrip-1-day-portlouis.jpg",
    introParagraph: [
      "Port Louis, the capital of Mauritius, is a vibrant city where history, culture, and modern life come together. Founded by the French in 1729 and named after King Louis XV, the city quickly became the island's main administrative center and port.",
      "Located between the Indian Ocean and a ring of mountains, Port Louis offers a unique blend of colonial heritage and modern development. French and British influences can still be seen in the architecture, historic streets, and landmarks throughout the city.",
      "Today, Port Louis is one of the best places to experience the energy of Mauritius. From historic sites and colorful markets to modern shopping areas and the waterfront, there are many things to do in Port Louis.",
      "The best way to discover the capital is simply to explore on foot. As you wander through its streets, you'll uncover hidden gems, historic buildings, and some of the most iconic attractions in Mauritius.",
    ],
    stops: [
      {
        type: "place",
        slug: "caudan-waterfront",
        name: "Caudan Waterfront",
        position: resolvePosition("place", "caudan-waterfront", [-20.161389, 57.498333]),
        link: placeLink("caudan-waterfront"),
        image: "caudan-waterfront-port-louis-mauritius.jpg",
        regionLabel: "Port Louis",
      },
      {
        type: "place",
        slug: "national-post",
        name: "National Post",
        position: resolvePosition("place", "national-post", [-20.16, 57.50165]),
        link: placeLink("national-post"),
        image: "national-post-port-louis-mauritius.jpg",
        regionLabel: "Port Louis",
      },
      {
        type: "place",
        slug: "aapravasi-ghat",
        name: "Aapravasi Ghat",
        position: resolvePosition("place", "aapravasi-ghat", [-20.158611, 57.503056]),
        link: placeLink("aapravasi-ghat"),
        image: "aapravasi-ghat-1.jpg",
        regionLabel: "Port Louis",
      },
      {
        type: "place",
        slug: "national-history-museum",
        name: "National History Museum",
        position: resolvePosition("place", "national-history-museum", [-20.163167, 57.502361]),
        link: placeLink("national-history-museum"),
        image: "national-history-museum-port-louis-mauritius.jpg",
        regionLabel: "Port Louis",
      },
      {
        type: "place",
        slug: "citadel-fort",
        name: "Citadel Fort (Fort Adelaide)",
        position: resolvePosition("place", "citadel-fort", [-20.163658, 57.510166]),
        link: placeLink("citadel-fort"),
        image: "la-citadel-fort.jpg",
        regionLabel: "Port Louis",
      },
      {
        type: "place",
        slug: "champ-de-mars",
        name: "Champ de Mars",
        position: resolvePosition("place", "champ-de-mars", [-20.169159, 57.510089]),
        link: placeLink("champ-de-mars"),
        image: "champ-de-mars-1.jpg",
        regionLabel: "Port Louis",
      },
    ],
    info: [
      "Start at Caudan Waterfront for shopping and harbour views; then walk or short drive to National Post, then Aapravasi Ghat (UNESCO site, free).",
      "National Post: iconic clock tower; send a postcard. National History Museum: dodo and natural history (check opening hours).",
      "Citadel Fort: climb or drive up for 360° views over Port Louis; free, best in late afternoon.",
      "Champ de Mars: racecourse; visit on race days (Mar–Dec) or admire the historic venue.",
      "Avoid Saturday afternoon (many shops close); weekdays are best for museums and post office.",
    ],
    routeTotals: { totalDistanceKm: 6.3, totalDurationMin: 13 },
  },
  {
    id: "best-instagram-photo-location",
    slug: "best-instagram-photo-location",
    title: "Best Instagram Photo Spots",
    subtitle: "Iconic gardens, waterfront, nature & aerial views",
    image: "pamplemousses-botanical-garden.jpg",
    listingImage: "custom-itinerary-roadtrip-best-snorkeling-spots.jpg",
    introParagraph: [
      "Mauritius is full of spots that look like they were made for the 'gram—from giant water lilies and umbrella alleys to sacred lakes, mountain viewpoints, and even an underwater waterfall. This itinerary strings together some of the island's most photogenic places: Pamplemousses Botanical Garden, Caudan Waterfront, Grand Bassin (Ganga Talao), Black River Gorges, Crystal Rock, and the famous Underwater Waterfall experience.",
      "Whether you're after golden-hour shots, cultural backdrops, or once-in-a-lifetime aerial views, these stops will fill your feed with the best of Mauritius. Book helicopter or boat tours in advance for Crystal Rock and the Underwater Waterfall.",
    ],
    stops: [
      {
        type: "place",
        slug: "pamplemousses-botanical-garden",
        name: "Pamplemousses Botanical Garden",
        position: resolvePosition("place", "pamplemousses-botanical-garden", [-20.106840692591195, 57.57966756788923]),
        link: placeLink("pamplemousses-botanical-garden"),
        image: "pamplemousses-botanical-garden.jpg",
        regionLabel: "North",
      },
      {
        type: "place",
        slug: "caudan-waterfront",
        name: "Caudan Waterfront",
        position: resolvePosition("place", "caudan-waterfront", [-20.161389, 57.498333]),
        link: placeLink("caudan-waterfront"),
        image: "caudan-waterfront-port-louis-mauritius.jpg",
        regionLabel: "North",
      },
      {
        type: "place",
        slug: "grand-bassin",
        name: "Grand Bassin (Ganga Talao)",
        position: resolvePosition("place", "grand-bassin", [-20.41806, 57.49194]),
        link: placeLink("grand-bassin"),
        image: "grand-bassin-shiva-statue.jpg",
        regionLabel: "South",
      },
      {
        type: "place",
        slug: "black-river-gorges",
        name: "Black River Gorges",
        position: resolvePosition("place", "black-river-gorges", [-20.416667, 57.416667]),
        link: placeLink("black-river-gorges"),
        image: "black-river-gorges-view-point.jpg",
        regionLabel: "South West",
      },
      {
        type: "place",
        slug: "crystal-rock",
        name: "Crystal Rock",
        position: resolvePosition("place", "crystal-rock", [-20.428, 57.338]),
        link: placeLink("crystal-rock"),
        image: "crystal-rock-with-le-morne-behind.jpg",
        regionLabel: "West",
      },
      {
        type: "activity",
        slug: "underwater-waterfall",
        name: "Underwater Waterfall Tour",
        position: resolvePosition("activity", "underwater-waterfall", [-20.44, 57.32]),
        link: activityLink("underwater-waterfall"),
        image: "underwater-waterfall-in-mauritius.jpg",
        regionLabel: "South West",
      },
    ],
    info: [
      "Route runs north to south then west: start at Pamplemousses and Caudan, then Grand Bassin, Black River Gorges, Crystal Rock, and the Underwater Waterfall experience.",
      "Pamplemousses: giant water lilies and baobabs – best in morning light.",
      "Caudan: umbrella alley and harbour – great for golden hour.",
      "Grand Bassin: dress modestly; the Shiva statue and lake are iconic.",
      "Black River Gorges: viewpoints and forest trails – bring water and good shoes.",
      "Crystal Rock: book a boat tour from Le Morne or Black River; low tide is best for photos.",
      "Underwater Waterfall: helicopter or seaplane from Le Morne/airport – book in advance.",
    ],
    routeTotals: { totalDistanceKm: 83, totalDurationMin: 101 },
  },
];
