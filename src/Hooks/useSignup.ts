import { useState } from "react";

import { authService } from "../services/auth.service";
import { getApiErrorMessage } from "../utils/apiError";

import type { SignupData } from "../validators/auth.schema";

export const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const signup = async (data: SignupData) => {
    try {
      setLoading(true);
      setError("");

      const response = await authService.signup(data);

      return response;
    } catch (error) {
      const message = getApiErrorMessage(
        error,
        "Signup failed"
      );

      setError(message);

      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    signup,
    loading,
    error,
  };
};