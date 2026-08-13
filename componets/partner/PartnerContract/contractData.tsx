export const sections = [
  {
    id: "termsOfService",
    title: "Terms of Service",
    required: true,
    content: (
      <>
        <p className="text-sm text-slate-600 leading-relaxed">
          This Restaurant Partner Agreement ("Agreement") is entered into between <strong>Aritra Technologies Pvt. Ltd.</strong> operating as Swiggy ("Swiggy"), and the Restaurant Partner named in the onboarding form ("Partner").
        </p>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
          By completing the onboarding process, the Partner agrees to list their restaurant on the Swiggy platform and fulfill orders placed by consumers through the app and website. This is a <strong>non-exclusive agreement</strong> — the Partner may operate on other platforms simultaneously.
        </p>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
          The Partner acknowledges that Swiggy operates as a technology intermediary and marketplace, and does not take ownership of food items at any point in the fulfillment process.
        </p>
      </>
    ),
  },
  {
    id: "commissionPayment",
    title: "Commission & Payment Terms",
    required: true,
    content: (
      <>
        <p className="text-sm text-slate-600 leading-relaxed">
          Swiggy shall charge a commission fee on each order placed through the platform. The commission structure is as follows:
        </p>
        <ul className="mt-2 space-y-1 text-sm text-slate-600 list-disc list-inside">
          <li>Commission rate: <strong>15-25%</strong> of the order value (based on category and location)</li>
          <li>Payment settlement: Weekly settlements every <strong>Wednesday</strong></li>
          <li>Payment method: Bank transfer to the registered bank account</li>
          <li>GST and TDS will be deducted as applicable by law</li>
        </ul>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
          The Partner shall receive payments after deduction of applicable commissions, taxes, and charges. Swiggy reserves the right to modify the commission structure with prior notice.
        </p>
      </>
    ),
  },
  {
    id: "operationalGuidelines",
    title: "Operational Guidelines",
    required: true,
    content: (
      <>
        <p className="text-sm text-slate-600 leading-relaxed">
          The Partner agrees to comply with the following operational standards:
        </p>
        <ul className="mt-2 space-y-1 text-sm text-slate-600 list-disc list-inside">
          <li>Accept and fulfill orders within <strong>5 minutes</strong> of receiving them</li>
          <li>Ensure order readiness within the promised delivery time</li>
          <li>Maintain minimum hygiene and food safety standards</li>
          <li>Use Swiggy-approved packaging materials</li>
          <li>Maintain real-time inventory updates on the platform</li>
        </ul>
      </>
    ),
  },
  {
    id: "intellectualProperty",
    title: "Intellectual Property",
    required: false,
    content: (
      <>
        <p className="text-sm text-slate-600 leading-relaxed">
          The Partner grants Swiggy a non-exclusive, royalty-free license to use the Partner's name, logo, and menu items for promotional purposes on the platform. All intellectual property rights remain with the respective owners.
        </p>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
          The Partner retains all rights to their recipes, branding, and proprietary information. Swiggy shall not claim ownership over any intellectual property of the Partner.
        </p>
      </>
    ),
  },
  {
    id: "privacyData",
    title: "Privacy & Data Policy",
    required: true,
    content: (
      <>
        <p className="text-sm text-slate-600 leading-relaxed">
          Swiggy collects and processes Partner data in compliance with applicable data protection laws. Partner information shall be used only for operational, analytical, and communication purposes.
        </p>
        <ul className="mt-2 space-y-1 text-sm text-slate-600 list-disc list-inside">
          <li>Customer data shall not be used for any purpose outside of order fulfillment</li>
          <li>Partner data shall not be shared with third parties without consent</li>
          <li>Partners may request data deletion as per applicable laws</li>
        </ul>
      </>
    ),
  },
  {
    id: "terminationPolicy",
    title: "Termination Policy",
    required: false,
    content: (
      <>
        <p className="text-sm text-slate-600 leading-relaxed">
          Either party may terminate this agreement with <strong>30 days</strong> written notice. Swiggy reserves the right to terminate immediately in case of:
        </p>
        <ul className="mt-2 space-y-1 text-sm text-slate-600 list-disc list-inside">
          <li>Breach of operational guidelines</li>
          <li>Fraudulent activities</li>
          <li>Violation of applicable laws</li>
          <li>Serious customer complaints or safety violations</li>
        </ul>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
          Upon termination, the Partner's menu will be removed from the platform and pending settlements will be processed within 15 business days.
        </p>
      </>
    ),
  },
];