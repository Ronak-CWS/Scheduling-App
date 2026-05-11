# Environment Configuration

## Setup

Copy `.env.example` to `.env` and fill in values:

```bash
cp .env.example .env
```

`.env` is gitignored. `.env.example` is committed as a template.

## Variables

| Variable | Description | Default |
|---|---|---|
| `EXPO_PUBLIC_API_URL` | Backend API base URL | `http://localhost:5000` |
| `EXPO_PUBLIC_APP_NAME` | App display name | `CWS Mobile` |

## EXPO_PUBLIC_ Prefix

Expo only exposes variables prefixed with `EXPO_PUBLIC_` to the client bundle. Variables without this prefix are only available at build time (e.g. EAS secrets) and will be undefined at runtime.

Do not put secrets (API keys, passwords) in `EXPO_PUBLIC_` variables — they are bundled into the app binary.

## Accessing Config

Always import from `src/constants/config.ts`, not `process.env` directly:

```typescript
import { Config } from '@/constants/config';

console.log(Config.apiUrl);     // http://localhost:5000
console.log(Config.appName);    // CWS Mobile
```

This gives you TypeScript types and a fallback default in one place.

## Per-Environment URLs

For development vs staging vs production, use separate `.env` files:

```
.env                  → local dev (gitignored)
.env.staging          → staging (gitignored)
.env.production       → production (gitignored)
```

When building with EAS Build, set these as EAS environment variables in `eas.json`.

## Adding New Variables

1. Add to `.env.example` (document it)
2. Add to `.env` with your local value
3. Add to `src/constants/config.ts` with a fallback
4. Update this file
