-- Update existing incidents to have correct incident types based on their description or other indicators
-- This script fixes incidents that were created before the incident types were properly set up

-- First, let's see what incidents we have and their current types
SELECT 
    ic.IncidentCaseID,
    ic.CaseNumber,
    ic.IncidentTypeID,
    it.TypeName as CurrentTypeName,
    it.TypeCode as CurrentTypeCode,
    ic.Description,
    ic.IncidentDate,
    ic.CreatedDate
FROM V7.IncidentCase ic
LEFT JOIN V7.IncidentType it ON ic.IncidentTypeID = it.IncidentTypeID
WHERE ic.IsDeleted = 0
ORDER BY ic.IncidentCaseID;

-- Since all existing incidents were created with the WOBBLE type before other types existed,
-- we can't automatically determine their correct type without additional information.
-- However, if you know which incidents should be which type, you can update them manually.

-- Example updates (uncomment and modify as needed):

-- Update INC019 to be an Accident Book incident (if that's what it should be)
-- UPDATE V7.IncidentCase 
-- SET IncidentTypeID = (SELECT IncidentTypeID FROM V7.IncidentType WHERE TypeCode = 'ACCIDENT_BOOK')
-- WHERE CaseNumber = 'INC019';

-- Update specific incidents to Near Miss
-- UPDATE V7.IncidentCase 
-- SET IncidentTypeID = (SELECT IncidentTypeID FROM V7.IncidentType WHERE TypeCode = 'NEAR_MISS')
-- WHERE CaseNumber IN ('INC005', 'INC006');

-- Update specific incidents to Dangerous Occurrence
-- UPDATE V7.IncidentCase 
-- SET IncidentTypeID = (SELECT IncidentTypeID FROM V7.IncidentType WHERE TypeCode = 'DANGEROUS_OCCURRENCE')
-- WHERE CaseNumber IN ('INC010', 'INC011');

-- Show the updated results
SELECT 
    ic.IncidentCaseID,
    ic.CaseNumber,
    ic.IncidentTypeID,
    it.TypeName as UpdatedTypeName,
    it.TypeCode as UpdatedTypeCode,
    ic.Description,
    ic.Severity,
    ic.Status
FROM V7.IncidentCase ic
LEFT JOIN V7.IncidentType it ON ic.IncidentTypeID = it.IncidentTypeID
WHERE ic.IsDeleted = 0
ORDER BY ic.IncidentCaseID DESC;