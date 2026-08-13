interface PartnerState {
  loading: boolean;
  error: string | null;
  restaurantEmail: string;
}
// interface PartnerState {
//   loading: boolean;
//   error: string | null;

//   restaurantEmail: string;

//   restaurantDetails: RestaurantDetails | null;
// }
export interface PartnerContractPayload {
  fullName: string;
  designation: string;
  date: string;
  place: string;
  declarationAccepted: boolean;
  reviewedSections: string[];
}

export interface PartnerContractResponse {
  status: boolean;
  message: string;
}
