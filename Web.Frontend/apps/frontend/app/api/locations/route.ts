import { NextRequest, NextResponse } from 'next/server';

// Mock data for locations
const mockLocations = [
  {
    LocationID: 1,
    Name: 'Main Office',
    Code: 'HQ-001',
    Address: '123 Business Park',
    City: 'London',
    State: 'Greater London',
    PostalCode: 'SW1A 1AA',
    Country: 'United Kingdom',
    Description: 'Corporate headquarters building'
  },
  {
    LocationID: 2,
    Name: 'Warehouse North',
    Code: 'WH-001',
    Address: '456 Industrial Estate',
    City: 'Manchester',
    State: 'Greater Manchester',
    PostalCode: 'M1 2AB',
    Country: 'United Kingdom',
    Description: 'Northern distribution center'
  },
  {
    LocationID: 3,
    Name: 'Production Facility',
    Code: 'PF-001',
    Address: '789 Manufacturing Way',
    City: 'Birmingham',
    State: 'West Midlands',
    PostalCode: 'B1 1AA',
    Country: 'United Kingdom',
    Description: 'Main production facility'
  },
  {
    LocationID: 4,
    Name: 'Regional Office East',
    Code: 'RO-001',
    Address: '321 Commerce Street',
    City: 'Cambridge',
    State: 'Cambridgeshire',
    PostalCode: 'CB1 1AA',
    Country: 'United Kingdom',
    Description: 'Eastern regional office'
  },
  {
    LocationID: 5,
    Name: 'Warehouse South',
    Code: 'WH-002',
    Address: '654 Logistics Park',
    City: 'Southampton',
    State: 'Hampshire',
    PostalCode: 'SO14 1AA',
    Country: 'United Kingdom',
    Description: 'Southern distribution center'
  },
  {
    LocationID: 6,
    Name: 'Research & Development',
    Code: 'RD-001',
    Address: '987 Innovation Drive',
    City: 'Oxford',
    State: 'Oxfordshire',
    PostalCode: 'OX1 1AA',
    Country: 'United Kingdom',
    Description: 'R&D facility'
  },
  {
    LocationID: 7,
    Name: 'Training Center',
    Code: 'TC-001',
    Address: '147 Education Lane',
    City: 'Leeds',
    State: 'West Yorkshire',
    PostalCode: 'LS1 1AA',
    Country: 'United Kingdom',
    Description: 'Employee training facility'
  },
  {
    LocationID: 8,
    Name: 'Customer Service Center',
    Code: 'CS-001',
    Address: '258 Service Road',
    City: 'Bristol',
    State: 'Bristol',
    PostalCode: 'BS1 1AA',
    Country: 'United Kingdom',
    Description: 'Customer support center'
  },
  {
    LocationID: 9,
    Name: 'Data Center',
    Code: 'DC-001',
    Address: '369 Tech Park',
    City: 'Reading',
    State: 'Berkshire',
    PostalCode: 'RG1 1AA',
    Country: 'United Kingdom',
    Description: 'Primary data center'
  },
  {
    LocationID: 10,
    Name: 'Regional Office West',
    Code: 'RO-002',
    Address: '741 Business Quarter',
    City: 'Cardiff',
    State: 'Cardiff',
    PostalCode: 'CF10 1AA',
    Country: 'United Kingdom',
    Description: 'Western regional office'
  },
  {
    LocationID: 11,
    Name: 'Workshop',
    Code: 'WS-001',
    Address: '852 Industrial Road',
    City: 'Sheffield',
    State: 'South Yorkshire',
    PostalCode: 'S1 1AA',
    Country: 'United Kingdom',
    Description: 'Maintenance and repair workshop'
  },
  {
    LocationID: 12,
    Name: 'Quality Control Lab',
    Code: 'QC-001',
    Address: '963 Testing Avenue',
    City: 'Newcastle',
    State: 'Tyne and Wear',
    PostalCode: 'NE1 1AA',
    Country: 'United Kingdom',
    Description: 'Quality testing laboratory'
  },
  {
    LocationID: 13,
    Name: 'Fleet Depot',
    Code: 'FD-001',
    Address: '159 Transport Way',
    City: 'Liverpool',
    State: 'Merseyside',
    PostalCode: 'L1 1AA',
    Country: 'United Kingdom',
    Description: 'Vehicle fleet parking and maintenance'
  },
  {
    LocationID: 14,
    Name: 'Regional Office North',
    Code: 'RO-003',
    Address: '357 Northern Plaza',
    City: 'Edinburgh',
    State: 'Edinburgh',
    PostalCode: 'EH1 1AA',
    Country: 'United Kingdom',
    Description: 'Northern regional office'
  },
  {
    LocationID: 15,
    Name: 'Emergency Response Center',
    Code: 'ER-001',
    Address: '486 Safety Street',
    City: 'Glasgow',
    State: 'Glasgow',
    PostalCode: 'G1 1AA',
    Country: 'United Kingdom',
    Description: 'Emergency response and safety center'
  }
];

export async function GET(request: NextRequest) {
  try {
    // In a real application, this would fetch from the database
    // For now, return mock data
    return NextResponse.json({
      success: true,
      data: mockLocations
    });
  } catch (error) {
    console.error('Error fetching locations:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch locations',
        data: mockLocations // Return mock data as fallback
      },
      { status: 500 }
    );
  }
}