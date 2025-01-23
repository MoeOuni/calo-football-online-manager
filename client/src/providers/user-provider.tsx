import { setupQueryKeyTracker } from "@/lib/query-key-tracker";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, useEffect } from "react";

const queryClient = new QueryClient();

// Setup the query key tracker
setupQueryKeyTracker(queryClient);

export function ReactQueryProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}
import useSessionStorage from "@/hooks/use-session-storage";
import { IPlayerComposition } from "@/lib/interfaces";
import React, { createContext, useContext } from "react";
import { useComposition } from "@/api";
import { useAuth } from "./authentication-provider";

interface IUserContext {
  composition: IPlayerComposition | null;
  setComposition: (user: IPlayerComposition | null) => void;
}

const UserContext = createContext<IUserContext>({
  composition: null,
  setComposition: () => {},
});

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [composition, setComposition] =
    useSessionStorage<IPlayerComposition | null>(
      "x-calo-user-composition",
      null
    );
  const { isAuthorized } = useAuth();
  const compositionQuery = useComposition({ isAuthorized });

  useEffect(() => {
    if (compositionQuery.isSuccess) {
      setComposition(compositionQuery.data);
    }
  }, [compositionQuery.isSuccess, setComposition, compositionQuery.data]);

  return (
    <UserContext.Provider value={{ composition, setComposition }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => {
  return useContext(UserContext);
};
