// "use client";

// import useCart from "@/customHooks/order/useCart";
// import { Food } from "@/typescript/foodListType/type";
// import { useState } from "react";
// import Swal from "sweetalert2";

// interface Props {
//   food: Food;
// }

// export default function FoodCard({ food }: Props) {
//   const [isHovered, setIsHovered] = useState(false);
//   // const [isAdded, setIsAdded] = useState(false);

//   const { handleAddToCart, cart } = useCart();

//   const cartItem = cart?.items?.find(
//     (item) => item.food?._id === food._id || item.food === food._id,
//   );

//   const quantity = cartItem?.quantity || 0;

//   const handleQuickAdd = async () => {
//     try {
//       await handleAddToCart({
//         foodId: food._id,
//         quantity: 1,
//       });
//     } catch (error) {
//       console.error("Failed to add cart item", error);
//     }
//   };

//   return (
//     <div
//       className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {/* ================= IMAGE ================= */}
//       <div className="relative h-48 bg-gray-100 overflow-hidden">
//         {food.image ? (
//           <img
//             src={food.image}
//             alt={food.itemName}
//             className="w-full h-full object-cover transition-transform duration-300"
//             style={{
//               transform: isHovered ? "scale(1.05)" : "scale(1)",
//             }}
//           />
//         ) : (
//           <div className="w-full h-full flex items-center justify-center bg-gray-200">
//             <span className="text-gray-400 text-sm">No Image</span>
//           </div>
//         )}

//         {/* Discount */}
//         {food.discountPercentage > 0 && (
//           <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
//             {food.discountPercentage}% OFF
//           </div>
//         )}

//         {/* Veg / Non-Veg */}
//         <div className="absolute top-3 right-3">
//           <span
//             className={`px-2 py-1 rounded-full text-xs font-bold shadow-md ${
//               food.isVeg ? "bg-green-500 text-white" : "bg-red-500 text-white"
//             }`}
//           >
//             {food.isVeg ? "VEG" : "NON-VEG"}
//           </span>
//         </div>

//         {/* ================= QUICK ADD ================= */}
//         {isHovered && food.isAvailable && (
//           <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
//             <button
//               disabled={!food.isAvailable}
//               onClick={handleQuickAdd}
//               className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
//                 food.isAvailable
//                   ? "bg-orange-500 hover:bg-orange-600 text-white"
//                   : "bg-gray-300 text-gray-500 cursor-not-allowed"
//               }`}
//             >
//               {food.isAvailable
//                 ? quantity > 0
//                   ? `ADD (${quantity})`
//                   : "ADD"
//                 : "Unavailable"}
//             </button>
//           </div>
//         )}
//       </div>

//       {/* ================= CONTENT ================= */}
//       <div className="p-4">
//         {/* Food Name */}
//         <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
//           {food.itemName}
//         </h3>

//         {/* Restaurant */}
//         <p className="text-sm text-gray-600 mt-1 line-clamp-1">
//           {food.restaurant?.restaurantName || "Unknown Restaurant"}
//         </p>

//         {/* Location */}
//         <p className="text-xs text-gray-400 mt-1 line-clamp-1">
//           {food.restaurant?.location || "Location not available"}
//         </p>

//         {/* Description */}
//         <p className="text-sm text-gray-500 mt-2 line-clamp-2">
//           {food.description || "No description available"}
//         </p>

//         {/* ================= RATING ================= */}
//         <div className="flex items-center gap-2 mt-3">
//           <div className="flex items-center bg-green-50 px-2 py-1 rounded">
//             <span className="text-sm font-bold text-green-700">
//               ★ {food.rating !== undefined ? food.rating.toFixed(1) : "N/A"}
//             </span>
//           </div>

//           <span className="text-xs text-gray-500">
//             ({food.totalRatings || 0} ratings)
//           </span>
//         </div>

//         {/* ================= PRICE ================= */}
//         <div className="flex items-center gap-2 mt-3">
//           <span className="font-bold text-lg text-gray-900">
//             ₹{food.discountPrice || food.basePrice}
//           </span>

//           {food.discountPrice && food.basePrice > food.discountPrice && (
//             <span className="text-sm text-gray-400 line-through">
//               ₹{food.basePrice}
//             </span>
//           )}
//         </div>

//         {/* ================= BOTTOM ================= */}
//         <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
//           <span className="text-xs text-gray-500">
//             ⏱ {food.preparationTime || 20} mins
//           </span>

//           <button
//             disabled={!food.isAvailable}
//             onClick={handleQuickAdd}
//             className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
//               food.isAvailable
//                 ? "bg-orange-500 hover:bg-orange-600 text-white"
//                 : "bg-gray-300 text-gray-500 cursor-not-allowed"
//             }`}
//           >
//             {food.isAvailable
//               ? quantity > 0
//                 ? `ADD (${quantity})`
//                 : "ADD"
//               : "Unavailable"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import useCart from "@/customHooks/order/useCart";
import { Food } from "@/typescript/foodListType/type";
import { useState } from "react";
import Swal from "sweetalert2";

interface Props {
  food: Food;
}

export default function FoodCard({ food }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  // const [isAdded, setIsAdded] = useState(false);

  const { handleAddToCart, cart } = useCart();

  const isRestaurantClosed = food.restaurant?.isOpen === false;
  const canOrder = food.isAvailable && !isRestaurantClosed;

  const cartItem = cart?.items?.find(
    (item) => item.food?._id === food._id || item.food === food._id,
  );

  const quantity = cartItem?.quantity || 0;

  const handleQuickAdd = async () => {
    if (!canOrder) return;
    try {
      await handleAddToCart({
        foodId: food._id,
        quantity: 1,
      });
    } catch (error) {
      console.error("Failed to add cart item", error);
    }
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 ${
        isRestaurantClosed ? "opacity-60" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ================= IMAGE ================= */}
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        {food.image ? (
          <img
            src={food.image}
            alt={food.itemName}
            className={`w-full h-full object-cover transition-transform duration-300 ${
              isRestaurantClosed ? "grayscale" : ""
            }`}
            style={{
              transform: isHovered && !isRestaurantClosed ? "scale(1.05)" : "scale(1)",
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-400 text-sm">No Image</span>
          </div>
        )}

        {/* Restaurant closed overlay — takes priority over everything else */}
        {isRestaurantClosed && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-white/95 text-gray-800 px-4 py-1.5 rounded-full text-sm font-bold">
              Restaurant Closed
            </span>
          </div>
        )}

        {/* Discount */}
        {!isRestaurantClosed && food.discountPercentage > 0 && (
          <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
            {food.discountPercentage}% OFF
          </div>
        )}

        {/* Veg / Non-Veg */}
        <div className="absolute top-3 right-3">
          <span
            className={`px-2 py-1 rounded-full text-xs font-bold shadow-md ${
              food.isVeg ? "bg-green-500 text-white" : "bg-red-500 text-white"
            }`}
          >
            {food.isVeg ? "VEG" : "NON-VEG"}
          </span>
        </div>

        {/* ================= QUICK ADD ================= */}
        {isHovered && canOrder && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <button
              onClick={handleQuickAdd}
              className="px-4 py-2 rounded-lg font-semibold transition-colors bg-orange-500 hover:bg-orange-600 text-white"
            >
              {quantity > 0 ? `ADD (${quantity})` : "ADD"}
            </button>
          </div>
        )}
      </div>

      {/* ================= CONTENT ================= */}
      <div className="p-4">
        {/* Food Name */}
        <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
          {food.itemName}
        </h3>

        {/* Restaurant */}
        <p className="text-sm text-gray-600 mt-1 line-clamp-1">
          {food.restaurant?.restaurantName || "Unknown Restaurant"}
        </p>

        {/* Location */}
        <p className="text-xs text-gray-400 mt-1 line-clamp-1">
          {food.restaurant?.location || "Location not available"}
        </p>

        {/* Description */}
        <p className="text-sm text-gray-500 mt-2 line-clamp-2">
          {food.description || "No description available"}
        </p>

        {/* ================= RATING ================= */}
        <div className="flex items-center gap-2 mt-3">
          <div className="flex items-center bg-green-50 px-2 py-1 rounded">
            <span className="text-sm font-bold text-green-700">
              ★ {food.rating !== undefined ? food.rating.toFixed(1) : "N/A"}
            </span>
          </div>

          <span className="text-xs text-gray-500">
            ({food.totalRatings || 0} ratings)
          </span>
        </div>

        {/* ================= PRICE ================= */}
        <div className="flex items-center gap-2 mt-3">
          <span className="font-bold text-lg text-gray-900">
            ₹{food.discountPrice || food.basePrice}
          </span>

          {food.discountPrice && food.basePrice > food.discountPrice && (
            <span className="text-sm text-gray-400 line-through">
              ₹{food.basePrice}
            </span>
          )}
        </div>

        {/* ================= BOTTOM ================= */}
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
          <span className="text-xs text-gray-500">
            {isRestaurantClosed ? (
              <span className="text-red-500 font-medium">Closed now</span>
            ) : (
              <>⏱ {food.preparationTime || 20} mins</>
            )}
          </span>

          <button
            disabled={!canOrder}
            onClick={handleQuickAdd}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              canOrder
                ? "bg-orange-500 hover:bg-orange-600 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isRestaurantClosed
              ? "Closed"
              : food.isAvailable
                ? quantity > 0
                  ? `ADD (${quantity})`
                  : "ADD"
                : "Unavailable"}
          </button>
        </div>
      </div>
    </div>
  );
}