export interface RegisterPayload {
  full_name: string;
  mobile_Number:string,
  email: string;
  address: string;
  password: string;
  confirm_password: string;
}

export interface RegisterResponse {
  status: boolean;
  message: string;
  data?: any;
}


export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
   _id?: string;
}

export interface AuthState {
  loading: boolean;
  error: string | null;
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
}