import React, { useState, useEffect, useRef } from 'react';

interface Employee {
  EmployeeID: number;
  FirstName: string;
  LastName: string;
  FullName: string;
  Email: string;
  JobTitle: string;
  Department: string;
}

interface EmployeeDropdownProps {
  value?: number | null;
  onChange: (employeeId: number | null) => void;
  placeholder?: string;
  className?: string;
}

export default function EmployeeDropdown({ 
  value, 
  onChange, 
  placeholder = "Assign...",
  className = ""
}: EmployeeDropdownProps) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch employees on mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  // Update selected employee when value changes
  useEffect(() => {
    if (value && employees.length > 0) {
      const employee = employees.find(e => e.EmployeeID === value);
      setSelectedEmployee(employee || null);
    } else {
      setSelectedEmployee(null);
    }
  }, [value, employees]);

  // Filter employees based on search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = employees.filter(emp => {
        const search = searchTerm.toLowerCase();
        return emp.FullName.toLowerCase().includes(search) ||
               emp.Email.toLowerCase().includes(search) ||
               emp.JobTitle.toLowerCase().includes(search) ||
               emp.Department.toLowerCase().includes(search);
      });
      setFilteredEmployees(filtered);
    } else {
      setFilteredEmployees(employees);
    }
  }, [searchTerm, employees]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);

    // Work completely offline - skip API calls
    console.info('🚀 Offline Mode: Using mock employee data');

    // Simulate slight delay for realistic behavior
    await new Promise(resolve => setTimeout(resolve, 150));

    // Use mock employee data
    const mockEmployees: Employee[] = [
      {
        EmployeeID: 1,
        FirstName: 'John',
        LastName: 'Smith',
        FullName: 'John Smith',
        Email: 'john.smith@company.com',
        JobTitle: 'Safety Manager',
        Department: 'Safety & Compliance'
      },
      {
        EmployeeID: 2,
        FirstName: 'Sarah',
        LastName: 'Johnson',
        FullName: 'Sarah Johnson',
        Email: 'sarah.johnson@company.com',
        JobTitle: 'Operations Supervisor',
        Department: 'Operations'
      },
      {
        EmployeeID: 3,
        FirstName: 'Michael',
        LastName: 'Brown',
        FullName: 'Michael Brown',
        Email: 'michael.brown@company.com',
        JobTitle: 'Site Coordinator',
        Department: 'Administration'
      },
      {
        EmployeeID: 4,
        FirstName: 'Emily',
        LastName: 'Davis',
        FullName: 'Emily Davis',
        Email: 'emily.davis@company.com',
        JobTitle: 'First Aid Officer',
        Department: 'Human Resources'
      },
      {
        EmployeeID: 5,
        FirstName: 'James',
        LastName: 'Wilson',
        FullName: 'James Wilson',
        Email: 'james.wilson@company.com',
        JobTitle: 'Maintenance Technician',
        Department: 'Maintenance'
      },
      {
        EmployeeID: 6,
        FirstName: 'Lisa',
        LastName: 'Anderson',
        FullName: 'Lisa Anderson',
        Email: 'lisa.anderson@company.com',
        JobTitle: 'Team Leader',
        Department: 'Production'
      },
      {
        EmployeeID: 7,
        FirstName: 'David',
        LastName: 'Miller',
        FullName: 'David Miller',
        Email: 'david.miller@company.com',
        JobTitle: 'Quality Inspector',
        Department: 'Quality Control'
      },
      {
        EmployeeID: 8,
        FirstName: 'Jennifer',
        LastName: 'Taylor',
        FullName: 'Jennifer Taylor',
        Email: 'jennifer.taylor@company.com',
        JobTitle: 'Security Officer',
        Department: 'Security'
      },
      {
        EmployeeID: 9,
        FirstName: 'Robert',
        LastName: 'Moore',
        FullName: 'Robert Moore',
        Email: 'robert.moore@company.com',
        JobTitle: 'Warehouse Supervisor',
        Department: 'Warehouse'
      },
      {
        EmployeeID: 10,
        FirstName: 'Amanda',
        LastName: 'Clark',
        FullName: 'Amanda Clark',
        Email: 'amanda.clark@company.com',
        JobTitle: 'Training Coordinator',
        Department: 'Human Resources'
      }
    ];

    setEmployees(mockEmployees);
    setFilteredEmployees(mockEmployees);
    setLoading(false);
  };

  const handleSelect = (employee: Employee | null) => {
    setSelectedEmployee(employee);
    onChange(employee?.EmployeeID || null);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <div
        className="w-full px-1 py-1 text-xs border border-gray-300 rounded cursor-pointer bg-white hover:border-gray-400 focus-within:ring-1 focus-within:ring-[#3d3a72] focus-within:border-[#3d3a72]"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedEmployee ? (
          <div className="flex items-center justify-between">
            <div className="truncate">
              <span className="font-medium text-xs">{selectedEmployee.FullName}</span>
            </div>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-600 ml-1 flex-shrink-0"
              onClick={(e) => {
                e.stopPropagation();
                handleSelect(null);
              }}
            >
              <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          <span className="text-gray-500 text-xs">{placeholder}</span>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-20 mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-64 overflow-hidden min-w-[250px] w-max">
          {employees.length > 0 && (
            <div className="p-3 border-b">
              <input
                type="text"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3d3a72] focus:border-[#3d3a72]"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
          
          <div className="overflow-y-auto max-h-60">
            {loading ? (
              <div className="p-4 text-center text-gray-500">Loading employees...</div>
            ) : employees.length === 0 ? (
              <div className="p-4 text-center">
                <div className="text-gray-500 mb-2">No employees available</div>
                <div className="text-sm text-gray-400">Employee data will be available after database setup</div>
              </div>
            ) : filteredEmployees.length === 0 && searchTerm ? (
              <div className="p-4 text-center text-gray-500">No employees match &quot;{searchTerm}&quot;</div>
            ) : (
              <>
                <div
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b"
                  onClick={() => handleSelect(null)}
                >
                  <span className="text-gray-500 italic">No employee assigned</span>
                </div>
                {filteredEmployees.map((employee) => (
                  <div
                    key={employee.EmployeeID}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSelect(employee)}
                  >
                    <div className="font-medium">{employee.FullName}</div>
                    <div className="text-sm text-gray-600">
                      {employee.JobTitle} • {employee.Department}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}