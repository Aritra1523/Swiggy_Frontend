"use client";

import { Loader2 } from "lucide-react";

interface PartnerCardProps {
  emoji: string;
  title: string;
  description: string;
  cta: string;
  loading?: boolean;
  disabled?: boolean;
  onClick: () => void;
}

export default function PartnerCard({
  emoji,
  title,
  description,
  cta,
  loading = false,
  disabled = false,
  onClick,
}: PartnerCardProps) {
  return (
    <div className="group flex flex-col bg-white border-2 border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-orange-300 transition-all duration-300">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center border border-orange-100 group-hover:scale-105 transition-transform duration-300">
        <span className="text-3xl" aria-hidden="true">
          {emoji}
        </span>
      </div>

      <h2 className="mt-5 text-xl sm:text-2xl font-bold text-gray-900">
        {title}
      </h2>

      <p className="mt-2 text-sm sm:text-base text-gray-500 leading-relaxed flex-1">
        {description}
      </p>

      <button
        type="button"
        onClick={onClick}
        disabled={disabled || loading}
        className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm sm:text-base font-semibold text-white hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-500/25 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200"
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {loading ? "Checking..." : cta}
      </button>
    </div>
  );
}