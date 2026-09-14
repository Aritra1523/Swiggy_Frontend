export interface ApplyDeliveryPayload {
  email: string;
}

export interface ApplyDeliveryResponse {
  status: boolean;
  message: string;
  data?: {
    id: string;
    email: string;
  };
}

export interface DeliveryOtpPayload {
  email: string;
  otp: string;
}

export interface DeliveryOtpResponse {
  status: boolean;
  message: string;
  data?: unknown;
}

export interface DeliveryDetailsPayload {
  fullName: string;
  email: string;
  phone: string;
  vehicleType: "Bike" | "Scooter" | "Bicycle" | "Car";
  vehicleNumber: string;
}

export interface DeliveryDetailsResponse {
  status: boolean;
  message: string;
  data?: DeliveryPartner;
}

export interface DeliveryDocumentsPayload {
  licenseNumber: string;
  licensePhoto?: FileList;
  idProof?: FileList;
  vehicleRC?: FileList;
}

export interface DeliveryDocumentsResponse {
  status: boolean;
  message: string;
  data?: DeliveryPartner;
}

export interface DeliveryContractPayload {
  fullName: string;
  place: string;
  declarationAccepted: boolean;
  reviewedSections: string[];
}

export interface DeliveryContractResponse {
  success: boolean;
  message: string;
  data?: {
    onboardingStep: number;
    status: string;
    contractAccepted: boolean;
    acceptedAt: string;
  };
}

export interface DeliveryPartner {
  _id: string;
  owner: string;
  fullName: string;
  email: string;
  phone: string;
  vehicleType: string;
  vehicleNumber: string;
  licenseNumber?: string;
  onboardingStep: number;
  isOnline: boolean;
  currentOrder?: string | null;
  status: "draft" | "documents_pending" | "review_pending" | "approved" | "rejected";
  rejectedReason?: string;
}

export interface DeliveryProfileResponse {
  status: boolean;
  data: DeliveryPartner;
}

export interface ToggleOnlineResponse {
  status: boolean;
  message: string;
  data: { isOnline: boolean };
}