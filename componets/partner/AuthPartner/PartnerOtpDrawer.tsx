// "use client";

// import useRestaurantOtp from "@/customHooks/partner/auth/useRestaurantOtp";

// interface Props {
//   email: string;
//   close: () => void;
// }

// export default function PartnerOtpDrawer({
//   email,
//   close,
// }: Props) {
//   const {
//     register,
//     handleSubmit,
//     errors,
//     isSubmitting,
//   } = useRestaurantOtp(email, close);

//   return (
//     <div className="fixed inset-0 bg-black/40 z-50">
//       <div className="absolute right-0 top-0 h-full w-[420px] bg-white p-8">

//         <button
//           onClick={close}
//           className="text-gray-500 mb-6"
//         >
//           ✕
//         </button>

//         <h2 className="text-3xl font-bold">
//           Verify Restaurant OTP
//         </h2>

//         <p className="text-gray-500 mt-2 mb-6">
//           OTP sent to <strong>{email}</strong>
//         </p>

//         <form onSubmit={handleSubmit} className="space-y-5">

//           <div>
//             <input
//               {...register("otp")}
//               placeholder="Enter OTP"
//               className="w-full border rounded-lg p-3"
//             />

//             {errors.otp && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.otp.message}
//               </p>
//             )}
//           </div>

//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="w-full bg-orange-500 text-white py-3 rounded-lg"
//           >
//             {isSubmitting ? "Verifying..." : "Verify OTP"}
//           </button>

//         </form>

//       </div>
//     </div>
//   );
// }

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
    <div className="fixed inset-0 bg-black/40 z-50">
      <div className="absolute right-0 top-0 h-full w-[420px] bg-white p-8">

        <button
          onClick={close}
          className="text-gray-500 mb-6"
        >
          ✕
        </button>

        <h2 className="text-3xl font-bold">
          Verify Restaurant OTP
        </h2>

        <p className="text-gray-500 mt-2 mb-6">
          OTP sent to <strong>{email}</strong>
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <input
              {...register("otp")}
              placeholder="Enter OTP"
              className="w-full border rounded-lg p-3"
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
            className="w-full bg-orange-500 text-white py-3 rounded-lg"
          >
            {isSubmitting ? "Verifying..." : "Verify OTP"}
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
              className="text-orange-500 font-semibold hover:underline disabled:opacity-50"
            >
              {isResending ? "Sending..." : "Resend OTP"}
            </button>
          )}
        </p>

      </div>
    </div>
  );
}