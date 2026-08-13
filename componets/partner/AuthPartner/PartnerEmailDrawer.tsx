"use client";

import useApplyRestaurant from "@/customHooks/partner/auth/useApplyRestaurant";

interface Props {
  close: () => void;
  openOtp: (email: string) => void;
}

export default function PartnerEmailDrawer({ close, openOtp }: Props) {
  const { register, handleSubmit, errors, isSubmitting } =
    useApplyRestaurant(openOtp);

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50"
      onClick={close}
    >
      <div 
        className="absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white p-6 sm:p-8 overflow-y-auto shadow-xl animate-slide-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={close} 
          className="text-gray-400 hover:text-gray-600 text-2xl mb-6 transition-colors duration-200 float-right"
          aria-label="Close drawer"
        >
          ✕
        </button>

        {/* Heading */}
        <div className="clear-both">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Become a Partner
          </h2>

          <p className="text-gray-500 mt-2 mb-8 text-sm sm:text-base">
            Enter your restaurant email to receive an OTP.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              placeholder="Restaurant Email"
              {...register("email")}
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 text-black" 
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-2">
                {errors.email.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-orange-500 text-white py-3.5 rounded-lg font-semibold hover:bg-orange-600 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isSubmitting ? (
              <>
                <span className="inline-block animate-spin mr-2">⟳</span>
                Sending OTP...
              </>
            ) : (
              "Send OTP"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}