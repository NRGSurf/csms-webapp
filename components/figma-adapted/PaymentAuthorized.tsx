// components/figma-adapted/PaymentAuthorized.tsx
import React from "react";
import { CheckCircle2, Mail, CreditCard } from "lucide-react";

type Props = {
  amount?: number;            // reserved amount
  email?: string;
  cardHint?: string;          // e.g., "VISA •••• 4242"
  onContinue?: () => void;    // proceed to next screen
};

export default function PaymentAuthorized({
  amount = 25,
  email,
  cardHint = "Card on file",
  onContinue,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 text-center space-y-4">
      <CheckCircle2 className="w-14 h-14 text-green-600 mx-auto" />
      <h2 className="text-2xl font-semibold text-gray-900">Payment Authorized</h2>
      <p className="text-gray-600">
        A temporary hold of <span className="font-medium">€{amount.toFixed(2)}</span> was placed.
        You'll only pay the actual cost after charging.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
        <div className="rounded-lg bg-gray-50 p-3 flex items-center gap-2">
          <Mail className="w-4 h-4 text-blue-600" />
          <div>
            <p className="text-xs text-gray-500">Receipt will be sent to</p>
            <p className="text-sm text-gray-900">{email || "your email"}</p>
          </div>
        </div>
        <div className="rounded-lg bg-gray-50 p-3 flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-gray-700" />
          <div>
            <p className="text-xs text-gray-500">Payment method</p>
            <p className="text-sm text-gray-900">{cardHint}</p>
          </div>
        </div>
      </div>

      <div className="pt-2">
        <button
          type="button"
          onClick={onContinue}
          className="inline-flex items-center justify-center rounded-xl px-6 h-12 min-w-[220px] bg-gray-900 hover:bg-gray-900/90 text-white font-medium"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
