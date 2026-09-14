"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

import { AppDispatch } from "@/redux/store/store";
import { addDeliveryDocuments } from "@/redux/slice/delivery/deliverySlice";
import { DeliveryDocumentsPayload } from "@/typescript/delivery/Delivery";
import { deliveryDocumentsSchema } from "@/schme/delivery/deliverySchema";

const useDeliveryDocuments = (next: () => void) => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DeliveryDocumentsPayload>({
    resolver: yupResolver(deliveryDocumentsSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: DeliveryDocumentsPayload) => {
    try {
      const formData = new FormData();

      formData.append("licenseNumber", data.licenseNumber);

      if (data.licensePhoto?.[0]) {
        formData.append("licensePhoto", data.licensePhoto[0]);
      }
      if (data.idProof?.[0]) {
        formData.append("idProof", data.idProof[0]);
      }
      if (data.vehicleRC?.[0]) {
        formData.append("vehicleRC", data.vehicleRC[0]);
      }

      const res = await dispatch(addDeliveryDocuments(formData)).unwrap();

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

export default useDeliveryDocuments;