-- Migrate Local V7-Dev Tables to Azure V7-Dev Database
-- Run this script on Azure SQL Database: YOUR_DATABASE_SERVER.database.windows.net / V7-Dev
-- 
-- This script migrates tables that were created locally and need to be in Azure

USE [V7-Dev];
GO

PRINT 'Starting migration of local tables to Azure V7-Dev database...';

-- ==============================================
-- 1. CREATE LEGAL REGISTER TABLE
-- ==============================================
PRINT 'Creating LegalRegister table...';

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
    ModifiedBy NVARCHAR(100),
    -- Additional columns that may have been added locally
    ResponsiblePerson NVARCHAR(200),
    LastViewedDate DATETIMEOFFSET (7),
    OrgGroupID INT,
    LocationID INT
);
GO

-- Create indexes for better performance
CREATE INDEX IX_LegalRegister_IndustryName ON dbo.LegalRegister(IndustryName);
CREATE INDEX IX_LegalRegister_ComplianceStatus ON dbo.LegalRegister(ComplianceStatus);
CREATE INDEX IX_LegalRegister_RiskLevel ON dbo.LegalRegister(RiskLevel);
GO

-- Insert sample data
INSERT INTO dbo.LegalRegister (Name, Link, RiskLevel, ComplianceStatus, Notes, IndustryName, LegislationType, LatestUpdate, ResponsiblePerson)
VALUES 
    ('Data Protection Act 2018', 'https://www.legislation.gov.uk/ukpga/2018/12/contents', 'High', 'Compliant', 'Annual review completed. All data processing activities documented.', 'Technology', 'Data Protection', '2024-01-15', 'Data Protection Officer'),
    ('Health and Safety at Work Act 1974', 'https://www.hse.gov.uk/legislation/hswa.htm', 'Medium', 'Compliant', 'Risk assessments up to date. Safety training scheduled for Q2.', 'Manufacturing', 'Health & Safety', '2024-02-01', 'Health & Safety Manager'),
    ('Environmental Protection Act 1990', 'https://www.legislation.gov.uk/ukpga/1990/43/contents', 'Low', 'Non-Compliant', 'Waste management procedures need updating.', 'Manufacturing', 'Environmental', '2023-11-20', 'Environmental Officer'),
    ('Equality Act 2010', 'https://www.legislation.gov.uk/ukpga/2010/15/contents', 'Medium', 'Compliant', 'Diversity and inclusion policies reviewed and updated.', 'All Industries', 'Employment', '2024-01-30', 'HR Manager'),
    ('GDPR (UK)', 'https://ico.org.uk/for-organisations/guide-to-data-protection/', 'High', 'Partially Compliant', 'Privacy impact assessments in progress.', 'Technology', 'Data Protection', '2024-02-10', 'Data Protection Officer'),
    ('Companies Act 2006', 'https://www.legislation.gov.uk/ukpga/2006/46/contents', 'Medium', 'Compliant', 'Annual filings completed on time.', 'All Industries', 'Corporate', '2024-01-05', 'Company Secretary'),
    ('Fire Safety Order 2005', 'https://www.legislation.gov.uk/uksi/2005/1541/contents/made', 'High', 'Compliant', 'Fire risk assessment completed. Emergency procedures tested.', 'All Industries', 'Health & Safety', '2023-12-15', 'Fire Safety Officer'),
    ('Bribery Act 2010', 'https://www.legislation.gov.uk/ukpga/2010/23/contents', 'High', 'Compliant', 'Anti-bribery policies and training in place.', 'All Industries', 'Corporate', '2024-02-05', 'Compliance Manager'),
    ('Modern Slavery Act 2015', 'https://www.legislation.gov.uk/ukpga/2015/30/contents', 'Medium', 'Compliant', 'Supply chain audit completed. Statement published.', 'Manufacturing', 'Corporate', '2024-01-20', 'Procurement Manager'),
    ('Consumer Rights Act 2015', 'https://www.legislation.gov.uk/ukpga/2015/15/contents', 'Low', 'Compliant', 'Customer service procedures aligned with requirements.', 'Retail', 'Consumer Protection', '2023-10-10', 'Customer Service Manager');
GO

PRINT 'LegalRegister table created and populated successfully!';

-- ==============================================
-- 2. CREATE USER NAVIGATION PREFERENCES TABLE
-- ==============================================
PRINT 'Creating UserNavigationPreferences table...';

-- Drop table if it exists (for clean setup)
IF OBJECT_ID('dbo.UserNavigationPreferences', 'U') IS NOT NULL
    DROP TABLE dbo.UserNavigationPreferences;
GO

-- Create the UserNavigationPreferences table
CREATE TABLE dbo.UserNavigationPreferences (
    UserNavigationPreferencesID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT NOT NULL,
    NavigationPreferences NVARCHAR(MAX) NOT NULL, -- JSON string containing preferences
    CreatedDate DATETIMEOFFSET (7) DEFAULT sysdatetimeoffset(),
    UpdatedDate DATETIMEOFFSET (7) DEFAULT sysdatetimeoffset(),
    CONSTRAINT UQ_UserNavigationPreferences_UserID UNIQUE (UserID)
);
GO

-- Create index for better performance
CREATE INDEX IX_UserNavigationPreferences_UserID 
ON dbo.UserNavigationPreferences(UserID);
GO

-- Insert default preferences for user ID 1
INSERT INTO dbo.UserNavigationPreferences (UserID, NavigationPreferences)
VALUES (1, '{"primaryItems":[],"maxPrimaryItems":8,"lastUpdated":"' + CONVERT(VARCHAR, sysdatetimeoffset(), 127) + '"}');
GO

PRINT 'UserNavigationPreferences table created successfully!';

-- ==============================================
-- 3. CREATE ROLE NAVIGATION PREFERENCES TABLE
-- ==============================================
PRINT 'Creating RoleNavigationPreferences table...';

-- Drop table if it exists (for clean setup)
IF OBJECT_ID('dbo.RoleNavigationPreferences', 'U') IS NOT NULL
    DROP TABLE dbo.RoleNavigationPreferences;
GO

-- Create the RoleNavigationPreferences table
CREATE TABLE dbo.RoleNavigationPreferences (
    RoleNavigationPreferencesID INT IDENTITY(1,1) PRIMARY KEY,
    RoleName NVARCHAR(100) NOT NULL,
    NavigationPreferences NVARCHAR(MAX) NOT NULL, -- JSON string containing default preferences for role
    IsDefault BIT DEFAULT 0, -- Whether this is the system default
    CreatedDate DATETIMEOFFSET (7) DEFAULT sysdatetimeoffset(),
    UpdatedDate DATETIMEOFFSET (7) DEFAULT sysdatetimeoffset(),
    CONSTRAINT UQ_RoleNavigationPreferences_RoleName UNIQUE (RoleName)
);
GO

-- Create index for better performance
CREATE INDEX IX_RoleNavigationPreferences_RoleName 
ON dbo.RoleNavigationPreferences(RoleName);
GO

-- Insert default role preferences
INSERT INTO dbo.RoleNavigationPreferences (RoleName, NavigationPreferences, IsDefault)
VALUES 
    ('Admin', '{"primaryItems":["home","admin","checklists","documents","incidents","risk-assessments","assets","tasks"],"maxPrimaryItems":8}', 0),
    ('Manager', '{"primaryItems":["home","checklists","documents","incidents","risk-assessments","training","reports","employees"],"maxPrimaryItems":8}', 0),
    ('Employee', '{"primaryItems":["home","checklists","training","documents","incidents","tasks","permits","processes"],"maxPrimaryItems":8}', 0),
    ('Default', '{"primaryItems":["home","checklists","contractors","documents","permits","incidents","risk-assessments","legal-register"],"maxPrimaryItems":8}', 1);
GO

PRINT 'RoleNavigationPreferences table created successfully!';

-- ==============================================
-- 4. CREATE ATTACHMENTS TABLE
-- ==============================================
PRINT 'Creating Attachments table...';

-- Drop table if it exists (for clean setup)
IF OBJECT_ID('dbo.Attachments', 'U') IS NOT NULL
    DROP TABLE dbo.Attachments;
GO

-- Create the Attachments table
CREATE TABLE dbo.Attachments (
    AttachmentID INT IDENTITY(1,1) PRIMARY KEY,
    EntityType NVARCHAR(50) NOT NULL, -- 'LegalRegister', 'Incident', 'Document', etc.
    EntityID INT NOT NULL, -- ID of the related entity
    FileName NVARCHAR(255) NOT NULL,
    OriginalFileName NVARCHAR(255) NOT NULL,
    FilePath NVARCHAR(500) NOT NULL,
    FileSize BIGINT NOT NULL,
    MimeType NVARCHAR(100),
    UploadedDate DATETIMEOFFSET (7) DEFAULT sysdatetimeoffset(),
    UploadedBy NVARCHAR(100),
    Description NVARCHAR(500)
);
GO

-- Create indexes for better performance
CREATE INDEX IX_Attachments_EntityType_EntityID ON dbo.Attachments(EntityType, EntityID);
CREATE INDEX IX_Attachments_UploadedDate ON dbo.Attachments(UploadedDate);
GO

PRINT 'Attachments table created successfully!';

-- ==============================================
-- VERIFICATION
-- ==============================================
PRINT 'Verifying tables were created successfully...';

-- Check LegalRegister
SELECT COUNT(*) AS LegalRegisterRecordCount FROM dbo.LegalRegister;
SELECT TOP 3 Name, ComplianceStatus, IndustryName FROM dbo.LegalRegister ORDER BY LegalRegisterID;

-- Check UserNavigationPreferences
SELECT COUNT(*) AS UserNavigationPreferencesCount FROM dbo.UserNavigationPreferences;

-- Check RoleNavigationPreferences
SELECT COUNT(*) AS RoleNavigationPreferencesCount FROM dbo.RoleNavigationPreferences;
SELECT RoleName, IsDefault FROM dbo.RoleNavigationPreferences;

-- Check Attachments
SELECT COUNT(*) AS AttachmentsCount FROM dbo.Attachments;

-- List all newly created tables
SELECT 
    TABLE_NAME,
    TABLE_TYPE
FROM INFORMATION_SCHEMA.TABLES 
WHERE TABLE_NAME IN ('LegalRegister', 'UserNavigationPreferences', 'RoleNavigationPreferences', 'Attachments')
ORDER BY TABLE_NAME;

PRINT 'Migration completed successfully!';
PRINT 'All local tables have been migrated to Azure V7-Dev database.';