
// export const OrderSummary = ({
//   totalItems,
//   totalAmount,
//   address,
//   setAddress,
//   orderError,
//   placingOrder,
//   orderLoading,
//   onPlaceOrder,
// }) => (
//   <div className="lg:col-span-1">
//     <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
//       <h2 className="text-xl font-bold text-gray-900 mb-5">Order Summary</h2>

//       <div className="flex justify-between text-gray-600 mb-3">
//         <span>Items</span>
//         <span>{totalItems}</span>
//       </div>

//       <div className="flex justify-between text-gray-600 mb-3">
//         <span>Subtotal</span>
//         <span>₹{totalAmount}</span>
//       </div>

//       <div className="flex justify-between text-gray-600 mb-4">
//         <span>Delivery Fee</span>
//         <span className="text-green-600">Free</span>
//       </div>

//       <div className="border-t border-gray-200 pt-4">
//         <div className="flex justify-between text-lg font-bold text-gray-900">
//           <span>Total</span>
//           <span>₹{totalAmount}</span>
//         </div>
//       </div>

//       <div className="mt-6">
//         <textarea
//           value={address}
//           onChange={(e) => setAddress(e.target.value)}
//           placeholder="Enter your delivery address"
//           rows={4}
//           className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 resize-none transition-all placeholder-gray-600 text-black"
//         />
//         <p className="text-xs text-gray-400 mt-1">Minimum 5 characters</p>
//       </div>

//       {orderError && (
//         <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
//           {orderError}
//         </div>
//       )}

//       <button
//         onClick={onPlaceOrder}
//         disabled={placingOrder || orderLoading || address.trim().length < 5}
//         className="w-full mt-6 py-3.5 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-colors"
//       >
//         {placingOrder || orderLoading ? (
//           <span className="flex items-center justify-center gap-2">
//             <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
//             Placing Order...
//           </span>
//         ) : (
//           `Place Order • ₹${totalAmount}`
//         )}
//       </button>
//     </div>
//   </div>
// );

interface OrderSummaryProps {
  totalItems: number;
  totalAmount: number;
  address: string;
  setAddress: (value: string) => void;
  orderError: string | null;
  placingOrder: boolean;
  orderLoading: boolean;
  onPlaceOrder: () => void;
}

export const OrderSummary = ({
  totalItems,
  totalAmount,
  address,
  setAddress,
  orderError,
  placingOrder,
  orderLoading,
  onPlaceOrder,
}: OrderSummaryProps) => (
  <div className="lg:col-span-1">
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
      <h2 className="text-xl font-bold text-gray-900 mb-5">Order Summary</h2>

      <div className="flex justify-between text-gray-600 mb-3">
        <span>Items</span>
        <span>{totalItems}</span>
      </div>

      <div className="flex justify-between text-gray-600 mb-3">
        <span>Subtotal</span>
        <span>₹{totalAmount}</span>
      </div>

      <div className="flex justify-between text-gray-600 mb-4">
        <span>Delivery Fee</span>
        <span className="text-green-600">Free</span>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between text-lg font-bold text-gray-900">
          <span>Total</span>
          <span>₹{totalAmount}</span>
        </div>
      </div>

      <div className="mt-6">
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your delivery address"
          rows={4}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 resize-none transition-all placeholder-gray-600 text-black"
        />
        <p className="text-xs text-gray-400 mt-1">Minimum 5 characters</p>
      </div>

      {orderError && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
          {orderError}
        </div>
      )}

      <button
        onClick={onPlaceOrder}
        disabled={placingOrder || orderLoading || address.trim().length < 5}
        className="w-full mt-6 py-3.5 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-colors"
      >
        {placingOrder || orderLoading ? (
          <span className="flex items-center justify-center gap-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
            Placing Order...
          </span>
        ) : (
          `Place Order • ₹${totalAmount}`
        )}
      </button>
    </div>
  </div>
);