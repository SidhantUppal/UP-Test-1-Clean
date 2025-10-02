'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { PublicClientApplication, EventType, AccountInfo, EventMessage } from '@azure/msal-browser';
import { MsalProvider, useMsal, useIsAuthenticated } from '@azure/msal-react';
import { msalConfig, loginRequest } from './authConfig';

const msalInstance = new PublicClientApplication(msalConfig);

msalInstance.addEventCallback((event: EventMessage) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
    const account = event.payload.account;
    msalInstance.setActiveAccount(account);
  }
});

interface AuthContextType {
  user: AccountInfo | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

function AuthProviderInner({ children }: { children: React.ReactNode }) {
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<AccountInfo | null>(null);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await instance.initialize();
        
        // Handle redirect promise (for redirect flow)
        const response = await instance.handleRedirectPromise();
        if (response && response.account) {
          instance.setActiveAccount(response.account);
          setUser(response.account);
        } else {
          // Check for existing accounts
          const currentAccounts = instance.getAllAccounts();
          if (currentAccounts.length > 0) {
            instance.setActiveAccount(currentAccounts[0]);
            setUser(currentAccounts[0]);
          }
        }
      } catch (error) {
        console.error('Failed to initialize MSAL:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [instance]);

  useEffect(() => {
    if (accounts.length > 0) {
      setUser(accounts[0]);
    } else {
      setUser(null);
    }
  }, [accounts]);

  const login = async () => {
    try {
      // Use redirect instead of popup for web app flow
      await instance.loginRedirect(loginRequest);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Use redirect instead of popup for web app flow
      await instance.logoutRedirect({
        postLogoutRedirectUri: "/"
      });
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <MsalProvider instance={msalInstance}>
      <AuthProviderInner>{children}</AuthProviderInner>
    </MsalProvider>
  );
}