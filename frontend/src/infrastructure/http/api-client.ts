import ky, { type KyInstance, type Options } from 'ky';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

function createApiClient(): KyInstance {
  return ky.create({
    prefixUrl: API_BASE_URL,
    credentials: 'include',
    timeout: 15_000,
    retry: {
      limit: 0,
    },
    hooks: {
      afterResponse: [
        async (
          request: Request,
          options: Record<string, unknown>,
          response: Response,
        ) => {
          if (response.status === 401 && typeof window !== 'undefined') {
            window.location.href = '/login';
          }
          return response;
        },
      ],
    },
  });
}

export const apiClient = createApiClient();

export type ApiRequestOptions = Options;
