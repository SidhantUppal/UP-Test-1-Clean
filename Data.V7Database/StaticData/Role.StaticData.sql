/***************************************
***   Static data management script  ***
***************************************/

-- This script will manage the static data from
-- your Team Database project for [V7].[Role].
-- Generated from: Web.Frontend/ClientApp/src/contexts/UserContext.tsx, Web.Frontend/ClientApp/src/types/models/User.ts
-- Date: 2025-09-08

PRINT 'Updating static data table [V7].[Role]'

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
[RoleID] int,
[Description] nvarchar(255),
[IsAdministrator] bit,
[CreatedByUserID] int,
[CreatedDate] datetime,
[ModifiedByUserID] int,
[ModifiedDate] datetime,
[ArchivedByUserID] int,
[ArchivedDate] datetime
)

-- 2: Populate the table variable with data
-- This is where you manage your data in source control. You
-- can add and modify entries, but because of potential foreign
-- key constraint violations this script will not delete any
-- removed entries. If you remove an entry then it will no longer
-- be added to new databases based on your schema, but the entry
-- will not be deleted from databases in which the value already exists.
INSERT INTO @tblTempTable ([RoleID], [Description], [IsAdministrator], [CreatedByUserID], [CreatedDate], [ModifiedByUserID], [ModifiedDate], [ArchivedByUserID], [ArchivedDate]) 
VALUES 
    (1, 'Admin', 1, 1, '2025-09-08 00:00:00.000', NULL, NULL, NULL, NULL),
    (2, 'Manager', 0, 1, '2025-09-08 00:00:00.000', NULL, NULL, NULL, NULL),
    (3, 'Read Only', 0, 1, '2025-09-08 00:00:00.000', NULL, NULL, NULL, NULL),
    (4, 'Operator', 0, 1, '2025-09-08 00:00:00.000', NULL, NULL, NULL, NULL),
    (5, 'Employee', 0, 1, '2025-09-08 00:00:00.000', NULL, NULL, NULL, NULL),
    (6, 'Contractor', 0, 1, '2025-09-08 00:00:00.000', NULL, NULL, NULL, NULL),
    (7, 'Tenant Custom', 0, 1, '2025-09-08 00:00:00.000', NULL, NULL, NULL, NULL)

-- 3: Insert any new items into the table from the table variable
SET IDENTITY_INSERT [V7].[Role] ON
INSERT INTO [V7].[Role] ([RoleID], [Description], [IsAdministrator], [CreatedByUserID], [CreatedDate], [ModifiedByUserID], [ModifiedDate], [ArchivedByUserID], [ArchivedDate])
SELECT tmp.[RoleID], tmp.[Description], tmp.[IsAdministrator], tmp.[CreatedByUserID], tmp.[CreatedDate], tmp.[ModifiedByUserID], tmp.[ModifiedDate], tmp.[ArchivedByUserID], tmp.[ArchivedDate]
FROM @tblTempTable tmp
LEFT JOIN [V7].[Role] tbl ON tbl.[RoleID] = tmp.[RoleID]
WHERE tbl.[RoleID] IS NULL
SET IDENTITY_INSERT [V7].[Role] OFF

-- 4: Update any modified values with the values from the table variable
UPDATE LiveTable SET
LiveTable.[Description] = tmp.[Description],
LiveTable.[IsAdministrator] = tmp.[IsAdministrator],
LiveTable.[CreatedByUserID] = tmp.[CreatedByUserID],
LiveTable.[CreatedDate] = tmp.[CreatedDate],
LiveTable.[ModifiedByUserID] = tmp.[ModifiedByUserID],
LiveTable.[ModifiedDate] = tmp.[ModifiedDate],
LiveTable.[ArchivedByUserID] = tmp.[ArchivedByUserID],
LiveTable.[ArchivedDate] = tmp.[ArchivedDate]
FROM [V7].[Role] LiveTable 
INNER JOIN @tblTempTable tmp ON LiveTable.[RoleID] = tmp.[RoleID]

-- 5: Delete any missing records from the target
IF @DeleteMissingRecords = 1
BEGIN
	DELETE FROM [V7].[Role] FROM [V7].[Role] LiveTable
	LEFT JOIN @tblTempTable tmp ON LiveTable.[RoleID] = tmp.[RoleID]
	WHERE tmp.[RoleID] IS NULL
END

PRINT 'Finished updating static data table [V7].[Role]'

GO