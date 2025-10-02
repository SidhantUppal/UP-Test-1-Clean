import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Return comprehensive mock tags for now
    // TODO: Connect to actual database when documents service is available
    const mockTags = [
      // Employee tags (9)
      { tagName: 'employee.firstName', displayName: 'Employee First Name', description: 'First name of the employee', category: 'Employee', dataType: 'text', sampleValue: 'John', isSystemTag: true },
      { tagName: 'employee.lastName', displayName: 'Employee Last Name', description: 'Last name of the employee', category: 'Employee', dataType: 'text', sampleValue: 'Doe', isSystemTag: true },
      { tagName: 'employee.email', displayName: 'Employee Email', description: 'Email address of the employee', category: 'Employee', dataType: 'text', sampleValue: 'john.doe@company.com', isSystemTag: true },
      { tagName: 'employee.jobTitle', displayName: 'Job Title', description: 'Current job title', category: 'Employee', dataType: 'text', sampleValue: 'Safety Manager', isSystemTag: true },
      { tagName: 'employee.department', displayName: 'Department', description: 'Employee department', category: 'Employee', dataType: 'text', sampleValue: 'Operations', isSystemTag: true },
      { tagName: 'employee.startDate', displayName: 'Start Date', description: 'Employment start date', category: 'Employee', dataType: 'date', sampleValue: '2024-01-15', isSystemTag: true },
      { tagName: 'employee.employeeNumber', displayName: 'Employee Number', description: 'Unique employee ID', category: 'Employee', dataType: 'text', sampleValue: 'EMP-001234', isSystemTag: true },
      { tagName: 'employee.phone', displayName: 'Phone Number', description: 'Contact phone number', category: 'Employee', dataType: 'text', sampleValue: '+1 (555) 123-4567', isSystemTag: true },
      { tagName: 'employee.endDate', displayName: 'End Date', description: 'Employment end date if applicable', category: 'Employee', dataType: 'date', sampleValue: '', isSystemTag: true },
      
      // Location tags (7)
      { tagName: 'location.name', displayName: 'Location Name', description: 'Name of the location', category: 'Location', dataType: 'text', sampleValue: 'Main Office', isSystemTag: true },
      { tagName: 'location.code', displayName: 'Location Code', description: 'Location identifier code', category: 'Location', dataType: 'text', sampleValue: 'LOC-001', isSystemTag: true },
      { tagName: 'location.address', displayName: 'Street Address', description: 'Street address', category: 'Location', dataType: 'text', sampleValue: '123 Safety Street', isSystemTag: true },
      { tagName: 'location.city', displayName: 'City', description: 'City name', category: 'Location', dataType: 'text', sampleValue: 'Chicago', isSystemTag: true },
      { tagName: 'location.state', displayName: 'State/Province', description: 'State or province', category: 'Location', dataType: 'text', sampleValue: 'IL', isSystemTag: true },
      { tagName: 'location.postalCode', displayName: 'Postal Code', description: 'ZIP or postal code', category: 'Location', dataType: 'text', sampleValue: '60601', isSystemTag: true },
      { tagName: 'location.country', displayName: 'Country', description: 'Country name', category: 'Location', dataType: 'text', sampleValue: 'United States', isSystemTag: true },
      
      // Organization tags (3)
      { tagName: 'orgGroup.name', displayName: 'Organization Name', description: 'Name of the organizational unit', category: 'Organization', dataType: 'text', sampleValue: 'Operations Division', isSystemTag: true },
      { tagName: 'orgGroup.code', displayName: 'Organization Code', description: 'Org unit identifier', category: 'Organization', dataType: 'text', sampleValue: 'ORG-OPS', isSystemTag: true },
      { tagName: 'orgGroup.description', displayName: 'Organization Description', description: 'Description of the org unit', category: 'Organization', dataType: 'text', sampleValue: 'Operational Excellence Division', isSystemTag: true },
      
      // Company tags (5)
      { tagName: 'tenant.name', displayName: 'Company Name', description: 'Name of the company', category: 'Company', dataType: 'text', sampleValue: 'T100 Safety Corp', isSystemTag: true },
      { tagName: 'tenant.code', displayName: 'Company Code', description: 'Company identifier code', category: 'Company', dataType: 'text', sampleValue: 'T100', isSystemTag: true },
      { tagName: 'tenant.description', displayName: 'Company Description', description: 'Company description', category: 'Company', dataType: 'text', sampleValue: 'Leading Safety Solutions Provider', isSystemTag: true },
      { tagName: 'tenant.prefix', displayName: 'Company Prefix', description: 'Company prefix for identifiers', category: 'Company', dataType: 'text', sampleValue: 'T100', isSystemTag: true },
      { tagName: 'tenant.baseURL', displayName: 'Company Website', description: 'Company website URL', category: 'Company', dataType: 'text', sampleValue: 'https://www.t100safety.com', isSystemTag: true },
      
      // User tags (5)
      { tagName: 'user.firstName', displayName: 'Current User First Name', description: 'First name of the logged-in user', category: 'User', dataType: 'text', sampleValue: 'Jane', isSystemTag: true },
      { tagName: 'user.lastName', displayName: 'Current User Last Name', description: 'Last name of the logged-in user', category: 'User', dataType: 'text', sampleValue: 'Smith', isSystemTag: true },
      { tagName: 'user.fullName', displayName: 'Current User Full Name', description: 'Full name of the logged-in user', category: 'User', dataType: 'text', sampleValue: 'Jane Smith', isSystemTag: true },
      { tagName: 'user.email', displayName: 'Current User Email', description: 'Email of the logged-in user', category: 'User', dataType: 'text', sampleValue: 'jane.smith@company.com', isSystemTag: true },
      { tagName: 'user.lastLoginDate', displayName: 'Last Login Date', description: 'Date of last login', category: 'User', dataType: 'date', sampleValue: '2025-01-09', isSystemTag: true },
      
      // System tags (4)
      { tagName: 'current.date', displayName: 'Current Date', description: 'Today\'s date', category: 'System', dataType: 'date', sampleValue: new Date().toLocaleDateString(), isSystemTag: true },
      { tagName: 'current.year', displayName: 'Current Year', description: 'Current year', category: 'System', dataType: 'text', sampleValue: new Date().getFullYear().toString(), isSystemTag: true },
      { tagName: 'current.timestamp', displayName: 'Current Timestamp', description: 'Current date and time', category: 'System', dataType: 'text', sampleValue: new Date().toLocaleString(), isSystemTag: true },
      { tagName: 'current.month', displayName: 'Current Month', description: 'Current month name', category: 'System', dataType: 'text', sampleValue: new Date().toLocaleDateString('en-US', { month: 'long' }), isSystemTag: true }
    ];
    
    return NextResponse.json({ 
      success: true,
      tags: mockTags 
    });
  } catch (error) {
    console.error('Error in tags GET request:', error);
    return NextResponse.json(
      { error: 'Failed to fetch template tags' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Mock successful tag creation
    // TODO: Implement actual database insertion when service is available
    const newTag = {
      id: Date.now(), // Simple ID generation
      ...body,
      isSystemTag: false,
      createdDate: new Date().toISOString()
    };
    
    return NextResponse.json({ 
      success: true,
      message: 'Tag created successfully',
      tag: newTag 
    });
  } catch (error) {
    console.error('Error creating tag:', error);
    return NextResponse.json(
      { error: 'Failed to create template tag' },
      { status: 500 }
    );
  }
}