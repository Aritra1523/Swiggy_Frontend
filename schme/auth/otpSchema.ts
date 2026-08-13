import * as yup from "yup"

export const otpSchema=yup.object({
    otp:yup
        .string()
        .required("Otp is required")
        .length(6,"OTP must be at least 6 digits")
})