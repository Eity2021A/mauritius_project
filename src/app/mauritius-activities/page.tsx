import { getActivitiesListingData, getActivityCategories } from "@/lib/content";
import ActivitiesListClient from "./ActivitiesListClient";

export const revalidate = 3600;

export default async function MauritiusActivitiesPage() {
  const { allActivities, activitySlugsWithPages } = await getActivitiesListingData();

  return (
    <ActivitiesListClient
      allActivities={allActivities}
      activityCategories={getActivityCategories()}
      activitySlugsWithPages={activitySlugsWithPages}
    />
  );
}
