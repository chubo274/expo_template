import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import ZustandPersist from 'zustand/persist';
import { handleApiError } from './common';

export interface TokenManager {
  getToken: () => Promise<string | null>;
  setToken: (token: string) => Promise<void>;
  clearToken: () => Promise<void>;
}

export const setupRequestInterceptor = () => {
  return async (config: InternalAxiosRequestConfig) => {
    // Add auth token if available
    const token = await ZustandPersist.getState().accessToken;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
      config.headers.delete('Content-Type');
    }

    console.info(`→ [API] ${config.method?.toUpperCase()} `, config);

    return config;
  };
};

export const setupResponseSuccessInterceptor = () => {
  return (response: AxiosResponse) => {
    console.info(`Raw response:`, response);
    return response;
  };
};

export const setupResponseInterceptor = () => {
  return async (error: AxiosError) => {
    if (error) {
      console.error(`Raw error:`, error);
    }

    const apiError = handleApiError(error);

    if (apiError.statusCode === 401) {
      ZustandPersist.getState().logout();
    }

    return Promise.reject(apiError);
  };
};
