import { User } from "./Register";

export interface VerifyOtpPayload {
  userId: string;
  otp: string;
}

export interface VerifyOtpResponse {
  status: boolean;
  message: string;
  data: User;
  accessToken: string;
  refreshToken: string;
}