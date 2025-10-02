-- Add missing incident types to V7.IncidentType table
-- Only insert if the type codes don't already exist

-- Accident Book Record
IF NOT EXISTS (SELECT * FROM V7.IncidentType WHERE TypeCode = 'ACCIDENT_BOOK')
BEGIN
    INSERT INTO V7.IncidentType (TypeName, TypeCode, Description, DisplayOrder, IsActive) VALUES
    ('Accident Book Record', 'ACCIDENT_BOOK', 'Detailed accident recording with injury details', 2, 1);
END

-- Accident Report Form  
IF NOT EXISTS (SELECT * FROM V7.IncidentType WHERE TypeCode = 'ACCIDENT_REPORT')
BEGIN
    INSERT INTO V7.IncidentType (TypeName, TypeCode, Description, DisplayOrder, IsActive) VALUES
    ('Accident Report Form', 'ACCIDENT_REPORT', 'Comprehensive accident investigation report', 3, 1);
END

-- Dangerous Occurrence
IF NOT EXISTS (SELECT * FROM V7.IncidentType WHERE TypeCode = 'DANGEROUS_OCCURRENCE')
BEGIN
    INSERT INTO V7.IncidentType (TypeName, TypeCode, Description, DisplayOrder, IsActive) VALUES
    ('Dangerous Occurrence', 'DANGEROUS_OCCURRENCE', 'Report dangerous occurrences and near misses', 4, 1);
END

-- Farming Incidents
IF NOT EXISTS (SELECT * FROM V7.IncidentType WHERE TypeCode = 'FARMING')
BEGIN
    INSERT INTO V7.IncidentType (TypeName, TypeCode, Description, DisplayOrder, IsActive) VALUES
    ('Farming Incidents', 'FARMING', 'Agriculture-specific incident reporting', 5, 1);
END

-- Near Miss
IF NOT EXISTS (SELECT * FROM V7.IncidentType WHERE TypeCode = 'NEAR_MISS')
BEGIN
    INSERT INTO V7.IncidentType (TypeName, TypeCode, Description, DisplayOrder, IsActive) VALUES
    ('Near Miss', 'NEAR_MISS', 'Report incidents that could have caused harm', 6, 1);
END

-- Road Traffic Incident
IF NOT EXISTS (SELECT * FROM V7.IncidentType WHERE TypeCode = 'ROAD_TRAFFIC')
BEGIN
    INSERT INTO V7.IncidentType (TypeName, TypeCode, Description, DisplayOrder, IsActive) VALUES
    ('Road Traffic Incident', 'ROAD_TRAFFIC', 'Vehicle and road traffic incident reports', 7, 1);
END

-- High Potential (using WOBBLE for now as it maps to the same concept)
-- Update the existing WOBBLE entry to be more descriptive
UPDATE V7.IncidentType 
SET TypeName = 'High Potential Incident', 
    Description = 'High potential incidents and safety concerns'
WHERE TypeCode = 'WOBBLE';

SELECT 'Incident types updated successfully' AS Result;
SELECT IncidentTypeID, TypeName, TypeCode, Description, DisplayOrder, IsActive FROM V7.IncidentType ORDER BY DisplayOrder;