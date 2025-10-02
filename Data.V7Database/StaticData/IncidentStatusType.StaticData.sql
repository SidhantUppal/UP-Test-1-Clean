/***************************************
***   Static data management script  ***
***************************************/

-- This script will manage the static data from
-- your Team Database project for [V7].[IncidentStatusType].
-- Generated from: Frontend analysis of incident status values (Open, In Progress, Under Review, Closed, Archived)
-- Date: 2025-09-17

PRINT 'Updating static data table [V7].[IncidentStatusType]'

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
DBCC CHECKIDENT('[V7].[IncidentStatusType]', RESEED, 10000) WITH NO_INFOMSGS

-- 1: Define table variable
DECLARE @tblTempTable TABLE (
[IncidentStatusTypeID] int,
[Reference] nvarchar(20),
[Title] nvarchar(50),
[StatusOrder] int,
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
INSERT INTO @tblTempTable ([IncidentStatusTypeID], [Reference], [Title], [StatusOrder], [ColorCode], [Description], [IsActive], [CreatedByUserID], [CreatedDate], [ModifiedByUserID], [ModifiedDate], [ArchivedByUserID], [ArchivedDate])
VALUES
    (1, 'OPEN', 'Open', 1, 'bg-blue-100 text-blue-800', 'Incident is open and requires attention', 1, 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL),
    (2, 'IN_PROGRESS', 'In Progress', 2, 'bg-yellow-100 text-yellow-800', 'Incident is being actively worked on', 1, 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL),
    (3, 'UNDER_REVIEW', 'Under Review', 3, 'bg-purple-100 text-purple-800', 'Incident is under review for completion', 1, 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL),
    (4, 'CLOSED', 'Closed', 4, 'bg-green-100 text-green-800', 'Incident has been resolved and closed', 1, 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL),
    (5, 'ARCHIVED', 'Archived', 5, 'bg-gray-100 text-gray-800', 'Incident has been archived', 1, 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL)

-- 3: Insert any new items into the table from the table variable
SET IDENTITY_INSERT [V7].[IncidentStatusType] ON
INSERT INTO [V7].[IncidentStatusType] ([IncidentStatusTypeID], [Reference], [Title], [StatusOrder], [ColorCode], [Description], [IsActive], [CreatedByUserID], [CreatedDate], [ModifiedByUserID], [ModifiedDate], [ArchivedByUserID], [ArchivedDate])
SELECT tmp.[IncidentStatusTypeID], tmp.[Reference], tmp.[Title], tmp.[StatusOrder], tmp.[ColorCode], tmp.[Description], tmp.[IsActive], tmp.[CreatedByUserID], tmp.[CreatedDate], tmp.[ModifiedByUserID], tmp.[ModifiedDate], tmp.[ArchivedByUserID], tmp.[ArchivedDate]
FROM @tblTempTable tmp
LEFT JOIN [V7].[IncidentStatusType] tbl ON tbl.[IncidentStatusTypeID] = tmp.[IncidentStatusTypeID]
WHERE tbl.[IncidentStatusTypeID] IS NULL
SET IDENTITY_INSERT [V7].[IncidentStatusType] OFF

-- 4: Update any modified values with the values from the table variable
UPDATE LiveTable SET
LiveTable.[Reference] = tmp.[Reference],
LiveTable.[Title] = tmp.[Title],
LiveTable.[StatusOrder] = tmp.[StatusOrder],
LiveTable.[ColorCode] = tmp.[ColorCode],
LiveTable.[Description] = tmp.[Description],
LiveTable.[IsActive] = tmp.[IsActive],
LiveTable.[ModifiedByUserID] = tmp.[ModifiedByUserID],
LiveTable.[ModifiedDate] = tmp.[ModifiedDate],
LiveTable.[ArchivedByUserID] = tmp.[ArchivedByUserID],
LiveTable.[ArchivedDate] = tmp.[ArchivedDate]
FROM [V7].[IncidentStatusType] LiveTable
INNER JOIN @tblTempTable tmp ON LiveTable.[IncidentStatusTypeID] = tmp.[IncidentStatusTypeID]

-- 5: Delete any missing records from the target
IF @DeleteMissingRecords = 1
BEGIN
    DELETE FROM [V7].[IncidentStatusType] FROM [V7].[IncidentStatusType] LiveTable
    LEFT JOIN @tblTempTable tmp ON LiveTable.[IncidentStatusTypeID] = tmp.[IncidentStatusTypeID]
    WHERE tmp.[IncidentStatusTypeID] IS NULL
END

PRINT 'Finished updating static data table [V7].[IncidentStatusType]'

GO