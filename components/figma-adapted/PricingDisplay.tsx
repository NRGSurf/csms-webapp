import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Euro,
  Zap,
  Clock,
  AlertCircle,
  Info,
  MapPin,
  CheckCircle2,
  QrCode,
} from "lucide-react";

export interface SessionData {
  stationId: string;
  stationName: string;
  stationStatus: "available" | "busy" | "maintenance";
  location: string;
  connector: string;
  pricePerKwh: number;
  sessionFee: number;
}

interface PricingDisplayProps {
  sessionData: SessionData;
  onContinue: () => void;
}

const statusColor = (status: SessionData["stationStatus"]) => {
  switch (status) {
    case "available":
      return {
        border: "border-green-500",
        text: "text-green-700",
        dot: "bg-green-500",
      };
    case "busy":
      return {
        border: "border-amber-500",
        text: "text-amber-700",
        dot: "bg-amber-500",
      };
    default:
      return {
        border: "border-neutral-300",
        text: "text-neutral-700",
        dot: "bg-neutral-400",
      };
  }
};

export function PricingDisplay({
  sessionData,
  onContinue,
}: PricingDisplayProps) {
  const c = statusColor(sessionData.stationStatus);
  const examples = [10, 25, 50].map((kwh) => ({
    kwh,
    price: kwh * sessionData.pricePerKwh + sessionData.sessionFee,
    mins: Math.round((kwh / 30) * 60), // assume ~30 kW average
  }));

  return (
    <div className="space-y-4">
      {/* Station Information */}
      <Card className="shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <QrCode className="size-5 text-blue-500" />
              Station Connected
            </CardTitle>
            <CheckCircle2 className="size-5 text-green-500" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Zap className="size-5 text-blue-500 mt-0.5 shrink-0" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium text-neutral-900">
                    {sessionData.stationName}
                  </p>
                  <Badge variant="outline" className={`${c.border} ${c.text}`}>
                    {sessionData.stationStatus === "available"
                      ? "Available"
                      : sessionData.stationStatus === "busy"
                      ? "Busy"
                      : "Maintenance"}
                  </Badge>
                </div>
                <p className="text-neutral-600 text-sm">
                  {sessionData.stationId}
                </p>
                <Badge variant="secondary" className="mt-1">
                  {sessionData.connector}
                </Badge>
              </div>
            </div>
            <div className="flex items-start gap-3 text-neutral-600">
              <MapPin className="size-5 mt-0.5 shrink-0 text-blue-500" />
              <p className="text-sm">{sessionData.location}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pricing */}
      <Card className="shadow-lg">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Euro className="size-5 text-green-600" />
              Pricing
            </CardTitle>
            <div className="flex items-center gap-2 text-xs text-neutral-600">
              <Clock className="size-4" />
              Not time-based
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Main Price */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-200">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                €{sessionData.pricePerKwh.toFixed(2)}
              </div>
              <p className="text-neutral-700 font-medium">per kWh</p>
              <p className="text-neutral-600 text-sm mt-1">
                Energy consumption rate
              </p>
            </div>
          </div>

          {/* Breakdown */}
          <div className="space-y-3">
            <h3 className="font-medium text-neutral-900 flex items-center gap-2">
              <Info className="size-4 text-blue-500" />
              Complete Price Breakdown
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Zap className="size-4 text-blue-500" />
                  <span className="font-medium">Energy Rate</span>
                </div>
                <span className="font-medium">
                  €{sessionData.pricePerKwh.toFixed(2)} / kWh
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertCircle className="size-4 text-blue-500" />
                  <span className="font-medium">Session Fee</span>
                </div>
                <span className="font-medium">
                  €{sessionData.sessionFee.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-neutral-600 pt-1">
              <span className="inline-flex size-2 rounded-full bg-green-500"></span>
              No idle fees during charging
            </div>
          </div>

          {/* Examples */}
          <div className="rounded-2xl border p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-600">
                Cost examples (est.)
              </span>
              <span className="text-xs text-neutral-500">~30 kW average</span>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-3">
              {examples.map((ex) => (
                <div
                  key={ex.kwh}
                  className="rounded-xl bg-neutral-50 p-3 text-center"
                >
                  <div className="text-sm font-medium">{ex.kwh} kWh</div>
                  <div className="text-xs text-neutral-600 mb-1">
                    {ex.mins} min
                  </div>
                  <div className="font-semibold">€{ex.price.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            <Badge
              variant="outline"
              className="border-green-500 text-green-700"
            >
              🇪🇺 EU AFIR Compliant
            </Badge>
            <Badge variant="outline" className="border-blue-500 text-blue-700">
              🔒 Secure Payment
            </Badge>
          </div>

          {/* Action */}
          <Button
            onClick={onContinue}
            size="lg"
            className="w-full h-14 text-base"
          >
            Accept Pricing & Continue
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
