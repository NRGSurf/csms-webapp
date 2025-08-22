"use client";

import React from "react";
import ChargingProgress from "../flow/Charging";
import { Receipt } from "../../design/figma/components/Receipt"; // <-- adjust path if needed

type Transaction = {
  id: number | string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  startedAt?: string;
  endedAt?: string;
  [key: string]: any;
};

type Props = {
  /** Optional override if you don’t want to read from window.location */
  idTokenFromProps?: string | null;
  stationIdFromProps?: string | null;
  /** Backend base, e.g. https://api.example.com */
  apiBase?: string;
  /** Path for the endpoint (default: /transactions) */
  transactionsPath?: string;
};

function getQueryParam(name: string): string | null {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get(name);
}

function newestTimestamp(t: Transaction): number {
  // Try several common timestamp fields and fall back to id
  const candidates = [t.updatedAt, t.createdAt, t.endedAt, t.startedAt].filter(
    Boolean
  ) as string[];
  const time = candidates.length ? Date.parse(candidates[0]) : NaN;
  if (!Number.isNaN(time)) return time;
  // last resort: numeric id
  const idNum = typeof t.id === "number" ? t.id : Number(t.id);
  return Number.isFinite(idNum) ? idNum : 0;
}

export default function TransactionSwitcher({
  idTokenFromProps = null,
  stationIdFromProps = null,
  apiBase = process.env.NEXT_PUBLIC_API_URL || "",
  transactionsPath = "/transactions",
}: Props) {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [activeTx, setActiveTx] = React.useState<Transaction | null>(null);
  const [latestTx, setLatestTx] = React.useState<Transaction | null>(null);

  React.useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        setLoading(true);
        setError(null);

        // Read from URL unless props override
        const idToken =
          idTokenFromProps ??
          getQueryParam("idToken") ??
          getQueryParam("tokenID");
        const stationId = stationIdFromProps ?? getQueryParam("stationId");

        const qs = new URLSearchParams();

        // Important: If idToken is present, DO NOT include isActive in the request.
        if (idToken) {
          qs.set("idToken", idToken);
        } else {
          // No token in URL → use isActive filter
          qs.set("isActive", "true");
        }

        if (stationId) {
          qs.set("stationId", stationId);
        }

        const url = `${apiBase}${transactionsPath}?${qs.toString()}`;
        const res = await fetch(url, { cache: "no-store" });

        if (!res.ok) {
          throw new Error(`Request failed (${res.status})`);
        }

        const data = await res.json();

        // Normalize to array
        const list: Transaction[] = Array.isArray(data)
          ? data
          : data
          ? [data]
          : [];

        // Choose the newest transaction deterministically
        list.sort((a, b) => newestTimestamp(b) - newestTimestamp(a));

        const firstActive = list.find((t) => t?.isActive === true) || null;
        const newest = list[0] ?? null;

        if (!cancelled) {
          setActiveTx(firstActive);
          setLatestTx(newest);
        }
      } catch (e: any) {
        if (!cancelled) {
          setError(e?.message || "Unknown error");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [apiBase, transactionsPath, idTokenFromProps, stationIdFromProps]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8 text-sm opacity-70">
        Loading transaction…
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-600">
        Failed to load transactions: {error}
      </div>
    );
  }

  // If any active transaction is returned, show ChargingProgress
  if (activeTx) {
    return <ChargingProgress transaction={activeTx} />;
  }

  // Otherwise show the newest (most recent) transaction as a receipt
  if (latestTx) {
    return <Receipt transaction={latestTx} />;
  }

  return <div className="p-4">No transactions found.</div>;
}
