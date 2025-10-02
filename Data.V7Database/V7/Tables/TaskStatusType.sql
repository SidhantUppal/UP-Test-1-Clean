CREATE TABLE [V7].[TaskStatusType] (
    [TaskStatusTypeID] INT           IDENTITY (1, 1) NOT NULL,
    [Reference]        NVARCHAR (50) NULL,
    [Title] NVARCHAR (100) NULL,
    [CreatedByUserID] INT DEFAULT (1) NOT NULL,
    [CreatedDate] DATETIMEOFFSET (7) DEFAULT (SYSDATETIMEOFFSET()) NOT NULL,
    [ModifiedByUserID] INT NULL,
    [ModifiedDate] DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID] INT NULL,
    [ArchivedDate] DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([TaskStatusTypeID] ASC),
    CONSTRAINT [FK_TaskStatusType_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_TaskStatusType_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_TaskStatusType_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID])
);

