import useSWR from 'swr';

import api from '../services/api';

export function useFetch<Data = any, Error = any>(
  url: string,
  token: string,
): any {
  const { data, error } = useSWR<Data, Error>(url, async (urlSWR) => {
    const response = await api.get(urlSWR, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const dataSWR = await response.data;

    return dataSWR;
  });

  return { data, error };
}
