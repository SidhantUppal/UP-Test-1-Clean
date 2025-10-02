"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';
import { DEMO_EMPLOYEES, DEMO_DEPARTMENTS, DEMO_LOCATIONS, DemoDataHelpers, type Employee } from '@/lib/demoData';

type ViewMode = 'grid' | 'list';
type SortBy = 'name' | 'department' | 'position' | 'hireDate' | 'location';

export default function EmployeesPage() {
  const { theme } = useTheme();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState<string>('');
  const [locationFilter, setLocationFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortBy>('name');
  const [sortDesc, setSortDesc] = useState(false);

  // Filter and sort employees
  const filteredEmployees = useMemo(() => {
    let filtered = [...DEMO_EMPLOYEES];

    // Apply search filter
    if (searchQuery) {
      filtered = DemoDataHelpers.searchEmployees(searchQuery);
    }

    // Apply department filter
    if (departmentFilter) {
      filtered = filtered.filter(emp => emp.department === departmentFilter);
    }

    // Apply location filter
    if (locationFilter) {
      filtered = filtered.filter(emp => emp.location === locationFilter);
    }

    // Apply status filter
    if (statusFilter) {
      filtered = filtered.filter(emp => emp.status === statusFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'name':
          aValue = a.name;
          bValue = b.name;
          break;
        case 'department':
          aValue = a.department;
          bValue = b.department;
          break;
        case 'position':
          aValue = a.position;
          bValue = b.position;
          break;
        case 'hireDate':
          aValue = a.hireDate;
          bValue = b.hireDate;
          break;
        case 'location':
          aValue = a.location;
          bValue = b.location;
          break;
        default:
          aValue = a.name;
          bValue = b.name;
      }

      const comparison = aValue.localeCompare(bValue);
      return sortDesc ? -comparison : comparison;
    });

    return filtered;
  }, [searchQuery, departmentFilter, locationFilter, statusFilter, sortBy, sortDesc]);

  const handleSort = (field: SortBy) => {
    if (sortBy === field) {
      setSortDesc(!sortDesc);
    } else {
      setSortBy(field);
      setSortDesc(false);
    }
  };

  const getStatusBadge = (status: Employee['status']) => {
    const colors = {
      'Active': 'bg-green-100 text-green-800',
      'Inactive': 'bg-gray-100 text-gray-800',
      'Terminated': 'bg-red-100 text-red-800',
      'On Leave': 'bg-yellow-100 text-yellow-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getDepartmentColor = (department: string) => {
    const colors = {
      'Engineering': 'bg-blue-100 text-blue-800',
      'Operations': 'bg-green-100 text-green-800',
      'Finance': 'bg-yellow-100 text-yellow-800',
      'Executive': 'bg-purple-100 text-purple-800',
      'Human Resources': 'bg-pink-100 text-pink-800'
    };
    return colors[department] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full px-4 py-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900" style={{ margin: 0 }}>Employee Directory</h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">Manage and view all company employees</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Link href="/employees/new" className="w-full sm:w-auto">
                <button 
                  style={{ 
                    backgroundColor: '#3d3a72', 
                    color: '#ffffff', 
                    border: 'none',
                    padding: '12px 16px',
                    borderRadius: '6px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    fontSize: '14px',
                    transition: 'opacity 0.2s',
                    width: '100%'
                  }}
                  className="hover:opacity-80 min-h-[44px]"
                >
                  Add Employee
                </button>
              </Link>
              <button 
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
                className="hover:opacity-80 min-h-[44px] w-full sm:w-auto"
              >
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6 sm:px-6 lg:px-8 xl:px-12 space-y-6">

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 text-center">
            <h3 className="text-base sm:text-lg font-semibold mb-2">Total Employees</h3>
            <p className="text-2xl sm:text-3xl font-bold" style={{ color: '#3d3a72' }}>{DEMO_EMPLOYEES.length}</p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">All employees</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 text-center">
            <h3 className="text-base sm:text-lg font-semibold mb-2">Active</h3>
            <p className="text-2xl sm:text-3xl font-bold" style={{ color: '#3d3a72' }}>
              {DEMO_EMPLOYEES.filter(emp => emp.status === 'Active').length}
            </p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">Currently active</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 text-center">
            <h3 className="text-base sm:text-lg font-semibold mb-2">Departments</h3>
            <p className="text-2xl sm:text-3xl font-bold" style={{ color: '#3d3a72' }}>{DEMO_DEPARTMENTS.length}</p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">Company departments</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 text-center">
            <h3 className="text-base sm:text-lg font-semibold mb-2">Locations</h3>
            <p className="text-2xl sm:text-3xl font-bold" style={{ color: '#3d3a72' }}>{DEMO_LOCATIONS.length}</p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">Office locations</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div className="flex items-center space-x-4">
              <h4 className="text-base font-semibold">Filter Options</h4>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-4">
            {/* Search */}
            <div className="sm:col-span-2 xl:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search employees..."
                className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm min-h-[44px]"
              />
            </div>

            {/* Department Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm min-h-[44px]"
              >
                <option value="">All Departments</option>
                {DEMO_DEPARTMENTS.map(dept => (
                  <option key={dept.id} value={dept.name}>{dept.name}</option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm min-h-[44px]"
              >
                <option value="">All Locations</option>
                {DEMO_LOCATIONS.map(loc => (
                  <option key={loc.id} value={loc.name}>{loc.name}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm min-h-[44px]"
              >
                <option value="">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="On Leave">On Leave</option>
                <option value="Terminated">Terminated</option>
              </select>
            </div>
          </div>

          {/* View Controls */}
          <div className="pt-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <span className="text-sm text-gray-600">
                  Showing {filteredEmployees.length} of {DEMO_EMPLOYEES.length} employees
                </span>
                {(searchQuery || departmentFilter || locationFilter || statusFilter) && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setDepartmentFilter('');
                      setLocationFilter('');
                      setStatusFilter('');
                    }}
                    className="text-sm hover:opacity-80 self-start sm:self-auto"
                    style={{ color: '#3d3a72' }}
                  >
                    Clear Filters
                  </button>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center ${viewMode === 'grid' ? 'text-white' : 'bg-gray-100 text-gray-600'}`}
                  style={viewMode === 'grid' ? { backgroundColor: '#3d3a72' } : {}}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center ${viewMode === 'list' ? 'text-white' : 'bg-gray-100 text-gray-600'}`}
                  style={viewMode === 'list' ? { backgroundColor: '#3d3a72' } : {}}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Employee List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 p-4 sm:p-6">
            {filteredEmployees.map(employee => (
              <Link
                key={employee.id}
                href={`/employees/${employee.id}`}
                className="group block bg-white border border-gray-200 rounded-lg p-4 sm:p-6 hover:border-theme-primary hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 font-medium text-sm sm:text-base">
                      {employee.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="ml-3 flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-medium text-gray-900 group-hover:opacity-80 truncate" style={{ color: 'inherit' }}>
                      {employee.name}
                    </h3>
                    <p className="text-sm text-gray-600 truncate">{employee.position}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium">Department:</span>
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getDepartmentColor(employee.department)}`}>
                      {employee.department}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium">Location:</span>
                    <span className="ml-2">{employee.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium">Status:</span>
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getStatusBadge(employee.status)}`}>
                      {employee.status}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium">Hire Date:</span>
                    <span className="ml-2">{formatDate(employee.hireDate)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div className="min-w-[640px]">
            <table className="w-full">
              <thead className="bg-purple-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort('name')}
                      className="flex items-center space-x-1 hover:text-gray-700"
                    >
                      <span>Employee</span>
                      {sortBy === 'name' && (
                        <span className={`transform ${sortDesc ? 'rotate-180' : ''}`}>↑</span>
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort('department')}
                      className="flex items-center space-x-1 hover:text-gray-700"
                    >
                      <span>Department</span>
                      {sortBy === 'department' && (
                        <span className={`transform ${sortDesc ? 'rotate-180' : ''}`}>↑</span>
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort('position')}
                      className="flex items-center space-x-1 hover:text-gray-700"
                    >
                      <span>Position</span>
                      {sortBy === 'position' && (
                        <span className={`transform ${sortDesc ? 'rotate-180' : ''}`}>↑</span>
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort('location')}
                      className="flex items-center space-x-1 hover:text-gray-700"
                    >
                      <span>Location</span>
                      {sortBy === 'location' && (
                        <span className={`transform ${sortDesc ? 'rotate-180' : ''}`}>↑</span>
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort('hireDate')}
                      className="flex items-center space-x-1 hover:text-gray-700"
                    >
                      <span>Hire Date</span>
                      {sortBy === 'hireDate' && (
                        <span className={`transform ${sortDesc ? 'rotate-180' : ''}`}>↑</span>
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEmployees.map(employee => (
                  <tr key={employee.id} className="hover:bg-purple-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-gray-600 font-medium text-sm">
                            {employee.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                          <div className="text-sm text-gray-500">{employee.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs ${getDepartmentColor(employee.department)}`}>
                        {employee.department}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {employee.position}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {employee.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadge(employee.status)}`}>
                        {employee.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(employee.hireDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <Link
                        href={`/employees/${employee.id}`}
                        className="hover:opacity-80"
                        style={{ color: '#3d3a72' }}
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}