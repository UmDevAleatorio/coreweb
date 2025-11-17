'use client'

import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { makeUserUseCases } from '@/core/factories/makeUserUseCases';
import { User } from '@/core/domain/entities/User';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, pass: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const userUseCases = makeUserUseCases();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, pass: string) => {
    try {
      const foundUser = await userUseCases.loginUser.execute({ email, password: pass });
      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem('user', JSON.stringify({ 
            id: foundUser.id, 
            name: foundUser.name.value, 
            email: foundUser.email.value 
        }));
        return true;
      }
      return false;
    } catch (error) { console.error(error); return false; }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const register = async (name: string, email: string, pass: string) => {
    try {
      const existingUser = await userUseCases.findUserByEmail.execute({ email });
      if (existingUser) {
        return false; 
      }
      await userUseCases.registerUser.execute({ name, email, password: pass });
      return true;
    } catch (error) { console.error(error); throw error; }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context;
}