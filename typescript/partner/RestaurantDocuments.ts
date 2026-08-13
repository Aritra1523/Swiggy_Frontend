export interface RestaurantDocumentsPayload {
  outletType: string;
  pan: string;
  gstin: string;
  ifscCode: string;
  bankAccountNumber: string;
  fssaiNumber: string;
}

export interface RestaurantDocumentsResponse {
  status: boolean;
  message: string;
}