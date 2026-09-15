// import { IndianRupee } from "lucide-react";
// import { OrderStatusBadge } from "./OrderStatusBadge";
// import { OrderActions } from "./OrderActions";
// import type {
//   OwnerOrder,
//   OwnerOrderItem,
// } from "@/typescript/restaurantOwner/restaurantOwner";

// interface OrderCardProps {
//   order: OwnerOrder;
// }

// export function OrderCard({ order }: OrderCardProps) {
//   const currentStatus = order.status;

//   const isFinished =
//     currentStatus === "delivered" || currentStatus === "cancelled";

//   // Calculate item total
//   const getItemTotal = (item: OwnerOrderItem) => {
//     const price =
//       item.food?.price ||
//       item.basePrice ||
//       0;

//     return price * item.quantity;
//   };

//   return (
//     <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-5">
//       {/* HEADER */}
//       <div className="flex items-start justify-between mb-3">
//         <div>
//           <p className="text-sm font-semibold text-gray-900">
//             #{order._id.slice(-6).toUpperCase()}
//           </p>

//           <p className="text-xs text-gray-500 mt-0.5">
//             {new Date(order.createdAt).toLocaleString("en-IN")}
//           </p>
//         </div>

//         <OrderStatusBadge status={currentStatus} />
//       </div>

//       {/* ITEMS */}
//       <div className="space-y-1 mb-3">
//         {/* {order.items.map((item) => (
//           <div
//             key={item.food._id}
//             className="flex items-center justify-between text-sm text-gray-600"
//           >
//             <span>
//               {item.quantity}×{" "}
//               {item.food?.itemName || "Food item unavailable"}
//             </span>

//             <span className="font-medium">
//               ₹{getItemTotal(item)}
//             </span>
//           </div>
//         ))} */}
//         {order.items.map((item) => (
//   <div
//     key={item._id}   
//     className="flex items-center justify-between text-sm text-gray-600"
//   >
//     <span>
//       {item.quantity}×{" "}
//       {item.food?.itemName || "Item no longer available"}
//     </span>
//     <span className="font-medium">
//       ₹{getItemTotal(item)}
//     </span>
//   </div>
// ))}
//       </div>

//       {/* FOOTER */}
//       <div className="flex items-center justify-between pt-3 border-t border-gray-100">
//         <span className="inline-flex items-center gap-1 text-sm font-bold text-gray-900">
//           <IndianRupee className="w-3.5 h-3.5" />
//           {order.totalAmount}
//         </span>

//         <OrderActions
//           order={order}
//           currentStatus={currentStatus}
//           isFinished={isFinished}
//         />
//       </div>
//     </div>
//   );
// }


import { IndianRupee } from "lucide-react";
import { OrderStatusBadge } from "./OrderStatusBadge";
import { OrderActions } from "./OrderActions";
import type {
  OwnerOrder,
  OwnerOrderItem,
} from "@/typescript/restaurantOwner/restaurantOwner";
 
interface OrderCardProps {
  order: OwnerOrder;
}
 
export function OrderCard({ order }: OrderCardProps) {
  const currentStatus = order.status;
 
 
  const isFinished =
    currentStatus === "delivered" ||
    currentStatus === "cancelled" ||
    currentStatus === "ready" ||
    currentStatus === "out_for_delivery";
 
  // Calculate item total
  const getItemTotal = (item: OwnerOrderItem) => {
    const price =
      item.food?.price ||
      item.basePrice ||
      0;
 
    return price * item.quantity;
  };
 
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-5">
      {/* HEADER */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-sm font-semibold text-gray-900">
            #{order._id.slice(-6).toUpperCase()}
          </p>
 
          <p className="text-xs text-gray-500 mt-0.5">
            {new Date(order.createdAt).toLocaleString("en-IN")}
          </p>
        </div>
 
        <OrderStatusBadge status={currentStatus} />
      </div>
 
      {/* ITEMS */}
      <div className="space-y-1 mb-3">
      
        {order.items.map((item) => (
  <div
    key={item._id}   
    className="flex items-center justify-between text-sm text-gray-600"
  >
    <span>
      {item.quantity}×{" "}
      {item.food?.itemName || "Item no longer available"}
    </span>
    <span className="font-medium">
      ₹{getItemTotal(item)}
    </span>
  </div>
))}
      </div>
 
      {/* FOOTER */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <span className="inline-flex items-center gap-1 text-sm font-bold text-gray-900">
          <IndianRupee className="w-3.5 h-3.5" />
          {order.totalAmount}
        </span>
 
        <OrderActions
          order={order}
          currentStatus={currentStatus}
          isFinished={isFinished}
        />
      </div>
    </div>
  );
}