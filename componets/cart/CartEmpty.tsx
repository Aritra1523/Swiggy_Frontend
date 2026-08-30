import Link from "next/link";
import { ShoppingBag, ArrowLeft } from "lucide-react";

export const CartEmpty = () => {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="relative w-48 h-48 mx-auto mb-6">
          <div className="absolute inset-0 bg-orange-100 rounded-full scale-110" />
          <div className="relative flex items-center justify-center h-full">
            <ShoppingBag className="w-24 h-24 text-orange-500" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Your cart is empty
        </h1>
        <p className="text-gray-500 mb-6">
          Looks like you haven&apos;t added any items yet.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Browse Restaurants
        </Link>
      </div>
    </main>
  );
};