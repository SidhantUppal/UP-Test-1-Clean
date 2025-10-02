-- Update all Legal Register records to have 'Under Review' as the default compliance status
USE [V7-Dev];
GO

-- First, let's see current status distribution
SELECT ComplianceStatus, COUNT(*) as Count 
FROM LegalRegister 
GROUP BY ComplianceStatus;
GO

-- Update all records to 'Under Review' 
UPDATE LegalRegister
SET ComplianceStatus = 'Under Review',
    ModifiedDate = sysdatetimeoffset()
WHERE ComplianceStatus != 'Under Review';
GO

-- Verify the update
SELECT LegalRegisterID, Name, ComplianceStatus 
FROM LegalRegister
ORDER BY LegalRegisterID;
GO

PRINT 'All Legal Register records updated to Under Review status';