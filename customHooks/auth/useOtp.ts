"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import Swal from "sweetalert2";

import { verifyOtp } from "@/redux/slice/auth/authSlice";
import { otpSchema } from "@/schme/auth/otpSchema";

interface OtpForm {
  otp: string;
}

const useVerifyOtp = (openLogin: () => void, close: () => void) => {
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
      await dispatch(
        verifyOtp({
          userId: userId!,
          otp: data.otp,
        }),
      ).unwrap();

      Swal.fire({
        icon: "success",
        title: "OTP Verified Successfully",
      });

      close();

      openLogin();
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

export default useVerifyOtp;
