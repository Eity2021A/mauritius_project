import { NextResponse } from "next/server"
import { localizeGiveawayCampaign, normalizeGiveawayLocale, type GiveawayCampaignData } from "@/lib/giveaway-campaign"
import { contentDb } from "@/lib/supabase"

const NO_STORE_HEADERS = {
  "Cache-Control": "no-store, max-age=0",
}

const fields = "slug, is_active, draw_date, draw_date_label, subtitle, headline, card_title, card_text, card_icon"
const translatedFields = [
  fields,
  "draw_date_label_fr, subtitle_fr, headline_fr, card_title_fr, card_text_fr",
  "draw_date_label_de, subtitle_de, headline_de, card_title_de, card_text_de",
  "draw_date_label_it, subtitle_it, headline_it, card_title_it, card_text_it",
  "draw_date_label_es, subtitle_es, headline_es, card_title_es, card_text_es",
  "draw_date_label_ru, subtitle_ru, headline_ru, card_title_ru, card_text_ru",
].join(", ")
const translatedJsonFields = [fields, "translations"].join(", ")

type CampaignRow = Record<string, unknown> & {
  translations?: Record<string, Partial<Record<string, string | null>>> | null
}

function applyTranslations(data: CampaignRow, locale: ReturnType<typeof normalizeGiveawayLocale>) {
  if (locale === "en") return data

  const translated = data.translations?.[locale] ?? {}
  const localizableFields = ["draw_date_label", "subtitle", "headline", "card_title", "card_text"]

  return localizableFields.reduce<CampaignRow>(
    (campaign, field) => {
      const columnValue = data[`${field}_${locale}`]
      const jsonValue = translated[field]
      const value = typeof columnValue === "string" && columnValue.trim() ? columnValue : jsonValue

      if (typeof value === "string" && value.trim()) {
        campaign[field] = value
      }

      return campaign
    },
    { ...data }
  )
}

async function getActiveCampaign(selectFields: string) {
  return contentDb!
    .from("giveaway_campaigns")
    .select(selectFields)
    .eq("is_active", true)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle()
}

export async function GET(request: Request) {
  try {
    const locale = normalizeGiveawayLocale(new URL(request.url).searchParams.get("lang"))

    if (!contentDb) {
      return NextResponse.json(
        { error: "Missing content database environment variables." },
        { status: 500, headers: NO_STORE_HEADERS }
      )
    }

    let { data, error } = await getActiveCampaign(translatedFields)

    if (error) {
      ;({ data, error } = await getActiveCampaign(translatedJsonFields))
    }

    if (error) {
      ;({ data, error } = await getActiveCampaign(fields))
    }

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500, headers: NO_STORE_HEADERS })
    }

    if (!data) {
      return NextResponse.json(
        { error: "Active giveaway campaign not found." },
        { status: 404, headers: NO_STORE_HEADERS }
      )
    }

    const campaign = applyTranslations(data as unknown as CampaignRow, locale) as unknown as GiveawayCampaignData

    return NextResponse.json(localizeGiveawayCampaign(campaign, locale), { headers: NO_STORE_HEADERS })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error."
    return NextResponse.json({ error: message }, { status: 500, headers: NO_STORE_HEADERS })
  }
}
