"use client";

import { useState } from "react";

import DeliveryStepper from "@/componets/deliverySignup/DeliveryStepper";
import AccountStep from "@/componets/deliverySignup/AccountStep";
import VerifySignupOtpStep from "@/componets/deliverySignup/VerifySignupOtpStep";
import VerifyDeliveryOtpStep from "@/componets/deliverySignup/VerifyDeliveryOtpStep";
import VehicleDetailsStep from "@/componets/deliverySignup/VehicleDetailsStep";
import DocumentsStep from "@/componets/deliverySignup/DocumentsStep";
import ContractStep from "@/componets/deliverySignup/ContractStep";
import PendingApproval from "@/componets/deliverySignup/PendingApproval";

export default function DeliveryPartnerOnboardingPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* LEFT STEPPER */}
        {step <= 6 && <DeliveryStepper step={step} />}

        {/* RIGHT FORM */}
        <div className="flex-1 p-8 md:p-12 bg-white">
          <div className="max-w-2xl mx-auto">
            {step === 1 && (
              <AccountStep
                next={(em, pw) => {
                  setEmail(em);
                  setPassword(pw);
                  setStep(2);
                }}
              />
            )}

            {step === 2 && (
              <VerifySignupOtpStep
                email={email}
                password={password}
                next={() => setStep(3)}
              />
            )}

            {step === 3 && <VerifyDeliveryOtpStep next={() => setStep(4)} />}

            {step === 4 && <VehicleDetailsStep next={() => setStep(5)} />}

            {step === 5 && (
              <DocumentsStep next={() => setStep(6)} back={() => setStep(4)} />
            )}

            {step === 6 && (
              <ContractStep
                back={() => setStep(5)}
                onDone={() => setStep(7)}
              />
            )}

            {step === 7 && <PendingApproval />}
          </div>
        </div>
      </div>
    </div>
  );
}