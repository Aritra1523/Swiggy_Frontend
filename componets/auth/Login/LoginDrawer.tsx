"use client";

import useLogin from "@/customHooks/auth/ueLogin";

interface Props {
  close: () => void;
  openRegister: () => void;
}

export default function LoginDrawer({ close, openRegister }: Props) {
  const { register, handleSubmit, errors, isSubmitting } = useLogin(close);

  return (
    <div className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm">
      <div className="absolute right-0 top-0 h-full w-[420px] bg-white/95 backdrop-blur-md p-8 overflow-y-auto shadow-2xl animate-slide-in">
        {/* Close Button */}
        <button 
          onClick={close} 
          className="text-gray-500 hover:text-orange-500 hover:rotate-90 transition-all duration-300 text-xl"
        >
          ✕
        </button>

        {/* Food Emoji with Hover Effect */}
        <div className="flex justify-center mb-5">
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center border-4 border-orange-200 hover:border-orange-500 hover:scale-110 hover:shadow-xl hover:shadow-orange-200/50 transition-all duration-300 cursor-pointer">
            <span className="text-5xl hover:scale-110 transition-transform duration-300">🍔</span>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-8 text-orange-500 text-center hover:text-orange-600 transition-colors duration-300">
          Login
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              className="input w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all duration-300"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              className="input w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all duration-300"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg mt-2 hover:from-orange-600 hover:to-orange-700 hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Loading..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          New to Hungrly?
          <span
            onClick={openRegister}
            className="text-orange-500 cursor-pointer ml-2 font-semibold hover:text-orange-600 hover:underline hover:underline-offset-2 transition-all duration-200"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}