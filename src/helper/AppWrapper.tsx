"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Context from "./context";
const queryClient = new QueryClient();

interface Props {
  children: React.ReactNode;
}

const AppWrapper = ({ children }: Props) => (
  <Context>
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  </Context>
);

export default AppWrapper;
