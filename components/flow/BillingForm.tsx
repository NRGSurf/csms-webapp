import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { InvoiceForm } from "./types";
import { Shield, Inbox, User, Home, Hash, Landmark } from "lucide-react";

type Props = {
  initial?: InvoiceForm;
  onSubmit: (values: InvoiceForm, wantsFullInvoice: boolean) => void;
  busy?: boolean;
};

const baseSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  street: z.string().optional(),
  postalCode: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
});

export default function BillingForm({
  initial,
  onSubmit,
  busy = false,
}: Props) {
  const [wantsFullInvoice, setWantsFullInvoice] = useState<boolean>(
    Boolean(
      initial?.street ||
        initial?.postalCode ||
        initial?.city ||
        initial?.country
    )
  );

  const schema = useMemo(() => {
    if (!wantsFullInvoice) return baseSchema;
    return baseSchema.extend({
      street: z.string().min(3, "Street is required"),
      postalCode: z.string().min(2, "Postal code is required"),
      city: z.string().min(2, "City is required"),
      country: z.string().min(2, "Country is required"),
    });
  }, [wantsFullInvoice]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<InvoiceForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: initial?.fullName ?? "",
      email: initial?.email ?? "",
      phone: initial?.phone ?? "",
      street: initial?.street ?? "",
      postalCode: initial?.postalCode ?? "",
      city: initial?.city ?? "",
      country: initial?.country ?? "",
    },
    mode: "onChange",
  });

  const submit = handleSubmit((values) => onSubmit(values, wantsFullInvoice));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-900">Billing Details</h2>
        <p className="text-gray-500 text-sm mt-1">
          We’ll email a receipt to the address below. Turn on invoice to add
          address details.
        </p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-xl border-0 p-6 space-y-6">
        {/* Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-1 md:col-span-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
              <User className="w-4 h-4" />
              Full name
            </label>
            <input
              type="text"
              {...register("fullName")}
              placeholder="Your full name"
              className={`w-full rounded-lg border px-3 py-2 outline-none transition
                ${
                  errors.fullName
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-2 focus:ring-blue-200"
                }`}
            />
            {errors.fullName && (
              <p className="text-sm text-red-600 mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
              <Inbox className="w-4 h-4" />
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="you@example.com"
              className={`w-full rounded-lg border px-3 py-2 outline-none transition
                ${
                  errors.email
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-2 focus:ring-blue-200"
                }`}
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
              <Shield className="w-4 h-4" />
              Phone (optional)
            </label>
            <input
              type="tel"
              {...register("phone")}
              placeholder="+49 123 456789"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
        </div>

        {/* Invoice toggle */}
        <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
          <div>
            <p className="text-sm font-medium text-gray-800">
              Need an invoice?
            </p>
            <p className="text-xs text-gray-500">
              Add address details for a full invoice.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setWantsFullInvoice((s) => !s)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition
              ${wantsFullInvoice ? "bg-blue-600" : "bg-gray-300"}`}
            aria-pressed={wantsFullInvoice}
            aria-label="Toggle invoice fields"
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white transition
                ${wantsFullInvoice ? "translate-x-5" : "translate-x-1"}`}
            />
          </button>
        </div>

        {/* Address fields */}
        {wantsFullInvoice && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
                <Home className="w-4 h-4" />
                Street & Number
              </label>
              <input
                type="text"
                {...register("street")}
                placeholder="Street and number"
                className={`w-full rounded-lg border px-3 py-2 outline-none transition
                  ${
                    errors.street
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:ring-2 focus:ring-blue-200"
                  }`}
              />
              {errors.street && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.street.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
                <Hash className="w-4 h-4" />
                Postal code
              </label>
              <input
                type="text"
                {...register("postalCode")}
                placeholder="e.g. 80331"
                className={`w-full rounded-lg border px-3 py-2 outline-none transition
                  ${
                    errors.postalCode
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:ring-2 focus:ring-blue-200"
                  }`}
              />
              {errors.postalCode && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.postalCode.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
                <Landmark className="w-4 h-4" />
                City
              </label>
              <input
                type="text"
                {...register("city")}
                placeholder="City"
                className={`w-full rounded-lg border px-3 py-2 outline-none transition
                  ${
                    errors.city
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:ring-2 focus:ring-blue-200"
                  }`}
              />
              {errors.city && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.city.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
                Country
              </label>
              <input
                type="text"
                {...register("country")}
                placeholder="Country"
                className={`w-full rounded-lg border px-3 py-2 outline-none transition
                  ${
                    errors.country
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:ring-2 focus:ring-blue-200"
                  }`}
              />
              {errors.country && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.country.message}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Action */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={submit}
            disabled={busy || !isValid}
            className={`rounded-xl px-5 h-12 min-w-[220px] text-white font-medium transition
              ${
                busy || !isValid
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gray-900 hover:bg-gray-900/90"
              }`}
          >
            {busy ? "Please wait…" : "Continue to payment"}
          </button>
        </div>
      </div>
    </div>
  );
}
