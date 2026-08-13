"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import Swal from "sweetalert2";
import { setCookie } from "cookies-next";

import { loginUser } from "@/redux/slice/auth/authSlice";
import { LoginPayload } from "@/typescript/auth/Login";
import { loginSchema } from "@/schme/auth/loginSchema";

const useLogin = (onSuccess?: () => void) => {
  const dispatch = useDispatch<AppDispatch>();

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
      const res = await dispatch(loginUser(data)).unwrap();

      setCookie("token", res.accessToken, {
        maxAge: 60 * 15,
        path: "/",
      });

      setCookie("refresh-token", res.refreshToken, {
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });

      setCookie("user", JSON.stringify(res.data), {
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });

      Swal.fire({
        icon: "success",
        title: res.message,
      });

      reset();

      // close login drawer
      onSuccess?.();
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
