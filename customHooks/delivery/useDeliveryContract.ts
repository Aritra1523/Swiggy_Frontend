"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

import { AppDispatch } from "@/redux/store/store";
import { submitDeliveryContract } from "@/redux/slice/delivery/deliverySlice";
import { DeliveryContractPayload } from "@/typescript/delivery/Delivery";
import { deliveryContractSchema } from "@/schme/delivery/deliverySchema";

const useDeliveryContract = (next: () => void) => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<DeliveryContractPayload>({
    resolver: yupResolver(deliveryContractSchema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      place: "",
      declarationAccepted: false,
      reviewedSections: [
        "terms_of_service",
        "payout_terms",
        "operational_guidelines",
        "privacy_data_policy",
      ],
    },
  });

  const onSubmit = async (data: DeliveryContractPayload) => {
    try {
      const res = await dispatch(submitDeliveryContract(data)).unwrap();

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
    watch,
    setValue,
  };
};

export default useDeliveryContract;