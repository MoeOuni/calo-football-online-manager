import { IUser } from "@/lib/interfaces";
import { isAuthorizationCookieSet } from "@/lib/utils";
import React, { createContext, useState, useContext } from "react";

interface IAuthContext {
  user: IUser | null;
  isAuthorized: boolean;
  setUser: (user: IUser | null) => void;
  setIsAuthorized: (isAuthorized: boolean) => void;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  isAuthorized: false,
  setUser: () => {},
  setIsAuthorized: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(
    isAuthorizationCookieSet()
  );

  return (
    <AuthContext.Provider
      value={{ user, setUser, isAuthorized, setIsAuthorized }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
