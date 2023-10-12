import { useEffect } from 'react';
import { $fetching } from 'stores/layout';
import useSWR, { SWRConfiguration, useSWRConfig } from 'swr';
import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';
import request, { RequestConfig, RespondError } from 'utils/request';

export function useFetch<TData = unknown, TPayload = unknown>(
  url: string,
  config: RequestConfig<TPayload> = {},
  { enable = true, ...options }: SWRConfiguration<TData, RespondError> & { enable?: boolean } = {},
) {
  const key = enable ? [url, config.payload] : null;
  const fetcher = useSWR(key, () => request<TData, TPayload>(url, { method: 'GET', ...config }), { ...options, revalidateOnMount: true });

  return {
    ...fetcher,
    isError: !!fetcher.error,
  };
}

export function useMutate<TData = unknown, TPayload = unknown>(
  url: string,
  config: RequestConfig<TPayload> = {},
  options: SWRMutationConfiguration<TData, RespondError> = {},
) {
  const { trigger, ...rest } = useSWRMutation(
    url,
    (url: string, { arg }: { arg: RequestConfig<TPayload> }) => request<TData, TPayload>(url, { ...config, ...arg }),
    options,
  );

  return {
    ...rest,
    mutate: trigger,
    isError: !!rest.error,
  };
}

export function useRevalidate() {
  const { mutate } = useSWRConfig();
  return (url: string, payload?: unknown) => mutate([url, payload], undefined, { optimisticData: true });
}
