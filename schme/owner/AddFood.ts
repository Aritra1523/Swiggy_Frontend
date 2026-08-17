import * as yup from "yup";

export const addFoodSchema = yup.object({
  itemName: yup
    .string()
    .trim()
    .required("Item name is required")
    .min(2, "Item name must be at least 2 characters")
    .max(100, "Item name cannot exceed 100 characters"),

  description: yup
    .string()
    .trim()
    .default("")
    .max(500, "Description cannot exceed 500 characters"),

  foodType: yup
    .mixed<"Starter" | "Main Course" | "Dessert" | "Beverage" | "Snack">()
    .oneOf(
      ["Starter", "Main Course", "Dessert", "Beverage", "Snack"],
      "Invalid food type",
    )
    .required("Food type is required"),

  category: yup
    .string()
    .trim()
    .required("Category is required")
    .max(100, "Category cannot exceed 100 characters"),

  cuisine: yup
    .string()
    .trim()
    .default("")
    .max(100, "Cuisine cannot exceed 100 characters"),

  basePrice: yup
    .number()
    .typeError("Base price must be a number")
    .required("Base price is required")
    .min(0, "Base price cannot be negative"),

  discountPrice: yup
    .number()
    .typeError("Discount price must be a number")
    .default(0)
    .min(0, "Discount price cannot be negative")
    .test(
      "discount-less-than-base",
      "Discount price must be less than base price",
      function (value) {
        if (!value || value === 0) {
          return true;
        }

        return value < this.parent.basePrice;
      },
    ),

  gst: yup
    .number()
    .typeError("GST must be a number")
    .default(5)
    .min(0, "GST cannot be negative"),

  preparationTime: yup
    .number()
    .typeError("Preparation time must be a number")
    .default(15)
    .min(0, "Preparation time cannot be negative"),

  isAvailable: yup
    .boolean()
    .default(true)
    .required(),

  isRecommended: yup
    .boolean()
    .default(false)
    .required(),

  isVeg: yup
    .boolean()
    .default(true)
    .required(),

  image: yup
    .mixed<File>()
    .required("Food image is required")
    .test(
      "fileType",
      "Only image files are allowed",
      (value) => {
        if (!value) return false;

        return value instanceof File && value.type.startsWith("image/");
      },
    )
    .test(
      "fileSize",
      "Image size must be less than 5MB",
      (value) => {
        if (!value) return false;

        return value instanceof File && value.size <= 5 * 1024 * 1024;
      },
    ),
});