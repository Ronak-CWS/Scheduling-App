# Auth Flow

## App Startup

```
App opens
  → RootLayout mounts
  → useAuthStore.getState().initialize() called
  → Reads token from SecureStore (async)
  → Sets isAuthenticated = true/false, isLoading = false
  → Splash screen hidden
  → app/index.tsx redirects:
      isAuthenticated → /(protected)/(tabs)
      !isAuthenticated → /(public)/login
```

## Login

```
User fills LoginForm
  → React Hook Form validates with Zod schema
  → useLogin mutation fires → authService.login(credentials)
  → POST /auth/login
  → On success: setAuth(token, user)
      → Stores token in SecureStore
      → Updates Zustand store (isAuthenticated = true)
  → Expo Router detects auth change → renders protected layout
  → User lands on Dashboard tab
```

## Auth Guard

`app/(protected)/_layout.tsx` runs on every render:
```tsx
if (!isAuthenticated) return <Redirect href="/(public)/login" />
```

This covers:
- Direct URL navigation to a protected route
- Token expiry handled by 401 interceptor (see below)

## Token Injection

Every API request goes through `src/api/client.ts`:
```
Request → interceptor reads token from SecureStore → attaches Authorization: Bearer <token>
```

## 401 Handling

```
API returns 401
  → Axios response interceptor fires
  → clearAuth() called on auth store
  → Token removed from SecureStore
  → Zustand isAuthenticated = false
  → Protected layout redirects to login
```

## Logout

```
User taps Sign Out (Settings screen)
  → clearAuth() called
  → router.replace('/(public)/login')
```

## Token Storage

Tokens are stored in `expo-secure-store`:
- iOS: Keychain
- Android: Keystore / EncryptedSharedPreferences
- Web: localStorage (fallback, not recommended for production)

## What's Not Implemented Yet

- Token refresh (needs `/auth/refresh` endpoint)
- Biometric unlock
- Session timeout
- Multi-account support
