-- User Areas - Department/Area definitions
-- Used by: BSSTask.UserAreaID

SET IDENTITY_INSERT [V7].[UserArea] ON;

INSERT INTO [V7].[UserArea] ([UserAreaID], [Name], [Description], [IsActive], [CreatedDate], [CreatedByUserID])
VALUES
    (1, 'Safety & Compliance', 'Safety and compliance department', 1, sysdatetimeoffset(), 1),
    (2, 'Operations', 'Operations department', 1, sysdatetimeoffset(), 1),
    (3, 'Maintenance', 'Maintenance department', 1, sysdatetimeoffset(), 1),
    (4, 'HR & Training', 'Human resources and training', 1, sysdatetimeoffset(), 1),
    (5, 'Administration', 'Administrative department', 1, sysdatetimeoffset(), 1);

SET IDENTITY_INSERT [V7].[UserArea] OFF;