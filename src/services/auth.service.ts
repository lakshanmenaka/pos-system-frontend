import api from "./axios";

import type {
  LoginData,
  SignupData,
} from "../validators/auth.schema";

export interface UserData {
  id: string;
  fullName: string;
  email: string;
}

export interface SignupResponse {
  message: string;
  data: {
    _id: string;
    fullName: string;
    email: string;
  };
}

export interface LoginResponse {
  message: string;
  token: string;
  user: UserData;
}

export const authService = {
  async signup(data: SignupData) {
    const response = await api.post<SignupResponse>(
      "/api/user/signup",
      data
    );

    return response.data;
  },

  async login(data: LoginData) {
    const response = await api.post<LoginResponse>(
      "/api/user/login",
      data
    );

    return response.data;
  },
};