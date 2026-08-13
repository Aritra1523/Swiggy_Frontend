export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: boolean;
  message: string;
  accessToken: string;
  refreshToken: string;
  user: any;
}