import React from "react";
import type { StationInfo } from "./types";
import { PricingDisplay } from "../../design/figma/components/PricingDisplay";
import type { SessionData } from "../../design/figma/App";

type Props = {
  stationId: string;
  station?: StationInfo | null;
  status?:
    | "Available"
    | "Occupied"
    | "Reserved"
    | "Unavailable"
    | "Faulted"
    | "Unknown";
  onAcceptPricing: () => void;
};

function formatLocation(station: any): string {
  const loc = (station && (station as any).location) || undefined;
  if (!loc) return "";
  if (typeof loc === "string") return loc;
  const parts: string[] = [];
  if (typeof loc.address === "string") parts.push(loc.address);
  if (typeof loc.city === "string") parts.push(loc.city);
  if (typeof loc.country === "string") parts.push(loc.country);
  return parts.filter(Boolean).join(", ");
}

function mapStatus(status?: Props["status"]): SessionData["stationStatus"] {
  switch (status) {
    case "Available":
      return "available";
    case "Occupied":
    case "Reserved":
      return "busy";
    case "Faulted":
    case "Unavailable":
    case "Unknown":
    default:
      return "maintenance";
  }
}

export default function Overview({
  stationId,
  station,
  status,
  onAcceptPricing,
}: Props) {
  // Resolve pricing from your station object (fallbacks keep UI working if data is missing)
  const tariff: any = (station as any)?.tariff || {};
  const current: any = (station as any)?.currentPriceType || null;

  const pricePerKwh: number =
    typeof current?.pricePerKwh === "number"
      ? current.pricePerKwh
      : typeof tariff?.pricePerKwh === "number"
      ? tariff.pricePerKwh
      : 0.55;

  const sessionFee: number =
    typeof tariff?.pricePerSession === "number" ? tariff.pricePerSession : 1.5;

  const sessionData: SessionData = {
    stationId,
    stationName:
      (station as any)?.name || (station as any)?.location?.name || stationId,
    stationStatus: mapStatus(status),
    location: formatLocation(station),
    connector:
      (station as any)?.connectorId != null
        ? `Connector ${(station as any).connectorId}`
        : "CCS Type 2",
    // The following fields are not yet known on the Overview screen; send safe defaults
    sessionId: "",
    startTime: new Date(),
    totalEnergy: 0,
    totalDuration: 0,
    totalCost: 0,
    pricePerKwh,
    sessionFee,
  };

  return (
    <PricingDisplay sessionData={sessionData} onContinue={onAcceptPricing} />
  );
}
