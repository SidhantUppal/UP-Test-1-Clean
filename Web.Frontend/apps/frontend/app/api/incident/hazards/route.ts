import { NextRequest, NextResponse } from 'next/server';
import { Hazard } from '@/types/hazard.types';

// Mock data store
const mockHazards: Hazard[] = [
    {
        HazardID: 1,
        UserAreaID: 1,
        HazardCategoryTypeID: 1,
        HazardSeverityTypeID: 2,
        Title: "Slip and Trip Hazards",
        Description: "Wet floors, uneven surfaces, trailing cables",
        Reference: "PHY-001",
        InherentLikelihood: 4,
        InherentConsequence: 3,
        InherentRiskScore: 12,
        LegalRequirements: "Workplace (Health, Safety and Welfare) Regulations 1992",
        IsActive: true,
        CreatedByUserID: 1,
        CreatedDate: "2025-01-15T10:00:00Z",
        CategoryName: "Physical Hazards",
    },
    {
        HazardID: 2,
        UserAreaID: 1,
        HazardCategoryTypeID: 2,
        HazardSeverityTypeID: 2,
        Title: "Chemical Spillage",
        Description: "Accidental release of hazardous chemicals",
        Reference: "CHM-001",
        InherentLikelihood: 2,
        InherentConsequence: 4,
        InherentRiskScore: 8,
        LegalRequirements: "COSHH Regulations 2002",
        IsActive: true,
        CreatedByUserID: 1,
        CreatedDate: "2025-01-14T14:30:00Z",
        CategoryName: "Chemical Hazards",
    },
    {
        HazardID: 3,
        UserAreaID: 1,
        HazardCategoryTypeID: 1,
        HazardSeverityTypeID: 2,
        Title: "Machinery - Moving Parts",
        Description: "Exposed moving parts on machinery that could cause injury",
        Reference: "PHY-002",
        InherentLikelihood: 3,
        InherentConsequence: 5,
        InherentRiskScore: 15,
        LegalRequirements: "Provision and Use of Work Equipment Regulations 1998 (PUWER)",
        IsActive: true,
        CreatedByUserID: 1,
        CreatedDate: "2025-01-10T09:15:00Z",
        CategoryName: "Physical Hazards",
    },
    {
        HazardID: 4,
        UserAreaID: 1,
        HazardCategoryTypeID: 3,
        HazardSeverityTypeID: 2,
        Title: "Legionella Risk",
        Description: "Risk of Legionella bacteria in water systems",
        Reference: "BIO-001",
        InherentLikelihood: 2,
        InherentConsequence: 5,
        InherentRiskScore: 10,
        LegalRequirements: "HSE L8 Approved Code of Practice",
        IsActive: true,
        CreatedByUserID: 1,
        CreatedDate: "2025-01-08T11:45:00Z",
        CategoryName: "Biological Hazards",
    },
    {
        HazardID: 5,
        UserAreaID: 1,
        HazardCategoryTypeID: 4,
        HazardSeverityTypeID: 2,
        Title: "Manual Handling",
        Description: "Lifting, carrying, pushing or pulling heavy loads",
        Reference: "ERG-001",
        InherentLikelihood: 4,
        InherentConsequence: 3,
        InherentRiskScore: 12,
        LegalRequirements: "Manual Handling Operations Regulations 1992",
        IsActive: true,
        CreatedByUserID: 1,
        CreatedDate: "2025-01-05T16:20:00Z",
        CategoryName: "Ergonomic Hazards",
    },
    {
        HazardID: 6,
        UserAreaID: 1,
        HazardCategoryTypeID: 7,
        HazardSeverityTypeID: 2,
        Title: "Fire - Combustible Materials",
        Description: "Storage of flammable materials near ignition sources",
        Reference: "FIR-001",
        InherentLikelihood: 2,
        InherentConsequence: 5,
        InherentRiskScore: 10,
        LegalRequirements: "Regulatory Reform (Fire Safety) Order 2005",
        IsActive: true,
        CreatedByUserID: 1,
        CreatedDate: "2025-01-03T13:00:00Z",
        CategoryName: "Fire and Explosion",
    },
    {
        HazardID: 7,
        UserAreaID: 1,
        HazardCategoryTypeID: 8,
        HazardSeverityTypeID: 2,
        Title: "Electrical Shock",
        Description: "Faulty electrical equipment or exposed wiring",
        Reference: "ELE-001",
        InherentLikelihood: 2,
        InherentConsequence: 5,
        InherentRiskScore: 10,
        LegalRequirements: "Electricity at Work Regulations 1989",
        IsActive: true,
        CreatedByUserID: 1,
        CreatedDate: "2025-01-02T10:30:00Z",
        CategoryName: "Electrical Hazards",
    },
    {
        HazardID: 8,
        UserAreaID: 1,
        HazardCategoryTypeID: 5,
        HazardSeverityTypeID: 2,
        Title: "Work-related Stress",
        Description: "Excessive workload, poor work-life balance, workplace conflict",
        Reference: "PSY-001",
        InherentLikelihood: 3,
        InherentConsequence: 3,
        InherentRiskScore: 9,
        LegalRequirements: "Management of Health and Safety at Work Regulations 1999",
        IsActive: true,
        CreatedByUserID: 1,
        CreatedDate: "2024-12-28T14:15:00Z",
        CategoryName: "Psychosocial Hazards",
    },
    {
        HazardID: 9,
        UserAreaID: 1,
        HazardCategoryTypeID: 6,
        HazardSeverityTypeID: 2,
        Title: "Extreme Temperature",
        Description: "Working in very hot or cold environments",
        Reference: "ENV-001",
        InherentLikelihood: 3,
        InherentConsequence: 3,
        InherentRiskScore: 9,
        LegalRequirements: "Workplace (Health, Safety and Welfare) Regulations 1992",
        IsActive: true,
        CreatedByUserID: 1,
        CreatedDate: "2024-12-20T09:00:00Z",
        CategoryName: "Environmental Hazards",
    },
    {
        HazardID: 10,
        UserAreaID: 1,
        HazardCategoryTypeID: 1,
        HazardSeverityTypeID: 2,
        Title: "Working at Height",
        Description: "Risk of falls from ladders, scaffolding, or elevated platforms",
        Reference: "PHY-003",
        InherentLikelihood: 3,
        InherentConsequence: 5,
        InherentRiskScore: 15,
        LegalRequirements: "Work at Height Regulations 2005",
        IsActive: true,
        CreatedByUserID: 1,
        CreatedDate: "2024-12-15T11:20:00Z",
        CategoryName: "Physical Hazards",
    }
];

// GET endpoint to fetch hazards
export async function GET(request: NextRequest)
{
    try
    {
        // Try to fetch from the incident manager service first
        const incidentServiceUrl = process.env.INCIDENT_MANAGER_SERVICE_URL || 'http://localhost:3014';

        try
        {
            const response = await fetch(`${incidentServiceUrl}/api/hazards`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok)
            {
                const data = await response.json();
                return NextResponse.json(data);
            }
        } catch (error)
        {
            // Incident manager service not available, using mock data
        }

        // Return mock data if service is not available
        return NextResponse.json({
            hazards: mockHazards,
            total: mockHazards.length,
            message: 'Using mock data - incident manager service not available'
        });

    } catch (error)
    {
        return NextResponse.json(
            { error: 'Failed to fetch hazards' },
            { status: 500 }
        );
    }
}

// POST endpoint to create a new hazard
export async function POST(request: NextRequest)
{
    try
    {
        const body = await request.json();

        // Try to post to the incident manager service first
        const incidentServiceUrl = process.env.INCIDENT_MANAGER_SERVICE_URL || 'http://localhost:3014';

        try
        {
            const response = await fetch(`${incidentServiceUrl}/api/hazards`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (response.ok)
            {
                const data = await response.json();
                return NextResponse.json(data);
            }
        } catch (error)
        {
            // Incident manager service not available, using mock implementation
        }

        // Mock implementation
        const newHazard: Hazard = {
            HazardID: mockHazards.length + 1,
            UserAreaID: body.userAreaId || 1,
            HazardCategoryTypeID: body.hazardCategoryId,
            HazardSeverityTypeID: body.hazardSeverityID,
            Title: body.hazardName,
            Description: body.hazardDescription,
            Reference: body.hazardCode || `HAZ-${String(mockHazards.length + 1).padStart(3, '0')}`,
            InherentLikelihood: body.inherentLikelihood,
            InherentConsequence: body.inherentConsequence,
            InherentRiskScore: body.inherentLikelihood && body.inherentConsequence
                ? body.inherentLikelihood * body.inherentConsequence
                : undefined,
            LegalRequirements: body.legalRequirements,
            IsActive: true,
            CreatedByUserID: 1,
            CreatedDate: new Date().toISOString(),
            CategoryName: body.categoryName,
        };

        mockHazards.push(newHazard);

        return NextResponse.json({
            hazard: newHazard,
            message: 'Hazard created successfully (mock)'
        }, { status: 201 });

    } catch (error)
    {
        return NextResponse.json(
            { error: 'Failed to create hazard' },
            { status: 500 }
        );
    }
}

// PUT endpoint to update a hazard
export async function PUT(request: NextRequest)
{
    try
    {
        const body = await request.json();
        const { hazardId, ...updateData } = body;

        if (!hazardId)
        {
            return NextResponse.json(
                { error: 'Hazard ID is required' },
                { status: 400 }
            );
        }

        // Try to update via the incident manager service first
        const incidentServiceUrl = process.env.INCIDENT_MANAGER_SERVICE_URL || 'http://localhost:3014';

        try
        {
            const response = await fetch(`${incidentServiceUrl}/api/hazards/${hazardId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateData),
            });

            if (response.ok)
            {
                const data = await response.json();
                return NextResponse.json(data);
            }
        } catch (error)
        {
            // Incident manager service not available, using mock implementation
        }

        // Mock implementation
        const hazardIndex = mockHazards.findIndex(h => h.HazardID === hazardId);

        if (hazardIndex === -1)
        {
            return NextResponse.json(
                { error: 'Hazard not found' },
                { status: 404 }
            );
        }

        mockHazards[hazardIndex] = {
            ...mockHazards[hazardIndex],
            ...updateData,
            ModifiedByUserID: 1,
            ModifiedDate: new Date().toISOString()
        };

        return NextResponse.json({
            hazard: mockHazards[hazardIndex],
            message: 'Hazard updated successfully (mock)'
        });

    } catch (error)
    {
        return NextResponse.json(
            { error: 'Failed to update hazard' },
            { status: 500 }
        );
    }
}

// DELETE endpoint to delete a hazard
export async function DELETE(request: NextRequest)
{
    try
    {
        const { searchParams } = new URL(request.url);
        const hazardId = searchParams.get('id');

        if (!hazardId)
        {
            return NextResponse.json(
                { error: 'Hazard ID is required' },
                { status: 400 }
            );
        }

        // Try to delete via the incident manager service first
        const incidentServiceUrl = process.env.INCIDENT_MANAGER_SERVICE_URL || 'http://localhost:3014';

        try
        {
            const response = await fetch(`${incidentServiceUrl}/api/hazards/${hazardId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok)
            {
                const data = await response.json();
                return NextResponse.json(data);
            }
        } catch (error)
        {
            // Incident manager service not available, using mock implementation
        }

        // Mock implementation (soft delete)
        const hazardIndex = mockHazards.findIndex(h => h.HazardID === parseInt(hazardId));

        if (hazardIndex === -1)
        {
            return NextResponse.json(
                { error: 'Hazard not found' },
                { status: 404 }
            );
        }

        mockHazards[hazardIndex] = {
            ...mockHazards[hazardIndex],
            IsActive: false,
            ArchivedByUserID: 1,
            ArchivedDate: new Date().toISOString()
        };

        return NextResponse.json({
            message: 'Hazard archived successfully (mock)'
        });

    } catch (error)
    {
        return NextResponse.json(
            { error: 'Failed to delete hazard' },
            { status: 500 }
        );
    }
}