'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth/contexts/AuthContext';
import { useRouter } from 'next/navigation';

type LoginMethod = 'credentials' | 'entra' | 'apikey';

interface LoginFormState
{
    username: string;
    password: string;
    entraToken: string;
    apiKey: string;
}

const LoginForm: React.FC = () =>
{
    const { loginWithCredentials, loginWithEntra, loginWithApiKey, initiateEntraOAuth, isLoading } = useAuth();
    const router = useRouter();
    const [activeMethod, setActiveMethod] = useState<LoginMethod>('credentials');
    const [formData, setFormData] = useState<LoginFormState>({
        username: '',
        password: '',
        entraToken: '',
        apiKey: ''
    });
    const [error, setError] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError(''); // Clear error when user types
    };

    const handleSubmit = async (e: React.FormEvent) =>
    {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try
        {
            let response;

            switch (activeMethod)
            {
                case 'credentials':
                    if (!formData.username || !formData.password)
                    {
                        setError('Username and password are required');
                        return;
                    }
                    response = await loginWithCredentials({
                        username: formData.username,
                        password: formData.password
                    });
                    break;

                case 'entra':
                    if (!formData.entraToken)
                    {
                        setError('Microsoft Entra token is required');
                        return;
                    }
                    response = await loginWithEntra({
                        entraToken: formData.entraToken
                    });
                    break;

                case 'apikey':
                    if (!formData.apiKey)
                    {
                        setError('API key is required');
                        return;
                    }
                    response = await loginWithApiKey({
                        apiKey: formData.apiKey
                    });
                    break;
            }

            if (!response.success)
            {
                setError(response.message || 'Login failed');
            } else {
                // Redirect to home on successful login
                router.push('/home');
            }
        } catch (error)
        {
            setError('An unexpected error occurred');
        } finally
        {
            setIsSubmitting(false);
        }
    };

    const handleEntraOAuth = async () =>
    {
        try
        {
            setError('');
            setIsSubmitting(true);
            // Don't pass login URL as return URL - let it default to /home
            const currentUrl = window.location.href;
            const returnUrl = currentUrl.includes('/login') ? undefined : currentUrl;
            await initiateEntraOAuth(returnUrl);
        } catch (error)
        {
            setError('Failed to start Microsoft authentication');
            setIsSubmitting(false);
        }
    };

    const renderCredentialsForm = () => (
        <div className="space-y-4">
            <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Username
                </label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={formData.username}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your username"
                />
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your password"
                />
            </div>
        </div>
    );

    const renderEntraForm = () => (
        <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-blue-800 mb-2">
                    Microsoft Entra ID Sign-In
                </h3>
                <p className="text-sm text-blue-700 mb-4">
                    Sign in with your organizational account using Microsoft Entra ID.
                </p>
                <button
                    type="button"
                    onClick={handleEntraOAuth}
                    disabled={isSubmitting || isLoading}
                    className="w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <svg
                        className="h-5 w-5 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                    {isSubmitting ? 'Redirecting...' : 'Sign in with Microsoft'}
                </button>
            </div>
        </div>
    );

    const renderApiKeyForm = () => (
        <div className="space-y-4">
            <div>
                <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700">
                    API Key
                </label>
                <input
                    id="apiKey"
                    name="apiKey"
                    type="password"
                    required
                    value={formData.apiKey}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your API key"
                />
            </div>
            <p className="text-sm text-gray-600">
                API keys are associated with specific user accounts and provide programmatic access.
            </p>
        </div>
    );

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign in to T100 Risk Management
                    </h2>
                </div>

                {/* Login Method Tabs */}
                <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                    <button
                        type="button"
                        onClick={() => setActiveMethod('credentials')}
                        className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${activeMethod === 'credentials'
                                ? 'bg-white text-blue-600 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        Username/Password
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveMethod('entra')}
                        className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${activeMethod === 'entra'
                                ? 'bg-white text-blue-600 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        Microsoft Entra
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveMethod('apikey')}
                        className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${activeMethod === 'apikey'
                                ? 'bg-white text-blue-600 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        API Key
                    </button>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-md p-4">
                            <p className="text-sm text-red-800">{error}</p>
                        </div>
                    )}

                    {/* Form Fields */}
                    {activeMethod === 'credentials' && renderCredentialsForm()}
                    {activeMethod === 'entra' && renderEntraForm()}
                    {activeMethod === 'apikey' && renderApiKeyForm()}

                    {/* Submit Button - Only show for credentials and API key (Entra uses its own button) */}
                    {(activeMethod === 'credentials' || activeMethod === 'apikey') && (
                        <div>
                            <button
                                type="submit"
                                disabled={isSubmitting || isLoading}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Signing in...' : 'Sign in'}
                            </button>
                        </div>
                    )}
                </form>

                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Need help? Contact your system administrator.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;