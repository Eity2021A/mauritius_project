import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PopularRoadTrips from "@/components/PopularRoadTrips";
import Image from "next/image";
import { normalizeLocale } from "@/i18n/routing";
import { localizeStaticPage } from "@/lib/static-page-localizer";

export const revalidate = 3600;

type BeachCoast = {
  coast: string;
  note: string;
  color: string;
  beaches: Array<[string, string]>;
};

type BeachPageCopy = {
  metadata: Metadata;
  kicker: string;
  titleMain: string;
  titleAccent: string;
  intro: string;
  legend: string[];
  coasts: BeachCoast[];
  mapAlt: string;
  mapCaption: string;
  cards: Array<{ title: string; text: string }>;
  goodTitle: string;
  goodItems: Array<[string, string]>;
};

const enCoasts: BeachCoast[] = [
  {
    coast: "North Coast",
    note: "calm lagoons & easy swims",
    color: "#2389c9",
    beaches: [
      ["Trou aux Biches", "top snorkelling & families"],
      ["Mont Choisy", "the island's longest beach"],
      ["Pereybere", "lively, local & central"],
      ["Cap Malheureux", "the red-roof photo icon"],
    ],
  },
  {
    coast: "East Coast",
    note: "luxury & lagoon perfection",
    color: "#2f8e48",
    beaches: [
      ["Belle Mare", "long, peaceful sunrise"],
      ["Blue Bay", "the best snorkelling"],
      ["Ile aux Cerfs", "lagoon paradise, by boat"],
      ["Pointe d'Esny", "clear, quiet lagoon"],
    ],
  },
  {
    coast: "West Coast",
    note: "sunsets, dolphins & drama",
    color: "#f16522",
    beaches: [
      ["Flic en Flac", "the most versatile beach"],
      ["Le Morne", "iconic UNESCO kite lagoon"],
      ["Tamarin", "surf & dolphin bay"],
      ["Albion", "a quiet west-coast escape"],
    ],
  },
  {
    coast: "South Coast",
    note: "wild & untouched",
    color: "#d89b24",
    beaches: [
      ["Gris Gris", "dramatic cliffs (views only)"],
      ["La Cambuse", "raw & near the airport"],
      ["Riambel", "quiet local beach walks"],
      ["St Felix", "raw southern beauty"],
    ],
  },
];

const BEACH_PAGE_COPY: Record<string, BeachPageCopy> = {
  en: {
    metadata: {
      title: "Best Beaches of Mauritius",
      description:
        "The best beaches in Mauritius, coast by coast - from calm northern lagoons to wild southern shores. Where to swim, snorkel and catch the perfect sunset.",
      alternates: { canonical: "/best-beaches-of-mauritius" },
    },
    kicker: "Lagoons · Sands · Coasts",
    titleMain: "The Best Beaches",
    titleAccent: "of Mauritius",
    intro:
      "Reef-sheltered lagoons, dramatic wild coasts and everything between - the island's finest sands, grouped by coast.",
    legend: ["North", "East", "West", "South"],
    coasts: enCoasts,
    mapAlt: "Map of Mauritius showing the best beach coasts",
    mapCaption: "The four coasts at a glance",
    cards: [
      { title: "Best for snorkeling", text: "Blue Bay · Trou aux Biches · Pointe d'Esny" },
      { title: "Best for sunsets", text: "Flic en Flac · Le Morne · Tamarin" },
      { title: "Nearest the airport", text: "Blue Bay · La Cambuse" },
    ],
    goodTitle: "Good to know",
    goodItems: [
      ["Public access", "Most beaches are public to the high water mark."],
      ["Calmest swims", "North & east lagoons stay sheltered year-round."],
      ["The wild south", "For views, not swimming - mind the waves."],
      ["Clearest water", "Snorkel on calm mornings for the best visibility."],
    ],
  },
  fr: {
    metadata: {
      title: "Meilleures plages de Maurice",
      description:
        "Les meilleures plages de Maurice, côte par côte : des lagons calmes du nord aux rivages sauvages du sud. Où nager, faire du snorkeling et admirer le coucher de soleil parfait.",
      alternates: { canonical: "/best-beaches-of-mauritius" },
    },
    kicker: "Lagons · Sable · Côtes",
    titleMain: "Les meilleures plages",
    titleAccent: "de Maurice",
    intro:
      "Lagons protégés par les récifs, côtes sauvages spectaculaires et tout ce qu'il y a entre les deux : les plus belles plages de l'île, classées par côte.",
    legend: ["Nord", "Est", "Ouest", "Sud"],
    coasts: [
      {
        coast: "Côte nord",
        note: "lagons calmes et baignades faciles",
        color: "#2389c9",
        beaches: [
          ["Trou aux Biches", "idéal pour le snorkeling et les familles"],
          ["Mont Choisy", "la plus longue plage de l'île"],
          ["Péreybère", "vivante, locale et centrale"],
          ["Cap Malheureux", "l'icône photo au toit rouge"],
        ],
      },
      {
        coast: "Côte est",
        note: "luxe et lagons parfaits",
        color: "#2f8e48",
        beaches: [
          ["Belle Mare", "longue plage paisible au lever du soleil"],
          ["Baie Bleue", "le meilleur snorkeling"],
          ["Île aux Cerfs", "paradis lagon, accessible en bateau"],
          ["Pointe d'Esny", "lagon clair et calme"],
        ],
      },
      {
        coast: "Côte ouest",
        note: "couchers de soleil, dauphins et paysages forts",
        color: "#f16522",
        beaches: [
          ["Flic en Flac", "la plage la plus polyvalente"],
          ["Le Morne", "lagon de kite UNESCO emblématique"],
          ["Tamarin", "baie de surf et de dauphins"],
          ["Albion", "échappée tranquille de la côte ouest"],
        ],
      },
      {
        coast: "Côte sud",
        note: "sauvage et préservée",
        color: "#d89b24",
        beaches: [
          ["Gris Gris", "falaises spectaculaires, vues seulement"],
          ["La Cambuse", "brute et proche de l'aéroport"],
          ["Riambel", "promenades sur une plage locale calme"],
          ["Saint-Félix", "beauté brute du sud"],
        ],
      },
    ],
    mapAlt: "Carte de Maurice avec les meilleures côtes de plage",
    mapCaption: "Les quatre côtes en un coup d'œil",
    cards: [
      { title: "Idéal pour le snorkeling", text: "Baie Bleue · Trou aux Biches · Pointe d'Esny" },
      { title: "Idéal pour les couchers de soleil", text: "Flic en Flac · Le Morne · Tamarin" },
      { title: "Le plus proche de l'aéroport", text: "Baie Bleue · La Cambuse" },
    ],
    goodTitle: "Bon à savoir",
    goodItems: [
      ["Accès public", "La plupart des plages sont publiques jusqu'à la laisse de haute mer."],
      ["Baignades les plus calmes", "Les lagons du nord et de l'est restent abrités toute l'année."],
      ["Le sud sauvage", "Pour les vues, pas la baignade : attention aux vagues."],
      ["Eau la plus claire", "Faites du snorkeling les matins calmes pour la meilleure visibilité."],
    ],
  },
  de: {
    metadata: {
      title: "Beste Strände auf Mauritius",
      description:
        "Die besten Strände auf Mauritius, Küste für Küste: von ruhigen Lagunen im Norden bis zu wilden Ufern im Süden. Wo man schwimmt, schnorchelt und den perfekten Sonnenuntergang erlebt.",
      alternates: { canonical: "/best-beaches-of-mauritius" },
    },
    kicker: "Lagunen · Sand · Küsten",
    titleMain: "Die besten Strände",
    titleAccent: "auf Mauritius",
    intro:
      "Riffgeschützte Lagunen, dramatische wilde Küsten und alles dazwischen: die schönsten Strände der Insel, nach Küsten geordnet.",
    legend: ["Norden", "Osten", "Westen", "Süden"],
    coasts: [
      {
        coast: "Nordküste",
        note: "ruhige Lagunen und leichtes Schwimmen",
        color: "#2389c9",
        beaches: [
          ["Trou aux Biches", "Top zum Schnorcheln und für Familien"],
          ["Mont Choisy", "der längste Strand der Insel"],
          ["Péreybère", "lebendig, lokal und zentral"],
          ["Cap Malheureux", "das Fotomotiv mit rotem Dach"],
        ],
      },
      {
        coast: "Ostküste",
        note: "Luxus und perfekte Lagunen",
        color: "#2f8e48",
        beaches: [
          ["Belle Mare", "langer, ruhiger Strand bei Sonnenaufgang"],
          ["Blaue Bucht", "das beste Schnorchelrevier"],
          ["Île aux Cerfs", "Lagunenparadies per Boot"],
          ["Pointe d'Esny", "klare, stille Lagune"],
        ],
      },
      {
        coast: "Westküste",
        note: "Sonnenuntergänge, Delfine und Dramatik",
        color: "#f16522",
        beaches: [
          ["Flic en Flac", "der vielseitigste Strand"],
          ["Le Morne", "ikonische UNESCO-Kitelagune"],
          ["Tamarin", "Surf- und Delfinbucht"],
          ["Albion", "ruhige Auszeit an der Westküste"],
        ],
      },
      {
        coast: "Südküste",
        note: "wild und unberührt",
        color: "#d89b24",
        beaches: [
          ["Gris Gris", "dramatische Klippen, nur Aussicht"],
          ["La Cambuse", "ursprünglich und nahe am Flughafen"],
          ["Riambel", "ruhige lokale Strandspaziergänge"],
          ["Saint-Félix", "raue Schönheit des Südens"],
        ],
      },
    ],
    mapAlt: "Karte von Mauritius mit den besten Strandküsten",
    mapCaption: "Die vier Küsten auf einen Blick",
    cards: [
      { title: "Am besten zum Schnorcheln", text: "Blaue Bucht · Trou aux Biches · Pointe d'Esny" },
      { title: "Am besten für Sonnenuntergänge", text: "Flic en Flac · Le Morne · Tamarin" },
      { title: "Am nächsten am Flughafen", text: "Blaue Bucht · La Cambuse" },
    ],
    goodTitle: "Gut zu wissen",
    goodItems: [
      ["Öffentlicher Zugang", "Die meisten Strände sind bis zur Hochwassermarke öffentlich."],
      ["Ruhigstes Schwimmen", "Lagunen im Norden und Osten bleiben das ganze Jahr geschützt."],
      ["Der wilde Süden", "Für Aussichten, nicht zum Schwimmen: Achten Sie auf die Wellen."],
      ["Klarstes Wasser", "Schnorcheln Sie an ruhigen Morgen für die beste Sicht."],
    ],
  },
  it: {
    metadata: {
      title: "Le migliori spiagge di Mauritius",
      description:
        "Le migliori spiagge di Mauritius, costa per costa: dalle lagune calme del nord alle rive selvagge del sud. Dove nuotare, fare snorkeling e ammirare il tramonto perfetto.",
      alternates: { canonical: "/best-beaches-of-mauritius" },
    },
    kicker: "Lagune · Sabbia · Coste",
    titleMain: "Le migliori spiagge",
    titleAccent: "di Mauritius",
    intro:
      "Lagune protette dalla barriera corallina, coste selvagge spettacolari e tutto il resto: le sabbie più belle dell'isola, ordinate per costa.",
    legend: ["Nord", "Est", "Ovest", "Sud"],
    coasts: [
      {
        coast: "Costa nord",
        note: "lagune calme e bagni facili",
        color: "#2389c9",
        beaches: [
          ["Trou aux Biches", "top per snorkeling e famiglie"],
          ["Mont Choisy", "la spiaggia più lunga dell'isola"],
          ["Péreybère", "vivace, locale e centrale"],
          ["Cap Malheureux", "l'icona fotografica dal tetto rosso"],
        ],
      },
      {
        coast: "Costa est",
        note: "lusso e perfezione lagunare",
        color: "#2f8e48",
        beaches: [
          ["Belle Mare", "lunga e tranquilla all'alba"],
          ["Baia Blu", "il miglior snorkeling"],
          ["Île aux Cerfs", "paradiso lagunare in barca"],
          ["Pointe d'Esny", "laguna chiara e tranquilla"],
        ],
      },
      {
        coast: "Costa ovest",
        note: "tramonti, delfini e scenari intensi",
        color: "#f16522",
        beaches: [
          ["Flic en Flac", "la spiaggia più versatile"],
          ["Le Morne", "iconica laguna kite UNESCO"],
          ["Tamarin", "baia di surf e delfini"],
          ["Albion", "fuga tranquilla sulla costa ovest"],
        ],
      },
      {
        coast: "Costa sud",
        note: "selvaggia e incontaminata",
        color: "#d89b24",
        beaches: [
          ["Gris Gris", "scogliere drammatiche, solo panorami"],
          ["La Cambuse", "selvaggia e vicina all'aeroporto"],
          ["Riambel", "passeggiate tranquille su spiaggia locale"],
          ["Saint-Félix", "bellezza grezza del sud"],
        ],
      },
    ],
    mapAlt: "Mappa di Mauritius con le migliori coste balneari",
    mapCaption: "Le quattro coste in sintesi",
    cards: [
      { title: "Ideale per snorkeling", text: "Baia Blu · Trou aux Biches · Pointe d'Esny" },
      { title: "Ideale per tramonti", text: "Flic en Flac · Le Morne · Tamarin" },
      { title: "Più vicino all'aeroporto", text: "Baia Blu · La Cambuse" },
    ],
    goodTitle: "Da sapere",
    goodItems: [
      ["Accesso pubblico", "La maggior parte delle spiagge è pubblica fino alla linea dell'alta marea."],
      ["Bagni più calmi", "Le lagune del nord e dell'est restano protette tutto l'anno."],
      ["Il sud selvaggio", "Per panorami, non per nuotare: attenzione alle onde."],
      ["Acqua più limpida", "Fai snorkeling nelle mattine calme per la migliore visibilità."],
    ],
  },
  es: {
    metadata: {
      title: "Las mejores playas de Mauricio",
      description:
        "Las mejores playas de Mauricio, costa por costa: desde lagunas tranquilas del norte hasta orillas salvajes del sur. Dónde nadar, hacer snorkel y ver el atardecer perfecto.",
      alternates: { canonical: "/best-beaches-of-mauritius" },
    },
    kicker: "Lagunas · Arena · Costas",
    titleMain: "Las mejores playas",
    titleAccent: "de Mauricio",
    intro:
      "Lagunas protegidas por arrecifes, costas salvajes dramáticas y todo lo demás: las mejores arenas de la isla, agrupadas por costa.",
    legend: ["Norte", "Este", "Oeste", "Sur"],
    coasts: [
      {
        coast: "Costa norte",
        note: "lagunas tranquilas y baños fáciles",
        color: "#2389c9",
        beaches: [
          ["Trou aux Biches", "ideal para snorkel y familias"],
          ["Mont Choisy", "la playa más larga de la isla"],
          ["Péreybère", "animada, local y céntrica"],
          ["Cap Malheureux", "el icono fotográfico del techo rojo"],
        ],
      },
      {
        coast: "Costa este",
        note: "lujo y perfección de laguna",
        color: "#2f8e48",
        beaches: [
          ["Belle Mare", "larga y tranquila al amanecer"],
          ["Bahía Azul", "el mejor snorkel"],
          ["Île aux Cerfs", "paraíso lagunar en barco"],
          ["Pointe d'Esny", "laguna clara y tranquila"],
        ],
      },
      {
        coast: "Costa oeste",
        note: "atardeceres, delfines y paisajes intensos",
        color: "#f16522",
        beaches: [
          ["Flic en Flac", "la playa más versátil"],
          ["Le Morne", "laguna kite UNESCO icónica"],
          ["Tamarin", "bahía de surf y delfines"],
          ["Albion", "escape tranquilo de la costa oeste"],
        ],
      },
      {
        coast: "Costa sur",
        note: "salvaje e intacta",
        color: "#d89b24",
        beaches: [
          ["Gris Gris", "acantilados dramáticos, solo vistas"],
          ["La Cambuse", "salvaje y cerca del aeropuerto"],
          ["Riambel", "paseos tranquilos por playa local"],
          ["San Félix", "belleza cruda del sur"],
        ],
      },
    ],
    mapAlt: "Mapa de Mauricio con las mejores costas de playa",
    mapCaption: "Las cuatro costas de un vistazo",
    cards: [
      { title: "Mejor para snorkel", text: "Bahía Azul · Trou aux Biches · Pointe d'Esny" },
      { title: "Mejor para atardeceres", text: "Flic en Flac · Le Morne · Tamarin" },
      { title: "Más cerca del aeropuerto", text: "Bahía Azul · La Cambuse" },
    ],
    goodTitle: "Conviene saber",
    goodItems: [
      ["Acceso público", "La mayoría de las playas son públicas hasta la línea de pleamar."],
      ["Baños más tranquilos", "Las lagunas del norte y este se mantienen protegidas todo el año."],
      ["El sur salvaje", "Para vistas, no para nadar: cuidado con las olas."],
      ["Agua más clara", "Haz snorkel en mañanas tranquilas para la mejor visibilidad."],
    ],
  },
  ru: {
    metadata: {
      title: "Лучшие пляжи Маврикия",
      description:
        "Лучшие пляжи Маврикия по побережьям: от спокойных северных лагун до диких южных берегов. Где плавать, заниматься снорклингом и встречать идеальный закат.",
      alternates: { canonical: "/best-beaches-of-mauritius" },
    },
    kicker: "Лагуны · Песок · Побережья",
    titleMain: "Лучшие пляжи",
    titleAccent: "Маврикия",
    intro:
      "Лагуны под защитой рифов, выразительные дикие берега и все между ними: лучшие пляжи острова, сгруппированные по побережьям.",
    legend: ["Север", "Восток", "Запад", "Юг"],
    coasts: [
      {
        coast: "Северное побережье",
        note: "спокойные лагуны и легкое купание",
        color: "#2389c9",
        beaches: [
          ["Тру-о-Биш", "лучше всего для снорклинга и семей"],
          ["Мон-Шуази", "самый длинный пляж острова"],
          ["Переибер", "оживленный, местный и центральный"],
          ["Кап-Малёрё", "фото-икона с красной крышей"],
        ],
      },
      {
        coast: "Восточное побережье",
        note: "роскошь и идеальные лагуны",
        color: "#2f8e48",
        beaches: [
          ["Бель-Мар", "длинный и спокойный пляж на рассвете"],
          ["Блю-Бей", "лучший снорклинг"],
          ["Иль-о-Серф", "райская лагуна на лодке"],
          ["Пуэнт-д'Эсни", "чистая тихая лагуна"],
        ],
      },
      {
        coast: "Западное побережье",
        note: "закаты, дельфины и драматичные виды",
        color: "#f16522",
        beaches: [
          ["Флик-ан-Флак", "самый универсальный пляж"],
          ["Ле-Морн", "знаменитая UNESCO-лагуна для кайта"],
          ["Тамарин", "бухта серфинга и дельфинов"],
          ["Альбион", "тихое место на западном побережье"],
        ],
      },
      {
        coast: "Южное побережье",
        note: "дикое и нетронутое",
        color: "#d89b24",
        beaches: [
          ["Гри-Гри", "драматичные скалы, только виды"],
          ["Ла-Камбюз", "дикое место рядом с аэропортом"],
          ["Риамбель", "спокойные прогулки по местному пляжу"],
          ["Сен-Феликс", "суровая южная красота"],
        ],
      },
    ],
    mapAlt: "Карта Маврикия с лучшими пляжными побережьями",
    mapCaption: "Четыре побережья с первого взгляда",
    cards: [
      { title: "Лучше всего для снорклинга", text: "Блю-Бей · Тру-о-Биш · Пуэнт-д'Эсни" },
      { title: "Лучше всего для закатов", text: "Флик-ан-Флак · Ле-Морн · Тамарин" },
      { title: "Ближе всего к аэропорту", text: "Блю-Бей · Ла-Камбюз" },
    ],
    goodTitle: "Полезно знать",
    goodItems: [
      ["Общий доступ", "Большинство пляжей открыты для всех до линии прилива."],
      ["Самое спокойное купание", "Лагуны севера и востока защищены круглый год."],
      ["Дикий юг", "Для видов, не для купания: берегитесь волн."],
      ["Самая прозрачная вода", "Для лучшей видимости занимайтесь снорклингом спокойным утром."],
    ],
  },
};

const legendColors = ["#2389c9", "#2f8e48", "#f16522", "#d89b24"] as const;

function getBeachPageCopy(locale: string) {
  return BEACH_PAGE_COPY[normalizeLocale(locale)] ?? BEACH_PAGE_COPY.en;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const activeLocale = normalizeLocale(locale);
  return getBeachPageCopy(activeLocale).metadata;
}

export default async function BestBeachesOfMauritiusPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const activeLocale = normalizeLocale(locale);
  const copy = getBeachPageCopy(activeLocale);

  return localizeStaticPage((
    <main id="main-content" className="min-h-screen bg-white text-[#1c2a2e]">
      <Navbar />

      <article className="mx-auto w-full max-w-6xl px-4 pt-24 pb-10 sm:px-6 lg:pt-28 xl:px-0">
        <header>
          {/* <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] font-semibold uppercase tracking-wide text-[#ec5f25]">
            <div className="flex items-center gap-2 normal-case tracking-normal">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[#f16522] text-white">
                <MapPin className="h-4 w-4 fill-white" strokeWidth={2} />
              </span>
              <span className="border-b border-[#f16522] text-[13px] font-bold text-[#1d3144]">
                Mauritius<span className="text-[#f16522]">Explored</span>
              </span>
            </div>
            <p>Beaches &middot; 2026 Guide</p>
          </div> */}

          <p className="mt-7 text-xs font-bold uppercase tracking-wide text-[#f16522]">
            {copy.kicker}
          </p>
          <h1 className="mt-2 font-serif text-[clamp(2rem,5vw,3.4rem)] font-bold leading-tight tracking-tight text-[#151f2b]">
            {copy.titleMain}{" "}
            <span className="font-normal italic text-[#f16522]">{copy.titleAccent}</span>
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
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: legendColors[index] }} />
                  <span>{label}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 space-y-5">
              {copy.coasts.map((group) => (
                <section key={group.coast}>
                  <div className="flex flex-wrap items-baseline gap-2 border-b border-[#ded6cf] pb-1.5">
                    <h2
                      className="font-serif text-lg font-bold uppercase leading-none"
                      style={{ color: group.color }}
                    >
                      {group.coast}
                    </h2>
                    <p className="font-serif text-xs italic text-[#8a9398]">{group.note}</p>
                  </div>
                  <div className="mt-2.5 space-y-1.5">
                    {group.beaches.map(([name, text]) => (
                      <p key={name} className="flex gap-2 text-xs leading-relaxed text-[#61707a] sm:text-sm">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: group.color }} />
                        <span>
                          <strong className="font-serif text-[#152738]">{name}</strong>
                          <span> - {text}</span>
                        </span>
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>

          <aside className="grid gap-4">
      <figure className="mx-auto w-full max-w-[307px] ">
                           <Image
                             src="/images/quick-trips/best_beaches_of_mauritius.png"
                             alt={copy.mapAlt}
                             width={1200}
                             height={1000}
                             priority
                             className="h-auto  w-full"
                           />
                           <figcaption className="mt-2 text-center font-serif text-xs italic text-[#8a8f91]">
                          {copy.mapCaption}
                           </figcaption>
                         </figure>
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {copy.cards.map((card) => (
                <section key={card.title} className="rounded-md bg-[#f5f2ef] px-5 py-5">
                  <h2 className="font-serif text-lg font-bold text-[#f16522]">{card.title}</h2>
                  <p className="mt-2 text-xs leading-relaxed text-[#61707a] sm:text-sm">
                    {card.text}
                  </p>
                </section>
              ))}
            </div>
          </aside>
        </section>

        <section className="mt-8 rounded-md bg-[#f5f2ef] px-5 py-5 sm:px-7">
          <h2 className="font-serif text-xl font-bold text-[#f16522]">{copy.goodTitle}</h2>
          <div className="mt-3 grid gap-x-8 gap-y-2 md:grid-cols-2">
            {copy.goodItems.map(([title, text]) => (
              <p key={title} className="flex gap-2 text-xs leading-relaxed text-[#61707a] sm:text-sm">
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
      <Footer />
    </main>
  ), activeLocale);
}
