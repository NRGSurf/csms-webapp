// components/flow/PaymentPanel.tsx
"use client";
import React, { useEffect, useRef, useState } from "react";
import { Lock, ShieldCheck } from "lucide-react";

type Props = {
  clientToken: string | null;
  busy?: boolean;
  onPay: (nonce: string) => void | Promise<void>;
};

export default function PaymentPanel({ clientToken, busy, onPay }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = useState(false);
  const [instance, setInstance] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    let currentInstance: any = null;

    async function init() {
      if (!clientToken || !containerRef.current) return;
      setError(null);
      setReady(false);
      try {
        const dropinModule = await import("braintree-web-drop-in");
        const dropin = (dropinModule as any).default ?? dropinModule;
        currentInstance = await dropin.create({
          authorization: clientToken,
          container: containerRef.current,
          card: { cardholderName: { required: false } },
          paypal: { flow: "checkout" },
        });
        if (!active) {
          await currentInstance.teardown().catch(() => {});
          return;
        }
        setInstance(currentInstance);
        setReady(true);
      } catch (err: any) {
        console.error("Braintree init error:", err);
        setError(err?.message || "Failed to initialize payment form");
      }
    }

    init();
    return () => {
      active = false;
      (async () => {
        try {
          if (currentInstance) await currentInstance.teardown();
        } catch {}
      })();
      setInstance(null);
      setReady(false);
    };
  }, [clientToken]);

  async function handlePay() {
    if (!instance) return;
    setError(null);
    try {
      const payload = await instance.requestPaymentMethod();
      await onPay(payload.nonce);
    } catch (err: any) {
      const msg = err?.message || "Could not get a payment method";
      setError(msg);
    }
  }

  if (!clientToken) {
    return (
      <div className="flex items-center gap-2 text-gray-600">
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
        <span className="text-sm">Preparing payment…</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-xl border-0 p-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Lock className="w-5 h-5 text-blue-600" />
            Secure Payment
          </h2>
          <p className="text-sm text-gray-500">
            Your card details are handled securely by Braintree.
          </p>
        </div>

        <div ref={containerRef} />

        {error && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 text-red-700 p-3 text-sm">
            {error}
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={handlePay}
            disabled={!ready || !!busy}
            className={`rounded-xl px-6 h-12 min-w-[220px] font-medium transition ${
              !ready || busy
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-gray-900 hover:bg-gray-900/90 text-white"
            }`}
          >
            {busy ? "Processing…" : "Pay & Start Charging"}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
        <span className="inline-flex items-center gap-1">
          <ShieldCheck className="w-4 h-4 text-green-600" /> EU AFIR Compliant
        </span>
        <span className="text-gray-400">•</span>
        <span className="inline-flex items-center gap-1">
          <Lock className="w-4 h-4 text-blue-600" /> Secure Payment
        </span>
      </div>
    </div>
  );
}
