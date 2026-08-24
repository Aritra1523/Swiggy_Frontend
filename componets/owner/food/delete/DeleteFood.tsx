"use client";

import { useEffect, useRef } from "react";
import { useDeleteFood } from "@/customHooks/owner/useFoodManagement";
import { Trash2, AlertTriangle, X, Utensils, Loader2 } from "lucide-react";

interface DeleteFoodModalProps {
  foodId: string;
  foodName: string;
  onClose: () => void;
}

export default function DeleteFoodModal({
  foodId,
  foodName,
  onClose,
}: DeleteFoodModalProps) {
  const deleteFood = useDeleteFood();
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !deleteFood.isPending) {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target as Node) &&
        !deleteFood.isPending
      ) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);

    // Focus management
    if (closeButtonRef.current) {
      setTimeout(() => closeButtonRef.current?.focus(), 100);
    }

    // Prevent body scroll
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [onClose, deleteFood.isPending]);

  const handleDelete = () => {
    deleteFood.mutate(foodId, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 animate-in fade-in duration-200">
      {/* Modal Container */}
      <div
        ref={modalRef}
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-in slide-in-from-bottom-4 duration-300"
      >
        {/* Header with gradient accent */}
        <div className="relative">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-500 to-red-600" />
          
          <div className="pt-6 px-6 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center shrink-0 border border-red-100">
                <Trash2 className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Delete Item</h3>
                <p className="text-sm text-gray-500">This action cannot be undone</p>
              </div>
            </div>
            
            <button
              ref={closeButtonRef}
              onClick={onClose}
              disabled={deleteFood.isPending}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          {/* Warning Banner */}
          <div className="mt-4 p-4 bg-red-50 border border-red-100 rounded-2xl">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-red-800">
                  You are about to delete
                </p>
                <p className="text-sm text-red-700 font-medium mt-0.5">
                  &ldquo;{foodName}&rdquo;
                </p>
                <p className="text-xs text-red-600 mt-1">
                  This will permanently remove this item from your menu and all associated data.
                </p>
              </div>
            </div>
          </div>

          {/* Item Preview */}
          <div className="mt-4 p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <Utensils className="w-4 h-4 text-gray-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-700 truncate">{foodName}</p>
              <p className="text-xs text-gray-400">ID: {foodId.slice(0, 8)}...</p>
            </div>
            <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded-full">
              Will be deleted
            </span>
          </div>

          {/* Confirmation Actions */}
          <div className="mt-6 space-y-3">
            <button
              onClick={handleDelete}
              disabled={deleteFood.isPending}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
            >
              {deleteFood.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4" />
                  Yes, Delete Item
                </>
              )}
            </button>

            <button
              onClick={onClose}
              disabled={deleteFood.isPending}
              className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          </div>

          {/* Safety Note */}
          <p className="text-xs text-gray-400 text-center mt-4">
            This action is irreversible. Please confirm before proceeding.
          </p>
        </div>
      </div>
    </div>
  );
}