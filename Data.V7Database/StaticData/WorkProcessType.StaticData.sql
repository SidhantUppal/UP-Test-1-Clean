/***************************************
***   Static data management script  ***
***************************************/

-- This script will manage the static data from
-- your Team Database project for [V7].[WorkProcessType].
-- Generated from: Web.Frontend/ClientApp/src/app/(main)/permits/page.tsx, Web.Frontend/ClientApp/src/app/(main)/permits/pending-approvals/page.tsx, Web.Frontend/ClientApp/src/app/(main)/permits/issue/page.tsx
-- Date: 2025-09-08

PRINT 'Updating static data table [V7].[WorkProcessType]'

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
[WorkProcessTypeID] int,
[Reference] nvarchar(50),
[Title] nvarchar(255),
[Description] nvarchar(max)
)

-- 2: Populate the table variable with data
-- This is where you manage your data in source control. You
-- can add and modify entries, but because of potential foreign
-- key constraint violations this script will not delete any
-- removed entries. If you remove an entry then it will no longer
-- be added to new databases based on your schema, but the entry
-- will not be deleted from databases in which the value already exists.
INSERT INTO @tblTempTable ([WorkProcessTypeID], [Reference], [Title], [Description]) 
VALUES 
    (1, 'HOT_WORK', 'Hot Work', 'Work involving welding, cutting, or other hot processes'),
    (2, 'COLD_WORK', 'Cold Work', 'Non-hot work activities including mechanical work'),
    (3, 'ELECTRICAL_WORK', 'Electrical Work', 'Electrical installation and maintenance work'),
    (4, 'CONFINED_SPACE', 'Confined Space', 'Work in confined or restricted spaces'),
    (5, 'WORKING_AT_HEIGHT', 'Working at Height', 'Work performed at elevated positions'),
    (6, 'EXCAVATION', 'Excavation', 'Digging, trenching, and earthwork activities'),
    (7, 'LIFTING_OPERATIONS', 'Lifting Operations', 'Crane and heavy lifting operations'),
    (8, 'CHEMICAL_WORK', 'Chemical Work', 'Work involving hazardous chemicals'),
    (9, 'ASBESTOS_WORK', 'Asbestos Work', 'Work involving asbestos materials'),
    (10, 'DEMOLITION', 'Demolition', 'Structural demolition and removal work'),
    (11, 'ROOF_WORK', 'Roof Work', 'Work performed on rooftops and roofing systems')

-- 3: Insert any new items into the table from the table variable
INSERT INTO [V7].[WorkProcessType] ([WorkProcessTypeID], [Reference], [Title], [Description])
SELECT tmp.[WorkProcessTypeID], tmp.[Reference], tmp.[Title], tmp.[Description]
FROM @tblTempTable tmp
LEFT JOIN [V7].[WorkProcessType] tbl ON tbl.[WorkProcessTypeID] = tmp.[WorkProcessTypeID]
WHERE tbl.[WorkProcessTypeID] IS NULL

-- 4: Update any modified values with the values from the table variable
UPDATE LiveTable SET
LiveTable.[Reference] = tmp.[Reference],
LiveTable.[Title] = tmp.[Title],
LiveTable.[Description] = tmp.[Description]
FROM [V7].[WorkProcessType] LiveTable 
INNER JOIN @tblTempTable tmp ON LiveTable.[WorkProcessTypeID] = tmp.[WorkProcessTypeID]

-- 5: Delete any missing records from the target
IF @DeleteMissingRecords = 1
BEGIN
	DELETE FROM [V7].[WorkProcessType] FROM [V7].[WorkProcessType] LiveTable
	LEFT JOIN @tblTempTable tmp ON LiveTable.[WorkProcessTypeID] = tmp.[WorkProcessTypeID]
	WHERE tmp.[WorkProcessTypeID] IS NULL
END

PRINT 'Finished updating static data table [V7].[WorkProcessType]'

GO