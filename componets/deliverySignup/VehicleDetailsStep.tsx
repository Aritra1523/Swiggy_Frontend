"use client";

import useDeliveryDetails from "@/customHooks/delivery/useDeliveryDetails";

interface Props {
  next: () => void;
}

export default function VehicleDetailsStep({ next }: Props) {
  const { register, handleSubmit, errors, isSubmitting } =
    useDeliveryDetails(next);

  return (
    <div className="animate-fadeIn">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Vehicle Details</h1>
        <p className="text-slate-500 text-sm mt-1">
          Tell us about you and your vehicle
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
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
              Email *
            </label>
            <input
              {...register("email")}
              type="email"
              placeholder="you@example.com"
              className="input w-full"
            />
            <p className="text-red-500 text-xs mt-1">{errors.email?.message}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Phone *
            </label>
            <input
              {...register("phone")}
              placeholder="e.g. +919876543210"
              className="input w-full"
            />
            <p className="text-red-500 text-xs mt-1">{errors.phone?.message}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Vehicle Type *
            </label>
            <select {...register("vehicleType")} className="input w-full">
              <option value="">Select vehicle type</option>
              <option value="Bike">Bike</option>
              <option value="Scooter">Scooter</option>
              <option value="Bicycle">Bicycle</option>
              <option value="Car">Car</option>
            </select>
            <p className="text-red-500 text-xs mt-1">
              {errors.vehicleType?.message}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Vehicle Number *
            </label>
            <input
              {...register("vehicleNumber")}
              placeholder="e.g. WB06AB1234"
              className="input w-full"
            />
            <p className="text-red-500 text-xs mt-1">
              {errors.vehicleNumber?.message}
            </p>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-medium shadow-lg shadow-orange-200 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100"
          >
            {isSubmitting ? "Saving..." : "Next Step"}
          </button>
        </div>
      </form>
    </div>
  );
}