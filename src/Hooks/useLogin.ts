import { useState } from "react";

import { authService } from "../services/auth.service";
import { storage } from "../utils/storage";
import { getApiErrorMessage } from "../utils/apiError";

import type { LoginData } from "../validators/auth.schema";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async (data: LoginData) => {
    try {
      setLoading(true);
      setError("");

      const response = await authService.login(data);

      
      storage.setToken(response.token);

     
      storage.setUser(response.user);

      return response;
    } catch (error) {
      const message = getApiErrorMessage(error, "Login failed");
      setError(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loading,
    error,
  };
};