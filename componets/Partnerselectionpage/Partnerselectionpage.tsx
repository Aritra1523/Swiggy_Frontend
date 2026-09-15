// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useSelector } from "react-redux";
// import { AlertCircle } from "lucide-react";

// import { RootState } from "@/redux/store/store";
// import usePartnerStatus, {
//   PartnerType,
//   PartnerStatus,
// } from "@/customHooks/partner/usepartnerstatus";

// import LoginDrawer from "@/componets/auth/Login/LoginDrawer";
// import RegisterDrawer from "@/componets/auth/Register/RegisterDrawer";
// import OTPDrawer from "@/componets/auth/Otp/OTPDrawer";
// import PartnerEmailDrawer from "@/componets/partner/AuthPartner/PartnerEmailDrawer";
// import PartnerOtpDrawer from "@/componets/partner/AuthPartner/PartnerOtpDrawer";

// import PartnerCard from "./PartnerCard";
// import ApplicationStatus from "./Applicationstatus";

// type AuthStep = "login" | "register" | "otp" | null;
// type RestaurantApplyStep = "email" | "otp" | null;

// export default function PartnerSelectionPage() {
//   const router = useRouter();
//   const user = useSelector((state: RootState) => state.auth.user);
//   const { checkStatus, checking, error, setError } = usePartnerStatus();

//   const [auth, setAuth] = useState<AuthStep>(null);
//   const [otpEmail, setOtpEmail] = useState("");

//   // Restaurant applications start with their own email+OTP verification,
//   // which is separate from signing in. Reused as-is from the existing flow.
//   const [applyStep, setApplyStep] = useState<RestaurantApplyStep>(null);
//   const [applyEmail, setApplyEmail] = useState("");

//   // Which type the user picked before being asked to log in, so the flow can
//   // resume automatically once authentication finishes.
//   const [pendingType, setPendingType] = useState<PartnerType | null>(null);
//   const [statusView, setStatusView] = useState<{
//     type: PartnerType;
//     status: PartnerStatus;
//   } | null>(null);

//   const routeByStatus = (type: PartnerType, status: PartnerStatus) => {
//     switch (status.state) {
//       case "approved":
//         // Dashboards stay completely separate per partner type.
//         router.push(type === "restaurant" ? "/owner" : "/deliverypartner/dashboard");
//         return;

//       case "pending":
//       case "rejected":
//         setStatusView({ type, status });
//         return;

//       case "onboarding":
//         router.push(
//           type === "restaurant"
//             ? "/partner/onboarding"
//             : "/deliverypartner/onboarding",
//         );
//         return;

//       // No application yet.
//       default:
//         if (type === "restaurant") {
//           // Restaurant onboarding is gated behind its own email OTP step.
//           setApplyStep("email");
//         } else {
//           router.push("/deliverypartner/onboarding");
//         }
//     }
//   };

//   const handleSelect = async (type: PartnerType) => {
//     setError(null);
//     setStatusView(null);

//     if (!user) {
//       // Shared authentication — no separate partner login system.
//       setPendingType(type);
//       setAuth("login");
//       return;
//     }

//     const status = await checkStatus(type);
//     if (status) routeByStatus(type, status);
//   };

//   // Once shared auth completes, pick the interrupted flow back up.
//   const handleAuthed = async () => {
//     setAuth(null);
//     if (!pendingType) return;

//     const type = pendingType;
//     setPendingType(null);

//     const status = await checkStatus(type);
//     if (status) routeByStatus(type, status);
//   };

//   if (statusView) {
//     return (
//       <main className="min-h-screen bg-gray-50 px-4 py-10 sm:py-16">
//         <ApplicationStatus
//           state={statusView.status.state as "pending" | "rejected"}
//           partnerType={statusView.type}
//           reason={statusView.status.reason}
//           onBack={() => setStatusView(null)}
//           onReapply={
//             statusView.status.state === "rejected"
//               ? () =>
//                   router.push(
//                     statusView.type === "restaurant"
//                       ? "/partner/onboarding"
//                       : "/deliverypartner/onboarding",
//                   )
//               : undefined
//           }
//         />
//       </main>
//     );
//   }

//   return (
//     <main className="min-h-screen bg-gray-50">
//       <div className="max-w-5xl mx-auto px-4 py-10 sm:py-16">
//         {/* Header */}
//         <div className="text-center">
//           <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
//             {user ? "Welcome back!" : "Become a Partner"}
//           </h1>
//           <p className="mt-3 text-base sm:text-lg text-gray-500">
//             {user
//               ? "What would you like to do?"
//               : "Choose how you want to partner with us"}
//           </p>
//         </div>

//         {/* Error state */}
//         {error && (
//           <div className="mt-8 max-w-2xl mx-auto flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 p-4">
//             <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
//             <p className="text-sm text-red-700">{error}</p>
//           </div>
//         )}

//         {/* Partner type cards */}
//         <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
//           <PartnerCard
//             emoji="🍽️"
//             title="Restaurant Partner"
//             description="List your restaurant, manage your menu and grow your business with us."
//             cta={user ? "Continue" : "Become a Restaurant Partner"}
//             loading={checking === "restaurant"}
//             disabled={checking !== null}
//             onClick={() => handleSelect("restaurant")}
//           />

//           <PartnerCard
//             emoji="🛵"
//             title="Delivery Partner"
//             description="Deliver orders, choose your availability and earn with every delivery."
//             cta={user ? "Continue" : "Join as Delivery Partner"}
//             loading={checking === "delivery"}
//             disabled={checking !== null}
//             onClick={() => handleSelect("delivery")}
//           />
//         </div>

//         {/* Existing partners — hidden once signed in, since it would be a no-op */}
//         {!user && (
//           <p className="mt-10 text-center text-sm sm:text-base text-gray-500">
//             Already a partner?{" "}
//             <button
//               type="button"
//               onClick={() => setAuth("login")}
//               className="font-semibold text-orange-500 hover:text-orange-600 hover:underline transition-colors duration-200"
//             >
//               Sign in
//             </button>
//           </p>
//         )}
//       </div>

//       {/* Shared authentication drawers */}
//       {auth === "login" && (
//         <LoginDrawer
//           close={handleAuthed}
//           openRegister={() => setAuth("register")}
//         />
//       )}

//       {auth === "register" && (
//         <RegisterDrawer
//           close={() => setAuth(null)}
//           backToLogin={() => setAuth("login")}
//           onSuccess={(email: string) => {
//             setOtpEmail(email);
//             setAuth("otp");
//           }}
//         />
//       )}

//       {auth === "otp" && (
//         <OTPDrawer
//           email={otpEmail}
//           close={handleAuthed}
//           openLogin={() => setAuth("login")}
//         />
//       )}

//       {/* Restaurant-specific application verification */}
//       {applyStep === "email" && (
//         <PartnerEmailDrawer
//           close={() => setApplyStep(null)}
//           openOtp={(email: string) => {
//             setApplyEmail(email);
//             setApplyStep("otp");
//           }}
//         />
//       )}

//       {applyStep === "otp" && (
//         <PartnerOtpDrawer
//           email={applyEmail}
//           close={() => setApplyStep(null)}
//         />
//       )}
//     </main>
//   );
// }


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { AlertCircle } from "lucide-react";

import { RootState } from "@/redux/store/store";
import usePartnerStatus, {
  PartnerType,
  PartnerStatus,
} from "@/customHooks/partner/usepartnerstatus";

import LoginDrawer from "@/componets/auth/Login/LoginDrawer";
import RegisterDrawer from "@/componets/auth/Register/RegisterDrawer";
import OTPDrawer from "@/componets/auth/Otp/OTPDrawer";
import PartnerEmailDrawer from "@/componets/partner/AuthPartner/PartnerEmailDrawer";
import PartnerOtpDrawer from "@/componets/partner/AuthPartner/PartnerOtpDrawer";

import PartnerCard from "./PartnerCard";
import ApplicationStatus from "./Applicationstatus";

type AuthStep = "login" | "register" | "otp" | null;
type RestaurantApplyStep = "email" | "otp" | null;

export default function PartnerSelectionPage() {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const { checkStatus, checking, error, setError } = usePartnerStatus();

  const [auth, setAuth] = useState<AuthStep>(null);
  const [otpEmail, setOtpEmail] = useState("");

  // Restaurant applications start with their own email+OTP verification,
  // which is separate from signing in. Reused as-is from the existing flow.
  const [applyStep, setApplyStep] = useState<RestaurantApplyStep>(null);
  const [applyEmail, setApplyEmail] = useState("");

  // Which type the user picked before being asked to log in, so the flow can
  // resume automatically once authentication finishes.
  const [pendingType, setPendingType] = useState<PartnerType | null>(null);
  const [statusView, setStatusView] = useState<{
    type: PartnerType;
    status: PartnerStatus;
  } | null>(null);

  const routeByStatus = (type: PartnerType, status: PartnerStatus) => {
    switch (status.state) {
      case "approved":
        // Dashboards stay completely separate per partner type.
        router.push(type === "restaurant" ? "/owner" : "/deliverypartner/dashboard");
        return;

      case "pending":
      case "rejected":
        setStatusView({ type, status });
        return;

      case "onboarding":
        router.push(
          type === "restaurant"
            ? "/partner/onboarding"
            : "/deliverypartner/onboarding",
        );
        return;

      // No application yet.
      default:
        if (type === "restaurant") {
          // Restaurant onboarding is gated behind its own email OTP step.
          setApplyStep("email");
        } else {
          router.push("/deliverypartner/onboarding");
        }
    }
  };

  const handleSelect = async (type: PartnerType) => {
    setError(null);
    setStatusView(null);

    if (!user) {
      // Shared authentication — no separate partner login system.
      setPendingType(type);
      setAuth("login");
      return;
    }

    const status = await checkStatus(type);
    if (status) routeByStatus(type, status);
  };

  // Once shared auth completes, pick the interrupted flow back up.
  const handleAuthed = async () => {
    setAuth(null);
    if (!pendingType) return;

    const type = pendingType;
    setPendingType(null);

    const status = await checkStatus(type);
    if (status) routeByStatus(type, status);
  };

  if (statusView) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-10 sm:py-16">
        <ApplicationStatus
          state={statusView.status.state as "pending" | "rejected"}
          partnerType={statusView.type}
          reason={statusView.status.reason}
          onBack={() => setStatusView(null)}
          onReapply={
            statusView.status.state === "rejected"
              ? () =>
                  router.push(
                    statusView.type === "restaurant"
                      ? "/partner/onboarding"
                      : "/deliverypartner/onboarding",
                  )
              : undefined
          }
        />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-10 sm:py-16">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            {user ? "Welcome back!" : "Become a Partner"}
          </h1>
          <p className="mt-3 text-base sm:text-lg text-gray-500">
            {user
              ? "What would you like to do?"
              : "Choose how you want to partner with us"}
          </p>
        </div>

        {/* Error state */}
        {error && (
          <div className="mt-8 max-w-2xl mx-auto flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 p-4">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Partner type cards */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          <PartnerCard
            emoji="🍽️"
            title="Restaurant Partner"
            description="List your restaurant, manage your menu and grow your business with us."
            cta={user ? "Continue" : "Become a Restaurant Partner"}
            loading={checking === "restaurant"}
            disabled={checking !== null}
            onClick={() => handleSelect("restaurant")}
          />

          <PartnerCard
            emoji="🛵"
            title="Delivery Partner"
            description="Deliver orders, choose your availability and earn with every delivery."
            cta={user ? "Continue" : "Join as Delivery Partner"}
            loading={checking === "delivery"}
            disabled={checking !== null}
            onClick={() => handleSelect("delivery")}
          />
        </div>

        {/* Existing partners — hidden once signed in, since it would be a no-op */}
        {!user && (
          <p className="mt-10 text-center text-sm sm:text-base text-gray-500">
            Already a partner?{" "}
            <button
              type="button"
              onClick={() => setAuth("login")}
              className="font-semibold text-orange-500 hover:text-orange-600 hover:underline transition-colors duration-200"
            >
              Sign in
            </button>
          </p>
        )}
      </div>

      {/* Shared authentication drawers */}
      {auth === "login" && (
        <LoginDrawer
          close={handleAuthed}
          openRegister={() => setAuth("register")}
        />
      )}

      {auth === "register" && (
        <RegisterDrawer
          close={() => setAuth(null)}
          backToLogin={() => setAuth("login")}
          onSuccess={(email: string) => {
            setOtpEmail(email);
            setAuth("otp");
          }}
        />
      )}

      {auth === "otp" && (
        <OTPDrawer
          email={otpEmail}
          close={handleAuthed}
          openLogin={() => setAuth("login")}
        />
      )}

      {/* Restaurant-specific application verification */}
      {applyStep === "email" && (
        <PartnerEmailDrawer
          close={() => setApplyStep(null)}
          accountEmail={user?.email ?? ""}
          openOtp={(email: string) => {
            setApplyEmail(email);
            setApplyStep("otp");
          }}
        />
      )}

      {applyStep === "otp" && (
        <PartnerOtpDrawer
          email={applyEmail}
          close={() => setApplyStep(null)}
        />
      )}
    </main>
  );
}