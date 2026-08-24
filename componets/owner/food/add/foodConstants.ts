import { OwnerFood } from "@/typescript/restaurantOwner/restaurantOwner";
import { Salad, Beef, Cake, Wine, Pizza } from "lucide-react";

export const FOOD_TYPES: OwnerFood["foodType"][] = [
  "Starter",
  "Main Course",
  "Dessert",
  "Beverage",
  "Snack",
];

export const FOOD_TYPE_ICONS: Record<string, any> = {
  Starter: Salad,
  "Main Course": Beef,
  Dessert: Cake,
  Beverage: Wine,
  Snack: Pizza,
};

export const STEPS = [
  {
    id: "basic",
    label: "Basic Info",
    fields: ["itemName", "foodType", "category", "isVeg"],
  },
  {
    id: "pricing",
    label: "Pricing",
    fields: ["basePrice", "discountPrice", "gst", "preparationTime"],
  },
  {
    id: "advanced",
    label: "Advanced",
    fields: ["isAvailable", "isRecommended"],
  },
] as const;

export type StepId = (typeof STEPS)[number]["id"];
