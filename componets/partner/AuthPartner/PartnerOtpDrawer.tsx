"use client";

import useRestaurantOtp from "@/customHooks/partner/auth/useRestaurantOtp";

interface Props {
  email: string;
  close: () => void;
}

export default function PartnerOtpDrawer({
  email,
  close,
}: Props) {
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    handleResend,
    isResending,
    resendCooldown,
  } = useRestaurantOtp(email, close);

  return (
    <div className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm">
      <div className="absolute right-0 top-0 h-full w-[420px] bg-white/95 backdrop-blur-md p-8 overflow-y-auto shadow-2xl animate-slide-in">

        <button
          onClick={close}
          className="text-gray-400 hover:text-orange-500 hover:rotate-90 transition-all duration-300 text-2xl float-right"
        >
          ✕
        </button>

        {/* Food Emoji with Hover Effect */}
        <div className="flex justify-center mb-4 clear-both">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center border-4 border-orange-200 hover:border-orange-500 hover:scale-110 hover:shadow-xl hover:shadow-orange-200/50 transition-all duration-300 cursor-pointer">
            <span className="text-4xl hover:scale-110 transition-transform duration-300">🔐</span>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-orange-500 text-center hover:text-orange-600 transition-colors duration-300">
          Verify Restaurant OTP
        </h2>

        <p className="text-gray-500 mt-2 mb-6 text-center">
          OTP sent to <strong className="text-gray-700">{email}</strong>
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <input
              {...register("otp")}
              placeholder="Enter OTP"
              className="w-full border-2 border-gray-200 rounded-lg p-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 text-center text-2xl tracking-widest hover:border-gray-300"
              maxLength={6}
            />

            {errors.otp && (
              <p className="text-red-500 text-sm mt-1">
                {errors.otp.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3.5 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <span className="inline-block animate-spin mr-2">⟳</span>
                Verifying...
              </>
            ) : (
              "Verify OTP"
            )}
          </button>

        </form>

        <p className="text-center text-sm text-gray-500 mt-5">
          Didn&apos;t get the code?{" "}
          {resendCooldown > 0 ? (
            <span className="text-gray-400">
              Resend in {resendCooldown}s
            </span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={isResending}
              className="text-orange-500 font-semibold hover:text-orange-600 hover:underline hover:underline-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isResending ? "Sending..." : "Resend OTP"}
            </button>
          )}
        </p>

      </div>
    </div>
  );
}