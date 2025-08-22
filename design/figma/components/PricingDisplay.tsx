import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  QrCode,
  CheckCircle2,
  Zap,
  MapPin,
  Euro,
  AlertCircle,
} from "lucide-react";

export type SessionData = {
  stationId: string;
  stationName: string;
  stationStatus: string;
  connector: string;
  location?: string;
  pricePerKwh: number;
};

type Props = {
  sessionData: SessionData;
  onContinue: () => void;
};

function StatusPill({ status }: { status: SessionData["stationStatus"] }) {
  const map =
    status === "Available"
      ? "border-emerald-400 text-emerald-700"
      : status === "Occupied"
      ? "border-amber-400 text-amber-700"
      : status === "Faulted"
      ? "border-red-400 text-red-700"
      : "border-gray-300 text-gray-700";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${map}`}
    >
      {status}
    </span>
  );
}

export function PricingDisplay({ sessionData, onContinue }: Props) {
  const {
    stationId,
    stationName,
    stationStatus,
    connector,
    location,
    pricePerKwh,
  } = sessionData;

  return (
    <div className="space-y-6">
      {/* Station Connected */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <QrCode className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-xl">Station Connected</CardTitle>
            </div>
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Station line */}
          <div className="flex items-start gap-3">
            <Zap className="mt-1 h-5 w-5 text-blue-600" />
            <div className="flex-1">
              <div className="mb-1 flex items-center gap-3">
                <p className="m-0 text-lg font-semibold text-gray-900">
                  {stationName}
                </p>
                <StatusPill status={stationStatus} />
              </div>
              <p className="m-0 text-gray-600">{stationId}</p>
              <span className="mt-2 inline-flex rounded-md bg-gray-100 px-3 py-1 text-sm text-gray-700">
                {connector}
              </span>
            </div>
          </div>

          {/* Location line */}
          <div className="flex items-start gap-3">
            <MapPin className="mt-1 h-5 w-5 text-emerald-600" />
            <div>
              <p className="m-0 text-lg font-semibold text-gray-900">
                Location
              </p>
              <p className="m-0 text-gray-600">{location || "—"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pricing Information */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Euro className="h-5 w-5 text-emerald-600" />
            <CardTitle className="text-xl">Pricing Information</CardTitle>
          </div>
          <p className="mt-2 text-gray-600">
            Transparent pricing as required by EU AFIR regulations
          </p>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* Price banner */}
          <div className="rounded-xl border border-emerald-200 bg-gradient-to-b from-emerald-100/40 to-emerald-50/40 p-6 text-center">
            <div className="text-4xl font-extrabold text-emerald-600">
              €{pricePerKwh.toFixed(2)}
            </div>
            <div className="font-medium text-gray-700">per kWh</div>
            <div className="mt-1 text-gray-500">Energy consumption rate</div>
          </div>

          {/* Cost examples */}
          <div className="space-y-2">
            {[
              { kWh: 10, t: "~20 min" },
              { kWh: 25, t: "~45 min" },
              { kWh: 50, t: "~1.5 hrs" },
            ].map(({ kWh, t }) => (
              <div
                key={kWh}
                className="flex items-center justify-between text-gray-900"
              >
                <span>
                  {kWh} kWh ({t})
                </span>
                <span>€{(kWh * pricePerKwh).toFixed(2)}</span>
              </div>
            ))}
          </div>

          {/* Callout */}
          <div className="rounded-xl border border-amber-200/70 bg-amber-50/70 p-4">
            <div className="flex items-center gap-2 font-semibold text-amber-800">
              <AlertCircle className="h-4 w-4" /> Payment Information
            </div>
            <ul className="ml-5 mt-2 list-disc text-amber-800">
              <li>You'll only pay for energy actually consumed</li>
              <li>Pre-authorization will be released after charging</li>
              <li>Final cost calculated when session ends</li>
              <li>Digital receipt provided immediately</li>
            </ul>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <Badge
              variant="outline"
              className="border-emerald-400 text-emerald-700"
            >
              EU AFIR Compliant
            </Badge>
            <Badge variant="outline" className="border-blue-400 text-blue-700">
              Secure Payment
            </Badge>
          </div>

          {/* CTA */}
          <div className="flex justify-center">
            <Button
              onClick={onContinue}
              className="rounded-2xl bg-gray-900 px-6 py-3 text-white hover:bg-gray-800"
            >
              Accept Pricing & Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
