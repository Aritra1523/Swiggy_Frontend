"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

import { AppDispatch } from "@/redux/store/store";
import { registerUser } from "@/redux/slice/auth/authSlice";
import { RegisterPayload } from "@/typescript/auth/Register";
import { registerSchema } from "@/schme/auth/registerSchema";

// Reuses the existing registerUser thunk — a delivery partner account
// is a normal user account at this stage; the role only changes to
// "delivery_partner" once admin approves the application later.
const useDeliverySignup = (
  onSuccess: (email: string, password: string) => void,
) => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
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

      onSuccess(data.email, data.password);
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

export default useDeliverySignup;