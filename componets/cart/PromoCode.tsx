import { Tag } from "lucide-react";

export const PromoCode = () => {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-center gap-3">
        <Tag className="w-5 h-5 text-orange-500" />
        <input
          type="text"
          placeholder="Apply promo code"
          className="flex-1 bg-transparent border-none outline-none text-sm placeholder-gray-400"
        />
        <button className="px-4 py-2 text-sm font-semibold text-orange-500 hover:bg-orange-50 rounded-lg transition-colors">
          Apply
        </button>
      </div>
    </div>
  );
};