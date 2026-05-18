import { create } from "zustand";

interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
  setAccessToken: (token: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  isAuthenticated: false,

  setAccessToken: (token) =>
    set({ accessToken: token, isAuthenticated: true }),

  clearAuth: () => {
    localStorage.removeItem("refreshToken");
    set({ accessToken: null, isAuthenticated: false });
  },
}));

// Keep this for non-component files (api.ts, authService.ts)
export const authStore = {
  getAccessToken: () => useAuthStore.getState().accessToken,
  setAccessToken: (token: string) => useAuthStore.getState().setAccessToken(token),
  clearAuth: () => useAuthStore.getState().clearAuth(),
  isAuthenticated: () => useAuthStore.getState().isAuthenticated,
};