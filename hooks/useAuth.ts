import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import type { User } from '../types';
import { v4 as uuidv4 } from 'uuid';

// --- Helper Functions for managing the user database in localStorage ---
const getUsersDatabase = (): Record<string, any> => {
    try {
        const usersJson = localStorage.getItem('users');
        return usersJson ? JSON.parse(usersJson) : {};
    } catch (error) {
        console.error("Failed to parse users database from localStorage", error);
        return {};
    }
};

const saveUsersDatabase = (users: Record<string, any>) => {
    try {
        localStorage.setItem('users', JSON.stringify(users));
    } catch (error) {
        console.error("Failed to save users database to localStorage", error);
    }
};

// --- Initial Seeding for the three specific Demo Users ---
const seedDemoUsers = () => {
    const users = getUsersDatabase();
    
    const demoAccounts = {
        'laksh@gmail.com': {
            id: 'demo-user-grocery',
            password: '123456',
            name: 'Laksh',
            shopName: 'Laksh\'s Fresh Mart',
            shopLogo: `https://i.pravatar.cc/150?u=laksh-grocery`,
            shopAddress: '456 Market Drive, Food City, 560001',
            phoneNumber: '9123456780',
            gstNumber: '29LMNOP5678G1Z9',
            taxRate: 5,
            businessCategory: 'grocery',
            themePreference: 'vibrant'
        },
        'laksh1@gmail.com': {
            id: 'demo-user-electronics',
            password: '123456',
            name: 'Laksh Elec',
            shopName: 'Laksh Electronics',
            shopLogo: `https://i.pravatar.cc/150?u=laksh-electronics`,
            shopAddress: '123 Tech Street, Silicon Valley, CA, 95054',
            phoneNumber: '9876543210',
            gstNumber: '27ABCDE1234F1Z5',
            taxRate: 18,
            businessCategory: 'electronics',
            themePreference: 'professional'
        },
        'laksh2@gmail.com': {
            id: 'demo-user-pharmacy',
            password: '123456',
            name: 'Laksh Pharma',
            shopName: 'Laksh Wellness Pharmacy',
            shopLogo: `https://i.pravatar.cc/150?u=laksh-pharmacy`,
            shopAddress: '789 Health Lane, Med City, 560002',
            phoneNumber: '9988776655',
            gstNumber: '29ABCDE1234F1Z6',
            taxRate: 12,
            businessCategory: 'pharmacy',
            themePreference: 'professional'
        }
    };

    for (const email in demoAccounts) {
        if (!users[email]) {
            users[email] = { email, ...demoAccounts[email as keyof typeof demoAccounts] };
        }
    }

    saveUsersDatabase(users);
};
seedDemoUsers();


// --- Auth Context and Provider ---
interface AuthContextType {
  currentUser: User | null;
  login: (email: string, pass: string, rememberMe: boolean) => { success: boolean; error?: string };
  logout: () => void;
  signup: (details: Omit<User, 'id'> & {password: string}) => { success: boolean; error?: string };
  updateUser: (details: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const rememberedUserJson = localStorage.getItem('currentUser');
      if (rememberedUserJson) return JSON.parse(rememberedUserJson);
      const sessionUserJson = sessionStorage.getItem('currentUser');
      return sessionUserJson ? JSON.parse(sessionUserJson) : null;
    } catch (error) {
      console.error("Failed to load current user from storage", error);
      return null;
    }
  });

  const login = (email: string, pass: string, rememberMe: boolean) => {
    const normalizedEmail = email.toLowerCase().trim();
    const users = getUsersDatabase();
    const userData = users[normalizedEmail];

    if (!userData) return { success: false, error: 'user_not_found' };
    if (userData.password !== pass) return { success: false, error: 'incorrect_password' };

    const user: User = {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        shopName: userData.shopName,
        shopLogo: userData.shopLogo,
        shopAddress: userData.shopAddress,
        phoneNumber: userData.phoneNumber,
        gstNumber: userData.gstNumber,
        taxRate: userData.taxRate,
        businessCategory: userData.businessCategory || 'other',
        themePreference: userData.themePreference || 'vibrant',
    };

    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUser');

    if (rememberMe) {
        localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
        sessionStorage.setItem('currentUser', JSON.stringify(user));
    }
    
    setCurrentUser(user);
    return { success: true };
  };

  const signup = (details: Omit<User, 'id'> & {password: string}) => {
    const normalizedEmail = details.email.toLowerCase().trim();
    const users = getUsersDatabase();
    
    // Prevent demo accounts from being overwritten
    const demoEmails = ['laksh@gmail.com', 'laksh1@gmail.com', 'laksh2@gmail.com'];
    if (demoEmails.includes(normalizedEmail)) {
      return { success: false, error: 'This is a demo account email and cannot be used for new registration.' };
    }
    
    if (users[normalizedEmail]) {
        return { success: false, error: 'This email is already registered. Please log in instead.' };
    }
    
    const newUserId = `user-${uuidv4()}`;
    const newUserForDb = { id: newUserId, password: details.password, ...details, email: normalizedEmail };
    users[normalizedEmail] = newUserForDb;
    saveUsersDatabase(users);

    const { password, ...userForState } = newUserForDb;
    sessionStorage.setItem('currentUser', JSON.stringify(userForState));
    setCurrentUser(userForState);

    return { success: true };
  };

  const logout = useCallback(() => {
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUser');
    setCurrentUser(null);
  }, []);
  
  const updateUser = (details: Partial<User>) => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, ...details };
    setCurrentUser(updatedUser);

    if (localStorage.getItem('currentUser')) {
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    } else {
        sessionStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }

    const users = getUsersDatabase();
    const userRecord = users[currentUser.email];
    if (userRecord) {
        Object.assign(userRecord, details);
        saveUsersDatabase(users);
    }
  };

  const value = { currentUser, login, logout, signup, updateUser };

  return React.createElement(AuthContext.Provider, { value }, children);
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};