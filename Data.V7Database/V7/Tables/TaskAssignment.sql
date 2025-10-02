CREATE TABLE [V7].[TaskAssignment] (
    [TaskAssignmentID] INT IDENTITY (1, 1) NOT NULL,
    [TaskID]           INT NOT NULL,
    [EmployeeID]       INT NULL,
    [LocationID]       INT NULL,
    [OrgGroupID]       INT NULL,
    [CreatedByUserID]               INT           NOT NULL,
    [CreatedDate]                   DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]              INT           NULL,
    [ModifiedDate]                  DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]              INT           NULL,
    [ArchivedDate]                  DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([TaskAssignmentID] ASC),
    CONSTRAINT [FK_TaskAssignment_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_TaskAssignment_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_TaskAssignment_Employee] FOREIGN KEY ([EmployeeID]) REFERENCES [V7].[Employee] ([EmployeeID]),
    CONSTRAINT [FK_TaskAssignment_Location] FOREIGN KEY ([LocationID]) REFERENCES [V7].[Location] ([LocationID]),
    CONSTRAINT [FK_TaskAssignment_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_TaskAssignment_OrgGroup] FOREIGN KEY ([OrgGroupID]) REFERENCES [V7].[OrgGroup] ([OrgGroupID]),
    CONSTRAINT [FK_TaskAssignment_Task] FOREIGN KEY ([TaskID]) REFERENCES [V7].[BSSTask] ([TaskID])
);


GO
CREATE NONCLUSTERED INDEX [IX_TaskAssignment_TaskID]
    ON [V7].[TaskAssignment]([TaskID] ASC)
    INCLUDE([TaskAssignmentID], [EmployeeID], [LocationID], [OrgGroupID]);

