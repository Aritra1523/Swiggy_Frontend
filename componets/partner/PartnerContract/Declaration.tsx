// import { FieldErrors, UseFormRegister } from "react-hook-form";

// interface Props {
//   register: UseFormRegister<any>;
//   errors: FieldErrors;
//   allPermissionsGranted: boolean;
// }

// export default function Declaration({ register, errors, allPermissionsGranted }: Props) {
//   return (
//     <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
//       <div className="flex items-start gap-3">
//         <input
//           type="checkbox"
//           {...register("declarationAccepted")}
//           disabled={!allPermissionsGranted}
//           className="mt-1 w-4 h-4 text-orange-500 border-slate-300 rounded focus:ring-orange-400 disabled:opacity-50"
//         />
//         <div>
//           <label
//             className={`text-sm font-medium ${
//               allPermissionsGranted ? "text-slate-700" : "text-slate-400"
//             }`}
//           >
//             I accept all terms and conditions
//           </label>
//           <p className="text-xs text-slate-500 mt-0.5">
//             {allPermissionsGranted
//               ? "By accepting, you agree to the partnership terms, commission structure, and code of conduct."
//               : "Please review and accept all required sections before signing."}
//           </p>
//         </div>
//       </div>
//       <p className="text-red-500 text-xs mt-2 ml-7">{errors.declarationAccepted?.message}</p>
      
//     </div>
//   );
// }


import { FieldErrors, UseFormRegister, FieldValues, Path } from "react-hook-form";

// Make the component generic to accept any form values type
interface Props<TFieldValues extends FieldValues = FieldValues> {
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  allPermissionsGranted: boolean;
}

export default function Declaration<TFieldValues extends FieldValues = FieldValues>({
  register,
  errors,
  allPermissionsGranted,
}: Props<TFieldValues>) {
  // Type-safe error message extraction
  const declarationError = errors.declarationAccepted?.message as string | undefined;

  return (
    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
      <div className="flex items-start gap-3">
        <input
          id="declarationAccepted"
          type="checkbox"
          {...register("declarationAccepted" as Path<TFieldValues>)}
          disabled={!allPermissionsGranted}
          className="mt-1 w-4 h-4 text-orange-500 border-slate-300 rounded focus:ring-orange-400 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          aria-describedby={declarationError ? "declaration-error" : undefined}
          aria-invalid={!!declarationError}
        />

        <div>
          <label
            htmlFor="declarationAccepted"
            className={`text-sm font-medium ${
              allPermissionsGranted ? "text-slate-700" : "text-slate-400"
            } cursor-pointer ${!allPermissionsGranted ? "cursor-not-allowed" : ""}`}
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

      {declarationError && (
        <p id="declaration-error" className="text-red-500 text-xs mt-2 ml-7">
          {declarationError}
        </p>
      )}
    </div>
  );
}