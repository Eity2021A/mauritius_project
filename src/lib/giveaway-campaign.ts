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
}

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

export function getGiveawayCampaignApiUrl() {
  // Use the public backend or Supabase Edge Function URL when configured.
  // Retain the plural variable as a compatibility fallback for existing deployments.
  const explicitUrl =
    normalizeBaseUrl(process.env.NEXT_PUBLIC_GIVEAWAY_CAMPAIGN_API_URL) ??
    normalizeBaseUrl(process.env.NEXT_PUBLIC_GIVEAWAY_CAMPAIGNS_API_URL)

  return explicitUrl ?? "/api/giveaway_campaigns"
}

export async function fetchGiveawayCampaign(signal?: AbortSignal) {
  const response = await fetch(getGiveawayCampaignApiUrl(), {
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
