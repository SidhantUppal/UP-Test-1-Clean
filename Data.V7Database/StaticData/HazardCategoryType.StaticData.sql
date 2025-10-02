/***************************************
***   Static data management script  ***
***************************************/

-- This script will manage the static data from
-- your Team Database project for [V7].[HazardCategoryType].
-- Generated from: Web.Frontend/ClientApp/src/types/models/hazard.types.ts
-- Date: 2025-09-08

PRINT 'Updating static data table [V7].[HazardCategoryType]'

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
DBCC CHECKIDENT('[V7].[HazardCategoryType]', RESEED, 10000) WITH NO_INFOMSGS

-- 1: Define table variable
DECLARE @tblTempTable TABLE (
[HazardCategoryTypeID] int,
[Title] nvarchar(100) NOT NULL,
[Description] nvarchar(500),
[IsActive] bit,
[CreatedByUserID] int NOT NULL,
[CreatedDate] datetimeoffset(7) NOT NULL,
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
INSERT INTO @tblTempTable ([HazardCategoryTypeID], [Title], [Description], [IsActive], [CreatedByUserID], [CreatedDate], [ModifiedByUserID], [ModifiedDate], [ArchivedByUserID], [ArchivedDate]) 
VALUES 
    (1, 'Physical', 'Physical hazards such as machinery, noise, temperature', 1, 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL),
    (2, 'Chemical', 'Chemical hazards including substances and fumes', 1, 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL),
    (3, 'Biological', 'Biological hazards such as bacteria, viruses', 1, 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL),
    (4, 'Ergonomic', 'Ergonomic hazards related to posture and repetitive tasks', 1, 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL),
    (5, 'Psychosocial', 'Workplace stress and mental health hazards', 1, 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL),
    (6, 'Environmental', 'Environmental factors affecting safety', 1, 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL),
    (7, 'Fire and Explosion', 'Fire, explosion and combustible material hazards', 1, 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL),
    (8, 'Electrical', 'Electrical hazards and power-related risks', 1, 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL),
    (9, 'Radiation', 'Ionizing and non-ionizing radiation hazards', 1, 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL),
    (10, 'Mechanical', 'Rotating equipment, pressure systems, and mechanical hazards', 1, 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL),
    (11, 'Transportation/Vehicle', 'Vehicle operations and material handling equipment', 1, 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL),
    (12, 'Confined Spaces', 'Hazards related to working in confined or restricted spaces', 1, 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL),
    (13, 'Security', 'Workplace violence, unauthorized access, and security risks', 1, 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL),
    (14, 'Working at Height', 'Falls from ladders, scaffolding, or elevated platforms', 1, 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL),
    (15, 'Housekeeping', 'Poor housekeeping leading to slips, trips, and other hazards', 1, 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL),
    (16, 'Lone Working', 'Risks associated with working alone or in isolation', 1, 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL),
    (17, 'Pressure Systems', 'Compressed air, steam, and hydraulic systems', 1, 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL),
    (18, 'Temperature Extremes', 'Exposure to extreme hot or cold environments', 1, 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL),
    (19, 'Noise and Vibration', 'Hearing damage and vibration-related injuries', 1, 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL),
    (20, 'Hazardous Substances', 'Asbestos, silica, lead, and other hazardous materials', 1, 1, '2025-01-01T00:00:00.0000000+00:00', NULL, NULL, NULL, NULL)

-- 3: Insert any new items into the table from the table variable
SET IDENTITY_INSERT [V7].[HazardCategoryType] ON
INSERT INTO [V7].[HazardCategoryType] ([HazardCategoryTypeID], [Title], [Description], [IsActive], [CreatedByUserID], [CreatedDate], [ModifiedByUserID], [ModifiedDate], [ArchivedByUserID], [ArchivedDate])
SELECT tmp.[HazardCategoryTypeID], tmp.[Title], tmp.[Description], tmp.[IsActive], tmp.[CreatedByUserID], tmp.[CreatedDate], tmp.[ModifiedByUserID], tmp.[ModifiedDate], tmp.[ArchivedByUserID], tmp.[ArchivedDate]
FROM @tblTempTable tmp
LEFT JOIN [V7].[HazardCategoryType] tbl ON tbl.[HazardCategoryTypeID] = tmp.[HazardCategoryTypeID]
WHERE tbl.[HazardCategoryTypeID] IS NULL
SET IDENTITY_INSERT [V7].[HazardCategoryType] OFF

-- 4: Update any modified values with the values from the table variable
UPDATE LiveTable SET
LiveTable.[Title] = tmp.[Title],
LiveTable.[Description] = tmp.[Description],
LiveTable.[IsActive] = tmp.[IsActive],
LiveTable.[ModifiedByUserID] = tmp.[ModifiedByUserID],
LiveTable.[ModifiedDate] = tmp.[ModifiedDate],
LiveTable.[ArchivedByUserID] = tmp.[ArchivedByUserID],
LiveTable.[ArchivedDate] = tmp.[ArchivedDate]
FROM [V7].[HazardCategoryType] LiveTable
INNER JOIN @tblTempTable tmp ON LiveTable.[HazardCategoryTypeID] = tmp.[HazardCategoryTypeID]

-- 5: Delete any missing records from the target
IF @DeleteMissingRecords = 1
BEGIN
	DELETE FROM [V7].[HazardCategoryType] FROM [V7].[HazardCategoryType] LiveTable
	LEFT JOIN @tblTempTable tmp ON LiveTable.[HazardCategoryTypeID] = tmp.[HazardCategoryTypeID]
	WHERE tmp.[HazardCategoryTypeID] IS NULL
END

PRINT 'Finished updating static data table [V7].[HazardCategoryType]'

GO