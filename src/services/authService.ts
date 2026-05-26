import api from './api';

interface AuthResponse {
  userId: string;
  email: string;
  role: 'user' | 'admin';
  accessToken: string;
  expiresIn: number;
}

interface AuthCredentials {
  email: string;
  password: string;
}

export const register = async (
  credentials: AuthCredentials
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/register', credentials);
  return response.data;
};

export const login = async (
  credentials: AuthCredentials
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/login', credentials);
  return response.data;
};

export const refreshTokens = async (): Promise<AuthResponse> => {
  // No params - refreshToken sent via cookie automatically
  const response = await api.post<AuthResponse>('/auth/refresh');
  return response.data;
};

export const logout = async (): Promise<void> => {
  // Backend clears cookie
  await api.post('/auth/logout');
};