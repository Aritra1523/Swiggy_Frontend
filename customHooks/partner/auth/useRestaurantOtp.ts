// "use client";

// import { yupResolver } from "@hookform/resolvers/yup";
// import { useForm } from "react-hook-form";
// import { useDispatch } from "react-redux";
// import { useRouter } from "next/navigation";
// import Swal from "sweetalert2";

// import { AppDispatch } from "@/redux/store/store";
// import { verifyRestaurantOtp } from "@/redux/slice/partner/partnerSlice";
// import { otpSchema } from "@/schme/auth/otpSchema";

// interface RestaurantOtpForm {
//   otp: string;
// }

// const useRestaurantOtp = (
//   email: string,
//   close: () => void
// ) => {
//   const dispatch = useDispatch<AppDispatch>();
//   const router = useRouter();

//   const {
//     register,
//     handleSubmit,
//     formState: {
//       errors,
//       isSubmitting,
//     },
//   } = useForm<RestaurantOtpForm>({
//     resolver: yupResolver(otpSchema),
//     mode: "onChange",
//   });

//   const onSubmit = async (data: RestaurantOtpForm) => {
//     try {
//       const res = await dispatch(
//         verifyRestaurantOtp({
//           email,
//           otp: data.otp,
//         })
//       ).unwrap();

//       Swal.fire({
//         icon: "success",
//         title: res.message,
//       });

//       close();

//       router.push("/partner/onboarding");
//     } catch (err: any) {
//       Swal.fire({
//         icon: "error",
//         title: err,
//       });
//     }
//   };

//   return {
//     register,
//     handleSubmit: handleSubmit(onSubmit),
//     errors,
//     isSubmitting,
//   };
// };

// export default useRestaurantOtp;

"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import { AppDispatch } from "@/redux/store/store";
import {
  verifyRestaurantOtp,
  resendRestaurantOtp,
} from "@/redux/slice/partner/partnerSlice";
import { otpSchema } from "@/schme/auth/otpSchema";

const RESEND_COOLDOWN_SECONDS = 30;

interface RestaurantOtpForm {
  otp: string;
}

const useRestaurantOtp = (
  email: string,
  close: () => void
) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [resendCooldown, setResendCooldown] = useState(0);
  const [isResending, setIsResending] = useState(false);

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

  // Countdown ticks down once a second while resendCooldown > 0
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setTimeout(() => setResendCooldown((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendCooldown]);

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

  const handleResend = async () => {
    if (resendCooldown > 0 || isResending) return;

    setIsResending(true);
    try {
      const res = await dispatch(resendRestaurantOtp({ email })).unwrap();

      Swal.fire({
        icon: "success",
        title: res.message || "OTP resent",
        timer: 1500,
        showConfirmButton: false,
      });

      setResendCooldown(RESEND_COOLDOWN_SECONDS);
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: err,
      });
    } finally {
      setIsResending(false);
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
    handleResend,
    isResending,
    resendCooldown,
  };
};

export default useRestaurantOtp;