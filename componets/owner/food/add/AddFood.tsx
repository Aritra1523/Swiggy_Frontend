"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  ArrowLeft,
  ImagePlus,
  Utensils,
  CheckCircle2,
  AlertCircle,
  X,
  Plus,
  Minus,
  Clock,
  Tag,
  DollarSign,
  Percent,
  Coffee,
  Beef,
  Salad,
  Pizza,
  Cake,
  Wine,
  ChevronDown,
  Info,
  Sparkles,
} from "lucide-react";

import {
  AddFoodPayload,
  OwnerFood,
} from "@/typescript/restaurantOwner/restaurantOwner";

import { useAddFood } from "@/customHooks/owner/useFoodManagement";
import { addFoodSchema } from "@/schme/owner/AddFood";

const FOOD_TYPES: OwnerFood["foodType"][] = [
  "Starter",
  "Main Course",
  "Dessert",
  "Beverage",
  "Snack",
];

const FOOD_TYPE_ICONS: Record<string, any> = {
  Starter: Salad,
  "Main Course": Beef,
  Dessert: Cake,
  Beverage: Wine,
  Snack: Pizza,
};

// Step configuration
const STEPS = [
  { id: "basic", label: "Basic Info", fields: ["itemName", "foodType", "category", "isVeg"] },
  { id: "pricing", label: "Pricing", fields: ["basePrice", "discountPrice", "gst", "preparationTime"] },
  { id: "advanced", label: "Advanced", fields: ["isAvailable", "isRecommended"] },
] as const;

type StepId = typeof STEPS[number]["id"];

// Image Upload Component
const ImageUpload = ({
  imagePreview,
  onImageChange,
  onImageRemove,
  error,
}: {
  imagePreview: string | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageRemove: () => void;
  error?: string;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
        Food Image
        <span className="text-gray-400 font-normal ml-1">(optional)</span>
      </label>
      
      <div className="relative">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={onImageChange}
          className="hidden"
        />
        
        {imagePreview ? (
          <div className="relative group">
            <div className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-gray-200 shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imagePreview}
                alt="Food preview"
                className="w-full h-full object-cover"
              />
            </div>
            <button
              type="button"
              onClick={onImageRemove}
              className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/60 backdrop-blur-sm text-white text-xs font-medium rounded-lg hover:bg-black/80 transition-colors opacity-0 group-hover:opacity-100"
            >
              Change
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-32 h-32 rounded-2xl border-2 border-dashed border-gray-300 hover:border-orange-400 hover:bg-orange-50 transition-all flex flex-col items-center justify-center group"
          >
            <div className="w-12 h-12 rounded-full bg-gray-50 group-hover:bg-orange-100 flex items-center justify-center transition-colors">
              <ImagePlus className="w-5 h-5 text-gray-400 group-hover:text-orange-500 transition-colors" />
            </div>
            <span className="text-xs text-gray-400 mt-2 group-hover:text-orange-500 transition-colors">
              Upload Photo
            </span>
          </button>
        )}
      </div>
      
      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          {error}
        </p>
      )}
    </div>
  );
};

// Form Field Component
const FormField = ({
  label,
  error,
  required,
  icon: Icon,
  children,
  helper,
}: {
  label: string;
  error?: string;
  required?: boolean;
  icon?: any;
  children: React.ReactNode;
  helper?: string;
}) => (
  <div className="space-y-1.5">
    <label className="block text-sm font-semibold text-gray-700">
      {label}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
    <div className="relative">
      {Icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <Icon className="w-4 h-4" />
        </div>
      )}
      {children}
    </div>
    {helper && <p className="text-xs text-gray-400">{helper}</p>}
    {error && (
      <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
        <AlertCircle className="w-3 h-3" />
        {error}
      </p>
    )}
  </div>
);

// Toggle Switch Component
const ToggleSwitch = ({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onChange: () => void;
}) => (
  <label className="flex items-start gap-3 cursor-pointer group">
    <div className="relative">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <div
        className={`w-11 h-6 rounded-full transition-colors ${
          checked ? "bg-orange-500" : "bg-gray-300"
        }`}
      >
        <div
          className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
            checked ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </div>
    </div>
    <div>
      <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
        {label}
      </span>
      {description && (
        <p className="text-xs text-gray-400">{description}</p>
      )}
    </div>
  </label>
);

export default function AddFoodPage() {
  const router = useRouter();
  const addFood = useAddFood();

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [activeStep, setActiveStep] = useState<StepId>("basic");
  const [stepErrors, setStepErrors] = useState<Record<StepId, boolean>>({
    basic: false,
    pricing: false,
    advanced: false,
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors, isValid, isDirty, touchedFields },
  } = useForm<AddFoodPayload>({
    resolver: yupResolver(addFoodSchema),
    mode: "onChange",
    defaultValues: {
      itemName: "",
      description: "",
      foodType: "Main Course",
      category: "",
      cuisine: "",
      basePrice: 0,
      discountPrice: 0,
      gst: 5,
      preparationTime: 15,
      isAvailable: true,
      isRecommended: false,
      isVeg: true,
    },
  });

  const isVeg = watch("isVeg");
  const isAvailable = watch("isAvailable");
  const isRecommended = watch("isRecommended");
  const foodType = watch("foodType");
  const basePrice = watch("basePrice");
  const discountPrice = watch("discountPrice");

  // Auto-calculate discount percentage
  const discountPercent = basePrice > 0 && discountPrice > 0 && discountPrice < basePrice
    ? Math.round(((basePrice - discountPrice) / basePrice) * 100)
    : 0;

  // Get fields for current step
  const getStepFields = (step: StepId): (keyof AddFoodPayload)[] => {
    const stepConfig = STEPS.find(s => s.id === step);
    return stepConfig?.fields as (keyof AddFoodPayload)[] || [];
  };

  // Validate a specific step
  const validateStep = async (step: StepId): Promise<boolean> => {
    const fields = getStepFields(step);
    const result = await trigger(fields as any);
    
    setStepErrors(prev => ({
      ...prev,
      [step]: !result,
    }));
    
    return result;
  };

  // Check if a step has errors
  const hasStepErrors = (step: StepId): boolean => {
    const fields = getStepFields(step);
    return fields.some(field => errors[field]);
  };

  // Navigate to step with validation
  const goToStep = async (step: StepId) => {
    // Don't allow going to next step if current step has validation errors
    if (step !== activeStep) {
      // Check if we're going forward or backward
      const currentIndex = STEPS.findIndex(s => s.id === activeStep);
      const targetIndex = STEPS.findIndex(s => s.id === step);
      
      // If going forward, validate current step
      if (targetIndex > currentIndex) {
        const isValid = await validateStep(activeStep);
        if (!isValid) {
          // Scroll to first error
          const firstErrorField = getStepFields(activeStep).find(field => errors[field]);
          if (firstErrorField) {
            const element = document.querySelector(`[name="${firstErrorField}"]`);
            if (element) {
              element.scrollIntoView({ behavior: "smooth", block: "center" });
              element.focus();
            }
          }
          return;
        }
      }
    }
    
    setActiveStep(step);
  };

  // Validate current step before submission
  const onFormSubmit = async (data: AddFoodPayload) => {
    // Validate all steps
    let allValid = true;
    for (const step of STEPS) {
      const isValid = await validateStep(step.id);
      if (!isValid) {
        allValid = false;
        // Set active step to the first one with errors
        if (step.id === "basic" || step.id === "pricing") {
          setActiveStep(step.id);
          break;
        }
      }
    }
    
    if (!allValid) {
      // Scroll to top to show error
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    
    // All validation passed, submit
    addFood.mutate(data, {
      onSuccess: () => {
        router.push("/owner/foods/foodList");
      },
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setValue("image", file, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setImagePreview(URL.createObjectURL(file));
  };

  const handleImageRemove = () => {
    setImageFile(null);
    setValue("image", undefined, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setImagePreview(null);
  };

  // Scroll to top on error
  useEffect(() => {
    if (addFood.isError) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [addFood.isError]);

  const FoodTypeIcon = FOOD_TYPE_ICONS[foodType] || Utensils;
  const currentStepIndex = STEPS.findIndex(s => s.id === activeStep);
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === STEPS.length - 1;

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6 px-4 md:py-10 md:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-600 hover:text-orange-500 hover:border-orange-200 hover:bg-orange-50 font-medium transition-all shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Menu
          </button>
          
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 bg-white px-3 py-1.5 rounded-full border border-gray-200">
              Step {currentStepIndex + 1} of {STEPS.length}
            </span>
          </div>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-orange-50 to-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/25">
                <Plus className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Add New Menu Item</h1>
                <p className="text-sm text-gray-500">
                  {STEPS[currentStepIndex].label} • Step {currentStepIndex + 1} of {STEPS.length}
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onFormSubmit)} className="p-6 md:p-8 space-y-6">
            {/* Progress Steps */}
            <div className="flex items-center gap-2 mb-6">
              {STEPS.map((step, index) => {
                const isActive = activeStep === step.id;
                const isCompleted = index < currentStepIndex;
                const hasError = hasStepErrors(step.id);
                
                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => goToStep(step.id)}
                    className={`flex-1 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all relative ${
                      isActive
                        ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                        : isCompleted
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : hasError
                        ? "bg-red-50 text-red-700 border border-red-200"
                        : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                      isActive ? "bg-white/20 text-white" : 
                      isCompleted ? "bg-green-500 text-white" :
                      hasError ? "bg-red-500 text-white" :
                      "bg-gray-200 text-gray-600"
                    }`}>
                      {isCompleted ? <CheckCircle2 className="w-3 h-3" /> : index + 1}
                    </span>
                    <span className="hidden sm:inline capitalize">{step.label}</span>
                    {hasError && !isActive && (
                      <AlertCircle className="w-3 h-3 text-red-500 ml-auto" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Error Summary */}
            {Object.keys(errors).length > 0 && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-red-800">
                    Please fix the following errors:
                  </p>
                  <ul className="text-sm text-red-600 mt-1 space-y-0.5 list-disc list-inside">
                    {Object.entries(errors).map(([field, error]) => (
                      <li key={field}>{error.message}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Tab Content */}
            <div className="space-y-6">
              {/* Basic Info Tab */}
              {activeStep === "basic" && (
                <>
                  {/* Image Upload */}
                  <ImageUpload
                    imagePreview={imagePreview}
                    onImageChange={handleImageChange}
                    onImageRemove={handleImageRemove}
                    error={errors.image?.message}
                  />

                  {/* Item Name */}
                  <FormField
                    label="Item Name"
                    error={errors.itemName?.message}
                    required
                    icon={Utensils}
                  >
                    <input
                      type="text"
                      {...register("itemName")}
                      className={`w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white ${
                        errors.itemName ? "border-red-300" : "border-gray-300"
                      }`}
                      placeholder="e.g., Butter Chicken"
                    />
                  </FormField>

                  {/* Description */}
                  <FormField
                    label="Description"
                    error={errors.description?.message}
                    icon={Info}
                  >
                    <textarea
                      {...register("description")}
                      rows={3}
                      className={`w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white resize-none ${
                        errors.description ? "border-red-300" : "border-gray-300"
                      }`}
                      placeholder="Describe your dish - ingredients, taste, special features..."
                    />
                  </FormField>

                  {/* Food Type & Veg/Non-Veg */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      label="Food Type"
                      error={errors.foodType?.message}
                      required
                    >
                      <div className="relative">
                        <FoodTypeIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <select
                          {...register("foodType")}
                          className={`w-full pl-10 pr-10 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white appearance-none ${
                            errors.foodType ? "border-red-300" : "border-gray-300"
                          }`}
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
                          className={`flex-1 rounded-xl text-sm font-medium border transition-all ${
                            isVeg
                              ? "bg-green-50 border-green-500 text-green-700 shadow-sm"
                              : "border-gray-300 text-gray-500 hover:bg-gray-50"
                          }`}
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
                          className={`flex-1 rounded-xl text-sm font-medium border transition-all ${
                            !isVeg
                              ? "bg-red-50 border-red-500 text-red-700 shadow-sm"
                              : "border-gray-300 text-gray-500 hover:bg-gray-50"
                          }`}
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

                  {/* Category & Cuisine */}
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
                        className={`w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white ${
                          errors.category ? "border-red-300" : "border-gray-300"
                        }`}
                        placeholder="e.g., Curries, Pasta"
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
                        className={`w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white ${
                          errors.cuisine ? "border-red-300" : "border-gray-300"
                        }`}
                        placeholder="e.g., North Indian, Italian"
                      />
                    </FormField>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => goToStep("pricing")}
                      className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-colors"
                    >
                      Next: Pricing →
                    </button>
                  </div>
                </>
              )}

              {/* Pricing Tab */}
              {activeStep === "pricing" && (
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
                        className={`w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white ${
                          errors.basePrice ? "border-red-300" : "border-gray-300"
                        }`}
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
                        className={`w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white ${
                          errors.discountPrice ? "border-red-300" : "border-gray-300"
                        }`}
                        placeholder="0.00"
                      />
                    </FormField>
                  </div>

                  {/* Discount Preview */}
                  {discountPercent > 0 && (
                    <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <Percent className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-green-800">Discount Applied</p>
                            <p className="text-xs text-green-600">
                              Customers save ₹{basePrice - discountPrice} on this item
                            </p>
                          </div>
                        </div>
                        <span className="text-2xl font-bold text-green-600">{discountPercent}% OFF</span>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      label="GST (%)"
                      error={errors.gst?.message}
                      required
                    >
                      <input
                        type="number"
                        min={0}
                        max={100}
                        {...register("gst", { valueAsNumber: true })}
                        className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white ${
                          errors.gst ? "border-red-300" : "border-gray-300"
                        }`}
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
                        className={`w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white ${
                          errors.preparationTime ? "border-red-300" : "border-gray-300"
                        }`}
                        placeholder="15"
                      />
                    </FormField>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => goToStep("basic")}
                      className="flex-1 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-600 font-medium rounded-xl transition-colors border border-gray-200"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={() => goToStep("advanced")}
                      className="flex-1 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-colors"
                    >
                      Next: Advanced →
                    </button>
                  </div>
                </>
              )}

              {/* Advanced Tab */}
              {activeStep === "advanced" && (
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

                  {/* Summary Card */}
                  <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-2xl border border-orange-200">
                    <h4 className="text-sm font-semibold text-orange-800 mb-3">Item Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-orange-700">Name</span>
                        <span className="font-medium text-gray-900">{watch("itemName") || "—"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-orange-700">Type</span>
                        <span className="font-medium text-gray-900">{foodType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-orange-700">Category</span>
                        <span className="font-medium text-gray-900">{watch("category") || "—"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-orange-700">Price</span>
                        <span className="font-medium text-gray-900">
                          {basePrice > 0 ? `₹${discountPrice > 0 ? discountPrice : basePrice}` : "—"}
                          {discountPercent > 0 && (
                            <span className="text-xs text-green-600 ml-1">({discountPercent}% off)</span>
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-orange-700">Status</span>
                        <span className={`font-medium ${isAvailable ? "text-green-600" : "text-gray-400"}`}>
                          {isAvailable ? "Available" : "Unavailable"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => goToStep("pricing")}
                      className="flex-1 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-600 font-medium rounded-xl transition-colors border border-gray-200"
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      disabled={addFood.isPending}
                      className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl"
                    >
                      {addFood.isPending ? (
                        <span className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Adding Item...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <Sparkles className="w-4 h-4" />
                          Add Item to Menu
                        </span>
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* API Error */}
            {addFood.isError && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-red-800">Error Adding Item</p>
                  <p className="text-sm text-red-600">
                    {(addFood.error as any)?.response?.data?.message ||
                      "Couldn't add this item. Please try again."}
                  </p>
                </div>
              </div>
            )}

            {/* Success State */}
            {addFood.isSuccess && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-2xl flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-green-800">Item Added Successfully!</p>
                  <p className="text-sm text-green-600">Redirecting to menu...</p>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center text-xs text-gray-400">
          <span className="inline-flex items-center gap-1">
            <Info className="w-3 h-3" />
            All fields marked with <span className="text-red-500">*</span> are required
          </span>
        </div>
      </div>
    </main>
  );
}