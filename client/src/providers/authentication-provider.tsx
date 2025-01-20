import { useLogout } from "@/api";
import useSessionStorage from "@/hooks/use-session-storage";
import { API_STATUS_CODES } from "@/lib/contants";
import { IUser } from "@/lib/interfaces";
import { isAuthorizationCookieSet } from "@/lib/utils";
import React, { createContext, useState, useContext } from "react";
import { toast } from "sonner";

interface IAuthContext {
  user: IUser | null;
  isAuthorized: boolean;
  setUser: (user: IUser | null) => void;
  setIsAuthorized: (isAuthorized: boolean) => void;
  handleLogout: () => void;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  isAuthorized: false,
  setUser: () => {},
  setIsAuthorized: () => {},
  handleLogout: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useSessionStorage<IUser | null>("x-calo-user", null);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(
    isAuthorizationCookieSet()
  );

  const logoutMutation = useLogout();

  const handleLogout = async () => {
    const response = await logoutMutation.mutateAsync();

    if (response.status === API_STATUS_CODES.SUCCESS) {
      setUser(null);
      sessionStorage.removeItem("x-calo-user");
      setIsAuthorized(false);
      toast.info(response?.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, isAuthorized, setIsAuthorized, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
