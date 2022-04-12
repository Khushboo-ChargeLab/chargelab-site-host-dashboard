import { useEffect, useState, useRef } from 'react';
import { get } from '../services/http/http.service';

export const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const json = (await get(url)) as T;
        console.log('json:', json);
        setData(json);
      } catch (e: any) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    };
    setIsLoading(true);
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, error, isLoading };
};
