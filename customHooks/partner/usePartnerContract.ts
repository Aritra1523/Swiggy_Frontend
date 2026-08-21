"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { AppDispatch } from "@/redux/store/store";

import { submitPartnerContract } from "@/redux/slice/partner/partnerSlice";

import { PartnerContractPayload } from "@/typescript/partner/PartnerContract";
import { partnerContractSchema } from "@/schme/partner/partnerContractSchema";
import { useRouter } from "next/navigation";
const usePartnerContract = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PartnerContractPayload>({
    resolver: yupResolver(partnerContractSchema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      designation: "",
      date: new Date().toISOString(),
      place: "",
      declarationAccepted: false,
      reviewedSections: [
        "terms_of_service",
        "commission_payment_terms",
        "operational_guidelines",
        "privacy_data_policy",
      ],
    },
  });

  const onSubmit = async (data: PartnerContractPayload) => {
    try {
      const res = await dispatch(submitPartnerContract(data)).unwrap();

      Swal.fire({
        icon: "success",
        title: res.message,
      });

      router.push("/");
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

export default usePartnerContract;
