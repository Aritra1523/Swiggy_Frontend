import * as yup from "yup";

export const deliveryDetailsSchema = yup.object({
  fullName: yup.string().trim().required("Full name is required"),

  email: yup
    .string()
    .trim()
    .email("Invalid email address")
    .required("Email is required"),

  phone: yup
    .string()
    .matches(/^\+?[1-9]\d{9,14}$/, "Invalid phone number")
    .required("Phone number is required"),

  vehicleType: yup
    .string()
    .oneOf(["Bike", "Scooter", "Bicycle", "Car"], "Select a valid vehicle type")
    .required("Vehicle type is required"),

  vehicleNumber: yup.string().trim().required("Vehicle number is required"),
});

export const deliveryDocumentsSchema = yup.object({
  licenseNumber: yup.string().trim().required("License number is required"),
});

export const deliveryContractSchema = yup.object({
  fullName: yup.string().trim().required("Full name is required"),

  place: yup.string().trim().required("Place is required"),

  declarationAccepted: yup
    .boolean()
    .oneOf([true], "You must accept the declaration")
    .required(),

  reviewedSections: yup
    .array()
    .of(yup.string().required())
    .min(4, "Please review all sections")
    .required(),
});

export const deliveryOtpSchema = yup.object({
  otp: yup
    .string()
    .trim()
    .length(6, "OTP must be 6 digits")
    .required("OTP is required"),
});