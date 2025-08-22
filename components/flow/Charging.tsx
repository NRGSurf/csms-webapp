// components/flow/Charging.tsx
import React, { useMemo } from "react";
import { ChargingSession } from "../../design/figma/components/ChargingSession";
import type { ChargingData, SessionData } from "../../design/figma/types";

type Props =
  | {
      stationId: string;
      evseId: number;
      connectorId?: never;
      transactionId?: string;
      kwh?: number;
      seconds?: number;
      startedAt?: string;
    }
  | {
      stationId: string;
      connectorId: number;
      evseId?: never;
      transactionId?: string;
      kwh?: number;
      seconds?: number;
      startedAt?: string;
    };

export default function Charging(props: Props) {
  const {
    stationId,
    transactionId,
    kwh = 0,
    seconds = 0,
    startedAt,
  } = props as any;

  // Map to Figma types with sensible defaults
  const chargingData: ChargingData = useMemo(() => ({
    timeElapsed: Math.max(0, Math.round(seconds / 60)), // minutes
    energyDelivered: kwh,
    chargingSpeed: kwh > 0 && seconds > 0 ? (kwh / (seconds / 3600)) : 0, // kW approx
    runningCost: kwh * 0.55, // fallback price
  }), [kwh, seconds]);

  const sessionData: SessionData = useMemo(() => ({
    stationId,
    stationName: stationId,
    stationStatus: 'busy',
    location: '',
    connector: (props as any).connectorId ? `Connector ${(props as any).connectorId}` : `EVSE ${(props as any).evseId}`,
    sessionId: transactionId || '',
    startTime: startedAt ? new Date(startedAt) : new Date(Date.now() - seconds * 1000),
    totalEnergy: kwh,
    totalDuration: seconds,
    totalCost: chargingData.runningCost,
    pricePerKwh: 0.55,
    sessionFee: 0,
  }), [stationId, transactionId, startedAt, seconds, kwh, chargingData.runningCost]);

  return (
    <ChargingSession
      chargingData={chargingData}
      sessionData={sessionData}
      isCharging={true}
      onStopCharging={() => {/* optional: wire remoteStop here if needed */}}
    />
  );
}
