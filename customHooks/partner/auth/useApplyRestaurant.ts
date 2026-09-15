// "use client";

// import { yupResolver } from "@hookform/resolvers/yup";
// import { useForm } from "react-hook-form";
// import { useDispatch } from "react-redux";
// import Swal from "sweetalert2";

// import { AppDispatch } from "@/redux/store/store";
// import {
//   applyRestaurant,
//   setRestaurantEmail,
// } from "@/redux/slice/partner/partnerSlice";

// import { ApplyRestaurantPayload } from "@/typescript/partner/ApplyRestaurant";
// import { applyRestaurantSchema } from "@/schme/partner/auth/applyRestaurantSchema";

// const useApplyRestaurant = (onSuccess: (email: string) => void) => {
//   const dispatch = useDispatch<AppDispatch>();

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors, isSubmitting },
//   } = useForm<ApplyRestaurantPayload>({
//     resolver: yupResolver(applyRestaurantSchema),
//     mode: "onChange",
//   });

//   const onSubmit = async (data: ApplyRestaurantPayload) => {
//     try {
//       const res = await dispatch(applyRestaurant(data)).unwrap();

//       // Save email in Redux
//       dispatch(setRestaurantEmail(data.email));

//       Swal.fire({
//         icon: "success",
//         title: res.message,
//       });

//       // Open OTP Drawer
//       onSuccess(data.email);

//       reset();
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

// export default useApplyRestaurant;

"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

import { AppDispatch } from "@/redux/store/store";
import {
  applyRestaurant,
  setRestaurantEmail,
} from "@/redux/slice/partner/partnerSlice";

import { ApplyRestaurantPayload } from "@/typescript/partner/ApplyRestaurant";
import { applyRestaurantSchema } from "@/schme/partner/auth/applyRestaurantSchema";

const useApplyRestaurant = (
  onSuccess: (email: string) => void,
  accountEmail: string,
) => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ApplyRestaurantPayload>({
    resolver: yupResolver(applyRestaurantSchema),
    mode: "onChange",
    // The restaurant application is tied to the account that's already
    // logged in — this is never a fresh signup, so the email is fixed to
    // the account's own email rather than left free-text.
    defaultValues: { email: accountEmail },
  });

  const onSubmit = async () => {
    try {
      const res = await dispatch(
        applyRestaurant({ email: accountEmail }),
      ).unwrap();

      // Save email in Redux
      dispatch(setRestaurantEmail(accountEmail));

      Swal.fire({
        icon: "success",
        title: res.message,
      });

      // Open OTP Drawer
      onSuccess(accountEmail);

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

export default useApplyRestaurant;