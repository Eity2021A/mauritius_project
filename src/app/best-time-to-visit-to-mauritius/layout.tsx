import { Metadata } from "next";
import { DEFAULT_OG_IMAGE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Best Time to Visit Mauritius 2026 | Month by Month Weather Guide",
  description: "Discover the best time to visit Mauritius. Complete month-by-month weather guide, season overview, cyclone information, and expert tips for planning your perfect trip.",
  openGraph: {
    title: "Best Time to Visit Mauritius 2026",
    description: "Your complete guide to Mauritius weather and seasons. Find the perfect time for your holiday.",
    images: [DEFAULT_OG_IMAGE],
  },
  alternates: { canonical: "/best-time-to-visit-to-mauritius" },
};

export default function BestTimeToVisitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
