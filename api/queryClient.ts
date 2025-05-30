import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 20 * 1000, // 20초
    },
    mutations: {
      retry: false,
    },
  },
});
