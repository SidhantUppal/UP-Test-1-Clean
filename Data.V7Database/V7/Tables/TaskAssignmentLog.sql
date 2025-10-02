CREATE TABLE [V7].[TaskAssignmentLog] (
    [TaskAssignmentLogID] INT      IDENTITY (1, 1) NOT NULL,
    [UserAreaID]          INT      NOT NULL,
    [TaskID]              INT      NOT NULL,
    [EmployeeID]          INT      NOT NULL,
    [CreatedByUserID]     INT      NOT NULL,
    [CreatedDate]         DATETIMEOFFSET (7) NOT NULL,
    [ArchivedByUserID]    INT      NULL,
    [ArchivedDate]        DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([TaskAssignmentLogID] ASC),
    CONSTRAINT [FK_TaskAssignmentLog_ArchivedByUser] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_TaskAssignmentLog_CreatedByUser] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_TaskAssignmentLog_Employee] FOREIGN KEY ([EmployeeID]) REFERENCES [V7].[Employee] ([EmployeeID]),
    CONSTRAINT [FK_TaskAssignmentLog_Task] FOREIGN KEY ([TaskID]) REFERENCES [V7].[BSSTask] ([TaskID]),
    CONSTRAINT [FK_TaskAssignmentLog_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_TaskAssignmentLog_TaskIDEmployeeID]
    ON [V7].[TaskAssignmentLog]([TaskID] ASC, [EmployeeID] ASC);

