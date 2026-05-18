import api from "./api";

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

interface AuthCredentials {
  email: string;
  password: string;
}

export const register = async (credentials: AuthCredentials): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/register", credentials);
  return response.data;
};

export const login = async (credentials: AuthCredentials): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/login", credentials);
  return response.data;
};

export const refreshTokens = async (refreshToken: string): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/refresh", { refreshToken });
  return response.data;
};