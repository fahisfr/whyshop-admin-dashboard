"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Context from "./context";
import { ThemeProvider } from "next-themes";
const queryClient = new QueryClient({
 
});

interface Props {
  children: React.ReactNode;
}

const AppWrapper = ({ children }: Props) => {
  return (
    <Context>
      <ThemeProvider attribute="class">
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools initialIsOpen />
        </QueryClientProvider>
      </ThemeProvider>
    </Context>
  );
};

export default AppWrapper;
