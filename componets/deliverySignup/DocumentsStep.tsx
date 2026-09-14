"use client";

import useDeliveryDocuments from "@/customHooks/delivery/useDeliveryDocuments";

interface Props {
  next: () => void;
  back: () => void;
}

export default function DocumentsStep({ next, back }: Props) {
  const { register, handleSubmit, errors, isSubmitting } =
    useDeliveryDocuments(next);

  return (
    <div className="animate-fadeIn">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Upload Documents</h1>
        <p className="text-slate-500 text-sm mt-1">
          We need these to verify your identity and vehicle
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Driving License Number *
          </label>
          <input
            {...register("licenseNumber")}
            placeholder="e.g. WB1234567890"
            className="input w-full"
          />
          <p className="text-red-500 text-xs mt-1">
            {errors.licenseNumber?.message}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              License Photo
            </label>
            <input
              {...register("licensePhoto")}
              type="file"
              accept="image/*"
              className="input w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              ID Proof
            </label>
            <input
              {...register("idProof")}
              type="file"
              accept="image/*"
              className="input w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Vehicle RC
            </label>
            <input
              {...register("vehicleRC")}
              type="file"
              accept="image/*"
              className="input w-full"
            />
          </div>
        </div>

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
            {isSubmitting ? "Uploading..." : "Next Step"}
          </button>
        </div>
      </form>
    </div>
  );
}