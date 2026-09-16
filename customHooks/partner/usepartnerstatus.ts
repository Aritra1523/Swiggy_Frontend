// "use client";

// import { useCallback, useState } from "react";
// import axiosInstance from "@/api/baseUrl/Api";
// import { endpoints } from "@/api/endpoints/Endpoints";
// import { MyRestaurantResponse } from "@/typescript/restaurantOwner/restaurantOwner";
// import { DeliveryProfileResponse } from "@/typescript/delivery/Delivery";

// export type PartnerType = "restaurant" | "delivery";

// /**
//  * What the selection page should do next for a given partner type.
//  *
//  *  none      -> no application yet, send them into onboarding
//  *  onboarding-> application started but not finished, resume onboarding
//  *  pending   -> submitted, waiting on admin
//  *  rejected  -> admin rejected (reason may be present)
//  *  approved  -> send them to the relevant dashboard
//  */
// export type PartnerApplicationState =
//   | "none"
//   | "onboarding"
//   | "pending"
//   | "rejected"
//   | "approved";

// export interface PartnerStatus {
//   state: PartnerApplicationState;
//   reason?: string;
//   /** Step the user left off on, when the backend tracks it. */
//   onboardingStep?: number;
// }

// /**
//  * The two partner types report their application status through different
//  * endpoints with different shapes, so each gets its own normaliser and both
//  * end up as the same PartnerStatus the UI can switch on.
//  */
// function normaliseRestaurant(res: MyRestaurantResponse): PartnerStatus {
//   if (!res.hasRestaurant || !res.data) return { state: "none" };

//   const { status, onboardingStep } = res.data;

//   // The restaurant record is created at the start of onboarding, so its
//   // existence alone does not mean the application was ever submitted.
//   switch (status) {
//     case "approved":
//     case "active":
//       return { state: "approved", onboardingStep };
//     case "rejected":
//       return { state: "rejected", onboardingStep };
//     case "pending":
//     case "review_pending":
//       return { state: "pending", onboardingStep };
//     default:
//       return { state: "onboarding", onboardingStep };
//   }
// }

// function normaliseDelivery(res: DeliveryProfileResponse): PartnerStatus {
//   if (!res.status || !res.data) return { state: "none" };

//   const { status, rejectedReason, onboardingStep } = res.data;

//   switch (status) {
//     case "approved":
//       return { state: "approved", onboardingStep };
//     case "rejected":
//       return { state: "rejected", reason: rejectedReason, onboardingStep };
//     case "review_pending":
//       return { state: "pending", onboardingStep };
//     // "draft" and "documents_pending" both mean onboarding is unfinished.
//     default:
//       return { state: "onboarding", onboardingStep };
//   }
// }

// export default function usePartnerStatus() {
//   const [checking, setChecking] = useState<PartnerType | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   const checkStatus = useCallback(
//     async (type: PartnerType): Promise<PartnerStatus | null> => {
//       setChecking(type);
//       setError(null);

//       try {
//         if (type === "restaurant") {
//           const { data } = await axiosInstance.get<MyRestaurantResponse>(
//             endpoints.myRestaurant,
//           );
//           return normaliseRestaurant(data);
//         }

//         const { data } = await axiosInstance.get<DeliveryProfileResponse>(
//           endpoints.myDeliveryProfile,
//         );
//         return normaliseDelivery(data);
//       } catch (err: any) {
//         // A 404 here is the normal "you have not applied yet" answer, not a
//         // failure — only anything else should surface as an error.
//         if (err?.response?.status === 404) return { state: "none" };

//         setError(
//           err?.response?.data?.message ||
//             "Could not check your application status. Please try again.",
//         );
//         return null;
//       } finally {
//         setChecking(null);
//       }
//     },
//     [],
//   );

//   return { checkStatus, checking, error, setError };
// }

"use client";

import { useCallback, useState } from "react";
import axiosInstance from "@/api/baseUrl/Api";
import { endpoints } from "@/api/endpoints/Endpoints";
import { MyRestaurantResponse } from "@/typescript/restaurantOwner/restaurantOwner";
import { DeliveryProfileResponse } from "@/typescript/delivery/Delivery";

export type PartnerType = "restaurant" | "delivery";


export type PartnerApplicationState =
  | "none"
  | "onboarding"
  | "pending"
  | "rejected"
  | "approved";

export interface PartnerStatus {
  state: PartnerApplicationState;
  reason?: string;
  /** Step the user left off on, when the backend tracks it. */
  onboardingStep?: number;
}


function normaliseRestaurant(res: MyRestaurantResponse): PartnerStatus {
  if (!res.hasRestaurant || !res.data) return { state: "none" };

  const { status, onboardingStep, rejectionReason } = res.data;

 
  switch (status) {
    case "approved":
      return { state: "approved", onboardingStep };
    case "rejected":
      return { state: "rejected", reason: rejectionReason, onboardingStep };
    case "review_pending":
      return { state: "pending", onboardingStep };
   
    default:
      return { state: "onboarding", onboardingStep };
  }
}

function normaliseDelivery(res: DeliveryProfileResponse): PartnerStatus {
  if (!res.status || !res.data) return { state: "none" };

  const { status, rejectedReason, onboardingStep } = res.data;

  switch (status) {
    case "approved":
      return { state: "approved", onboardingStep };
    case "rejected":
      return { state: "rejected", reason: rejectedReason, onboardingStep };
    case "review_pending":
      return { state: "pending", onboardingStep };
    default:
      return { state: "onboarding", onboardingStep };
  }
}

export default function usePartnerStatus() {
  const [checking, setChecking] = useState<PartnerType | null>(null);
  const [error, setError] = useState<string | null>(null);

  const checkStatus = useCallback(
    async (type: PartnerType): Promise<PartnerStatus | null> => {
      setChecking(type);
      setError(null);

      try {
        if (type === "restaurant") {
          const { data } = await axiosInstance.get<MyRestaurantResponse>(
            endpoints.myRestaurant,
          );
          return normaliseRestaurant(data);
        }

        const { data } = await axiosInstance.get<DeliveryProfileResponse>(
          endpoints.myDeliveryProfile,
        );
        return normaliseDelivery(data);
      } catch (err: any) {
        const status = err?.response?.status;
        const message: string | undefined = err?.response?.data?.message;

       
        if (status === 404) return { state: "none" };

        
        if (status === 403 && message?.startsWith("Access denied for role")) {
          setError(
            "Your account isn't authorized to check this yet — this needs a backend fix (the status endpoint should also allow role \"user\", not just approved partners).",
          );
          return null;
        }

        setError(
          message || "Could not check your application status. Please try again.",
        );
        return null;
      } finally {
        setChecking(null);
      }
    },
    [],
  );

  return { checkStatus, checking, error, setError };
}
