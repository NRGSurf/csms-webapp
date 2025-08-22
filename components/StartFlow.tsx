// components/StartFlow.tsx
import React, { useEffect, useMemo, useState } from "react";
import FigmaStepper from "./figma-adapted/FigmaStepper";
import PaymentAuthorized from "./figma-adapted/PaymentAuthorized";
import AppIcon from "../design/figma/imports/AppIcon2";

import Overview from "./flow/Overview";
import BillingForm from "./flow/BillingForm";
import PaymentPanel from "./flow/PaymentPanel";
import Done from "./flow/Done";

// NOTE: This is the adapter that renders the Figma ChargingSession
import ChargingProgress from "./flow/Charging";

import { FlowStep, InvoiceForm } from "./flow/types";
import { useStation } from "../hooks/useStation";
import { useEvseStatus } from "../hooks/useEvseStatus";

import { Box, Flex, Text, Heading } from "@radix-ui/themes";
import FigmaFooter from "./figma-adapted/Footer";

type Props =
  | { stationId: string; evseId: number; connectorId?: never }
  | { stationId: string; connectorId: number; evseId?: never }
  | { stationId: string; evseId?: number; connectorId?: number };

const steps = ["Pricing", "Billing", "Payment", "Receipt"];

export function StartFlow({ stationId, evseId, connectorId }: Props) {
  // flow state
  const [step, setStep] = useState<FlowStep>(FlowStep.Overview);
  const [busy, setBusy] = useState(false);
  const [invoice, setInvoice] = useState<InvoiceForm>({
    fullName: "",
    email: "",
  });
  const [clientToken, setClientToken] = useState<string | null>(null);
  const [paymentAuthorized, setPaymentAuthorized] = useState(false);

  // data hooks
  const {
    loading: stationLoading,
    error: stationError,
    station,
  } = useStation(stationId);
  const {
    loading: statusLoading,
    error: statusError,
    status,
    tx,
  } = useEvseStatus(stationId, { enabled: true });

  const holdAmount = useMemo(() => {
    // Fallback: €60 pre-auth; if you expose station.tariff.preAuthAmount later, use it here.
    return 60;
  }, [stationId]);

  function go(next: FlowStep) {
    setStep(next);
    if (typeof window !== "undefined" && window.scrollTo)
      window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function fetchClientToken() {
    const r = await fetch("/api/braintree/token");
    if (!r.ok) throw new Error(`Token failed (${r.status})`);
    const j = await r.json();
    setClientToken(j.clientToken);
  }

  // Get Braintree token when we first arrive on Payment step
  useEffect(() => {
    if (step === FlowStep.Payment && !clientToken) {
      fetchClientToken().catch((e) => console.error("Client token error:", e));
    }
  }, [step, clientToken]);

  function handleBillingSubmit(values: InvoiceForm, wantsFull: boolean) {
    setInvoice(values);
    go(FlowStep.Payment);
  }

  async function handlePay(nonce: string) {
    setBusy(true);
    try {
      const resp = await fetch("/api/braintree/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stationId,
          amount: holdAmount,
          paymentMethodNonce: nonce,
        }),
      });
      if (!resp.ok) {
        const text = await resp.text();
        throw new Error(text || `Payment failed (${resp.status})`);
      }
      // Show "Payment Authorized" screen in-place (Payment step)
      setPaymentAuthorized(true);
    } catch (e) {
      console.error(e);
      // Optional: surface an error UI here if desired.
    } finally {
      setBusy(false);
    }
  }

  const showCharging =
    status === "Occupied" &&
    !!tx &&
    (typeof tx.kwh === "number" || typeof tx.seconds === "number");

  return (
    <Box>
      {/* Header */}
      <Box style={{ textAlign: "center", marginBottom: 16 }}>
        <Flex align="center" justify="center" mb="2">
          <Box style={{ width: 64, height: 64 }}>
            <AppIcon />
          </Box>
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
        <FigmaStepper labels={steps} currentIndex={step} />
      </Box>

      {/* OVERVIEW / PRICING or CHARGING */}
      {step === FlowStep.Overview &&
        (showCharging ? (
          <ChargingProgress
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
            onContinue={() => go(FlowStep.Overview)}
          />
        ) : (
          <PaymentPanel
            clientToken={clientToken}
            busy={busy}
            onPay={handlePay}
          />
        ))}

      {/* DONE */}
      {step === FlowStep.Done && <Done />}

      {/* Footer */}
      <FigmaFooter />
    </Box>
  );
}

export default StartFlow;
