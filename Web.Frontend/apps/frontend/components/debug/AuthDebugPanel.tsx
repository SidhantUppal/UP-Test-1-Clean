'use client';

import React from 'react';
import { useAuth } from '@/lib/auth/contexts/AuthContext';
import authService from '@/lib/auth/services/authService';
import { localStorageService } from '@/lib/local-storage-service';

//  toggleAuthDebugPanel() to enable/disable panel

const AuthDebugPanel: React.FC = () => {
    const { user, isAuthenticated, isLoading, logout } = useAuth();
    const [isClient, setIsClient] = React.useState(false);
    const [isMinimized, setIsMinimized] = React.useState(false);
    const [showPanel, setShowPanel] = React.useState(true);
    const [permissionsInfo, setPermissionsInfo] = React.useState<{
        allowAll: boolean;
        userPermissions: string[];
        permissionCheckStatus: string;
        loading: boolean;
    }>({
        allowAll: false,
        userPermissions: [],
        permissionCheckStatus: 'Not checked',
        loading: false
    });
    
    const getStorageInfo = () => {
        // Check if we're on client side to avoid SSR issues
        if (typeof window === 'undefined') {
            return {
                hasCookieAuth: false,
                hasStoredUser: false,
                storedUserEmail: '',
                tokenExpiry: '',
                isExpired: 'SSR',
                authMethod: 'SSR',
                isAuthenticatedCheck: false
            };
        }

        const storedUser = authService.getUser();
        const tokenExpiry = authService.getTokenExpiry();
        const authMethod = localStorage.getItem('auth-method');

        // Check for presence of auth cookies (we can't read HttpOnly cookies from JS)
        const hasCookieAuth = document.cookie.includes('auth-token') ||
                             (storedUser && tokenExpiry && new Date() < tokenExpiry);

        return {
            hasCookieAuth,
            hasStoredUser: !!storedUser,
            storedUserEmail: storedUser?.email || '',
            tokenExpiry: tokenExpiry?.toISOString() || '',
            isExpired: tokenExpiry ? new Date() >= tokenExpiry : 'no expiry',
            authMethod,
            isAuthenticatedCheck: authService.isAuthenticated()
        };
    };
    
    const [storageInfo, setStorageInfo] = React.useState(getStorageInfo());
    
    // Set isClient to true after hydration to avoid emoji hydration mismatches
    React.useEffect(() => {
        setIsClient(true);
        
        // Add global helper functions for debugging
        if (typeof window !== 'undefined') {
            (window as any).toggleAuthDebugPanel = () => {
                const current = localStorageService.getDebugSetting('showAuthDebugPanel', false);
                localStorageService.setDebugSetting('showAuthDebugPanel', !current);
            };
            
            (window as any).showAuthDebugPanel = () => {
                localStorageService.setDebugSetting('showAuthDebugPanel', true);
            };
            
            (window as any).hideAuthDebugPanel = () => {
                localStorageService.setDebugSetting('showAuthDebugPanel', false);
            };
        }
    }, []);
    
    const refreshStorageInfo = () => {
        setStorageInfo(getStorageInfo());
    };

    const fetchPermissionsInfo = async () => {
        if (!isAuthenticated || typeof window === 'undefined') {
            setPermissionsInfo(prev => ({
                ...prev,
                permissionCheckStatus: 'Not authenticated',
                loading: false
            }));
            return;
        }

        setPermissionsInfo(prev => ({ ...prev, loading: true }));

        try {
            // Use the SysAdmin debug endpoints to get permission system status
            const statusResponse = await fetch('http://localhost:3011/api/SysAdmin/debug/permissions/status', {
                method: 'GET',
                credentials: 'include', // Use cookies for auth
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Get user's actual permissions
            const permissionsResponse = await fetch('http://localhost:3011/api/SysAdmin/debug/permissions/my-permissions', {
                method: 'GET',
                credentials: 'include', // Use cookies for auth
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (statusResponse.ok && permissionsResponse.ok) {
                const statusData = await statusResponse.json();
                const permissionsData = await permissionsResponse.json();

                setPermissionsInfo(prev => ({
                    ...prev,
                    allowAll: statusData.allowAll || false,
                    permissionCheckStatus: '',
                    userPermissions: permissionsData.permissions || [],
                    loading: false
                }));
            } else if (statusResponse.status === 403 || permissionsResponse.status === 403) {
                setPermissionsInfo(prev => ({
                    ...prev,
                    allowAll: false,
                    permissionCheckStatus: 'Access denied to debug endpoints',
                    userPermissions: [],
                    loading: false
                }));
            } else {
                const statusText = statusResponse.ok ? 'Status OK' : `Status ${statusResponse.status}`;
                const permText = permissionsResponse.ok ? 'Permissions OK' : `Permissions ${permissionsResponse.status}`;
                setPermissionsInfo(prev => ({
                    ...prev,
                    permissionCheckStatus: `Error - ${statusText}, ${permText}`,
                    loading: false
                }));
            }
        } catch (error) {
            setPermissionsInfo(prev => ({
                ...prev,
                permissionCheckStatus: `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`,
                loading: false
            }));
        }
    };
    
    // Safe emoji rendering - only show emojis after client hydration
    const getStatusIcon = (condition: boolean) => {
        if (!isClient) return condition ? 'YES' : 'NO';
        return condition ? '✅' : '❌';
    };
    
    const getLoadingIcon = (isLoading: boolean) => {
        if (!isClient) return isLoading ? 'LOADING' : 'READY';
        return isLoading ? '⏳' : '❌';
    };
    
    const clearAllStorage = () => {
        localStorage.clear();
        refreshStorageInfo();
    };
    
    const testLogout = async () => {
        await logout();
        setTimeout(refreshStorageInfo, 100);
    };
    
    
    // Update storage info when auth state changes (login/logout)
    React.useEffect(() => {
        refreshStorageInfo();
        if (isAuthenticated) {
            fetchPermissionsInfo();
        }
    }, [isAuthenticated]);
    
    // Check if debug panel should be shown
    const shouldShowDebugPanel = React.useMemo(() => {
        if (!isClient) return false; // Don't show during SSR
        
        
        // Priority order: 
        // 1. User setting (if explicitly set)
        // 2. Environment variable NEXT_PUBLIC_SHOW_DEBUG
        // 3. Development mode default
        const hasUserSetting = typeof window !== 'undefined' && localStorage.getItem('t100_debug_settings') !== null;
        
        if (hasUserSetting) {
            const userSetting = localStorageService.getDebugSetting('showAuthDebugPanel', false);
            return userSetting;
        }
        
        // If no user setting, check environment variable first
        if (process.env.NEXT_PUBLIC_SHOW_DEBUG === 'true') {
            return true;
        }

        if (process.env.NEXT_PUBLIC_SHOW_DEBUG === 'false') {
            return false;
        }

        // Default: only show in development mode if no explicit setting
        return process.env.NODE_ENV === 'development';
    }, [isClient]);

    // Hide panel handler
    const hidePanel = () => {
        localStorageService.setDebugSetting('showAuthDebugPanel', false);
        setShowPanel(false);
    };

    if (!shouldShowDebugPanel || !showPanel) {
        return null;
    }
    
    return (
        <div className={`fixed bottom-4 right-4 bg-white shadow-2xl border-2 border-blue-300 rounded-lg text-xs transition-all duration-300 ${
            isMinimized ? 'w-48 h-auto' : 'w-96 max-h-96 overflow-y-auto'
        } p-4`}
        style={{ zIndex: 30 }}>
            <div className="flex justify-between items-center mb-2 bg-gray-100 p-2 rounded">
                <h3 className="font-bold text-sm text-gray-800">Auth Debug Panel</h3>
                <div className="flex gap-1 items-center">
                    <button 
                        onClick={refreshStorageInfo}
                        className="bg-gray-500 text-white w-6 h-6 rounded text-xs hover:bg-gray-600 flex items-center justify-center"
                        title="Refresh data"
                    >
                        ⟳
                    </button>
                    <button
                        onClick={() => setIsMinimized(!isMinimized)}
                        className="bg-gray-500 text-white w-6 h-6 rounded text-xs hover:bg-gray-600 flex items-center justify-center"
                        title={isMinimized ? "Expand Panel" : "Minimize Panel"}
                    >
                        {isMinimized ? '▲' : '▼'}
                    </button>
                    <button
                        onClick={hidePanel}
                        className="bg-gray-500 text-white w-6 h-6 rounded text-xs hover:bg-gray-600 flex items-center justify-center"
                        title="Hide debug panel (can be re-enabled from developer console)"
                    >
                        ✕
                    </button>
                </div>
            </div>
            
            {!isMinimized && (
                <div>
            
            {/* Context State */}
            <div className="mb-3 p-2 bg-gray-50 rounded">
                <h4 className="font-semibold mb-1">Context State:</h4>
                <div>isAuthenticated: {getStatusIcon(isAuthenticated)}</div>
                <div>isLoading: {getLoadingIcon(isLoading)}</div>
                <div>hasUser: {getStatusIcon(!!user)}</div>
                <div>userEmail: {user?.email || 'none'}</div>
            </div>
            
            {/* Storage State */}
            <div className="mb-3 p-2 bg-gray-50 rounded">
                <h4 className="font-semibold mb-1">Auth State (Cookie-based):</h4>
                <div>hasCookieAuth: {getStatusIcon(storageInfo.hasCookieAuth)}</div>
                <div>hasStoredUser: {getStatusIcon(storageInfo.hasStoredUser)}</div>
                <div>storedUserEmail: {storageInfo.storedUserEmail || 'none'}</div>
                <div>authMethod: {storageInfo.authMethod || 'none'}</div>
                <div>tokenExpiry: {storageInfo.tokenExpiry || 'none'}</div>
                <div>isExpired: {storageInfo.isExpired?.toString() || 'unknown'}</div>
                <div>serviceAuthCheck: {getStatusIcon(storageInfo.isAuthenticatedCheck)}</div>
                <div className="text-xs text-blue-600 mt-1">
                    🍪 Tokens now stored in HttpOnly cookies (secure)
                </div>
            </div>

            {/* Permissions Info */}
            <div className="mb-3 p-2 bg-gray-50 rounded">
                <div className="flex justify-between items-center mb-1">
                    <h4 className="font-semibold">Permissions:</h4>
                    <button
                        onClick={fetchPermissionsInfo}
                        disabled={permissionsInfo.loading}
                        className="bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600 disabled:bg-gray-400"
                    >
                        {permissionsInfo.loading ? '⏳' : 'Check'}
                    </button>
                </div>
                {permissionsInfo.permissionCheckStatus && (
                    <div>Status: {permissionsInfo.permissionCheckStatus}</div>
                )}

                {permissionsInfo.allowAll ? (
                    <div className="text-orange-600 font-bold mt-1">
                        ⚠️ AllowAll mode enabled - bypassing all permissions
                    </div>
                ) : permissionsInfo.userPermissions.length > 0 ? (
                    <div className="mt-1">
                        <div className="font-semibold text-green-600">Permissions ({permissionsInfo.userPermissions.length}):</div>
                        <div className="max-h-16 overflow-y-auto text-xs mt-1">
                            <div>{permissionsInfo.userPermissions.slice(0, 3).join(', ')}</div>
                            {permissionsInfo.userPermissions.length > 3 && (
                                <div className="text-gray-600">...and {permissionsInfo.userPermissions.length - 3} more</div>
                            )}
                        </div>
                    </div>
                ) : permissionsInfo.permissionCheckStatus === '' ? (
                    <div className="text-gray-600 font-semibold mt-1">
                        No permissions set
                    </div>
                ) : null}
            </div>

            
            {/* Actions */}
            <div className="flex gap-1 flex-wrap">
                <button 
                    onClick={testLogout}
                    className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
                >
                    Test Logout
                </button>
                <button 
                    onClick={clearAllStorage}
                    className="bg-orange-500 text-white px-2 py-1 rounded text-xs hover:bg-orange-600"
                >
                    Clear Storage
                </button>
            </div>
                </div>
            )}
            
            {/* Show summary when minimized */}
            {isMinimized && (
                <div className="text-xs space-y-1">
                    <div>Context State: {getStatusIcon(isAuthenticated)}</div>
                    <div>Cookie Auth: {getStatusIcon(storageInfo.hasCookieAuth)}</div>
                    <div>Permissions: {getStatusIcon(permissionsInfo.allowAll || permissionsInfo.userPermissions.length > 0)}</div>
                </div>
            )}
        </div>
    );
};

export default AuthDebugPanel;