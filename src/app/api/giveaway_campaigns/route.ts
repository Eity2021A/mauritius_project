import { NextResponse } from "next/server"
import { contentDb } from "@/lib/supabase"

const NO_STORE_HEADERS = {
  "Cache-Control": "no-store, max-age=0",
}

const fields = "slug, is_active, draw_date, draw_date_label, subtitle, headline, card_title, card_text, card_icon"

export async function GET() {
  try {
    if (!contentDb) {
      return NextResponse.json(
        { error: "Missing content database environment variables." },
        { status: 500, headers: NO_STORE_HEADERS }
      )
    }

    const { data, error } = await contentDb
      .from("giveaway_campaigns")
      .select(fields)
      .eq("is_active", true)
      .order("updated_at", { ascending: false })
      .limit(1)
      .maybeSingle()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500, headers: NO_STORE_HEADERS })
    }

    if (!data) {
      return NextResponse.json(
        { error: "Active giveaway campaign not found." },
        { status: 404, headers: NO_STORE_HEADERS }
      )
    }

    return NextResponse.json(data, { headers: NO_STORE_HEADERS })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error."
    return NextResponse.json({ error: message }, { status: 500, headers: NO_STORE_HEADERS })
  }
}
