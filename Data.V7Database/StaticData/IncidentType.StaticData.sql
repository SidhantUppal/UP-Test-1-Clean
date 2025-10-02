/***************************************
***   Static data management script  ***
***************************************/

-- This script will manage the static data from
-- your Team Database project for [V7].[IncidentType].
-- Generated manually for critical Type table
-- Date: 2025-09-17

PRINT 'Updating static data table [V7].[IncidentType]'

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
DBCC CHECKIDENT('[V7].[IncidentType]', RESEED, 10000) WITH NO_INFOMSGS

-- 1: Define table variable
DECLARE @tblTempTable TABLE (
[IncidentTypeID] int,
[UserAreaID] int,
[Title] nvarchar(100),
[Reference] nvarchar(20),
[Description] nvarchar(500),
[IsActive] bit,
[DisplayOrder] int,
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
INSERT INTO @tblTempTable ([IncidentTypeID], [UserAreaID], [Title], [Reference], [Description], [IsActive], [DisplayOrder], [CreatedByUserID], [CreatedDate], [ModifiedByUserID], [ModifiedDate], [ArchivedByUserID], [ArchivedDate])
VALUES
    (1, NULL, 'General Incident', 'GENERAL', 'General incident type for standard reporting', 1, 1, 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL),
    (2, NULL, 'Near Miss', 'NEAR_MISS', 'Incident that could have resulted in injury or damage but did not', 1, 2, 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL),
    (3, NULL, 'Accident', 'ACCIDENT', 'Incident that resulted in injury or damage', 1, 3, 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL),
    (4, NULL, 'Dangerous Occurrence', 'DANGEROUS_OCCURRENCE', 'Serious incident with potential for significant harm', 1, 4, 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL),
    (5, NULL, 'Road Traffic Incident', 'ROAD_TRAFFIC', 'Vehicle-related incident', 1, 5, 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL),
    (6, NULL, 'High Potential', 'WOBBLE', 'High potential incident with significant risk implications', 1, 6, 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL),
    (7, NULL, 'Accident Book', 'ACCIDENT_BOOK', 'Workplace accident requiring entry in accident book', 1, 7, 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL)

-- 3: Insert any new items into the table from the table variable
SET IDENTITY_INSERT [V7].[IncidentType] ON
INSERT INTO [V7].[IncidentType] ([IncidentTypeID], [UserAreaID], [Title], [Reference], [Description], [IsActive], [DisplayOrder], [CreatedByUserID], [CreatedDate])
SELECT tmp.[IncidentTypeID], tmp.[UserAreaID], tmp.[Title], tmp.[Reference], tmp.[Description], tmp.[IsActive], tmp.[DisplayOrder], tmp.[CreatedByUserID], tmp.[CreatedDate]
FROM @tblTempTable tmp
LEFT JOIN [V7].[IncidentType] tbl ON tbl.[IncidentTypeID] = tmp.[IncidentTypeID]
WHERE tbl.[IncidentTypeID] IS NULL
SET IDENTITY_INSERT [V7].[IncidentType] OFF

-- 4: Update any modified values with the values from the table variable
UPDATE LiveTable SET
LiveTable.[UserAreaID] = tmp.[UserAreaID],
LiveTable.[Title] = tmp.[Title],
LiveTable.[Reference] = tmp.[Reference],
LiveTable.[Description] = tmp.[Description],
LiveTable.[IsActive] = tmp.[IsActive],
LiveTable.[DisplayOrder] = tmp.[DisplayOrder],
LiveTable.[ModifiedByUserID] = tmp.[ModifiedByUserID],
LiveTable.[ModifiedDate] = tmp.[ModifiedDate],
LiveTable.[ArchivedByUserID] = tmp.[ArchivedByUserID],
LiveTable.[ArchivedDate] = tmp.[ArchivedDate]
FROM [V7].[IncidentType] LiveTable
INNER JOIN @tblTempTable tmp ON LiveTable.[IncidentTypeID] = tmp.[IncidentTypeID]

-- 5: Delete any missing records from the target
IF @DeleteMissingRecords = 1
BEGIN
	DELETE FROM [V7].[IncidentType] FROM [V7].[IncidentType] LiveTable
	LEFT JOIN @tblTempTable tmp ON LiveTable.[IncidentTypeID] = tmp.[IncidentTypeID]
	WHERE tmp.[IncidentTypeID] IS NULL
END

PRINT 'Finished updating static data table [V7].[IncidentType]'

GO