import { createContext, useContext, useState, useEffect } from "react";
import authService from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from local storage on initial mount
  useEffect(() => {
    const storedUser = localStorage.getItem("parkit_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem("parkit_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials) => {
    setIsLoading(true);
    try {
      const response = await authService.login(credentials);
      // API shape: { success, data: { token, user: {...} }, message }
      const userData = response?.data?.user || response?.user || response;
      const token = response?.data?.token || response?.token;
      setUser(userData);
      localStorage.setItem("parkit_user", JSON.stringify(userData));
      if (token) {
        localStorage.setItem("parkit_token", token);
      }
      return userData;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    setIsLoading(true);
    try {
      const response = await authService.register(userData);
      return response;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authService.logout();
    } catch (error) {
      // Ignore logout errors (e.g. token already expired)
    } finally {
      setUser(null);
      localStorage.removeItem("parkit_user");
      localStorage.removeItem("parkit_token");
      setIsLoading(false);
    }
  };

  const resetPassword = async (data) => {
    return await authService.resetPassword(data);
  };

  /** Convenience role helpers — API uses "type" field with value "admin" */
  const isAdmin =
    user?.type === "admin" ||
    user?.role === "admin" ||
    user?.role === "ADMIN" ||
    user?.is_admin === true;

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{ user, isLoading, isAuthenticated, isAdmin, login, register, logout, resetPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (ctx === null) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  return ctx;
}
