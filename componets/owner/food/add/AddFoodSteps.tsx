"use client";

import { useFormContext } from "react-hook-form";
import {
  Utensils,
  Tag,
  Coffee,
  Info,
  DollarSign,
  Percent,
  Clock,
  ChevronDown,
  CheckCircle2,
} from "lucide-react";
import { FOOD_TYPES } from "./foodConstants";
import { FormField, ImageUpload, ToggleSwitch } from "./FormComponents";

// Basic Info Step
export const BasicInfoStep = ({
  imagePreview,
  onImageChange,
  onImageRemove,
  onNext,
}: any) => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const isVeg = watch("isVeg");

  return (
    <>
      <ImageUpload
        imagePreview={imagePreview}
        onImageChange={onImageChange}
        onImageRemove={onImageRemove}
        error={errors.image?.message}
      />

      <FormField
        label="Item Name"
        error={errors.itemName?.message}
        required
        icon={Utensils}
      >
        <input
          type="text"
          {...register("itemName")}
          className="w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50 focus:bg-white border-gray-300"
          placeholder="e.g., Butter Chicken"
        />
      </FormField>

      <FormField
        label="Description"
        error={errors.description?.message}
        icon={Info}
      >
        <textarea
          {...register("description")}
          rows={3}
          className="w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50 focus:bg-white border-gray-300 resize-none"
          placeholder="Describe your dish..."
        />
      </FormField>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Food Type" error={errors.foodType?.message} required>
          <div className="relative">
            <select
              {...register("foodType")}
              className="w-full pl-10 pr-10 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50 focus:bg-white appearance-none border-gray-300"
            >
              {FOOD_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </FormField>

        <FormField label="Dietary Type" required>
          <div className="flex gap-2 h-[42px]">
            <button
              type="button"
              onClick={() => setValue("isVeg", true)}
              className={`flex-1 rounded-xl text-sm font-medium border transition-all ${isVeg ? "bg-green-50 border-green-500 text-green-700" : "border-gray-300 text-gray-500 hover:bg-gray-50"}`}
            >
              <span className="flex items-center justify-center gap-2">
                <span className="w-3 h-3 border-2 border-current rounded-full flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                </span>
                Veg
              </span>
            </button>
            <button
              type="button"
              onClick={() => setValue("isVeg", false)}
              className={`flex-1 rounded-xl text-sm font-medium border transition-all ${!isVeg ? "bg-red-50 border-red-500 text-red-700" : "border-gray-300 text-gray-500 hover:bg-gray-50"}`}
            >
              <span className="flex items-center justify-center gap-2">
                <span className="w-3 h-3 border-2 border-current rounded-full flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                </span>
                Non-veg
              </span>
            </button>
          </div>
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Category"
          error={errors.category?.message}
          required
          icon={Tag}
        >
          <input
            type="text"
            {...register("category")}
            className="w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50 focus:bg-white border-gray-300"
            placeholder="e.g., Curries"
          />
        </FormField>
        <FormField
          label="Cuisine"
          error={errors.cuisine?.message}
          icon={Coffee}
        >
          <input
            type="text"
            {...register("cuisine")}
            className="w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50 focus:bg-white border-gray-300"
            placeholder="e.g., North Indian"
          />
        </FormField>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onNext}
          className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl"
        >
          Next: Pricing →
        </button>
      </div>
    </>
  );
};

// Pricing Step
export const PricingStep = ({ onBack, onNext }: any) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();
  const basePrice = watch("basePrice") || 0;
  const discountPrice = watch("discountPrice") || 0;
  const discountPercent =
    basePrice > 0 && discountPrice > 0 && discountPrice < basePrice
      ? Math.round(((basePrice - discountPrice) / basePrice) * 100)
      : 0;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Base Price"
          error={errors.basePrice?.message}
          required
          icon={DollarSign}
          helper="Original price before any discounts"
        >
          <input
            type="number"
            min={0}
            step={0.5}
            {...register("basePrice", { valueAsNumber: true })}
            className="w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50 focus:bg-white border-gray-300"
            placeholder="0.00"
          />
        </FormField>
        <FormField
          label="Discount Price"
          error={errors.discountPrice?.message}
          icon={Percent}
          helper="Leave 0 for no discount"
        >
          <input
            type="number"
            min={0}
            step={0.5}
            {...register("discountPrice", { valueAsNumber: true })}
            className="w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50 focus:bg-white border-gray-300"
            placeholder="0.00"
          />
        </FormField>
      </div>

      {discountPercent > 0 && (
        <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <Percent className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-green-800">
                  Discount Applied
                </p>
                <p className="text-xs text-green-600">
                  Customers save ₹{basePrice - discountPrice}
                </p>
              </div>
            </div>
            <span className="text-2xl font-bold text-green-600">
              {discountPercent}% OFF
            </span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="GST (%)" error={errors.gst?.message} required>
          <input
            type="number"
            min={0}
            max={100}
            {...register("gst", { valueAsNumber: true })}
            className="w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50 focus:bg-white border-gray-300"
            placeholder="5"
          />
        </FormField>
        <FormField
          label="Preparation Time"
          error={errors.preparationTime?.message}
          required
          icon={Clock}
          helper="In minutes"
        >
          <input
            type="number"
            min={0}
            {...register("preparationTime", { valueAsNumber: true })}
            className="w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50 focus:bg-white border-gray-300"
            placeholder="15"
          />
        </FormField>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-600 font-medium rounded-xl border border-gray-200"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={onNext}
          className="flex-1 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl"
        >
          Next: Advanced →
        </button>
      </div>
    </>
  );
};

// Advanced Step
export const AdvancedStep = ({ onBack, isPending }: any) => {
  const { watch, setValue } = useFormContext();
  const isAvailable = watch("isAvailable");
  const isRecommended = watch("isRecommended");

  return (
    <>
      <div className="space-y-4 p-4 bg-gray-50 rounded-2xl">
        <ToggleSwitch
          label="Available for Order"
          description="Make this item available for customers to order"
          checked={isAvailable}
          onChange={() => setValue("isAvailable", !isAvailable)}
        />
        <ToggleSwitch
          label="Mark as Recommended"
          description="Feature this item as a customer favorite"
          checked={isRecommended}
          onChange={() => setValue("isRecommended", !isRecommended)}
        />
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-600 font-medium rounded-xl border border-gray-200"
        >
          ← Back
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/30 disabled:opacity-50"
        >
          {isPending ? "Adding..." : "Add Item to Menu"}
        </button>
      </div>
    </>
  );
};

// Step Progress
export const StepsProgress = ({
  activeStep,
  currentStepIndex,
  onStepClick,
  hasStepErrors,
}: any) => {
  const { STEPS } = require("./foodConstants");
  return (
    <div className="flex items-center gap-2 mb-6">
      {STEPS.map((step: any, index: number) => {
        const isActive = activeStep === step.id;
        const isCompleted = index < currentStepIndex;
        const hasError = hasStepErrors(step.id);
        return (
          <button
            key={step.id}
            type="button"
            onClick={() => onStepClick(step.id)}
            className={`flex-1 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30" : isCompleted ? "bg-green-50 text-green-700 border border-green-200" : hasError ? "bg-red-50 text-red-700 border border-red-200" : "bg-gray-50 text-gray-500 hover:bg-gray-100"}`}
          >
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${isActive ? "bg-white/20 text-white" : isCompleted ? "bg-green-500 text-white" : hasError ? "bg-red-500 text-white" : "bg-gray-200 text-gray-600"}`}
            >
              {isCompleted ? <CheckCircle2 className="w-3 h-3" /> : index + 1}
            </span>
            <span className="hidden sm:inline capitalize">{step.label}</span>
          </button>
        );
      })}
    </div>
  );
};
