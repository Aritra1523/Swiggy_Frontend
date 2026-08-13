"use client";

import useLogin from "@/customHooks/auth/ueLogin";

interface Props {
  close: () => void;
  openRegister: () => void;
}

export default function LoginDrawer({ close, openRegister }: Props) {
  const { register, handleSubmit, errors, isSubmitting } = useLogin(close);

  return (
    <div className="fixed inset-0 bg-black/40 z-50">
      <div className="absolute right-0 top-0 h-full w-[420px] bg-white p-8">
        <button onClick={close} className="text-gray-500 mb-6">
          X
        </button>

        <h2 className="text-3xl font-bold mb-8">Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="input"
            {...register("email")}
          />

          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          <input
            type="password"
            placeholder="Password"
            className="input"
            {...register("password")}
          />

          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          <button
            disabled={isSubmitting}
            className="w-full bg-orange-500 text-white py-3 rounded-lg mt-4"
          >
            {isSubmitting ? "Loading..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          New to Swiggy?
          <span
            onClick={openRegister}
            className="text-orange-500 cursor-pointer ml-2 font-semibold"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}
