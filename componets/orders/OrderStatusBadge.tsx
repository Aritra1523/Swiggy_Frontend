// import { Clock } from "lucide-react";
// import { statusConfig } from "./orderConstants";
// type OrderStatus = keyof typeof statusConfig;
// interface OrderStatusBadgeProps { status: string; }
// export default function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
//   const config = statusConfig[[status as OrderStatus]] || {
//     icon: Clock,
//     color: "bg-gray-50 text-gray-700 border-gray-100",
//     label: status.replaceAll("_", " "),
//   };
  
//   const StatusIcon = config.icon;

//   return (
//     <div
//       className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold border ${config.color}`}
//     >
//       <StatusIcon className="w-4 h-4" />
//       {config.label}
//     </div>
//   );
// }
import { Clock } from "lucide-react";
import { statusConfig } from "./orderConstants";

type OrderStatus = keyof typeof statusConfig;

interface OrderStatusBadgeProps {
  status: string;
}

export default function OrderStatusBadge({
  status,
}: OrderStatusBadgeProps) {
  const config = statusConfig[status as OrderStatus] || {
    icon: Clock,
    color: "bg-gray-50 text-gray-700 border-gray-100",
    label: status.replaceAll("_", " "),
  };

  const StatusIcon = config.icon;

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold border ${config.color}`}
    >
      <StatusIcon className="w-4 h-4" />
      {config.label}
    </div>
  );
}