"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

import { AppDispatch } from "@/redux/store/store";
import { addRestaurantDetails } from "@/redux/slice/partner/partnerSlice";

import { RestaurantDetailsPayload } from "@/typescript/partner/RestaurantDetails";
import { restaurantDetailsSchema } from "@/schme/partner/restaurantDetailsSchema";

const useRestaurantDetails = (next: () => void) => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<RestaurantDetailsPayload>({
    resolver: yupResolver(restaurantDetailsSchema),
    defaultValues: {
      workingDays: [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
      ],
      openingClosing: {
        sameForAllDays: true,
        slots: [{ open: "10:00", close: "22:00" }],
      },
    },
    mode: "onChange",
  });

  const onSubmit = async (data: RestaurantDetailsPayload) => {
    try {
      const res = await dispatch(addRestaurantDetails(data)).unwrap();

      Swal.fire({
        icon: "success",
        title: res.message,
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
    setValue,
    watch
  };
};

export default useRestaurantDetails;
