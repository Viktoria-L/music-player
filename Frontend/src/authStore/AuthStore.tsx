// AuthContext.tsx
import React, { createContext, useState, ReactNode, useContext } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (user: string, pass: string) => void;
  register: (
    firstname: string,
    lastname: string,
    user: string,
    pass: string
  ) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (user: string, pass: string) => {
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ user, pass }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Login successful:", data);
        setIsAuthenticated(true);
      } else {
        console.error("Login failed:", data.error);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const register = async (
    firstname: string,
    lastname: string,
    user: string,
    pass: string
  ) => {
    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstname, lastname, user, pass }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Registration successful:", data);
        // Option to log user in right after registration
        login(user, pass);
      } else {
        console.error("Registration failed:", data.error);
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
