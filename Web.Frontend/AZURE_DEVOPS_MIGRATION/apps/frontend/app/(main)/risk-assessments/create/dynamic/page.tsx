'use client';

import Link from 'next/link';

export default function CreateDynamicRiskAssessmentPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full px-8 py-4 lg:px-12 xl:px-16">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900" style={{ margin: 0 }}>Create Dynamic Risk Assessment</h1>
              <p className="text-gray-600 mt-1">Flexible assessment that adapts to changing circumstances and environments</p>
            </div>
            <div className="flex gap-3">
              <Link href="/risk-assessments">
                <button style={{ 
                  backgroundColor: '#e77726', 
                  color: '#ffffff', 
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'opacity 0.2s'
                }} className="hover:opacity-80">
                  Back to Assessments
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-8 lg:px-12 xl:px-16 space-y-6">
        
        {/* Main Content Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Dynamic Risk Assessment Builder</h2>
            <p className="text-gray-600 text-sm mt-1">Advanced risk assessment for complex and variable scenarios</p>
          </div>
          <div className="p-6">
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Coming Soon</h3>
              <div className="max-w-2xl mx-auto">
                <p className="text-gray-600 mb-6">
                  The dynamic risk assessment builder is under development. This advanced tool will support:
                </p>
                
                {/* Feature List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <h4 className="text-sm font-semibold text-gray-900">Situational Assessments</h4>
                    </div>
                    <p className="text-xs text-gray-600">Adapt risk factors based on real-time conditions</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h4 className="text-sm font-semibold text-gray-900">Variable Conditions</h4>
                    </div>
                    <p className="text-xs text-gray-600">Handle changing environmental factors</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h4 className="text-sm font-semibold text-gray-900">Field Modifications</h4>
                    </div>
                    <p className="text-xs text-gray-600">Real-time updates and on-site adjustments</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <h4 className="text-sm font-semibold text-gray-900">Multi-User Collaboration</h4>
                    </div>
                    <p className="text-xs text-gray-600">Team-based assessment workflows</p>
                  </div>
                </div>

                {/* Alternative Action */}
                <div className="border-t border-gray-200 pt-6">
                  <p className="text-sm text-gray-600 mb-4">
                    For immediate needs, try our basic risk assessment builder:
                  </p>
                  <Link href="/risk-assessments/create/basic">
                    <button style={{ 
                      backgroundColor: '#3d3a72', 
                      color: '#ffffff', 
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      fontSize: '14px',
                      transition: 'opacity 0.2s'
                    }} className="hover:opacity-80">
                      Create Basic Assessment
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Development Status */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">Development Status</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                  <svg className="w-3 h-3 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-yellow-800">In Development</span>
              </div>
              <span className="text-xs text-yellow-600 font-medium">Q2 2025</span>
            </div>
            
            <div className="text-sm text-gray-600">
              <p className="mb-2">This feature is part of our roadmap for advanced risk management capabilities.</p>
              <p>For updates on development progress, please contact your system administrator.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}