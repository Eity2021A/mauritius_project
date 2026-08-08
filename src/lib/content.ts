/**
 * Content layer — fetches from Supabase at build time and maps responses
 * to the same TypeScript interfaces the frontend already uses.
 *
 * Fallback: if CONTENT_SUPABASE_URL is not set, delegates to static .ts files.
 */

import { contentDb } from "./supabase"

import type { Region, Coordinates, PlaceCategory, ActivityCategory, BeachCategory } from "@/types/content"

import type { Beach, TopBeach, BeachDetails } from "@/data/beaches"
import { type PlaceDetails, getAllPlaces as staticGetAllPlaces } from "@/data/place-details"
import { type Activity, type ActivityDetails, type PricingOption, ACTIVITIES as STATIC_ACTIVITIES, ACTIVITY_CATEGORIES as STATIC_ACTIVITY_CATEGORIES } from "@/data/activities"
import { type VerandaHotel, VERANDA_HOTELS as STATIC_VERANDA_HOTELS } from "@/data/veranda-hotels"
import type { BlogPost, BlogCategory } from "@/data/blog"
import { normalizeLocale } from "@/i18n/routing"

// Static fallbacks
import { BEACH_DETAILS as STATIC_BEACH_DETAILS, ALL_BEACHES as STATIC_ALL_BEACHES, TOP_BEACHES as STATIC_TOP_BEACHES, REGIONS as STATIC_REGIONS } from "@/data/beaches"
import { PLACE_DETAILS as STATIC_PLACE_DETAILS } from "@/data/place-details"
import { ACTIVITY_DETAILS as STATIC_ACTIVITY_DETAILS } from "@/data/activities"
import { BLOG_POSTS as STATIC_BLOG_POSTS, BLOG_CATEGORIES as STATIC_BLOG_CATEGORIES } from "@/data/blog"
import type { ExploreItem } from "@/data/explore"
import {
  topActivities as STATIC_TOP_ACTIVITIES,
  topBeaches as STATIC_TOP_BEACHES_EXPLORE,
  topPlaces as STATIC_TOP_PLACES,
  hiddenGems as STATIC_HIDDEN_GEMS,
} from "@/data/explore"

// ---- RPC response shape from Supabase ----
interface DbItemPayload {
  id: string
  slug: string
  type: string
  status: string
  region: { slug: string; label_en: string } | null
  address_text: string | null
  lat: number | null
  lng: number | null
  hero_image_path?: string | null
  booking_enabled: boolean
  booking_url: string | null
  difficulty: string | null
  duration_text: string | null
  best_time_text: string | null
  opening_hours_text: string | null
  admission_text: string | null
  snorkeling_available: boolean | null
  beach_amenities_available: boolean | null
  public_transport_available: boolean | null
  translation: {
    title: string
    quote: string | null
    description_richtext: string | null
  }
  media: { url: string; alt_text: string | null; sort_order: number; is_main: boolean; locale?: string | null }[]
  tips: { text: string; sort_order: number; locale?: string | null }[]
  highlights: { text: string; sort_order: number; locale?: string | null }[]
  includes: { label: string; sort_order: number; locale?: string | null }[]
  not_included: { label: string; sort_order: number; locale?: string | null }[]
  what_to_bring: { label: string; sort_order: number; locale?: string | null }[]
  hotels: { name: string; url: string | null; sort_order: number }[]
  pricing: { name: string; price_amount: number | null; currency: string | null; description: string | null }[]
  categories: { slug: string; label_en: string }[]
  related: { slug: string; type: string; title: string }[]
}

function regionLabelToType(label: string | undefined | null): Region {
  if (!label) return "Various"
  const map: Record<string, Region> = {
    north: "North", south: "South", east: "East", west: "West",
    "north-west": "North West", "north-east": "North East",
    "south-west": "South West", "south-east": "South East",
    central: "Central", rodrigues: "Rodrigues", various: "Various",
  }
  return map[label.toLowerCase().replace(/\s+/g, "-")] ?? "Various"
}

type ExploreLocale = "en" | "fr" | "de" | "it" | "es" | "ru"
type ExploreItemPatch = Partial<Pick<ExploreItem, "name" | "region" | "category">>

const EXPLORE_REGION_TRANSLATIONS: Record<Exclude<ExploreLocale, "en">, Record<string, string>> = {
  fr: {
    North: "Nord",
    South: "Sud",
    East: "Est",
    West: "Ouest",
    "North West": "Nord-Ouest",
    "South West": "Sud-Ouest",
    "South East": "Sud-Est",
    Various: "Plusieurs regions",
  },
  de: {
    North: "Norden",
    South: "Suden",
    East: "Osten",
    West: "Westen",
    "North West": "Nordwesten",
    "South West": "Sudwesten",
    "South East": "Sudosten",
    Various: "Verschiedene Regionen",
  },
  it: {
    North: "Nord",
    South: "Sud",
    East: "Est",
    West: "Ovest",
    "North West": "Nord-Ovest",
    "South West": "Sud-Ovest",
    "South East": "Sud-Est",
    Various: "Varie zone",
  },
  es: {
    North: "Norte",
    South: "Sur",
    East: "Este",
    West: "Oeste",
    "North West": "Noroeste",
    "South West": "Suroeste",
    "South East": "Sureste",
    Various: "Varias zonas",
  },
  ru: {
    North: "Север",
    South: "Юг",
    East: "Восток",
    West: "Запад",
    "North West": "Северо-запад",
    "South West": "Юго-запад",
    "South East": "Юго-восток",
    Various: "Разные районы",
  },
}

const EXPLORE_ITEM_TRANSLATIONS: Record<Exclude<ExploreLocale, "en">, Record<string, ExploreItemPatch>> = {
  fr: {
    "swim-with-dolphins": { name: "Nager avec les dauphins" },
    "catamaran-cruises": { name: "Croisieres en catamaran" },
    "helicopter-tour": { name: "Tour en helicoptere" },
    "hiking-le-morne": { name: "Randonnee au Morne" },
    "quad-biking": { name: "Quad" },
    "whale-watching": { name: "Observation des baleines" },
    "le-morne": { name: "Le Morne" },
    "trou-aux-biches": { name: "Trou aux Biches" },
    "belle-mare": { name: "Belle Mare" },
    "flic-en-flac": { name: "Flic en Flac" },
    "blue-bay": { name: "Blue Bay" },
    pereybere: { name: "Pereybere" },
    "chamarel-waterfall": { name: "Cascade de Chamarel" },
    "7-coloured-earth": { name: "Terre des Sept Couleurs" },
    "pamplemousses-botanical-garden": { name: "Jardin de Pamplemousses" },
    "black-river-gorges": { name: "Gorges de Riviere Noire" },
    "grand-bassin": { name: "Grand Bassin" },
    "cap-malheureux": { name: "Cap Malheureux" },
    "baie-de-jacotet": { category: "Plage cachee" },
    "butte-a-lherbe": { category: "Plage cachee" },
    "pointe-desny": { category: "Plage cachee" },
    riambel: { category: "Plage cachee" },
    "la-cambuse": { category: "Plage cachee" },
    albion: { category: "Plage cachee" },
  },
  de: {
    "swim-with-dolphins": { name: "Mit Delfinen schwimmen" },
    "catamaran-cruises": { name: "Katamaranfahrten" },
    "helicopter-tour": { name: "Hubschrauberrundflug" },
    "hiking-le-morne": { name: "Wanderung am Le Morne" },
    "quad-biking": { name: "Quadfahren" },
    "whale-watching": { name: "Walbeobachtung" },
    "chamarel-waterfall": { name: "Chamarel-Wasserfall" },
    "7-coloured-earth": { name: "Siebenfarbige Erde" },
    "pamplemousses-botanical-garden": { name: "Botanischer Garten Pamplemousses" },
    "black-river-gorges": { name: "Black-River-Schluchten" },
    "grand-bassin": { name: "Grand Bassin" },
    "baie-de-jacotet": { category: "Versteckter Strand" },
    "butte-a-lherbe": { category: "Versteckter Strand" },
    "pointe-desny": { category: "Versteckter Strand" },
    riambel: { category: "Versteckter Strand" },
    "la-cambuse": { category: "Versteckter Strand" },
    albion: { category: "Versteckter Strand" },
  },
  it: {
    "swim-with-dolphins": { name: "Nuotare con i delfini" },
    "catamaran-cruises": { name: "Crociere in catamarano" },
    "helicopter-tour": { name: "Tour in elicottero" },
    "hiking-le-morne": { name: "Escursione a Le Morne" },
    "quad-biking": { name: "Quad" },
    "whale-watching": { name: "Avvistamento balene" },
    "chamarel-waterfall": { name: "Cascata di Chamarel" },
    "7-coloured-earth": { name: "Terra dei Sette Colori" },
    "pamplemousses-botanical-garden": { name: "Giardino di Pamplemousses" },
    "black-river-gorges": { name: "Gole di Black River" },
    "grand-bassin": { name: "Grand Bassin" },
    "baie-de-jacotet": { category: "Spiaggia nascosta" },
    "butte-a-lherbe": { category: "Spiaggia nascosta" },
    "pointe-desny": { category: "Spiaggia nascosta" },
    riambel: { category: "Spiaggia nascosta" },
    "la-cambuse": { category: "Spiaggia nascosta" },
    albion: { category: "Spiaggia nascosta" },
  },
  es: {
    "swim-with-dolphins": { name: "Nadar con delfines" },
    "catamaran-cruises": { name: "Cruceros en catamaran" },
    "helicopter-tour": { name: "Tour en helicoptero" },
    "hiking-le-morne": { name: "Senderismo en Le Morne" },
    "quad-biking": { name: "Quad" },
    "whale-watching": { name: "Avistamiento de ballenas" },
    "chamarel-waterfall": { name: "Cascada de Chamarel" },
    "7-coloured-earth": { name: "Tierra de Siete Colores" },
    "pamplemousses-botanical-garden": { name: "Jardin de Pamplemousses" },
    "black-river-gorges": { name: "Gargantas de Black River" },
    "grand-bassin": { name: "Grand Bassin" },
    "baie-de-jacotet": { category: "Playa escondida" },
    "butte-a-lherbe": { category: "Playa escondida" },
    "pointe-desny": { category: "Playa escondida" },
    riambel: { category: "Playa escondida" },
    "la-cambuse": { category: "Playa escondida" },
    albion: { category: "Playa escondida" },
  },
  ru: {
    "swim-with-dolphins": { name: "Плавание с дельфинами" },
    "catamaran-cruises": { name: "Круизы на катамаране" },
    "helicopter-tour": { name: "Вертолетный тур" },
    "hiking-le-morne": { name: "Поход на Ле-Морн" },
    "quad-biking": { name: "Квадроциклы" },
    "whale-watching": { name: "Наблюдение за китами" },
    "le-morne": { name: "Ле-Морн" },
    "trou-aux-biches": { name: "Тру-о-Биш" },
    "belle-mare": { name: "Бель-Мар" },
    "flic-en-flac": { name: "Флик-ан-Флак" },
    "blue-bay": { name: "Блю-Бэй" },
    pereybere: { name: "Перейбер" },
    "chamarel-waterfall": { name: "Водопад Шамарель" },
    "7-coloured-earth": { name: "Семицветная земля" },
    "pamplemousses-botanical-garden": { name: "Сад Памплемус" },
    "black-river-gorges": { name: "Ущелья Блэк-Ривер" },
    "grand-bassin": { name: "Гран-Бассен" },
    "cap-malheureux": { name: "Кап-Малёрё" },
    "baie-de-jacotet": { category: "Скрытый пляж" },
    "butte-a-lherbe": { category: "Скрытый пляж" },
    "pointe-desny": { category: "Скрытый пляж" },
    riambel: { category: "Скрытый пляж" },
    "la-cambuse": { category: "Скрытый пляж" },
    albion: { category: "Скрытый пляж" },
  },
}

function localizeExploreItemFallback<T extends ExploreItem>(item: T, locale: string): T {
  const activeLocale = normalizeLocale(locale) as ExploreLocale
  if (activeLocale === "en") return item
  const itemPatch = EXPLORE_ITEM_TRANSLATIONS[activeLocale][item.slug] ?? {}
  const translatedRegion = EXPLORE_REGION_TRANSLATIONS[activeLocale][item.region]
  return {
    ...item,
    ...itemPatch,
    region: translatedRegion ?? itemPatch.region ?? item.region,
  }
}

function toCoords(lat: number | null, lng: number | null): Coordinates {
  return [lat ?? 0, lng ?? 0]
}

function sortByOrder<T extends { sort_order: number }>(arr: T[], getValue: (x: T) => string): string[] {
  return [...arr].sort((a, b) => a.sort_order - b.sort_order).map(getValue)
}

function sortedTexts(arr: { text: string; sort_order: number }[]): string[] {
  return sortByOrder(arr, (x) => x.text)
}

function scoreTextForLocale(value: string, locale: string): number {
  const text = ` ${value.toLowerCase()} `
  const markers: Record<string, RegExp[]> = {
    en: [
      /\b(the|and|with|for|from|to|in|on|of|or|at|by|your|you|this|that|local|public|travel)\b/g,
    ],
    fr: [
      /[àâçéèêëîïôûùüÿœ]/g,
      /\b(le|la|les|des|du|de|et|avec|pour|dans|sur|aux|une|un|vous|votre|visite|guide)\b/g,
    ],
    de: [
      /[äöüß]/g,
      /\b(der|die|das|und|mit|für|fuer|von|im|in|auf|eine|einer|den|dem|sie|ihre|besuch|reise)\b/g,
    ],
    it: [
      /[àèéìîòù]/g,
      /\b(il|lo|la|gli|le|di|del|della|e|con|per|nel|sul|una|un|tuo|visita|guida)\b/g,
    ],
    es: [
      /[áéíóúüñ¿¡]/g,
      /\b(el|la|los|las|de|del|y|con|para|por|en|una|un|que|tu|sus|vuelos|almuerzos|cenas|seguro|recuerdos|propinas|camina|vive|admira|lleva|visita|guía|traslado)\b/g,
    ],
    ru: [
      /[а-яё]/g,
    ],
  }

  return (markers[locale] ?? markers.en).reduce((score, pattern) => {
    const matches = text.match(pattern)
    return score + (matches?.length ?? 0)
  }, 0)
}

function pickValueForLocale(values: string[], locale: string): string {
  const uniqueValues = [...new Set(values.map((value) => nonEmptyString(value)).filter((value): value is string => Boolean(value)))]
  if (uniqueValues.length <= 1) return uniqueValues[0] ?? ""

  if (locale === "en") {
    return uniqueValues
      .map((value, index) => ({ value, index, score: scoreTextForLocale(value, "en") }))
      .sort((a, b) => b.score - a.score || a.index - b.index)[0]?.value ?? uniqueValues[0]
  }

  const scored = uniqueValues
    .map((value, index) => ({
      value,
      index,
      localeScore: scoreTextForLocale(value, locale),
      englishScore: scoreTextForLocale(value, "en"),
    }))
    .sort((a, b) => b.localeScore - a.localeScore || a.englishScore - b.englishScore || a.index - b.index)

  const best = scored[0]
  if (best && best.localeScore > 0) return best.value

  return scored.sort((a, b) => a.englishScore - b.englishScore || a.index - b.index)[0]?.value ?? uniqueValues[0]
}

function hasSelectedLocaleText(values: string[], locale: string): boolean {
  if (locale === "en") return false
  return values.some((value) => scoreTextForLocale(value, locale) > 0)
}

function isSelectedLocaleText(value: string, locale: string): boolean {
  if (locale === "en") return true
  return scoreTextForLocale(value, locale) > 0
}

function normalizeContentLocale(value: string | null | undefined): string {
  const normalized = normalizeKey(value)
  const localeMap: Record<string, string> = {
    gb: "en",
    english: "en",
    en: "en",
    "en-us": "en",
    "en-gb": "en",
    french: "fr",
    francais: "fr",
    fr: "fr",
    german: "de",
    deutsch: "de",
    de: "de",
    italian: "it",
    italiano: "it",
    it: "it",
    spanish: "es",
    espanol: "es",
    es: "es",
    russian: "ru",
    russkiy: "ru",
    ru: "ru",
  }

  return localeMap[normalized] ?? normalized.slice(0, 2)
}

function sortedTextsForLocale(arr: { text: string; sort_order: number; locale?: string | null }[], locale = "en"): string[] {
  const activeLocale = normalizeContentLocale(locale)
  const localeRows = arr.filter((item) => normalizeContentLocale(item.locale) === activeLocale)
  if (localeRows.length) return sortedTexts(localeRows)
  const hasLocaleContent = hasSelectedLocaleText(arr.map((item) => item.text), activeLocale)

  const grouped = new Map<number, string[]>()

  for (const item of [...arr].sort((a, b) => a.sort_order - b.sort_order)) {
    const text = nonEmptyString(item.text)
    if (!text) continue
    grouped.set(item.sort_order, [...(grouped.get(item.sort_order) ?? []), text])
  }

  return [...grouped.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([, texts]) => pickValueForLocale(texts, activeLocale))
    .filter((text) => !hasLocaleContent || isSelectedLocaleText(text, activeLocale))
    .filter((text): text is string => Boolean(text))
}

function sortedLabels(arr: { label: string; sort_order: number }[]): string[] {
  return sortByOrder(arr, (x) => x.label)
}

function sortedLabelsForLocale(arr: { label: string; sort_order: number; locale?: string | null }[], locale = "en"): string[] {
  const activeLocale = normalizeContentLocale(locale)
  const localeRows = arr.filter((item) => normalizeContentLocale(item.locale) === activeLocale)
  if (localeRows.length) return sortedLabels(localeRows)
  const hasLocaleContent = hasSelectedLocaleText(arr.map((item) => item.label), activeLocale)

  const grouped = new Map<number, string[]>()

  for (const item of [...arr].sort((a, b) => a.sort_order - b.sort_order)) {
    const label = nonEmptyString(item.label)
    if (!label) continue
    grouped.set(item.sort_order, [...(grouped.get(item.sort_order) ?? []), label])
  }

  return [...grouped.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([, labels]) => pickValueForLocale(labels, activeLocale))
    .filter((label) => !hasLocaleContent || isSelectedLocaleText(label, activeLocale))
    .filter((label): label is string => Boolean(label))
}

function sortedMediaUrls(media: DbItemPayload["media"]): string[] {
  return sortByOrder(media, (m) => m.url)
}

function sortedHotelNames(hotels: DbItemPayload["hotels"]): string[] {
  return sortByOrder(hotels, (h) => h.name)
}

function nonEmptyString(value: string | null | undefined): string | undefined {
  if (typeof value !== "string") return undefined
  const trimmed = value.trim()
  return trimmed.length ? trimmed : undefined
}

function splitParagraphs(value: string | null | undefined): string[] {
  const text = nonEmptyString(value)
  return text ? text.split("\n\n") : []
}

function normalizeKey(value: string | null | undefined): string {
  return (value ?? "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

const BACKEND_CATEGORY_ID_LABELS: Record<string, string> = {
  "a5e4ca22-ceb7-4364-b9c9-19d5025ad9c0": "Activity",
  "ededdfd5-7248-437a-8234-9d7945a458a4": "Adventure",
  "23d30537-a14e-49de-b354-bef497fec7ae": "Air",
  "78f77ced-cf38-427f-9422-6c084fb78012": "Beach",
  "15f3b167-6ab3-4a80-a644-85646d634977": "Discover",
  "d32825e0-e5be-4175-8ca8-0d556da7a9ed": "Nature",
  "fd857132-8c93-448e-b954-bb2d1c5d2a78": "Local",
}

function looksLikeSlugTitle(title: string | null | undefined, slug: string): boolean {
  const normalizedTitle = normalizeKey(title)
  const normalizedSlug = normalizeKey(slug)
  return !!normalizedTitle && normalizedTitle === normalizedSlug
}

type BlogMediaPayload = {
  image_path: string
  sort_order: number
  orientation?: string | null
  width?: number | null
  height?: number | null
}

function valueAsString(value: unknown): string | undefined {
  return typeof value === "string" ? nonEmptyString(value) : undefined
}

function valueAsNumber(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) return value
  if (typeof value === "string") {
    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : undefined
  }
  return undefined
}

function valueAsBoolean(value: unknown): boolean | undefined {
  return typeof value === "boolean" ? value : undefined
}

function firstString(row: Record<string, unknown>, keys: string[]): string | undefined {
  for (const key of keys) {
    const value = valueAsString(row[key])
    if (value) return value
  }
  return undefined
}

function firstNumber(row: Record<string, unknown>, keys: string[]): number | undefined {
  for (const key of keys) {
    const value = valueAsNumber(row[key])
    if (value !== undefined) return value
  }
  return undefined
}

function firstBoolean(row: Record<string, unknown>, keys: string[]): boolean | undefined {
  for (const key of keys) {
    const value = valueAsBoolean(row[key])
    if (value !== undefined) return value
  }
  return undefined
}

type BlogPostTranslationPayload = {
  title?: string | null
  excerpt?: string | null
  content?: string | null
  content_richtext?: string | null
  seo_title?: string | null
  seo_description?: string | null
  image_alt?: string | null
}

const BLOG_IMAGE_ORIENTATIONS = [
  "portrait-4x5",
  "landscape-16x9",
  "landscape-5x4",
  "square-1x1",
] as const

type BlogImageOrientation = (typeof BLOG_IMAGE_ORIENTATIONS)[number]

function isBlogImageOrientation(value: string | null | undefined): value is BlogImageOrientation {
  return BLOG_IMAGE_ORIENTATIONS.includes(value as BlogImageOrientation)
}

function normalizeBlogImageOrientation(value: string | null | undefined): BlogImageOrientation {
  if (isBlogImageOrientation(value)) return value
  if (value === "portrait") return "portrait-4x5"
  if (value === "landscape") return "landscape-16x9"
  if (value === "square") return "square-1x1"
  return "portrait-4x5"
}

function getHtmlAttr(tag: string, attr: string): string | null {
  const match = tag.match(new RegExp(`${attr}="([^"]*)"`))
  return match?.[1] ?? null
}

function setHtmlAttr(tag: string, attr: string, value: string): string {
  const escapedValue = value.replace(/"/g, "&quot;")
  const attrRegex = new RegExp(`\\s${attr}="[^"]*"`)
  if (attrRegex.test(tag)) return tag.replace(attrRegex, ` ${attr}="${escapedValue}"`)
  return tag.replace(/\s*\/?>$/, (ending) => ` ${attr}="${escapedValue}"${ending}`)
}

function stripBlogImageRatioClasses(className: string | null | undefined): string {
  return (className ?? "")
    .split(/\s+/)
    .filter((token) => token && !token.startsWith("blog-image-"))
    .join(" ")
}

function classToBlogImageOrientation(className: string | null | undefined): BlogImageOrientation | null {
  if (!className) return null
  const classes = className.split(/\s+/)
  if (classes.includes("blog-image-square-1x1")) return "square-1x1"
  if (classes.includes("blog-image-landscape-5x4")) return "landscape-5x4"
  if (classes.includes("blog-image-landscape-16x9")) return "landscape-16x9"
  if (classes.includes("blog-image-portrait-4x5")) return "portrait-4x5"
  return null
}

function hydrateBlogHtmlImageOrientations(html: string, media: BlogMediaPayload[]): string {
  let imageIndex = 0
  return html.replace(/<img\b[^>]*>/g, (tag) => {
    const src = getHtmlAttr(tag, "src")
    const extractedFilenameFromSrc = src
      ? (
          src.split("/storage/v1/object/public/mauritius_explored/").pop() ??
          src.split("/storage/v1/object/public/images/").pop() ??
          null
        )
      : null
    const filename =
      getHtmlAttr(tag, "data-filename") ??
      extractedFilenameFromSrc
    const image =
      (filename ? media.find((item) => item.image_path === filename) : null) ??
      media[imageIndex]
    imageIndex += 1
    if (!image?.image_path) return tag

    const visibleOrientation = classToBlogImageOrientation(getHtmlAttr(tag, "class"))
    const dataOrientation = getHtmlAttr(tag, "data-orientation")
    const savedOrientation = normalizeBlogImageOrientation(image.orientation)
    const orientation =
      visibleOrientation && visibleOrientation !== "portrait-4x5"
        ? visibleOrientation
        : dataOrientation && normalizeBlogImageOrientation(dataOrientation) !== "portrait-4x5"
          ? normalizeBlogImageOrientation(dataOrientation)
          : savedOrientation
    const className = [
      "blog-editor-image",
      stripBlogImageRatioClasses(getHtmlAttr(tag, "class")),
      `blog-image-${orientation}`,
    ]
      .filter(Boolean)
      .join(" ")

    let nextTag = setHtmlAttr(tag, "data-filename", image.image_path)
    nextTag = setHtmlAttr(nextTag, "data-orientation", orientation)
    nextTag = setHtmlAttr(nextTag, "class", className)
    if (image.width) nextTag = setHtmlAttr(nextTag, "data-width", String(image.width))
    if (image.height) nextTag = setHtmlAttr(nextTag, "data-height", String(image.height))
    return nextTag
  })
}

// ---- Bulk fetch helpers ----
async function fetchAllPublishedSlugs(type: string): Promise<string[]> {
  if (!contentDb) return []
  const { data, error } = await contentDb
    .from("explored_items")
    .select("slug")
    .eq("type", type)
    .eq("status", "published")
  if (error || !data) return []
  return data.map((r) => r.slug)
}

async function fetchItemBySlug(slug: string, type?: string, locale = "en"): Promise<DbItemPayload | null> {
  if (!contentDb) return null
  const requestedLocale = normalizeLocale(locale)
  const params: Record<string, string> = { p_slug: slug }
  if (type) params.p_type = type
  const { data, error } = await contentDb.rpc("get_explored_item_detail", {
    ...params,
    p_locale: requestedLocale,
  })
  if (error) {
    const fallback = await contentDb.rpc("get_explored_item_detail", params)
    if (fallback.error || !fallback.data) return null
    return overlayItemLocaleData(normalizeRpcItemPayload(fallback.data), requestedLocale)
  }
  if (error || !data) return null
  return overlayItemLocaleData(normalizeRpcItemPayload(data), requestedLocale)
}

function normalizeRpcItemPayload(data: unknown): DbItemPayload {
  const raw = Array.isArray(data) && data.length ? data[0] : data
  const payload =
    raw && typeof raw === "object" && "get_explored_item_detail" in raw
      ? (raw as { get_explored_item_detail: DbItemPayload }).get_explored_item_detail
      : (raw as DbItemPayload)
  return payload
}

async function overlayItemTranslation(item: DbItemPayload | null, locale: string): Promise<DbItemPayload | null> {
  if (!item || !contentDb) return item

  const { data } = await contentDb
    .from("explored_item_translations")
    .select("title,quote,description_richtext")
    .eq("item_id", item.id)
    .eq("locale", locale)
    .maybeSingle()

  if (!data) return item
  const translation = data as {
    title?: string | null
    quote?: string | null
    description_richtext?: string | null
  }

  return {
    ...item,
    translation: {
      ...item.translation,
      title: nonEmptyString(translation.title) ?? item.translation.title,
      quote: nonEmptyString(translation.quote) ?? item.translation.quote,
      description_richtext:
        nonEmptyString(translation.description_richtext) ?? item.translation.description_richtext,
    },
  }
}

function normalizeLocaleMediaRows(rows: Record<string, unknown>[], locale: string): DbItemPayload["media"] {
  return rows.flatMap((row, index) => {
      const url = firstString(row, ["url", "image_url", "image_path", "media_url", "path"])
      if (!url) return []

      return [{
        url,
        alt_text: firstString(row, ["alt_text", "image_alt", "alt", "caption"]) ?? null,
        sort_order: firstNumber(row, ["sort_order", "position", "display_order", "order"]) ?? index,
        is_main: firstBoolean(row, ["is_main", "is_hero", "hero", "primary"]) ?? false,
        locale,
      }]
    })
}

function normalizeLocaleCategoryRows(rows: Record<string, unknown>[]): DbItemPayload["categories"] {
  return rows
    .map((row) => {
      const nestedCategory =
        (row.category && typeof row.category === "object" ? row.category : null) ??
        (row.explored_item_categories && typeof row.explored_item_categories === "object" ? row.explored_item_categories : null) ??
        (row.explored_categories && typeof row.explored_categories === "object" ? row.explored_categories : null)
      const category = nestedCategory as Record<string, unknown> | null
      const slug =
        firstString(row, ["category_slug", "slug", "category"]) ??
        (category ? firstString(category, ["slug", "category_slug"]) : undefined)
      const label =
        firstString(row, ["label", "label_en", "name", "title"]) ??
        (category ? firstString(category, ["label", "label_en", "name", "title"]) : undefined) ??
        BACKEND_CATEGORY_ID_LABELS[firstString(row, ["category_id"]) ?? ""]
      const categorySlug = slug ?? normalizeKey(label)
      if (!categorySlug || !label) return null

      return {
        slug: categorySlug,
        label_en: label,
      }
    })
    .filter((item): item is DbItemPayload["categories"][number] => Boolean(item))
}

async function overlayItemLocaleData(item: DbItemPayload | null, locale: string): Promise<DbItemPayload | null> {
  if (!item || !contentDb) return item

  const translated = await overlayItemTranslation(item, locale)
  if (!translated) return translated

  const [{ data: settings }, { data: media }, { data: categories }] = await Promise.all([
    contentDb
      .from("explored_item_locale_settings")
      .select("*")
      .eq("item_id", translated.id)
      .eq("locale", locale)
      .maybeSingle(),
    contentDb
      .from("explored_item_locale_media")
      .select("*")
      .eq("item_id", translated.id)
      .eq("locale", locale)
      .order("sort_order"),
    contentDb
      .from("explored_item_locale_categories")
      .select("*")
      .eq("item_id", translated.id)
      .eq("locale", locale)
      .order("created_at"),
  ])

  const settingsRow = settings && typeof settings === "object"
    ? settings as Record<string, unknown>
    : null
  const localeMedia = normalizeLocaleMediaRows((media ?? []) as Record<string, unknown>[], locale)
  const localeCategories = normalizeLocaleCategoryRows((categories ?? []) as Record<string, unknown>[])
  const mainMedia = localeMedia.find((item) => item.is_main) ?? localeMedia[0]

  return {
    ...translated,
    address_text: settingsRow ? firstString(settingsRow, ["address_text", "location", "address"]) ?? translated.address_text : translated.address_text,
    hero_image_path:
      (settingsRow ? firstString(settingsRow, ["hero_image_path", "hero_image", "image_path", "image_url"]) : undefined) ??
      mainMedia?.url ??
      translated.hero_image_path,
    duration_text: settingsRow ? firstString(settingsRow, ["duration_text", "duration"]) ?? translated.duration_text : translated.duration_text,
    best_time_text: settingsRow ? firstString(settingsRow, ["best_time_text", "best_time"]) ?? translated.best_time_text : translated.best_time_text,
    opening_hours_text: settingsRow ? firstString(settingsRow, ["opening_hours_text", "opening_hours"]) ?? translated.opening_hours_text : translated.opening_hours_text,
    admission_text: settingsRow ? firstString(settingsRow, ["admission_text", "admission"]) ?? translated.admission_text : translated.admission_text,
    media: localeMedia.length ? localeMedia : translated.media,
    categories: localeCategories.length ? localeCategories : translated.categories,
  }
}

// ---- Mappers ----
function mapToBeachDetails(d: DbItemPayload, locale = "en"): BeachDetails {
  return {
    slug: d.slug,
    name: d.translation.title,
    number: 0,
    region: regionLabelToType(d.region?.slug),
    coordinates: toCoords(d.lat, d.lng),
    categories: d.categories.map((c) => c.slug) as BeachCategory[],
    tagline: d.translation.quote ?? "",
    description: d.translation.description_richtext?.split("\n\n") ?? [],
    tips: sortedTextsForLocale(d.tips, locale),
    included: d.includes?.length ? sortedLabelsForLocale(d.includes, locale) : undefined,
    notIncluded: d.not_included?.length ? sortedLabelsForLocale(d.not_included, locale) : undefined,
    whatToBring: d.what_to_bring?.length ? sortedLabelsForLocale(d.what_to_bring, locale) : undefined,
    images: sortedMediaUrls(d.media),
    heroImage: d.hero_image_path ?? undefined,
    info: {
      location: d.address_text ?? "",
      publicTransport: d.public_transport_available ?? false,
      hotelsNearby: sortedHotelNames(d.hotels),
    },
  }
}

function mapToPlaceDetails(d: DbItemPayload, locale = "en"): PlaceDetails {
  return {
    slug: d.slug,
    name: d.translation.title,
    region: regionLabelToType(d.region?.slug),
    coordinates: toCoords(d.lat, d.lng),
    categories: d.categories.map((c) => c.slug) as PlaceCategory[],
    tagline: d.translation.quote ?? "",
    description: d.translation.description_richtext?.split("\n\n") ?? [],
    highlights: sortedTextsForLocale(d.highlights, locale),
    tips: sortedTextsForLocale(d.tips, locale),
    included: d.includes?.length ? sortedLabelsForLocale(d.includes, locale) : undefined,
    notIncluded: d.not_included?.length ? sortedLabelsForLocale(d.not_included, locale) : undefined,
    whatToBring: d.what_to_bring?.length ? sortedLabelsForLocale(d.what_to_bring, locale) : undefined,
    images: sortedMediaUrls(d.media),
    heroImage: d.hero_image_path ?? undefined,
    info: {
      location: d.address_text ?? "",
      openHours: d.opening_hours_text ?? undefined,
      admission: d.admission_text ?? undefined,
      bestTime: d.best_time_text ?? undefined,
    },
  }
}

function mapToActivityDetails(d: DbItemPayload, locale = "en"): ActivityDetails {
  const pricing: PricingOption[] | undefined = d.pricing?.length
    ? d.pricing.map((p) => ({
        name: p.name,
        price: p.price_amount ?? 0,
        description: p.description ?? undefined,
      }))
    : undefined

  return {
    slug: d.slug,
    name: d.translation.title,
    region: regionLabelToType(d.region?.slug),
    coordinates: toCoords(d.lat, d.lng),
    tagline: d.translation.quote ?? "",
    description: d.translation.description_richtext?.split("\n\n") ?? [],
    highlights: sortedTextsForLocale(d.highlights, locale),
    tips: sortedTextsForLocale(d.tips, locale),
    images: sortedMediaUrls(d.media),
    heroImage: d.hero_image_path ?? undefined,
    categories: d.categories.map((c) => c.slug) as ActivityCategory[],
    pricing,
    bookingUrl: d.booking_url ?? undefined,
    duration: d.duration_text ?? undefined,
    location: d.address_text ?? undefined,
    bestTime: d.best_time_text ?? undefined,
    difficulty: d.difficulty as ActivityDetails["difficulty"],
    included: d.includes?.length ? sortedLabelsForLocale(d.includes, locale) : undefined,
    notIncluded: d.not_included?.length ? sortedLabelsForLocale(d.not_included, locale) : undefined,
    whatToBring: d.what_to_bring?.length ? sortedLabelsForLocale(d.what_to_bring, locale) : undefined,
    relatedActivities: d.related?.length ? d.related.map((r) => r.slug) : undefined,
  }
}

function mapToVerandaHotel(d: DbItemPayload, fallback?: VerandaHotel, locale = "en"): VerandaHotel {
  const firstPrice = d.pricing?.find((p) => p.price_amount !== null)
  const detailImages = sortedMediaUrls(d.media)
  const mergedGallery = detailImages.length ? detailImages : (fallback?.gallery ?? [])
  const hasBrokenTitle = Boolean(fallback && looksLikeSlugTitle(d.translation.title, d.slug))
  const name = hasBrokenTitle ? fallback?.name : nonEmptyString(d.translation.title)
  const tagline = hasBrokenTitle ? fallback?.tagline : nonEmptyString(d.translation.quote)
  const description = hasBrokenTitle ? [] : splitParagraphs(d.translation.description_richtext)
  const highlights = sortedTextsForLocale(d.highlights, locale)
  const practicalTips = sortedTextsForLocale(d.tips, locale)
  const idealFor = sortedLabelsForLocale(d.includes, locale)
  const backendRegion = normalizeKey(d.region?.slug)
  const region = backendRegion && backendRegion !== "various"
    ? d.region?.slug
    : fallback?.region
  const backendTags = (d.categories ?? [])
    .map((category) => category.label_en || category.slug)
    .filter((tag) => {
      const normalizedTag = normalizeKey(tag)
      return fallback
        ? normalizedTag && normalizedTag !== "various" && normalizedTag !== "hotel"
        : Boolean(normalizedTag)
    })
  const tags = backendTags.length ? backendTags : (fallback?.tags ?? (d.type === "hotel" ? ["Hotel"] : []))

  return {
    slug: fallback?.slug ?? d.slug,
    name: name ?? fallback?.name ?? d.slug,
    shortName: name ?? fallback?.shortName ?? d.slug,
    location: nonEmptyString(d.address_text) ?? fallback?.location ?? "",
    region: region ?? "various",
    rating: fallback?.rating ?? "",
    style: fallback?.style ?? "",
    priceFrom:
      firstPrice?.price_amount !== null && firstPrice?.price_amount !== undefined
        ? `From ${firstPrice.currency ?? "EUR"}${firstPrice.price_amount}`
        : (fallback?.priceFrom ?? ""),
    tagline: tagline ?? fallback?.tagline ?? "",
    description: description.length ? description : (fallback?.description ?? []),
    highlights: highlights.length ? highlights : (fallback?.highlights ?? []),
    idealFor: idealFor.length ? idealFor : (fallback?.idealFor ?? []),
    experiences: fallback?.experiences ?? [],
    practicalTips: practicalTips.length ? practicalTips : (fallback?.practicalTips ?? []),
    rooms: fallback?.rooms ?? [],
    dining: fallback?.dining ?? [],
    gallery: mergedGallery,
    heroImage: nonEmptyString(d.hero_image_path) ?? mergedGallery[0] ?? fallback?.heroImage ?? "",
    coordinates: toCoords(d.lat, d.lng),
    tags,
    accent: fallback?.accent ?? "from-[#0f6e8c] to-[#46b2cc]",
    boardBasis: fallback?.boardBasis ?? "",
    beachStyle: fallback?.beachStyle ?? "",
    bookingUrl: d.booking_url ?? fallback?.bookingUrl,
  }
}

// ---- Public API ----
const isDev = process.env.NODE_ENV !== "production"
let _shouldUseDb: boolean | null = null

async function shouldUseDb(): Promise<boolean> {
  if (_shouldUseDb !== null) return _shouldUseDb
  if (!contentDb) {
    if (isDev) 
    _shouldUseDb = false
    return false
  }
  const { data, error } = await contentDb
    .from("explored_items")
    .select("id")
    .limit(1)
  _shouldUseDb = !error && !!data?.length
  if (isDev) console.log(`[content] useDb=${_shouldUseDb}`)
  return _shouldUseDb
}

async function fetchAllDetailsByType<T>(
  type: string,
  mapper: (d: DbItemPayload, locale?: string) => T,
  fallback: Record<string, T>,
  locale = "en",
): Promise<Record<string, T>> {
  if (!(await shouldUseDb())) return fallback
  const slugs = await fetchAllPublishedSlugs(type)
  const results = await Promise.all(slugs.map((slug) => fetchItemBySlug(slug, type, locale)))
  const result: Record<string, T> = {}
  slugs.forEach((slug, i) => {
    const d = results[i]
    if (d) result[slug] = mapper(d, locale)
  })
  return Object.keys(result).length ? result : fallback
}

export async function getAllBeachDetails(locale = "en"): Promise<Record<string, BeachDetails>> {
  return fetchAllDetailsByType("beach", mapToBeachDetails, STATIC_BEACH_DETAILS, locale)
}

export async function getBeachDetailsBySlug(slug: string, locale = "en"): Promise<BeachDetails | null> {
  if (!(await shouldUseDb())) return STATIC_BEACH_DETAILS[slug] ?? null
  const d = await fetchItemBySlug(slug, "beach", locale)
  return d ? mapToBeachDetails(d, locale) : STATIC_BEACH_DETAILS[slug] ?? null
}

export async function getAllPlaceDetails(locale = "en"): Promise<Record<string, PlaceDetails>> {
  return fetchAllDetailsByType("place", mapToPlaceDetails, STATIC_PLACE_DETAILS, locale)
}

export async function getPlaceDetailsBySlug(slug: string, locale = "en"): Promise<PlaceDetails | null> {
  if (!(await shouldUseDb())) return STATIC_PLACE_DETAILS[slug] ?? null
  const d = await fetchItemBySlug(slug, "place", locale)
  return d ? mapToPlaceDetails(d, locale) : STATIC_PLACE_DETAILS[slug] ?? null
}

export async function getAllActivityDetails(locale = "en"): Promise<Record<string, ActivityDetails>> {
  return fetchAllDetailsByType("activity", mapToActivityDetails, STATIC_ACTIVITY_DETAILS, locale)
}

export async function getActivityDetailsBySlugFromDb(slug: string, locale = "en"): Promise<ActivityDetails | null> {
  if (!(await shouldUseDb())) return STATIC_ACTIVITY_DETAILS[slug] ?? null
  const d = await fetchItemBySlug(slug, "activity", locale)
  return d ? mapToActivityDetails(d, locale) : STATIC_ACTIVITY_DETAILS[slug] ?? null
}

export async function getAllBlogPosts(locale = "en"): Promise<BlogPost[]> {
  const requestedLocale = normalizeLocale(locale)
  if (!(await shouldUseDb())) return STATIC_BLOG_POSTS
  if (!contentDb) return STATIC_BLOG_POSTS

  const { data: posts, error } = await contentDb
    .from("explored_blog_posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false })

  if (error || !posts?.length) return STATIC_BLOG_POSTS

  const result: BlogPost[] = []
  for (const post of posts) {
    const [
      { data: translations },
      { data: cats },
      { data: tags },
      { data: media },
    ] = await Promise.all([
      contentDb
        .from("explored_blog_post_translations")
        .select("*")
        .eq("post_id", post.id)
        .in("locale", requestedLocale === "en" ? ["en"] : [requestedLocale, "en"]),
      contentDb.from("explored_blog_post_categories").select("explored_blog_categories(slug)").eq("post_id", post.id),
      contentDb.from("explored_blog_post_tags").select("explored_blog_tags(label_en)").eq("post_id", post.id),
      contentDb
        .from("explored_blog_post_media")
        .select("image_path,sort_order,orientation,width,height")
        .eq("post_id", post.id)
        .order("sort_order"),
    ])

    const translationRows = (translations ?? []) as (BlogPostTranslationPayload & { locale?: string | null })[]
    const requestedTranslation = translationRows.find((translation) => translation.locale === requestedLocale)
    const englishTranslation = translationRows.find((translation) => translation.locale === "en")
    const tr = requestedTranslation ?? englishTranslation

    if (!tr) continue

    const staticPost = STATIC_BLOG_POSTS.find((p) => p.slug === post.slug)

    /**
     * Content + inline images: the admin in mauritius-explored-v2 is the
     * source of truth. Whenever the DB row has a non-empty `content_richtext`,
     * use it — that means an admin has authored or edited the post. Only fall
     * back to the static copy in src/data/blog.ts when the CMS body is empty
     * (so a freshly seeded post that has never been edited still renders).
     *
     * Previous behaviour preferred `staticPost.content` whenever the slug
     * matched, which silently shadowed every admin edit for posts that were
     * also in the static file (e.g. `hiking-spots-in-mauritius`). That made
     * "Save & Rebuild" appear to do nothing on the live site.
     *
     * The live blog detail page (src/app/blog/[slug]/page.tsx) detects HTML
     * vs. plain-text content by looking at the first block: HTML bodies get
     * rendered via dangerouslySetInnerHTML into `.blog-html-content`, while
     * legacy plain-text bodies keep flowing through `parseBlogContent` and
     * the per-section image mapping. So both formats continue to work.
     */
    const dbMedia = (media ?? []) as BlogMediaPayload[]
    const rawDbContent =
      (tr.content_richtext || tr.content || englishTranslation?.content_richtext || englishTranslation?.content)?.trim()
    const dbContent = rawDbContent
      ? hydrateBlogHtmlImageOrientations(rawDbContent, dbMedia)
      : rawDbContent
    const hasDbContent = !!dbContent && dbContent.length > 0
    const dbImages = dbMedia
      .map((m: { image_path: string }) => m.image_path)
      .filter((p: string): p is string => !!p)
    const hasDbImages = dbImages.length > 0

    const content: string[] = hasDbContent
      ? (dbContent as string).split("\n\n")
      : (staticPost?.content?.length ? staticPost.content : [])
    const inlineImages: string[] | undefined = hasDbImages
      ? dbImages
      : staticPost?.images?.length
        ? staticPost.images
        : undefined

    result.push({
      slug: post.slug,
      title: tr.title || englishTranslation?.title || staticPost?.title || post.slug,
      excerpt: tr.excerpt ?? englishTranslation?.excerpt ?? staticPost?.excerpt ?? "",
      seoTitle: tr.seo_title?.trim() || englishTranslation?.seo_title?.trim() || undefined,
      seoDescription: tr.seo_description?.trim() || englishTranslation?.seo_description?.trim() || undefined,
      imageAlt: tr.image_alt?.trim() || englishTranslation?.image_alt?.trim() || undefined,
      content,
      image: post.hero_image_path || staticPost?.image || "",
      images: inlineImages,
      categories: (cats ?? []).map((c: Record<string, unknown>) => {
        const cat = c.explored_blog_categories as Record<string, string> | null
        return (cat?.slug ?? "discover-mauritius") as BlogCategory
      }),
      tags: (tags ?? []).map((t: Record<string, unknown>) => {
        const tag = t.explored_blog_tags as Record<string, string> | null
        return tag?.label_en ?? ""
      }).filter(Boolean),
      author: post.author_name ?? "Mauritius Explored",
      publishedAt: staticPost?.publishedAt ?? post.published_at ?? post.created_at,
      readTime: post.read_time_minutes ?? 5,
      featured: post.featured ?? false,
      featuredRank:
        post.featured_rank === 1 || post.featured_rank === 2 || post.featured_rank === 3
          ? (post.featured_rank as 1 | 2 | 3)
          : null,
    })
  }

  return result.length ? result : STATIC_BLOG_POSTS
}

export async function getBlogCategories() {
  if (!(await shouldUseDb())) return STATIC_BLOG_CATEGORIES
  if (!contentDb) return STATIC_BLOG_CATEGORIES
  const { data, error } = await contentDb.from("explored_blog_categories").select("slug,label_en").order("label_en")
  if (error || !data?.length) return STATIC_BLOG_CATEGORIES
  return data.map((c) => ({ id: c.slug as BlogCategory, label: c.label_en }))
}

export async function getBlogPostBySlug(slug: string, locale = "en"): Promise<BlogPost | null> {
  const posts = await getAllBlogPosts(locale)
  return posts.find((p) => p.slug === slug) ?? null
}

export async function getRelatedBlogPosts(slug: string, limit = 3, locale = "en"): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts(locale)
  const current = posts.find((p) => p.slug === slug)
  if (!current) return []
  return posts
    .filter((p) => p.slug !== slug && p.categories.some((c) => current.categories.includes(c)))
    .slice(0, limit)
}

export async function getAllBeaches(locale = "en"): Promise<Beach[]> {
  const details = await getAllBeachDetails(locale)
  if (details === STATIC_BEACH_DETAILS) return STATIC_ALL_BEACHES
  return Object.values(details).map((d) => ({
    name: d.name,
    slug: d.slug,
    image: d.images[0] ?? "",
    description: d.tagline,
    region: d.region,
  }))
}

export async function getRegionsFromBeaches(locale = "en"): Promise<{ id: Region; label: string }[]> {
  const beaches = await getAllBeaches(locale)
  if (beaches === STATIC_ALL_BEACHES) return STATIC_REGIONS
  const unique = [...new Set(beaches.map((b) => b.region))]
  return unique.map((id) => ({ id, label: id }))
}

export async function getTopBeaches(): Promise<TopBeach[]> {
  return STATIC_TOP_BEACHES
}

export async function getAllActivities(locale = "en"): Promise<Activity[]> {
  const details = await getAllActivityDetails(locale)
  if (details === STATIC_ACTIVITY_DETAILS) return STATIC_ACTIVITIES
  return Object.values(details).map((d) => ({
    slug: d.slug,
    name: d.name,
    image: d.images[0] ?? "",
    description: d.tagline,
    categories: d.categories,
    region: d.region,
  }))
}

export function getActivityCategories() {
  return STATIC_ACTIVITY_CATEGORIES
}

export async function getActivitiesByCategory(category: ActivityCategory, locale = "en"): Promise<Activity[]> {
  const all = await getAllActivities(locale)
  if (category === "all") return all
  return all.filter((a) => a.categories.includes(category))
}

export async function getAllPlaces(locale = "en"): Promise<PlaceDetails[]> {
  const details = await getAllPlaceDetails(locale)
  if (details === STATIC_PLACE_DETAILS) return staticGetAllPlaces()
  return Object.values(details)
}

export async function getPlacesByCategory(category: PlaceCategory, locale = "en"): Promise<PlaceDetails[]> {
  const all = await getAllPlaces(locale)
  return all.filter((p) => p.categories.includes(category))
}

export async function getRelatedActivities(slug: string, locale = "en"): Promise<ActivityDetails[]> {
  const details = await getAllActivityDetails(locale)
  const activity = details[slug]
  if (!activity?.relatedActivities) return []
  return activity.relatedActivities.map((s) => details[s]).filter(Boolean)
}

export async function getBeachesByRegion(region: Region, locale = "en"): Promise<BeachDetails[]> {
  const details = await getAllBeachDetails(locale)
  return Object.values(details).filter((d) => d.region === region)
}

export async function getAllBeachSlugs(): Promise<string[]> {
  const details = await getAllBeachDetails("en")
  return Object.keys(details)
}

export async function getAllPlaceSlugs(): Promise<string[]> {
  const details = await getAllPlaceDetails("en")
  return Object.keys(details)
}

export async function getAllActivitySlugs(): Promise<string[]> {
  const details = await getAllActivityDetails("en")
  return Object.keys(details)
}

function findStaticVerandaFallback(slug?: string | null, title?: string | null): VerandaHotel | undefined {
  const normalizedSlug = normalizeKey(slug)
  const normalizedTitle = normalizeKey(title)
  const haystack = [normalizedSlug, normalizedTitle].filter(Boolean).join("-")

  const aliasMatch = [
    { aliases: ["pointe-aux-biches", "biches", "pointe"], slug: "veranda-pointe-aux-biches" },
    { aliases: ["paul-and-virginie", "paul-virginie", "virginie"], slug: "veranda-paul-and-virginie" },
    { aliases: ["grand-baie", "grandbaie"], slug: "veranda-grand-baie" },
    { aliases: ["tamarin"], slug: "veranda-tamarin" },
    { aliases: ["palmar", "palmar-beach"], slug: "veranda-palmar-beach" },
  ].find((entry) => entry.aliases.some((alias) => haystack.includes(alias)))

  if (aliasMatch) {
    return STATIC_VERANDA_HOTELS.find((hotel) => hotel.slug === aliasMatch.slug)
  }

  return STATIC_VERANDA_HOTELS.find((hotel) => {
    const keys = [
      normalizeKey(hotel.slug),
      normalizeKey(hotel.name),
      normalizeKey(hotel.shortName),
      ...normalizeKey(hotel.shortName).split("-").filter((part) => part.length > 3),
    ].filter(Boolean)

    return keys.some((key) => (
      normalizedSlug === key ||
      normalizedTitle === key ||
      haystack.includes(key)
    ))
  })
}

export async function getAllVerandaHotels(locale = "en"): Promise<VerandaHotel[]> {
  if (!(await shouldUseDb())) return STATIC_VERANDA_HOTELS

  const slugs = await fetchAllPublishedSlugs("hotel")
  if (!slugs.length) return STATIC_VERANDA_HOTELS

  const results = await Promise.all(slugs.map((slug) => fetchItemBySlug(slug, "hotel", locale)))
  const hotels = results
    .map((item, index) => {
      if (!item) return null
      const fallback = findStaticVerandaFallback(slugs[index], item.translation.title ?? item.slug)
      return mapToVerandaHotel(item, fallback, locale)
    })
    .filter((hotel): hotel is VerandaHotel => Boolean(hotel))

  return hotels.length ? hotels : STATIC_VERANDA_HOTELS
}

export async function getVerandaHotelBySlugFromDb(slug: string, locale = "en"): Promise<VerandaHotel | null> {
  const fallbackBySlug = findStaticVerandaFallback(slug)
  if (!(await shouldUseDb())) return fallbackBySlug ?? null

  const item = await fetchItemBySlug(slug, "hotel", locale)
  if (!item) return fallbackBySlug ?? null

  const fallbackByName = findStaticVerandaFallback(item.slug, item.translation.title)

  return mapToVerandaHotel(item, fallbackBySlug ?? fallbackByName, locale)
}

export async function getAllVerandaHotelSlugsFromDb(): Promise<string[]> {
  const hotels = await getAllVerandaHotels("en")
  return hotels.map((hotel) => hotel.slug)
}

export async function getRelatedVerandaHotelsFromDb(slug: string, limit = 3, locale = "en"): Promise<VerandaHotel[]> {
  const hotels = await getAllVerandaHotels(locale)
  const currentHotel = hotels.find((hotel) => hotel.slug === slug)
  if (!currentHotel) return hotels.filter((hotel) => hotel.slug !== slug).slice(0, limit)

  const sameRegion = hotels.filter(
    (hotel) => hotel.slug !== slug && hotel.region === currentHotel.region
  )
  const others = hotels.filter(
    (hotel) => hotel.slug !== slug && hotel.region !== currentHotel.region
  )

  return [...sameRegion, ...others].slice(0, limit)
}

export async function getVerandaHotelsListingData(locale = "en"): Promise<{
  allHotels: VerandaHotel[]
  hotelSlugsWithPages: string[]
}> {
  const allHotels = await getAllVerandaHotels(locale)
  return {
    allHotels,
    hotelSlugsWithPages: allHotels.map((hotel) => hotel.slug),
  }
}

/** Single fetch for beaches listing page — avoids 3x duplicate fetches */
export async function getBeachesListingData(locale = "en"): Promise<{
  allBeaches: Beach[]
  beachDetails: Record<string, BeachDetails>
  regions: { id: Region; label: string }[]
  topBeaches: TopBeach[]
}> {
  const beachDetails = await getAllBeachDetails(locale)
  const allBeaches =
    beachDetails === STATIC_BEACH_DETAILS
      ? STATIC_ALL_BEACHES
      : Object.values(beachDetails).map((d) => ({
          name: d.name,
          slug: d.slug,
          image: d.images[0] ?? "",
          description: d.tagline,
          region: d.region,
        }))
  const regions =
    allBeaches === STATIC_ALL_BEACHES
      ? STATIC_REGIONS
      : [...new Set(allBeaches.map((b) => b.region))].map((id) => ({ id, label: id }))
  return { allBeaches, beachDetails, regions, topBeaches: STATIC_TOP_BEACHES }
}

/** Single fetch for activities listing page — avoids 2x duplicate fetches */
export async function getActivitiesListingData(locale = "en"): Promise<{
  allActivities: Activity[]
  activitySlugsWithPages: string[]
}> {
  const details = await getAllActivityDetails(locale)
  const allActivities =
    details === STATIC_ACTIVITY_DETAILS
      ? STATIC_ACTIVITIES
      : Object.values(details).map((d) => ({
          slug: d.slug,
          name: d.name,
          image: d.images[0] ?? "",
          description: d.tagline,
          categories: d.categories,
          region: d.region,
        }))
  return { allActivities, activitySlugsWithPages: Object.keys(details) }
}

/** Enrich explore section items with main image from API so cards match detail pages after admin updates */
async function enrichExploreItems<T extends ExploreItem>(
  items: T[],
  fetchDetail: (slug: string) => Promise<{ images: string[]; name?: string; region?: string } | null>,
  locale = "en"
): Promise<T[]> {
  const enriched = await Promise.all(
    items.map(async (item) => {
      const localizedItem = localizeExploreItemFallback(item, locale)
      const detail = await fetchDetail(item.slug)
      const image = detail?.images?.[0]
      const translatedName = detail?.name && detail.name !== item.name ? detail.name : localizedItem.name
      const translatedRegion = detail?.region && detail.region !== item.region
        ? localizeExploreItemFallback({ ...item, region: detail.region }, locale).region
        : localizedItem.region
      return {
        ...localizedItem,
        name: translatedName,
        region: translatedRegion,
        image: image ?? localizedItem.image,
      }
    })
  )
  return enriched
}
/** Enrich explore section items with main image from API so cards match detail pages after admin updates */
async function enrichAcrossItems<T extends ExploreItem>(
  items: T[],
  fetchDetail: (slug: string) => Promise<{ images: string[]; name?: string; region?: string } | null>,
  locale = "en"
): Promise<T[]> {
  const enriched = await Promise.all(
    items.map(async (item) => {
      const localizedItem = localizeExploreItemFallback(item, locale)
      const detail = await fetchDetail(item.slug)
      const image = detail?.images?.[0]
      const translatedName = detail?.name && detail.name !== item.name ? detail.name : localizedItem.name
      const translatedRegion = detail?.region && detail.region !== item.region
        ? localizeExploreItemFallback({ ...item, region: detail.region }, locale).region
        : localizedItem.region
      return {
        ...localizedItem,
        name: translatedName,
        region: translatedRegion,
        image: image ?? localizedItem.image,
      }
    })
  )
  return enriched
}

export async function getExploreSectionsEnriched(locale = "en"): Promise<{
  topActivities: ExploreItem[]
  topBeaches: ExploreItem[]
  topPlaces: ExploreItem[]
  hiddenGems: ExploreItem[]
}> {
  const [activities, beaches, places, gems] = await Promise.all([
    enrichExploreItems(STATIC_TOP_ACTIVITIES, (slug) => getActivityDetailsBySlugFromDb(slug, locale).then((d) => d ?? null), locale),
    enrichExploreItems(STATIC_TOP_BEACHES_EXPLORE, (slug) => getBeachDetailsBySlug(slug, locale).then((d) => d ?? null), locale),
    enrichExploreItems(STATIC_TOP_PLACES, (slug) => getPlaceDetailsBySlug(slug, locale).then((d) => d ?? null), locale),
    enrichExploreItems(STATIC_HIDDEN_GEMS, (slug) => getBeachDetailsBySlug(slug, locale).then((d) => d ?? null), locale),
  ])
  return { topActivities: activities, topBeaches: beaches, topPlaces: places, hiddenGems: gems }
}
export async function getAcrossSectionsEnriched(locale = "en"): Promise<{
  topActivities: ExploreItem[]
  topBeaches: ExploreItem[]
  topPlaces: ExploreItem[]
  hiddenGems: ExploreItem[]
}> {
  const [activities, beaches, places, gems] = await Promise.all([
    enrichAcrossItems(STATIC_TOP_ACTIVITIES, (slug) => getActivityDetailsBySlugFromDb(slug, locale).then((d) => d ?? null), locale),
    enrichAcrossItems(STATIC_TOP_BEACHES_EXPLORE, (slug) => getBeachDetailsBySlug(slug, locale).then((d) => d ?? null), locale),
    enrichAcrossItems(STATIC_TOP_PLACES, (slug) => getPlaceDetailsBySlug(slug, locale).then((d) => d ?? null), locale),
    enrichAcrossItems(STATIC_HIDDEN_GEMS, (slug) => getBeachDetailsBySlug(slug, locale).then((d) => d ?? null), locale),
  ])
  return { topActivities: activities, topBeaches: beaches, topPlaces: places, hiddenGems: gems }
}
