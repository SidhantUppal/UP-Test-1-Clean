'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/auth/contexts/AuthContext';
import authService from '@/lib/auth/services/authService';

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { checkAuthStatus } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        const success = searchParams.get('success');
        const expiresAt = searchParams.get('expiresAt');
        const userId = searchParams.get('userId');
        const email = searchParams.get('email');
        const fullName = searchParams.get('fullName');
        const returnUrl = searchParams.get('returnUrl');
        const error = searchParams.get('error');

        if (error) {
          setError(decodeURIComponent(error));
          setLoading(false);
          return;
        }

        if (success === 'true') {
          // Tokens are now stored as HttpOnly cookies by the backend
          // We only need to store user info and expiry in localStorage

          localStorage.setItem('auth-method', 'entra'); // Mark as Entra authentication

          // Store expiry time
          if (expiresAt) {
            const tokenExpiry = new Date(expiresAt);
            localStorage.setItem('token-expires', tokenExpiry.toString());
          }

          // Get complete user info from the API (cookies will handle authentication)
          try {
            const user = await authService.getCurrentUser();
            if (user) {
              localStorage.setItem('user-info', JSON.stringify(user));
            }
          } catch (userError) {
            // Fallback: use the basic user info from URL parameters if API call fails
            console.warn('Failed to fetch full user profile, using basic info from callback:', userError);
            if (userId && email) {
              const basicUser = {
                userId: parseInt(userId),
                email: decodeURIComponent(email),
                fullName: fullName ? decodeURIComponent(fullName) : '',
                username: decodeURIComponent(email),
                roles: [],
                userAreaId: null
              };
              localStorage.setItem('user-info', JSON.stringify(basicUser));
            }
          }
          
          // Redirect immediately since auth data is already stored
          let finalDestination = '/home'; // Default to home
          
          if (returnUrl) {
            const decodedUrl = decodeURIComponent(returnUrl);
            
            // Don't redirect to login page - use home instead
            if (!decodedUrl.includes('/login') && !decodedUrl.includes('login')) {
              finalDestination = decodedUrl;
            }
          }
          
          // Redirect immediately - the AuthContext will pick up the changes on the next page
          setTimeout(() => {
            window.location.href = finalDestination; // Use window.location to force a full page refresh
          }, 100);
        } else {
          setError('Authentication callback failed');
          setLoading(false);
        }
      } catch (err) {
        console.error('OAuth callback error:', err);
        setError('Failed to complete authentication');
        setLoading(false);
      }
    };

    handleOAuthCallback();
  }, [searchParams, router, checkAuthStatus]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Completing sign-in...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
          <div className="w-12 h-12 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Authentication Failed</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => router.push('/login')}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return null;
}