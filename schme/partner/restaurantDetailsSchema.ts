import * as yup from "yup";

export const restaurantDetailsSchema = yup.object({
  ownerName: yup
    .string()
    .trim()
    .required("Owner name is required"),

  restaurantName: yup
    .string()
    .trim()
    .required("Restaurant name is required"),

  location: yup
    .string()
    .trim()
    .required("Location is required"),

  email: yup
    .string()
    .trim()
    .email("Invalid email address")
    .required("Email is required"),

  phone: yup
    .string()
    .matches(/^\+?[1-9]\d{9,14}$/, "Invalid phone number")
    .required("Phone number is required"),

  whatsappNumber: yup
    .string()
    .matches(/^\+?[1-9]\d{9,14}$/, "Invalid WhatsApp number")
    .required("WhatsApp number is required"),

  workingDays: yup
    .array()
    .of(yup.string().required())
    .min(1, "Select at least one working day")
    .required(),

  openingClosing: yup.object({
    sameForAllDays: yup.boolean().required(),

    slots: yup
      .array()
      .of(
        yup.object({
          open: yup
            .string()
            .required("Opening time is required"),

          close: yup
            .string()
            .required("Closing time is required"),
        })
      )
      .min(1, "At least one time slot is required")
      .required(),
  }),
});