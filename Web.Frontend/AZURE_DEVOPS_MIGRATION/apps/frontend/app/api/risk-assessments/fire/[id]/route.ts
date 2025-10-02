import { NextRequest, NextResponse } from 'next/server';

// GET /api/risk-assessments/fire/[id] - Get specific fire risk assessment
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userAreaId = request.headers.get('x-userarea-id');
    const { id } = params;

    // In production, fetch from database based on ID
    // const assessment = await db.FireRiskAssessmentPAS79.findOne({ 
    //   where: { id, userAreaId, archivedDate: null } 
    // });

    // Mock data for development
    const mockAssessment = {
      id,
      type: 'fire-pas79-enhanced',
      generalInfo: {
        premisesName: 'Sample Building',
        fullAddress: '123 Test Street',
        assessmentDate: '2024-01-15',
        assessorName: 'John Doe',
        assessorQualifications: 'NEBOSH Fire Certificate'
      },
      buildingConstruction: {
        structuralFireResistance: '60',
        externalWallConstruction: 'Brick',
        ACMCladding: 'no',
        HPLCladding: 'no'
      },
      occupancyProfile: {
        maxOccupancy: '150',
        typicalDayOccupancy: '100'
      },
      status: 'Draft',
      overallFireRiskRating: 'Tolerable'
    };

    return NextResponse.json({
      success: true,
      data: mockAssessment
    });

  } catch (error) {
    console.error('Error fetching fire risk assessment:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch fire risk assessment' 
      },
      { status: 500 }
    );
  }
}

// PUT /api/risk-assessments/fire/[id] - Update specific fire risk assessment
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userAreaId = request.headers.get('x-userarea-id');
    const userId = request.headers.get('x-user-id');
    const { id } = params;
    const body = await request.json();

    // Update specific assessment
    const updateData = {
      ...body,
      id,
      ModifiedByUserID: parseInt(userId || '1'),
      ModifiedDate: new Date().toISOString()
    };

    // In production, update database
    console.log('Updating Fire Risk Assessment:', updateData);

    return NextResponse.json({
      success: true,
      data: { id },
      message: 'Fire risk assessment updated successfully'
    });

  } catch (error) {
    console.error('Error updating fire risk assessment:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to update fire risk assessment' 
      },
      { status: 500 }
    );
  }
}

// DELETE /api/risk-assessments/fire/[id] - Archive specific fire risk assessment
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userAreaId = request.headers.get('x-userarea-id');
    const userId = request.headers.get('x-user-id');
    const { id } = params;

    // Soft delete
    const archiveData = {
      id,
      archivedByUserId: parseInt(userId || '1'),
      archivedDate: new Date().toISOString()
    };

    // In production, update database
    console.log('Archiving Fire Risk Assessment:', archiveData);

    return NextResponse.json({
      success: true,
      message: 'Fire risk assessment archived successfully'
    });

  } catch (error) {
    console.error('Error archiving fire risk assessment:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to archive fire risk assessment' 
      },
      { status: 500 }
    );
  }
}