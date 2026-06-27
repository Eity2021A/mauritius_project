import { getAllPlaces } from "@/lib/content";
import PlacesListClient from "./PlacesListClient";

export const revalidate = 3600;

export default async function PlacesToVisitPage() {
  const allPlaces = await getAllPlaces();
  return <PlacesListClient allPlaces={allPlaces} />;
}
