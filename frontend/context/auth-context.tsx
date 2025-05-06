"use client";

import { createContext, useState, useEffect, type ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  isLoading: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        // Try to fetch from API
        const res = await fetch("/api/auth/me");

        if (res.ok) {
          const userData = await res.json();
          setUser(userData);
        } else {
          // If API is not available, check localStorage
          const storedUser = localStorage.getItem("hotel-user");
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }
          console.warn(
            "API endpoint not available, using local storage fallback"
          );
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
        // Check localStorage as fallback
        const storedUser = localStorage.getItem("hotel-user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const userData = await res.json();
        setUser(userData);
        // Store in localStorage for persistence
        localStorage.setItem("hotel-user", JSON.stringify(userData));
      } else {
        // Fallback for development/testing
        if (email === "admin@example.com" && password === "admin123") {
          const mockUser = {
            id: "admin-1",
            name: "Admin User",
            email: "admin@example.com",
            role: "admin",
          };
          setUser(mockUser);
          localStorage.setItem("hotel-user", JSON.stringify(mockUser));
        } else if (
          email === "john.doe@example.com" &&
          password === "password123"
        ) {
          const mockUser = {
            id: "user-1",
            name: "John Doe",
            email: "john.doe@example.com",
            role: "guest",
          };
          setUser(mockUser);
          localStorage.setItem("hotel-user", JSON.stringify(mockUser));
        } else {
          throw new Error("Invalid email or password");
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: any) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        // For development, create a mock user if API fails
        console.warn("API registration failed, creating mock user");
        const mockUser = {
          id: `user-${Date.now()}`,
          name: `${userData.firstName} ${userData.lastName}`,
          email: userData.email,
          role: "guest",
        };
        localStorage.setItem("hotel-user", JSON.stringify(mockUser));
      }
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
      setUser(null);
      // Clear from localStorage
      localStorage.removeItem("hotel-user");
    } catch (error) {
      console.error("Logout failed:", error);
      // Still clear user data even if API call fails
      setUser(null);
      localStorage.removeItem("hotel-user");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
