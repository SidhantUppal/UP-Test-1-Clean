import { NextRequest, NextResponse } from 'next/server';

// GET /api/risk-assessments/fire - Get all fire risk assessments
export async function GET(request: NextRequest) {
  try {
    const userAreaId = request.headers.get('x-userarea-id');
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type'); // standard, pas79, all

    // For now, return mock data
    const mockAssessments = [
      {
        id: 1,
        type: 'fire-standard',
        premisesName: 'Main Office Building',
        assessmentDate: '2024-01-15',
        status: 'Approved',
        riskRating: 'Medium',
        nextReviewDate: '2025-01-15'
      },
      {
        id: 2,
        type: 'fire-pas79',
        premisesName: 'Warehouse Complex',
        assessmentDate: '2024-02-10',
        status: 'Draft',
        riskRating: 'Low',
        nextReviewDate: '2025-02-10'
      }
    ];

    const filtered = type && type !== 'all' 
      ? mockAssessments.filter(a => a.type === `fire-${type}`)
      : mockAssessments;

    return NextResponse.json({
      success: true,
      data: filtered,
      total: filtered.length
    });
  } catch (error) {
    console.error('Error fetching fire risk assessments:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch fire risk assessments',
        data: [] 
      },
      { status: 500 }
    );
  }
}

// POST /api/risk-assessments/fire - Create new fire risk assessment
export async function POST(request: NextRequest) {
  try {
    const userAreaId = request.headers.get('x-userarea-id');
    const userId = request.headers.get('x-user-id');
    const body = await request.json();

    // Validate required fields based on type
    if (!body.type) {
      return NextResponse.json(
        { success: false, error: 'Assessment type is required' },
        { status: 400 }
      );
    }

    // Handle different fire assessment types
    let assessmentData: any = {
      userAreaId: parseInt(userAreaId || '1'),
      createdByUserId: parseInt(userId || '1'),
      ModifiedByUserID: parseInt(userId || '1'),
      createdDate: new Date().toISOString(),
      ModifiedDate: new Date().toISOString(),
      status: body.status || 'Draft'
    };

    if (body.type === 'fire-standard') {
      // Standard Fire Risk Assessment
      assessmentData = {
        ...assessmentData,
        assessmentTitle: body.generalInfo?.assessmentTitle || 'Fire Risk Assessment',
        buildingName: body.generalInfo?.buildingName,
        buildingAddress: body.generalInfo?.buildingAddress,
        responsiblePerson: body.generalInfo?.responsiblePerson,
        assessmentDate: body.generalInfo?.assessmentDate || new Date().toISOString(),
        nextReviewDate: body.generalInfo?.nextReviewDate,
        
        // Store sections as JSON
        peopleAtRisk: JSON.stringify(body.peopleAtRisk || {}),
        fireSafetyMeasures: JSON.stringify(body.fireSafetyMeasures || {}),
        meansOfEscape: JSON.stringify(body.meansOfEscape || {}),
        fireDetectionSystems: JSON.stringify(body.fireDetection || {}),
        fireRiskMatrix: body.riskMatrix || '5x5',
        overallRiskRating: body.overallRiskRating || 'Medium',
        recommendedActions: JSON.stringify(body.remediActions || [])
      };

      // In production, save to FireRiskAssessmentStandard table
      console.log('Creating Standard Fire Risk Assessment:', assessmentData);

    } else if (body.type === 'fire-pas79' || body.type === 'fire-pas79-enhanced') {
      // PAS79 Fire Risk Assessment
      assessmentData = {
        ...assessmentData,
        assessmentTitle: body.generalInfo?.premisesName 
          ? `PAS79 FRA - ${body.generalInfo.premisesName}` 
          : 'PAS79 Fire Risk Assessment',
        assessmentReference: `PAS79-${Date.now()}`,
        assessmentDate: body.generalInfo?.assessmentDate || new Date().toISOString(),
        nextReviewDate: body.generalInfo?.suggestedReviewDate,
        pas79Version: '2020',
        
        // Building Information
        buildingName: body.generalInfo?.premisesName,
        buildingAddress: body.generalInfo?.fullAddress,
        buildingType: body.generalInfo?.premisesType,
        buildingUse: body.generalInfo?.useOfPremises,
        numberOfFloors: parseInt(body.generalInfo?.numberOfFloors) || null,
        buildingHeight: parseFloat(body.generalInfo?.buildingHeight) || null,
        floorArea: parseFloat(body.generalInfo?.floorArea) || null,
        buildingOccupancy: parseInt(body.occupancyProfile?.typicalDayOccupancy) || null,
        maximumOccupancy: parseInt(body.occupancyProfile?.maxOccupancy) || null,
        constructionType: body.generalInfo?.construction,
        yearBuilt: parseInt(body.generalInfo?.yearBuilt) || null,
        
        // PAS79 Sections (stored as JSON)
        section1_BuildingDetails: JSON.stringify({
          generalInfo: body.generalInfo || {},
          buildingConstruction: body.buildingConstruction || {}
        }),
        section2_OccupancyProfile: JSON.stringify(body.occupancyProfile || {}),
        section3_FireHazards: JSON.stringify(body.fireHazards || {}),
        section4_PeopleAtRisk: JSON.stringify({
          occupancyProfile: body.occupancyProfile || {},
          disabledPersons: body.additionalData?.disabledPersons || []
        }),
        section5_MeansOfEscape: JSON.stringify({
          meansOfEscape: body.meansOfEscape || {},
          travelDistances: body.additionalData?.travelDistances || []
        }),
        section6_FireSpread: JSON.stringify({
          compartmentation: body.buildingConstruction || {},
          externalWalls: {
            construction: body.buildingConstruction?.externalWallConstruction,
            system: body.buildingConstruction?.externalWallSystem,
            cladding: body.buildingConstruction?.claddingType,
            ACMPresent: body.buildingConstruction?.ACMCladding,
            HPLPresent: body.buildingConstruction?.HPLCladding,
            EWS1Form: body.buildingConstruction?.EWS1FormAvailable,
            remediation: body.buildingConstruction?.remediationRequired
          }
        }),
        section7_FireDetectionWarning: JSON.stringify(body.fireSafetySystems || {}),
        section8_FireFightingFacilities: JSON.stringify({
          equipment: body.fireSafetySystems?.firefighting || {},
          suppression: body.fireSafetySystems?.suppression || {},
          maintenance: body.maintenanceSection || {}
        }),
        
        // Risk Assessment
        probabilityOfFireOccurring: body.riskAssessment?.likelihoodOfFire || 'Low',
        consequencesOfFire: body.riskAssessment?.consequenceLevel || 'Slight',
        overallFireRiskRating: body.riskAssessment?.riskRating || 'Tolerable',
        riskAssessmentSummary: JSON.stringify(body.riskAssessment || {}),
        
        // Actions and Findings
        significantFindings: JSON.stringify(body.significantFindings || []),
        recommendedActions: JSON.stringify(body.remediActions || []),
        actionPlan: JSON.stringify({
          actions: body.remediActions || [],
          summary: body.actionPlanSummary || ''
        }),
        
        // Fire Safety Management
        fireSafetyPolicy: JSON.stringify(body.safetyManagement || {}),
        staffTrainingRecords: JSON.stringify(body.safetyManagement?.training || {}),
        fireDrillRecords: JSON.stringify(body.safetyManagement?.fireDrills || {}),
        maintenanceSchedule: JSON.stringify(body.maintenanceSection || {}),
        
        // Assessor Details
        assessorName: body.generalInfo?.assessorName,
        assessorQualifications: body.generalInfo?.assessorQualifications,
        assessorRegistrationNumber: body.generalInfo?.assessorRegistration,
        assessorOrganization: body.generalInfo?.assessorOrganisation,
        assessorAccreditation: body.generalInfo?.assessorInsurance,
        
        // Additional Data
        assessmentEvidence: JSON.stringify(body.photos || []),
        attachedDocuments: JSON.stringify(body.documents || []),
        assessmentLimitations: body.generalInfo?.scopeLimitations,
        assumptionsMade: body.generalInfo?.scopeDescription
      };

      // In production, save to FireRiskAssessmentPAS79 table
      console.log('Creating PAS79 Fire Risk Assessment:', assessmentData);
    }

    // Simulate database save
    const newAssessment = {
      id: Date.now(),
      ...assessmentData,
      type: body.type
    };

    // In production, this would be an actual database call:
    // const result = await db.FireRiskAssessmentPAS79.create(assessmentData);

    return NextResponse.json({
      success: true,
      data: { id: newAssessment.id },
      message: 'Fire risk assessment created successfully'
    });

  } catch (error) {
    console.error('Error creating fire risk assessment:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create fire risk assessment',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// PUT /api/risk-assessments/fire - Update fire risk assessment
export async function PUT(request: NextRequest) {
  try {
    const userAreaId = request.headers.get('x-userarea-id');
    const userId = request.headers.get('x-user-id');
    const body = await request.json();

    if (!body.id) {
      return NextResponse.json(
        { success: false, error: 'Assessment ID is required' },
        { status: 400 }
      );
    }

    // Update logic based on assessment type
    const updateData = {
      ModifiedByUserID: parseInt(userId || '1'),
      ModifiedDate: new Date().toISOString(),
      ...body
    };

    // In production, update the appropriate table based on type
    console.log('Updating Fire Risk Assessment:', updateData);

    return NextResponse.json({
      success: true,
      data: { id: body.id },
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

// DELETE /api/risk-assessments/fire - Archive fire risk assessment
export async function DELETE(request: NextRequest) {
  try {
    const userAreaId = request.headers.get('x-userarea-id');
    const userId = request.headers.get('x-user-id');
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Assessment ID is required' },
        { status: 400 }
      );
    }

    // Soft delete by setting ArchivedDate
    const archiveData = {
      archivedByUserId: parseInt(userId || '1'),
      archivedDate: new Date().toISOString()
    };

    // In production, update the appropriate table
    console.log('Archiving Fire Risk Assessment:', { id, ...archiveData });

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