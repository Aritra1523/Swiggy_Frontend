// "use client";

// import useCart from "@/customHooks/order/useCart";
// import { useEffect, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   ShoppingBag,
//   Trash2,
//   Plus,
//   Minus,
//   ArrowLeft,
//   Clock,
//   Store,
//   MapPin,
//   ChevronRight,
//   Tag,
//   CreditCard,
//   Bike,
//   IndianRupee,
// } from "lucide-react";
// import useOrders from "@/customHooks/order/useOrders";

// export default function CartPage() {
//   const router = useRouter();
//   const {
//     cart,
//     cartLoading,
//     cartError,
//     handleFetchCart,
//     handleDecrementCartItem,
//     handleIncrementCartItem,
//   } = useCart();
//   const { handlePlaceOrder, orderLoading, orderError } = useOrders();
//   const [isCheckingOut, setIsCheckingOut] = useState(false);

//   // NEW: Track first load and per-item loading state
//   const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
//   const [updatingItemId, setUpdatingItemId] = useState<string | null>(null);

//   useEffect(() => {
//     handleFetchCart().finally(() => setHasLoadedOnce(true));
//   }, []);

//   // NEW: Only show skeleton on FIRST load (not on updates)
//   if (cartLoading && !hasLoadedOnce) {
//     return (
//       <main className="min-h-screen bg-gray-50">
//         <div className="max-w-6xl mx-auto px-4 py-8">
//           <div className="animate-pulse">
//             <div className="h-8 w-48 bg-gray-200 rounded-lg mb-4" />
//             <div className="h-4 w-32 bg-gray-200 rounded-lg mb-8" />
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//               <div className="lg:col-span-2 space-y-4">
//                 {[1, 2, 3].map((i) => (
//                   <div key={i} className="bg-white rounded-2xl p-4 shadow-sm">
//                     <div className="flex gap-4">
//                       <div className="w-28 h-28 bg-gray-200 rounded-xl" />
//                       <div className="flex-1 space-y-3">
//                         <div className="h-6 bg-gray-200 rounded w-3/4" />
//                         <div className="h-4 bg-gray-200 rounded w-1/2" />
//                         <div className="h-4 bg-gray-200 rounded w-1/3" />
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               <div className="h-80 bg-white rounded-2xl shadow-sm" />
//             </div>
//           </div>
//         </div>
//       </main>
//     );
//   }

//   if (cartError) {
//     return (
//       <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
//         <div className="text-center max-w-md">
//           <div className="text-6xl mb-4">😕</div>
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">
//             Oops! Something went wrong
//           </h2>
//           <p className="text-gray-500 mb-6">{cartError}</p>
//           <button
//             onClick={() =>
//               handleFetchCart().finally(() => setHasLoadedOnce(true))
//             }
//             className="px-6 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors"
//           >
//             Try Again
//           </button>
//         </div>
//       </main>
//     );
//   }

//   const items = cart?.items || [];

//   if (items.length === 0) {
//     return (
//       <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
//         <div className="text-center max-w-md">
//           <div className="relative w-48 h-48 mx-auto mb-6">
//             <div className="absolute inset-0 bg-orange-100 rounded-full scale-110" />
//             <div className="relative flex items-center justify-center h-full">
//               <ShoppingBag className="w-24 h-24 text-orange-500" />
//             </div>
//           </div>
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">
//             Your cart is empty
//           </h1>
//           <p className="text-gray-500 mb-6">
//             Looks like you haven&apos;t added any items yet.
//           </p>
//           <Link
//             href="/"
//             className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors"
//           >
//             <ArrowLeft className="w-5 h-5" />
//             Browse Restaurants
//           </Link>
//         </div>
//       </main>
//     );
//   }

//   const totalItems = items.reduce(
//     (total: number, item: any) => total + item.quantity,
//     0,
//   );

//   const totalPrice = items.reduce((total: number, item: any) => {
//     const price = item.food?.discountPrice || item.food?.basePrice || 0;
//     return total + price * item.quantity;
//   }, 0);

//   const deliveryFee = totalPrice > 200 ? 0 : 40;
//   const platformFee = 10;
//   const gst = Math.round(totalPrice * 0.05);
//   const grandTotal = totalPrice + deliveryFee + platformFee + gst;

//   const groupedByRestaurant = items.reduce((groups: any, item: any) => {
//     const restaurantId = item.restaurant?._id;
//     if (!groups[restaurantId]) {
//       groups[restaurantId] = {
//         restaurant: item.restaurant,
//         items: [],
//       };
//     }
//     groups[restaurantId].items.push(item);
//     return groups;
//   }, {});

//   // NEW: Wrapped handlers with local loading state
//   const onIncrement = async (foodId: string) => {
//     setUpdatingItemId(foodId);
//     await handleIncrementCartItem(foodId);
//     setUpdatingItemId(null);
//   };

//   const onDecrement = async (foodId: string) => {
//     setUpdatingItemId(foodId);
//     await handleDecrementCartItem(foodId);
//     setUpdatingItemId(null);
//   };

//   const handleCheckout = () => {
//     if (items.length === 0) {
//       alert("Your cart is empty!");
//       return;
//     }

//     setIsCheckingOut(true);

//     const checkoutData = {
//       items: items,
//       totalAmount: grandTotal,
//       totalItems: totalItems,
//       restaurant: Object.values(groupedByRestaurant)[0]?.restaurant,
//       timestamp: Date.now(),
//     };
//     localStorage.setItem("checkoutData", JSON.stringify(checkoutData));

//     setTimeout(() => {
//       router.push("/check");
//     }, 600);
//   };

//   return (
//     <main className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="sticky top-0 z-10 bg-white border-b border-gray-100 shadow-sm">
//         <div className="max-w-6xl mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <Link
//               href="/"
//               className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
//             >
//               <ArrowLeft className="w-5 h-5" />
//               <span className="font-medium">Back</span>
//             </Link>
//             <div className="flex items-center gap-3">
//               <span className="text-sm text-gray-500">{totalItems} items</span>
//               <div className="h-6 w-px bg-gray-200" />
//               <span className="text-sm font-semibold text-orange-500">
//                 ₹{grandTotal}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-6xl mx-auto px-4 py-6">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Cart Items */}
//           <div className="lg:col-span-2 space-y-6">
//             {Object.values(groupedByRestaurant).map((group: any) => (
//               <div
//                 key={group.restaurant?._id}
//                 className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
//               >
//                 {/* Restaurant Header */}
//                 <div className="p-4 border-b border-gray-100 bg-gray-50/50">
//                   <div className="flex items-center gap-3">
//                     <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-200">
//                       {group.restaurant?.logo ? (
//                         <Image
//                           src={group.restaurant.logo}
//                           alt={group.restaurant.restaurantName}
//                           width={48}
//                           height={48}
//                           className="w-full h-full object-cover"
//                         />
//                       ) : (
//                         <Store className="w-6 h-6 text-gray-400 m-3" />
//                       )}
//                     </div>
//                     <div>
//                       <h3 className="font-bold text-gray-900">
//                         {group.restaurant?.restaurantName}
//                       </h3>
//                       <div className="flex items-center gap-3 text-xs text-gray-500">
//                         <span className="flex items-center gap-1">
//                           <Clock className="w-3 h-3" />
//                           {group.restaurant?.deliveryTime || "30-40"} min
//                         </span>
//                         <span>•</span>
//                         <span className="flex items-center gap-1">
//                           <MapPin className="w-3 h-3" />
//                           {group.restaurant?.location || "Nearby"}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Items */}
//                 <div className="divide-y divide-gray-50">
//                   {group.items.map((item: any) => {
//                     const food = item.food;
//                     const price = food?.discountPrice || food?.basePrice || 0;
//                     const hasDiscount = food?.basePrice > price;
//                     const isUpdating = updatingItemId === food?._id;

//                     return (
//                       <motion.div
//                         key={food?._id}
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, x: -20 }}
//                         className={`p-4 hover:bg-gray-50/50 transition-colors ${
//                           isUpdating ? "opacity-60" : "opacity-100"
//                         }`}
//                       >
//                         <div className="flex gap-4">
//                           {/* Image */}
//                           <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-gray-100 shrink-0">
//                             {food?.image ? (
//                               <Image
//                                 src={food.image}
//                                 alt={food.itemName}
//                                 width={96}
//                                 height={96}
//                                 className="w-full h-full object-cover"
//                               />
//                             ) : (
//                               <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
//                                 🍽️ No image
//                               </div>
//                             )}
//                             {hasDiscount && (
//                               <div className="absolute top-1 left-1 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
//                                 {Math.round(
//                                   ((food.basePrice - price) / food.basePrice) *
//                                     100,
//                                 )}
//                                 % OFF
//                               </div>
//                             )}
//                           </div>

//                           {/* Details */}
//                           <div className="flex-1 min-w-0">
//                             <h4 className="font-semibold text-gray-900 truncate">
//                               {food?.itemName}
//                             </h4>
//                             {food?.description && (
//                               <p className="text-sm text-gray-500 truncate mt-0.5">
//                                 {food.description}
//                               </p>
//                             )}
//                             <div className="flex items-center gap-2 mt-2">
//                               <span className="text-lg font-bold text-orange-500">
//                                 ₹{price}
//                               </span>
//                               {hasDiscount && (
//                                 <span className="text-sm text-gray-400 line-through">
//                                   ₹{food.basePrice}
//                                 </span>
//                               )}
//                             </div>

//                             {/* Quantity Controls - UPDATED with disabled states */}
//                             <div className="flex items-center gap-3 mt-3">
//                               <button
//                                 onClick={() => onDecrement(food._id)}
//                                 disabled={isUpdating}
//                                 className="w-8 h-8 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-orange-500 hover:bg-orange-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
//                                 aria-label="Decrease quantity"
//                               >
//                                 <Minus className="w-4 h-4 text-gray-600" />
//                               </button>
//                               <span className="font-semibold w-6 text-center text-black">
//                                 {isUpdating ? "..." : item.quantity}
//                               </span>
//                               <button
//                                 onClick={() => onIncrement(food._id)}
//                                 disabled={isUpdating}
//                                 className="w-8 h-8 rounded-full border-2 border-orange-500 flex items-center justify-center hover:bg-orange-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
//                                 aria-label="Increase quantity"
//                               >
//                                 <Plus className="w-4 h-4 text-orange-500" />
//                               </button>
//                               <button
//                                 onClick={() => onDecrement(food._id)}
//                                 disabled={isUpdating}
//                                 className="ml-2 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
//                                 aria-label="Remove item"
//                               >
//                                 <Trash2 className="w-4 h-4" />
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       </motion.div>
//                     );
//                   })}
//                 </div>
//               </div>
//             ))}

//             {/* Promo Code */}
//             <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
//               <div className="flex items-center gap-3">
//                 <Tag className="w-5 h-5 text-orange-500" />
//                 <input
//                   type="text"
//                   placeholder="Apply promo code"
//                   className="flex-1 bg-transparent border-none outline-none text-sm placeholder-gray-400"
//                 />
//                 <button className="px-4 py-2 text-sm font-semibold text-orange-500 hover:bg-orange-50 rounded-lg transition-colors">
//                   Apply
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Summary */}
//           <div className="lg:col-span-1">
//             <div className="sticky top-24">
//               <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
//                 <h2 className="text-xl font-bold mb-5 flex items-center gap-2 text-gray-800">
//                   <CreditCard className="w-5 h-5 text-orange-500" />
//                   Bill Details
//                 </h2>

//                 <div className="space-y-3">
//                   <div className="flex justify-between text-gray-600">
//                     <span>Items ({totalItems})</span>
//                     <span>₹{totalPrice}</span>
//                   </div>

//                   <div className="flex justify-between text-gray-600">
//                     <span className="flex items-center gap-1">
//                       <Bike className="w-4 h-4" />
//                       Delivery Fee
//                     </span>
//                     <span>
//                       {deliveryFee === 0 ? (
//                         <span className="text-green-600 font-semibold">
//                           FREE
//                         </span>
//                       ) : (
//                         `₹${deliveryFee}`
//                       )}
//                     </span>
//                   </div>

//                   <div className="flex justify-between text-gray-600">
//                     <span>Platform Fee</span>
//                     <span>₹{platformFee}</span>
//                   </div>

//                   <div className="flex justify-between text-gray-600">
//                     <span>GST (5%)</span>
//                     <span>₹{gst}</span>
//                   </div>

//                   {totalPrice > 200 && (
//                     <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-2 rounded-lg text-sm">
//                       <div className="w-2 h-2 bg-green-500 rounded-full" />
//                       <span>Free delivery on orders above ₹200</span>
//                     </div>
//                   )}
//                 </div>

//                 <div className="border-t pt-4 mt-4">
//                   <div className="flex justify-between text-lg font-bold">
//                     <span className="text-black">Grand Total</span>
//                     <span className="text-orange-500">₹{grandTotal}</span>
//                   </div>
//                   <p className="text-xs text-gray-400 mt-1">
//                     Inclusive of all taxes and charges
//                   </p>
//                 </div>

//                 <button
//                   onClick={handleCheckout}
//                   disabled={isCheckingOut || items.length === 0}
//                   className="w-full mt-6 py-3.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-bold shadow-lg shadow-orange-500/25 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {isCheckingOut ? (
//                     <>
//                       <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                       Processing...
//                     </>
//                   ) : (
//                     <>
//                       Proceed to Checkout
//                       <ChevronRight className="w-5 h-5" />
//                     </>
//                   )}
//                 </button>

//                 <p className="text-xs text-center text-gray-400 mt-3">
//                   By proceeding, you agree to our Terms & Conditions
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }


// page.tsx
"use client";

import { useCartPage } from "@/customHooks/cart/useCartPage";
import { CartSkeleton } from "./CartSkeleton";
import { CartError } from "./CartError";
import { CartEmpty } from "./CartEmpty";
import { calculateTotals, groupByRestaurant } from "./cartUtils";
import { CartHeader } from "./CartHeader";
import { RestaurantGroup } from "./RestaurantGroup";
import { PromoCode } from "./PromoCode";
import { OrderSummary } from "./OrderSummary";



export default function CartPage() {
  const {
    cart,
    cartLoading,
    cartError,
    hasLoadedOnce,
    updatingItemId,
    isCheckingOut,
    onIncrement,
    onDecrement,
    handleCheckout,
    handleFetchCart,
  } = useCartPage();

  // Loading state
  if (cartLoading && !hasLoadedOnce) {
    return <CartSkeleton />;
  }

  // Error state
  if (cartError) {
    return (
      <CartError
        error={cartError}
        onRetry={() => handleFetchCart()}
      />
    );
  }

  const items = cart?.items || [];

  // Empty state
  if (items.length === 0) {
    return <CartEmpty />;
  }

  // Calculate totals
  const billDetails = calculateTotals(items);
  const groupedByRestaurant = groupByRestaurant(items);

  return (
    <main className="min-h-screen bg-gray-50">
      <CartHeader
        totalItems={billDetails.totalItems}
        grandTotal={billDetails.grandTotal}
      />

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {Object.values(groupedByRestaurant).map((group) => (
              <RestaurantGroup
                key={group.restaurant?._id}
                group={group}
                updatingItemId={updatingItemId}
                onIncrement={onIncrement}
                onDecrement={onDecrement}
              />
            ))}
            <PromoCode />
          </div>

          {/* Order Summary */}
          <OrderSummary
            billDetails={billDetails}
            isCheckingOut={isCheckingOut}
            itemsCount={items.length}
            onCheckout={() =>
              handleCheckout(
                items,
                billDetails.grandTotal,
                billDetails.totalItems,
                groupedByRestaurant
              )
            }
          />
        </div>
      </div>
    </main>
  );
}