export const Config = {
  apiUrl: process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:5000',
  appName: process.env.EXPO_PUBLIC_APP_NAME ?? 'CWS Mobile',
} as const;
