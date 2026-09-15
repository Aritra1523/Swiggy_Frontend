"use client";

import { PartnerType } from "@/customHooks/partner/usepartnerstatus";
import { Clock, XCircle, ArrowLeft } from "lucide-react";

interface ApplicationStatusProps {
  state: "pending" | "rejected";
  partnerType: PartnerType;
  reason?: string;
  onBack: () => void;
  /** Only offered when the backend allows reapplying. */
  onReapply?: () => void;
}

const LABELS: Record<PartnerType, string> = {
  restaurant: "Restaurant Partner",
  delivery: "Delivery Partner",
};

export default function ApplicationStatus({
  state,
  partnerType,
  reason,
  onBack,
  onReapply,
}: ApplicationStatusProps) {
  const pending = state === "pending";
  const Icon = pending ? Clock : XCircle;

  return (
    <div className="max-w-xl mx-auto bg-white border-2 border-gray-100 rounded-2xl p-6 sm:p-10 shadow-sm text-center">
      <div
        className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${
          pending ? "bg-amber-50" : "bg-red-50"
        }`}
      >
        <Icon
          className={`w-8 h-8 ${pending ? "text-amber-500" : "text-red-500"}`}
        />
      </div>

      <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-orange-500">
        {LABELS[partnerType]}
      </p>

      <h2 className="mt-1 text-xl sm:text-2xl font-bold text-gray-900">
        {pending
          ? "Your application is under review."
          : "Your application was rejected."}
      </h2>

      <p className="mt-3 text-sm sm:text-base text-gray-500 leading-relaxed">
        {pending
          ? "Our team is verifying your details. We'll notify you by email as soon as it's approved."
          : "Unfortunately your application did not meet our requirements."}
      </p>

      {!pending && reason && (
        <div className="mt-5 text-left bg-red-50 border border-red-100 rounded-xl p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-red-500">
            Reason
          </p>
          <p className="mt-1 text-sm text-red-700 leading-relaxed">{reason}</p>
        </div>
      )}

      <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {!pending && onReapply && (
          <button
            type="button"
            onClick={onReapply}
            className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-500/25 transition-colors duration-200"
          >
            Reapply
          </button>
        )}
      </div>
    </div>
  );
}