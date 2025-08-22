// components/StartFlow.tsx
import React, { useEffect, useMemo, useState } from "react";
import FigmaStepper from "./figma-adapted/FigmaStepper";
import PaymentAuthorized from "./figma-adapted/PaymentAuthorized";

import Overview from "./flow/Overview";
import BillingForm from "./flow/BillingForm";
import PaymentPanel from "./flow/PaymentPanel";
import Done from "./flow/Done";

// Adapter that renders the Figma ChargingSession UI
import Charging from "./flow/Charging";

import TransactionGate from "./flow/TransactionGate";

import { FlowStep, InvoiceForm } from "./flow/types";
import { useStation } from "../hooks/useStation";
import { useEvseStatus } from "../hooks/useEvseStatus";

import { Box, Flex, Text, Heading, Avatar } from "@radix-ui/themes";
import FigmaFooter from "./figma-adapted/Footer";

type Props =
  | { stationId: string; evseId: number; connectorId?: never }
  | { stationId: string; connectorId: number; evseId?: never }
  | { stationId: string; evseId?: number; connectorId?: number };

const steps = ["Pricing", "Billing", "Payment", "Charging"];

export function StartFlow({ stationId, evseId, connectorId }: Props) {
  const [step, setStep] = useState<FlowStep>(FlowStep.Overview);
  const [busy, setBusy] = useState(false);
  const [invoice, setInvoice] = useState<InvoiceForm>({
    fullName: "",
    email: "",
  });
  const [clientToken, setClientToken] = useState<string | null>(null);
  const [paymentAuthorized, setPaymentAuthorized] = useState(false);

  // Let the gate tell us if it’s showing charging vs receipt
  const [tokenFlowView, setTokenFlowView] = useState<
    "charging" | "receipt" | null
  >(null);

  const { station } = useStation(stationId);
  const { status, tx } = useEvseStatus(stationId, { enabled: true });

  const holdAmount = useMemo(() => 60, [stationId]);

  // Derive token straight from URL (no state, no effect) to avoid oscillation
  const tokenParam =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("idToken") ??
        new URLSearchParams(window.location.search).get("tokenID")
      : null;

  const isTokenFlow = !!tokenParam;

  function go(next: FlowStep) {
    setStep(next);
    if (typeof window !== "undefined")
      window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function fetchClientToken() {
    const r = await fetch("/api/braintree/client-token", { cache: "no-store" });
    const text = await r.text();
    console.log("[braintree/token] status:", r.status, "body:", text);
    if (!r.ok) throw new Error(`Token failed (${r.status}) ${text}`);
    const j = JSON.parse(text);
    if (!j?.clientToken) throw new Error("No clientToken in response");
    setClientToken(j.clientToken);
  }

  // Fire when we enter the Payment step (keeps Braintree working)
  useEffect(() => {
    if (step !== FlowStep.Payment) return;
    (async () => {
      try {
        console.log("[StartFlow] entering Payment, requesting client token…");
        await fetchClientToken();
      } catch (e) {
        console.error("[StartFlow] client token error:", e);
      }
    })();
  }, [step]);

  function handleBillingSubmit(values: InvoiceForm) {
    setInvoice(values);
    go(FlowStep.Payment);
  }

  // Reserve + (optional) processPayment
  const [tokenID, setTokenID] = useState<string | null>(null);
  async function handlePay(nonce: string) {
    setBusy(true);
    try {
      const amount = 60; // TODO replace with computed amount
      const resp = await fetch("/api/braintree/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stationId, amount, paymentMethodNonce: nonce }),
      });
      const j = await resp.json();
      if (!resp.ok || !j?.success || !j?.transactionId) {
        throw new Error(j?.message || `Reserve failed (${resp.status})`);
      }
      if (j?.transactionId) setTokenID(String(j.transactionId));

      // Optional capture (same as earlier version)
      try {
        const capture = await fetch("/api/csms-backend/processPayment", {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            stationId,
            sessionId: j.transactionId,
            currency: "EUR",
            amount,
            email: invoice.email,
            name: invoice.fullName,
          }),
        });
        const capJson = await capture.json().catch(() => ({}));
        if (!capture.ok || (capJson as any)?.error) {
          console.warn("processPayment failed:", capJson || capture.status);
        }
      } catch (e) {
        console.warn("processPayment error:", e);
      }

      setPaymentAuthorized(true);
    } catch (e) {
      console.error(e);
    } finally {
      setBusy(false);
    }
  }

  // Local “already charging” view (RFID, etc) for non-token flow
  const showCharging =
    status === "Occupied" &&
    !!tx &&
    (typeof tx?.kwh === "number" || typeof tx?.seconds === "number");

  // Stepper index:
  // - token flow: charging → 3, receipt → steps.length (mark Charging completed)
  // - non-token: charging → 3, done → steps.length, else map to current step
  const currentIndex = useMemo(() => {
    if (isTokenFlow) return tokenFlowView === "receipt" ? steps.length : 3;
    if (showCharging) return 3;
    return step === FlowStep.Done ? steps.length : step;
  }, [isTokenFlow, tokenFlowView, showCharging, step]);

  return (
    <Box>
      {/* Header */}
      <Box style={{ textAlign: "center", marginBottom: 16 }}>
        <Flex align="center" justify="center" mb="2">
          <Avatar size="6" radius="full" fallback="N" />
        </Flex>
        <Heading size="5" style={{ color: "var(--gray-12)" }}>
          NRG Charge Portal
        </Heading>
        <Text size="2" color="gray">
          AFIR Compliant • Secure • No Registration Required
        </Text>
      </Box>

      {/* Stepper */}
      <Box mb="4">
        <FigmaStepper labels={steps} currentIndex={currentIndex} />
      </Box>

      {isTokenFlow ? (
        // Token-based: gate decides Charging vs Receipt, and reports back for the stepper
        <TransactionGate
          key={`gate:${stationId}:${tokenParam}`} // stable per token, no oscillation
          stationId={stationId}
          onViewChange={setTokenFlowView}
        />
      ) : (
        <>
          {/* OVERVIEW / PRICING or CHARGING (local) */}
          {step === FlowStep.Overview &&
            (showCharging ? (
              <Charging
                stationId={stationId}
                {...(typeof evseId === "number" ? { evseId } : {})}
                {...(typeof connectorId === "number" ? { connectorId } : {})}
                transactionId={tx?.id ? String(tx.id) : ""}
                kwh={typeof tx?.kwh === "number" ? tx.kwh : 0}
                seconds={typeof tx?.seconds === "number" ? tx.seconds : 0}
                startedAt={tx?.startedAt as any}
              />
            ) : (
              <Overview
                stationId={stationId}
                station={station}
                status={status}
                onAcceptPricing={() => go(FlowStep.Billing)}
              />
            ))}

          {/* BILLING */}
          {step === FlowStep.Billing && (
            <BillingForm
              initial={invoice}
              onSubmit={handleBillingSubmit}
              busy={busy}
            />
          )}

          {/* PAYMENT */}
          {step === FlowStep.Payment &&
            (paymentAuthorized ? (
              <PaymentAuthorized
                amount={holdAmount}
                email={invoice.email}
                onContinue={() => {
                  if (typeof window === "undefined") return;
                  const url = new URL(window.location.href);
                  if (tokenID) url.searchParams.set("tokenID", tokenID);
                  window.location.assign(url.pathname + url.search);
                }}
              />
            ) : (
              <PaymentPanel
                clientToken={clientToken}
                busy={busy}
                onPay={handlePay}
              />
            ))}

          {/* DONE (fallback) */}
          {step === FlowStep.Done && <Done />}
        </>
      )}

      {/* Footer */}
      <FigmaFooter />
    </Box>
  );
}

export default StartFlow;
