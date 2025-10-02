/***************************************
***   Static data management script  ***
***************************************/

-- This script will manage the static data from
-- your Team Database project for [V7].[PolicyType].
-- Generated manually for critical Type table
-- Date: 2025-09-17

PRINT 'Updating static data table [V7].[PolicyType]'

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
[PolicyTypeID] int,
[TypeName] nvarchar(100),
[TypeDescription] nvarchar(500),
[RequiresApproval] bit,
[RequiresTraining] bit,
[RequiresAcknowledgment] bit,
[ReviewFrequencyMonths] int,
[IsActive] bit,
[CreatedByUserID] int,
[CreatedDate] datetimeoffset(7),
[LastModifiedByUserID] int,
[LastModifiedDate] datetimeoffset(7),
[ArchivedByUserID] int,
[ArchivedDate] datetimeoffset(7)
)

-- 2: Populate the table variable with data
INSERT INTO @tblTempTable ([PolicyTypeID], [TypeName], [TypeDescription], [RequiresApproval], [RequiresTraining], [RequiresAcknowledgment], [ReviewFrequencyMonths], [IsActive], [CreatedByUserID], [CreatedDate], [LastModifiedByUserID], [LastModifiedDate], [ArchivedByUserID], [ArchivedDate]) 
VALUES 
    (1, 'Health & Safety', 'Health and Safety policies', 1, 1, 1, 12, 1, 1, SYSDATETIMEOFFSET(), NULL, NULL, NULL, NULL),
    (2, 'HR Policy', 'Human Resources policies', 1, 0, 1, 12, 1, 1, SYSDATETIMEOFFSET(), NULL, NULL, NULL, NULL),
    (3, 'IT Security', 'Information Technology security policies', 1, 1, 1, 6, 1, 1, SYSDATETIMEOFFSET(), NULL, NULL, NULL, NULL),
    (4, 'Environmental', 'Environmental management policies', 1, 1, 1, 12, 1, 1, SYSDATETIMEOFFSET(), NULL, NULL, NULL, NULL),
    (5, 'Quality', 'Quality management policies', 1, 0, 1, 12, 1, 1, SYSDATETIMEOFFSET(), NULL, NULL, NULL, NULL)

-- Set IDENTITY seed to 10000 to reserve IDs 1-9999 for system defaults
DBCC CHECKIDENT('[V7].[PolicyType]', RESEED, 10000)

-- 3: Insert any new items into the table from the table variable
SET IDENTITY_INSERT [V7].[PolicyType] ON
INSERT INTO [V7].[PolicyType] ([PolicyTypeID], [TypeName], [TypeDescription], [RequiresApproval], [RequiresTraining], [RequiresAcknowledgment], [ReviewFrequencyMonths], [IsActive], [CreatedByUserID], [CreatedDate], [LastModifiedByUserID], [LastModifiedDate], [ArchivedByUserID], [ArchivedDate])
SELECT tmp.[PolicyTypeID], tmp.[TypeName], tmp.[TypeDescription], tmp.[RequiresApproval], tmp.[RequiresTraining], tmp.[RequiresAcknowledgment], tmp.[ReviewFrequencyMonths], tmp.[IsActive], tmp.[CreatedByUserID], tmp.[CreatedDate], tmp.[LastModifiedByUserID], tmp.[LastModifiedDate], tmp.[ArchivedByUserID], tmp.[ArchivedDate]
FROM @tblTempTable tmp
LEFT JOIN [V7].[PolicyType] tbl ON tbl.[PolicyTypeID] = tmp.[PolicyTypeID]
WHERE tbl.[PolicyTypeID] IS NULL
SET IDENTITY_INSERT [V7].[PolicyType] OFF

-- 4: Update any modified values with the values from the table variable
UPDATE LiveTable SET
LiveTable.[TypeName] = tmp.[TypeName],
LiveTable.[TypeDescription] = tmp.[TypeDescription],
LiveTable.[RequiresApproval] = tmp.[RequiresApproval],
LiveTable.[RequiresTraining] = tmp.[RequiresTraining],
LiveTable.[RequiresAcknowledgment] = tmp.[RequiresAcknowledgment],
LiveTable.[ReviewFrequencyMonths] = tmp.[ReviewFrequencyMonths],
LiveTable.[IsActive] = tmp.[IsActive],
LiveTable.[CreatedByUserID] = tmp.[CreatedByUserID],
LiveTable.[CreatedDate] = tmp.[CreatedDate],
LiveTable.[LastModifiedByUserID] = tmp.[LastModifiedByUserID],
LiveTable.[LastModifiedDate] = tmp.[LastModifiedDate],
LiveTable.[ArchivedByUserID] = tmp.[ArchivedByUserID],
LiveTable.[ArchivedDate] = tmp.[ArchivedDate]
FROM [V7].[PolicyType] LiveTable 
INNER JOIN @tblTempTable tmp ON LiveTable.[PolicyTypeID] = tmp.[PolicyTypeID]

-- 5: Delete any missing records from the target
IF @DeleteMissingRecords = 1
BEGIN
	DELETE FROM [V7].[PolicyType] FROM [V7].[PolicyType] LiveTable
	LEFT JOIN @tblTempTable tmp ON LiveTable.[PolicyTypeID] = tmp.[PolicyTypeID]
	WHERE tmp.[PolicyTypeID] IS NULL
END

PRINT 'Finished updating static data table [V7].[PolicyType]'

GO