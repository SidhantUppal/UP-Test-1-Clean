/***************************************
***   Static data management script  ***
***************************************/

-- This script will manage the static data from
-- your Team Database project for [V7].[UserArea].
-- Generated from: Data.V7Database/MockData/create-test-data.sql
-- Date: 2025-09-08

PRINT 'Updating static data table [V7].[UserArea]'

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
[UserAreaID] int,
[ThemeTypeID] int,
[GUID] uniqueidentifier,
[Title] nvarchar(255),
[Description] nvarchar(max),
[Prefix] nvarchar(10),
[IsDemo] bit,
[ExpiryDate] date,
[BaseURL] nvarchar(255),
[SSOLoginURL] nvarchar(255),
[MobileIdentityAPIInstanceID] int,
[UploadedFileMBLimit] int,
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
INSERT INTO @tblTempTable ([UserAreaID], [ThemeTypeID], [GUID], [Title], [Description], [Prefix], [IsDemo], [ExpiryDate], [BaseURL], [SSOLoginURL], [MobileIdentityAPIInstanceID], [UploadedFileMBLimit], [CreatedByUserID], [CreatedDate], [ModifiedByUserID], [ModifiedDate], [ArchivedByUserID], [ArchivedDate]) 
VALUES 
    (1, 1, NEWID(), 'System Default', 'Default system user area for initial bootstrap', 'SYS', 0, NULL, NULL, NULL, NULL, NULL, 1, '2025-09-08 00:00:00.000', NULL, NULL, NULL, NULL),
    (2, 1, NEWID(), 'Demo Organization', 'Demo user area for testing and development', 'DEMO', 1, NULL, NULL, NULL, NULL, NULL, 1, '2025-09-08 00:00:00.000', NULL, NULL, NULL, NULL)

-- 3: Insert any new items into the table from the table variable
-- Temporarily disable foreign key constraint to break circular dependency with User table
ALTER TABLE [V7].[UserArea] NOCHECK CONSTRAINT [FK_UserArea_CreatedBy]

SET IDENTITY_INSERT [V7].[UserArea] ON
INSERT INTO [V7].[UserArea] ([UserAreaID], [ThemeTypeID], [GUID], [Title], [Description], [Prefix], [IsDemo], [ExpiryDate], [BaseURL], [SSOLoginURL], [MobileIdentityAPIInstanceID], [UploadedFileMBLimit], [CreatedByUserID], [CreatedDate], [ModifiedByUserID], [ModifiedDate], [ArchivedByUserID], [ArchivedDate])
SELECT tmp.[UserAreaID], tmp.[ThemeTypeID], tmp.[GUID], tmp.[Title], tmp.[Description], tmp.[Prefix], tmp.[IsDemo], tmp.[ExpiryDate], tmp.[BaseURL], tmp.[SSOLoginURL], tmp.[MobileIdentityAPIInstanceID], tmp.[UploadedFileMBLimit], tmp.[CreatedByUserID], tmp.[CreatedDate], tmp.[ModifiedByUserID], tmp.[ModifiedDate], tmp.[ArchivedByUserID], tmp.[ArchivedDate]
FROM @tblTempTable tmp
LEFT JOIN [V7].[UserArea] tbl ON tbl.[UserAreaID] = tmp.[UserAreaID]
WHERE tbl.[UserAreaID] IS NULL
SET IDENTITY_INSERT [V7].[UserArea] OFF

-- Keep foreign key constraint disabled during UPDATE (will be checked after Users are created)

-- 4: Update any modified values with the values from the table variable
UPDATE LiveTable SET
LiveTable.[ThemeTypeID] = tmp.[ThemeTypeID],
LiveTable.[GUID] = tmp.[GUID],
LiveTable.[Title] = tmp.[Title],
LiveTable.[Description] = tmp.[Description],
LiveTable.[Prefix] = tmp.[Prefix],
LiveTable.[IsDemo] = tmp.[IsDemo],
LiveTable.[ExpiryDate] = tmp.[ExpiryDate],
LiveTable.[BaseURL] = tmp.[BaseURL],
LiveTable.[SSOLoginURL] = tmp.[SSOLoginURL],
LiveTable.[MobileIdentityAPIInstanceID] = tmp.[MobileIdentityAPIInstanceID],
LiveTable.[UploadedFileMBLimit] = tmp.[UploadedFileMBLimit],
LiveTable.[CreatedByUserID] = tmp.[CreatedByUserID],
LiveTable.[CreatedDate] = tmp.[CreatedDate],
LiveTable.[ModifiedByUserID] = tmp.[ModifiedByUserID],
LiveTable.[ModifiedDate] = tmp.[ModifiedDate],
LiveTable.[ArchivedByUserID] = tmp.[ArchivedByUserID],
LiveTable.[ArchivedDate] = tmp.[ArchivedDate]
FROM [V7].[UserArea] LiveTable 
INNER JOIN @tblTempTable tmp ON LiveTable.[UserAreaID] = tmp.[UserAreaID]

-- Re-enable foreign key constraint (constraint will be validated after Users are created)
ALTER TABLE [V7].[UserArea] CHECK CONSTRAINT [FK_UserArea_CreatedBy]

-- 5: Delete any missing records from the target
IF @DeleteMissingRecords = 1
BEGIN
	DELETE FROM [V7].[UserArea] FROM [V7].[UserArea] LiveTable
	LEFT JOIN @tblTempTable tmp ON LiveTable.[UserAreaID] = tmp.[UserAreaID]
	WHERE tmp.[UserAreaID] IS NULL
END

PRINT 'Finished updating static data table [V7].[UserArea]'

GO