'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import authService, {
    UserInfo,
    AuthenticationResponse,
    LoginRequest,
    EntraLoginRequest,
    ApiKeyLoginRequest
} from '@/lib/auth/services/authService';

interface AuthContextType
{
    // State
    user: UserInfo | null;
    isLoading: boolean;
    isAuthenticated: boolean;

    // Actions
    loginWithCredentials: (credentials: LoginRequest) => Promise<AuthenticationResponse>;
    loginWithEntra: (request: EntraLoginRequest) => Promise<AuthenticationResponse>;
    loginWithApiKey: (request: ApiKeyLoginRequest) => Promise<AuthenticationResponse>;
    initiateEntraOAuth: (returnUrl?: string) => Promise<void>;
    logout: () => Promise<void>;
    logoutEntra: (returnUrl?: string) => Promise<void>;
    refreshToken: () => Promise<boolean>;
    checkAuthStatus: () => Promise<void>;
    resetLoadingState: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps
{
    children: ReactNode;
}

// DEVELOPER TEST MODE: Create mock user immediately
const MOCK_USER: UserInfo = {
    userId: 1,
    username: 'developer',
    email: 'developer@test.com',
    fullName: 'Test Developer',
    roles: ['admin'],
    userAreaId: 1
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) =>
{
    // Initialize with mock user immediately - no loading state
    const [user, setUser] = useState<UserInfo | null>(MOCK_USER);
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [isCheckingAuth, setIsCheckingAuth] = useState(false);


    // Setup mock auth on mount
    useEffect(() =>
    {
        // Store mock user in localStorage for other parts of the app
        if (typeof window !== 'undefined') {
            localStorage.setItem('user-info', JSON.stringify(MOCK_USER));
            localStorage.setItem('token-expires', new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString());
            console.info('🚀 Developer Test Mode: Auto-authenticated as mock user');
        }

        // Still call setupTokenRefresh but it won't do anything in test mode
        authService.setupTokenRefresh();
    }, []);

    const checkAuthStatus = async () =>
    {
        // In developer test mode, authentication is already handled
        // This function is kept for compatibility but does nothing
        return;

        // ORIGINAL AUTH CODE (disabled for test environment)
        // Uncomment below when ready to enable real authentication
        /*
        // Safety timeout - force reset loading state after 5 seconds
        const safetyTimeout = setTimeout(() => {
            setIsLoading(false);
            setIsCheckingAuth(false);
        }, 5000);

        try
        {
            setIsLoading(true);
            setIsCheckingAuth(true);

            if (authService.isAuthenticated())
            {
                const storedUser = authService.getUser();
                if (storedUser)
                {
                    setUser(storedUser);
                    setIsAuthenticated(true);

                    // Verify user info is still valid
                    try
                    {
                        const currentUser = await authService.getCurrentUser();
                        if (currentUser)
                        {
                            setUser(currentUser);
                        }
                    } catch (error: unknown)
                    {
                        // Only logout if it's a 401 (unauthorized) or 403 (forbidden) error
                        // Other errors (network issues, server errors) shouldn't clear auth
                        if (error && typeof error === 'object' && 'status' in error &&
                           (error.status === 401 || error.status === 403))
                        {
                            await logout();
                        } else
                        {
                            // Keep the stored user info and auth state
                            // But ensure we don't get stuck in an invalid state by refreshing token if available
                            try {
                                const refreshSuccessful = await refreshToken();
                                if (!refreshSuccessful) {
                                    await logout();
                                }
                            } catch (refreshError) {
                                await logout();
                            }
                        }
                    }
                } else {
                    setUser(null);
                    setIsAuthenticated(false);
                }
            } else
            {
                setUser(null);
                setIsAuthenticated(false);
            }
        } catch (error)
        {
            setUser(null);
            setIsAuthenticated(false);
        } finally
        {
            clearTimeout(safetyTimeout);
            setIsCheckingAuth(false);
            setIsLoading(false);
        }
        */
    };

    const loginWithCredentials = async (credentials: LoginRequest): Promise<AuthenticationResponse> =>
    {
        try
        {
            setIsLoading(true);
            const response = await authService.loginWithCredentials(credentials);

            if (response.success && response.user)
            {
                setUser(response.user);
                setIsAuthenticated(true);
            } else {
                setUser(null);
                setIsAuthenticated(false);
            }

            return response;
        } catch (error)
        {
            setUser(null);
            setIsAuthenticated(false);
            return {
                success: false,
                message: 'Login failed',
                expiresAt: new Date()
            };
        } finally
        {
            setIsLoading(false);
        }
    };

    const loginWithEntra = async (request: EntraLoginRequest): Promise<AuthenticationResponse> =>
    {
        try
        {
            setIsLoading(true);
            const response = await authService.loginWithEntra(request);

            if (response.success && response.user)
            {
                setUser(response.user);
                setIsAuthenticated(true);
            }

            return response;
        } catch (error)
        {
            console.error('Entra login failed:', error);
            return {
                success: false,
                message: 'Entra login failed',
                expiresAt: new Date()
            };
        } finally
        {
            setIsLoading(false);
        }
    };

    const loginWithApiKey = async (request: ApiKeyLoginRequest): Promise<AuthenticationResponse> =>
    {
        try
        {
            setIsLoading(true);
            const response = await authService.loginWithApiKey(request);

            if (response.success && response.user)
            {
                setUser(response.user);
                setIsAuthenticated(true);
            }

            return response;
        } catch (error)
        {
            console.error('API key login failed:', error);
            return {
                success: false,
                message: 'API key login failed',
                expiresAt: new Date()
            };
        } finally
        {
            setIsLoading(false);
        }
    };

    const logout = async (): Promise<void> =>
    {
        setIsLoading(true);
        
        try
        {
            await authService.logout();
        } catch (error) {
            // Handle error silently
        }
        
        // Always clear auth state and reset loading, regardless of API success/failure
        setUser(null);
        setIsAuthenticated(false);
        setIsLoading(false);
    };

    const logoutEntra = async (returnUrl?: string): Promise<void> =>
    {
        try
        {
            setIsLoading(true);
            
            // Clear auth data from storage first
            await authService.logout(); // This clears tokens and calls the API
            
            // DON'T clear React state yet - let Microsoft handle the redirect
            // The React state will be cleared when the page redirects back
            
            // Redirect to Microsoft logout - this will leave the current page
            await authService.logoutEntra(returnUrl);
        } catch (error)
        {
            // Only clear state if logout failed
            setUser(null);
            setIsAuthenticated(false);
            setIsLoading(false);
            throw error;
        }
    };

    const initiateEntraOAuth = async (returnUrl?: string): Promise<void> =>
    {
        try
        {
            await authService.initiateEntraOAuth(returnUrl);
        } catch (error)
        {
            console.error('OAuth initiation failed:', error);
            throw error;
        }
    };

    const refreshToken = async (): Promise<boolean> =>
    {
        try
        {
            const success = await authService.refreshToken();
            if (success)
            {
                const updatedUser = authService.getUser();
                setUser(updatedUser);
                setIsAuthenticated(true);
            } else
            {
                setUser(null);
                setIsAuthenticated(false);
            }
            return success;
        } catch (error)
        {
            console.error('Token refresh failed:', error);
            setUser(null);
            setIsAuthenticated(false);
            return false;
        }
    };

    // Emergency function to reset loading state
    const resetLoadingState = () => {
        // Force multiple state updates to ensure React picks it up
        setIsLoading(true);  // First set to true
        setIsCheckingAuth(false);
        
        // Then immediately set to false in next tick
        setTimeout(() => {
            setIsLoading(false);
        }, 0);
        
        // And one more time to be absolutely sure
        setTimeout(() => {
            setIsLoading(false);
        }, 10);
    };

    const value: AuthContextType = {
        user,
        isLoading,
        isAuthenticated,
        loginWithCredentials,
        loginWithEntra,
        loginWithApiKey,
        initiateEntraOAuth,
        logout,
        logoutEntra,
        refreshToken,
        checkAuthStatus,
        resetLoadingState
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the auth context
export const useAuth = (): AuthContextType =>
{
    const context = useContext(AuthContext);
    if (context === undefined)
    {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;