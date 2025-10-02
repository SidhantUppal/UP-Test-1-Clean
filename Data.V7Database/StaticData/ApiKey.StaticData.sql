/***************************************
***   Static data management script  ***
***************************************/

-- This script will manage the static data from
-- your Team Database project for [V7].[ApiKey].
-- Generated for API Key authentication system
-- Date: 2025-09-11
-- NOTE: This script provides bootstrap API keys for system integration

PRINT 'Updating static data table [V7].[ApiKey] - Bootstrap API Keys'

-- Set date format to ensure text dates are parsed correctly
SET DATEFORMAT ymd

-- Turn off affected rows being returned
SET NOCOUNT ON

-- Change this to 1 to delete missing records in the target
-- WARNING: Setting this to 1 can cause damage to your database
-- and cause failed deployment if there are any rows referencing
-- a record which has been deleted.
DECLARE @DeleteMissingRecords BIT
SET @DeleteMissingRecords = 0

-- 1: Define table variable
DECLARE @tblTempTable TABLE (
[ApiKeyID] int,
[GUID] uniqueidentifier,
[KeyName] nvarchar(255),
[KeyHash] nvarchar(512),
[KeyPrefix] nvarchar(20),
[UserID] int,
[Scopes] nvarchar(1000),
[IsActive] bit,
[ExpiresAt] datetimeoffset(7),
[LastUsedAt] datetimeoffset(7),
[UsageCount] int,
[IPRestrictions] nvarchar(500),
[RateLimitRequests] int,
[RateLimitWindow] int,
[CreatedByUserID] int,
[CreatedDate] datetimeoffset(7),
[ModifiedByUserID] int,
[ModifiedDate] datetimeoffset(7),
[ArchivedByUserID] int,
[ArchivedDate] datetimeoffset(7)
)

-- 2: Populate the table variable with data
-- This is where you manage your data in source control. You
-- can add and modify entries, but because of potential foreign
-- key constraint violations this script will not delete any
-- removed entries. If you remove an entry then it will no longer
-- be added to new databases based on your schema, but the entry
-- will not be deleted from databases in which the value already exists.

-- NOTE: These are test API keys for development
-- Real API keys should be generated securely and distributed separately
-- Test API Keys (SHA256 hashes computed from actual keys):
-- 1. sys_test123456789: System Integration Key (full access) - Hash: BDASAYhfwfG+vW9qHDBcDiCUGXlSTovj7xqY02i4hUU=
-- 2. mob_test123456789: Mobile App Key (read/write) - Hash: [will be computed when tested]
-- 3. ro_test123456789: Read-Only Key (read only) - Hash: [will be computed when tested]

INSERT INTO @tblTempTable ([ApiKeyID], [GUID], [KeyName], [KeyHash], [KeyPrefix], [UserID], [Scopes], [IsActive], [ExpiresAt], [LastUsedAt], [UsageCount], [IPRestrictions], [RateLimitRequests], [RateLimitWindow], [CreatedByUserID], [CreatedDate], [ModifiedByUserID], [ModifiedDate], [ArchivedByUserID], [ArchivedDate])
VALUES 
    -- API Key: sys_test_5kU8VpMEt4419IAFtv2L3U-o9_seU29K
    (1, NEWID(), 'System Integration Key', 
     'OIrNFQS1BH3KOyt8bil6gwz1a3EbYvbtwnKlnTQF0wQ=', 'sys_test', 
     1, 'read,write,admin', 1, NULL, NULL, 0, NULL, 1000, 3600, 
     1, '2025-09-11 00:00:00.000 +00:00', NULL, NULL, NULL, NULL),

    -- API Key: mob_test_Ew7wVaIfAbvcSSykfmZegGxJ-c_F8IvL
    (2, NEWID(), 'Mobile App Key', 
     'd70OkeE9rBpXvWqUo+I5aKaCcv2Dj25Iel4Cdvvt+tQ=', 'mob_test', 
     1, 'read,write', 1, NULL, NULL, 0, NULL, 500, 3600, 
     1, '2025-09-11 00:00:00.000 +00:00', NULL, NULL, NULL, NULL),

    -- API Key: ro_test1_yhpNyM-eOCsehIE0gBLen5ev9HiHy7qW
    (3, NEWID(), 'Read-Only Integration', 
     'H4hfH8f+1VQG8ArmXW/pU8TkdLgOmNmgiZDuigNogrM=', 'ro_test1', 
     1, 'read', 1, NULL, NULL, 0, NULL, 100, 3600, 
     1, '2025-09-11 00:00:00.000 +00:00', NULL, NULL, NULL, NULL);

-- 3: Insert any new items into the table from the table variable
SET IDENTITY_INSERT [V7].[ApiKey] ON
INSERT INTO [V7].[ApiKey] ([ApiKeyID], [GUID], [KeyName], [KeyHash], [KeyPrefix], [UserID], [Scopes], [IsActive], [ExpiresAt], [LastUsedAt], [UsageCount], [IPRestrictions], [RateLimitRequests], [RateLimitWindow], [CreatedByUserID], [CreatedDate], [ModifiedByUserID], [ModifiedDate], [ArchivedByUserID], [ArchivedDate])
SELECT tmp.[ApiKeyID], tmp.[GUID], tmp.[KeyName], tmp.[KeyHash], tmp.[KeyPrefix], tmp.[UserID], tmp.[Scopes], tmp.[IsActive], tmp.[ExpiresAt], tmp.[LastUsedAt], tmp.[UsageCount], tmp.[IPRestrictions], tmp.[RateLimitRequests], tmp.[RateLimitWindow], tmp.[CreatedByUserID], tmp.[CreatedDate], tmp.[ModifiedByUserID], tmp.[ModifiedDate], tmp.[ArchivedByUserID], tmp.[ArchivedDate]
FROM @tblTempTable tmp
LEFT JOIN [V7].[ApiKey] tbl ON tbl.[ApiKeyID] = tmp.[ApiKeyID]
WHERE tbl.[ApiKeyID] IS NULL
SET IDENTITY_INSERT [V7].[ApiKey] OFF

-- 4: Update any modified values with the values from the table variable
UPDATE LiveTable SET
LiveTable.[GUID] = tmp.[GUID],
LiveTable.[KeyName] = tmp.[KeyName],
LiveTable.[KeyHash] = tmp.[KeyHash],
LiveTable.[KeyPrefix] = tmp.[KeyPrefix],
LiveTable.[UserID] = tmp.[UserID],
LiveTable.[Scopes] = tmp.[Scopes],
LiveTable.[IsActive] = tmp.[IsActive],
LiveTable.[ExpiresAt] = tmp.[ExpiresAt],
LiveTable.[LastUsedAt] = tmp.[LastUsedAt],
LiveTable.[UsageCount] = tmp.[UsageCount],
LiveTable.[IPRestrictions] = tmp.[IPRestrictions],
LiveTable.[RateLimitRequests] = tmp.[RateLimitRequests],
LiveTable.[RateLimitWindow] = tmp.[RateLimitWindow],
LiveTable.[CreatedByUserID] = tmp.[CreatedByUserID],
LiveTable.[CreatedDate] = tmp.[CreatedDate],
LiveTable.[ModifiedByUserID] = tmp.[ModifiedByUserID],
LiveTable.[ModifiedDate] = tmp.[ModifiedDate],
LiveTable.[ArchivedByUserID] = tmp.[ArchivedByUserID],
LiveTable.[ArchivedDate] = tmp.[ArchivedDate]
FROM [V7].[ApiKey] LiveTable 
INNER JOIN @tblTempTable tmp ON LiveTable.[ApiKeyID] = tmp.[ApiKeyID]

-- 5: Delete any missing records from the target
IF @DeleteMissingRecords = 1
BEGIN
	DELETE FROM [V7].[ApiKey] FROM [V7].[ApiKey] LiveTable
	LEFT JOIN @tblTempTable tmp ON LiveTable.[ApiKeyID] = tmp.[ApiKeyID]
	WHERE tmp.[ApiKeyID] IS NULL
END

PRINT 'Finished updating static data table [V7].[ApiKey] - Bootstrap API Keys'

GO