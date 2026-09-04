/**
 * Frontend Environment Configuration
 * Reads NEXT_PUBLIC_API_URL from environment variables and normalizes it.
 * Defaults to the deployed production backend if not explicitly provided.
 */
const getNormalizedApiUrl = () => {
  const envUrl = process.env.NEXT_PUBLIC_API_URL;
  const defaultUrl = 'https://15-206-140-203.sslip.io/api';
  const url = (envUrl && envUrl.trim()) ? envUrl.trim() : defaultUrl;

  // Remove any trailing slashes
  let sanitized = url.replace(/\/+$/, '');

  // Ensure /api path is present for unified endpoint routing
  if (!sanitized.endsWith('/api')) {
    sanitized = `${sanitized}/api`;
  }

  return sanitized;
};

export const envConfig = {
  apiUrl: getNormalizedApiUrl(),
  isProduction: process.env.NODE_ENV === 'production',
};

