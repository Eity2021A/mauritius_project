import { getAllPlaces } from "@/lib/content";
import PlacesListClient from "./PlacesListClient";
import { ItemListJsonLd } from "@/components/seo/JsonLd";
import { getImageUrl } from "@/lib/image-url";
import { SITE_URL } from "@/lib/constants";
import { getTranslations } from "next-intl/server";

export const revalidate = 3600;

export default async function PlacesToVisitPage() {
  const t = await getTranslations("PlacesHub.schema");
  const allPlaces = await getAllPlaces();
  return (
    <>
      <ItemListJsonLd
        name={t("name")}
        description={t("description")}
        itemType="TouristAttraction"
        items={allPlaces.map((place, index) => ({
          position: index + 1,
          name: place.name,
          url: `${SITE_URL}/best-places-to-visit-in-mauritius/${place.slug}`,
          image: getImageUrl(place.heroImage ?? place.images[0], { width: 800, quality: 75 }),
          description: place.tagline,
        }))}
      />
      <PlacesListClient allPlaces={allPlaces} />
    </>
  );
}
