# Architecture Decisions

## Expo Router over React Navigation directly

Expo Router gives file-based routing, which keeps navigation structure visible in the folder tree. Route groups `(public)` / `(protected)` make auth separation explicit without any manual configuration.

## Zustand over Redux

Redux is overengineered for a solo developer's app at this scale. Zustand is ~1KB, has no boilerplate, and works well with TypeScript. If the app grows to need middleware, time-travel debugging, or multi-store composition, revisit.

## React Query for server state

Avoids building a manual caching layer. Gives loading/error states, background refetching, and cache invalidation for free. The alternative (fetching in useEffect + useState) becomes unmaintainable quickly.

## Feature-first folder structure

Code that changes together lives together. `src/features/auth/` contains components, hooks, services, and types for auth. The alternative (grouping by type — all hooks in `/hooks`, all services in `/services`) means a change to one feature touches multiple folders.

## expo-secure-store for token storage

AsyncStorage is unencrypted. Tokens are credentials — they should be in the platform keychain/keystore. SecureStore handles this with no extra configuration.

## No token refresh yet

Token refresh requires coordination between the interceptor, a queue of pending requests, and the backend `/auth/refresh` endpoint. Since the backend doesn't exist yet, adding this now would be building against assumptions. Add it when the endpoint is real.

## No error boundaries yet

React's error boundaries are valuable for production fault isolation but add complexity. At foundation stage, unhandled errors will surface visibly during development. Add feature-level error boundaries when features are built.

## Lazy import in 401 interceptor

The Axios client (`src/api/client.ts`) and the auth store (`src/store/auth.store.ts`) would create a circular import if the store was imported at the top of `client.ts`. The lazy `await import(...)` inside the interceptor callback avoids this — the import only resolves when a 401 actually occurs, by which point all modules are initialized.

## @/ alias points to src/

The `app/` directory is for Expo Router route files only. All importable code lives in `src/`. The alias `@/theme` → `src/theme` makes this consistent and avoids `../../..` relative paths. Configured in `tsconfig.json`; Metro resolves it natively in Expo SDK 49+.
