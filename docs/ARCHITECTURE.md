# Architecture

## Overview

CWS Mobile is an Expo React Native app using file-based routing (Expo Router). All business logic lives in `src/`. The `app/` folder contains only routing files — no logic, no state.

## Layer Responsibilities

| Layer | Location | Responsibility |
|---|---|---|
| Routing | `app/` | Screen entry points, layout guards, navigation structure |
| Features | `src/features/` | Feature-specific components, hooks, services, types |
| Shared UI | `src/components/` | Reusable, feature-agnostic components |
| State | `src/store/` | Global client state (Zustand) |
| Server state | React Query | Fetched/cached data from API |
| API | `src/api/` | Axios client, interceptors |
| Theme | `src/theme/` | Colors, spacing, typography |
| Utils | `src/utils/` | Pure helper functions |

## Route Groups

```
app/
  index.tsx               → auth redirect (no UI)
  (public)/               → unauthenticated stack (login, forgot-password)
  (protected)/            → auth guard layout
    (tabs)/               → main tab bar (dashboard, schedule, jobs, settings)
```

`(public)` and `(protected)` are Expo Router route groups — they don't appear in the URL path.

## Auth Guard Pattern

The `(protected)/_layout.tsx` checks `isAuthenticated` from the Zustand store. If false, it renders `<Redirect href="/(public)/login" />`. No middleware, no HOC — just a layout component.

## Data Flow

1. User submits login form → `useLogin` mutation → `authService.login()` → API
2. On success → `setAuth(token, user)` called → Zustand store updates → SecureStore persists token
3. `isAuthenticated` becomes true → Expo Router re-renders → user lands on dashboard
4. Every API request → Axios interceptor reads token from SecureStore → attaches `Authorization` header
5. On 401 → interceptor calls `useAuthStore.getState().clearAuth()` → user redirected to login

## Key Decisions

- **No Redux** — Zustand is enough. One store per domain if needed later.
- **No API layer abstraction** — services call `apiClient` directly. Add a repository layer only if complexity demands it.
- **No context providers** beyond QueryClientProvider — everything else is Zustand or local state.
- **Feature-first, not type-first** — code for the `auth` feature lives together, not split by "components folder / hooks folder".
