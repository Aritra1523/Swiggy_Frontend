"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import { AppDispatch, RootState } from "@/redux/store/store";
import { verifyOtp, loginUser } from "@/redux/slice/auth/authSlice";
import { applyDelivery } from "@/redux/slice/delivery/deliverySlice";
import { otpSchema } from "@/schme/auth/otpSchema";

interface OtpForm {
  otp: string;
}

// Step 2: verify the signup email OTP -> auto-login with the same
// credentials -> immediately kick off the delivery application
// (which sends a second, delivery-specific OTP) -> move to step 3.
const useVerifySignupOtp = (
  email: string,
  password: string,
  next: () => void,
) => {
  const dispatch = useDispatch<AppDispatch>();

  const userId = useSelector((state: RootState) => state.auth.user?.id);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OtpForm>({
    resolver: yupResolver(otpSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: OtpForm) => {
    try {
      await dispatch(verifyOtp({ userId: userId!, otp: data.otp })).unwrap();

      await dispatch(loginUser({ email, password })).unwrap();

      await dispatch(applyDelivery({ email })).unwrap();

      Swal.fire({
        icon: "success",
        title: "Email verified — check your inbox for a delivery partner OTP",
      });

      next();
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

export default useVerifySignupOtp;