import type { Redirect } from "next/dist/lib/load-custom-routes";

// 301 redirects converted from C:/Users/Eity/Downloads/redirects-code.txt.
// Keep these static redirects in Next.js config; the original file is Express middleware.
export const legacyRedirects: Redirect[] = [
  {
    source: "/facts-about-mauritius/",
    destination: "https://www.mauritiusexplored.com/mauritius-island",
    permanent: true,
  },
  {
    source: "/itineraries-mauritius/",
    destination: "https://www.mauritiusexplored.com/mauritius-itinerary",
    permanent: true,
  },
  {
    source: "/port-louis-capital-of-mauritius/",
    destination: "https://www.mauritiusexplored.com/best-places-to-visit-in-mauritius/port-louis",
    permanent: true,
  },
  {
    source: "/mini-moke-rental/",
    destination: "https://www.mauritiusexplored.com/car-rental-mauritius",
    permanent: true,
  },
  {
    source: "/best-restaurants-in-mauritius/",
    destination: "https://www.mauritiusexplored.com/blog/best-places-to-eat-in-mauritius-2026-guide",
    permanent: true,
  },
  {
    source: "/transfer",
    destination: "https://www.mauritiusexplored.com/mauritius-transfer-airport-hotel",
    permanent: true,
  },
  {
    source: "/mauritius-now/",
    destination: "https://www.mauritiusexplored.com/mauritius-island",
    permanent: true,
  },
  {
    source: "/cultural-places-to-visit-in-mauritius/",
    destination: "https://www.mauritiusexplored.com/cultural-places-of-mauritius",
    permanent: true,
  },
  {
    source: "/mauritius-honeymoon-guide/",
    destination: "https://www.mauritiusexplored.com/blog/say-i-do-in-mauritius",
    permanent: true,
  },
  {
    source: "/places_of_interest/black-river-gorges-view-point/",
    destination: "https://www.mauritiusexplored.com/best-places-to-visit-in-mauritius/black-river-gorges",
    permanent: true,
  },
  {
    source: "/best-things-to-do-in-mauritius/",
    destination: "https://www.mauritiusexplored.com/top-15-things-to-do-in-mauritius",
    permanent: true,
  },
  {
    source: "/blue-bay-mauritius/",
    destination: "https://www.mauritiusexplored.com/best-places-to-visit-in-mauritius/blue-bay-marine-park",
    permanent: true,
  },
  {
    source: "/le-morne-beach/",
    destination: "https://www.mauritiusexplored.com/beaches-in-mauritius/le-morne",
    permanent: true,
  },
  {
    source: "/wellness-resorts-in-mauritius/",
    destination: "https://www.mauritiusexplored.com/blog/wellness-resorts-in-mauritius",
    permanent: true,
  },
  {
    source: "/luxury-hotels-in-mauritius/",
    destination: "https://www.mauritiusexplored.com/blog/luxury-hotels-in-mauritius",
    permanent: true,
  },
  {
    source: "/places-to-visit-",
    destination: "https://www.mauritiusexplored.com/mauritius-island",
    permanent: true,
  },
  {
    source: "/explore-the-south-coast-of-mauritius/",
    destination: "https://www.mauritiusexplored.com/south-mauritius-travel-guide",
    permanent: true,
  },
  {
    source: "/trou-aux-biches-beach/",
    destination: "https://www.mauritiusexplored.com/beaches-in-mauritius/trou-aux-biches",
    permanent: true,
  },
  {
    source: "/best-diving-spots-in-mauritius/",
    destination: "https://www.mauritiusexplored.com/blog/best-diving-spots-in-mauritius",
    permanent: true,
  },
  {
    source: "/exploring-mahebourg-mauritius/",
    destination: "https://www.mauritiusexplored.com/exploring-mahebourg",
    permanent: true,
  },
  {
    source: "/ile-aux-cerfs-mauritius/",
    destination: "https://www.mauritiusexplored.com/best-places-to-visit-in-mauritius/ile-aux-cerfs",
    permanent: true,
  },
  {
    source: "/tamarin-beach/",
    destination: "https://www.mauritiusexplored.com/beaches-in-mauritius/tamarin",
    permanent: true,
  },
  {
    source: "/beaches/beaches-of-the-south",
    destination: "https://www.mauritiusexplored.com/blog/south-mauritius-road-trip-guide",
    permanent: true,
  },
  {
    source: "/belle-mare-beach/",
    destination: "https://www.mauritiusexplored.com/beaches-in-mauritius/belle-mare",
    permanent: true,
  },
  {
    source: "/best-golf-resorts-in-mauritius/",
    destination: "https://www.mauritiusexplored.com/blog/best-golf-courses-in-mauritius",
    permanent: true,
  },
  {
    source: "/best-snorkelling-mauritius/",
    destination: "https://www.mauritiusexplored.com/blog/best-snorkelling-spots-in-mauritius",
    permanent: true,
  },
  {
    source: "/exploring-chamarel-mauritius/",
    destination: "https://www.mauritiusexplored.com/exploring-chamarel",
    permanent: true,
  },
  {
    source: "/flic-en-flac-beach/",
    destination: "https://www.mauritiusexplored.com/beaches-in-mauritius/flic-en-flac",
    permanent: true,
  },
  {
    source: "/mauritius-local-food-guide/",
    destination: "https://www.mauritiusexplored.com/blog/mauritius-local-food-guide",
    permanent: true,
  },
  {
    source: "/mauritius-travel-guide/",
    destination: "https://www.mauritiusexplored.com/travel-planner",
    permanent: true,
  },
  {
    source: "/plan-your-trip/",
    destination: "https://www.mauritiusexplored.com/mauritius-itinerary",
    permanent: true,
  },
  {
    source: "/romantic-things-to-do-mauritius/",
    destination: "https://www.mauritiusexplored.com/blog/mauritius-honeymoon-guide",
    permanent: true,
  },
  {
    source: "/things-to-do-in-grand-baie/",
    destination: "https://www.mauritiusexplored.com/beaches-in-mauritius/grand-baie",
    permanent: true,
  },
  {
    source: "/things-to-do-in-le-morne-and-chamarel/",
    destination: "https://www.mauritiusexplored.com/blog/25-things-to-do-in-le-morne-and-chamarel",
    permanent: true,
  },
  {
    source: "/waterfalls-in-mauritius/",
    destination: "https://www.mauritiusexplored.com/best-waterfalls-of-mauritius",
    permanent: true,
  },
  {
    source: "/best-beaches-in-mauritius/",
    destination: "https://www.mauritiusexplored.com/beaches-in-mauritius",
    permanent: true,
  },
  {
    source: "/mauritius/",
    destination: "https://www.mauritiusexplored.com/mauritius-island",
    permanent: true,
  },
  {
    source: "/places-to-visit-in-mauritius/",
    destination: "https://www.mauritiusexplored.com/best-places-to-visit-in-mauritius",
    permanent: true,
  },
  {
    source: "/home/",
    destination: "https://www.mauritiusexplored.com/",
    permanent: true,
  },
  {
    source: "/best-catamaran-cruise-mauritius/",
    destination: "https://www.mauritiusexplored.com/blog/best-catamaran-cruise-mauritius",
    permanent: true,
  },
  {
    source: "/top-activities-mauritius/",
    destination: "https://www.mauritiusexplored.com/top-15-things-to-do-in-mauritius",
    permanent: true,
  },
  {
    source: "/booking-kayak/",
    destination: "https://www.mauritiusexplored.com/top-activities-mauritius/kayak-with-dolphins-mauritius",
    permanent: true,
  },
  {
    source: "/hiking-spots-in-mauritius/",
    destination: "https://www.mauritiusexplored.com/top-activities-mauritius/hiking-le-morne",
    permanent: true,
  },
  {
    source: "/cafes-and-restaurants-in-mauritius/",
    destination: "https://www.mauritiusexplored.com/blog/best-places-to-eat-in-mauritius-2026-guide",
    permanent: true,
  },
  {
    source: "/booking-helicopter/",
    destination: "https://www.mauritiusexplored.com/top-activities-mauritius/helicopter-tour",
    permanent: true,
  },
  {
    source: "/best-hotels-in-mauritius/",
    destination: "https://www.mauritiusexplored.com/blog/luxury-hotels-in-mauritius",
    permanent: true,
  },
  {
    source: "/booking-hiking/",
    destination: "https://www.mauritiusexplored.com/top-activities-mauritius/hiking-le-morne",
    permanent: true,
  },
  {
    source: "/green-tourism-in-mauritius/",
    destination: "https://www.mauritiusexplored.com/mauritius-island",
    permanent: true,
  },
  {
    source: "/have-a-chic-picnic-into-the-wild-at-heritage-nature-reserve/",
    destination: "https://www.mauritiusexplored.com/top-activities-mauritius/day-package-at-bel-ombre-nature-reserve",
    permanent: true,
  },
  {
    source: "/honeymoon-wedding/",
    destination: "https://www.mauritiusexplored.com/blog/say-i-do-in-mauritius",
    permanent: true,
  },
  {
    source: "/trip-itinerary-essential/",
    destination: "https://www.mauritiusexplored.com/roadtrip-mauritius",
    permanent: true,
  },
  {
    source: "/say-i-do-in-mauritius/",
    destination: "https://www.mauritiusexplored.com/blog/say-i-do-in-mauritius",
    permanent: true,
  },
  {
    source: "/on-the-heights-of-chamarel/",
    destination: "https://www.mauritiusexplored.com/blog/lakaz-chamarel-piton-canot-lodge",
    permanent: true,
  },
  {
    source: "/discover-the-beautiful-wild-south/",
    destination: "https://www.mauritiusexplored.com/blog/south-mauritius-road-trip-guide",
    permanent: true,
  },
  {
    source: "/martello-towers-in-mauritius/",
    destination: "https://www.mauritiusexplored.com/best-places-to-visit-in-mauritius/martello-tower-museum",
    permanent: true,
  },
  {
    source: "/12-must-see-island-in-mauritius/",
    destination: "https://www.mauritiusexplored.com/blog/the-ultimate-island-hopping-experience-mauritius",
    permanent: true,
  },
  {
    source: "/booking-catamaran/",
    destination: "https://www.mauritiusexplored.com/top-activities-mauritius/catamaran-cruise-to-ilot-benitiers-shared",
    permanent: true,
  },
  {
    source: "/chalets-chamarel-in-mauritius/",
    destination: "https://www.mauritiusexplored.com/blog/lakaz-chamarel-piton-canot-lodge",
    permanent: true,
  },
  {
    source: "/family-itinerary-plan/",
    destination: "https://www.mauritiusexplored.com/family-holiday-guide-for-mauritius-island",
    permanent: true,
  },
  {
    source: "/golf-in-mauritius/",
    destination: "https://www.mauritiusexplored.com/blog/best-golf-courses-in-mauritius",
    permanent: true,
  },
  {
    source: "/kitesurf-in-mauritius/",
    destination: "https://www.mauritiusexplored.com/blog/best-surf-kitesurf-spots-mauritius",
    permanent: true,
  },
  {
    source: "/top-activities-to-do-in-mauritius/",
    destination: "https://www.mauritiusexplored.com/top-15-things-to-do-in-mauritius",
    permanent: true,
  },
  {
    source: "/festival/",
    destination: "https://www.mauritiusexplored.com/festivals-in-mauritius",
    permanent: true,
  },
  {
    source: "/catamaran-cruise-to-benitiers-island/",
    destination: "https://www.mauritiusexplored.com/top-activities-mauritius/catamaran-cruise-to-ilot-benitiers-shared",
    permanent: true,
  },
  {
    source: "/best-time-to-visit-to-mauriti",
    destination: "https://www.mauritiusexplored.com/best-time-to-visit-to-mauritius",
    permanent: true,
  },
  {
    source: "/mauritius-all-you-need-to-know/",
    destination: "https://www.mauritiusexplored.com/mauritius-island",
    permanent: true,
  },
  {
    source: "/portfolio-category/waterfalls/",
    destination: "https://www.mauritiusexplored.com/best-waterfalls-of-mauritius",
    permanent: true,
  },
  {
    source: "/Mauritius-island/",
    destination: "https://www.mauritiusexplored.com/mauritius-island",
    permanent: true,
  },
  {
    source: "/portfolio_page/catamaran-cruises-mauritius/",
    destination: "https://www.mauritiusexplored.com/blog/best-catamaran-cruise-mauritius",
    permanent: true,
  },
  {
    source: "/activitie/catamaran-cruises-ile-aux-cerfs/",
    destination: "https://www.mauritiusexplored.com/top-activities-mauritius/catamaran-cruises-ile-aux-cerfs-shared",
    permanent: true,
  },
  {
    source: "/activitie/catamaran-cruises-ilot-gabriel/",
    destination: "https://www.mauritiusexplored.com/top-activities-mauritius/catamaran-cruise-on-shared-basis-to-ilot-gabriel-northern-islands",
    permanent: true,
  },
  {
    source: "/places_of_interest/place-du-moulin/",
    destination: "https://www.mauritiusexplored.com/best-places-to-visit-in-mauritius/moulin",
    permanent: true,
  },
  {
    source: "/portfolio_page/place-du-moulin/",
    destination: "https://www.mauritiusexplored.com/best-places-to-visit-in-mauritius/moulin",
    permanent: true,
  },
  {
    source: "/places_of_interest/port-louis-market/",
    destination: "https://www.mauritiusexplored.com/best-places-to-visit-in-mauritius/port-louis-market",
    permanent: true,
  },
  {
    source: "/cascade-leon",
    destination: "https://www.mauritiusexplored.com/best-places-to-visit-in-mauritius/cascade-leon",
    permanent: true,
  },
  {
    source: "/activitie/catamaran-cruises/",
    destination: "https://www.mauritiusexplored.com/blog/best-catamaran-cruise-mauritius",
    permanent: true,
  },
  {
    source: "/festival/holi/",
    destination: "https://www.mauritiusexplored.com/festivals-in-mauritius",
    permanent: true,
  },
  {
    source: "/portfolio_page/black-river-gorges/",
    destination: "https://www.mauritiusexplored.com/top-activities-mauritius/black-river-gorges",
    permanent: true,
  },
  {
    source: "/catamaran-cruise-to-benitiers-island-a-trip-in-tropical-paradise/",
    destination: "https://www.mauritiusexplored.com/top-activities-mauritius/catamaran-cruise-to-ilot-benitiers-shared",
    permanent: true,
  },
  {
    source: "/meilleures-spots-de-snorkeling-mauritius/",
    destination: "https://www.mauritiusexplored.com/blog/best-snorkelling-spots-in-mauritius",
    permanent: true,
  },
  {
    source: "/destinations/seven-coloured-earth/",
    destination: "https://www.mauritiusexplored.com/best-places-to-visit-in-mauritius/7-coloured-earth",
    permanent: true,
    has: [
      { type: "host", value: "new.mauritiusexplored.com" },
    ],
  },
  {
    source: "/de/top-activities-mauritius/rochester-falls/",
    destination: "https://www.mauritiusexplored.com/best-places-to-visit-in-mauritius/rochester-falls",
    permanent: true,
  },
  {
    source: "/zh-hans/offer/kayaking-ile-dambre/",
    destination: "https://www.mauritiusexplored.com/top-activities-mauritius/kayaking-ile-dambre",
    permanent: true,
  },
  {
    source: "/de/offer/hiking-bras-deau/",
    destination: "https://www.mauritiusexplored.com/beaches-in-mauritius/bras-deau",
    permanent: true,
  },
  {
    source: "/zh-hans/activities-in-mauritius/",
    destination: "https://www.mauritiusexplored.com/mauritius-activities",
    permanent: true,
  },
  {
    source: "/zh-hans/offer/hiking-bras-deau/",
    destination: "https://www.mauritiusexplored.com/beaches-in-mauritius/bras-deau",
    permanent: true,
  },
  {
    source: "/activities-mauritius/thai-island-to-visit/",
    destination: "https://www.mauritiusexplored.com/mauritius-activities",
    permanent: true,
    has: [
      { type: "host", value: "new.mauritiusexplored.com" },
    ],
  },
  {
    source: "/destinations/port-louis/",
    destination: "https://www.mauritiusexplored.com/best-places-to-visit-in-mauritius/port-louis",
    permanent: true,
    has: [
      { type: "host", value: "new.mauritiusexplored.com" },
    ],
  },
  {
    source: "/destinations/balaclava/",
    destination: "https://www.mauritiusexplored.com/beaches-in-mauritius/balaclava",
    permanent: true,
    has: [
      { type: "host", value: "new.mauritiusexplored.com" },
    ],
  },
  {
    source: "/surfing-showcase/",
    destination: "https://www.mauritiusexplored.com/blog/best-surf-kitesurf-spots-mauritius",
    permanent: true,
    has: [
      { type: "host", value: "new.mauritiusexplored.com" },
    ],
  },
  {
    source: "/",
    destination: "https://www.mauritiusexplored.com/",
    permanent: true,
    has: [
      { type: "host", value: "new.mauritiusexplored.com" },
    ],
  },
  {
    source: "/destination-category/beaches/",
    destination: "https://www.mauritiusexplored.com/beaches-in-mauritius",
    permanent: true,
    has: [
      { type: "host", value: "new.mauritiusexplored.com" },
    ],
  },
  {
    source: "/beaches-in-mauritius/",
    destination: "https://www.mauritiusexplored.com/beaches-in-mauritius",
    permanent: true,
    has: [
      { type: "host", value: "new.mauritiusexplored.com" },
    ],
  },
  {
    source: "/destination-category/places-to-visit/",
    destination: "https://www.mauritiusexplored.com/best-places-to-visit-in-mauritius",
    permanent: true,
    has: [
      { type: "host", value: "new.mauritiusexplored.com" },
    ],
  },
  {
    source: "/destinations/butte-a-lherbe/",
    destination: "https://www.mauritiusexplored.com/beaches-in-mauritius/butte-a-lherbe",
    permanent: true,
    has: [
      { type: "host", value: "new.mauritiusexplored.com" },
    ],
  },
  {
    source: "/destinations/la-prairie/",
    destination: "https://www.mauritiusexplored.com/beaches-in-mauritius/la-prairie",
    permanent: true,
    has: [
      { type: "host", value: "new.mauritiusexplored.com" },
    ],
  },
  {
    source: "/festivals-in-mauritius/",
    destination: "https://www.mauritiusexplored.com/festivals-in-mauritius",
    permanent: true,
    has: [
      { type: "host", value: "new.mauritiusexplored.com" },
    ],
  },
  {
    source: "/about-us/",
    destination: "https://www.mauritiusexplored.com/about",
    permanent: true,
    has: [
      { type: "host", value: "new.mauritiusexplored.com" },
    ],
  },
  {
    source: "/best-places-to-visit-in-mauritius/",
    destination: "https://www.mauritiusexplored.com/best-places-to-visit-in-mauritius",
    permanent: true,
    has: [
      { type: "host", value: "new.mauritiusexplored.com" },
    ],
  },
  {
    source: "/destinations/albion/",
    destination: "https://www.mauritiusexplored.com/beaches-in-mauritius/albion",
    permanent: true,
    has: [
      { type: "host", value: "new.mauritiusexplored.com" },
    ],
  },
  {
    source: "/destinations/la-cambuse/",
    destination: "https://www.mauritiusexplored.com/beaches-in-mauritius/la-cambuse",
    permanent: true,
    has: [
      { type: "host", value: "new.mauritiusexplored.com" },
    ],
  },
  {
    source: "/destinations/la-preneuse/",
    destination: "https://www.mauritiusexplored.com/beaches-in-mauritius/la-preneuse",
    permanent: true,
    has: [
      { type: "host", value: "new.mauritiusexplored.com" },
    ],
  },
  {
    source: "/destinations/riambel/",
    destination: "https://www.mauritiusexplored.com/beaches-in-mauritius/riambel",
    permanent: true,
    has: [
      { type: "host", value: "new.mauritiusexplored.com" },
    ],
  },
  {
    source: "/destinations/st-felix/",
    destination: "https://www.mauritiusexplored.com/beaches-in-mauritius/st-felix",
    permanent: true,
    has: [
      { type: "host", value: "new.mauritiusexplored.com" },
    ],
  },
  {
    source: "/best-time-to-visit-to-mauritius/",
    destination: "https://www.mauritiusexplored.com/best-time-to-visit-to-mauritius",
    permanent: true,
    has: [
      { type: "host", value: "new.mauritiusexplored.com" },
    ],
  },
  {
    source: "/destinations/bel-ombre/",
    destination: "https://www.mauritiusexplored.com/beaches-in-mauritius/bel-ombre",
    permanent: true,
    has: [
      { type: "host", value: "new.mauritiusexplored.com" },
    ],
  },
  {
    source: "/destinations/flic-en-flac/",
    destination: "https://www.mauritiusexplored.com/beaches-in-mauritius/flic-en-flac",
    permanent: true,
    has: [
      { type: "host", value: "new.mauritiusexplored.com" },
    ],
  },
  {
    source: "/destinations/grand-gaube/",
    destination: "https://www.mauritiusexplored.com/beaches-in-mauritius/grand-gaube",
    permanent: true,
    has: [
      { type: "host", value: "new.mauritiusexplored.com" },
    ],
  },
  {
    source: "/destinations/mont-choisy/",
    destination: "https://www.mauritiusexplored.com/beaches-in-mauritius/mont-choisy",
    permanent: true,
    has: [
      { type: "host", value: "new.mauritiusexplored.com" },
    ],
  },
  {
    source: "/destinations/pereybere/",
    destination: "https://www.mauritiusexplored.com/beaches-in-mauritius/pereybere-beach",
    permanent: true,
    has: [
      { type: "host", value: "new.mauritiusexplored.com" },
    ],
  },
  {
    source: "/destinations/pointe-desny/",
    destination: "https://www.mauritiusexplored.com/beaches-in-mauritius/pointe-desny",
    permanent: true,
    has: [
      { type: "host", value: "new.mauritiusexplored.com" },
    ],
  },
  {
    source: "/destinations/trou-deau-douce/",
    destination: "https://www.mauritiusexplored.com/beaches-in-mauritius/trou-deau-douce",
    permanent: true,
    has: [
      { type: "host", value: "new.mauritiusexplored.com" },
    ],
  },
  {
    source: "/mauritius-island/",
    destination: "https://www.mauritiusexplored.com/mauritius-island",
    permanent: true,
    has: [
      { type: "host", value: "new.mauritiusexplored.com" },
    ],
  },
  {
    source: "/beautiful-nature/",
    destination: "https://www.mauritiusexplored.com/nature-reserves-and-parks-in-mauritius",
    permanent: true,
    has: [
      { type: "host", value: "new.mauritiusexplored.com" },
    ],
  },
  {
    source: "/destinations/baie-de-jacotet/",
    destination: "https://www.mauritiusexplored.com/beaches-in-mauritius/baie-de-jacotet",
    permanent: true,
    has: [
      { type: "host", value: "new.mauritiusexplored.com" },
    ],
  },
  {
    source: "/destinations/belle-mare/",
    destination: "https://www.mauritiusexplored.com/beaches-in-mauritius/belle-mare",
    permanent: true,
    has: [
      { type: "host", value: "new.mauritiusexplored.com" },
    ],
  },
  {
    source: "/destinations/bras-deau/",
    destination: "https://www.mauritiusexplored.com/beaches-in-mauritius/bras-deau",
    permanent: true,
    has: [
      { type: "host", value: "new.mauritiusexplored.com" },
    ],
  },
  {
    source: "/destinations/gris-gris/",
    destination: "https://www.mauritiusexplored.com/beaches-in-mauritius/gris-gris",
    permanent: true,
    has: [
      { type: "host", value: "new.mauritiusexplored.com" },
    ],
  },
  {
    source: "/destinations/palmar-beach/",
    destination: "https://www.mauritiusexplored.com/beaches-in-mauritius/palmar-beach",
    permanent: true,
    has: [
      { type: "host", value: "new.mauritiusexplored.com" },
    ],
  },
  {
    source: "/destinations/riviere-des-galets/",
    destination: "https://www.mauritiusexplored.com/beaches-in-mauritius/riviere-des-galets",
    permanent: true,
    has: [
      { type: "host", value: "new.mauritiusexplored.com" },
    ],
  },
  {
    source: "/destinations/tamarin-beach/",
    destination: "https://www.mauritiusexplored.com/beaches-in-mauritius/tamarin",
    permanent: true,
    has: [
      { type: "host", value: "new.mauritiusexplored.com" },
    ],
  },
  {
    source: "/destinations/bain-boeuf/",
    destination: "https://www.mauritiusexplored.com/beaches-in-mauritius/bain-boeuf",
    permanent: true,
    has: [
      { type: "host", value: "new.mauritiusexplored.com" },
    ],
  },
  {
    source: "/destinations/blue-bay/",
    destination: "https://www.mauritiusexplored.com/beaches-in-mauritius/blue-bay",
    permanent: true,
    has: [
      { type: "host", value: "new.mauritiusexplored.com" },
    ],
  },
  {
    source: "/destinations/cap-malheureux/",
    destination: "https://www.mauritiusexplored.com/beaches-in-mauritius/cap-malheureux",
    permanent: true,
    has: [
      { type: "host", value: "new.mauritiusexplored.com" },
    ],
  },
  {
    source: "/destinations/ile-aux-cerfs/",
    destination: "https://www.mauritiusexplored.com/best-places-to-visit-in-mauritius/ile-aux-cerfs",
    permanent: true,
    has: [
      { type: "host", value: "new.mauritiusexplored.com" },
    ],
  },
  {
    source: "/destinations/le-morne/",
    destination: "https://www.mauritiusexplored.com/beaches-in-mauritius/le-morne",
    permanent: true,
    has: [
      { type: "host", value: "new.mauritiusexplored.com" },
    ],
  },
  {
    source: "/destinations/trou-aux-biches/",
    destination: "https://www.mauritiusexplored.com/beaches-in-mauritius/trou-aux-biches",
    permanent: true,
    has: [
      { type: "host", value: "new.mauritiusexplored.com" },
    ],
  },
  {
    source: "/diving/",
    destination: "https://www.mauritiusexplored.com/blog/best-diving-spots-in-mauritius",
    permanent: true,
    has: [
      { type: "host", value: "new.mauritiusexplored.com" },
    ],
  },
  {
    source: "/turtle-and-sea/",
    destination: "https://www.mauritiusexplored.com/swim-with-sea-turtles-in-mauritius",
    permanent: true,
    has: [
      { type: "host", value: "new.mauritiusexplored.com" },
    ],
  },
  {
    source: "/de/top-activities-mauritius/seven-waterfalls/",
    destination: "https://www.mauritiusexplored.com/top-activities-mauritius/seven-waterfalls-full-day-hike",
    permanent: true,
  },
  {
    source: "/de/best-waterfalls-of-mauritius/",
    destination: "https://www.mauritiusexplored.com/best-waterfalls-of-mauritius",
    permanent: true,
  },
  {
    source: "/places-to-visit-mauritius/",
    destination: "https://www.mauritiusexplored.com/best-places-to-visit-in-mauritius",
    permanent: true,
    has: [
      { type: "host", value: "new.mauritiusexplored.com" },
    ],
  },
  {
    source: "/de/top-activities-mauritius/seven-waterfall/",
    destination: "https://www.mauritiusexplored.com/top-activities-mauritius/seven-waterfalls-full-day-hike",
    permanent: true,
  },
  {
    source: "/zh-hans/car-rental-mauritius/",
    destination: "https://www.mauritiusexplored.com/car-rental-mauritius",
    permanent: true,
  },
  {
    source: "/de/golf-in-mauritius/",
    destination: "https://www.mauritiusexplored.com/blog/best-golf-courses-in-mauritius",
    permanent: true,
  },
  {
    source: "/destinations/roche-noire/",
    destination: "https://www.mauritiusexplored.com/beaches-in-mauritius/roche-noire",
    permanent: true,
    has: [
      { type: "host", value: "new.mauritiusexplored.com" },
    ],
  },
  {
    source: "/de/offer/seaplane-flight-at-le-morne/",
    destination: "https://www.mauritiusexplored.com/top-activities-mauritius/seaplane-le-morne",
    permanent: true,
  },
  {
    source: "/zh-hans/offer/seaplane-flight-at-le-morne/",
    destination: "https://www.mauritiusexplored.com/top-activities-mauritius/seaplane-le-morne",
    permanent: true,
  },
  {
    source: "/zh-hans/hotels-in-mauritius-island/",
    destination: "https://www.mauritiusexplored.com/blog/the-ultimate-mauritius-family-holiday-guide",
    permanent: true,
  },
  {
    source: "/de/top-activities-mauritius/place-du-moulin/",
    destination: "https://www.mauritiusexplored.com/best-places-to-visit-in-mauritius/moulin",
    permanent: true,
  },
];
