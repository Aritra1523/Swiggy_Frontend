import Swal from "sweetalert2";
import { useUpdateOrderStatus } from "@/customHooks/owner/useFoodManagement";
import { ORDER_STATUS_FLOW, NEXT_ACTION_LABEL, isValidTransition } from "./orderConstants";
import type { OwnerOrder } from "@/typescript/restaurantOwner/restaurantOwner";
interface OrderActionsProps {
  order: OwnerOrder;
  currentStatus: OwnerOrder["status"];
  isFinished: boolean;
}
import type { OrderStatus } from "./orderConstants";
export function OrderActions({ order, currentStatus, isFinished }: OrderActionsProps) {
  const { mutate: updateStatus, isPending } = useUpdateOrderStatus();
  const nextStatus = ORDER_STATUS_FLOW[currentStatus];

  const handleAdvance = () => {
    if (!nextStatus) return;
    updateStatus({
      id: order._id,
      status: nextStatus,
    });
  };

  const handleCancel = () => {
    if (!isValidTransition(currentStatus, "cancelled")) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "error",
        title: "Cannot Cancel Order",
        text: `Order cannot be cancelled in "${currentStatus}" status`,
        background: "#ffffff",
        iconColor: "#ef4444",
      });
      return;
    }

    Swal.fire({
      title: "Cancel Order?",
      text: `Are you sure you want to cancel this order? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Cancel Order",
      cancelButtonText: "Keep Order",
      reverseButtons: true,
      background: "#ffffff",
      customClass: {
        popup: "rounded-2xl",
        title: "text-xl font-bold text-gray-900",
        htmlContainer: "text-gray-600",
        confirmButton: "px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-all duration-200",
        cancelButton: "px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-200",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Cancelling Order...",
          text: "Please wait while we process your request",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        updateStatus({
          id: order._id,
          status: "cancelled",
        });

        Swal.fire({
          icon: "success",
          title: "Order Cancelled",
          text: "Your order has been cancelled successfully",
          timer: 2000,
          showConfirmButton: false,
          customClass: {
            popup: "rounded-2xl",
          },
        });
      }
    });
  };

  if (isFinished) return null;

  return (
    <div className="flex items-center gap-2">
      {nextStatus && (
  <button
    onClick={handleAdvance}
    disabled={isPending}
    className="px-3 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-sm hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
  >
    {isPending
      ? "Updating..."
      : NEXT_ACTION_LABEL[currentStatus as Exclude<OrderStatus, "delivered" | "cancelled">]}
  </button>
)}

      {isValidTransition(currentStatus, "cancelled") && (
        <button
          onClick={handleCancel}
          disabled={isPending}
          className="px-3 py-1.5 text-sm font-medium text-red-600 border border-red-200 rounded-xl hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
      )}
    </div>
  );
}