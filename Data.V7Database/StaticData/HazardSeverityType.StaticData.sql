/***************************************
***   Static data management script  ***
***************************************/

-- This script will manage the static data from
-- your Team Database project for [V7].[HazardSeverityType].
-- Generated from: Frontend analysis of hazard severity values (Negligible, Minor, Moderate, Major, Catastrophic)
-- Date: 2025-09-22

PRINT 'Updating static data table [V7].[HazardSeverityType]'

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
-- Set IDENTITY seed to 10000 to allow for client-specific entries starting from 10000+
DBCC CHECKIDENT('[V7].[HazardSeverityType]', RESEED, 10000) WITH NO_INFOMSGS

-- 1: Define table variable
DECLARE @tblTempTable TABLE (
[HazardSeverityTypeID] int,
[Title] nvarchar(50),
[Reference] nvarchar(20),
[Description] nvarchar(255),
[SeverityLevel] int,
[ColorCode] nvarchar(50),
[IsActive] bit,
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
INSERT INTO @tblTempTable ([HazardSeverityTypeID], [Reference], [Title], [SeverityLevel], [ColorCode], [Description], [IsActive], [CreatedByUserID], [CreatedDate], [ModifiedByUserID], [ModifiedDate], [ArchivedByUserID], [ArchivedDate])
VALUES
    (1, 'NEGLIGIBLE', 'Negligible', 1, 'bg-green-100 text-green-800', 'Negligible severity hazard with minimal risk', 1, 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL),
    (2, 'MINOR', 'Minor', 2, 'bg-blue-100 text-blue-800', 'Minor severity hazard with low risk', 1, 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL),
    (3, 'MODERATE', 'Moderate', 3, 'bg-yellow-100 text-yellow-800', 'Moderate severity hazard with medium risk', 1, 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL),
    (4, 'MAJOR', 'Major', 4, 'bg-orange-100 text-orange-800', 'Major severity hazard with high risk', 1, 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL),
    (5, 'CATASTROPHIC', 'Catastrophic', 5, 'bg-red-100 text-red-800', 'Catastrophic severity hazard with extreme risk', 1, 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL)

-- 3: Insert any new items into the table from the table variable
SET IDENTITY_INSERT [V7].[HazardSeverityType] ON
INSERT INTO [V7].[HazardSeverityType] ([HazardSeverityTypeID], [Reference], [Title], [SeverityLevel], [ColorCode], [Description], [IsActive], [CreatedByUserID], [CreatedDate], [ModifiedByUserID], [ModifiedDate], [ArchivedByUserID], [ArchivedDate])
SELECT tmp.[HazardSeverityTypeID], tmp.[Reference], tmp.[Title], tmp.[SeverityLevel], tmp.[ColorCode], tmp.[Description], tmp.[IsActive], tmp.[CreatedByUserID], tmp.[CreatedDate], tmp.[ModifiedByUserID], tmp.[ModifiedDate], tmp.[ArchivedByUserID], tmp.[ArchivedDate]
FROM @tblTempTable tmp
LEFT JOIN [V7].[HazardSeverityType] tbl ON tbl.[HazardSeverityTypeID] = tmp.[HazardSeverityTypeID]
WHERE tbl.[HazardSeverityTypeID] IS NULL
SET IDENTITY_INSERT [V7].[HazardSeverityType] OFF

-- 4: Update any modified values with the values from the table variable
UPDATE LiveTable SET
LiveTable.[Reference] = tmp.[Reference],
LiveTable.[Title] = tmp.[Title],
LiveTable.[SeverityLevel] = tmp.[SeverityLevel],
LiveTable.[ColorCode] = tmp.[ColorCode],
LiveTable.[Description] = tmp.[Description],
LiveTable.[IsActive] = tmp.[IsActive],
LiveTable.[ModifiedByUserID] = tmp.[ModifiedByUserID],
LiveTable.[ModifiedDate] = tmp.[ModifiedDate],
LiveTable.[ArchivedByUserID] = tmp.[ArchivedByUserID],
LiveTable.[ArchivedDate] = tmp.[ArchivedDate]
FROM [V7].[HazardSeverityType] LiveTable
INNER JOIN @tblTempTable tmp ON LiveTable.[HazardSeverityTypeID] = tmp.[HazardSeverityTypeID]

-- 5: Delete any missing records from the target
IF @DeleteMissingRecords = 1
BEGIN
    DELETE FROM [V7].[HazardSeverityType] FROM [V7].[HazardSeverityType] LiveTable
    LEFT JOIN @tblTempTable tmp ON LiveTable.[HazardSeverityTypeID] = tmp.[HazardSeverityTypeID]
    WHERE tmp.[HazardSeverityTypeID] IS NULL
END

PRINT 'Finished updating static data table [V7].[HazardSeverityType]'

GO