interface Section {
  id: string;
  title: string;
  required: boolean;
  content: React.ReactNode;
}

interface Props {
  section: Section;
  isExpanded: boolean;
  isPermissionGranted: boolean;
  toggleSection: (section: string) => void;
  togglePermission: (section: string) => void;
}

export default function ContractSectionItem({
  section,
  isExpanded,
  isPermissionGranted,
  toggleSection,
  togglePermission,
}: Props) {
  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden">
      {/* Section Header */}
      <button
        type="button"
        onClick={() => toggleSection(section.id)}
        className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-base font-semibold text-slate-800">{section.title}</span>
          {section.required ? (
            <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-700">
              Required
            </span>
          ) : (
            <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
              Optional
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {/* Permission Toggle */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              togglePermission(section.id);
            }}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              isPermissionGranted ? "bg-emerald-500" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isPermissionGranted ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
          <svg
            className={`w-5 h-5 text-slate-400 transition-transform ${
              isExpanded ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Section Content */}
      {isExpanded && (
        <div className="px-4 pb-4">
          <div className="border-t border-slate-100 pt-4">{section.content}</div>
        </div>
      )}
    </div>
  );
}