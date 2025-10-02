"use client";

import { useState } from 'react';

export default function RIDDORSubmissions() {
  const [mockData] = useState([
    {
      id: 1,
      reference: 'TEST-T100-0000261',
      submissionDate: '27/10/2020 10:47',
      submittedBy: 'System Administrator',
      status: 'Approved'
    },
    {
      id: 2,
      reference: 'TEST-T100-0000260',
      submissionDate: '27/10/2020 05:15',
      submittedBy: 'System Administrator',
      status: 'Submitted'
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full px-8 py-4 lg:px-12 xl:px-16">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900" style={{ margin: 0 }}>RIDDOR Reported Incidents</h1>
              <p className="text-gray-600 mt-1">Showing records 1 - 2 of 2</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => window.location.href = '/incidents/riddor/new'}
                style={{ 
                  backgroundColor: '#3d3a72', 
                  color: '#ffffff', 
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'opacity 0.2s'
                }} 
                className="hover:opacity-80"
              >
                Create New Report
              </button>
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
                Export
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="px-8 py-8 lg:px-12 xl:px-16 space-y-6">
        {/* RIDDOR Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-purple-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reference
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submission Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted by
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockData.map((item) => (
                  <tr key={item.id} className="hover:bg-purple-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.reference}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.submissionDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.submittedBy}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.status}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        style={{ 
                          backgroundColor: '#3d3a72', 
                          color: '#ffffff', 
                          border: 'none',
                          padding: '4px 12px',
                          borderRadius: '6px',
                          fontWeight: '500',
                          cursor: 'pointer',
                          fontSize: '12px',
                          transition: 'opacity 0.2s',
                          marginRight: '8px'
                        }}
                        className="hover:opacity-80"
                      >
                        RIDDOR Report Details
                      </button>
                      <button 
                        style={{ 
                          backgroundColor: '#3d3a72', 
                          color: '#ffffff', 
                          border: 'none',
                          padding: '4px 12px',
                          borderRadius: '6px',
                          fontWeight: '500',
                          cursor: 'pointer',
                          fontSize: '12px',
                          transition: 'opacity 0.2s'
                        }}
                        className="hover:opacity-80"
                      >
                        Incident Case Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}