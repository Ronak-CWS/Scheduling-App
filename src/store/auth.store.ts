import { create } from 'zustand';
import { storage } from '@/utils/storage';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'dispatcher' | 'driver';
}

interface AuthState {
  token: string | null;
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  initialize: () => Promise<void>;
  setAuth: (token: string, user: AuthUser) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isLoading: true,
  isAuthenticated: false,

  initialize: async () => {
    const token = await storage.getToken();
    set({ token, isAuthenticated: !!token, isLoading: false });
  },

  setAuth: (token, user) => {
    storage.setToken(token);
    set({ token, user, isAuthenticated: true, isLoading: false });
  },

  clearAuth: () => {
    storage.clearToken();
    set({ token: null, user: null, isAuthenticated: false, isLoading: false });
  },
}));
