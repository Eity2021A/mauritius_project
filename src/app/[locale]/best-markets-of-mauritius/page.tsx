import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PopularRoadTrips from "@/components/PopularRoadTrips";
import { Link } from "@/i18n/navigation";
import { normalizeLocale } from "@/i18n/routing";
import type { LucideIcon } from "lucide-react";
import { Gem, Shirt, ShoppingBag, Store, Utensils } from "lucide-react";
import CarRentalAdBanner from "@/components/CarRentalAdBanner";
import PocketAdBanner from "@/components/PocketAdBanner";
import { localizeStaticPage } from "@/lib/static-page-localizer";

export const revalidate = 3600;

type Locale = "en" | "fr" | "de" | "it" | "es" | "ru";

type Market = {
  name: string;
  type: string;
  location: string;
  buy: string;
  tip: string;
  icon: LucideIcon;
  color: string;
  bg: string;
};

type MarketsPageCopy = {
  metadata: Metadata;
  kicker: string;
  titleMain: string;
  titleAccent: string;
  intro: string;
  buyLabel: string;
  tipLabel: string;
  markets: Market[];
  localTitle: string;
  localTips: Array<[string, string]>;
  note: string;
};

const marketStyles = [
  { icon: Utensils, color: "#2389c9", bg: "#eaf7ff" },
  { icon: Gem, color: "#f16522", bg: "#fff0e7" },
  { icon: ShoppingBag, color: "#2f8e48", bg: "#edf8ef" },
  { icon: Shirt, color: "#f16522", bg: "#fff0e7" },
  { icon: ShoppingBag, color: "#2f8e48", bg: "#edf8ef" },
  { icon: Store, color: "#2389c9", bg: "#eaf7ff" },
] as const;

const marketLinks = [
  "https://maps.app.goo.gl/RMKWD3q1BURH9kDM6",
  "https://maps.app.goo.gl/z8WJmZnHyQ7UAKZk9",
  "https://maps.app.goo.gl/oSrBhBNbTQrkrkn17",
  "https://maps.app.goo.gl/LxjkYWSjJ3wk5Ue99",
  "https://maps.app.goo.gl/c7aN5jsyhuN2eTho8",
  "https://maps.app.goo.gl/1inH4uYcU96YsAYL8",
] as const;

const makeMarkets = (
  markets: Array<Omit<Market, "icon" | "color" | "bg">>,
): Market[] =>
  markets.map((market, index) => ({
    ...market,
    icon: marketStyles[index].icon,
    color: marketStyles[index].color,
    bg: marketStyles[index].bg,
  }));

const MARKETS_COPY: Record<Locale, MarketsPageCopy> = {
  en: {
    metadata: {
      title: "Best Markets in Mauritius",
      description:
        "The best markets in Mauritius - food, spices, crafts and street eats. Explore Port Louis, Flacq and Quatre Bornes, plus tips for bargaining like a local.",
      alternates: { canonical: "/best-markets-of-mauritius" },
    },
    kicker: "Markets & Bazaars",
    titleMain: "The Best Markets",
    titleAccent: "of Mauritius",
    intro:
      "Six markets where the island's real rhythm lives - food, spice, crafts and textiles, and the gentle art of a friendly bargain.",
    buyLabel: "Buy",
    tipLabel: "Tip",
    markets: makeMarkets([
      {
        name: "Central Market",
        type: "Traditional Market",
        location: "Port Louis",
        buy: "Street food, produce, spices, tropical fruit & souvenirs - try dholl puri, gateau piment & alouda.",
        tip: "Go in the morning - bring cash & keep belongings close.",
      },
      {
        name: "Marché artisanal du Caudan",
        type: "Craft Market",
        location: "Caudan Waterfront",
        buy: "Handmade souvenirs, woodcarvings, jewelry, textiles, model ships & local art.",
        tip: "Calmer & curated - cafes and parking right nearby.",
      },
      {
        name: "Flacq Market",
        type: "Traditional Market",
        location: "Central Flacq - East",
        buy: "One of the island's biggest - fruit, veg, clothes, textiles, snacks & spices.",
        tip: "Go early - bring cash - wear comfortable shoes.",
      },
      {
        name: "Quatre Bornes Market Fair",
        type: "Textile Market",
        location: "Quatre Bornes - Centre",
        buy: "Fabrics, clothes, table linen, bags & shoes - the island's textile bargain hub.",
        tip: "Bargain politely - check length for textile days.",
      },
      {
        name: "Mahebourg Market",
        type: "Local Market",
        location: "Mahebourg - South-East",
        buy: "Local food, produce, textiles & small souvenirs in a slower, traditional setting.",
        tip: "Pair with the waterfront, museum & Blue Bay.",
      },
      {
        name: "Grand Baie Bazaar",
        type: "Tourist Bazaar",
        location: "Grand Baie - North",
        buy: "Beachwear, bags, hats, dresses, jewelry & handicrafts, handy for the resorts.",
        tip: "Compare prices - don't rush into the first shop.",
      },
    ]),
    localTitle: "Shop the markets like a local",
    localTips: [
      ["Bring", "Cash, a reusable bag, comfy shoes and a sun hat."],
      [
        "Bargain kindly",
        "Keep it friendly, and ask before photographing people.",
      ],
      [
        "Best buys",
        "Spices, vanilla, tea, jewelry, woodcarvings, model ships & textiles.",
      ],
      [
        "Eat well",
        "Pick busy stalls; ask before the chilli - dholl puri, samosas & biryani.",
      ],
    ],
    note: "Keep valuables close, go with curiosity rather than urgency - the browsing is half the fun.",
  },
  fr: {
    metadata: {
      title: "Les meilleurs marchés de Maurice",
      description:
        "Les meilleurs marchés de Maurice - cuisine de rue, épices, artisanat et textiles à Port-Louis, Flacq, Quatre Bornes et Grand Baie, avec conseils pour marchander.",
      alternates: { canonical: "/best-markets-of-mauritius" },
    },
    kicker: "Marchés et bazars",
    titleMain: "Les meilleurs marchés",
    titleAccent: "de Maurice",
    intro:
      "Six marchés où bat le vrai rythme de l'île - cuisine, épices, artisanat, textiles et l'art doux d'une négociation amicale.",
    buyLabel: "Acheter",
    tipLabel: "Conseil",
    markets: makeMarkets([
      {
        name: "Marché Central",
        type: "Marché traditionnel",
        location: "Port-Louis",
        buy: "Cuisine de rue, produits frais, épices, fruits tropicaux et souvenirs - goûtez le dholl puri, le gâteau piment et l'alouda.",
        tip: "Allez le matin - prenez du liquide et gardez vos affaires près de vous.",
      },
      {
        name: "Marché artisanal du Caudan",
        type: "Marché artisanal",
        location: "Front de mer du Caudan",
        buy: "Souvenirs faits main, sculptures sur bois, bijoux, textiles, maquettes de bateaux et art local.",
        tip: "Plus calme et sélectionné - cafés et parking juste à côté.",
      },
      {
        name: "Marché de Flacq",
        type: "Marché traditionnel",
        location: "Centre de Flacq - Est",
        buy: "L'un des plus grands marchés de l'île - fruits, légumes, vêtements, textiles, en-cas et épices.",
        tip: "Arrivez tôt - prenez du liquide - portez des chaussures confortables.",
      },
      {
        name: "Foire de Quatre Bornes",
        type: "Marché textile",
        location: "Quatre Bornes - Centre",
        buy: "Tissus, vêtements, linge de table, sacs et chaussures - le grand repaire textile de l'île.",
        tip: "Marchandez avec le sourire - vérifiez les jours dédiés aux textiles.",
      },
      {
        name: "Marché de Mahébourg",
        type: "Marché local",
        location: "Mahébourg - Sud-Est",
        buy: "Cuisine locale, produits frais, textiles et petits souvenirs dans une ambiance traditionnelle plus lente.",
        tip: "Combinez avec le front de mer, le musée et Blue Bay.",
      },
      {
        name: "Bazar de Grand Baie",
        type: "Bazar touristique",
        location: "Grand Baie - Nord",
        buy: "Tenues de plage, sacs, chapeaux, robes, bijoux et artisanat, pratique près des hôtels de plage.",
        tip: "Comparez les prix - ne vous précipitez pas dans la première boutique.",
      },
    ]),
    localTitle: "Faire les marchés comme un local",
    localTips: [
      [
        "À emporter",
        "Du liquide, un sac réutilisable, des chaussures confortables et un chapeau.",
      ],
      [
        "Marchandez gentiment",
        "Restez amical et demandez avant de photographier les gens.",
      ],
      [
        "Meilleurs achats",
        "Épices, vanille, thé, bijoux, sculptures sur bois, maquettes de bateaux et textiles.",
      ],
      [
        "Bien manger",
        "Choisissez les stands fréquentés; demandez avant le piment - dholl puri, samoussas et biryani.",
      ],
    ],
    note: "Gardez vos objets de valeur près de vous et prenez le temps d'observer - flâner fait partie du plaisir.",
  },
  de: {
    metadata: {
      title: "Die besten Märkte auf Mauritius",
      description:
        "Die besten Märkte auf Mauritius - Essen, Gewürze, Handwerk und Textilien in Port Louis, Flacq, Quatre Bornes und Grand Baie, mit Tipps zum Feilschen.",
      alternates: { canonical: "/best-markets-of-mauritius" },
    },
    kicker: "Märkte und Basare",
    titleMain: "Die besten Märkte",
    titleAccent: "auf Mauritius",
    intro:
      "Sechs Märkte, auf denen der echte Rhythmus der Insel lebt - Essen, Gewürze, Kunsthandwerk, Textilien und freundliches Feilschen.",
    buyLabel: "Kaufen",
    tipLabel: "Tipp",
    markets: makeMarkets([
      {
        name: "Zentralmarkt",
        type: "Traditioneller Markt",
        location: "Port Louis",
        buy: "Straßenessen, frische Produkte, Gewürze, tropische Früchte und Souvenirs - probiere Dholl Puri, Gateau Piment und Alouda.",
        tip: "Am besten morgens gehen - Bargeld mitnehmen und Wertsachen nah bei dir tragen.",
      },
      {
        name: "Caudan-Kunsthandwerksmarkt",
        type: "Handwerksmarkt",
        location: "Caudan-Uferpromenade",
        buy: "Handgemachte Souvenirs, Holzschnitzereien, Schmuck, Textilien, Modellschiffe und lokale Kunst.",
        tip: "Ruhiger und kuratiert - Cafes und Parkplätze liegen direkt daneben.",
      },
      {
        name: "Flacq-Markt",
        type: "Traditioneller Markt",
        location: "Zentral-Flacq - Osten",
        buy: "Einer der größten Märkte der Insel - Obst, Gemüse, Kleidung, Textilien, Snacks und Gewürze.",
        tip: "Früh kommen - Bargeld mitnehmen - bequeme Schuhe tragen.",
      },
      {
        name: "Quatre-Bornes-Marktmesse",
        type: "Textilmarkt",
        location: "Quatre Bornes - Zentrum",
        buy: "Stoffe, Kleidung, Tischwäsche, Taschen und Schuhe - der Textil-Schnäppchenhub der Insel.",
        tip: "Höflich feilschen - prüfe die passenden Textiltage.",
      },
      {
        name: "Mahebourg-Markt",
        type: "Lokaler Markt",
        location: "Mahébourg - Südosten",
        buy: "Lokales Essen, Gemüse, Textilien und kleine Souvenirs in einer langsameren, traditionellen Atmosphäre.",
        tip: "Mit Uferpromenade, Museum und Blue Bay kombinieren.",
      },
      {
        name: "Grand-Baie-Basar",
        type: "Touristenbasar",
        location: "Grand Baie - Norden",
        buy: "Strandmode, Taschen, Hüte, Kleider, Schmuck und Handwerk, praktisch für die Resorts.",
        tip: "Preise vergleichen - nicht gleich im ersten Laden kaufen.",
      },
    ]),
    localTitle: "Wie ein Einheimischer einkaufen",
    localTips: [
      [
        "Mitnehmen",
        "Bargeld, wiederverwendbare Tasche, bequeme Schuhe und Sonnenhut.",
      ],
      [
        "Freundlich feilschen",
        "Bleib freundlich und frage, bevor du Menschen fotografierst.",
      ],
      [
        "Beste Käufe",
        "Gewürze, Vanille, Tee, Schmuck, Holzarbeiten, Modellschiffe und Textilien.",
      ],
      [
        "Gut essen",
        "Nimm belebte Stände; vor Chili nachfragen - Dholl Puri, Samosas und Biryani.",
      ],
    ],
    note: "Wertsachen nah bei dir behalten und mit Neugier statt Eile gehen - Stöbern ist der halbe Spaß.",
  },
  it: {
    metadata: {
      title: "I migliori mercati di Mauritius",
      description:
        "I migliori mercati di Mauritius - cibo, spezie, artigianato e tessuti a Port Louis, Flacq, Quatre Bornes e Grand Baie, con consigli per contrattare.",
      alternates: { canonical: "/best-markets-of-mauritius" },
    },
    kicker: "Mercati e bazar",
    titleMain: "I migliori mercati",
    titleAccent: "di Mauritius",
    intro:
      "Sei mercati dove vive il ritmo più autentico dell'isola - cibo, spezie, artigianato, tessuti e il piacere di una trattativa gentile.",
    buyLabel: "Compra",
    tipLabel: "Consiglio",
    markets: makeMarkets([
      {
        name: "Mercato Centrale",
        type: "Mercato tradizionale",
        location: "Port Louis",
        buy: "Cibo di strada, prodotti freschi, spezie, frutta tropicale e souvenir - prova dholl puri, gateau piment e alouda.",
        tip: "Vai al mattino - porta contanti e tieni vicini gli effetti personali.",
      },
      {
        name: "Mercato artigianale del Caudan",
        type: "Mercato artigianale",
        location: "Lungomare del Caudan",
        buy: "Souvenir fatti a mano, intagli in legno, gioielli, tessuti, modellini di navi e arte locale.",
        tip: "Più calmo e curato - caffè e parcheggio sono molto vicini.",
      },
      {
        name: "Mercato di Flacq",
        type: "Mercato tradizionale",
        location: "Flacq centrale - Est",
        buy: "Uno dei mercati più grandi dell'isola - frutta, verdura, vestiti, tessuti, spuntini e spezie.",
        tip: "Vai presto - porta contanti - indossa scarpe comode.",
      },
      {
        name: "Fiera di Quatre Bornes",
        type: "Mercato tessile",
        location: "Quatre Bornes - Centro",
        buy: "Tessuti, abiti, tovaglie, borse e scarpe - il centro delle occasioni tessili dell'isola.",
        tip: "Contratta con gentilezza - controlla i giorni dedicati ai tessuti.",
      },
      {
        name: "Mercato di Mahebourg",
        type: "Mercato locale",
        location: "Mahébourg - Sud-est",
        buy: "Cibo locale, prodotti freschi, tessuti e piccoli souvenir in un ambiente tradizionale più lento.",
        tip: "Abbinalo al lungomare, al museo e a Blue Bay.",
      },
      {
        name: "Bazar di Grand Baie",
        type: "Bazar turistico",
        location: "Grand Baie - Nord",
        buy: "Abbigliamento da spiaggia, borse, cappelli, vestiti, gioielli e artigianato, comodo per i resort.",
        tip: "Confronta i prezzi - non entrare subito nel primo negozio.",
      },
    ]),
    localTitle: "Fare shopping nei mercati come un locale",
    localTips: [
      [
        "Porta",
        "Contanti, una borsa riutilizzabile, scarpe comode e un cappello.",
      ],
      [
        "Contratta con gentilezza",
        "Sii amichevole e chiedi prima di fotografare le persone.",
      ],
      [
        "Acquisti migliori",
        "Spezie, vaniglia, tè, gioielli, intagli in legno, modellini di navi e tessuti.",
      ],
      [
        "Mangia bene",
        "Scegli banchi frequentati; chiedi prima del peperoncino - dholl puri, samosa e biryani.",
      ],
    ],
    note: "Tieni vicini gli oggetti di valore e vai con curiosità, non con fretta - curiosare è metà del divertimento.",
  },
  es: {
    metadata: {
      title: "Los mejores mercados de Mauricio",
      description:
        "Los mejores mercados de Mauricio - comida, especias, artesanía y textiles en Port Louis, Flacq, Quatre Bornes y Grand Baie, con consejos para regatear.",
      alternates: { canonical: "/best-markets-of-mauritius" },
    },
    kicker: "Mercados y bazares",
    titleMain: "Los mejores mercados",
    titleAccent: "de Mauricio",
    intro:
      "Seis mercados donde vive el ritmo real de la isla - comida, especias, artesanía, textiles y el arte amable de regatear.",
    buyLabel: "Compra",
    tipLabel: "Consejo",
    markets: makeMarkets([
      {
        name: "Mercado Central",
        type: "Mercado tradicional",
        location: "Port Louis",
        buy: "Comida callejera, productos frescos, especias, fruta tropical y recuerdos - prueba dholl puri, gateau piment y alouda.",
        tip: "Ve por la mañana - lleva efectivo y mantén tus pertenencias cerca.",
      },
      {
        name: "Mercado de artesanías de Le Caudan",
        type: "Mercado artesanal",
        location: "Paseo marítimo de Caudan",
        buy: "Recuerdos hechos a mano, tallas de madera, joyería, textiles, maquetas de barcos y arte local.",
        tip: "Más tranquilo y cuidado - cafés y aparcamiento justo al lado.",
      },
      {
        name: "Mercado de Flacq",
        type: "Mercado tradicional",
        location: "Flacq central - Este",
        buy: "Uno de los más grandes de la isla - fruta, verdura, ropa, textiles, aperitivos y especias.",
        tip: "Ve temprano - lleva efectivo - usa calzado cómodo.",
      },
      {
        name: "Feria de Quatre Bornes",
        type: "Mercado textil",
        location: "Quatre Bornes - Centro",
        buy: "Telas, ropa, mantelería, bolsos y zapatos - el centro de gangas textiles de la isla.",
        tip: "Regatea con educación - revisa los días dedicados a textiles.",
      },
      {
        name: "Mercado de Mahebourg",
        type: "Mercado local",
        location: "Mahébourg - Sureste",
        buy: "Comida local, productos frescos, textiles y pequeños recuerdos en un ambiente tradicional más pausado.",
        tip: "Combínalo con el paseo marítimo, el museo y Blue Bay.",
      },
      {
        name: "Bazar de Grand Baie",
        type: "Bazar turístico",
        location: "Grand Baie - Norte",
        buy: "Ropa de playa, bolsos, sombreros, vestidos, joyas y artesanía, cómodo para quienes se alojan en hoteles de playa.",
        tip: "Compara precios - no compres en la primera tienda sin mirar.",
      },
    ]),
    localTitle: "Compra en los mercados como un local",
    localTips: [
      [
        "Lleva",
        "Efectivo, una bolsa reutilizable, zapatos cómodos y sombrero para el sol.",
      ],
      [
        "Regatea con amabilidad",
        "Mantén un tono amable y pregunta antes de fotografiar personas.",
      ],
      [
        "Mejores compras",
        "Especias, vainilla, té, joyas, tallas de madera, maquetas de barcos y textiles.",
      ],
      [
        "Come bien",
        "Elige puestos con movimiento; pregunta por el picante - dholl puri, samosas y biryani.",
      ],
    ],
    note: "Mantén tus objetos de valor cerca y ve con curiosidad, no con prisa - mirar es la mitad de la diversión.",
  },
  ru: {
    metadata: {
      title: "Лучшие рынки Маврикия",
      description:
        "Лучшие рынки Маврикия - еда, специи, ремесла и текстиль в Порт-Луи, Флак, Катр-Борн и Гранд-Бэ, с советами по торгу.",
      alternates: { canonical: "/best-markets-of-mauritius" },
    },
    kicker: "Рынки и базары",
    titleMain: "Лучшие рынки",
    titleAccent: "Маврикия",
    intro:
      "Шесть рынков, где живет настоящий ритм острова - еда, специи, ремесла, текстиль и мягкое искусство дружеского торга.",
    buyLabel: "Купить",
    tipLabel: "Совет",
    markets: makeMarkets([
      {
        name: "Центральный рынок",
        type: "Традиционный рынок",
        location: "Порт-Луи",
        buy: "Уличная еда, свежие продукты, специи, тропические фрукты и сувениры - попробуйте дхолл пури, гато пимент и алуду.",
        tip: "Идите утром - возьмите наличные и держите вещи рядом.",
      },
      {
        name: "Ремесленный рынок Caudan",
        type: "Ремесленный рынок",
        location: "набережная Caudan",
        buy: "Сувениры ручной работы, резьба по дереву, украшения, текстиль, модели кораблей и местное искусство.",
        tip: "Спокойнее и аккуратнее - кафе и парковка совсем рядом.",
      },
      {
        name: "Рынок Флак",
        type: "Традиционный рынок",
        location: "Центральный Флак - восток",
        buy: "Один из крупнейших рынков острова - фрукты, овощи, одежда, текстиль, закуски и специи.",
        tip: "Приходите рано - берите наличные - надевайте удобную обувь.",
      },
      {
        name: "Ярмарка Катр-Борн",
        type: "Текстильный рынок",
        location: "Катр-Борн - центр",
        buy: "Ткани, одежда, скатерти, сумки и обувь - главный текстильный рынок острова.",
        tip: "Торгуйтесь вежливо - уточняйте дни работы текстильной ярмарки.",
      },
      {
        name: "Рынок Маэбурга",
        type: "Местный рынок",
        location: "Маэбург - юго-восток",
        buy: "Местная еда, продукты, текстиль и небольшие сувениры в более спокойной традиционной атмосфере.",
        tip: "Совместите с набережной, музеем и Блю-Бэй.",
      },
      {
        name: "Базар Гранд-Бэ",
        type: "Туристический базар",
        location: "Гранд-Бэ - север",
        buy: "Пляжная одежда, сумки, шляпы, платья, украшения и ремесленные изделия, удобно рядом с курортами.",
        tip: "Сравнивайте цены - не спешите покупать в первой лавке.",
      },
    ]),
    localTitle: "Покупайте на рынках как местные",
    localTips: [
      [
        "Возьмите",
        "Наличные, многоразовую сумку, удобную обувь и солнцезащитную шляпу.",
      ],
      [
        "Торгуйтесь доброжелательно",
        "Будьте дружелюбны и спрашивайте разрешение перед фото людей.",
      ],
      [
        "Лучшие покупки",
        "Специи, ваниль, чай, украшения, резьба по дереву, модели кораблей и текстиль.",
      ],
      [
        "Ешьте там, где людно",
        "Выбирайте оживленные точки; уточняйте остроту - дхолл пури, самосы и бирьяни.",
      ],
    ],
    note: "Держите ценные вещи рядом и приходите с любопытством, а не в спешке - прогулка по рынку уже половина удовольствия.",
  },
};

function getCopy(locale: string): MarketsPageCopy {
  return MARKETS_COPY[normalizeLocale(locale) as Locale];
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

export default async function BestMarketsInMauritiusPage({
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

        <section className="mt-7 space-y-3">
          {copy.markets.map((market, index) => {
            const MarketIcon = market.icon;
            const href = marketLinks[index];

            return (
              <section
                key={market.name}
                className="flex gap-4 rounded-md border border-[#e7dfd6] bg-white px-4 py-4 shadow-[0_2px_7px_rgba(36,54,67,.035)] sm:gap-5 sm:px-5"
              >
                <span
                  className="mt-1 grid h-12 w-12 shrink-0 place-items-center rounded-full"
                  style={{ backgroundColor: market.bg, color: market.color }}
                >
                  <MarketIcon className="h-6 w-6" strokeWidth={1.8} />
                </span>
                <div className="min-w-0">
                  <h2 className="font-serif text-lg font-bold leading-tight text-[#152738] sm:text-xl">
                    <Link
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition hover:text-[#f16522]"
                    >
                      {market.name}
                    </Link>
                  </h2>
                  <p
                    className="mt-1 text-[10px] font-bold uppercase tracking-wide"
                    style={{ color: market.color }}
                  >
                    {market.type}{" "}
                    <span className="normal-case tracking-normal text-[#8a9398]">
                      - {market.location}
                    </span>
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-[#61707a] sm:text-sm">
                    <strong className="font-serif text-[#152738]">
                      {copy.buyLabel}
                    </strong>{" "}
                    {market.buy}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-[#61707a] sm:text-sm">
                    <strong className="font-serif text-[#f16522]">
                      {copy.tipLabel}
                    </strong>{" "}
                    {market.tip}
                  </p>
                </div>
              </section>
            );
          })}
        </section>
        <CarRentalAdBanner />
        <section className="mt-8 rounded-md bg-[#f5f2ef] px-5 py-5 sm:px-7">
          <h2 className="font-serif text-xl font-bold text-[#f16522]">
            {copy.localTitle}
          </h2>
          <div className="mt-3 grid gap-x-8 gap-y-2 md:grid-cols-2">
            {copy.localTips.map(([title, text]) => (
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
