// "use client";

// import { useState, useEffect } from "react";
// import {
//   ClipboardList,
//   RefreshCw,
//   PackageSearch,
//   ShoppingBag,
//   Clock,
//   CheckCircle,
//   Truck,
//   Package,
//   XCircle,
//   PackageCheck,
// } from "lucide-react";
// import Swal from 'sweetalert2';

// import { useOwnerOrders } from "@/customHooks/owner/useFoodManagement";
// import { OrderCard } from "../OrderCard/OrderCard";
// import { socket } from "@/lib/socket/socket";

// const FILTERS = [
//   { value: "all", label: "All", icon: ShoppingBag, color: "slate" },
//   { value: "placed", label: "Placed", icon: Clock, color: "blue" },
//   { value: "accepted", label: "Accepted", icon: CheckCircle, color: "emerald" },
//   { value: "preparing", label: "Preparing", icon: Package, color: "amber" },
//   { value: "out_for_delivery", label: "Out for Delivery", icon: Truck, color: "purple" },
//   { value: "delivered", label: "Delivered", icon: PackageCheck, color: "green" },
//   { value: "cancelled", label: "Cancelled", icon: XCircle, color: "rose" },
// ];

// // Enhanced color configuration with better contrast
// const colorConfig = {
//   slate: {
//     bg: "bg-slate-50",
//     hoverBg: "hover:bg-slate-100",
//     activeBg: "bg-slate-700",
//     text: "text-slate-700",
//     activeText: "text-white",
//     border: "border-slate-200",
//     activeBorder: "border-slate-700",
//     iconBg: "bg-slate-100",
//     activeIconBg: "bg-slate-600",
//     badgeBg: "bg-slate-200",
//     badgeText: "text-slate-700",
//     hoverText: "hover:text-slate-900",
//   },
//   blue: {
//     bg: "bg-blue-50",
//     hoverBg: "hover:bg-blue-100",
//     activeBg: "bg-blue-600",
//     text: "text-blue-700",
//     activeText: "text-white",
//     border: "border-blue-200",
//     activeBorder: "border-blue-600",
//     iconBg: "bg-blue-100",
//     activeIconBg: "bg-blue-500",
//     badgeBg: "bg-blue-200",
//     badgeText: "text-blue-700",
//     hoverText: "hover:text-blue-900",
//   },
//   emerald: {
//     bg: "bg-emerald-50",
//     hoverBg: "hover:bg-emerald-100",
//     activeBg: "bg-emerald-600",
//     text: "text-emerald-700",
//     activeText: "text-white",
//     border: "border-emerald-200",
//     activeBorder: "border-emerald-600",
//     iconBg: "bg-emerald-100",
//     activeIconBg: "bg-emerald-500",
//     badgeBg: "bg-emerald-200",
//     badgeText: "text-emerald-700",
//     hoverText: "hover:text-emerald-900",
//   },
//   amber: {
//     bg: "bg-amber-50",
//     hoverBg: "hover:bg-amber-100",
//     activeBg: "bg-amber-600",
//     text: "text-amber-700",
//     activeText: "text-white",
//     border: "border-amber-200",
//     activeBorder: "border-amber-600",
//     iconBg: "bg-amber-100",
//     activeIconBg: "bg-amber-500",
//     badgeBg: "bg-amber-200",
//     badgeText: "text-amber-700",
//     hoverText: "hover:text-amber-900",
//   },
//   purple: {
//     bg: "bg-purple-50",
//     hoverBg: "hover:bg-purple-100",
//     activeBg: "bg-purple-600",
//     text: "text-purple-700",
//     activeText: "text-white",
//     border: "border-purple-200",
//     activeBorder: "border-purple-600",
//     iconBg: "bg-purple-100",
//     activeIconBg: "bg-purple-500",
//     badgeBg: "bg-purple-200",
//     badgeText: "text-purple-700",
//     hoverText: "hover:text-purple-900",
//   },
//   green: {
//     bg: "bg-green-50",
//     hoverBg: "hover:bg-green-100",
//     activeBg: "bg-green-600",
//     text: "text-green-700",
//     activeText: "text-white",
//     border: "border-green-200",
//     activeBorder: "border-green-600",
//     iconBg: "bg-green-100",
//     activeIconBg: "bg-green-500",
//     badgeBg: "bg-green-200",
//     badgeText: "text-green-700",
//     hoverText: "hover:text-green-900",
//   },
//   rose: {
//     bg: "bg-rose-50",
//     hoverBg: "hover:bg-rose-100",
//     activeBg: "bg-rose-600",
//     text: "text-rose-700",
//     activeText: "text-white",
//     border: "border-rose-200",
//     activeBorder: "border-rose-600",
//     iconBg: "bg-rose-100",
//     activeIconBg: "bg-rose-500",
//     badgeBg: "bg-rose-200",
//     badgeText: "text-rose-700",
//     hoverText: "hover:text-rose-900",
//   },
// };

// export default function OwnerOrdersPage() {
//   const [filter, setFilter] = useState("all");

//   const {
//     data,
//     isLoading,
//     isFetching,
//     isError,
//     refetch,
//   } = useOwnerOrders();

//   const orders = data?.data ?? [];

//   // ---- Socket: live new-order notifications with SweetAlert ----
//   useEffect(() => {
//     const handleNewOrder = (data: any) => {
//       console.log("New order received on orders page:", data);
//       refetch();
//     };

//     socket.on("restaurant:new-order", handleNewOrder);

//     return () => {
//       socket.off("restaurant:new-order", handleNewOrder);
//     };
//   }, [refetch]);

//   const filteredOrders =
//     filter === "all"
//       ? orders
//       : orders.filter((order) => order.status === filter);

//   // Get count for each status
//   const getStatusCount = (status: string) => {
//     if (status === "all") return data?.totalOrders ?? 0;
//     return orders.filter((order) => order.status === status).length;
//   };

//   return (
//     <main className="min-h-screen bg-gray-50 px-4 py-6">
//       <div className="max-w-6xl mx-auto">

//         {/* HEADER */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
//           <div>
//             <div className="flex items-center gap-2">
//               <ClipboardList className="w-6 h-6 text-orange-500" />

//               <h1 className="text-2xl font-bold text-gray-900">
//                 Orders
//               </h1>

//               {isFetching && !isLoading && (
//                 <RefreshCw className="w-4 h-4 text-gray-400 animate-spin" />
//               )}

//               {/* Live indicator */}
//               <span className="inline-flex items-center gap-1.5 ml-2">
//                 <span className="relative flex h-2 w-2">
//                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
//                   <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
//                 </span>
//                 <span className="text-xs text-gray-400 font-medium">Live</span>
//               </span>
//             </div>

//             <p className="text-sm text-gray-500 mt-1">
//               Manage orders received by your restaurant
//             </p>
//           </div>

//           {/* TOTAL ORDERS */}
//           <div className="bg-white border border-gray-100 rounded-xl px-5 py-3 shadow-sm">
//             <p className="text-xs text-gray-500">
//               Total Orders
//             </p>

//             <p className="text-xl font-bold text-gray-900">
//               {data?.totalOrders ?? 0}
//             </p>
//           </div>
//         </div>

//         {/* FILTERS - ENHANCED BOXES WITH BETTER VISIBILITY */}
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
//           {FILTERS.map((filterItem) => {
//             const active = filter === filterItem.value;
//             const count = getStatusCount(filterItem.value);
//             const colors = colorConfig[filterItem.color as keyof typeof colorConfig];

//             return (
//               <button
//                 key={filterItem.value}
//                 onClick={() => setFilter(filterItem.value)}
//                 className={`
//                   relative group flex flex-col items-center justify-center
//                   p-3 rounded-xl border-2 transition-all duration-200
//                   ${active 
//                     ? `${colors.activeBg} ${colors.activeBorder} ${colors.activeText} shadow-lg scale-[1.02]` 
//                     : `bg-white ${colors.border} ${colors.text} hover:${colors.hoverBg} hover:scale-[1.02]`
//                   }
//                 `}
//               >
//                 {/* Status Indicator Dot for active state */}
//                 {active && (
//                   <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full border-2 border-current" />
//                 )}

//                 {/* Icon */}
//                 <div className={`
//                   p-1.5 rounded-lg transition-all duration-200
//                   ${active 
//                     ? `${colors.activeIconBg} bg-opacity-30` 
//                     : `${colors.iconBg} group-hover:${colors.hoverBg}`
//                   }
//                 `}>
//                   <filterItem.icon className={`
//                     w-5 h-5 transition-all duration-200
//                     ${active ? "text-white" : `${colors.text} group-hover:${colors.hoverText}`}
//                   `} />
//                 </div>

//                 {/* Label - Always visible with good contrast */}
//                 <span className={`
//                   text-xs font-semibold mt-1.5 transition-colors duration-200
//                   ${active ? "text-white" : `${colors.text} group-hover:${colors.hoverText}`}
//                 `}>
//                   {filterItem.label}
//                 </span>

//                 {/* Count Badge */}
//                 <span className={`
//                   text-xs font-bold px-2 py-0.5 rounded-full mt-0.5 transition-all duration-200
//                   ${active 
//                     ? "bg-white text-gray-900" 
//                     : `${colors.badgeBg} ${colors.badgeText} group-hover:${colors.hoverText}`
//                   }
//                 `}>
//                   {count}
//                 </span>

//                 {/* Subtle hover glow effect */}
//                 {!active && (
//                   <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-200 bg-current" />
//                 )}
//               </button>
//             );
//           })}
//         </div>

//         {/* LOADING */}
//         {isLoading && (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//             {Array.from({ length: 4 }).map((_, index) => (
//               <div
//                 key={index}
//                 className="bg-white rounded-2xl border border-gray-100 p-5 animate-pulse"
//               >
//                 <div className="flex justify-between">
//                   <div>
//                     <div className="h-5 w-32 bg-gray-200 rounded" />
//                     <div className="h-3 w-24 bg-gray-200 rounded mt-2" />
//                   </div>

//                   <div className="h-7 w-24 bg-gray-200 rounded-full" />
//                 </div>

//                 <div className="mt-5 space-y-3">
//                   <div className="h-4 w-full bg-gray-200 rounded" />
//                   <div className="h-4 w-3/4 bg-gray-200 rounded" />
//                   <div className="h-4 w-1/2 bg-gray-200 rounded" />
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* ERROR */}
//         {!isLoading && isError && (
//           <div className="bg-white rounded-2xl border border-red-100 p-10 text-center">
//             <div className="text-4xl mb-3">
//               😕
//             </div>

//             <h3 className="text-lg font-semibold text-gray-900">
//               Failed to load orders
//             </h3>

//             <p className="text-sm text-gray-500 mt-1">
//               Something went wrong while fetching restaurant orders.
//             </p>

//             <button
//               onClick={() => refetch()}
//               className="mt-5 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold"
//             >
//               Try Again
//             </button>
//           </div>
//         )}

//         {/* EMPTY */}
//         {!isLoading &&
//           !isError &&
//           filteredOrders.length === 0 && (
//             <div className="bg-white rounded-3xl border-2 border-dashed border-gray-200 p-16 text-center">
//               <PackageSearch className="w-12 h-12 text-gray-300 mx-auto mb-4" />

//               <h3 className="text-xl font-semibold text-gray-900">
//                 No orders found
//               </h3>

//               <p className="text-gray-500 text-sm mt-1">
//                 {filter === "all"
//                   ? "Your restaurant has not received any orders yet."
//                   : `There are no ${filter.replaceAll(
//                       "_",
//                       " "
//                     )} orders.`}
//               </p>

//               {filter !== "all" && (
//                 <button
//                   onClick={() => setFilter("all")}
//                   className="mt-5 px-5 py-2.5 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600"
//                 >
//                   View All Orders
//                 </button>
//               )}
//             </div>
//           )}

//         {/* ORDERS */}
//         {!isLoading &&
//           !isError &&
//           filteredOrders.length > 0 && (
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
//               {filteredOrders.map((order) => (
//                 <OrderCard
//                   key={order._id}
//                   order={order}
//                 />
//               ))}
//             </div>
//           )}
//       </div>
//     </main>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import {
  ClipboardList,
  RefreshCw,
  PackageSearch,
} from "lucide-react";
import Swal from 'sweetalert2';

import { useOwnerOrders } from "@/customHooks/owner/useFoodManagement";
import { OrderCard } from "../OrderCard/OrderCard";
import { socket } from "@/lib/socket/socket";
import { FILTERS } from "./orderFilters";
import { OrderFilterButton } from "./OrderFilterButton";
import { OrderSkeletonGrid } from "./OrderSkeletons";
import type { FilterValue } from "./orderFilters";
import type { OwnerOrder } from "@/typescript/restaurantOwner/restaurantOwner";

export default function OwnerOrdersPage() {
  const [filter, setFilter] = useState<FilterValue>("all");

  const {
    data,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useOwnerOrders();

  // Use OwnerOrder type directly from your types
  const orders: OwnerOrder[] = data?.data ?? [];
  // const totalOrders: number = data?.totalOrders ?? 0;
const totalOrders: number = orders.length;
  // Socket: live new-order notifications
  useEffect(() => {
    const handleNewOrder = (newOrderData: any) => {
      console.log("New order received on orders page:", newOrderData);
      refetch();
      
      // Optional: Show notification
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "New Order Received!",
        text: `Order #${newOrderData._id?.slice(-6).toUpperCase() || ''}`,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    };

    socket.on("restaurant:new-order", handleNewOrder);

    return () => {
      socket.off("restaurant:new-order", handleNewOrder);
    };
  }, [refetch]);

  const filteredOrders = filter === "all"
    ? orders
    : orders.filter((order) => order.status === filter);

  const getStatusCount = (status: FilterValue): number => {
    if (status === "all") return totalOrders;
    return orders.filter((order) => order.status === status).length;
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <ClipboardList className="w-6 h-6 text-orange-500" />
              <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
              
              {isFetching && !isLoading && (
                <RefreshCw className="w-4 h-4 text-gray-400 animate-spin" />
              )}

              {/* Live indicator */}
              <span className="inline-flex items-center gap-1.5 ml-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className="text-xs text-gray-400 font-medium">Live</span>
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Manage orders received by your restaurant
            </p>
          </div>

          {/* TOTAL ORDERS */}
          <div className="bg-white border border-gray-100 rounded-xl px-5 py-3 shadow-sm">
            <p className="text-xs text-gray-500">Total Orders</p>
            <p className="text-xl font-bold text-gray-900">{totalOrders}</p>
          </div>
        </div>

        {/* FILTERS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
          {FILTERS.map((filterItem) => (
            <OrderFilterButton
              key={filterItem.value}
              value={filterItem.value}
              label={filterItem.label}
              icon={filterItem.icon}
              color={filterItem.color}
              count={getStatusCount(filterItem.value)}
              isActive={filter === filterItem.value}
              onClick={() => setFilter(filterItem.value)}
            />
          ))}
        </div>

        {/* LOADING */}
        {isLoading && <OrderSkeletonGrid />}

        {/* ERROR */}
        {!isLoading && isError && (
          <div className="bg-white rounded-2xl border border-red-100 p-10 text-center">
            <div className="text-4xl mb-3">😕</div>
            <h3 className="text-lg font-semibold text-gray-900">
              Failed to load orders
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Something went wrong while fetching restaurant orders.
            </p>
            <button
              onClick={() => refetch()}
              className="mt-5 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* EMPTY */}
        {!isLoading && !isError && filteredOrders.length === 0 && (
          <div className="bg-white rounded-3xl border-2 border-dashed border-gray-200 p-16 text-center">
            <PackageSearch className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900">
              No orders found
            </h3>
            <p className="text-gray-500 text-sm mt-1">
              {filter === "all"
                ? "Your restaurant has not received any orders yet."
                : `There are no ${filter.replaceAll("_", " ")} orders.`}
            </p>
            {filter !== "all" && (
              <button
                onClick={() => setFilter("all")}
                className="mt-5 px-5 py-2.5 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors"
              >
                View All Orders
              </button>
            )}
          </div>
        )}

        {/* ORDERS */}
        {!isLoading && !isError && filteredOrders.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {filteredOrders.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}