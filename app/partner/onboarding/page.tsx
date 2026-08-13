
"use client";

import { useState } from "react";
import PartnerStepper from "../../../componets/partner/PartnerStepper";
import RestaurantDocuments from "../../../componets/partner/RestaurantDocument/RestaurantDocuments";
import PartnerContract from "../../../componets/partner/PartnerContract/PartnerContract";
import RestaurantDetails from "@/componets/partner/RestaurantDetails/RestaurantDetails";

export default function PartnerOnboardingPage() {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* LEFT STEPPER */}
        <PartnerStepper step={step} />

        {/* RIGHT FORM */}
        <div className="flex-1 p-8 md:p-12 bg-white">
          <div className="max-w-2xl mx-auto">
            {step === 1 && <RestaurantDetails next={() => setStep(2)} />}
            {step === 2 && (
              <RestaurantDocuments
                next={() => setStep(3)}
                back={() => setStep(1)}
              />
            )}
            {step === 3 && <PartnerContract back={() => setStep(2)} />}
          </div>
        </div>
      </div>
    </div>
  );
}