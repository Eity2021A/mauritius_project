import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PopularRoadTrips from "@/components/PopularRoadTrips";
import { Link } from "@/i18n/navigation";
import { localizeStaticPage, staticPageText } from "@/lib/static-page-localizer";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import {
  Anchor,
  Compass,
  Fish,
  MapPin,
  Sailboat,
  ShieldCheck,
  Shell,
  Waves,
} from "lucide-react";
import CarRentalAdBannerInfo from "@/components/CarRentalAdBannerInfo";
import { normalizeLocale } from "@/i18n/routing";

export const revalidate = 3600;

const metadataSource: Metadata = {
  title: "Where to Snorkel in Mauritius",
  description:
    "Where to snorkel in Mauritius — the island's clearest lagoons and coral reefs, from Blue Bay to Trou aux Biches. The best spots, marine life and top tips.",
  alternates: { canonical: "/where-to-snorkel-in-mauritius" },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const activeLocale = normalizeLocale(locale);

  return {
    ...metadataSource,
    title: staticPageText(activeLocale, String(metadataSource.title)),
    description: staticPageText(activeLocale, String(metadataSource.description)),
  };
}
const ad = {
  desktopSrc: "/images/quick-trips/Snorkelling-in-Mauritius.webp",
  href: "/blog/best-snorkelling-spots-in-mauritius",
  alt: "Snorkelling in Mauritius",
};

type SnorkelRegion = "North" | "West & South-West" | "East & South";

const snorkelRegions: [SnorkelRegion, string][] = [
  ["North", "#2389c9"],
  ["West & South-West", "#f16522"],
  ["East & South", "#2f8e48"],
];

const snorkelRegionStyles: Record<
  SnorkelRegion,
  { color: string; bg: string }
> = {
  North: { color: "#2389c9", bg: "#eaf7ff" },
  "West & South-West": { color: "#f16522", bg: "#fff0e7" },
  "East & South": { color: "#2f8e48", bg: "#edf8ef" },
};

const snorkelSpots: {
  name: string;
  tag: string;
  region: string;
  type: SnorkelRegion;
  description: string;
  tip: string;
  icon: LucideIcon;
}[] = [
  {
    name: "Blue Bay Marine Park",
    tag: "Marine Park",
    region: "South",
    type: "East & South",
    description: "Clear, protected water with rich coral & tropical fish.",
    tip: "All levels - glass-bottom boat tours available.",
    icon: Fish,
  },
  {
    name: "Ile aux Cerfs",
    tag: "Island Lagoon",
    region: "East",
    type: "East & South",
    description: "A crystal-clear lagoon reached by boat trip.",
    tip: "Included in most catamaran day excursions.",
    icon: Sailboat,
  },
  {
    name: "Le Morne Brabant",
    tag: "Calm Lagoon",
    region: "South-West",
    type: "West & South-West",
    description: "Shallow, calm lagoon with coral under the mountain.",
    tip: "Quieter than the north; pair with beach time.",
    icon: Waves,
  },
  {
    name: "Flic en Flac",
    tag: "Shore Reef",
    region: "West",
    type: "West & South-West",
    description: "A reef a short swim from shore, with easy access.",
    tip: "Great for beginners - go early before the wind.",
    icon: Anchor,
  },
  {
    name: "Belle Mare",
    tag: "Hidden Reef",
    region: "East",
    type: "East & South",
    description: "Calm east-coast lagoon with quiet, hidden reefs.",
    tip: "Peaceful & uncrowded - ideal for a relaxed swim.",
    icon: Waves,
  },
  {
    name: "Bel Ombre",
    tag: "Unspoiled Coast",
    region: "South",
    type: "East & South",
    description: "Unspoiled south coast with good marine life.",
    tip: "Less-crowded & authentic; calm, clear water.",
    icon: Fish,
  },
  {
    name: "Balaclava Marine Park",
    tag: "Marine Park",
    region: "North-West",
    type: "North",
    description: "Good coral formations with easy access from shore.",
    tip: "Lesser-known - handy from north-west hotels.",
    icon: Anchor,
  },
  {
    name: "Coin de Mire",
    tag: "Offshore Islet",
    region: "North",
    type: "North",
    description: "Incredible clear water & diverse marine life.",
    tip: "Boat access only - join a guided excursion.",
    icon: Sailboat,
  },
  {
    name: "Ile Plate (Flat Island)",
    tag: "Remote Islet",
    region: "North",
    type: "North",
    description: "Remote, untouched & exceptionally clear coral.",
    tip: "Full-day boat trip; best in calm seas.",
    icon: Compass,
  },
];

const snorkelSpotLinks: Record<string, string> = {
  "Blue Bay Marine Park":
    "/best-places-to-visit-in-mauritius/blue-bay-marine-park",
  "Ile aux Cerfs": "/best-places-to-visit-in-mauritius/ile-aux-cerfs",
  "Le Morne Brabant": "/beaches-in-mauritius/le-morne",
  "Flic en Flac": "/beaches-in-mauritius/flic-en-flac",
  "Belle Mare": "/beaches-in-mauritius/belle-mare",
  "Bel Ombre": "/beaches-in-mauritius/bel-ombre",
  "Balaclava Marine Park": "/beaches-in-mauritius/balaclava",
  "Ile Plate (Flat Island)": "/beaches-in-mauritius/ilot-gabriel-ile-plate",
};

const snorkelTips: {
  title: string;
  text: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Best season",
    text: "Oct-Apr brings warmer water & calmer seas; sunrise early for clarity.",
    icon: Compass,
  },
  {
    title: "Reef etiquette",
    text: "Never touch coral or marine life; reef-safe sunscreen only.",
    icon: ShieldCheck,
  },
  {
    title: "Come prepared",
    text: "Wear fins for easy movement; check the weather & sea before you go.",
    icon: Waves,
  },
];

type SupportedSnorkelLocale = "fr" | "de" | "it" | "es" | "ru";
type SnorkelSpotCopy = {
  name: string;
  tag: string;
  region: string;
  description: string;
  tip: string;
};

const SNORKEL_PAGE_COPY: Record<SupportedSnorkelLocale, {
  topLabel: string;
  kicker: string;
  titleMain: string;
  titleAccent: string;
  intro: string;
  regions: Record<SnorkelRegion, string>;
  spots: Record<string, SnorkelSpotCopy>;
  tipLabel: string;
  smartTitle: string;
  smartTips: { title: string; text: string }[];
  finalNote: string;
}> = {
  fr: {
    topLabel: "Snorkeling - recifs",
    kicker: "Lagons et recifs coralliens",
    titleMain: "Ou faire du snorkeling",
    titleAccent: "a Maurice",
    intro: "Neuf lagons et recifs parmi les plus clairs de l'ile - des baies peu profondes pour debutants aux ilots lointains riches en coraux et poissons tropicaux.",
    regions: { North: "Nord", "West & South-West": "Ouest et Sud-Ouest", "East & South": "Est et Sud" },
    tipLabel: "Conseil",
    spots: {
      "Blue Bay Marine Park": { name: "Parc marin de Blue Bay", tag: "Parc marin", region: "Sud", description: "Eau claire et protegee avec coraux riches et poissons tropicaux.", tip: "Tous niveaux - sorties en bateau a fond de verre disponibles." },
      "Ile aux Cerfs": { name: "Ile aux Cerfs", tag: "Lagon d'ile", region: "Est", description: "Un lagon cristallin accessible en bateau.", tip: "Inclus dans la plupart des excursions catamaran a la journee." },
      "Le Morne Brabant": { name: "Le Morne Brabant", tag: "Lagon calme", region: "Sud-Ouest", description: "Lagon peu profond et calme avec coraux sous la montagne.", tip: "Plus tranquille que le nord; combinez avec du temps plage." },
      "Flic en Flac": { name: "Flic en Flac", tag: "Recif depuis la plage", region: "Ouest", description: "Un recif a quelques minutes de nage du rivage, facile d'acces.", tip: "Excellent pour debutants - partez tot avant le vent." },
      "Belle Mare": { name: "Belle Mare", tag: "Recif cache", region: "Est", description: "Lagon paisible de la cote est avec recifs calmes et discrets.", tip: "Paisible et peu frequente - ideal pour nager detendu." },
      "Bel Ombre": { name: "Bel Ombre", tag: "Cote preservee", region: "Sud", description: "Cote sud preservee avec une belle vie marine.", tip: "Moins frequente et authentique; eau calme et claire." },
      "Balaclava Marine Park": { name: "Parc marin de Balaclava", tag: "Parc marin", region: "Nord-Ouest", description: "Bonnes formations coralliennes avec acces facile depuis la plage.", tip: "Moins connu - pratique depuis les hotels du nord-ouest." },
      "Coin de Mire": { name: "Coin de Mire", tag: "Ilot au large", region: "Nord", description: "Eau incroyablement claire et vie marine variee.", tip: "Acces uniquement en bateau - rejoignez une excursion guidee." },
      "Ile Plate (Flat Island)": { name: "Ile Plate", tag: "Ilot lointain", region: "Nord", description: "Corail lointain, intact et exceptionnellement clair.", tip: "Sortie bateau a la journee; meilleur par mer calme." },
    },
    smartTitle: "Faire du snorkeling malin",
    smartTips: [
      { title: "Meilleure saison", text: "Octobre a avril apporte une eau plus chaude et une mer plus calme; partez tot pour la clarte." },
      { title: "Respect du recif", text: "Ne touchez jamais les coraux ni la vie marine; utilisez seulement une creme solaire compatible recifs." },
      { title: "Bien prepare", text: "Portez des palmes pour bouger facilement; verifiez la meteo et la mer avant de partir." },
    ],
    finalNote: "Cherchez poissons-perroquets, poissons-anges et poissons-clowns - et, avec un peu de chance, une tortue marine de passage.",
  },
  de: {
    topLabel: "Schnorcheln - Riffe",
    kicker: "Lagunen und Korallenriffe",
    titleMain: "Wo man schnorchelt",
    titleAccent: "auf Mauritius",
    intro: "Neun der klarsten Lagunen und Riffe der Insel - von flachen Buchten fur Einsteiger bis zu abgelegenen Inseln voller Korallen und tropischer Fische.",
    regions: { North: "Norden", "West & South-West": "Westen und Sudwesten", "East & South": "Osten und Suden" },
    tipLabel: "Tipp",
    spots: {
      "Blue Bay Marine Park": { name: "Meerespark Blue Bay", tag: "Meerespark", region: "Suden", description: "Klares, geschutztes Wasser mit reichen Korallen und tropischen Fischen.", tip: "Fur alle Niveaus - Glasbodenboot-Touren verfugbar." },
      "Ile aux Cerfs": { name: "Ile aux Cerfs", tag: "Insellagune", region: "Osten", description: "Eine kristallklare Lagune, die per Boot erreicht wird.", tip: "In den meisten Katamaran-Tagesausflugen enthalten." },
      "Le Morne Brabant": { name: "Le Morne Brabant", tag: "Ruhige Lagune", region: "Sudwesten", description: "Flache, ruhige Lagune mit Korallen unterhalb des Berges.", tip: "Ruhiger als der Norden; mit Strandzeit kombinieren." },
      "Flic en Flac": { name: "Flic en Flac", tag: "Kustenriff", region: "Westen", description: "Ein Riff nur wenige Schwimmminuten vom Ufer entfernt, leicht erreichbar.", tip: "Sehr gut fur Einsteiger - fruh vor dem Wind gehen." },
      "Belle Mare": { name: "Belle Mare", tag: "Verstecktes Riff", region: "Osten", description: "Ruhige Lagune an der Ostkuste mit stillen, versteckten Riffen.", tip: "Friedlich und wenig besucht - ideal fur entspanntes Schwimmen." },
      "Bel Ombre": { name: "Bel Ombre", tag: "Unberuhrte Kuste", region: "Suden", description: "Unberuhrte Sudkuste mit guter Meereswelt.", tip: "Weniger voll und authentisch; ruhiges, klares Wasser." },
      "Balaclava Marine Park": { name: "Meerespark Balaclava", tag: "Meerespark", region: "Nordwesten", description: "Gute Korallenformationen mit einfachem Zugang vom Ufer.", tip: "Weniger bekannt - praktisch von Hotels im Nordwesten." },
      "Coin de Mire": { name: "Coin de Mire", tag: "Vorgelagerte Insel", region: "Norden", description: "Unglaublich klares Wasser und vielfaltiges Meeresleben.", tip: "Nur per Boot erreichbar - nehmen Sie an einer gefuhrten Tour teil." },
      "Ile Plate (Flat Island)": { name: "Ile Plate", tag: "Abgelegene Insel", region: "Norden", description: "Abgelegenes, unberuhrtes und aussergewohnlich klares Korallenrevier.", tip: "Ganztagige Bootstour; am besten bei ruhiger See." },
    },
    smartTitle: "Klug schnorcheln",
    smartTips: [
      { title: "Beste Saison", text: "Oktober bis April bringt warmeres Wasser und ruhigere See; fruh starten fur klare Sicht." },
      { title: "Riff-Etikette", text: "Korallen und Meeresleben nie beruehren; nur riffsichere Sonnencreme verwenden." },
      { title: "Gut vorbereitet", text: "Flossen erleichtern die Bewegung; Wetter und Meer vor dem Start prufen." },
    ],
    finalNote: "Achten Sie auf Papageifische, Kaiserfische und Clownfische - und mit Gluck auf eine vorbeiziehende Meeresschildkrote.",
  },
  it: {
    topLabel: "Snorkeling - reef",
    kicker: "Lagune e reef corallini",
    titleMain: "Dove fare snorkeling",
    titleAccent: "a Mauritius",
    intro: "Nove tra le lagune e i reef piu limpidi dell'isola - da baie basse per principianti a isolotti remoti pieni di coralli e pesci tropicali.",
    regions: { North: "Nord", "West & South-West": "Ovest e Sud-Ovest", "East & South": "Est e Sud" },
    tipLabel: "Consiglio",
    spots: {
      "Blue Bay Marine Park": { name: "Parco marino di Blue Bay", tag: "Parco marino", region: "Sud", description: "Acqua limpida e protetta con coralli ricchi e pesci tropicali.", tip: "Tutti i livelli - disponibili tour in barca dal fondo di vetro." },
      "Ile aux Cerfs": { name: "Ile aux Cerfs", tag: "Laguna d'isola", region: "Est", description: "Una laguna cristallina raggiungibile in barca.", tip: "Inclusa nella maggior parte delle escursioni giornaliere in catamarano." },
      "Le Morne Brabant": { name: "Le Morne Brabant", tag: "Laguna calma", region: "Sud-Ovest", description: "Laguna bassa e tranquilla con coralli sotto la montagna.", tip: "Piu tranquilla del nord; abbinala al relax in spiaggia." },
      "Flic en Flac": { name: "Flic en Flac", tag: "Reef da riva", region: "Ovest", description: "Un reef a pochi minuti a nuoto dalla riva, con accesso facile.", tip: "Ottimo per principianti - vai presto prima del vento." },
      "Belle Mare": { name: "Belle Mare", tag: "Reef nascosto", region: "Est", description: "Laguna calma della costa est con reef tranquilli e nascosti.", tip: "Pacifica e poco affollata - ideale per una nuotata rilassata." },
      "Bel Ombre": { name: "Bel Ombre", tag: "Costa incontaminata", region: "Sud", description: "Costa sud incontaminata con buona vita marina.", tip: "Meno affollata e autentica; acqua calma e limpida." },
      "Balaclava Marine Park": { name: "Parco marino di Balaclava", tag: "Parco marino", region: "Nord-Ovest", description: "Buone formazioni coralline con facile accesso dalla riva.", tip: "Meno conosciuto - comodo dagli hotel del nord-ovest." },
      "Coin de Mire": { name: "Coin de Mire", tag: "Isolotto al largo", region: "Nord", description: "Acqua incredibilmente limpida e vita marina varia.", tip: "Accesso solo in barca - partecipa a un'escursione guidata." },
      "Ile Plate (Flat Island)": { name: "Ile Plate", tag: "Isolotto remoto", region: "Nord", description: "Corallo remoto, intatto ed eccezionalmente limpido.", tip: "Gita in barca di un giorno; meglio con mare calmo." },
    },
    smartTitle: "Snorkeling intelligente",
    smartTips: [
      { title: "Stagione migliore", text: "Da ottobre ad aprile l'acqua e piu calda e il mare piu calmo; parti presto per maggiore limpidezza." },
      { title: "Rispetto del reef", text: "Non toccare mai coralli o vita marina; usa solo crema solare reef-safe." },
      { title: "Preparati bene", text: "Indossa pinne per muoverti facilmente; controlla meteo e mare prima di partire." },
    ],
    finalNote: "Cerca pesci pappagallo, pesci angelo e pesci pagliaccio - e, con fortuna, una tartaruga marina di passaggio.",
  },
  es: {
    topLabel: "Snorkel - arrecifes",
    kicker: "Lagunas y arrecifes de coral",
    titleMain: "Donde hacer snorkel",
    titleAccent: "en Mauricio",
    intro: "Nueve de las lagunas y arrecifes mas claros de la isla - desde bahias poco profundas para principiantes hasta islotes remotos llenos de coral y peces tropicales.",
    regions: { North: "Norte", "West & South-West": "Oeste y Suroeste", "East & South": "Este y Sur" },
    tipLabel: "Consejo",
    spots: {
      "Blue Bay Marine Park": { name: "Parque marino de Blue Bay", tag: "Parque marino", region: "Sur", description: "Agua clara y protegida con coral abundante y peces tropicales.", tip: "Todos los niveles - hay tours en barco con fondo de cristal." },
      "Ile aux Cerfs": { name: "Ile aux Cerfs", tag: "Laguna de isla", region: "Este", description: "Una laguna cristalina a la que se llega en barco.", tip: "Incluida en la mayoria de excursiones de dia en catamaran." },
      "Le Morne Brabant": { name: "Le Morne Brabant", tag: "Laguna tranquila", region: "Suroeste", description: "Laguna poco profunda y tranquila con coral bajo la montana.", tip: "Mas tranquila que el norte; combinala con tiempo de playa." },
      "Flic en Flac": { name: "Flic en Flac", tag: "Arrecife desde la orilla", region: "Oeste", description: "Un arrecife a pocos minutos nadando desde la costa, con acceso facil.", tip: "Genial para principiantes - ve temprano antes del viento." },
      "Belle Mare": { name: "Belle Mare", tag: "Arrecife escondido", region: "Este", description: "Laguna tranquila de la costa este con arrecifes calmados y escondidos.", tip: "Pacifico y poco concurrido - ideal para nadar relajado." },
      "Bel Ombre": { name: "Bel Ombre", tag: "Costa intacta", region: "Sur", description: "Costa sur intacta con buena vida marina.", tip: "Menos concurrido y autentico; agua tranquila y clara." },
      "Balaclava Marine Park": { name: "Parque marino de Balaclava", tag: "Parque marino", region: "Noroeste", description: "Buenas formaciones coralinas con facil acceso desde la orilla.", tip: "Menos conocido - practico desde hoteles del noroeste." },
      "Coin de Mire": { name: "Coin de Mire", tag: "Islote frente a la costa", region: "Norte", description: "Agua increiblemente clara y vida marina diversa.", tip: "Solo acceso en barco - unete a una excursion guiada." },
      "Ile Plate (Flat Island)": { name: "Ile Plate", tag: "Islote remoto", region: "Norte", description: "Coral remoto, intacto y excepcionalmente claro.", tip: "Excursion de dia completo en barco; mejor con mar tranquilo." },
    },
    smartTitle: "Snorkel inteligente",
    smartTips: [
      { title: "Mejor temporada", text: "De octubre a abril hay agua mas calida y mar mas tranquilo; sal temprano para mejor visibilidad." },
      { title: "Respeto al arrecife", text: "Nunca toques coral ni vida marina; usa solo protector solar apto para arrecifes." },
      { title: "Ve preparado", text: "Usa aletas para moverte facilmente; revisa el tiempo y el mar antes de ir." },
    ],
    finalNote: "Busca peces loro, peces angel y peces payaso - y, con suerte, una tortuga marina de paso.",
  },
  ru: {
    topLabel: "Снорклинг - рифы",
    kicker: "Лагуны и коралловые рифы",
    titleMain: "Где заниматься снорклингом",
    titleAccent: "на Маврикии",
    intro: "Девять самых чистых лагун и рифов острова - от мелких бухт для новичков до удаленных островков с кораллами и тропическими рыбами.",
    regions: { North: "Север", "West & South-West": "Запад и юго-запад", "East & South": "Восток и юг" },
    tipLabel: "Совет",
    spots: {
      "Blue Bay Marine Park": { name: "Морской парк Блю-Бэй", tag: "Морской парк", region: "Юг", description: "Чистая защищенная вода с богатыми кораллами и тропическими рыбами.", tip: "Для всех уровней - доступны туры на лодке со стеклянным дном." },
      "Ile aux Cerfs": { name: "Иль-о-Серф", tag: "Островная лагуна", region: "Восток", description: "Кристально чистая лагуна, куда добираются на лодке.", tip: "Входит в большинство дневных экскурсий на катамаране." },
      "Le Morne Brabant": { name: "Ле-Морн-Брабант", tag: "Спокойная лагуна", region: "Юго-запад", description: "Мелкая спокойная лагуна с кораллами у подножия горы.", tip: "Тише, чем на севере; совместите с отдыхом на пляже." },
      "Flic en Flac": { name: "Флик-ан-Флак", tag: "Риф у берега", region: "Запад", description: "Риф в нескольких минутах плавания от берега, с легким доступом.", tip: "Отлично для новичков; идите рано, до ветра." },
      "Belle Mare": { name: "Бель-Мар", tag: "Скрытый риф", region: "Восток", description: "Спокойная лагуна восточного побережья с тихими скрытыми рифами.", tip: "Спокойно и немноголюдно, идеально для расслабленного плавания." },
      "Bel Ombre": { name: "Бель-Омбр", tag: "Нетронутое побережье", region: "Юг", description: "Нетронутое южное побережье с хорошей морской жизнью.", tip: "Менее людно и аутентично; спокойная чистая вода." },
      "Balaclava Marine Park": { name: "Морской парк Балаклава", tag: "Морской парк", region: "Северо-запад", description: "Хорошие коралловые образования с легким доступом с берега.", tip: "Менее известное место, удобно от отелей северо-запада." },
      "Coin de Mire": { name: "Куэн-де-Мир", tag: "Островок у берега", region: "Север", description: "Невероятно чистая вода и разнообразная морская жизнь.", tip: "Доступ только на лодке; присоединяйтесь к экскурсии с гидом." },
      "Ile Plate (Flat Island)": { name: "Иль-Плат", tag: "Удаленный островок", region: "Север", description: "Удаленные, нетронутые и исключительно чистые кораллы.", tip: "Поездка на лодке на целый день; лучше при спокойном море." },
    },
    smartTitle: "Снорклинг с умом",
    smartTips: [
      { title: "Лучший сезон", text: "С октября по апрель вода теплее, а море спокойнее; выезжайте рано ради прозрачности." },
      { title: "Этикет на рифе", text: "Никогда не трогайте кораллы и морскую жизнь; используйте только безопасный для рифов солнцезащитный крем." },
      { title: "Подготовьтесь", text: "Наденьте ласты для легкого движения; проверьте погоду и море перед поездкой." },
    ],
    finalNote: "Ищите рыб-попугаев, рыб-ангелов и рыб-клоунов, а если повезет - проплывающую морскую черепаху.",
  },
};

function getSnorkelPageCopy(locale: string) {
  return SNORKEL_PAGE_COPY[locale as SupportedSnorkelLocale];
}

export default async function WhereToSnorkelnMauritiusPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const activeLocale = normalizeLocale(locale);
  const copy = getSnorkelPageCopy(activeLocale);
  return localizeStaticPage(
    <main id="main-content" className="min-h-screen bg-white text-[#1c2a2e]">
      <Navbar />
      <article className="mx-auto w-full max-w-6xl pt-24 pb-10 sm:px-6 lg:pt-28">
        <header>
          <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] font-semibold uppercase tracking-wide text-[#ec5f25]">
            <div></div>
            <p>{copy?.topLabel ?? "Snorkel - Reefs"}</p>
          </div>

          <p className="mt-7 text-xs font-bold uppercase tracking-wide text-[#f16522]">
            {copy?.kicker ?? "Lagoons & Coral Reefs"}
          </p>
          <h1 className="mt-2 font-serif text-[clamp(2.1rem,5vw,3.55rem)] font-bold leading-tight tracking-tight text-[#151f2b]">
            {copy?.titleMain ?? "Where to Snorkel"}{" "}
            <span className="font-normal italic text-[#f16522]">
              {copy?.titleAccent ?? "in Mauritius"}
            </span>
          </h1>
          <p className="mt-4 max-w-4xl font-serif text-sm italic leading-relaxed text-[#6f7e88] sm:text-base">
            {copy?.intro ??
              "Nine of the island's clearest lagoons and reefs - from shallow beginner bays to remote offshore islets teeming with coral and tropical fish."}
          </p>

          <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-xs text-[#445465]">
            {snorkelRegions.map(([label, color]) => (
              <span key={label} className="inline-flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: color }}
                />
                {copy?.regions[label] ?? label}
              </span>
            ))}
          </div>
        </header>

        <section className="mt-6 grid gap-3 md:grid-cols-2">
          {snorkelSpots.map((spot) => {
            const SpotIcon = spot.icon;
            const style = snorkelRegionStyles[spot.type];
            const href = snorkelSpotLinks[spot.name];
            const translatedSpot = copy?.spots[spot.name];
            const cardClassName =
              "flex gap-4 rounded-md border border-[#e7dfd6] bg-white px-4 py-4 shadow-[0_2px_7px_rgba(36,54,67,.035)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(36,54,67,.08)] sm:gap-5 sm:px-5";
            const cardContent = (
              <>
                <span
                  className="mt-1 grid h-12 w-12 shrink-0 place-items-center rounded-full"
                  style={{ backgroundColor: style.bg, color: style.color }}
                >
                  <SpotIcon className="h-6 w-6" strokeWidth={1.8} />
                </span>
                <div className="min-w-0">
                  <h2 className="font-serif text-lg font-bold leading-tight text-[#152738] sm:text-xl">
                    {translatedSpot?.name ?? spot.name}
                  </h2>
                  <p
                    className="mt-1 text-[10px] font-bold uppercase tracking-wide"
                    style={{ color: style.color }}
                  >
                    {translatedSpot?.tag ?? spot.tag}{" "}
                    <span className="normal-case tracking-normal text-[#8a9398]">
                      - {translatedSpot?.region ?? spot.region}
                    </span>
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-[#61707a] sm:text-sm">
                    {translatedSpot?.description ?? spot.description}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-[#61707a] sm:text-sm">
                    <strong className="font-serif text-[#f16522]">
                      {copy?.tipLabel ?? "Tip"}
                    </strong>{" "}
                    {translatedSpot?.tip ?? spot.tip}
                  </p>
                </div>
              </>
            );

            return href ? (
              <Link
                key={spot.name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={cardClassName}
              >
                {cardContent}
              </Link>
            ) : (
              <section key={spot.name} className={cardClassName}>
                {cardContent}
              </section>
            );
          })}
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
                <span className="relative block aspect-[1200/260] w-full">
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
        <section className="mt-8 rounded-md bg-[#f5f2ef] px-5 py-6 sm:px-7">
          <h2 className="font-serif text-xl font-bold text-[#f16522]">
            {copy?.smartTitle ?? "Snorkel smart"}
          </h2>
          <div className="mt-4 grid gap-5 md:grid-cols-3">
            {snorkelTips.map(({ title, text, icon: Icon }, index) => {
              const translatedTip = copy?.smartTips[index];

              return (
              <div key={title} className="flex items-start gap-3">
                <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full  text-[#2389c9]">
                  <Icon className="h-6 w-6" strokeWidth={1.9} />
                </span>
                <div>
                  <p className="text-sm leading-relaxed text-[#61707a] ">
                    <strong className="font-serif text-[#1d3144]">
                      {translatedTip?.title ?? title}
                    </strong>
                  </p>
                  <p className="text-xs">{translatedTip?.text ?? text}</p>
                </div>
              </div>
              );
            })}
          </div>
          <p className="mt-5 font-serif text-sm italic leading-6 text-[#77848e]">
            {copy?.finalNote ??
              "Look for parrotfish, angelfish and clownfish - and, if you're lucky, a passing sea turtle."}
          </p>
        </section>
      </article>
      <CarRentalAdBannerInfo />
      <PopularRoadTrips locale={activeLocale} />

      <Footer />
    </main>,
    activeLocale,
  );
}
