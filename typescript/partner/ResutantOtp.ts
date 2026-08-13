export interface RestaurantOtpPayload {
  email: string;
  otp: string;
}

export interface RestaurantOtpResponse {
  status: boolean;
  message: string;
}