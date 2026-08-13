import * as yup from "yup";

export const partnerContractSchema = yup.object({
  fullName: yup.string().required("Full name is required"),

  designation: yup.string().required("Designation is required"),

  date: yup.string().required("Date is required"),

  place: yup.string().required("Place is required"),

 declarationAccepted: yup
  .boolean()
  .oneOf([true], "Please accept declaration")
  .required(),

reviewedSections: yup
  .array()
  .of(yup.string().required())
  .min(1, "Please review all sections")
  .required(),
});
