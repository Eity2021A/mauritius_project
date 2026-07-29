import { getHotelOfficialUrl } from "@/data/hotel-urls";

export interface VerandaHotel {
  slug: string;
  name: string;
  shortName: string;
  location: string;
  region: string;
  rating: string;
  style: string;
  priceFrom: string;
  tagline: string;
  description: string[];
  highlights: string[];
  idealFor: string[];
  experiences: string[];
  practicalTips: string[];
  rooms: string[];
  dining: string[];
  gallery: string[];
  heroImage: string;
  coordinates: [number, number];
  tags: string[];
  accent: string;
  boardBasis: string;
  beachStyle: string;
  bookingUrl?: string;
}

const SHARED_GALLERY = [
  "/images/banners/luxury-beach-resort-aerial-mauritius.jpg",
  "/images/banners/mauritius-beach-resort-palm-trees.jpg",
  "/images/banners/le-morne-beach-resort-sunset-mauritius.jpg",
];

export const VERANDA_HOTELS: VerandaHotel[] = [
  {
    slug: "veranda-pointe-aux-biches",
    name: "Veranda Pointe aux Biches",
    shortName: "Pointe aux Biches",
    location: "Pointe aux Piments",
    region: "north",
    rating: "4+ star",
    style: "Family & Barefoot",
    priceFrom: "From EUR150",
    tagline: "Barefoot-chic beach time with family-friendly energy and a quiet adults-only wing.",
    description: [
      "Veranda Pointe aux Biches blends easy family beach days with a more grown-up escape thanks to its dedicated Privilege wing. It is one of the strongest Veranda choices if you want Mauritian warmth without a stiff luxury feel.",
      "The hotel sits on the north-west coast, making it handy for calm lagoon time, sunset colours and day trips towards Grand Baie, Port Louis and the north coast beaches.",
    ],
    highlights: [
      "Barefoot concept with a relaxed island feel",
      "Dedicated adults-only Privilege wing",
      "Good balance of family spaces and quiet corners",
      "North-west coast sunsets and easy touring base",
    ],
    idealFor: [
      "Families wanting beach time and kids' activities",
      "Couples who want value with some adult-only calm",
      "Travellers splitting time between resort days and island exploring",
    ],
    experiences: [
      "Lagoon swimming and relaxed beach days",
      "Spa time and slower afternoons in the Privilege wing",
      "Easy access to northern beaches and villages",
    ],
    practicalTips: [
      "Best if you want the north coast without staying in busy Grand Baie itself.",
      "Ask about Privilege wing options if quiet time matters.",
      "A rental car or transfer plan works well from here for north and west day trips.",
    ],
    rooms: [
      "Comfort rooms for easy resort stays",
      "Privilege rooms for the adults-only section",
      "Family-friendly layouts for longer beach holidays",
    ],
    dining: [
      "Main restaurant for generous buffet meals",
      "Beachfront dining with a laid-back island tone",
      "Cocktails and sunset drinks with a casual crowd",
    ],
    gallery: SHARED_GALLERY,
    heroImage: "/images/banners/mauritius-beach-resort-palm-trees.jpg",
    coordinates: [-20.0437, 57.5348],
    tags: ["family", "north", "beach", "adults-only wing"],
    accent: "from-[#0f6e8c] to-[#46b2cc]",
    boardBasis: "Half board or all-inclusive style stays depending on offer",
    beachStyle: "Calm lagoon with sunset-facing north-west light",
    bookingUrl: getHotelOfficialUrl("Veranda Pointe aux Biches"),
  },
  {
    slug: "veranda-paul-and-virginie",
    name: "Veranda Paul & Virginie",
    shortName: "Paul & Virginie",
    location: "Grand Gaube",
    region: "north",
    rating: "4 star",
    style: "Adults-Only Romance",
    priceFrom: "From EUR175",
    tagline: "An adults-only hideaway for slow mornings, spa rituals and romantic lagoon views.",
    description: [
      "Veranda Paul & Virginie is the most couple-focused hotel in the collection, with an adults-only atmosphere and a softer, more intimate rhythm than the family-led resorts.",
      "Set in Grand Gaube, it feels removed from crowds while still keeping the north coast within reach for catamaran trips, village stops and scenic drives.",
    ],
    highlights: [
      "Adults-only boutique feel",
      "Quiet lagoon outlook in an authentic fishing village",
      "Strong honeymoon and couples appeal",
      "Gentle pace with spa, dining and boat-trip options",
    ],
    idealFor: [
      "Honeymoons and anniversary trips",
      "Couples wanting a peaceful north coast base",
      "Travellers who prefer a smaller, quieter resort mood",
    ],
    experiences: [
      "Sunrise coffees and long lagoon-view breakfasts",
      "Romantic dinners and relaxed spa sessions",
      "North coast boat trips and village exploring",
    ],
    practicalTips: [
      "This is the best Veranda pick if adults-only is the priority.",
      "Grand Gaube feels quieter than Grand Baie, so nightlife is not the main draw.",
      "Plan transfers or a car if you want to explore the north frequently.",
    ],
    rooms: [
      "Couple-friendly room categories with sea-facing appeal",
      "Boutique-style interiors with calm tones",
      "Good upgrade potential for special trips",
    ],
    dining: [
      "Romantic dinners with a slower service rhythm",
      "Cocktail moments around sunset",
      "A quieter dining mood than the more family-oriented Veranda resorts",
    ],
    gallery: [
      "/images/banners/luxury-beach-resort-aerial-mauritius.jpg",
      "/images/banners/mauritius-beach-resort-palm-trees.jpg",
      "/images/banners/le-morne-beach-resort-sunset-mauritius.jpg",
    ],
    heroImage: "/images/banners/luxury-beach-resort-aerial-mauritius.jpg",
    coordinates: [-20.0068, 57.6601],
    tags: ["adults-only", "north", "romance", "boutique"],
    accent: "from-[#12707a] to-[#5bc4c9]",
    boardBasis: "Usually half board with upgrade offers depending on season",
    beachStyle: "Quiet lagoon setting with a more intimate village backdrop",
    bookingUrl: getHotelOfficialUrl("Veranda Paul & Virginie"),
  },
  {
    slug: "veranda-grand-baie",
    name: "Veranda Grand Baie",
    shortName: "Grand Baie",
    location: "Grand Baie",
    region: "north",
    rating: "4 star",
    style: "Lively All-Inclusive",
    priceFrom: "From EUR165",
    tagline: "A sociable all-inclusive stay in the middle of Mauritius' best-known coastal town.",
    description: [
      "Veranda Grand Baie suits travellers who want the convenience of a resort while staying right near restaurants, shops, bars and the buzz of the north coast.",
      "Compared with the quieter Veranda options, this one is more about location and energy, making it a strong pick if you do not want to feel isolated at your hotel.",
    ],
    highlights: [
      "Grand Baie location close to nightlife and shopping",
      "All-inclusive convenience with a lively atmosphere",
      "Good for short stays and first-time visitors",
      "Easy launch point for north coast activities",
    ],
    idealFor: [
      "Travellers who want everything close by",
      "Couples and friends who like a livelier base",
      "Guests who prefer all-inclusive value and walkable surroundings",
    ],
    experiences: [
      "Beach clubs, shopping and marina-side evenings",
      "Quick access to catamaran trips and north tours",
      "A more social holiday rhythm than the quieter Veranda hotels",
    ],
    practicalTips: [
      "Best for people who want the north coast action, not total seclusion.",
      "Perfect if you plan to go out in Grand Baie without relying on long transfers.",
      "Book early in peak periods if location matters most to you.",
    ],
    rooms: [
      "Contemporary rooms suited to easy resort stays",
      "Comfortable base for shorter or activity-heavy trips",
      "Practical layouts for couples and small families",
    ],
    dining: [
      "All-inclusive convenience with easy-going resort dining",
      "Nearby Grand Baie restaurants if you want variety outside the hotel",
      "Good choice if food-and-drink flexibility matters",
    ],
    gallery: [
      "/images/banners/luxury-beach-resort-aerial-mauritius.jpg",
      "/images/banners/mauritius-beach-resort-palm-trees.jpg",
      "/images/banners/le-morne-beach-resort-sunset-mauritius.jpg",
    ],
    heroImage: "/images/banners/luxury-beach-resort-aerial-mauritius.jpg",
    coordinates: [-20.0099, 57.5818],
    tags: ["all-inclusive", "north", "lively", "village life"],
    accent: "from-[#0e7c8a] to-[#2aa9b2]",
    boardBasis: "All-inclusive focus with flexible promotional packages",
    beachStyle: "Town-side lagoon living close to marinas, cafes and beaches",
    bookingUrl: getHotelOfficialUrl("Veranda Grand Baie"),
  },
  {
    slug: "veranda-tamarin",
    name: "Veranda Tamarin",
    shortName: "Tamarin",
    location: "Tamarin Bay",
    region: "west",
    rating: "3 star",
    style: "Surf & Bohemian",
    priceFrom: "From EUR140",
    tagline: "West-coast surf-town style with sunset energy and an easygoing boutique mood.",
    description: [
      "Veranda Tamarin feels the most different from the other Veranda properties, with a laid-back west coast personality, retro-boho styling and a stronger connection to local surf-town character.",
      "It is a great base for dolphin trips, Le Morne days, Chamarel outings and sunset-focused stays, especially if you want something more casual than a classic resort formula.",
    ],
    highlights: [
      "Boho-west-coast design personality",
      "Great base for dolphins, Le Morne and Chamarel",
      "Popular for sunset lovers and active travellers",
      "Tamarin location with a more local, lived-in atmosphere",
    ],
    idealFor: [
      "Couples and friends who prefer style over formal luxury",
      "Travellers exploring the west coast heavily",
      "Guests drawn to surf culture, sunsets and a younger feel",
    ],
    experiences: [
      "Dolphin-boat mornings and west-coast drives",
      "Sunset sessions after beach or hiking days",
      "Casual stays with strong out-and-about potential",
    ],
    practicalTips: [
      "Best choice in the collection for west coast adventures.",
      "Ideal if you plan to combine resort time with driving around Le Morne, Black River and Chamarel.",
      "Expect more personality and exploration value than polished luxury.",
    ],
    rooms: [
      "Casual boutique-style rooms with warm tones",
      "Good-value stays for couples and active travellers",
      "Designed more for relaxed comfort than classic luxury resort scale",
    ],
    dining: [
      "Laid-back dining with west-coast character",
      "Easygoing bars and social spaces for sunset drinks",
      "Great surrounding area if you like trying cafes outside the resort too",
    ],
    gallery: [
      "/images/banners/le-morne-beach-resort-sunset-mauritius.jpg",
      "/images/banners/luxury-beach-resort-aerial-mauritius.jpg",
      "/images/banners/mauritius-beach-resort-palm-trees.jpg",
    ],
    heroImage: "/images/banners/le-morne-beach-resort-sunset-mauritius.jpg",
    coordinates: [-20.3289, 57.3706],
    tags: ["west", "surf", "boho", "sunsets"],
    accent: "from-[#e0742a] to-[#f2b24e]",
    boardBasis: "Flexible board plans depending on season and package",
    beachStyle: "West-coast bay energy with golden-hour sunsets and surf-town spirit",
    bookingUrl: getHotelOfficialUrl("Veranda Tamarin"),
  },
  {
    slug: "veranda-palmar-beach",
    name: "Veranda Palmar Beach",
    shortName: "Palmar Beach",
    location: "Palmar / Belle Mare",
    region: "east",
    rating: "3+ star",
    style: "Relaxed Family Beach",
    priceFrom: "From EUR130",
    tagline: "An easy-value east-coast beach stay on one of Mauritius' prettiest lagoon shores.",
    description: [
      "Veranda Palmar Beach is a straightforward choice for travellers who care most about being on a beautiful east-coast beach without stepping into a high-end price bracket.",
      "The Belle Mare and Palmar coastline is known for long white sand and bright lagoon colours, so this property works well for simple resort days and beach-first holidays.",
    ],
    highlights: [
      "Strong value on a beautiful east-coast beach",
      "Family-friendly and easy to understand",
      "Good lagoon setting for relaxing beach days",
      "Simple base for travellers prioritising the shoreline",
    ],
    idealFor: [
      "Families seeking good beach value",
      "Couples who want a quiet lagoon stay",
      "Travellers who care more about location than ultra-luxury facilities",
    ],
    experiences: [
      "Long beach walks and gentle lagoon swims",
      "Slow resort days with fewer distractions",
      "East-coast scenery and easy Belle Mare access",
    ],
    practicalTips: [
      "A smart choice if you want east-coast beauty without paying luxury-resort rates.",
      "Best for quieter trips rather than nightlife-led holidays.",
      "Useful as a beach stay when you mainly want to unwind on property.",
    ],
    rooms: [
      "Comfort-first rooms for good-value beach stays",
      "Practical choices for couples and families",
      "Simple, bright layouts matched to the price point",
    ],
    dining: [
      "Relaxed resort dining with easy family appeal",
      "Good fit for travellers who want uncomplicated beach-holiday meals",
      "More about value and comfort than destination dining",
    ],
    gallery: [
      "/images/banners/mauritius-beach-resort-palm-trees.jpg",
      "/images/banners/luxury-beach-resort-aerial-mauritius.jpg",
      "/images/banners/le-morne-beach-resort-sunset-mauritius.jpg",
    ],
    heroImage: "/images/banners/mauritius-beach-resort-palm-trees.jpg",
    coordinates: [-20.1998, 57.7895],
    tags: ["east", "family", "beach", "value"],
    accent: "from-[#1c8a78] to-[#5fc59a]",
    boardBasis: "Usually offered with easy value-led meal plans",
    beachStyle: "Long east-coast sand with bright lagoon colours and breezier conditions",
    bookingUrl: getHotelOfficialUrl("Veranda Palmar Beach"),
  },
];

export function getAllVerandaHotelSlugs(): string[] {
  return VERANDA_HOTELS.map((hotel) => hotel.slug);
}

export function getVerandaHotelBySlug(slug: string): VerandaHotel | undefined {
  return VERANDA_HOTELS.find((hotel) => hotel.slug === slug);
}

export function getRelatedVerandaHotels(slug: string, limit = 3): VerandaHotel[] {
  const currentHotel = getVerandaHotelBySlug(slug);
  if (!currentHotel) return VERANDA_HOTELS.filter((hotel) => hotel.slug !== slug).slice(0, limit);

  const sameRegion = VERANDA_HOTELS.filter(
    (hotel) => hotel.slug !== slug && hotel.region === currentHotel.region
  );
  const others = VERANDA_HOTELS.filter(
    (hotel) => hotel.slug !== slug && hotel.region !== currentHotel.region
  );

  return [...sameRegion, ...others].slice(0, limit);
}
