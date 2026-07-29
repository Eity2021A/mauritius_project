import { getBeachesListingData } from "@/lib/content";
import BeachesListClient from "./BeachesListClient";
import { ItemListJsonLd } from "@/components/seo/JsonLd";
import { getImageUrl } from "@/lib/image-url";
import { SITE_URL } from "@/lib/constants";
import { getTranslations } from "next-intl/server";

export const revalidate = 3600;

export default async function BeachesInMauritiusPage() {
  const t = await getTranslations("BeachesHub.schema");
  const { allBeaches, beachDetails, regions } = await getBeachesListingData();

  return (
    <>
      <ItemListJsonLd
        name={t("name")}
        description={t("description")}
        itemType="Beach"
        items={allBeaches.map((beach, index) => ({
          position: index + 1,
          name: beach.name,
          url: `${SITE_URL}/beaches-in-mauritius/${beach.slug}`,
          image: getImageUrl(beach.image, { width: 800, quality: 75 }),
          description: beach.description,
        }))}
      />
      <BeachesListClient
        allBeaches={allBeaches}
        beachDetails={beachDetails}
        regions={regions}
      />
    </>
  );
}
