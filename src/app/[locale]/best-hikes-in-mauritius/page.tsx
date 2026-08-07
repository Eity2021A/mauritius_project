import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PopularRoadTrips from "@/components/PopularRoadTrips";
import { Link } from "@/i18n/navigation";
import { normalizeLocale } from "@/i18n/routing";
import type { LucideIcon } from "lucide-react";
import {
  Compass,
  Landmark,
  Leaf,
  Mountain,
  Route,
  ShieldCheck,
  TreePalm,
  TriangleAlert,
  Waves,
} from "lucide-react";
import PocketAdBanner from "@/components/PocketAdBanner";
import CarRentalAdBanner from "@/components/CarRentalAdBanner";
import { localizeStaticPage } from "@/lib/static-page-localizer";

export const revalidate = 3600;

type Locale = "en" | "fr" | "de" | "it" | "es" | "ru";
type HikeLevel = "Easy" | "Moderate" | "Challenging";

type Hike = {
  title: string;
  label: string;
  region: string;
  description: string;
  level: HikeLevel;
  icon: LucideIcon;
};

type HikePageCopy = {
  metadata: Metadata;
  kicker: string;
  titleMain: string;
  titleAccent: string;
  intro: string;
  difficulties: Record<HikeLevel, string>;
  hikes: Hike[];
  smartTitle: string;
  tips: Array<{ icon: LucideIcon; title: string; text: string }>;
  note: string;
};

const levelColors: Record<HikeLevel, string> = {
  Easy: "#2f8e48",
  Moderate: "#2389c9",
  Challenging: "#f16522",
};

const levelStyles: Record<HikeLevel, { color: string; bg: string }> = {
  Easy: { color: "#2f8e48", bg: "#edf8ef" },
  Moderate: { color: "#2389c9", bg: "#eaf7ff" },
  Challenging: { color: "#f16522", bg: "#fff0e7" },
};

const hikeLinks = [
  "/best-places-to-visit-in-mauritius/piton-mountain",
  "/top-activities-mauritius/hiking-le-pouce-mauritius-scenic-mountain-hike-with-port-louis-views",
  "/top-activities-mauritius/hiking-le-morne",
  "/top-activities-mauritius/black-river-gorges",
  "/top-activities-mauritius/seven-waterfalls-full-day-hike",
  "/best-places-to-visit-in-mauritius/chamarel-village",
  "/best-places-to-visit-in-mauritius/petrin-forest-hike-mauritius",
  "/top-activities-mauritius/wild-south-hike",
  "/top-activities-mauritius/wild-south-hike",
  "/best-places-to-visit-in-mauritius/500-feet-waterfall",
  "/best-places-to-visit-in-mauritius/royal-palm-forest-hike-mauritius-hidden-nature-trail-in-the-wild-south",
  "/beaches-in-mauritius/bras-deau",
] as const;

const hikeIcons = [
  Mountain,
  Mountain,
  Route,
  TreePalm,
  Landmark,
  Leaf,
  Waves,
  Waves,
  Waves,
  Landmark,
  TreePalm,
  Leaf,
] as const;

const makeHikes = (hikes: Array<Omit<Hike, "icon">>): Hike[] =>
  hikes.map((hike, index) => ({ ...hike, icon: hikeIcons[index] }));

const HIKE_COPY: Record<Locale, HikePageCopy> = {
  en: {
    metadata: {
      title: "Best Hikes in Mauritius",
      description:
        "The best hikes in Mauritius - from Le Morne Brabant to the Seven Waterfalls and Black River Gorges. Trails, peaks and viewpoints for every level.",
      alternates: { canonical: "/best-hikes-in-mauritius" },
    },
    kicker: "Trails · Peaks · Waterfalls",
    titleMain: "The Best Hikes",
    titleAccent: "in Mauritius",
    intro:
      "Beyond the beach - twelve of the island's best trails, from easy coastal forests to bucket-list mountain summits.",
    difficulties: {
      Easy: "Easy",
      Moderate: "Moderate",
      Challenging: "Challenging",
    },
    hikes: makeHikes([
      {
        title: "Piton Petite Rivière Noire",
        label: "Highest Peak",
        region: "Rivière Noire",
        description: "Summit panorama over the west coast & Le Morne lagoon.",
        level: "Challenging",
      },
      {
        title: "Le Pouce",
        label: "The Thumb Peak",
        region: "Moka - Central",
        description: "3rd-highest peak - views over Port Louis & the plateau.",
        level: "Moderate",
      },
      {
        title: "Le Morne Brabant",
        label: "UNESCO Peak",
        region: "South-West",
        description: "A steep upper climb to iconic lagoon & islet views.",
        level: "Challenging",
      },
      {
        title: "Black River Gorges",
        label: "Forest Trails",
        region: "South-West",
        description: "Native forest, Alexandra Falls & deep-valley viewpoints.",
        level: "Moderate",
      },
      {
        title: "Sept Cascades",
        label: "Seven Falls",
        region: "Henrietta - Central",
        description: "Steep, muddy trail to a chain of falls & natural pools.",
        level: "Challenging",
      },
      {
        title: "Chamarel Trails",
        label: "Forest & Falls",
        region: "South-West",
        description: "Waterfall, coloured earth & Ebony Forest walks.",
        level: "Easy",
      },
      {
        title: "Macchabee Forest",
        label: "Native Forest",
        region: "from Petrin",
        description: "Quiet birdlife trail with west-coast viewpoints.",
        level: "Moderate",
      },
      {
        title: "Gris Gris Coast",
        label: "Coastal Cliffs",
        region: "Souillac - South",
        description: "Dramatic cliffs, La Roche Qui Pleure & sea spray.",
        level: "Moderate",
      },
      {
        title: "Le Souffleur",
        label: "Wild Coast",
        region: "South coast",
        description: "A blowhole, volcanic rocks & crashing surf.",
        level: "Challenging",
      },
      {
        title: "Cascade 500 Pieds",
        label: "Hidden Fall",
        region: "South",
        description: "River crossings & cane fields to a cliff-ringed fall.",
        level: "Moderate",
      },
      {
        title: "Royal Palm Forest",
        label: "Palm Forest",
        region: "South-East",
        description: "Easy shaded walk among royal palms & greenery.",
        level: "Easy",
      },
      {
        title: "Bras d'Eau",
        label: "Coastal Forest",
        region: "North-East",
        description: "Flat, shaded birdwatching trails & wetlands.",
        level: "Easy",
      },
    ]),
    smartTitle: "Hike smart",
    tips: [
      {
        icon: Compass,
        title: "Start early",
        text: "Beat the heat & crowds - mornings are clearest.",
      },
      {
        icon: TriangleAlert,
        title: "Check the weather",
        text: "Skip trails after heavy rain - rocks turn slippery.",
      },
      {
        icon: ShieldCheck,
        title: "Come prepared",
        text: "Water, grippy shoes, a rain layer & offline maps.",
      },
    ],
    note: "Keep back from cliffs & waves on the wild south coast, respect Le Morne's heritage, and leave no trace.",
  },
  fr: {
    metadata: {
      title: "Les meilleures randonnées à Maurice",
      description:
        "Les meilleures randonnées à Maurice - du Morne Brabant aux Sept Cascades et aux Gorges de Rivière Noire, avec sentiers, sommets et points de vue pour tous les niveaux.",
      alternates: { canonical: "/best-hikes-in-mauritius" },
    },
    kicker: "Sentiers · Sommets · Cascades",
    titleMain: "Les meilleures randonnées",
    titleAccent: "à Maurice",
    intro:
      "Au-delà des plages - douze des plus beaux sentiers de l'île, des forêts côtières faciles aux sommets mythiques.",
    difficulties: {
      Easy: "Facile",
      Moderate: "Modéré",
      Challenging: "Difficile",
    },
    hikes: makeHikes([
      {
        title: "Piton de la Petite Rivière Noire",
        label: "Plus haut sommet",
        region: "Rivière Noire",
        description:
          "Panorama depuis le sommet sur la côte ouest et le lagon du Morne.",
        level: "Challenging",
      },
      {
        title: "Le Pouce",
        label: "Sommet du Pouce",
        region: "Moka - Centre",
        description:
          "Troisième plus haut sommet, avec vues sur Port-Louis et le plateau central.",
        level: "Moderate",
      },
      {
        title: "Le Morne Brabant",
        label: "Sommet UNESCO",
        region: "Sud-Ouest",
        description:
          "Une montée finale raide vers des vues iconiques sur le lagon et les îlots.",
        level: "Challenging",
      },
      {
        title: "Gorges de Rivière Noire",
        label: "Sentiers forestiers",
        region: "Sud-Ouest",
        description:
          "Forêt native, cascade Alexandra et belvédères sur les vallées profondes.",
        level: "Moderate",
      },
      {
        title: "Sept Cascades",
        label: "Sept chutes",
        region: "Henrietta - Centre",
        description:
          "Sentier raide et boueux vers une chaîne de cascades et de bassins naturels.",
        level: "Challenging",
      },
      {
        title: "Sentiers de Chamarel",
        label: "Forêt et cascades",
        region: "Sud-Ouest",
        description:
          "Cascade, Terres des Sept Couleurs et promenades dans Ebony Forest.",
        level: "Easy",
      },
      {
        title: "Forêt de Macchabée",
        label: "Forêt native",
        region: "depuis Pétrin",
        description:
          "Sentier paisible avec oiseaux endémiques et points de vue sur la côte ouest.",
        level: "Moderate",
      },
      {
        title: "Côte de Gris Gris",
        label: "Falaises côtières",
        region: "Souillac - Sud",
        description:
          "Falaises spectaculaires, La Roche Qui Pleure et embruns puissants.",
        level: "Moderate",
      },
      {
        title: "Le Souffleur",
        label: "Côte sauvage",
        region: "côte sud",
        description:
          "Un souffleur naturel, des roches volcaniques et une mer qui gronde.",
        level: "Challenging",
      },
      {
        title: "Cascade 500 Pieds",
        label: "Cascade cachée",
        region: "Sud",
        description:
          "Traversées de rivière et champs de canne jusqu'à une chute bordée de falaises.",
        level: "Moderate",
      },
      {
        title: "Forêt de Royal Palm",
        label: "Forêt de palmiers",
        region: "Sud-Est",
        description:
          "Promenade facile et ombragée parmi les palmiers royaux et la verdure.",
        level: "Easy",
      },
      {
        title: "Bras d'Eau",
        label: "Forêt côtière",
        region: "Nord-Est",
        description:
          "Sentiers plats et ombragés pour observer les oiseaux et les zones humides.",
        level: "Easy",
      },
    ]),
    smartTitle: "Randonner malin",
    tips: [
      {
        icon: Compass,
        title: "Partez tôt",
        text: "Évitez la chaleur et la foule - les matinées sont les plus claires.",
      },
      {
        icon: TriangleAlert,
        title: "Vérifiez la météo",
        text: "Évitez les sentiers après de fortes pluies - les rochers deviennent glissants.",
      },
      {
        icon: ShieldCheck,
        title: "Soyez équipé",
        text: "Eau, chaussures adhérentes, veste légère et cartes hors ligne.",
      },
    ],
    note: "Restez loin des falaises et des vagues sur la côte sud sauvage, respectez l'héritage du Morne et ne laissez aucune trace.",
  },
  de: {
    metadata: {
      title: "Die besten Wanderungen auf Mauritius",
      description:
        "Die besten Wanderungen auf Mauritius - von Le Morne Brabant bis zu den Sieben Wasserfällen und den Schluchten des Schwarzen Flusses, mit Wegen, Gipfeln und Aussichtspunkten für jedes Niveau.",
      alternates: { canonical: "/best-hikes-in-mauritius" },
    },
    kicker: "Wege · Gipfel · Wasserfälle",
    titleMain: "Die besten Wanderungen",
    titleAccent: "auf Mauritius",
    intro:
      "Mehr als Strand - zwölf der schönsten Wege der Insel, von leichten Küstenwäldern bis zu großen Gipfeltouren.",
    difficulties: {
      Easy: "Leicht",
      Moderate: "Mittel",
      Challenging: "Anspruchsvoll",
    },
    hikes: makeHikes([
      {
        title: "Piton Petite Rivière Noire",
        label: "Höchster Gipfel",
        region: "Rivière Noire",
        description:
          "Gipfelpanorama über die Westküste und die Lagune von Le Morne.",
        level: "Challenging",
      },
      {
        title: "Le Pouce",
        label: "Der Daumen-Gipfel",
        region: "Moka - Zentrum",
        description:
          "Dritthöchster Gipfel mit Blick auf Port Louis und das Hochplateau.",
        level: "Moderate",
      },
      {
        title: "Le Morne Brabant",
        label: "UNESCO-Gipfel",
        region: "Südwesten",
        description:
          "Ein steiler oberer Anstieg zu ikonischen Lagunen- und Inselblicken.",
        level: "Challenging",
      },
      {
        title: "Schluchten des Schwarzen Flusses",
        label: "Waldwege",
        region: "Südwesten",
        description:
          "Einheimischer Wald, Alexandra Falls und Aussichtspunkte über tiefe Täler.",
        level: "Moderate",
      },
      {
        title: "Sept Cascades",
        label: "Sieben Wasserfälle",
        region: "Henrietta - Zentrum",
        description:
          "Steiler, oft schlammiger Weg zu Wasserfällen und natürlichen Pools.",
        level: "Challenging",
      },
      {
        title: "Chamarel-Wanderwege",
        label: "Wald und Fälle",
        region: "Südwesten",
        description:
          "Wasserfall, farbige Erde und Spazierwege im Ebony Forest.",
        level: "Easy",
      },
      {
        title: "Macchabee-Wald",
        label: "Einheimischer Wald",
        region: "ab Petrin",
        description: "Ruhige Vogelwege mit Aussichtspunkten zur Westküste.",
        level: "Moderate",
      },
      {
        title: "Gris-Gris-Küste",
        label: "Küstenklippen",
        region: "Souillac - Süden",
        description:
          "Dramatische Klippen, La Roche Qui Pleure und Meeresgischt.",
        level: "Moderate",
      },
      {
        title: "Le Souffleur",
        label: "Wilde Küste",
        region: "Südküste",
        description: "Ein Blasloch, Vulkangestein und tosende Brandung.",
        level: "Challenging",
      },
      {
        title: "Cascade 500 Pieds",
        label: "Versteckter Fall",
        region: "Süden",
        description:
          "Flussquerungen und Zuckerrohrfelder bis zu einem Fall am Klippenrand.",
        level: "Moderate",
      },
      {
        title: "Royal-Palm-Wald",
        label: "Palmenwald",
        region: "Südosten",
        description:
          "Leichter Schattenweg zwischen Königspalmen und dichtem Grün.",
        level: "Easy",
      },
      {
        title: "Bras d'Eau",
        label: "Küstenwald",
        region: "Nordosten",
        description:
          "Flache, schattige Wege für Vogelbeobachtung und Feuchtgebiete.",
        level: "Easy",
      },
    ]),
    smartTitle: "Clever wandern",
    tips: [
      {
        icon: Compass,
        title: "Früh starten",
        text: "Hitze und Menschenmengen meiden - morgens ist die Sicht am klarsten.",
      },
      {
        icon: TriangleAlert,
        title: "Wetter prüfen",
        text: "Nach starkem Regen aussetzen - Felsen werden rutschig.",
      },
      {
        icon: ShieldCheck,
        title: "Gut vorbereiten",
        text: "Wasser, griffige Schuhe, Regenjacke und Offline-Karten mitnehmen.",
      },
    ],
    note: "Halte Abstand zu Klippen und Wellen an der wilden Südküste, respektiere das Erbe von Le Morne und hinterlasse keine Spuren.",
  },
  it: {
    metadata: {
      title: "Le migliori escursioni a Mauritius",
      description:
        "Le migliori escursioni a Mauritius - da Le Morne Brabant alle Sette Cascate e alle Gole del Fiume Nero, con sentieri, cime e punti panoramici per ogni livello.",
      alternates: { canonical: "/best-hikes-in-mauritius" },
    },
    kicker: "Sentieri · Cime · Cascate",
    titleMain: "Le migliori escursioni",
    titleAccent: "a Mauritius",
    intro:
      "Oltre la spiaggia - dodici tra i sentieri più belli dell'isola, dalle foreste costiere facili alle cime da lista dei desideri.",
    difficulties: {
      Easy: "Facile",
      Moderate: "Intermedio",
      Challenging: "Impegnativo",
    },
    hikes: makeHikes([
      {
        title: "Piton Petite Rivière Noire",
        label: "Cima più alta",
        region: "Rivière Noire",
        description:
          "Panorama dalla vetta sulla costa ovest e sulla laguna di Le Morne.",
        level: "Challenging",
      },
      {
        title: "Le Pouce",
        label: "La cima del Pollice",
        region: "Moka - Centro",
        description:
          "Terza vetta dell'isola, con viste su Port Louis e sull'altopiano.",
        level: "Moderate",
      },
      {
        title: "Le Morne Brabant",
        label: "Cima UNESCO",
        region: "Sud-ovest",
        description:
          "Una salita finale ripida verso viste iconiche su laguna e isolotti.",
        level: "Challenging",
      },
      {
        title: "Gole del Fiume Nero",
        label: "Sentieri forestali",
        region: "Sud-ovest",
        description:
          "Foresta nativa, Alexandra Falls e belvedere su valli profonde.",
        level: "Moderate",
      },
      {
        title: "Sept Cascades",
        label: "Sette cascate",
        region: "Henrietta - Centro",
        description:
          "Sentiero ripido e fangoso verso una serie di cascate e piscine naturali.",
        level: "Challenging",
      },
      {
        title: "Sentieri di Chamarel",
        label: "Foresta e cascate",
        region: "Sud-ovest",
        description: "Cascata, terre colorate e passeggiate nell'Ebony Forest.",
        level: "Easy",
      },
      {
        title: "Foresta di Macchabee",
        label: "Foresta nativa",
        region: "da Petrin",
        description:
          "Sentieri tranquilli per birdwatching con vedute sulla costa ovest.",
        level: "Moderate",
      },
      {
        title: "Costa di Gris Gris",
        label: "Scogliere costiere",
        region: "Souillac - Sud",
        description:
          "Scogliere drammatiche, La Roche Qui Pleure e spruzzi oceanici.",
        level: "Moderate",
      },
      {
        title: "Le Souffleur",
        label: "Costa selvaggia",
        region: "costa sud",
        description: "Uno sfiatatoio marino, rocce vulcaniche e onde potenti.",
        level: "Challenging",
      },
      {
        title: "Cascade 500 Pieds",
        label: "Cascata nascosta",
        region: "Sud",
        description:
          "Guadi e campi di canna fino a una cascata cinta da pareti rocciose.",
        level: "Moderate",
      },
      {
        title: "Foresta Royal Palm",
        label: "Foresta di palme",
        region: "Sud-est",
        description:
          "Facile camminata all'ombra tra palme reali e vegetazione.",
        level: "Easy",
      },
      {
        title: "Bras d'Eau",
        label: "Foresta costiera",
        region: "Nord-est",
        description:
          "Sentieri pianeggianti e ombreggiati tra uccelli e zone umide.",
        level: "Easy",
      },
    ]),
    smartTitle: "Escursioni intelligenti",
    tips: [
      {
        icon: Compass,
        title: "Parti presto",
        text: "Evita caldo e folla - le mattine sono più limpide.",
      },
      {
        icon: TriangleAlert,
        title: "Controlla il meteo",
        text: "Evita i sentieri dopo forti piogge - le rocce diventano scivolose.",
      },
      {
        icon: ShieldCheck,
        title: "Preparati bene",
        text: "Acqua, scarpe aderenti, giacca leggera e mappe offline.",
      },
    ],
    note: "Mantieni distanza da scogliere e onde sulla costa sud selvaggia, rispetta la memoria di Le Morne e non lasciare tracce.",
  },
  es: {
    metadata: {
      title: "Las mejores caminatas de Mauricio",
      description:
        "Las mejores caminatas de Mauricio - de Le Morne Brabant a las Siete Cascadas y las Gargantas del Río Negro, con senderos, cumbres y miradores para todos los niveles.",
      alternates: { canonical: "/best-hikes-in-mauritius" },
    },
    kicker: "Senderos · Cumbres · Cascadas",
    titleMain: "Las mejores caminatas",
    titleAccent: "de Mauricio",
    intro:
      "Más allá de la playa - doce de los mejores senderos de la isla, desde bosques costeros fáciles hasta cumbres imprescindibles.",
    difficulties: {
      Easy: "Fácil",
      Moderate: "Moderado",
      Challenging: "Exigente",
    },
    hikes: makeHikes([
      {
        title: "Piton Petite Rivière Noire",
        label: "Cumbre más alta",
        region: "Rivière Noire",
        description:
          "Panorama desde la cima sobre la costa oeste y la laguna de Le Morne.",
        level: "Challenging",
      },
      {
        title: "Le Pouce",
        label: "Cumbre del Pulgar",
        region: "Moka - Centro",
        description:
          "Tercera cumbre más alta, con vistas a Port Louis y la meseta.",
        level: "Moderate",
      },
      {
        title: "Le Morne Brabant",
        label: "Cumbre UNESCO",
        region: "Suroeste",
        description:
          "Una subida final empinada hacia vistas icónicas de la laguna y los islotes.",
        level: "Challenging",
      },
      {
        title: "Gargantas del Río Negro",
        label: "Senderos forestales",
        region: "Suroeste",
        description:
          "Bosque nativo, Alexandra Falls y miradores sobre valles profundos.",
        level: "Moderate",
      },
      {
        title: "Sept Cascades",
        label: "Siete cascadas",
        region: "Henrietta - Centro",
        description:
          "Sendero empinado y embarrado hacia una cadena de cascadas y pozas naturales.",
        level: "Challenging",
      },
      {
        title: "Senderos de Chamarel",
        label: "Bosque y cascadas",
        region: "Suroeste",
        description: "Cascada, tierras de colores y paseos por Ebony Forest.",
        level: "Easy",
      },
      {
        title: "Bosque de Macchabee",
        label: "Bosque nativo",
        region: "desde Petrin",
        description:
          "Sendero tranquilo con aves y miradores hacia la costa oeste.",
        level: "Moderate",
      },
      {
        title: "Costa de Gris Gris",
        label: "Acantilados costeros",
        region: "Souillac - Sur",
        description:
          "Acantilados dramáticos, La Roche Qui Pleure y espuma del mar.",
        level: "Moderate",
      },
      {
        title: "Le Souffleur",
        label: "Costa salvaje",
        region: "costa sur",
        description: "Un sopladero natural, rocas volcánicas y oleaje fuerte.",
        level: "Challenging",
      },
      {
        title: "Cascade 500 Pieds",
        label: "Cascada escondida",
        region: "Sur",
        description:
          "Cruces de río y campos de caña hasta una cascada rodeada de acantilados.",
        level: "Moderate",
      },
      {
        title: "Bosque Royal Palm",
        label: "Bosque de palmas",
        region: "Sureste",
        description:
          "Paseo fácil y sombreado entre palmas reales y vegetación.",
        level: "Easy",
      },
      {
        title: "Bras d'Eau",
        label: "Bosque costero",
        region: "Noreste",
        description: "Senderos planos y sombreados para aves y humedales.",
        level: "Easy",
      },
    ]),
    smartTitle: "Camina con cabeza",
    tips: [
      {
        icon: Compass,
        title: "Sal temprano",
        text: "Evita calor y multitudes - las mañanas son más despejadas.",
      },
      {
        icon: TriangleAlert,
        title: "Revisa el clima",
        text: "Evita senderos tras lluvias fuertes - las rocas se vuelven resbaladizas.",
      },
      {
        icon: ShieldCheck,
        title: "Prepárate bien",
        text: "Agua, calzado con agarre, capa de lluvia y mapas sin conexión.",
      },
    ],
    note: "Mantente lejos de acantilados y olas en la costa sur salvaje, respeta el patrimonio de Le Morne y no dejes rastro.",
  },
  ru: {
    metadata: {
      title: "Лучшие походы на Маврикии",
      description:
        "Лучшие походы на Маврикии - от Ле-Морн-Брабант до Семи каскадов и ущелий Блэк-Ривер, с тропами, вершинами и смотровыми для любого уровня.",
      alternates: { canonical: "/best-hikes-in-mauritius" },
    },
    kicker: "Тропы · Вершины · Водопады",
    titleMain: "Лучшие походы",
    titleAccent: "на Маврикии",
    intro:
      "За пределами пляжей - двенадцать лучших маршрутов острова: от легких прибрежных лесов до вершин мечты.",
    difficulties: { Easy: "Легко", Moderate: "Средне", Challenging: "Сложно" },
    hikes: makeHikes([
      {
        title: "Питон-де-ла-Петит-Ривьер-Нуар",
        label: "Самая высокая вершина",
        region: "Блэк-Ривер",
        description:
          "Панорама с вершины на западное побережье и лагуну Ле-Морн.",
        level: "Challenging",
      },
      {
        title: "Ле-Пус",
        label: "Пик «Большой палец»",
        region: "Мока - центр",
        description:
          "Третья по высоте вершина с видами на Порт-Луи и центральное плато.",
        level: "Moderate",
      },
      {
        title: "Ле-Морн-Брабант",
        label: "Вершина ЮНЕСКО",
        region: "Юго-запад",
        description:
          "Крутой верхний подъем к знаменитым видам на лагуну и островки.",
        level: "Challenging",
      },
      {
        title: "Ущелья Блэк-Ривер",
        label: "Лесные тропы",
        region: "Юго-запад",
        description:
          "Родной лес, водопад Александра и смотровые над глубокими долинами.",
        level: "Moderate",
      },
      {
        title: "Семь каскадов",
        label: "Семь водопадов",
        region: "Анриетта - центр",
        description:
          "Крутая грязная тропа к цепочке водопадов и природных бассейнов.",
        level: "Challenging",
      },
      {
        title: "Тропы Шамарель",
        label: "Лес и водопады",
        region: "Юго-запад",
        description: "Водопад, цветные земли и прогулки по Ebony Forest.",
        level: "Easy",
      },
      {
        title: "Лес Маккабе",
        label: "Родной лес",
        region: "от Петрина",
        description:
          "Тихая тропа для наблюдения за птицами и видами на западное побережье.",
        level: "Moderate",
      },
      {
        title: "Побережье Гри-Гри",
        label: "Прибрежные скалы",
        region: "Суйяк - юг",
        description:
          "Драматичные обрывы, La Roche Qui Pleure и океанские брызги.",
        level: "Moderate",
      },
      {
        title: "Ле-Суфлёр",
        label: "Дикое побережье",
        region: "южное побережье",
        description: "Морской фонтан, вулканические скалы и мощный прибой.",
        level: "Challenging",
      },
      {
        title: "Каскад 500 Пье",
        label: "Скрытый водопад",
        region: "Юг",
        description:
          "Переходы через реку и поля сахарного тростника к водопаду у скал.",
        level: "Moderate",
      },
      {
        title: "Лес Ройал-Палм",
        label: "Пальмовый лес",
        region: "Юго-восток",
        description:
          "Легкая тенистая прогулка среди королевских пальм и зелени.",
        level: "Easy",
      },
      {
        title: "Бра-д'О",
        label: "Прибрежный лес",
        region: "Северо-восток",
        description:
          "Ровные тенистые тропы для птиц и прогулок у болотистых мест.",
        level: "Easy",
      },
    ]),
    smartTitle: "Идите в поход с умом",
    tips: [
      {
        icon: Compass,
        title: "Стартуйте рано",
        text: "Так меньше жары и людей - утром видимость обычно лучше.",
      },
      {
        icon: TriangleAlert,
        title: "Проверьте погоду",
        text: "Не идите после сильного дождя - камни становятся скользкими.",
      },
      {
        icon: ShieldCheck,
        title: "Подготовьтесь",
        text: "Возьмите воду, обувь с хорошим сцеплением, дождевик и офлайн-карты.",
      },
    ],
    note: "Держитесь подальше от обрывов и волн на диком южном побережье, уважайте наследие Ле-Морна и не оставляйте следов.",
  },
};

function getCopy(locale: string): HikePageCopy {
  return HIKE_COPY[normalizeLocale(locale) as Locale];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const activeLocale = normalizeLocale(locale);
  return getCopy(activeLocale).metadata;
}

export default async function BestHikesInMauritiusPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const activeLocale = normalizeLocale(locale);
  const copy = getCopy(activeLocale);

  return localizeStaticPage((
    <main id="main-content" className="min-h-screen bg-white text-[#1c2a2e]">
      <Navbar />

      <article className="mx-auto w-full max-w-6xl px-4 pt-24 pb-10 sm:px-6 lg:pt-28 xl:px-0">
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

        <section className="mt-8">
          <div className="grid max-w-md grid-cols-3 gap-3 text-xs text-[#44525a]">
            {(Object.keys(levelColors) as HikeLevel[]).map((level) => (
              <div key={level} className="flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: levelColors[level] }}
                />
                <span>{copy.difficulties[level]}</span>
              </div>
            ))}
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {copy.hikes.map((hike, index) => {
              const HikeIcon = hike.icon;
              const style = levelStyles[hike.level];
              const href = hikeLinks[index];

              return (
                <section
                  key={hike.title}
                  className="flex gap-4 rounded-md border border-[#e7dfd6] bg-white px-4 py-4 shadow-[0_2px_7px_rgba(36,54,67,.035)]"
                >
                  <span
                    className="mt-1 grid h-12 w-12 shrink-0 place-items-center rounded-full"
                    style={{ backgroundColor: style.bg, color: style.color }}
                  >
                    <HikeIcon className="h-6 w-6" strokeWidth={1.7} />
                  </span>
                  <div className="min-w-0">
                    <h2 className="font-serif text-base font-bold leading-tight text-[#152738] sm:text-lg">
                      <Link
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition hover:text-[#f16522]"
                      >
                        {hike.title}
                      </Link>
                    </h2>
                    <p
                      className="mt-1 text-[10px] font-bold uppercase tracking-wide"
                      style={{ color: style.color }}
                    >
                      {hike.label}{" "}
                      <span className="text-[#8a9398]">- {hike.region}</span>
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-[#61707a] sm:text-sm">
                      {hike.description}
                    </p>
                  </div>
                </section>
              );
            })}
          </div>
        </section>
        <CarRentalAdBanner />
        <section className="mt-8 rounded-md bg-[#f5f2ef] px-5 py-5 sm:px-7">
          <h2 className="font-serif text-xl font-bold text-[#f16522]">
            {copy.smartTitle}
          </h2>
          <div className="mt-3 grid gap-4 md:grid-cols-3">
            {copy.tips.map((tip) => {
              const TipIcon = tip.icon;

              return (
                <div key={tip.title} className="flex gap-3">
                  <TipIcon
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#2389c9]"
                    strokeWidth={1.8}
                  />
                  <div>
                    <h3 className="font-serif text-sm font-bold text-[#152738]">
                      {tip.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-[#61707a]">
                      {tip.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-4 font-serif text-xs italic leading-relaxed text-[#7a858c]">
            {copy.note}
          </p>
        </section>
      </article>

      <PopularRoadTrips locale={activeLocale} />
      <PocketAdBanner />
      <Footer />
    </main>
  ), activeLocale);
}
