CREATE TABLE [V7].[TaskType] (
    [TaskTypeID]         INT           NOT NULL,
    [UserAreaID]         INT           NULL,
    [Title]              NVARCHAR (50) NOT NULL,
    [IsSystemGenerated]  BIT           DEFAULT ((0)) NOT NULL,
    [IsUserAbleToCreate] BIT           DEFAULT ((0)) NOT NULL,
    [IsLive]             BIT           DEFAULT ((0)) NOT NULL,
    [CreatedByUserID]               INT           DEFAULT (1) NOT NULL,
    [CreatedDate]                   DATETIMEOFFSET (7) DEFAULT (SYSDATETIMEOFFSET()) NOT NULL,
    [ModifiedByUserID]              INT           NULL,
    [ModifiedDate]                  DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]              INT           NULL,
    [ArchivedDate]                  DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([TaskTypeID] ASC),
    CONSTRAINT [FK_TaskType_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_TaskType_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_TaskType_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_TaskType_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

