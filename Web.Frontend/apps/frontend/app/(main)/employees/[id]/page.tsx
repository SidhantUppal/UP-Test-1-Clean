"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';
import { DEMO_EMPLOYEES, DemoDataHelpers, type Employee } from '@/lib/demoData';

type TabType = 'basic' | 'incidents' | 'checklists' | 'risk-assessments' | 'assets' | 'dse' | 'processes' | 'training';

export default function EmployeeDetailPage() {
  const { theme } = useTheme();
  const params = useParams();
  const employeeId = params.id as string;
  const [activeTab, setActiveTab] = useState<TabType>('basic');

  const employee = DemoDataHelpers.getEmployeeById(employeeId);

  if (!employee) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200">
          <div className="w-full px-8 py-4 lg:px-12 xl:px-16">
            <div>
              <h1 className="text-3xl font-bold text-gray-900" style={{ margin: 0 }}>Employee Not Found</h1>
              <p className="text-gray-600 mt-1">The employee you're looking for doesn't exist.</p>
            </div>
          </div>
        </div>
        <div className="px-8 py-8 lg:px-12 xl:px-16">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <p className="text-gray-600 mb-4">The employee you're looking for doesn't exist.</p>
            <Link href="/employees" style={{ color: '#3d3a72' }} className="hover:opacity-80">
              ← Back to Employee Directory
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: Employee['status']) => {
    const colors = {
      'Active': 'bg-green-100 text-green-800',
      'Inactive': 'bg-gray-100 text-gray-800',
      'Terminated': 'bg-red-100 text-red-800',
      'On Leave': 'bg-yellow-100 text-yellow-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatLastLogin = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderBasicTab = () => (
    <div className="space-y-8">
      {/* Personal Information */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <p className="text-gray-900">{employee.name}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
            <p className="text-gray-900">{employee.employeeId}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <p className="text-gray-900">{employee.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <p className="text-gray-900">{employee.phone}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Home Address</label>
            <p className="text-gray-900">{employee.homeAddress}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact</label>
            <p className="text-gray-900">
              {employee.emergencyContact.name} ({employee.emergencyContact.relationship})
            </p>
            <p className="text-gray-600 text-sm">{employee.emergencyContact.phone}</p>
          </div>
        </div>
      </div>

      {/* Job Information */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
            <p className="text-gray-900">{employee.position}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <p className="text-gray-900">{employee.department}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Employment Type</label>
            <p className="text-gray-900">{employee.employmentType}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadge(employee.status)}`}>
              {employee.status}
            </span>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hire Date</label>
            <p className="text-gray-900">{formatDate(employee.hireDate)}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Supervisor</label>
            <p className="text-gray-900">{employee.supervisor}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Work Location</label>
            <p className="text-gray-900">{employee.workLocation}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Remote Work Days</label>
            <p className="text-gray-900">{employee.remoteWorkDays} days per week</p>
          </div>
        </div>
      </div>

      {/* Skills & Certifications */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills & Certifications</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
            <div className="flex flex-wrap gap-2">
              {employee.skills.map((skill, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Certifications</label>
            <div className="flex flex-wrap gap-2">
              {employee.certifications.map((cert, index) => (
                <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </div>
        {employee.biography && (
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Biography</label>
            <p className="text-gray-900">{employee.biography}</p>
          </div>
        )}
      </div>

      {/* System Information */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Login</label>
            <p className="text-gray-900">{formatLastLogin(employee.lastLogin)}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Organisation Level</label>
            <p className="text-gray-900">Level {employee.orgLevel}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderIncidentsTab = () => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Safety Incidents</h3>
        <button style={{ 
          backgroundColor: '#3d3a72', 
          color: '#ffffff', 
          border: 'none',
          padding: '4px 12px',
          borderRadius: '4px',
          fontWeight: '500',
          cursor: 'pointer',
          fontSize: '12px',
          transition: 'opacity 0.2s'
        }} className="hover:opacity-80">
          + Report Incident
        </button>
      </div>
      
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h4 className="text-lg font-medium text-gray-900 mb-2">No Incidents Reported</h4>
        <p className="text-gray-600">This employee has {employee.incidentCount} safety incidents on record.</p>
      </div>
    </div>
  );

  const renderChecklistsTab = () => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Assigned Checklists</h3>
        <button style={{ 
          backgroundColor: '#3d3a72', 
          color: '#ffffff', 
          border: 'none',
          padding: '4px 12px',
          borderRadius: '4px',
          fontWeight: '500',
          cursor: 'pointer',
          fontSize: '12px',
          transition: 'opacity 0.2s'
        }} className="hover:opacity-80">
          + Assign Checklist
        </button>
      </div>
      
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-gray-900">Safety Training Checklist</h4>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Completed</span>
          </div>
          <p className="text-sm text-gray-600 mb-2">Basic safety training requirements and procedures</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Due: Jan 15, 2024</span>
            <span>Completed: Jan 12, 2024</span>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-gray-900">Equipment Inspection</h4>
            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">In Progress</span>
          </div>
          <p className="text-sm text-gray-600 mb-2">Monthly equipment safety inspection checklist</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Due: Jan 30, 2024</span>
            <span>Progress: 75%</span>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-gray-900">Code Review Process</h4>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">Pending</span>
          </div>
          <p className="text-sm text-gray-600 mb-2">Software development code review checklist</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Due: Feb 5, 2024</span>
            <span>Progress: 0%</span>
          </div>
        </div>
      </div>
      
      <div className="mt-6 text-center text-sm text-gray-500">
        Total: {employee.checklistsAssigned} checklists assigned
      </div>
    </div>
  );

  const renderRiskAssessmentsTab = () => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Risk Assessments</h3>
        <button style={{ 
          backgroundColor: '#3d3a72', 
          color: '#ffffff', 
          border: 'none',
          padding: '4px 12px',
          borderRadius: '4px',
          fontWeight: '500',
          cursor: 'pointer',
          fontSize: '12px',
          transition: 'opacity 0.2s'
        }} className="hover:opacity-80">
          + New Assessment
        </button>
      </div>
      
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-gray-900">Workstation Ergonomics</h4>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Low Risk</span>
          </div>
          <p className="text-sm text-gray-600 mb-2">Assessment of workspace ergonomics and safety</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Assessed: Dec 15, 2023</span>
            <span>Next Review: Jun 15, 2024</span>
          </div>
        </div>
        
        {employee.riskAssessments > 1 && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">Equipment Handling</h4>
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">Medium Risk</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">Risk assessment for equipment handling procedures</p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Assessed: Nov 20, 2023</span>
              <span>Next Review: May 20, 2024</span>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-6 text-center text-sm text-gray-500">
        Total: {employee.riskAssessments} risk assessments completed
      </div>
    </div>
  );

  const renderAssetsTab = () => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Assigned Assets</h3>
        <button style={{ 
          backgroundColor: '#3d3a72', 
          color: '#ffffff', 
          border: 'none',
          padding: '4px 12px',
          borderRadius: '4px',
          fontWeight: '500',
          cursor: 'pointer',
          fontSize: '12px',
          transition: 'opacity 0.2s'
        }} className="hover:opacity-80">
          + Assign Asset
        </button>
      </div>
      
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-gray-900">MacBook Pro 16" (2023)</h4>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Active</span>
          </div>
          <p className="text-sm text-gray-600 mb-2">Asset ID: LAPTOP-2023-001</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Assigned: Jan 15, 2023</span>
            <span>Next Maintenance: Mar 15, 2024</span>
          </div>
        </div>
        
        {employee.assetsAssigned > 1 && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">iPhone 14 Pro</h4>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Active</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">Asset ID: PHONE-2023-015</p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Assigned: Jan 15, 2023</span>
              <span>Contract Expires: Jan 15, 2025</span>
            </div>
          </div>
        )}
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-gray-900">RH Logic 400</h4>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Installed</span>
          </div>
          <p className="text-sm text-gray-600 mb-2">Asset ID: CHAIR-2024-003</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Issuer: Safety Dept</span>
            <span>Installed: Jul 10, 2024</span>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-gray-900">Sit/Stand Desk</h4>
            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">On Trial</span>
          </div>
          <p className="text-sm text-gray-600 mb-2">Asset ID: DESK-2024-004</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Issuer: Safety Dept</span>
            <span>Trial Started: Jul 15, 2024</span>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-gray-900">Upright Mouse</h4>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Installed</span>
          </div>
          <p className="text-sm text-gray-600 mb-2">Asset ID: MOUSE-2024-005</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Issuer: Safety Dept</span>
            <span>Installed: Jul 12, 2024</span>
          </div>
        </div>
      </div>
      
      <div className="mt-6 text-center text-sm text-gray-500">
        Total: 4 assets assigned
      </div>
    </div>
  );

  const renderDSETab = () => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">DSE (Display Screen Equipment) Records</h3>
        <button style={{ 
          backgroundColor: '#3d3a72', 
          color: '#ffffff', 
          border: 'none',
          padding: '4px 12px',
          borderRadius: '4px',
          fontWeight: '500',
          cursor: 'pointer',
          fontSize: '12px',
          transition: 'opacity 0.2s'
        }} className="hover:opacity-80">
          + New Assessment
        </button>
      </div>
      
      {employee.dseCompleted ? (
        <div className="space-y-4">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="flex items-center mb-2">
              <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h4 className="font-medium text-green-900">DSE Assessment Completed</h4>
            </div>
            <p className="text-sm text-green-800 mb-2">Workstation assessment completed successfully</p>
            <div className="flex items-center justify-between text-sm text-green-700">
              <span>Completed: Dec 1, 2023</span>
              <span>Next Review: Dec 1, 2024</span>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Assessment Results</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Monitor Position:</span>
                <span className="ml-2 text-green-600">✓ Satisfactory</span>
              </div>
              <div>
                <span className="font-medium">Keyboard & Mouse:</span>
                <span className="ml-2 text-green-600">✓ Satisfactory</span>
              </div>
              <div>
                <span className="font-medium">Chair & Posture:</span>
                <span className="ml-2 text-green-600">✓ Satisfactory</span>
              </div>
              <div>
                <span className="font-medium">Lighting:</span>
                <span className="ml-2 text-green-600">✓ Satisfactory</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h4 className="text-lg font-medium text-gray-900 mb-2">DSE Assessment Required</h4>
          <p className="text-gray-600">This employee needs to complete a DSE assessment.</p>
        </div>
      )}
    </div>
  );

  const renderProcessesTab = () => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Involved Processes</h3>
        <button style={{ 
          backgroundColor: '#3d3a72', 
          color: '#ffffff', 
          border: 'none',
          padding: '4px 12px',
          borderRadius: '4px',
          fontWeight: '500',
          cursor: 'pointer',
          fontSize: '12px',
          transition: 'opacity 0.2s'
        }} className="hover:opacity-80">
          + Add to Process
        </button>
      </div>
      
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-gray-900">Code Review Process</h4>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">Reviewer</span>
          </div>
          <p className="text-sm text-gray-600 mb-2">Software development code review and approval process</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Role: Senior Reviewer</span>
            <span>Active since: Jan 2023</span>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-gray-900">Employee Onboarding</h4>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Mentor</span>
          </div>
          <p className="text-sm text-gray-600 mb-2">New employee onboarding and training process</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Role: Technical Mentor</span>
            <span>Active since: Mar 2023</span>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-gray-900">Incident Response</h4>
            <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">Responder</span>
          </div>
          <p className="text-sm text-gray-600 mb-2">Emergency incident response and escalation process</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Role: Technical Lead</span>
            <span>Active since: Jun 2023</span>
          </div>
        </div>
      </div>
      
      <div className="mt-6 text-center text-sm text-gray-500">
        Total: {employee.processesInvolved} processes involved
      </div>
    </div>
  );

  const renderTrainingTab = () => (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Training Records</h3>
        <button style={{ 
          backgroundColor: '#3d3a72', 
          color: '#ffffff', 
          border: 'none',
          padding: '4px 12px',
          borderRadius: '4px',
          fontWeight: '500',
          cursor: 'pointer',
          fontSize: '12px',
          transition: 'opacity 0.2s'
        }} className="hover:opacity-80">
          Add Training
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* DSE E-Learning */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-gray-900">DSE E-Learning</h4>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Completed</span>
          </div>
          <p className="text-sm text-gray-600 mb-3">Display Screen Equipment workstation assessment and safety training</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Completed:</span>
              <span className="text-gray-900">March 15, 2024</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Valid Until:</span>
              <span className="text-gray-900">March 15, 2025</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Score:</span>
              <span className="text-gray-900">95%</span>
            </div>
          </div>
        </div>

        {/* Manual Handling */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-gray-900">Manual Handling</h4>
            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">Expires Soon</span>
          </div>
          <p className="text-sm text-gray-600 mb-3">Safe manual handling techniques and risk assessment</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Completed:</span>
              <span className="text-gray-900">January 20, 2024</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Valid Until:</span>
              <span className="text-red-600">January 20, 2025</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Score:</span>
              <span className="text-gray-900">88%</span>
            </div>
          </div>
        </div>

        {/* Fire Safety */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-gray-900">Fire Safety & Emergency Procedures</h4>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Completed</span>
          </div>
          <p className="text-sm text-gray-600 mb-3">Fire prevention, evacuation procedures, and emergency response</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Completed:</span>
              <span className="text-gray-900">February 10, 2024</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Valid Until:</span>
              <span className="text-gray-900">February 10, 2025</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Score:</span>
              <span className="text-gray-900">92%</span>
            </div>
          </div>
        </div>

        {/* COSHH */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-gray-900">COSHH (Control of Substances Hazardous to Health)</h4>
            <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">Overdue</span>
          </div>
          <p className="text-sm text-gray-600 mb-3">Handling hazardous substances and chemical safety</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Completed:</span>
              <span className="text-gray-900">November 5, 2023</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Valid Until:</span>
              <span className="text-red-600">November 5, 2024</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Score:</span>
              <span className="text-gray-900">90%</span>
            </div>
          </div>
        </div>

        {/* First Aid */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-gray-900">First Aid Training</h4>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Completed</span>
          </div>
          <p className="text-sm text-gray-600 mb-3">Basic first aid skills and emergency medical response</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Completed:</span>
              <span className="text-gray-900">April 8, 2024</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Valid Until:</span>
              <span className="text-gray-900">April 8, 2027</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Certification:</span>
              <span className="text-gray-900">HSE Approved</span>
            </div>
          </div>
        </div>

        {/* Data Protection */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-gray-900">Data Protection & GDPR</h4>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">In Progress</span>
          </div>
          <p className="text-sm text-gray-600 mb-3">Data protection regulations and privacy compliance</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Started:</span>
              <span className="text-gray-900">July 12, 2024</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Progress:</span>
              <span className="text-gray-900">60%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Due:</span>
              <span className="text-gray-900">July 26, 2024</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-2">Training Summary</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">4</div>
            <div className="text-gray-500">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">1</div>
            <div className="text-gray-500">In Progress</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">1</div>
            <div className="text-gray-500">Overdue</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'basic':
        return renderBasicTab();
      case 'incidents':
        return renderIncidentsTab();
      case 'checklists':
        return renderChecklistsTab();
      case 'risk-assessments':
        return renderRiskAssessmentsTab();
      case 'assets':
        return renderAssetsTab();
      case 'dse':
        return renderDSETab();
      case 'processes':
        return renderProcessesTab();
      case 'training':
        return renderTrainingTab();
      default:
        return renderBasicTab();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full px-8 py-4 lg:px-12 xl:px-16">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: '#3d3a7220' }}>
                <span className="font-medium text-lg" style={{ color: '#3d3a72' }}>
                  {employee.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900" style={{ margin: 0 }}>{employee.name}</h1>
                <p className="text-gray-600 mt-1">{employee.position} • {employee.department}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Link href="/employees" style={{ 
                backgroundColor: '#e77726', 
                color: '#ffffff', 
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                fontWeight: '500',
                cursor: 'pointer',
                fontSize: '14px',
                transition: 'opacity 0.2s',
                textDecoration: 'none',
                display: 'inline-block'
              }} className="hover:opacity-80">
                ← Back to Directory
              </Link>
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
                Edit Profile
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
                Send Message
              </button>
            </div>
          </div>
          
          {/* Status Badge */}
          <div className="flex items-center space-x-4 mt-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(employee.status)}`}>
              {employee.status}
            </span>
            <span className="text-gray-500">Employee ID: {employee.employeeId}</span>
            <span className="text-gray-500">Joined: {formatDate(employee.hireDate)}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-8 lg:px-12 xl:px-16 space-y-6">

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('basic')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'basic'
                  ? 'border-theme-primary text-theme-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Basic Details
            </button>
            <button
              onClick={() => setActiveTab('incidents')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'incidents'
                  ? 'border-theme-primary text-theme-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Incidents
              {employee.incidentCount > 0 && (
                <span className="ml-2 bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                  {employee.incidentCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('checklists')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'checklists'
                  ? 'border-theme-primary text-theme-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Checklists
              <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                {employee.checklistsAssigned}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('risk-assessments')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'risk-assessments'
                  ? 'border-theme-primary text-theme-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Risk Assessments
              <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                {employee.riskAssessments}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('assets')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'assets'
                  ? 'border-theme-primary text-theme-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Assets
              <span className="ml-2 bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                4
              </span>
            </button>
            <button
              onClick={() => setActiveTab('dse')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'dse'
                  ? 'border-theme-primary text-theme-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              DSE Records
              {employee.dseCompleted && (
                <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  ✓
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('processes')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'processes'
                  ? 'border-theme-primary text-theme-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Processes
              <span className="ml-2 bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                {employee.processesInvolved}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('training')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'training'
                  ? 'border-theme-primary text-theme-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Training
              <span className="ml-2 bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
                {employee.trainingCompleted || 0}
              </span>
            </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
}