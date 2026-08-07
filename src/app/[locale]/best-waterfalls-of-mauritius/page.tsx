import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PopularRoadTrips from "@/components/PopularRoadTrips";
import { Link } from "@/i18n/navigation";
import { normalizeLocale } from "@/i18n/routing";
import type { LucideIcon } from "lucide-react";
import { CloudRain, Droplets, Landmark, ShieldCheck } from "lucide-react";
import CarRentalAdBanner from "@/components/CarRentalAdBanner";
import PocketAdBanner from "@/components/PocketAdBanner";
import { localizeStaticPage } from "@/lib/static-page-localizer";

export const revalidate = 3600;

type Locale = "en" | "fr" | "de" | "it" | "es" | "ru";
type AccessKey = "viewpoint" | "hike" | "boat";

type Waterfall = {
  name: string;
  tag: string;
  region: string;
  description: string;
  tip: string;
  access: AccessKey;
  featured?: boolean;
};

type WaterfallRow = [
  name: string,
  tag: string,
  region: string,
  description: string,
  tip: string,
  access: AccessKey,
  featured?: boolean,
];

type WaterfallsCopy = {
  metadata: Metadata;
  kicker: string;
  titleMain: string;
  titleAccent: string;
  intro: string;
  accessTypes: Record<AccessKey, string>;
  goLabel: string;
  waterfalls: Waterfall[];
  adviceTitle: string;
  advice: Array<{ icon: LucideIcon; title: string; text: string }>;
  note: string;
};

const accessColors: Record<AccessKey, string> = {
  viewpoint: "#2f8e48",
  hike: "#f16522",
  boat: "#2389c9",
};

const accessStyles: Record<AccessKey, { color: string; bg: string }> = {
  viewpoint: { color: "#2f8e48", bg: "#edf8ef" },
  hike: { color: "#f16522", bg: "#fff0e7" },
  boat: { color: "#2389c9", bg: "#eaf7ff" },
};

const waterfallLinks = [
  "/best-places-to-visit-in-mauritius/chamarel-waterfall",
  "/best-places-to-visit-in-mauritius/seven-waterfall",
  "/best-places-to-visit-in-mauritius/rochester-falls",
  "/best-places-to-visit-in-mauritius/eau-bleu-waterfall-mauritius-exact-location",
  "/best-places-to-visit-in-mauritius/alexandra-falls",
  "/best-places-to-visit-in-mauritius/grse-waterfall",
  "/best-places-to-visit-in-mauritius/cascade-leon",
  "/best-places-to-visit-in-mauritius/500-feet-waterfall",
  "/best-places-to-visit-in-mauritius/cascade-mamzelle-mauritius",
  "/top-activities-mauritius/underwater-waterfall",
] as const;

const makeWaterfalls = (rows: WaterfallRow[]): Waterfall[] =>
  rows.map(([name, tag, region, description, tip, access, featured]) => ({
    name,
    tag,
    region,
    description,
    tip,
    access,
    featured: Boolean(featured),
  }));

const WATERFALL_COPY: Record<Locale, WaterfallsCopy> = {
  en: {
    metadata: {
      title: "Best Waterfalls of Mauritius",
      description:
        "The best waterfalls in Mauritius - from Chamarel and Tamarind Falls to hidden forest cascades. Where to find them, how to get there and when to go.",
      alternates: { canonical: "/best-waterfalls-of-mauritius" },
    },
    kicker: "Forests, Gorges & Cascades",
    titleMain: "The Best Waterfalls",
    titleAccent: "of Mauritius",
    intro:
      "Beyond the beaches - turquoise pools, forest cascades and the island's tallest drops, from easy viewpoints to wild adventure hikes.",
    accessTypes: {
      viewpoint: "Roadside viewpoint",
      hike: "Hike to reach",
      boat: "Boat or air",
    },
    goLabel: "Go",
    waterfalls: makeWaterfalls([
      [
        "Chamarel Waterfall",
        "Highest Fall",
        "Chamarel - SW",
        "The island's tallest drop (~80 m) through tropical forest.",
        "Easy viewpoint platform; superb for photos.",
        "viewpoint",
      ],
      [
        "Tamarind Falls (7 Cascades)",
        "Seven Cascades",
        "Black River",
        "Seven falls hidden in a valley; three are easily reached.",
        "Guided hike with wild swimming pools.",
        "hike",
      ],
      [
        "Rochester Falls",
        "Rock Columns",
        "Souillac - South",
        "Water fans over striking rectangular rock formations.",
        "Short rough track; local guides on site.",
        "hike",
      ],
      [
        "Eau Bleu - Cascade La Source",
        "Blue Water",
        "South",
        "Faint turquoise water tumbling across three levels.",
        "Tricky to reach - but worth the effort.",
        "hike",
      ],
      [
        "Alexandra Falls",
        "Forest Viewpoint",
        "Plaine Champagne",
        "A wispy fall framed by Black River Gorges scenery.",
        "Roadside viewpoint on the Gorge Table route.",
        "viewpoint",
      ],
      [
        "Grand River South East",
        "GRSE Falls",
        "East - by boat",
        "A coastal waterfall near Ile aux Cerfs, reached by water.",
        "Included in most catamaran day tours.",
        "boat",
      ],
      [
        "Cascade Leon",
        "Hidden Cascade",
        "near Chamarel",
        "A powerful cascade into a rocky, forest-ringed basin.",
        "Scenic hike; lesser-known & untouched.",
        "hike",
      ],
      [
        "Cascade 500 Feet",
        "Dramatic Drop",
        "Chamarel",
        "A spectacular high fall set in wild, rugged country.",
        "Adventure hike through a rugged valley.",
        "hike",
      ],
      [
        "Cascades Mamzel",
        "Natural Pools",
        "South",
        "A secluded gem - raw beauty and quiet natural pools.",
        "Scenic hike; far from the tourist route.",
        "hike",
      ],
      [
        "Underwater Waterfall",
        "Bonus - Illusion",
        "Le Morne",
        "An optical illusion of sand & currents off Le Morne.",
        "Seen only by helicopter or seaplane.",
        "boat",
        true,
      ],
    ]),
    adviceTitle: "Chasing waterfalls",
    advice: [
      {
        icon: Droplets,
        title: "Wear grip",
        text: "Trails get muddy & slippery - bring proper shoes.",
      },
      {
        icon: CloudRain,
        title: "Go after rain",
        text: "Falls run fullest in the wetter months, roughly Dec-Apr.",
      },
      {
        icon: ShieldCheck,
        title: "Take a guide",
        text: "Hidden falls are easier - and safer - with a local guide.",
      },
    ],
    note: "Many of the finest falls are wild and unmarked - respect the forest and check conditions before you set off.",
  },
  fr: {
    metadata: {
      title: "Les meilleures cascades de Maurice",
      description:
        "Les meilleures cascades de Maurice - de Chamarel aux Sept Cascades et aux chutes cachées en forêt, avec accès, conseils et meilleur moment.",
      alternates: { canonical: "/best-waterfalls-of-mauritius" },
    },
    kicker: "Forêts, gorges et cascades",
    titleMain: "Les meilleures cascades",
    titleAccent: "de Maurice",
    intro:
      "Au-delà des plages - bassins turquoise, cascades forestières et plus hautes chutes de l'île, des belvédères faciles aux randonnées sauvages.",
    accessTypes: {
      viewpoint: "Point de vue en bord de route",
      hike: "À atteindre en randonnée",
      boat: "Bateau ou air",
    },
    goLabel: "Y aller",
    waterfalls: makeWaterfalls([
      [
        "Cascade de Chamarel",
        "Plus haute chute",
        "Chamarel - Sud-Ouest",
        "La plus haute chute de l'île (~80 m) au cœur de la forêt tropicale.",
        "Plateforme facile d'accès; superbe pour les photos.",
        "viewpoint",
      ],
      [
        "Sept Cascades de Tamarin",
        "Sept cascades",
        "Rivière Noire",
        "Sept chutes cachées dans une vallée; trois sont faciles à atteindre.",
        "Randonnée guidée avec bassins naturels pour se baigner.",
        "hike",
      ],
      [
        "Rochester Falls",
        "Colonnes rocheuses",
        "Souillac - Sud",
        "L'eau s'évente sur de remarquables formations rocheuses rectangulaires.",
        "Court chemin accidenté; guides locaux sur place.",
        "hike",
      ],
      [
        "Eau Bleue - Cascade La Source",
        "Eau bleue",
        "Sud",
        "Une eau turquoise pâle descend sur trois niveaux.",
        "Accès délicat, mais l'effort vaut le détour.",
        "hike",
      ],
      [
        "Cascade Alexandra",
        "Belvédère forestier",
        "Plaine Champagne",
        "Une chute fine encadrée par les paysages des Gorges de Rivière Noire.",
        "Point de vue en bord de route sur la route de Gorge Table.",
        "viewpoint",
      ],
      [
        "Grande Rivière Sud-Est",
        "Cascade GRSE",
        "Est - en bateau",
        "Une cascade côtière près de l'Île aux Cerfs, accessible par l'eau.",
        "Incluse dans la plupart des sorties catamaran à la journée.",
        "boat",
      ],
      [
        "Cascade Léon",
        "Cascade cachée",
        "près de Chamarel",
        "Une cascade puissante dans un bassin rocheux entouré de forêt.",
        "Randonnée panoramique; moins connue et préservée.",
        "hike",
      ],
      [
        "Cascade 500 Pieds",
        "Chute spectaculaire",
        "Chamarel",
        "Une haute chute spectaculaire dans un paysage sauvage et accidenté.",
        "Randonnée d'aventure dans une vallée escarpée.",
        "hike",
      ],
      [
        "Cascades Mamzel",
        "Bassins naturels",
        "Sud",
        "Un joyau isolé - beauté brute et bassins naturels paisibles.",
        "Randonnée panoramique loin de la route touristique.",
        "hike",
      ],
      [
        "Cascade sous-marine",
        "Bonus - illusion",
        "Le Morne",
        "Une illusion optique de sable et de courants au large du Morne.",
        "Visible seulement en hélicoptère ou en hydravion.",
        "boat",
        true,
      ],
    ]),
    adviceTitle: "À la poursuite des cascades",
    advice: [
      {
        icon: Droplets,
        title: "Portez des chaussures adhérentes",
        text: "Les sentiers deviennent boueux et glissants - prenez de vraies chaussures.",
      },
      {
        icon: CloudRain,
        title: "Allez après la pluie",
        text: "Les cascades sont plus fortes pendant les mois humides, environ de décembre à avril.",
      },
      {
        icon: ShieldCheck,
        title: "Prenez un guide",
        text: "Les cascades cachées sont plus faciles - et plus sûres - avec un guide local.",
      },
    ],
    note: "Beaucoup des plus belles cascades sont sauvages et non balisées - respectez la forêt et vérifiez les conditions avant de partir.",
  },
  de: {
    metadata: {
      title: "Die besten Wasserfälle auf Mauritius",
      description:
        "Die besten Wasserfälle auf Mauritius - von Chamarel und Tamarind Falls bis zu versteckten Waldkaskaden, mit Zugang, Tipps und bester Zeit.",
      alternates: { canonical: "/best-waterfalls-of-mauritius" },
    },
    kicker: "Wälder, Schluchten und Wasserfälle",
    titleMain: "Die besten Wasserfälle",
    titleAccent: "auf Mauritius",
    intro:
      "Jenseits der Strände - türkisfarbene Becken, Waldkaskaden und die höchsten Fälle der Insel, von einfachen Aussichtspunkten bis zu wilden Abenteuertouren.",
    accessTypes: {
      viewpoint: "Aussichtspunkt an der Straße",
      hike: "Nur per Wanderung",
      boat: "Boot oder Luft",
    },
    goLabel: "Hin",
    waterfalls: makeWaterfalls([
      [
        "Chamarel-Wasserfall",
        "Höchster Fall",
        "Chamarel - Südwesten",
        "Der höchste Wasserfall der Insel (~80 m) in tropischem Wald.",
        "Einfacher Aussichtspunkt; hervorragend für Fotos.",
        "viewpoint",
      ],
      [
        "Tamarin-Wasserfälle (7 Kaskaden)",
        "Sieben Kaskaden",
        "Schwarzer Fluss",
        "Sieben versteckte Fälle in einem Tal; drei sind leicht erreichbar.",
        "Geführte Wanderung mit wilden Badebecken.",
        "hike",
      ],
      [
        "Rochester Falls",
        "Felsensäulen",
        "Souillac - Süden",
        "Wasser fächert über markante rechteckige Felsformationen.",
        "Kurzer rauer Weg; lokale Guides vor Ort.",
        "hike",
      ],
      [
        "Eau Bleu - Cascade La Source",
        "Blaues Wasser",
        "Süden",
        "Blass türkisfarbenes Wasser fällt über drei Ebenen.",
        "Schwer zu erreichen, aber die Mühe lohnt sich.",
        "hike",
      ],
      [
        "Alexandra Falls",
        "Wald-Aussichtspunkt",
        "Plaine Champagne",
        "Ein feiner Fall vor der Kulisse der Black-River-Schluchten.",
        "Aussichtspunkt an der Straße auf der Gorge-Table-Route.",
        "viewpoint",
      ],
      [
        "Grand River South East",
        "GRSE-Fälle",
        "Osten - per Boot",
        "Ein Küstenwasserfall nahe Île aux Cerfs, erreichbar vom Wasser.",
        "In den meisten Katamaran-Tagestouren enthalten.",
        "boat",
      ],
      [
        "Cascade Léon",
        "Versteckte Kaskade",
        "nahe Chamarel",
        "Ein kräftiger Wasserfall in einem felsigen, waldumschlossenen Becken.",
        "Schöne Wanderung; weniger bekannt und unberührt.",
        "hike",
      ],
      [
        "Cascade 500 Pieds",
        "Dramatischer Fall",
        "Chamarel",
        "Ein spektakulärer hoher Fall in wilder, rauer Landschaft.",
        "Abenteuerwanderung durch ein raues Tal.",
        "hike",
      ],
      [
        "Cascades Mamzel",
        "Natürliche Becken",
        "Süden",
        "Ein abgeschiedenes Juwel - rohe Schönheit und stille Naturbecken.",
        "Schöne Wanderung abseits der Touristenroute.",
        "hike",
      ],
      [
        "Unterwasser-Wasserfall",
        "Bonus - Illusion",
        "Le Morne",
        "Eine optische Illusion aus Sand und Strömungen vor Le Morne.",
        "Nur per Helikopter oder Wasserflugzeug zu sehen.",
        "boat",
        true,
      ],
    ]),
    adviceTitle: "Wasserfälle entdecken",
    advice: [
      {
        icon: Droplets,
        title: "Rutschfest gehen",
        text: "Wege werden matschig und glatt - gute Schuhe mitnehmen.",
      },
      {
        icon: CloudRain,
        title: "Nach Regen gehen",
        text: "In den feuchteren Monaten, etwa Dez-Apr, führen die Fälle am meisten Wasser.",
      },
      {
        icon: ShieldCheck,
        title: "Guide nehmen",
        text: "Versteckte Fälle sind mit lokalem Guide einfacher und sicherer.",
      },
    ],
    note: "Viele der schönsten Fälle sind wild und unmarkiert - respektiere den Wald und prüfe die Bedingungen vor dem Start.",
  },
  it: {
    metadata: {
      title: "Le migliori cascate di Mauritius",
      description:
        "Le migliori cascate di Mauritius - da Chamarel e Tamarind Falls alle cascate nascoste nella foresta, con accesso, consigli e periodo migliore.",
      alternates: { canonical: "/best-waterfalls-of-mauritius" },
    },
    kicker: "Foreste, gole e cascate",
    titleMain: "Le migliori cascate",
    titleAccent: "di Mauritius",
    intro:
      "Oltre le spiagge - piscine turchesi, cascate nella foresta e i salti più alti dell'isola, da punti panoramici facili a trekking selvaggi.",
    accessTypes: {
      viewpoint: "Belvedere su strada",
      hike: "Da raggiungere a piedi",
      boat: "Barca o aereo",
    },
    goLabel: "Vai",
    waterfalls: makeWaterfalls([
      [
        "Cascata di Chamarel",
        "Salto più alto",
        "Chamarel - Sud-ovest",
        "Il salto più alto dell'isola (~80 m) nella foresta tropicale.",
        "Piattaforma panoramica facile; perfetta per foto.",
        "viewpoint",
      ],
      [
        "Cascate di Tamarin (7 Cascate)",
        "Sette cascate",
        "Fiume Nero",
        "Sette cascate nascoste in una valle; tre sono facili da raggiungere.",
        "Trekking guidato con piscine naturali.",
        "hike",
      ],
      [
        "Rochester Falls",
        "Colonne rocciose",
        "Souillac - Sud",
        "L'acqua scorre su spettacolari formazioni rocciose rettangolari.",
        "Breve pista accidentata; guide locali sul posto.",
        "hike",
      ],
      [
        "Eau Bleu - Cascade La Source",
        "Acqua blu",
        "Sud",
        "Acqua turchese tenue che scende su tre livelli.",
        "Difficile da raggiungere, ma ne vale la pena.",
        "hike",
      ],
      [
        "Alexandra Falls",
        "Belvedere forestale",
        "Plaine Champagne",
        "Una cascata sottile incorniciata dalle gole del Fiume Nero.",
        "Belvedere su strada lungo la Gorge Table route.",
        "viewpoint",
      ],
      [
        "Grand River South East",
        "Cascate GRSE",
        "Est - in barca",
        "Una cascata costiera vicino a Île aux Cerfs, raggiungibile dall'acqua.",
        "Inclusa nella maggior parte dei tour giornalieri in catamarano.",
        "boat",
      ],
      [
        "Cascade Léon",
        "Cascata nascosta",
        "vicino a Chamarel",
        "Una cascata potente in un bacino roccioso circondato dalla foresta.",
        "Trekking panoramico; meno nota e intatta.",
        "hike",
      ],
      [
        "Cascade 500 Pieds",
        "Salto spettacolare",
        "Chamarel",
        "Un'alta cascata spettacolare in un paesaggio selvaggio e ruvido.",
        "Trekking avventuroso in una valle aspra.",
        "hike",
      ],
      [
        "Cascades Mamzel",
        "Piscine naturali",
        "Sud",
        "Un gioiello isolato - bellezza grezza e calme piscine naturali.",
        "Trekking panoramico lontano dai percorsi turistici.",
        "hike",
      ],
      [
        "Cascata sottomarina",
        "Bonus - illusione",
        "Le Morne",
        "Un'illusione ottica di sabbia e correnti al largo di Le Morne.",
        "Visibile solo in elicottero o idrovolante.",
        "boat",
        true,
      ],
    ]),
    adviceTitle: "A caccia di cascate",
    advice: [
      {
        icon: Droplets,
        title: "Usa scarpe aderenti",
        text: "I sentieri diventano fangosi e scivolosi - porta scarpe adatte.",
      },
      {
        icon: CloudRain,
        title: "Vai dopo la pioggia",
        text: "Le cascate sono più piene nei mesi umidi, circa dic-apr.",
      },
      {
        icon: ShieldCheck,
        title: "Prendi una guida",
        text: "Le cascate nascoste sono più facili e sicure con una guida locale.",
      },
    ],
    note: "Molte delle cascate migliori sono selvagge e non segnalate - rispetta la foresta e controlla le condizioni prima di partire.",
  },
  es: {
    metadata: {
      title: "Las mejores cascadas de Mauricio",
      description:
        "Las mejores cascadas de Mauricio - de Chamarel y Tamarind Falls a cascadas escondidas en el bosque, con acceso, consejos y mejor momento.",
      alternates: { canonical: "/best-waterfalls-of-mauritius" },
    },
    kicker: "Bosques, gargantas y cascadas",
    titleMain: "Las mejores cascadas",
    titleAccent: "de Mauricio",
    intro:
      "Más allá de las playas - piscinas turquesas, cascadas de bosque y los saltos más altos de la isla, desde miradores fáciles hasta caminatas salvajes.",
    accessTypes: {
      viewpoint: "Mirador junto a la carretera",
      hike: "Llegar caminando",
      boat: "Barco o aire",
    },
    goLabel: "Ir",
    waterfalls: makeWaterfalls([
      [
        "Cascada de Chamarel",
        "Salto más alto",
        "Chamarel - Suroeste",
        "La caída más alta de la isla (~80 m) entre bosque tropical.",
        "Plataforma de mirador fácil; excelente para fotos.",
        "viewpoint",
      ],
      [
        "Cascadas de Tamarin (7 Cascadas)",
        "Siete cascadas",
        "Río Negro",
        "Siete cascadas escondidas en un valle; tres son fáciles de alcanzar.",
        "Caminata guiada con piscinas naturales.",
        "hike",
      ],
      [
        "Rochester Falls",
        "Columnas rocosas",
        "Souillac - Sur",
        "El agua cae sobre llamativas formaciones rocosas rectangulares.",
        "Pista corta y áspera; guías locales en el lugar.",
        "hike",
      ],
      [
        "Eau Bleu - Cascade La Source",
        "Agua azul",
        "Sur",
        "Agua turquesa pálida que desciende por tres niveles.",
        "Difícil de alcanzar, pero vale la pena.",
        "hike",
      ],
      [
        "Alexandra Falls",
        "Mirador forestal",
        "Plaine Champagne",
        "Una cascada fina enmarcada por el paisaje de las Gargantas del Río Negro.",
        "Mirador junto a la carretera en la ruta Gorge Table.",
        "viewpoint",
      ],
      [
        "Grand River South East",
        "Cascadas GRSE",
        "Este - en barco",
        "Una cascada costera cerca de Île aux Cerfs, alcanzada por agua.",
        "Incluida en la mayoría de los tours diarios en catamarán.",
        "boat",
      ],
      [
        "Cascade Léon",
        "Cascada escondida",
        "cerca de Chamarel",
        "Una cascada poderosa en una poza rocosa rodeada de bosque.",
        "Caminata panorámica; menos conocida e intacta.",
        "hike",
      ],
      [
        "Cascade 500 Pieds",
        "Caída dramática",
        "Chamarel",
        "Una cascada alta y espectacular en un paisaje salvaje y accidentado.",
        "Caminata de aventura por un valle escarpado.",
        "hike",
      ],
      [
        "Cascades Mamzel",
        "Piscinas naturales",
        "Sur",
        "Una joya aislada - belleza pura y piscinas naturales tranquilas.",
        "Caminata panorámica lejos de la ruta turística.",
        "hike",
      ],
      [
        "Cascada submarina",
        "Bonus - ilusión",
        "Le Morne",
        "Una ilusión óptica de arena y corrientes frente a Le Morne.",
        "Visible solo en helicóptero o hidroavión.",
        "boat",
        true,
      ],
    ]),
    adviceTitle: "Persiguiendo cascadas",
    advice: [
      {
        icon: Droplets,
        title: "Usa agarre",
        text: "Los senderos se vuelven fangosos y resbaladizos - lleva calzado adecuado.",
      },
      {
        icon: CloudRain,
        title: "Ve después de la lluvia",
        text: "Las cascadas llevan más agua en los meses húmedos, aprox. dic-abr.",
      },
      {
        icon: ShieldCheck,
        title: "Lleva guía",
        text: "Las cascadas escondidas son más fáciles y seguras con un guía local.",
      },
    ],
    note: "Muchas de las mejores cascadas son salvajes y sin señalizar - respeta el bosque y revisa las condiciones antes de salir.",
  },
  ru: {
    metadata: {
      title: "Лучшие водопады Маврикия",
      description:
        "Лучшие водопады Маврикия - от Шамарель и Тамарин до скрытых лесных каскадов, с доступом, советами и лучшим временем.",
      alternates: { canonical: "/best-waterfalls-of-mauritius" },
    },
    kicker: "Леса, ущелья и водопады",
    titleMain: "Лучшие водопады",
    titleAccent: "Маврикия",
    intro:
      "За пределами пляжей - бирюзовые бассейны, лесные каскады и самые высокие водопады острова: от простых смотровых до диких походов.",
    accessTypes: {
      viewpoint: "Смотровая у дороги",
      hike: "Дойти пешком",
      boat: "Лодка или воздух",
    },
    goLabel: "Как добраться",
    waterfalls: makeWaterfalls([
      [
        "Водопад Шамарель",
        "Самый высокий водопад",
        "Шамарель - юго-запад",
        "Самый высокий перепад острова (~80 м) в тропическом лесу.",
        "Простая смотровая площадка; отлично для фото.",
        "viewpoint",
      ],
      [
        "Водопады Тамарин (7 каскадов)",
        "Семь каскадов",
        "Блэк-Ривер",
        "Семь водопадов спрятаны в долине; до трех легко добраться.",
        "Поход с гидом и природными бассейнами.",
        "hike",
      ],
      [
        "Рочестер-Фолс",
        "Скальные колонны",
        "Суйяк - юг",
        "Вода веером падает по выразительным прямоугольным скалам.",
        "Короткая неровная дорога; местные гиды на месте.",
        "hike",
      ],
      [
        "О-Блё - Cascade La Source",
        "Голубая вода",
        "Юг",
        "Бледно-бирюзовая вода спускается по трем уровням.",
        "Добраться непросто, но оно того стоит.",
        "hike",
      ],
      [
        "Водопад Александра",
        "Лесная смотровая",
        "Плен-Шампань",
        "Тонкий водопад на фоне пейзажей ущелий Блэк-Ривер.",
        "Смотровая у дороги на маршруте Gorge Table.",
        "viewpoint",
      ],
      [
        "Гранд-Ривер-Саут-Ист",
        "Водопады GRSE",
        "Восток - на лодке",
        "Прибрежный водопад рядом с Île aux Cerfs, доступный по воде.",
        "Входит в большинство дневных туров на катамаране.",
        "boat",
      ],
      [
        "Каскад Леон",
        "Скрытый каскад",
        "рядом с Шамарель",
        "Мощный водопад в скальном бассейне, окруженном лесом.",
        "Живописный поход; место менее известное и нетронутое.",
        "hike",
      ],
      [
        "Каскад 500 футов",
        "Драматический перепад",
        "Шамарель",
        "Зрелищный высокий водопад в дикой, суровой местности.",
        "Приключенческий поход через суровую долину.",
        "hike",
      ],
      [
        "Каскады Мамзель",
        "Природные бассейны",
        "Юг",
        "Уединенная жемчужина - дикая красота и тихие природные бассейны.",
        "Живописный поход вдали от туристического маршрута.",
        "hike",
      ],
      [
        "Подводный водопад",
        "Бонус - иллюзия",
        "Ле-Морн",
        "Оптическая иллюзия из песка и течений у Ле-Морна.",
        "Видно только с вертолета или гидросамолета.",
        "boat",
        true,
      ],
    ]),
    adviceTitle: "В погоне за водопадами",
    advice: [
      {
        icon: Droplets,
        title: "Нужна цепкая обувь",
        text: "Тропы бывают грязными и скользкими - берите подходящую обувь.",
      },
      {
        icon: CloudRain,
        title: "Идите после дождя",
        text: "Водопады полнее во влажные месяцы, примерно дек-апр.",
      },
      {
        icon: ShieldCheck,
        title: "Берите гида",
        text: "К скрытым водопадам проще и безопаснее идти с местным гидом.",
      },
    ],
    note: "Многие лучшие водопады дикие и не размечены - уважайте лес и проверяйте условия перед выходом.",
  },
};

function getCopy(locale: string): WaterfallsCopy {
  return WATERFALL_COPY[normalizeLocale(locale) as Locale];
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

export default async function BestWaterfallsOfMauritiusPage({
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

        <section className="mt-4">
          <div className="grid max-w-xl grid-cols-1 gap-2 text-xs text-[#44525a] sm:grid-cols-3">
            {(Object.keys(copy.accessTypes) as AccessKey[]).map((access) => (
              <div key={access} className="flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: accessColors[access] }}
                />
                <span>{copy.accessTypes[access]}</span>
              </div>
            ))}
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {copy.waterfalls.map((waterfall, index) => {
              const style = accessStyles[waterfall.access];
              const href = waterfallLinks[index];

              return (
                <section
                  key={waterfall.name}
                  className="flex gap-4 rounded-md border bg-white px-4 py-4 shadow-[0_2px_7px_rgba(36,54,67,.035)] sm:gap-5 sm:px-5"
                  style={{
                    borderColor: waterfall.featured ? "#2389c9" : "#e7dfd6",
                    boxShadow: waterfall.featured
                      ? "0 0 0 1px rgba(35,137,201,.85)"
                      : undefined,
                  }}
                >
                  <span
                    className="mt-1 grid h-12 w-12 shrink-0 place-items-center rounded-full"
                    style={{ backgroundColor: style.bg, color: style.color }}
                  >
                    <Landmark className="h-6 w-6" strokeWidth={1.8} />
                  </span>
                  <div className="min-w-0">
                    <h2 className="font-serif text-base font-bold leading-tight text-[#152738] sm:text-lg">
                      <Link
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition hover:text-[#f16522]"
                      >
                        {waterfall.name}
                      </Link>
                    </h2>
                    <p
                      className="mt-1 text-[10px] font-bold uppercase tracking-wide"
                      style={{ color: style.color }}
                    >
                      {waterfall.tag}{" "}
                      <span className="normal-case tracking-normal text-[#8a9398]">
                        - {waterfall.region}
                      </span>
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-[#61707a] sm:text-sm">
                      {waterfall.description}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-[#61707a] sm:text-sm">
                      <strong className="font-serif text-[#f16522]">
                        {copy.goLabel}
                      </strong>{" "}
                      {waterfall.tip}
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

      <PopularRoadTrips locale={activeLocale} />
      <PocketAdBanner />
      <Footer />
    </main>
  ), activeLocale);
}
