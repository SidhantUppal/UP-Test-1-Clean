-- Task Status Types - Current status of tasks
-- Used by: BSSTask.TaskStatusTypeID

SET IDENTITY_INSERT [V7].[TaskStatusType] ON;

INSERT INTO [V7].[TaskStatusType] ([TaskStatusTypeID], [Name], [Description], [IsActive], [CreatedDate], [CreatedByUserID])
VALUES
    (1, 'New', 'Newly created task', 1, sysdatetimeoffset(), 1),
    (2, 'In Progress', 'Task is being worked on', 1, sysdatetimeoffset(), 1),
    (3, 'On Hold', 'Task is temporarily paused', 1, sysdatetimeoffset(), 1),
    (4, 'Completed', 'Task has been completed', 1, sysdatetimeoffset(), 1),
    (5, 'Cancelled', 'Task has been cancelled', 1, sysdatetimeoffset(), 1),
    (6, 'Overdue', 'Task is past due date', 1, sysdatetimeoffset(), 1);

SET IDENTITY_INSERT [V7].[TaskStatusType] OFF;