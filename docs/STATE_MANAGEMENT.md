# State Management

## Two Types of State

| Type | Tool | Location | Examples |
|---|---|---|---|
| Server state | React Query | Fetched from API | jobs list, customer data, schedule |
| Client state | Zustand | `src/store/` | auth token, user, UI preferences |

**Rule:** If the data came from an API, use React Query. If it's local app state, use Zustand.

## Zustand

### Current Stores

- `src/store/auth.store.ts` — authentication state

### Creating a New Store

```typescript
// src/store/ui.store.ts
import { create } from 'zustand';

interface UIState {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  selectedDate: new Date().toISOString(),
  setSelectedDate: (date) => set({ selectedDate: date }),
}));
```

### Rules

- One store per domain (auth, ui, etc.)
- Keep stores flat — avoid deeply nested state
- Actions live inside the store, not outside
- To call a store action outside a component: `useAuthStore.getState().action()`

## React Query

React Query is configured in `app/_layout.tsx` with:
- `staleTime: 5 minutes` — data is fresh for 5 min before refetching
- `retry: 2` — retries failed queries twice
- `retry: 0` for mutations — don't retry writes

### Example

```typescript
// Hook in src/features/drivers/hooks/useDrivers.ts
export function useDrivers() {
  return useQuery({
    queryKey: ['drivers'],
    queryFn: driversService.getAll,
  });
}

// Component usage
function DriversScreen() {
  const { data, isLoading, error } = useDrivers();
}
```

## What NOT to Put in Zustand

- Lists of jobs, customers, drivers → React Query
- Form state → React Hook Form
- Screen-local state → useState

## Adding Persistence Later

If you need to persist Zustand state (e.g. app settings), use the `persist` middleware with an AsyncStorage adapter. Don't add it until you have a real use case.
