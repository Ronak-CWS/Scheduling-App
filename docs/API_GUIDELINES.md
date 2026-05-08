# API Guidelines

## Client Setup

All requests go through `src/api/client.ts` — a single Axios instance.

Base URL comes from `EXPO_PUBLIC_API_URL` (see ENVIRONMENT.md).

## Response Shape

The backend should return:

```typescript
// Single resource
{
  "success": true,
  "data": { ... },
  "message": "Optional message"
}

// List / paginated
{
  "success": true,
  "data": [...],
  "total": 100,
  "page": 1,
  "limit": 20,
  "hasMore": true
}
```

These types are defined in `src/types/api.ts`.

## Service Pattern

Each feature has a service file that wraps API calls:

```typescript
// src/features/jobs/services/jobs.service.ts
export const jobsService = {
  getAll: async (): Promise<Job[]> => {
    const { data } = await apiClient.get<ApiResponse<Job[]>>('/jobs');
    return data.data;
  },

  getById: async (id: string): Promise<Job> => {
    const { data } = await apiClient.get<ApiResponse<Job>>(`/jobs/${id}`);
    return data.data;
  },

  create: async (payload: CreateJobInput): Promise<Job> => {
    const { data } = await apiClient.post<ApiResponse<Job>>('/jobs', payload);
    return data.data;
  },
};
```

## React Query Pattern

Use React Query hooks for all server state:

```typescript
// src/features/jobs/hooks/useJobs.ts
export function useJobs() {
  return useQuery({
    queryKey: ['jobs'],
    queryFn: jobsService.getAll,
  });
}

export function useCreateJob() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: jobsService.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['jobs'] }),
  });
}
```

## Query Keys

Use string arrays as query keys. Keep them consistent:

```typescript
['jobs']              // all jobs
['jobs', id]          // single job
['jobs', { status }]  // filtered jobs
['customers']
['schedule', date]
```

## Error Handling

Axios errors are `AxiosError`. Extract the message like:

```typescript
const errorMessage = (error as AxiosError<ApiError>).response?.data?.message
  ?? error.message
  ?? 'Something went wrong';
```

React Query surfaces errors via `error` in `useQuery` / `useMutation` return values.

## Timeouts

Default timeout is 10 seconds (set in `src/api/client.ts`). Override per-request if needed:

```typescript
apiClient.get('/large-export', { timeout: 30000 });
```
