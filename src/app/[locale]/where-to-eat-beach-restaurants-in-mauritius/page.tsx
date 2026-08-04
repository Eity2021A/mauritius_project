import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PopularRoadTrips from "@/components/PopularRoadTrips";
import {
  localizeStaticPage,
  staticPageText,
} from "@/lib/static-page-localizer";
import type { LucideIcon } from "lucide-react";
import { Banknote, CalendarCheck, MapPin, Utensils } from "lucide-react";
import Image from "next/image";
import CarRentalAdBannerInfo from "@/components/CarRentalAdBannerInfo";
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Where to Eat Beach Restaurants in Mauritius",
  description:
    "Where to eat by the sea in Mauritius — the best beach restaurants for fresh seafood, sunset dining and local flavour, coast by coast around the island.",
  alternates: { canonical: "/where-to-eat-beach-restaurants-in-mauritius" },
};
const ad = {
  desktopSrc:
    "/images/quick-trips/Seven-waterfall-hike-in-Mauritius-Best-Hike-best-Prices.webp",
  href: "/",
  alt: "Seven waterfall hike in Mauritius Best Hike best Prices",
};

type Coast = "North" | "West & South-West" | "East & Wild South";

type RestaurantGroup = {
  title: string;
  coast: Coast;
  restaurants: [string, string][];
};

const coastLegend: [Coast, string][] = [
  ["North", "#2389c9"],
  ["West & South-West", "#f16522"],
  ["East & Wild South", "#2f8e48"],
];

const coastColors: Record<Coast, string> = {
  North: "#2389c9",
  "West & South-West": "#f16522",
  "East & Wild South": "#2f8e48",
};

const leftRestaurantGroups: RestaurantGroup[] = [
  {
    title: "Grand Baie",
    coast: "North",
    restaurants: [
      ["The Beach House", "Sea views, cocktails & sunset beach bar"],
      [
        "Les Canisses Resto & Plage",
        "Seafood, French & Mediterranean beachfront",
      ],
      ["The Beach Kitchen", "Seafood, sushi & dim-sum bites; modern"],
      ["Cafe de La Plage", "Seafood & Mauritian; central by the water"],
      ["Le Capitaine", "Fish, lobster & prawns; refined, lagoon views"],
      ["Eden Beach", "Mediterranean & seafood; stylish lounge bar"],
      ["Bisou Rooftop - LUX*", "Elevated dining; infinity-pool rooftop"],
      ["Zaka - Super U", "Tapas, pizza & drinks; lively evenings"],
    ],
  },
  {
    title: "Trou aux Biches - Mont Choisy",
    coast: "North",
    restaurants: [
      ["Beach Hut", "Easy beach food; great for families"],
      ["Le Pescatore", "Seafood; elegant, with sea views"],
      ["Ava Beach", "Fresh, casual & tapas; all-day dining"],
      ["Mont Choisy Le Beach Club", "Casual beach-club dining & lagoon views"],
    ],
  },
];

const rightRestaurantGroups: RestaurantGroup[] = [
  {
    title: "Pereybere",
    coast: "North",
    restaurants: [
      ["Flowers of Paradise", "Seafood, Mediterranean & French; by the beach"],
      ["The Cloud Rooftop & Lounge", "Cocktails & tapas; rooftop views"],
    ],
  },
  {
    title: "Flic en Flac - Tamarin",
    coast: "West & South-West",
    restaurants: [
      ["Jeanno Burger", "Burgers & casual beach fare (Flic en Flac)"],
      ["Pakbo", "Mauritian, Creole, Indian & seafood (Flic en Flac)"],
      [
        "Signature by Big Willy's",
        "Dinner, cocktails & wine; social (Tamarin)",
      ],
    ],
  },
  {
    title: "Le Morne",
    coast: "West & South-West",
    restaurants: [
      [
        "Wapalapam Island Eatery",
        "Mauritian-inspired seafood; fresh & tropical",
      ],
    ],
  },
  {
    title: "Trou d'Eau Douce",
    coast: "East & Wild South",
    restaurants: [["Chez Tino", "Local seafood; near Ile aux Cerfs day trips"]],
  },
  {
    title: "Gris Gris - Souillac",
    coast: "East & Wild South",
    restaurants: [["Chez Rosy", "Simple, authentic Mauritian seafood"]],
  },
];

const restaurantLinks: Record<string, string> = {
  "The Beach House": "https://maps.app.goo.gl/HkqE85ZRKhhe15498",
  "Les Canisses Resto & Plage": "https://maps.app.goo.gl/JxDKSAEN8X5BzC4J6",
  "The Beach Kitchen": "https://maps.app.goo.gl/vYsdzc2U9bhuC1u2A",
  "Cafe de La Plage": "https://maps.app.goo.gl/nb8iGTd8ckWmXcN36",
  "Le Capitaine": "https://maps.app.goo.gl/3EbzUQa2eAvoghFH7",
  "Eden Beach": "https://maps.app.goo.gl/6QrCSR8Uc5ZabbpB6",
  "Bisou Rooftop - LUX*": "https://maps.app.goo.gl/CUwWSRWT8iUqjuz16",
  "Zaka - Super U": "https://maps.app.goo.gl/TQpAWZKsFJRYaZW77",
  "Beach Hut": "https://maps.app.goo.gl/YefDt17f9bhCLA2n8",
  "Le Pescatore": "https://maps.app.goo.gl/krnUXnjmnhbAJ2wR9",
  "Ava Beach": "https://maps.app.goo.gl/HMJHP89P6UGmutxs7",
  "Mont Choisy Le Beach Club": "https://maps.app.goo.gl/ArWxcRNSSvY6D8F49",
  "The Cloud Rooftop & Lounge": "https://maps.app.goo.gl/WJ2CXimFerWuF1ma6",
  "Jeanno Burger": "https://maps.app.goo.gl/aZv7WXTGLPaTZctx5",
  Pakbo: "https://maps.app.goo.gl/fgU44gMbeMqsGRHm9",
  "Signature by Big Willy's": "https://maps.app.goo.gl/c7iW1kyEZijXH4RK8",
  "Wapalapam Island Eatery": "https://maps.app.goo.gl/RwS6tYNCSKAw2nW98",
  "Chez Tino": "https://maps.app.goo.gl/M2AbK51XwoQhkpFy8",
  "Chez Rosy": "https://maps.app.goo.gl/3thqqeAgnGDVB63D9",
};

const goodToKnow: {
  title: string;
  text: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Book ahead",
    text: "Reserve sunset tables in Grand Baie & popular spots.",
    icon: CalendarCheck,
  },
  {
    title: "Bring cash",
    text: "Smaller places may not take cards.",
    icon: Banknote,
  },
  {
    title: "Go local",
    text: "Fish, prawns, lobster, octopus & calamari are island favourites.",
    icon: Utensils,
  },
];

type SupportedRestaurantsLocale = "fr" | "de" | "it" | "es" | "ru";

const RESTAURANT_PAGE_COPY: Record<
  SupportedRestaurantsLocale,
  {
    kicker: string;
    titleMain: string;
    titleAccent: string;
    intro: string;
    coasts: Record<Coast, string>;
    groupTitles?: Record<string, string>;
    names?: Record<string, string>;
    details: Record<string, string>;
    goodTitle: string;
    tips: Record<string, { title: string; text: string }>;
    quote: string;
  }
> = {
  fr: {
    kicker: "Saveurs de l'ile",
    titleMain: "Restaurants de plage",
    titleAccent: "au bord de la mer",
    intro:
      "21 adresses independantes en bord de mer autour de l'ile, ou la vue, les gens et la lumiere comptent autant que l'assiette.",
    coasts: {
      North: "Nord",
      "West & South-West": "Ouest et sud-ouest",
      "East & Wild South": "Est et sud sauvage",
    },
    groupTitles: {
      "Grand Baie": "Grand Baie",
      "Trou aux Biches - Mont Choisy": "Trou aux Biches - Mont Choisy",
      Pereybere: "Pereybere",
      "Flic en Flac - Tamarin": "Flic en Flac - Tamarin",
      "Le Morne": "Le Morne",
      "Trou d'Eau Douce": "Trou d'Eau Douce",
      "Gris Gris - Souillac": "Gris Gris - Souillac",
    },
    names: {
      "The Beach House": "La Maison de la Plage",
      "Les Canisses Resto & Plage": "Les Canisses Resto & Plage",
      "The Beach Kitchen": "La Cuisine de la Plage",
      "Cafe de La Plage": "Cafe de la Plage",
      "Le Capitaine": "Le Capitaine",
      "Eden Beach": "Eden Beach",
      "Bisou Rooftop - LUX*": "Bisou Rooftop - LUX*",
      "Zaka - Super U": "Zaka - Super U",
      "Beach Hut": "Cabane de plage",
      "Le Pescatore": "Le Pescatore",
      "Ava Beach": "Ava Beach",
      "Mont Choisy Le Beach Club": "Mont Choisy Le Beach Club",
      "Flowers of Paradise": "Fleurs du Paradis",
      "The Cloud Rooftop & Lounge": "Le Cloud Rooftop & Lounge",
      "Jeanno Burger": "Jeanno Burger",
      Pakbo: "Pakbo",
      "Signature by Big Willy's": "Signature par Big Willy's",
      "Wapalapam Island Eatery": "Wapalapam Island Eatery",
      "Chez Tino": "Chez Tino",
      "Chez Rosy": "Chez Rosy",
    },
    details: {
      "Sea views, cocktails & sunset beach bar":
        "Vue mer, cocktails et bar de plage au coucher du soleil",
      "Seafood, French & Mediterranean beachfront":
        "Fruits de mer, cuisine francaise et mediterraneenne en front de mer",
      "Seafood, sushi & dim-sum bites; modern":
        "Fruits de mer, sushi et dim sum; ambiance moderne",
      "Seafood & Mauritian; central by the water":
        "Fruits de mer et cuisine mauricienne; central au bord de l'eau",
      "Fish, lobster & prawns; refined, lagoon views":
        "Poisson, langouste et crevettes; raffine, vue lagon",
      "Mediterranean & seafood; stylish lounge bar":
        "Mediterraneen et fruits de mer; lounge bar elegant",
      "Elevated dining; infinity-pool rooftop":
        "Table chic; rooftop avec piscine infinity",
      "Tapas, pizza & drinks; lively evenings":
        "Tapas, pizza et boissons; soirees animees",
      "Easy beach food; great for families":
        "Cuisine de plage simple; parfait pour les familles",
      "Seafood; elegant, with sea views":
        "Fruits de mer; elegant, avec vue mer",
      "Fresh, casual & tapas; all-day dining":
        "Frais, decontracte et tapas; service toute la journee",
      "Casual beach-club dining & lagoon views":
        "Beach club decontracte avec vue lagon",
      "Seafood, Mediterranean & French; by the beach":
        "Fruits de mer, mediterraneen et francais; pres de la plage",
      "Cocktails & tapas; rooftop views":
        "Cocktails et tapas; vues depuis le rooftop",
      "Burgers & casual beach fare (Flic en Flac)":
        "Burgers et cuisine de plage decontractee (Flic en Flac)",
      "Mauritian, Creole, Indian & seafood (Flic en Flac)":
        "Mauricien, creole, indien et fruits de mer (Flic en Flac)",
      "Dinner, cocktails & wine; social (Tamarin)":
        "Diner, cocktails et vin; ambiance sociale (Tamarin)",
      "Mauritian-inspired seafood; fresh & tropical":
        "Fruits de mer inspires de Maurice; frais et tropical",
      "Local seafood; near Ile aux Cerfs day trips":
        "Fruits de mer locaux; proche des departs vers l'ile aux Cerfs",
      "Simple, authentic Mauritian seafood":
        "Fruits de mer mauriciens simples et authentiques",
    },
    goodTitle: "Bon a savoir",
    tips: {
      "Book ahead": {
        title: "Reserver tot",
        text: "Reservez les tables au coucher du soleil a Grand Baie et dans les lieux populaires.",
      },
      "Bring cash": {
        title: "Apporter du liquide",
        text: "Les petites adresses n'acceptent pas toujours les cartes.",
      },
      "Go local": {
        title: "Manger local",
        text: "Poisson, crevettes, langouste, poulpe et calamars sont les favoris de l'ile.",
      },
    },
    quote:
      "Ici, un restaurant de plage ne se resume pas a l'assiette : c'est la vue, les gens, la lumiere et l'atmosphere de l'ile.",
  },
  de: {
    kicker: "Geschmack der Insel",
    titleMain: "Strandrestaurants",
    titleAccent: "am Meer",
    intro:
      "21 unabhangige Strandadressen auf der Insel, bei denen Aussicht, Menschen und Licht genauso wichtig sind wie das Essen.",
    coasts: {
      North: "Norden",
      "West & South-West": "Westen und Sudwesten",
      "East & Wild South": "Osten und wilder Suden",
    },
    groupTitles: {
      "Grand Baie": "Grand Baie",
      "Trou aux Biches - Mont Choisy": "Trou aux Biches - Mont Choisy",
      Pereybere: "Pereybere",
      "Flic en Flac - Tamarin": "Flic en Flac - Tamarin",
      "Le Morne": "Le Morne",
      "Trou d'Eau Douce": "Trou d'Eau Douce",
      "Gris Gris - Souillac": "Gris Gris - Souillac",
    },
    names: {
      "The Beach House": "Das Strandhaus",
      "Les Canisses Resto & Plage": "Les Canisses Resto & Plage",
      "The Beach Kitchen": "Die Strandkuche",
      "Cafe de La Plage": "Cafe de la Plage",
      "Le Capitaine": "Le Capitaine",
      "Eden Beach": "Eden Beach",
      "Bisou Rooftop - LUX*": "Bisou Rooftop - LUX*",
      "Zaka - Super U": "Zaka - Super U",
      "Beach Hut": "Strandhutte",
      "Le Pescatore": "Le Pescatore",
      "Ava Beach": "Ava Beach",
      "Mont Choisy Le Beach Club": "Mont Choisy Le Beach Club",
      "Flowers of Paradise": "Blumen des Paradieses",
      "The Cloud Rooftop & Lounge": "The Cloud Rooftop & Lounge",
      "Jeanno Burger": "Jeanno Burger",
      Pakbo: "Pakbo",
      "Signature by Big Willy's": "Signature by Big Willy's",
      "Wapalapam Island Eatery": "Wapalapam Island Eatery",
      "Chez Tino": "Chez Tino",
      "Chez Rosy": "Chez Rosy",
    },
    details: {
      "Sea views, cocktails & sunset beach bar":
        "Meerblick, Cocktails und Strandbar zum Sonnenuntergang",
      "Seafood, French & Mediterranean beachfront":
        "Meeresfruchte, franzosisch und mediterran direkt am Strand",
      "Seafood, sushi & dim-sum bites; modern":
        "Meeresfruchte, Sushi und Dim Sum; modern",
      "Seafood & Mauritian; central by the water":
        "Meeresfruchte und mauritisch; zentral am Wasser",
      "Fish, lobster & prawns; refined, lagoon views":
        "Fisch, Languste und Garnelen; raffiniert, Lagunenblick",
      "Mediterranean & seafood; stylish lounge bar":
        "Mediterran und Meeresfruchte; stilvolle Loungebar",
      "Elevated dining; infinity-pool rooftop":
        "Gehobenes Essen; Rooftop mit Infinity-Pool",
      "Tapas, pizza & drinks; lively evenings":
        "Tapas, Pizza und Drinks; lebendige Abende",
      "Easy beach food; great for families":
        "Einfaches Strandessen; gut fur Familien",
      "Seafood; elegant, with sea views":
        "Meeresfruchte; elegant, mit Meerblick",
      "Fresh, casual & tapas; all-day dining":
        "Frisch, locker und Tapas; den ganzen Tag",
      "Casual beach-club dining & lagoon views":
        "Lockerer Beachclub mit Lagunenblick",
      "Seafood, Mediterranean & French; by the beach":
        "Meeresfruchte, mediterran und franzosisch; am Strand",
      "Cocktails & tapas; rooftop views":
        "Cocktails und Tapas; Rooftop-Ausblick",
      "Burgers & casual beach fare (Flic en Flac)":
        "Burger und lockere Strandkuche (Flic en Flac)",
      "Mauritian, Creole, Indian & seafood (Flic en Flac)":
        "Mauritisch, kreolisch, indisch und Meeresfruchte (Flic en Flac)",
      "Dinner, cocktails & wine; social (Tamarin)":
        "Dinner, Cocktails und Wein; gesellig (Tamarin)",
      "Mauritian-inspired seafood; fresh & tropical":
        "Mauritisch inspirierte Meeresfruchte; frisch und tropisch",
      "Local seafood; near Ile aux Cerfs day trips":
        "Lokale Meeresfruchte; nahe Ausflugen zur Ile aux Cerfs",
      "Simple, authentic Mauritian seafood":
        "Einfache, authentische mauritische Meeresfruchte",
    },
    goodTitle: "Gut zu wissen",
    tips: {
      "Book ahead": {
        title: "Im Voraus buchen",
        text: "Reservieren Sie Sonnenuntergangstische in Grand Baie und beliebten Spots.",
      },
      "Bring cash": {
        title: "Bargeld mitnehmen",
        text: "Kleinere Lokale akzeptieren nicht immer Karten.",
      },
      "Go local": {
        title: "Lokal essen",
        text: "Fisch, Garnelen, Languste, Oktopus und Calamari sind Inselklassiker.",
      },
    },
    quote:
      "Ein Strandrestaurant hier dreht sich nicht nur um Essen: Es sind Aussicht, Menschen, Licht und Inselatmosphare.",
  },
  it: {
    kicker: "Sapori dell'isola",
    titleMain: "Ristoranti sulla spiaggia",
    titleAccent: "in riva al mare",
    intro:
      "21 locali indipendenti sul mare in tutta l'isola, dove vista, persone e luce contano quanto il cibo.",
    coasts: {
      North: "Nord",
      "West & South-West": "Ovest e sud-ovest",
      "East & Wild South": "Est e sud selvaggio",
    },
    groupTitles: {
      "Grand Baie": "Grand Baie",
      "Trou aux Biches - Mont Choisy": "Trou aux Biches - Mont Choisy",
      Pereybere: "Pereybere",
      "Flic en Flac - Tamarin": "Flic en Flac - Tamarin",
      "Le Morne": "Le Morne",
      "Trou d'Eau Douce": "Trou d'Eau Douce",
      "Gris Gris - Souillac": "Gris Gris - Souillac",
    },
    names: {
      "The Beach House": "La Casa sulla Spiaggia",
      "Les Canisses Resto & Plage": "Les Canisses Resto & Plage",
      "The Beach Kitchen": "La Cucina della Spiaggia",
      "Cafe de La Plage": "Cafe de la Plage",
      "Le Capitaine": "Le Capitaine",
      "Eden Beach": "Eden Beach",
      "Bisou Rooftop - LUX*": "Bisou Rooftop - LUX*",
      "Zaka - Super U": "Zaka - Super U",
      "Beach Hut": "Capanna sulla spiaggia",
      "Le Pescatore": "Le Pescatore",
      "Ava Beach": "Ava Beach",
      "Mont Choisy Le Beach Club": "Mont Choisy Le Beach Club",
      "Flowers of Paradise": "Fiori del Paradiso",
      "The Cloud Rooftop & Lounge": "The Cloud Rooftop & Lounge",
      "Jeanno Burger": "Jeanno Burger",
      Pakbo: "Pakbo",
      "Signature by Big Willy's": "Signature by Big Willy's",
      "Wapalapam Island Eatery": "Wapalapam Island Eatery",
      "Chez Tino": "Chez Tino",
      "Chez Rosy": "Chez Rosy",
    },
    details: {
      "Sea views, cocktails & sunset beach bar":
        "Vista mare, cocktail e beach bar al tramonto",
      "Seafood, French & Mediterranean beachfront":
        "Pesce, cucina francese e mediterranea sul mare",
      "Seafood, sushi & dim-sum bites; modern":
        "Pesce, sushi e dim sum; moderno",
      "Seafood & Mauritian; central by the water":
        "Pesce e cucina mauriziana; centrale sull'acqua",
      "Fish, lobster & prawns; refined, lagoon views":
        "Pesce, aragosta e gamberi; raffinato, vista laguna",
      "Mediterranean & seafood; stylish lounge bar":
        "Mediterraneo e pesce; lounge bar elegante",
      "Elevated dining; infinity-pool rooftop":
        "Cucina elegante; rooftop con piscina infinity",
      "Tapas, pizza & drinks; lively evenings":
        "Tapas, pizza e drink; serate vivaci",
      "Easy beach food; great for families":
        "Cibo da spiaggia semplice; ottimo per famiglie",
      "Seafood; elegant, with sea views": "Pesce; elegante, con vista mare",
      "Fresh, casual & tapas; all-day dining":
        "Fresco, informale e tapas; aperto tutto il giorno",
      "Casual beach-club dining & lagoon views":
        "Beach club informale con vista laguna",
      "Seafood, Mediterranean & French; by the beach":
        "Pesce, mediterraneo e francese; vicino alla spiaggia",
      "Cocktails & tapas; rooftop views": "Cocktail e tapas; viste dal rooftop",
      "Burgers & casual beach fare (Flic en Flac)":
        "Burger e cucina da spiaggia informale (Flic en Flac)",
      "Mauritian, Creole, Indian & seafood (Flic en Flac)":
        "Mauriziano, creolo, indiano e pesce (Flic en Flac)",
      "Dinner, cocktails & wine; social (Tamarin)":
        "Cena, cocktail e vino; atmosfera sociale (Tamarin)",
      "Mauritian-inspired seafood; fresh & tropical":
        "Pesce ispirato a Mauritius; fresco e tropicale",
      "Local seafood; near Ile aux Cerfs day trips":
        "Pesce locale; vicino alle gite per Ile aux Cerfs",
      "Simple, authentic Mauritian seafood":
        "Pesce mauriziano semplice e autentico",
    },
    goodTitle: "Da sapere",
    tips: {
      "Book ahead": {
        title: "Prenota in anticipo",
        text: "Riserva i tavoli al tramonto a Grand Baie e nei posti piu richiesti.",
      },
      "Bring cash": {
        title: "Porta contanti",
        text: "I locali piu piccoli potrebbero non accettare carte.",
      },
      "Go local": {
        title: "Mangia locale",
        text: "Pesce, gamberi, aragosta, polpo e calamari sono preferiti dell'isola.",
      },
    },
    quote:
      "Un ristorante sulla spiaggia qui non e solo cibo: e vista, persone, luce e atmosfera dell'isola.",
  },
  es: {
    kicker: "Sabor de la isla",
    titleMain: "Restaurantes de playa",
    titleAccent: "junto al mar",
    intro:
      "21 lugares independientes junto al mar por toda la isla, donde la vista, la gente y la luz importan tanto como la comida.",
    coasts: {
      North: "Norte",
      "West & South-West": "Oeste y suroeste",
      "East & Wild South": "Este y sur salvaje",
    },
    groupTitles: {
      "Grand Baie": "Grand Baie",
      "Trou aux Biches - Mont Choisy": "Trou aux Biches - Mont Choisy",
      Pereybere: "Pereybere",
      "Flic en Flac - Tamarin": "Flic en Flac - Tamarin",
      "Le Morne": "Le Morne",
      "Trou d'Eau Douce": "Trou d'Eau Douce",
      "Gris Gris - Souillac": "Gris Gris - Souillac",
    },
    names: {
      "The Beach House": "La Casa de la Playa",
      "Les Canisses Resto & Plage": "Les Canisses Resto & Plage",
      "The Beach Kitchen": "La Cocina de la Playa",
      "Cafe de La Plage": "Cafe de la Plage",
      "Le Capitaine": "Le Capitaine",
      "Eden Beach": "Eden Beach",
      "Bisou Rooftop - LUX*": "Bisou Rooftop - LUX*",
      "Zaka - Super U": "Zaka - Super U",
      "Beach Hut": "Cabana de playa",
      "Le Pescatore": "Le Pescatore",
      "Ava Beach": "Ava Beach",
      "Mont Choisy Le Beach Club": "Mont Choisy Le Beach Club",
      "Flowers of Paradise": "Flores del Paraiso",
      "The Cloud Rooftop & Lounge": "The Cloud Rooftop & Lounge",
      "Jeanno Burger": "Jeanno Burger",
      Pakbo: "Pakbo",
      "Signature by Big Willy's": "Signature by Big Willy's",
      "Wapalapam Island Eatery": "Wapalapam Island Eatery",
      "Chez Tino": "Chez Tino",
      "Chez Rosy": "Chez Rosy",
    },
    details: {
      "Sea views, cocktails & sunset beach bar":
        "Vistas al mar, cocteles y bar de playa al atardecer",
      "Seafood, French & Mediterranean beachfront":
        "Marisco, cocina francesa y mediterranea frente al mar",
      "Seafood, sushi & dim-sum bites; modern":
        "Marisco, sushi y dim sum; moderno",
      "Seafood & Mauritian; central by the water":
        "Marisco y cocina mauriciana; centrico junto al agua",
      "Fish, lobster & prawns; refined, lagoon views":
        "Pescado, langosta y gambas; refinado, vistas a la laguna",
      "Mediterranean & seafood; stylish lounge bar":
        "Mediterraneo y marisco; lounge bar elegante",
      "Elevated dining; infinity-pool rooftop":
        "Cena elevada; rooftop con piscina infinity",
      "Tapas, pizza & drinks; lively evenings":
        "Tapas, pizza y bebidas; noches animadas",
      "Easy beach food; great for families":
        "Comida de playa sencilla; ideal para familias",
      "Seafood; elegant, with sea views":
        "Marisco; elegante, con vistas al mar",
      "Fresh, casual & tapas; all-day dining":
        "Fresco, informal y tapas; todo el dia",
      "Casual beach-club dining & lagoon views":
        "Beach club informal con vistas a la laguna",
      "Seafood, Mediterranean & French; by the beach":
        "Marisco, mediterraneo y frances; junto a la playa",
      "Cocktails & tapas; rooftop views":
        "Cocteles y tapas; vistas desde el rooftop",
      "Burgers & casual beach fare (Flic en Flac)":
        "Hamburguesas y comida casual de playa (Flic en Flac)",
      "Mauritian, Creole, Indian & seafood (Flic en Flac)":
        "Mauriciano, criollo, indio y marisco (Flic en Flac)",
      "Dinner, cocktails & wine; social (Tamarin)":
        "Cena, cocteles y vino; ambiente social (Tamarin)",
      "Mauritian-inspired seafood; fresh & tropical":
        "Marisco inspirado en Mauricio; fresco y tropical",
      "Local seafood; near Ile aux Cerfs day trips":
        "Marisco local; cerca de salidas a Ile aux Cerfs",
      "Simple, authentic Mauritian seafood":
        "Marisco mauriciano simple y autentico",
    },
    goodTitle: "Bueno saber",
    tips: {
      "Book ahead": {
        title: "Reserva con antelacion",
        text: "Reserva mesas al atardecer en Grand Baie y lugares populares.",
      },
      "Bring cash": {
        title: "Lleva efectivo",
        text: "Los sitios pequenos pueden no aceptar tarjetas.",
      },
      "Go local": {
        title: "Come local",
        text: "Pescado, gambas, langosta, pulpo y calamares son favoritos de la isla.",
      },
    },
    quote:
      "Un restaurante de playa aqui no es solo comida: es la vista, la gente, la luz y el ambiente de la isla.",
  },
  ru: {
    kicker: "Вкус острова",
    titleMain: "Пляжные рестораны",
    titleAccent: "у моря",
    intro:
      "21 независимое место у моря по всему острову, где вид, люди и свет важны не меньше еды.",
    coasts: {
      North: "Север",
      "West & South-West": "Запад и юго-запад",
      "East & Wild South": "Восток и дикий юг",
    },
    details: {
      "Sea views, cocktails & sunset beach bar":
        "Вид на море, коктейли и пляжный бар на закате",
      "Seafood, French & Mediterranean beachfront":
        "Морепродукты, французская и средиземноморская кухня у пляжа",
      "Seafood, sushi & dim-sum bites; modern":
        "Морепродукты, суши и димсам; современно",
      "Seafood & Mauritian; central by the water":
        "Морепродукты и маврикийская кухня; центр у воды",
      "Fish, lobster & prawns; refined, lagoon views":
        "Рыба, лобстер и креветки; изысканно, вид на лагуну",
      "Mediterranean & seafood; stylish lounge bar":
        "Средиземноморская кухня и морепродукты; стильный лаунж",
      "Elevated dining; infinity-pool rooftop":
        "Ресторан повыше классом; rooftop с infinity-бассейном",
      "Tapas, pizza & drinks; lively evenings":
        "Тапас, пицца и напитки; оживленные вечера",
      "Easy beach food; great for families":
        "Простая пляжная еда; хорошо для семей",
      "Seafood; elegant, with sea views":
        "Морепродукты; элегантно, с видом на море",
      "Fresh, casual & tapas; all-day dining":
        "Свежо, неформально и тапас; весь день",
      "Casual beach-club dining & lagoon views":
        "Неформальный beach club с видом на лагуну",
      "Seafood, Mediterranean & French; by the beach":
        "Морепродукты, средиземноморская и французская кухня у пляжа",
      "Cocktails & tapas; rooftop views": "Коктейли и тапас; виды с rooftop",
      "Burgers & casual beach fare (Flic en Flac)":
        "Бургеры и простая пляжная еда (Flic en Flac)",
      "Mauritian, Creole, Indian & seafood (Flic en Flac)":
        "Маврикийская, креольская, индийская кухня и морепродукты (Flic en Flac)",
      "Dinner, cocktails & wine; social (Tamarin)":
        "Ужин, коктейли и вино; общительная атмосфера (Tamarin)",
      "Mauritian-inspired seafood; fresh & tropical":
        "Морепродукты в маврикийском стиле; свежо и тропично",
      "Local seafood; near Ile aux Cerfs day trips":
        "Местные морепродукты; рядом с турами на Ile aux Cerfs",
      "Simple, authentic Mauritian seafood":
        "Простые аутентичные маврикийские морепродукты",
    },
    goodTitle: "Полезно знать",
    tips: {
      "Book ahead": {
        title: "Бронируйте заранее",
        text: "Бронируйте столы на закат в Grand Baie и популярных местах.",
      },
      "Bring cash": {
        title: "Возьмите наличные",
        text: "Небольшие заведения могут не принимать карты.",
      },
      "Go local": {
        title: "Ешьте местное",
        text: "Рыба, креветки, лобстер, осьминог и кальмары - фавориты острова.",
      },
    },
    quote:
      "Пляжный ресторан здесь - это не только еда: это вид, люди, свет и островная атмосфера.",
  },
};

const CLEAN_RU_RESTAURANT_COPY: (typeof RESTAURANT_PAGE_COPY)["fr"] = {
  kicker: "Вкус острова",
  titleMain: "Пляжные рестораны",
  titleAccent: "у моря",
  intro:
    "21 независимое место у моря по всему острову, где вид, люди и свет важны не меньше еды.",
  coasts: {
    North: "Север",
    "West & South-West": "Запад и юго-запад",
    "East & Wild South": "Восток и дикий юг",
  },
  groupTitles: {
    "Grand Baie": "Гран-Бэ",
    "Trou aux Biches - Mont Choisy": "Тру-о-Биш - Мон-Шуази",
    Pereybere: "Перейбер",
    "Flic en Flac - Tamarin": "Флик-ан-Флак - Тамарин",
    "Le Morne": "Ле-Морн",
    "Trou d'Eau Douce": "Тру-д'О-Дус",
    "Gris Gris - Souillac": "Гри-Гри - Суйяк",
  },
  names: {
    "The Beach House": "Пляжный дом",
    "Les Canisses Resto & Plage": "Les Canisses Resto & Plage",
    "The Beach Kitchen": "Пляжная кухня",
    "Cafe de La Plage": "Cafe de la Plage",
    "Le Capitaine": "Le Capitaine",
    "Eden Beach": "Eden Beach",
    "Bisou Rooftop - LUX*": "Bisou Rooftop - LUX*",
    "Zaka - Super U": "Zaka - Super U",
    "Beach Hut": "Пляжная хижина",
    "Le Pescatore": "Le Pescatore",
    "Ava Beach": "Ava Beach",
    "Mont Choisy Le Beach Club": "Mont Choisy Le Beach Club",
    "Flowers of Paradise": "Цветы рая",
    "The Cloud Rooftop & Lounge": "The Cloud Rooftop & Lounge",
    "Jeanno Burger": "Jeanno Burger",
    Pakbo: "Pakbo",
    "Signature by Big Willy's": "Signature by Big Willy's",
    "Wapalapam Island Eatery": "Wapalapam Island Eatery",
    "Chez Tino": "Chez Tino",
    "Chez Rosy": "Chez Rosy",
  },
  details: {
    "Sea views, cocktails & sunset beach bar":
      "Вид на море, коктейли и пляжный бар на закате",
    "Seafood, French & Mediterranean beachfront":
      "Морепродукты, французская и средиземноморская кухня у пляжа",
    "Seafood, sushi & dim-sum bites; modern":
      "Морепродукты, суши и димсам; современно",
    "Seafood & Mauritian; central by the water":
      "Морепродукты и маврикийская кухня; центр у воды",
    "Fish, lobster & prawns; refined, lagoon views":
      "Рыба, лобстер и креветки; изысканно, вид на лагуну",
    "Mediterranean & seafood; stylish lounge bar":
      "Средиземноморская кухня и морепродукты; стильный лаунж",
    "Elevated dining; infinity-pool rooftop":
      "Ресторан повыше классом; rooftop с infinity-бассейном",
    "Tapas, pizza & drinks; lively evenings":
      "Тапас, пицца и напитки; оживленные вечера",
    "Easy beach food; great for families":
      "Простая пляжная еда; хорошо для семей",
    "Seafood; elegant, with sea views":
      "Морепродукты; элегантно, с видом на море",
    "Fresh, casual & tapas; all-day dining":
      "Свежо, неформально и тапас; весь день",
    "Casual beach-club dining & lagoon views":
      "Неформальный beach club с видом на лагуну",
    "Seafood, Mediterranean & French; by the beach":
      "Морепродукты, средиземноморская и французская кухня у пляжа",
    "Cocktails & tapas; rooftop views": "Коктейли и тапас; виды с rooftop",
    "Burgers & casual beach fare (Flic en Flac)":
      "Бургеры и простая пляжная еда (Flic en Flac)",
    "Mauritian, Creole, Indian & seafood (Flic en Flac)":
      "Маврикийская, креольская, индийская кухня и морепродукты (Flic en Flac)",
    "Dinner, cocktails & wine; social (Tamarin)":
      "Ужин, коктейли и вино; общительная атмосфера (Tamarin)",
    "Mauritian-inspired seafood; fresh & tropical":
      "Морепродукты в маврикийском стиле; свежо и тропично",
    "Local seafood; near Ile aux Cerfs day trips":
      "Местные морепродукты; рядом с турами на Ile aux Cerfs",
    "Simple, authentic Mauritian seafood":
      "Простые аутентичные маврикийские морепродукты",
  },
  goodTitle: "Полезно знать",
  tips: {
    "Book ahead": {
      title: "Бронируйте заранее",
      text: "Бронируйте столы на закат в Grand Baie и популярных местах.",
    },
    "Bring cash": {
      title: "Возьмите наличные",
      text: "Небольшие заведения могут не принимать карты.",
    },
    "Go local": {
      title: "Ешьте местное",
      text: "Рыба, креветки, лобстер, осьминог и кальмары - фавориты острова.",
    },
  },
  quote:
    "Пляжный ресторан здесь - это не только еда: это вид, люди, свет и островная атмосфера.",
};

function getRestaurantPageCopy(locale: string) {
  if (locale === "ru") return CLEAN_RU_RESTAURANT_COPY;
  return RESTAURANT_PAGE_COPY[locale as SupportedRestaurantsLocale];
}

function RestaurantSection({
  group,
  copy,
}: {
  group: RestaurantGroup;
  copy?: (typeof RESTAURANT_PAGE_COPY)[SupportedRestaurantsLocale];
}) {
  const color = coastColors[group.coast];

  return (
    <section>
      <h2
        className="flex items-center gap-2 border-b border-[#e4ded7] pb-2 text-[11px] font-bold uppercase tracking-wide"
        style={{ color }}
      >
        <MapPin className="h-3.5 w-3.5" strokeWidth={2} />
        {copy?.groupTitles?.[group.title] ?? group.title}
      </h2>
      <ul className="space-y-3 pt-3">
        {group.restaurants.map(([name, detail]) => {
          const href = restaurantLinks[name];
          const displayName = copy?.names?.[name] ?? name;

          return (
            <li key={name}>
              <h3 className="font-serif text-[17px] font-bold leading-tight text-[#111d2a]">
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition hover:text-[#f16522]"
                  >
                    {displayName}
                  </a>
                ) : (
                  displayName
                )}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-[#66737d] sm:text-sm">
                {copy?.details[detail] ?? detail}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default async function WhereToEatBeachRestaurantsInMauritiusPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const copy = getRestaurantPageCopy(locale);
  return localizeStaticPage(
    <main id="main-content" className="min-h-screen bg-white text-[#1c2a2e]">
      <Navbar />

      <article className="mx-auto w-full max-w-7xl px-4 pt-24 pb-10 sm:px-6 lg:pt-28 xl:px-0">
        <header>
          <p className="mt-7 text-xs font-bold uppercase tracking-wide text-[#f16522]">
            {copy?.kicker ?? "Taste of the Island"}
          </p>
          <h1 className="mt-2 font-serif text-[clamp(2.15rem,5vw,3.6rem)] font-bold leading-tight tracking-tight text-[#151f2b]">
            {copy?.titleMain ?? "Beach Restaurants"}{" "}
            <span className="font-normal italic text-[#f16522]">
              {copy?.titleAccent ?? "by the Sea"}
            </span>
          </h1>
          <p className="mt-4 max-w-4xl font-serif text-sm italic leading-relaxed text-[#6f7e88] sm:text-base">
            {copy?.intro ??
              "21 independent beach spots across the island - where the view, the people and the light matter as much as the food."}
          </p>

          <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-xs text-[#445465]">
            {coastLegend.map(([label, color]) => (
              <span key={label} className="inline-flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: color }}
                />
                {copy?.coasts[label] ?? staticPageText(locale, label)}
              </span>
            ))}
          </div>
        </header>

        <section className="mt-6 grid gap-x-10 gap-y-8 lg:grid-cols-2">
          <div className="space-y-7">
            {leftRestaurantGroups.map((group) => (
              <RestaurantSection key={group.title} group={group} copy={copy} />
            ))}
          </div>
          <div className="space-y-7">
            {rightRestaurantGroups.map((group) => (
              <RestaurantSection key={group.title} group={group} copy={copy} />
            ))}
          </div>
        </section>
        <section
          className="bg-white py-3 md:py-5 dark:border-neutral-800 dark:bg-neutral-900"
          aria-label="Sponsored highlights"
        >
          <div className="container mx-auto max-w-7xl">
            <div className="relative overflow-hidden rounded-xl bg-[#052028] shadow-sm ring-1 ring-gray-200 dark:ring-neutral-700">
              <a
                href={ad.href}
                className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
              >
                <span className="relative block aspect-[1200/240] w-full">
                  <Image
                    src={ad.desktopSrc}
                    alt={ad.alt}
                    fill
                    sizes="(max-width: 1280px) 100vw, 1280px"
                    className="rounded-xl object-cover"
                    loading="lazy"
                  />
                </span>
              </a>
            </div>
          </div>
        </section>
        <CarRentalAdBannerInfo />
        <section className="mt-10 rounded-md bg-[#f5f2ef] px-5 py-6 sm:px-7">
          <h2 className="font-serif text-xl font-bold text-[#f16522]">
            {copy?.goodTitle ?? "Good to Know"}
          </h2>
          <div className="mt-4 grid gap-5 md:grid-cols-3">
            {goodToKnow.map(({ title, text, icon: Icon }) => (
              <div key={title} className="flex items-start gap-3">
                <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full text-[#2389c9]">
                  <Icon className="h-6 w-6" strokeWidth={1.9} />
                </span>
                <div>
                  <p className="text-xs leading-relaxed text-[#61707a] sm:text-sm">
                    <strong className="font-serif text-[#1d3144]">
                      {copy?.tips[title]?.title ??
                        staticPageText(locale, title)}
                    </strong>
                  </p>
                  <p className="text-xs">
                    {copy?.tips[title]?.text ?? staticPageText(locale, text)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-5 font-serif text-sm italic leading-6 text-[#7a858d]">
            &quot;
            {copy?.quote ??
              "A beach restaurant here isn't only about food - it's the view, the people, the light and the island atmosphere."}
            &quot;
          </p>
        </section>
      </article>

      <PopularRoadTrips locale={locale} />

      <Footer />
    </main>,
    locale,
  );
}
