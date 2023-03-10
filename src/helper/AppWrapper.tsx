"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Context, { useAppContext } from "./context";
import { errorHandler } from "./errorHandler";

interface Props {
  children: React.ReactNode;
}

function useReactQueryClient() {
  const { reducerActionTypes, showErrorMessage, showSuccessMessage } =
    useAppContext();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 60 * 1,
      },
      mutations: {
        onSuccess: (data) => {
          showSuccessMessage(data.message);
        },
        onError: (error) => {
          const message = errorHandler(error).message;
          showErrorMessage(message);
        },
      },
    },
  });

  return queryClient;
}

const AppWrapper = ({ children }: Props) => {
  return (
    <Context>
      <ThemeProvider attribute="class">
        <QueryClientProvider client={useReactQueryClient()}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ThemeProvider>
    </Context>
  );
};

export default AppWrapper;
