// components/RestaurantGroup.tsx
import Image from "next/image";
import { Store, Clock, MapPin } from "lucide-react";
import { GroupedRestaurant } from "@/typescript/cartTypes/cartTypes";
import { CartItem } from "./CartItem";

interface RestaurantGroupProps {
  group: GroupedRestaurant;
  updatingItemId: string | null;
  onIncrement: (foodId: string) => void;
  onDecrement: (foodId: string) => void;
}

export const RestaurantGroup = ({
  group,
  updatingItemId,
  onIncrement,
  onDecrement,
}: RestaurantGroupProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Restaurant Header */}
      <div className="p-4 border-b border-gray-100 bg-gray-50/50">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-200">
            {group.restaurant?.logo ? (
              <Image
                src={group.restaurant.logo}
                alt={group.restaurant.restaurantName}
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            ) : (
              <Store className="w-6 h-6 text-gray-400 m-3" />
            )}
          </div>
          <div>
            <h3 className="font-bold text-gray-900">
              {group.restaurant?.restaurantName}
            </h3>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {group.restaurant?.deliveryTime || "30-40"} min
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {group.restaurant?.location || "Nearby"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="divide-y divide-gray-50">
        {group.items.map((item) => (
          <CartItem
            key={item.food?._id}
            item={item}
            isUpdating={updatingItemId === item.food?._id}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
          />
        ))}
      </div>
    </div>
  );
};