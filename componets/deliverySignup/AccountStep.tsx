"use client";

import useDeliverySignup from "@/customHooks/delivery/useDeliverySignup";

interface Props {
  next: (email: string, password: string) => void;
}

export default function AccountStep({ next }: Props) {
  const { register, handleSubmit, errors, isSubmitting } =
    useDeliverySignup(next);

  return (
    <div className="animate-fadeIn">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Create Your Account</h1>
        <p className="text-slate-500 text-sm mt-1">
          Let's get you started as a delivery partner
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Full Name *
          </label>
          <input
            {...register("full_name")}
            placeholder="e.g. Rahul Sharma"
            className="input w-full"
          />
          <p className="text-red-500 text-xs mt-1">{errors.full_name?.message}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Mobile Number *
          </label>
          <input
            {...register("mobile_Number")}
            placeholder="10-digit mobile number"
            className="input w-full"
          />
          <p className="text-red-500 text-xs mt-1">
            {errors.mobile_Number?.message}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Email Address *
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
            Address *
          </label>
          <input
            {...register("address")}
            placeholder="Street, City, State"
            className="input w-full"
          />
          <p className="text-red-500 text-xs mt-1">{errors.address?.message}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password *
            </label>
            <input
              {...register("password")}
              type="password"
              placeholder="Minimum 6 characters"
              className="input w-full"
            />
            <p className="text-red-500 text-xs mt-1">
              {errors.password?.message}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Confirm Password *
            </label>
            <input
              {...register("confirm_password")}
              type="password"
              placeholder="Re-enter password"
              className="input w-full"
            />
            <p className="text-red-500 text-xs mt-1">
              {errors.confirm_password?.message}
            </p>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-medium shadow-lg shadow-orange-200 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100"
          >
            {isSubmitting ? "Creating account..." : "Next Step"}
          </button>
        </div>
      </form>
    </div>
  );
}