-- Task Types - Categories of tasks that can be created
-- Used by: BSSTask.TaskTypeID

SET IDENTITY_INSERT [V7].[TaskType] ON;

INSERT INTO [V7].[TaskType] ([TaskTypeID], [Name], [Description], [IsActive], [CreatedDate], [CreatedByUserID])
VALUES
    (1, 'Safety Inspection', 'Safety-related inspection tasks', 1, sysdatetimeoffset(), 1),
    (2, 'Permit Approval', 'Work permit approval tasks', 1, sysdatetimeoffset(), 1),
    (3, 'Compliance Check', 'Regulatory compliance tasks', 1, sysdatetimeoffset(), 1),
    (4, 'Document Review', 'Document review tasks', 1, sysdatetimeoffset(), 1),
    (5, 'Contractor Verification', 'Contractor verification tasks', 1, sysdatetimeoffset(), 1),
    (6, 'Process Review', 'Business process review tasks', 1, sysdatetimeoffset(), 1),
    (7, 'Training Assignment', 'Training-related tasks', 1, sysdatetimeoffset(), 1),
    (8, 'System Configuration', 'System setup tasks', 1, sysdatetimeoffset(), 1),
    (9, 'Data Entry', 'Data entry tasks', 1, sysdatetimeoffset(), 1),
    (10, 'Report Generation', 'Report creation tasks', 1, sysdatetimeoffset(), 1),
    (11, 'Audit', 'Audit-related tasks', 1, sysdatetimeoffset(), 1),
    (12, 'Meeting', 'Meeting coordination tasks', 1, sysdatetimeoffset(), 1),
    (13, 'Other', 'General tasks', 1, sysdatetimeoffset(), 1);

SET IDENTITY_INSERT [V7].[TaskType] OFF;