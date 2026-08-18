// components/owner/FormComponents.tsx
"use client";

import { useRef } from "react";
import { ImagePlus, X, AlertCircle, ChevronDown } from "lucide-react";

// Image Upload
export const ImageUpload = ({
  imagePreview,
  onImageChange,
  onImageRemove,
  error,
}: any) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
        Food Image{" "}
        <span className="text-gray-400 font-normal ml-1">(optional)</span>
      </label>
      <div className="relative">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={onImageChange}
          className="hidden"
        />
        {imagePreview ? (
          <div className="relative group">
            <div className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-gray-200 shadow-sm">
              <img
                src={imagePreview}
                alt="Food preview"
                className="w-full h-full object-cover"
              />
            </div>
            <button
              type="button"
              onClick={onImageRemove}
              className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/60 backdrop-blur-sm text-white text-xs font-medium rounded-lg hover:bg-black/80 opacity-0 group-hover:opacity-100"
            >
              Change
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-32 h-32 rounded-2xl border-2 border-dashed border-gray-300 hover:border-orange-400 hover:bg-orange-50 transition-all flex flex-col items-center justify-center group"
          >
            <div className="w-12 h-12 rounded-full bg-gray-50 group-hover:bg-orange-100 flex items-center justify-center">
              <ImagePlus className="w-5 h-5 text-gray-400 group-hover:text-orange-500" />
            </div>
            <span className="text-xs text-gray-400 mt-2 group-hover:text-orange-500">
              Upload Photo
            </span>
          </button>
        )}
      </div>
      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          {error}
        </p>
      )}
    </div>
  );
};

// Form Field
export const FormField = ({
  label,
  error,
  required,
  icon: Icon,
  children,
  helper,
}: any) => (
  <div className="space-y-1.5">
    <label className="block text-sm font-semibold text-gray-700">
      {label}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
    <div className="relative">
      {Icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <Icon className="w-4 h-4" />
        </div>
      )}
      {children}
    </div>
    {helper && <p className="text-xs text-gray-400">{helper}</p>}
    {error && (
      <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
        <AlertCircle className="w-3 h-3" />
        {error}
      </p>
    )}
  </div>
);

// Toggle Switch
export const ToggleSwitch = ({
  label,
  description,
  checked,
  onChange,
}: any) => (
  <label className="flex items-start gap-3 cursor-pointer group">
    <div className="relative">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <div
        className={`w-11 h-6 rounded-full transition-colors ${checked ? "bg-orange-500" : "bg-gray-300"}`}
      >
        <div
          className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${checked ? "translate-x-5" : "translate-x-0.5"}`}
        />
      </div>
    </div>
    <div>
      <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
        {label}
      </span>
      {description && <p className="text-xs text-gray-400">{description}</p>}
    </div>
  </label>
);
