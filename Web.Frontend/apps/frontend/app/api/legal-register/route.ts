import { NextRequest, NextResponse } from 'next/server';

// Mock data for legal register
const mockLegalRegisterData = [
  {
    LegalRegisterID: 1,
    Name: "Data Protection Act 2018",
    Link: "https://www.legislation.gov.uk/ukpga/2018/12/contents",
    LatestUpdate: "2024-01-15",
    IsRecent: true,
    RiskLevel: "High",
    ComplianceStatus: "Compliant",
    Notes: "Annual review completed. All data processing activities documented.",
    IndustryName: "Technology",
    LegislationType: "Data Protection"
  },
  {
    LegalRegisterID: 2,
    Name: "Health and Safety at Work Act 1974",
    Link: "https://www.hse.gov.uk/legislation/hswa.htm",
    LatestUpdate: "2024-02-01",
    IsRecent: true,
    RiskLevel: "Medium",
    ComplianceStatus: "Compliant",
    Notes: "Risk assessments up to date. Safety training scheduled for Q2.",
    IndustryName: "Manufacturing",
    LegislationType: "Health & Safety"
  },
  {
    LegalRegisterID: 3,
    Name: "Environmental Protection Act 1990",
    Link: "https://www.legislation.gov.uk/ukpga/1990/43/contents",
    LatestUpdate: "2023-11-20",
    IsRecent: false,
    RiskLevel: "Low",
    ComplianceStatus: "Non-Compliant",
    Notes: "Waste management procedures need updating.",
    IndustryName: "Manufacturing",
    LegislationType: "Environmental"
  },
  {
    LegalRegisterID: 4,
    Name: "Equality Act 2010",
    Link: "https://www.legislation.gov.uk/ukpga/2010/15/contents",
    LatestUpdate: "2024-01-30",
    IsRecent: true,
    RiskLevel: "Medium",
    ComplianceStatus: "Compliant",
    Notes: "Diversity and inclusion policies reviewed and updated.",
    IndustryName: "All Industries",
    LegislationType: "Employment"
  },
  {
    LegalRegisterID: 5,
    Name: "GDPR (UK)",
    Link: "https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/",
    LatestUpdate: "2024-02-10",
    IsRecent: true,
    RiskLevel: "High",
    ComplianceStatus: "Partially Compliant",
    Notes: "Privacy impact assessments in progress.",
    IndustryName: "Technology",
    LegislationType: "Data Protection"
  },
  {
    LegalRegisterID: 6,
    Name: "Companies Act 2006",
    Link: "https://www.legislation.gov.uk/ukpga/2006/46/contents",
    LatestUpdate: "2024-01-05",
    IsRecent: true,
    RiskLevel: "Medium",
    ComplianceStatus: "Compliant",
    Notes: "Annual filings completed on time.",
    IndustryName: "All Industries",
    LegislationType: "Corporate"
  },
  {
    LegalRegisterID: 7,
    Name: "Fire Safety Order 2005",
    Link: "https://www.legislation.gov.uk/uksi/2005/1541/contents/made",
    LatestUpdate: "2023-12-15",
    IsRecent: false,
    RiskLevel: "High",
    ComplianceStatus: "Compliant",
    Notes: "Fire risk assessment completed. Emergency procedures tested.",
    IndustryName: "All Industries",
    LegislationType: "Health & Safety"
  },
  {
    LegalRegisterID: 8,
    Name: "Bribery Act 2010",
    Link: "https://www.legislation.gov.uk/ukpga/2010/23/contents",
    LatestUpdate: "2024-02-05",
    IsRecent: true,
    RiskLevel: "High",
    ComplianceStatus: "Compliant",
    Notes: "Anti-bribery policies and training in place.",
    IndustryName: "All Industries",
    LegislationType: "Corporate"
  },
  {
    LegalRegisterID: 9,
    Name: "Modern Slavery Act 2015",
    Link: "https://www.legislation.gov.uk/ukpga/2015/30/contents",
    LatestUpdate: "2024-01-20",
    IsRecent: true,
    RiskLevel: "Medium",
    ComplianceStatus: "Compliant",
    Notes: "Supply chain audit completed. Statement published.",
    IndustryName: "Manufacturing",
    LegislationType: "Corporate"
  },
  {
    LegalRegisterID: 10,
    Name: "Consumer Rights Act 2015",
    Link: "https://www.legislation.gov.uk/ukpga/2015/15/contents",
    LatestUpdate: "2023-10-10",
    IsRecent: false,
    RiskLevel: "Low",
    ComplianceStatus: "Compliant",
    Notes: "Customer service procedures aligned with requirements.",
    IndustryName: "Retail",
    LegislationType: "Consumer Protection"
  }
];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search') || '';
    const industryName = searchParams.get('industryName') || '';
    const complianceStatus = searchParams.get('complianceStatus') || '';
    const riskLevel = searchParams.get('riskLevel') || '';
    const limit = parseInt(searchParams.get('limit') || '100');

    // Filter the mock data based on search parameters
    let filteredData = [...mockLegalRegisterData];

    if (search) {
      filteredData = filteredData.filter(item =>
        item.Name.toLowerCase().includes(search.toLowerCase()) ||
        item.LegislationType.toLowerCase().includes(search.toLowerCase()) ||
        item.Notes.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (industryName && industryName !== 'All Industries') {
      filteredData = filteredData.filter(item =>
        item.IndustryName === industryName || item.IndustryName === 'All Industries'
      );
    }

    if (complianceStatus) {
      filteredData = filteredData.filter(item =>
        item.ComplianceStatus === complianceStatus
      );
    }

    if (riskLevel) {
      filteredData = filteredData.filter(item =>
        item.RiskLevel === riskLevel
      );
    }

    // Apply limit
    filteredData = filteredData.slice(0, limit);

    return NextResponse.json({
      success: true,
      data: filteredData,
      total: filteredData.length
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // In a real application, this would save to a database
    // For now, we'll just return success
    return NextResponse.json({
      success: true,
      message: 'Legal register entry created successfully',
      data: {
        ...body,
        LegalRegisterID: Date.now(),
        CreatedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error creating legal register entry:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create entry' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    const body = await request.json();
    
    
    // Find and update the item in our mock data (in a real app, this would update the database)
    const itemIndex = mockLegalRegisterData.findIndex(item => item.LegalRegisterID === parseInt(id || '0'));
    
    if (itemIndex !== -1) {
      // Update the mock data
      mockLegalRegisterData[itemIndex] = {
        ...mockLegalRegisterData[itemIndex],
        Name: body.name || mockLegalRegisterData[itemIndex].Name,
        Link: body.link || mockLegalRegisterData[itemIndex].Link,
        IndustryName: body.industryName || mockLegalRegisterData[itemIndex].IndustryName,
        RiskLevel: body.riskLevel || mockLegalRegisterData[itemIndex].RiskLevel,
        ComplianceStatus: body.complianceStatus || mockLegalRegisterData[itemIndex].ComplianceStatus,
        Notes: body.notes !== undefined ? body.notes : mockLegalRegisterData[itemIndex].Notes,
        LatestUpdate: new Date().toISOString(),
        IsRecent: true
      };
      
      return NextResponse.json({
        success: true,
        message: 'Legal register entry updated successfully',
        data: mockLegalRegisterData[itemIndex]
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'Entry not found' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Error updating legal register entry:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update entry' },
      { status: 500 }
    );
  }
}