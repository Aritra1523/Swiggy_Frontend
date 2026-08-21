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

//         <h2 className="text-3xl font-bold mb-8">Create Account</h2>

//         <form onSubmit={handleSubmit}>
//           <input
//             {...register("full_name")}
//             placeholder="Full Name"
//             className="input"
//           />

//           <p className="text-red-500">{errors.full_name?.message}</p>

//           <input
//             {...register("mobile_Number")}
//             placeholder="Mobile Number"
//             className="input"
//           />
//           <p className="text-red-500">{errors.mobile_Number?.message}</p>

//           <input {...register("email")} placeholder="Email" className="input" />
//           <p className="text-red-500">{errors.email?.message}</p>

//           <input
//             {...register("address")}
//             placeholder="Address"
//             className="input"
//           />
//           <p className="text-red-500">{errors.address?.message}</p>

//           <input
//             type="password"
//             {...register("password")}
//             placeholder="Password"
//             className="input"
//           />
//           <p className="text-red-500">{errors.password?.message}</p>

//           <input
//             type="password"
//             {...register("confirm_password")}
//             placeholder="Confirm Password"
//             className="input"
//           />
//           <p className="text-red-500">{errors.confirm_password?.message}</p>
//           <button
//             disabled={isSubmitting}
//             className="
//               w-full
//               bg-orange-500
//               text-white
//               py-3
//               rounded-lg
//               mt-5
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
// }


"use client";

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
    <div className="fixed inset-0 z-50 bg-black/40">
      {/* Drawer */}
      <div
        className="
          absolute 
          right-0 
          top-0 
          h-screen 
          w-[420px] 
          bg-white 
          p-8
          overflow-y-auto
        "
      >
        <button onClick={close} className="text-gray-500 mb-6">
          X
        </button>

        <h2 className="text-3xl font-bold mb-8">Create Account</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              {...register("full_name")}
              placeholder="Full Name"
              className="input"
            />
            {errors.full_name && (
              <p className="text-red-500 text-sm mt-1">{errors.full_name.message}</p>
            )}
          </div>

          <div className="mb-4">
            <input
              {...register("mobile_Number")}
              placeholder="Mobile Number"
              className="input"
            />
            {errors.mobile_Number && (
              <p className="text-red-500 text-sm mt-1">{errors.mobile_Number.message}</p>
            )}
          </div>

          <div className="mb-4">
            <input {...register("email")} placeholder="Email" className="input" />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-4">
            <input
              {...register("address")}
              placeholder="Address"
              className="input"
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
              className="input"
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
              className="input"
            />
            {errors.confirm_password && (
              <p className="text-red-500 text-sm mt-1">{errors.confirm_password.message}</p>
            )}
          </div>

          <button
            disabled={isSubmitting}
            className="
              w-full
              bg-orange-500
              text-white
              py-3
              rounded-lg
              mt-2
            "
          >
            {isSubmitting ? "Creating..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have account?
          <span
            onClick={backToLogin}
            className="text-orange-500 cursor-pointer ml-2"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}