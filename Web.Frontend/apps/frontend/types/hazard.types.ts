// Hazard type definitions based on V7-portal database schema


export interface HazardCategoryType
{
    HazardCategoryTypeID: number;
    ParentCategoryID?: number;
    UserAreaID?: number;
    Title: string;
    Description?: string;
    IsActive: boolean;
    CreatedByUserID: number;
    CreatedDate: string;
    ModifiedByUserID?: number;
    ModifiedDate?: string;
    ArchivedByUserID?: number;
    ArchivedDate?: string;
}

export interface Hazard
{
    HazardID: number;
    Title: string;
    Description?: string;
    Reference?: string;
    UserAreaID: number;
    HazardCategoryTypeID: number;
    HazardSeverityTypeID: number;
    InherentLikelihood?: number;
    InherentConsequence?: number;
    InherentRiskScore?: number;
    RiskColor?: string;
    LegalRequirements?: string;
    IsActive: boolean;
    CreatedByUserID: number;
    CreatedDate: string;
    ModifiedByUserID?: number;
    ModifiedDate?: string;
    ArchivedByUserID?: number;
    ArchivedDate?: string;
    LocationID?: number;
    LocationName?: string;
    AssignedToUserID?: number;
    AssignedToRoleID?: number;
    AssignedDate?: string;
    // Derived fields for display (not in database)
    Attachments?: HazardAttachment[];
    AssignedToUserName?: string;
    AssignedToRoleName?: string;
    CategoryName?: string;
    SeverityTypeName?: string;
    ServerityTypeColor?: string
}

export interface HazardAttachment
{
    attachmentId: number;
    hazardId: number;
    fileName: string;
    fileType: string;
    fileSize: number;
    fileUrl: string;
    uploadedByUserId: number;
    uploadedDate: string;
}

export interface Location
{
    locationId: number;
    locationName: string;
    locationType?: string;
    parentLocationId?: number;
    description?: string;
    isActive: boolean;
}

export interface RiskAssessmentHazard
{
    riskAssessmentHazardId: number;
    userAreaId: number;
    riskAssessmentId: number;
    hazardId?: number;
    // Custom Hazard Details (if not from library)
    customTitle?: string;
    customDescription?: string;
    // Risk Scoring
    inherentLikelihood?: number;
    inherentConsequence?: number;
    inherentRiskScore?: number;
    residualLikelihood?: number;
    residualConsequence?: number;
    residualRiskScore?: number;
    // Additional Details
    hazardNotes?: string;
    sequenceOrder: number;
}

// Hazard Severity Type interface (matches HazardSeverityTypeViewModel from backend)
export interface HazardSeverityType
{
    HazardSeverityTypeID: number;
    UserAreaID?: number;
    Reference: string;
    SeverityLevel: number;
    ColorCode?: string;
    Title?: string;
    Description?: string;
    IsActive?: boolean;
    CreatedByUserID: number;
    CreatedDate: string;
    ModifiedByUserID?: number;
    ModifiedDate?: string;
    ArchivedByUserID?: number;
    ArchivedDate?: string;
    // Additional display properties
    CreatedByUserName?: string;
    ModifiedByUserName?: string;
    ArchivedByUserName?: string;
}

// Legacy severity levels for hazards (for backward compatibility)
export const HAZARD_SEVERITY_LEVELS = [
    { value: 'Negligible', label: 'Negligible', color: '#10B981', description: 'No injury, minimal impact' },
    { value: 'Minor', label: 'Minor', color: '#F59E0B', description: 'First aid treatment, minor impact' },
    { value: 'Moderate', label: 'Moderate', color: '#F97316', description: 'Medical treatment required, moderate impact' },
    { value: 'Major', label: 'Major', color: '#EF4444', description: 'Extensive injuries, major impact' },
    { value: 'Catastrophic', label: 'Catastrophic', color: '#991B1B', description: 'Death or permanent disability, catastrophic impact' }
] as const;

// Helper function to calculate risk level
export const calculateSeverityLevel = (score?: number): { level: string; color: string } =>
{
    if (!score) return { level: 'Unknown', color: '#6B7280' };

    if (score <= 5) return { level: 'Low', color: '#10B981' };
    if (score <= 10) return { level: 'Medium', color: '#F59E0B' };
    if (score <= 15) return { level: 'High', color: '#F97316' };
    return { level: 'Critical', color: '#EF4444' };
};

// Helper function to get severity color from lookup table
export const getSeverityColor = (severity?: string | HazardSeverityType): string =>
{
    if (typeof severity === 'object' && severity?.ColorCode)
    {
        return severity.ColorCode;
    }
    if (typeof severity === 'string')
    {
        const level = HAZARD_SEVERITY_LEVELS.find(l => l.value === severity);
        return level?.color || '#6B7280';
    }
    return '#6B7280';
};

// Helper function to get severity badge color classes for Tailwind
export const getSeverityBadgeColor = (severity?: string | HazardSeverityType): string =>
{
    let severityName = '';

    if (typeof severity === 'object' && severity?.Title)
    {
        severityName = severity.Title;
    } else if (typeof severity === 'string')
    {
        severityName = severity;
    }

    switch (severityName)
    {
        case 'Negligible':
            return 'bg-green-100 text-green-800';
        case 'Minor':
            return 'bg-yellow-100 text-yellow-800';
        case 'Moderate':
            return 'bg-orange-100 text-orange-800';
        case 'Major':
            return 'bg-red-100 text-red-800';
        case 'Catastrophic':
            return 'bg-red-200 text-red-900';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

// Mock data for default hazard categories
export const DEFAULT_HAZARD_CATEGORIES: Partial<HazardCategoryType>[] = [
    { Title: 'Physical', Description: 'Physical hazards such as machinery, noise, temperature' },
    { Title: 'Chemical', Description: 'Chemical hazards including substances and fumes' },
    { Title: 'Biological', Description: 'Biological hazards such as bacteria, viruses' },
    { Title: 'Ergonomic', Description: 'Ergonomic hazards related to posture and repetitive tasks' },
    { Title: 'Psychosocial', Description: 'Workplace stress and mental health hazards' },
    { Title: 'Environmental', Description: 'Environmental factors affecting safety' },
    { Title: 'Fire and Explosion', Description: 'Fire, explosion and combustible material hazards' },
    { Title: 'Electrical', Description: 'Electrical hazards and power-related risks' },
    { Title: 'Radiation', Description: 'Ionizing and non-ionizing radiation hazards' },
    { Title: 'Mechanical', Description: 'Rotating equipment, pressure systems, and mechanical hazards' },
    { Title: 'Transportation/Vehicle', Description: 'Vehicle operations and material handling equipment' },
    { Title: 'Confined Spaces', Description: 'Hazards related to working in confined or restricted spaces' },
    { Title: 'Security', Description: 'Workplace violence, unauthorized access, and security risks' },
    { Title: 'Working at Height', Description: 'Falls from ladders, scaffolding, or elevated platforms' },
    { Title: 'Housekeeping', Description: 'Poor housekeeping leading to slips, trips, and other hazards' },
    { Title: 'Lone Working', Description: 'Risks associated with working alone or in isolation' },
    { Title: 'Pressure Systems', Description: 'Compressed air, steam, and hydraulic systems' },
    { Title: 'Temperature Extremes', Description: 'Exposure to extreme hot or cold environments' },
    { Title: 'Noise and Vibration', Description: 'Hearing damage and vibration-related injuries' },
    { Title: 'Hazardous Substances', Description: 'Asbestos, silica, lead, and other hazardous materials' }
];