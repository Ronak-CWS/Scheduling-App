import { useEffect } from 'react';
import { router } from 'expo-router';
import { useAuthStore } from '@/store/auth.store';

export default function Index() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    // Typed routes regenerate on expo start — both paths are valid
    if (isAuthenticated) {
      router.replace('/(protected)/(tabs)/' as never);
    } else {
      router.replace('/(public)/login');
    }
  }, [isAuthenticated]);

  return null;
}
