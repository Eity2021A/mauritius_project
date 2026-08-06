import { ActivityCategory, PlaceCategory, BeachCategory, Region, REGION_COLORS, CATEGORY_COLORS, CATEGORY_LABELS } from "@/types/content";

type Category = ActivityCategory | PlaceCategory | BeachCategory | Region | string;

interface CategoryBadgesProps {
  categories: Category[];
  className?: string;
  locale?: string;
}

const LOCALIZED_CATEGORY_LABELS: Record<string, Record<string, string>> = {
  fr: {
    North: "Nord",
    South: "Sud",
    East: "Est",
    West: "Ouest",
    "North West": "Nord-ouest",
    "North East": "Nord-est",
    "South West": "Sud-ouest",
    "South East": "Sud-est",
    Central: "Centre",
    Rodrigues: "Rodrigues",
    Various: "Divers",
    all: "Tout",
    "best-seller": "Meilleure vente",
    adventure: "Aventure",
    air: "Air",
    land: "Terre",
    sea: "Mer",
    hiking: "Randonnée",
    unique: "Unique",
    nature: "Nature",
    waterfalls: "Cascades",
    discover: "Découvrir",
    hideaways: "Coins secrets",
    islands: "Îles",
    local: "Local",
    history: "Histoire",
    snorkeling: "Snorkeling",
    amenities: "Services",
    "family-friendly": "Famille",
    surfing: "Surf",
    secluded: "Isolé",
  },
  de: {
    North: "Norden",
    South: "Süden",
    East: "Osten",
    West: "Westen",
    "North West": "Nordwesten",
    "North East": "Nordosten",
    "South West": "Südwesten",
    "South East": "Südosten",
    Central: "Zentrum",
    Rodrigues: "Rodrigues",
    Various: "Verschiedenes",
    all: "Alle",
    "best-seller": "Bestseller",
    adventure: "Abenteuer",
    air: "Luft",
    land: "Land",
    sea: "Meer",
    hiking: "Wandern",
    unique: "Einzigartig",
    nature: "Natur",
    waterfalls: "Wasserfälle",
    discover: "Entdecken",
    hideaways: "Verstecke",
    islands: "Inseln",
    local: "Lokal",
    history: "Geschichte",
    snorkeling: "Schnorcheln",
    amenities: "Ausstattung",
    "family-friendly": "Familienfreundlich",
    surfing: "Surfen",
    secluded: "Abgelegen",
  },
  it: {
    North: "Nord",
    South: "Sud",
    East: "Est",
    West: "Ovest",
    "North West": "Nord-ovest",
    "North East": "Nord-est",
    "South West": "Sud-ovest",
    "South East": "Sud-est",
    Central: "Centro",
    Rodrigues: "Rodrigues",
    Various: "Vari",
    all: "Tutto",
    "best-seller": "Più venduto",
    adventure: "Avventura",
    air: "Aria",
    land: "Terra",
    sea: "Mare",
    hiking: "Trekking",
    unique: "Unico",
    nature: "Natura",
    waterfalls: "Cascate",
    discover: "Scoprire",
    hideaways: "Luoghi nascosti",
    islands: "Isole",
    local: "Locale",
    history: "Storia",
    snorkeling: "Snorkeling",
    amenities: "Servizi",
    "family-friendly": "Per famiglie",
    surfing: "Surf",
    secluded: "Appartato",
  },
  es: {
    North: "Norte",
    South: "Sur",
    East: "Este",
    West: "Oeste",
    "North West": "Noroeste",
    "North East": "Noreste",
    "South West": "Suroeste",
    "South East": "Sureste",
    Central: "Centro",
    Rodrigues: "Rodrigues",
    Various: "Varios",
    all: "Todo",
    "best-seller": "Más vendido",
    adventure: "Aventura",
    air: "Aire",
    land: "Tierra",
    sea: "Mar",
    hiking: "Senderismo",
    unique: "Único",
    nature: "Naturaleza",
    waterfalls: "Cascadas",
    discover: "Descubrir",
    hideaways: "Rincones secretos",
    islands: "Islas",
    local: "Local",
    history: "Historia",
    snorkeling: "Snorkel",
    amenities: "Servicios",
    "family-friendly": "Familias",
    surfing: "Surf",
    secluded: "Apartado",
  },
  ru: {
    North: "Север",
    South: "Юг",
    East: "Восток",
    West: "Запад",
    "North West": "Северо-запад",
    "North East": "Северо-восток",
    "South West": "Юго-запад",
    "South East": "Юго-восток",
    Central: "Центр",
    Rodrigues: "Родригес",
    Various: "Разное",
    all: "Все",
    "best-seller": "Хит продаж",
    adventure: "Приключения",
    air: "Воздух",
    land: "Земля",
    sea: "Море",
    hiking: "Хайкинг",
    unique: "Уникальное",
    nature: "Природа",
    waterfalls: "Водопады",
    discover: "Открытия",
    hideaways: "Скрытые места",
    islands: "Острова",
    local: "Местное",
    history: "История",
    snorkeling: "Снорклинг",
    amenities: "Удобства",
    "family-friendly": "Для семей",
    surfing: "Серфинг",
    secluded: "Уединенное",
  },
};

function getCategoryColor(category: string): string {
  const key = category.toLowerCase();
  return REGION_COLORS[key] ?? CATEGORY_COLORS[key] ?? "bg-gray-100 text-gray-700";
}

function getCategoryLabel(category: string, locale?: string): string {
  const localized = LOCALIZED_CATEGORY_LABELS[locale ?? ""]?.[category] ?? LOCALIZED_CATEGORY_LABELS[locale ?? ""]?.[category.toLowerCase()];
  if (localized) return localized;
  const key = category.toLowerCase();
  return CATEGORY_LABELS[key] ?? category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, " ");
}

export default function CategoryBadges({ categories, className = "", locale }: CategoryBadgesProps) {
  const visibleCategories = categories
    .map((category) => String(category).trim())
    .filter((category) => category && category !== "all");

  if (visibleCategories.length === 0) return null;

  return (
    <div className={`flex items-center gap-2 flex-wrap ${className}`}>
      {visibleCategories.map((category) => (
        <span
          key={category}
          className={`text-xs px-3 py-1 rounded-full font-medium ${getCategoryColor(category)}`}
        >
          {getCategoryLabel(category, locale)}
        </span>
      ))}
    </div>
  );
}
