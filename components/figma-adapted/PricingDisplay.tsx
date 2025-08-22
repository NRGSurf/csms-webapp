import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Euro,
  Zap,
  AlertCircle,
  MapPin,
  CheckCircle2,
  QrCode,
} from "lucide-react";

// Local type to avoid external deps
type SessionData = {
  stationId: string;
  stationName: string;
  stationStatus: string;
  location: string;
  connector: string;
  pricePerKwh: number;
};

interface Props {
  sessionData: SessionData;
  onContinue: () => void;
}

function StatusBadge({ status }: { status: string }) {
  const color =
    status === "Available"
      ? "var(--green-9)"
      : status === "Occupied"
      ? "var(--amber-9)"
      : status === "Faulted"
      ? "var(--red-9)"
      : "var(--gray-9)";
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "2px 10px",
        borderRadius: 999,
        border: `1px solid ${color}`,
        color,
      }}
    >
      {status}
    </span>
  );
}

export default function PricingDisplay({ sessionData, onContinue }: Props) {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      {/* Station card */}
      <Card>
        <CardHeader>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <QrCode size={20} color="var(--blue-9)" />
              <CardTitle>Station Connected</CardTitle>
            </div>
            <CheckCircle2 size={20} color="var(--green-9)" />
          </div>
        </CardHeader>
        <CardContent>
          <div style={{ display: "grid", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <Zap size={20} color="var(--blue-9)" />
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 4,
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      fontWeight: 600,
                      color: "var(--gray-12)",
                    }}
                  >
                    {sessionData.stationName}
                  </p>
                  <StatusBadge status={sessionData.stationStatus} />
                </div>
                <p style={{ margin: 0, color: "var(--gray-11)" }}>
                  {sessionData.stationId}
                </p>
                <span
                  style={{
                    display: "inline-flex",
                    padding: "4px 10px",
                    borderRadius: 8,
                    background: "var(--gray-3)",
                    color: "var(--gray-11)",
                    marginTop: 6,
                  }}
                >
                  {sessionData.connector}
                </span>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <MapPin size={20} color="var(--green-9)" />
              <div>
                <p
                  style={{
                    margin: 0,
                    fontWeight: 600,
                    color: "var(--gray-12)",
                  }}
                >
                  Location
                </p>
                <p style={{ margin: 0, color: "var(--gray-11)" }}>
                  {sessionData.location || "—"}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pricing card */}
      <Card>
        <CardHeader>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Euro size={20} color="var(--green-9)" />
            <CardTitle>Pricing Information</CardTitle>
          </div>
          <p style={{ marginTop: 6, marginBottom: 0, color: "var(--gray-11)" }}>
            Transparent pricing as required by EU AFIR regulations
          </p>
        </CardHeader>

        <CardContent>
          <div
            style={{
              borderRadius: 12,
              padding: 16,
              background:
                "linear-gradient(180deg, rgba(34,197,94,0.06), rgba(34,197,94,0.03))",
              border: "1px solid rgba(34,197,94,.3)",
              textAlign: "center",
              marginBottom: 16,
            }}
          >
            <div
              style={{
                fontSize: 40,
                fontWeight: 800,
                color: "var(--green-11)",
              }}
            >
              €{sessionData.pricePerKwh.toFixed(2)}
            </div>
            <div style={{ color: "var(--gray-11)", fontWeight: 500 }}>
              per kWh
            </div>
            <div style={{ color: "var(--gray-10)", marginTop: 4 }}>
              Energy consumption rate
            </div>
          </div>

          {/* Examples */}
          <div style={{ display: "grid", gap: 8, marginBottom: 16 }}>
            {[
              { kWh: 10, time: "~20 min" },
              { kWh: 25, time: "~45 min" },
              { kWh: 50, time: "~1.5 hrs" },
            ].map(({ kWh, time }) => (
              <div
                key={kWh}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "var(--gray-12)",
                }}
              >
                <span>
                  {kWh} kWh ({time})
                </span>
                <span>€{(kWh * sessionData.pricePerKwh).toFixed(2)}</span>
              </div>
            ))}
          </div>

          {/* Payment info callout */}
          <div
            style={{
              borderRadius: 12,
              border: "1px solid rgba(245,158,11,.35)",
              background: "rgba(245,158,11,.12)",
              padding: 14,
              marginBottom: 16,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontWeight: 600,
                color: "var(--amber-10)",
              }}
            >
              <AlertCircle size={18} />
              Payment Information
            </div>
            <ul style={{ margin: "8px 0 0 20px", color: "var(--amber-11)" }}>
              <li>You'll only pay for energy actually consumed</li>
              <li>Pre-authorization will be released after charging</li>
              <li>Final cost calculated when session ends</li>
              <li>Digital receipt provided immediately</li>
            </ul>
          </div>

          {/* Badges & button */}
          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <Badge>EU AFIR Compliant</Badge>
            <Badge>Secure Payment</Badge>
          </div>

          <div
            style={{ display: "flex", justifyContent: "center", marginTop: 16 }}
          >
            <Button onClick={onContinue}>Accept Pricing & Continue</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
