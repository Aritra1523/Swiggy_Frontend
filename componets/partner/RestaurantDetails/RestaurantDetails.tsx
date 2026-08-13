
"use client";

import useRestaurantDetails from "@/customHooks/partner/useRestaurantDetails";
import { useState } from "react";

interface Props {
  next: () => void;
}

export default function RestaurantDetails({ next }: Props) {
  const { register, handleSubmit, errors, isSubmitting, setValue, watch } =
    useRestaurantDetails(next);
  
  const [sameForAllDays, setSameForAllDays] = useState(true);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const daysOfWeek = [
    { value: "monday", label: "Monday" },
    { value: "tuesday", label: "Tuesday" },
    { value: "wednesday", label: "Wednesday" },
    { value: "thursday", label: "Thursday" },
    { value: "friday", label: "Friday" },
    { value: "saturday", label: "Saturday" },
    { value: "sunday", label: "Sunday" },
  ];

  const handleDayToggle = (day: string) => {
    const updated = selectedDays.includes(day)
      ? selectedDays.filter((d) => d !== day)
      : [...selectedDays, day];
    setSelectedDays(updated);
    setValue("workingDays", updated);
  };

  return (
    <div className="animate-fadeIn">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Restaurant Details</h1>
        <p className="text-slate-500 text-sm mt-1">Tell us about your restaurant to get started</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">Owner Name *</label>
            <input
              {...register("ownerName")}
              placeholder="e.g. John Doe"
              className="input w-full"
            />
            <p className="text-red-500 text-xs mt-1">{errors.ownerName?.message}</p>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">Restaurant Name *</label>
            <input
              {...register("restaurantName")}
              placeholder="e.g. The Spice Garden"
              className="input w-full"
            />
            <p className="text-red-500 text-xs mt-1">{errors.restaurantName?.message}</p>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">Location *</label>
            <input
              {...register("location")}
              placeholder="Street, City, State, Pincode"
              className="input w-full"
            />
            <p className="text-red-500 text-xs mt-1">{errors.location?.message}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address *</label>
            <input
              {...register("email")}
              type="email"
              placeholder="restaurant@example.com"
              className="input w-full"
            />
            <p className="text-red-500 text-xs mt-1">{errors.email?.message}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number *</label>
            <input
              {...register("phone")}
              placeholder="e.g. +919876543210"
              className="input w-full"
            />
            <p className="text-red-500 text-xs mt-1">{errors.phone?.message}</p>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">WhatsApp Number *</label>
            <input
              {...register("whatsappNumber")}
              placeholder="e.g. +919876543210"
              className="input w-full"
            />
            <p className="text-red-500 text-xs mt-1">{errors.whatsappNumber?.message}</p>
          </div>
        </div>

        {/* Working Days Section */}
        <div className="border-t border-slate-200 pt-6 mt-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Working Days & Hours</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">Select Working Days *</label>
            <div className="flex flex-wrap gap-2">
              {daysOfWeek.map((day) => (
                <button
                  key={day.value}
                  type="button"
                  onClick={() => handleDayToggle(day.value)}
                  className={`
                    px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                    ${selectedDays.includes(day.value)
                      ? "bg-orange-500 text-white shadow-md shadow-orange-200"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }
                  `}
                >
                  {day.label}
                </button>
              ))}
            </div>
            <p className="text-red-500 text-xs mt-1">{errors.workingDays?.message}</p>
          </div>

          {/* Opening/Closing Times */}
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <input
                type="checkbox"
                id="sameForAllDays"
                checked={sameForAllDays}
                onChange={(e) => {
                  setSameForAllDays(e.target.checked);
                  setValue("openingClosing.sameForAllDays", e.target.checked);
                }}
                className="w-4 h-4 text-orange-500 border-slate-300 rounded focus:ring-orange-400"
              />
              <label htmlFor="sameForAllDays" className="text-sm font-medium text-slate-700">
                Same timings for all working days
              </label>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex-1 min-w-[150px]">
                  <label className="block text-xs font-medium text-slate-600 mb-1">Open Time</label>
                  <input
                    {...register("openingClosing.slots.0.open")}
                    type="time"
                    className="input w-full"
                    defaultValue="10:00"
                  />
                </div>
                <div className="flex-1 min-w-[150px]">
                  <label className="block text-xs font-medium text-slate-600 mb-1">Close Time</label>
                  <input
                    {...register("openingClosing.slots.0.close")}
                    type="time"
                    className="input w-full"
                    defaultValue="22:00"
                  />
                </div>
              </div>
              <p className="text-red-500 text-xs">{errors.openingClosing?.slots?.[0]?.open?.message}</p>
              <p className="text-red-500 text-xs">{errors.openingClosing?.slots?.[0]?.close?.message}</p>
            </div>

            {!sameForAllDays && (
              <div className="mt-4 text-sm text-slate-500 bg-white p-3 rounded-lg border border-slate-200">
                <p className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  You can set different timings for each day in the next step
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-medium shadow-lg shadow-orange-200 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100 flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              <>
                Next Step
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}