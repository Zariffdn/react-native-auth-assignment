import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type User = {
  name?: string;
  email: string;
  password?: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password?: string) => Promise<void>;
  signup: (name: string, email: string, password?: string) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  signup: async () => {},
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

  const login = async (email: string, password?: string) => {
    const existingUsersStr = await AsyncStorage.getItem('usersDatabase');
    const existingUsers = existingUsersStr ? JSON.parse(existingUsersStr) : {};
    
    const userRecord = existingUsers[email.toLowerCase()];
    
    if (!userRecord || userRecord.password !== password) {
      throw new Error('Incorrect credentials');
    }
    
    const activeUser = { name: userRecord.name, email: userRecord.email };
    setUser(activeUser);
    await AsyncStorage.setItem('authUser', JSON.stringify(activeUser));
  };

  const signup = async (name: string, email: string, password?: string) => {
    const existingUsersStr = await AsyncStorage.getItem('usersDatabase');
    const existingUsers = existingUsersStr ? JSON.parse(existingUsersStr) : {};
    
    const lowerEmail = email.toLowerCase();
    
    if (existingUsers[lowerEmail]) {
      throw new Error('User with this email already exists');
    }
    
    const newUserRecord = { name, email: lowerEmail, password };
    existingUsers[lowerEmail] = newUserRecord;
    
    await AsyncStorage.setItem('usersDatabase', JSON.stringify(existingUsers));
    
    const activeUser = { name, email: lowerEmail };
    setUser(activeUser);
    await AsyncStorage.setItem('authUser', JSON.stringify(activeUser));
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
