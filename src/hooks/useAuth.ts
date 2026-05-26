import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { login, register, logout } from '../services/authService';

interface AuthCredentials {
  email: string;
  password: string;
}

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Subscribe to store - reactive
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const setAuth = useAuthStore((s) => s.setAuth);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  const handleLogin = async (credentials: AuthCredentials): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const data = await login(credentials);
      setAuth(
        {
          userId: data.userId,
          email: data.email,
          role: data.role,
        },
        data.accessToken,
        data.expiresIn
      );
      return true;
    } catch (err: unknown) {
      setError('Invalid email or password');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (
    credentials: AuthCredentials
  ): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const data = await register(credentials);
      setAuth(
        {
          userId: data.userId,
          email: data.email,
          role: data.role,
        },
        data.accessToken,
        data.expiresIn
      );
      return true;
    } catch (err: unknown) {
      setError('Registration failed. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      clearAuth();
    } catch (err) {
      // Still clear locally even if server fails
      clearAuth();
    }
  };

  return {
    loading,
    error,
    user,
    isAuthenticated,
    handleLogin,
    handleRegister,
    handleLogout,
  };
};