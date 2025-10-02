-- Populate LegalRegister table with sample data
USE [V7-Dev];
GO

-- Clear existing data (optional)
-- DELETE FROM dbo.LegalRegister;

-- Insert sample data with proper date format
INSERT INTO dbo.LegalRegister (Name, Link, RiskLevel, ComplianceStatus, Notes, IndustryName, LegislationType, LatestUpdate)
VALUES 
    ('Health and Safety at Work Act 1974', 'https://www.hse.gov.uk/legislation/hswa.htm', 'Medium', 'Compliant', 'Risk assessments up to date. Safety training scheduled for Q2.', 'Manufacturing', 'Health & Safety', DATEADD(day, -10, sysdatetimeoffset())),
    ('Environmental Protection Act 1990', 'https://www.legislation.gov.uk/ukpga/1990/43/contents', 'Low', 'Non-Compliant', 'Waste management procedures need updating.', 'Manufacturing', 'Environmental', DATEADD(day, -60, sysdatetimeoffset())),
    ('Equality Act 2010', 'https://www.legislation.gov.uk/ukpga/2010/15/contents', 'Medium', 'Compliant', 'Diversity and inclusion policies reviewed and updated.', 'All Industries', 'Employment', DATEADD(day, -14, sysdatetimeoffset())),
    ('GDPR (UK)', 'https://ico.org.uk/for-organisations/guide-to-data-protection/', 'High', 'Partially Compliant', 'Privacy impact assessments in progress.', 'Technology', 'Data Protection', DATEADD(day, -3, sysdatetimeoffset())),
    ('Companies Act 2006', 'https://www.legislation.gov.uk/ukpga/2006/46/contents', 'Medium', 'Compliant', 'Annual filings completed on time.', 'All Industries', 'Corporate', DATEADD(day, -38, sysdatetimeoffset())),
    ('Fire Safety Order 2005', 'https://www.legislation.gov.uk/uksi/2005/1541/contents/made', 'High', 'Compliant', 'Fire risk assessment completed. Emergency procedures tested.', 'All Industries', 'Health & Safety', DATEADD(day, -45, sysdatetimeoffset())),
    ('Bribery Act 2010', 'https://www.legislation.gov.uk/ukpga/2010/23/contents', 'High', 'Compliant', 'Anti-bribery policies and training in place.', 'All Industries', 'Corporate', DATEADD(day, -8, sysdatetimeoffset())),
    ('Modern Slavery Act 2015', 'https://www.legislation.gov.uk/ukpga/2015/30/contents', 'Medium', 'Compliant', 'Supply chain audit completed. Statement published.', 'Manufacturing', 'Corporate', DATEADD(day, -23, sysdatetimeoffset())),
    ('Consumer Rights Act 2015', 'https://www.legislation.gov.uk/ukpga/2015/15/contents', 'Low', 'Compliant', 'Customer service procedures aligned with requirements.', 'Retail', 'Consumer Protection', DATEADD(day, -90, sysdatetimeoffset()));
GO

-- Verify the data
SELECT COUNT(*) AS TotalRecords FROM dbo.LegalRegister;
SELECT * FROM dbo.LegalRegister ORDER BY LegalRegisterID;
GO

PRINT 'Sample data inserted successfully!';