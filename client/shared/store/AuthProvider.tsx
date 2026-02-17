import React, { createContext, useState, useEffect, useContext } from "react";
import * as SecureStore from "expo-secure-store";

interface AuthContextType {
  token: boolean | null;
  insertToken: (token: string) => Promise<void>;
  removeToken: () => Promise<void>;
  tabSelected: string | null;
  changeTab: (tabName: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ //TODO - Change provider name
  children,
}) => {
  const [token, setToken] = useState<boolean>(false);
  const [tabSelected, setTabSelected] = useState<string | null>(null);

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

  const changeTab = (tabName: string) => {
    setTabSelected(tabName);
  };

  return (
    <AuthContext.Provider
      value={{ token, insertToken, removeToken, tabSelected, changeTab }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro do AuthProvider");
  }

  return context;
}

export function useTabStore() {
  const context = useContext(AuthContext);
  console.log(  'useTabStore context', context);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro do AuthProvider");
  }

  return context;
}
