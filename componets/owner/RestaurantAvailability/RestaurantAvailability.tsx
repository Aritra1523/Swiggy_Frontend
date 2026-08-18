"use client";

import { useRestaurantStatus } from "@/customHooks/owner/useFoodManagement";

interface RestaurantAvailabilityProps {
  isOpen: boolean;
}

export default function RestaurantAvailability({
  isOpen,
}: RestaurantAvailabilityProps) {
  const {
    mutate: updateStatus,
    isPending,
    isError,
  } = useRestaurantStatus();

  const handleToggle = () => {
    updateStatus({
      isOpen: !isOpen,
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-center justify-between gap-4">
        {/* Restaurant Status */}
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            Restaurant Availability
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            {isOpen
              ? "Your restaurant is currently accepting orders."
              : "Your restaurant is currently closed."}
          </p>
        </div>

        {/* Toggle */}
        <button
          type="button"
          onClick={handleToggle}
          disabled={isPending}
          className={`relative w-14 h-7 rounded-full transition-colors ${
            isOpen ? "bg-green-500" : "bg-gray-300"
          } ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <span
            className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${
              isOpen ? "translate-x-8" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      {/* Status */}
      <div className="mt-4 flex items-center gap-2">
        <span
          className={`w-2.5 h-2.5 rounded-full ${
            isOpen ? "bg-green-500" : "bg-red-500"
          }`}
        />

        <span
          className={`text-sm font-semibold ${
            isOpen ? "text-green-600" : "text-red-600"
          }`}
        >
          {isPending
            ? "Updating..."
            : isOpen
              ? "Restaurant is Open"
              : "Restaurant is Closed"}
        </span>
      </div>

      {/* Error */}
      {isError && (
        <p className="text-sm text-red-500 mt-3">
          Failed to update restaurant status.
        </p>
      )}
    </div>
  );
}