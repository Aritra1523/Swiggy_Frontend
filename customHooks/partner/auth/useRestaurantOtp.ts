"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

import { AppDispatch } from "@/redux/store/store";
import { verifyRestaurantOtp } from "@/redux/slice/partner/partnerSlice";
import { otpSchema } from "@/schme/auth/otpSchema";

interface RestaurantOtpForm {
  otp: string;
}

const useRestaurantOtp = (
  email: string,
  close: () => void
) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<RestaurantOtpForm>({
    resolver: yupResolver(otpSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: RestaurantOtpForm) => {
    try {
      const res = await dispatch(
        verifyRestaurantOtp({
          email,
          otp: data.otp,
        })
      ).unwrap();

      Swal.fire({
        icon: "success",
        title: res.message,
      });

      close();

      router.push("/partner/onboarding");
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

export default useRestaurantOtp;