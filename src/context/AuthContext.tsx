import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type User = {
  name?: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string) => void;
  signup: (name: string, email: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  signup: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('authUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const login = async (email: string) => {
    try {
      // Check our mock database of registered users
      const existingUsersStr = await AsyncStorage.getItem('usersDatabase');
      const existingUsers = existingUsersStr ? JSON.parse(existingUsersStr) : {};
      
      // If the user exists in our mock DB, grab their full profile (with name)
      // Otherwise, just log them in with their email
      const loggedInUser = existingUsers[email] || { email };
      
      setUser(loggedInUser);
      await AsyncStorage.setItem('authUser', JSON.stringify(loggedInUser));
    } catch (e) {
      console.error(e);
    }
  };

  const signup = async (name: string, email: string) => {
    try {
      const newUser = { name, email };
      
      // 1. Log the user in
      setUser(newUser);
      await AsyncStorage.setItem('authUser', JSON.stringify(newUser));
      
      // 2. Save them to our mock database so we remember their name later
      const existingUsersStr = await AsyncStorage.getItem('usersDatabase');
      const existingUsers = existingUsersStr ? JSON.parse(existingUsersStr) : {};
      
      existingUsers[email] = newUser;
      await AsyncStorage.setItem('usersDatabase', JSON.stringify(existingUsers));
    } catch (e) {
      console.error(e);
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      await AsyncStorage.removeItem('authUser');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
