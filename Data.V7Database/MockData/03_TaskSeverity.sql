-- Task Severity Levels - Priority/urgency levels for tasks
-- Used by: BSSTask.TaskSeverityID

SET IDENTITY_INSERT [V7].[TaskSeverity] ON;

INSERT INTO [V7].[TaskSeverity] ([TaskSeverityID], [Name], [Description], [Level], [IsActive], [CreatedDate], [CreatedByUserID])
VALUES
    (1, 'Low', 'Low priority task', 1, 1, sysdatetimeoffset(), 1),
    (2, 'Medium', 'Medium priority task', 2, 1, sysdatetimeoffset(), 1),
    (3, 'High', 'High priority task', 3, 1, sysdatetimeoffset(), 1),
    (4, 'Critical', 'Critical priority task', 4, 1, sysdatetimeoffset(), 1);

SET IDENTITY_INSERT [V7].[TaskSeverity] OFF;