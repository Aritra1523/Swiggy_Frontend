// "use client";
 
// import useCart from "@/customHooks/order/useCart";
// import { Food } from "@/typescript/foodListType/type";
// import { baseURL } from "@/api/baseUrl/Api";
// import { useState } from "react";
// import Swal from "sweetalert2";
// import { 
//   Clock, 
//   Star, 
//   MapPin, 
//   Plus, 
//   Minus,
//   ShoppingBag,
//   CheckCircle,
//   XCircle,
//   Timer,
//   Zap,
//   Utensils
// } from "lucide-react";

// interface Props {
//   food: Food;
//   variant?: "grid" | "list";
// }

// // Backend stores/returns relative paths like "/uploads/xyz.png"
// function resolveImageUrl(path: string): string {
//   if (!path) return "";
//   if (path.startsWith("http://") || path.startsWith("https://")) return path;
//   return `${baseURL}${path.startsWith("/") ? "" : "/"}${path}`;
// }
 
// export default function FoodCard({ food, variant = "grid" }: Props) {
//   const [isHovered, setIsHovered] = useState(false);
 
//   const { handleAddToCart, cart } = useCart();
 
//   const isRestaurantClosed = food.restaurant?.isOpen === false;
//   const canOrder = food.isAvailable && !isRestaurantClosed;
//   const imageUrl = resolveImageUrl(food.image);
 
//   const cartItem = cart?.items?.find(
//     (item) => item.food?._id === food._id || item.food === food._id,
//   );
 
//   const currentQuantity = cartItem?.quantity || 0;

//   // Show success toast when item is added
//   const showAddToCartToast = () => {
//     const Toast = Swal.mixin({
//       toast: true,
//       position: "top-end",
//       showConfirmButton: false,
//       timer: 2500,
//       timerProgressBar: true,
//       didOpen: (toast) => {
//         toast.addEventListener("mouseenter", Swal.stopTimer);
//         toast.addEventListener("mouseleave", Swal.resumeTimer);
//       },
//     });

//     Toast.fire({
//       icon: "success",
//       title: "Added to Cart!",
//       html: `
//         <div style="text-align: center; padding: 2px 0;">
//           <p style="font-size: 14px; font-weight: 600; margin: 0; color: #1f2937;">
//             ${food.itemName}
//           </p>
//           <p style="font-size: 12px; margin: 2px 0 0 0; color: #6b7280;">
//             ₹${food.discountPrice || food.basePrice} • Added to your cart
//           </p>
//         </div>
//       `,
//       background: "#ffffff",
//       iconColor: "#22c55e",
//       width: 320,
//       padding: "12px",
//     });
//   };

//   // Show error toast when item cannot be added
//   const showErrorToast = (message: string) => {
//     const Toast = Swal.mixin({
//       toast: true,
//       position: "top-end",
//       showConfirmButton: false,
//       timer: 3000,
//       timerProgressBar: true,
//     });

//     Toast.fire({
//       icon: "error",
//       title: message,
//       background: "#ffffff",
//       iconColor: "#ef4444",
//       width: 320,
//       padding: "12px",
//     });
//   };

//   const handleAddToCartClick = async () => {
//     if (!canOrder) {
//       if (isRestaurantClosed) {
//         showErrorToast("Restaurant is currently closed");
//       } else if (!food.isAvailable) {
//         showErrorToast("This item is currently unavailable");
//       }
//       return;
//     }

//     try {
//       await handleAddToCart({
//         foodId: food._id,
//         quantity: 1,
//       });
//       showAddToCartToast();
//     } catch (error) {
//       console.error("Failed to add cart item", error);
//       showErrorToast("Failed to add item to cart");
//     }
//   };

//   // List variant rendering
//   if (variant === "list") {
//     return (
//       <div
//         className={`bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col sm:flex-row ${
//           isRestaurantClosed ? "opacity-70" : ""
//         }`}
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//       >
//         {/* Image */}
//         <div className="relative w-full sm:w-48 h-48 sm:h-auto flex-shrink-0 bg-gray-100 overflow-hidden">
//           {food.image ? (
//             <img
//               src={imageUrl}
//               alt={food.itemName}
//               className={`w-full h-full object-cover transition-transform duration-300 ${
//                 isRestaurantClosed ? "grayscale" : ""
//               }`}
//               style={{
//                 transform: isHovered && !isRestaurantClosed ? "scale(1.05)" : "scale(1)",
//               }}
//             />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center bg-gray-200">
//               <Utensils className="w-12 h-12 text-gray-400" />
//             </div>
//           )}

//           {/* Status Badges */}
//           {isRestaurantClosed && (
//             <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
//               <span className="bg-white/95 text-gray-800 px-4 py-2 rounded-full text-sm font-bold shadow-lg">
//                 <Clock className="w-4 h-4 inline mr-2" />
//                 Restaurant Closed
//               </span>
//             </div>
//           )}

//           {!isRestaurantClosed && food.discountPercentage > 0 && (
//             <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
//               <Zap className="w-3 h-3" />
//               {food.discountPercentage}% OFF
//             </div>
//           )}

//           <div className="absolute top-3 right-3">
//             <span
//               className={`px-2.5 py-1 rounded-full text-xs font-bold shadow-lg ${
//                 food.isVeg ? "bg-green-500 text-white" : "bg-red-500 text-white"
//               }`}
//             >
//               {food.isVeg ? "VEG" : "NON-VEG"}
//             </span>
//           </div>
//         </div>

//         {/* Content */}
//         <div className="flex-1 p-4 flex flex-col justify-between">
//           <div>
//             <div className="flex items-start justify-between">
//               <div className="flex-1">
//                 <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
//                   {food.itemName}
//                 </h3>
//                 <p className="text-sm text-gray-600 mt-0.5 line-clamp-1">
//                   {food.restaurant?.restaurantName || "Unknown Restaurant"}
//                 </p>
//                 <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
//                   <MapPin className="w-3 h-3" />
//                   <span>{food.restaurant?.location || "Location not available"}</span>
//                 </div>
//               </div>
              
//               {/* Rating */}
//               <div className="flex items-center gap-1.5 bg-green-50 px-2.5 py-1 rounded-lg border border-green-100 flex-shrink-0 ml-2">
//                 <Star className="w-3.5 h-3.5 fill-green-600 text-green-600" />
//                 <span className="text-sm font-bold text-green-700">
//                   {food.rating !== undefined ? food.rating.toFixed(1) : "N/A"}
//                 </span>
//                 <span className="text-xs text-gray-500">
//                   ({food.totalRatings || 0})
//                 </span>
//               </div>
//             </div>

//             <p className="text-sm text-gray-500 mt-2 line-clamp-2">
//               {food.description || "No description available"}
//             </p>
//           </div>

//           {/* Bottom */}
//           <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
//             <div>
//               <div className="flex items-center gap-2">
//                 <span className="font-bold text-xl text-gray-900">
//                   ₹{food.discountPrice || food.basePrice}
//                 </span>
//                 {food.discountPrice && food.basePrice > food.discountPrice && (
//                   <span className="text-sm text-gray-400 line-through">
//                     ₹{food.basePrice}
//                   </span>
//                 )}
//               </div>
//               <div className="flex items-center gap-2 mt-1">
//                 <Timer className="w-3.5 h-3.5 text-orange-500" />
//                 <span className="text-xs text-gray-500">
//                   {food.preparationTime || 20} mins
//                 </span>
//                 {!isRestaurantClosed && food.isAvailable && (
//                   <span className="text-xs text-green-600 flex items-center gap-1">
//                     <CheckCircle className="w-3 h-3" />
//                     Available
//                   </span>
//                 )}
//               </div>
//             </div>

//             {/* Add Button */}
//             <button
//               disabled={!canOrder}
//               onClick={handleAddToCartClick}
//               className={`px-5 py-2 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
//                 canOrder
//                   ? "bg-gradient-to-r from-orange-500 to-orange-600 hover:shadow-lg hover:shadow-orange-500/30 text-white hover:scale-105"
//                   : "bg-gray-200 text-gray-500 cursor-not-allowed"
//               }`}
//             >
//               <ShoppingBag className="w-4 h-4" />
//               {isRestaurantClosed
//                 ? "Closed"
//                 : food.isAvailable
//                   ? currentQuantity > 0
//                     ? `Add (${currentQuantity})`
//                     : "Add to Cart"
//                   : "Unavailable"}
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Grid variant
//   return (
//     <div
//       className={`bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group ${
//         isRestaurantClosed ? "opacity-70" : ""
//       }`}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {/* ================= IMAGE ================= */}
//       <div className="relative h-52 bg-gray-100 overflow-hidden">
//         {food.image ? (
//           <img
//             src={imageUrl}
//             alt={food.itemName}
//             className={`w-full h-full object-cover transition-transform duration-500 ${
//               isRestaurantClosed ? "grayscale" : ""
//             }`}
//             style={{
//               transform: isHovered && !isRestaurantClosed ? "scale(1.08)" : "scale(1)",
//             }}
//           />
//         ) : (
//           <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
//             <Utensils className="w-16 h-16 text-gray-300" />
//           </div>
//         )}

//         {/* Restaurant closed overlay */}
//         {isRestaurantClosed && (
//           <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
//             <div className="bg-white/95 rounded-2xl px-6 py-4 text-center shadow-2xl">
//               <Clock className="w-8 h-8 text-red-500 mx-auto mb-2" />
//               <span className="text-gray-800 font-bold text-base block">
//                 Restaurant Closed
//               </span>
//               <span className="text-xs text-gray-500">Currently unavailable</span>
//             </div>
//           </div>
//         )}

//         {/* Discount Badge */}
//         {!isRestaurantClosed && food.discountPercentage > 0 && (
//           <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1 animate-pulse">
//             <Zap className="w-3 h-3" />
//             {food.discountPercentage}% OFF
//           </div>
//         )}

//         {/* Veg / Non-Veg */}
//         <div className="absolute top-3 right-3">
//           <span
//             className={`px-2.5 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1 ${
//               food.isVeg 
//                 ? "bg-green-500 text-white" 
//                 : "bg-red-500 text-white"
//             }`}
//           >
//             {food.isVeg ? "🌿 VEG" : "🍖 NON-VEG"}
//           </span>
//         </div>

//         {/* Quick Add on Hover */}
//         {isHovered && canOrder && (
//           <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end justify-center p-4">
//             <button
//               onClick={handleAddToCartClick}
//               className="w-full py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 flex items-center justify-center gap-2"
//             >
//               <Plus className="w-4 h-4" />
//               {currentQuantity > 0 ? `Add More (${currentQuantity})` : "Add to Cart"} • ₹{food.discountPrice || food.basePrice}
//             </button>
//           </div>
//         )}
//       </div>

//       {/* ================= CONTENT ================= */}
//       <div className="p-4">
//         {/* Food Name & Rating */}
//         <div className="flex items-start justify-between gap-2">
//           <h3 className="text-base font-bold text-gray-900 line-clamp-1 flex-1">
//             {food.itemName}
//           </h3>
//           <div className="flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded-lg border border-green-100 flex-shrink-0">
//             <Star className="w-3.5 h-3.5 fill-green-600 text-green-600" />
//             <span className="text-xs font-bold text-green-700">
//               {food.rating !== undefined ? food.rating.toFixed(1) : "N/A"}
//             </span>
//           </div>
//         </div>

//         {/* Restaurant */}
//         <p className="text-sm text-gray-600 mt-0.5 line-clamp-1 font-medium">
//           {food.restaurant?.restaurantName || "Unknown Restaurant"}
//         </p>

//         {/* Location */}
//         <p className="text-xs text-gray-400 mt-0.5 line-clamp-1 flex items-center gap-1">
//           <MapPin className="w-3 h-3" />
//           {food.restaurant?.location || "Location not available"}
//         </p>

//         {/* Description */}
//         <p className="text-sm text-gray-500 mt-2 line-clamp-2">
//           {food.description || "No description available"}
//         </p>

//         {/* ================= PRICE & BOTTOM ================= */}
//         <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
//           <div>
//             <div className="flex items-center gap-2">
//               <span className="font-bold text-lg text-gray-900">
//                 ₹{food.discountPrice || food.basePrice}
//               </span>
//               {food.discountPrice && food.basePrice > food.discountPrice && (
//                 <span className="text-xs text-gray-400 line-through">
//                   ₹{food.basePrice}
//                 </span>
//               )}
//             </div>
//             <div className="flex items-center gap-1.5 mt-0.5">
//               <Timer className="w-3 h-3 text-orange-500" />
//               <span className="text-xs text-gray-500">
//                 {food.preparationTime || 20} mins
//               </span>
//             </div>
//           </div>

//           <div className="text-right">
//             {isRestaurantClosed ? (
//               <span className="text-xs font-semibold text-red-500 flex items-center gap-1">
//                 <XCircle className="w-3.5 h-3.5" />
//                 Closed
//               </span>
//             ) : food.isAvailable ? (
//               <span className="text-xs font-semibold text-green-500 flex items-center gap-1">
//                 <CheckCircle className="w-3.5 h-3.5" />
//                 Available
//               </span>
//             ) : (
//               <span className="text-xs font-semibold text-red-500 flex items-center gap-1">
//                 <XCircle className="w-3.5 h-3.5" />
//                 Unavailable
//               </span>
//             )}
//           </div>
//         </div>

//         {/* Add Button */}
//         <button
//           disabled={!canOrder}
//           onClick={handleAddToCartClick}
//           className={`w-full mt-3 py-2.5 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
//             canOrder
//               ? "bg-gradient-to-r from-orange-500 to-orange-600 hover:shadow-lg hover:shadow-orange-500/30 text-white hover:scale-[1.02]"
//               : "bg-gray-200 text-gray-500 cursor-not-allowed"
//           }`}
//         >
//           <ShoppingBag className="w-4 h-4" />
//           {isRestaurantClosed
//             ? "Restaurant Closed"
//             : food.isAvailable
//               ? currentQuantity > 0
//                 ? `Add More (${currentQuantity} in cart)`
//                 : "Add to Cart"
//               : "Unavailable"}
//         </button>
//       </div>
//     </div>
//   );
// }
"use client";
 
import useCart from "@/customHooks/order/useCart";
import { Food } from "@/typescript/foodListType/type";
import { baseURL } from "@/api/baseUrl/Api";
import { useState } from "react";
import Swal from "sweetalert2";
import { 
  Clock, 
  Star, 
  MapPin, 
  Plus, 
  Minus,
  ShoppingBag,
  CheckCircle,
  XCircle,
  Timer,
  Zap,
  Utensils
} from "lucide-react";

interface Props {
  food: Food;
  variant?: "grid" | "list";
}

// Backend stores/returns relative paths like "/uploads/xyz.png"
function resolveImageUrl(path: string): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${baseURL}${path.startsWith("/") ? "" : "/"}${path}`;
}
 
export default function FoodCard({ food, variant = "grid" }: Props) {
  const [isHovered, setIsHovered] = useState(false);
 
  const { handleAddToCart, cart } = useCart();
 
  const isRestaurantClosed = food.restaurant?.isOpen === false;
  const canOrder = food.isAvailable && !isRestaurantClosed;
  const imageUrl = resolveImageUrl(food.image);
 
  const cartItem = cart?.items?.find(
    (item) => item.food?._id === food._id,
  );
 
  const currentQuantity = cartItem?.quantity || 0;

  // Show success toast when item is added
  const showAddToCartToast = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "success",
      title: "Added to Cart!",
      html: `
        <div style="text-align: center; padding: 2px 0;">
          <p style="font-size: 14px; font-weight: 600; margin: 0; color: #1f2937;">
            ${food.itemName}
          </p>
          <p style="font-size: 12px; margin: 2px 0 0 0; color: #6b7280;">
            ₹${food.discountPrice || food.basePrice} • Added to your cart
          </p>
        </div>
      `,
      background: "#ffffff",
      iconColor: "#22c55e",
      width: 320,
      padding: "12px",
    });
  };

  // Show error toast when item cannot be added
  const showErrorToast = (message: string) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });

    Toast.fire({
      icon: "error",
      title: message,
      background: "#ffffff",
      iconColor: "#ef4444",
      width: 320,
      padding: "12px",
    });
  };

  const handleAddToCartClick = async () => {
    if (!canOrder) {
      if (isRestaurantClosed) {
        showErrorToast("Restaurant is currently closed");
      } else if (!food.isAvailable) {
        showErrorToast("This item is currently unavailable");
      }
      return;
    }

    try {
      await handleAddToCart({
        foodId: food._id,
        quantity: 1,
      });
      showAddToCartToast();
    } catch (error) {
      console.error("Failed to add cart item", error);
      showErrorToast("Failed to add item to cart");
    }
  };

  // List variant rendering
  if (variant === "list") {
    return (
      <div
        className={`bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col sm:flex-row ${
          isRestaurantClosed ? "opacity-70" : ""
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image */}
        <div className="relative w-full sm:w-48 h-48 sm:h-auto flex-shrink-0 bg-gray-100 overflow-hidden">
          {food.image ? (
            <img
              src={imageUrl}
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
              <Utensils className="w-12 h-12 text-gray-400" />
            </div>
          )}

          {/* Status Badges */}
          {isRestaurantClosed && (
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
              <span className="bg-white/95 text-gray-800 px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                <Clock className="w-4 h-4 inline mr-2" />
                Restaurant Closed
              </span>
            </div>
          )}

          {!isRestaurantClosed && food.discountPercentage > 0 && (
            <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
              <Zap className="w-3 h-3" />
              {food.discountPercentage}% OFF
            </div>
          )}

          <div className="absolute top-3 right-3">
            <span
              className={`px-2.5 py-1 rounded-full text-xs font-bold shadow-lg ${
                food.isVeg ? "bg-green-500 text-white" : "bg-red-500 text-white"
              }`}
            >
              {food.isVeg ? "VEG" : "NON-VEG"}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
                  {food.itemName}
                </h3>
                <p className="text-sm text-gray-600 mt-0.5 line-clamp-1">
                  {food.restaurant?.restaurantName || "Unknown Restaurant"}
                </p>
                <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                  <MapPin className="w-3 h-3" />
                  <span>{food.restaurant?.location || "Location not available"}</span>
                </div>
              </div>
              
              {/* Rating */}
              <div className="flex items-center gap-1.5 bg-green-50 px-2.5 py-1 rounded-lg border border-green-100 flex-shrink-0 ml-2">
                <Star className="w-3.5 h-3.5 fill-green-600 text-green-600" />
                <span className="text-sm font-bold text-green-700">
                  {food.rating !== undefined ? food.rating.toFixed(1) : "N/A"}
                </span>
                <span className="text-xs text-gray-500">
                  ({food.totalRatings || 0})
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-500 mt-2 line-clamp-2">
              {food.description || "No description available"}
            </p>
          </div>

          {/* Bottom */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xl text-gray-900">
                  ₹{food.discountPrice || food.basePrice}
                </span>
                {food.discountPrice && food.basePrice > food.discountPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    ₹{food.basePrice}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Timer className="w-3.5 h-3.5 text-orange-500" />
                <span className="text-xs text-gray-500">
                  {food.preparationTime || 20} mins
                </span>
                {!isRestaurantClosed && food.isAvailable && (
                  <span className="text-xs text-green-600 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Available
                  </span>
                )}
              </div>
            </div>

            {/* Add Button */}
            <button
              disabled={!canOrder}
              onClick={handleAddToCartClick}
              className={`px-5 py-2 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                canOrder
                  ? "bg-gradient-to-r from-orange-500 to-orange-600 hover:shadow-lg hover:shadow-orange-500/30 text-white hover:scale-105"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              {isRestaurantClosed
                ? "Closed"
                : food.isAvailable
                  ? currentQuantity > 0
                    ? `Add (${currentQuantity})`
                    : "Add to Cart"
                  : "Unavailable"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Grid variant
  return (
    <div
      className={`bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group ${
        isRestaurantClosed ? "opacity-70" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ================= IMAGE ================= */}
      <div className="relative h-52 bg-gray-100 overflow-hidden">
        {food.image ? (
          <img
            src={imageUrl}
            alt={food.itemName}
            className={`w-full h-full object-cover transition-transform duration-500 ${
              isRestaurantClosed ? "grayscale" : ""
            }`}
            style={{
              transform: isHovered && !isRestaurantClosed ? "scale(1.08)" : "scale(1)",
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <Utensils className="w-16 h-16 text-gray-300" />
          </div>
        )}

        {/* Restaurant closed overlay */}
        {isRestaurantClosed && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white/95 rounded-2xl px-6 py-4 text-center shadow-2xl">
              <Clock className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <span className="text-gray-800 font-bold text-base block">
                Restaurant Closed
              </span>
              <span className="text-xs text-gray-500">Currently unavailable</span>
            </div>
          </div>
        )}

        {/* Discount Badge */}
        {!isRestaurantClosed && food.discountPercentage > 0 && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1 animate-pulse">
            <Zap className="w-3 h-3" />
            {food.discountPercentage}% OFF
          </div>
        )}

        {/* Veg / Non-Veg */}
        <div className="absolute top-3 right-3">
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1 ${
              food.isVeg 
                ? "bg-green-500 text-white" 
                : "bg-red-500 text-white"
            }`}
          >
            {food.isVeg ? "🌿 VEG" : "🍖 NON-VEG"}
          </span>
        </div>

        {/* Quick Add on Hover */}
        {isHovered && canOrder && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end justify-center p-4">
            <button
              onClick={handleAddToCartClick}
              className="w-full py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              {currentQuantity > 0 ? `Add More (${currentQuantity})` : "Add to Cart"} • ₹{food.discountPrice || food.basePrice}
            </button>
          </div>
        )}
      </div>

      {/* ================= CONTENT ================= */}
      <div className="p-4">
        {/* Food Name & Rating */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-bold text-gray-900 line-clamp-1 flex-1">
            {food.itemName}
          </h3>
          <div className="flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded-lg border border-green-100 flex-shrink-0">
            <Star className="w-3.5 h-3.5 fill-green-600 text-green-600" />
            <span className="text-xs font-bold text-green-700">
              {food.rating !== undefined ? food.rating.toFixed(1) : "N/A"}
            </span>
          </div>
        </div>

        {/* Restaurant */}
        <p className="text-sm text-gray-600 mt-0.5 line-clamp-1 font-medium">
          {food.restaurant?.restaurantName || "Unknown Restaurant"}
        </p>

        {/* Location */}
        <p className="text-xs text-gray-400 mt-0.5 line-clamp-1 flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          {food.restaurant?.location || "Location not available"}
        </p>

        {/* Description */}
        <p className="text-sm text-gray-500 mt-2 line-clamp-2">
          {food.description || "No description available"}
        </p>

        {/* ================= PRICE & BOTTOM ================= */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-gray-900">
                ₹{food.discountPrice || food.basePrice}
              </span>
              {food.discountPrice && food.basePrice > food.discountPrice && (
                <span className="text-xs text-gray-400 line-through">
                  ₹{food.basePrice}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Timer className="w-3 h-3 text-orange-500" />
              <span className="text-xs text-gray-500">
                {food.preparationTime || 20} mins
              </span>
            </div>
          </div>

          <div className="text-right">
            {isRestaurantClosed ? (
              <span className="text-xs font-semibold text-red-500 flex items-center gap-1">
                <XCircle className="w-3.5 h-3.5" />
                Closed
              </span>
            ) : food.isAvailable ? (
              <span className="text-xs font-semibold text-green-500 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                Available
              </span>
            ) : (
              <span className="text-xs font-semibold text-red-500 flex items-center gap-1">
                <XCircle className="w-3.5 h-3.5" />
                Unavailable
              </span>
            )}
          </div>
        </div>

        {/* Add Button */}
        <button
          disabled={!canOrder}
          onClick={handleAddToCartClick}
          className={`w-full mt-3 py-2.5 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
            canOrder
              ? "bg-gradient-to-r from-orange-500 to-orange-600 hover:shadow-lg hover:shadow-orange-500/30 text-white hover:scale-[1.02]"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          {isRestaurantClosed
            ? "Restaurant Closed"
            : food.isAvailable
              ? currentQuantity > 0
                ? `Add More (${currentQuantity} in cart)`
                : "Add to Cart"
              : "Unavailable"}
        </button>
      </div>
    </div>
  );
}