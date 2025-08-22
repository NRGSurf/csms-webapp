// hooks/useEvseStatus.ts
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type LiveStatus =
  | "Available"
  | "Occupied"
  | "Reserved"
  | "Unavailable"
  | "Faulted"
  | "Unknown";

type Options = { enabled?: boolean };

type TxLite = {
  id?: string | number;
  kwh?: number;
  seconds?: number;
  startedAt?: string;
};

export function useEvseStatus(
  stationId: string,
  _evseId: number,
  opts?: Options
) {
  const enabled = opts?.enabled ?? true;
  const [loading, setLoading] = useState<boolean>(!!enabled);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<LiveStatus>("Unknown");
  const [tx, setTx] = useState<TxLite | undefined>(undefined);
  const abortRef = useRef<AbortController | null>(null);

  const fetchActiveTx = useCallback(async () => {
    if (!enabled) return;
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;
    setLoading(true);
    setError(null);

    try {
      const url = `/api/backend/data/transactions?stationId=${encodeURIComponent(
        stationId
      )}&isActive=true`;
      const r = await fetch(url, { signal: ac.signal });
      const text = await r.text();
      if (!r.ok) {
        throw new Error(`Upstream ${r.status}: ${text}`);
      }
      const arr = JSON.parse(text);
      if (Array.isArray(arr) && arr.length > 0) {
        const t = arr[0];
        setStatus("Occupied");
        setTx({
          id: t?.transactionId ?? t?.id,
          kwh: t?.totalKwh != null ? Number(t.totalKwh) : undefined,
          // If backend later sends a live seconds field we will map it; null for now.
          seconds:
            t?.timeSpentCharging != null
              ? Number(t.timeSpentCharging)
              : undefined,
          startedAt: t?.createdAt,
        });
      } else {
        setStatus("Available");
        setTx(undefined);
      }
    } catch (e: any) {
      setError(e?.message || "Failed to load status");
      setStatus("Unknown");
      setTx(undefined);
    } finally {
      setLoading(false);
    }
  }, [enabled, stationId]);

  useEffect(() => {
    fetchActiveTx();
    return () => abortRef.current?.abort();
  }, [fetchActiveTx]);

  const reload = useMemo(() => fetchActiveTx, [fetchActiveTx]);

  return { loading, error, status, tx, reload };
}
