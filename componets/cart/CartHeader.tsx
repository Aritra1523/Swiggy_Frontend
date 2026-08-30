import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface CartHeaderProps {
  totalItems: number;
  grandTotal: number;
}

export const CartHeader = ({ totalItems, grandTotal }: CartHeaderProps) => {
  return (
    <div className="sticky top-0 z-10 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">{totalItems} items</span>
            <div className="h-6 w-px bg-gray-200" />
            <span className="text-sm font-semibold text-orange-500">
              ₹{grandTotal}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};