CREATE TABLE [V7].[TaskActivity] (
    [TaskActivityID]       INT           IDENTITY (1, 1) NOT NULL,
    [TaskID]               INT           NOT NULL,
    [EmployeeID]           INT           NOT NULL,
    [ActivityDate]         DATETIMEOFFSET (7) NOT NULL,
    [ActivityType]         TINYINT       NOT NULL,
    [SessionID]            VARCHAR (100) NULL,
    [CreatedByUserID]      INT           NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID] INT           NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT           NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    CONSTRAINT [PK__TaskActi__46F9BEEF86BD9831] PRIMARY KEY CLUSTERED ([TaskActivityID] ASC),
    CONSTRAINT [FK_TaskActivity_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_TaskActivity_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_TaskActivity_Employee] FOREIGN KEY ([EmployeeID]) REFERENCES [V7].[Employee] ([EmployeeID]),
    CONSTRAINT [FK_TaskActivity_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_TaskActivity_SeverityType] FOREIGN KEY ([TaskID]) REFERENCES [V7].[BSSTask] ([TaskID])
);

