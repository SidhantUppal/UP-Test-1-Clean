-- Create LegalRegister table in V7-Dev database
USE [V7-Dev];
GO

-- Drop table if it exists (for clean setup)
IF OBJECT_ID('dbo.LegalRegister', 'U') IS NOT NULL
    DROP TABLE dbo.LegalRegister;
GO

-- Create the LegalRegister table
CREATE TABLE dbo.LegalRegister (
    LegalRegisterID INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(500) NOT NULL,
    Link NVARCHAR(1000),
    LatestUpdate DATETIMEOFFSET (7) DEFAULT sysdatetimeoffset(),
    RiskLevel NVARCHAR(50),
    ComplianceStatus NVARCHAR(50),
    Notes NVARCHAR(MAX),
    IndustryName NVARCHAR(200),
    LegislationType NVARCHAR(100),
    CreatedDate DATETIMEOFFSET (7) DEFAULT sysdatetimeoffset(),
    ModifiedDate DATETIMEOFFSET (7) DEFAULT sysdatetimeoffset(),
    CreatedBy NVARCHAR(100),
    ModifiedBy NVARCHAR(100)
);
GO

-- Create indexes for better performance
CREATE INDEX IX_LegalRegister_IndustryName ON dbo.LegalRegister(IndustryName);
CREATE INDEX IX_LegalRegister_ComplianceStatus ON dbo.LegalRegister(ComplianceStatus);
CREATE INDEX IX_LegalRegister_RiskLevel ON dbo.LegalRegister(RiskLevel);
GO

-- Insert sample data
INSERT INTO dbo.LegalRegister (Name, Link, RiskLevel, ComplianceStatus, Notes, IndustryName, LegislationType, LatestUpdate)
VALUES 
    ('Data Protection Act 2018', 'https://www.legislation.gov.uk/ukpga/2018/12/contents', 'High', 'Compliant', 'Annual review completed. All data processing activities documented.', 'Technology', 'Data Protection', '2024-01-15'),
    ('Health and Safety at Work Act 1974', 'https://www.hse.gov.uk/legislation/hswa.htm', 'Medium', 'Compliant', 'Risk assessments up to date. Safety training scheduled for Q2.', 'Manufacturing', 'Health & Safety', '2024-02-01'),
    ('Environmental Protection Act 1990', 'https://www.legislation.gov.uk/ukpga/1990/43/contents', 'Low', 'Non-Compliant', 'Waste management procedures need updating.', 'Manufacturing', 'Environmental', '2023-11-20'),
    ('Equality Act 2010', 'https://www.legislation.gov.uk/ukpga/2010/15/contents', 'Medium', 'Compliant', 'Diversity and inclusion policies reviewed and updated.', 'All Industries', 'Employment', '2024-01-30'),
    ('GDPR (UK)', 'https://ico.org.uk/for-organisations/guide-to-data-protection/', 'High', 'Partially Compliant', 'Privacy impact assessments in progress.', 'Technology', 'Data Protection', '2024-02-10'),
    ('Companies Act 2006', 'https://www.legislation.gov.uk/ukpga/2006/46/contents', 'Medium', 'Compliant', 'Annual filings completed on time.', 'All Industries', 'Corporate', '2024-01-05'),
    ('Fire Safety Order 2005', 'https://www.legislation.gov.uk/uksi/2005/1541/contents/made', 'High', 'Compliant', 'Fire risk assessment completed. Emergency procedures tested.', 'All Industries', 'Health & Safety', '2023-12-15'),
    ('Bribery Act 2010', 'https://www.legislation.gov.uk/ukpga/2010/23/contents', 'High', 'Compliant', 'Anti-bribery policies and training in place.', 'All Industries', 'Corporate', '2024-02-05'),
    ('Modern Slavery Act 2015', 'https://www.legislation.gov.uk/ukpga/2015/30/contents', 'Medium', 'Compliant', 'Supply chain audit completed. Statement published.', 'Manufacturing', 'Corporate', '2024-01-20'),
    ('Consumer Rights Act 2015', 'https://www.legislation.gov.uk/ukpga/2015/15/contents', 'Low', 'Compliant', 'Customer service procedures aligned with requirements.', 'Retail', 'Consumer Protection', '2023-10-10');
GO

-- Verify the table was created and populated
SELECT COUNT(*) AS RecordCount FROM dbo.LegalRegister;
SELECT TOP 5 * FROM dbo.LegalRegister ORDER BY LegalRegisterID;
GO

PRINT 'LegalRegister table created and populated successfully!';