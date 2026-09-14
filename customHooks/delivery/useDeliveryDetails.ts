"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

import { AppDispatch } from "@/redux/store/store";
import { addDeliveryDetails } from "@/redux/slice/delivery/deliverySlice";
import { DeliveryDetailsPayload } from "@/typescript/delivery/Delivery";
import { deliveryDetailsSchema } from "@/schme/delivery/deliverySchema";

const useDeliveryDetails = (next: () => void) => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DeliveryDetailsPayload>({
    resolver: yupResolver(deliveryDetailsSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: DeliveryDetailsPayload) => {
    try {
      const res = await dispatch(addDeliveryDetails(data)).unwrap();

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
  };
};

export default useDeliveryDetails;