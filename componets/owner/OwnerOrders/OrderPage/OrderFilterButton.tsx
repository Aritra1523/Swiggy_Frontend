import { LucideIcon } from "lucide-react";
import { FilterValue, ColorKey, colorConfig } from "./orderFilters";

interface OrderFilterButtonProps {
  value: FilterValue;
  label: string;
  icon: LucideIcon;
  color: ColorKey;
  count: number;
  isActive: boolean;
  onClick: () => void;
}

export function OrderFilterButton({
  value,
  label,
  icon: Icon,
  color,
  count,
  isActive,
  onClick,
}: OrderFilterButtonProps) {
  const colors = colorConfig[color];

  return (
    <button
      onClick={onClick}
      className={`
        relative group flex flex-col items-center justify-center
        p-3 rounded-xl border-2 transition-all duration-200
        ${isActive 
          ? `${colors.activeBg} ${colors.activeBorder} ${colors.activeText} shadow-lg scale-[1.02]` 
          : `bg-white ${colors.border} ${colors.text} hover:${colors.hoverBg} hover:scale-[1.02]`
        }
      `}
    >
      {/* Status Indicator Dot for active state */}
      {isActive && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full border-2 border-current" />
      )}

      {/* Icon */}
      <div className={`
        p-1.5 rounded-lg transition-all duration-200
        ${isActive 
          ? `${colors.activeIconBg} bg-opacity-30` 
          : `${colors.iconBg} group-hover:${colors.hoverBg}`
        }
      `}>
        <Icon className={`
          w-5 h-5 transition-all duration-200
          ${isActive ? "text-white" : `${colors.text} group-hover:${colors.hoverText}`}
        `} />
      </div>

      {/* Label - Always visible with good contrast */}
      <span className={`
        text-xs font-semibold mt-1.5 transition-colors duration-200
        ${isActive ? "text-white" : `${colors.text} group-hover:${colors.hoverText}`}
      `}>
        {label}
      </span>

      {/* Count Badge */}
      <span className={`
        text-xs font-bold px-2 py-0.5 rounded-full mt-0.5 transition-all duration-200
        ${isActive 
          ? "bg-white text-gray-900" 
          : `${colors.badgeBg} ${colors.badgeText} group-hover:${colors.hoverText}`
        }
      `}>
        {count}
      </span>

      {/* Subtle hover glow effect */}
      {!isActive && (
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-200 bg-current" />
      )}
    </button>
  );
}