export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: boolean;
  message: string;
  accessToken: string;
  refreshToken: string;
  data: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}