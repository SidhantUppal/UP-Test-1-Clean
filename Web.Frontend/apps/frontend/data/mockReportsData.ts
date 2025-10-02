export interface ReportIncident {
  id: number;
  caseNumber: string;
  type: string;
  typeCode: string;
  category: string;
  date: string;
  reportedDate: string;
  status: 'Open' | 'In Progress' | 'Under Investigation' | 'Closed' | 'Resolved';
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  department: string;
  location: string;
  reportedBy: string;
  assignedTo?: string;
  description: string;
  resolutionTime?: number; // days
  isRIDDOR: boolean;
  riddorSubmitted?: boolean;
  riddorDueDate?: string;
}

export interface MonthlyStats {
  month: string;
  totalIncidents: number;
  openIncidents: number;
  closedIncidents: number;
  nearMisses: number;
  accidents: number;
  riddorReports: number;
}

export interface DepartmentStats {
  department: string;
  totalIncidents: number;
  openIncidents: number;
  averageResolutionTime: number;
  riskScore: number;
}

export interface SeverityStats {
  severity: string;
  count: number;
  percentage: number;
  trend: number; // percentage change from previous period
}

// Mock incident data
export const mockIncidents: ReportIncident[] = [
  {
    id: 1,
    caseNumber: "INC-2024-001",
    type: "Accident Report",
    typeCode: "ACCIDENT_REPORT",
    category: "Safety",
    date: "2024-01-15",
    reportedDate: "2024-01-15",
    status: "Open",
    severity: "High",
    priority: "High",
    department: "Manufacturing",
    location: "Factory Floor - Line 1",
    reportedBy: "John Smith",
    assignedTo: "Sarah Johnson",
    description: "Employee slipped on wet floor near conveyor belt",
    isRIDDOR: true,
    riddorSubmitted: false,
    riddorDueDate: "2024-01-25"
  },
  {
    id: 2,
    caseNumber: "INC-2024-002",
    type: "Near Miss",
    typeCode: "NEAR_MISS",
    category: "Safety",
    date: "2024-01-14",
    reportedDate: "2024-01-14",
    status: "In Progress",
    severity: "Low",
    priority: "Medium",
    department: "Warehouse",
    location: "Storage Area B",
    reportedBy: "Mike Davis",
    assignedTo: "Tom Wilson",
    description: "Forklift almost collided with pedestrian",
    resolutionTime: 2,
    isRIDDOR: false
  },
  {
    id: 3,
    caseNumber: "INC-2024-003",
    type: "Dangerous Occurrence",
    typeCode: "DANGEROUS_OCCURRENCE",
    category: "Safety",
    date: "2024-01-13",
    reportedDate: "2024-01-13",
    status: "Under Investigation",
    severity: "Critical",
    priority: "Urgent",
    department: "Chemical Processing",
    location: "Lab 3",
    reportedBy: "Dr. Emily Chen",
    assignedTo: "Safety Team",
    description: "Chemical leak in processing unit",
    isRIDDOR: true,
    riddorSubmitted: true,
    riddorDueDate: "2024-01-20"
  },
  {
    id: 4,
    caseNumber: "INC-2024-004",
    type: "Road Traffic Incident",
    typeCode: "ROAD_TRAFFIC",
    category: "Safety",
    date: "2024-01-12",
    reportedDate: "2024-01-12",
    status: "Closed",
    severity: "Medium",
    priority: "Medium",
    department: "Logistics",
    location: "Company Car Park",
    reportedBy: "Alex Brown",
    description: "Minor collision in parking area",
    resolutionTime: 3,
    isRIDDOR: false
  },
  {
    id: 5,
    caseNumber: "INC-2024-005",
    type: "Farming Incident",
    typeCode: "FARMING",
    category: "Safety",
    date: "2024-01-11",
    reportedDate: "2024-01-12",
    status: "Open",
    severity: "High",
    priority: "High",
    department: "Agriculture",
    location: "North Field",
    reportedBy: "David Green",
    assignedTo: "Farm Manager",
    description: "Tractor rollover incident",
    isRIDDOR: true,
    riddorSubmitted: false,
    riddorDueDate: "2024-01-21"
  },
  {
    id: 6,
    caseNumber: "INC-2024-006",
    type: "HR Complaint",
    typeCode: "HR_COMPLAINT",
    category: "HR",
    date: "2024-01-10",
    reportedDate: "2024-01-10",
    status: "In Progress",
    severity: "Medium",
    priority: "Medium",
    department: "Administration",
    location: "Office Block A",
    reportedBy: "Anonymous",
    assignedTo: "HR Team",
    description: "Workplace harassment complaint",
    isRIDDOR: false
  },
  {
    id: 7,
    caseNumber: "INC-2024-007",
    type: "Data Breach",
    typeCode: "DATA_BREACH",
    category: "Cyber",
    date: "2024-01-09",
    reportedDate: "2024-01-09",
    status: "Closed",
    severity: "High",
    priority: "Urgent",
    department: "IT",
    location: "Server Room",
    reportedBy: "IT Admin",
    description: "Unauthorized access to customer database",
    resolutionTime: 1,
    isRIDDOR: false
  },
  {
    id: 8,
    caseNumber: "INC-2024-008",
    type: "Accident Book",
    typeCode: "ACCIDENT_BOOK",
    category: "Safety",
    date: "2024-01-08",
    reportedDate: "2024-01-08",
    status: "Closed",
    severity: "Low",
    priority: "Low",
    department: "Manufacturing",
    location: "Assembly Line 2",
    reportedBy: "Lisa Wang",
    description: "Minor cut from handling materials",
    resolutionTime: 1,
    isRIDDOR: false
  },
  {
    id: 9,
    caseNumber: "INC-2024-009",
    type: "Ethics Concern",
    typeCode: "ETHICS_CONCERN",
    category: "Whistleblowing",
    date: "2024-01-07",
    reportedDate: "2024-01-08",
    status: "Under Investigation",
    severity: "Medium",
    priority: "High",
    department: "Finance",
    location: "Confidential",
    reportedBy: "Confidential",
    assignedTo: "Ethics Committee",
    description: "Suspected financial irregularities",
    isRIDDOR: false
  },
  {
    id: 10,
    caseNumber: "INC-2024-010",
    type: "Near Miss",
    typeCode: "NEAR_MISS",
    category: "Safety",
    date: "2024-01-06",
    reportedDate: "2024-01-06",
    status: "Closed",
    severity: "Low",
    priority: "Low",
    department: "Warehouse",
    location: "Loading Bay 1",
    reportedBy: "Robert Taylor",
    description: "Unsecured load nearly fell from truck",
    resolutionTime: 2,
    isRIDDOR: false
  }
];

// Monthly statistics for trend analysis (2024-2025 focus through September 2025)
export const monthlyStats: MonthlyStats[] = [
  { month: "2024-04", totalIncidents: 14, openIncidents: 3, closedIncidents: 11, nearMisses: 9, accidents: 4, riddorReports: 2 },
  { month: "2024-05", totalIncidents: 18, openIncidents: 4, closedIncidents: 14, nearMisses: 12, accidents: 5, riddorReports: 1 },
  { month: "2024-06", totalIncidents: 12, openIncidents: 2, closedIncidents: 10, nearMisses: 8, accidents: 3, riddorReports: 2 },
  { month: "2024-07", totalIncidents: 16, openIncidents: 5, closedIncidents: 11, nearMisses: 10, accidents: 5, riddorReports: 3 },
  { month: "2024-08", totalIncidents: 20, openIncidents: 6, closedIncidents: 14, nearMisses: 13, accidents: 6, riddorReports: 2 },
  { month: "2024-09", totalIncidents: 15, openIncidents: 3, closedIncidents: 12, nearMisses: 9, accidents: 5, riddorReports: 1 },
  { month: "2024-10", totalIncidents: 13, openIncidents: 4, closedIncidents: 9, nearMisses: 8, accidents: 4, riddorReports: 2 },
  { month: "2024-11", totalIncidents: 17, openIncidents: 5, closedIncidents: 12, nearMisses: 11, accidents: 5, riddorReports: 1 },
  { month: "2024-12", totalIncidents: 11, openIncidents: 2, closedIncidents: 9, nearMisses: 7, accidents: 3, riddorReports: 1 },
  { month: "2025-01", totalIncidents: 9, openIncidents: 3, closedIncidents: 6, nearMisses: 6, accidents: 2, riddorReports: 1 },
  { month: "2025-02", totalIncidents: 12, openIncidents: 4, closedIncidents: 8, nearMisses: 8, accidents: 3, riddorReports: 2 },
  { month: "2025-03", totalIncidents: 14, openIncidents: 5, closedIncidents: 9, nearMisses: 9, accidents: 4, riddorReports: 2 },
  { month: "2025-04", totalIncidents: 10, openIncidents: 3, closedIncidents: 7, nearMisses: 7, accidents: 2, riddorReports: 1 },
  { month: "2025-05", totalIncidents: 13, openIncidents: 4, closedIncidents: 9, nearMisses: 9, accidents: 3, riddorReports: 1 },
  { month: "2025-06", totalIncidents: 8, openIncidents: 2, closedIncidents: 6, nearMisses: 6, accidents: 1, riddorReports: 1 },
  { month: "2025-07", totalIncidents: 11, openIncidents: 3, closedIncidents: 8, nearMisses: 8, accidents: 2, riddorReports: 2 },
  { month: "2025-08", totalIncidents: 15, openIncidents: 5, closedIncidents: 10, nearMisses: 11, accidents: 3, riddorReports: 1 },
  { month: "2025-09", totalIncidents: 12, openIncidents: 4, closedIncidents: 8, nearMisses: 9, accidents: 2, riddorReports: 2 }
];

// Department statistics
export const departmentStats: DepartmentStats[] = [
  { department: "Manufacturing", totalIncidents: 25, openIncidents: 8, averageResolutionTime: 4.2, riskScore: 8.5 },
  { department: "Warehouse", totalIncidents: 18, openIncidents: 4, averageResolutionTime: 2.8, riskScore: 6.2 },
  { department: "Chemical Processing", totalIncidents: 12, openIncidents: 3, averageResolutionTime: 6.1, riskScore: 9.1 },
  { department: "Agriculture", totalIncidents: 15, openIncidents: 5, averageResolutionTime: 5.3, riskScore: 7.8 },
  { department: "Logistics", totalIncidents: 8, openIncidents: 1, averageResolutionTime: 3.2, riskScore: 5.1 },
  { department: "Administration", totalIncidents: 6, openIncidents: 2, averageResolutionTime: 7.5, riskScore: 4.3 },
  { department: "IT", totalIncidents: 4, openIncidents: 0, averageResolutionTime: 1.8, riskScore: 6.5 },
  { department: "Finance", totalIncidents: 3, openIncidents: 1, averageResolutionTime: 12.5, riskScore: 5.7 }
];

// Severity distribution statistics
export const severityStats: SeverityStats[] = [
  { severity: "Critical", count: 3, percentage: 4.3, trend: 12.5 },
  { severity: "High", count: 18, percentage: 25.7, trend: -8.2 },
  { severity: "Medium", count: 28, percentage: 40.0, trend: 3.1 },
  { severity: "Low", count: 21, percentage: 30.0, trend: -5.4 }
];

// Key Performance Indicators
export const kpiData = {
  totalIncidents: 70,
  openIncidents: 24,
  closedIncidents: 46,
  inProgressIncidents: 18,
  overdueIncidents: 3,
  riddorPending: 2,
  riddorSubmitted: 8,
  nearMisses: 35,
  averageResolutionTime: 4.2,
  complianceRate: 94.3,
  monthlyChange: {
    totalIncidents: -8.5,
    averageResolutionTime: 12.3,
    complianceRate: 2.1
  }
};

// RIDDOR compliance data
export const riddorData = {
  totalRiddorIncidents: 10,
  submitted: 8,
  pending: 2,
  overdue: 0,
  upcomingDeadlines: [
    { caseNumber: "INC-2024-001", dueDate: "2024-01-25", daysLeft: 10, type: "Accident Report" },
    { caseNumber: "INC-2024-005", dueDate: "2024-01-21", daysLeft: 6, type: "Farming Incident" }
  ],
  submissionRate: 80.0,
  averageSubmissionTime: 3.2
};

// Root cause analysis data
export const rootCauseData = [
  { cause: "Human Error", count: 28, percentage: 40.0 },
  { cause: "Equipment Failure", count: 15, percentage: 21.4 },
  { cause: "Process Issues", count: 12, percentage: 17.1 },
  { cause: "Environmental Factors", count: 8, percentage: 11.4 },
  { cause: "Communication", count: 4, percentage: 5.7 },
  { cause: "Other", count: 3, percentage: 4.3 }
];

// Time to report analysis
export const timeToReportData = [
  { range: "Same Day", count: 45, percentage: 64.3 },
  { range: "1-2 Days", count: 18, percentage: 25.7 },
  { range: "3-7 Days", count: 5, percentage: 7.1 },
  { range: "Over 1 Week", count: 2, percentage: 2.9 }
];

// Near Miss vs Accident Ratio Trend (higher ratio is better - more proactive reporting) 2024-2025 through September
export const nearMissRatioData = [
  { month: "2024-04", nearMisses: 9, accidents: 4, ratio: 2.25 },
  { month: "2024-05", nearMisses: 12, accidents: 5, ratio: 2.40 },
  { month: "2024-06", nearMisses: 8, accidents: 3, ratio: 2.67 },
  { month: "2024-07", nearMisses: 10, accidents: 5, ratio: 2.00 },
  { month: "2024-08", nearMisses: 13, accidents: 6, ratio: 2.17 },
  { month: "2024-09", nearMisses: 9, accidents: 5, ratio: 1.80 },
  { month: "2024-10", nearMisses: 8, accidents: 4, ratio: 2.00 },
  { month: "2024-11", nearMisses: 11, accidents: 5, ratio: 2.20 },
  { month: "2024-12", nearMisses: 7, accidents: 3, ratio: 2.33 },
  { month: "2025-01", nearMisses: 6, accidents: 2, ratio: 3.00 },
  { month: "2025-02", nearMisses: 8, accidents: 3, ratio: 2.67 },
  { month: "2025-03", nearMisses: 9, accidents: 4, ratio: 2.25 },
  { month: "2025-04", nearMisses: 7, accidents: 2, ratio: 3.50 },
  { month: "2025-05", nearMisses: 9, accidents: 3, ratio: 3.00 },
  { month: "2025-06", nearMisses: 6, accidents: 1, ratio: 6.00 },
  { month: "2025-07", nearMisses: 8, accidents: 2, ratio: 4.00 },
  { month: "2025-08", nearMisses: 11, accidents: 3, ratio: 3.67 },
  { month: "2025-09", nearMisses: 9, accidents: 2, ratio: 4.50 }
];

// Year-over-Year Comparison Data (2025 Jan-Sep vs 2024 Jan-Sep)
export const yearOverYearData = {
  currentYear: {
    year: 2025,
    totalIncidents: 104,
    nearMisses: 72,
    accidents: 21,
    riddorReports: 12,
    averageResolutionTime: 3.1,
    complianceRate: 97.2,
    openIncidents: 30
  },
  previousYear: {
    year: 2024,
    totalIncidents: 143,
    nearMisses: 97,
    accidents: 41,
    riddorReports: 19,
    averageResolutionTime: 4.1,
    complianceRate: 92.8,
    openIncidents: 35
  },
  percentageChanges: {
    totalIncidents: -27.3,
    nearMisses: -25.8,
    accidents: -48.8,
    riddorReports: -36.8,
    averageResolutionTime: -24.4,
    complianceRate: 4.7,
    openIncidents: -14.3
  }
};

// Heinrich Triangle (Safety Pyramid) Data
export const heinrichTriangleData = {
  majorInjury: 1,
  minorInjury: 7,
  propertyDamage: 29,
  nearMiss: 300,
  unsafeActs: 3000
};

// Incidents not closed in 14 days by org group
export const unclosedIncidentsData = [
  { orgGroup: 'Manufacturing', incidents: 8, percentage: 32 },
  { orgGroup: 'Warehouse', incidents: 5, percentage: 20 },
  { orgGroup: 'Chemical Processing', incidents: 4, percentage: 16 },
  { orgGroup: 'Agriculture', incidents: 3, percentage: 12 },
  { orgGroup: 'Logistics', incidents: 2, percentage: 8 },
  { orgGroup: 'Administration', incidents: 2, percentage: 8 },
  { orgGroup: 'IT', incidents: 1, percentage: 4 }
];

// Incidents per location
export const incidentsPerLocationData = [
  { location: 'Factory Floor', incidents: 15 },
  { location: 'Warehouse', incidents: 12 },
  { location: 'Office', incidents: 8 },
  { location: 'Laboratory', incidents: 6 },
  { location: 'Parking Area', incidents: 4 },
  { location: 'Loading Bay', incidents: 3 },
  { location: 'Server Room', incidents: 2 }
];

// Monthly accidents by location (2024-2025 through September 2025)
export const monthlyAccidentsByLocationData = [
  { month: '2024-04', factory: 2, warehouse: 1, office: 0, laboratory: 1, other: 0 },
  { month: '2024-05', factory: 3, warehouse: 1, office: 0, laboratory: 1, other: 0 },
  { month: '2024-06', factory: 2, warehouse: 0, office: 0, laboratory: 1, other: 0 },
  { month: '2024-07', factory: 3, warehouse: 1, office: 0, laboratory: 1, other: 0 },
  { month: '2024-08', factory: 3, warehouse: 2, office: 0, laboratory: 1, other: 0 },
  { month: '2024-09', factory: 3, warehouse: 1, office: 0, laboratory: 1, other: 0 },
  { month: '2024-10', factory: 2, warehouse: 1, office: 0, laboratory: 1, other: 0 },
  { month: '2024-11', factory: 3, warehouse: 1, office: 0, laboratory: 1, other: 0 },
  { month: '2024-12', factory: 2, warehouse: 1, office: 0, laboratory: 0, other: 0 },
  { month: '2025-01', factory: 1, warehouse: 1, office: 0, laboratory: 0, other: 0 },
  { month: '2025-02', factory: 2, warehouse: 1, office: 0, laboratory: 0, other: 0 },
  { month: '2025-03', factory: 2, warehouse: 1, office: 0, laboratory: 1, other: 0 },
  { month: '2025-04', factory: 1, warehouse: 1, office: 0, laboratory: 0, other: 0 },
  { month: '2025-05', factory: 2, warehouse: 1, office: 0, laboratory: 0, other: 0 },
  { month: '2025-06', factory: 1, warehouse: 0, office: 0, laboratory: 0, other: 0 },
  { month: '2025-07', factory: 1, warehouse: 1, office: 0, laboratory: 0, other: 0 },
  { month: '2025-08', factory: 2, warehouse: 1, office: 0, laboratory: 0, other: 0 },
  { month: '2025-09', factory: 1, warehouse: 1, office: 0, laboratory: 0, other: 0 }
];

// Monthly near misses by location (2024-2025 through September 2025)
export const monthlyNearMissesByLocationData = [
  { month: '2024-04', factory: 5, warehouse: 3, office: 1, laboratory: 0, other: 0 },
  { month: '2024-05', factory: 6, warehouse: 4, office: 1, laboratory: 1, other: 0 },
  { month: '2024-06', factory: 4, warehouse: 3, office: 1, laboratory: 0, other: 0 },
  { month: '2024-07', factory: 5, warehouse: 3, office: 1, laboratory: 1, other: 0 },
  { month: '2024-08', factory: 7, warehouse: 4, office: 1, laboratory: 1, other: 0 },
  { month: '2024-09', factory: 5, warehouse: 3, office: 1, laboratory: 0, other: 0 },
  { month: '2024-10', factory: 4, warehouse: 3, office: 1, laboratory: 0, other: 0 },
  { month: '2024-11', factory: 6, warehouse: 3, office: 1, laboratory: 1, other: 0 },
  { month: '2024-12', factory: 4, warehouse: 2, office: 1, laboratory: 0, other: 0 },
  { month: '2025-01', factory: 3, warehouse: 2, office: 1, laboratory: 0, other: 0 },
  { month: '2025-02', factory: 4, warehouse: 3, office: 1, laboratory: 0, other: 0 },
  { month: '2025-03', factory: 5, warehouse: 3, office: 1, laboratory: 0, other: 0 },
  { month: '2025-04', factory: 4, warehouse: 2, office: 1, laboratory: 0, other: 0 },
  { month: '2025-05', factory: 5, warehouse: 3, office: 1, laboratory: 0, other: 0 },
  { month: '2025-06', factory: 3, warehouse: 2, office: 1, laboratory: 0, other: 0 },
  { month: '2025-07', factory: 4, warehouse: 3, office: 1, laboratory: 0, other: 0 },
  { month: '2025-08', factory: 6, warehouse: 4, office: 1, laboratory: 0, other: 0 },
  { month: '2025-09', factory: 5, warehouse: 3, office: 1, laboratory: 0, other: 0 }
];