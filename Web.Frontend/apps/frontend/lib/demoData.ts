// Demo data storage for document parser examples
// This provides realistic examples for demonstrating the document parser functionality

// Enhanced Employee interface with business fields
export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  employeeId: string;
  startDate: string;
  salary: string;
  supervisor: string;
  location: string;
  
  // Enhanced business fields
  hireDate: string;
  terminationDate?: string;
  status: 'Active' | 'Inactive' | 'Terminated' | 'On Leave';
  employmentType: 'Full-time' | 'Part-time' | 'Contract' | 'Intern';
  
  // Contact & Personal
  phone: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  homeAddress: string;
  
  // Professional
  skills: string[];
  certifications: string[];
  directReports: string[];
  orgLevel: number;
  
  // Work arrangement
  workLocation: string;
  homeLocation: string;
  remoteWorkDays: number;
  
  // System fields
  lastLogin: string;
  profilePicture?: string;
  biography?: string;
  
  // Business tracking
  incidentCount: number;
  checklistsAssigned: number;
  riskAssessments: number;
  assetsAssigned: number;
  dseCompleted: boolean;
  processesInvolved: number;
}

export const DEMO_EMPLOYEES: Employee[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@company.com',
    department: 'Engineering',
    position: 'Senior Software Engineer',
    employeeId: 'EMP001',
    startDate: '2023-01-15',
    salary: '95000',
    supervisor: 'Sarah Johnson',
    location: 'New York Office',
    
    // Enhanced fields
    hireDate: '2023-01-15',
    status: 'Active',
    employmentType: 'Full-time',
    phone: '(555) 123-4567',
    emergencyContact: {
      name: 'Jane Smith',
      relationship: 'Spouse',
      phone: '(555) 123-4568'
    },
    homeAddress: '123 Main St, Brooklyn, NY 11201',
    skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    certifications: ['AWS Certified Developer', 'Safety Training'],
    directReports: [],
    orgLevel: 3,
    workLocation: 'New York Office',
    homeLocation: 'Brooklyn, NY',
    remoteWorkDays: 2,
    lastLogin: '2024-01-15T14:30:00Z',
    profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    biography: 'Experienced software engineer with 5+ years developing scalable web applications.',
    incidentCount: 0,
    checklistsAssigned: 3,
    riskAssessments: 1,
    assetsAssigned: 2,
    dseCompleted: true,
    processesInvolved: 5
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    department: 'Engineering',
    position: 'Engineering Manager',
    employeeId: 'EMP002',
    startDate: '2022-03-01',
    salary: '125000',
    supervisor: 'Mike Wilson',
    location: 'New York Office',
    
    // Enhanced fields
    hireDate: '2022-03-01',
    status: 'Active',
    employmentType: 'Full-time',
    phone: '(555) 234-5678',
    emergencyContact: {
      name: 'Michael Johnson',
      relationship: 'Spouse',
      phone: '(555) 234-5679'
    },
    homeAddress: '456 Oak Ave, Manhattan, NY 10001',
    skills: ['Team Leadership', 'Python', 'Java', 'Project Management'],
    certifications: ['PMP', 'Scrum Master', 'Safety Training'],
    directReports: ['EMP001'],
    orgLevel: 2,
    workLocation: 'New York Office',
    homeLocation: 'Manhattan, NY',
    remoteWorkDays: 1,
    lastLogin: '2024-01-15T15:45:00Z',
    profilePicture: 'https://images.unsplash.com/photo-1494790108755-2616b73b2ad5?w=150&h=150&fit=crop&crop=face',
    biography: 'Engineering leader with 8 years of experience building and managing high-performing teams.',
    incidentCount: 0,
    checklistsAssigned: 5,
    riskAssessments: 2,
    assetsAssigned: 3,
    dseCompleted: true,
    processesInvolved: 8
  },
  {
    id: '3',
    name: 'Mike Wilson',
    email: 'mike.wilson@company.com',
    department: 'Operations',
    position: 'VP of Operations',
    employeeId: 'EMP003',
    startDate: '2021-06-01',
    salary: '150000',
    supervisor: 'Lisa Anderson',
    location: 'Corporate HQ',
    
    // Enhanced fields
    hireDate: '2021-06-01',
    status: 'Active',
    employmentType: 'Full-time',
    phone: '(555) 345-6789',
    emergencyContact: {
      name: 'Lisa Wilson',
      relationship: 'Spouse',
      phone: '(555) 345-6790'
    },
    homeAddress: '789 Pine St, Manhattan, NY 10002',
    skills: ['Operations Management', 'Strategic Planning', 'Process Improvement'],
    certifications: ['Six Sigma Black Belt', 'ISO 9001', 'Safety Leadership'],
    directReports: ['EMP002', 'EMP006'],
    orgLevel: 1,
    workLocation: 'Corporate HQ',
    homeLocation: 'Manhattan, NY',
    remoteWorkDays: 0,
    lastLogin: '2024-01-15T16:20:00Z',
    profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    biography: 'Operations executive with 12 years of experience optimizing business processes.',
    incidentCount: 0,
    checklistsAssigned: 8,
    riskAssessments: 4,
    assetsAssigned: 5,
    dseCompleted: true,
    processesInvolved: 12
  },
  {
    id: '4',
    name: 'Lisa Anderson',
    email: 'lisa.anderson@company.com',
    department: 'Executive',
    position: 'CEO',
    employeeId: 'EMP004',
    startDate: '2020-01-01',
    salary: '200000',
    supervisor: 'Board of Directors',
    location: 'Corporate HQ',
    
    // Enhanced fields
    hireDate: '2020-01-01',
    status: 'Active',
    employmentType: 'Full-time',
    phone: '(555) 456-7890',
    emergencyContact: {
      name: 'David Anderson',
      relationship: 'Spouse',
      phone: '(555) 456-7891'
    },
    homeAddress: '321 Executive Blvd, Manhattan, NY 10003',
    skills: ['Executive Leadership', 'Strategic Vision', 'Business Development'],
    certifications: ['Executive MBA', 'Board Certification'],
    directReports: ['EMP003', 'EMP007'],
    orgLevel: 0,
    workLocation: 'Corporate HQ',
    homeLocation: 'Manhattan, NY',
    remoteWorkDays: 0,
    lastLogin: '2024-01-15T17:00:00Z',
    profilePicture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    biography: 'Visionary leader with 15 years of experience building successful technology companies.',
    incidentCount: 0,
    checklistsAssigned: 3,
    riskAssessments: 1,
    assetsAssigned: 4,
    dseCompleted: true,
    processesInvolved: 15
  },
  {
    id: '5',
    name: 'David Chen',
    email: 'david.chen@company.com',
    department: 'Finance',
    position: 'Financial Analyst',
    employeeId: 'EMP005',
    startDate: '2023-09-01',
    salary: '75000',
    supervisor: 'Robert Kim',
    location: 'Chicago Office',
    
    // Enhanced fields
    hireDate: '2023-09-01',
    status: 'Active',
    employmentType: 'Full-time',
    phone: '(555) 567-8901',
    emergencyContact: {
      name: 'Amy Chen',
      relationship: 'Sister',
      phone: '(555) 567-8902'
    },
    homeAddress: '654 Financial Dr, Chicago, IL 60601',
    skills: ['Financial Analysis', 'Excel', 'SQL', 'Tableau'],
    certifications: ['CFA Level I', 'Financial Risk Management'],
    directReports: [],
    orgLevel: 3,
    workLocation: 'Chicago Office',
    homeLocation: 'Chicago, IL',
    remoteWorkDays: 3,
    lastLogin: '2024-01-15T13:15:00Z',
    profilePicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    biography: 'Detail-oriented financial analyst with expertise in risk assessment and data analysis.',
    incidentCount: 0,
    checklistsAssigned: 2,
    riskAssessments: 3,
    assetsAssigned: 1,
    dseCompleted: true,
    processesInvolved: 4
  }
];

export const DEMO_COMPANY_INFO = {
  name: 'T100 Solutions Inc.',
  address: '123 Business Ave, New York, NY 10001',
  phone: '(555) 123-4567',
  email: 'info@t100solutions.com',
  website: 'www.t100solutions.com',
  state: 'New York',
  taxId: '12-3456789',
  founded: '2020',
  industry: 'Technology Solutions'
};

// Organisational structure data
export interface Department {
  id: string;
  name: string;
  description: string;
  manager: string;
  employeeCount: number;
  budget: string;
  location: string;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  type: 'Office' | 'Warehouse' | 'Remote' | 'Client Site';
  employeeCount: number;
  established: string;
}

export const DEMO_DEPARTMENTS: Department[] = [
  {
    id: 'ENG',
    name: 'Engineering',
    description: 'Software development and technical innovation',
    manager: 'Sarah Johnson',
    employeeCount: 15,
    budget: '2,500,000',
    location: 'New York Office'
  },
  {
    id: 'OPS',
    name: 'Operations',
    description: 'Business operations and process management',
    manager: 'Mike Wilson',
    employeeCount: 8,
    budget: '1,200,000',
    location: 'Corporate HQ'
  },
  {
    id: 'FIN',
    name: 'Finance',
    description: 'Financial planning and analysis',
    manager: 'Robert Kim',
    employeeCount: 6,
    budget: '800,000',
    location: 'Chicago Office'
  },
  {
    id: 'HR',
    name: 'Human Resources',
    description: 'Employee relations and talent management',
    manager: 'Jennifer Lopez',
    employeeCount: 4,
    budget: '600,000',
    location: 'Corporate HQ'
  },
  {
    id: 'EXEC',
    name: 'Executive',
    description: 'Executive leadership and strategic direction',
    manager: 'Lisa Anderson',
    employeeCount: 3,
    budget: '1,000,000',
    location: 'Corporate HQ'
  }
];

export const DEMO_LOCATIONS: Location[] = [
  {
    id: 'NYC',
    name: 'New York Office',
    address: '123 Business Ave',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    type: 'Office',
    employeeCount: 20,
    established: '2020-01-01'
  },
  {
    id: 'HQ',
    name: 'Corporate HQ',
    address: '456 Corporate Blvd',
    city: 'New York',
    state: 'NY',
    zipCode: '10002',
    type: 'Office',
    employeeCount: 15,
    established: '2020-01-01'
  },
  {
    id: 'CHI',
    name: 'Chicago Office',
    address: '789 Financial Dr',
    city: 'Chicago',
    state: 'IL',
    zipCode: '60601',
    type: 'Office',
    employeeCount: 8,
    established: '2021-06-01'
  },
  {
    id: 'REMOTE',
    name: 'Remote Work',
    address: 'Various Locations',
    city: 'Remote',
    state: 'Various',
    zipCode: '00000',
    type: 'Remote',
    employeeCount: 5,
    established: '2020-03-01'
  }
];

export const DEMO_PARSED_DOCUMENTS = [
  {
    id: 'emp-contract-001',
    title: 'Employment Contract - John Smith',
    originalTemplate: 'employmentContract',
    generatedOn: '2024-01-15',
    employee: DEMO_EMPLOYEES[0],
    tagValues: {
      '<start_date>': '2023-01-15',
      '<company_name>': 'T100 Solutions Inc.',
      '<company_state>': 'New York',
      '<employee_name>': 'John Smith',
      '<position_title>': 'Senior Software Engineer',
      '<supervisor_name>': 'Sarah Johnson',
      '<salary_amount>': '95,000',
      '<benefits_description>': 'Full health insurance, 401k matching, 20 PTO days',
      '<work_location>': 'New York Office, 123 Business Ave',
      '<remote_days>': '2',
      '<signature_date>': '2023-01-15',
      '<company_representative>': 'Lisa Anderson, CEO'
    },
    status: 'signed',
    documentType: 'employment_contract'
  },
  {
    id: 'nda-vendor-001',
    title: 'NDA - TechCorp Partnership',
    originalTemplate: 'nda',
    generatedOn: '2024-01-20',
    tagValues: {
      '{{date}}': '2024-01-20',
      '{{disclosing_party}}': 'T100 Solutions Inc.',
      '{{disclosing_address}}': '123 Business Ave, New York, NY 10001',
      '{{receiving_party}}': 'TechCorp Ltd.',
      '{{receiving_address}}': '456 Tech Street, San Francisco, CA 94105',
      '{{confidential_items}}': 'software architecture, customer data, business strategies',
      '{{purpose}}': 'evaluating potential partnership opportunities',
      '{{term_years}}': '3',
      '{{return_days}}': '30',
      '{{disclosing_signature}}': 'Lisa Anderson',
      '{{receiving_signature}}': 'James Wilson',
      '{{signature_date}}': '2024-01-20'
    },
    status: 'executed',
    documentType: 'nda'
  },
  {
    id: 'po-supplies-001',
    title: 'Purchase Order - Office Supplies',
    originalTemplate: 'purchaseOrder',
    generatedOn: '2024-01-25',
    tagValues: {
      '${po_number}': 'PO-2024-001',
      '${order_date}': '2024-01-25',
      '${delivery_date}': '2024-02-01',
      '${vendor_name}': 'Office Depot',
      '${vendor_address}': '789 Supply Lane, Boston, MA 02101',
      '${vendor_contact}': 'Jane Doe',
      '${vendor_email}': 'jane.doe@officedepot.com',
      '${company_name}': 'T100 Solutions Inc.',
      '${shipping_address}': '123 Business Ave, New York, NY 10001',
      '${attention_to}': 'Facilities Manager',
      '[item_description]': 'Ergonomic office chairs (qty: 10)',
      '[item_quantity]': '10',
      '[unit_price]': '299.99',
      '[line_total]': '2,999.90',
      '[subtotal]': '2,999.90',
      '[tax_rate]': '8.25',
      '[tax_amount]': '247.49',
      '[shipping_cost]': '150.00',
      '[total_amount]': '3,397.39',
      '[payment_terms]': 'Net 30',
      '[special_instructions]': 'Deliver to loading dock, call 30 min before arrival',
      '[authorized_signature]': 'Mike Wilson',
      '[authorization_date]': '2024-01-25'
    },
    status: 'approved',
    documentType: 'purchase_order'
  },
  {
    id: 'cert-training-001',
    title: 'Safety Training Certificate - John Smith',
    originalTemplate: 'certificateOfCompletion',
    generatedOn: '2024-02-01',
    employee: DEMO_EMPLOYEES[0],
    tagValues: {
      '<participant_name>': 'John Smith',
      '<course_title>': 'Workplace Safety and Emergency Procedures',
      '<organisation_name>': 'T100 Solutions Inc.',
      '<course_duration>': '8 hours',
      '<completion_date>': '2024-02-01',
      '<final_score>': '96',
      '<instructor_name>': 'Robert Safety',
      '<director_name>': 'Mike Wilson',
      '<certificate_id>': 'CERT-2024-001',
      '<issue_date>': '2024-02-01',
      '<expiry_date>': '2025-02-01'
    },
    status: 'issued',
    documentType: 'certificate'
  }
];

// Helper functions for demo data
export const DemoDataHelpers = {
  getEmployeeById(id: string) {
    return DEMO_EMPLOYEES.find(emp => emp.id === id);
  },
  
  getEmployeeByName(name: string) {
    return DEMO_EMPLOYEES.find(emp => emp.name.toLowerCase() === name.toLowerCase());
  },
  
  getDocumentById(id: string) {
    return DEMO_PARSED_DOCUMENTS.find(doc => doc.id === id);
  },
  
  getDocumentsByType(type: string) {
    return DEMO_PARSED_DOCUMENTS.filter(doc => doc.documentType === type);
  },
  
  getDocumentsByEmployee(employeeId: string) {
    return DEMO_PARSED_DOCUMENTS.filter(doc => doc.employee?.id === employeeId);
  },
  
  // Auto-fill helper for employee data
  autoFillFromEmployee(employee: Employee, tags: string[]) {
    const mapping: Record<string, string> = {};
    
    tags.forEach(tag => {
      const lowerTag = tag.toLowerCase();
      
      if (lowerTag.includes('name') || lowerTag.includes('employee_name')) {
        mapping[tag] = employee.name;
      } else if (lowerTag.includes('email')) {
        mapping[tag] = employee.email;
      } else if (lowerTag.includes('department')) {
        mapping[tag] = employee.department;
      } else if (lowerTag.includes('position') || lowerTag.includes('title')) {
        mapping[tag] = employee.position;
      } else if (lowerTag.includes('employee_id') || lowerTag.includes('employeeid')) {
        mapping[tag] = employee.employeeId;
      } else if (lowerTag.includes('start_date') || lowerTag.includes('startdate')) {
        mapping[tag] = employee.startDate;
      } else if (lowerTag.includes('hire_date') || lowerTag.includes('hiredate')) {
        mapping[tag] = employee.hireDate;
      } else if (lowerTag.includes('salary')) {
        mapping[tag] = employee.salary;
      } else if (lowerTag.includes('supervisor')) {
        mapping[tag] = employee.supervisor;
      } else if (lowerTag.includes('location') || lowerTag.includes('work_location')) {
        mapping[tag] = employee.location;
      } else if (lowerTag.includes('phone')) {
        mapping[tag] = employee.phone;
      } else if (lowerTag.includes('emergency_contact')) {
        mapping[tag] = `${employee.emergencyContact.name} (${employee.emergencyContact.relationship}) - ${employee.emergencyContact.phone}`;
      } else if (lowerTag.includes('home_address')) {
        mapping[tag] = employee.homeAddress;
      } else if (lowerTag.includes('employment_type')) {
        mapping[tag] = employee.employmentType;
      } else if (lowerTag.includes('status')) {
        mapping[tag] = employee.status;
      } else if (lowerTag.includes('skills')) {
        mapping[tag] = employee.skills.join(', ');
      } else if (lowerTag.includes('certifications')) {
        mapping[tag] = employee.certifications.join(', ');
      } else if (lowerTag.includes('remote_days')) {
        mapping[tag] = employee.remoteWorkDays.toString();
      }
    });
    
    return mapping;
  },

  // Helper functions for organisational data
  getDepartmentById(id: string) {
    return DEMO_DEPARTMENTS.find(dept => dept.id === id);
  },
  
  getLocationById(id: string) {
    return DEMO_LOCATIONS.find(loc => loc.id === id);
  },
  
  getEmployeesByDepartment(department: string) {
    return DEMO_EMPLOYEES.filter(emp => emp.department === department);
  },
  
  getEmployeesByLocation(location: string) {
    return DEMO_EMPLOYEES.filter(emp => emp.location === location);
  },
  
  getEmployeesByStatus(status: Employee['status']) {
    return DEMO_EMPLOYEES.filter(emp => emp.status === status);
  },
  
  getDirectReports(employeeId: string) {
    return DEMO_EMPLOYEES.filter(emp => emp.directReports.includes(employeeId));
  },
  
  searchEmployees(query: string) {
    const lowerQuery = query.toLowerCase();
    return DEMO_EMPLOYEES.filter(emp => 
      emp.name.toLowerCase().includes(lowerQuery) ||
      emp.email.toLowerCase().includes(lowerQuery) ||
      emp.department.toLowerCase().includes(lowerQuery) ||
      emp.position.toLowerCase().includes(lowerQuery) ||
      emp.employeeId.toLowerCase().includes(lowerQuery) ||
      emp.skills.some(skill => skill.toLowerCase().includes(lowerQuery))
    );
  },
  
  // Auto-fill helper for company data
  autoFillFromCompany(tags: string[]) {
    const mapping: Record<string, string> = {};
    
    tags.forEach(tag => {
      const lowerTag = tag.toLowerCase();
      
      if (lowerTag.includes('company_name')) {
        mapping[tag] = DEMO_COMPANY_INFO.name;
      } else if (lowerTag.includes('company_address')) {
        mapping[tag] = DEMO_COMPANY_INFO.address;
      } else if (lowerTag.includes('company_state')) {
        mapping[tag] = DEMO_COMPANY_INFO.state;
      } else if (lowerTag.includes('company_phone')) {
        mapping[tag] = DEMO_COMPANY_INFO.phone;
      } else if (lowerTag.includes('company_email')) {
        mapping[tag] = DEMO_COMPANY_INFO.email;
      }
    });
    
    return mapping;
  }
};

// Save parsed document to local storage (for demo)
export function saveParsedDocumentDemo(document: {
  title: string;
  content: string;
  tags: Record<string, string>;
  employeeId?: string;
  outputFormat: 'pdf' | 'word';
}) {
  const savedDoc = {
    id: `demo-${Date.now()}`,
    title: document.title,
    content: document.content,
    tags: document.tags,
    employeeId: document.employeeId,
    outputFormat: document.outputFormat,
    savedAt: new Date().toISOString(),
    status: 'saved'
  };
  
  // In a real app, this would save to a database
  // For demo, we'll just log it
  console.log('Document saved:', savedDoc);
  
  return savedDoc;
}