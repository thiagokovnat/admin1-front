import React, { createContext, useState, useContext } from "react";

interface AuthContextData {
  loggedIn: boolean;
  login: (token: string, token_type: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(() => {
    // Al iniciar, intenta obtener el estado de autenticación de localStorage
    const storedLoggedIn = localStorage.getItem("loggedIn");
    return storedLoggedIn === "true";
  });

  function login(token: string, token_type: string) {
    setLoggedIn(true);
    // Cuando el usuario inicia sesión, guarda el estado en localStorage
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("token", token);
    localStorage.setItem("token_type", token_type);
  }

  function logout() {
    setLoggedIn(false);
    // Cuando el usuario cierra sesión, borra el estado de localStorage
    localStorage.removeItem("loggedIn");
  }

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
