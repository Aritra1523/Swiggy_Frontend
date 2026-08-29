// components/CartItem.tsx
import { motion } from "framer-motion";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem as CartItemType } from "@/typescript/cartTypes/cartTypes";
import { getDiscountPercentage, getItemPrice } from "./cartUtils";


interface CartItemProps {
  item: CartItemType;
  isUpdating: boolean;
  onIncrement: (foodId: string) => void;
  onDecrement: (foodId: string) => void;
}

export const CartItem = ({ 
  item, 
  isUpdating, 
  onIncrement, 
  onDecrement 
}: CartItemProps) => {
  const food = item.food;
  const price = getItemPrice(food);
  const discount = getDiscountPercentage(food);
  const hasDiscount = discount !== null;

  return (
    <motion.div
      key={food?._id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className={`p-4 hover:bg-gray-50/50 transition-colors ${
        isUpdating ? "opacity-60" : "opacity-100"
      }`}
    >
      <div className="flex gap-4">
        {/* Image */}
        <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-gray-100 shrink-0">
          {food?.image ? (
            <Image
              src={food.image}
              alt={food.itemName}
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
              🍽️ No image
            </div>
          )}
          {hasDiscount && (
            <div className="absolute top-1 left-1 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
              {discount}% OFF
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 truncate">
            {food?.itemName}
          </h4>
          {food?.description && (
            <p className="text-sm text-gray-500 truncate mt-0.5">
              {food.description}
            </p>
          )}
          <div className="flex items-center gap-2 mt-2">
            <span className="text-lg font-bold text-orange-500">
              ₹{price}
            </span>
            {hasDiscount && (
              <span className="text-sm text-gray-400 line-through">
                ₹{food.basePrice}
              </span>
            )}
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center gap-3 mt-3">
            <button
              onClick={() => onDecrement(food._id)}
              disabled={isUpdating}
              className="w-8 h-8 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-orange-500 hover:bg-orange-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4 text-gray-600" />
            </button>
            <span className="font-semibold w-6 text-center text-black">
              {isUpdating ? "..." : item.quantity}
            </span>
            <button
              onClick={() => onIncrement(food._id)}
              disabled={isUpdating}
              className="w-8 h-8 rounded-full border-2 border-orange-500 flex items-center justify-center hover:bg-orange-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4 text-orange-500" />
            </button>
            <button
              onClick={() => onDecrement(food._id)}
              disabled={isUpdating}
              className="ml-2 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Remove item"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};