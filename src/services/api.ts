import axios, { AxiosError } from 'axios';
import { API_BASE_URL } from '../config';
import { useAuthStore } from '../store/authStore';
import { refreshTokens } from './authService';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true',
  },
  withCredentials: true, // Auto-include cookies (refreshToken)
});

// ---- Refresh Lock ----
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null) => {
  failedQueue.forEach((promise) => {
    if (token) {
      promise.resolve(token);
    } else {
      promise.reject(error);
    }
  });
  failedQueue = [];
};

// ---- Request Interceptor ----
api.interceptors.request.use((config) => {
  const store = useAuthStore.getState();
  const token = store.getAccessToken(); // Returns null if expired

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ---- Response Interceptor ----
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    // Not a 401 or already retried - reject
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // 401 - token is invalid/expired
    originalRequest._retry = true;

    if (originalRequest.url.includes('/auth/refresh')) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      // Refresh already in progress - queue this request
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    }

    // Start refresh
    isRefreshing = true;

    try {
      const data = await refreshTokens();
      const store = useAuthStore.getState();

      store.setAuth(
        {
          userId: data.userId,
          email: data.email,
          role: data.role,
        },
        data.accessToken,
        data.expiresIn
      );

      processQueue(null, data.accessToken);
      originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
      return api(originalRequest);  
    } catch (refreshError) {
      processQueue(refreshError, null);
      useAuthStore.getState().clearAuth();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;