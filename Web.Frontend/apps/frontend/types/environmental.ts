// Environmental Management Type Definitions
// Centralized type definitions for the environmental management module

export interface EnvironmentalIncident {
  id: number;
  type: 'Spill' | 'Emission' | 'Waste' | 'Water Quality' | 'Noise' | 'Good Practice';
  title: string;
  description: string;
  user: string;
  time: string;
  severity: 'High' | 'Medium' | 'Low';
  status: 'Under Investigation' | 'Resolved' | 'Acknowledged' | 'Completed' | 'Pending Review';
  location?: string;
  impactLevel?: 'Minor' | 'Moderate' | 'Major' | 'Critical';
  regulatoryReporting?: boolean;
  estimatedCost?: number;
  tags?: string[];
}

export interface EnvironmentalCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  requiredFields: string[];
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface EnvironmentalStats {
  todaysReports: number;
  todaysChange: number;
  activeIncidents: number;
  complianceScore: number;
  participationRate: number;
  monthlyTrend: number;
}

export interface EnvironmentalObjective {
  id: number;
  title: string;
  description: string;
  target: string;
  currentValue: number;
  targetValue: number;
  unit: string;
  deadline: string;
  status: 'On Track' | 'At Risk' | 'Behind' | 'Completed';
  responsible: string;
  category: string;
}

export interface AspectImpactItem {
  id: string;
  process: string;
  area: string;
  condition: 'Normal' | 'Abnormal' | 'Emergency';
  issueCategory: string;
  aspect: string;
  impact: string;
  significanceScores: {
    legal: number;
    severity: number;
    amount: number;
    interest: number;
    capability: number;
    likelihood: number;
    control: number;
    total: number;
  };
  controls: string[];
  responsible: string;
  reviewDate: string;
  lastUpdated: string;
  isCustom: boolean;
}

export interface EnvironmentalIssueCategory {
  id: string;
  name: string;
  description: string;
  condition: 'Normal' | 'Abnormal' | 'Emergency';
  isCore: boolean;
  examples: string[];
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Filter and query types
export interface IncidentFilters {
  category?: string;
  severity?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface AspectImpactFilters {
  process?: string;
  area?: string;
  condition?: string;
  significanceThreshold?: number;
}

// Form data types
export interface IncidentFormData {
  type: EnvironmentalIncident['type'];
  title: string;
  description: string;
  location?: string;
  severity: EnvironmentalIncident['severity'];
  impactLevel?: EnvironmentalIncident['impactLevel'];
  regulatoryReporting?: boolean;
  estimatedCost?: number;
  tags?: string[];
}

export interface AspectImpactFormData {
  process: string;
  area: string;
  condition: AspectImpactItem['condition'];
  issueCategory: string;
  aspect: string;
  impact: string;
  significanceScores: Omit<AspectImpactItem['significanceScores'], 'total'>;
  controls: string[];
  responsible: string;
  reviewDate: string;
}

export interface CategoryFormData {
  name: string;
  description: string;
  condition: EnvironmentalIssueCategory['condition'];
  examples: string[];
}