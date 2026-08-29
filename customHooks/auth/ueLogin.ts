"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/redux/store/store";
import Swal from "sweetalert2";

import { loginUser } from "@/redux/slice/auth/authSlice";
import { LoginPayload } from "@/typescript/auth/Login";
import { loginSchema } from "@/schme/auth/loginSchema";

const useLogin = (onSuccess?: () => void) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginPayload>({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginPayload) => {
    try {
      // Cookie persistence (token / refresh-token / user) now happens
      // inside loginUser's thunk in authSlice.ts, so every dispatcher
      // of loginUser gets it automatically — no need to repeat it here.
      const res = await dispatch(loginUser(data)).unwrap();

      Swal.fire({
        icon: "success",
        title: res.message,
      });

      reset();

      // close login drawer
      onSuccess?.();

      // Restaurant owners land on their dashboard, not wherever the
      // login drawer happened to be opened from
      if (res.data.role === "restaurant_owner") {
        router.push("/owner");
      }
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: err,
      });
    }
  };

  return {
    register,

    handleSubmit: handleSubmit(onSubmit),

    errors,

    isSubmitting,
  };
};

export default useLogin;
