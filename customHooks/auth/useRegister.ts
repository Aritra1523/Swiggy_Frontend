"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

import { AppDispatch } from "@/redux/store/store";
import { registerUser } from "@/redux/slice/auth/authSlice";
import { RegisterPayload } from "@/typescript/auth/Register";
import { registerSchema } from "@/schme/auth/registerSchema";

const useRegister = (onSuccess: (email: string) => void) => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterPayload>({
    resolver: yupResolver(registerSchema),
     mode: "onChange",
  });

  const onSubmit = async (data: RegisterPayload) => {
    try {
      const res = await dispatch(registerUser(data)).unwrap();

      Swal.fire({
        icon: "success",
        title: res.message,
      });

      // Open OTP drawer
      onSuccess(data.email);

      reset();
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

export default useRegister;
