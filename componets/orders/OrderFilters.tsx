// import { Filter } from "lucide-react";
// import { STATUS_FILTERS } from "./orderConstants";

// export default function OrderFilters({ activeFilter, setActiveFilter }) {
//   return (
//     <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6">
//       <Filter className="w-4 h-4 text-gray-400 shrink-0" />
//       {STATUS_FILTERS.map((status) => (
//         <button
//           key={status}
//           onClick={() => setActiveFilter(status)}
//           className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
//             activeFilter === status
//               ? "bg-orange-500 text-white"
//               : "bg-white text-gray-600 hover:bg-gray-100"
//           }`}
//         >
//           {status === "all" ? "All Orders" : status.replaceAll("_", " ")}
//         </button>
//       ))}
//     </div>
//   );
// }
import { Filter } from "lucide-react";
import { STATUS_FILTERS } from "./orderConstants";

type StatusFilter = (typeof STATUS_FILTERS)[number];

interface OrderFiltersProps {
  activeFilter: StatusFilter;
  setActiveFilter: (status: StatusFilter) => void;
}

export default function OrderFilters({
  activeFilter,
  setActiveFilter,
}: OrderFiltersProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6">
      <Filter className="w-4 h-4 text-gray-400 shrink-0" />

      {STATUS_FILTERS.map((status) => (
        <button
          key={status}
          onClick={() => setActiveFilter(status)}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
            activeFilter === status
              ? "bg-orange-500 text-white"
              : "bg-white text-gray-600 hover:bg-gray-100"
          }`}
        >
          {status === "all" ? "All Orders" : status.replaceAll("_", " ")}
        </button>
      ))}
    </div>
  );
}