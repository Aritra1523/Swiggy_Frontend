// components/OrderSummary.tsx
import { CreditCard, Bike, ChevronRight } from "lucide-react";
import { BillDetails } from "@/typescript/cartTypes/cartTypes";
import { isFreeDelivery } from "./cartUtils";

interface OrderSummaryProps {
  billDetails: BillDetails;
  isCheckingOut: boolean;
  itemsCount: number;
  onCheckout: () => void;
}

export const OrderSummary = ({
  billDetails,
  isCheckingOut,
  itemsCount,
  onCheckout,
}: OrderSummaryProps) => {
  const {
    totalItems,
    totalPrice,
    deliveryFee,
    platformFee,
    gst,
    grandTotal,
  } = billDetails;

  const freeDelivery = isFreeDelivery(totalPrice);

  return (
    <div className="lg:col-span-1">
      <div className="sticky top-24">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h2 className="text-xl font-bold mb-5 flex items-center gap-2 text-gray-800">
            <CreditCard className="w-5 h-5 text-orange-500" />
            Bill Details
          </h2>

          <div className="space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Items ({totalItems})</span>
              <span>₹{totalPrice}</span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span className="flex items-center gap-1">
                <Bike className="w-4 h-4" />
                Delivery Fee
              </span>
              <span>
                {freeDelivery ? (
                  <span className="text-green-600 font-semibold">FREE</span>
                ) : (
                  `₹${deliveryFee}`
                )}
              </span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Platform Fee</span>
              <span>₹{platformFee}</span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>GST (5%)</span>
              <span>₹{gst}</span>
            </div>

            {freeDelivery && (
              <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-2 rounded-lg text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Free delivery on orders above ₹200</span>
              </div>
            )}
          </div>

          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between text-lg font-bold">
              <span className="text-black">Grand Total</span>
              <span className="text-orange-500">₹{grandTotal}</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Inclusive of all taxes and charges
            </p>
          </div>

          <button
            onClick={onCheckout}
            disabled={isCheckingOut || itemsCount === 0}
            className="w-full mt-6 py-3.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-bold shadow-lg shadow-orange-500/25 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isCheckingOut ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Proceed to Checkout
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </button>

          <p className="text-xs text-center text-gray-400 mt-3">
            By proceeding, you agree to our Terms & Conditions
          </p>
        </div>
      </div>
    </div>
  );
};