import { create } from 'zustand';

export interface User {
  userId: string;
  email: string;
  role: 'user' | 'admin';
}

interface AuthState {
  // State
  user: User | null;
  accessToken: string | null;
  accessTokenExpiresAt: number | null;
  isAuthenticated: boolean;

  // Actions
  setAuth: (user: User, accessToken: string, expiresIn: number) => void;
  clearAuth: () => void;

  // Getters
  isTokenExpired: () => boolean;
  getAccessToken: () => string | null;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: null,
  accessTokenExpiresAt: null,
  isAuthenticated: false,

  setAuth: (user, accessToken, expiresIn) => {
    const expiresAt = Date.now() + expiresIn * 1000;
    set({
      user,
      accessToken,
      accessTokenExpiresAt: expiresAt,
      isAuthenticated: true,
    });
  },

  clearAuth: () => {
    set({
      user: null,
      accessToken: null,
      accessTokenExpiresAt: null,
      isAuthenticated: false,
    });
  },

  isTokenExpired: () => {
    const { accessTokenExpiresAt } = get();
    if (!accessTokenExpiresAt) return true;
    return Date.now() > accessTokenExpiresAt - 60 * 1000;
  },

  getAccessToken: () => {
    const state = get();
    if (state.isTokenExpired()) return null;
    return state.accessToken;
  },
}));