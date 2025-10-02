/***************************************
***   Static data management script  ***
***************************************/

-- This script will manage the static data from
-- your Team Database project for [V7].[LanguageType].
-- Generated manually for critical Type table
-- Date: 2025-09-17

PRINT 'Updating static data table [V7].[LanguageType]'

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
[LanguageTypeID] int,
[UserAreaID] int,
[Title] nvarchar(50),
[Description] nvarchar(MAX),
[Code] nvarchar(10),
[DefaultRegionTypeID] int
)

-- 2: Populate the table variable with data
INSERT INTO @tblTempTable ([LanguageTypeID], [UserAreaID], [Title], [Description], [Code], [DefaultRegionTypeID]) 
VALUES 
    (1, NULL, 'English', 'English Language', 'EN', 1),
    (2, NULL, 'Spanish', 'Spanish Language', 'ES', 2),
    (3, NULL, 'French', 'French Language', 'FR', 3),
    (4, NULL, 'German', 'German Language', 'DE', 4),
    (5, NULL, 'Italian', 'Italian Language', 'IT', 5)

-- Set IDENTITY seed to 10000 to reserve IDs 1-9999 for system defaults
DBCC CHECKIDENT('[V7].[LanguageType]', RESEED, 10000)

-- 3: Insert any new items into the table from the table variable
INSERT INTO [V7].[LanguageType] ([LanguageTypeID], [UserAreaID], [Title], [Description], [Code], [DefaultRegionTypeID])
SELECT tmp.[LanguageTypeID], tmp.[UserAreaID], tmp.[Title], tmp.[Description], tmp.[Code], tmp.[DefaultRegionTypeID]
FROM @tblTempTable tmp
LEFT JOIN [V7].[LanguageType] tbl ON tbl.[LanguageTypeID] = tmp.[LanguageTypeID]
WHERE tbl.[LanguageTypeID] IS NULL

-- 4: Update any modified values with the values from the table variable
UPDATE LiveTable SET
LiveTable.[UserAreaID] = tmp.[UserAreaID],
LiveTable.[Title] = tmp.[Title],
LiveTable.[Description] = tmp.[Description],
LiveTable.[Code] = tmp.[Code],
LiveTable.[DefaultRegionTypeID] = tmp.[DefaultRegionTypeID]
FROM [V7].[LanguageType] LiveTable 
INNER JOIN @tblTempTable tmp ON LiveTable.[LanguageTypeID] = tmp.[LanguageTypeID]

-- 5: Delete any missing records from the target
IF @DeleteMissingRecords = 1
BEGIN
	DELETE FROM [V7].[LanguageType] FROM [V7].[LanguageType] LiveTable
	LEFT JOIN @tblTempTable tmp ON LiveTable.[LanguageTypeID] = tmp.[LanguageTypeID]
	WHERE tmp.[LanguageTypeID] IS NULL
END

PRINT 'Finished updating static data table [V7].[LanguageType]'

GO