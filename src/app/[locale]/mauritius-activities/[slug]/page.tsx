import { permanentRedirect } from "next/navigation";

/**
 * All activity (and place) detail pages live at /top-activities-mauritius/[slug].
 * This route redirects old /mauritius-activities/[slug] URLs to the canonical URL.
 */
export default async function ActivitySlugRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  permanentRedirect(`/top-activities-mauritius/${slug}`);
}
