-- Users - System users for task assignment and creation
-- Used by: BSSTask.CreatedByUserID, BSSTask.ModifiedByUserID, BSSTask.ArchivedByUserID

SET IDENTITY_INSERT [V7].[User] ON;

INSERT INTO [V7].[User] ([UserID], [FullName], [Email], [IsActive], [CreatedDate], [UserAreaID])
VALUES
    (1, 'John Smith', 'john.smith@company.com', 1, sysdatetimeoffset(), 1),
    (2, 'Sarah Johnson', 'sarah.johnson@company.com', 1, sysdatetimeoffset(), 1),
    (3, 'Mike Davis', 'mike.davis@company.com', 1, sysdatetimeoffset(), 2),
    (4, 'Lisa Anderson', 'lisa.anderson@company.com', 1, sysdatetimeoffset(), 1),
    (5, 'Tom Wilson', 'tom.wilson@company.com', 1, sysdatetimeoffset(), 3),
    (6, 'Emma Wilson', 'emma.wilson@company.com', 1, sysdatetimeoffset(), 2),
    (7, 'James Martinez', 'james.martinez@company.com', 1, sysdatetimeoffset(), 4),
    (8, 'Michelle Chen', 'michelle.chen@company.com', 1, sysdatetimeoffset(), 1),
    (9, 'David Lee', 'david.lee@company.com', 1, sysdatetimeoffset(), 3),
    (10, 'Robert Brown', 'robert.brown@company.com', 1, sysdatetimeoffset(), 5),
    (11, 'Mark Thompson', 'mark.thompson@company.com', 1, sysdatetimeoffset(), 2),
    (12, 'Amy Rodriguez', 'amy.rodriguez@company.com', 1, sysdatetimeoffset(), 4),
    (13, 'Kevin White', 'kevin.white@company.com', 1, sysdatetimeoffset(), 3),
    (14, 'Jennifer Taylor', 'jennifer.taylor@company.com', 1, sysdatetimeoffset(), 5),
    (15, 'System Administrator', 'admin@company.com', 1, sysdatetimeoffset(), 5);

SET IDENTITY_INSERT [V7].[User] OFF;