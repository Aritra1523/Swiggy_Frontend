
export interface RestaurantDetails {
  restaurantName: string;
  ownerName: string;
  mobileNumber: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}
export interface RestaurantDetailsPayload {
  ownerName: string;
  restaurantName: string;
  location: string;
  email: string;
  phone: string;
  whatsappNumber: string;
  workingDays: string[];
  openingClosing: {
    sameForAllDays: boolean;
    slots: {
      open: string;
      close: string;
    }[];
  };
}


export interface RestaurantDetailsResponse {
  status: boolean;
  message: string;
}


