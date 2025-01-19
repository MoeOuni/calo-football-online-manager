import { IUser } from "@/lib/interfaces";
import React, { createContext, useState, useContext } from "react";

interface IAuthContext {
  user: IUser | null;

  setUser: (user: IUser | null) => void;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  setUser: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
