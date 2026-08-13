import { FieldErrors, UseFormRegister } from "react-hook-form";

interface Props {
  register: UseFormRegister<any>;
  errors: FieldErrors;
}

export default function SignatoryDetails({ register, errors }: Props) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
        <h2 className="text-lg font-semibold text-slate-800">Signatory Details</h2>
        <p className="text-sm text-slate-500">Please provide your details to complete the contract</p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
            <input
              {...register("fullName")}
              placeholder="e.g. John Doe"
              className="input w-full"
            />
            <p className="text-red-500 text-xs mt-1">{errors.fullName?.message}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Designation *</label>
            <input
              {...register("designation")}
              placeholder="e.g. Owner, Manager"
              className="input w-full"
            />
            <p className="text-red-500 text-xs mt-1">{errors.designation?.message}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Date *</label>
            <input type="date" {...register("date")} className="input w-full" />
            <p className="text-red-500 text-xs mt-1">{errors.date?.message}</p>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">Place *</label>
            <input
              {...register("place")}
              placeholder="e.g. Mumbai, Maharashtra"
              className="input w-full"
            />
            <p className="text-red-500 text-xs mt-1">{errors.place?.message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}