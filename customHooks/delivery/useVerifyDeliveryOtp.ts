"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import { AppDispatch, RootState } from "@/redux/store/store";
import {
  verifyDeliveryOtp,
  resendDeliveryOtp,
} from "@/redux/slice/delivery/deliverySlice";
import { deliveryOtpSchema } from "@/schme/delivery/deliverySchema";

interface OtpForm {
  otp: string;
}

const useVerifyDeliveryOtp = (next: () => void) => {
  const dispatch = useDispatch<AppDispatch>();

  const email = useSelector((state: RootState) => state.delivery.deliveryEmail);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OtpForm>({
    resolver: yupResolver(deliveryOtpSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: OtpForm) => {
    try {
      await dispatch(verifyDeliveryOtp({ email, otp: data.otp })).unwrap();

      Swal.fire({
        icon: "success",
        title: "Delivery partner email verified",
      });

      next();
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: err,
      });
    }
  };

  const resend = async () => {
    try {
      await dispatch(resendDeliveryOtp({ email })).unwrap();

      Swal.fire({
        icon: "success",
        title: "OTP resent",
      });
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
    resend,
  };
};

export default useVerifyDeliveryOtp;