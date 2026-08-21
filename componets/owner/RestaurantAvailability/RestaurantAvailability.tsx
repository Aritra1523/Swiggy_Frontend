// // "use client";

// // import { useRestaurantStatus } from "@/customHooks/owner/useFoodManagement";

// // interface RestaurantAvailabilityProps {
// //   isOpen: boolean;
// // }

// // export default function RestaurantAvailability({
// //   isOpen,
// // }: RestaurantAvailabilityProps) {
// //   const {
// //     mutate: updateStatus,
// //     isPending,
// //     isError,
// //   } = useRestaurantStatus();

// //   const handleToggle = () => {
// //     updateStatus({
// //       isOpen: !isOpen,
// //     });
// //   };

// //   return (
// //     <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
// //       <div className="flex items-center justify-between gap-4">
// //         {/* Restaurant Status */}
// //         <div>
// //           <h2 className="text-lg font-bold text-gray-900">
// //             Restaurant Availability
// //           </h2>

// //           <p className="text-sm text-gray-500 mt-1">
// //             {isOpen
// //               ? "Your restaurant is currently accepting orders."
// //               : "Your restaurant is currently closed."}
// //           </p>
// //         </div>

// //         {/* Toggle */}
// //         <button
// //           type="button"
// //           onClick={handleToggle}
// //           disabled={isPending}
// //           className={`relative w-14 h-7 rounded-full transition-colors ${
// //             isOpen ? "bg-green-500" : "bg-gray-300"
// //           } ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
// //         >
// //           <span
// //             className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${
// //               isOpen ? "translate-x-8" : "translate-x-1"
// //             }`}
// //           />
// //         </button>
// //       </div>

// //       {/* Status */}
// //       <div className="mt-4 flex items-center gap-2">
// //         <span
// //           className={`w-2.5 h-2.5 rounded-full ${
// //             isOpen ? "bg-green-500" : "bg-red-500"
// //           }`}
// //         />

// //         <span
// //           className={`text-sm font-semibold ${
// //             isOpen ? "text-green-600" : "text-red-600"
// //           }`}
// //         >
// //           {isPending
// //             ? "Updating..."
// //             : isOpen
// //               ? "Restaurant is Open"
// //               : "Restaurant is Closed"}
// //         </span>
// //       </div>

// //       {/* Error */}
// //       {isError && (
// //         <p className="text-sm text-red-500 mt-3">
// //           Failed to update restaurant status.
// //         </p>
// //       )}
// //     </div>
// //   );
// // }
// "use client";

// import { useMyRestaurant, useRestaurantStatus } from "@/customHooks/owner/useFoodManagement";

// export default function RestaurantAvailability() {
//   const { data: restaurantRes, isLoading: restaurantLoading } = useMyRestaurant();
//   const { mutate: updateStatus, isPending, isError } = useRestaurantStatus();

//   const isOpen = restaurantRes?.data?.isOpen ?? false;

//   const handleToggle = () => {
//     updateStatus({ isOpen: !isOpen });
//   };

//   if (restaurantLoading) {
//     return (
//       <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
//         <div className="animate-pulse h-16 bg-gray-50 rounded-xl" />
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
//       <div className="flex items-center justify-between gap-4">
//         {/* Restaurant Status */}
//         <div>
//           <h2 className="text-lg font-bold text-gray-900">
//             Restaurant Availability
//           </h2>

//           <p className="text-sm text-gray-500 mt-1">
//             {isOpen
//               ? "Your restaurant is currently accepting orders."
//               : "Your restaurant is currently closed."}
//           </p>
//         </div>

//         {/* Toggle */}
//         <button
//           type="button"
//           onClick={handleToggle}
//           disabled={isPending}
//           className={`relative w-14 h-7 rounded-full transition-colors ${
//             isOpen ? "bg-green-500" : "bg-gray-300"
//           } ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
//         >
//           <span
//             className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${
//               isOpen ? "translate-x-8" : "translate-x-1"
//             }`}
//           />
//         </button>
//       </div>

//       {/* Status */}
//       <div className="mt-4 flex items-center gap-2">
//         <span
//           className={`w-2.5 h-2.5 rounded-full ${
//             isOpen ? "bg-green-500" : "bg-red-500"
//           }`}
//         />

//         <span
//           className={`text-sm font-semibold ${
//             isOpen ? "text-green-600" : "text-red-600"
//           }`}
//         >
//           {isPending
//             ? "Updating..."
//             : isOpen
//               ? "Restaurant is Open"
//               : "Restaurant is Closed"}
//         </span>
//       </div>

//       {/* Error */}
//       {isError && (
//         <p className="text-sm text-red-500 mt-3">
//           Failed to update restaurant status.
//         </p>
//       )}
//     </div>
//   );
// }

"use client";

import { useMyRestaurant, useRestaurantStatus } from "@/customHooks/owner/useFoodManagement";
import { Power, PowerOff, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function RestaurantAvailability() {
  const { data: restaurantRes, isLoading: restaurantLoading, refetch } = useMyRestaurant();
  const { mutate: updateStatus, isPending, isError } = useRestaurantStatus();
  
  // Local state to track the actual toggle position
  const [localIsOpen, setLocalIsOpen] = useState<boolean | null>(null);
  
  // Use local state if available, otherwise use restaurant data
  const isOpen = localIsOpen !== null ? localIsOpen : (restaurantRes?.data?.isOpen ?? false);

  // Reset local state when restaurant data changes
  useEffect(() => {
    if (restaurantRes?.data?.isOpen !== undefined) {
      setLocalIsOpen(restaurantRes.data.isOpen);
    }
  }, [restaurantRes?.data?.isOpen]);

  const handleToggle = () => {
    const newStatus = !isOpen;
    // Update local state immediately for UI feedback
    setLocalIsOpen(newStatus);
    // Make API call
    updateStatus({ isOpen: newStatus }, {
      onSuccess: () => {
        // Refetch to ensure data is synced
        refetch();
      },
      onError: () => {
        // Revert local state on error
        setLocalIsOpen(!newStatus);
      }
    });
  };

  if (restaurantLoading) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="animate-pulse flex items-center gap-4">
          <div className="flex-1">
            <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-100 rounded w-1/2" />
          </div>
          <div className="w-14 h-7 bg-gray-200 rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between gap-4">
        {/* Restaurant Status */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-lg font-bold text-gray-900">
              Restaurant Availability
            </h2>
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
              isOpen 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}>
              {isOpen ? (
                <CheckCircle2 className="w-3 h-3" />
              ) : (
                <AlertCircle className="w-3 h-3" />
              )}
              {isOpen ? 'Open' : 'Closed'}
            </span>
          </div>

          <p className="text-sm text-gray-500 leading-relaxed">
            {isOpen
              ? "Your restaurant is currently accepting orders."
              : "Your restaurant is currently closed. Customers won't be able to place orders."}
          </p>

          {isPending && (
            <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
              <Loader2 className="w-3 h-3 animate-spin" />
              Updating status...
            </p>
          )}
        </div>

        {/* Toggle Button */}
        <button
          type="button"
          onClick={handleToggle}
          disabled={isPending}
          className={`relative flex-shrink-0 w-14 h-8 rounded-full transition-all duration-300 ease-in-out ${
            isOpen 
              ? 'bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600' 
              : 'bg-gray-300 hover:bg-gray-400'
          } ${isPending ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
          aria-label={isOpen ? 'Close restaurant' : 'Open restaurant'}
        >
          <span
            className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ease-in-out flex items-center justify-center ${
              isOpen ? 'translate-x-7' : 'translate-x-1'
            } ${isPending ? 'scale-95' : 'scale-100'}`}
          >
            {isPending ? (
              <Loader2 className="w-3 h-3 text-gray-500 animate-spin" />
            ) : isOpen ? (
              <Power className="w-3 h-3 text-green-500" />
            ) : (
              <PowerOff className="w-3 h-3 text-gray-400" />
            )}
          </span>
        </button>
      </div>

      {/* Status Indicator */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`relative`}>
              <span
                className={`absolute inset-0 rounded-full animate-ping ${
                  isOpen ? 'bg-green-400' : 'bg-red-400'
                } opacity-75`}
              />
              <span
                className={`relative inline-block w-2.5 h-2.5 rounded-full ${
                  isOpen ? 'bg-green-500' : 'bg-red-500'
                }`}
              />
            </div>

            <span
              className={`text-sm font-semibold ${
                isOpen ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {isPending
                ? "Updating..."
                : isOpen
                  ? "Restaurant is Open"
                  : "Restaurant is Closed"}
            </span>
          </div>

          {!isPending && !isError && (
            <span className="text-xs text-gray-400">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
        </div>

        {/* Success/Error Messages */}
        {isError && (
          <div className="mt-3 p-3 bg-red-50 rounded-xl border border-red-100 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
            <p className="text-sm text-red-600">
              Failed to update restaurant status. Please try again.
            </p>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className={`rounded-xl px-3 py-2 ${
          isOpen ? 'bg-green-50' : 'bg-red-50'
        }`}>
          <p className="text-xs text-gray-500">Current Status</p>
          <p className={`text-sm font-semibold ${
            isOpen ? 'text-green-600' : 'text-red-600'
          }`}>
            {isOpen ? '🟢 Online' : '🔴 Offline'}
          </p>
        </div>
        <div className="bg-gray-50 rounded-xl px-3 py-2">
          <p className="text-xs text-gray-500">Last Updated</p>
          <p className="text-sm font-semibold text-gray-700">
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>
    </div>
  );
}