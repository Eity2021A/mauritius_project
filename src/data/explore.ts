export interface ExploreItem {
  name: string;
  slug: string;
  region: string;
  image: string;
  category?: string;
}

export const topActivities: ExploreItem[] = [
  { name: "Swim with Dolphins", slug: "swim-with-dolphins", region: "West", image: "swimming-with-dolphins.jpg" },
  { name: "Catamaran Cruises", slug: "catamaran-cruises", region: "Various", image: "catamaran-cruises-in-mauritius.jpg" },
  { name: "Helicopter Tour", slug: "helicopter-tour", region: "Various", image: "corail-helicopter-tour.jpg" },
  { name: "Hiking Le Morne", slug: "hiking-le-morne", region: "South West", image: "horse-riding-at-le-morne.jpg" },
  { name: "Quad Biking", slug: "quad-biking", region: "South", image: "lion-mountain-at-ferney.jpg" },
  { name: "Whale Watching", slug: "whale-watching", region: "West", image: "speedboat-tours-in-mauritius.jpg" },
];

export const topBeaches: ExploreItem[] = [
  { name: "Le Morne", slug: "le-morne", region: "South West", image: "beach-of-le-morne-in-the-morning.jpg" },
  { name: "Trou aux Biches", slug: "trou-aux-biches", region: "North West", image: "sunset-at-trou-aux-biches.jpg" },
  { name: "Belle Mare", slug: "belle-mare", region: "East", image: "belle-mare-beach.jpg" },
  { name: "Flic en Flac", slug: "flic-en-flac", region: "West", image: "flic-en-flac-beach-villa-caroline.jpg" },
  { name: "Blue Bay", slug: "blue-bay", region: "South East", image: "blue-bay-lagoon.jpg" },
  { name: "Pereybere", slug: "pereybere", region: "North", image: "pereybere-public-beach.jpg" },
];

export const topPlaces: ExploreItem[] = [
  { name: "Chamarel Waterfall", slug: "chamarel-waterfall", region: "South West", image: "chamarel-waterfall.jpg" },
  { name: "Seven Coloured Earth", slug: "7-coloured-earth", region: "South West", image: "seven-coloured-earth.jpg" },
  { name: "Pamplemousses Garden", slug: "pamplemousses-botanical-garden", region: "North", image: "pamplemousses-botanical-garden.jpg" },
  { name: "Black River Gorges", slug: "black-river-gorges", region: "South West", image: "black-river-gorges-view-point.jpg" },
  { name: "Grand Bassin", slug: "grand-bassin", region: "South", image: "grand-bassin-shiva-statue.jpg" },
  { name: "Cap Malheureux", slug: "cap-malheureux", region: "North", image: "church-at-cap-malheureux.jpg" },
];

export const hiddenGems: ExploreItem[] = [
  { name: "Baie de Jacotet", slug: "baie-de-jacotet", region: "South", category: "Hidden Beach", image: "baie-de-jacotet-in-the-south.jpg" },
  { name: "Butte a l'herbe", slug: "butte-a-lherbe", region: "East", category: "Hidden Beach", image: "butte-a-lherbe-beach-in-mauritius.jpeg" },
  { name: "Pointe d'Esny", slug: "pointe-desny", region: "East", category: "Hidden Beach", image: "pointe-desny-allee.jpg" },
  { name: "Riambel", slug: "riambel", region: "South", category: "Hidden Beach", image: "riambel-beach-in-the-south.jpeg" },
  { name: "La Cambuse", slug: "la-cambuse", region: "South East", category: "Hidden Beach", image: "la-cambuse-beach-in-the-south.jpg" },
  { name: "Albion", slug: "albion", region: "West", category: "Hidden Beach", image: "albion-beach-morning.jpg" },
];

export interface ExploreSectionConfig {
  title: string;
  dotColor: string;
  items: ExploreItem[];
  hrefPrefix: string;
  ctaText: string;
  ctaHref: string;
}

export const exploreSections: ExploreSectionConfig[] = [
  {
    title: "Activities",
    dotColor: "bg-blue-500",
    items: topActivities,
    hrefPrefix: "/mauritius-activities",
    ctaText: "Explore All Activities",
    ctaHref: "/mauritius-activities",
  },
  {
    title: "Beaches",
    dotColor: "bg-orange-500",
    items: topBeaches,
    hrefPrefix: "/beaches-in-mauritius",
    ctaText: "Explore All Beaches",
    ctaHref: "/beaches-in-mauritius",
  },
  {
    title: "Places to Visit",
    dotColor: "bg-green-500",
    items: topPlaces,
    hrefPrefix: "/top-activities-mauritius",
    ctaText: "Explore All Places",
    ctaHref: "/best-places-to-visit-in-mauritius",
  },
];
