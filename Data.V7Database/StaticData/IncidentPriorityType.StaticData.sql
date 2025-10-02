/***************************************
***   Static data management script  ***
***************************************/

-- This script will manage the static data from
-- your Team Database project for [V7].[IncidentPriorityType].
-- Generated from: Frontend analysis of incident priority values (Low, Medium, High, Critical)
-- Date: 2025-09-17

PRINT 'Updating static data table [V7].[IncidentPriorityType]'

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
DBCC CHECKIDENT('[V7].[IncidentPriorityType]', RESEED, 10000) WITH NO_INFOMSGS

-- 1: Define table variable
DECLARE @tblTempTable TABLE (
[IncidentPriorityTypeID] int,
[Reference] nvarchar(20),
[Title] nvarchar(50),
[PriorityLevel] int,
[ColorCode] nvarchar(50),
[Description] nvarchar(255),
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
INSERT INTO @tblTempTable ([IncidentPriorityTypeID], [Reference], [Title], [PriorityLevel], [ColorCode], [Description], [IsActive], [CreatedByUserID], [CreatedDate], [ModifiedByUserID], [ModifiedDate], [ArchivedByUserID], [ArchivedDate])
VALUES
    (1, 'LOW', 'Low', 1, 'bg-green-100 text-green-800', 'Low priority incident - can be handled in routine timeframe', 1, 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL),
    (2, 'MEDIUM', 'Medium', 2, 'bg-yellow-100 text-yellow-800', 'Medium priority incident - should be addressed promptly', 1, 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL),
    (3, 'HIGH', 'High', 3, 'bg-orange-100 text-orange-800', 'High priority incident - requires urgent attention', 1, 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL),
    (4, 'CRITICAL', 'Critical', 4, 'bg-red-100 text-red-800', 'Critical priority incident - requires immediate action', 1, 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL)

-- 3: Insert any new items into the table from the table variable
SET IDENTITY_INSERT [V7].[IncidentPriorityType] ON
INSERT INTO [V7].[IncidentPriorityType] ([IncidentPriorityTypeID], [Reference], [Title], [PriorityLevel], [ColorCode], [Description], [IsActive], [CreatedByUserID], [CreatedDate], [ModifiedByUserID], [ModifiedDate], [ArchivedByUserID], [ArchivedDate])
SELECT tmp.[IncidentPriorityTypeID], tmp.[Reference], tmp.[Title], tmp.[PriorityLevel], tmp.[ColorCode], tmp.[Description], tmp.[IsActive], tmp.[CreatedByUserID], tmp.[CreatedDate], tmp.[ModifiedByUserID], tmp.[ModifiedDate], tmp.[ArchivedByUserID], tmp.[ArchivedDate]
FROM @tblTempTable tmp
LEFT JOIN [V7].[IncidentPriorityType] tbl ON tbl.[IncidentPriorityTypeID] = tmp.[IncidentPriorityTypeID]
WHERE tbl.[IncidentPriorityTypeID] IS NULL
SET IDENTITY_INSERT [V7].[IncidentPriorityType] OFF

-- 4: Update any modified values with the values from the table variable
UPDATE LiveTable SET
LiveTable.[Reference] = tmp.[Reference],
LiveTable.[Title] = tmp.[Title],
LiveTable.[PriorityLevel] = tmp.[PriorityLevel],
LiveTable.[ColorCode] = tmp.[ColorCode],
LiveTable.[Description] = tmp.[Description],
LiveTable.[IsActive] = tmp.[IsActive],
LiveTable.[ModifiedByUserID] = tmp.[ModifiedByUserID],
LiveTable.[ModifiedDate] = tmp.[ModifiedDate],
LiveTable.[ArchivedByUserID] = tmp.[ArchivedByUserID],
LiveTable.[ArchivedDate] = tmp.[ArchivedDate]
FROM [V7].[IncidentPriorityType] LiveTable
INNER JOIN @tblTempTable tmp ON LiveTable.[IncidentPriorityTypeID] = tmp.[IncidentPriorityTypeID]

-- 5: Delete any missing records from the target
IF @DeleteMissingRecords = 1
BEGIN
    DELETE FROM [V7].[IncidentPriorityType] FROM [V7].[IncidentPriorityType] LiveTable
    LEFT JOIN @tblTempTable tmp ON LiveTable.[IncidentPriorityTypeID] = tmp.[IncidentPriorityTypeID]
    WHERE tmp.[IncidentPriorityTypeID] IS NULL
END

PRINT 'Finished updating static data table [V7].[IncidentPriorityType]'

GO