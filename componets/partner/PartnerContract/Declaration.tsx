import { FieldErrors, UseFormRegister } from "react-hook-form";

interface Props {
  register: UseFormRegister<any>;
  errors: FieldErrors;
  allPermissionsGranted: boolean;
}

export default function Declaration({ register, errors, allPermissionsGranted }: Props) {
  return (
    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          {...register("declarationAccepted")}
          disabled={!allPermissionsGranted}
          className="mt-1 w-4 h-4 text-orange-500 border-slate-300 rounded focus:ring-orange-400 disabled:opacity-50"
        />
        <div>
          <label
            className={`text-sm font-medium ${
              allPermissionsGranted ? "text-slate-700" : "text-slate-400"
            }`}
          >
            I accept all terms and conditions
          </label>
          <p className="text-xs text-slate-500 mt-0.5">
            {allPermissionsGranted
              ? "By accepting, you agree to the partnership terms, commission structure, and code of conduct."
              : "Please review and accept all required sections before signing."}
          </p>
        </div>
      </div>
      <p className="text-red-500 text-xs mt-2 ml-7">{errors.declarationAccepted?.message}</p>
      
    </div>
  );
}