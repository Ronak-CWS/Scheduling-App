import { apiClient } from '@/api/client';
import type { ApiResponse } from '@/types/api';
import type { LoginFormData, LoginResponse } from '../types';

export const authService = {
  login: async (credentials: LoginFormData): Promise<LoginResponse> => {
    const { data } = await apiClient.post<ApiResponse<LoginResponse>>('/auth/login', credentials);
    return data.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout');
  },

  refreshToken: async (): Promise<string> => {
    const { data } = await apiClient.post<ApiResponse<{ token: string }>>('/auth/refresh');
    return data.data.token;
  },
};
