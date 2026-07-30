import { permanentRedirect } from "next/navigation";

/**
 * All activity (and place) detail pages live at /top-activities-mauritius/[slug].
 * This route redirects old /mauritius-activities/[slug] URLs to the canonical URL.
 */
export default async function ActivitySlugRedirect({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const prefix = locale === "en" ? "" : `/${locale}`;
  permanentRedirect(`${prefix}/top-activities-mauritius/${slug}`);
}
