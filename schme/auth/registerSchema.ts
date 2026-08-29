import * as yup from "yup";

export const registerSchema = yup.object({
  full_name: yup
    .string()
    .required("First name is required")
    .min(3, "minimum 3 characters"),
  mobile_Number: yup
    .string()
    .required("Mobile number is required")
    .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits"),

  email: yup.string().email("Invalid email").required("Email is required"),

  address: yup.string().required("Address is required"),

  password: yup.string().min(6, "Minimum 6 characters").required(),

  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required(),
});
