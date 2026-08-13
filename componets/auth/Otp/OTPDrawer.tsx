"use client";

import useVerifyOtp from "@/customHooks/auth/useOtp";

interface Props {
  close: () => void;
  openLogin: () => void;
}

export default function OTPDrawer({ close, openLogin }: Props) {
  const { register, handleSubmit, errors, isSubmitting } = useVerifyOtp(
    openLogin,
    close,
  );

  return (
    <div className="fixed inset-0 bg-black/40 z-50">
      <div className="absolute right-0 top-0 w-[420px] h-full bg-white p-8">
        <button onClick={close} className="text-gray-500 mb-6">
          X
        </button>

        <h2 className="text-3xl font-bold mb-6">Verify OTP</h2>

        <form onSubmit={handleSubmit}>
          <input
            {...register("otp")}
            placeholder="Enter OTP"
            className="input"
          />

          {errors.otp && (
            <p className="text-red-500 text-sm">{errors.otp.message}</p>
          )}

          <button
            disabled={isSubmitting}
            className="w-full bg-orange-500 text-white py-3 rounded-lg mt-4"
          >
            {isSubmitting ? "Verifying..." : "Verify"}
          </button>
        </form>
      </div>
    </div>
  );
}
