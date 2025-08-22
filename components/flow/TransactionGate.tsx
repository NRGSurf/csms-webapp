"use client";

import React from "react";
import Charging from "./Charging"; // Figma ChargingSession adapter
import type { TransactionDTO } from "@/types/backend";
import { Receipt } from "@/design/figma/components/Receipt";
import type { ChargingData, SessionData } from "@/design/figma/App";

type Props = {
  stationId?: string;
  pollIntervalMs?: number; // default 4000
  onViewChange?: (view: "charging" | "receipt") => void;
};

const byNewest = (a: TransactionDTO, b: TransactionDTO) => {
  const p = (s?: string) => (s ? Date.parse(s) : NaN);
  const at = p(a.updatedAt) || p(a.createdAt) || 0;
  const bt = p(b.updatedAt) || p(b.createdAt) || 0;
  return bt - at;
};
const num = (x: unknown, d = 0) => {
  const n = Number(x);
  return Number.isFinite(n) ? n : d;
};
const isActiveFlag = (v: any) =>
  v === true || v === 1 || v === "true" || v === "TRUE";

export default function TransactionGate({
  stationId: stationIdProp,
  pollIntervalMs = 4000,
  onViewChange,
}: Props) {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [activeTx, setActiveTx] = React.useState<TransactionDTO | null>(null);
  const [latestTx, setLatestTx] = React.useState<TransactionDTO | null>(null);

  // derive token from URL every render (no state; avoids mount flicker)
  const tokenParam =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("idToken") ??
        new URLSearchParams(window.location.search).get("tokenID")
      : null;

  const lastViewRef = React.useRef<"charging" | "receipt" | null>(null);
  const timerRef = React.useRef<number | null>(null);
  const inFlightRef = React.useRef<Promise<void> | null>(null);

  const doFetch = React.useCallback(async () => {
    // De-dupe overlapping ticks
    if (inFlightRef.current) return;
    inFlightRef.current = (async () => {
      try {
        const sp = new URLSearchParams(window.location.search);
        const fromQuery = sp.get("stationId") ?? "";
        const fromPath =
          window.location.pathname.replace(/^\/+/, "").split("/")[0] || "";
        const stationId = (stationIdProp || fromQuery || fromPath).trim();

        const get = async (qs: URLSearchParams) => {
          const res = await fetch(
            `/api/backend/data/transactions?${qs.toString()}`,
            {
              method: "GET",
              cache: "no-store",
            }
          );
          const text = await res.text();
          if (!res.ok) throw new Error(`HTTP ${res.status}: ${text}`);
          const data = JSON.parse(text);
          return Array.isArray(data)
            ? (data as TransactionDTO[])
            : data
            ? [data]
            : [];
        };

        let scopedActive: TransactionDTO | null = null;
        let scopedLatest: TransactionDTO | null = null;

        if (tokenParam) {
          // Only this token decides "active"
          const qs1 = new URLSearchParams();
          if (stationId) qs1.set("stationId", stationId);
          qs1.set("idToken", tokenParam);
          const tokenList = (await get(qs1)).sort(byNewest);
          scopedActive =
            tokenList.find((t) => isActiveFlag((t as any).isActive)) ?? null;
          scopedLatest = tokenList[0] ?? null;

          // If token returns nothing at all → try station ONLY to find a receipt candidate
          if (!scopedLatest && stationId) {
            const qs2 = new URLSearchParams();
            qs2.set("stationId", stationId);
            const stationList = (await get(qs2)).sort(byNewest);
            scopedLatest = stationList[0] ?? null;
          }
        } else {
          // No token → normal behavior
          const qsA = new URLSearchParams();
          if (stationId) qsA.set("stationId", stationId);
          qsA.set("isActive", "true");
          const actives = (await get(qsA)).sort(byNewest);
          scopedActive =
            actives.find((t) => isActiveFlag((t as any).isActive)) ?? null;

          if (!scopedActive) {
            const qsAll = new URLSearchParams();
            if (stationId) qsAll.set("stationId", stationId);
            const all = (await get(qsAll)).sort(byNewest);
            scopedLatest = all[0] ?? null;
          } else {
            scopedLatest = scopedActive;
          }
        }

        setActiveTx(scopedActive);
        setLatestTx(scopedLatest);

        const view: "charging" | "receipt" = scopedActive
          ? "charging"
          : "receipt";
        if (lastViewRef.current !== view) {
          lastViewRef.current = view;
          onViewChange?.(view);
        }

        // Stop polling once we have a finished/latest and no active
        if (!scopedActive && scopedLatest && timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      } catch (e: any) {
        setError(e?.message ?? "Failed to load transactions");
      } finally {
        setLoading(false);
        inFlightRef.current = null;
      }
    })();
    await inFlightRef.current;
  }, [stationIdProp, tokenParam, onViewChange]);

  React.useEffect(() => {
    let mounted = true;

    // Leading fetch for instant UI
    (async () => {
      try {
        setLoading(true);
        setError(null);
        await doFetch();
      } catch {
        /* already handled in doFetch */
      }
    })();

    // Start one interval; don’t depend on activeTx/latestTx (prevents tight loops)
    const intervalMs = Number.isFinite(Number(pollIntervalMs))
      ? Number(pollIntervalMs)
      : 4000;
    timerRef.current = window.setInterval(() => {
      if (!mounted) return;
      // If we already stopped (receipt reached), do nothing
      if (!timerRef.current) return;
      void doFetch();
    }, intervalMs) as unknown as number;

    return () => {
      mounted = false;
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [doFetch, pollIntervalMs]);

  if (loading)
    return <div className="p-4 opacity-70 text-sm">Loading transaction…</div>;
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;
  if (!activeTx && !latestTx)
    return <div className="p-4">No transactions found.</div>;

  if (activeTx) {
    return (
      <Charging
        stationId={activeTx.stationId}
        evseId={num((activeTx as any).evseDatabaseId, 1)}
        transactionId={activeTx.transactionId}
        seconds={num((activeTx as any).timeSpentCharging)}
        kwh={num((activeTx as any).totalKwh)}
        startedAt={activeTx.createdAt}
      />
    );
  }

  const tx = latestTx!;
  const totalDuration = num((tx as any).timeSpentCharging);
  const totalEnergy = num((tx as any).totalKwh);
  const totalCost = num((tx as any).totalCost);

  const sessionData: SessionData = {
    stationId: tx.stationId,
    sessionId: tx.transactionId,
    startTime: new Date(tx.createdAt),
    totalEnergy,
    totalDuration,
    totalCost,
    pricePerKwh: 0.55,
    sessionFee: 0,
  };
  const chargingData: ChargingData = {
    timeElapsed: totalDuration,
    energyDelivered: totalEnergy,
    power: 0,
    maxPower: 0,
    runningCost: totalCost,
  };

  return (
    <Receipt
      sessionData={sessionData}
      chargingData={chargingData}
      onNewSession={() => {
        window.location.href = "/";
      }}
    />
  );
}
