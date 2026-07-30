import { getActivitiesListingData, getActivityCategories } from "@/lib/content";
import ActivitiesListClient from "./ActivitiesListClient";
import { ItemListJsonLd } from "@/components/seo/JsonLd";
import { getImageUrl } from "@/lib/image-url";
import { SITE_URL } from "@/lib/constants";
import { getTranslations } from "next-intl/server";

export const revalidate = 3600;

export default async function MauritiusActivitiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("ActivitiesHub.schema");
  const { allActivities, activitySlugsWithPages } = await getActivitiesListingData(locale);

  return (
    <>
      <ItemListJsonLd
        name={t("name")}
        description={t("description")}
        itemType="TouristAttraction"
        items={allActivities
          .filter((activity) => activitySlugsWithPages.includes(activity.slug))
          .map((activity, index) => ({
            position: index + 1,
            name: activity.name,
            url: `${SITE_URL}/top-activities-mauritius/${activity.slug}`,
            image: getImageUrl(activity.image, { width: 800, quality: 75 }),
            description: activity.description,
          }))}
      />
      <ActivitiesListClient
        allActivities={allActivities}
        activityCategories={getActivityCategories()}
        activitySlugsWithPages={activitySlugsWithPages}
      />
    </>
  );
}
