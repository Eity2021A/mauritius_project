import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PopularRoadTrips from "@/components/PopularRoadTrips";
import { Link } from "@/i18n/navigation";
import { normalizeLocale } from "@/i18n/routing";
import PocketAdBanner from "@/components/PocketAdBanner";
import CarRentalAdBanner from "@/components/CarRentalAdBanner";
import { localizeStaticPage } from "@/lib/static-page-localizer";

export const revalidate = 3600;

type CruiseGroup = {
  coast: string;
  note: string;
  color: string;
  cruises: Array<[string, string]>;
};

type CruisePageCopy = {
  metadata: Metadata;
  kicker: string;
  titleMain: string;
  titleAccent: string;
  intro: string;
  legend: string[];
  groups: CruiseGroup[];
  sharedTitle: string;
  sharedText: string;
  mapAlt: string;
  mapCaption: string;
  cards: Array<{ title: string; text: string }>;
  goodTitle: string;
  tips: Array<[string, string]>;
};

const legendColors = ["#2389c9", "#2f8e48", "#f16522", "#d89b24"] as const;

const cruiseLinks: readonly (readonly (string | undefined)[])[] = [
  [
    "/top-activities-mauritius/catamaran-cruise-on-shared-basis-to-ilot-gabriel-northern-islands",
    "/top-activities-mauritius/catamaran-cruise-to-the-northern-islands-from-bain-boeuf-luxury-full-day-shared",
    "/top-activities-mauritius/catamaran-cruise-to-ilot-bernache",
  ],
  [
    "/top-activities-mauritius/catamaran-cruises-ile-aux-cerfs-shared",
    "/top-activities-mauritius/catamaran-cruises-ile-aux-cerfs-shared",
    "/top-activities-mauritius/catamaran-cruises-ile-aux-cerfs-shared",
  ],
  [
    "/top-activities-mauritius/catamaran-cruise-to-ilot-benitiers-shared",
    "/top-activities-mauritius/catamaran-private-sunset-dinner-cruise-from-grand-baie",
  ],
  ["/top-activities-mauritius/catamaran-ile-aux-cerfs", undefined],
] as const;

const CRUISE_COPY: Record<string, CruisePageCopy> = {
  en: {
    metadata: {
      title: "Best Catamaran Cruises in Mauritius",
      description:
        "The best catamaran cruises in Mauritius - full-day sailing, snorkelling and sunset trips to Ile aux Cerfs, Ile aux Benitiers and the northern islands.",
      alternates: { canonical: "/best-catamaran-cruises-in-mauritius" },
    },
    kicker: "Sail · Snorkel · Island-Hop",
    titleMain: "The Best Catamaran",
    titleAccent: "Cruises",
    intro:
      "Turquoise lagoons, island stops and a BBQ on deck - the island's finest days out on the water, grouped by coast.",
    legend: ["North", "East", "West", "South"],
    groups: [
      {
        coast: "North Coast",
        note: "dramatic islands & Grand Baie",
        color: "#2389c9",
        cruises: [
          ["Northern Islands", "Coin de Mire, Flat & Gabriel trio"],
          ["Bain Boeuf", "luxury shared island cruise"],
          ["Ilot Bernache", "quiet mangrove sail - Grand Gaube"],
        ],
      },
      {
        coast: "East Coast",
        note: "the classic lagoon day",
        color: "#2f8e48",
        cruises: [
          ["Ile aux Cerfs", "the classic turquoise-lagoon cruise"],
          ["GRSE Waterfall", "a boat stop by the falls"],
          ["Trou d'Eau Douce", "the main east coast departure"],
        ],
      },
      {
        coast: "West Coast",
        note: "dolphins & Le Morne sunsets",
        color: "#f16522",
        cruises: [
          ["Ilot Benitiers", "Le Morne views & crystal lagoon"],
          ["Black River", "dolphin swims & sunset sails"],
        ],
      },
      {
        coast: "South Coast",
        note: "power cat blues",
        color: "#d89b24",
        cruises: [
          ["South-East Lagoon", "power cat from Pointe d'Esny"],
          ["Blue Bay", "a top snorkelling stop"],
        ],
      },
    ],
    sharedTitle: "Shared or private?",
    sharedText:
      "Shared cruises (7-35 guests) are sociable and better value; private charters give families and couples the run of the boat - and a sunset or dinner sail is the pick for a special occasion.",
    mapAlt: "Map of Mauritius showing the best catamaran cruise coasts",
    mapCaption: "Where to set sail - the four coasts",
    cards: [
      {
        title: "What's on board",
        text: "Snorkelling, island stops, a BBQ lunch & drinks.",
      },
      {
        title: "Pick your type",
        text: "Shared for value · private for space · sunset for wow.",
      },
      {
        title: "Best light",
        text: "Mornings are calmest; the west wins for sunsets.",
      },
    ],
    goodTitle: "Good to know",
    tips: [
      ["Book ahead", "Peak season catamarans fill up fast."],
      ["Pack smart", "Sun cream, a towel, a hat & a dry bag."],
      ["Sail local", "Cruise near your base to skip long drives."],
      ["Calm mornings", "Clearest water & smoothest seas before noon."],
    ],
  },
  fr: {
    metadata: {
      title: "Meilleures croisières en catamaran à Maurice",
      description:
        "Les meilleures croisières en catamaran à Maurice : voile à la journée, snorkeling et sorties coucher de soleil vers l'île aux Cerfs, l'île aux Bénitiers et les îles du nord.",
      alternates: { canonical: "/best-catamaran-cruises-in-mauritius" },
    },
    kicker: "Voile · Snorkeling · Îles",
    titleMain: "Les meilleures croisières en catamaran",
    titleAccent: "à Maurice",
    intro:
      "Lagons turquoise, arrêts sur les îles et BBQ à bord : les plus belles journées sur l'eau, classées par côte.",
    legend: ["Nord", "Est", "Ouest", "Sud"],
    groups: [
      {
        coast: "Côte nord",
        note: "îles spectaculaires et Grand Baie",
        color: "#2389c9",
        cruises: [
          ["Îles du Nord", "trio Coin de Mire, Flat et Gabriel"],
          ["Bain Boeuf", "croisière partagée de luxe vers les îles"],
          [
            "Îlot Bernache",
            "navigation tranquille dans les mangroves - Grand Gaube",
          ],
        ],
      },
      {
        coast: "Côte est",
        note: "la journée lagon classique",
        color: "#2f8e48",
        cruises: [
          ["Île aux Cerfs", "la croisière classique dans le lagon turquoise"],
          ["Cascade GRSE", "arrêt bateau près de la cascade"],
          ["Trou d'Eau Douce", "le principal départ de la côte est"],
        ],
      },
      {
        coast: "Côte ouest",
        note: "dauphins et couchers de soleil au Morne",
        color: "#f16522",
        cruises: [
          ["Îlot Bénitiers", "vues sur Le Morne et lagon cristallin"],
          [
            "Rivière Noire",
            "nage avec les dauphins et voiles au coucher du soleil",
          ],
        ],
      },
      {
        coast: "Côte sud",
        note: "bleus intenses en power cat",
        color: "#d89b24",
        cruises: [
          ["Lagon du sud-est", "power cat depuis Pointe d'Esny"],
          ["Baie Bleue", "excellent arrêt snorkeling"],
        ],
      },
    ],
    sharedTitle: "Partagé ou privé ?",
    sharedText:
      "Les croisières partagées (7 à 35 personnes) sont conviviales et plus économiques ; les charters privés donnent plus d'espace aux familles et couples. Une sortie coucher de soleil ou dîner est idéale pour une occasion spéciale.",
    mapAlt:
      "Carte de Maurice avec les meilleures côtes pour les croisières en catamaran",
    mapCaption: "Où prendre la mer : les quatre côtes",
    cards: [
      {
        title: "À bord",
        text: "Snorkeling, arrêts sur les îles, déjeuner BBQ et boissons.",
      },
      {
        title: "Choisir votre formule",
        text: "Partagé pour le prix · privé pour l'espace · coucher de soleil pour l'effet wow.",
      },
      {
        title: "Meilleure lumière",
        text: "Les matins sont les plus calmes ; l'ouest gagne pour les couchers de soleil.",
      },
    ],
    goodTitle: "Bon à savoir",
    tips: [
      ["Réserver tôt", "En haute saison, les catamarans se remplissent vite."],
      [
        "Bien préparer son sac",
        "Crème solaire, serviette, chapeau et sac étanche.",
      ],
      [
        "Naviguer près de votre base",
        "Choisissez une croisière proche pour éviter les longs trajets.",
      ],
      [
        "Matins calmes",
        "L'eau la plus claire et la mer la plus douce sont avant midi.",
      ],
    ],
  },
  de: {
    metadata: {
      title: "Beste Katamaranfahrten auf Mauritius",
      description:
        "Die besten Katamaranfahrten auf Mauritius: ganztägiges Segeln, Schnorcheln und Sonnenuntergangstouren zur Ile aux Cerfs, Ile aux Benitiers und den nördlichen Inseln.",
      alternates: { canonical: "/best-catamaran-cruises-in-mauritius" },
    },
    kicker: "Segeln · Schnorcheln · Inselhüpfen",
    titleMain: "Die besten Katamaranfahrten",
    titleAccent: "auf Mauritius",
    intro:
      "Türkisfarbene Lagunen, Inselstopps und BBQ an Deck: die schönsten Tage auf dem Wasser, nach Küsten geordnet.",
    legend: ["Norden", "Osten", "Westen", "Süden"],
    groups: [
      {
        coast: "Nordküste",
        note: "dramatische Inseln und Grand Baie",
        color: "#2389c9",
        cruises: [
          ["Nördliche Inseln", "Coin de Mire, Flat Island und Gabriel im Trio"],
          ["Bain Boeuf", "luxuriöse geteilte Inselkreuzfahrt"],
          ["Îlot Bernache", "ruhige Mangrovenfahrt - Grand Gaube"],
        ],
      },
      {
        coast: "Ostküste",
        note: "der klassische Lagunentag",
        color: "#2f8e48",
        cruises: [
          ["Île aux Cerfs", "die klassische türkisfarbene Lagunenfahrt"],
          ["GRSE-Wasserfall", "Bootsstopp bei den Fällen"],
          ["Trou d'Eau Douce", "wichtigster Startpunkt an der Ostküste"],
        ],
      },
      {
        coast: "Westküste",
        note: "Delfine und Sonnenuntergänge am Le Morne",
        color: "#f16522",
        cruises: [
          ["Îlot Bénitiers", "Le-Morne-Blicke und kristallklare Lagune"],
          ["Schwarzer Fluss", "Delfinschwimmen und Sonnenuntergangsfahrten"],
        ],
      },
      {
        coast: "Südküste",
        note: "Power-Cat-Blau",
        color: "#d89b24",
        cruises: [
          ["Südost-Lagune", "Power Cat ab Pointe d'Esny"],
          ["Blaue Bucht", "Top-Stopp zum Schnorcheln"],
        ],
      },
    ],
    sharedTitle: "Geteilt oder privat?",
    sharedText:
      "Geteilte Fahrten (7 bis 35 Gäste) sind gesellig und preiswerter; private Charter geben Familien und Paaren das Boot für sich. Sonnenuntergangs- oder Dinnerfahrten sind ideal für besondere Anlässe.",
    mapAlt: "Karte von Mauritius mit den besten Küsten für Katamaranfahrten",
    mapCaption: "Wo man in See sticht: die vier Küsten",
    cards: [
      {
        title: "An Bord",
        text: "Schnorcheln, Inselstopps, BBQ-Mittagessen und Getränke.",
      },
      {
        title: "Tourtyp wählen",
        text: "Geteilt für den Preis · privat für Platz · Sonnenuntergang für Wow.",
      },
      {
        title: "Bestes Licht",
        text: "Morgens ist es am ruhigsten; der Westen gewinnt bei Sonnenuntergängen.",
      },
    ],
    goodTitle: "Gut zu wissen",
    tips: [
      ["Im Voraus buchen", "In der Hochsaison sind Katamarane schnell voll."],
      ["Clever packen", "Sonnencreme, Handtuch, Hut und wasserdichter Beutel."],
      [
        "Lokal segeln",
        "Wählen Sie eine Fahrt nahe Ihrer Basis, um lange Strecken zu vermeiden.",
      ],
      ["Ruhige Morgen", "Klarstes Wasser und ruhigste See gibt es vor Mittag."],
    ],
  },
  it: {
    metadata: {
      title: "Le migliori crociere in catamarano a Mauritius",
      description:
        "Le migliori crociere in catamarano a Mauritius: vela di un giorno, snorkeling e tramonti verso Ile aux Cerfs, Ile aux Benitiers e le isole del nord.",
      alternates: { canonical: "/best-catamaran-cruises-in-mauritius" },
    },
    kicker: "Vela · Snorkeling · Isole",
    titleMain: "Le migliori crociere in catamarano",
    titleAccent: "a Mauritius",
    intro:
      "Lagune turchesi, soste sulle isole e BBQ a bordo: le giornate più belle sull'acqua, raggruppate per costa.",
    legend: ["Nord", "Est", "Ovest", "Sud"],
    groups: [
      {
        coast: "Costa nord",
        note: "isole scenografiche e Grand Baie",
        color: "#2389c9",
        cruises: [
          ["Isole del Nord", "trio Coin de Mire, Flat e Gabriel"],
          ["Bain Boeuf", "crociera condivisa di lusso verso le isole"],
          ["Îlot Bernache", "vela tranquilla tra mangrovie - Grand Gaube"],
        ],
      },
      {
        coast: "Costa est",
        note: "la classica giornata in laguna",
        color: "#2f8e48",
        cruises: [
          ["Île aux Cerfs", "la classica crociera nella laguna turchese"],
          ["Cascata GRSE", "sosta in barca presso la cascata"],
          ["Trou d'Eau Douce", "la principale partenza della costa est"],
        ],
      },
      {
        coast: "Costa ovest",
        note: "delfini e tramonti a Le Morne",
        color: "#f16522",
        cruises: [
          ["Îlot Bénitiers", "viste su Le Morne e laguna cristallina"],
          ["Fiume Nero", "nuotate con i delfini e veleggiate al tramonto"],
        ],
      },
      {
        coast: "Costa sud",
        note: "blu intensi in power cat",
        color: "#d89b24",
        cruises: [
          ["Laguna sud-est", "power cat da Pointe d'Esny"],
          ["Baia Blu", "ottima sosta per snorkeling"],
        ],
      },
    ],
    sharedTitle: "Condivisa o privata?",
    sharedText:
      "Le crociere condivise (7-35 ospiti) sono sociali e convenienti; i charter privati danno spazio a famiglie e coppie. Una vela al tramonto o con cena è perfetta per un'occasione speciale.",
    mapAlt:
      "Mappa di Mauritius con le migliori coste per crociere in catamarano",
    mapCaption: "Dove salpare: le quattro coste",
    cards: [
      {
        title: "A bordo",
        text: "Snorkeling, soste sulle isole, pranzo BBQ e bevande.",
      },
      {
        title: "Scegli il tipo",
        text: "Condivisa per il prezzo · privata per lo spazio · tramonto per stupire.",
      },
      {
        title: "Luce migliore",
        text: "Le mattine sono più calme; l'ovest vince per i tramonti.",
      },
    ],
    goodTitle: "Da sapere",
    tips: [
      [
        "Prenota in anticipo",
        "In alta stagione i catamarani si riempiono presto.",
      ],
      [
        "Prepara bene la borsa",
        "Crema solare, asciugamano, cappello e dry bag.",
      ],
      [
        "Naviga vicino",
        "Scegli una crociera vicino alla tua base per evitare lunghi tragitti.",
      ],
      [
        "Mattine calme",
        "Acqua più limpida e mare più dolce prima di mezzogiorno.",
      ],
    ],
  },
  es: {
    metadata: {
      title: "Mejores cruceros en catamarán en Mauricio",
      description:
        "Los mejores cruceros en catamarán en Mauricio: navegación de día completo, snorkel y salidas al atardecer hacia Ile aux Cerfs, Ile aux Benitiers y las islas del norte.",
      alternates: { canonical: "/best-catamaran-cruises-in-mauritius" },
    },
    kicker: "Vela · Snorkel · Islas",
    titleMain: "Los mejores cruceros en catamarán",
    titleAccent: "en Mauricio",
    intro:
      "Lagunas turquesas, paradas en islas y BBQ a bordo: los mejores días en el agua, agrupados por costa.",
    legend: ["Norte", "Este", "Oeste", "Sur"],
    groups: [
      {
        coast: "Costa norte",
        note: "islas dramáticas y Grand Baie",
        color: "#2389c9",
        cruises: [
          ["Islas del Norte", "trío Coin de Mire, Flat y Gabriel"],
          ["Bain Boeuf", "crucero compartido de lujo por islas"],
          [
            "Îlot Bernache",
            "navegación tranquila entre manglares - Grand Gaube",
          ],
        ],
      },
      {
        coast: "Costa este",
        note: "el día clásico de laguna",
        color: "#2f8e48",
        cruises: [
          ["Île aux Cerfs", "el crucero clásico por laguna turquesa"],
          ["Cascada GRSE", "parada en barco junto a la cascada"],
          ["Trou d'Eau Douce", "la principal salida de la costa este"],
        ],
      },
      {
        coast: "Costa oeste",
        note: "delfines y atardeceres de Le Morne",
        color: "#f16522",
        cruises: [
          ["Îlot Bénitiers", "vistas de Le Morne y laguna cristalina"],
          ["Río Negro", "nado con delfines y velas al atardecer"],
        ],
      },
      {
        coast: "Costa sur",
        note: "azules intensos en power cat",
        color: "#d89b24",
        cruises: [
          ["Laguna sudeste", "power cat desde Pointe d'Esny"],
          ["Bahía Azul", "gran parada de snorkel"],
        ],
      },
    ],
    sharedTitle: "¿Compartido o privado?",
    sharedText:
      "Los cruceros compartidos (7-35 personas) son sociables y mejor valor; los charters privados dan espacio a familias y parejas. Una salida al atardecer o con cena es ideal para una ocasión especial.",
    mapAlt:
      "Mapa de Mauricio con las mejores costas para cruceros en catamarán",
    mapCaption: "Dónde zarpar: las cuatro costas",
    cards: [
      {
        title: "A bordo",
        text: "Snorkel, paradas en islas, almuerzo BBQ y bebidas.",
      },
      {
        title: "Elige tu tipo",
        text: "Compartido por precio · privado por espacio · atardecer para impactar.",
      },
      {
        title: "Mejor luz",
        text: "Las mañanas son más tranquilas; el oeste gana para atardeceres.",
      },
    ],
    goodTitle: "Conviene saber",
    tips: [
      ["Reserva antes", "En temporada alta los catamaranes se llenan rápido."],
      ["Empaca bien", "Protector solar, toalla, sombrero y bolsa seca."],
      [
        "Navega local",
        "Elige una salida cerca de tu base para evitar trayectos largos.",
      ],
      [
        "Mañanas tranquilas",
        "Agua más clara y mar más suave antes del mediodía.",
      ],
    ],
  },
  ru: {
    metadata: {
      title: "Лучшие круизы на катамаране на Маврикии",
      description:
        "Лучшие круизы на катамаране на Маврикии: дневное плавание, снорклинг и закатные маршруты к Ile aux Cerfs, Ile aux Benitiers и северным островам.",
      alternates: { canonical: "/best-catamaran-cruises-in-mauritius" },
    },
    kicker: "Парус · Снорклинг · Острова",
    titleMain: "Лучшие круизы на катамаране",
    titleAccent: "на Маврикии",
    intro:
      "Бирюзовые лагуны, остановки на островах и BBQ на палубе: лучшие водные дни острова, сгруппированные по побережьям.",
    legend: ["Север", "Восток", "Запад", "Юг"],
    groups: [
      {
        coast: "Северное побережье",
        note: "выразительные острова и Grand Baie",
        color: "#2389c9",
        cruises: [
          ["Северные острова", "трио Coin de Mire, Flat и Gabriel"],
          ["Bain Boeuf", "роскошный общий островной круиз"],
          ["Îlot Bernache", "спокойное плавание среди мангров - Grand Gaube"],
        ],
      },
      {
        coast: "Восточное побережье",
        note: "классический день в лагуне",
        color: "#2f8e48",
        cruises: [
          ["Île aux Cerfs", "классический круиз по бирюзовой лагуне"],
          ["Водопад GRSE", "остановка на лодке у водопада"],
          [
            "Trou d'Eau Douce",
            "главная точка отправления восточного побережья",
          ],
        ],
      },
      {
        coast: "Западное побережье",
        note: "дельфины и закаты Le Morne",
        color: "#f16522",
        cruises: [
          ["Îlot Bénitiers", "виды на Le Morne и кристальная лагуна"],
          ["Блэк-Ривер", "плавание с дельфинами и закатные маршруты"],
        ],
      },
      {
        coast: "Южное побережье",
        note: "яркая синева power cat",
        color: "#d89b24",
        cruises: [
          ["Юго-восточная лагуна", "power cat из Pointe d'Esny"],
          ["Блю-Бей", "отличная остановка для снорклинга"],
        ],
      },
    ],
    sharedTitle: "Общий или частный?",
    sharedText:
      "Общие круизы (7-35 гостей) общительные и выгодные; частные чартеры дают семьям и парам больше пространства. Закатный или ужин-круиз лучше всего подходит для особого случая.",
    mapAlt: "Карта Маврикия с лучшими побережьями для круизов на катамаране",
    mapCaption: "Где выйти в море: четыре побережья",
    cards: [
      {
        title: "Что на борту",
        text: "Снорклинг, остановки на островах, BBQ-обед и напитки.",
      },
      {
        title: "Выберите формат",
        text: "Общий ради цены · частный ради пространства · закатный ради эмоций.",
      },
      {
        title: "Лучший свет",
        text: "Утром спокойнее всего; запад лучше для закатов.",
      },
    ],
    goodTitle: "Полезно знать",
    tips: [
      ["Бронируйте заранее", "В высокий сезон катамараны быстро заполняются."],
      [
        "Соберите вещи грамотно",
        "Солнцезащитный крем, полотенце, шляпа и сухой мешок.",
      ],
      [
        "Плывите рядом",
        "Выбирайте круиз возле вашей базы, чтобы избежать долгих переездов.",
      ],
      [
        "Спокойное утро",
        "Самая чистая вода и самая ровная мореходность до полудня.",
      ],
    ],
  },
};

function getCruiseCopy(locale: string) {
  return CRUISE_COPY[normalizeLocale(locale)] ?? CRUISE_COPY.en;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const activeLocale = normalizeLocale(locale);
  return getCruiseCopy(activeLocale).metadata;
}

export default async function BestCatamaranCruisesInMauritiusPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const activeLocale = normalizeLocale(locale);
  const copy = getCruiseCopy(activeLocale);

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

        <section className="mt-8 grid gap-8 lg:grid-cols-[1fr_.78fr] lg:items-start">
          <div>
            <div className="grid max-w-xl grid-cols-2 gap-3 text-xs text-[#44525a] sm:grid-cols-4">
              {copy.legend.map((label, index) => (
                <div key={label} className="flex items-center gap-2">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: legendColors[index] }}
                  />
                  <span>{label}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 space-y-5">
              {copy.groups.map((group, groupIndex) => (
                <section key={group.coast}>
                  <div className="flex flex-wrap items-baseline gap-2 border-b border-[#ded6cf] pb-1.5">
                    <h2
                      className="font-serif text-lg font-bold uppercase leading-none"
                      style={{ color: group.color }}
                    >
                      {group.coast}
                    </h2>
                    <p className="font-serif text-xs italic text-[#8a9398]">
                      {group.note}
                    </p>
                  </div>
                  <div className="mt-2.5 space-y-1.5">
                    {group.cruises.map(([name, text], cruiseIndex) => {
                      const href = cruiseLinks[groupIndex]?.[cruiseIndex];

                      return (
                        <p
                          key={name}
                          className="flex gap-2 text-xs leading-relaxed text-[#61707a] sm:text-sm"
                        >
                          <span
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                            style={{ backgroundColor: group.color }}
                          />
                          <span>
                            <strong className="font-serif text-[#152738]">
                              {href ? (
                                <Link
                                  href={href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="transition hover:text-[#f16522]"
                                >
                                  {name}
                                </Link>
                              ) : (
                                name
                              )}
                            </strong>
                            <span> - {text}</span>
                          </span>
                        </p>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>

            <section className="mt-7 rounded-md bg-[#f5f2ef] px-5 py-5 sm:px-6">
              <h2 className="font-serif text-lg font-bold text-[#f16522]">
                {copy.sharedTitle}
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-[#61707a] sm:text-sm">
                {copy.sharedText}
              </p>
            </section>
          </div>

          <aside className="grid gap-4">
            <figure className="mx-auto w-full max-w-[307px]">
              <Image
                src="/images/quick-trips/best_catamaran_cruises.png"
                alt={copy.mapAlt}
                width={1200}
                height={1000}
                priority
                className="h-auto w-full"
              />
              <figcaption className="mt-2 text-center font-serif text-xs italic text-[#8a8f91]">
                {copy.mapCaption}
              </figcaption>
            </figure>
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {copy.cards.map((card) => (
                <section
                  key={card.title}
                  className="rounded-md bg-[#f5f2ef] px-5 py-5"
                >
                  <h2 className="font-serif text-lg font-bold text-[#f16522]">
                    {card.title}
                  </h2>
                  <p className="mt-2 text-xs leading-relaxed text-[#61707a] sm:text-sm">
                    {card.text}
                  </p>
                </section>
              ))}
            </div>
          </aside>
        </section>
        <CarRentalAdBanner />
        <section className="mt-8 rounded-md bg-[#f5f2ef] px-5 py-5 sm:px-7">
          <h2 className="font-serif text-xl font-bold text-[#f16522]">
            {copy.goodTitle}
          </h2>
          <div className="mt-3 grid gap-x-8 gap-y-2 md:grid-cols-2">
            {copy.tips.map(([title, text]) => (
              <p
                key={title}
                className="flex gap-2 text-xs leading-relaxed text-[#61707a] sm:text-sm"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f16522]" />
                <span>
                  <strong className="font-serif text-[#152738]">{title}</strong>
                  <span> - {text}</span>
                </span>
              </p>
            ))}
          </div>
        </section>
      </article>

      <PopularRoadTrips locale={activeLocale} />
      <PocketAdBanner />
      <Footer />
    </main>
  ), activeLocale);
}
