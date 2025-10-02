import { ApiClient, ApiResponse } from './api/ApiClient';

// Auth types matching the backend ViewModels
export enum AuthenticationType
{
    UsernamePassword = 1,
    MicrosoftEntra = 2,
    ApiKey = 3
}

export interface UserInfo
{
    userId: number;
    username: string;
    email: string;
    fullName: string;
    roles: string[];
    userAreaId?: number;
}

export interface AuthenticationRequest
{
    type: AuthenticationType;
    username?: string;
    password?: string;
    entraToken?: string;
    apiKey?: string;
}

export interface AuthenticationResponse
{
    success: boolean;
    token?: string;
    refreshToken?: string;
    expiresAt: Date;
    user?: UserInfo;
    message?: string;
}

export interface LoginRequest
{
    username: string;
    password: string;
}

export interface EntraLoginRequest
{
    entraToken: string;
}

export interface ApiKeyLoginRequest
{
    apiKey: string;
}

export interface RefreshTokenRequest
{
    token: string;
    refreshToken: string;
}

class AuthService
{
    private apiClient: ApiClient;
    private readonly USER_KEY = 'user-info';
    private readonly EXPIRES_KEY = 'token-expires';
    private csrfToken: string | null = null;

    constructor()
    {
        this.apiClient = new ApiClient('http://localhost:3011'); // C# Api.SysAdmin HTTPS port
        // No longer need to manage tokens - cookies handle this automatically
    }

    // Username/Password login
    async loginWithCredentials(credentials: LoginRequest): Promise<AuthenticationResponse>
    {
        try
        {
            // Get CSRF token first
            await this.refreshCsrfToken();

            const response = await this.apiClient.post<AuthenticationResponse>(
                '/api/Auth/login/password',
                credentials,
                {
                    headers: {
                        ...(this.csrfToken && { 'X-CSRF-TOKEN': this.csrfToken })
                    },
                    credentials: 'include' // Critical for cookies
                }
            );

            if (response.data.success)
            {
                // Store user info and expiry, but no tokens (they're in cookies now)
                this.storeAuthData(response.data, 'password');
            }

            return response.data;
        } catch (error: unknown)
        {
            console.warn('Login failed - Full error:', error);
            if (error && typeof error === 'object') {
                if ('message' in error) console.warn('Login failed - Error message:', error.message);
                if ('status' in error) console.warn('Login failed - Error status:', error.status);
                if ('data' in error) console.warn('Login failed - Error data:', error.data);
            }

            let errorMessage = 'Login failed';
            if (error && typeof error === 'object' && 'status' in error && error.status === 401) {
                errorMessage = 'Invalid username or password';
            } else if (error && typeof error === 'object' && 'status' in error && error.status === 0) {
                errorMessage = 'Cannot connect to authentication server';
            } else if (error && typeof error === 'object' && 'message' in error) {
                errorMessage = String(error.message);
            } else if (error && typeof error === 'object' && 'data' in error &&
                      error.data && typeof error.data === 'object' && 'message' in error.data) {
                errorMessage = String(error.data.message);
            }

            return {
                success: false,
                message: errorMessage,
                expiresAt: new Date()
            };
        }
    }

    // Microsoft Entra login
    async loginWithEntra(request: EntraLoginRequest): Promise<AuthenticationResponse>
    {
        try
        {
            const response = await this.apiClient.post<AuthenticationResponse>('/api/Auth/login/entra', request);

            if (response.data.success && response.data.token)
            {
                this.storeAuthData(response.data, 'entra');
            }

            return response.data;
        } catch (error)
        {
            console.error('Entra login failed:', error);
            return {
                success: false,
                message: 'Entra login failed',
                expiresAt: new Date()
            };
        }
    }

    // API Key login
    async loginWithApiKey(request: ApiKeyLoginRequest): Promise<AuthenticationResponse>
    {
        try
        {
            const response = await this.apiClient.post<AuthenticationResponse>('/api/Auth/login/apikey', request);

            if (response.data.success && response.data.token)
            {
                this.storeAuthData(response.data, 'apikey');
            }

            return response.data;
        } catch (error)
        {
            console.error('API key login failed:', error);
            return {
                success: false,
                message: 'API key login failed',
                expiresAt: new Date()
            };
        }
    }

    // Initiate Microsoft Entra OAuth flow
    async initiateEntraOAuth(returnUrl?: string): Promise<void>
    {
        try
        {
            const url = `/api/Auth/login/entra/oauth${returnUrl ? `?returnUrl=${encodeURIComponent(returnUrl)}` : ''}`;
            const response = await this.apiClient.get<{ authUrl: string; redirectUri: string; state: string }>(url);
            
            // Redirect to Microsoft's OAuth URL
            window.location.href = response.data.authUrl;
        } catch (error)
        {
            console.error('Failed to initiate OAuth flow:', error);
            console.error('Full error details:', error);
            throw new Error('Failed to start Microsoft authentication');
        }
    }

    // Refresh token (simplified for cookie-based auth)
    async refreshToken(): Promise<boolean>
    {
        try
        {
            // With cookie-based auth, the server handles token refresh automatically
            // We just need to make a call to refresh endpoint to get new cookies
            const response = await this.apiClient.post<AuthenticationResponse>('/api/Auth/refresh', {}, {
                credentials: 'include',
                headers: {
                    ...(this.csrfToken && { 'X-CSRF-TOKEN': this.csrfToken })
                }
            });

            if (response.data.success)
            {
                this.storeAuthData(response.data);
                return true;
            }

            return false;
        } catch (error)
        {
            console.error('Token refresh failed:', error);
            return false;
        }
    }

    // CSRF token management
    private async refreshCsrfToken(): Promise<void>
    {
        try
        {
            const response = await this.apiClient.get<{token: string}>('/api/Auth/csrf-token', {
                credentials: 'include'
            });
            this.csrfToken = response.data.token;
        } catch (error)
        {
            console.error('Failed to get CSRF token:', error);
        }
    }

    // Logout
    async logout(): Promise<void>
    {
        try
        {
            await this.apiClient.post('/api/Auth/logout', {}, {
                credentials: 'include',
                headers: {
                    ...(this.csrfToken && { 'X-CSRF-TOKEN': this.csrfToken })
                }
            });
        } catch (error)
        {
            console.error('Logout failed:', error);
        } finally
        {
            this.clearAuthData();
        }
    }

    // Microsoft Entra logout - redirects to Microsoft logout page
    async logoutEntra(returnUrl?: string): Promise<void>
    {
        try
        {
            // Clear local auth data first
            this.clearAuthData();
            
            // Build the logout URL and redirect directly
            const url = `${this.apiClient['baseURL']}/api/Auth/logout/entra${returnUrl ? `?returnUrl=${encodeURIComponent(returnUrl)}` : ''}`;

            // Redirect directly to the logout endpoint which will redirect to Microsoft
            window.location.href = url;
        } catch (error)
        {
            console.error('Entra logout failed:', error);
            // Fallback to regular logout if Entra logout fails
            await this.logout();
            window.location.href = returnUrl || '/login';
        }
    }

    // Get current user info
    async getCurrentUser(): Promise<UserInfo | null>
    {
        try
        {
            const response = await this.apiClient.get<UserInfo>('/api/Auth/me');
            return response.data;
        } catch (error)
        {
            console.error('Get current user failed:', error);
            return null;
        }
    }

    // Check if user is authenticated (simplified - relies on server-side validation)
    isAuthenticated(): boolean
    {
        const expires = this.getTokenExpiry();
        const user = this.getUser();

        // Basic client-side check, but server will validate the actual cookie
        if (!expires || !user)
        {
            return false;
        }

        return new Date() < expires;
    }

    // Get stored user info
    getUser(): UserInfo | null
    {
        if (typeof window === 'undefined') return null;
        const userJson = localStorage.getItem(this.USER_KEY);
        return userJson ? JSON.parse(userJson) : null;
    }

    // Get token expiry
    getTokenExpiry(): Date | null
    {
        if (typeof window === 'undefined') return null;
        const expiresString = localStorage.getItem(this.EXPIRES_KEY);
        return expiresString ? new Date(expiresString) : null;
    }

    // Store authentication data (no longer stores tokens)
    private storeAuthData(authResponse: AuthenticationResponse, authMethod: string = 'password'): void
    {
        if (typeof window === 'undefined') return;

        // Only store user info and expiry - tokens are now in HttpOnly cookies
        if (authResponse.user)
        {
            localStorage.setItem(this.USER_KEY, JSON.stringify(authResponse.user));
        }

        localStorage.setItem(this.EXPIRES_KEY, authResponse.expiresAt.toString());
        localStorage.setItem('auth-method', authMethod); // Store how user authenticated
    }

    // Clear all authentication data (cookies cleared by server)
    private clearAuthData(): void
    {
        if (typeof window === 'undefined') return;

        // Only clear localStorage - server clears HttpOnly cookies
        localStorage.removeItem(this.USER_KEY);
        localStorage.removeItem(this.EXPIRES_KEY);
        localStorage.removeItem('auth-method');
        this.csrfToken = null;
    }

    // Setup automatic token refresh (simplified for cookie-based auth)
    setupTokenRefresh(): void
    {
        const checkAndRefresh = async () =>
        {
            const expires = this.getTokenExpiry();
            const user = this.getUser();

            // Don't do anything if no expiry or user (user is logged out)
            if (!expires || !user) {
                return;
            }

            // Check if token expires in the next 5 minutes
            const fiveMinutesFromNow = new Date(Date.now() + 5 * 60 * 1000);
            if (expires < fiveMinutesFromNow)
            {
                const success = await this.refreshToken();
                if (!success)
                {
                    // Token refresh failed, clear data and redirect to login
                    this.clearAuthData();
                    window.location.href = '/login';
                }
            }
        };

        // Check every minute
        setInterval(checkAndRefresh, 60 * 1000);

        // Check immediately
        checkAndRefresh();
    }

    // Get API client for external use
    getApiClient(): ApiClient
    {
        return this.apiClient;
    }
}

export const authService = new AuthService();
export default authService;