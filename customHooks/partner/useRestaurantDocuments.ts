"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

import { AppDispatch } from "@/redux/store/store";
import { addRestaurantDocuments } from "@/redux/slice/partner/partnerSlice";


import {
  RestaurantDocumentsPayload,
} from "@/typescript/partner/RestaurantDocuments";
import { restaurantDocumentsSchema } from "@/schme/partner/restaurantDocumentsSchema";

const useRestaurantDocuments = (next: () => void, back: () => void) => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<RestaurantDocumentsPayload>({
    resolver: yupResolver(restaurantDocumentsSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: RestaurantDocumentsPayload) => {
    try {
      const res = await dispatch(
        addRestaurantDocuments(data)
      ).unwrap();

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
    back,
  };
};

export default useRestaurantDocuments;