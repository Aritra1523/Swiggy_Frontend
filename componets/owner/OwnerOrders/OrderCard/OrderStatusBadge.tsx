import { Clock } from "lucide-react";
import { STATUS_CONFIG } from "./orderConstants";

export function OrderStatusBadge({ status }) {
  const config = STATUS_CONFIG[status] ?? {
    icon: Clock,
    color: "bg-gray-50 text-gray-700 border-gray-200",
    label: status.replaceAll("_", " "),
  };

  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${config.color}`}
    >
      <Icon className="w-3.5 h-3.5" />
      {config.label}
    </span>
  );
}