import * as React from "react";

// import the Figma component (adjust path/names to match export)
import PricingDisplay from "@/design/figma/components/PricingDisplay";
// if the name differs, open the file and check its default export

type Props = {
  stationName: string;
  addressLine?: string;
  priceValue: number;
  priceUnit: string; // e.g. "EUR/kWh"
  windowLabel?: string; // e.g. "12:00 – 23:59"
  status:
    | "available"
    | "occupied"
    | "reserved"
    | "unavailable"
    | "faulted"
    | "unknown";
  onStart: () => void;
};

export default function OverviewView(props: Props) {
  const bullets = [
    { title: "Type 2 • 22 kW" },
    { title: "RoHS + CE certified" },
    { title: "24/7 support" },
  ];

  return (
    <div className="p-0">
      <PricingDisplay
        title={props.stationName}
        subtitle={props.addressLine}
        stationId={props.stationName}
        priceValue={props.priceValue}
        priceUnit={props.priceUnit}
        windowLabel={props.windowLabel}
        status={props.status}
        bullets={bullets}
        ctaLabel={props.status === "available" ? "Start" : "Refresh"}
        onCta={props.onStart}
      />
    </div>
  );
}
