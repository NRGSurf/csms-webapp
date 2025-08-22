// components/flow/PaymentPanel.tsx
"use client";
import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../design/figma/components/ui/card";
import { Button } from "../../design/figma/components/ui/button";
import { Flex, Text } from "@radix-ui/themes";
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
        try { if (currentInstance) await currentInstance.teardown(); } catch {}
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
      <Flex align="center" gap="2" style={{ color: "var(--gray-11)" }}>
        <svg style={{ animation: "spin 1s linear infinite", height: 16, width: 16 }} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity=".25" />
          <path fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" opacity=".75" />
        </svg>
        <Text size="1">Preparing payment…</Text>
      </Flex>
    );
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>
            <Flex align="center" gap="2">
              <Lock size={20} color="var(--blue-9)" /> Secure Payment
            </Flex>
          </CardTitle>
          <Text size="2" color="gray">Your card details are handled securely by Braintree.</Text>
        </CardHeader>
        <CardContent>
          <div ref={containerRef} />
          {error && (
            <div style={{ marginTop: 12, borderRadius: 8, border: "1px solid var(--red-6)", background: "var(--red-3)", color: "var(--red-11)", padding: 12, fontSize: 14 }}>
              {error}
            </div>
          )}
          <Flex justify="end" style={{ marginTop: 16 }}>
            <Button onClick={handlePay} disabled={!ready || !!busy}>
              {busy ? "Processing…" : "Pay & Start Charging"}
            </Button>
          </Flex>
        </CardContent>
      </Card>

      <Flex align="center" justify="center" gap="3" mt="3" style={{ color: "var(--gray-11)", fontSize: 14 }}>
        <Flex align="center" gap="1">
          <ShieldCheck size={16} color="var(--green-9)" /> EU AFIR Compliant
        </Flex>
        <Text color="gray">•</Text>
        <Flex align="center" gap="1">
          <Lock size={16} color="var(--blue-9)" /> Secure Payment
        </Flex>
      </Flex>
    </div>
  );
}
