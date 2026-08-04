import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/navigation";
import PopularRoadTrips from "@/components/PopularRoadTrips";
import { normalizeLocale } from "@/i18n/routing";
import type { LucideIcon } from "lucide-react";
import {
  BookOpenCheck,
  Leaf,
  Mountain,
  PawPrint,
  Sailboat,
  ShieldCheck,
  TreePalm,
  TriangleAlert,
  Waves,
} from "lucide-react";
import CarRentalAdBannerInfo from "@/components/CarRentalAdBannerInfo";
import PocketAdBanner from "@/components/PocketAdBanner";
import CarRentalAdBanner from "@/components/CarRentalAdBanner";
export const revalidate = 3600;

type Locale = "en" | "fr" | "de" | "it" | "es" | "ru";
type NatureType = "forest" | "wildlife" | "marine";

type NaturePlace = {
  name: string;
  tag: string;
  region: string;
  description: string;
  type: NatureType;
  icon: LucideIcon;
};

type NatureCopy = {
  metadata: Metadata;
  topKicker: string;
  kicker: string;
  titleMain: string;
  titleAccent: string;
  intro: string;
  typeLabels: Record<NatureType, string>;
  places: NaturePlace[];
  adviceTitle: string;
  advice: Array<{ icon: LucideIcon; title: string; text: string }>;
  note: string;
};

const natureTypeColors: Record<NatureType, string> = {
  forest: "#2f8e48",
  wildlife: "#f16522",
  marine: "#2389c9",
};

const natureTypeStyles: Record<NatureType, { color: string; bg: string }> = {
  forest: { color: "#2f8e48", bg: "#edf8ef" },
  wildlife: { color: "#f16522", bg: "#fff0e7" },
  marine: { color: "#2389c9", bg: "#eaf7ff" },
};

const natureIcons = [
  Leaf,
  TreePalm,
  PawPrint,
  TreePalm,
  PawPrint,
  Mountain,
  PawPrint,
  Leaf,
  Leaf,
  Waves,
  Sailboat,
  Mountain,
] as const;

const naturePlaceLinks = [
  "/top-activities-mauritius/black-river-gorges",
  "/beaches-in-mauritius/bras-deau",
  "/top-activities-mauritius/ile-aux-aigrettes",
  "/best-places-to-visit-in-mauritius/bony-forest-reserve",
  undefined,
  undefined,
  undefined,
  "/best-places-to-visit-in-mauritius/pamplemousses-botanical-garden",
  "/best-places-to-visit-in-mauritius/petrin-forest-hike-mauritius",
  "/best-places-to-visit-in-mauritius/blue-bay-marine-park",
  "/top-activities-mauritius/kayaking-ile-dambre",
  "/top-activities-mauritius/sunrise-hike-at-le-morne",
] as const;

const makeNaturePlaces = (
  places: Array<Omit<NaturePlace, "icon">>,
): NaturePlace[] =>
  places.map((place, index) => ({ ...place, icon: natureIcons[index] }));

const NATURE_COPY: Record<Locale, NatureCopy> = {
  en: {
    metadata: {
      title: "Nature Reserves and Parks in Mauritius",
      description:
        "Nature reserves and parks in Mauritius - forests, conservation islands, gardens and marine parks. Where to see the island's rare, found-nowhere-else wildlife.",
      alternates: { canonical: "/nature-reserves-and-parks-in-mauritius" },
    },
    topKicker: "Nature · Conservation",
    kicker: "Protected & Wild Mauritius",
    titleMain: "Nature Reserves",
    titleAccent: "& Parks",
    intro:
      "Beyond the beach - a dozen forests, conservation islands, gardens and marine parks protecting the island's rare, found-nowhere-else wildlife.",
    typeLabels: {
      forest: "Forest & Hiking",
      wildlife: "Wildlife & Conservation",
      marine: "Marine & Lagoon",
    },
    places: makeNaturePlaces([
      {
        name: "Black River Gorges",
        tag: "National Park",
        region: "South-West",
        description: "Native forest, waterfalls & the island's top viewpoints.",
        type: "forest",
      },
      {
        name: "Bras d'Eau",
        tag: "Forest Park",
        region: "North-East",
        description: "Quiet woodland trails & gentle birdwatching.",
        type: "forest",
      },
      {
        name: "Ile aux Aigrettes",
        tag: "Conservation Isle",
        region: "off Mahebourg",
        description: "Guided island tour - giant tortoises & rare birds.",
        type: "wildlife",
      },
      {
        name: "Ebony Forest",
        tag: "Forest Reserve",
        region: "Chamarel",
        description: "Restored native ebony forest & endemic species.",
        type: "forest",
      },
      {
        name: "La Vanille Nature Park",
        tag: "Wildlife Park",
        region: "South",
        description: "Giant tortoises, crocodiles & easy family trails.",
        type: "wildlife",
      },
      {
        name: "Vallee de Ferney",
        tag: "Forest Valley",
        region: "South-East",
        description: "Native-forest hikes & birding in a quiet valley.",
        type: "forest",
      },
      {
        name: "Casela Nature Parks",
        tag: "Adventure Park",
        region: "West",
        description: "Animal encounters, activities & viewpoints for families.",
        type: "wildlife",
      },
      {
        name: "Pamplemousses Garden",
        tag: "Botanic Garden",
        region: "North",
        description: "Giant water lilies & historic palm avenues.",
        type: "forest",
      },
      {
        name: "Petrin Nature Reserve",
        tag: "Nature Reserve",
        region: "Central highlands",
        description: "Cool, dense native forest & endemic plants.",
        type: "forest",
      },
      {
        name: "Blue Bay Marine Park",
        tag: "Marine Park",
        region: "South-East",
        description: "Clear water & coral - snorkel or glass-bottom boat.",
        type: "marine",
      },
      {
        name: "Ile d'Ambre & Bernache",
        tag: "Mangrove Lagoon",
        region: "North-East",
        description: "Calm mangroves & islets - kayak or catamaran.",
        type: "marine",
      },
      {
        name: "Le Morne Brabant",
        tag: "UNESCO Mountain",
        region: "South-West",
        description: "Iconic peak & lagoon - best hiked with a guide.",
        type: "forest",
      },
    ]),
    adviceTitle: "Explore responsibly",
    advice: [
      {
        icon: ShieldCheck,
        title: "Stay on trails",
        text: "Keep to marked paths to protect fragile habitats.",
      },
      {
        icon: TriangleAlert,
        title: "Don't feed wildlife",
        text: "Never feed the monkeys - keep food hidden & sealed.",
      },
      {
        icon: BookOpenCheck,
        title: "Guide & book",
        text: "Some reserves, like Aigrettes, Le Morne, need a guide.",
      },
    ],
    note: "Spend a day or two away from the beach - the forests, islands and gardens are where the real Mauritius survives.",
  },
  fr: {
    metadata: {
      title: "Réserves naturelles et parcs à Maurice",
      description:
        "Réserves naturelles et parcs à Maurice - forêts, îles de conservation, jardins et parcs marins où observer la faune rare de l'île.",
      alternates: { canonical: "/nature-reserves-and-parks-in-mauritius" },
    },
    topKicker: "Nature · Conservation",
    kicker: "Maurice protégée et sauvage",
    titleMain: "Réserves naturelles",
    titleAccent: "et parcs",
    intro:
      "Au-delà de la plage - douze forêts, îles de conservation, jardins et parcs marins protègent la faune rare et unique de l'île.",
    typeLabels: {
      forest: "Forêt et randonnée",
      wildlife: "Faune et conservation",
      marine: "Mer et lagon",
    },
    places: makeNaturePlaces([
      {
        name: "Gorges de Rivière Noire",
        tag: "Parc national",
        region: "Sud-Ouest",
        description: "Forêt native, cascades et meilleurs belvédères de l'île.",
        type: "forest",
      },
      {
        name: "Bras d'Eau",
        tag: "Parc forestier",
        region: "Nord-Est",
        description:
          "Sentiers boisés paisibles et observation douce des oiseaux.",
        type: "forest",
      },
      {
        name: "Île aux Aigrettes",
        tag: "Île de conservation",
        region: "au large de Mahébourg",
        description:
          "Visite guidée de l'île - tortues géantes et oiseaux rares.",
        type: "wildlife",
      },
      {
        name: "Ebony Forest",
        tag: "Réserve forestière",
        region: "Chamarel",
        description: "Forêt d'ébène restaurée et espèces endémiques.",
        type: "forest",
      },
      {
        name: "La Vanille Nature Park",
        tag: "Parc animalier",
        region: "Sud",
        description:
          "Tortues géantes, crocodiles et sentiers faciles en famille.",
        type: "wildlife",
      },
      {
        name: "Vallée de Ferney",
        tag: "Vallée forestière",
        region: "Sud-Est",
        description:
          "Randonnées en forêt native et oiseaux dans une vallée calme.",
        type: "forest",
      },
      {
        name: "Casela Nature Parks",
        tag: "Parc d'aventure",
        region: "Ouest",
        description:
          "Rencontres animales, activités et points de vue pour les familles.",
        type: "wildlife",
      },
      {
        name: "Jardin de Pamplemousses",
        tag: "Jardin botanique",
        region: "Nord",
        description: "Nénuphars géants et avenues de palmiers historiques.",
        type: "forest",
      },
      {
        name: "Réserve naturelle de Pétrin",
        tag: "Réserve naturelle",
        region: "Hauts plateaux du centre",
        description: "Forêt native fraîche et dense avec plantes endémiques.",
        type: "forest",
      },
      {
        name: "Parc marin de Blue Bay",
        tag: "Parc marin",
        region: "Sud-Est",
        description:
          "Eau claire et corail - snorkeling ou bateau à fond de verre.",
        type: "marine",
      },
      {
        name: "Île d'Ambre et Bernache",
        tag: "Lagon de mangroves",
        region: "Nord-Est",
        description: "Mangroves calmes et îlots - kayak ou catamaran.",
        type: "marine",
      },
      {
        name: "Le Morne Brabant",
        tag: "Montagne UNESCO",
        region: "Sud-Ouest",
        description: "Sommet iconique et lagon - mieux avec un guide.",
        type: "forest",
      },
    ]),
    adviceTitle: "Explorer avec respect",
    advice: [
      {
        icon: ShieldCheck,
        title: "Restez sur les sentiers",
        text: "Suivez les chemins balisés pour protéger les habitats fragiles.",
      },
      {
        icon: TriangleAlert,
        title: "Ne nourrissez pas la faune",
        text: "Ne nourrissez jamais les singes - gardez la nourriture cachée et fermée.",
      },
      {
        icon: BookOpenCheck,
        title: "Guide et réservation",
        text: "Certaines réserves, comme Aigrettes et Le Morne, nécessitent un guide.",
      },
    ],
    note: "Passez un jour ou deux loin de la plage - les forêts, îles et jardins sont là où survit la vraie Maurice.",
  },
  de: {
    metadata: {
      title: "Naturreservate und Parks auf Mauritius",
      description:
        "Naturreservate und Parks auf Mauritius - Wälder, Schutzinseln, Gärten und Meeresparks mit seltener endemischer Tierwelt.",
      alternates: { canonical: "/nature-reserves-and-parks-in-mauritius" },
    },
    topKicker: "Natur · Schutz",
    kicker: "Geschütztes und wildes Mauritius",
    titleMain: "Naturreservate",
    titleAccent: "und Parks",
    intro:
      "Jenseits des Strandes - ein Dutzend Wälder, Schutzinseln, Gärten und Meeresparks bewahren die seltene Tierwelt der Insel.",
    typeLabels: {
      forest: "Wald und Wandern",
      wildlife: "Wildtiere und Schutz",
      marine: "Meer und Lagune",
    },
    places: makeNaturePlaces([
      {
        name: "Black-River-Schluchten",
        tag: "Nationalpark",
        region: "Südwesten",
        description:
          "Einheimischer Wald, Wasserfälle und die besten Aussichtspunkte der Insel.",
        type: "forest",
      },
      {
        name: "Bras d'Eau",
        tag: "Waldpark",
        region: "Nordosten",
        description: "Ruhige Waldwege und sanfte Vogelbeobachtung.",
        type: "forest",
      },
      {
        name: "Île aux Aigrettes",
        tag: "Schutzinsel",
        region: "vor Mahébourg",
        description:
          "Geführte Inseltour - Riesenschildkröten und seltene Vögel.",
        type: "wildlife",
      },
      {
        name: "Ebony Forest",
        tag: "Waldreservat",
        region: "Chamarel",
        description: "Restaurierter Ebenholzwald und endemische Arten.",
        type: "forest",
      },
      {
        name: "La Vanille Nature Park",
        tag: "Wildtierpark",
        region: "Süden",
        description: "Riesenschildkröten, Krokodile und einfache Familienwege.",
        type: "wildlife",
      },
      {
        name: "Vallée de Ferney",
        tag: "Waldtal",
        region: "Südosten",
        description:
          "Wanderungen im Naturwald und Vogelbeobachtung in einem stillen Tal.",
        type: "forest",
      },
      {
        name: "Casela Nature Parks",
        tag: "Abenteuerpark",
        region: "Westen",
        description:
          "Tierbegegnungen, Aktivitäten und Aussichtspunkte für Familien.",
        type: "wildlife",
      },
      {
        name: "Pamplemousses-Garten",
        tag: "Botanischer Garten",
        region: "Norden",
        description: "Riesige Seerosen und historische Palmenalleen.",
        type: "forest",
      },
      {
        name: "Pétrin-Naturreservat",
        tag: "Naturreservat",
        region: "Zentrale Hochlagen",
        description: "Kühler, dichter Naturwald und endemische Pflanzen.",
        type: "forest",
      },
      {
        name: "Blue-Bay-Meerespark",
        tag: "Meerespark",
        region: "Südosten",
        description:
          "Klares Wasser und Korallen - Schnorcheln oder Glasbodenboot.",
        type: "marine",
      },
      {
        name: "Île d'Ambre und Bernache",
        tag: "Mangrovenlagune",
        region: "Nordosten",
        description: "Ruhige Mangroven und Inselchen - Kajak oder Katamaran.",
        type: "marine",
      },
      {
        name: "Le Morne Brabant",
        tag: "UNESCO-Berg",
        region: "Südwesten",
        description: "Ikonischer Gipfel und Lagune - am besten mit Guide.",
        type: "forest",
      },
    ]),
    adviceTitle: "Verantwortungsvoll erkunden",
    advice: [
      {
        icon: ShieldCheck,
        title: "Auf Wegen bleiben",
        text: "Bleib auf markierten Pfaden, um fragile Lebensräume zu schützen.",
      },
      {
        icon: TriangleAlert,
        title: "Wildtiere nicht füttern",
        text: "Füttere niemals Affen - halte Essen versteckt und verschlossen.",
      },
      {
        icon: BookOpenCheck,
        title: "Guide und Buchung",
        text: "Einige Reservate, etwa Aigrettes und Le Morne, brauchen einen Guide.",
      },
    ],
    note: "Verbringe ein oder zwei Tage abseits des Strandes - in Wäldern, Inseln und Gärten überlebt das echte Mauritius.",
  },
  it: {
    metadata: {
      title: "Riserve naturali e parchi a Mauritius",
      description:
        "Riserve naturali e parchi a Mauritius - foreste, isole di conservazione, giardini e parchi marini dove vedere fauna rara ed endemica.",
      alternates: { canonical: "/nature-reserves-and-parks-in-mauritius" },
    },
    topKicker: "Natura · Conservazione",
    kicker: "Mauritius protetta e selvaggia",
    titleMain: "Riserve naturali",
    titleAccent: "e parchi",
    intro:
      "Oltre la spiaggia - dodici foreste, isole di conservazione, giardini e parchi marini proteggono la fauna rara e unica dell'isola.",
    typeLabels: {
      forest: "Foresta e trekking",
      wildlife: "Fauna e conservazione",
      marine: "Mare e laguna",
    },
    places: makeNaturePlaces([
      {
        name: "Gole del Fiume Nero",
        tag: "Parco nazionale",
        region: "Sud-ovest",
        description:
          "Foresta nativa, cascate e i migliori belvedere dell'isola.",
        type: "forest",
      },
      {
        name: "Bras d'Eau",
        tag: "Parco forestale",
        region: "Nord-est",
        description: "Tranquilli sentieri nel bosco e birdwatching rilassato.",
        type: "forest",
      },
      {
        name: "Île aux Aigrettes",
        tag: "Isola di conservazione",
        region: "al largo di Mahébourg",
        description:
          "Tour guidato dell'isola - tartarughe giganti e uccelli rari.",
        type: "wildlife",
      },
      {
        name: "Ebony Forest",
        tag: "Riserva forestale",
        region: "Chamarel",
        description: "Foresta di ebano restaurata e specie endemiche.",
        type: "forest",
      },
      {
        name: "La Vanille Nature Park",
        tag: "Parco faunistico",
        region: "Sud",
        description:
          "Tartarughe giganti, coccodrilli e facili sentieri per famiglie.",
        type: "wildlife",
      },
      {
        name: "Vallée de Ferney",
        tag: "Valle forestale",
        region: "Sud-est",
        description:
          "Trekking nella foresta nativa e birdwatching in una valle calma.",
        type: "forest",
      },
      {
        name: "Casela Nature Parks",
        tag: "Parco avventura",
        region: "Ovest",
        description:
          "Incontri con animali, attività e punti panoramici per famiglie.",
        type: "wildlife",
      },
      {
        name: "Giardino di Pamplemousses",
        tag: "Giardino botanico",
        region: "Nord",
        description: "Ninfee giganti e storici viali di palme.",
        type: "forest",
      },
      {
        name: "Riserva naturale di Pétrin",
        tag: "Riserva naturale",
        region: "Altopiani centrali",
        description: "Foresta nativa fresca e densa con piante endemiche.",
        type: "forest",
      },
      {
        name: "Parco marino di Blue Bay",
        tag: "Parco marino",
        region: "Sud-est",
        description:
          "Acqua limpida e coralli - snorkeling o barca con fondo di vetro.",
        type: "marine",
      },
      {
        name: "Île d'Ambre e Bernache",
        tag: "Laguna di mangrovie",
        region: "Nord-est",
        description: "Mangrovie tranquille e isolotti - kayak o catamarano.",
        type: "marine",
      },
      {
        name: "Le Morne Brabant",
        tag: "Montagna UNESCO",
        region: "Sud-ovest",
        description: "Cima iconica e laguna - meglio con una guida.",
        type: "forest",
      },
    ]),
    adviceTitle: "Esplora responsabilmente",
    advice: [
      {
        icon: ShieldCheck,
        title: "Resta sui sentieri",
        text: "Segui i percorsi segnati per proteggere habitat fragili.",
      },
      {
        icon: TriangleAlert,
        title: "Non nutrire la fauna",
        text: "Non dare mai cibo alle scimmie - tieni il cibo nascosto e chiuso.",
      },
      {
        icon: BookOpenCheck,
        title: "Guida e prenotazione",
        text: "Alcune riserve, come Aigrettes e Le Morne, richiedono una guida.",
      },
    ],
    note: "Passa un giorno o due lontano dalla spiaggia - foreste, isole e giardini sono dove sopravvive la vera Mauritius.",
  },
  es: {
    metadata: {
      title: "Reservas naturales y parques de Mauricio",
      description:
        "Reservas naturales y parques de Mauricio - bosques, islas de conservación, jardines y parques marinos donde ver fauna rara y endémica.",
      alternates: { canonical: "/nature-reserves-and-parks-in-mauritius" },
    },
    topKicker: "Naturaleza · Conservación",
    kicker: "Mauricio protegido y salvaje",
    titleMain: "Reservas naturales",
    titleAccent: "y parques",
    intro:
      "Más allá de la playa - una docena de bosques, islas de conservación, jardines y parques marinos protegen la fauna rara y única de la isla.",
    typeLabels: {
      forest: "Bosque y senderismo",
      wildlife: "Fauna y conservación",
      marine: "Mar y laguna",
    },
    places: makeNaturePlaces([
      {
        name: "Gargantas del Río Negro",
        tag: "Parque nacional",
        region: "Suroeste",
        description:
          "Bosque nativo, cascadas y los mejores miradores de la isla.",
        type: "forest",
      },
      {
        name: "Bras d'Eau",
        tag: "Parque forestal",
        region: "Noreste",
        description:
          "Senderos tranquilos en bosque y observación suave de aves.",
        type: "forest",
      },
      {
        name: "Île aux Aigrettes",
        tag: "Isla de conservación",
        region: "frente a Mahébourg",
        description:
          "Tour guiado por la isla - tortugas gigantes y aves raras.",
        type: "wildlife",
      },
      {
        name: "Ebony Forest",
        tag: "Reserva forestal",
        region: "Chamarel",
        description: "Bosque de ébano restaurado y especies endémicas.",
        type: "forest",
      },
      {
        name: "La Vanille Nature Park",
        tag: "Parque de fauna",
        region: "Sur",
        description:
          "Tortugas gigantes, cocodrilos y senderos familiares fáciles.",
        type: "wildlife",
      },
      {
        name: "Vallée de Ferney",
        tag: "Valle forestal",
        region: "Sureste",
        description: "Caminatas en bosque nativo y aves en un valle tranquilo.",
        type: "forest",
      },
      {
        name: "Casela Nature Parks",
        tag: "Parque de aventura",
        region: "Oeste",
        description:
          "Encuentros con animales, actividades y miradores para familias.",
        type: "wildlife",
      },
      {
        name: "Jardín de Pamplemousses",
        tag: "Jardín botánico",
        region: "Norte",
        description: "Nenúfares gigantes y avenidas históricas de palmeras.",
        type: "forest",
      },
      {
        name: "Reserva natural de Pétrin",
        tag: "Reserva natural",
        region: "Altiplano central",
        description: "Bosque nativo fresco y denso con plantas endémicas.",
        type: "forest",
      },
      {
        name: "Parque marino de Blue Bay",
        tag: "Parque marino",
        region: "Sureste",
        description:
          "Agua clara y coral - snorkel o barco con fondo de cristal.",
        type: "marine",
      },
      {
        name: "Île d'Ambre y Bernache",
        tag: "Laguna de manglares",
        region: "Noreste",
        description: "Manglares tranquilos e islotes - kayak o catamarán.",
        type: "marine",
      },
      {
        name: "Le Morne Brabant",
        tag: "Montaña UNESCO",
        region: "Suroeste",
        description: "Cumbre icónica y laguna - mejor con guía.",
        type: "forest",
      },
    ]),
    adviceTitle: "Explora responsablemente",
    advice: [
      {
        icon: ShieldCheck,
        title: "Permanece en los senderos",
        text: "Usa caminos señalizados para proteger hábitats frágiles.",
      },
      {
        icon: TriangleAlert,
        title: "No alimentes fauna",
        text: "Nunca alimentes a los monos - mantén la comida oculta y cerrada.",
      },
      {
        icon: BookOpenCheck,
        title: "Guía y reserva",
        text: "Algunas reservas, como Aigrettes y Le Morne, necesitan guía.",
      },
    ],
    note: "Pasa uno o dos días lejos de la playa - bosques, islas y jardines muestran el Mauricio más auténtico.",
  },
  ru: {
    metadata: {
      title: "Природные заповедники и парки Маврикия",
      description:
        "Природные заповедники и парки Маврикия - леса, острова охраны природы, сады и морские парки с редкой эндемичной фауной.",
      alternates: { canonical: "/nature-reserves-and-parks-in-mauritius" },
    },
    topKicker: "Природа · Охрана",
    kicker: "Охраняемый и дикий Маврикий",
    titleMain: "Природные заповедники",
    titleAccent: "и парки",
    intro:
      "За пределами пляжа - леса, острова охраны природы, сады и морские парки защищают редкую фауну острова, которую больше нигде не встретить.",
    typeLabels: {
      forest: "Лес и походы",
      wildlife: "Дикая природа и охрана",
      marine: "Море и лагуна",
    },
    places: makeNaturePlaces([
      {
        name: "Ущелья Блэк-Ривер",
        tag: "Национальный парк",
        region: "Юго-запад",
        description: "Родной лес, водопады и лучшие смотровые точки острова.",
        type: "forest",
      },
      {
        name: "Бра-д'О",
        tag: "Лесной парк",
        region: "Северо-восток",
        description: "Тихие лесные тропы и спокойное наблюдение за птицами.",
        type: "forest",
      },
      {
        name: "Иль-о-Эгрет",
        tag: "Остров-заповедник",
        region: "у Маэбурга",
        description:
          "Экскурсия по острову с гидом - гигантские черепахи и редкие птицы.",
        type: "wildlife",
      },
      {
        name: "Ebony Forest",
        tag: "Лесной заповедник",
        region: "Шамарель",
        description: "Восстановленный эбеновый лес и эндемичные виды.",
        type: "forest",
      },
      {
        name: "La Vanille Nature Park",
        tag: "Парк дикой природы",
        region: "Юг",
        description: "Гигантские черепахи, крокодилы и легкие семейные тропы.",
        type: "wildlife",
      },
      {
        name: "Валле-де-Ферне",
        tag: "Лесная долина",
        region: "Юго-восток",
        description: "Походы в родном лесу и птицы в тихой долине.",
        type: "forest",
      },
      {
        name: "Casela Nature Parks",
        tag: "Парк приключений",
        region: "Запад",
        description: "Встречи с животными, активности и смотровые для семей.",
        type: "wildlife",
      },
      {
        name: "Сад Памплемус",
        tag: "Ботанический сад",
        region: "Север",
        description: "Гигантские водяные лилии и исторические пальмовые аллеи.",
        type: "forest",
      },
      {
        name: "Природный заповедник Петрен",
        tag: "Природный заповедник",
        region: "Центральное нагорье",
        description: "Прохладный густой родной лес и эндемичные растения.",
        type: "forest",
      },
      {
        name: "Морской парк Блю-Бей",
        tag: "Морской парк",
        region: "Юго-восток",
        description:
          "Чистая вода и кораллы - снорклинг или лодка со стеклянным дном.",
        type: "marine",
      },
      {
        name: "Иль-д'Амбр и Бернаш",
        tag: "Мангровая лагуна",
        region: "Северо-восток",
        description: "Спокойные мангры и островки - каяк или катамаран.",
        type: "marine",
      },
      {
        name: "Ле-Морн-Брабант",
        tag: "Гора ЮНЕСКО",
        region: "Юго-запад",
        description: "Знаменитая вершина и лагуна - лучше идти с гидом.",
        type: "forest",
      },
    ]),
    adviceTitle: "Исследуйте ответственно",
    advice: [
      {
        icon: ShieldCheck,
        title: "Оставайтесь на тропах",
        text: "Держитесь размеченных путей, чтобы защитить хрупкие места обитания.",
      },
      {
        icon: TriangleAlert,
        title: "Не кормите животных",
        text: "Никогда не кормите обезьян - держите еду спрятанной и закрытой.",
      },
      {
        icon: BookOpenCheck,
        title: "Гид и бронирование",
        text: "Некоторые резервы, например Aigrettes и Le Morne, требуют гида.",
      },
    ],
    note: "Проведите день или два вдали от пляжа - леса, острова и сады показывают настоящий Маврикий.",
  },
};

function getCopy(locale: string): NatureCopy {
  return NATURE_COPY[normalizeLocale(locale) as Locale];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return getCopy(locale).metadata;
}

export default async function NatureReservesAndParksInMauritiusPage({
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
          <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] font-semibold uppercase tracking-wide text-[#ec5f25]">
            <p>{copy.topKicker}</p>
          </div>
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
            {(Object.keys(copy.typeLabels) as NatureType[]).map((type) => (
              <div key={type} className="flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: natureTypeColors[type] }}
                />
                <span>{copy.typeLabels[type]}</span>
              </div>
            ))}
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {copy.places.map((place, index) => {
              const PlaceIcon = place.icon;
              const style = natureTypeStyles[place.type];
              const href = naturePlaceLinks[index];
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
                  className={`${cardClassName} transition-colors hover:border-[#2f8e48] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f8e48]`}
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
      <CarRentalAdBannerInfo />
      <Footer />
    </main>
  );
}
