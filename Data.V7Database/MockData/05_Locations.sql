-- Locations - Physical locations for task assignments
-- Used by: BSSTask.LocationID

SET IDENTITY_INSERT [V7].[Location] ON;

INSERT INTO [V7].[Location] ([LocationID], [Name], [Description], [IsActive], [CreatedDate], [CreatedByUserID])
VALUES
    (1, 'Building A', 'Main office building', 1, sysdatetimeoffset(), 1),
    (2, 'Building B', 'Secondary office building', 1, sysdatetimeoffset(), 1),
    (3, 'Warehouse 1', 'Primary warehouse facility', 1, sysdatetimeoffset(), 1),
    (4, 'Warehouse 2', 'Secondary warehouse facility', 1, sysdatetimeoffset(), 1),
    (5, 'Site Office', 'Remote site office', 1, sysdatetimeoffset(), 1),
    (6, 'Loading Dock', 'Material loading and unloading area', 1, sysdatetimeoffset(), 1),
    (7, 'Plant Floor', 'Manufacturing plant floor', 1, sysdatetimeoffset(), 1),
    (8, 'Laboratory', 'Quality control laboratory', 1, sysdatetimeoffset(), 1),
    (9, 'Storage Area', 'General storage area', 1, sysdatetimeoffset(), 1),
    (10, 'Parking Lot', 'Employee and visitor parking', 1, sysdatetimeoffset(), 1);

SET IDENTITY_INSERT [V7].[Location] OFF;