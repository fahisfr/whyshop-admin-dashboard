"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
const queryClient = new QueryClient();

interface Props {
  children: React.ReactNode;
}

const ReactQueryWrapper = ({ children }: Props) => (
  <QueryClientProvider client={queryClient}>
    {children}
    <ReactQueryDevtools initialIsOpen />
  </QueryClientProvider>
);

export default ReactQueryWrapper;
