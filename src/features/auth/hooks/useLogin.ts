import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/store/auth.store';
import { authService } from '../services/auth.service';
import type { LoginFormData } from '../types';

export function useLogin() {
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: (credentials: LoginFormData) => authService.login(credentials),
    onSuccess: ({ token, user }) => {
      setAuth(token, user);
    },
  });
}
