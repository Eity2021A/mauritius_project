"use client";

import { useTranslations } from "next-intl";

type ButtonKey =
  | "planYourTrip"
  | "exploreMauritius"
  | "exploreBeaches"
  | "viewActivities"
  | "festivalsInMauritius"
  | "badgeNew"
  | "contactUs"
  | "createNew"
  | "createFirstItinerary"
  | "bookNow"
  | "bookYourTaxi"
  | "comingSoon"
  | "back"
  | "backToPlaces"
  | "backToBeaches"
  | "backToActivities"
  | "backToItineraries"
  | "whatsapp";

/** Renders a translated Buttons.* label — safe inside server-rendered CTA wrappers. */
export default function ButtonLabel({ name }: { name: ButtonKey }) {
  const t = useTranslations("Buttons");
  return <>{t(name)}</>;
}
