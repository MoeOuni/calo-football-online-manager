import { IUser } from '@/lib/interfaces';
import React, { createContext, useState, useContext } from 'react';

interface IAuthContext {
  token: string | null;
  user: IUser | null;
  setToken: (token: string | null) => void;
  setUser: (user: IUser | null) => void;
}

const AuthContext = createContext<IAuthContext>({
  token: null,
  user: null,
  setToken: () => {},
  setUser: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<IUser | null>(null);

  return (
    <AuthContext.Provider value={{ token, user, setToken, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
