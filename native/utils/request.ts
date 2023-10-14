import axios, { RawAxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';
import * as Device from 'expo-device';
import { $token } from 'stores';
import { $toast } from 'stores/layout';

export type RespondError = { status: number | string; message: string };

export type RequestConfig<TPayload> = RawAxiosRequestConfig & {
  type?: 'csv' | 'multipart';
  token?: string;
  payload?: TPayload;
  headers?: RawAxiosRequestHeaders;
};

export default async function request<TData = unknown, TPayload = unknown>(url: string, config?: RequestConfig<TPayload>) {
  const formData = typeof window !== 'undefined' && new FormData();
  const { type, token, payload, method = 'POST', headers = {}, ...rest } = config || {};

  switch (type) {
    case 'csv':
      rest.responseType = 'blob';
      headers['Accept'] = 'application/csv';
      break;

    case 'multipart':
      headers['Content-Type'] = 'multipart/form-data';
      if (formData && payload) {
        Object.entries(payload).forEach(([name, value]) => {
          formData.append(name, value as string | Blob);
        });
      }
      break;

    default:
      headers['Content-Type'] = 'application/json';
  }

  return axios<TData>({
    url,
    method,
    //@ts-ignore
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    headers: { ...headers, Authorization: $token.get() },
    [method !== 'GET' ? 'data' : 'params']: { ...(type === 'multipart' ? formData : payload), OS: Device.osName?.toLowerCase() },
    ...rest,
  })
    .then(({ data }) => data)
    .catch(({ code, message, response }) => {
      const status = response.status || code;
      if (status === 401) {
        $token.set(null);
        $toast.set({ type: 'error', message: 'Session Expired' });
      } else {
        return Promise.reject({ status, message: response?.message || message });
      }
    });
}
