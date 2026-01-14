'use client';

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';

interface User {
  email: string;
  avatarUrl?: string;
}

interface AuthContextType {
  user: User | null;
  login: (user: Omit<User, 'avatarUrl'>) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem('user');
      if (item) {
        setUser(JSON.parse(item));
      }
    } catch (error) {
      console.error('Failed to load user from localStorage', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (userData: Omit<User, 'avatarUrl'>) => {
    try {
      const newUser = { ...user, ...userData };
      window.localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
    } catch (error) {
      console.error('Failed to save user to localStorage', error);
    }
  };

  const logout = () => {
    try {
      window.localStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      console.error('Failed to remove user from localStorage', error);
    }
  };

  const updateUser = (userData: Partial<User>) => {
    setUser(currentUser => {
      if (!currentUser) return null;
      const updatedUser = { ...currentUser, ...userData };
      try {
        window.localStorage.setItem('user', JSON.stringify(updatedUser));
      } catch (error) {
        console.error('Failed to update user in localStorage', error);
      }
      return updatedUser;
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
