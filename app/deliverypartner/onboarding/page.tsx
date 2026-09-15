// "use client";

// import { useState } from "react";

// import DeliveryStepper from "@/componets/deliverySignup/DeliveryStepper";
// import AccountStep from "@/componets/deliverySignup/AccountStep";
// import VerifySignupOtpStep from "@/componets/deliverySignup/VerifySignupOtpStep";
// import VerifyDeliveryOtpStep from "@/componets/deliverySignup/VerifyDeliveryOtpStep";
// import VehicleDetailsStep from "@/componets/deliverySignup/VehicleDetailsStep";
// import DocumentsStep from "@/componets/deliverySignup/DocumentsStep";
// import ContractStep from "@/componets/deliverySignup/ContractStep";
// import PendingApproval from "@/componets/deliverySignup/PendingApproval";

// export default function DeliveryPartnerOnboardingPage() {
//   const [step, setStep] = useState(1);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
//       <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
//         {/* LEFT STEPPER */}
//         {step <= 6 && <DeliveryStepper step={step} />}

//         {/* RIGHT FORM */}
//         <div className="flex-1 p-8 md:p-12 bg-white">
//           <div className="max-w-2xl mx-auto">
//             {step === 1 && (
//               <AccountStep
//                 next={(em, pw) => {
//                   setEmail(em);
//                   setPassword(pw);
//                   setStep(2);
//                 }}
//               />
//             )}

//             {step === 2 && (
//               <VerifySignupOtpStep
//                 email={email}
//                 password={password}
//                 next={() => setStep(3)}
//               />
//             )}

//             {step === 3 && <VerifyDeliveryOtpStep next={() => setStep(4)} />}

//             {step === 4 && <VehicleDetailsStep next={() => setStep(5)} />}

//             {step === 5 && (
//               <DocumentsStep next={() => setStep(6)} back={() => setStep(4)} />
//             )}

//             {step === 6 && (
//               <ContractStep
//                 back={() => setStep(5)}
//                 onDone={() => setStep(7)}
//               />
//             )}

//             {step === 7 && <PendingApproval />}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";

import { RootState, AppDispatch } from "@/redux/store/store";
import { applyDelivery } from "@/redux/slice/delivery/deliverySlice";

import DeliveryStepper from "@/componets/deliverySignup/DeliveryStepper";
import AccountStep from "@/componets/deliverySignup/AccountStep";
import VerifySignupOtpStep from "@/componets/deliverySignup/VerifySignupOtpStep";
import VerifyDeliveryOtpStep from "@/componets/deliverySignup/VerifyDeliveryOtpStep";
import VehicleDetailsStep from "@/componets/deliverySignup/VehicleDetailsStep";
import DocumentsStep from "@/componets/deliverySignup/DocumentsStep";
import ContractStep from "@/componets/deliverySignup/ContractStep";
import PendingApproval from "@/componets/deliverySignup/PendingApproval";

export default function DeliveryPartnerOnboardingPage() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);

  // Steps 1–2 (AccountStep, VerifySignupOtpStep) create and verify a brand
  // new user account. An already-logged-in user already has one — running
  // them through registration again would either create a confusing second
  // identity or fail outright on a duplicate email. So a signed-in user
  // skips straight past account creation into the delivery application
  // itself (step 3+), which only needs their existing email.
  const [step, setStep] = useState(user ? 0 : 1);
  const [email, setEmail] = useState(user?.email ?? "");
  const [password, setPassword] = useState("");
  const [skipError, setSkipError] = useState<string | null>(null);

  useEffect(() => {
    if (!user || step !== 0) return;

    let cancelled = false;

    (async () => {
      try {
        await dispatch(applyDelivery({ email: user.email })).unwrap();
        if (!cancelled) setStep(3);
      } catch (err: any) {
        if (cancelled) return;
        setSkipError(
          typeof err === "string"
            ? err
            : "Could not start your delivery application. Please try again.",
        );
      }
    })();

    return () => {
      cancelled = true;
    };
    // Runs once on mount for a signed-in user.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (step === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 text-center">
          {skipError ? (
            <>
              <p className="text-red-600 font-medium">{skipError}</p>
              <button
                type="button"
                onClick={() => {
                  setSkipError(null);
                  setStep(0);
                }}
                className="mt-5 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-xl font-medium transition-colors duration-200"
              >
                Try Again
              </button>
            </>
          ) : (
            <>
              <div className="w-10 h-10 mx-auto rounded-full border-4 border-orange-200 border-t-orange-500 animate-spin" />
              <p className="mt-4 text-slate-500 text-sm">
                Starting your delivery partner application...
              </p>
            </>
          )}
        </div>
      </div>
    );
  }

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