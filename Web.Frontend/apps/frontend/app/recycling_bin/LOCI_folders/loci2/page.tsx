"use client";

import { useState, useEffect } from 'react';
import { loadLOCIPage } from '../LOCI/loader';
import type { LOCIElement } from '../LOCI/types/loci.types';
import { LOCIButton } from '@/components/LOCI/LOCIButton';
import { LOCIInput } from '@/components/LOCI/LOCIInput';

export default function LOCI2Page() {
  const [showLOCI, setShowLOCI] = useState(false);
  const [lociData, setLociData] = useState<Record<string, LOCIElement> | null>(null);

  // TODO: Add modal functionality later
  // const [selectedElement, setSelectedElement] = useState<string | null>(null);
  // const [modalData, setModalData] = useState<LOCIElement | null>(null);

  // Helper to get short element name (last 2 parts of ID)
  const getShortElementId = (fullId: string) => {
    const parts = fullId.split('_');
    return parts.slice(-2).join('_');
  };

  // Element IDs for loci2 page - different elements than loci1
  const elementIds = {
    // Page permission
    pagePermission: 'ADM_LOC2_PG_V_ALL_000',
    // Form elements
    nameInput: 'USR_LOC2_I_V_NAM_001',
    emailInput: 'USR_LOC2_I_V_EML_002',
    deptDropdown: 'USR_LOC2_D_F_DPT_003',
    saveProfileBtn: 'USR_LOC2_B_S_PRF_004',
    cancelBtn: 'USR_LOC2_B_C_PRF_005',
    // Table elements
    userTable: 'USR_LOC2_T_V_LST_006',
    addUserBtn: 'USR_LOC2_B_C_USR_007',
    editUserBtn: 'USR_LOC2_B_E_USR_008',
    deleteUserBtn: 'USR_LOC2_B_D_USR_009',
    // Quick actions
    exportBtn: 'RPT_LOC2_B_E_DAT_010',
    importBtn: 'USR_LOC2_B_I_DAT_011',
    reportBtn: 'RPT_LOC2_B_G_RPT_012',
    settingsBtn: 'CFG_LOC2_B_O_SET_013'
  };

  // Load LOCI data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        console.log('🔍 LOCI: Attempting to load page data for loci2...');
        const data = await loadLOCIPage('loci2');
        console.log('🔍 LOCI: Loaded data:', data);
        setLociData(data);
      } catch (error) {
        console.error('🔍 LOCI: Failed to load LOCI data:', error);
      }
    };

    loadData();
  }, []);

  const handleElementClick = (elementId: string) => {
    if (!showLOCI || !lociData) return;
    
    const data = lociData[elementId];
    
    // For now, just log the element data - modal will be added later
    console.log('🔍 LOCI Element clicked:', elementId, data);
    alert(`LOCI Element: ${elementId}\nStatus: ${data?.status || 'No data'}`);
  };

  return (
    <div className="relative min-h-screen">
      {/* LOCI Toggle - Floating in top right */}
      <div className="fixed top-28 right-4 z-50 bg-black/90 text-white p-4 rounded-lg shadow-xl">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            id="loci-debug-toggle"
            type="checkbox"
            checked={showLOCI}
            onChange={(e) => {
              console.log('LOCI Toggle clicked, new value:', e.target.checked);
              setShowLOCI(e.target.checked);
            }}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          />
          <span className="font-mono text-sm">LOCI Debug</span>
        </label>
        {showLOCI && (
          <div className="mt-2 text-xs text-green-400">
            🟢 Active {lociData ? `- ${Object.keys(lociData).length} elements` : '- Loading...'}
          </div>
        )}
      </div>

      {/* Page Permission Indicator */}
      {showLOCI && (
        <div 
          className="fixed top-28 left-20 bg-black text-white text-base px-5 py-4 rounded-md shadow-lg border-4 border-blue-500 z-40 cursor-pointer hover:bg-gray-900"
          onClick={() => handleElementClick(elementIds.pagePermission)}
        >
          <div className="font-bold text-lg mb-2">PAGE OVERVIEW</div>
          <div className="flex items-center space-x-2">
            <span className="text-green-400 font-bold text-xl">P</span>
            <span className="text-gray-400">•</span>
            <span className="font-mono">{getShortElementId(elementIds.pagePermission)}</span>
          </div>
          <div className="text-sm mt-2 text-gray-400">Admin Users Only</div>
        </div>
      )}
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">LOCI Test Page 2</h1>
          <p className="text-gray-600 mt-2">Different UI elements to test LOCI overlay integration</p>
        </div>

        {/* Section 1: User Profile Form */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">User Profile Form</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <LOCIInput
                elementId={elementIds.nameInput}
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter email address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Department</label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option value="">Select department</option>
                <option value="engineering">Engineering</option>
                <option value="marketing">Marketing</option>
                <option value="sales">Sales</option>
              </select>
            </div>
            <div className="flex space-x-4">
              <LOCIButton
                elementId={elementIds.saveProfileBtn}
                type="submit"
                className="btn btn-primary"
              >
                Save Profile
              </LOCIButton>
              <button
                type="button"
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Section 2: Data Table */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">User List</h2>
            <button className="btn btn-success">
              Add New User
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>John Doe</td>
                  <td>john@example.com</td>
                  <td>Engineering</td>
                  <td><span className="badge badge-success">Active</span></td>
                  <td>
                    <button className="btn btn-sm btn-primary mr-2">Edit</button>
                    <button className="btn btn-sm btn-error">Delete</button>
                  </td>
                </tr>
                <tr>
                  <td>Jane Smith</td>
                  <td>jane@example.com</td>
                  <td>Marketing</td>
                  <td><span className="badge badge-warning">Pending</span></td>
                  <td>
                    <button className="btn btn-sm btn-primary mr-2">Edit</button>
                    <button className="btn btn-sm btn-error">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3: Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="btn btn-outline">
              Export Data
            </button>
            <button className="btn btn-outline">
              Import Users
            </button>
            <button className="btn btn-outline">
              Generate Report
            </button>
            <button className="btn btn-outline">
              Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}