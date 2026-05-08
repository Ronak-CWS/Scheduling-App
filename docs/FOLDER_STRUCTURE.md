# Folder Structure

```
CWS-Mobile/
├── app/                          # Expo Router routing files only
│   ├── _layout.tsx               # Root layout: providers + splash screen
│   ├── index.tsx                 # Auth redirect
│   ├── (public)/                 # Unauthenticated screens
│   │   ├── _layout.tsx           # Stack navigator
│   │   ├── login.tsx
│   │   └── forgot-password.tsx
│   └── (protected)/              # Auth-guarded screens
│       ├── _layout.tsx           # Redirects to login if not authenticated
│       └── (tabs)/               # Tab navigation
│           ├── _layout.tsx       # Tab bar config
│           ├── index.tsx         # Dashboard
│           ├── schedule.tsx
│           ├── jobs.tsx
│           └── settings.tsx
│
├── src/                          # All application logic
│   ├── api/
│   │   └── client.ts             # Axios instance with interceptors
│   ├── components/
│   │   └── ui/                   # Reusable UI components
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── LoadingSpinner.tsx
│   │       └── ErrorMessage.tsx
│   ├── constants/
│   │   └── config.ts             # Typed environment config
│   ├── features/
│   │   └── auth/                 # Auth feature module
│   │       ├── components/
│   │       │   └── LoginForm.tsx
│   │       ├── hooks/
│   │       │   └── useLogin.ts
│   │       ├── services/
│   │       │   └── auth.service.ts
│   │       └── types/
│   │           └── index.ts
│   ├── store/
│   │   └── auth.store.ts         # Global auth state (Zustand)
│   ├── theme/
│   │   ├── colors.ts
│   │   ├── spacing.ts
│   │   ├── typography.ts
│   │   └── index.ts
│   ├── types/
│   │   └── api.ts                # Shared API response types
│   └── utils/
│       └── storage.ts            # SecureStore wrapper
│
├── docs/                         # Project documentation
├── assets/                       # Images, fonts, icons
├── .env                          # Local env vars (gitignored)
├── .env.example                  # Env template (committed)
└── app.json                      # Expo config
```

## Conventions

- `app/` files are thin — no logic, no state. Import from `@/` (src/).
- Feature folders in `src/features/` own everything for that domain.
- Shared components in `src/components/ui/` have no feature-specific logic.
- `@/` alias maps to `src/` — configured in `tsconfig.json`.

## Adding a New Feature

1. Create `src/features/<feature-name>/`
2. Add subfolders as needed: `components/`, `hooks/`, `services/`, `types/`
3. Add screens to the appropriate route group in `app/`
4. Add the tab or stack entry to the relevant layout file
