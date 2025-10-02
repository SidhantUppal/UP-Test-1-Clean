CREATE TABLE [V7].[EmployeeTextBlock] (
    [EmployeeTextBlockID]  INT      IDENTITY (1, 1) NOT NULL,
    [TextBlockID]          INT      NOT NULL,
    [EmployeeID]           INT      NOT NULL,
    [UserAreaID]           INT      NOT NULL,
    [EmployeeFolderID]     INT      NULL,
    [TaskID]               INT      NULL,
    [CreatedByUserID]      INT      NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID] INT      NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT      NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([EmployeeTextBlockID] ASC),
    CONSTRAINT [FK_EmployeeTextBlock_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_EmployeeTextBlock_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_EmployeeTextBlock_Employee] FOREIGN KEY ([EmployeeID]) REFERENCES [V7].[Employee] ([EmployeeID]),
    CONSTRAINT [FK_EmployeeTextBlock_EmployeeFolder] FOREIGN KEY ([EmployeeFolderID]) REFERENCES [V7].[EmployeeFolder] ([EmployeeFolderID]),
    CONSTRAINT [FK_EmployeeTextBlock_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_EmployeeTextBlock_Task] FOREIGN KEY ([TaskID]) REFERENCES [V7].[BSSTask] ([TaskID]),
    CONSTRAINT [FK_EmployeeTextBlock_TextBlock] FOREIGN KEY ([TextBlockID]) REFERENCES [V7].[TextBlock] ([TextBlockID]),
    CONSTRAINT [FK_EmployeeTextBlock_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

