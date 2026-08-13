
export interface VerifyOtpPayload {
  userId: string;
  otp: string;
}

export interface VerifyOtpResponse {
  status: boolean;
  message: string;
}