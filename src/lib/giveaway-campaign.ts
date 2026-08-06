export type GiveawayLocale = "en" | "fr" | "de" | "it" | "es" | "ru"
type GiveawayCampaignField = "draw_date_label" | "subtitle" | "headline" | "card_title" | "card_text"

export type GiveawayCampaignData = {
  id?: string
  slug: string
  is_active?: boolean
  draw_date?: string | null
  draw_date_label: string | null
  subtitle: string | null
  headline: string
  card_title: string
  card_text: string
  card_icon?: string | null
  translations?: Partial<Record<GiveawayLocale, Partial<Record<GiveawayCampaignField, string | null>>>> | null
} & Partial<Record<`${GiveawayCampaignField}_${GiveawayLocale}`, string | null>>

export const DEFAULT_GIVEAWAY_CAMPAIGN: GiveawayCampaignData = {
  slug: "weekend-experiences-2026",
  draw_date_label: "7th June 2026",
  subtitle:
    "Simply enter your details below, re-share on Facebook or Instagram, and you could be our lucky winner.",
  headline: "This week's giveaway (for 2 people)",
  card_title: "7th June 2026",
  card_text: "Weekend at Shangri-La Le Touessrok",
  card_icon: "trophy",
}

function normalizeBaseUrl(value: string | undefined) {
  return typeof value === "string" && value.trim() ? value.trim().replace(/\/+$/, "") : null
}

export function normalizeGiveawayLocale(value: string | undefined | null): GiveawayLocale {
  const locale = value?.toLowerCase()
  return locale && ["en", "fr", "de", "it", "es", "ru"].includes(locale) ? (locale as GiveawayLocale) : "en"
}

function addLangParam(url: string, locale: string | undefined) {
  const separator = url.includes("?") ? "&" : "?"
  return `${url}${separator}lang=${encodeURIComponent(normalizeGiveawayLocale(locale))}`
}

const giveawayText: Record<
  GiveawayLocale,
  Partial<Record<GiveawayCampaignField, string>>
> = {
  en: {},
  fr: {
    draw_date_label: "26 juillet 2026 à 12 h",
    subtitle:
      "Il vous suffit de saisir vos coordonnées ci-dessous, de repartager la publication sur Facebook ou Instagram, et vous pourriez être l’heureux gagnant d’une excursion en quad (Sensation, 2 h). Explorez le Sud sauvage.",
    headline: "Le concours de cette semaine (pour 2 personnes)",
    card_title: "26 juillet 2026",
    card_text: "Aventure en quad pour 2",
  },
  de: {
    draw_date_label: "26. Juli 2026 um 12:00 Uhr",
    subtitle:
      "Geben Sie einfach unten Ihre Daten ein, teilen Sie den Beitrag erneut auf Facebook oder Instagram, und Sie könnten der glückliche Gewinner einer Quad-Tour (Sensation, 2 Std.) sein. Entdecken Sie den wilden Süden.",
    headline: "Das Gewinnspiel dieser Woche (für 2 Personen)",
    card_title: "26. Juli 2026",
    card_text: "Quad-Abenteuer für 2",
  },
  it: {
    draw_date_label: "26 luglio 2026 alle 12:00",
    subtitle:
      "Ti basta inserire i tuoi dati qui sotto, ricondividere il post su Facebook o Instagram, e potresti essere il fortunato vincitore di un tour in quad (Sensation, 2 ore). Esplora il selvaggio Sud.",
    headline: "Il giveaway di questa settimana (per 2 persone)",
    card_title: "26 luglio 2026",
    card_text: "Avventura in quad per 2",
  },
  es: {
    draw_date_label: "26 de julio de 2026 a las 12:00",
    subtitle:
      "Solo tienes que introducir tus datos abajo, volver a compartir la publicación en Facebook o Instagram, y podrías ser el afortunado ganador de una excursión en quad (Sensation, 2 h). Explora el sur salvaje.",
    headline: "El sorteo de esta semana (para 2 personas)",
    card_title: "26 de julio de 2026",
    card_text: "Aventura en quad para 2",
  },
  ru: {
    draw_date_label: "26 июля 2026 г. в 12:00",
    subtitle:
      "Просто введите свои данные ниже, повторно поделитесь публикацией в Facebook или Instagram, и вы можете стать счастливым победителем квадро-тура (Sensation, 2 часа). Откройте для себя дикий юг.",
    headline: "Розыгрыш этой недели (для 2 человек)",
    card_title: "26 июля 2026 г.",
    card_text: "Квадро-приключение для 2",
  },
}

const knownEnglishCampaignText: Record<string, string[]> = {
  draw_date_label: [DEFAULT_GIVEAWAY_CAMPAIGN.draw_date_label ?? "", "26th July 2026 at 12pm"],
  subtitle: [
    DEFAULT_GIVEAWAY_CAMPAIGN.subtitle ?? "",
    "Simply enter your details below, re-share on Facebook or Instagram, and you could be our lucky winner for a Quad Bike Tour (Sensation 2 hrs) Explore the wild South",
  ],
  headline: [DEFAULT_GIVEAWAY_CAMPAIGN.headline, "This week's giveaway (for 2 people)"],
  card_title: [DEFAULT_GIVEAWAY_CAMPAIGN.card_title, "26th July 2026"],
  card_text: [DEFAULT_GIVEAWAY_CAMPAIGN.card_text, "Quad Bike Adventure for 2"],
}

const localizableFields: GiveawayCampaignField[] = ["draw_date_label", "subtitle", "headline", "card_title", "card_text"]

function isKnownEnglishCampaignText(field: GiveawayCampaignField, value: string | null | undefined) {
  if (!value?.trim()) return true
  const normalizedValue = value.trim().replace(/\s+/g, " ")
  return knownEnglishCampaignText[field]?.some((text) => text.trim().replace(/\s+/g, " ") === normalizedValue) ?? false
}

export function localizeGiveawayCampaign(campaign: GiveawayCampaignData, locale: string | undefined | null) {
  const language = normalizeGiveawayLocale(locale)
  if (language === "en") return campaign
  const localized = { ...campaign }
  let appliedBackendTranslation = false

  for (const field of localizableFields) {
    const columnValue = campaign[`${field}_${language}`]
    const jsonValue = campaign.translations?.[language]?.[field]
    const backendValue = typeof columnValue === "string" && columnValue.trim() ? columnValue : jsonValue

    if (typeof backendValue === "string" && backendValue.trim()) {
      localized[field] = backendValue
      appliedBackendTranslation = true
    }
  }

  if (!appliedBackendTranslation) {
    Object.entries(giveawayText[language]).forEach(([field, value]) => {
      if (value) {
        localized[field as GiveawayCampaignField] = value
      }
    })
  } else {
    Object.entries(giveawayText[language]).forEach(([field, value]) => {
      const key = field as GiveawayCampaignField
      if (value && isKnownEnglishCampaignText(key, localized[key])) {
        localized[key] = value
      }
    })
  }

  return localized
}

export function getGiveawayCampaignApiUrl(locale?: string) {
  // Use the public backend or Supabase Edge Function URL when configured.
  // Retain the plural variable as a compatibility fallback for existing deployments.
  const explicitUrl =
    normalizeBaseUrl(process.env.NEXT_PUBLIC_GIVEAWAY_CAMPAIGN_API_URL) ??
    normalizeBaseUrl(process.env.NEXT_PUBLIC_GIVEAWAY_CAMPAIGNS_API_URL)

  return addLangParam(explicitUrl ?? "/api/giveaway-campaign", locale)
}

export async function fetchGiveawayCampaign(locale?: string, signal?: AbortSignal) {
  const response = await fetch(getGiveawayCampaignApiUrl(locale), {
    signal,
    headers: {
      Accept: "application/json",
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to load giveaway campaign (${response.status}).`)
  }

  return (await response.json()) as GiveawayCampaignData
}
