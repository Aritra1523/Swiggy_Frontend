"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowLeft, AlertCircle, CheckCircle2, Info, Plus } from "lucide-react";

import { AddFoodPayload } from "@/typescript/restaurantOwner/restaurantOwner";
import { useAddFood } from "@/customHooks/owner/useFoodManagement";
import { addFoodSchema } from "@/schme/owner/AddFood";
import { STEPS, StepId } from "./foodConstants";
import {
  StepsProgress,
  BasicInfoStep,
  PricingStep,
  AdvancedStep,
} from "./AddFoodSteps";

export default function AddFoodPage() {
  const router = useRouter();
  const addFood = useAddFood();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState<StepId>("basic");
  const [stepErrors, setStepErrors] = useState<Record<StepId, boolean>>({
    basic: false,
    pricing: false,
    advanced: false,
  });

  const methods = useForm<AddFoodPayload>({
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

  const {
    setValue,
    trigger,
    formState: { errors },
  } = methods;

  const getStepFields = (step: StepId): (keyof AddFoodPayload)[] => {
    const stepConfig = STEPS.find((s) => s.id === step);
    return (stepConfig?.fields as (keyof AddFoodPayload)[]) || [];
  };

  const validateStep = async (step: StepId): Promise<boolean> => {
    const fields = getStepFields(step);
    const result = await trigger(fields as any);
    setStepErrors((prev) => ({ ...prev, [step]: !result }));
    return result;
  };

  const hasStepErrors = (step: StepId): boolean => {
    const fields = getStepFields(step);
    return fields.some((field) => errors[field]);
  };

  const goToStep = async (step: StepId) => {
    if (step !== activeStep) {
      const currentIndex = STEPS.findIndex((s) => s.id === activeStep);
      const targetIndex = STEPS.findIndex((s) => s.id === step);
      if (targetIndex > currentIndex) {
        const isValid = await validateStep(activeStep);
        if (!isValid) {
          const firstErrorField = getStepFields(activeStep).find(
            (field) => errors[field],
          );
          if (firstErrorField) {
            const element = document.querySelector(
              `[name="${firstErrorField}"]`,
            );
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

  const onFormSubmit = async (data: AddFoodPayload) => {
    let allValid = true;
    for (const step of STEPS) {
      const isValid = await validateStep(step.id);
      if (!isValid) {
        allValid = false;
        if (step.id === "basic" || step.id === "pricing")
          setActiveStep(step.id);
        break;
      }
    }
    if (!allValid) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    addFood.mutate(data, {
      onSuccess: () => router.push("/owner/foods/foodList"),
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setValue("image", file, { shouldValidate: true, shouldDirty: true });
    setImagePreview(URL.createObjectURL(file));
  };

  const handleImageRemove = () => {
    setValue("image", undefined, { shouldValidate: true, shouldDirty: true });
    setImagePreview(null);
  };

  useEffect(() => {
    if (addFood.isError) window.scrollTo({ top: 0, behavior: "smooth" });
  }, [addFood.isError]);

  const currentStepIndex = STEPS.findIndex((s) => s.id === activeStep);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6 px-4 md:py-10 md:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-600 hover:text-orange-500 hover:border-orange-200 hover:bg-orange-50 font-medium transition-all shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Menu
          </button>
          <span className="text-xs text-gray-400 bg-white px-3 py-1.5 rounded-full border border-gray-200">
            Step {currentStepIndex + 1} of {STEPS.length}
          </span>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-orange-50 to-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/25">
                <Plus className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Add New Menu Item
                </h1>
                <p className="text-sm text-gray-500">
                  {STEPS[currentStepIndex].label} • Step {currentStepIndex + 1}{" "}
                  of {STEPS.length}
                </p>
              </div>
            </div>
          </div>

          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onFormSubmit)}
              className="p-6 md:p-8 space-y-6"
            >
              <StepsProgress
                activeStep={activeStep}
                currentStepIndex={currentStepIndex}
                onStepClick={goToStep}
                hasStepErrors={hasStepErrors}
              />

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

              <div className="space-y-6">
                {activeStep === "basic" && (
                  <BasicInfoStep
                    imagePreview={imagePreview}
                    onImageChange={handleImageChange}
                    onImageRemove={handleImageRemove}
                    onNext={() => goToStep("pricing")}
                  />
                )}
                {activeStep === "pricing" && (
                  <PricingStep
                    onBack={() => goToStep("basic")}
                    onNext={() => goToStep("advanced")}
                  />
                )}
                {activeStep === "advanced" && (
                  <AdvancedStep
                    onBack={() => goToStep("pricing")}
                    isPending={addFood.isPending}
                  />
                )}
              </div>

              {addFood.isError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-red-800">
                      Error Adding Item
                    </p>
                    <p className="text-sm text-red-600">
                      {(addFood.error as any)?.response?.data?.message ||
                        "Couldn't add this item. Please try again."}
                    </p>
                  </div>
                </div>
              )}

              {addFood.isSuccess && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-2xl flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-green-800">
                      Item Added Successfully!
                    </p>
                    <p className="text-sm text-green-600">
                      Redirecting to menu...
                    </p>
                  </div>
                </div>
              )}
            </form>
          </FormProvider>
        </div>

        <div className="mt-6 text-center text-xs text-gray-400">
          <span className="inline-flex items-center gap-1">
            <Info className="w-3 h-3" /> All fields marked with{" "}
            <span className="text-red-500">*</span> are required
          </span>
        </div>
      </div>
    </main>
  );
}
