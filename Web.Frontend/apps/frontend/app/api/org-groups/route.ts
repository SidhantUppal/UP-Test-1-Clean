import { NextRequest, NextResponse } from 'next/server';

// Mock data for organization groups
const mockOrgGroups = [
  {
    OrgGroupID: 1,
    Name: 'Operations',
    Code: 'OPS',
    Description: 'Operations Department',
    Department: 'Operations',
    Active: true
  },
  {
    OrgGroupID: 2,
    Name: 'Administration',
    Code: 'ADMIN',
    Description: 'Administrative Services',
    Department: 'Administration',
    Active: true
  },
  {
    OrgGroupID: 3,
    Name: 'Human Resources',
    Code: 'HR',
    Description: 'Human Resources Department',
    Department: 'HR',
    Active: true
  },
  {
    OrgGroupID: 4,
    Name: 'Safety & Compliance',
    Code: 'SAFETY',
    Description: 'Health, Safety & Compliance',
    Department: 'Safety',
    Active: true
  },
  {
    OrgGroupID: 5,
    Name: 'Maintenance',
    Code: 'MAINT',
    Description: 'Maintenance & Engineering',
    Department: 'Maintenance',
    Active: true
  },
  {
    OrgGroupID: 6,
    Name: 'IT Support',
    Code: 'IT',
    Description: 'Information Technology',
    Department: 'IT',
    Active: true
  },
  {
    OrgGroupID: 7,
    Name: 'Finance',
    Code: 'FIN',
    Description: 'Finance & Accounting',
    Department: 'Finance',
    Active: true
  },
  {
    OrgGroupID: 8,
    Name: 'Production',
    Code: 'PROD',
    Description: 'Production & Manufacturing',
    Department: 'Production',
    Active: true
  },
  {
    OrgGroupID: 9,
    Name: 'Quality Control',
    Code: 'QC',
    Description: 'Quality Assurance & Control',
    Department: 'Quality',
    Active: true
  },
  {
    OrgGroupID: 10,
    Name: 'Warehouse',
    Code: 'WH',
    Description: 'Warehouse & Logistics',
    Department: 'Warehouse',
    Active: true
  },
  {
    OrgGroupID: 11,
    Name: 'Customer Service',
    Code: 'CS',
    Description: 'Customer Support Services',
    Department: 'Customer Service',
    Active: true
  },
  {
    OrgGroupID: 12,
    Name: 'Security',
    Code: 'SEC',
    Description: 'Security Services',
    Department: 'Security',
    Active: true
  },
  {
    OrgGroupID: 13,
    Name: 'Marketing',
    Code: 'MKT',
    Description: 'Marketing & Communications',
    Department: 'Marketing',
    Active: true
  },
  {
    OrgGroupID: 14,
    Name: 'Research & Development',
    Code: 'R&D',
    Description: 'Research and Development',
    Department: 'R&D',
    Active: true
  },
  {
    OrgGroupID: 15,
    Name: 'Legal',
    Code: 'LEGAL',
    Description: 'Legal & Compliance',
    Department: 'Legal',
    Active: true
  }
];

export async function GET(request: NextRequest) {
  try {
    // In a real application, this would fetch from the database
    // For now, return mock data
    return NextResponse.json({
      success: true,
      data: mockOrgGroups
    });
  } catch (error) {
    console.error('Error fetching organization groups:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch organization groups',
        data: mockOrgGroups // Return mock data as fallback
      },
      { status: 500 }
    );
  }
}