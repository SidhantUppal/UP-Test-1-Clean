-- Script to insert 10 new UserAreas into Azure V7.UserArea table
-- Run this on Azure SQL Database: YOUR_DATABASE_SERVER.database.windows.net / V7

-- First, let's check what's already there
SELECT UserAreaID, Title, ThemeTypeID, IsDemo FROM [V7].[UserArea];

-- Insert 10 new UserAreas
-- Note: Using ThemeTypeID 1-3 (assuming these exist based on current data)
BEGIN TRANSACTION;

DECLARE @CreatedByUserID INT = 1; -- Using admin user ID
DECLARE @CreatedDate DATETIMEOFFSET = SYSDATETIMEOFFSET();

-- 1. Acme Corporation
INSERT INTO [V7].[UserArea] (
    ThemeTypeID, GUID, Title, Description, Prefix, IsDemo, ExpiryDate,
    BaseURL, SSOLoginURL, MobileIdentityAPIInstanceID, UploadedFileMBLimit,
    CreatedByUserID, CreatedDate
) VALUES (
    1, NEWID(), 'Acme Corporation', 'Leading construction and safety solutions', 'ACME', 0, NULL,
    'https://acme.t100platform.com', NULL, NULL, 100,
    @CreatedByUserID, @CreatedDate
);

-- 2. TechCo Ltd
INSERT INTO [V7].[UserArea] (
    ThemeTypeID, GUID, Title, Description, Prefix, IsDemo, ExpiryDate,
    BaseURL, SSOLoginURL, MobileIdentityAPIInstanceID, UploadedFileMBLimit,
    CreatedByUserID, CreatedDate
) VALUES (
    2, NEWID(), 'TechCo Ltd', 'Technology and engineering services', 'TECH', 0, NULL,
    'https://techco.t100platform.com', NULL, NULL, 50,
    @CreatedByUserID, @CreatedDate
);

-- 3. Global Industries
INSERT INTO [V7].[UserArea] (
    ThemeTypeID, GUID, Title, Description, Prefix, IsDemo, ExpiryDate,
    BaseURL, SSOLoginURL, MobileIdentityAPIInstanceID, UploadedFileMBLimit,
    CreatedByUserID, CreatedDate
) VALUES (
    3, NEWID(), 'Global Industries', 'International manufacturing and logistics', 'GLOB', 0, NULL,
    'https://global.t100platform.com', NULL, NULL, 200,
    @CreatedByUserID, @CreatedDate
);

-- 4. SafeWork Solutions
INSERT INTO [V7].[UserArea] (
    ThemeTypeID, GUID, Title, Description, Prefix, IsDemo, ExpiryDate,
    BaseURL, SSOLoginURL, MobileIdentityAPIInstanceID, UploadedFileMBLimit,
    CreatedByUserID, CreatedDate
) VALUES (
    1, NEWID(), 'SafeWork Solutions', 'Workplace safety and compliance specialists', 'SAFE', 0, NULL,
    'https://safework.t100platform.com', NULL, NULL, 75,
    @CreatedByUserID, @CreatedDate
);

-- 5. Northern Construction
INSERT INTO [V7].[UserArea] (
    ThemeTypeID, GUID, Title, Description, Prefix, IsDemo, ExpiryDate,
    BaseURL, SSOLoginURL, MobileIdentityAPIInstanceID, UploadedFileMBLimit,
    CreatedByUserID, CreatedDate
) VALUES (
    2, NEWID(), 'Northern Construction', 'Regional construction and infrastructure', 'NCON', 0, NULL,
    'https://northern.t100platform.com', NULL, NULL, 150,
    @CreatedByUserID, @CreatedDate
);

-- 6. Pacific Engineering
INSERT INTO [V7].[UserArea] (
    ThemeTypeID, GUID, Title, Description, Prefix, IsDemo, ExpiryDate,
    BaseURL, SSOLoginURL, MobileIdentityAPIInstanceID, UploadedFileMBLimit,
    CreatedByUserID, CreatedDate
) VALUES (
    3, NEWID(), 'Pacific Engineering', 'Engineering and project management services', 'PACE', 0, NULL,
    'https://pacific.t100platform.com', NULL, NULL, 125,
    @CreatedByUserID, @CreatedDate
);

-- 7. Metro Services
INSERT INTO [V7].[UserArea] (
    ThemeTypeID, GUID, Title, Description, Prefix, IsDemo, ExpiryDate,
    BaseURL, SSOLoginURL, MobileIdentityAPIInstanceID, UploadedFileMBLimit,
    CreatedByUserID, CreatedDate
) VALUES (
    1, NEWID(), 'Metro Services', 'Urban infrastructure and maintenance', 'METR', 0, NULL,
    'https://metro.t100platform.com', NULL, NULL, 80,
    @CreatedByUserID, @CreatedDate
);

-- 8. Eastern Manufacturing
INSERT INTO [V7].[UserArea] (
    ThemeTypeID, GUID, Title, Description, Prefix, IsDemo, ExpiryDate,
    BaseURL, SSOLoginURL, MobileIdentityAPIInstanceID, UploadedFileMBLimit,
    CreatedByUserID, CreatedDate
) VALUES (
    2, NEWID(), 'Eastern Manufacturing', 'Manufacturing and quality control', 'EAST', 0, NULL,
    'https://eastern.t100platform.com', NULL, NULL, 175,
    @CreatedByUserID, @CreatedDate
);

-- 9. Central Logistics
INSERT INTO [V7].[UserArea] (
    ThemeTypeID, GUID, Title, Description, Prefix, IsDemo, ExpiryDate,
    BaseURL, SSOLoginURL, MobileIdentityAPIInstanceID, UploadedFileMBLimit,
    CreatedByUserID, CreatedDate
) VALUES (
    3, NEWID(), 'Central Logistics', 'Supply chain and logistics management', 'CENT', 0, NULL,
    'https://central.t100platform.com', NULL, NULL, 90,
    @CreatedByUserID, @CreatedDate
);

-- 10. Western Resources
INSERT INTO [V7].[UserArea] (
    ThemeTypeID, GUID, Title, Description, Prefix, IsDemo, ExpiryDate,
    BaseURL, SSOLoginURL, MobileIdentityAPIInstanceID, UploadedFileMBLimit,
    CreatedByUserID, CreatedDate
) VALUES (
    1, NEWID(), 'Western Resources', 'Resource management and environmental services', 'WEST', 0, NULL,
    'https://western.t100platform.com', NULL, NULL, 110,
    @CreatedByUserID, @CreatedDate
);

COMMIT TRANSACTION;

-- Verify the inserts
SELECT UserAreaID, Title, ThemeTypeID, Prefix, CreatedDate 
FROM [V7].[UserArea]
ORDER BY CreatedDate DESC;

-- Check total count
SELECT COUNT(*) as TotalUserAreas FROM [V7].[UserArea] WHERE ArchivedDate IS NULL;