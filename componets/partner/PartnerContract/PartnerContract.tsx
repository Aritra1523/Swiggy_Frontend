"use client";

import usePartnerContract from "@/customHooks/partner/usePartnerContract";
import { useState } from "react";
import ContractSections from "./ContractSections";
import SignatoryDetails from "./SignatoryDetails";
import Declaration from "./Declaration";
import FormActions from "./FormActions";

interface Props {
  back: () => void;
}

export default function PartnerContract({ back }: Props) {
  const { register, handleSubmit, errors, isSubmitting } = usePartnerContract();
  const [expandedSection, setExpandedSection] = useState<string | null>("termsOfService");
  const [permissions, setPermissions] = useState<Record<string, boolean>>({
    termsOfService: false,
    commissionPayment: false,
    operationalGuidelines: false,
    intellectualProperty: false,
    privacyData: false,
    terminationPolicy: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const togglePermission = (section: string) => {
    setPermissions((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const allPermissionsGranted = Object.values(permissions).every((val) => val === true);

  return (
    <div className="animate-fadeIn">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Partner Contract</h1>
        <p className="text-slate-500 text-sm mt-1">Review and accept the partnership agreement</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <ContractSections
          expandedSection={expandedSection}
          permissions={permissions}
          toggleSection={toggleSection}
          togglePermission={togglePermission}
        />

        <SignatoryDetails register={register} errors={errors} />

        <Declaration
          register={register}
          errors={errors}
          allPermissionsGranted={allPermissionsGranted}
        />

        <FormActions
          back={back}
          isSubmitting={isSubmitting}
          allPermissionsGranted={allPermissionsGranted}
        />
      </form>
    </div>
  );
}