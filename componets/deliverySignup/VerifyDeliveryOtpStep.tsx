"use client";

import { useSelector } from "react-redux";

import { RootState } from "@/redux/store/store";
import useVerifyDeliveryOtp from "@/customHooks/delivery/useVerifyDeliveryOtp";

interface Props {
  next: () => void;
}

export default function VerifyDeliveryOtpStep({ next }: Props) {
  const email = useSelector((state: RootState) => state.delivery.deliveryEmail);

  const { register, handleSubmit, errors, isSubmitting, resend } =
    useVerifyDeliveryOtp(next);

  return (
    <div className="animate-fadeIn">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Confirm Delivery Application
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          A second code was sent to{" "}
          <span className="font-medium">{email}</span> to confirm your
          delivery partner application
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            OTP *
          </label>
          <input
            {...register("otp")}
            placeholder="Enter 6-digit code"
            maxLength={6}
            className="input w-full tracking-widest text-center text-lg"
          />
          <p className="text-red-500 text-xs mt-1">{errors.otp?.message}</p>
        </div>

        <button
          type="button"
          onClick={resend}
          className="text-sm text-orange-600 hover:underline"
        >
          Resend OTP
        </button>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-medium shadow-lg shadow-orange-200 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100"
          >
            {isSubmitting ? "Verifying..." : "Verify & Continue"}
          </button>
        </div>
      </form>
    </div>
  );
}