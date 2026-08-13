import * as yup from "yup";

export const applyRestaurantSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Restaurant email is required"),
});