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
import type { BlogPost, BlogCategory } from "@/data/blog"

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
  media: { url: string; alt_text: string | null; sort_order: number; is_main: boolean }[]
  tips: { text: string; sort_order: number }[]
  highlights: { text: string; sort_order: number }[]
  includes: { label: string; sort_order: number }[]
  not_included: { label: string; sort_order: number }[]
  what_to_bring: { label: string; sort_order: number }[]
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

function toCoords(lat: number | null, lng: number | null): Coordinates {
  return [lat ?? 0, lng ?? 0]
}

function sortByOrder<T extends { sort_order: number }>(arr: T[], getValue: (x: T) => string): string[] {
  return [...arr].sort((a, b) => a.sort_order - b.sort_order).map(getValue)
}

function sortedTexts(arr: { text: string; sort_order: number }[]): string[] {
  return sortByOrder(arr, (x) => x.text)
}

function sortedLabels(arr: { label: string; sort_order: number }[]): string[] {
  return sortByOrder(arr, (x) => x.label)
}

function sortedMediaUrls(media: DbItemPayload["media"]): string[] {
  return sortByOrder(media, (m) => m.url)
}

function sortedHotelNames(hotels: DbItemPayload["hotels"]): string[] {
  return sortByOrder(hotels, (h) => h.name)
}

type BlogMediaPayload = {
  image_path: string
  sort_order: number
  orientation?: string | null
  width?: number | null
  height?: number | null
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
    const filename =
      getHtmlAttr(tag, "data-filename") ??
      (src?.includes("/storage/v1/object/public/images/")
        ? src.split("/storage/v1/object/public/images/").pop()
        : null)
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

async function fetchItemBySlug(slug: string, type?: string): Promise<DbItemPayload | null> {
  if (!contentDb) return null
  const params: Record<string, string> = { p_slug: slug }
  if (type) params.p_type = type
  const { data, error } = await contentDb.rpc("get_explored_item_detail", params)
  if (error || !data) return null
  const raw = Array.isArray(data) && data.length ? data[0] : data
  const payload =
    raw && typeof raw === "object" && "get_explored_item_detail" in raw
      ? (raw as { get_explored_item_detail: DbItemPayload }).get_explored_item_detail
      : (raw as DbItemPayload)
  return payload
}

// ---- Mappers ----
function mapToBeachDetails(d: DbItemPayload): BeachDetails {
  return {
    slug: d.slug,
    name: d.translation.title,
    number: 0,
    region: regionLabelToType(d.region?.slug),
    coordinates: toCoords(d.lat, d.lng),
    categories: d.categories.map((c) => c.slug) as BeachCategory[],
    tagline: d.translation.quote ?? "",
    description: d.translation.description_richtext?.split("\n\n") ?? [],
    tips: sortedTexts(d.tips),
    images: sortedMediaUrls(d.media),
    heroImage: d.hero_image_path ?? undefined,
    info: {
      location: d.address_text ?? "",
      publicTransport: d.public_transport_available ?? false,
      hotelsNearby: sortedHotelNames(d.hotels),
    },
  }
}

function mapToPlaceDetails(d: DbItemPayload): PlaceDetails {
  return {
    slug: d.slug,
    name: d.translation.title,
    region: regionLabelToType(d.region?.slug),
    coordinates: toCoords(d.lat, d.lng),
    categories: d.categories.map((c) => c.slug) as PlaceCategory[],
    tagline: d.translation.quote ?? "",
    description: d.translation.description_richtext?.split("\n\n") ?? [],
    tips: sortedTexts(d.tips),
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

function mapToActivityDetails(d: DbItemPayload): ActivityDetails {
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
    highlights: sortedTexts(d.highlights),
    tips: sortedTexts(d.tips),
    images: sortedMediaUrls(d.media),
    heroImage: d.hero_image_path ?? undefined,
    categories: d.categories.map((c) => c.slug) as ActivityCategory[],
    pricing,
    bookingUrl: d.booking_url ?? undefined,
    duration: d.duration_text ?? undefined,
    location: d.address_text ?? undefined,
    bestTime: d.best_time_text ?? undefined,
    difficulty: d.difficulty as ActivityDetails["difficulty"],
    included: d.includes?.length ? sortedLabels(d.includes) : undefined,
    notIncluded: d.not_included?.length ? sortedLabels(d.not_included) : undefined,
    whatToBring: d.what_to_bring?.length ? sortedLabels(d.what_to_bring) : undefined,
    relatedActivities: d.related?.length ? d.related.map((r) => r.slug) : undefined,
  }
}

// ---- Public API ----
const isDev = process.env.NODE_ENV !== "production"
let _shouldUseDb: boolean | null = null

async function shouldUseDb(): Promise<boolean> {
  if (_shouldUseDb !== null) return _shouldUseDb
  if (!contentDb) {
    if (isDev) console.log("[content] No CONTENT_SUPABASE_URL — using static data")
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
  mapper: (d: DbItemPayload) => T,
  fallback: Record<string, T>,
): Promise<Record<string, T>> {
  if (!(await shouldUseDb())) return fallback
  const slugs = await fetchAllPublishedSlugs(type)
  const results = await Promise.all(slugs.map((slug) => fetchItemBySlug(slug, type)))
  const result: Record<string, T> = {}
  slugs.forEach((slug, i) => {
    const d = results[i]
    if (d) result[slug] = mapper(d)
  })
  return Object.keys(result).length ? result : fallback
}

export async function getAllBeachDetails(): Promise<Record<string, BeachDetails>> {
  return fetchAllDetailsByType("beach", mapToBeachDetails, STATIC_BEACH_DETAILS)
}

export async function getBeachDetailsBySlug(slug: string): Promise<BeachDetails | null> {
  if (!(await shouldUseDb())) return STATIC_BEACH_DETAILS[slug] ?? null
  const d = await fetchItemBySlug(slug, "beach")
  return d ? mapToBeachDetails(d) : STATIC_BEACH_DETAILS[slug] ?? null
}

export async function getAllPlaceDetails(): Promise<Record<string, PlaceDetails>> {
  return fetchAllDetailsByType("place", mapToPlaceDetails, STATIC_PLACE_DETAILS)
}

export async function getPlaceDetailsBySlug(slug: string): Promise<PlaceDetails | null> {
  if (!(await shouldUseDb())) return STATIC_PLACE_DETAILS[slug] ?? null
  const d = await fetchItemBySlug(slug, "place")
  return d ? mapToPlaceDetails(d) : STATIC_PLACE_DETAILS[slug] ?? null
}

export async function getAllActivityDetails(): Promise<Record<string, ActivityDetails>> {
  return fetchAllDetailsByType("activity", mapToActivityDetails, STATIC_ACTIVITY_DETAILS)
}

export async function getActivityDetailsBySlugFromDb(slug: string): Promise<ActivityDetails | null> {
  if (!(await shouldUseDb())) return STATIC_ACTIVITY_DETAILS[slug] ?? null
  const d = await fetchItemBySlug(slug, "activity")
  return d ? mapToActivityDetails(d) : STATIC_ACTIVITY_DETAILS[slug] ?? null
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
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
      { data: tr },
      { data: cats },
      { data: tags },
      { data: media },
    ] = await Promise.all([
      contentDb.from("explored_blog_post_translations").select("*").eq("post_id", post.id).eq("locale", "en").single(),
      contentDb.from("explored_blog_post_categories").select("explored_blog_categories(slug)").eq("post_id", post.id),
      contentDb.from("explored_blog_post_tags").select("explored_blog_tags(label_en)").eq("post_id", post.id),
      contentDb
        .from("explored_blog_post_media")
        .select("image_path,sort_order,orientation,width,height")
        .eq("post_id", post.id)
        .order("sort_order"),
    ])

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
    const rawDbContent = tr.content_richtext?.trim()
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
      title: tr.title,
      excerpt: tr.excerpt ?? staticPost?.excerpt ?? "",
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

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllBlogPosts()
  return posts.find((p) => p.slug === slug) ?? null
}

export async function getRelatedBlogPosts(slug: string, limit = 3): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts()
  const current = posts.find((p) => p.slug === slug)
  if (!current) return []
  return posts
    .filter((p) => p.slug !== slug && p.categories.some((c) => current.categories.includes(c)))
    .slice(0, limit)
}

export async function getAllBeaches(): Promise<Beach[]> {
  const details = await getAllBeachDetails()
  if (details === STATIC_BEACH_DETAILS) return STATIC_ALL_BEACHES
  return Object.values(details).map((d) => ({
    name: d.name,
    slug: d.slug,
    image: d.images[0] ?? "",
    description: d.tagline,
    region: d.region,
  }))
}

export async function getRegionsFromBeaches(): Promise<{ id: Region; label: string }[]> {
  const beaches = await getAllBeaches()
  if (beaches === STATIC_ALL_BEACHES) return STATIC_REGIONS
  const unique = [...new Set(beaches.map((b) => b.region))]
  return unique.map((id) => ({ id, label: id }))
}

export async function getTopBeaches(): Promise<TopBeach[]> {
  return STATIC_TOP_BEACHES
}

export async function getAllActivities(): Promise<Activity[]> {
  const details = await getAllActivityDetails()
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

export async function getActivitiesByCategory(category: ActivityCategory): Promise<Activity[]> {
  const all = await getAllActivities()
  if (category === "all") return all
  return all.filter((a) => a.categories.includes(category))
}

export async function getAllPlaces(): Promise<PlaceDetails[]> {
  const details = await getAllPlaceDetails()
  if (details === STATIC_PLACE_DETAILS) return staticGetAllPlaces()
  return Object.values(details)
}

export async function getPlacesByCategory(category: PlaceCategory): Promise<PlaceDetails[]> {
  const all = await getAllPlaces()
  return all.filter((p) => p.categories.includes(category))
}

export async function getRelatedActivities(slug: string): Promise<ActivityDetails[]> {
  const details = await getAllActivityDetails()
  const activity = details[slug]
  if (!activity?.relatedActivities) return []
  return activity.relatedActivities.map((s) => details[s]).filter(Boolean)
}

export async function getBeachesByRegion(region: Region): Promise<BeachDetails[]> {
  const details = await getAllBeachDetails()
  return Object.values(details).filter((d) => d.region === region)
}

export async function getAllBeachSlugs(): Promise<string[]> {
  const details = await getAllBeachDetails()
  return Object.keys(details)
}

export async function getAllPlaceSlugs(): Promise<string[]> {
  const details = await getAllPlaceDetails()
  return Object.keys(details)
}

export async function getAllActivitySlugs(): Promise<string[]> {
  const details = await getAllActivityDetails()
  return Object.keys(details)
}

/** Single fetch for beaches listing page — avoids 3x duplicate fetches */
export async function getBeachesListingData(): Promise<{
  allBeaches: Beach[]
  beachDetails: Record<string, BeachDetails>
  regions: { id: Region; label: string }[]
  topBeaches: TopBeach[]
}> {
  const beachDetails = await getAllBeachDetails()
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
export async function getActivitiesListingData(): Promise<{
  allActivities: Activity[]
  activitySlugsWithPages: string[]
}> {
  const details = await getAllActivityDetails()
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
  fetchDetail: (slug: string) => Promise<{ images: string[] } | null>
): Promise<T[]> {
  const enriched = await Promise.all(
    items.map(async (item) => {
      const detail = await fetchDetail(item.slug)
      const image = detail?.images?.[0]
      return image ? { ...item, image } : item
    })
  )
  return enriched
}
/** Enrich explore section items with main image from API so cards match detail pages after admin updates */
async function enrichAcrossItems<T extends ExploreItem>(
  items: T[],
  fetchDetail: (slug: string) => Promise<{ images: string[] } | null>
): Promise<T[]> {
  const enriched = await Promise.all(
    items.map(async (item) => {
      const detail = await fetchDetail(item.slug)
      const image = detail?.images?.[0]
      return image ? { ...item, image } : item
    })
  )
  return enriched
}

export async function getExploreSectionsEnriched(): Promise<{
  topActivities: ExploreItem[]
  topBeaches: ExploreItem[]
  topPlaces: ExploreItem[]
  hiddenGems: ExploreItem[]
}> {
  const [activities, beaches, places, gems] = await Promise.all([
    enrichExploreItems(STATIC_TOP_ACTIVITIES, (slug) => getActivityDetailsBySlugFromDb(slug).then((d) => d ?? null)),
    enrichExploreItems(STATIC_TOP_BEACHES_EXPLORE, (slug) => getBeachDetailsBySlug(slug).then((d) => d ?? null)),
    enrichExploreItems(STATIC_TOP_PLACES, (slug) => getPlaceDetailsBySlug(slug).then((d) => d ?? null)),
    enrichExploreItems(STATIC_HIDDEN_GEMS, (slug) => getBeachDetailsBySlug(slug).then((d) => d ?? null)),
  ])
  return { topActivities: activities, topBeaches: beaches, topPlaces: places, hiddenGems: gems }
}
export async function getAcrossSectionsEnriched(): Promise<{
  topActivities: ExploreItem[]
  topBeaches: ExploreItem[]
  topPlaces: ExploreItem[]
  hiddenGems: ExploreItem[]
}> {
  const [activities, beaches, places, gems] = await Promise.all([
    enrichAcrossItems(STATIC_TOP_ACTIVITIES, (slug) => getActivityDetailsBySlugFromDb(slug).then((d) => d ?? null)),
    enrichAcrossItems(STATIC_TOP_BEACHES_EXPLORE, (slug) => getBeachDetailsBySlug(slug).then((d) => d ?? null)),
    enrichAcrossItems(STATIC_TOP_PLACES, (slug) => getPlaceDetailsBySlug(slug).then((d) => d ?? null)),
    enrichAcrossItems(STATIC_HIDDEN_GEMS, (slug) => getBeachDetailsBySlug(slug).then((d) => d ?? null)),
  ])
  return { topActivities: activities, topBeaches: beaches, topPlaces: places, hiddenGems: gems }
}
