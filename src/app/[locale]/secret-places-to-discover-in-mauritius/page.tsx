import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/navigation";
import PopularRoadTrips from "@/components/PopularRoadTrips";
import { normalizeLocale } from "@/i18n/routing";
import type { LucideIcon } from "lucide-react";
import {
  Clock3,
  Coffee,
  Compass,
  Leaf,
  Mountain,
  PawPrint,
  Sailboat,
  ShieldCheck,
  TreePalm,
  Utensils,
  Waves,
} from "lucide-react";
import PocketAdBanner from "@/components/PocketAdBanner";
import CarRentalAdBanner from "@/components/CarRentalAdBanner";

export const revalidate = 3600;

type Locale = "en" | "fr" | "de" | "it" | "es" | "ru";
type SecretType = "nature" | "coast" | "taste";

type SecretPlace = {
  name: string;
  tag: string;
  region: string;
  description: string;
  tip: string;
  type: SecretType;
  icon: LucideIcon;
};

type SecretCopy = {
  metadata: Metadata;
  kicker: string;
  titleMain: string;
  titleAccent: string;
  intro: string;
  typeLabels: Record<SecretType, string>;
  goLabel: string;
  places: SecretPlace[];
  adviceTitle: string;
  advice: Array<{ icon: LucideIcon; title: string; text: string }>;
  note: string;
};

const secretTypeColors: Record<SecretType, string> = {
  nature: "#2f8e48",
  coast: "#2389c9",
  taste: "#f16522",
};

const secretTypeStyles: Record<SecretType, { color: string; bg: string }> = {
  nature: { color: "#2f8e48", bg: "#edf8ef" },
  coast: { color: "#2389c9", bg: "#eaf7ff" },
  taste: { color: "#f16522", bg: "#fff0e7" },
};

const secretIcons = [
  Waves,
  Leaf,
  Coffee,
  Waves,
  PawPrint,
  Sailboat,
  TreePalm,
  Mountain,
  Waves,
  Utensils,
] as const;

const secretPlaceLinks = [
  "/best-places-to-visit-in-mauritius/secret-cave-gris-gris",
  "/best-places-to-visit-in-mauritius/allee-de-beau-vallon",
  "/best-places-to-visit-in-mauritius/bois-cheri-tea-factory",
  "/best-places-to-visit-in-mauritius/eau-bleu-waterfall-mauritius-exact-location",
  "/top-activities-mauritius/ile-aux-aigrettes",
  undefined,
  "/best-places-to-visit-in-mauritius/sophie-nature-walk-mauritius",
  undefined,
  "/beaches-in-mauritius/la-cambuse",
  "/best-places-to-visit-in-mauritius/biscuiterie-h-rault-mahebourg",
] as const;

const makeSecretPlaces = (
  places: Array<Omit<SecretPlace, "icon">>,
): SecretPlace[] =>
  places.map((place, index) => ({ ...place, icon: secretIcons[index] }));

const SECRET_COPY: Record<Locale, SecretCopy> = {
  en: {
    metadata: {
      title: "Secret Places to Discover in Mauritius",
      description:
        "Secret places to discover in Mauritius - quiet corners, hidden beaches and off-the-map spots well beyond the guidebook. Explore the island's best-kept secrets.",
      alternates: { canonical: "/secret-places-to-discover-in-mauritius" },
    },
    kicker: "Beyond the Guidebook",
    titleMain: "Secret Places",
    titleAccent: "to Discover",
    intro:
      "Ten of the island's quieter corners - hidden caves, canopy roads, native reserves and mountain trails, far from the usual tourist trail.",
    typeLabels: {
      nature: "Nature & Peaks",
      coast: "Coast & Water",
      taste: "Taste & Culture",
    },
    goLabel: "Go",
    places: makeSecretPlaces([
      {
        name: "Gris Gris Beach Cave",
        tag: "Sea Cave",
        region: "Souillac - South",
        description:
          "A cave beneath wild cliffs where the ocean crashes ashore.",
        tip: "Go at low tide - mind the powerful waves.",
        type: "coast",
      },
      {
        name: "Allée de Beau Vallon",
        tag: "Tree Tunnel",
        region: "South-East",
        description: "A quiet road roofed by a canopy of tall, arching trees.",
        tip: "Come at golden hour for the best light.",
        type: "nature",
      },
      {
        name: "Bois Chéri Tea Factory",
        tag: "Tea Plantation",
        region: "Southern highlands",
        description:
          "Tour a working tea factory with rolling hills & lake views.",
        tip: "Drive in - pair with a south road trip.",
        type: "taste",
      },
      {
        name: "Eau Bleue Waterfall",
        tag: "Turquoise Pools",
        region: "South",
        description:
          "Clear turquoise pools stepping down through the greenery.",
        tip: "Moderate hike - wear proper shoes.",
        type: "coast",
      },
      {
        name: "Île aux Aigrettes",
        tag: "Nature Reserve",
        region: "off Mahébourg - SE",
        description:
          "A restored island of giant tortoises & rare pink pigeons.",
        tip: "Guided boat tours only - book ahead.",
        type: "nature",
      },
      {
        name: "Mangroves of Île d'Ambre",
        tag: "Kayak Trails",
        region: "North-East",
        description:
          "Glide by kayak through calm, biodiverse mangrove channels.",
        tip: "Kayak tour - great for beginners.",
        type: "coast",
      },
      {
        name: "Sophie Nature Walk",
        tag: "Forest Trail",
        region: "South-West",
        description: "A lesser-known trail winding deep through native forest.",
        tip: "Quiet & authentic - off the beaten path.",
        type: "nature",
      },
      {
        name: "Petite Rivière Noire",
        tag: "Highest Peak",
        region: "Black River - SW",
        description: "The island's highest summit, with sweeping panoramas.",
        tip: "Hike early for cool air & clear views.",
        type: "nature",
      },
      {
        name: "La Cambuse",
        tag: "Wild Beach",
        region: "South-East",
        description: "A raw, untouched beach - sometimes with cows by the sea.",
        tip: "Peaceful & surreal - bring a camera.",
        type: "coast",
      },
      {
        name: "Biscuiterie Rault",
        tag: "Cassava Biscuits",
        region: "Mahébourg",
        description: "A family factory making cassava biscuits the old way.",
        tip: "Tour & taste - pair with Blue Bay.",
        type: "taste",
      },
    ]),
    adviceTitle: "Explore off the map",
    advice: [
      {
        icon: Compass,
        title: "Drive yourself",
        text: "Many gems are inland - a car makes them reachable.",
      },
      {
        icon: Clock3,
        title: "Time it right",
        text: "Golden hour and low tide transform these spots.",
      },
      {
        icon: ShieldCheck,
        title: "Tread lightly",
        text: "These places stay special when kept clean & quiet.",
      },
    ],
    note: "Half the magic is the journey - go slow, ask locals, and let the island surprise you.",
  },
  fr: {
    metadata: {
      title: "Lieux secrets à découvrir à Maurice",
      description:
        "Lieux secrets à découvrir à Maurice : grottes cachées, plages sauvages, routes sous les arbres, réserves natives et sentiers loin des foules.",
      alternates: { canonical: "/secret-places-to-discover-in-mauritius" },
    },
    kicker: "Au-delà du guide",
    titleMain: "Lieux secrets",
    titleAccent: "à découvrir",
    intro:
      "Dix coins plus tranquilles de l'île : grottes cachées, routes sous les arbres, réserves natives et sentiers de montagne, loin du circuit touristique habituel.",
    typeLabels: {
      nature: "Nature et sommets",
      coast: "Côte et eau",
      taste: "Saveurs et culture",
    },
    goLabel: "Y aller",
    places: makeSecretPlaces([
      {
        name: "Grotte de Gris Gris",
        tag: "Grotte marine",
        region: "Souillac - Sud",
        description:
          "Une grotte sous des falaises sauvages où l'océan vient frapper la côte.",
        tip: "Allez à marée basse et faites attention aux vagues puissantes.",
        type: "coast",
      },
      {
        name: "Allée de Beau Vallon",
        tag: "Tunnel d'arbres",
        region: "Sud-Est",
        description:
          "Une route calme couverte par une haute voûte d'arbres arqués.",
        tip: "Venez à l'heure dorée pour la plus belle lumière.",
        type: "nature",
      },
      {
        name: "Usine de thé Bois Chéri",
        tag: "Plantation de thé",
        region: "Hauts plateaux du sud",
        description:
          "Visitez une usine de thé en activité, entre collines et vues sur le lac.",
        tip: "Venez en voiture et combinez avec une route du sud.",
        type: "taste",
      },
      {
        name: "Cascade Eau Bleue",
        tag: "Bassins turquoise",
        region: "Sud",
        description:
          "Des bassins turquoise très clairs qui descendent dans la végétation.",
        tip: "Randonnée modérée : portez de bonnes chaussures.",
        type: "coast",
      },
      {
        name: "Île aux Aigrettes",
        tag: "Réserve naturelle",
        region: "au large de Mahébourg - SE",
        description:
          "Une île restaurée avec tortues géantes et rares pigeons roses.",
        tip: "Visites guidées en bateau uniquement : réservez à l'avance.",
        type: "nature",
      },
      {
        name: "Mangroves de l'Île d'Ambre",
        tag: "Sentiers en kayak",
        region: "Nord-Est",
        description:
          "Glissez en kayak dans des chenaux de mangrove calmes et riches en vie.",
        tip: "Tour en kayak facile, parfait pour débuter.",
        type: "coast",
      },
      {
        name: "Promenade nature Sophie",
        tag: "Sentier forestier",
        region: "Sud-Ouest",
        description:
          "Un sentier discret qui serpente au coeur d'une forêt native.",
        tip: "Calme et authentique, loin des itinéraires classiques.",
        type: "nature",
      },
      {
        name: "Petite Rivière Noire",
        tag: "Plus haut sommet",
        region: "Rivière Noire - SO",
        description: "Le plus haut sommet de l'île, avec de larges panoramas.",
        tip: "Partez tôt pour l'air frais et les vues dégagées.",
        type: "nature",
      },
      {
        name: "La Cambuse",
        tag: "Plage sauvage",
        region: "Sud-Est",
        description:
          "Une plage brute et peu touchée, parfois avec des vaches au bord de l'eau.",
        tip: "Paisible et presque irréelle : prenez un appareil photo.",
        type: "coast",
      },
      {
        name: "Biscuiterie Rault",
        tag: "Biscuits de manioc",
        region: "Mahébourg",
        description:
          "Une fabrique familiale qui prépare les biscuits de manioc à l'ancienne.",
        tip: "Visitez, goûtez, puis combinez avec Blue Bay.",
        type: "taste",
      },
    ]),
    adviceTitle: "Explorer hors carte",
    advice: [
      {
        icon: Compass,
        title: "Conduisez vous-même",
        text: "Beaucoup de pépites sont à l'intérieur des terres : une voiture les rend accessibles.",
      },
      {
        icon: Clock3,
        title: "Choisissez le bon moment",
        text: "L'heure dorée et la marée basse transforment ces lieux.",
      },
      {
        icon: ShieldCheck,
        title: "Marchez léger",
        text: "Ces endroits restent précieux quand ils restent propres et calmes.",
      },
    ],
    note: "La moitié de la magie vient du trajet : allez doucement, demandez aux habitants et laissez l'île vous surprendre.",
  },
  de: {
    metadata: {
      title: "Geheime Orte auf Mauritius entdecken",
      description:
        "Geheime Orte auf Mauritius: stille Buchten, versteckte Höhlen, Baumalleen, Naturreservate und Bergwege abseits der üblichen Routen.",
      alternates: { canonical: "/secret-places-to-discover-in-mauritius" },
    },
    kicker: "Abseits des Reiseführers",
    titleMain: "Geheime Orte",
    titleAccent: "zu entdecken",
    intro:
      "Zehn ruhigere Ecken der Insel: versteckte Höhlen, schattige Baumstraßen, Naturreservate und Bergpfade, weit weg von der üblichen Touristenroute.",
    typeLabels: {
      nature: "Natur und Gipfel",
      coast: "Küste und Wasser",
      taste: "Geschmack und Kultur",
    },
    goLabel: "Hin",
    places: makeSecretPlaces([
      {
        name: "Gris-Gris-Strandhöhle",
        tag: "Meereshöhle",
        region: "Souillac - Süden",
        description:
          "Eine Höhle unter wilden Klippen, an denen der Ozean kräftig anbrandet.",
        tip: "Bei Ebbe kommen und auf starke Wellen achten.",
        type: "coast",
      },
      {
        name: "Allée de Beau Vallon",
        tag: "Baumtunnel",
        region: "Südosten",
        description:
          "Eine ruhige Straße unter einem hohen Dach aus gebogenen Bäumen.",
        tip: "Zur goldenen Stunde ist das Licht am schönsten.",
        type: "nature",
      },
      {
        name: "Bois-Chéri-Teefabrik",
        tag: "Teeplantage",
        region: "Südliches Hochland",
        description:
          "Besuche eine aktive Teefabrik zwischen Hügeln und Seeblicken.",
        tip: "Mit dem Auto anfahren und mit einer Südtour verbinden.",
        type: "taste",
      },
      {
        name: "Eau-Bleue-Wasserfall",
        tag: "Türkise Becken",
        region: "Süden",
        description:
          "Klare türkise Becken, die stufenweise durch sattes Grün fallen.",
        tip: "Mittelschwere Wanderung, feste Schuhe tragen.",
        type: "coast",
      },
      {
        name: "Île aux Aigrettes",
        tag: "Naturreservat",
        region: "vor Mahébourg - SO",
        description:
          "Eine restaurierte Insel mit Riesenschildkröten und seltenen Rosa Tauben.",
        tip: "Nur geführte Bootstouren, vorher buchen.",
        type: "nature",
      },
      {
        name: "Mangroven der Île d'Ambre",
        tag: "Kajakrouten",
        region: "Nordosten",
        description:
          "Mit dem Kajak durch ruhige, artenreiche Mangrovenkanäle gleiten.",
        tip: "Kajaktour, sehr gut für Anfänger.",
        type: "coast",
      },
      {
        name: "Sophie-Naturweg",
        tag: "Waldweg",
        region: "Südwesten",
        description: "Ein wenig bekannter Pfad tief durch einheimischen Wald.",
        tip: "Ruhig und authentisch, abseits der bekannten Wege.",
        type: "nature",
      },
      {
        name: "Petite Rivière Noire",
        tag: "Höchster Gipfel",
        region: "Black River - SW",
        description: "Der höchste Gipfel der Insel mit weitem Panorama.",
        tip: "Früh starten für kühle Luft und klare Sicht.",
        type: "nature",
      },
      {
        name: "La Cambuse",
        tag: "Wilder Strand",
        region: "Südosten",
        description:
          "Ein roher, kaum berührter Strand, manchmal mit Kühen am Meer.",
        tip: "Friedlich und surreal, Kamera mitnehmen.",
        type: "coast",
      },
      {
        name: "Biscuiterie Rault",
        tag: "Maniok-Kekse",
        region: "Mahébourg",
        description:
          "Eine Familienfabrik, die Maniok-Kekse auf traditionelle Weise herstellt.",
        tip: "Besichtigen und probieren, gut mit Blue Bay kombinierbar.",
        type: "taste",
      },
    ]),
    adviceTitle: "Abseits der Karte erkunden",
    advice: [
      {
        icon: Compass,
        title: "Selbst fahren",
        text: "Viele Schätze liegen im Inselinneren, mit Auto sind sie erreichbar.",
      },
      {
        icon: Clock3,
        title: "Richtig timen",
        text: "Goldene Stunde und Ebbe verwandeln diese Orte.",
      },
      {
        icon: ShieldCheck,
        title: "Sanft auftreten",
        text: "Diese Plätze bleiben besonders, wenn sie sauber und ruhig bleiben.",
      },
    ],
    note: "Die halbe Magie liegt im Weg dorthin: langsam fahren, Einheimische fragen und die Insel überraschen lassen.",
  },
  it: {
    metadata: {
      title: "Luoghi segreti da scoprire a Mauritius",
      description:
        "Luoghi segreti da scoprire a Mauritius: grotte nascoste, spiagge selvagge, strade alberate, riserve native e sentieri lontani dalla folla.",
      alternates: { canonical: "/secret-places-to-discover-in-mauritius" },
    },
    kicker: "Oltre la guida",
    titleMain: "Luoghi segreti",
    titleAccent: "da scoprire",
    intro:
      "Dieci angoli più tranquilli dell'isola: grotte nascoste, strade sotto le chiome, riserve native e sentieri di montagna lontani dal percorso turistico classico.",
    typeLabels: {
      nature: "Natura e vette",
      coast: "Costa e acqua",
      taste: "Sapori e cultura",
    },
    goLabel: "Vai",
    places: makeSecretPlaces([
      {
        name: "Grotta della spiaggia Gris Gris",
        tag: "Grotta marina",
        region: "Souillac - Sud",
        description:
          "Una grotta sotto scogliere selvagge dove l'oceano si infrange sulla costa.",
        tip: "Vai con la bassa marea e fai attenzione alle onde forti.",
        type: "coast",
      },
      {
        name: "Allée de Beau Vallon",
        tag: "Tunnel di alberi",
        region: "Sud-Est",
        description:
          "Una strada tranquilla coperta da una volta di alberi alti e arcuati.",
        tip: "Arriva all'ora dorata per la luce migliore.",
        type: "nature",
      },
      {
        name: "Fabbrica del tè Bois Chéri",
        tag: "Piantagione di tè",
        region: "Altopiani del sud",
        description:
          "Visita una fabbrica di tè in attività, tra colline e viste sul lago.",
        tip: "Vai in auto e abbinala a un itinerario nel sud.",
        type: "taste",
      },
      {
        name: "Cascata Eau Bleue",
        tag: "Piscine turchesi",
        region: "Sud",
        description:
          "Piscine turchesi limpide che scendono tra la vegetazione.",
        tip: "Escursione moderata: indossa scarpe adatte.",
        type: "coast",
      },
      {
        name: "Île aux Aigrettes",
        tag: "Riserva naturale",
        region: "al largo di Mahébourg - SE",
        description:
          "Un'isola restaurata con tartarughe giganti e rari piccioni rosa.",
        tip: "Solo tour guidati in barca: prenota in anticipo.",
        type: "nature",
      },
      {
        name: "Mangrovie dell'Île d'Ambre",
        tag: "Percorsi in kayak",
        region: "Nord-Est",
        description:
          "Scivola in kayak tra canali di mangrovie calmi e ricchi di vita.",
        tip: "Tour in kayak, ottimo per principianti.",
        type: "coast",
      },
      {
        name: "Sophie Nature Walk",
        tag: "Sentiero forestale",
        region: "Sud-Ovest",
        description:
          "Un sentiero poco conosciuto che entra nel profondo della foresta nativa.",
        tip: "Tranquillo e autentico, fuori dai percorsi battuti.",
        type: "nature",
      },
      {
        name: "Petite Rivière Noire",
        tag: "Vetta più alta",
        region: "Black River - SO",
        description: "La cima più alta dell'isola, con panorami ampi.",
        tip: "Parti presto per aria fresca e viste limpide.",
        type: "nature",
      },
      {
        name: "La Cambuse",
        tag: "Spiaggia selvaggia",
        region: "Sud-Est",
        description:
          "Una spiaggia grezza e intatta, a volte con mucche vicino al mare.",
        tip: "Pacifica e surreale: porta la fotocamera.",
        type: "coast",
      },
      {
        name: "Biscuiterie Rault",
        tag: "Biscotti di manioca",
        region: "Mahébourg",
        description:
          "Una fabbrica familiare che prepara biscotti di manioca come una volta.",
        tip: "Visita e assaggia, poi abbinala a Blue Bay.",
        type: "taste",
      },
    ]),
    adviceTitle: "Esplora fuori mappa",
    advice: [
      {
        icon: Compass,
        title: "Guida da solo",
        text: "Molte gemme sono nell'entroterra: l'auto le rende raggiungibili.",
      },
      {
        icon: Clock3,
        title: "Scegli l'orario giusto",
        text: "Ora dorata e bassa marea trasformano questi luoghi.",
      },
      {
        icon: ShieldCheck,
        title: "Cammina leggero",
        text: "Questi posti restano speciali se rimangono puliti e tranquilli.",
      },
    ],
    note: "Metà della magia è il viaggio: vai piano, chiedi alla gente del posto e lascia che l'isola ti sorprenda.",
  },
  es: {
    metadata: {
      title: "Lugares secretos por descubrir en Mauricio",
      description:
        "Lugares secretos por descubrir en Mauricio: cuevas ocultas, playas salvajes, rutas bajo árboles, reservas nativas y senderos lejos de la multitud.",
      alternates: { canonical: "/secret-places-to-discover-in-mauritius" },
    },
    kicker: "Más allá de la guía",
    titleMain: "Lugares secretos",
    titleAccent: "por descubrir",
    intro:
      "Diez rincones más tranquilos de la isla: cuevas escondidas, caminos cubiertos de árboles, reservas nativas y senderos de montaña lejos de la ruta turística habitual.",
    typeLabels: {
      nature: "Naturaleza y cumbres",
      coast: "Costa y agua",
      taste: "Sabores y cultura",
    },
    goLabel: "Ir",
    places: makeSecretPlaces([
      {
        name: "Cueva de la playa Gris Gris",
        tag: "Cueva marina",
        region: "Souillac - Sur",
        description:
          "Una cueva bajo acantilados salvajes donde el océano golpea la costa.",
        tip: "Ve con marea baja y cuidado con las olas fuertes.",
        type: "coast",
      },
      {
        name: "Allée de Beau Vallon",
        tag: "Túnel de árboles",
        region: "Sureste",
        description:
          "Una carretera tranquila cubierta por una bóveda de árboles altos.",
        tip: "Ve al atardecer para la mejor luz.",
        type: "nature",
      },
      {
        name: "Fábrica de té Bois Chéri",
        tag: "Plantación de té",
        region: "Tierras altas del sur",
        description:
          "Recorre una fábrica de té activa entre colinas y vistas al lago.",
        tip: "Ve en coche y combínala con una ruta por el sur.",
        type: "taste",
      },
      {
        name: "Cascada Eau Bleue",
        tag: "Piscinas turquesas",
        region: "Sur",
        description:
          "Piscinas turquesas claras que descienden entre la vegetación.",
        tip: "Caminata moderada: usa buen calzado.",
        type: "coast",
      },
      {
        name: "Île aux Aigrettes",
        tag: "Reserva natural",
        region: "frente a Mahébourg - SE",
        description:
          "Una isla restaurada con tortugas gigantes y raras palomas rosadas.",
        tip: "Solo tours guiados en barco: reserva antes.",
        type: "nature",
      },
      {
        name: "Manglares de Île d'Ambre",
        tag: "Rutas en kayak",
        region: "Noreste",
        description:
          "Deslízate en kayak por canales de manglar tranquilos y biodiversos.",
        tip: "Tour en kayak, ideal para principiantes.",
        type: "coast",
      },
      {
        name: "Sophie Nature Walk",
        tag: "Sendero forestal",
        region: "Suroeste",
        description:
          "Un sendero poco conocido que se interna en bosque nativo.",
        tip: "Tranquilo y auténtico, fuera de lo típico.",
        type: "nature",
      },
      {
        name: "Petite Rivière Noire",
        tag: "Cumbre más alta",
        region: "Black River - SO",
        description: "La cima más alta de la isla, con grandes panorámicas.",
        tip: "Camina temprano para aire fresco y vistas claras.",
        type: "nature",
      },
      {
        name: "La Cambuse",
        tag: "Playa salvaje",
        region: "Sureste",
        description:
          "Una playa cruda e intacta, a veces con vacas junto al mar.",
        tip: "Pacífica y surrealista: lleva cámara.",
        type: "coast",
      },
      {
        name: "Biscuiterie Rault",
        tag: "Galletas de yuca",
        region: "Mahébourg",
        description:
          "Una fábrica familiar que prepara galletas de yuca a la antigua.",
        tip: "Visita y prueba, luego combínala con Blue Bay.",
        type: "taste",
      },
    ]),
    adviceTitle: "Explora fuera del mapa",
    advice: [
      {
        icon: Compass,
        title: "Conduce tú mismo",
        text: "Muchas joyas están tierra adentro: un coche las hace alcanzables.",
      },
      {
        icon: Clock3,
        title: "Elige bien la hora",
        text: "La hora dorada y la marea baja transforman estos lugares.",
      },
      {
        icon: ShieldCheck,
        title: "Pisa con cuidado",
        text: "Estos sitios siguen siendo especiales cuando se mantienen limpios y tranquilos.",
      },
    ],
    note: "La mitad de la magia está en el camino: ve despacio, pregunta a los locales y deja que la isla te sorprenda.",
  },
  ru: {
    metadata: {
      title: "Секретные места Маврикия",
      description:
        "Секретные места Маврикия: скрытые пещеры, дикие пляжи, дороги под кронами деревьев, природные резерваты и горные тропы вдали от толп.",
      alternates: { canonical: "/secret-places-to-discover-in-mauritius" },
    },
    kicker: "За пределами путеводителя",
    titleMain: "Секретные места",
    titleAccent: "для открытия",
    intro:
      "Десять более тихих уголков острова: скрытые пещеры, дороги под кронами деревьев, природные резерваты и горные тропы вдали от обычных туристических маршрутов.",
    typeLabels: {
      nature: "Природа и вершины",
      coast: "Побережье и вода",
      taste: "Вкус и культура",
    },
    goLabel: "Как идти",
    places: makeSecretPlaces([
      {
        name: "Пещера пляжа Гри-Гри",
        tag: "Морская пещера",
        region: "Суйяк - юг",
        description:
          "Пещера под дикими скалами, где океан с силой бьет о берег.",
        tip: "Идите во время отлива и помните о мощных волнах.",
        type: "coast",
      },
      {
        name: "Аллея Бо-Валлон",
        tag: "Тоннель из деревьев",
        region: "Юго-восток",
        description: "Тихая дорога под высоким сводом из изогнутых деревьев.",
        tip: "Приезжайте в золотой час ради лучшего света.",
        type: "nature",
      },
      {
        name: "Чайная фабрика Bois Chéri",
        tag: "Чайная плантация",
        region: "Южное нагорье",
        description:
          "Экскурсия по действующей чайной фабрике среди холмов и видов на озеро.",
        tip: "Езжайте на машине и совместите с южным маршрутом.",
        type: "taste",
      },
      {
        name: "Водопад Eau Bleue",
        tag: "Бирюзовые бассейны",
        region: "Юг",
        description:
          "Прозрачные бирюзовые бассейны, спускающиеся через зелень.",
        tip: "Маршрут средней сложности: нужна хорошая обувь.",
        type: "coast",
      },
      {
        name: "Île aux Aigrettes",
        tag: "Природный резерват",
        region: "у побережья Маэбурга - ЮВ",
        description:
          "Восстановленный остров с гигантскими черепахами и редкими розовыми голубями.",
        tip: "Только экскурсии с гидом на лодке: бронируйте заранее.",
        type: "nature",
      },
      {
        name: "Мангры Île d'Ambre",
        tag: "Каяк-маршруты",
        region: "Северо-восток",
        description:
          "Плывите на каяке по спокойным, богатым жизнью мангровым каналам.",
        tip: "Каяк-тур отлично подходит новичкам.",
        type: "coast",
      },
      {
        name: "Прогулка Sophie Nature",
        tag: "Лесная тропа",
        region: "Юго-запад",
        description: "Малоизвестная тропа, уходящая глубоко в местный лес.",
        tip: "Тихо и аутентично, вдали от популярных маршрутов.",
        type: "nature",
      },
      {
        name: "Petite Rivière Noire",
        tag: "Высшая вершина",
        region: "Black River - ЮЗ",
        description: "Самая высокая вершина острова с широкими панорамами.",
        tip: "Начинайте рано ради прохлады и чистых видов.",
        type: "nature",
      },
      {
        name: "Ла-Камбюз",
        tag: "Дикий пляж",
        region: "Юго-восток",
        description: "Сырой, нетронутый пляж, иногда с коровами у моря.",
        tip: "Тихо и сюрреалистично: возьмите камеру.",
        type: "coast",
      },
      {
        name: "Biscuiterie Rault",
        tag: "Печенье из маниока",
        region: "Маэбург",
        description:
          "Семейная фабрика, где печенье из маниока делают старым способом.",
        tip: "Сходите на дегустацию и совместите с Blue Bay.",
        type: "taste",
      },
    ]),
    adviceTitle: "Исследуйте вне карты",
    advice: [
      {
        icon: Compass,
        title: "Езжайте сами",
        text: "Многие места находятся в глубине острова, поэтому машина очень помогает.",
      },
      {
        icon: Clock3,
        title: "Выбирайте время",
        text: "Золотой час и отлив полностью меняют эти места.",
      },
      {
        icon: ShieldCheck,
        title: "Берегите тишину",
        text: "Эти места остаются особенными, когда их сохраняют чистыми и спокойными.",
      },
    ],
    note: "Половина магии в самой дороге: не спешите, спрашивайте местных и позвольте острову удивить вас.",
  },
};

const getCopy = (locale: string) =>
  SECRET_COPY[normalizeLocale(locale) as Locale] ?? SECRET_COPY.en;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return getCopy(locale).metadata;
}

export default async function SecretPlacesToDiscoverInMauritiusPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const copy = getCopy(locale);

  return (
    <main id="main-content" className="min-h-screen bg-white text-[#1c2a2e]">
      <Navbar />

      <article className="mx-auto w-full max-w-7xl px-4 pt-24 pb-10 sm:px-6 lg:pt-28 xl:px-0">
        <header>
          <p className="mt-7 text-xs font-bold uppercase tracking-wide text-[#f16522]">
            {copy.kicker}
          </p>
          <h1 className="mt-2 font-serif text-[clamp(2rem,5vw,3.4rem)] font-bold leading-tight tracking-tight text-[#151f2b]">
            {copy.titleMain}{" "}
            <span className="font-normal italic text-[#f16522]">
              {copy.titleAccent}
            </span>
          </h1>
          <p className="mt-4 max-w-4xl font-serif text-sm italic leading-relaxed text-[#6f7e88] sm:text-base">
            {copy.intro}
          </p>
        </header>

        <section className="mt-4">
          <div className="grid max-w-xl grid-cols-1 gap-2 text-xs text-[#44525a] sm:grid-cols-3">
            {(Object.keys(copy.typeLabels) as SecretType[]).map((type) => (
              <div key={type} className="flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: secretTypeColors[type] }}
                />
                <span>{copy.typeLabels[type]}</span>
              </div>
            ))}
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {copy.places.map((place, index) => {
              const PlaceIcon = place.icon;
              const style = secretTypeStyles[place.type];
              const href = secretPlaceLinks[index];
              const cardClassName =
                "flex gap-4 rounded-md border border-[#e7dfd6] bg-white px-4 py-4 shadow-[0_2px_7px_rgba(36,54,67,.035)] sm:gap-5 sm:px-5";
              const cardContent = (
                <>
                  <span
                    className="mt-1 grid h-12 w-12 shrink-0 place-items-center rounded-full"
                    style={{ backgroundColor: style.bg, color: style.color }}
                  >
                    <PlaceIcon className="h-6 w-6" strokeWidth={1.8} />
                  </span>
                  <div className="min-w-0">
                    <h2 className="font-serif text-base font-bold leading-tight text-[#152738] sm:text-lg">
                      {place.name}
                    </h2>
                    <p
                      className="mt-1 text-[10px] font-bold uppercase tracking-wide"
                      style={{ color: style.color }}
                    >
                      {place.tag}{" "}
                      <span className="normal-case tracking-normal text-[#8a9398]">
                        - {place.region}
                      </span>
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-[#61707a] sm:text-sm">
                      {place.description}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-[#61707a] sm:text-sm">
                      <strong className="font-serif text-[#f16522]">
                        {copy.goLabel}
                      </strong>{" "}
                      {place.tip}
                    </p>
                  </div>
                </>
              );

              if (!href) {
                return (
                  <section key={place.name} className={cardClassName}>
                    {cardContent}
                  </section>
                );
              }

              return (
                <Link
                  key={place.name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${cardClassName} transition-colors hover:border-[#f16522] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f16522]`}
                >
                  {cardContent}
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mt-8 rounded-md bg-[#f5f2ef] px-5 py-5 sm:px-7">
          <h2 className="font-serif text-xl font-bold text-[#f16522]">
            {copy.adviceTitle}
          </h2>
          <div className="mt-3 grid gap-4 md:grid-cols-3">
            {copy.advice.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex gap-3">
                <Icon
                  className="mt-0.5 h-5 w-5 shrink-0 text-[#2389c9]"
                  strokeWidth={1.8}
                />
                <div>
                  <h3 className="font-serif text-sm font-bold text-[#152738]">
                    {title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#61707a]">
                    {text}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 font-serif text-xs italic leading-relaxed text-[#7a858c]">
            {copy.note}
          </p>
        </section>
      </article>
      <PocketAdBanner />
      <CarRentalAdBanner />
      <PopularRoadTrips locale={locale} />
      <Footer />
    </main>
  );
}
