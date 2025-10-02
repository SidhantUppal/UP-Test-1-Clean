/**
 * Centralized authentication header service for API calls
 * Provides consistent auth headers across all static data services
 * Now simplified for cookie-based authentication
 */

interface AuthContext {
  userId?: string | number;
  userAreaId?: string | number;
}

class AuthHeaderService {
  private authContext: AuthContext | null = null;
  private csrfToken: string | null = null;

  constructor() {
    // Initialize from localStorage user info
    this.initializeFromStorage();
  }

  /**
   * Initialize auth context from localStorage user info
   */
  private initializeFromStorage(): void {
    if (typeof window === 'undefined') return;

    try {
      const userJson = localStorage.getItem('user-info');
      if (!userJson) return;

      const user = JSON.parse(userJson);
      if (user.userId && user.userAreaId) {
        this.authContext = {
          userId: user.userId,
          userAreaId: user.userAreaId,
        };
      }
    } catch (error) {
      console.error('[AuthHeaderService] Failed to initialize from user info:', error);
    }
  }

  /**
   * Set CSRF token for subsequent requests
   */
  setCsrfToken(token: string): void {
    this.csrfToken = token;
  }

  /**
   * Set the current authentication context
   * This should be called when user logs in or auth state changes
   */
  setAuthContext(context: AuthContext): void {
    this.authContext = context;
  }

  /**
   * Refresh auth context from localStorage
   * Call this after login or when token changes
   */
  refreshFromStorage(): void {
    this.authContext = null;
    this.initializeFromStorage();
  }

  /**
   * Get current authentication context
   */
  getAuthContext(): AuthContext | null {
    return this.authContext;
  }

  /**
   * Get authentication headers for API calls
   * Simplified for cookie-based auth - no Authorization header needed
   */
  getAuthHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // If no context is set, try to initialize from storage
    if (!this.authContext) {
      this.initializeFromStorage();
    }

    // Get values from context
    const userId = this.authContext?.userId;
    const userAreaId = this.authContext?.userAreaId;

    // Add user context headers if available
    if (userId && userAreaId) {
      headers['x-user-id'] = String(userId);
      headers['x-user-area-id'] = String(userAreaId);
    }

    // Add CSRF token if available
    if (this.csrfToken) {
      headers['X-CSRF-TOKEN'] = this.csrfToken;
    }

    return headers;
  }

  /**
   * Get headers specifically for Static Data API calls
   * Includes all auth headers plus any Static Data specific requirements
   */
  getStaticDataHeaders(): Record<string, string> {
    const baseHeaders = this.getAuthHeaders();

    // Add any Static Data API specific headers here if needed
    return {
      ...baseHeaders,
      // Example: 'X-API-Version': '1.0',
    };
  }

  /**
   * Clear authentication context (e.g., on logout)
   */
  clearAuthContext(): void {
    this.authContext = null;
  }

  /**
   * Check if user is authenticated (simplified for cookie-based auth)
   */
  isAuthenticated(): boolean {
    if (!this.authContext) {
      this.initializeFromStorage();
    }

    // Check if we have user info stored (cookies are managed by browser)
    return !!this.authContext?.userId && !!this.authContext?.userAreaId;
  }

  /**
   * Get current user ID
   */
  getCurrentUserId(): string | number | null {
    if (!this.authContext) {
      this.initializeFromStorage();
    }
    return this.authContext?.userId || null;
  }

  /**
   * Get current user area ID
   */
  getCurrentUserAreaId(): string | number | null {
    if (!this.authContext) {
      this.initializeFromStorage();
    }
    return this.authContext?.userAreaId || null;
  }
}

// Export singleton instance
export const authHeaderService = new AuthHeaderService();

// Export types for other services to use
export type { AuthContext };