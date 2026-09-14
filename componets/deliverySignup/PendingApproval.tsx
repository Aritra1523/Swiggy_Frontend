"use client";

import Link from "next/link";

export default function PendingApproval() {
  return (
    <div className="animate-fadeIn text-center py-10">
      <div className="mx-auto w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-6">
        <svg
          className="w-8 h-8 text-emerald-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <h1 className="text-2xl font-bold text-slate-800 mb-2">
        Application Submitted!
      </h1>
      <p className="text-slate-500 max-w-md mx-auto mb-8">
        Your delivery partner application is under review. We'll notify you by
        email once it's approved — usually within 24-48 hours.
      </p>

      <Link
        href="/"
        className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-medium shadow-lg shadow-orange-200 transition-all duration-300"
      >
        Back to Home
      </Link>
    </div>
  );
}