import { useState } from "react";
import { authStore } from "../store/authStore";
import { login, register } from "../services/authService";

interface AuthCredentials {
  email: string;
  password: string;
}

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (credentials: AuthCredentials): Promise<boolean> => {

    setLoading(true);
    setError(null);
    try {
      const data = await login(credentials);
      authStore.setAccessToken(data.accessToken);
      console.log("Refresh Token:", data.refreshToken); // Debug log
      localStorage.setItem("refreshToken", data.refreshToken);
      return true;
    } catch (err: unknown) {
      setError("Invalid email or password");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (credentials: AuthCredentials): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const data = await register(credentials);
      authStore.setAccessToken(data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      return true;
    } catch (err: unknown) {
      setError("Registration failed. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authStore.clearAuth();
  };

  return {
    loading,
    error,
    handleLogin,
    handleRegister,
    handleLogout,
    isAuthenticated: authStore.isAuthenticated(),
  };
};