import { getBeachesListingData } from "@/lib/content";
import BeachesListClient from "./BeachesListClient";

export const revalidate = 3600;

export default async function BeachesInMauritiusPage() {
  const { allBeaches, beachDetails, regions, topBeaches } = await getBeachesListingData();

  return (
    <BeachesListClient
      allBeaches={allBeaches}
      beachDetails={beachDetails}
      regions={regions}
      topBeaches={topBeaches}
    />
  );
}
