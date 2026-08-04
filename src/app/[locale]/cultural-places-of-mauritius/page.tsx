import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/navigation";
import PopularRoadTrips from "@/components/PopularRoadTrips";
import { normalizeLocale } from "@/i18n/routing";
import type { LucideIcon } from "lucide-react";
import { Building2, Landmark, MapPin, ShoppingBag } from "lucide-react";
import Image from "next/image";
export const revalidate = 3600;

type Locale = "en" | "fr" | "de" | "it" | "es" | "ru";

type CulturePlace = {
  name: string;
  type: string;
  location: string;
  description: string;
  tip: string;
  icon: LucideIcon;
  color: string;
  bg: string;
};

type CultureCopy = {
  metadata: Metadata;
  kicker: string;
  titleMain: string;
  titleAccent: string;
  intro: string;
  sectionTitle: string;
  tipLabel: string;
  places: CulturePlace[];
};
const ad = {
  desktopSrc: "/images/quick-trips/Car-Rental-Mauritius.webp",
  href: "/car-rental-mauritius",
  alt: "Rent Rental Mauritius",
};
const pocket = {
  desktopSrc: "/images/quick-trips/Pocket-Guide-For-Mauritius.webp",
  href: "/pocket-guide",
  alt: "Rent Rental Mauritius",
};
const placeStyles = [
  { icon: Landmark, color: "#f16522", bg: "#fff0e7" },
  { icon: Building2, color: "#2389c9", bg: "#eaf7ff" },
  { icon: Building2, color: "#2389c9", bg: "#eaf7ff" },
  { icon: Landmark, color: "#2f8e48", bg: "#edf8ef" },
  { icon: ShoppingBag, color: "#2389c9", bg: "#eaf7ff" },
] as const;

const placeLinks = [
  "/best-places-to-visit-in-mauritius/aapravasi-ghat",
  "/best-places-to-visit-in-mauritius/blue-penny-museum",
  "/best-places-to-visit-in-mauritius/national-history-museum",
  "/best-places-to-visit-in-mauritius/chinese-pagoda-kwan-tee-pagoda",
  "/best-places-to-visit-in-mauritius/chinatown",
] as const;

const makePlaces = (
  places: Array<Omit<CulturePlace, "icon" | "color" | "bg">>,
): CulturePlace[] =>
  places.map((place, index) => ({
    ...place,
    icon: placeStyles[index].icon,
    color: placeStyles[index].color,
    bg: placeStyles[index].bg,
  }));

const CULTURE_COPY: Record<Locale, CultureCopy> = {
  en: {
    metadata: {
      title: "Cultural Places of Mauritius",
      description:
        "Cultural places of Mauritius - temples, colonial mansions, sacred lakes and museums. Discover the island's Creole, Indian, French and Chinese heritage.",
      alternates: { canonical: "/cultural-places-of-mauritius" },
    },
    kicker: "Culture & Heritage",
    titleMain: "Cultural Places",
    titleAccent: "of Mauritius",
    intro:
      "Beyond the beach - fifteen sites that reveal the island's layered soul, from ancient temples and sacred lakes to colonial houses and museums of migration.",
    sectionTitle: "Port Louis - The Capital",
    tipLabel: "Tip",
    places: makePlaces([
      {
        name: "Aapravasi Ghat",
        type: "UNESCO Site",
        location: "Port Louis harbour",
        description:
          "Where nearly half a million indentured labourers first stepped onto Mauritian soil (1849-1923) - stone arches, a courtyard and a moving museum.",
        tip: "Allow 1.5 hrs - free guided tours on some days.",
      },
      {
        name: "Blue Penny Museum",
        type: "Museum",
        location: "Caudan Waterfront",
        description:
          "Built around two rare 1847 stamps, it tells the whole Mauritian story - the colonial era, its diverse communities and natural history.",
        tip: "Check the stamp-display schedule - great for kids.",
      },
      {
        name: "Natural History Museum",
        type: "Museum",
        location: "Port Louis",
        description:
          "Home to a near-complete dodo skeleton you won't see anywhere else, alongside endemic birds and marine specimens.",
        tip: "Free entry - set in a handsome colonial building.",
      },
      {
        name: "Chinese Pagoda & Heritage Museum",
        type: "Temple + Museum",
        location: "Port Louis",
        description:
          "One of the island's oldest Chinese temples and a thoughtful museum on the Hakka & Cantonese communities.",
        tip: "Pair with Chinatown's shops & weekend dim sum.",
      },
      {
        name: "Chinatown District",
        type: "Heritage Quarter",
        location: "Port Louis",
        description:
          "A living heritage quarter of family shops, traditional medicine and dried goods - with dim sum at weekends.",
        tip: "Weekend mornings are the most active.",
      },
    ]),
  },
  fr: {
    metadata: {
      title: "Lieux culturels de Maurice",
      description:
        "Lieux culturels de Maurice - temples, demeures coloniales, lacs sacrés et musées pour découvrir les héritages créole, indien, français et chinois.",
      alternates: { canonical: "/cultural-places-of-mauritius" },
    },
    kicker: "Culture et patrimoine",
    titleMain: "Lieux culturels",
    titleAccent: "de Maurice",
    intro:
      "Au-delà de la plage - quinze sites qui révèlent l'âme multiple de l'île, des temples anciens et lacs sacrés aux maisons coloniales et musées de la migration.",
    sectionTitle: "Port-Louis - La capitale",
    tipLabel: "Conseil",
    places: makePlaces([
      {
        name: "Aapravasi Ghat",
        type: "Site UNESCO",
        location: "port de Port-Louis",
        description:
          "Là où près d'un demi-million de travailleurs engagés ont posé le pied sur le sol mauricien (1849-1923) - arches de pierre, cour et musée émouvant.",
        tip: "Prévoyez 1 h 30 - visites guidées gratuites certains jours.",
      },
      {
        name: "Musée Blue Penny",
        type: "Musée",
        location: "Caudan Waterfront",
        description:
          "Construit autour de deux rares timbres de 1847, il raconte l'histoire mauricienne - époque coloniale, communautés diverses et histoire naturelle.",
        tip: "Vérifiez les horaires d'exposition des timbres - très bien avec des enfants.",
      },
      {
        name: "Musée d'Histoire Naturelle",
        type: "Musée",
        location: "Port-Louis",
        description:
          "Il abrite un squelette de dodo presque complet, aux côtés d'oiseaux endémiques et de spécimens marins.",
        tip: "Entrée gratuite - dans un beau bâtiment colonial.",
      },
      {
        name: "Pagode chinoise et musée du patrimoine",
        type: "Temple + musée",
        location: "Port-Louis",
        description:
          "L'un des plus anciens temples chinois de l'île et un musée sensible sur les communautés hakka et cantonaises.",
        tip: "À combiner avec les boutiques de Chinatown et les dim sum du week-end.",
      },
      {
        name: "Quartier chinois",
        type: "Quartier patrimonial",
        location: "Port-Louis",
        description:
          "Un quartier vivant de boutiques familiales, médecine traditionnelle et produits séchés - avec dim sum le week-end.",
        tip: "Les matinées du week-end sont les plus animées.",
      },
    ]),
  },
  de: {
    metadata: {
      title: "Kulturorte auf Mauritius",
      description:
        "Kulturorte auf Mauritius - Tempel, Kolonialhäuser, heilige Seen und Museen mit kreolischem, indischem, französischem und chinesischem Erbe.",
      alternates: { canonical: "/cultural-places-of-mauritius" },
    },
    kicker: "Kultur und Erbe",
    titleMain: "Kulturorte",
    titleAccent: "auf Mauritius",
    intro:
      "Jenseits des Strandes - fünfzehn Orte zeigen die vielschichtige Seele der Insel, von alten Tempeln und heiligen Seen bis zu Kolonialhäusern und Migrationsmuseen.",
    sectionTitle: "Port Louis - Die Hauptstadt",
    tipLabel: "Tipp",
    places: makePlaces([
      {
        name: "Aapravasi Ghat",
        type: "UNESCO-Stätte",
        location: "Hafen von Port Louis",
        description:
          "Hier betraten fast eine halbe Million Vertragsarbeiter erstmals mauritischen Boden (1849-1923) - Steinbögen, Innenhof und bewegendes Museum.",
        tip: "Plane 1,5 Std. ein - an manchen Tagen kostenlose Führungen.",
      },
      {
        name: "Blue-Penny-Museum",
        type: "Museum",
        location: "Caudan Waterfront",
        description:
          "Rund um zwei seltene Briefmarken von 1847 erzählt es die Geschichte Mauritius' - Kolonialzeit, Gemeinschaften und Naturgeschichte.",
        tip: "Briefmarken-Ausstellungszeiten prüfen - auch toll für Kinder.",
      },
      {
        name: "Naturkundemuseum",
        type: "Museum",
        location: "Port Louis",
        description:
          "Hier steht ein fast vollständiges Dodo-Skelett, dazu endemische Vögel und Meeressammlungen.",
        tip: "Freier Eintritt - in einem schönen Kolonialgebäude.",
      },
      {
        name: "Chinesische Pagode und Erbemuseum",
        type: "Tempel + Museum",
        location: "Port Louis",
        description:
          "Einer der ältesten chinesischen Tempel der Insel und ein sorgfältiges Museum über Hakka- und kantonesische Gemeinschaften.",
        tip: "Mit Chinatown-Läden und Dim Sum am Wochenende kombinieren.",
      },
      {
        name: "Chinatown-Viertel",
        type: "Historisches Viertel",
        location: "Port Louis",
        description:
          "Ein lebendiges Viertel mit Familienläden, traditioneller Medizin und Trockenwaren - am Wochenende mit Dim Sum.",
        tip: "Am Wochenende vormittags ist am meisten los.",
      },
    ]),
  },
  it: {
    metadata: {
      title: "Luoghi culturali di Mauritius",
      description:
        "Luoghi culturali di Mauritius - templi, case coloniali, laghi sacri e musei per scoprire l'eredità creola, indiana, francese e cinese.",
      alternates: { canonical: "/cultural-places-of-mauritius" },
    },
    kicker: "Cultura e patrimonio",
    titleMain: "Luoghi culturali",
    titleAccent: "di Mauritius",
    intro:
      "Oltre la spiaggia - quindici luoghi rivelano l'anima stratificata dell'isola, da antichi templi e laghi sacri a dimore coloniali e musei della migrazione.",
    sectionTitle: "Port Louis - La capitale",
    tipLabel: "Consiglio",
    places: makePlaces([
      {
        name: "Aapravasi Ghat",
        type: "Sito UNESCO",
        location: "porto di Port Louis",
        description:
          "Dove quasi mezzo milione di lavoratori a contratto mise piede per la prima volta sul suolo mauriziano (1849-1923) - archi in pietra, cortile e museo toccante.",
        tip: "Prevedi 1,5 ore - visite guidate gratuite in alcuni giorni.",
      },
      {
        name: "Museo Blue Penny",
        type: "Museo",
        location: "Caudan Waterfront",
        description:
          "Costruito attorno a due rari francobolli del 1847, racconta la storia mauriziana - epoca coloniale, comunità diverse e storia naturale.",
        tip: "Controlla gli orari di esposizione dei francobolli - ottimo anche per bambini.",
      },
      {
        name: "Museo di Storia Naturale",
        type: "Museo",
        location: "Port Louis",
        description:
          "Ospita uno scheletro di dodo quasi completo, insieme a uccelli endemici e reperti marini.",
        tip: "Ingresso gratuito - in un bel edificio coloniale.",
      },
      {
        name: "Pagoda cinese e museo del patrimonio",
        type: "Tempio + museo",
        location: "Port Louis",
        description:
          "Uno dei templi cinesi più antichi dell'isola e un museo attento sulle comunità hakka e cantonesi.",
        tip: "Abbinalo ai negozi di Chinatown e al dim sum del weekend.",
      },
      {
        name: "Quartiere Chinatown",
        type: "Quartiere storico",
        location: "Port Louis",
        description:
          "Un quartiere vivo di botteghe familiari, medicina tradizionale e prodotti secchi - con dim sum nei weekend.",
        tip: "Le mattine del weekend sono le più animate.",
      },
    ]),
  },
  es: {
    metadata: {
      title: "Lugares culturales de Mauricio",
      description:
        "Lugares culturales de Mauricio - templos, mansiones coloniales, lagos sagrados y museos para descubrir el patrimonio criollo, indio, francés y chino.",
      alternates: { canonical: "/cultural-places-of-mauritius" },
    },
    kicker: "Cultura y patrimonio",
    titleMain: "Lugares culturales",
    titleAccent: "de Mauricio",
    intro:
      "Más allá de la playa - quince lugares revelan el alma en capas de la isla, desde templos antiguos y lagos sagrados hasta casas coloniales y museos de migración.",
    sectionTitle: "Port Louis - La capital",
    tipLabel: "Consejo",
    places: makePlaces([
      {
        name: "Aapravasi Ghat",
        type: "Sitio UNESCO",
        location: "puerto de Port Louis",
        description:
          "Donde casi medio millón de trabajadores contratados pisaron por primera vez suelo mauriciano (1849-1923) - arcos de piedra, patio y un museo conmovedor.",
        tip: "Reserva 1,5 h - visitas guiadas gratuitas algunos días.",
      },
      {
        name: "Museo Blue Penny",
        type: "Museo",
        location: "Caudan Waterfront",
        description:
          "Construido alrededor de dos raros sellos de 1847, cuenta la historia de Mauricio - era colonial, comunidades diversas e historia natural.",
        tip: "Consulta el horario de exhibición de sellos - ideal para niños.",
      },
      {
        name: "Museo de Historia Natural",
        type: "Museo",
        location: "Port Louis",
        description:
          "Alberga un esqueleto de dodo casi completo, junto con aves endémicas y especímenes marinos.",
        tip: "Entrada gratuita - en un elegante edificio colonial.",
      },
      {
        name: "Pagoda china y museo del patrimonio",
        type: "Templo + museo",
        location: "Port Louis",
        description:
          "Uno de los templos chinos más antiguos de la isla y un museo cuidado sobre las comunidades hakka y cantonesa.",
        tip: "Combínalo con las tiendas de Chinatown y dim sum de fin de semana.",
      },
      {
        name: "Barrio chino",
        type: "Barrio patrimonial",
        location: "Port Louis",
        description:
          "Un barrio vivo de tiendas familiares, medicina tradicional y productos secos - con dim sum los fines de semana.",
        tip: "Las mañanas de fin de semana son las más activas.",
      },
    ]),
  },
  ru: {
    metadata: {
      title: "Культурные места Маврикия",
      description:
        "Культурные места Маврикия - храмы, колониальные дома, священные озера и музеи, раскрывающие креольское, индийское, французское и китайское наследие.",
      alternates: { canonical: "/cultural-places-of-mauritius" },
    },
    kicker: "Культура и наследие",
    titleMain: "Культурные места",
    titleAccent: "Маврикия",
    intro:
      "За пределами пляжа - пятнадцать мест раскрывают многослойную душу острова: древние храмы, священные озера, колониальные дома и музеи миграции.",
    sectionTitle: "Порт-Луи - столица",
    tipLabel: "Совет",
    places: makePlaces([
      {
        name: "Ааправаси-Гхат",
        type: "Объект ЮНЕСКО",
        location: "гавань Порт-Луи",
        description:
          "Место, где почти полмиллиона наемных рабочих впервые ступили на землю Маврикия (1849-1923) - каменные арки, двор и трогательный музей.",
        tip: "Заложите 1,5 часа - в некоторые дни есть бесплатные экскурсии.",
      },
      {
        name: "Музей Blue Penny",
        type: "Музей",
        location: "Caudan Waterfront",
        description:
          "Построенный вокруг двух редких марок 1847 года, музей рассказывает историю Маврикия - колониальную эпоху, разные общины и природу.",
        tip: "Проверьте расписание показа марок - детям тоже интересно.",
      },
      {
        name: "Музей естественной истории",
        type: "Музей",
        location: "Порт-Луи",
        description:
          "Здесь хранится почти полный скелет дронта, а также эндемичные птицы и морские экспонаты.",
        tip: "Вход бесплатный - здание красивое, колониального периода.",
      },
      {
        name: "Китайская пагода и музей наследия",
        type: "Храм + музей",
        location: "Порт-Луи",
        description:
          "Один из старейших китайских храмов острова и вдумчивый музей о хакка и кантонских общинах.",
        tip: "Совместите с магазинами Chinatown и димсамом по выходным.",
      },
      {
        name: "Китайский квартал",
        type: "Исторический квартал",
        location: "Порт-Луи",
        description:
          "Живой квартал семейных лавок, традиционной медицины и сухих продуктов - по выходным с димсамом.",
        tip: "Самое оживленное время - утро выходных.",
      },
    ]),
  },
};

function getCopy(locale: string): CultureCopy {
  return CULTURE_COPY[normalizeLocale(locale) as Locale];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return getCopy(locale).metadata;
}

export default async function CulturalPlacesOfMauritiusPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const copy = getCopy(locale);

  return (
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
          <div className="flex items-center gap-2 border-b border-[#ded6cf] pb-2">
            <MapPin className="h-3.5 w-3.5 text-[#f16522]" strokeWidth={2} />
            <h2 className="text-xs font-bold uppercase tracking-wide text-[#f16522]">
              {copy.sectionTitle}
            </h2>
          </div>

          <div className="mt-3 space-y-3">
            {copy.places.map((place, index) => {
              const PlaceIcon = place.icon;

              return (
                <Link
                  key={place.name}
                  href={placeLinks[index]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-4 rounded-md border border-[#e7dfd6] bg-white px-4 py-5 shadow-[0_2px_7px_rgba(36,54,67,.035)] transition-colors hover:border-[#f16522] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f16522] sm:gap-5 sm:px-6"
                >
                  <span
                    className="mt-1 grid h-12 w-12 shrink-0 place-items-center rounded-full"
                    style={{ backgroundColor: place.bg, color: place.color }}
                  >
                    <PlaceIcon className="h-6 w-6" strokeWidth={1.8} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-serif text-lg font-bold leading-tight text-[#152738] sm:text-xl">
                      {place.name}
                    </h3>
                    <p
                      className="mt-1 text-[10px] font-bold uppercase tracking-wide"
                      style={{ color: place.color }}
                    >
                      {place.type}{" "}
                      <span className="normal-case tracking-normal text-[#8a9398]">
                        - {place.location}
                      </span>
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-[#61707a] sm:text-sm">
                      {place.description}
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-[#61707a] sm:text-sm">
                      <strong className="font-serif text-[#f16522]">
                        {copy.tipLabel}
                      </strong>{" "}
                      {place.tip}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </article>

      <section
        className="bg-white py-3 md:py-5 dark:border-neutral-800 dark:bg-neutral-900"
        aria-label="Sponsored highlights"
      >
        <div className="container mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-xl bg-[#052028] shadow-sm ring-1 ring-gray-200 dark:ring-neutral-700">
            <a
              href={ad.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
            >
              <span className="relative block aspect-[1200/500] w-full">
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
      <PopularRoadTrips locale={locale} />
      <section
        className="border-b border-gray-100 bg-white py-3 md:py-5 dark:border-neutral-800 dark:bg-neutral-900"
        aria-label="Sponsored highlights"
      >
        <div className="container mx-auto max-w-7xl ">
          <div className="relative overflow-hidden rounded-xl bg-[#052028] shadow-sm ring-1 ring-gray-200 dark:ring-neutral-700">
            <a
              href={pocket.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
            >
              <span className="relative block aspect-[1200/450] w-full">
                <Image
                  src={pocket.desktopSrc}
                  alt={pocket.alt}
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
      <Footer />
    </main>
  );
}
