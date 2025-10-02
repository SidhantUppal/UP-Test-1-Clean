"use client";

import React, { useState } from 'react';

export default function CreateEmployeePage() {
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showOrgGroupModal, setShowOrgGroupModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    employeeName: '',
    email: '',
    landlineTelephone: '',
    mobileTelephone: '',
    location: '',
    locationName: '',
    jobRole: '',
    orgGroup: '',
    orgGroupName: '',
    orgGroups: [] as Array<{orgGroupId: string, orgGroupName: string}>,
    uniqueReference: '',
    dateOfBirth: '',
    gender: '',
    niNumber: '',
    employmentStartDate: '',
    employmentEndDate: '',
    jobCode: '',
    jobTitle: '',
    employeeLineManager: '',
    isComputerUser: false,
    homeWorker: false,
    isHotDesking: false,
    reasonNotWorking: '',
    addressLine1: '',
    addressLine2: '',
    addressLine3: '',
    town: '',
    county: '',
    postcode: '',
    profileImage: null,
    hiddenFromView: false,
    allowArchive: false,
    canLogin: false,
    belongsToAllOrgGroups: false,
    loginUsername: '',
    loginPassword: '',
    confirmPassword: '',
    sendLoginDetailsByEmail: false,
    allowMobileApp: false,
    healthAndSafety: false,
    hr: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form data:', formData);
  };

  const handleCancel = () => {
    // Handle cancel action
    console.log('Cancel');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full px-4 py-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900" style={{ margin: 0 }}>
                Create Employee Details
              </h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">Add a new employee to the system</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6 sm:px-6 lg:px-8 xl:px-12">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Employee Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-lg sm:text-xl font-semibold">Basic Employee Information</h2>
              <p className="text-gray-600 text-sm mt-1">
                Please fill out the basic employee information in the fields below, including the employee's title and full name.
                Contact details such as a telephone number and e-mail address are optional, but if the e-mail
                address is not included then the employee will be unable to receive e-mail notifications from T100.
                <span className="text-red-600">*</span>
              </p>
            </div>
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <select
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm min-h-[44px]"
                  >
                    <option value="">(Not Known)</option>
                    <option value="mr">Mr</option>
                    <option value="mrs">Mrs</option>
                    <option value="miss">Miss</option>
                    <option value="ms">Ms</option>
                    <option value="dr">Dr</option>
                    <option value="prof">Prof</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Employee Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="employeeName"
                    value={formData.employeeName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm min-h-[44px]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm min-h-[44px]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Landline Telephone Number
                  </label>
                  <input
                    type="tel"
                    name="landlineTelephone"
                    value={formData.landlineTelephone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm min-h-[44px]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Telephone Number
                  </label>
                  <input
                    type="tel"
                    name="mobileTelephone"
                    value={formData.mobileTelephone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm min-h-[44px]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-lg sm:text-xl font-semibold">Location</h2>
            </div>
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      value={formData.locationName}
                      readOnly
                      className="flex-1 px-3 py-3 border border-gray-300 rounded-md bg-gray-50 min-h-[44px]"
                      placeholder="Click to select location"
                    />
                    <button
                      type="button"
                      onClick={() => setShowLocationModal(true)}
                      className="px-4 py-3 text-white rounded hover:opacity-80 min-h-[44px] whitespace-nowrap"
                      style={{ backgroundColor: '#3d3a72' }}
                    >
                      Select Location
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Role(s)
                  </label>
                  <select
                    name="jobRole"
                    value={formData.jobRole}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm min-h-[44px]"
                  >
                    <option value="">Select Job Role</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Organisation Groups */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 sm:p-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="hiddenFromView"
                    id="hiddenFromView"
                    checked={formData.hiddenFromView}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label htmlFor="hiddenFromView" className="ml-2 text-sm text-gray-600">
                    Tick this box if the employee should be hidden from view
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="allowArchive"
                    id="allowArchive"
                    checked={formData.allowArchive}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label htmlFor="allowArchive" className="ml-2 text-sm text-gray-600">
                    Tick this box to allow the employee to be archived if not included in any import CSV file
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="canLogin"
                    id="canLogin"
                    checked={formData.canLogin}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label htmlFor="canLogin" className="ml-2 text-sm text-gray-600">
                    Tick this box if the employee should be able to log into the system
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="belongsToAllOrgGroups"
                    id="belongsToAllOrgGroups"
                    checked={formData.belongsToAllOrgGroups}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label htmlFor="belongsToAllOrgGroups" className="ml-2 text-sm text-gray-600">
                    Tick this box if the employee should belong to all org groups in this user area if the employee can log in, they will have access to all org groups
                  </label>
                </div>
              </div>

              {/* Login Details - Show only when canLogin is checked */}
              {formData.canLogin && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="text-base font-semibold mb-4">Login Details</h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Login Username <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        name="loginUsername"
                        value={formData.loginUsername}
                        onChange={handleInputChange}
                        className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm min-h-[44px]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Login Password <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="password"
                        name="loginPassword"
                        value={formData.loginPassword}
                        onChange={handleInputChange}
                        className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm min-h-[44px]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm Password <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm min-h-[44px]"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                      <button
                        type="button"
                        style={{
                          backgroundColor: '#3d3a72',
                          color: '#ffffff',
                          border: 'none',
                          padding: '8px 12px',
                          borderRadius: '6px',
                          fontWeight: '500',
                          cursor: 'pointer',
                          fontSize: '12px',
                          transition: 'opacity 0.2s'
                        }}
                        className="hover:opacity-80 min-h-[40px]"
                      >
                        Generate Password
                      </button>

                      <button
                        type="button"
                        style={{
                          backgroundColor: '#3d3a72',
                          color: '#ffffff',
                          border: 'none',
                          padding: '8px 12px',
                          borderRadius: '6px',
                          fontWeight: '500',
                          cursor: 'pointer',
                          fontSize: '12px',
                          transition: 'opacity 0.2s'
                        }}
                        className="hover:opacity-80 min-h-[40px]"
                      >
                        Show Password
                      </button>
                    </div>

                    <p className="text-sm text-gray-600 font-semibold mt-4">
                      Please note: the user will need to change their password again after logging in, for security reasons.
                    </p>

                    <div className="space-y-3">
                      <h4 className="text-sm font-medium text-gray-700">Send login details by e-mail</h4>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="sendLoginDetailsByEmail"
                          id="sendLoginDetailsByEmail"
                          checked={formData.sendLoginDetailsByEmail}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                        />
                        <label htmlFor="sendLoginDetailsByEmail" className="ml-2 text-sm text-gray-600">
                          Tick this box to send an e-mail to the employee confirming their login credentials (if an e-mail address has been provided)
                        </label>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-sm font-medium text-gray-700">App user?</h4>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="allowMobileApp"
                          id="allowMobileApp"
                          checked={formData.allowMobileApp}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                        />
                        <label htmlFor="allowMobileApp" className="ml-2 text-sm text-gray-600">
                          Allow this user to access T100 on the mobile app
                        </label>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-sm font-medium text-gray-700">Product Options</h4>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            name="healthAndSafety"
                            id="healthAndSafety"
                            checked={formData.healthAndSafety}
                            onChange={handleInputChange}
                            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                          />
                          <label htmlFor="healthAndSafety" className="ml-2 text-sm text-gray-600">
                            Health & Safety
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            name="hr"
                            id="hr"
                            checked={formData.hr}
                            onChange={handleInputChange}
                            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                          />
                          <label htmlFor="hr" className="ml-2 text-sm text-gray-600">
                            HR
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Organisation Groups dropdown - Show only when belongsToAllOrgGroups is NOT checked */}
              {!formData.belongsToAllOrgGroups && (
                <div className="mt-6">
                  <h3 className="text-base font-semibold mb-4">This employee is part of the following Organisation Groups</h3>
                  <button
                    type="button"
                    onClick={() => setShowOrgGroupModal(true)}
                    className="w-full px-3 py-3 border border-gray-300 rounded-md text-left hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 min-h-[44px]"
                  >
                    {formData.orgGroups.length > 0 ? formData.orgGroups.map(og => og.orgGroupName).join(', ') : 'Click to select organization group...'}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* HR Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-lg sm:text-xl font-semibold">HR Information</h2>
            </div>
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Unique Employee Reference
                  </label>
                  <input
                    type="text"
                    name="uniqueReference"
                    value={formData.uniqueReference}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm min-h-[44px]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm min-h-[44px] cursor-pointer"
                    placeholder="dd/mm/yyyy"
                    onClick={(e) => {
                      // Use showPicker if available (modern browsers)
                      (e.currentTarget as any).showPicker?.();
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm min-h-[44px]"
                  >
                    <option value="">Select a Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    NI Number
                  </label>
                  <input
                    type="text"
                    name="niNumber"
                    value={formData.niNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm min-h-[44px]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Employment Start Date
                  </label>
                  <input
                    type="date"
                    name="employmentStartDate"
                    value={formData.employmentStartDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm min-h-[44px] cursor-pointer"
                    placeholder="dd/mm/yyyy"
                    onClick={(e) => {
                      // Use showPicker if available (modern browsers)
                      (e.currentTarget as any).showPicker?.();
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Employment End Date
                  </label>
                  <input
                    type="date"
                    name="employmentEndDate"
                    value={formData.employmentEndDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm min-h-[44px] cursor-pointer"
                    placeholder="dd/mm/yyyy"
                    onClick={(e) => {
                      // Use showPicker if available (modern browsers)
                      (e.currentTarget as any).showPicker?.();
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Code
                  </label>
                  <input
                    type="text"
                    name="jobCode"
                    value={formData.jobCode}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm min-h-[44px]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Title
                  </label>
                  <input
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm min-h-[44px]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Employee Line Manager
                  </label>
                  <select
                    name="employeeLineManager"
                    value={formData.employeeLineManager}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm min-h-[44px]"
                  >
                    <option value="">Department's Line Manager</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isComputerUser"
                    id="isComputerUser"
                    checked={formData.isComputerUser}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isComputerUser" className="ml-2 text-sm text-gray-700">
                    Is Computer User?
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="homeWorker"
                    id="homeWorker"
                    checked={formData.homeWorker}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label htmlFor="homeWorker" className="ml-2 text-sm text-gray-700">
                    Home Worker
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isHotDesking"
                    id="isHotDesking"
                    checked={formData.isHotDesking}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isHotDesking" className="ml-2 text-sm text-gray-700">
                    Is Hot desking?
                  </label>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-sm text-gray-600 mb-4">
                  Tick this box if the employee is not currently working (for example, if on maternity leave, or long term sick).
                  Any tasks assigned to this employee will be hidden from view until the employee returns to work.
                </p>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason why employee is not currently working
                </label>
                <select
                  name="reasonNotWorking"
                  value={formData.reasonNotWorking}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                >
                  <option value="">Not applicable</option>
                  <option value="maternity">Maternity Leave</option>
                  <option value="paternity">Paternity Leave</option>
                  <option value="sick">Long Term Sick</option>
                  <option value="sabbatical">Sabbatical</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Home Address */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-lg sm:text-xl font-semibold">Home Address</h2>
            </div>
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address Line 1
                  </label>
                  <input
                    type="text"
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm min-h-[44px]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address Line 2
                  </label>
                  <input
                    type="text"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm min-h-[44px]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address Line 3
                  </label>
                  <input
                    type="text"
                    name="addressLine3"
                    value={formData.addressLine3}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm min-h-[44px]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Town
                  </label>
                  <input
                    type="text"
                    name="town"
                    value={formData.town}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm min-h-[44px]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    County
                  </label>
                  <input
                    type="text"
                    name="county"
                    value={formData.county}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm min-h-[44px]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Postcode
                  </label>
                  <input
                    type="text"
                    name="postcode"
                    value={formData.postcode}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm min-h-[44px]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Upload Profile Image */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-lg sm:text-xl font-semibold">Upload Profile Image</h2>
              <p className="text-gray-600 text-sm mt-1">
                Here you can upload an image to appear alongside the main element content
              </p>
            </div>
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-center">
                <div className="w-32 h-32 sm:w-48 sm:h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <svg className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="text-xs sm:text-sm text-gray-600 mt-2">Click to upload image</p>
                  </div>
                  <input type="file" className="hidden" accept="image/*" />
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-3 pt-6">
            <button
              type="submit"
              style={{
                backgroundColor: '#3d3a72',
                color: '#ffffff',
                border: 'none',
                padding: '12px 16px',
                borderRadius: '6px',
                fontWeight: '500',
                cursor: 'pointer',
                fontSize: '14px',
                transition: 'opacity 0.2s'
              }}
              className="hover:opacity-80 min-h-[44px]"
            >
              SAVE
            </button>

            <button
              type="button"
              onClick={handleCancel}
              style={{
                backgroundColor: '#e77726',
                color: '#ffffff',
                border: 'none',
                padding: '12px 16px',
                borderRadius: '6px',
                fontWeight: '500',
                cursor: 'pointer',
                fontSize: '14px',
                transition: 'opacity 0.2s'
              }}
              className="hover:opacity-80 min-h-[44px]"
            >
              CANCEL
            </button>
          </div>
        </form>
      </div>

      {/* Location Modal */}
      {showLocationModal && (
        <LocationPickerModal
          onSelect={(location) => {
            setFormData({ ...formData, location: location.locationId, locationName: location.locationName });
            setShowLocationModal(false);
          }}
          onClose={() => setShowLocationModal(false)}
        />
      )}

      {/* Organization Group Modal */}
      {showOrgGroupModal && (
        <OrgGroupPickerModal
          onSelect={(orgGroups) => {
            setFormData({ ...formData, orgGroups: orgGroups, orgGroupName: orgGroups.map(og => og.orgGroupName).join(', ') });
            setShowOrgGroupModal(false);
          }}
          onClose={() => setShowOrgGroupModal(false)}
        />
      )}
    </div>
  );
}

// Organization Group Picker Modal Component
function OrgGroupPickerModal({ onSelect, onClose }: { 
  onSelect: (orgGroups: Array<{ orgGroupId: string; orgGroupName: string }>) => void;
  onClose: () => void;
}) {
  const [selectedOrgGroups, setSelectedOrgGroups] = useState<Array<{ orgGroupId: string; orgGroupName: string }>>([]);
  const [filterText, setFilterText] = useState('');
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['headOffice', 'other']));
  
  // Hierarchical organization group data structure
  const orgGroups = {
    headOffice: {
      title: 'Head Office',
      reference: 'HEAD',
      items: [
        { OrgGroupID: 1, OrgGroupName: 'HQ London', Reference: 'HEAD.LON' },
        { OrgGroupID: 2, OrgGroupName: 'HQ Stafford', Reference: 'HEAD.STAF' },
      ]
    },
    other: {
      title: 'Other',
      reference: 'OTHER',
      items: [
        { OrgGroupID: 3, OrgGroupName: 'Regional Office', Reference: 'OTHER.REG' },
        { OrgGroupID: 4, OrgGroupName: 'Remote Teams', Reference: 'OTHER.REMOTE' },
      ]
    }
  };

  const toggleGroup = (groupKey: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupKey)) {
      newExpanded.delete(groupKey);
    } else {
      newExpanded.add(groupKey);
    }
    setExpandedGroups(newExpanded);
  };

  const handleSelectOrgGroup = (orgGroup: any) => {
    const orgGroupData = {
      orgGroupId: orgGroup.OrgGroupID.toString(),
      orgGroupName: orgGroup.OrgGroupName
    };
    
    const isSelected = selectedOrgGroups.some(og => og.orgGroupId === orgGroupData.orgGroupId);
    if (isSelected) {
      // Remove if already selected
      setSelectedOrgGroups(selectedOrgGroups.filter(og => og.orgGroupId !== orgGroupData.orgGroupId));
    } else {
      // Add if not selected
      setSelectedOrgGroups([...selectedOrgGroups, orgGroupData]);
    }
  };

  const handleOK = () => {
    if (selectedOrgGroups.length > 0) {
      onSelect(selectedOrgGroups);
    }
  };

  const filterOrgGroups = (items: any[]) => {
    if (!filterText) return items;
    return items.filter(item => 
      item.OrgGroupName.toLowerCase().includes(filterText.toLowerCase()) ||
      item.Reference.toLowerCase().includes(filterText.toLowerCase())
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Select Organization Group</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="p-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <label className="text-sm text-gray-600 whitespace-nowrap">Filter visible items</label>
              <input type="text" value={filterText} onChange={(e) => setFilterText(e.target.value)} className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[40px]" />
              <div className="flex flex-col sm:flex-row gap-2">
                <button onClick={() => {}} style={{ backgroundColor: '#3d3a72', color: '#ffffff', padding: '8px 12px', borderRadius: '4px', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }} className="hover:opacity-80 min-h-[40px]">Apply filter</button>
                <span className="text-gray-400 hidden sm:block">or</span>
                <button onClick={() => { setFilterText(''); setExpandedGroups(new Set(['headOffice', 'other'])); }} style={{ backgroundColor: '#3d3a72', color: '#ffffff', padding: '8px 12px', borderRadius: '4px', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }} className="hover:opacity-80 min-h-[40px]">Show all items</button>
              </div>
            </div>
          </div>
          
          <div className="p-4" style={{ maxHeight: '400px', overflowY: 'auto' }}>
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left pb-2 text-sm font-medium text-gray-700">Title</th>
                  <th className="text-left pb-2 text-sm font-medium text-gray-700">Reference</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(orgGroups).map(([groupKey, group]) => {
                  const filteredItems = filterOrgGroups(group.items);
                  if (filterText && filteredItems.length === 0) return null;
                  
                  return (
                    <React.Fragment key={groupKey}>
                      <tr className="hover:bg-gray-50 cursor-pointer" onClick={() => toggleGroup(groupKey)}>
                        <td className="py-2 text-sm">
                          <div className="flex items-center">
                            <span className="mr-2 text-gray-500">{expandedGroups.has(groupKey) ? '−' : '+'}</span>
                            <span className="font-medium">{group.title}</span>
                          </div>
                        </td>
                        <td className="py-2 text-sm text-gray-600">{group.reference}</td>
                      </tr>
                      
                      {expandedGroups.has(groupKey) && filteredItems.map((orgGroup) => {
                        const isSelected = selectedOrgGroups.some(og => og.orgGroupId === orgGroup.OrgGroupID.toString());
                        return (
                          <tr key={orgGroup.OrgGroupID} className={`hover:bg-gray-50 cursor-pointer ${isSelected ? 'bg-blue-50' : ''}`} onClick={() => handleSelectOrgGroup(orgGroup)}>
                            <td className="py-2 text-sm">
                              <div className="flex items-center pl-8">
                                <input type="checkbox" checked={isSelected} onChange={() => handleSelectOrgGroup(orgGroup)} className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" onClick={(e) => e.stopPropagation()} />
                                <span>{orgGroup.OrgGroupName}</span>
                              </div>
                            </td>
                            <td className="py-2 text-sm text-gray-600">{orgGroup.Reference}</td>
                          </tr>
                        );
                      })}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          <div className="flex justify-start p-4 border-t border-gray-200">
            <button style={{ backgroundColor: '#3d3a72', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '4px', fontWeight: '500', cursor: selectedOrgGroups.length > 0 ? 'pointer' : 'not-allowed', fontSize: '14px', opacity: selectedOrgGroups.length > 0 ? 1 : 0.5 }} className="hover:opacity-80 min-h-[44px]" onClick={handleOK} disabled={selectedOrgGroups.length === 0}>OK</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Location Picker Modal Component
function LocationPickerModal({ onSelect, onClose }: { 
  onSelect: (location: { locationId: string; locationName: string }) => void;
  onClose: () => void;
}) {
  const [selectedLocation, setSelectedLocation] = useState<{ locationId: string; locationName: string } | null>(null);
  const [filterText, setFilterText] = useState('');
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['main', 'warehouse', 'other']));
  
  // Hierarchical location data structure for tree view
  const locationGroups = {
    main: {
      title: 'Main Facilities',
      reference: 'MAIN',
      items: [
        { LocationID: 1, LocationName: 'Main Office HQ', Reference: 'MAIN.HQ' },
        { LocationID: 2, LocationName: 'Reception Area', Reference: 'MAIN.REC' },
        { LocationID: 3, LocationName: 'Conference Rooms', Reference: 'MAIN.CONF' },
      ]
    },
    warehouse: {
      title: 'Warehouse & Production',
      reference: 'WARE',
      items: [
        { LocationID: 4, LocationName: 'Warehouse North', Reference: 'WARE.N' },
        { LocationID: 5, LocationName: 'Production Floor', Reference: 'WARE.PROD' },
        { LocationID: 6, LocationName: 'Loading Dock', Reference: 'WARE.DOCK' },
        { LocationID: 7, LocationName: 'Storage Area', Reference: 'WARE.STOR' },
      ]
    },
    other: {
      title: 'Other Locations',
      reference: 'OTHER',
      items: [
        { LocationID: 8, LocationName: 'Parking Lot', Reference: 'OTHER.PARK' },
        { LocationID: 9, LocationName: 'Kitchen/Break Room', Reference: 'OTHER.BREAK' },
        { LocationID: 10, LocationName: 'Emergency Exits', Reference: 'OTHER.EXIT' },
        { LocationID: 11, LocationName: 'Rooftop Access', Reference: 'OTHER.ROOF' },
      ]
    }
  };

  const toggleGroup = (groupKey: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupKey)) {
      newExpanded.delete(groupKey);
    } else {
      newExpanded.add(groupKey);
    }
    setExpandedGroups(newExpanded);
  };

  const handleSelectLocation = (location: any) => {
    setSelectedLocation({
      locationId: location.LocationID.toString(),
      locationName: location.LocationName
    });
  };

  const handleOK = () => {
    if (selectedLocation) {
      onSelect(selectedLocation);
    }
  };

  const applyFilter = () => {
    // Filter logic would go here
  };

  const showAllItems = () => {
    setFilterText('');
    setExpandedGroups(new Set(['main', 'warehouse', 'other']));
  };

  // Filter locations based on search text
  const filterLocations = (items: any[]) => {
    if (!filterText) return items;
    return items.filter(item => 
      item.LocationName.toLowerCase().includes(filterText.toLowerCase()) ||
      item.Reference.toLowerCase().includes(filterText.toLowerCase())
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      {/* Modal Container */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Select Location</h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Filter Section */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <label className="text-sm text-gray-600 whitespace-nowrap">Filter visible items</label>
              <input
                type="text"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[40px]"
                placeholder=""
              />
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={applyFilter}
                  style={{ 
                    backgroundColor: '#3d3a72',
                    color: '#ffffff',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    fontSize: '13px',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                  className="hover:opacity-80 min-h-[40px]"
                >
                  Apply filter
                </button>
                <span className="text-gray-400 hidden sm:block">or</span>
                <button
                  onClick={showAllItems}
                  style={{ 
                    backgroundColor: '#3d3a72',
                    color: '#ffffff',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    fontSize: '13px',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                  className="hover:opacity-80 min-h-[40px]"
                >
                  Show all items
                </button>
              </div>
            </div>
          </div>
          
          {/* Tree View List */}
          <div className="p-4" style={{ maxHeight: '400px', overflowY: 'auto' }}>
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left pb-2 text-sm font-medium text-gray-700">Title</th>
                  <th className="text-left pb-2 text-sm font-medium text-gray-700">Reference</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(locationGroups).map(([groupKey, group]) => {
                  const filteredItems = filterLocations(group.items);
                  if (filterText && filteredItems.length === 0) return null;
                  
                  return (
                    <React.Fragment key={groupKey}>
                      {/* Group Header */}
                      <tr 
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => toggleGroup(groupKey)}
                      >
                        <td className="py-2 text-sm">
                          <div className="flex items-center">
                            <span className="mr-2 text-gray-500">
                              {expandedGroups.has(groupKey) ? '−' : '+'}
                            </span>
                            <span className="font-medium">{group.title}</span>
                          </div>
                        </td>
                        <td className="py-2 text-sm text-gray-600">{group.reference}</td>
                      </tr>
                      
                      {/* Group Items */}
                      {expandedGroups.has(groupKey) && filteredItems.map((location) => (
                        <tr 
                          key={location.LocationID}
                          className={`hover:bg-gray-50 cursor-pointer ${
                            selectedLocation?.locationId === location.LocationID.toString() ? 'bg-blue-50' : ''
                          }`}
                          onClick={() => handleSelectLocation(location)}
                        >
                          <td className="py-2 text-sm">
                            <div className="flex items-center pl-8">
                              <input
                                type="checkbox"
                                checked={selectedLocation?.locationId === location.LocationID.toString()}
                                onChange={() => handleSelectLocation(location)}
                                className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                onClick={(e) => e.stopPropagation()}
                              />
                              <span>{location.LocationName}</span>
                            </div>
                          </td>
                          <td className="py-2 text-sm text-gray-600">{location.Reference}</td>
                        </tr>
                      ))}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {/* Modal Footer */}
          <div className="flex justify-start p-4 border-t border-gray-200">
            <button 
              style={{ 
                backgroundColor: '#3d3a72',
                color: '#ffffff',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '4px',
                fontWeight: '500',
                cursor: selectedLocation ? 'pointer' : 'not-allowed',
                fontSize: '14px',
                opacity: selectedLocation ? 1 : 0.5
              }}
              className="hover:opacity-80 min-h-[44px]"
              onClick={handleOK}
              disabled={!selectedLocation}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}