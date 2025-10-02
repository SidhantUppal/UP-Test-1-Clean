CREATE TABLE [V7].[SeverityType] (
    [SeverityTypeID]       INT           IDENTITY (1, 1) NOT NULL,
    [Reference]            NVARCHAR (20) NULL,
    [UserAreaID]           INT           NULL,
    [CreatedByUserID]      INT           NULL,
    [CreatedDate]          DATETIMEOFFSET (7) NULL,
    [ModifiedByUserID] INT           NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT           NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    [TaskSeverityID]       INT           NULL,
    [Title] NVARCHAR (100) NULL,
    CONSTRAINT [PK__Severity__64231A722D863D4A] PRIMARY KEY CLUSTERED ([SeverityTypeID] ASC),
    CONSTRAINT [FK_SeverityType_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_SeverityType_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_SeverityType_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_SeverityType_TaskSeverity] FOREIGN KEY ([TaskSeverityID]) REFERENCES [V7].[TaskSeverity] ([TaskSeverityID]),
    CONSTRAINT [FK_SeverityType_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID]),
    CONSTRAINT [FK_SeverityType_UserAreaID] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

