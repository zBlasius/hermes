import React, { createContext, useState, useEffect, useContext } from "react";
import * as SecureStore from "expo-secure-store";

interface AuthContextType {
  token: boolean | null;
  insertToken: (token: string) => Promise<void>;
  removeToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<boolean>(false);

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await SecureStore.getItemAsync("jwt");
      setToken(!!storedToken);
    };
    loadToken();
  }, []);

  const insertToken = async (newToken: string) => {
    console.log("Inserting token:", newToken);
    await SecureStore.setItemAsync("jwt", newToken);
    setToken(!!newToken);
  };

  const removeToken = async () => {
    await SecureStore.deleteItemAsync("jwt");
    setToken(false);
  };

  return (
    <AuthContext.Provider value={{ token, insertToken, removeToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve ser usado dentro do AuthProvider");
  return context;
}