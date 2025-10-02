/***************************************
***   Static data management script  ***
***************************************/

-- This script will manage the static data from
-- your Team Database project for [V7].[InjuryType].
-- Generated manually for critical Type table
-- Date: 2025-09-17

PRINT 'Updating static data table [V7].[InjuryType]'

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
DBCC CHECKIDENT('[V7].[InjuryType]', RESEED, 10000) WITH NO_INFOMSGS

-- 1: Define table variable
DECLARE @tblTempTable TABLE (
[InjuryTypeID] int,
[Reference] nvarchar(50),
[IsRIDDORReportable] bit,
[Title] nvarchar(255),
[Description] nvarchar(MAX),
[UserAreaID] int,
[CreatedByUserID] int,
[CreatedDate] datetimeoffset(7),
[ModifiedByUserID] int,
[ModifiedDate] datetimeoffset(7),
[ArchivedByUserID] int,
[ArchivedDate] datetimeoffset(7),
[OrderNum] int,
[RIDDORValue] int
)

-- 2: Populate the table variable with data
-- This is where you manage your data in source control. You
-- can add and modify entries, but because of potential foreign
-- key constraint violations this script will not delete any
-- removed entries. If you remove an entry then it will no longer
-- be added to new databases based on your schema, but the entry
-- will not be deleted from databases in which the value already exists.
INSERT INTO @tblTempTable ([InjuryTypeID], [Reference], [IsRIDDORReportable], [Title], [Description], [UserAreaID], [CreatedByUserID], [CreatedDate], [ModifiedByUserID], [ModifiedDate], [ArchivedByUserID], [ArchivedDate], [OrderNum], [RIDDORValue])
VALUES
    (1, 'CUT', 0, 'Cut/Laceration', 'Minor cut or laceration injury', NULL, 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL, 1, NULL),
    (2, 'BRUISE', 0, 'Bruise/Contusion', 'Bruising or contusion injury', NULL, 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL, 2, NULL),
    (3, 'SPRAIN', 0, 'Sprain/Strain', 'Muscle or joint sprain/strain', NULL, 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL, 3, NULL),
    (4, 'FRACTURE', 1, 'Fracture', 'Bone fracture - RIDDOR reportable', NULL, 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL, 4, 1),
    (5, 'BURN', 1, 'Burn', 'Burn injury - RIDDOR reportable if severe', NULL, 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL, 5, 1)

-- 3: Insert any new items into the table from the table variable
INSERT INTO [V7].[InjuryType] ([InjuryTypeID], [Reference], [IsRIDDORReportable], [Title], [Description], [UserAreaID], [CreatedByUserID], [CreatedDate], [ModifiedByUserID], [ModifiedDate], [ArchivedByUserID], [ArchivedDate], [OrderNum], [RIDDORValue])
SELECT tmp.[InjuryTypeID], tmp.[Reference], tmp.[IsRIDDORReportable], tmp.[Title], tmp.[Description], tmp.[UserAreaID], tmp.[CreatedByUserID], tmp.[CreatedDate], tmp.[ModifiedByUserID], tmp.[ModifiedDate], tmp.[ArchivedByUserID], tmp.[ArchivedDate], tmp.[OrderNum], tmp.[RIDDORValue]
FROM @tblTempTable tmp
LEFT JOIN [V7].[InjuryType] tbl ON tbl.[InjuryTypeID] = tmp.[InjuryTypeID]
WHERE tbl.[InjuryTypeID] IS NULL

-- 4: Update any modified values with the values from the table variable
UPDATE LiveTable SET
LiveTable.[Reference] = tmp.[Reference],
LiveTable.[IsRIDDORReportable] = tmp.[IsRIDDORReportable],
LiveTable.[Title] = tmp.[Title],
LiveTable.[Description] = tmp.[Description],
LiveTable.[UserAreaID] = tmp.[UserAreaID],
LiveTable.[ModifiedByUserID] = tmp.[ModifiedByUserID],
LiveTable.[ModifiedDate] = tmp.[ModifiedDate],
LiveTable.[ArchivedByUserID] = tmp.[ArchivedByUserID],
LiveTable.[ArchivedDate] = tmp.[ArchivedDate],
LiveTable.[OrderNum] = tmp.[OrderNum],
LiveTable.[RIDDORValue] = tmp.[RIDDORValue]
FROM [V7].[InjuryType] LiveTable
INNER JOIN @tblTempTable tmp ON LiveTable.[InjuryTypeID] = tmp.[InjuryTypeID]

-- 5: Delete any missing records from the target
IF @DeleteMissingRecords = 1
BEGIN
	DELETE FROM [V7].[InjuryType] FROM [V7].[InjuryType] LiveTable
	LEFT JOIN @tblTempTable tmp ON LiveTable.[InjuryTypeID] = tmp.[InjuryTypeID]
	WHERE tmp.[InjuryTypeID] IS NULL
END

PRINT 'Finished updating static data table [V7].[InjuryType]'

GO