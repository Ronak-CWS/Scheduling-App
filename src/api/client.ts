import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { Config } from '@/constants/config';
import { storage } from '@/utils/storage';

export const apiClient = axios.create({
  baseURL: Config.apiUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const token = await storage.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Import lazily to avoid circular dependency at module load time
      const { useAuthStore } = await import('@/store/auth.store');
      useAuthStore.getState().clearAuth();
    }
    return Promise.reject(error);
  }
);
