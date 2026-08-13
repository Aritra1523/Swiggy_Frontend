"use client";

import useRestaurantDocuments from "@/customHooks/partner/useRestaurantDocuments";

interface Props {
  next: () => void;
  back: () => void;
}

export default function RestaurantDocuments({ next, back }: Props) {
  const { register, handleSubmit, errors, isSubmitting } =
    useRestaurantDocuments(next, back);

  return (
    <div className="animate-fadeIn">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Documents</h1>
        <p className="text-slate-500 text-sm mt-1">
          Submit your business & compliance documents
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Outlet Type *
            </label>
            <input
              {...register("outletType")}
              placeholder="e.g. Fine Dining, Cafe"
              className="input w-full"
            />
            <p className="text-red-500 text-xs mt-1">
              {errors.outletType?.message}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              PAN Number *
            </label>
            <input
              {...register("pan")}
              placeholder="e.g. ABCDE1234F"
              className="input w-full uppercase"
            />
            <p className="text-red-500 text-xs mt-1">{errors.pan?.message}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              GSTIN
            </label>
            <input
              {...register("gstin")}
              placeholder="e.g. 22ABCDE1234F1Z5"
              className="input w-full uppercase"
            />
            <p className="text-red-500 text-xs mt-1">{errors.gstin?.message}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              IFSC Code *
            </label>
            <input
              {...register("ifscCode")}
              placeholder="e.g. SBIN0001234"
              className="input w-full uppercase"
            />
            <p className="text-red-500 text-xs mt-1">
              {errors.ifscCode?.message}
            </p>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Bank Account Number *
            </label>
            <input
              {...register("bankAccountNumber")}
              placeholder="Enter account number"
              className="input w-full"
            />
            <p className="text-red-500 text-xs mt-1">
              {errors.bankAccountNumber?.message}
            </p>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              FSSAI Number *
            </label>
            <input
              {...register("fssaiNumber")}
              placeholder="e.g. 11223344556677"
              className="input w-full"
            />
            <p className="text-red-500 text-xs mt-1">
              {errors.fssaiNumber?.message}
            </p>
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={back}
            className="border border-slate-300 hover:bg-slate-50 px-8 py-3 rounded-xl font-medium text-slate-700 transition-all duration-300 flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 17l-5-5m0 0l5-5m-5 5h12"
              />
            </svg>
            Back
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-medium shadow-lg shadow-orange-200 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100 flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Saving...
              </>
            ) : (
              <>
                Next Step
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
