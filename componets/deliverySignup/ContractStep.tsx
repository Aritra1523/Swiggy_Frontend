"use client";

import useDeliveryContract from "@/customHooks/delivery/useDeliveryContract";

interface Props {
  back: () => void;
  onDone: () => void;
}

export default function ContractStep({ back, onDone }: Props) {
  const { register, handleSubmit, errors, isSubmitting } =
    useDeliveryContract(onDone);

  return (
    <div className="animate-fadeIn">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Partner Contract</h1>
        <p className="text-slate-500 text-sm mt-1">
          Last step — review and accept the delivery partner agreement
        </p>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-6 max-h-48 overflow-y-auto text-sm text-slate-600 space-y-2">
        <p>
          <strong>Terms of Service</strong> — you agree to deliver orders
          professionally and follow platform guidelines.
        </p>
        <p>
          <strong>Payout Terms</strong> — earnings are settled weekly to your
          registered bank account.
        </p>
        <p>
          <strong>Operational Guidelines</strong> — follow traffic rules and
          safety protocols during delivery.
        </p>
        <p>
          <strong>Privacy & Data Policy</strong> — your location data is used
          only for order assignment and tracking.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Full Name *
            </label>
            <input
              {...register("fullName")}
              placeholder="e.g. Rahul Sharma"
              className="input w-full"
            />
            <p className="text-red-500 text-xs mt-1">
              {errors.fullName?.message}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Place *
            </label>
            <input
              {...register("place")}
              placeholder="e.g. Kolkata"
              className="input w-full"
            />
            <p className="text-red-500 text-xs mt-1">{errors.place?.message}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <input
            {...register("declarationAccepted")}
            type="checkbox"
            className="w-4 h-4 mt-1 text-orange-500 border-slate-300 rounded focus:ring-orange-400"
          />
          <label className="text-sm text-slate-600">
            I have read and agree to the delivery partner agreement above.
          </label>
        </div>
        <p className="text-red-500 text-xs">
          {errors.declarationAccepted?.message}
        </p>

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={back}
            className="px-6 py-3 rounded-xl font-medium text-slate-600 hover:bg-slate-100"
          >
            Back
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-medium shadow-lg shadow-orange-200 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100"
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </button>
        </div>
      </form>
    </div>
  );
}