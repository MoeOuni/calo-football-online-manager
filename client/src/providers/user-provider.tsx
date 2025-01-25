import { setupQueryKeyTracker } from "@/lib/query-key-tracker";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, useEffect, useState } from "react";

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
import { useComposition, useDraft } from "@/api";
import { useAuth } from "./authentication-provider";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { IDraft } from "@/lib/interfaces/draft";

interface IUserContext {
  composition: IPlayerComposition | null;
  setComposition: (user: IPlayerComposition | null) => void;
  draft: IDraft | null;
  setDraft: (draft: IDraft | null) => void;
}

const UserContext = createContext<IUserContext>({
  composition: null,
  setComposition: () => {},
  draft: null,
  setDraft: () => {},
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
  const [draft, setDraft] = useState<IDraft | null>(null);
  const { isAuthorized } = useAuth();
  const compositionQuery = useComposition({ isAuthorized });
  const draftQuery = useDraft({ isAuthorized, type: "team" });

  const Navigate = useNavigate();

  useEffect(() => {
    if (compositionQuery.isSuccess) {
      setComposition(compositionQuery.data);
    }
  }, [compositionQuery.isSuccess, setComposition, compositionQuery.data]);

  useEffect(() => {
    if (draftQuery.isSuccess && draftQuery.data) {
      setDraft(draftQuery.data);
      toast.info(`You have a saved draft on ${draftQuery.data?.type}`, {
        action: {
          label: "View",
          onClick: () => Navigate(draftQuery?.data?.path),
        },
      });
    }
  }, [draftQuery.isSuccess, setDraft, draftQuery.data]);

  return (
    <UserContext.Provider
      value={{ composition, setComposition, draft, setDraft }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => {
  return useContext(UserContext);
};
