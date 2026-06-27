import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

const LISTING_PAGES = [
  "/",
  "/beaches-in-mauritius",
  "/best-places-to-visit-in-mauritius",
  "/mauritius-activities",
  "/blog",
  "/explore",
  "/explore/activities",
  "/explore/beaches",
  "/top-15-things-to-do-in-mauritius",
  "/itineraries-mauritius",
  "/mauritius-itinerary",
]

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-revalidate-secret")
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  let body: { paths?: string[] } = {}
  try {
    body = await req.json()
  } catch {
    /* no body = revalidate everything */
  }

  const revalidated: string[] = []

  if (body.paths?.length) {
    for (const p of body.paths) {
      revalidatePath(p, "page")
      revalidated.push(p)
    }
  }

  for (const p of LISTING_PAGES) {
    revalidatePath(p, "page")
    revalidated.push(p)
  }

  revalidatePath("/top-activities-mauritius/[slug]", "page")
  revalidated.push("/top-activities-mauritius/[slug]")

  revalidatePath("/best-places-to-visit-in-mauritius/[slug]", "page")
  revalidated.push("/best-places-to-visit-in-mauritius/[slug]")

  revalidatePath("/beaches-in-mauritius/[slug]", "page")
  revalidated.push("/beaches-in-mauritius/[slug]")

  revalidatePath("/blog/[slug]", "page")
  revalidated.push("/blog/[slug]")

  return NextResponse.json({ revalidated: true, paths: revalidated })
}
