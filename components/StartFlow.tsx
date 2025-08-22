// components/StartFlow.tsx
import React, { useEffect, useMemo, useState } from "react";
import FigmaStepper from "./figma-adapted/FigmaStepper";
import PaymentAuthorized from "./figma-adapted/PaymentAuthorized";

import Overview from "./flow/Overview";
import BillingForm from "./flow/BillingForm";
import PaymentPanel from "./flow/PaymentPanel";
import Done from "./flow/Done";

// NOTE: adapter that renders the Figma ChargingSession
import ChargingProgress from "./flow/Charging";

import { FlowStep, InvoiceForm } from "./flow/types";
import { useStation } from "../hooks/useStation";
import { useEvseStatus } from "../hooks/useEvseStatus";

import { Box, Flex, Text, Heading, Avatar } from "@radix-ui/themes";
import FigmaFooter from "./figma-adapted/Footer";

type Props =
  | { stationId: string; evseId: number; connectorId?: never }
  | { stationId: string; connectorId: number; evseId?: never }
  | { stationId: string; evseId?: number; connectorId?: number };

const steps = ["Pricing", "Billing", "Payment", "Receipt"];

export function StartFlow({ stationId, evseId, connectorId }: Props) {
  const [step, setStep] = useState<FlowStep>(FlowStep.Overview);
  const [busy, setBusy] = useState(false);
  const [invoice, setInvoice] = useState<InvoiceForm>({
    fullName: "",
    email: "",
  });
  const [clientToken, setClientToken] = useState<string | null>(null);
  const [paymentAuthorized, setPaymentAuthorized] = useState(false);

  // NEW: keep the Braintree transaction.id we get back from /api/braintree/reserve
  const [tokenID, setTokenID] = useState<string | null>(null);

  const { station } = useStation(stationId);
  const { status, tx } = useEvseStatus(stationId, { enabled: true });

  const holdAmount = useMemo(() => 60, [stationId]);

  function go(next: FlowStep) {
    setStep(next);
    if (typeof window !== "undefined")
      window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function fetchClientToken() {
    const r = await fetch("/api/braintree/token");
    if (!r.ok) throw new Error(`Token failed (${r.status})`);
    const j = await r.json();
    setClientToken(j.clientToken);
  }

  useEffect(() => {
    if (step === FlowStep.Payment && !clientToken) {
      fetchClientToken().catch(console.error);
    }
  }, [step, clientToken]);

  function handleBillingSubmit(values: InvoiceForm) {
    setInvoice(values);
    go(FlowStep.Payment);
  }

  // CHANGED: capture transactionId from your reserve endpoint
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

      const j = await resp.json().catch(() => null);
      if (!resp.ok) {
        throw new Error(j?.message || `Reserve failed (${resp.status})`);
      }

      if (j?.transactionId) setTokenID(String(j.transactionId));
      setPaymentAuthorized(true);
    } catch (e) {
      console.error(e);
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
      {/* Header (Radix only, no Tailwind) */}
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
            // CHANGED: Reload page with ?tokenID=<transaction.id>
            onContinue={() => {
              if (typeof window === "undefined") return;
              const url = new URL(window.location.href);
              if (tokenID) url.searchParams.set("tokenID", tokenID);
              window.location.assign(url.pathname + url.search); // full reload
            }}
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
