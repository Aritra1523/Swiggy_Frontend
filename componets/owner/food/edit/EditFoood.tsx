"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  useFoodDetails,
  useEditFood,
} from "@/customHooks/owner/useFoodManagement";
import { EditFoodPayload, OwnerFoodDetails } from "@/typescript/restaurantOwner/restaurantOwner";
import { ArrowLeft, ImagePlus } from "lucide-react";

const FOOD_TYPES: OwnerFoodDetails["foodType"][] = [
  "Starter",
  "Main Course",
  "Dessert",
  "Beverage",
  "Snack",
];

export default function EditFoodPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: food, isLoading, isError, error } = useFoodDetails(id);
  const editFood = useEditFood();

  const [form, setForm] = useState<EditFoodPayload>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  // Pre-fill the form once the real food data arrives — only once, so
  // a background refetch doesn't stomp on edits the owner is mid-typing
  useEffect(() => {
    if (food && !initialized) {
      setForm({
        itemName: food.itemName,
        description: food.description,
        foodType: food.foodType,
        category: food.category,
        cuisine: food.cuisine,
        basePrice: food.basePrice,
        discountPrice: food.discountPrice,
        gst: food.gst,
        preparationTime: food.preparationTime,
        isAvailable: food.isAvailable,
        isRecommended: food.isRecommended,
        isVeg: food.isVeg,
      });
      setImagePreview(food.image || null);
      setInitialized(true);
    }
  }, [food, initialized]);

  const update = <K extends keyof EditFoodPayload>(
    key: K,
    value: EditFoodPayload[K],
  ) => setForm((f) => ({ ...f, [key]: value }));

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    update("image", file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    editFood.mutate(
      { id, payload: form },
      { onSuccess: () => router.push("/owner/foods/foodList") },
    );
  };

  if (isLoading || !initialized) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
      </main>
    );
  }

  if (isError || !food) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <p className="text-red-500 font-medium">
            {(error as any)?.response?.data?.message || "Couldn't load this item"}
          </p>
          <button
            onClick={() => router.push("/owner/foods/foodList")}
            className="mt-4 text-orange-600 font-semibold hover:underline"
          >
            Back to menu
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 md:px-8">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-orange-500 font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to menu
        </button>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
          <h1 className="text-xl font-bold text-gray-900 mb-6">
            Edit &ldquo;{food.itemName}&rdquo;
          </h1>

          {food.approvalStatus === "approved" && (
            <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
              This item is already approved. Saving changes will not require
              re-approval unless your backend is configured to reset
              approval status on edit — worth confirming.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Photo
              </label>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-28 h-28 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden hover:border-orange-400 transition-colors"
              >
                {imagePreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImagePlus className="w-6 h-6 text-gray-400" />
                )}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <p className="text-xs text-gray-400 mt-1.5">
                Leave as-is to keep the current photo
              </p>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Item name
              </label>
              <input
                type="text"
                required
                value={form.itemName ?? ""}
                onChange={(e) => update("itemName", e.target.value)}
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={form.description ?? ""}
                onChange={(e) => update("description", e.target.value)}
                rows={3}
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Type + Veg */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Food type
                </label>
                <select
                  value={form.foodType}
                  onChange={(e) =>
                    update("foodType", e.target.value as OwnerFoodDetails["foodType"])
                  }
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {FOOD_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Veg / Non-veg
                </label>
                <div className="flex gap-2 h-[42px] items-center">
                  <button
                    type="button"
                    onClick={() => update("isVeg", true)}
                    className={`flex-1 h-full rounded-xl text-sm font-medium border transition-colors ${
                      form.isVeg
                        ? "bg-green-50 border-green-500 text-green-700"
                        : "border-gray-300 text-gray-500"
                    }`}
                  >
                    Veg
                  </button>
                  <button
                    type="button"
                    onClick={() => update("isVeg", false)}
                    className={`flex-1 h-full rounded-xl text-sm font-medium border transition-colors ${
                      !form.isVeg
                        ? "bg-red-50 border-red-500 text-red-700"
                        : "border-gray-300 text-gray-500"
                    }`}
                  >
                    Non-veg
                  </button>
                </div>
              </div>
            </div>

            {/* Category + Cuisine */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  required
                  value={form.category ?? ""}
                  onChange={(e) => update("category", e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cuisine
                </label>
                <input
                  type="text"
                  value={form.cuisine ?? ""}
                  onChange={(e) => update("cuisine", e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Prices */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Base price (₹)
                </label>
                <input
                  type="number"
                  required
                  min={0}
                  value={form.basePrice ?? 0}
                  onChange={(e) => update("basePrice", Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Discount price (₹)
                </label>
                <input
                  type="number"
                  min={0}
                  value={form.discountPrice ?? 0}
                  onChange={(e) => update("discountPrice", Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Leave 0 for no discount
                </p>
              </div>
            </div>

            {/* GST + prep time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  GST (%)
                </label>
                <input
                  type="number"
                  min={0}
                  value={form.gst ?? 0}
                  onChange={(e) => update("gst", Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prep time (min)
                </label>
                <input
                  type="number"
                  min={0}
                  value={form.preparationTime ?? 0}
                  onChange={(e) => update("preparationTime", Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Toggles */}
            <div className="flex flex-col gap-3 pt-2">
              <label className="flex items-center gap-2.5 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={form.isAvailable ?? false}
                  onChange={(e) => update("isAvailable", e.target.checked)}
                  className="w-4 h-4 accent-orange-500"
                />
                Available for order
              </label>
              <label className="flex items-center gap-2.5 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={form.isRecommended ?? false}
                  onChange={(e) => update("isRecommended", e.target.checked)}
                  className="w-4 h-4 accent-orange-500"
                />
                Mark as recommended
              </label>
            </div>

            {editFood.isError && (
              <p className="text-sm text-red-600">
                {(editFood.error as any)?.response?.data?.message ||
                  "Couldn't save changes. Try again."}
              </p>
            )}

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={editFood.isPending}
                className="flex-1 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors disabled:opacity-50"
              >
                {editFood.isPending ? "Saving..." : "Save changes"}
              </button>
              <button
                type="button"
                onClick={() => router.push("/owner/foods/foodList")}
                className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}