// components/figma-adapted/PaymentAuthorized.tsx
import React from "react";
import {
  CheckCircle2,
  Mail,
  CreditCard,
  PlugZap,
  PlayCircle,
  Activity,
} from "lucide-react";

type Props = {
  amount?: number; // reserved amount
  email?: string;
  cardHint?: string; // e.g., "VISA •••• 4242"
  onContinue?: () => void; // proceed to next screen
  title?: string; // optional custom title
};

export default function PaymentAuthorized({
  amount = 25,
  email,
  cardHint = "Card on file",
  onContinue,
  title = "Payment Authorized",
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 text-center space-y-6">
      {/* Success header */}
      <div className="space-y-2">
        <CheckCircle2 className="w-14 h-14 text-green-600 mx-auto" />
        <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
        <p className="text-gray-600">
          A temporary hold of{" "}
          <span className="font-medium">€{amount.toFixed(2)}</span> was placed.
          You’ll only pay the actual cost after charging.
        </p>
      </div>

      {/* Details: email + card */}
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

      {/* Next Steps */}
      <div className="text-left space-y-3">
        <h3 className="font-medium text-gray-900">Next steps</h3>

        <div className="space-y-2">
          <div className="flex items-center gap-3 text-sm">
            <span className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-medium">
              1
            </span>
            <span className="flex items-center gap-2">
              <PlugZap className="w-4 h-4 text-blue-600" />
              Plug the connector into your vehicle
            </span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <span className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-medium">
              2
            </span>
            <span className="flex items-center gap-2">
              <PlayCircle className="w-4 h-4 text-blue-600" />
              Tap <span className="font-medium">Start Charging</span> when ready
            </span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <span className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-medium">
              3
            </span>
            <span className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-600" />
              Monitor your session in real time
            </span>
          </div>
        </div>

        <p className="text-xs text-gray-500 mt-1">
          We’ll take you to the charging screen next.
        </p>
      </div>

      {/* CTA */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onContinue}
          className="inline-flex items-center justify-center rounded-xl px-6 h-12 min-w-[220px] bg-gray-900 hover:bg-gray-900/90 text-white font-medium"
        >
          Start charging
        </button>
      </div>
    </div>
  );
}
