import * as yup from "yup";

export const restaurantDocumentsSchema = yup.object({
  outletType: yup.string().required("Outlet type is required"),

  pan: yup
    .string()
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN number")
    .required("PAN is required"),

  gstin: yup
    .string()
    .matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{3}$/, "Invalid GSTIN")
    .required("GSTIN is required"),

  ifscCode: yup
    .string()
    .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC")
    .required("IFSC Code is required"),

  bankAccountNumber: yup.string().required("Bank account number is required"),

  fssaiNumber: yup
    .string()
    .matches(/^[0-9]{14}$/, "FSSAI must be 14 digits")
    .required("FSSAI number is required"),
});
