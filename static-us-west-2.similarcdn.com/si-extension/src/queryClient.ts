import { QueryClient } from 'react-query';

const ONE_DAY = 1000 * 60 * 60 * 24;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      staleTime: ONE_DAY,
      cacheTime: ONE_DAY,
    },
  },
});
