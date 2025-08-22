import React, { useMemo, useState } from "react";
import {
  Alert,
  Box,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Divider,
  Button,
  Typography,
} from "@mui/material";
import FigmaStepper from "./figma-adapted/FigmaStepper";

import Overview from "./flow/Overview";
import BillingForm from "./flow/BillingForm";
import PaymentPanel from "./flow/PaymentPanel";
import Done from "./flow/Done";
import ChargingProgress from "./flow/ChargingProgress";

import { FlowStep, InvoiceForm } from "./flow/types";
import { useStation } from "../hooks/useStation";
import { useEvseStatus } from "../hooks/useEvseStatus"; // 2.0.1
import { useConnectorStatus } from "../hooks/useConnectorStatus"; // 1.6

type Props = {
  stationId: string;
  /** Optional defaults encoded in your QR */
  evseId?: number; // used if protocol is 2.0.1
  connectorId?: number; // used if protocol is 1.6
};

const isOcpp16 = (proto?: string) =>
  !!proto && /1[_\.]?6|OCPP\s*1\.?6/i.test(String(proto));
const isOcpp201 = (proto?: string) =>
  !!proto && /2[_\.]?0[_\.]?1|OCPP\s*2\.?0\.?1/i.test(String(proto));

export function StartFlow({ stationId, evseId, connectorId }: Props) {
  // Load basic station (now includes protocol)
  const {
    loading: stationLoading,
    error: stationError,
    station,
  } = useStation(stationId);

  // Decide protocol once station is loaded (fallback to URL hints if protocol missing)
  const protocol = station?.protocol;
  const resolved16 = useMemo(() => {
    if (protocol) return isOcpp16(protocol);
    if (connectorId != null) return true;
    if (evseId != null) return false;
    return false;
  }, [protocol, connectorId, evseId]);

  const effectiveEvseId = evseId ?? 1;
  const effectiveConnectorId = connectorId ?? 1;

  // Status hooks – both mounted, but only the right one fetches (enabled flag)
  const evse = useEvseStatus(stationId, effectiveEvseId, {
    enabled: !resolved16 && !!station,
  });
  const conn = useConnectorStatus(stationId, effectiveConnectorId, {
    enabled: resolved16 && !!station,
  });

  const status = (resolved16 ? conn.status : evse.status) ?? "Unknown";
  const statusLoading = resolved16 ? conn.loading : evse.loading;
  const statusError = resolved16 ? conn.error : evse.error;
  const tx = resolved16 ? conn.tx : evse.tx;
  const reloadStatus = resolved16 ? conn.reload : evse.reload;

  // Flow state
  const [step, setStep] = useState<FlowStep>(FlowStep.Overview);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  // Billing state
  const [invoice, setInvoice] = useState<InvoiceForm>({
    fullName: "",
    email: "",
    phone: "",
    country: "AT",
  });
  const [wantsFullInvoice, setWantsFullInvoice] = useState(false);

  // Payment
  const [clientToken, setClientToken] = useState<string | null>(null);

  const go = (next: FlowStep) => setStep(next);
  const reset = () => {
    setStep(FlowStep.Overview);
    setError(null);
    setBusy(false);
    setClientToken(null);
    setInvoice({ fullName: "", email: "", phone: "", country: "AT" });
    setWantsFullInvoice(false);
  };

  const handleStart = () => go(FlowStep.Billing);

  const handleBillingSubmit = async (
    values: InvoiceForm,
    wantsFull: boolean
  ) => {
    setInvoice(values);
    setWantsFullInvoice(wantsFull);
    setError(null);
    setBusy(true);
    try {
      // Initialize Braintree client token
      const prep = await fetch("/api/braintree/token", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          stationId,
          customer: {
            name: values.fullName,
            email: values.email,
            phone: values.phone,
          },
          wantsFullInvoice: wantsFull,
        }),
      });
      if (!prep.ok)
        throw new Error(`Failed to initialize payment: ${prep.status}`);
      const { clientToken: token } = await prep.json();
      setClientToken(token);
      go(FlowStep.Payment);
    } catch (e: any) {
      setError(e?.message || "Could not initialize payment");
    } finally {
      setBusy(false);
    }
  };

  // Called by PaymentPanel with the Braintree nonce
  const handlePay = async (nonce: string) => {
    try {
      setBusy(true);
      setError(null);

      const amount = 60; // TODO: replace with your real computed amount
      const reserve = await fetch("/api/braintree/reserve", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ stationId, amount, paymentMethodNonce: nonce }),
      });
      const reserveJson = await reserve.json();
      if (!reserve.ok || !reserveJson?.success) {
        throw new Error(
          reserveJson?.message || `Reservation failed (${reserve.status})`
        );
      }
      const sessionId =
        reserveJson.transactionId || reserveJson?.transaction?.id;
      if (!sessionId) throw new Error("No transaction ID from Braintree");

      const resp = await fetch("/api/csms-backend/processPayment", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          stationId,
          sessionId,
          currency: "EUR",
          amount,
          email: invoice.email,
          name: invoice.fullName,
        }),
      });

      const json = await resp.json();
      if (!resp.ok || json?.error)
        throw new Error(json?.error || `Payment failed (${resp.status})`);
      go(FlowStep.Done);
    } catch (e: any) {
      setError(e?.message || "Payment failed");
    } finally {
      setBusy(false);
    }
  };

  // Loading card for station info
  if (stationLoading) {
    return (
      <Card className="max-w-xl mx-auto shadow-lg">
        <CardContent className="flex gap-3 items-center">
          <CircularProgress size={18} />
          <Typography>Loading station…</Typography>
        </CardContent>
      </Card>
    );
  }

  const steps = ["Pricing", "Details", "Payment", "Charging"];
  const showError = error || stationError;

  return (
    <Card className="max-w-3xl mx-auto shadow-lg">
      {/* Header + progress (at the top, like the mock) */}
      <Box sx={{ p: 3, pb: 0 }}>
        <Typography variant="h4" fontWeight={700} textAlign="center">
          NRG Charge Portal
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          textAlign="center"
          sx={{ mt: 0.5 }}
        >
          AFIR Compliant • Secure • No Registration Required
        </Typography>

        <FigmaStepper labels={steps} currentIndex={step} className="mt-2" />
      </Box>

      <CardContent sx={{ pt: 2 }}>
        {showError && (
          <Alert severity="error" className="mb-4">
            {showError}
          </Alert>
        )}

        {/* OVERVIEW / PRICING */}
        {step === FlowStep.Overview && (
          <Box>
            {/* If occupied: show charging progress */}
            {status === "Occupied" ? (
              <>
                <ChargingProgress
                  stationId={stationId}
                  {...(resolved16
                    ? { connectorId: effectiveConnectorId }
                    : { evseId: effectiveEvseId })}
                  transactionId={tx?.id as any}
                  kwh={tx?.kwh}
                  seconds={tx?.seconds}
                  startedAt={tx?.startedAt}
                />
                <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
                  <Button onClick={reloadStatus} disabled={statusLoading}>
                    {statusLoading ? "Refreshing…" : "Refresh"}
                  </Button>
                </Box>
              </>
            ) : (
              <Overview
                stationId={stationId}
                station={station}
                status={status}
                onAcceptPricing={() => setStep(FlowStep.Billing)}
              />
            )}
          </Box>
        )}

        {/* BILLING */}
        {step === FlowStep.Billing && (
          <BillingForm
            initial={invoice}
            onSubmit={(vals, wantsFull) => handleBillingSubmit(vals, wantsFull)}
            busy={busy}
          />
        )}

        {/* PAYMENT */}
        {step === FlowStep.Payment && (
          <PaymentPanel
            clientToken={clientToken}
            busy={busy}
            onPay={handlePay}
          />
        )}

        {/* DONE */}
        {step === FlowStep.Done && <Done />}
      </CardContent>

      {/* Bottom actions (keep minimal) */}
      <Divider />
      <CardActions>
        <Box className="w-full flex justify-between items-center">
          <Box className="flex gap-1">
            {step > FlowStep.Overview && step < FlowStep.Done && (
              <Button
                onClick={() => setStep((step - 1) as FlowStep)}
                disabled={busy}
              >
                Back
              </Button>
            )}
            {step !== FlowStep.Done && (
              <Button onClick={reset} disabled={busy}>
                Cancel
              </Button>
            )}
          </Box>
          <Box />
        </Box>
      </CardActions>
    </Card>
  );
}
