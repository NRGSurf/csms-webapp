import { useEffect, useState } from "react";
import type { TransactionDTO } from "@/types/backend";

export function useActiveTransaction(stationId: string) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tx, setTx] = useState<TransactionDTO | null>(null);

  useEffect(() => {
    let cancelled = false;
    if (!stationId) return;

    (async () => {
      setLoading(true);
      setError(null);
      try {
        // Read token from URL (client-side safe)
        const tokenFromUrl =
          typeof window !== "undefined"
            ? new URLSearchParams(window.location.search).get("idToken") ??
              new URLSearchParams(window.location.search).get("tokenID")
            : null;

        // Build query string safely
        const qs = new URLSearchParams({ stationId });

        if (tokenFromUrl) {
          // Your backend uses "idToken" now.
          qs.set("idToken", tokenFromUrl);
        } else {
          qs.set("isActive", "true");
        }

        // IMPORTANT: use the param name your backend expects:
        //   - If your API expects `idTokenId`, use that.
        //   - If it expects `tokenID`, set that instead.
        if (tokenFromUrl) {
          qs.set("idTokenId", tokenFromUrl); // or: qs.set("tokenID", tokenFromUrl)
        }

        const r = await fetch(
          `/api/backend/data/transactions?${qs.toString()}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const list: TransactionDTO[] = await r.json();

        // pick latest by updatedAt (defensive if backend returns >1)
        const best =
          Array.isArray(list) && list.length
            ? [...list].sort(
                (a, b) =>
                  new Date(b.updatedAt).getTime() -
                  new Date(a.updatedAt).getTime()
              )[0]
            : null;

        if (!cancelled) setTx(best ?? null);
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? "Failed to load transactions");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [stationId]);

  return { loading, error, tx };
}
