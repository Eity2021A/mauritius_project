import type { Metadata } from "next";
import type { ReactNode } from "react";
import { NOINDEX_NOFOLLOW_ROBOTS } from "@/lib/seo";

export const metadata: Metadata = {
  robots: NOINDEX_NOFOLLOW_ROBOTS,
};

export default function SharedItineraryLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
