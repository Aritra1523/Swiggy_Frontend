"use client";

import { useMyRestaurant } from "@/customHooks/owner/useFoodManagement";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  XCircle,
  CalendarDays,
  Building2,
} from "lucide-react";

export default function OwnerRestaurantPage() {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useMyRestaurant();


  // Loading
  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-50 p-6 md:p-8">
        <div className="max-w-5xl mx-auto animate-pulse">
          <div className="h-8 w-64 bg-gray-200 rounded-lg" />
          <div className="h-4 w-80 bg-gray-200 rounded mt-3" />

          <div className="mt-8 bg-white rounded-2xl p-6">
            <div className="h-7 w-48 bg-gray-200 rounded" />
            <div className="h-4 w-72 bg-gray-200 rounded mt-4" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-20 bg-gray-100 rounded-xl"
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Error
  if (isError) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm p-8 text-center max-w-md">
          <XCircle className="w-12 h-12 text-red-500 mx-auto" />

          <h2 className="text-xl font-bold text-gray-900 mt-4">
            Failed to load restaurant
          </h2>

          <p className="text-gray-500 mt-2">
            {error instanceof Error
              ? error.message
              : "Something went wrong"}
          </p>
        </div>
      </main>
    );
  }

  // Your response:
  // { status: true, data: {...} }
  const restaurant = data?.data;

  if (!restaurant) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Building2 className="w-12 h-12 text-gray-400 mx-auto" />

          <h2 className="text-xl font-bold text-gray-800 mt-4">
            Restaurant not found
          </h2>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-medium text-orange-500">
            Owner Panel
          </p>

          <h1 className="text-3xl font-bold text-gray-900 mt-1">
            My Restaurant
          </h1>

          <p className="text-gray-500 mt-2">
            View and manage your restaurant information
          </p>
        </div>

        {/* Restaurant Header Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

          {/* Top */}
          <div className="p-6 md:p-8 border-b border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

              <div className="flex items-center gap-4">

                <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-orange-500" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {restaurant.restaurantName}
                  </h2>

                  <p className="text-gray-500 mt-1">
                    {restaurant.outletType || "Restaurant"}
                  </p>
                </div>

              </div>

              {/* Status */}
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm ${
                  restaurant.isOpen
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {restaurant.isOpen ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <XCircle className="w-4 h-4" />
                )}

                {restaurant.isOpen ? "Open" : "Closed"}
              </div>

            </div>
          </div>

          {/* Restaurant Information */}
          <div className="p-6 md:p-8">

            <h3 className="text-lg font-bold text-gray-900 mb-5">
              Restaurant Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Owner */}
              <InfoCard
                icon={<Building2 className="w-5 h-5" />}
                title="Owner"
                value={restaurant.ownerName}
              />

              {/* Location */}
              <InfoCard
                icon={<MapPin className="w-5 h-5" />}
                title="Location"
                value={restaurant.location}
              />

              {/* Phone */}
              <InfoCard
                icon={<Phone className="w-5 h-5" />}
                title="Phone"
                value={restaurant.phone}
              />

              {/* Email */}
              <InfoCard
                icon={<Mail className="w-5 h-5" />}
                title="Email"
                value={restaurant.email}
              />

            </div>
          </div>
        </div>

        {/* Working Days */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mt-6 p-6 md:p-8">

          <div className="flex items-center gap-3 mb-6">
            <CalendarDays className="w-5 h-5 text-orange-500" />

            <h3 className="text-lg font-bold text-gray-900">
              Working Days
            </h3>
          </div>

          <div className="flex flex-wrap gap-3">
            {restaurant.workingDays?.map((day: string) => (
              <span
                key={day}
                className="px-4 py-2 bg-orange-50 text-orange-600 rounded-full text-sm font-medium capitalize"
              >
                {day}
              </span>
            ))}
          </div>
        </div>

        {/* Opening Hours */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mt-6 p-6 md:p-8">

          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-5 h-5 text-orange-500" />

            <h3 className="text-lg font-bold text-gray-900">
              Opening Hours
            </h3>
          </div>

          {restaurant.openingClosing?.slots?.length ? (
            <div className="space-y-3">
              {restaurant.openingClosing.slots.map(
                (
                  slot: {
                    open: string;
                    close: string;
                    _id?: string;
                  },
                  index: number
                ) => (
                  <div
                    key={slot._id || index}
                    className="flex items-center justify-between bg-gray-50 rounded-xl px-5 py-4"
                  >
                    <span className="font-medium text-gray-700">
                      Time Slot {index + 1}
                    </span>

                    <span className="font-semibold text-gray-900">
                      {slot.open} - {slot.close}
                    </span>
                  </div>
                )
              )}
            </div>
          ) : (
            <p className="text-gray-500">
              Opening hours not available
            </p>
          )}
        </div>

        {/* Restaurant Status */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mt-6 p-6 md:p-8">

          <h3 className="text-lg font-bold text-gray-900">
            Restaurant Status
          </h3>

          <div className="mt-4 flex items-center justify-between">

            <div>
              <p className="font-semibold text-gray-800">
                Current Status
              </p>

              <p className="text-sm text-gray-500 mt-1">
                Customers can see whether your restaurant is open.
              </p>
            </div>

            <div
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                restaurant.isOpen
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {restaurant.isOpen ? "OPEN" : "CLOSED"}
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}

/* Reusable Info Card */

function InfoCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value?: string;
}) {
  return (
    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">

      <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-500 flex items-center justify-center">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs text-gray-400 uppercase tracking-wide">
          {title}
        </p>

        <p className="font-semibold text-gray-800 mt-1 truncate">
          {value || "Not available"}
        </p>
      </div>

    </div>
  );
}