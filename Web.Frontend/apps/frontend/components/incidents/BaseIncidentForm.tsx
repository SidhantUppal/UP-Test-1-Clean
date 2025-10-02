import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';
import { ValidationErrorDisplay } from '@/components/forms/ValidationErrorDisplay';

interface BaseIncidentFormProps {
  title: string;
  subtitle?: string;
  incidentData?: any;
  loading: boolean;
  error: string | null;
  errorType: 'loading' | 'validation' | null;
  showValidationErrors: boolean;
  onRetry?: () => void;
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
}

export const BaseIncidentForm: React.FC<BaseIncidentFormProps> = ({
  title,
  subtitle,
  incidentData,
  loading,
  error,
  errorType,
  showValidationErrors,
  onRetry,
  children,
  onSubmit
}) => {
  const router = useRouter();
  const { currentTheme } = useTheme();
  const primaryColor = currentTheme?.colors?.primary || '#3d3a72';
  const accentColor = currentTheme?.colors?.secondary || '#e77726';

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-purple-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-600">Loading incident data...</p>
        </div>
      </div>
    );
  }

  // Show error state for loading errors only
  if (error && errorType === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
            <h2 className="text-lg font-semibold text-red-800 mb-2">Error Loading Incident</h2>
            <p className="text-red-600 mb-4">{error}</p>
            <div className="space-y-2">
              {onRetry && (
                <button
                  onClick={onRetry}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
                >
                  Try Again
                </button>
              )}
              <button
                onClick={() => router.push('/incidents/form')}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Start Over
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full px-8 py-4 lg:px-12 xl:px-16">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <Link href="/incidents/dashboard" className="hover:text-primary">Incidents</Link>
              <span>/</span>
              <Link href="/incidents/form" className="hover:text-primary">New Incident</Link>
              <span>/</span>
              <span>{title}</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3" style={{ margin: 0 }}>
              {title}
              {incidentData && (
                <span className="text-lg bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  {incidentData.CaseNumber}
                </span>
              )}
            </h1>
            <p className="text-gray-600 mt-1">
              {subtitle || (incidentData
                ? `Editing incident ${incidentData.CaseNumber} - ${incidentData.Status}`
                : 'Complete the incident report form'
              )}
              <span className="ml-4 text-sm text-green-600">
                ✓ Form progress is automatically saved
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="py-8" style={{ paddingLeft: '4rem', paddingRight: '4rem' }}>
        <div className="mx-auto">
          {/* Form Container with White Background */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            {/* Top Validation Error Display */}
            <ValidationErrorDisplay
              error={error}
              showValidationErrors={showValidationErrors}
              errorType={errorType}
              className="mb-6"
            />

            {/* Form */}
            <form onSubmit={onSubmit} className="space-y-6">
              {children}

              {/* Bottom Validation Error Display */}
              <ValidationErrorDisplay
                error={error}
                showValidationErrors={showValidationErrors}
                errorType={errorType}
                title="Please fix the following issues:"
                className="mb-6"
              />

              {/* Form Actions */}
              <div className="flex justify-between border-t border-gray-200 pt-6 mt-8">
                <button
                  type="button"
                  onClick={() => router.push("/incidents/form")}
                  style={{
                    backgroundColor: accentColor,
                    color: '#ffffff',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '6px',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                  className="inline-flex justify-center rounded-md text-base font-semibold text-white shadow-sm hover:opacity-90"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    backgroundColor: loading ? '#9CA3AF' : primaryColor,
                    color: '#ffffff',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '6px',
                    fontWeight: '500',
                    cursor: loading ? 'not-allowed' : 'pointer'
                  }}
                  className="inline-flex justify-center rounded-md text-base font-semibold text-white shadow-sm hover:opacity-90"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving to Azure V7-Dev...
                    </>
                  ) : (
                    'Submit'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};