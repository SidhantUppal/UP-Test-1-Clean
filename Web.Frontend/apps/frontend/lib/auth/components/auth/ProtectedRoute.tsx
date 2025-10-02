'use client';

import React from 'react';
import { useAuth } from '@/lib/auth/contexts/AuthContext';
import LoginForm from './LoginForm';

interface ProtectedRouteProps
{
    children: React.ReactNode;
    requiredRoles?: string[];
    fallback?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    children,
    requiredRoles = [],
    fallback
}) =>
{
    const { isAuthenticated, isLoading, user } = useAuth();

    // Show loading spinner while checking authentication
    if (isLoading)
    {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    // Not authenticated - show login form
    if (!isAuthenticated)
    {
        return fallback || <LoginForm />;
    }

    // Check role-based access
    if (requiredRoles.length > 0 && user)
    {
        const hasRequiredRole = requiredRoles.some(role =>
            user.roles.includes(role)
        );

        if (!hasRequiredRole)
        {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                    <div className="max-w-md w-full space-y-8 text-center">
                        <div>
                            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                                Access Denied
                            </h2>
                            <p className="mt-2 text-sm text-gray-600">
                                You don't have permission to access this page.
                            </p>
                            <p className="mt-1 text-xs text-gray-500">
                                Required roles: {requiredRoles.join(', ')}
                            </p>
                            <p className="mt-1 text-xs text-gray-500">
                                Your roles: {user.roles.join(', ')}
                            </p>
                        </div>
                    </div>
                </div>
            );
        }
    }

    // Authenticated and authorized - render children
    return <>{children}</>;
};

export default ProtectedRoute;