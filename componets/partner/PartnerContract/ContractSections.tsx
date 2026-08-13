import { sections } from "./contractData";
import ContractSectionItem from "./ContractSectionItem";

interface Props {
  expandedSection: string | null;
  permissions: Record<string, boolean>;
  toggleSection: (section: string) => void;
  togglePermission: (section: string) => void;
}

export default function ContractSections({
  expandedSection,
  permissions,
  toggleSection,
  togglePermission,
}: Props) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
        <h2 className="text-lg font-semibold text-slate-800">Review Contract Terms</h2>
        <p className="text-sm text-slate-500">
          Please read through each section carefully before signing. All required sections must be reviewed.
        </p>
      </div>

      <div className="p-6 space-y-4">
        {sections.map((section) => (
          <ContractSectionItem
            key={section.id}
            section={section}
            isExpanded={expandedSection === section.id}
            isPermissionGranted={permissions[section.id]}
            toggleSection={toggleSection}
            togglePermission={togglePermission}
          />
        ))}
      </div>
    </div>
  );
}