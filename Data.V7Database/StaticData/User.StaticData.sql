/***************************************
***   Static data management script  ***
***************************************/

-- This script will manage the static data from
-- your Team Database project for [V7].[User].
-- Generated from: Data.V7Database/MockData/create-test-data.sql
-- Date: 2025-09-08
-- NOTE: This script handles the "chicken and egg" problem by creating bootstrap users

PRINT 'Updating static data table [V7].[User] - Bootstrap Users'

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
[UserID] int,
[GUID] uniqueidentifier,
[MasterUserAreaID] int,
[FullName] nvarchar(255),
[Email] nvarchar(255),
[Username] nvarchar(255),
[PasswordHash] nvarchar(255),
[PasswordSalt] nvarchar(255),
[EmailVerified] bit,
[FailedLoginAttempts] int,
[IsMobileAppUser] bit,
[HasReadDisclaimer] bit,
[IsLocked] bit,
[LockedMessage] nvarchar(255),
[LastLoginDate] datetimeoffset(7),
[CreatedByUserID] int,
[CreatedDate] datetimeoffset(7),
[ModifiedByUserID] int,
[ModifiedDate] datetimeoffset(7),
[ArchivedByUserID] int,
[ArchivedDate] datetimeoffset(7),
[AzureADObjectId] nvarchar(255)
)

-- 2: Populate the table variable with data
-- This is where you manage your data in source control. You
-- can add and modify entries, but because of potential foreign
-- key constraint violations this script will not delete any
-- removed entries. If you remove an entry then it will no longer
-- be added to new databases based on your schema, but the entry
-- will not be deleted from databases in which the value already exists.
-- Note: Password hash for "test" using PBKDF2 with SHA256, 100000 iterations
INSERT INTO @tblTempTable ([UserID], [GUID], [MasterUserAreaID], [FullName], [Email], [Username], [PasswordHash], [PasswordSalt], [EmailVerified], [FailedLoginAttempts], [IsMobileAppUser], [HasReadDisclaimer], [IsLocked], [LockedMessage], [LastLoginDate], [CreatedByUserID], [CreatedDate], [ModifiedByUserID], [ModifiedDate], [ArchivedByUserID], [ArchivedDate], [AzureADObjectId]) 
VALUES 
    (1, NEWID(), 1, 'System Administrator', 'system@localhost', 'admin', 
     'pbkdf2:sha256:100000$testSalt123456789012345678901234567890$ORl4gSqNyYCHyI0Sm9+rUQFlsVlWJhs52ukx67hhp3k=', 
     'testSalt123456789012345678901234567890', 1, 0, 1, 1, 0, NULL, NULL, 1, '2025-09-11 00:00:00.000', NULL, NULL, NULL, NULL, NULL),
    (2, NEWID(), 2, 'Demo User', 'demo@test.local', 'demo', 
     'pbkdf2:sha256:100000$testSalt123456789012345678901234567890$ORl4gSqNyYCHyI0Sm9+rUQFlsVlWJhs52ukx67hhp3k=', 
     'testSalt123456789012345678901234567890', 1, 0, 1, 1, 0, NULL, NULL, 1, '2025-09-11 00:00:00.000', NULL, NULL, NULL, NULL, NULL),
    (3, NEWID(), 1, 'Default Administrator', 'admin@localhost', 'sysadmin', 
     'pbkdf2:sha256:100000$testSalt123456789012345678901234567890$ORl4gSqNyYCHyI0Sm9+rUQFlsVlWJhs52ukx67hhp3k=', 
     'testSalt123456789012345678901234567890', 1, 0, 0, 0, 0, NULL, NULL, 1, '2025-09-11 00:00:00.000', NULL, NULL, NULL, NULL, NULL),
    (4, NEWID(), 1, 'Test User', 'test@example.com', 'testuser', 
     'pbkdf2:sha256:100000$testSalt123456789012345678901234567890$ORl4gSqNyYCHyI0Sm9+rUQFlsVlWJhs52ukx67hhp3k=', 
     'testSalt123456789012345678901234567890', 1, 0, 1, 1, 0, NULL, NULL, 1, '2025-09-11 00:00:00.000', NULL, NULL, NULL, NULL, NULL)


-- 3: Insert any new items into the table from the table variable
SET IDENTITY_INSERT [V7].[User] ON
INSERT INTO [V7].[User] ([UserID], [GUID], [MasterUserAreaID], [FullName], [Email], [Username], [PasswordHash], [PasswordSalt], [EmailVerified], [FailedLoginAttempts], [IsMobileAppUser], [HasReadDisclaimer], [IsLocked], [LockedMessage], [LastLoginDate], [CreatedByUserID], [CreatedDate], [ModifiedByUserID], [ModifiedDate], [ArchivedByUserID], [ArchivedDate], [AzureADObjectId])
SELECT tmp.[UserID], tmp.[GUID], tmp.[MasterUserAreaID], tmp.[FullName], tmp.[Email], tmp.[Username], tmp.[PasswordHash], tmp.[PasswordSalt], tmp.[EmailVerified], tmp.[FailedLoginAttempts], tmp.[IsMobileAppUser], tmp.[HasReadDisclaimer], tmp.[IsLocked], tmp.[LockedMessage], tmp.[LastLoginDate], tmp.[CreatedByUserID], tmp.[CreatedDate], tmp.[ModifiedByUserID], tmp.[ModifiedDate], tmp.[ArchivedByUserID], tmp.[ArchivedDate], tmp.[AzureADObjectId]
FROM @tblTempTable tmp
LEFT JOIN [V7].[User] tbl ON tbl.[UserID] = tmp.[UserID]
WHERE tbl.[UserID] IS NULL
SET IDENTITY_INSERT [V7].[User] OFF

-- 4: Update any modified values with the values from the table variable
UPDATE LiveTable SET
LiveTable.[GUID] = tmp.[GUID],
LiveTable.[MasterUserAreaID] = tmp.[MasterUserAreaID],
LiveTable.[FullName] = tmp.[FullName],
LiveTable.[Email] = tmp.[Email],
LiveTable.[Username] = tmp.[Username],
LiveTable.[PasswordHash] = tmp.[PasswordHash],
LiveTable.[PasswordSalt] = tmp.[PasswordSalt],
LiveTable.[EmailVerified] = tmp.[EmailVerified],
LiveTable.[FailedLoginAttempts] = tmp.[FailedLoginAttempts],
LiveTable.[IsMobileAppUser] = tmp.[IsMobileAppUser],
LiveTable.[HasReadDisclaimer] = tmp.[HasReadDisclaimer],
LiveTable.[IsLocked] = tmp.[IsLocked],
LiveTable.[LockedMessage] = tmp.[LockedMessage],
LiveTable.[LastLoginDate] = tmp.[LastLoginDate],
LiveTable.[CreatedByUserID] = tmp.[CreatedByUserID],
LiveTable.[CreatedDate] = tmp.[CreatedDate],
LiveTable.[ModifiedByUserID] = tmp.[ModifiedByUserID],
LiveTable.[ModifiedDate] = tmp.[ModifiedDate],
LiveTable.[ArchivedByUserID] = tmp.[ArchivedByUserID],
LiveTable.[ArchivedDate] = tmp.[ArchivedDate],
LiveTable.[AzureADObjectId] = tmp.[AzureADObjectId]
FROM [V7].[User] LiveTable 
INNER JOIN @tblTempTable tmp ON LiveTable.[UserID] = tmp.[UserID]

-- 5: Delete any missing records from the target
IF @DeleteMissingRecords = 1
BEGIN
	DELETE FROM [V7].[User] FROM [V7].[User] LiveTable
	LEFT JOIN @tblTempTable tmp ON LiveTable.[UserID] = tmp.[UserID]
	WHERE tmp.[UserID] IS NULL
END

PRINT 'Finished updating static data table [V7].[User] - Bootstrap Users'

GO