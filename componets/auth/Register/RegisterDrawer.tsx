// "use client";

// import useRegister from "@/customHooks/auth/useRegister";

// interface Props {
//   close: () => void;
//   backToLogin: () => void;
//   onSuccess: (email: string) => void;
// }

// export default function RegisterDrawer({
//   close,
//   backToLogin,
//   onSuccess,
// }: Props) {
//   const { register, handleSubmit, errors, isSubmitting } =
//     useRegister(onSuccess);

//   return (
//     <div className="fixed inset-0 z-50 bg-black/40">
//       {/* Drawer */}
//       <div
//         className="
//           absolute 
//           right-0 
//           top-0 
//           h-screen 
//           w-[420px] 
//           bg-white 
//           p-8
//           overflow-y-auto
//         "
//       >
//         <button onClick={close} className="text-gray-500 mb-6">
//           X
//         </button>

// <h2 className="text-3xl font-bold mb-8 text-orange-500">Create Account</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <input
//               {...register("full_name")}
//               placeholder="Full Name"
//               className="input"
//             />
//             {errors.full_name && (
//               <p className="text-red-500 text-sm mt-1">{errors.full_name.message}</p>
//             )}
//           </div>

//           <div className="mb-4">
//             <input
//               {...register("mobile_Number")}
//               placeholder="Mobile Number"
//               className="input"
//             />
//             {errors.mobile_Number && (
//               <p className="text-red-500 text-sm mt-1">{errors.mobile_Number.message}</p>
//             )}
//           </div>

//           <div className="mb-4">
//             <input {...register("email")} placeholder="Email" className="input" />
//             {errors.email && (
//               <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
//             )}
//           </div>

//           <div className="mb-4">
//             <input
//               {...register("address")}
//               placeholder="Address"
//               className="input"
//             />
//             {errors.address && (
//               <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
//             )}
//           </div>

//           <div className="mb-4">
//             <input
//               type="password"
//               {...register("password")}
//               placeholder="Password"
//               className="input"
//             />
//             {errors.password && (
//               <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
//             )}
//           </div>

//           <div className="mb-6">
//             <input
//               type="password"
//               {...register("confirm_password")}
//               placeholder="Confirm Password"
//               className="input"
//             />
//             {errors.confirm_password && (
//               <p className="text-red-500 text-sm mt-1">{errors.confirm_password.message}</p>
//             )}
//           </div>

//           <button
//             disabled={isSubmitting}
//             className="
//               w-full
//               bg-orange-500
//               text-white
//               py-3
//               rounded-lg
//               mt-2
//             "
//           >
//             {isSubmitting ? "Creating..." : "Register"}
//           </button>
//         </form>

//         <p className="mt-6 text-center text-gray-600">
//           Already have account?
//           <span
//             onClick={backToLogin}
//             className="text-orange-500 cursor-pointer ml-2"
//           >
//             Login
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// }"use client";

import useRegister from "@/customHooks/auth/useRegister";

interface Props {
  close: () => void;
  backToLogin: () => void;
  onSuccess: (email: string) => void;
}

export default function RegisterDrawer({
  close,
  backToLogin,
  onSuccess,
}: Props) {
  const { register, handleSubmit, errors, isSubmitting } =
    useRegister(onSuccess);

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm">
      {/* Drawer */}
      <div
        className="
          absolute 
          right-0 
          top-0 
          h-screen 
          w-[420px] 
          bg-white/95 
          backdrop-blur-md
          p-8
          overflow-y-auto
          shadow-2xl
          animate-slide-in
        "
      >
        {/* Close Button - Moved to top-left */}
        <button 
          onClick={close} 
          className="text-gray-400 hover:text-orange-500 hover:rotate-90 transition-all duration-300 text-2xl"
        >
          ✕
        </button>

        {/* Food Emoji with Hover Effect */}
        <div className="flex justify-center mb-4">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center border-4 border-orange-200 hover:border-orange-500 hover:scale-110 hover:shadow-xl hover:shadow-orange-200/50 transition-all duration-300 cursor-pointer">
            <span className="text-4xl hover:scale-110 transition-transform duration-300">🍔</span>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-2 text-orange-500 text-center hover:text-orange-600 transition-colors duration-300">
          Create Account
        </h2>
        
        <p className="text-gray-500 text-center mb-6 text-sm">
          Join Hungrly and start ordering delicious food
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              {...register("full_name")}
              placeholder="Full Name"
              className="w-full border-2 border-gray-200 rounded-lg p-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 text-black hover:border-gray-300"
            />
            {errors.full_name && (
              <p className="text-red-500 text-sm mt-1">{errors.full_name.message}</p>
            )}
          </div>

          <div className="mb-4">
            <input
              {...register("mobile_Number")}
              placeholder="Mobile Number"
              className="w-full border-2 border-gray-200 rounded-lg p-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 text-black hover:border-gray-300"
            />
            {errors.mobile_Number && (
              <p className="text-red-500 text-sm mt-1">{errors.mobile_Number.message}</p>
            )}
          </div>

          <div className="mb-4">
            <input 
              {...register("email")} 
              placeholder="Email" 
              className="w-full border-2 border-gray-200 rounded-lg p-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 text-black hover:border-gray-300"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-4">
            <input
              {...register("address")}
              placeholder="Address"
              className="w-full border-2 border-gray-200 rounded-lg p-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 text-black hover:border-gray-300"
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
            )}
          </div>

          <div className="mb-4">
            <input
              type="password"
              {...register("password")}
              placeholder="Password"
              className="w-full border-2 border-gray-200 rounded-lg p-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 text-black hover:border-gray-300"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <div className="mb-6">
            <input
              type="password"
              {...register("confirm_password")}
              placeholder="Confirm Password"
              className="w-full border-2 border-gray-200 rounded-lg p-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 text-black hover:border-gray-300"
            />
            {errors.confirm_password && (
              <p className="text-red-500 text-sm mt-1">{errors.confirm_password.message}</p>
            )}
          </div>

          <button
            disabled={isSubmitting}
            className="
              w-full
              bg-gradient-to-r 
              from-orange-500 
              to-orange-600 
              text-white 
              py-3.5 
              rounded-lg 
              font-semibold
              mt-2
              hover:from-orange-600 
              hover:to-orange-700 
              hover:shadow-lg 
              hover:shadow-orange-500/30 
              transition-all 
              duration-300 
              transform 
              hover:scale-[1.02] 
              active:scale-[0.98] 
              disabled:opacity-60 
              disabled:cursor-not-allowed
            "
          >
            {isSubmitting ? (
              <>
                <span className="inline-block animate-spin mr-2">⟳</span>
                Creating...
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have account?
          <span
            onClick={backToLogin}
            className="text-orange-500 cursor-pointer ml-2 font-semibold hover:text-orange-600 hover:underline hover:underline-offset-2 transition-all duration-200"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}