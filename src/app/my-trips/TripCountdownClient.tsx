"use client";

import TripCountdown from "@/components/TripCountdown";

export default function TripCountdownClient({ tripStart }: { tripStart: string }) {
  return <TripCountdown tripStart={tripStart} compact />;
}
